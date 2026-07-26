import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';

const setDoc = vi.fn().mockResolvedValue(undefined);

vi.mock('firebase/firestore', () => ({
  doc: (_db, collection, id) => ({ collection, id }),
  setDoc: (...args) => setDoc(...args),
  serverTimestamp: () => '__serverTimestamp__',
}));

vi.mock('@/auth/firebase', () => ({ db: {} }));
vi.mock('@/auth/firebaseConfig', () => ({
  isFirebaseConfigured: true,
  courseId: 'compunet2',
}));

let authState = { user: { uid: 'u1' }, profile: { analyticsConsent: true } };
vi.mock('@/auth/AuthContext', () => ({ useAuth: () => authState }));

const { AnalyticsProvider, useAnalytics } = await import('./AnalyticsProvider');
const { EVENTS } = await import('./events');

// Expone el contexto para poder emitir desde la prueba.
let api = null;
const Probe = () => {
  api = useAnalytics();
  return null;
};

const mount = async () => {
  let utils;
  await act(async () => {
    utils = render(
      <AnalyticsProvider>
        <Probe />
      </AnalyticsProvider>
    );
  });
  return utils;
};

const batches = () =>
  setDoc.mock.calls.map(([ref, data]) => ({ collection: ref.collection, ...data }));

describe('AnalyticsProvider', () => {
  beforeEach(() => {
    setDoc.mockClear();
    localStorage.clear();
    sessionStorage.clear();
    authState = { user: { uid: 'u1' }, profile: { analyticsConsent: true } };
  });

  afterEach(() => {
    api = null;
  });

  it('abre sesión y la escribe en eventBatches al montar', async () => {
    await mount();

    const written = batches();
    expect(written).toHaveLength(1);
    expect(written[0].collection).toBe('eventBatches');
    expect(written[0].events.map((e) => e.type)).toEqual([EVENTS.SESSION_START]);
  });

  it('no escribe absolutamente nada sin consentimiento', async () => {
    authState = { user: { uid: 'u1' }, profile: { analyticsConsent: false } };
    await mount();

    await act(async () => {
      api.track(EVENTS.CODE_COPY, { lines: 4, language: 'java' });
      await api.flush();
    });

    expect(setDoc).not.toHaveBeenCalled();
    expect(api.enabled).toBe(false);
  });

  it('no escribe nada si no hay usuario', async () => {
    authState = { user: null, profile: null };
    await mount();

    await act(async () => {
      api.track(EVENTS.CODE_COPY, {});
      await api.flush();
    });

    expect(setDoc).not.toHaveBeenCalled();
  });

  it('agrupa varios eventos en un solo documento con el envolvente completo', async () => {
    await mount();
    setDoc.mockClear();

    await act(async () => {
      api.track(EVENTS.CODE_COPY, { lines: 4, language: 'java' }, { contentId: '0014' });
      api.track(EVENTS.SCROLL_DEPTH, { pct: 50 }, { contentId: '0014' });
      await api.flush();
    });

    const written = batches();
    expect(written).toHaveLength(1);

    const batch = written[0];
    expect(batch).toMatchObject({
      uid: 'u1',
      courseId: 'compunet2',
      count: 2,
      serverTs: '__serverTimestamp__',
    });
    expect(batch.sessionId).toEqual(expect.any(String));
    expect(batch.device).toMatch(/^(mobile|desktop)$/);
    expect(typeof batch.tzOffset).toBe('number');
    expect(typeof batch.flushedAtClient).toBe('number');

    expect(batch.events).toHaveLength(2);
    expect(batch.events[0]).toMatchObject({
      type: EVENTS.CODE_COPY,
      contentId: '0014',
      payload: { lines: 4, language: 'java' },
    });
    // El envolvente sube al lote y no se repite por evento.
    expect(batch.events[0]).not.toHaveProperty('uid');
    expect(batch.events[0].eventId).toEqual(expect.any(String));
    expect(batch.events[0].ts).toEqual(expect.any(Number));
  });

  it('reutiliza la sesión abierta en vez de crear una por pestaña', async () => {
    await mount();
    const first = batches()[0].sessionId;

    setDoc.mockClear();
    await mount(); // segunda pestaña, mismo localStorage

    // No hay un segundo session_start, y si escribe algo va con la misma sesión.
    const types = batches().flatMap((b) => b.events.map((e) => e.type));
    expect(types).not.toContain(EVENTS.SESSION_START);
    expect(localStorage.getItem('analytics.session')).toContain(first);
  });

  it('vuelca lo pendiente a localStorage al ocultarse la página', async () => {
    await mount();
    setDoc.mockClear();

    await act(async () => {
      api.track(EVENTS.LESSON_OPEN, { origin: 'drawer' }, { contentId: '0014' });
      window.dispatchEvent(new Event('pagehide'));
    });

    const spilled = JSON.parse(localStorage.getItem('analytics.spill'));
    expect(spilled).toHaveLength(1);
    expect(spilled[0].ev.type).toBe(EVENTS.LESSON_OPEN);
    expect(spilled[0].env.uid).toBe('u1');
  });

  it('recupera y envía lo volcado en la carga siguiente', async () => {
    await mount();
    await act(async () => {
      api.track(EVENTS.LESSON_DWELL, { activeMs: 42_000 }, { contentId: '0014' });
      window.dispatchEvent(new Event('pagehide'));
    });

    setDoc.mockClear();
    await mount();

    const types = batches().flatMap((b) => b.events.map((e) => e.type));
    expect(types).toContain(EVENTS.LESSON_DWELL);
    expect(localStorage.getItem('analytics.spill')).toBeNull();
  });
});
