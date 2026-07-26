import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createEventQueue, SPILL_KEY } from './eventQueue';

const item = (sessionId, type, uid = 'u1') => ({
  env: { uid, courseId: 'compunet2', sessionId, device: 'desktop', viewportW: 1440, tzOffset: -300 },
  ev: { eventId: `${sessionId}-${type}-${Math.random()}`, ts: 1, type, contentId: null, subsectionId: null, payload: {} },
});

const fill = (queue, n, sessionId = 's1') => {
  for (let i = 0; i < n; i += 1) queue.push(item(sessionId, `e${i}`));
};

describe('createEventQueue', () => {
  beforeEach(() => localStorage.clear());

  it('no escribe nada hasta alcanzar el umbral de lote', async () => {
    const commit = vi.fn().mockResolvedValue();
    const queue = createEventQueue({ commit });

    fill(queue, 19);

    expect(commit).not.toHaveBeenCalled();
    expect(queue.size()).toBe(19);
  });

  it('agrupa el lote completo en un solo documento', async () => {
    const commit = vi.fn().mockResolvedValue();
    const queue = createEventQueue({ commit });

    fill(queue, 20);
    await queue.flush();

    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit.mock.calls[0][0].events).toHaveLength(20);
    expect(queue.size()).toBe(0);
  });

  it('el envolvente sube una sola vez y no se repite en cada evento', async () => {
    const commit = vi.fn().mockResolvedValue();
    const queue = createEventQueue({ commit });

    fill(queue, 20);
    await queue.flush();

    const { env, events } = commit.mock.calls[0][0];
    expect(env).toMatchObject({ uid: 'u1', courseId: 'compunet2', sessionId: 's1' });
    expect(events[0]).not.toHaveProperty('uid');
    expect(events[0]).not.toHaveProperty('sessionId');
  });

  it('nunca mezcla dos sesiones en el mismo documento', async () => {
    const commit = vi.fn().mockResolvedValue();
    const queue = createEventQueue({ commit });

    fill(queue, 5, 's1');
    fill(queue, 5, 's2');
    await queue.flush();

    expect(commit).toHaveBeenCalledTimes(2);
    const sessions = commit.mock.calls.map(([{ env }]) => env.sessionId);
    expect(sessions.sort()).toEqual(['s1', 's2']);
  });

  it('parte en varios documentos si un grupo supera el máximo por documento', async () => {
    const commit = vi.fn().mockResolvedValue();
    const queue = createEventQueue({ commit, batchSize: 1000, maxEventsPerDoc: 20 });

    fill(queue, 45);
    await queue.flush();

    expect(commit.mock.calls.map(([{ events }]) => events.length)).toEqual([20, 20, 5]);
  });

  it('devuelve a la cola lo que falló en vez de perderlo', async () => {
    const commit = vi.fn().mockRejectedValue(new Error('sin red'));
    const onError = vi.fn();
    const queue = createEventQueue({ commit, onError });

    fill(queue, 20);
    await queue.flush();

    expect(queue.size()).toBe(20);
    expect(onError).toHaveBeenCalled();
  });

  it('espera antes de reintentar en vez de golpear Firestore en bucle', async () => {
    const commit = vi.fn().mockRejectedValue(new Error('sin red'));
    let clock = 0;
    const queue = createEventQueue({ commit, now: () => clock, onError: () => {} });

    fill(queue, 20);
    await queue.flush();
    expect(commit).toHaveBeenCalledTimes(1);

    await queue.flush(); // inmediato: no debe intentarlo
    expect(commit).toHaveBeenCalledTimes(1);

    clock += 60_000; // pasada la espera: lo reintenta
    await queue.flush();
    expect(commit).toHaveBeenCalledTimes(2);
  });

  it('vuelca la cola pendiente y la recupera en la carga siguiente', async () => {
    const commit = vi.fn().mockResolvedValue();
    const first = createEventQueue({ commit });
    fill(first, 3);

    expect(first.spill()).toBe(3);
    expect(localStorage.getItem(SPILL_KEY)).toBeTruthy();

    const second = createEventQueue({ commit });
    expect(second.restore('u1')).toBe(3);
    expect(second.size()).toBe(3);
    // La llave se consume: recuperar dos veces duplicaría los eventos.
    expect(localStorage.getItem(SPILL_KEY)).toBeNull();
  });

  it('descarta los eventos volcados por otro usuario en un equipo compartido', () => {
    const commit = vi.fn().mockResolvedValue();
    const first = createEventQueue({ commit });
    first.push(item('s1', 'a', 'ajeno'));
    first.push(item('s1', 'b', 'u1'));
    first.spill();

    const onError = vi.fn();
    const second = createEventQueue({ commit, onError });

    expect(second.restore('u1')).toBe(1);
    expect(onError).toHaveBeenCalled();
  });

  it('descarta los eventos más antiguos si la cola se desborda', () => {
    const commit = vi.fn().mockResolvedValue();
    const onError = vi.fn();
    const queue = createEventQueue({ commit, batchSize: 10_000, maxQueue: 5, onError });

    fill(queue, 8);

    expect(queue.size()).toBe(5);
    expect(queue.pending()[0].ev.type).toBe('e3');
    expect(onError).toHaveBeenCalled();
  });
});
