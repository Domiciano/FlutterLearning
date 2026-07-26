import { describe, it, expect, beforeEach } from 'vitest';
import { readApiKey, writeApiKey, clearApiKey, clearAllApiKeys, looksLikeApiKey } from './apiKeyStore';
import { assignTemplate, TEMPLATES, instructionFor } from './promptTemplates';

describe('apiKeyStore', () => {
  beforeEach(() => localStorage.clear());

  it('guarda y lee por uid', () => {
    writeApiKey('u1', 'clave-1');
    expect(readApiKey('u1')).toBe('clave-1');
  });

  it('la clave de un estudiante no es visible para otro en el mismo equipo', () => {
    writeApiKey('u1', 'clave-1');
    expect(readApiKey('u2')).toBeNull();
  });

  it('olvidar borra solo la del uid pedido', () => {
    writeApiKey('u1', 'a');
    writeApiKey('u2', 'b');
    clearApiKey('u1');
    expect(readApiKey('u1')).toBeNull();
    expect(readApiKey('u2')).toBe('b');
  });

  it('el barrido de cierre de sesión no deja ninguna clave en el equipo', () => {
    writeApiKey('u1', 'a');
    writeApiKey('u2', 'b');
    localStorage.setItem('otraCosa', 'se queda');
    clearAllApiKeys();
    expect(readApiKey('u1')).toBeNull();
    expect(readApiKey('u2')).toBeNull();
    expect(localStorage.getItem('otraCosa')).toBe('se queda');
  });

  it('sin uid no lee ni escribe nada', () => {
    writeApiKey(null, 'x');
    expect(readApiKey(null)).toBeNull();
  });
});

describe('looksLikeApiKey', () => {
  it('acepta una clave con la forma de AI Studio', () => {
    expect(looksLikeApiKey('AIzaSyC0000000000000000000000000000000')).toBe(true);
  });

  it('rechaza pegados con espacios, comillas o saltos de línea', () => {
    expect(looksLikeApiKey('"AIzaSyC000000000000000000000"')).toBe(false);
    expect(looksLikeApiKey('AIza SyC000000000000000000000')).toBe(false);
    expect(looksLikeApiKey('')).toBe(false);
    expect(looksLikeApiKey('corta')).toBe(false);
  });

  it('tolera espacios alrededor, que es el pegado normal', () => {
    expect(looksLikeApiKey('  AIzaSyC0000000000000000000000000000000  ')).toBe(true);
  });
});

describe('promptTemplates', () => {
  it('el sorteo solo devuelve ids del catálogo', () => {
    const ids = TEMPLATES.map((t) => t.id);
    for (let i = 0; i < 50; i += 1) expect(ids).toContain(assignTemplate());
  });

  it('la condición de control (sin plantilla) puede salir sorteada', () => {
    // Con random ≈ 1 sale la última, que es "sin plantilla" → id null.
    expect(assignTemplate(() => 0.999)).toBeNull();
  });

  it('cada plantilla con id trae instrucción, y la de control no', () => {
    TEMPLATES.forEach((t) => {
      if (t.id === null) expect(instructionFor(t.id)).toBeNull();
      else expect(instructionFor(t.id)).toBeTruthy();
    });
  });
});
