// src/ai/priorAttempt.js
//
// `prompt_created.priorAttempt` distingue pedir ayuda DESPUÉS de intentarlo de
// pedirla ANTES — es el predictor de H8, y no se puede deducir después: hay que
// marcarlo en el momento en que el estudiante intenta algo.
//
// "Intentar algo" hoy es abrir un DartPad o pasar a la pestaña de ejecución de un
// bloque `trycode`. Cuando exista F3 (autoexamen), un intento fallido de quiz es
// la señal más fuerte y se marca igual desde ahí.
//
// El alcance es la sesión de estudio, no la pestaña: se guarda en `sessionStorage`
// por lección para que recargar no borre el hecho de haberlo intentado, y para que
// "intenté el ejercicio de la lección A" no cuente como intento al preguntar sobre
// la lección B.

const KEY = 'aiPriorAttempt';

const read = () => {
  if (typeof sessionStorage === 'undefined') return {};
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
};

const write = (map) => {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    /* sin almacenamiento: se pierde la marca, no rompe nada */
  }
};

/** Marca que el estudiante intentó algo por su cuenta en esta lección. */
export function markAttempt(contentId) {
  if (!contentId) return;
  const map = read();
  if (map[contentId]) return;
  map[contentId] = true;
  write(map);
}

export function hasPriorAttempt(contentId) {
  if (!contentId) return false;
  return read()[contentId] === true;
}

export function resetAttempts() {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* nada que borrar */
  }
}
