// src/ai/AiProvider.jsx
//
// Estado del módulo de IA: la clave del estudiante, el hilo de conversación en
// curso, la escritura del corpus a Firestore y los eventos de analítica.
//
// Tres reglas que vienen de features.md § F2 y no son negociables:
//   1. La clave nunca sale de este navegador. Ver `apiKeyStore.js`.
//   2. Sin `students.aiConsent === true` no se guarda ni un prompt ni una
//      respuesta. Es un consentimiento APARTE del general: aquí se almacena texto
//      libre del estudiante y la respuesta de un modelo, que es un dato mucho más
//      sensible que un `scroll_depth`.
//   3. Al cambiar de lección empieza una conversación nueva. Mezclar dos lecciones
//      en un hilo rompe el anclaje a `contentId`, que es lo que hace útil el corpus.

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '@/auth/firebase';
import { isFirebaseConfigured, courseId } from '@/auth/firebaseConfig';
import { useAuth } from '@/auth/AuthContext';
import { useAnalytics } from '@/analytics/AnalyticsProvider';
import { EVENTS } from '@/analytics/events';
import { newId } from '@/analytics/ids';
import { loginBranding } from '@/auth/loginBranding';
import courseConfig from '@/content/config';
import { useCurrentLesson } from './CurrentLessonContext';
import { readApiKey, writeApiKey, clearApiKey, readModel, writeModel } from './apiKeyStore';
import { connectModel, streamGenerate } from './geminiClient';
import { composeMaterial, buildSystemInstruction } from './buildContext';
import { derivePromptFeatures } from './promptText';
import { hasPriorAttempt } from './priorAttempt';

const AiContext = createContext(null);

const MOBILE_MAX_WIDTH = 768;
const HISTORY_PAGE = 100;

const deviceOf = () => {
  const w = typeof window === 'undefined' ? 0 : window.innerWidth;
  return w > 0 && w < MOBILE_MAX_WIDTH ? 'mobile' : 'desktop';
};

export function AiProvider({ children }) {
  const { user, profile, setAiConsent } = useAuth();
  const { track } = useAnalytics();
  const { lesson, courseOutline } = useCurrentLesson();

  const uid = user?.uid ?? null;
  const [apiKey, setApiKey] = useState(null);
  const [turns, setTurns] = useState([]);      // [{ role, text, pending? }]
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(null); // null = sin cargar
  const conversationRef = useRef({ id: null, contentId: null, nextTurnIndex: 0, interactionId: null });
  const abortRef = useRef(null);

  const aiConsent = profile?.aiConsent === true;

  // El id de modelo de `content/config.js` es una PREFERENCIA, no un requisito:
  // los ids caducan y el que esté fijado puede no existir para la clave del
  // estudiante. El bueno se resuelve al conectar y se recuerda junto a la clave.
  const [model, setModel] = useState(courseConfig.aiModel);

  // La clave se lee al identificarse y se suelta al cerrar sesión: sin eso, un
  // computador de sala queda con la clave de quien lo usó antes.
  useEffect(() => {
    setApiKey(uid ? readApiKey(uid) : null);
    setModel((uid && readModel(uid)) || courseConfig.aiModel);
  }, [uid]);

  // --- Conversación --------------------------------------------------------
  // Un hilo pertenece a una lección. Cambiar de lección lo cierra y abre otro.

  useEffect(() => {
    if (conversationRef.current.contentId === lesson.contentId) return;
    abortRef.current?.abort();
    conversationRef.current = { id: null, contentId: lesson.contentId, nextTurnIndex: 0, interactionId: null };
    setTurns([]);
    setError(null);
    setSending(false);
  }, [lesson.contentId]);

  const ensureConversation = useCallback(() => {
    if (!conversationRef.current.id) {
      conversationRef.current.id = newId();
      conversationRef.current.contentId = lesson.contentId;
    }
    return conversationRef.current;
  }, [lesson.contentId]);

  // --- Clave ---------------------------------------------------------------

  const connectKey = useCallback(
    async (rawKey) => {
      const key = rawKey.trim();
      // Primero se averigua con qué modelo puede hablar esta clave, y luego se
      // comprueba con ese mismo modelo. Al revés —fijando el id de antemano— un
      // modelo retirado o no habilitado se manifestaba como un 404 opaco.
      // Prueba los modelos de esta clave en orden hasta que uno responda de
      // verdad. Salir en el primero dejaba la pantalla en "no tienes acceso a
      // ningún modelo" con la clave perfectamente buena.
      const chosen = await connectModel(key, { preferred: courseConfig.aiModel });
      writeApiKey(uid, key);
      writeModel(uid, chosen);
      setApiKey(key);
      setModel(chosen);
      // `ai_key_connected` es el DENOMINADOR del sesgo de selección: sin él,
      // `promptCount = 0` no distingue "no pide ayuda" de "no activó el módulo".
      track(EVENTS.AI_KEY_CONNECTED, {});
      return true;
    },
    [uid, track]
  );

  const forgetKey = useCallback(() => {
    clearApiKey(uid);
    setApiKey(null);
  }, [uid]);

  // --- Envío ---------------------------------------------------------------

  // Un documento por turno. Colección plana a propósito: el corpus se exporta
  // entero para codificarlo con rúbrica (H7), y una subcolección obligaría a
  // recorrer n conversaciones para armar el mismo CSV.
  const persistPrompt = useCallback(
    async ({ question, features, topicTag, priorAttempt, contextMode, conversation, turnIndex, result }) => {
      if (!isFirebaseConfigured || !db || !uid || !aiConsent) return;
      try {
        await addDoc(collection(db, 'prompts'), {
          uid,
          courseId,
          conversationId: conversation.id,
          turnIndex,
          contentId: lesson.contentId ?? null,
          lessonTitle: lesson.lessonTitle ?? null,
          tocSection: lesson.tocSection ?? null,
          subsectionId: lesson.subsectionId ?? null,
          subsectionTitle: lesson.subsectionTitle ?? null,
          text: question,
          template: null,          // RQ11 suspendido: ver features.md § F2
          topicTag: topicTag ?? null, // atajo de tema usado, si lo hubo
          createdAt: serverTimestamp(),
          ...features,
          priorAttempt,
          contextMode,
          model,
          response: {
            text: result.text,
            latencyMs: result.latencyMs,
            finishReason: result.finishReason ?? null,
            promptTokenCount: result.promptTokenCount ?? null,
            candidatesTokenCount: result.candidatesTokenCount ?? null,
          },
          device: deviceOf(),
        });
      } catch (err) {
        // Perder el registro no puede romperle el chat al estudiante.
        console.error('[AI] No se pudo guardar el prompt:', err);
      }
    },
    [uid, aiConsent, lesson, model]
  );

  const send = useCallback(
    async (text, topicTag) => {
      const question = (text ?? '').trim();
      if (!question || !apiKey || sending) return;

      setError(null);
      setSending(true);

      const conversation = ensureConversation();
      const turnIndex = conversation.nextTurnIndex;
      const priorAttempt = hasPriorAttempt(lesson.contentId);
      const features = derivePromptFeatures(question);

      const { material, contextMode } = composeMaterial({
        rawContent: lesson.rawContent,
        subtitles: lesson.subtitles,
        subsectionTitle: lesson.subsectionTitle,
      });

      // El evento se emite ANTES de la llamada: si el modelo falla o el estudiante
      // se va, la pregunta igual existió y H10 la necesita.
      track(
        EVENTS.PROMPT_CREATED,
        {
          text: question,
          ...features,
          template: null, // RQ11 suspendido: ver features.md § F2
          topicTag: topicTag ?? null,
          priorAttempt,
          conversationId: conversation.id,
          turnIndex,
          tocSection: lesson.tocSection ?? null,
          contextMode,
        },
        { contentId: lesson.contentId, subsectionId: lesson.subsectionId }
      );

      setTurns((prev) => [...prev, { role: 'user', text: question }, { role: 'model', text: '', pending: true }]);

      const systemInstruction = buildSystemInstruction({
        courseName: loginBranding.courseName,
        courseHint: courseConfig.aiCourseHint,
        tocSection: lesson.tocSection,
        lessonTitle: lesson.lessonTitle,
        subsectionTitle: lesson.subsectionTitle,
        topics: lesson.topics,
        material,
        courseOutline,
      });

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const result = await streamGenerate({
          apiKey,
          model,
          systemInstruction,
          input: question,
          // El hilo lo mantiene el servidor: la lección no se reenvía en cada
          // turno, que con 40 KB de material es la diferencia entre gastar la
          // cuota gratuita en tres preguntas o en treinta.
          previousInteractionId: conversation.interactionId,
          signal: controller.signal,
          onDelta: (delta) => {
            setTurns((prev) => {
              const next = [...prev];
              const last = next[next.length - 1];
              if (last?.role === 'model') next[next.length - 1] = { ...last, text: last.text + delta };
              return next;
            });
          },
        });

        setTurns((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last?.role === 'model') next[next.length - 1] = { ...last, pending: false };
          return next;
        });
        conversation.nextTurnIndex = turnIndex + 1;
        conversation.interactionId = result.interactionId ?? conversation.interactionId;

        track(
          EVENTS.AI_RESPONSE_RECEIVED,
          {
            text: result.text,
            charCount: result.text.length,
            latencyMs: result.latencyMs,
            finishReason: result.finishReason ?? null,
          },
          { contentId: lesson.contentId, subsectionId: lesson.subsectionId }
        );

        await persistPrompt({
          question,
          features,
          topicTag,
          priorAttempt,
          contextMode,
          conversation,
          turnIndex,
          result,
        });
      } catch (err) {
        if (err?.name === 'AbortError') {
          setTurns((prev) => prev.slice(0, -2));
        } else {
          setError(err?.message ?? 'No se pudo completar la consulta.');
          // Se retira el turno vacío del modelo, pero se deja la pregunta: el
          // estudiante la escribió y no tiene por qué volver a teclearla.
          setTurns((prev) => {
            const next = [...prev];
            if (next[next.length - 1]?.role === 'model') next.pop();
            return next;
          });
          if (err?.kind === 'key') forgetKey();
        }
      } finally {
        setSending(false);
        abortRef.current = null;
      }
    },
    [apiKey, sending, turns, lesson, courseOutline, model, track, ensureConversation, forgetKey, persistPrompt]
  );

  // --- Historial -----------------------------------------------------------

  const loadHistory = useCallback(async () => {
    if (!isFirebaseConfigured || !db || !uid) { setHistory([]); return; }
    try {
      const snap = await getDocs(
        query(
          collection(db, 'prompts'),
          where('uid', '==', uid),
          orderBy('createdAt', 'desc'),
          limit(HISTORY_PAGE)
        )
      );
      setHistory(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('[AI] No se pudo cargar el historial:', err);
      setHistory([]);
    }
  }, [uid]);

  // Reabrir una entrada del historial la trae como hilo nuevo, con el contenido
  // ACTUAL de la lección — no con el que tenía cuando se preguntó.
  const reusePrompt = useCallback(
    (entry) => {
      track(EVENTS.PROMPT_REUSED, { conversationId: entry.conversationId ?? null },
        { contentId: entry.contentId ?? null });
      return entry.text ?? '';
    },
    [track]
  );

  const acceptAiConsent = useCallback(async () => { await setAiConsent(true); }, [setAiConsent]);

  const stop = useCallback(() => abortRef.current?.abort(), []);

  const value = useMemo(
    () => ({
      available: Boolean(model) && Boolean(uid),
      apiKey,
      hasKey: Boolean(apiKey),
      aiConsent,
      turns,
      sending,
      error,
      history,
      lesson,
      connectKey,
      forgetKey,
      acceptAiConsent,
      send,
      stop,
      loadHistory,
      reusePrompt,
      clearError: () => setError(null),
    }),
    [model, uid, apiKey, aiConsent, turns, sending, error, history, lesson,
     connectKey, forgetKey, acceptAiConsent, send, stop, loadHistory, reusePrompt]
  );

  return <AiContext.Provider value={value}>{children}</AiContext.Provider>;
}

export function useAi() {
  const ctx = useContext(AiContext);
  if (!ctx) throw new Error('useAi debe usarse dentro de <AiProvider>');
  return ctx;
}
