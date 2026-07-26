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
import 'prismjs/themes/prism-tomorrow.css';

// AnalyticsProvider va dentro de AuthGate: necesita uid y perfil, y sin
// `analyticsConsent === true` queda inerte y no encola ni un evento.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AuthGate>
          <AnalyticsProvider>
            <StudiedLessonsProvider>
              <LessonContentCacheProvider>
                <BrowserRouter basename={import.meta.env.BASE_URL}>
                  <App />
                </BrowserRouter>
              </LessonContentCacheProvider>
            </StudiedLessonsProvider>
          </AnalyticsProvider>
        </AuthGate>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
