// src/theme/colors.js

export const light = {
  // Títulos y textos
  primaryTitle: '#1976D2',         // Azul Flutter para títulos
  secondaryTitle: '#2196F3',       // Azul claro para subtítulos y acentos
  textPrimary: '#222',             // Texto principal sobre fondo claro
  textSecondary: '#444',           // Texto secundario

  // Fondos
  background: '#F5F7FA',           // Fondo general claro
  backgroundLight: '#FFFFFF',      // Fondo alternativo (cards, etc.)
  drawerBg: '#F5F7FA',             // Drawer y TOC fondo (igual que background)

  // Drawer y TOC
  drawerTitle: '#222',             // Igual que tocText
  drawerSection: '#222',           // Igual que tocText
  tocTitle: '#1976D2',             // Título TOC
  tocText: '#222',                 // Texto TOC

  // AppBar
  appBarBg: '#1976D2',             // Azul Flutter (igual que primaryTitle)
  appBarText: '#fff',              // Texto blanco

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
};

export const dark = {
  // Títulos y textos
  primaryTitle: '#90caf9',         // Azul claro para títulos
  secondaryTitle: '#64B5F6',       // Azul claro para subtítulos y acentos
  textPrimary: '#F3F6FB',          // Texto principal sobre fondo oscuro
  textSecondary: '#AAB4BE',        // Texto secundario

  // Fondos
  background: '#181C23',           // Fondo general oscuro, elegante
  backgroundLight: '#232936',      // Fondo alternativo (cards, etc.)
  drawerBg: '#181C23',             // Drawer y TOC fondo (igual que background)

  // Drawer y TOC
  drawerTitle: '#F3F6FB',          // Igual que tocText
  drawerSection: '#F3F6FB',        // Igual que tocText
  tocTitle: '#90caf9',             // Título TOC
  tocText: '#F3F6FB',              // Texto TOC

  // AppBar
  appBarBg: '#11151c',             // Azul oscuro profundo, elegante y moderno
  appBarText: '#fff',              // Texto blanco

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
};

// Por defecto exportamos dark
const colors = dark;
export default colors; 