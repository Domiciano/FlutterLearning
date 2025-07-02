// src/theme/colors.js

export const light = {
  // Títulos y textos
  contentTitle: '#1976D2',         // Azul Flutter para títulos de contenido
  contentSubtitle: '#2196F3',      // Azul claro para subtítulos de contenido
  drawerTitle: '#0D47A1',          // Azul más oscuro para títulos del drawer
  drawerSection: '#1565C0',        // Azul intermedio para secciones del drawer
  textPrimary: '#222',             // Texto principal sobre fondo claro
  textSecondary: '#444',           // Texto secundario

  // Fondos
  background: '#F5F7FA',           // Fondo general claro
  backgroundLight: '#FFFFFF',      // Fondo alternativo (cards, etc.)
  drawerBg: '#F5F7FA',             // Drawer y TOC fondo (igual que background)

  // Drawer y TOC
  tocTitle: '#1976D2',             // Título TOC
  tocText: '#222',                 // Texto TOC

  // Accentos y bordes
  accent: '#2196F3',               // Azul acento
  border: '#e0e0e0',               // Bordes sutiles

  // Inline code
  inlineCodeBg: 'rgba(120,120,120,0.10)',
  inlineCodeText: '#c7254e',

  // Otros
  error: '#D32F2F',                // Errores
  success: '#388E3C',              // Éxito
  warning: '#FFA000',              // Advertencia

  // CodeBlock
  codeBg: '#f5f5f5',
  codeText: '#222',

  appBarBg: '#0D47A1',             // Fondo AppBar claro - Azul muy oscuro
  appBarText: '#FFFFFF',              // Texto AppBar claro - Blanco para contraste
};

export const dark = {
  // Títulos y textos
  contentTitle: '#fff',         // Azul claro para títulos de contenido
  contentSubtitle: '#64B5F6',      // Azul claro para subtítulos de contenido
  drawerTitle: '#1976D2',          // Azul más fuerte para títulos del drawer
  drawerSection: '#fff',        // Azul intermedio para secciones del drawer
  textPrimary: '#F3F6FB',          // Texto principal sobre fondo oscuro
  textSecondary: '#AAB4BE',        // Texto secundario

  // Fondos
  background: '#181C23',           // Fondo general oscuro, elegante
  backgroundLight: '#232936',      // Fondo alternativo (cards, etc.)
  drawerBg: '#181C23',             // Drawer y TOC fondo (igual que background)

  // Drawer y TOC
  tocTitle: '#64B5F6',             // Título TOC
  tocText: '#F3F6FB',              // Texto TOC

  // Accentos y bordes
  accent: '#2196F3',               // Azul acento
  border: '#232936',               // Bordes sutiles

  // Inline code
  inlineCodeBg: 'rgba(120,120,120,0.22)',
  inlineCodeText: '#ffcb6b',

  // Otros
  error: '#FF5370',                // Errores
  success: '#43D39E',              // Éxito
  warning: '#FFB300',              // Advertencia

  // CodeBlock
  codeBg: '#23272e',
  codeText: '#f8f8f2',

  appBarBg: '#0D47A1',             // Fondo AppBar oscuro - Azul muy oscuro
  appBarText: '#ffffff',              // Texto AppBar oscuro - Blanco para contraste
};

// Por defecto exportamos dark
const colors = dark;
export default colors; 