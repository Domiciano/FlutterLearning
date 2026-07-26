// src/analytics/navigationOrigin.js
//
// `lesson_open.origin` distingue navegación dirigida de secuencial, y es el
// predictor del que vive H13 (modo aprendizaje vs. modo consulta). No se puede
// deducir a posteriori: desde `LessonPage` todas las aperturas se parecen. Hay que
// marcarla en el sitio que ORIGINA la navegación —el onClick del drawer, el del
// índice— justo antes de que el router cambie de ruta.
//
// Si nadie marcó nada, `LessonPage` decide entre `history` (botón atrás, que el
// router reporta como POP) y `deeplink` (entrada directa por URL).

let pending = null;

export function setNavigationOrigin(origin) {
  pending = origin;
}

// De un solo uso: la siguiente apertura de lección se la lleva y la deja limpia,
// para que un clic en el drawer no marque también la lección que se abra después
// pulsando el botón de atrás.
export function consumeNavigationOrigin() {
  const origin = pending;
  pending = null;
  return origin;
}
