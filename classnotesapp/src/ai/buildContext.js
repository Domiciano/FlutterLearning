// src/ai/buildContext.js
//
// Compone lo que se le manda al modelo: la ubicación (curso, sección, lección,
// apartado) y el material. La regla de composición y el registro de `contextMode`
// vienen de features.md § F2 — sin ese campo una respuesta mala no se puede
// atribuir: no se sabría si falló el modelo o si no tenía el material delante.
//
//   Lección ≤ MAX_FULL_LESSON_BYTES  → markdown completo   → 'leccion-completa'
//   Lección mayor                    → apartado activo +
//                                      títulos de los demás → 'subseccion'
//   Contenido sin cargar             → solo la ubicación    → 'sin-contenido'

export const CONTEXT_MODE = {
  FULL: 'leccion-completa',
  SUBSECTION: 'subseccion',
  NONE: 'sin-contenido',
};

// 40 KB. Los tamaños reales del curso caben de sobra (mediana ~6 KB, p90 ~15 KB);
// el umbral existe para las pocas lecciones muy largas, no como norma.
export const MAX_FULL_LESSON_BYTES = 40 * 1024;

const byteLength = (text) =>
  typeof TextEncoder !== 'undefined'
    ? new TextEncoder().encode(text).length
    : (text ?? '').length;

// Los subtítulos son los encabezados `##` (LessonParser.extractHeadings), así que
// un apartado va desde su `##` hasta el siguiente `##` o `#`. Los `###` de dentro
// pertenecen al apartado y no lo cortan.
const SECTION_BREAK = /^#{1,2}\s+/;

const normalize = (text) =>
  (text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // diacríticos, en escape: el rango literal es invisible
    .replace(/\s+/g, ' ')
    .trim();

// Devuelve el markdown del apartado cuyo encabezado coincide con `title`, o null.
export function extractSubsection(markdown, title) {
  if (!markdown || !title) return null;
  const lines = markdown.split('\n');
  const wanted = normalize(title);

  let start = -1;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!/^##\s+/.test(line)) continue;
    if (normalize(line.replace(/^#+\s*/, '')) === wanted) { start = i; break; }
  }
  if (start === -1) return null;

  let end = lines.length;
  for (let i = start + 1; i < lines.length; i += 1) {
    if (SECTION_BREAK.test(lines[i])) { end = i; break; }
  }
  return lines.slice(start, end).join('\n').trim();
}

// Índice de los demás apartados, para que el modelo sepa qué más hay en la
// lección aunque no le quepa el texto entero.
const outlineOf = (subtitles, activeTitle) =>
  (subtitles ?? [])
    .map((s) => (normalize(s.text) === normalize(activeTitle) ? `- ${s.text} (el que está leyendo)` : `- ${s.text}`))
    .join('\n');

/**
 * Decide qué material viaja y en qué modo.
 * @returns {{ material: string|null, contextMode: string }}
 */
export function composeMaterial({ rawContent, subtitles, subsectionTitle }) {
  if (!rawContent) return { material: null, contextMode: CONTEXT_MODE.NONE };

  if (byteLength(rawContent) <= MAX_FULL_LESSON_BYTES) {
    return { material: rawContent, contextMode: CONTEXT_MODE.FULL };
  }

  const slice = extractSubsection(rawContent, subsectionTitle);
  if (!slice) {
    // Lección larga y sin apartado identificable: mandar el principio es mejor
    // que no mandar nada, pero se declara como 'subseccion' igual, porque no es
    // la lección completa y el análisis tiene que saberlo.
    const head = rawContent.slice(0, MAX_FULL_LESSON_BYTES);
    return { material: head, contextMode: CONTEXT_MODE.SUBSECTION };
  }

  const outline = outlineOf(subtitles, subsectionTitle);
  const material = outline
    ? `${slice}\n\n--- OTROS APARTADOS DE ESTA LECCIÓN ---\n${outline}`
    : slice;
  return { material, contextMode: CONTEXT_MODE.SUBSECTION };
}

/**
 * Instrucción del sistema completa. `templateInstruction` es la de la plantilla
 * elegida, o null.
 */
export function buildSystemInstruction({
  courseName,
  courseHint,
  tocSection,
  lessonTitle,
  subsectionTitle,
  material,
  templateInstruction,
}) {
  const parts = [];

  parts.push(
    `Eres el tutor del curso "${courseName}"${courseHint ? ` (${courseHint})` : ''}.\n` +
      'Respondes basándote en el material del curso que viene a continuación; si algo ' +
      'no está ahí, dilo en vez de inventarlo. Responde en español, en el mismo tono ' +
      'del material, y usa bloques de código cuando ayuden.'
  );

  const ubicacion = [
    tocSection ? `Sección: "${tocSection}"` : null,
    lessonTitle ? `Lección: "${lessonTitle}"` : null,
  ].filter(Boolean).join(' · ');
  if (ubicacion) parts.push(ubicacion);
  if (subsectionTitle) parts.push(`Apartado que el estudiante tiene en pantalla: "${subsectionTitle}"`);

  if (material) {
    parts.push(`--- MATERIAL ---\n${material}\n--- FIN DEL MATERIAL ---`);
  } else {
    parts.push(
      'No tienes el texto de la lección delante. Dilo con claridad antes de responder ' +
        'y limítate a lo que puedas afirmar con seguridad.'
    );
  }

  if (templateInstruction) parts.push(templateInstruction);

  return parts.join('\n\n');
}
