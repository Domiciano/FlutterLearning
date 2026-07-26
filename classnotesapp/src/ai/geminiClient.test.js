import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  streamGenerate, verifyModel, resolveModelCandidates, connectModel,
  FALLBACK_MODELS, GeminiError,
} from './geminiClient';

// Convierte trozos de texto en el ReadableStream que devuelve fetch.
const streamOf = (chunks) => {
  const encoder = new TextEncoder();
  let i = 0;
  return {
    getReader: () => ({
      read: async () =>
        i < chunks.length ? { done: false, value: encoder.encode(chunks[i++]) } : { done: true },
    }),
  };
};

// Formato real de la Interactions API: bloques `event:` + `data:`.
const ev = (name, data) => `event: ${name}\ndata: ${JSON.stringify({ ...data, event_type: name })}\n\n`;
const created = (id) => ev('interaction.created', { interaction: { id, status: 'in_progress' } });
const textDelta = (text) => ev('step.delta', { index: 1, delta: { type: 'text', text } });
const thoughtDelta = () => ev('step.delta', { index: 0, delta: { type: 'thought_signature', signature: 'EvE...' } });
const completed = (id, usage) => ev('interaction.completed', { interaction: { id, status: 'completed', usage } });

const okStream = (chunks) => ({ ok: true, status: 200, body: streamOf(chunks) });

const call = (extra = {}) =>
  streamGenerate({
    apiKey: 'k', model: 'gemini-3.6-flash',
    systemInstruction: 'sys', input: 'hola',
    onDelta: () => {},
    ...extra,
  });

describe('streamGenerate — Interactions API', () => {
  beforeEach(() => { globalThis.fetch = vi.fn(); });
  afterEach(() => { vi.restoreAllMocks(); });

  it('llama al endpoint de interactions con la clave en la cabecera', async () => {
    globalThis.fetch.mockResolvedValue(okStream([created('v1_a'), textDelta('x'), completed('v1_a')]));
    await call();
    const [url, init] = globalThis.fetch.mock.calls[0];
    expect(url).toBe('https://generativelanguage.googleapis.com/v1beta/interactions?alt=sse');
    expect(init.headers['x-goog-api-key']).toBe('k');
    expect(url).not.toMatch(/key=/);
    const body = JSON.parse(init.body);
    expect(body.model).toBe('gemini-3.6-flash');
    expect(body.input).toBe('hola');
    expect(body.stream).toBe(true);
    expect(body.system_instruction).toBe('sys');
  });

  it('junta los fragmentos de texto y los va entregando', async () => {
    globalThis.fetch.mockResolvedValue(okStream([
      created('v1_a'), textDelta('Hola '), textDelta('mundo'), completed('v1_a'),
    ]));
    const seen = [];
    const out = await call({ onDelta: (d) => seen.push(d) });
    expect(out.text).toBe('Hola mundo');
    expect(seen).toEqual(['Hola ', 'mundo']);
  });

  it('ignora los deltas de pensamiento, que no son texto para el estudiante', async () => {
    globalThis.fetch.mockResolvedValue(okStream([
      created('v1_a'), thoughtDelta(), textDelta('respuesta'), completed('v1_a'),
    ]));
    const out = await call();
    expect(out.text).toBe('respuesta');
  });

  it('recompone un evento partido entre dos trozos de red', async () => {
    // El caso que rompe un parser ingenuo: el JSON llega cortado a la mitad.
    const full = textDelta('completo');
    globalThis.fetch.mockResolvedValue(okStream([
      created('v1_a'), full.slice(0, 30), full.slice(30), completed('v1_a'),
    ]));
    const out = await call();
    expect(out.text).toBe('completo');
  });

  it('lee el último evento aunque no termine en línea en blanco', async () => {
    const tail = 'event: step.delta\ndata: {"index":1,"delta":{"type":"text","text":"sin cola"},"event_type":"step.delta"}';
    globalThis.fetch.mockResolvedValue(okStream([created('v1_a'), tail]));
    const out = await call();
    expect(out.text).toBe('sin cola');
  });

  it('devuelve el id de la interacción, para encadenar el hilo', async () => {
    globalThis.fetch.mockResolvedValue(okStream([created('v1_abc'), textDelta('x'), completed('v1_abc')]));
    const out = await call();
    expect(out.interactionId).toBe('v1_abc');
  });

  it('encadena con previous_interaction_id y NO reenvía la instrucción del sistema', async () => {
    // Reenviarla duplicaría la lección entera en cada turno y quemaría la cuota.
    globalThis.fetch.mockResolvedValue(okStream([created('v1_b'), textDelta('x'), completed('v1_b')]));
    await call({ previousInteractionId: 'v1_a' });
    const body = JSON.parse(globalThis.fetch.mock.calls[0][1].body);
    expect(body.previous_interaction_id).toBe('v1_a');
    expect(body.system_instruction).toBeUndefined();
  });

  it('normaliza el conteo de tokens', async () => {
    globalThis.fetch.mockResolvedValue(okStream([
      created('v1_a'), textDelta('x'),
      completed('v1_a', { total_input_tokens: 60, total_output_tokens: 20, total_tokens: 80 }),
    ]));
    const out = await call();
    expect(out.promptTokenCount).toBe(60);
    expect(out.candidatesTokenCount).toBe(20);
    expect(out.finishReason).toBe('completed');
    expect(out.latencyMs).toBeGreaterThanOrEqual(0);
  });

  it('una respuesta sin texto no se da por buena en silencio', async () => {
    globalThis.fetch.mockResolvedValue(okStream([created('v1_a'), thoughtDelta(), completed('v1_a')]));
    await expect(call()).rejects.toMatchObject({ kind: 'blocked' });
  });

  it('403 se traduce a error de clave', async () => {
    globalThis.fetch.mockResolvedValue({ ok: false, status: 403, text: async () => '{"error":{"message":"denied"}}' });
    await expect(call()).rejects.toMatchObject({ kind: 'key' });
  });

  it('429 se traduce a error de cuota', async () => {
    globalThis.fetch.mockResolvedValue({ ok: false, status: 429, text: async () => '{}' });
    await expect(call()).rejects.toMatchObject({ kind: 'quota' });
  });

  it('un fallo de red no se propaga crudo', async () => {
    globalThis.fetch.mockRejectedValue(new Error('boom con la clave dentro'));
    const err = await call().catch((e) => e);
    expect(err).toBeInstanceOf(GeminiError);
    expect(err.kind).toBe('network');
    expect(err.message).not.toContain('boom');
  });

  it('el detalle que se muestra viene redactado de claves', async () => {
    globalThis.fetch.mockResolvedValue({
      ok: false, status: 400,
      text: async () => '{"error":{"message":"bad key AQ.Ab0XX0XXXxxx0xXXXx0xXxX_x0XXXx0XxxX0xXxX0XxxXxX"}}',
    });
    const err = await call().catch((e) => e);
    expect(err.detail).toContain('[clave]');
    expect(err.detail).not.toContain('AQ.Ab0');
  });
});

describe('resolveModelCandidates', () => {
  const modelsResponse = (names) => ({
    ok: true, status: 200,
    json: async () => ({ models: names.map((n) => ({ name: `models/${n}` })) }),
  });

  beforeEach(() => { globalThis.fetch = vi.fn(); });

  it('pone el preferido primero', async () => {
    globalThis.fetch.mockResolvedValue(modelsResponse(['gemini-3.5-flash', 'gemini-3.6-flash']));
    const out = await resolveModelCandidates('k', { preferred: 'gemini-3.6-flash' });
    expect(out[0]).toBe('gemini-3.6-flash');
  });

  it('ordena lo descubierto: flash antes que pro, versión alta antes que baja', async () => {
    globalThis.fetch.mockResolvedValue(modelsResponse(['gemini-2.5-flash', 'gemini-3.6-pro', 'gemini-3.6-flash']));
    const out = await resolveModelCandidates('k', { preferred: null });
    expect(out[0]).toBe('gemini-3.6-flash');
  });

  it('descarta lo que no sirve para un chat de texto', async () => {
    globalThis.fetch.mockResolvedValue(modelsResponse(['embedding-001', 'imagen-3.0', 'veo-3', 'gemini-3.6-flash']));
    const out = await resolveModelCandidates('k', { preferred: null });
    expect(out.filter((n) => /embedding|imagen|veo/.test(n))).toEqual([]);
  });

  it('si el listado no sirve, quedan igual los modelos de reserva', async () => {
    // Es el caso que dejó la conexión muerta: sin listado utilizable no había
    // ningún candidato y la pantalla decía "no tienes acceso a ningún modelo".
    globalThis.fetch.mockResolvedValue({ ok: false, status: 404, text: async () => '{}' });
    const out = await resolveModelCandidates('k', { preferred: 'gemini-3.6-flash' });
    expect(out).toEqual(expect.arrayContaining(FALLBACK_MODELS));
  });

  it('no repite candidatos', async () => {
    globalThis.fetch.mockResolvedValue(modelsResponse(['gemini-3.6-flash']));
    const out = await resolveModelCandidates('k', { preferred: 'gemini-3.6-flash' });
    expect(new Set(out).size).toBe(out.length);
  });

  it('una clave rechazada corta aquí en vez de probar cinco modelos', async () => {
    globalThis.fetch.mockResolvedValue({ ok: false, status: 403, text: async () => '{"error":{"message":"denied"}}' });
    await expect(resolveModelCandidates('mala', {})).rejects.toMatchObject({ kind: 'key' });
  });
});

describe('connectModel', () => {
  const listing = (names) => ({
    ok: true, status: 200,
    json: async () => ({ models: names.map((n) => ({ name: `models/${n}` })) }),
  });
  const notFound = { ok: false, status: 404, text: async () => '{"error":{"message":"model not found"}}' };
  const ok = { ok: true, status: 200, text: async () => '{}' };

  beforeEach(() => { globalThis.fetch = vi.fn(); });

  it('devuelve el primer modelo que responde de verdad', async () => {
    // Salir en un listado no garantiza poder generar: el primero 404 y el segundo sí.
    globalThis.fetch
      .mockResolvedValueOnce(listing(['gemini-3.6-flash', 'gemini-3.5-flash']))
      .mockResolvedValueOnce(notFound)
      .mockResolvedValueOnce(ok);
    await expect(connectModel('k', { preferred: 'gemini-3.6-flash' })).resolves.toBe('gemini-3.5-flash');
  });

  it('no insiste con otros modelos si el problema es la clave', async () => {
    const denied = { ok: false, status: 403, text: async () => '{"error":{"message":"denied"}}' };
    globalThis.fetch
      .mockResolvedValueOnce(listing(['gemini-3.6-flash', 'gemini-3.5-flash']))
      .mockResolvedValueOnce(denied);
    await expect(connectModel('k', {})).rejects.toMatchObject({ kind: 'key' });
    expect(globalThis.fetch).toHaveBeenCalledTimes(2); // listado + un intento
  });

  it('si ninguno responde, el error lleva lo que dijo Google', async () => {
    globalThis.fetch.mockResolvedValueOnce(listing([])).mockResolvedValue(notFound);
    const err = await connectModel('k', {}).catch((e) => e);
    expect(err.kind).toBe('model');
    expect(err.detail).toContain('model not found');
  });
});

describe('verifyModel', () => {
  beforeEach(() => { globalThis.fetch = vi.fn(); });

  it('no deja rastro en el servidor: la comprobación va con store:false', async () => {
    globalThis.fetch.mockResolvedValue({ ok: true, status: 200, text: async () => '{}' });
    await verifyModel('k', { model: 'gemini-3.6-flash' });
    const body = JSON.parse(globalThis.fetch.mock.calls[0][1].body);
    expect(body.store).toBe(false);
    expect(body.model).toBe('gemini-3.6-flash');
  });
});
