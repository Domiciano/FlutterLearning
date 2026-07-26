// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeContext';
import { StudiedLessonsProvider } from './theme/StudiedLessonsContext';
import { LessonContentCacheProvider } from './theme/LessonContentCache';
import { AuthProvider } from './auth/AuthContext';
import AuthGate from './auth/AuthGate';
import { AnalyticsProvider } from './analytics/AnalyticsProvider';
import { CurrentLessonProvider } from './ai/CurrentLessonContext';
import { AiProvider } from './ai/AiProvider';
import 'prismjs/themes/prism-tomorrow.css';

// AnalyticsProvider va dentro de AuthGate: necesita uid y perfil, y sin
// `analyticsConsent === true` queda inerte y no encola ni un evento.
//
// CurrentLessonProvider envuelve a AiProvider porque este último consume la
// lección en curso para componer el contexto; y los dos van dentro de
// AnalyticsProvider, porque el módulo de IA emite eventos.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AuthGate>
          <AnalyticsProvider>
            <CurrentLessonProvider>
              <AiProvider>
                <StudiedLessonsProvider>
                  <LessonContentCacheProvider>
                    <BrowserRouter basename={import.meta.env.BASE_URL}>
                      <App />
                    </BrowserRouter>
                  </LessonContentCacheProvider>
                </StudiedLessonsProvider>
              </AiProvider>
            </CurrentLessonProvider>
          </AnalyticsProvider>
        </AuthGate>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
