import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

const track = vi.fn();
let clock = { activeMs: 0, idleMs: 0 };

vi.mock('./AnalyticsProvider', () => ({
  useAnalytics: () => ({ track, readClock: () => ({ ...clock }) }),
}));

let navigationType = 'PUSH';
vi.mock('react-router-dom', () => ({ useNavigationType: () => navigationType }));

const { useLessonTelemetry } = await import('./useLessonTelemetry');
const { EVENTS, LESSON_ORIGIN } = await import('./events');
const { setNavigationOrigin } = await import('./navigationOrigin');

// Contenedor con scroll falso: jsdom no hace layout, así que las medidas se fijan.
const makeScrollable = ({ scrollHeight = 2000, clientHeight = 1000 } = {}) => {
  const el = document.createElement('div');
  Object.defineProperty(el, 'scrollHeight', { value: scrollHeight, writable: true });
  Object.defineProperty(el, 'clientHeight', { value: clientHeight, writable: true });
  el.scrollTop = 0;
  return el;
};

const scrollTo = (el, top) => act(() => {
  el.scrollTop = top;
  el.dispatchEvent(new Event('scroll'));
});

const of = (type) => track.mock.calls.filter(([t]) => t === type);
const payloads = (type) => of(type).map(([, payload]) => payload);

describe('useLessonTelemetry', () => {
  beforeEach(() => {
    track.mockClear();
    clock = { activeMs: 0, idleMs: 0 };
    navigationType = 'PUSH';
    setNavigationOrigin(null);
  });

  // Regresión del fallo visto en datos reales el 2026-07-26: `LessonPage` hace
  // setLoading(true) DESPUÉS de que contentId cambió, así que `ready` hace
  // false→true en mitad de la visita. Cuando el ciclo de vida dependía de `ready`,
  // eso producía dos lesson_open y un lesson_dwell fantasma de 0 ms.
  it('emite exactamente un lesson_open y un lesson_dwell por visita, aunque la lección tarde en cargar', () => {
    const scrollRef = { current: makeScrollable() };
    const { rerender, unmount } = renderHook(
      ({ ready }) => useLessonTelemetry({ contentId: '0007', activeSection: '', scrollRef, ready }),
      { initialProps: { ready: true } }
    );

    rerender({ ready: false }); // empieza la carga
    rerender({ ready: true });  // termina la carga

    expect(of(EVENTS.LESSON_OPEN)).toHaveLength(1);
    expect(of(EVENTS.LESSON_DWELL)).toHaveLength(0);

    unmount();
    expect(of(EVENTS.LESSON_DWELL)).toHaveLength(1);
  });

  it('no pierde el origen del drawer cuando la lección se recarga', () => {
    setNavigationOrigin(LESSON_ORIGIN.DRAWER);
    const scrollRef = { current: makeScrollable() };
    const { rerender } = renderHook(
      ({ ready }) => useLessonTelemetry({ contentId: '0007', activeSection: '', scrollRef, ready }),
      { initialProps: { ready: false } }
    );
    rerender({ ready: true });

    expect(payloads(EVENTS.LESSON_OPEN)).toEqual([{ origin: LESSON_ORIGIN.DRAWER }]);
  });

  it('conserva el scroll acumulado a través del cambio de estado de carga', () => {
    const el = makeScrollable();
    const scrollRef = { current: el };
    const { rerender, unmount } = renderHook(
      ({ ready }) => useLessonTelemetry({ contentId: '0007', activeSection: '', scrollRef, ready }),
      { initialProps: { ready: true } }
    );

    scrollTo(el, 500); // 50 %
    rerender({ ready: false });
    rerender({ ready: true });
    unmount();

    expect(payloads(EVENTS.LESSON_DWELL)[0]).toMatchObject({ maxScrollPct: 50, reachedEnd: false });
    expect(payloads(EVENTS.SCROLL_DEPTH).map((p) => p.pct)).toEqual([25, 50]);
  });

  it('marca reachedEnd al llegar al final y no repite los hitos de scroll', () => {
    const el = makeScrollable();
    const scrollRef = { current: el };
    const { unmount } = renderHook(() =>
      useLessonTelemetry({ contentId: '0007', activeSection: '', scrollRef, ready: true })
    );

    scrollTo(el, 1000);
    scrollTo(el, 400); // volver atrás no debe reabrir hitos ni bajar el máximo
    unmount();

    expect(payloads(EVENTS.SCROLL_DEPTH).map((p) => p.pct)).toEqual([25, 50, 75, 100]);
    expect(payloads(EVENTS.LESSON_DWELL)[0]).toMatchObject({ maxScrollPct: 100, reachedEnd: true });
  });

  it('al cambiar de lección cierra la anterior y abre la nueva una sola vez', () => {
    const scrollRef = { current: makeScrollable() };
    const { rerender } = renderHook(
      ({ contentId, ready }) => useLessonTelemetry({ contentId, activeSection: '', scrollRef, ready }),
      { initialProps: { contentId: '0007', ready: true } }
    );

    rerender({ contentId: '0004', ready: false }); // navega y empieza a cargar
    rerender({ contentId: '0004', ready: true });

    expect(of(EVENTS.LESSON_OPEN).map(([, , ctx]) => ctx.contentId)).toEqual(['0007', '0004']);
    expect(of(EVENTS.LESSON_DWELL).map(([, , ctx]) => ctx.contentId)).toEqual(['0007']);
  });

  it('acumula tiempo activo por apartado y lo emite al cerrar la visita', () => {
    const scrollRef = { current: makeScrollable() };
    const { rerender, unmount } = renderHook(
      ({ activeSection }) =>
        useLessonTelemetry({ contentId: '0007', activeSection, scrollRef, ready: true }),
      { initialProps: { activeSection: '' } }
    );

    act(() => { clock.activeMs = 1_000; });
    rerender({ activeSection: 'intro' });
    act(() => { clock.activeMs = 4_000; });
    rerender({ activeSection: 'streams' });
    act(() => { clock.activeMs = 9_000; });
    unmount();

    const subs = of(EVENTS.SUBSECTION_DWELL).map(([, p, ctx]) => [ctx.subsectionId, p.activeMs]);
    expect(subs).toEqual([['intro', 3_000], ['streams', 5_000]]);
    expect(payloads(EVENTS.LESSON_DWELL)[0].activeMs).toBe(9_000);
  });

  it('cuenta como historial la navegación hacia atrás', () => {
    navigationType = 'POP';
    const scrollRef = { current: makeScrollable() };
    renderHook(() =>
      useLessonTelemetry({ contentId: '0007', activeSection: '', scrollRef, ready: true })
    );

    expect(payloads(EVENTS.LESSON_OPEN)).toEqual([{ origin: LESSON_ORIGIN.HISTORY }]);
  });
});
