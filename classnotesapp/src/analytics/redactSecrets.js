// src/analytics/redactSecrets.js
//
// Filtro de salida de la analítica: ningún evento puede llevar la clave de API
// del estudiante. Es la última barrera, no la primera — la primera es no meterla
// nunca en un payload—, pero la fuga típica no es deliberada:
//
//     catch (e) { track('ai_error', { message: e.message }) }
//
// y ese `e.message` puede traer la URL de la petición con la clave dentro. Un
// evento así se escribe en Firestore, donde el profesor lo lee por custom claim,
// y ahí ya es "el profesor puede facturar contra la cuenta de sus estudiantes".
//
// Barato de aplicar y se aplica siempre, en el único punto por donde pasan todos
// los eventos (`AnalyticsProvider.emit`). Ver features.md § F2.

export const REDACTED = '[clave-eliminada]';

// Claves de Google AI Studio: cadena larga sin espacios que empieza por "AIza".
// Se busca por patrón además de por valor conocido, para cubrir el caso de una
// clave que el estudiante pegó en el chat pero que no es la que tiene guardada.
const GOOGLE_KEY_PATTERN = /AIza[0-9A-Za-z_-]{10,}/g;

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const scrubString = (value, secrets) => {
  let out = value.replace(GOOGLE_KEY_PATTERN, REDACTED);
  for (const secret of secrets) {
    if (secret && secret.length >= 8 && out.includes(secret)) {
      out = out.replace(new RegExp(escapeRegExp(secret), 'g'), REDACTED);
    }
  }
  return out;
};

/**
 * Devuelve una copia del valor con toda aparición de una clave sustituida.
 * Recorre objetos y arreglos; deja intactos números, booleanos y null.
 *
 * @param {*} value
 * @param {string[]} secrets valores conocidos que hay que borrar (la clave guardada)
 */
export function redactSecrets(value, secrets = []) {
  const list = secrets.filter(Boolean);

  const walk = (node, depth) => {
    // Un payload de evento no es profundo; el tope evita que una estructura
    // cíclica inesperada cuelgue el hilo justo al escribir analítica.
    if (depth > 6) return node;
    if (typeof node === 'string') return scrubString(node, list);
    if (Array.isArray(node)) return node.map((item) => walk(item, depth + 1));
    if (node && typeof node === 'object') {
      const out = {};
      for (const [k, v] of Object.entries(node)) out[k] = walk(v, depth + 1);
      return out;
    }
    return node;
  };

  return walk(value, 0);
}
