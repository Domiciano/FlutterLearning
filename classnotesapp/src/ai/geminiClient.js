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
    this.kind = kind; // 'key' | 'quota' | 'network' | 'blocked' | 'unknown'
    this.status = status ?? null;
  }
}

// Los mensajes de error de la API pueden traer la URL, y la URL podría traer la
// clave si alguna vez se llamara mal. Nunca se propaga el texto crudo del error.
const errorFor = (status) => {
  if (status === 400 || status === 401 || status === 403) {
    return new GeminiError(
      'key',
      'Tu clave no es válida o ya no tiene permiso. Genera una nueva en AI Studio y vuelve a conectarla.',
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
  return new GeminiError('unknown', 'No se pudo completar la consulta.', status);
};

/**
 * Comprobación barata de la clave antes de guardarla. Una clave mal pegada que
 * solo falle en la primera duda real es la peor forma de perder al estudiante.
 */
export async function verifyApiKey(apiKey, { signal } = {}) {
  let res;
  try {
    res = await fetch(`${BASE}/models`, {
      method: 'GET',
      headers: { 'x-goog-api-key': apiKey },
      signal,
    });
  } catch {
    throw new GeminiError('network', 'No se pudo contactar a Gemini. Revisa tu conexión.');
  }
  if (!res.ok) throw errorFor(res.status);
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

  if (!res.ok) throw errorFor(res.status);
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
