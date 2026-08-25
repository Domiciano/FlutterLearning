// src/admin/matchRoster.js
//
// Une la lista de clase (lo que la universidad dice que hay) con los perfiles de
// Firestore (quien efectivamente entró al visor). El resultado tiene tres cajas,
// y las tres importan:
//
//   rows     una fila por cada persona de la lista, con su perfil si lo tiene.
//            Las que no lo tienen son "sin ingresar" — la pregunta original.
//   extras   perfiles que no están en la lista: oyentes, otra sección, el
//            profesor, o alguien que escribió mal su código.
//   stats    los conteos que van al encabezado y al .md exportado.
//
// El emparejamiento va por código primero porque es el identificador que la
// universidad garantiza único. El nombre es respaldo: lo escribe el estudiante
// o lo trae Google, así que casa menos y se marca aparte (`matchedBy: 'nombre'`)
// para que el profesor sepa que ese código no coincidió y pueda corregirlo.
//
// Cuatro pasadas, de la señal más fuerte a la más débil, y cada una solo mira lo
// que dejó libre la anterior:
//
//   1. `codigo`         código idéntico.
//   2. `nombre`         nombre completo idéntico (o los mismos apellidos en otro orden).
//   3. `codigo-typo`    el código del perfil está a un carácter del de la lista.
//   4. `nombre-parcial` el nombre del perfil es parte del de la lista.
//
// Las dos últimas existen porque el formulario lo llena el estudiante y se
// equivoca de dos maneras muy concretas y muy repetidas: teclea mal un dígito
// del código (`A0040256` por `A00404256`), o escribe su nombre corto —el de
// diario, sin el segundo apellido— donde la universidad lo tiene completo. Sin
// ellas esa gente aparece a la vez como ausente arriba y como desconocida en
// "fuera de la lista", que es el peor de los dos mundos: el profesor no ve que
// sí entró, y tiene que cruzarlos a ojo.
//
// Las dos son heurísticas, así que se aplican **solo cuando la respuesta es
// única en los dos sentidos**: ese perfil no encaja con ninguna otra fila libre,
// y esa fila no encaja con ningún otro perfil libre. Con "JUAN PABLO" suelto
// —dos en la lista— no se adivina: se deja sin casar, que es el error barato.
// Y toda fila así queda marcada "Revisar código", porque el arreglo de verdad es
// que el estudiante corrija su perfil.

import { normalizeCodigo, normalizeName, nameSetKey } from './rosterParser';

const studentName = (s) => s?.fullName || s?.displayName || '';

const tokensOf = (value) => normalizeName(value).split(' ').filter(Boolean);

/** ¿`a` y `b` se diferencian en un solo carácter (cambiado, sobrante o faltante)? */
const isOneEdit = (a, b) => {
  if (a === b) return false;
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  if (long.length - short.length > 1) return false;
  // Códigos cortos no: en 3 caracteres, "a un edit" ya no dice nada.
  if (short.length < 4) return false;

  let i = 0;
  let j = 0;
  let diffs = 0;
  while (i < short.length && j < long.length) {
    if (short[i] === long[j]) {
      i += 1;
      j += 1;
      continue;
    }
    if (++diffs > 1) return false;
    if (short.length === long.length) i += 1; // sustitución
    j += 1; // en el largo siempre se avanza: cubre sustitución e inserción
  }
  return true;
};

/** El nombre corto del perfil dentro del completo de la lista, o al revés. */
const isPartialName = (aTokens, bTokens) => {
  if (aTokens.length < 2 || bTokens.length < 2) return false;
  const [few, many] = aTokens.length <= bTokens.length ? [aTokens, bTokens] : [bTokens, aTokens];
  const pool = new Set(many);
  return few.every((t) => pool.has(t));
};

// Índice de perfiles por las tres claves. El primero gana: si dos perfiles
// declaran el mismo código, el segundo cae en `extras` en vez de desaparecer.
const indexStudents = (students) => {
  const byCodigo = new Map();
  const byName = new Map();
  const byNameSet = new Map();

  for (const s of students) {
    const cod = normalizeCodigo(s?.codigo);
    if (cod && !byCodigo.has(cod)) byCodigo.set(cod, s);
    const n = normalizeName(studentName(s));
    if (n && !byName.has(n)) byName.set(n, s);
    const ns = nameSetKey(studentName(s));
    if (ns && !byNameSet.has(ns)) byNameSet.set(ns, s);
  }

  return { byCodigo, byName, byNameSet };
};

/**
 * @param {{ roster: {codigo:string,nombre:string}[], students: object[] }} input
 */
export function matchRoster({ roster = [], students = [] } = {}) {
  const idx = indexStudents(students);
  const claimed = new Set(); // uids ya asignados a una fila de la lista

  const take = (student) => {
    if (!student) return null;
    const key = student.uid ?? student.id;
    if (key && claimed.has(key)) return null;
    if (key) claimed.add(key);
    return student;
  };

  // Dos pasadas: primero todos los códigos, después los nombres sobrantes. Si se
  // hiciera fila por fila, un nombre parecido podría robarle el perfil a la fila
  // que sí tenía su código exacto más abajo en la lista.
  const matched = new Array(roster.length).fill(null);

  roster.forEach((entry, i) => {
    const cod = normalizeCodigo(entry.codigo);
    if (!cod) return;
    const hit = take(idx.byCodigo.get(cod));
    if (hit) matched[i] = { student: hit, matchedBy: 'codigo' };
  });

  roster.forEach((entry, i) => {
    if (matched[i]) return;
    const hit =
      take(idx.byName.get(normalizeName(entry.nombre))) ||
      take(idx.byNameSet.get(nameSetKey(entry.nombre)));
    if (hit) matched[i] = { student: hit, matchedBy: 'nombre' };
  });

  // Empareja solo los pares sin competencia: la fila no admite otro perfil libre
  // y el perfil no admite otra fila libre. Un candidato ambiguo se descarta
  // entero — es mejor dejar la fila "sin ingresar" que atribuirle a alguien el
  // perfil de un compañero.
  const resolveUnique = (isCompatible, label) => {
    const freeRows = roster.map((_, i) => i).filter((i) => !matched[i]);
    const freeStudents = students.filter((s) => !claimed.has(s?.uid ?? s?.id));
    if (freeRows.length === 0 || freeStudents.length === 0) return;

    const perRow = new Map();     // índice de fila → perfiles compatibles
    const perStudent = new Map(); // perfil → índices de fila compatibles

    for (const i of freeRows) {
      for (const s of freeStudents) {
        if (!isCompatible(roster[i], s)) continue;
        if (!perRow.has(i)) perRow.set(i, []);
        perRow.get(i).push(s);
        if (!perStudent.has(s)) perStudent.set(s, []);
        perStudent.get(s).push(i);
      }
    }

    for (const [i, candidatos] of perRow) {
      if (candidatos.length !== 1) continue;
      const s = candidatos[0];
      if (perStudent.get(s).length !== 1) continue;
      const hit = take(s);
      if (hit) matched[i] = { student: hit, matchedBy: label };
    }
  };

  // 3. El código del perfil está a un carácter del de la lista: se equivocó al
  //    teclearlo. Es la señal más fuerte de las dos heurísticas, así que va antes.
  resolveUnique((entry, s) => {
    const a = normalizeCodigo(entry.codigo);
    const b = normalizeCodigo(s?.codigo);
    return !!a && !!b && isOneEdit(a, b);
  }, 'codigo-typo');

  // 4. El nombre del perfil es parte del de la lista. Se mira también lo que el
  //    estudiante escribió en el campo del código cuando ahí no hay ni un dígito:
  //    quien pone "Mateo Berrio" donde va `A00399867` deja su nombre, no un código.
  resolveUnique((entry, s) => {
    const fila = tokensOf(entry.nombre);
    if (isPartialName(fila, tokensOf(studentName(s)))) return true;
    const enElCampoDelCodigo = String(s?.codigo ?? '');
    if (!enElCampoDelCodigo || /\d/.test(enElCampoDelCodigo)) return false;
    return isPartialName(fila, tokensOf(enElCampoDelCodigo));
  }, 'nombre-parcial');

  const rows = roster.map((entry, i) => {
    const m = matched[i];
    return {
      codigo: entry.codigo,
      nombre: entry.nombre,
      student: m?.student ?? null,
      matchedBy: m?.matchedBy ?? null,
      registered: !!m,
      // El código del perfil difiere del de la lista: casó por nombre, o el
      // estudiante se equivocó al escribirlo. Es lo único que el profesor tiene
      // que revisar a mano.
      codigoMismatch:
        !!m &&
        !!normalizeCodigo(entry.codigo) &&
        normalizeCodigo(m.student?.codigo) !== normalizeCodigo(entry.codigo),
    };
  });

  const extras = students.filter((s) => !claimed.has(s.uid ?? s.id));

  return {
    rows,
    extras,
    stats: {
      total: rows.length,
      registrados: rows.filter((r) => r.registered).length,
      pendientes: rows.filter((r) => !r.registered).length,
      extras: extras.length,
    },
  };
}

export default matchRoster;
