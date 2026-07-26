// src/ai/geminiClient.js
//
// Llamada directa a la API de Gemini desde el navegador, con la clave del propio
// estudiante. Ver features.md § F2.
//
// Dos decisiones que no son de estilo:
//   - **La clave va en la cabecera `x-goog-api-key`, nunca en el query string.**
//     En la URL acabaría en cualquier log intermedio y en la cabecera `Referer`.
//   - **Respuesta en streaming.** Con una lección entera en el contexto el primer
//     token tarda; sin streaming la interfaz parece rota.
//
// 429 (cuota) y 403 (clave inválida o revocada) van a ocurrir —son claves de
// cuota gratuita—, así que se traducen a un mensaje que dice qué pasó y qué hacer.

const BASE = 'https://generativelanguage.googleapis.com/v1beta';

export class GeminiError extends Error {
  constructor(kind, message, status) {
    super(message);
    this.name = 'GeminiError';
    this.kind = kind; // 'key' | 'model' | 'quota' | 'network' | 'blocked' | 'unknown'
    this.status = status ?? null;
  }
}

// El cuerpo de un error de la API puede repetir la petición, y con ella la clave.
// Nada que salga de aquí —consola incluida— puede llevarla.
const redactKeys = (text) =>
  (text ?? '')
    .replace(/AIza[0-9A-Za-z_-]{10,}/g, '[clave]')
    .replace(/\bAQ\.[0-9A-Za-z_-]{20,}/g, '[clave]');

// Los mensajes de error de la API pueden traer la URL, y la URL podría traer la
// clave si alguna vez se llamara mal. Nunca se propaga el texto crudo del error
// a la interfaz; sí se registra en consola, redactado, porque sin él un fallo
// inesperado es indiagnosticable desde el navegador de un estudiante.
const logApiError = async (res) => {
  try {
    const body = await res.text();
    console.warn('[AI] Error de la API', res.status, redactKeys(body).slice(0, 400));
  } catch {
    console.warn('[AI] Error de la API', res.status);
  }
};

const errorFor = (status) => {
  if (status === 400 || status === 401 || status === 403) {
    return new GeminiError(
      'key',
      'Tu clave no es válida o ya no tiene permiso. Genera una nueva en AI Studio y vuelve a conectarla.',
      status
    );
  }
  if (status === 404) {
    return new GeminiError(
      'model',
      'Tu clave no tiene acceso a ningún modelo compatible. Revisa que la creaste en AI Studio y no en otro proyecto.',
      status
    );
  }
  if (status === 429) {
    return new GeminiError(
      'quota',
      'Se agotó la cuota gratuita de tu clave por ahora. Espera unos minutos y vuelve a intentarlo.',
      status
    );
  }
  if (status >= 500) {
    return new GeminiError('network', 'El servicio de Gemini no respondió. Inténtalo de nuevo en un momento.', status);
  }
  // El código va en el mensaje a propósito: sin él, "no se pudo" es un callejón
  // sin salida tanto para el estudiante como para quien tenga que arreglarlo.
  return new GeminiError('unknown', `No se pudo completar la consulta (HTTP ${status}).`, status);
};

/** Modelos que la clave puede usar para generar. Nombres ya sin el prefijo `models/`. */
export async function listGenerativeModels(apiKey, { signal } = {}) {
  let res;
  try {
    res = await fetch(`${BASE}/models`, { headers: { 'x-goog-api-key': apiKey }, signal });
  } catch {
    throw new GeminiError('network', 'No se pudo contactar a Gemini. Revisa tu conexión.');
  }
  if (!res.ok) { await logApiError(res); throw errorFor(res.status); }
  const data = await res.json();
  return (data.models ?? [])
    .filter((m) => (m.supportedGenerationMethods ?? []).includes('generateContent'))
    .map((m) => (m.name ?? '').replace(/^models\//, ''))
    .filter(Boolean);
}

// Orden de preferencia cuando el modelo configurado no está disponible. Se
// prefiere "flash" por cuota y latencia; entre varios, el de versión más alta.
// Se excluyen los experimentales y los de sólo visión o incrustaciones, que no
// sirven para un chat de texto.
const scoreModel = (name) => {
  if (/embedding|aqa|vision|image|tts|live/.test(name)) return -1;
  let score = 0;
  if (name.includes('flash')) score += 100;
  if (name.includes('pro')) score += 50;
  if (/preview|exp/.test(name)) score -= 30;
  const version = name.match(/(\d+)\.(\d+)/);
  if (version) score += Number(version[1]) * 10 + Number(version[2]);
  return score;
};

/**
 * Verifica la clave y decide con qué modelo se va a hablar.
 *
 * Los ids de modelo caducan: el que estaba fijado en `content/config.js` puede
 * no existir para la clave del estudiante, y eso se manifestaba como un 404 con
 * un mensaje inútil. En vez de apostar por un id, se le pregunta a la clave qué
 * puede usar y se escoge — el valor de la configuración pasa a ser una
 * preferencia, no un requisito.
 *
 * @returns {Promise<string>} el id de modelo con el que hay que hablar
 */
export async function resolveModel(apiKey, { preferred, signal } = {}) {
  const available = await listGenerativeModels(apiKey, { signal });
  if (available.length === 0) {
    throw new GeminiError(
      'model',
      'Tu clave no tiene acceso a ningún modelo de texto. Revisa que la creaste en AI Studio.',
      404
    );
  }
  if (preferred && available.includes(preferred)) return preferred;

  const best = available
    .map((name) => ({ name, score: scoreModel(name) }))
    .filter((m) => m.score >= 0)
    .sort((a, b) => b.score - a.score)[0];

  if (!best) {
    throw new GeminiError('model', 'Tu clave no tiene acceso a ningún modelo de texto compatible.', 404);
  }
  if (preferred) {
    console.warn(`[AI] El modelo preferido "${preferred}" no está disponible; se usa "${best.name}".`);
  }
  return best.name;
}

/**
 * Comprobación de la clave antes de guardarla, con el MISMO tipo de llamada que
 * hará el chat: listar modelos puede permitirse con una clave que después no
 * pueda generar, y dejaría pasar claves que fallan en la primera pregunta.
 */
export async function verifyApiKey(apiKey, { model, signal } = {}) {
  let res;
  try {
    res = await fetch(`${BASE}/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'x-goog-api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'ping' }] }],
        generationConfig: { maxOutputTokens: 1 },
      }),
      signal,
    });
  } catch {
    throw new GeminiError('network', 'No se pudo contactar a Gemini. Revisa tu conexión.');
  }
  if (!res.ok) { await logApiError(res); throw errorFor(res.status); }
  return true;
}

// El stream llega como SSE: líneas `data: {json}` separadas por líneas en blanco.
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

/**
 * Envía la conversación y va entregando el texto por `onDelta`.
 *
 * @param {object}   opts
 * @param {string}   opts.apiKey
 * @param {string}   opts.model              id del modelo (viene de content/config.js)
 * @param {string}   opts.systemInstruction
 * @param {Array}    opts.turns              [{ role: 'user'|'model', text }]
 * @param {function} opts.onDelta            (fragmento) => void
 * @param {AbortSignal} [opts.signal]
 * @returns {Promise<{ text, latencyMs, finishReason, promptTokenCount, candidatesTokenCount }>}
 */
export async function streamGenerate({ apiKey, model, systemInstruction, turns, onDelta, signal }) {
  const startedAt = Date.now();
  const body = {
    systemInstruction: { parts: [{ text: systemInstruction }] },
    contents: turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
  };

  let res;
  try {
    res = await fetch(`${BASE}/models/${model}:streamGenerateContent?alt=sse`, {
      method: 'POST',
      headers: { 'x-goog-api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if (err?.name === 'AbortError') throw err;
    throw new GeminiError('network', 'No se pudo contactar a Gemini. Revisa tu conexión.');
  }

  if (!res.ok) { await logApiError(res); throw errorFor(res.status); }
  if (!res.body) throw new GeminiError('network', 'La respuesta llegó vacía.');

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let text = '';
  let finishReason = null;
  let promptTokenCount = null;
  let candidatesTokenCount = null;

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

    for (const payload of parseSseChunk(ready)) {
      const candidate = payload.candidates?.[0];
      const delta = candidate?.content?.parts?.map((p) => p.text ?? '').join('') ?? '';
      if (delta) { text += delta; onDelta?.(delta); }
      if (candidate?.finishReason) finishReason = candidate.finishReason;
      if (payload.usageMetadata) {
        promptTokenCount = payload.usageMetadata.promptTokenCount ?? promptTokenCount;
        candidatesTokenCount = payload.usageMetadata.candidatesTokenCount ?? candidatesTokenCount;
      }
    }
  }

  // Cola: el último bloque puede no terminar en línea en blanco.
  for (const payload of parseSseChunk(buffer)) {
    const candidate = payload.candidates?.[0];
    const delta = candidate?.content?.parts?.map((p) => p.text ?? '').join('') ?? '';
    if (delta) { text += delta; onDelta?.(delta); }
    if (candidate?.finishReason) finishReason = candidate.finishReason;
  }

  if (!text && finishReason && finishReason !== 'STOP') {
    throw new GeminiError('blocked', `El modelo no completó la respuesta (${finishReason}).`);
  }

  return {
    text,
    latencyMs: Date.now() - startedAt,
    finishReason,
    promptTokenCount,
    candidatesTokenCount,
  };
}
