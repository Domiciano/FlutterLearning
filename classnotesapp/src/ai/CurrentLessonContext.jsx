// src/ai/CurrentLessonContext.jsx
//
// Qué lección y qué apartado tiene el estudiante delante ahora mismo. `LessonPage`
// lo publica; el módulo de IA lo consume para componer el contexto y para anclar
// cada prompt a `contentId` / `tocSection` / `subsectionId`.
//
// Va en un contexto propio y no dentro del de IA porque no es información de IA:
// es el estado de lectura, y F3 (autoexamen) va a necesitar lo mismo.

import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';

const CurrentLessonContext = createContext(null);

const EMPTY = {
  contentId: null,
  lessonTitle: null,
  tocSection: null,
  rawContent: null,
  subtitles: [],
  topics: [],
  subsectionId: null,
  subsectionTitle: null,
};

export function CurrentLessonProvider({ children }) {
  const [lesson, setLesson] = useState(EMPTY);

  // La lección y el apartado cambian por caminos distintos —una al navegar, el
  // otro al hacer scroll—, así que se actualizan por separado para no reescribir
  // el markdown entero en cada píxel de scroll.
  const setCurrentLesson = useCallback((next) => {
    setLesson((prev) => ({ ...prev, ...next }));
  }, []);

  const setCurrentSubsection = useCallback((subsectionId, subsectionTitle) => {
    setLesson((prev) =>
      prev.subsectionId === subsectionId ? prev : { ...prev, subsectionId, subsectionTitle }
    );
  }, []);

  const clearCurrentLesson = useCallback(() => setLesson(EMPTY), []);

  const value = useMemo(
    () => ({ lesson, setCurrentLesson, setCurrentSubsection, clearCurrentLesson }),
    [lesson, setCurrentLesson, setCurrentSubsection, clearCurrentLesson]
  );

  return <CurrentLessonContext.Provider value={value}>{children}</CurrentLessonContext.Provider>;
}

// Fuera del proveedor devuelve el estado vacío en vez de reventar: el FAB de IA
// se monta en el layout y puede existir en rutas que no son de lección.
export function useCurrentLesson() {
  return useContext(CurrentLessonContext) ?? {
    lesson: EMPTY,
    setCurrentLesson: () => {},
    setCurrentSubsection: () => {},
    clearCurrentLesson: () => {},
  };
}
