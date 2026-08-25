import { describe, it, expect } from 'vitest';
import {
  dayKeyOf,
  dayKeyToUtcMs,
  addDays,
  daysBetween,
  dayRange,
  plannedDayOf,
  buildSchedule,
} from './activityCalendar';

// Colombia. Todos los casos lo pasan explícito: si algún día un test depende del
// reloj de la máquina, deja de valer nada en CI (que corre en UTC).
const CO = -300;
const START = '2026-07-27'; // lunes de la SEMANA 1 del 2026-2

describe('dayKeyOf', () => {
  it('agrupa por el día local, no por el UTC', () => {
    // 2026-07-28 03:30 UTC son las 22:30 del 27 en Colombia: estudiar de noche no
    // debe partir la sesión en dos días.
    expect(dayKeyOf(Date.UTC(2026, 6, 28, 3, 30), CO)).toBe('2026-07-27');
    // Y las 06:00 UTC ya son la 1 a. m. del mismo 28.
    expect(dayKeyOf(Date.UTC(2026, 6, 28, 6, 0), CO)).toBe('2026-07-28');
  });

  it('sin desplazamiento devuelve el día UTC', () => {
    expect(dayKeyOf(Date.UTC(2026, 6, 28, 3, 30))).toBe('2026-07-28');
  });

  it('rellena mes y día con cero a la izquierda', () => {
    expect(dayKeyOf(Date.UTC(2026, 0, 5, 12), CO)).toBe('2026-01-05');
  });

  it('devuelve null ante una marca de tiempo inválida', () => {
    expect(dayKeyOf(undefined, CO)).toBeNull();
    expect(dayKeyOf('mañana', CO)).toBeNull();
  });
});

describe('dayKeyToUtcMs', () => {
  it('es el inverso de dayKeyOf sin desplazamiento', () => {
    expect(dayKeyOf(dayKeyToUtcMs(START))).toBe(START);
  });

  it('no desplaza el día en máquinas al oeste de Greenwich', () => {
    // La regresión que motiva la función: interpretar '2026-07-27' como medianoche
    // LOCAL daría el 26 en UTC−5 y correría el semestre entero un día.
    const d = new Date(dayKeyToUtcMs(START));
    expect(d.getUTCDate()).toBe(27);
    expect(d.getUTCMonth()).toBe(6);
    expect(d.getUTCHours()).toBe(0);
  });

  it('devuelve NaN si el formato no es AAAA-MM-DD', () => {
    expect(Number.isNaN(dayKeyToUtcMs('27/07/2026'))).toBe(true);
    expect(Number.isNaN(dayKeyToUtcMs(''))).toBe(true);
  });
});

describe('addDays y daysBetween', () => {
  it('suma y resta días cruzando el fin de mes', () => {
    expect(addDays('2026-07-30', 3)).toBe('2026-08-02');
    expect(addDays('2026-08-02', -3)).toBe('2026-07-30');
  });

  it('cruza el fin de año', () => {
    expect(addDays('2026-12-30', 3)).toBe('2027-01-02');
  });

  it('cuenta la distancia con signo, y cero contra sí mismo', () => {
    expect(daysBetween(START, START)).toBe(0);
    expect(daysBetween(START, '2026-08-03')).toBe(7);
    expect(daysBetween('2026-08-03', START)).toBe(-7);
  });
});

describe('dayRange', () => {
  it('incluye los dos extremos', () => {
    expect(dayRange('2026-07-27', '2026-07-30')).toEqual([
      '2026-07-27',
      '2026-07-28',
      '2026-07-29',
      '2026-07-30',
    ]);
  });

  it('un solo día es una ventana de longitud 1', () => {
    expect(dayRange(START, START)).toEqual([START]);
  });

  it('devuelve vacío si el final es anterior al inicio', () => {
    expect(dayRange('2026-07-30', '2026-07-27')).toEqual([]);
  });
});

describe('plannedDayOf', () => {
  it('la semana 1 es el propio inicio del curso', () => {
    expect(plannedDayOf(1, START)).toBe(START);
  });

  it('cada semana son siete días más', () => {
    expect(plannedDayOf(3, START)).toBe('2026-08-10'); // +14 días
  });

  it('sin semana no hay fecha planeada', () => {
    expect(plannedDayOf(null, START)).toBeNull();
    expect(plannedDayOf(0, START)).toBeNull();
    expect(plannedDayOf('SEMANA 2', START)).toBeNull();
  });
});

describe('buildSchedule', () => {
  const sections = [
    { type: 'title', label: 'SEMANA 1 · Intro' },
    { type: 'lesson', id: 'lessonA', label: 'A', week: 1, tocSection: 'SEMANA 1 · Intro' },
    { type: 'lesson', id: 'lessonB', label: 'B', week: 2, tocSection: 'SEMANA 2' },
    { type: 'divider' },
    { type: 'lesson', id: 'lessonExtra', label: 'Anexo', week: null, tocSection: 'Extras' },
  ];

  it('indexa solo las lecciones con semana, y cuenta todas', () => {
    const s = buildSchedule(sections, START);
    expect(s.totalLessons).toBe(3);
    expect(s.scheduledCount).toBe(2);
    expect(s.byId.get('lessonA').plannedDay).toBe(START);
    expect(s.byId.get('lessonB').plannedDay).toBe('2026-08-03');
    // Sin semana no está programada: inventarle fecha metería retraso ficticio.
    expect(s.byId.has('lessonExtra')).toBe(false);
  });

  it('con un id repetido gana la primera aparición', () => {
    const s = buildSchedule(
      [
        { type: 'lesson', id: 'x', label: 'primera', week: 1 },
        { type: 'lesson', id: 'x', label: 'segunda', week: 5 },
      ],
      START
    );
    expect(s.byId.get('x').week).toBe(1);
    expect(s.totalLessons).toBe(2);
  });

  it('no revienta sin secciones', () => {
    const s = buildSchedule([], START);
    expect(s.byId.size).toBe(0);
    expect(s.totalLessons).toBe(0);
    expect(buildSchedule(undefined, START).totalLessons).toBe(0);
  });
});
