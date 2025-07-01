// src/pages/LessonPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import LessonParser from '@/components/util/LessonParser';
import allLessonRawContents from '@/components/util/lessonImporter';
import TableOfContents from '@/components/lesson/TableOfContents';

const LessonPage = ({ sections }) => {
  const { lessonId } = useParams();
  const [loading, setLoading] = useState(true);
  const [parsedContent, setParsedContent] = useState({ elements: null, subtitles: [] });

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

    const filePath = lessonMap.get(lessonId);

    if (filePath && allLessonRawContents[filePath]) {
      const rawContent = allLessonRawContents[filePath];
      
      // Parse the content to get elements and subtitles
      const parsed = LessonParser({ content: rawContent });
      setParsedContent(parsed);
    } else {
      const errorContent = `[p]Lo siento, la lección con ID "${lessonId}" no fue encontrada o el archivo "${filePath}" no existe.`;
      
      const parsed = LessonParser({ content: errorContent });
      setParsedContent(parsed);
    }
    setLoading(false);
  }, [lessonId, lessonMap]);

  if (loading) {
    return <div>Cargando contenido de la lección...</div>;
  }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flex: 1 }}>
        {parsedContent.elements}
      </div>
      <div style={{ width: '280px', flexShrink: 0, display: { xs: 'none', lg: 'block' } }}>
        <TableOfContents subtitles={parsedContent.subtitles} />
      </div>
    </div>
  );
};

export default LessonPage;