// src/analytics/useLessonTelemetry.js
//
// Toda la telemetría de una visita a una lección en un solo enganche, para que
// `LessonPage` no se llene de contadores: `lesson_open`, `scroll_depth`,
// `subsection_dwell` y el resumen `lesson_dwell`.
//
// El tiempo sale del reloj monótono de `useActivity` (vía `readClock`), no de
// `Date.now()`: hay que medir tiempo *activo*, no tiempo transcurrido. Una lección
// abierta mientras el estudiante se va a almorzar no acumula nada.

import { useEffect, useRef } from 'react';
import { useNavigationType } from 'react-router-dom';
import { useAnalytics } from './AnalyticsProvider';
import { EVENTS, LESSON_ORIGIN, SCROLL_MILESTONES } from './events';
import { consumeNavigationOrigin } from './navigationOrigin';

// Un contenedor rara vez llega a scrollTop exacto: submúltiplos de píxel y barras
// de sistema dejan un par de píxeles sin recorrer.
const END_THRESHOLD_PCT = 98;

const closeSubsection = (visit, activeMsNow) => {
  if (!visit.subsectionId) return;
  const dwell = activeMsNow - visit.subsectionOpenedAt;
  if (dwell > 0) {
    const previous = visit.subsections.get(visit.subsectionId) ?? 0;
    visit.subsections.set(visit.subsectionId, previous + dwell);
  }
  visit.subsectionId = null;
};

export function useLessonTelemetry({ contentId, activeSection, scrollRef, ready }) {
  const { track, readClock } = useAnalytics();
  const navigationType = useNavigationType();

  // Todo lo que no sea `contentId` se lee por referencia, para que el ciclo de vida
  // de la visita dependa ÚNICAMENTE de qué lección se está viendo. Si `track` o
  // `readClock` cambiaran de identidad entre renders —basta con que algún día el
  // proveedor deje de memorizarlos— el efecto se reiniciaría y volverían las
  // aperturas duplicadas. El invariante no debe depender de un detalle de otro
  // archivo.
  const api = useRef({ track, readClock, navigationType });
  useEffect(() => {
    api.current = { track, readClock, navigationType };
  });

  const visitRef = useRef(null);

  // Apertura y cierre de la visita. La limpieza del efecto es la que emite el
  // resumen, así que cubre por igual cambiar de lección, cerrar la pestaña
  // (el volcado a localStorage lo rescata) y desmontar la página.
  //
  // La visita depende SOLO de `contentId`, nunca de si el contenido ya cargó.
  // `LessonPage` llama a `setLoading(true)` en un efecto que corre después de que
  // `contentId` ya cambió, así que `ready` hace false→true en mitad de la visita.
  // Cuando esto dependía también de `ready`, cada lección se registraba así:
  //
  //     lesson_open  0007  origin=drawer      ← el efecto arranca
  //     lesson_dwell 0007  activeMs=0         ← `ready` cae, se limpia
  //     lesson_open  0007  origin=deeplink    ← `ready` sube, arranca otra vez
  //
  // Es decir: aperturas duplicadas, el origen perdido en la segunda (H13 se queda
  // sin predictor), una permanencia fantasma de 0 ms que cuenta como abandono en
  // `abandonRate` (H17, núcleo), y el scroll acumulado tirado a la basura junto
  // con el objeto de visita. Detectado en datos reales el 2026-07-26.
  useEffect(() => {
    if (!contentId) return undefined;

    const origin =
      consumeNavigationOrigin() ??
      (api.current.navigationType === 'POP' ? LESSON_ORIGIN.HISTORY : LESSON_ORIGIN.DEEPLINK);

    const opened = api.current.readClock();
    const visit = {
      contentId,
      openedActiveMs: opened.activeMs,
      openedIdleMs: opened.idleMs,
      maxScrollPct: 0,
      reachedEnd: false,
      milestones: new Set(),
      subsectionId: null,
      subsectionOpenedAt: opened.activeMs,
      subsections: new Map(),
    };
    visitRef.current = visit;

    api.current.track(EVENTS.LESSON_OPEN, { origin }, { contentId });

    return () => {
      const closed = api.current.readClock();
      closeSubsection(visit, closed.activeMs);

      for (const [subsectionId, activeMs] of visit.subsections) {
        api.current.track(EVENTS.SUBSECTION_DWELL, { activeMs }, { contentId, subsectionId });
      }

      api.current.track(
        EVENTS.LESSON_DWELL,
        {
          activeMs: closed.activeMs - visit.openedActiveMs,
          idleMs: closed.idleMs - visit.openedIdleMs,
          maxScrollPct: visit.maxScrollPct,
          reachedEnd: visit.reachedEnd,
        },
        { contentId }
      );

      visitRef.current = null;
    };
  }, [contentId]);

  // Cambio de apartado visible. `useContentSpy` ya calcula cuál lo está; aquí solo
  // se cierra el tramo anterior y se abre el siguiente.
  useEffect(() => {
    const visit = visitRef.current;
    if (!visit || !activeSection || visit.subsectionId === activeSection) return;
    const { activeMs } = api.current.readClock();
    closeSubsection(visit, activeMs);
    visit.subsectionId = activeSection;
    visit.subsectionOpenedAt = activeMs;
  }, [activeSection]);

  // Profundidad de lectura. El contenido no scrollea en `window` sino dentro de su
  // propio contenedor, así que el listener va en el elemento, no en la ventana.
  useEffect(() => {
    if (!ready) return undefined;
    const element = scrollRef?.current;
    if (!element) return undefined;

    const handleScroll = () => {
      const visit = visitRef.current;
      if (!visit) return;

      const scrollable = element.scrollHeight - element.clientHeight;
      const pct =
        scrollable <= 0 ? 100 : Math.min(100, Math.round((element.scrollTop / scrollable) * 100));

      if (pct <= visit.maxScrollPct) return;
      visit.maxScrollPct = pct;
      if (pct >= END_THRESHOLD_PCT) visit.reachedEnd = true;

      for (const milestone of SCROLL_MILESTONES) {
        if (pct >= milestone && !visit.milestones.has(milestone)) {
          visit.milestones.add(milestone);
          api.current.track(EVENTS.SCROLL_DEPTH, { pct: milestone }, { contentId: visit.contentId });
        }
      }
    };

    element.addEventListener('scroll', handleScroll, { passive: true });

    // Una lección que cabe entera en pantalla está leída al 100 % sin scrollear, y
    // hay que registrarlo o contaría como abandono a mitad en `abandonRate` (H17).
    // Pero se mide en el siguiente frame, no ahora: recién montado el contenido, el
    // navegador todavía no ha hecho el layout y `scrollHeight` puede venir igual a
    // `clientHeight` — con lo que TODA lección se marcaría como leída entera.
    const frame = requestAnimationFrame(handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener('scroll', handleScroll);
    };
  }, [ready, contentId, scrollRef]);
}
