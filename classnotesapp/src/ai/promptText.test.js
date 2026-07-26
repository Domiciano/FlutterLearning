import { describe, it, expect } from 'vitest';
import { derivePromptFeatures, hasCodeIn, hasErrorIn } from './promptText';

describe('hasCodeIn', () => {
  it('detecta bloques cercados', () => {
    expect(hasCodeIn('mira esto:\n```java\nint x = 1;\n```')).toBe(true);
  });

  it('detecta código en línea', () => {
    expect(hasCodeIn('¿qué hace `@Autowired`?')).toBe(true);
  });

  it('detecta código pegado sin cercar', () => {
    expect(hasCodeIn('public class Foo {\n  int x;\n}')).toBe(true);
    expect(hasCodeIn('import java.util.List;')).toBe(true);
  });

  it('no marca una pregunta en prosa', () => {
    expect(hasCodeIn('¿por qué se usa inyección de dependencias?')).toBe(false);
  });
});

describe('hasErrorIn', () => {
  it('detecta excepciones de Java y de Dart', () => {
    expect(hasErrorIn('me sale NullPointerException')).toBe(true);
    expect(hasErrorIn('FormatException: Unexpected character')).toBe(true);
  });

  it('detecta trazas de pila', () => {
    expect(hasErrorIn('at com.foo.Bar.baz(Bar.java:42)')).toBe(true);
    expect(hasErrorIn('#0      main (package:app/main.dart:12)')).toBe(true);
  });

  it('detecta mensajes en prosa del compilador', () => {
    expect(hasErrorIn('cannot find symbol')).toBe(true);
    expect(hasErrorIn('Caused by: algo')).toBe(true);
  });

  it('no marca una pregunta sin error', () => {
    expect(hasErrorIn('¿cómo declaro un stream?')).toBe(false);
  });
});

describe('derivePromptFeatures', () => {
  it('devuelve las tres derivadas juntas', () => {
    const f = derivePromptFeatures('falla con `NullPointerException` en mi bean');
    expect(f.charCount).toBeGreaterThan(0);
    expect(f.hasCode).toBe(true);
    expect(f.hasError).toBe(true);
  });

  it('tolera texto vacío', () => {
    expect(derivePromptFeatures(undefined)).toEqual({ charCount: 0, hasCode: false, hasError: false });
  });
});
