import { describe, it, expect } from 'vitest';
import { EVENTS, TRYCODE_TAB } from '@/analytics/events';
import { buildSchedule } from './activityCalendar';
import { summarizeStudentActivity, regularidad, rachaActual } from './studentActivity';

// Colombia, y siempre explícito: un test que dependa del TZ de la máquina deja de
// valer nada en CI, que corre en UTC.
const CO = -300;
const START = '2026-07-27'; // lunes de la SEMANA 1

/** Instante de un día local, a la hora local indicada. */
const at = (dayKey, hourLocal = 10) => {
  const [y, m, d] = dayKey.split('-').map(Number);
  return Date.UTC(y, m - 1, d, hourLocal + 5);
};

const ev = (type, ts, extra = {}) => ({
  eventId: `${type}-${ts}`,
  ts,
  type,
  contentId: null,
  subsectionId: null,
  payload: {},
  ...extra,
});

const dwell = (dayKey, activeMs, extra = {}) => {
  // El payload se mezcla al final a propósito: un `...extra` posterior lo pisaría
  // entero y dejaría el evento sin `activeMs`.
  const { payload = {}, ...resto } = extra;
  return ev(EVENTS.LESSON_DWELL, at(dayKey), { ...resto, payload: { activeMs, ...payload } });
};

const lote = (...events) => ({ uid: 'u1', events });

const MIN = 60_000;

const schedule = buildSchedule(
  [
    { type: 'lesson', id: 'l1', label: 'Uno', week: 1 },
    { type: 'lesson', id: 'l2', label: 'Dos', week: 2 },
    { type: 'lesson', id: 'extra', label: 'Anexo', week: null },
  ],
  START
);

const resumir = (batches, opts = {}) =>
  summarizeStudentActivity({
    batches,
    schedule,
    courseStartDate: START,
    now: at('2026-08-03', 12), // lunes de la semana 2
    tzOffsetMin: CO,
    ...opts,
  });

describe('serie diaria de minutos activos', () => {
  it('suma los lesson_dwell del mismo día', () => {
    const r = resumir([lote(dwell('2026-07-29', 10 * MIN), dwell('2026-07-29', 5 * MIN))]);
    const dia = r.semestre.dias.find((d) => d.day === '2026-07-29');
    expect(dia.minutos).toBe(15);
    expect(r.semestre.constancia.minutosActivos).toBe(15);
  });

  it('NO suma session_end: es el acumulado de la sesión y duplicaría', () => {
    const r = resumir([
      lote(
        dwell('2026-07-29', 10 * MIN),
        ev(EVENTS.SESSION_END, at('2026-07-29'), { payload: { activeMs: 10 * MIN, idleMs: 0 } })
      ),
    ]);
    expect(r.semestre.constancia.minutosActivos).toBe(10);
  });

  it('agrupa por el día local: estudiar a las 11 de la noche no cuenta como el día siguiente', () => {
    // 23:30 local del 29 = 04:30 UTC del 30.
    const r = resumir([lote(ev(EVENTS.LESSON_DWELL, at('2026-07-29', 23.5), { payload: { activeMs: 8 * MIN } }))]);
    expect(r.semestre.dias.find((d) => d.day === '2026-07-29').minutos).toBe(8);
    expect(r.semestre.dias.find((d) => d.day === '2026-07-30').minutos).toBe(0);
  });

  it('la ventana incluye los días sin actividad', () => {
    const r = resumir([lote(dwell('2026-07-29', 10 * MIN))]);
    expect(r.semestre.dias).toHaveLength(8); // 27 jul → 3 ago
    expect(r.semana.dias).toHaveLength(7); // 28 jul → 3 ago
    expect(r.semestre.dias.filter((d) => d.minutos === 0)).toHaveLength(7);
  });

  it('deja fuera los eventos anteriores al inicio del semestre', () => {
    // Un lote volcado a localStorage puede llegar con ts viejo y serverTs nuevo.
    const r = resumir([lote(dwell('2026-07-20', 30 * MIN), dwell('2026-07-29', 5 * MIN))]);
    expect(r.semestre.constancia.minutosActivos).toBe(5);
  });
});

describe('días activos y racha', () => {
  it('un rato de 40 s no hace día activo; 3 min sí', () => {
    const r = resumir([lote(dwell('2026-07-28', 40_000), dwell('2026-07-29', 3 * MIN))]);
    expect(r.semestre.constancia.diasActivos).toBe(1);
    expect(r.semestre.dias.find((d) => d.day === '2026-07-28').activo).toBe(false);
  });

  it('activeMs ausente o cero no crea día activo ni rompe', () => {
    const r = resumir([
      lote(ev(EVENTS.LESSON_DWELL, at('2026-07-28')), dwell('2026-07-29', 0)),
    ]);
    expect(r.semestre.constancia.minutosActivos).toBe(0);
    expect(r.semestre.constancia.diasActivos).toBe(0);
    expect(r.semestre.constancia.mediaPorDiaActivo).toBeNull();
  });

  it('cuenta tres días seguidos que terminan ayer', () => {
    const r = resumir([
      lote(dwell('2026-07-31', 10 * MIN), dwell('2026-08-01', 10 * MIN), dwell('2026-08-02', 10 * MIN)),
    ]);
    expect(r.semestre.constancia.racha).toBe(3);
  });

  it('incluye hoy cuando hoy es activo', () => {
    const r = resumir([lote(dwell('2026-08-02', 10 * MIN), dwell('2026-08-03', 10 * MIN))]);
    expect(r.semestre.constancia.racha).toBe(2);
  });

  it('un día de hueco corta la racha', () => {
    const r = resumir([
      lote(dwell('2026-07-30', 10 * MIN), dwell('2026-08-01', 10 * MIN), dwell('2026-08-02', 10 * MIN)),
    ]);
    expect(r.semestre.constancia.racha).toBe(2);
  });

  it('sin actividad reciente la racha es 0', () => {
    const r = resumir([lote(dwell('2026-07-28', 10 * MIN))]);
    expect(r.semestre.constancia.racha).toBe(0);
  });

  it('rachaActual arranca en ayer cuando hoy está vacío', () => {
    const activos = new Map([
      ['2026-08-01', true],
      ['2026-08-02', true],
      ['2026-08-03', false],
    ]);
    expect(rachaActual(activos, '2026-08-03')).toBe(2);
  });

  it('la ventana corta no muestra racha: sería el mismo número recortado a 7', () => {
    const r = resumir([lote(dwell('2026-08-03', 10 * MIN))]);
    expect(r.semana.constancia.racha).toBeNull();
  });
});

describe('regularidad (entropía normalizada, H1)', () => {
  it('siete días iguales es reparto perfecto', () => {
    expect(regularidad([10, 10, 10, 10, 10, 10, 10])).toBeCloseTo(1, 10);
  });

  it('todo en un día es cero', () => {
    expect(regularidad([0, 0, 70, 0, 0, 0, 0])).toBe(0);
  });

  it('el denominador son los días de la ventana, no los días activos', () => {
    // La regresión: con dos días iguales de siete, quien estudió dos días no puede
    // salir tan regular como quien estudió los siete.
    expect(regularidad([35, 0, 0, 35, 0, 0, 0])).toBeCloseTo(Math.LN2 / Math.log(7), 10);
    expect(regularidad([35, 0, 0, 35, 0, 0, 0])).toBeLessThan(0.4);
  });

  it('sin tiempo alguno no está definida', () => {
    expect(regularidad([0, 0, 0])).toBeNull();
  });

  it('con un solo día no está definida (ln 1 = 0)', () => {
    expect(regularidad([42])).toBeNull();
    expect(regularidad([])).toBeNull();
  });
});

describe('temario (H3)', () => {
  const abrir = (dayKey, contentId) => ev(EVENTS.LESSON_OPEN, at(dayKey), { contentId, payload: { origin: 'drawer' } });

  it('abrir la lección el lunes de su semana es retraso cero', () => {
    const r = resumir([lote(abrir('2026-07-27', 'l1'))]);
    expect(r.semestre.temario.retrasoMedio).toBe(0);
  });

  it('mide los días desde el lunes de la semana programada', () => {
    // l2 es de la semana 2 → planeada el 3 de agosto; abierta el 29 de julio.
    const r = resumir([lote(abrir('2026-07-29', 'l2'))]);
    expect(r.semestre.temario.retrasoMedio).toBe(-5); // cinco días por delante
  });

  it('promedia varias lecciones', () => {
    const r = resumir([lote(abrir('2026-07-29', 'l1'), abrir('2026-08-03', 'l2'))]);
    expect(r.semestre.temario.retrasoMedio).toBe(1); // (+2 y 0) / 2
  });

  it('una lección sin semana en el toc queda fuera del promedio', () => {
    const r = resumir([lote(abrir('2026-08-03', 'extra'))]);
    expect(r.semestre.temario.retrasoMedio).toBeNull();
    expect(r.semestre.temario.leccionesConRetraso).toBe(0);
  });

  it('toma la PRIMERA visita, no la última', () => {
    const r = resumir([lote(abrir('2026-08-02', 'l1'), abrir('2026-07-28', 'l1'))]);
    expect(r.semestre.temario.retrasoMedio).toBe(1);
  });

  it('un lesson_dwell sirve de respaldo si el lesson_open se perdió', () => {
    const r = resumir([lote(dwell('2026-07-28', 5 * MIN, { contentId: 'l1' }))]);
    expect(r.semestre.temario.retrasoMedio).toBe(1);
  });

  it('la cobertura cuenta las vencidas, visitadas o no', () => {
    const r = resumir([lote(abrir('2026-07-29', 'l1'))]);
    // Hoy es el 3 de agosto: l1 (sem 1) y l2 (sem 2, planeada hoy) están vencidas.
    expect(r.semestre.temario.cobertura).toEqual({ vencidas: 2, vistas: 1 });
  });

  it('no cuenta como vencida una lección que aún no toca', () => {
    const r = summarizeStudentActivity({
      batches: [lote(abrir('2026-07-29', 'l1'))],
      schedule,
      courseStartDate: START,
      now: at('2026-07-29', 12), // antes de que llegue la semana 2
      tzOffsetMin: CO,
    });
    expect(r.semestre.temario.cobertura).toEqual({ vencidas: 1, vistas: 1 });
  });

  it('la ventana corta solo mira las lecciones estrenadas esos días', () => {
    const r = resumir([lote(abrir('2026-07-27', 'l1'), abrir('2026-08-03', 'l2'))]);
    expect(r.semana.temario.nuevas).toBe(1);
    expect(r.semana.temario.retrasoMedio).toBe(0); // solo l2
    expect(r.semana.temario.cobertura).toBeNull(); // acumulada: no aplica a 7 días
  });
});

describe('profundidad de lectura', () => {
  const conScroll = (dayKey, contentId, pct, activeMs = 5 * MIN) =>
    dwell(dayKey, activeMs, { contentId, payload: { maxScrollPct: pct } });

  it('el scroll de una lección es el máximo entre sus visitas, no la media', () => {
    // Quien vuelve a mirar el principio no debe salir peor que quien no volvió.
    const r = resumir([lote(conScroll('2026-07-28', 'l1', 90), conScroll('2026-07-30', 'l1', 10))]);
    expect(r.semestre.lectura.scrollMedio).toBe(90);
    expect(r.semestre.lectura.leccionesAbiertas).toBe(1);
  });

  it('promedia entre lecciones distintas', () => {
    const r = resumir([lote(conScroll('2026-07-28', 'l1', 100), conScroll('2026-07-28', 'l2', 50))]);
    expect(r.semestre.lectura.scrollMedio).toBe(75);
  });

  it('cuenta abandonada la que no pasa del 50 % tras al menos 15 s', () => {
    const r = resumir([lote(conScroll('2026-07-28', 'l1', 30, 20_000))]);
    expect(r.semestre.lectura.abandonadas).toBe(1);
  });

  it('un rebote de 5 s no es un abandono, es un clic equivocado', () => {
    const r = resumir([lote(conScroll('2026-07-28', 'l1', 30, 5_000))]);
    expect(r.semestre.lectura.abandonadas).toBe(0);
  });

  it('marcar y desmarcar la misma lección no deja ninguna marcada', () => {
    const r = resumir([
      lote(
        ev(EVENTS.LESSON_MARKED_STUDIED, at('2026-07-28', 10), { contentId: 'l1' }),
        ev(EVENTS.LESSON_UNMARKED_STUDIED, at('2026-07-28', 11), { contentId: 'l1' })
      ),
    ]);
    expect(r.semestre.lectura.marcadas).toBe(0);
  });

  it('desmarcar y volver a marcar sí la deja marcada', () => {
    const r = resumir([
      lote(
        ev(EVENTS.LESSON_UNMARKED_STUDIED, at('2026-07-28', 10), { contentId: 'l1' }),
        ev(EVENTS.LESSON_MARKED_STUDIED, at('2026-07-28', 11), { contentId: 'l1' })
      ),
    ]);
    expect(r.semestre.lectura.marcadas).toBe(1);
  });

  it('lleva el total de lecciones del temario como denominador', () => {
    const r = resumir([lote(conScroll('2026-07-28', 'l1', 80))]);
    expect(r.semestre.lectura.totalLecciones).toBe(3);
  });
});

describe('práctica y uso de la IA', () => {
  it('suma ejecuciones de trycode y DartPad, y guarda el desglose', () => {
    const r = resumir([
      lote(
        ev(EVENTS.TRYCODE_TAB_SWITCH, at('2026-07-28'), { payload: { to: TRYCODE_TAB.RUN } }),
        ev(EVENTS.TRYCODE_TAB_SWITCH, at('2026-07-28'), { payload: { to: TRYCODE_TAB.CODE } }),
        ev(EVENTS.DARTPAD_OPEN, at('2026-07-28'), { payload: { gistId: 'g1' } })
      ),
    ]);
    expect(r.semestre.practica.ejecuciones).toBe(2); // volver a la pestaña de código no es ejecutar
    expect(r.semestre.practica.trycodeRun).toBe(1);
    expect(r.semestre.practica.dartpadOpens).toBe(1);
  });

  it('separa lo copiado del material de lo copiado a la IA', () => {
    const r = resumir([
      lote(
        ev(EVENTS.CODE_COPY, at('2026-07-28'), { payload: { lines: 4, source: 'lesson' } }),
        ev(EVENTS.CODE_COPY, at('2026-07-28'), { payload: { lines: 9, source: 'ai-response' } })
      ),
    ]);
    expect(r.semestre.practica.copias).toBe(2);
    expect(r.semestre.practica.copiasIa).toBe(1);
  });

  it('cuenta prompts y conversaciones distintas', () => {
    const prompts = [
      { ts: at('2026-07-28'), conversationId: 'c1' },
      { ts: at('2026-07-28'), conversationId: 'c1' },
      { ts: at('2026-07-30'), conversationId: 'c2' },
    ];
    const r = resumir([lote(dwell('2026-07-28', MIN))], { prompts });
    expect(r.semestre.practica.prompts).toBe(3);
    expect(r.semestre.practica.conversaciones).toBe(2);
    expect(r.semestre.practica.turnosPorConversacion).toBe(1.5);
  });

  it('marca que nunca activó el asistente, para no leer los ceros como abandono', () => {
    expect(resumir([lote(dwell('2026-07-28', MIN))]).asistenteNoActivado).toBe(true);
    const conClave = resumir([lote(ev(EVENTS.AI_KEY_CONNECTED, at('2026-07-28')))]);
    expect(conClave.asistenteNoActivado).toBe(false);
  });
});

describe('las dos ventanas', () => {
  it('todo total de 7 días es menor o igual que el del semestre', () => {
    const r = resumir([
      lote(
        dwell('2026-07-27', 30 * MIN, { contentId: 'l1', payload: { maxScrollPct: 80 } }),
        dwell('2026-08-02', 10 * MIN, { contentId: 'l2', payload: { maxScrollPct: 40 } }),
        ev(EVENTS.CODE_COPY, at('2026-07-27'), { payload: { source: 'lesson' } })
      ),
    ]);
    expect(r.semana.constancia.minutosActivos).toBeLessThan(r.semestre.constancia.minutosActivos);
    expect(r.semana.lectura.leccionesAbiertas).toBeLessThan(r.semestre.lectura.leccionesAbiertas);
    expect(r.semana.practica.copias).toBeLessThan(r.semestre.practica.copias);
  });

  it('la ventana corta empieza seis días antes de hoy', () => {
    const r = resumir([]);
    expect(r.semana.desde).toBe('2026-07-28');
    expect(r.semana.hasta).toBe('2026-08-03');
    expect(r.hoy).toBe('2026-08-03');
  });
});

describe('sin datos', () => {
  it('no devuelve ceros cuando no hay ni un evento', () => {
    const r = resumir([]);
    expect(r.sinDatos).toBe(true);
    expect(r.semestre.constancia.mediaPorDiaActivo).toBeNull();
    expect(r.semestre.constancia.regularidad).toBeNull();
    expect(r.semestre.lectura.scrollMedio).toBeNull();
    expect(r.semestre.temario.retrasoMedio).toBeNull();
  });

  it('un lote vacío o malformado no revienta', () => {
    expect(resumir([{ events: [] }, {}, null]).sinDatos).toBe(true);
    expect(summarizeStudentActivity().sinDatos).toBe(true);
  });

  it('con eventos, sinDatos es falso aunque no sean de lectura', () => {
    expect(resumir([lote(ev(EVENTS.THEME_TOGGLE, at('2026-07-28')))]).sinDatos).toBe(false);
  });
});
