import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAnalytics } from '@/analytics/AnalyticsProvider';
import { EVENTS } from '@/analytics/events';

const StudiedLessonsContext = createContext();

export function StudiedLessonsProvider({ children }) {
  const { track } = useAnalytics();
  const [studiedLessons, setStudiedLessons] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('studiedLessons') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('studiedLessons', JSON.stringify(studiedLessons));
  }, [studiedLessons]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'studiedLessons') {
        try {
          setStudiedLessons(JSON.parse(e.newValue || '[]'));
        } catch {
          setStudiedLessons([]);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // El auto-reporte de "ya la estudié" es la base de H11: se contrasta contra el
  // tiempo activo real de esa lección para medir la calibración metacognitiva.
  // El evento se emite fuera del actualizador de estado — dentro, StrictMode lo
  // invoca dos veces y cada marcado quedaría duplicado.
  const toggleStudied = useCallback((lessonId) => {
    const marking = !studiedLessons.includes(lessonId);
    track(
      marking ? EVENTS.LESSON_MARKED_STUDIED : EVENTS.LESSON_UNMARKED_STUDIED,
      {},
      { contentId: lessonId }
    );
    setStudiedLessons(prev =>
      prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
    );
  }, [studiedLessons, track]);

  return (
    <StudiedLessonsContext.Provider value={{ studiedLessons, toggleStudied }}>
      {children}
    </StudiedLessonsContext.Provider>
  );
}

export function useStudiedLessons() {
  return useContext(StudiedLessonsContext);
} 