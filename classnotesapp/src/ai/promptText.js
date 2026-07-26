// src/ai/promptText.js
//
// Derivadas del texto de la pregunta, calculadas al guardarla. Precalcularlas
// evita reprocesar el corpus entero después, y son los componentes de la
// "especificidad" que mide H10 (datadict.md § 2.6).

// Bloques cercados ```...``` o indentados, o varias líneas con pinta de código.
const FENCED = /```[\s\S]*?```|~~~[\s\S]*?~~~/;
const INLINE_CODE_RUN = /`[^`\n]+`/;
// Señales de código pegado sin cercar: llaves, punto y coma al final, imports.
const CODE_SHAPED = /^\s*(import|package|class|public|private|def|function|const|let|var|final|void|@\w+)\b|[{};]\s*$/m;

// Mensajes de error y trazas de pila, en lo que aparece en estos dos cursos
// (Java/Spring y Dart/Flutter) más lo genérico del navegador.
const ERROR_SHAPED = new RegExp(
  [
    '\\b\\w*(Exception|Error)\\b',      // NullPointerException, TypeError, FormatException
    '\\bat [\\w.$]+\\([^)]*\\)',        // at com.foo.Bar.baz(Bar.java:42)
    '^\\s*#\\d+\\s',                    // #0  main (package:app/main.dart:12)
    '\\bstack ?trace\\b',
    '\\bcaused by\\b',
    '\\bfailed to\\b',
    '\\bno such\\b',
    '\\bcannot (find|resolve|read)\\b',
  ].join('|'),
  'im'
);

export const charCountOf = (text) => (text ?? '').length;

export const hasCodeIn = (text) => {
  const t = text ?? '';
  return FENCED.test(t) || INLINE_CODE_RUN.test(t) || CODE_SHAPED.test(t);
};

export const hasErrorIn = (text) => ERROR_SHAPED.test(text ?? '');

// Las tres juntas, que es como se guardan.
export const derivePromptFeatures = (text) => ({
  charCount: charCountOf(text),
  hasCode: hasCodeIn(text),
  hasError: hasErrorIn(text),
});
