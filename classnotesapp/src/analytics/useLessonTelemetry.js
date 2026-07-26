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

  const navTypeRef = useRef(navigationType);
  useEffect(() => {
    navTypeRef.current = navigationType;
  }, [navigationType]);

  const visitRef = useRef(null);

  // Apertura y cierre de la visita. La limpieza del efecto es la que emite el
  // resumen, así que cubre por igual cambiar de lección, cerrar la pestaña
  // (el volcado a localStorage lo rescata) y desmontar la página.
  useEffect(() => {
    if (!ready || !contentId) return undefined;

    const origin =
      consumeNavigationOrigin() ??
      (navTypeRef.current === 'POP' ? LESSON_ORIGIN.HISTORY : LESSON_ORIGIN.DEEPLINK);

    const opened = readClock();
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

    track(EVENTS.LESSON_OPEN, { origin }, { contentId });

    return () => {
      const closed = readClock();
      closeSubsection(visit, closed.activeMs);

      for (const [subsectionId, activeMs] of visit.subsections) {
        track(EVENTS.SUBSECTION_DWELL, { activeMs }, { contentId, subsectionId });
      }

      track(
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
  }, [contentId, ready, track, readClock]);

  // Cambio de apartado visible. `useContentSpy` ya calcula cuál lo está; aquí solo
  // se cierra el tramo anterior y se abre el siguiente.
  useEffect(() => {
    const visit = visitRef.current;
    if (!visit || !activeSection || visit.subsectionId === activeSection) return;
    const { activeMs } = readClock();
    closeSubsection(visit, activeMs);
    visit.subsectionId = activeSection;
    visit.subsectionOpenedAt = activeMs;
  }, [activeSection, readClock]);

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
          track(EVENTS.SCROLL_DEPTH, { pct: milestone }, { contentId: visit.contentId });
        }
      }
    };

    element.addEventListener('scroll', handleScroll, { passive: true });
    // Una lección que cabe entera en pantalla está leída al 100 % sin scrollear.
    // Sin esta llamada contaría como abandono a mitad y ensuciaría `abandonRate`,
    // que es el indicador central de H17.
    handleScroll();

    return () => element.removeEventListener('scroll', handleScroll);
  }, [ready, contentId, scrollRef, track]);
}
