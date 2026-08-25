import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { EVENTS } from '@/analytics/events';

const fetchStudentActivity = vi.fn();
vi.mock('./adminData', () => ({
  fetchStudentActivity: (...a) => fetchStudentActivity(...a),
}));

const loadCourseSchedule = vi.fn();
vi.mock('./courseSchedule', () => ({
  loadCourseSchedule: (...a) => loadCourseSchedule(...a),
}));

// El módulo real hace fetch del toc y lee la configuración del curso.
vi.mock('@/content/config', () => ({
  default: { courseStartDate: '2026-07-27', courseTerm: '262', tocUrl: 'http://x/toc.md' },
}));

const { default: StudentActivityDrawer } = await import('./StudentActivityDrawer');
const { ThemeProvider } = await import('@/theme/ThemeContext');
const { buildSchedule } = await import('./activityCalendar');

const at = (dayKey, h = 10) => {
  const [y, m, d] = dayKey.split('-').map(Number);
  return Date.UTC(y, m - 1, d, h + 5);
};

const student = {
  uid: 'u1',
  fullName: 'Andrés Rivas',
  email: 'arivas@icesi.edu.co',
  githubUsername: 'arivas',
};
const fila = { codigo: 'A00406656', nombre: 'ANDRES FELIPE RIVAS OSPINA' };

const mount = (props = {}) =>
  render(
    <ThemeProvider>
      <StudentActivityDrawer open student={student} fila={fila} onClose={() => {}} {...props} />
    </ThemeProvider>
  );

describe('StudentActivityDrawer', () => {
  beforeEach(() => {
    vi.setSystemTime(new Date(at('2026-08-03', 20)));
    loadCourseSchedule.mockReset().mockResolvedValue(
      buildSchedule([{ type: 'lesson', id: 'l1', label: 'Uno', week: 1 }], '2026-07-27')
    );
    fetchStudentActivity.mockReset().mockResolvedValue({
      docsRead: 12,
      fromCache: false,
      prompts: [],
      batches: [
        {
          events: [
            {
              ts: at('2026-08-01'),
              type: EVENTS.LESSON_DWELL,
              contentId: 'l1',
              payload: { activeMs: 30 * 60_000, maxScrollPct: 80 },
            },
          ],
        },
      ],
    });
  });

  it('muestra al estudiante y los cuatro grupos en las dos ventanas', async () => {
    mount();
    expect(await screen.findByText('ANDRES FELIPE RIVAS OSPINA')).toBeTruthy();
    expect(screen.getByText(/A00406656 · arivas@icesi.edu.co/)).toBeTruthy();
    // Cada título aparece dos veces: el encabezado del bloque y la leyenda de la
    // tabla accesible que acompaña a su gráfica.
    expect(screen.getAllByText(/Últimos 7 días/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Desde el inicio/).length).toBeGreaterThan(0);
    // Un grupo por ventana, así que cada título aparece dos veces.
    expect(screen.getAllByText('Constancia')).toHaveLength(2);
    expect(screen.getAllByText('Al día con el temario')).toHaveLength(2);
    expect(screen.getAllByText('Profundidad de lectura')).toHaveLength(2);
    expect(screen.getAllByText('Práctica y asistente')).toHaveLength(2);
  });

  it('pinta los minutos calculados, no los crudos', async () => {
    mount();
    await screen.findAllByText(/Últimos 7 días/);
    expect(screen.getAllByText('30').length).toBeGreaterThan(0); // 30 min activos
    expect(screen.getAllByText(/de 7$/).length).toBeGreaterThan(0); // días activos
  });

  it('la racha solo sale en la ventana del semestre', async () => {
    mount();
    await screen.findAllByText(/Últimos 7 días/);
    expect(screen.getAllByText('racha')).toHaveLength(1);
  });

  it('no consulta nada mientras está cerrado', () => {
    mount({ open: false });
    expect(fetchStudentActivity).not.toHaveBeenCalled();
  });

  it('sin lotes avisa en vez de pintar gráficas de ceros', async () => {
    fetchStudentActivity.mockResolvedValue({ batches: [], prompts: [], docsRead: 0, fromCache: false });
    mount();
    expect(await screen.findByText(/no aceptó el consentimiento de analítica/i)).toBeTruthy();
    expect(screen.queryByText('Constancia')).toBeNull();
  });

  it('marca a quien nunca activó el asistente, para no leer los ceros como abandono', async () => {
    mount();
    expect(await screen.findByText('No activó el asistente')).toBeTruthy();
  });

  it('traduce el rechazo de Firestore a la causa real: falta el claim', async () => {
    fetchStudentActivity.mockRejectedValue(Object.assign(new Error('nope'), { code: 'permission-denied' }));
    mount();
    await waitFor(() => expect(screen.getByText(/custom claim/i)).toBeTruthy());
  });

  it('si el temario no carga, el panel sigue sirviendo sin el retraso', async () => {
    loadCourseSchedule.mockRejectedValue(new Error('sin red'));
    mount();
    await screen.findAllByText(/Últimos 7 días/);
    expect(screen.getAllByText('retraso medio').length).toBe(2);
    expect(screen.getAllByText('—').length).toBeGreaterThan(0);
  });

  it('dice cuántos documentos costó, para no tener que estimarlo', async () => {
    mount();
    expect(await screen.findByText(/12 documentos leídos/)).toBeTruthy();
  });

  it('declara los sesgos en vez de esconderlos', async () => {
    mount();
    await screen.findAllByText(/Últimos 7 días/);
    expect(screen.getByText(/Hoy sale siempre corto/)).toBeTruthy();
  });
});
