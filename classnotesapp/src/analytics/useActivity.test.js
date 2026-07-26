import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useActivity, IDLE_AFTER_MS, SESSION_GAP_MS } from './useActivity';

const setVisibility = (state) => {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => state,
  });
};

const advance = (ms) => act(() => { vi.advanceTimersByTime(ms); });

const interact = () => act(() => { window.dispatchEvent(new Event('click')); });

describe('useActivity', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setVisibility('visible');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('acumula tiempo activo mientras la pestaña está visible y hay interacción reciente', () => {
    const { result } = renderHook(() => useActivity({}));

    advance(20_000);

    expect(result.current.read().activeMs).toBe(20_000);
    expect(result.current.read().idleMs).toBe(0);
  });

  it('no cuenta nada con la pestaña oculta — ni activo ni inactivo', () => {
    setVisibility('hidden');
    const { result } = renderHook(() => useActivity({}));

    advance(20_000);

    expect(result.current.read()).toEqual({ activeMs: 0, idleMs: 0 });
  });

  it('pasa a inactivo tras 60 s sin interacción y lo avisa una sola vez', () => {
    const onIdleStart = vi.fn();
    const { result } = renderHook(() => useActivity({ onIdleStart }));

    advance(IDLE_AFTER_MS + 15_000);

    expect(onIdleStart).toHaveBeenCalledTimes(1);
    expect(result.current.isIdle()).toBe(true);
    expect(result.current.read().activeMs).toBe(IDLE_AFTER_MS - 5_000);
    expect(result.current.read().idleMs).toBe(20_000);
  });

  it('vuelve a activo en cuanto hay interacción', () => {
    const onIdleEnd = vi.fn();
    const { result } = renderHook(() => useActivity({ onIdleEnd }));

    advance(IDLE_AFTER_MS + 5_000);
    expect(result.current.isIdle()).toBe(true);

    interact();

    expect(onIdleEnd).toHaveBeenCalledTimes(1);
    expect(result.current.isIdle()).toBe(false);
  });

  it('avisa del corte de sesión tras 30 min sin interacción, y no lo repite', () => {
    const onSessionGap = vi.fn();
    renderHook(() => useActivity({ onSessionGap }));

    advance(SESSION_GAP_MS + 60_000);

    expect(onSessionGap).toHaveBeenCalledTimes(1);
  });

  it('no acumula el rato que la pestaña estuvo congelada de fondo', () => {
    const { result } = renderHook(() => useActivity({}));

    advance(10_000);
    expect(result.current.read().activeMs).toBe(10_000);

    // El navegador congela los temporizadores de una pestaña oculta: no corre
    // ningún tick durante diez minutos y al volver el delta es enorme.
    setVisibility('hidden');
    act(() => { document.dispatchEvent(new Event('visibilitychange')); });
    act(() => { vi.setSystemTime(Date.now() + 600_000); });
    setVisibility('visible');
    act(() => { document.dispatchEvent(new Event('visibilitychange')); });

    advance(5_000);

    // Solo el tick real posterior, no los diez minutos de fondo.
    expect(result.current.read().activeMs).toBe(15_000);
  });

  it('no engancha ningún listener ni temporizador si está deshabilitado', () => {
    const onIdleStart = vi.fn();
    const { result } = renderHook(() => useActivity({ enabled: false, onIdleStart }));

    advance(SESSION_GAP_MS);

    expect(result.current.read()).toEqual({ activeMs: 0, idleMs: 0 });
    expect(onIdleStart).not.toHaveBeenCalled();
  });
});
