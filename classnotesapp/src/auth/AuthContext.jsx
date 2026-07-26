// src/auth/AuthContext.jsx
//
// Owns the whole auth lifecycle: Google sign-in, the student profile
// (full name + GitHub) stored in Firestore, and the derived `status` the
// AuthGate switches on. When Firebase isn't configured the provider is a
// no-op that reports `status: 'ready'`, so the app renders ungated.

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from './firebase';
import { isFirebaseConfigured, courseId } from './firebaseConfig';
import { TERMS_VERSION } from './terms';
import { assignTemplate } from '@/ai/promptTemplates';
import { clearAllApiKeys } from '@/ai/apiKeyStore';

const AuthContext = createContext(null);

// status: 'loading' | 'signed-out' | 'need-terms' | 'need-profile' | 'ready'
// Completeness depends on role: teachers/others just need name + role;
// students must also provide their código and GitHub.
const isProfileComplete = (p) => {
  if (!p || !p.fullName?.trim() || !p.role) return false;
  if (p.role === 'otro' && !p.roleOther?.trim()) return false;
  if (p.role === 'estudiante' && (!p.codigo?.trim() || !p.github?.trim())) return false;
  return true;
};

// El acceso está condicionado a aceptar los términos vigentes. Comparar la
// versión guardada contra `TERMS_VERSION` hace que subir la versión del
// documento obligue a todos a leerlo y aceptarlo de nuevo en su siguiente
// ingreso, en vez de dejar consentimientos dados sobre un texto que ya cambió.
const hasAcceptedTerms = (p) =>
  p?.analyticsConsent === true && p?.termsVersion === TERMS_VERSION;

// Un perfil sin términos aceptados no llega a 'ready' aunque esté completo.
const statusFor = (p) => {
  if (!hasAcceptedTerms(p)) return 'need-terms';
  return isProfileComplete(p) ? 'ready' : 'need-profile';
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  // If Firebase isn't set up, skip straight to 'ready' (ungated app).
  const [status, setStatus] = useState(isFirebaseConfigured ? 'loading' : 'ready');
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setAuthError(null);
      if (!fbUser) {
        setUser(null);
        setProfile(null);
        setStatus('signed-out');
        return;
      }
      setUser(fbUser);
      setStatus('loading');
      try {
        const snap = await getDoc(doc(db, 'students', fbUser.uid));
        const data = snap.exists() ? snap.data() : null;
        setProfile(data);
        setStatus(statusFor(data));
      } catch (err) {
        console.error('[Auth] Error leyendo el perfil del estudiante:', err);
        // On a read error we can't tell whether the terms were accepted. Send
        // the user through the gate again rather than into the app: re-reading
        // a document is a nuisance, entering without consent on record is not.
        setProfile(null);
        setStatus('need-terms');
      }
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!isFirebaseConfigured) return;
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
        return; // user just closed the popup — not an error worth showing
      }
      console.error('[Auth] Error en el inicio de sesión con Google:', err);
      setAuthError('No se pudo iniciar sesión con Google. Inténtalo de nuevo.');
    }
  }, []);

  const saveProfile = useCallback(
    async (data) => {
      if (!isFirebaseConfigured || !user) return;
      const record = {
        uid: user.uid,
        email: user.email ?? null,
        displayName: user.displayName ?? null,
        photoURL: user.photoURL ?? null,
        fullName: data.fullName.trim(),
        role: data.role ?? null,
        roleOther: data.roleOther ?? null,
        codigo: data.codigo ?? null,
        github: data.github ?? null,
        githubUsername: data.githubUsername ?? null,
        // `analyticsConsent` no se toca aquí a propósito: lo escribe `acceptTerms`
        // y lo borra `withdrawConsent`. Si el formulario de perfil lo reescribiera,
        // un guardado posterior podría pisar el consentimiento registrado.
        courseId,
        updatedAt: serverTimestamp(),
      };
      const ref = doc(db, 'students', user.uid);
      const existing = await getDoc(ref);
      if (!existing.exists()) record.createdAt = serverTimestamp();
      await setDoc(ref, record, { merge: true });
      setProfile((prev) => ({ ...prev, ...record }));
      setStatus('ready');
    },
    [user]
  );

  // Aceptación de los términos: es a la vez el consentimiento informado para la
  // analítica (`analyticsConsent`, que el módulo de analítica exige en el origen)
  // y el registro de qué versión del documento se aceptó y cuándo. Ver
  // analitics/plan.md y src/auth/terms.js.
  const acceptTerms = useCallback(async () => {
    if (!isFirebaseConfigured || !user) return;
    const record = {
      // Las reglas de Firestore exigen `uid` en el documento, y este write puede
      // ser el que lo cree (la aceptación va antes del formulario de perfil).
      uid: user.uid,
      email: user.email ?? null,
      displayName: user.displayName ?? null,
      photoURL: user.photoURL ?? null,
      analyticsConsent: true,
      termsVersion: TERMS_VERSION,
      termsAcceptedAt: serverTimestamp(),
      courseId,
      updatedAt: serverTimestamp(),
    };
    const ref = doc(db, 'students', user.uid);
    const existing = await getDoc(ref);
    if (!existing.exists()) record.createdAt = serverTimestamp();
    await setDoc(ref, record, { merge: true });
    setProfile((prev) => ({ ...prev, ...record }));
    // `record` solo añade campos de consentimiento, así que la completitud del
    // perfil se decide con lo que ya había: quien aceptó y ya tenía perfil entra
    // directo; quien es nuevo pasa al formulario.
    setStatus(isProfileComplete(profile) ? 'ready' : 'need-profile');
  }, [user, profile]);

  // Retiro del consentimiento. Como el acceso está condicionado a la aceptación,
  // retirar implica cerrar la sesión; dejarla abierta con el consentimiento en
  // `false` sería un estado que la propia puerta rechaza. El perfil no se borra
  // (las reglas no permiten delete y perderlo rompe las claves de unión): se
  // deja constancia de que el consentimiento fue retirado y cuándo.
  const withdrawConsent = useCallback(async () => {
    if (!isFirebaseConfigured || !user) return;
    await setDoc(
      doc(db, 'students', user.uid),
      {
        uid: user.uid,
        analyticsConsent: false,
        termsVersion: null,
        consentWithdrawnAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    await signOut(auth);
  }, [user]);

  // Consentimiento específico del módulo de IA (F2). Es APARTE del general: aquí
  // se guarda texto libre del estudiante y la respuesta de un modelo, un dato
  // mucho más sensible que un `scroll_depth`. No se hereda de `analyticsConsent`.
  //
  // Al aceptarlo se fija de una vez la plantilla asignada al azar. Es el único
  // diseño causal del estudio (RQ11) y se asigna **por estudiante, no por
  // pregunta**: si variara dentro del mismo estudiante no habría contraste que
  // medir. Por eso solo se sortea si el perfil aún no tiene una.
  const setAiConsent = useCallback(
    async (value) => {
      if (!isFirebaseConfigured || !user) return;
      const next = value === true;
      const record = { uid: user.uid, aiConsent: next, updatedAt: serverTimestamp() };
      if (next) {
        record.aiConsentAt = serverTimestamp();
        // `null` es una asignación válida —es la condición de control, "sin
        // plantilla"—, así que la pregunta no es si es falsy sino si el sorteo
        // ya ocurrió. Solo `undefined` significa "todavía no se asignó".
        if (profile?.promptTemplate === undefined) {
          record.promptTemplate = assignTemplate();
        }
      }
      await setDoc(doc(db, 'students', user.uid), record, { merge: true });
      setProfile((prev) => ({ ...prev, ...record }));
    },
    [user, profile]
  );

  const signOutUser = useCallback(async () => {
    if (!isFirebaseConfigured) return;
    // La clave de API del módulo de IA vive solo en este navegador y no puede
    // sobrevivir al cierre de sesión: en un computador de sala quedaría
    // disponible para el siguiente que entre. Ver ai/apiKeyStore.js.
    clearAllApiKeys();
    await signOut(auth);
  }, []);

  const value = {
    configured: isFirebaseConfigured,
    status,
    user,
    profile,
    authError,
    signInWithGoogle,
    saveProfile,
    acceptTerms,
    withdrawConsent,
    setAiConsent,
    signOutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
