// src/admin/courseSchedule.js
//
// El temario que necesita el panel de actividad para saber qué día le tocaba a
// cada lección (H3). Aísla la red igual que `adminData.js` aísla Firestore: es el
// único archivo de `src/admin/` que hace `fetch`.
//
// La promesa se memoiza a nivel de módulo porque el temario no cambia mientras la
// pestaña está abierta, y el profesor va a abrir el panel de veinte estudiantes
// seguidos: descargarlo veinte veces sería gratis en dinero y absurdo igualmente.
//
// `App.jsx` ya descarga este mismo `toc.md` al arrancar, pero `/admin` sale fuera
// de su árbol y no recibe las secciones, así que no hay nada que reutilizar sin
// levantar un contexto nuevo que solo serviría para esto.

import courseConfig from '@/content/config';
import TableOfContentsParser from '@/utils/tableOfContentsParser';
import { buildSchedule } from './activityCalendar';

let pending = null;

/**
 * @returns {Promise<{ byId: Map, totalLessons: number, scheduledCount: number }>}
 */
export function loadCourseSchedule() {
  if (!pending) {
    pending = (async () => {
      const res = await fetch(courseConfig.tocUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status} al cargar toc.md`);
      const sections = TableOfContentsParser(await res.text());
      return buildSchedule(sections, courseConfig.courseStartDate);
    })().catch((err) => {
      // Un fallo no se queda cacheado: si la red falla una vez, el siguiente
      // estudiante que abra el panel tiene que poder volver a intentarlo.
      pending = null;
      throw err;
    });
  }
  return pending;
}

/** Solo para los tests: olvida el temario descargado. */
export function resetCourseSchedule() {
  pending = null;
}

export default loadCourseSchedule;
