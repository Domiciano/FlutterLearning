// src/admin/rosterExport.js
//
// Genera el .md que descarga el profesor: la lista de clase con el correo y el
// usuario de GitHub de cada quien, más quién falta por ingresar.
//
// El formato de salida es una tabla GFM con las mismas dos primeras columnas que
// la lista de entrada (Código, Nombre), así que el archivo exportado se puede
// volver a cargar como lista sin perder nada.

const EMPTY = '—';

// El contenido va dentro de una tabla: una barra sin escapar parte la fila, y un
// salto de línea la parte entera.
const cell = (value) => {
  const s = String(value ?? '').replace(/\s*\n\s*/g, ' ').trim();
  return s ? s.replace(/\|/g, '\\|') : EMPTY;
};

const githubOf = (s) =>
  s?.githubUsername || (s?.github ? String(s.github).replace(/^https?:\/\/(www\.)?github\.com\//i, '') : '');

const fmtDate = (d) => {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
};

/**
 * @param {object} input
 * @param {string} input.courseName  nombre largo del curso, para el título
 * @param {object} input.roll        salida de matchRoster()
 * @param {Date}   [input.generatedAt]
 * @param {string} [input.rosterLabel] nombre del archivo de lista cargado
 * @param {string} [input.term]        semestre de la lista, p. ej. `262`
 * @returns {string} markdown
 */
export function buildRosterMarkdown({ courseName, roll, generatedAt = new Date(), rosterLabel, term } = {}) {
  const { rows = [], extras = [], stats = {} } = roll ?? {};
  const out = [];

  out.push(`# Lista de estudiantes — ${courseName || 'Curso'}${term ? ` · semestre ${term}` : ''}`, '');
  out.push(
    `Generado el ${fmtDate(generatedAt)}` +
      (rosterLabel ? ` · lista: \`${rosterLabel}\`` : '') +
      ` · ${stats.total ?? rows.length} en lista · ` +
      `${stats.registrados ?? 0} con cuenta · ${stats.pendientes ?? 0} sin ingresar`,
    ''
  );

  out.push('## Lista de clase', '');
  out.push('| Código | Nombre (lista) | Correo | GitHub | Nombre en el perfil | Estado |');
  out.push('|---|---|---|---|---|---|');
  for (const r of rows) {
    const s = r.student;
    const estado = !s ? 'Sin ingresar' : r.codigoMismatch ? 'Revisar código' : 'Registrado';
    out.push(
      `| ${cell(r.codigo)} | ${cell(r.nombre)} | ${cell(s?.email)} | ${cell(githubOf(s))} | ` +
        `${cell(s?.fullName)} | ${estado} |`
    );
  }
  out.push('');

  const pendientes = rows.filter((r) => !r.registered);
  out.push(`## Sin ingresar (${pendientes.length})`, '');
  if (pendientes.length === 0) {
    out.push('Toda la lista tiene cuenta en el visor.', '');
  } else {
    for (const r of pendientes) out.push(`- ${cell(r.codigo)} — ${cell(r.nombre)}`);
    out.push('');
  }

  // No es ruido: aquí caen los oyentes, la otra sección y —sobre todo— quien
  // escribió mal su código, que desde la tabla de arriba parece ausente.
  out.push(`## Fuera de la lista (${extras.length})`, '');
  if (extras.length === 0) {
    out.push('Nadie ingresó por fuera de la lista.', '');
  } else {
    out.push('| Nombre | Correo | Código declarado | GitHub | Rol |');
    out.push('|---|---|---|---|---|');
    for (const s of extras) {
      out.push(
        `| ${cell(s.fullName || s.displayName)} | ${cell(s.email)} | ${cell(s.codigo)} | ` +
          `${cell(githubOf(s))} | ${cell(s.roleOther || s.role)} |`
      );
    }
    out.push('');
  }

  return out.join('\n');
}

/** Nombre de archivo estable y ordenable: `estudiantes-compunet2-262-2026-07-30.md`. */
export const rosterFileName = (courseId, date = new Date(), term = '') => {
  const p = (n) => String(n).padStart(2, '0');
  const stamp = `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
  return `estudiantes-${courseId || 'curso'}-${term ? `${term}-` : ''}${stamp}.md`;
};

/** Dispara la descarga en el navegador. Sin efecto fuera de él (tests). */
export function downloadMarkdown(filename, markdown) {
  if (typeof document === 'undefined' || typeof URL?.createObjectURL !== 'function') return;
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default buildRosterMarkdown;
