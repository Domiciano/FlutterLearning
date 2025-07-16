import { useState, useEffect, useCallback } from 'react';

export default function useStudiedLessons() {
  const [studiedLessons, setStudiedLessons] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('studiedLessons') || '[]');
    } catch {
      return [];
    }
  });

  // Sincronizar con cambios en otras pestañas/ventanas
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

  // Actualizar localStorage y estado
  const toggleStudied = useCallback((lessonId) => {
    setStudiedLessons(prev => {
      let updated;
      if (prev.includes(lessonId)) {
        updated = prev.filter(id => id !== lessonId);
      } else {
        updated = [...prev, lessonId];
      }
      localStorage.setItem('studiedLessons', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return [studiedLessons, toggleStudied];
} 