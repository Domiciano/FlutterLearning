// src/pages/LessonPage.jsx

import React, { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import LessonParser from '@/components/lesson/LessonParser';
import allLessonRawContents from '@/utils/lessonImporter';
import TableOfContents from '@/components/lesson/TableOfContents';
import { useThemeMode } from '@/theme/ThemeContext';
import CloseIcon from '@mui/icons-material/Close';
import { useContentSpy } from '@/hooks/useContentSpy';

const LessonPage = forwardRef(({ sections }, ref) => {
  const { lessonId } = useParams();
  const [loading, setLoading] = useState(true);
  const [parsedContent, setParsedContent] = useState({ elements: null, subtitles: [], lessonTitle: '' });
  const [showMobileToc, setShowMobileToc] = useState(false);
  const { theme } = useThemeMode();
  
  // Use content spy to track active section
  const { activeSection } = useContentSpy(parsedContent.subtitles);

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
    
    // Scroll to top when lesson changes (instant, no animation)
    window.scrollTo(0, 0);
  }, [lessonId, lessonMap]);

  useImperativeHandle(ref, () => ({
    openMobileToc: () => setShowMobileToc(true),
    closeMobileToc: () => setShowMobileToc(false),
  }));

  if (loading) {
    return <div>Cargando contenido de la lección...</div>;
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      width: '100%', 
      flexDirection: { xs: 'column', lg: 'row' } 
    }}>
      <Box sx={{ flex: 1, width: '100%' }}>
        {parsedContent.elements}
      </Box>
      {/* TOC en desktop */}
      <Box sx={{ 
        width: { lg: '280px' }, 
        flexShrink: 0, 
        display: { xs: 'none', lg: 'block' } 
      }}>
        <TableOfContents 
          subtitles={parsedContent.subtitles} 
          lessonTitle={parsedContent.lessonTitle}
          activeSection={activeSection}
        />
      </Box>
      {/* TOC en mobile: Drawer temporal */}
      {showMobileToc && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '85vw',
            maxWidth: 320,
            height: '100vh',
            backgroundColor: theme.background,
            zIndex: 2000,
            boxShadow: 6,
            p: 2,
            display: { xs: 'block', lg: 'none' },
          }}
        >
          {/* Botón de cerrar fijo arriba a la derecha */}
          <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2100 }}>
            <button onClick={() => setShowMobileToc(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} aria-label="Cerrar TOC">
              <CloseIcon sx={{ color: theme.primaryTitle, fontSize: 28 }} />
            </button>
          </Box>
          <Box sx={{ pt: 4 }}>
            <TableOfContents 
              subtitles={parsedContent.subtitles} 
              lessonTitle={parsedContent.lessonTitle}
              activeSection={activeSection}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
});

export default LessonPage;