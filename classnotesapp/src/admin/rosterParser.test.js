import { describe, it, expect } from 'vitest';
import {
  parseRosterMarkdown,
  parseTermFromFileName,
  normalizeCodigo,
  normalizeName,
  nameSetKey,
} from './rosterParser';

const PLANO = `A00406656 ANDRES FELIPE RIVAS OSPINA
A00403756 DAYANNA FERNANDEZ NUÑEZ
A00404256 XILENA VIDAL RAMIREZ`;

const SAMPLE = `| Código | Nombre |
|---------|---------|
| A00406656 | ANDRES FELIPE RIVAS OSPINA |
| A00403756 | DAYANNA FERNANDEZ NUÑEZ |
| A00404256 | XILENA VIDAL RAMIREZ |`;

describe('parseRosterMarkdown — formato plano', () => {
  it('lee una persona por línea: código, espacio, nombre completo', () => {
    expect(parseRosterMarkdown(PLANO)).toEqual([
      { codigo: 'A00406656', nombre: 'ANDRES FELIPE RIVAS OSPINA' },
      { codigo: 'A00403756', nombre: 'DAYANNA FERNANDEZ NUÑEZ' },
      { codigo: 'A00404256', nombre: 'XILENA VIDAL RAMIREZ' },
    ]);
  });

  it('no toma por estudiante un título ni una nota suelta', () => {
    const md = `# Lista 2026-2\n\nSección 1, salón 4.\n\n${PLANO}\n\nFin.`;
    expect(parseRosterMarkdown(md)).toHaveLength(3);
  });

  it('no cuenta dos veces al mismo código', () => {
    expect(parseRosterMarkdown(`${PLANO}\nA00406656 ANDRES FELIPE RIVAS OSPINA`)).toHaveLength(3);
  });

  it('acepta el archivo plano y una tabla pegada en el mismo archivo', () => {
    expect(parseRosterMarkdown(`${PLANO}\n\n| A00408095 | HAROLD ARIAS |`)).toHaveLength(4);
  });
});

describe('parseTermFromFileName', () => {
  it('saca el semestre del nombre del archivo', () => {
    expect(parseTermFromFileName('262.md')).toBe('262');
    expect(parseTermFromFileName('students/262.md')).toBe('262');
    expect(parseTermFromFileName('lista-262.md')).toBe('262');
    expect(parseTermFromFileName('2026-2.md')).toBe('2026-2');
  });

  it('devuelve vacío cuando el nombre no dice el semestre', () => {
    expect(parseTermFromFileName('lista.md')).toBe('');
    expect(parseTermFromFileName('')).toBe('');
  });
});

describe('parseRosterMarkdown — tabla (formato anterior)', () => {
  it('lee la tabla de la universidad sin el encabezado ni el separador', () => {
    expect(parseRosterMarkdown(SAMPLE)).toEqual([
      { codigo: 'A00406656', nombre: 'ANDRES FELIPE RIVAS OSPINA' },
      { codigo: 'A00403756', nombre: 'DAYANNA FERNANDEZ NUÑEZ' },
      { codigo: 'A00404256', nombre: 'XILENA VIDAL RAMIREZ' },
    ]);
  });

  it('ignora todo lo que no sea fila de tabla', () => {
    const md = `# Lista 2026-2\n\nNota suelta.\n\n${SAMPLE}\n\nOtro párrafo.`;
    expect(parseRosterMarkdown(md)).toHaveLength(3);
  });

  it('no cuenta dos veces a la misma persona', () => {
    const md = `${SAMPLE}\n| A00406656 | ANDRES FELIPE RIVAS OSPINA |`;
    expect(parseRosterMarkdown(md)).toHaveLength(3);
  });

  it('acepta una lista de una sola columna como nombres', () => {
    expect(parseRosterMarkdown('| Nombre |\n|---|\n| ANA GOMEZ |')).toEqual([
      { codigo: '', nombre: 'ANA GOMEZ' },
    ]);
  });

  it('descarta las tablas cuya primera columna no es el código', () => {
    const md = `${SAMPLE}\n\n| Nombre | Correo | Rol |\n|---|---|---|\n| Domiciano Rincón | domi@icesi.edu.co | profesor |`;
    const entries = parseRosterMarkdown(md);
    expect(entries).toHaveLength(3);
    expect(entries.map((e) => e.codigo)).not.toContain('Domiciano Rincón');
  });

  it('devuelve una lista vacía si no hay tabla', () => {
    expect(parseRosterMarkdown('sin tabla aquí')).toEqual([]);
    expect(parseRosterMarkdown('')).toEqual([]);
    expect(parseRosterMarkdown(null)).toEqual([]);
  });

  it('tolera filas con celdas vacías al final', () => {
    expect(parseRosterMarkdown('| A001 | ANA GOMEZ |  |')).toEqual([
      { codigo: 'A001', nombre: 'ANA GOMEZ' },
    ]);
  });
});

describe('claves de comparación', () => {
  it('normalizeCodigo iguala mayúsculas y espacios', () => {
    expect(normalizeCodigo(' a00406656 ')).toBe('A00406656');
  });

  it('normalizeName quita tildes, puntuación y mayúsculas', () => {
    expect(normalizeName('Dayanna Fernández Núñez')).toBe('DAYANNA FERNANDEZ NUNEZ');
    expect(normalizeName('  Juan   Pablo  Pino-Bastidas ')).toBe('JUAN PABLO PINO BASTIDAS');
  });

  it('nameSetKey es insensible al orden de los apellidos', () => {
    expect(nameSetKey('ANDRES FELIPE RIVAS OSPINA')).toBe(nameSetKey('Rivas Ospina, Andrés Felipe'));
  });
});
