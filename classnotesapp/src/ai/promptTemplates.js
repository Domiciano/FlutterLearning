// src/ai/promptTemplates.js
//
// Las plantillas son el único diseño causal disponible en todo el estudio (RQ11).
// Por eso se asignan **al azar por ESTUDIANTE, no por pregunta**, y la asignación
// se fija al conectar la clave y se guarda en el perfil (`students.promptTemplate`).
// Si variara dentro del mismo estudiante no habría contraste que medir: cada uno
// sería su propio grupo de control y de tratamiento a la vez.
//
// Lo que se asigna al azar es **qué plantilla queda preseleccionada**, no cuáles
// puede usar: el estudiante ve todas y puede cambiar. La asignación es la
// intención de tratamiento; lo que efectivamente usó se guarda en cada prompt
// como `template`.

export const TEMPLATES = [
  {
    id: 'pista',
    label: 'Dame una pista, no la solución',
    instruction:
      'El estudiante quiere una PISTA, no la solución. No escribas el código completo ' +
      'que resuelve su problema ni le des la respuesta directa. Señálale qué concepto ' +
      'del material tiene que releer y hazle una pregunta que lo acerque. Si insiste, ' +
      'da la siguiente pista, no la solución.',
  },
  {
    id: 'error',
    label: 'Explícame este error',
    instruction:
      'El estudiante trae un mensaje de error. Explícale qué significa en sus propias ' +
      'circunstancias, cuál es la causa más probable y cómo comprobarlo. Enséñale a ' +
      'leer el mensaje, no solo a arreglarlo esta vez.',
  },
  {
    id: 'porque-no-funciona',
    label: '¿Por qué no funciona mi código?',
    instruction:
      'El estudiante trae código que no hace lo que espera. Antes de corregir nada, ' +
      'dile qué está haciendo su código realmente y en qué se aparta de lo que quería. ' +
      'Después propón el cambio mínimo.',
  },
  {
    id: 'otro-ejemplo',
    label: 'Explícamelo con otro ejemplo',
    instruction:
      'El estudiante no entendió el ejemplo del material. Explica el mismo concepto con ' +
      'un ejemplo DISTINTO al del material, más simple, y después conéctalo de vuelta ' +
      'con el del curso.',
  },
  {
    id: null,
    label: 'Sin plantilla',
    instruction: null,
  },
];

// Las que entran en el sorteo: "sin plantilla" es la condición de control y tiene
// que poder salir, así que se incluye.
export const assignTemplate = (random = Math.random) =>
  TEMPLATES[Math.floor(random() * TEMPLATES.length)].id;

export const templateById = (id) => TEMPLATES.find((t) => t.id === id) ?? null;

export const instructionFor = (id) => templateById(id)?.instruction ?? null;
