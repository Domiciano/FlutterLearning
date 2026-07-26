// src/ai/lessonTags.js
//
// Etiquetas de tema de una lección. Sirven para dos cosas a la vez:
//   1. Dar contexto al asistente ("los temas de esta lección son X, Y, Z"), que
//      es más preciso que dejarle deducirlo del texto entero.
//   2. Generar los atajos que ve el estudiante bajo el chat, que así hablan de
//      SU lección en vez de ser cinco frases genéricas iguales en todo el curso.
//
// Se declaran en el propio `.md`, en un comentario HTML que GitHub no muestra:
//
//     <!-- tags: IoC Container, inyección de dependencias, @Autowired -->
//
// **No hace falta anotar nada para que funcione.** Sin etiquetas se usan los
// títulos de los apartados, que ya existen en las 148 lecciones de los dos
// cursos. Anotar una lección solo la mejora; no anotarla no la rompe.

const TAGS_COMMENT = /<!--\s*tags?\s*:\s*([^>]*?)\s*-->/i;

// Las etiquetas sirven a dos consumidores con necesidades opuestas: el modelo
// agradece un vocabulario completo de la lección, y la interfaz se satura con
// más de media docena de chips. Por eso se parsean hasta MAX_TAGS —todas van a
// la instrucción del sistema— y la UI solo muestra las primeras MAX_CHIPS.
const MAX_TAGS = 12;
export const MAX_CHIPS = 6;
// Un atajo más largo que esto deja de leerse como atajo y desborda el chip.
const MAX_TAG_LENGTH = 42;

const clean = (list) => {
  const seen = new Set();
  return list
    .map((t) => t.trim())
    .filter((t) => t && t.length <= MAX_TAG_LENGTH)
    .filter((t) => {
      const key = t.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, MAX_TAGS);
};

/** Etiquetas declaradas en el markdown, o [] si la lección no las declara. */
export function extractLessonTags(markdown) {
  const match = (markdown ?? '').match(TAGS_COMMENT);
  if (!match) return [];
  return clean(match[1].split(','));
}

/**
 * Los temas con los que trabajar: las etiquetas declaradas si las hay, y si no
 * los títulos de los apartados. Es lo que se le pasa al modelo y lo que se
 * muestra como atajos.
 */
export function topicsFor({ markdown, subtitles }) {
  const declared = extractLessonTags(markdown);
  if (declared.length) return declared;
  return clean((subtitles ?? []).map((s) => s.text ?? ''));
}
