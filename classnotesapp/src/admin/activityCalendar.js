// src/admin/activityCalendar.js
//
// El calendario del panel de actividad: convertir instantes en días, listar los
// días de una ventana, y decir qué día le tocaba a cada lección del temario.
//
// Está aparte y es puro porque es donde se esconden los errores de un carácter
// que desplazan un semestre entero, y porque así se prueba sin Firestore, sin
// React y —sobre todo— sin depender de la zona horaria de la máquina que corre
// los tests (vitest en CI corre en UTC; el profesor, en UTC−5).
//
// ## El día es el del navegador del profesor, y es una decisión
//
// Los eventos traen `ts` en epoch ms del reloj del estudiante, y el lote guarda
// su `tzOffset`. Aun así los días se agrupan en la hora local de quien mira el
// panel: profesor y estudiantes están en Colombia, así que coinciden, y usar el
// huso de cada lote mezclaría dos calendarios en la misma serie —una barra de
// "martes" que para unos eventos empieza a medianoche y para otros a las 2 a. m.
// se lee peor de lo que corrige—. Colombia además no tiene horario de verano, así
// que no hay días de 23 ni de 25 horas y la aritmética es la trivial.
//
// El desplazamiento entra siempre como parámetro explícito, nunca leyéndolo del
// reloj del proceso, para que un test no cambie de resultado según dónde corra.

/** Minutos que hay que sumarle a UTC para obtener la hora local. Colombia: −300. */
export const localTzOffsetMinutes = () => -new Date().getTimezoneOffset();

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const DIAS_SEMANA = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];

/**
 * `2026-07-29` → `29 jul`.
 *
 * Rotular va aquí, con el resto del calendario, y no en el componente: es la
 * misma aritmética de fechas y tiene la misma trampa — pasar la cadena por
 * `new Date` la reinterpretaría según el huso del proceso.
 */
export const etiquetaCorta = (dayKey) => {
  const [, m, d] = String(dayKey ?? '').split('-');
  if (!m || !d) return '';
  return `${Number(d)} ${MESES[Number(m) - 1] ?? ''}`.trim();
};

/** Día de la semana de un `AAAA-MM-DD`, leído en UTC para no depender del huso. */
export const diaSemana = (dayKey) => {
  const ms = dayKeyToUtcMs(dayKey);
  return Number.isNaN(ms) ? '' : DIAS_SEMANA[new Date(ms).getUTCDay()];
};

const MS_PER_DAY = 86_400_000;
const pad = (n) => String(n).padStart(2, '0');

/**
 * Instante → día `AAAA-MM-DD` en la hora local indicada.
 *
 * El truco es desplazar el instante y leerlo con los getters **UTC**: así el
 * resultado no depende del huso del proceso.
 */
export function dayKeyOf(ts, tzOffsetMinutes = 0) {
  const shifted = new Date(Number(ts) + tzOffsetMinutes * 60_000);
  if (Number.isNaN(shifted.getTime())) return null;
  return `${shifted.getUTCFullYear()}-${pad(shifted.getUTCMonth() + 1)}-${pad(shifted.getUTCDate())}`;
}

/**
 * `AAAA-MM-DD` → epoch ms de su medianoche **en UTC**.
 *
 * Es el inverso de `dayKeyOf` y toda la aritmética de días pasa por aquí. Ojo con
 * la trampa que motiva esta función: `new Date('2026-07-27')` sí devuelve
 * medianoche UTC, pero `new Date('2026-07-27T00:00')` devuelve medianoche *local*
 * y `new Date(2026, 6, 27)` también — mezclar las tres formas desplaza el
 * semestre un día en las máquinas al oeste de Greenwich. Aquí solo hay una.
 */
export function dayKeyToUtcMs(dayKey) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dayKey ?? ''));
  if (!m) return NaN;
  return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

/** Suma días (puede ser negativo) a un `AAAA-MM-DD` y devuelve otro. */
export function addDays(dayKey, days) {
  const ms = dayKeyToUtcMs(dayKey);
  if (Number.isNaN(ms)) return null;
  return dayKeyOf(ms + days * MS_PER_DAY, 0);
}

/** Días de `desde` a `hasta`, con signo. `daysBetween(d, d) === 0`. */
export function daysBetween(desde, hasta) {
  const a = dayKeyToUtcMs(desde);
  const b = dayKeyToUtcMs(hasta);
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return Math.round((b - a) / MS_PER_DAY);
}

/**
 * Todos los días de la ventana, **inclusivos por los dos extremos**.
 *
 * Que incluya los días sin actividad no es un detalle: la gráfica los dibuja como
 * franja base y la entropía de regularidad los cuenta en su denominador. Una
 * serie que solo trae los días activos hace que quien estudió dos días parezca
 * tan regular como quien estudió siete.
 */
export function dayRange(desde, hasta) {
  const total = daysBetween(desde, hasta);
  if (total === null || total < 0) return [];
  const out = [];
  for (let i = 0; i <= total; i += 1) out.push(addDays(desde, i));
  return out;
}

/**
 * Día en que estaba programada una lección de la semana `week`.
 *
 * `courseStartDate` es el **lunes** de la semana 1, así que esto devuelve el lunes
 * de la semana `week`. Quien abre su lección el jueves sale con tres días de
 * "retraso" aunque vaya perfectamente al día: la fórmula es la que fija H3 en
 * `analitics/datadict.md` y no se toca aquí; el matiz se explica en el rótulo de
 * la vista.
 */
export function plannedDayOf(week, courseStartDate) {
  const n = Number(week);
  if (!Number.isFinite(n) || n < 1) return null;
  return addDays(courseStartDate, (n - 1) * 7);
}

/**
 * Secciones del `toc.md` → temario indexado por id de lección.
 *
 * Solo entran las lecciones con `week`: las secciones sin semana (*Curso*,
 * *Extras*, los anexos) no están programadas, y darles una fecha inventada
 * metería retrasos ficticios en el promedio de H3. Se devuelven aparte para poder
 * decir "abrió 12 de 68 lecciones" con el total de verdad.
 *
 * @param {{type:string,id:string,label:string,week:number|null,tocSection:string}[]} sections
 * @returns {{ byId: Map<string,{id,label,week,tocSection,plannedDay}>, totalLessons: number, scheduledCount: number }}
 */
export function buildSchedule(sections = [], courseStartDate) {
  const byId = new Map();
  let totalLessons = 0;

  for (const s of sections) {
    if (!s || s.type !== 'lesson' || !s.id) continue;
    totalLessons += 1;

    const plannedDay = plannedDayOf(s.week, courseStartDate);
    if (plannedDay === null) continue;
    // Un id repetido en dos entradas ya lo avisa el parser; aquí gana la primera
    // aparición con semana, que es la que el estudiante encontró navegando.
    if (byId.has(s.id)) continue;

    byId.set(s.id, {
      id: s.id,
      label: s.label ?? '',
      week: Number(s.week),
      tocSection: s.tocSection ?? '',
      plannedDay,
    });
  }

  return { byId, totalLessons, scheduledCount: byId.size };
}

export default dayKeyOf;
