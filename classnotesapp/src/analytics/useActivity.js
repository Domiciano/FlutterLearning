// src/analytics/useActivity.js
//
// Reloj de actividad. De aquí salen `activeMs` e `idleMs`, y con ellos todas las
// variables de H1 (regularidad) y H14 (atención fragmentada), así que es la pieza
// que más importa que esté bien.
//
// "Tiempo en la página" y "tiempo estudiando" no son lo mismo: una pestaña abierta
// toda la noche produciría ocho horas de estudio falsas. Se cuenta como activo solo
// si se cumplen las dos condiciones a la vez:
//   1. la pestaña está visible, y
//   2. hubo interacción real en los últimos 60 s.
//
// Ver `features.md` § F1, "Actividad e inactividad".

import { useCallback, useEffect, useRef } from 'react';

export const TICK_MS = 5_000;
export const IDLE_AFTER_MS = 60_000;
export const SESSION_GAP_MS = 30 * 60_000;
export const INTERACTION_THROTTLE_MS = 1_000;

const INTERACTION_EVENTS = ['pointermove', 'keydown', 'scroll', 'click', 'touchstart'];

export function useActivity({
  enabled = true,
  onTick,
  onIdleStart,
  onIdleEnd,
  onVisibilityChange,
  onSessionGap,
} = {}) {
  // Los manejadores viven en un ref para que cambiar una prop no re-suscriba los
  // listeners ni reinicie el intervalo — reiniciarlo perdería el delta acumulado.
  const handlers = useRef({});
  useEffect(() => {
    handlers.current = { onTick, onIdleStart, onIdleEnd, onVisibilityChange, onSessionGap };
  });

  // Reloj monótono de esta carga de página. No se reinicia por lección: quien
  // quiera el tiempo de una lección toma una foto al abrir y otra al cerrar y
  // resta. Así el tiempo de una lección nunca puede superar al de la sesión, que
  // es el error clásico de que cada componente lleve su propio contador.
  const clock = useRef({ activeMs: 0, idleMs: 0 });
  const lastInteractionAt = useRef(Date.now());
  const lastTickAt = useRef(Date.now());
  const isIdle = useRef(false);
  const gapReported = useRef(false);

  const read = useCallback(() => ({ ...clock.current }), []);

  useEffect(() => {
    if (!enabled) return undefined;

    let lastMarkAt = 0;
    const markInteraction = () => {
      const at = Date.now();
      if (at - lastMarkAt < INTERACTION_THROTTLE_MS) return; // un registro por segundo
      lastMarkAt = at;
      lastInteractionAt.current = at;
      gapReported.current = false;
      if (isIdle.current) {
        isIdle.current = false;
        handlers.current.onIdleEnd?.();
      }
    };

    const handleVisibility = () => {
      const state = document.visibilityState;
      if (state === 'visible') {
        // Reiniciar el delta ANTES de marcar la interacción. El navegador congela
        // los temporizadores de una pestaña de fondo, así que el primer tick al
        // volver traería un `elapsed` de todo el rato que estuvo oculta y, con la
        // interacción ya marcada, lo contaría entero como tiempo activo.
        lastTickAt.current = Date.now();
        markInteraction();
      }
      handlers.current.onVisibilityChange?.(state);
    };

    const tick = () => {
      const at = Date.now();
      const elapsed = at - lastTickAt.current;
      lastTickAt.current = at;
      if (elapsed <= 0) return;

      // 30 min sin interacción: la sesión terminó. Este tramo no es ni activo ni
      // inactivo, es otra sesión que aún no ha empezado.
      if (at - lastInteractionAt.current >= SESSION_GAP_MS) {
        if (!gapReported.current) {
          gapReported.current = true;
          handlers.current.onSessionGap?.();
        }
        return;
      }

      const visible = document.visibilityState === 'visible';
      if (!visible) return; // una pestaña oculta no suma en ningún contador

      const recent = at - lastInteractionAt.current < IDLE_AFTER_MS;
      if (recent) {
        clock.current.activeMs += elapsed;
        handlers.current.onTick?.({ activeMs: elapsed, idleMs: 0 });
      } else {
        clock.current.idleMs += elapsed;
        handlers.current.onTick?.({ activeMs: 0, idleMs: elapsed });
        if (!isIdle.current) {
          isIdle.current = true;
          handlers.current.onIdleStart?.();
        }
      }
    };

    INTERACTION_EVENTS.forEach((name) =>
      window.addEventListener(name, markInteraction, { passive: true })
    );
    document.addEventListener('visibilitychange', handleVisibility);

    lastTickAt.current = Date.now();
    const intervalId = setInterval(tick, TICK_MS);

    return () => {
      INTERACTION_EVENTS.forEach((name) => window.removeEventListener(name, markInteraction));
      document.removeEventListener('visibilitychange', handleVisibility);
      clearInterval(intervalId);
    };
  }, [enabled]);

  return { read, isIdle: () => isIdle.current };
}
