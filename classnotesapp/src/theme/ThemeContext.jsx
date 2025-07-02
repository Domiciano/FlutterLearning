import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { light, dark } from './colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Detectar preferencia del sistema
  const [mode, setMode] = useState('dark');

  const theme = useMemo(() => (mode === 'dark' ? dark : light), [mode]);

  const toggleTheme = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext); 