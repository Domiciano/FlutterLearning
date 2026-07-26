// src/analytics/eventQueue.js
//
// Cola de eventos con agrupación en lotes. Recibe `commit` por parámetro y no
// conoce Firestore, así que todo lo delicado —umbral de lote, reintento con
// espera, volcado al cerrar la pestaña, descarte de eventos de otro usuario— se
// prueba sin tocar Firebase.
//
// Por qué en lotes y no un documento por evento: `features.md` § F1, "Presupuesto
// de escrituras". Resumen: un documento por evento supera las 20 000 escrituras
// diarias del plan gratuito justo en la semana de parciales.
//
// Cada elemento de la cola es { env, ev }:
//   env  envolvente constante de la sesión (uid, courseId, sessionId, device…)
//   ev   el evento en sí (eventId, ts, type, contentId, subsectionId, payload)
// El envolvente se repite en memoria pero sube una sola vez al documento del lote.

export const BATCH_SIZE = 20;
export const FLUSH_INTERVAL_MS = 30_000;
export const MAX_EVENTS_PER_DOC = 20;
export const MAX_QUEUE = 1_000;
export const MAX_RETRY_WAIT_MS = 5 * 60_000;
export const SPILL_KEY = 'analytics.spill';

export function createEventQueue({
  commit,
  storage = globalThis.localStorage,
  now = () => Date.now(),
  batchSize = BATCH_SIZE,
  maxQueue = MAX_QUEUE,
  maxEventsPerDoc = MAX_EVENTS_PER_DOC,
  onError = () => {},
}) {
  let queue = [];
  let flushing = false;
  let failures = 0;
  let retryAfter = 0;

  // El lote no puede mezclar usuarios ni sesiones: el envolvente sube al documento
  // y dejaría de describir a sus eventos.
  const groupKey = (env) => `${env.uid}::${env.sessionId}`;

  const flush = async () => {
    if (flushing || queue.length === 0 || now() < retryAfter) return;
    flushing = true;

    const pending = queue;
    queue = [];

    const groups = new Map();
    for (const item of pending) {
      const key = groupKey(item.env);
      if (!groups.has(key)) groups.set(key, { env: item.env, events: [] });
      groups.get(key).events.push(item.ev);
    }

    const failed = [];
    for (const { env, events } of groups.values()) {
      for (let i = 0; i < events.length; i += maxEventsPerDoc) {
        const slice = events.slice(i, i + maxEventsPerDoc);
        try {
          await commit({ env, events: slice });
        } catch (err) {
          onError(err);
          for (const ev of slice) failed.push({ env, ev });
        }
      }
    }

    if (failed.length > 0) {
      // Devolver al frente: lo que falló es más viejo que lo que entró mientras
      // se enviaba. Y esperar antes de reintentar, o un Firestore caído se
      // convierte en un bucle de escrituras.
      queue = failed.concat(queue);
      failures += 1;
      retryAfter = now() + Math.min(FLUSH_INTERVAL_MS * 2 ** (failures - 1), MAX_RETRY_WAIT_MS);
    } else {
      failures = 0;
      retryAfter = 0;
    }

    flushing = false;
  };

  const push = (item) => {
    queue.push(item);
    if (queue.length > maxQueue) {
      const dropped = queue.splice(0, queue.length - maxQueue).length;
      onError(new Error(`Cola de analítica llena: se descartaron ${dropped} eventos antiguos`));
    }
    if (queue.length >= batchSize) return flush();
    return Promise.resolve();
  };

  // Al cerrar la pestaña, Firestore no garantiza completar la escritura. Se vuelca
  // la cola a localStorage y se recupera en la siguiente carga; sin esto se pierde
  // sistemáticamente el último evento de cada sesión, que es `lesson_dwell`.
  const spill = () => {
    if (queue.length === 0) return 0;
    try {
      storage.setItem(SPILL_KEY, JSON.stringify(queue));
      return queue.length;
    } catch (err) {
      onError(err);
      return 0;
    }
  };

  const restore = (uid) => {
    let raw = null;
    try {
      raw = storage.getItem(SPILL_KEY);
    } catch (err) {
      onError(err);
      return 0;
    }
    if (!raw) return 0;

    try {
      storage.removeItem(SPILL_KEY);
    } catch {
      // Si no se puede borrar, seguir: peor es no recuperar nada.
    }

    let items;
    try {
      items = JSON.parse(raw);
    } catch (err) {
      onError(err);
      return 0;
    }
    if (!Array.isArray(items)) return 0;

    // En un computador compartido, la cola volcada puede ser de otro estudiante.
    // Las reglas de seguridad rechazarían esa escritura para siempre y la cola
    // entraría en un bucle de reintentos, así que se descarta aquí.
    const mine = items.filter((item) => item?.env?.uid === uid && item?.ev);
    const alien = items.length - mine.length;
    if (alien > 0) {
      onError(new Error(`Cola recuperada: se descartaron ${alien} eventos de otro usuario`));
    }

    queue = mine.concat(queue);
    return mine.length;
  };

  return {
    push,
    flush,
    spill,
    restore,
    size: () => queue.length,
    pending: () => queue.slice(),
  };
}
