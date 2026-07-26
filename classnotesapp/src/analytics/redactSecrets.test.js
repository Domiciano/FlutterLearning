import { describe, it, expect } from 'vitest';
import { redactSecrets, REDACTED } from './redactSecrets';

const KEY = 'AIzaSyC0000000000000000000000000000000';

describe('redactSecrets — filtro de salida de la analítica', () => {
  it('borra la clave guardada allí donde aparezca', () => {
    const out = redactSecrets({ message: `falló con ${KEY} al final` }, [KEY]);
    expect(out.message).not.toContain(KEY);
    expect(out.message).toContain(REDACTED);
  });

  it('borra una clave con pinta de Google aunque no sea la guardada', () => {
    // El caso real: el estudiante pega SU clave dentro del chat y el texto del
    // prompt viaja como evento.
    const otra = 'AIzaSyB1111111111111111111111111111111';
    const out = redactSecrets({ text: `mi clave es ${otra}` }, [null]);
    expect(out.text).not.toContain(otra);
  });

  it('reconoce también el formato nuevo AQ.… , que lleva punto', () => {
    const nueva = 'AQ.Ab0XX0XXXxxx0xXXXx0xXxX_x0XXXx0XxxX0xXxX0XxxXxX';
    const out = redactSecrets({ text: `pegué ${nueva} aquí` }, []);
    expect(out.text).not.toContain(nueva);
    expect(out.text).toContain(REDACTED);
  });

  it('la fuga típica: la clave dentro del mensaje de un error anidado', () => {
    const payload = { error: { detail: { url: `https://api/x?key=${KEY}` } } };
    const out = redactSecrets(payload, [KEY]);
    expect(JSON.stringify(out)).not.toContain(KEY);
  });

  it('recorre arreglos', () => {
    const out = redactSecrets({ items: ['ok', `x ${KEY}`] }, [KEY]);
    expect(out.items[0]).toBe('ok');
    expect(out.items[1]).not.toContain(KEY);
  });

  it('deja intacto lo que no es texto', () => {
    const out = redactSecrets({ n: 42, b: true, z: null, s: 'hola' }, [KEY]);
    expect(out).toEqual({ n: 42, b: true, z: null, s: 'hola' });
  });

  it('no destroza el payload cuando no hay clave guardada', () => {
    const payload = { text: '¿por qué falla mi bean?', charCount: 24 };
    expect(redactSecrets(payload, [])).toEqual(payload);
  });

  it('ignora secretos demasiado cortos, que borrarían texto legítimo', () => {
    // Con un secreto de 3 letras, redactar toda aparición mutilaría el corpus.
    const out = redactSecrets({ text: 'abc y más abc' }, ['abc']);
    expect(out.text).toBe('abc y más abc');
  });
});
