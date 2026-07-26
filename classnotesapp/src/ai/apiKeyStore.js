// src/ai/apiKeyStore.js
//
// La clave de API de Gemini del estudiante vive SOLO en este navegador.
//
// Nunca se escribe en Firestore —ni en `students/`, ni en `prompts/`, ni en el
// payload de un evento—. El motivo no es paranoia: la regla que da acceso total
// al profesor por custom claim convertiría cualquier descuido en "el profesor
// puede facturar contra la cuenta de Google de sus estudiantes". No hay diseño
// de reglas que haga eso aceptable. Ver features.md § F2.
//
// Consecuencias que la UI tiene que decir en voz alta:
//   - Hay que pegar la clave en cada dispositivo.
//   - Hay un botón "Olvidar esta clave", y se borra al cerrar sesión (si no, un
//     computador de sala queda con la clave de quien lo usó antes).

const KEY = 'aiApiKey';

// Por uid: en un equipo compartido, la clave del anterior no puede quedar
// disponible para el siguiente que inicie sesión.
const storageKey = (uid) => `${KEY}:${uid}`;

export function readApiKey(uid) {
  if (!uid || typeof localStorage === 'undefined') return null;
  try {
    return localStorage.getItem(storageKey(uid)) || null;
  } catch {
    return null; // modo privado o almacenamiento bloqueado
  }
}

export function writeApiKey(uid, key) {
  if (!uid || typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(storageKey(uid), key);
  } catch {
    /* sin almacenamiento, la clave vive solo en memoria durante esta sesión */
  }
}

export function clearApiKey(uid) {
  if (!uid || typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(storageKey(uid));
  } catch {
    /* nada que borrar */
  }
}

// Barrido de todas las claves guardadas, para el cierre de sesión: en ese momento
// puede que ya no se sepa de qué uid era.
export function clearAllApiKeys() {
  if (typeof localStorage === 'undefined') return;
  try {
    const doomed = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const k = localStorage.key(i);
      if (k && k.startsWith(`${KEY}:`)) doomed.push(k);
    }
    doomed.forEach((k) => localStorage.removeItem(k));
  } catch {
    /* nada que borrar */
  }
}

// Una clave de AI Studio es una cadena larga sin espacios. Validar el formato
// aquí evita una llamada de red por un pegado con salto de línea o comillas.
export function looksLikeApiKey(raw) {
  const key = (raw ?? '').trim();
  return /^[A-Za-z0-9_-]{20,}$/.test(key);
}
