// src/analytics/AnalyticsProvider.jsx
//
// Junta las piezas: sesión compartida entre pestañas, envolvente común, puerta de
// consentimiento y escritura en lotes a Firestore.
//
// Este archivo es idéntico en los tres repos del curso. Lo único que cambia entre
// cursos es `courseId`, que ya vive en `auth/firebaseConfig.js`.
//
// Contrato de datos: `analitics/datadict.md` § 1 y § 2. Diseño: `features.md` § F1.

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/auth/firebase';
import { courseId, isFirebaseConfigured } from '@/auth/firebaseConfig';
import { useAuth } from '@/auth/AuthContext';
import { EVENTS } from './events';
import { newId } from './ids';
import { createEventQueue, FLUSH_INTERVAL_MS } from './eventQueue';
import { SESSION_GAP_MS, useActivity } from './useActivity';

const AnalyticsContext = createContext(null);

const SESSION_KEY = 'analytics.session';
const CLOCK_OWNER_KEY = 'analytics.clockOwner';
const CLOCK_OWNER_TTL_MS = 15_000;
const MOBILE_MAX_WIDTH = 768;

const readJson = (key) => {
  try {
    const raw = globalThis.localStorage?.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeJson = (key, value) => {
  try {
    globalThis.localStorage?.setItem(key, JSON.stringify(value));
  } catch {
    // Modo privado o cuota llena. Se pierde la persistencia de la sesión, no la
    // captura: los eventos siguen saliendo, solo que la sesión no sobrevive a una
    // recarga. No vale la pena romper la app por esto.
  }
};

const removeKey = (key) => {
  try {
    globalThis.localStorage?.removeItem(key);
  } catch {
    /* ver writeJson */
  }
};

export function AnalyticsProvider({ children }) {
  const { user, profile } = useAuth();
  const uid = user?.uid ?? null;

  // El consentimiento se aplica en el origen: sin él, el evento se descarta antes
  // de encolarse. Lo que no se debe analizar, no se escribe. (`features.md` § F1.)
  const enabled = Boolean(isFirebaseConfigured && db && uid && profile?.analyticsConsent === true);

  const enabledRef = useRef(enabled);
  const uidRef = useRef(uid);
  useEffect(() => {
    enabledRef.current = enabled;
    uidRef.current = uid;
  }, [enabled, uid]);

  const tabId = useRef(newId());

  // Constantes del dispositivo, calculadas una vez. `device` se decide por ancho y
  // no por user agent: para H15 lo que importa es la superficie de lectura.
  const deviceCtx = useMemo(() => {
    const viewportW = typeof window === 'undefined' ? 0 : window.innerWidth;
    return {
      device: viewportW > 0 && viewportW < MOBILE_MAX_WIDTH ? 'mobile' : 'desktop',
      viewportW,
      // Minutos respecto a UTC, con el signo del diccionario: Colombia = −300.
      tzOffset: -new Date().getTimezoneOffset(),
    };
  }, []);

  const queueRef = useRef(null);
  if (queueRef.current === null) {
    queueRef.current = createEventQueue({
      commit: async ({ env, events }) => {
        const batchId = newId();
        await setDoc(doc(db, 'eventBatches', batchId), {
          batchId,
          ...env,
          count: events.length,
          events,
          flushedAtClient: Date.now(),
          serverTs: serverTimestamp(),
        });
      },
      onError: (err) => console.warn('[Analytics]', err?.message ?? err),
    });
  }

  // --- Sesión -------------------------------------------------------------
  // En localStorage y no en sessionStorage: sessionStorage es por pestaña, así que
  // dos pestañas abiertas producirían dos sesiones y `sessionCount` contaría el
  // doble. Una sesión es un episodio de estudio de una persona, no de una pestaña.

  const emit = useCallback(
    (type, payload = {}, ctx = {}, session) => {
      if (!enabledRef.current || !session) return;
      queueRef.current.push({
        env: {
          uid: uidRef.current,
          courseId,
          sessionId: session.id,
          ...deviceCtx,
        },
        ev: {
          eventId: newId(),
          ts: Date.now(),
          type,
          contentId: ctx.contentId ?? null,
          subsectionId: ctx.subsectionId ?? null,
          payload,
        },
      });
    },
    [deviceCtx]
  );

  const endSession = useCallback(
    (session) => {
      emit(EVENTS.SESSION_END, { activeMs: session.activeMs, idleMs: session.idleMs }, {}, session);
      removeKey(SESSION_KEY);
      // Un lote no puede cruzar sesiones: su envolvente subiría al documento y
      // dejaría de describir a la mitad de sus eventos.
      queueRef.current.flush();
    },
    [emit]
  );

  const ensureSession = useCallback(() => {
    if (!enabledRef.current) return null;
    const at = Date.now();
    const current = readJson(SESSION_KEY);

    if (current && current.uid === uidRef.current && at - current.lastActivityAt < SESSION_GAP_MS) {
      return current;
    }
    if (current && current.uid === uidRef.current) endSession(current);

    const session = {
      id: newId(),
      uid: uidRef.current,
      startedAt: at,
      lastActivityAt: at,
      activeMs: 0,
      idleMs: 0,
    };
    writeJson(SESSION_KEY, session);
    emit(EVENTS.SESSION_START, {}, {}, session);
    return session;
  }, [emit, endSession]);

  /**
   * Único punto de emisión para el resto de la app.
   * @param {string} type  una constante de `EVENTS`
   * @param {object} payload  campos específicos del tipo (ver datadict § 2)
   * @param {{contentId?: string, subsectionId?: string}} ctx  ancla al material
   */
  const track = useCallback(
    (type, payload = {}, ctx = {}) => {
      if (!enabledRef.current) return;
      emit(type, payload, ctx, ensureSession());
    },
    [emit, ensureSession]
  );

  // --- Reloj compartido ---------------------------------------------------
  // Dos ventanas visibles a la vez sumarían el mismo tiempo dos veces. Solo la
  // pestaña que sostiene el testigo acumula; una pestaña oculta nunca lo reclama.

  const ownsClock = useCallback(() => {
    if (typeof document === 'undefined' || document.visibilityState !== 'visible') return false;
    const at = Date.now();
    const owner = readJson(CLOCK_OWNER_KEY);
    if (owner && owner.tabId !== tabId.current && at - owner.at < CLOCK_OWNER_TTL_MS) return false;
    writeJson(CLOCK_OWNER_KEY, { tabId: tabId.current, at });
    return true;
  }, []);

  const releaseClock = useCallback(() => {
    const owner = readJson(CLOCK_OWNER_KEY);
    if (owner?.tabId === tabId.current) removeKey(CLOCK_OWNER_KEY);
  }, []);

  const handleTick = useCallback(
    ({ activeMs, idleMs }) => {
      if (!enabledRef.current || !ownsClock()) return;
      const session = readJson(SESSION_KEY);
      if (!session || session.uid !== uidRef.current) return;
      session.activeMs += activeMs;
      session.idleMs += idleMs;
      if (activeMs > 0) session.lastActivityAt = Date.now();
      writeJson(SESSION_KEY, session);
    },
    [ownsClock]
  );

  const handleSessionGap = useCallback(() => {
    const session = readJson(SESSION_KEY);
    if (session && session.uid === uidRef.current) endSession(session);
  }, [endSession]);

  const handleVisibilityChange = useCallback(
    (state) => {
      if (state === 'hidden') releaseClock();
      track(EVENTS.VISIBILITY_CHANGE, { state });
    },
    [releaseClock, track]
  );

  const activity = useActivity({
    enabled,
    onTick: handleTick,
    onIdleStart: () => track(EVENTS.IDLE_START),
    onIdleEnd: () => track(EVENTS.IDLE_END),
    onVisibilityChange: handleVisibilityChange,
    onSessionGap: handleSessionGap,
  });

  // --- Arranque, envío periódico y volcado al cerrar ----------------------

  useEffect(() => {
    if (!enabled) return undefined;

    // Primero recuperar lo que quedó a medias en la carga anterior: ahí está el
    // `lesson_dwell` de la última lección, que es el evento más valioso y el que
    // se pierde siempre si no se hace esto.
    queueRef.current.restore(uid);
    ensureSession();
    queueRef.current.flush();

    const intervalId = setInterval(() => queueRef.current.flush(), FLUSH_INTERVAL_MS);
    const handleHide = () => {
      releaseClock();
      queueRef.current.spill();
    };
    // `pagehide` y no `beforeunload`: es el único que dispara de forma fiable en
    // Safari de iOS, que es donde más se estudia en móvil.
    window.addEventListener('pagehide', handleHide);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('pagehide', handleHide);
      releaseClock();
      queueRef.current.spill();
    };
  }, [enabled, uid, ensureSession, releaseClock]);

  const value = useMemo(
    () => ({
      enabled,
      track,
      readClock: activity.read,
      flush: () => queueRef.current.flush(),
    }),
    [enabled, track, activity.read]
  );

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
}

// Deliberadamente NO lanza si falta el proveedor: devuelve una versión inerte.
// Los componentes instrumentados se renderizan en decenas de tests que no montan
// toda la cadena de proveedores, y ninguna prueba debe fallar por una línea de
// telemetría. Si el proveedor falta en producción, no se captura nada — que es el
// mismo resultado que no haber dado consentimiento.
const INERT = Object.freeze({
  enabled: false,
  track: () => {},
  readClock: () => ({ activeMs: 0, idleMs: 0 }),
  flush: () => Promise.resolve(),
});

export function useAnalytics() {
  return useContext(AnalyticsContext) ?? INERT;
}
