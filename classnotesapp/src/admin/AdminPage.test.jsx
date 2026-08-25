import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const authState = { configured: true, isTeacher: true, user: { uid: 'p1' } };
vi.mock('@/auth/AuthContext', () => ({ useAuth: () => authState }));

const fetchStudents = vi.fn();
const fetchRoster = vi.fn();
const listRosters = vi.fn();
const fetchStudentActivity = vi.fn();
const clearStudentActivityCache = vi.fn();
vi.mock('./adminData', () => ({
  fetchStudents: (...a) => fetchStudents(...a),
  fetchRoster: (...a) => fetchRoster(...a),
  listRosters: (...a) => listRosters(...a),
  fetchStudentActivity: (...a) => fetchStudentActivity(...a),
  clearStudentActivityCache: (...a) => clearStudentActivityCache(...a),
  saveRoster: vi.fn(),
}));

// El panel real descarga el toc y consulta Firestore; aquí solo interesa si abre.
vi.mock('./courseSchedule', () => ({ loadCourseSchedule: () => Promise.resolve(null) }));

// El módulo real inicializa Firebase al importarse.
vi.mock('@/auth/firebaseConfig', () => ({ courseId: 'compunet2', isFirebaseConfigured: true }));
vi.mock('@/content/config', () => ({
  default: { courseStartDate: '2026-07-27', courseTerm: '262', tocUrl: 'http://x/toc.md' },
}));

const navigate = vi.fn();
vi.mock('react-router-dom', () => ({ useNavigate: () => navigate }));

const { default: AdminPage } = await import('./AdminPage');
const { ThemeProvider } = await import('@/theme/ThemeContext');

const mount = () => render(<ThemeProvider><AdminPage /></ThemeProvider>);

describe('AdminPage', () => {
  beforeEach(() => {
    Object.assign(authState, { configured: true, isTeacher: true, user: { uid: 'p1' } });
    fetchStudentActivity.mockReset();
    clearStudentActivityCache.mockReset();
    fetchStudents.mockReset().mockResolvedValue([
      { uid: 'u1', codigo: 'A00406656', fullName: 'Andrés Rivas', email: 'arivas@icesi.edu.co', githubUsername: 'arivas', role: 'estudiante' },
      { uid: 'p1', fullName: 'Domiciano Rincón', email: 'domi@icesi.edu.co', role: 'profesor' },
    ]);
    listRosters.mockReset().mockResolvedValue([
      { id: 'compunet2-262', term: '262', count: 2, label: '262.md', updatedAt: new Date(2026, 6, 30) },
      { id: 'compunet2-261', term: '261', count: 1, label: '261.md', updatedAt: new Date(2026, 0, 20) },
    ]);
    fetchRoster.mockReset().mockResolvedValue({
      id: 'compunet2-262',
      term: '262',
      entries: [
        { codigo: 'A00406656', nombre: 'ANDRES FELIPE RIVAS OSPINA' },
        { codigo: 'A00403756', nombre: 'DAYANNA FERNANDEZ NUÑEZ' },
      ],
      label: '262.md',
      updatedAt: new Date(2026, 6, 30),
    });
  });

  it('sin el claim de profesor no consulta nada y explica por qué', async () => {
    authState.isTeacher = false;
    mount();
    expect(await screen.findByText(/solo para el profesor/i)).toBeTruthy();
    expect(fetchStudents).not.toHaveBeenCalled();
  });

  it('cruza la lista con los perfiles y marca a quien no ha ingresado', async () => {
    mount();
    expect(await screen.findByText('ANDRES FELIPE RIVAS OSPINA')).toBeTruthy();
    expect(screen.getByText('arivas@icesi.edu.co')).toBeTruthy();
    expect(screen.getByText('arivas')).toBeTruthy();
    expect(screen.getByText('DAYANNA FERNANDEZ NUÑEZ')).toBeTruthy();
    expect(screen.getByText('Sin ingresar')).toBeTruthy();
    expect(screen.getByText('Registrado')).toBeTruthy();
  });

  it('resume los conteos y saca al profesor a "fuera de la lista"', async () => {
    mount();
    await screen.findByText('ANDRES FELIPE RIVAS OSPINA');
    expect(screen.getByText('2 en lista')).toBeTruthy();
    expect(screen.getByText('1 con cuenta')).toBeTruthy();
    expect(screen.getByText('1 sin ingresar')).toBeTruthy();
    expect(screen.getByText('Fuera de la lista (1)')).toBeTruthy();
    expect(screen.getByText('Domiciano Rincón')).toBeTruthy();
  });

  it('invita a cargar la lista cuando no hay ninguna', async () => {
    listRosters.mockResolvedValue([]);
    fetchRoster.mockResolvedValue(null);
    mount();
    expect(await screen.findByText(/Todavía no hay lista de clase cargada/i)).toBeTruthy();
  });

  it('al pulsar el renglón de quien sí entró, abre su actividad', async () => {
    fetchStudentActivity.mockResolvedValue({ batches: [], prompts: [], docsRead: 0, fromCache: false });
    mount();
    fireEvent.click(await screen.findByText('ANDRES FELIPE RIVAS OSPINA'));
    await waitFor(() => expect(fetchStudentActivity).toHaveBeenCalledWith('u1', expect.anything()));
  });

  it('quien no ha ingresado no tiene actividad que abrir', async () => {
    mount();
    fireEvent.click(await screen.findByText('DAYANNA FERNANDEZ NUÑEZ'));
    expect(fetchStudentActivity).not.toHaveBeenCalled();
  });

  it('las filas de "fuera de la lista" también abren el panel', async () => {
    fetchStudentActivity.mockResolvedValue({ batches: [], prompts: [], docsRead: 0, fromCache: false });
    mount();
    fireEvent.click(await screen.findByText('Domiciano Rincón'));
    await waitFor(() => expect(fetchStudentActivity).toHaveBeenCalledWith('p1', expect.anything()));
  });

  it('un semestre que no es el actual no abre actividad: la ventana no sería la suya', async () => {
    listRosters.mockResolvedValue([
      { id: 'compunet2-261', term: '261', count: 2, label: '261.md', updatedAt: new Date(2026, 0, 20) },
    ]);
    mount();
    fireEvent.click(await screen.findByText('ANDRES FELIPE RIVAS OSPINA'));
    expect(fetchStudentActivity).not.toHaveBeenCalled();
    expect(screen.getAllByLabelText(/solo se puede ver del semestre en curso/i).length).toBeGreaterThan(0);
  });

  it('recargar invalida la actividad cacheada', async () => {
    mount();
    await screen.findByText('ANDRES FELIPE RIVAS OSPINA');
    fireEvent.click(screen.getByRole('button', { name: /recargar/i }));
    expect(clearStudentActivityCache).toHaveBeenCalled();
  });

  it('abre el semestre más reciente y deja elegir los anteriores', async () => {
    mount();
    await screen.findByText('ANDRES FELIPE RIVAS OSPINA');
    expect(fetchRoster).toHaveBeenCalledWith('262');
    expect(screen.getByText(/Estudiantes · semestre 262/)).toBeTruthy();
    expect(screen.getByText('262 · 2 est.')).toBeTruthy();
  });

  it('traduce el rechazo de Firestore a la causa real: falta el claim', async () => {
    fetchStudents.mockRejectedValue(Object.assign(new Error('nope'), { code: 'permission-denied' }));
    mount();
    await waitFor(() => expect(screen.getByText(/custom claim/i)).toBeTruthy());
  });
});
