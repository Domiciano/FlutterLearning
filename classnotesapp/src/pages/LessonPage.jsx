// src/pages/LessonPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import LessonParser from '@/components/util/LessonParser'; // Correcto, asume que LessonParser está en 'components/util'
import allLessonRawContents from '@/components/util/lessonImporter'; // ¡Ruta corregida!
import { getFirstTitleFromMarkdown } from '@/components/util/markdownUtils'; // ¡Ruta corregida!

const LessonPage = ({ sections }) => {
  const { lessonId } = useParams();
  const [lessonContent, setLessonContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessonTitle, setLessonTitle] = useState('Cargando lección...');

  const lessonMap = useMemo(() => {
    const map = new Map();
    sections.forEach(sec => {
      if (sec.type === 'lesson') {
        map.set(sec.id, sec.filePath);
      }
    });
    return map;
  }, [sections]);

  useEffect(() => {
    setLoading(true);
    setLessonContent(null);
    setLessonTitle('Cargando lección...');

    const filePath = lessonMap.get(lessonId);

    if (filePath && allLessonRawContents[filePath]) {
      const rawContent = allLessonRawContents[filePath];
      setLessonContent(rawContent);
      setLessonTitle(getFirstTitleFromMarkdown(rawContent) || `Lección ${lessonId}`);
    } else {
      setLessonContent(`[p]Lo siento, la lección con ID "${lessonId}" no fue encontrada o el archivo "${filePath}" no existe.`);
      setLessonTitle('Lección no encontrada');
    }
    setLoading(false);
  }, [lessonId, lessonMap]);

  if (loading) {
    return <div>Cargando contenido de la lección...</div>;
  }

  return (
    <div>
      <LessonParser content={lessonContent} />
    </div>
  );
};

export default LessonPage;