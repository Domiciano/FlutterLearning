import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // <--- No BrowserRouter aquí
import '@/App.css';

import Layout from '@/components/drawer/Layout';
import TableOfContentsParser from '@/components/util/TableOfContentsParser';
import tocContent from '@/content/toc.md?raw';
import LessonPage from '@/pages/LessonPage';

function App() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSections = async () => {
      try {
        const parsedSections = await TableOfContentsParser(tocContent);
        setSections(parsedSections);
      } catch (error) {
        console.error("Error cargando la tabla de contenido:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSections();
  }, []);

  const firstLessonId = useMemo(() => {
    const firstLesson = sections.find(s => s.type === 'lesson');
    return firstLesson ? firstLesson.id : null;
  }, [sections]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.2em' }}>
        Cargando contenido del curso...
      </div>
    );
  }

  if (sections.length === 0 || !firstLessonId) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h2>No se pudo cargar el contenido del curso.</h2>
        <p>Por favor, verifica el archivo `toc.md` y la carpeta `content`.</p>
      </div>
    );
  }

  return (
    // <BrowserRouter basename="/FlutterLearning"> {/* <-- ¡ELIMINA ESTO! */}
      <Layout sections={sections}>
        <Routes>
          <Route path="/lesson/:lessonId" element={<LessonPage sections={sections} />} />
          <Route path="/" element={<Navigate to={`/lesson/${firstLessonId}`} replace />} />
          <Route path="*" element={
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h1>404 - Página no encontrada</h1>
              <p>La URL que buscas no existe.</p>
            </div>
          } />
        </Routes>
      </Layout>
    // </BrowserRouter> {/* <-- ¡ELIMINA ESTO! */}
  );
}

export default App;