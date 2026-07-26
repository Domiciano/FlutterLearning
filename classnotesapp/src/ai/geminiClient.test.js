import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { streamGenerate, verifyApiKey, resolveModel, GeminiError } from './geminiClient';

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

const sse = (obj) => `data: ${JSON.stringify(obj)}\n\n`;
const delta = (text) => sse({ candidates: [{ content: { parts: [{ text }] } }] });

const okResponse = (chunks) => ({ ok: true, status: 200, body: streamOf(chunks) });

describe('streamGenerate', () => {
  beforeEach(() => { globalThis.fetch = vi.fn(); });
  afterEach(() => { vi.restoreAllMocks(); });

  const call = (onDelta) =>
    streamGenerate({
      apiKey: 'k', model: 'gemini-2.5-flash',
      systemInstruction: 'sys', turns: [{ role: 'user', text: 'hola' }],
      onDelta,
    });

  it('junta los fragmentos y los va entregando', async () => {
    globalThis.fetch.mockResolvedValue(okResponse([delta('Hola '), delta('mundo')]));
    const seen = [];
    const out = await call((d) => seen.push(d));
    expect(out.text).toBe('Hola mundo');
    expect(seen).toEqual(['Hola ', 'mundo']);
  });

  it('recompone un evento partido entre dos trozos de red', async () => {
    // El caso que rompe un parser ingenuo: el JSON llega cortado a la mitad.
    const full = delta('completo');
    globalThis.fetch.mockResolvedValue(okResponse([full.slice(0, 20), full.slice(20)]));
    const out = await call(() => {});
    expect(out.text).toBe('completo');
  });

  it('lee el último evento aunque no termine en línea en blanco', async () => {
    globalThis.fetch.mockResolvedValue(okResponse([`data: ${JSON.stringify({
      candidates: [{ content: { parts: [{ text: 'sin cola' }] } }],
    })}`]));
    const out = await call(() => {});
    expect(out.text).toBe('sin cola');
  });

  it('recoge finishReason y el conteo de tokens', async () => {
    globalThis.fetch.mockResolvedValue(okResponse([
      delta('x'),
      sse({ candidates: [{ finishReason: 'STOP' }], usageMetadata: { promptTokenCount: 10, candidatesTokenCount: 3 } }),
    ]));
    const out = await call(() => {});
    expect(out.finishReason).toBe('STOP');
    expect(out.promptTokenCount).toBe(10);
    expect(out.candidatesTokenCount).toBe(3);
    expect(out.latencyMs).toBeGreaterThanOrEqual(0);
  });

  it('403 se traduce a un error de clave, sin filtrar el cuerpo de la respuesta', async () => {
    globalThis.fetch.mockResolvedValue({ ok: false, status: 403 });
    await expect(call(() => {})).rejects.toMatchObject({ kind: 'key' });
  });

  it('429 se traduce a un error de cuota', async () => {
    globalThis.fetch.mockResolvedValue({ ok: false, status: 429 });
    await expect(call(() => {})).rejects.toMatchObject({ kind: 'quota' });
  });

  it('un fallo de red no se propaga crudo', async () => {
    globalThis.fetch.mockRejectedValue(new Error('boom con la clave dentro'));
    const err = await call(() => {}).catch((e) => e);
    expect(err).toBeInstanceOf(GeminiError);
    expect(err.kind).toBe('network');
    expect(err.message).not.toContain('boom');
  });

  it('manda la clave en la cabecera y nunca en la URL', async () => {
    globalThis.fetch.mockResolvedValue(okResponse([delta('x')]));
    await call(() => {});
    const [url, init] = globalThis.fetch.mock.calls[0];
    expect(url).not.toContain('SECRET-KEY');
    expect(url).not.toMatch(/key=/);
    expect(init.headers['x-goog-api-key']).toBe('k');
  });
});

describe('verifyApiKey', () => {
  beforeEach(() => { globalThis.fetch = vi.fn(); });

  it('acepta una clave que responde', async () => {
    globalThis.fetch.mockResolvedValue({ ok: true, status: 200 });
    await expect(verifyApiKey('k', { model: 'gemini-2.5-flash' })).resolves.toBe(true);
  });

  it('rechaza una clave inválida antes de guardarla', async () => {
    globalThis.fetch.mockResolvedValue({ ok: false, status: 400 });
    await expect(verifyApiKey('mala', { model: 'gemini-2.5-flash' })).rejects.toMatchObject({ kind: 'key' });
  });

  it('verifica contra el mismo modelo que usará el chat, no contra models.list', async () => {
    // Si se verificara con otra operación, una clave sin acceso a ESTE modelo
    // pasaría el filtro y fallaría en la primera pregunta.
    globalThis.fetch.mockResolvedValue({ ok: true, status: 200 });
    await verifyApiKey('k', { model: 'gemini-2.5-flash' });
    const [url, init] = globalThis.fetch.mock.calls[0];
    expect(url).toContain('models/gemini-2.5-flash:generateContent');
    expect(init.method).toBe('POST');
    expect(init.headers['x-goog-api-key']).toBe('k');
    expect(url).not.toMatch(/key=/);
  });
});

describe('resolveModel — el id de modelo no se adivina, se pregunta', () => {
  const modelsResponse = (names) => ({
    ok: true,
    status: 200,
    json: async () => ({
      models: names.map((n) => ({ name: `models/${n}`, supportedGenerationMethods: ['generateContent'] })),
    }),
  });

  beforeEach(() => { globalThis.fetch = vi.fn(); });

  it('usa el preferido cuando la clave lo tiene', async () => {
    globalThis.fetch.mockResolvedValue(modelsResponse(['gemini-2.5-flash', 'gemini-2.5-pro']));
    await expect(resolveModel('k', { preferred: 'gemini-2.5-flash' })).resolves.toBe('gemini-2.5-flash');
  });

  it('si el preferido no existe, elige otro en vez de fallar con un 404 opaco', async () => {
    // Este es el fallo real: config.js fijaba un id que la clave no tenía.
    globalThis.fetch.mockResolvedValue(modelsResponse(['gemini-2.0-flash', 'gemini-1.5-pro']));
    await expect(resolveModel('k', { preferred: 'gemini-2.5-flash' })).resolves.toBe('gemini-2.0-flash');
  });

  it('prefiere flash sobre pro, y la versión más alta sobre la más baja', async () => {
    globalThis.fetch.mockResolvedValue(modelsResponse(['gemini-1.5-flash', 'gemini-2.5-pro', 'gemini-2.5-flash']));
    await expect(resolveModel('k', { preferred: 'inexistente' })).resolves.toBe('gemini-2.5-flash');
  });

  it('descarta modelos que no sirven para un chat de texto', async () => {
    globalThis.fetch.mockResolvedValue(modelsResponse(['embedding-001', 'imagen-3.0', 'gemini-2.0-flash']));
    await expect(resolveModel('k', { preferred: null })).resolves.toBe('gemini-2.0-flash');
  });

  it('ignora los modelos que no pueden generar contenido', async () => {
    globalThis.fetch.mockResolvedValue({
      ok: true, status: 200,
      json: async () => ({
        models: [
          { name: 'models/solo-embeddings', supportedGenerationMethods: ['embedContent'] },
          { name: 'models/gemini-2.0-flash', supportedGenerationMethods: ['generateContent'] },
        ],
      }),
    });
    await expect(resolveModel('k', {})).resolves.toBe('gemini-2.0-flash');
  });

  it('una clave sin ningún modelo de texto da un error explicable', async () => {
    globalThis.fetch.mockResolvedValue(modelsResponse([]));
    await expect(resolveModel('k', {})).rejects.toMatchObject({ kind: 'model' });
  });

  it('propaga el error de clave si el listado falla', async () => {
    globalThis.fetch.mockResolvedValue({ ok: false, status: 403, text: async () => 'denied' });
    await expect(resolveModel('mala', {})).rejects.toMatchObject({ kind: 'key' });
  });
});

describe('errores diagnosticables', () => {
  beforeEach(() => { globalThis.fetch = vi.fn(); });

  it('un estado inesperado lleva el código en el mensaje', async () => {
    // Sin el código, "no se pudo completar la consulta" es un callejón sin salida.
    globalThis.fetch.mockResolvedValue({ ok: false, status: 418, text: async () => 'x' });
    const err = await verifyApiKey('k', { model: 'm' }).catch((e) => e);
    expect(err.message).toContain('418');
  });

  it('404 se explica como problema de modelo, no de clave', async () => {
    globalThis.fetch.mockResolvedValue({ ok: false, status: 404, text: async () => 'not found' });
    await expect(verifyApiKey('k', { model: 'no-existe' })).rejects.toMatchObject({ kind: 'model' });
  });
});
