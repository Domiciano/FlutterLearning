// src/ai/geminiClient.js
//
// Llamada directa a la API de Gemini desde el navegador, con la clave del propio
// estudiante. Ver features.md § F2.
//
// Usa la **Interactions API** (`POST /v1beta/interactions`), que es la que Google
// recomienda para código nuevo:
//   https://ai.google.dev/gemini-api/docs/get-started
// La anterior (`models/<id>:generateContent`) sigue soportada, pero la primera
// versión de este módulo la usaba con `gemini-2.5-flash` fijo y fallaba con 404
// en las claves nuevas de AI Studio.
//
// Dos decisiones que no son de estilo:
//   - **La clave va en la cabecera `x-goog-api-key`, nunca en el query string.**
//     En la URL acabaría en cualquier log intermedio y en la cabecera `Referer`.
//   - **Respuesta en streaming.** Con una lección entera en el contexto el primer
//     token tarda; sin streaming la interfaz parece rota.
//
// El hilo se encadena con `previous_interaction_id` (modo con estado, el
// recomendado): el servidor guarda el historial, así que la lección **no se
// reenvía en cada turno**. Con lecciones de hasta 40 KB eso es la diferencia
// entre gastar la cuota gratuita en tres preguntas o en treinta.

const BASE = 'https://generativelanguage.googleapis.com/v1beta';
const INTERACTIONS = `${BASE}/interactions`;

// Escalera de reserva por si el modelo configurado no existe para una clave y el
// listado de modelos tampoco ayuda. Los ids caducan: esta lista es un paracaídas,
// no la fuente de verdad — el orden va del más nuevo al más conservador.
export const FALLBACK_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash',
];

export class GeminiError extends Error {
  constructor(kind, message, status, detail) {
    super(message);
    this.name = 'GeminiError';
    this.kind = kind; // 'key' | 'model' | 'quota' | 'network' | 'blocked' | 'unknown'
    this.status = status ?? null;
    // Lo que dice Google, redactado. Se muestra bajo el mensaje amable: sin esto,
    // un fallo inesperado obliga a abrir la consola del navegador, que es
    // exactamente lo que un estudiante no va a hacer.
    this.detail = detail ?? null;
  }
}

// El cuerpo de un error de la API puede repetir la petición, y con ella la clave.
// Nada que salga de aquí —consola incluida— puede llevarla.
const redactKeys = (text) =>
  (text ?? '')
    .replace(/AIza[0-9A-Za-z_-]{10,}/g, '[clave]')
    .replace(/\bAQ\.[0-9A-Za-z_-]{20,}/g, '[clave]');

const readApiDetail = async (res) => {
  try {
    const body = await res.text();
    const parsed = JSON.parse(body);
    return redactKeys(parsed?.error?.message ?? body).slice(0, 300);
  } catch {
    return null;
  }
};

const errorFor = (status, detail) => {
  const make = (kind, message) => {
    if (detail) console.warn('[AI] Error de la API', status, detail);
    return new GeminiError(kind, message, status, detail);
  };
  if (status === 400 || status === 401 || status === 403) {
    return make('key', 'Tu clave no es válida o ya no tiene permiso. Genera una nueva en AI Studio y vuelve a conectarla.');
  }
  if (status === 404) {
    return make('model', 'Ese modelo no está disponible para tu clave.');
  }
  if (status === 429) {
    return make('quota', 'Se agotó la cuota gratuita de tu clave por ahora. Espera unos minutos y vuelve a intentarlo.');
  }
  if (status >= 500) {
    return make('network', 'El servicio de Gemini no respondió. Inténtalo de nuevo en un momento.');
  }
  // El código va en el mensaje a propósito: sin él, "no se pudo" es un callejón
  // sin salida tanto para el estudiante como para quien tenga que arreglarlo.
  return make('unknown', `No se pudo completar la consulta (HTTP ${status}).`);
};

const throwForResponse = async (res) => {
  throw errorFor(res.status, await readApiDetail(res));
};

const postInteraction = async ({ apiKey, body, stream, signal }) => {
  const url = stream ? `${INTERACTIONS}?alt=sse` : INTERACTIONS;
  try {
    return await fetch(url, {
      method: 'POST',
      headers: { 'x-goog-api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if (err?.name === 'AbortError') throw err;
    throw new GeminiError('network', 'No se pudo contactar a Gemini. Revisa tu conexión.');
  }
};

// --- Descubrimiento de modelos ---------------------------------------------

/** Modelos que la clave puede usar, si el listado está disponible. */
export async function listModels(apiKey, { signal } = {}) {
  let res;
  try {
    res = await fetch(`${BASE}/models`, { headers: { 'x-goog-api-key': apiKey }, signal });
  } catch {
    return []; // el listado es una ayuda, no un requisito
  }
  if (!res.ok) {
    // Un 401/403 aquí sí es informativo: la clave no sirve para nada.
    if (res.status === 401 || res.status === 403) await throwForResponse(res);
    return [];
  }
  try {
    const data = await res.json();
    return (data.models ?? []).map((m) => (m.name ?? '').replace(/^models\//, '')).filter(Boolean);
  } catch {
    return [];
  }
}

// Prefiere "flash" por cuota y latencia; entre varios, la versión más alta. Se
// descartan los que no sirven para un chat de texto.
const scoreModel = (name) => {
  if (/embedding|aqa|vision|image|tts|live|lyria|veo|imagen/.test(name)) return -1;
  if (!name.startsWith('gemini')) return -1;
  let score = 0;
  if (name.includes('flash')) score += 100;
  if (name.includes('pro')) score += 50;
  if (/preview|exp/.test(name)) score -= 30;
  const version = name.match(/(\d+)\.(\d+)/);
  if (version) score += Number(version[1]) * 10 + Number(version[2]);
  return score;
};

/**
 * Candidatos ordenados: el preferido, luego lo que la clave declare, luego la
 * escalera de reserva. Los ids de modelo caducan, así que el valor de
 * `content/config.js` es una preferencia y no un requisito.
 */
export async function resolveModelCandidates(apiKey, { preferred, signal } = {}) {
  const discovered = (await listModels(apiKey, { signal }))
    .map((name) => ({ name, score: scoreModel(name) }))
    .filter((m) => m.score >= 0)
    .sort((a, b) => b.score - a.score)
    .map((m) => m.name);

  const seen = new Set();
  return [preferred, ...discovered, ...FALLBACK_MODELS].filter(
    (name) => name && !seen.has(name) && seen.add(name)
  );
}

// --- Verificación y conexión ------------------------------------------------

/** Interacción mínima para comprobar que la clave puede hablar con ese modelo. */
export async function verifyModel(apiKey, { model, signal } = {}) {
  const res = await postInteraction({
    apiKey,
    body: { model, input: 'ping', store: false },
    signal,
  });
  if (!res.ok) await throwForResponse(res);
  return true;
}

/**
 * Conecta: encuentra un modelo que esta clave pueda usar DE VERDAD.
 *
 * Que un modelo aparezca en un listado solo dice que existe, no que la clave
 * pueda generar con él, así que se prueban en orden hasta que uno responda.
 */
export async function connectModel(apiKey, { preferred, maxAttempts = 5, signal } = {}) {
  const candidates = await resolveModelCandidates(apiKey, { preferred, signal });

  let lastError = null;
  for (const model of candidates.slice(0, maxAttempts)) {
    try {
      await verifyModel(apiKey, { model, signal });
      if (model !== preferred) console.warn(`[AI] Se conecta con "${model}" (preferido: "${preferred}").`);
      return model;
    } catch (err) {
      // Un problema de clave, cuota o red no mejora probando otro modelo.
      if (err?.kind === 'key' || err?.kind === 'quota' || err?.kind === 'network') throw err;
      lastError = err;
    }
  }
  throw lastError ?? new GeminiError('model', 'Ningún modelo de tu clave respondió.', 404);
}

// --- Streaming ---------------------------------------------------------------

// Los eventos SSE llegan como bloques `event: <nombre>\ndata: <json>` separados
// por una línea en blanco. Solo interesa el JSON: trae su propio `event_type`.
function* parseSseChunk(buffer) {
  for (const block of buffer.split('\n\n')) {
    const line = block.split('\n').find((l) => l.startsWith('data:'));
    if (!line) continue;
    const raw = line.slice(5).trim();
    if (!raw || raw === '[DONE]') continue;
    try {
      yield JSON.parse(raw);
    } catch {
      /* fragmento incompleto: se recompone en la siguiente vuelta */
    }
  }
}

// La API ha usado varios nombres para el conteo de tokens según la versión de la
// documentación. Se leen todos y se normaliza a los del diccionario de datos.
const usageOf = (usage) => ({
  promptTokenCount: usage?.total_input_tokens ?? usage?.prompt_tokens ?? null,
  candidatesTokenCount: usage?.total_output_tokens ?? usage?.completion_tokens ?? null,
});

/**
 * Envía un turno y va entregando el texto por `onDelta`.
 *
 * @param {object}   opts
 * @param {string}   opts.apiKey
 * @param {string}   opts.model
 * @param {string}   opts.systemInstruction
 * @param {string}   opts.input                 la pregunta del estudiante
 * @param {string}  [opts.previousInteractionId] encadena el hilo en el servidor
 * @param {function} opts.onDelta               (fragmento) => void
 * @param {AbortSignal} [opts.signal]
 * @returns {Promise<{text, interactionId, latencyMs, finishReason, promptTokenCount, candidatesTokenCount}>}
 */
export async function streamGenerate({
  apiKey, model, systemInstruction, input, previousInteractionId, onDelta, signal,
}) {
  const startedAt = Date.now();
  const body = { model, input, stream: true };
  // La instrucción del sistema solo viaja en el primer turno: después el hilo ya
  // la lleva en el servidor, y repetirla duplicaría la lección en cada pregunta.
  if (previousInteractionId) body.previous_interaction_id = previousInteractionId;
  else if (systemInstruction) body.system_instruction = systemInstruction;

  const res = await postInteraction({ apiKey, body, stream: true, signal });
  if (!res.ok) await throwForResponse(res);
  if (!res.body) throw new GeminiError('network', 'La respuesta llegó vacía.');

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let text = '';
  let interactionId = null;
  let finishReason = null;
  let tokens = { promptTokenCount: null, candidatesTokenCount: null };

  const handle = (payload) => {
    const type = payload.event_type;
    if (type === 'interaction.created') {
      interactionId = payload.interaction?.id ?? interactionId;
      return;
    }
    if (type === 'step.delta') {
      // Los pasos de tipo `thought` también emiten delta, pero sin `text`: solo
      // se muestra lo que el estudiante debe leer.
      const delta = payload.delta;
      if (delta?.type === 'text' && delta.text) { text += delta.text; onDelta?.(delta.text); }
      return;
    }
    if (type === 'interaction.completed') {
      interactionId = payload.interaction?.id ?? interactionId;
      finishReason = payload.interaction?.status ?? finishReason;
      tokens = usageOf(payload.interaction?.usage);
    }
  };

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // Solo se procesan los bloques completos; el resto queda para la vuelta
    // siguiente, o un JSON partido a la mitad se descartaría.
    const lastBreak = buffer.lastIndexOf('\n\n');
    if (lastBreak === -1) continue;
    const ready = buffer.slice(0, lastBreak);
    buffer = buffer.slice(lastBreak + 2);
    for (const payload of parseSseChunk(ready)) handle(payload);
  }
  // Cola: el último bloque puede no terminar en línea en blanco.
  for (const payload of parseSseChunk(buffer)) handle(payload);

  if (!text) {
    throw new GeminiError('blocked', 'El modelo no devolvió texto. Prueba a reformular la pregunta.');
  }

  return { text, interactionId, latencyMs: Date.now() - startedAt, finishReason, ...tokens };
}
