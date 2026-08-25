// src/admin/rosterParser.js
//
// Convierte la lista de clase (el archivo que entrega la universidad, p. ej.
// `students/262.md`) en entradas `{ codigo, nombre }`.
//
// Acepta dos formatos, y los dos pueden convivir en el mismo archivo:
//
//   1. Plano — el formato que usamos hoy: una persona por línea, sin encabezado,
//      `<código> <nombre completo>`:
//
//        A00406656 ANDRES FELIPE RIVAS OSPINA
//
//   2. Tabla GFM de dos columnas — como venía antes, y como sale del .md que
//      exporta esta misma vista, para poder recargarlo:
//
//        | Código | Nombre |
//        |---------|---------|
//        | A00406656 | ANDRES FELIPE RIVAS OSPINA |
//
// Fuera de la tabla, una línea solo cuenta si empieza por algo con pinta de
// código (letra opcional + al menos tres dígitos). Así un título, una nota o un
// párrafo suelto en el archivo no se cuela como si fuera un estudiante.

// Claves de comparación. La lista de la universidad viene en mayúsculas y sin
// tildes; el perfil lo escribe el estudiante (o lo trae Google) con tildes,
// minúsculas y espacios de más. Sin normalizar, ningún nombre casaría.

export const normalizeCodigo = (value) =>
  String(value ?? '').trim().toUpperCase().replace(/\s+/g, '');

export const normalizeName = (value) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita las tildes ya separadas por NFD
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Clave insensible al orden de los apellidos: "RIVAS OSPINA ANDRES FELIPE" y
// "ANDRES FELIPE RIVAS OSPINA" son la misma persona, y las dos formas circulan
// (la lista oficial y el displayName de Google no siempre coinciden en orden).
export const nameSetKey = (value) => {
  const tokens = normalizeName(value).split(' ').filter(Boolean);
  return tokens.length ? [...tokens].sort().join(' ') : '';
};

const isSeparatorRow = (cells) =>
  cells.length > 0 && cells.every((c) => /^:?-{2,}:?$/.test(c));

const HEADER_CODIGO = new Set(['CODIGO', 'CODE', 'ID']);
const HEADER_NOMBRE = new Set(['NOMBRE', 'NOMBRES', 'NAME', 'ESTUDIANTE']);

const isHeaderRow = (cells) => {
  const first = normalizeName(cells[0]);
  const second = normalizeName(cells[1]);
  return HEADER_CODIGO.has(first) || HEADER_NOMBRE.has(first) || HEADER_NOMBRE.has(second);
};

// ¿Las filas de esta tabla son de la lista de clase? Un archivo puede traer
// varias tablas —el .md que exporta esta misma vista trae dos—, y la de "fuera
// de la lista" empieza por Nombre, no por Código: leerla metería correos y
// nombres como si fueran códigos. Se acepta una tabla cuando su primera columna
// es el código, o cuando es una lista de una sola columna de nombres.
const isRosterHeader = (cells) => {
  const first = normalizeName(cells[0]);
  if (HEADER_CODIGO.has(first)) return true;
  return cells.length === 1 && HEADER_NOMBRE.has(first);
};

const splitRow = (line) => {
  const trimmed = line.trim();
  const inner = trimmed.replace(/^\|/, '').replace(/\|$/, '');
  return inner.split('|').map((c) => c.trim());
};

// Línea del formato plano: el primer token es el código y el resto es el nombre.
// El código tiene que traer al menos tres dígitos —los de Icesi son `A00406656`—
// para que "Nota suelta." o "Lista 2026-2" no pasen por estudiante.
const PLAIN_ROW = /^\s*([A-Za-zÁÉÍÓÚÑ]{0,3}\d[\d-]{2,}[A-Za-z0-9-]*)[\s,;\t]+(\S.*)$/;

const parsePlainRow = (line) => {
  const m = PLAIN_ROW.exec(line);
  if (!m) return null;
  const nombre = m[2].trim();
  // Un "nombre" sin ninguna letra es otra cosa (una fecha, un conteo), no una persona.
  if (!/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(nombre)) return null;
  return { codigo: m[1].trim(), nombre };
};

/**
 * @param {string} markdown contenido crudo del archivo de la lista
 * @returns {{ codigo: string, nombre: string }[]} en el orden del archivo
 */
export function parseRosterMarkdown(markdown) {
  const lines = String(markdown ?? '').split(/\r?\n/);
  const entries = [];
  const seen = new Set();
  // Una tabla sin encabezado se acepta (es lo que pasa al pegar solo las filas).
  // Cualquier línea que no sea de tabla cierra la tabla en curso.
  let accepting = true;

  const push = (codigo, nombre) => {
    // La misma persona repetida en el archivo no debe contarse dos veces.
    const key = normalizeCodigo(codigo) || nameSetKey(nombre);
    if (seen.has(key)) return;
    seen.add(key);
    entries.push({ codigo: codigo.trim(), nombre: nombre.trim() });
  };

  for (const line of lines) {
    if (!line.trim().startsWith('|')) {
      accepting = true;
      const plain = parsePlainRow(line);
      if (plain) push(plain.codigo, plain.nombre);
      continue;
    }
    const cells = splitRow(line);
    if (isSeparatorRow(cells)) continue;
    if (isHeaderRow(cells)) {
      accepting = isRosterHeader(cells);
      continue;
    }
    if (!accepting) continue;

    // Una sola columna se lee como nombre: hay listas que solo traen nombres.
    const [a = '', b = ''] = cells;
    const codigo = cells.length >= 2 ? a : '';
    const nombre = cells.length >= 2 ? b : a;
    if (!codigo && !nombre) continue;

    push(codigo, nombre);
  }

  return entries;
}

/**
 * Saca el semestre del nombre del archivo: `262.md` → `262`, y también
 * `students/262.md`, `lista-262.md` o `2026-2.md` → `2026-2`.
 *
 * El semestre es lo que separa una lista de otra: cada `rosters/{courseId}-{term}`
 * es la lista de clase de ese periodo, y las de semestres pasados se conservan.
 *
 * @returns {string} el semestre, o '' si el nombre no lo dice
 */
export function parseTermFromFileName(fileName) {
  const base = String(fileName ?? '')
    .split(/[\\/]/)
    .pop()
    .replace(/\.[a-z0-9]+$/i, '');
  const m = /(\d{4}-\d|\d{3,6})/.exec(base);
  return m ? m[1] : '';
}

export default parseRosterMarkdown;
