import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'; // Importa useLocation y useNavigate
import '@/App.css';

import Layout from '@/components/drawer/Layout';
import TableOfContentsParser from '@/components/util/TableOfContentsParser';
import tocContent from '@/content/toc.md?raw';
import LessonPage from '@/pages/LessonPage';

function App() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Hook para acceder al objeto location
  const navigate = useNavigate(); // Hook para navegar programáticamente

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
  }, []); // Se ejecuta solo una vez al montar

  const firstLessonId = useMemo(() => {
    const firstLesson = sections.find(s => s.type === 'lesson');
    return firstLesson ? firstLesson.id : null;
  }, [sections]);

  // *** LÓGICA CLAVE PARA EL MANEJO DE RUTAS PROFUNDAS DESDE 404.html ***
  useEffect(() => {
    // Solo actuamos si la aplicación ya cargó las secciones y si estamos en la raíz del basename
    // o si hay un parámetro de búsqueda 'p'
    if (!loading && sections.length > 0) {
      const params = new URLSearchParams(location.search);
      const deepPath = params.get('p'); // Obtiene el valor del parámetro 'p'

      if (deepPath) {
        // Si hay un deepPath, navegamos a esa ruta y reemplazamos la URL actual
        // para que la URL en el navegador se vea limpia (sin ?p=).
        navigate(deepPath, { replace: true });
      } else if (location.pathname === '/' && firstLessonId) {
        // Si no hay deepPath y estamos en la ruta raíz del basename,
        // redirigimos a la primera lección por defecto.
        navigate(`/lesson/${firstLessonId}`, { replace: true });
      }
    }
  }, [loading, sections, location.search, firstLessonId, navigate, location.pathname]); // Dependencias del efecto
  // *** FIN DE LA LÓGICA CLAVE ***

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
    // BrowserRouter está en main.jsx, NO aquí
    <Layout sections={sections}>
      <Routes>
        <Route path="/lesson/:lessonId" element={<LessonPage sections={sections} />} />
        {/* La ruta raíz ahora se manejará principalmente por el useEffect anterior.
            Este Route puede ser un placeholder o un componente de inicio. */}
        <Route path="/" element={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Iniciando curso...</h1>
            <p>Si esta página persiste, por favor recarga o contacta al administrador.</p>
          </div>
        } />
        <Route path="*" element={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>404 - Página no encontrada</h1>
            <p>La URL que buscas no existe.</p>
          </div>
        } />
      </Routes>
    </Layout>
  );
}

export default App;