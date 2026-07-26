// src/analytics/ids.js
//
// UUID v4. `crypto.randomUUID` existe en todos los navegadores que soporta la app,
// pero no siempre en el entorno de pruebas (jsdom lo expone según la versión), así
// que hay un respaldo. No es criptográfico y no hace falta que lo sea: estos ids
// solo tienen que ser únicos para deduplicar al importar.

export function newId() {
  const c = globalThis.crypto;
  if (c && typeof c.randomUUID === 'function') return c.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (ch) => {
    const r = (Math.random() * 16) | 0;
    const v = ch === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
