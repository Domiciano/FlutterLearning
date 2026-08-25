// src/admin/adminData.js
//
// Lecturas y escrituras que solo hace el profesor. Todas dependen del custom
// claim `profesor: true` (ver firestore/firestore.rules): sin él, Firestore
// rechaza tanto el barrido de `students` como el documento de la lista.
//
// La lista de clase se guarda en Firestore, no en el bundle ni en el repo de
// contenido, y la razón es concreta: el sitio es público. Nombres y códigos de
// 27 personas dentro del JS servido por GitHub Pages —o en un `raw.github...`—
// quedan al alcance de cualquiera. En `rosters/…` los lee únicamente quien tiene
// el claim.
//
// **Una lista por semestre**: el documento es `rosters/{courseId}-{term}`, p. ej.
// `rosters/compunet2-262`. El curso se repite cada periodo con otra gente, así
// que una sola lista por curso obligaría a pisar la del semestre anterior para
// empezar el siguiente; separadas, las viejas se conservan y la vista deja elegir
// cuál mirar. `rosters/{courseId}` a secas es el documento heredado de antes de
// esta separación, y se lee como una lista "sin semestre".

import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  serverTimestamp,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '@/auth/firebase';
import { courseId } from '@/auth/firebaseConfig';

/** `262` → `compunet2-262`; sin semestre, el id heredado. */
export const rosterDocId = (term) => (term ? `${courseId}-${term}` : courseId);

const rosterRef = (term) => doc(db, 'rosters', rosterDocId(term));

const toRoster = (snap) => {
  const data = snap.data();
  return {
    id: snap.id,
    // El heredado no trae `term`; se deduce del id cuando el id lo lleva.
    term: data.term ?? (snap.id.startsWith(`${courseId}-`) ? snap.id.slice(courseId.length + 1) : ''),
    entries: Array.isArray(data.entries) ? data.entries : [],
    count: data.count ?? (Array.isArray(data.entries) ? data.entries.length : 0),
    label: data.label ?? null,
    updatedAt: data.updatedAt?.toDate?.() ?? null,
  };
};

/** Todos los perfiles del proyecto. Un proyecto Firebase por curso, así que la
 *  colección es del tamaño del curso; el filtro por `courseId` es defensivo. */
export async function fetchStudents() {
  const snap = await getDocs(collection(db, 'students'));
  return snap.docs
    .map((d) => ({ uid: d.id, ...d.data() }))
    .filter((s) => !s.courseId || s.courseId === courseId);
}

/**
 * Las listas de todos los semestres de este curso, sin sus entradas: solo lo que
 * necesita el selector (semestre, cuántos, cuándo se cargó). La colección tiene
 * un documento por semestre —una decena en toda la vida del curso—, así que se
 * lee entera y se filtra en memoria.
 *
 * @returns {{ id, term, count, label, updatedAt }[]} del semestre más reciente al más viejo
 */
export async function listRosters() {
  const snap = await getDocs(collection(db, 'rosters'));
  return snap.docs
    .map(toRoster)
    .filter((r) => r.id === courseId || r.id.startsWith(`${courseId}-`))
    // Sin `entries`: el selector solo necesita el rótulo, y las listas completas
    // de todos los semestres en memoria no las usa nadie.
    .map((r) => ({ id: r.id, term: r.term, count: r.count, label: r.label, updatedAt: r.updatedAt }))
    .sort((a, b) => String(b.term).localeCompare(String(a.term)));
}

/** @returns {{ id, term, entries, count, label, updatedAt }|null} */
export async function fetchRoster(term) {
  const snap = await getDoc(rosterRef(term));
  if (!snap.exists()) return null;
  return toRoster(snap);
}

// --- Actividad de un estudiante ---------------------------------------------
//
// Alimenta el panel de `/admin`. Dos consultas, las dos sobre índices que **ya
// existen** en `firestore.indexes.json` (`eventBatches: uid+serverTs` y
// `prompts: uid+createdAt`): no hay nada que desplegar.
//
// **No añadir `where('courseId','==',…)`**: pediría un índice compuesto de tres
// campos que no existe y la consulta empezaría a fallar en producción con un
// error que además solo aparece con datos reales. Es un proyecto Firebase por
// curso, así que `uid` ya identifica sin ambigüedad.

/** Lo que se ha leído en esta carga de página. Ver por qué a nivel de módulo abajo. */
const activityCache = new Map(); // uid → { at, data }

const ACTIVITY_TTL_MS = 10 * 60_000;

/**
 * Borra la actividad cacheada. Sin `uid`, toda.
 *
 * Está colgado del botón *Recargar* de la vista: es la salida explícita para
 * cuando el profesor sabe que el estudiante acaba de entrar y quiere el dato
 * fresco antes de que expire el TTL.
 */
export function clearStudentActivityCache(uid) {
  if (uid) activityCache.delete(uid);
  else activityCache.clear();
}

/**
 * Lotes de eventos y prompts de un estudiante desde una fecha.
 *
 * Se pide **una sola vez el semestre entero** y las dos ventanas del panel (7
 * días y todo) se recortan en memoria: dos consultas costarían el doble y la
 * corta está contenida en la larga.
 *
 * La caché vive a nivel de módulo y no en un `useRef` del panel a propósito: el
 * `Drawer` se desmonta al cerrarse, que es exactamente lo que pasa cuando el
 * profesor compara dos estudiantes y vuelve al primero. Muere al recargar la
 * página, así que no persiste conducta de nadie en disco.
 *
 * @param {string} uid
 * @param {{ since: Date|number }} opts  inicio del semestre
 * @returns {{ batches, prompts, docsRead: number, fromCache: boolean }}
 */
export async function fetchStudentActivity(uid, { since } = {}) {
  const hit = activityCache.get(uid);
  if (hit && Date.now() - hit.at < ACTIVITY_TTL_MS) {
    return { ...hit.data, fromCache: true };
  }

  const desde = Timestamp.fromDate(since instanceof Date ? since : new Date(since ?? 0));

  const [batchSnap, promptSnap] = await Promise.all([
    getDocs(
      query(
        collection(db, 'eventBatches'),
        where('uid', '==', uid),
        where('serverTs', '>=', desde),
        orderBy('serverTs', 'asc')
      )
    ),
    getDocs(
      query(
        collection(db, 'prompts'),
        where('uid', '==', uid),
        where('createdAt', '>=', desde),
        // DESC para casar exactamente el índice que ya existe; el orden da igual
        // porque el agregador reparte por día.
        orderBy('createdAt', 'desc')
      )
    ),
  ]);

  const batches = batchSnap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      device: data.device ?? null,
      sessionId: data.sessionId ?? null,
      events: Array.isArray(data.events) ? data.events : [],
    };
  });

  // El agregador es puro y no sabe de Timestamps: se normaliza aquí, en el único
  // archivo que ya conoce Firestore.
  const prompts = promptSnap.docs.map((d) => {
    const data = d.data();
    return {
      ts: data.createdAt?.toMillis?.() ?? null,
      conversationId: data.conversationId ?? null,
      contentId: data.contentId ?? null,
    };
  });

  const data = { batches, prompts, docsRead: batchSnap.size + promptSnap.size };
  activityCache.set(uid, { at: Date.now(), data });
  return { ...data, fromCache: false };
}

export async function saveRoster({ term, entries, label, uid }) {
  await setDoc(rosterRef(term), {
    courseId,
    term: term ?? '',
    label: label ?? null,
    // Se normaliza aquí para no guardar campos sueltos que las reglas no esperan.
    entries: entries.map(({ codigo, nombre }) => ({ codigo: codigo ?? '', nombre: nombre ?? '' })),
    count: entries.length,
    updatedAt: serverTimestamp(),
    updatedBy: uid ?? null,
  });
}
