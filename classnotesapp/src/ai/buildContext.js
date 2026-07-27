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

// Tope del temario en la instrucción. Con 68 y 80 lecciones el índice completo
// ronda los 3 KB, así que cabe de sobra; el tope existe para que un temario que
// crezca no se coma el contexto que debería llevar la lección.
export const MAX_OUTLINE_CHARS = 6000;

/**
 * Índice del curso en texto plano, a partir de las secciones que devuelve el
 * parser de `toc.md`.
 *
 * Sin esto el asistente solo conoce la lección abierta y da por inexistente todo
 * lo demás: a "dame un holamundo de React" contestaba que eso no estaba en el
 * material, estando React dos meses más adelante en el mismo curso. Con el
 * índice puede responder Y decir dónde se ve el tema.
 */
export function buildCourseOutline(sections) {
  if (!sections?.length) return null;
  const lines = [];
  for (const item of sections) {
    if (item.type === 'title') lines.push(`\n${item.label}`);
    else if (item.type === 'lesson') lines.push(`  - ${item.label}`);
  }
  const outline = lines.join('\n').trim();
  return outline.length > MAX_OUTLINE_CHARS
    ? `${outline.slice(0, MAX_OUTLINE_CHARS)}\n  … (temario recortado)`
    : outline;
}

/**
 * Instrucción del sistema completa.
 *
 * `topics` son las etiquetas de la lección (ver `lessonTags.js`). Decirle al
 * modelo de qué va la lección es más fiable que dejarle deducirlo del texto, y
 * es lo mismo que alimenta los atajos que ve el estudiante.
 */
export function buildSystemInstruction({
  courseName,
  courseHint,
  tocSection,
  lessonTitle,
  subsectionTitle,
  topics,
  material,
  courseOutline,
}) {
  const parts = [];

  parts.push(
    `Eres el tutor del curso "${courseName}"${courseHint ? ` (${courseHint})` : ''}. ` +
      'Responde en español, en el mismo tono del material, y usa bloques de código ' +
      'cuando ayuden.\n\n' +
      // Sin esto el modelo tiende a devolver la pregunta al estudiante. Si alguien
      // pregunta algo, quiere la respuesta: dársela y después, si acaso, invitar
      // a profundizar. Nunca al revés.
      'RESPONDE DIRECTAMENTE a lo que te preguntan. No devuelvas la pregunta, no ' +
      'escondas la respuesta detrás de acertijos y no le pidas al estudiante que ' +
      'adivine. Primero la respuesta clara; si después quieres proponerle algo para ' +
      'profundizar, hazlo al final y en una sola frase.\n\n' +
      // La versión anterior decía "si algo no está en el material, dilo en vez de
      // inventarlo" y el modelo lo tomó como una valla: a "dame un holamundo de
      // React" respondía que eso no estaba en la lección de repaso de JS. React
      // está en el curso, dos meses más adelante. La lección abierta es el sitio
      // donde está parado el estudiante, no el límite de lo que puede preguntar.
      'NUNCA te niegues a responder porque algo "no esté en esta lección". El ' +
      'estudiante puede preguntarte por cualquier tema del curso —lo haya visto ya ' +
      'o lo vaya a ver más adelante— y también por dudas generales de programación ' +
      'que le hagan falta. En concreto:\n' +
      '- Si lo que pregunta pertenece a otra lección del temario, respóndelo igual y ' +
      'dile en qué parte del curso se ve con detalle.\n' +
      '- Si queda fuera del curso, respóndelo de forma breve y útil, y dilo.\n' +
      '- Cuando la respuesta sí esté en el material que tienes delante, cíñete a él y ' +
      'usa sus mismos términos y ejemplos, para no contradecir la clase.\n' +
      '- Lo único que no debes hacer es inventar: si no estás seguro de una API o de ' +
      'un comportamiento, dilo.'
  );

  const ubicacion = [
    tocSection ? `Sección: "${tocSection}"` : null,
    lessonTitle ? `Lección: "${lessonTitle}"` : null,
  ].filter(Boolean).join(' · ');
  if (ubicacion) parts.push(ubicacion);
  if (subsectionTitle) parts.push(`Apartado que el estudiante tiene en pantalla: "${subsectionTitle}"`);
  if (topics?.length) parts.push(`Temas de esta lección: ${topics.join(', ')}.`);

  // El temario va ANTES del material: primero el mapa del curso, después el
  // fragmento concreto donde está parado el estudiante.
  if (courseOutline) {
    parts.push(
      'Este es el temario completo del curso. Úsalo para situar cualquier pregunta ' +
      'y para decirle al estudiante dónde se ve cada tema:\n\n' +
      `--- TEMARIO ---\n${courseOutline}\n--- FIN DEL TEMARIO ---`
    );
  }

  if (material) {
    parts.push(`--- MATERIAL ---\n${material}\n--- FIN DEL MATERIAL ---`);
  } else {
    parts.push(
      'No tienes el texto de la lección delante. Dilo con claridad antes de responder ' +
        'y limítate a lo que puedas afirmar con seguridad.'
    );
  }

  return parts.join('\n\n');
}
