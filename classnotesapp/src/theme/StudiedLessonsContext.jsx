import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const StudiedLessonsContext = createContext();

export function StudiedLessonsProvider({ children }) {
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

  const toggleStudied = useCallback((lessonId) => {
    setStudiedLessons(prev => {
      let updated;
      if (prev.includes(lessonId)) {
        updated = prev.filter(id => id !== lessonId);
      } else {
        updated = [...prev, lessonId];
      }
      return updated;
    });
  }, []);

  return (
    <StudiedLessonsContext.Provider value={{ studiedLessons, toggleStudied }}>
      {children}
    </StudiedLessonsContext.Provider>
  );
}

export function useStudiedLessons() {
  return useContext(StudiedLessonsContext);
} 