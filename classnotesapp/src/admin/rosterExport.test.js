import { describe, it, expect } from 'vitest';
import { matchRoster } from './matchRoster';
import { buildRosterMarkdown, rosterFileName } from './rosterExport';
import { parseRosterMarkdown } from './rosterParser';

const roster = [
  { codigo: 'A00406656', nombre: 'ANDRES FELIPE RIVAS OSPINA' },
  { codigo: 'A00403756', nombre: 'DAYANNA FERNANDEZ NUÑEZ' },
];

const students = [
  {
    uid: 'u1',
    codigo: 'A00406656',
    fullName: 'Andrés Rivas',
    email: 'arivas@icesi.edu.co',
    githubUsername: 'arivas',
    role: 'estudiante',
  },
  { uid: 'p1', fullName: 'Domiciano Rincón', email: 'domi@icesi.edu.co', role: 'profesor' },
];

const build = () =>
  buildRosterMarkdown({
    courseName: 'Computación en Internet II',
    roll: matchRoster({ roster, students }),
    generatedAt: new Date(2026, 6, 30, 9, 5),
    rosterLabel: '262.md',
  });

describe('buildRosterMarkdown', () => {
  it('incluye correo y GitHub de quien ya ingresó', () => {
    const md = build();
    expect(md).toContain('| A00406656 | ANDRES FELIPE RIVAS OSPINA | arivas@icesi.edu.co | arivas |');
    expect(md).toContain('Registrado |');
  });

  it('lista aparte a quien no ha ingresado', () => {
    const md = build();
    expect(md).toContain('## Sin ingresar (1)');
    expect(md).toContain('- A00403756 — DAYANNA FERNANDEZ NUÑEZ');
  });

  it('lista aparte a quien no está en el roster', () => {
    const md = build();
    expect(md).toContain('## Fuera de la lista (1)');
    expect(md).toContain('Domiciano Rincón');
  });

  it('pone el encabezado con la fecha y los conteos', () => {
    const md = build();
    expect(md).toContain('# Lista de estudiantes — Computación en Internet II');
    expect(md).toContain('2026-07-30 09:05');
    expect(md).toContain('`262.md`');
    expect(md).toContain('2 en lista · 1 con cuenta · 1 sin ingresar');
  });

  it('deriva el usuario de GitHub de la URL cuando no hay handle', () => {
    const md = buildRosterMarkdown({
      courseName: 'X',
      roll: matchRoster({
        roster: [roster[0]],
        students: [{ uid: 'u1', codigo: 'A00406656', github: 'https://github.com/pepito' }],
      }),
    });
    expect(md).toContain('| pepito |');
  });

  it('escapa las barras para no partir la tabla', () => {
    const md = buildRosterMarkdown({
      courseName: 'X',
      roll: matchRoster({ roster: [{ codigo: 'A1', nombre: 'ANA | GOMEZ' }], students: [] }),
    });
    expect(md).toContain('ANA \\| GOMEZ');
  });

  it('el .md exportado se vuelve a leer como lista de clase', () => {
    const reparsed = parseRosterMarkdown(build());
    expect(reparsed.map((e) => e.codigo)).toEqual(['A00406656', 'A00403756']);
    expect(reparsed).toHaveLength(2); // la tabla de extras no aporta códigos falsos
  });
});

describe('rosterFileName', () => {
  it('lleva curso y fecha', () => {
    expect(rosterFileName('compunet2', new Date(2026, 6, 5))).toBe('estudiantes-compunet2-2026-07-05.md');
  });
});
