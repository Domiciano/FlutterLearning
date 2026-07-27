// src/ai/AiMarkdown.jsx
//
// Renderiza la respuesta del modelo como Markdown. Gemini responde con vallas
// cercadas, listas y negritas; mostrarlo en crudo dejaba los ``` a la vista y el
// código sin resaltar ni copiable.
//
// Los bloques de código reutilizan el `CodeBlock` del visor a propósito: es el
// mismo componente que ve el estudiante en las lecciones, con el mismo resaltado
// y el mismo botón de copiar arriba a la derecha. Dos estilos distintos de
// bloque de código en la misma app serían un descuido, no una decisión.

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { alpha } from '@mui/material/styles';
import { useThemeMode } from '@/theme/ThemeContext';
import CodeBlock from '@/components/code/CodeBlock';

const AiMarkdown = ({ children }) => {
  const { theme } = useThemeMode();

  const textSx = { color: theme.textPrimary, fontSize: '0.9rem', lineHeight: 1.65 };

  const components = {
    code: ({ className, children: code }) => {
      const isBlock = typeof className === 'string' && className.startsWith('language-');
      if (!isBlock) {
        return (
          <Box
            component="code"
            sx={{
              px: 0.6, py: 0.15,
              borderRadius: 0.75,
              background: theme.inlineCodeBg,
              color: theme.inlineCodeText,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: '0.85em',
              wordBreak: 'break-word',
            }}
          >
            {code}
          </Box>
        );
      }
      const language = className.replace('language-', '');
      // `source` separa esto del código de la lección en la analítica: copiar lo
      // que te dio la IA y copiar del material son conductas distintas y H5/H7
      // se estropean si se mezclan. Ver datadict.md § 2.3.
      return (
        <Box sx={{ my: 1.5, borderRadius: 1.5, overflow: 'hidden' }}>
          <CodeBlock language={language} source="ai-response">
            {String(code).replace(/\n$/, '')}
          </CodeBlock>
        </Box>
      );
    },

    p: ({ children: c }) => <Typography component="div" sx={{ ...textSx, mb: 1.25 }}>{c}</Typography>,
    h1: ({ children: c }) => <Typography sx={{ ...textSx, fontWeight: 700, fontSize: '1.05rem', mt: 1.5, mb: 0.75 }}>{c}</Typography>,
    h2: ({ children: c }) => <Typography sx={{ ...textSx, fontWeight: 700, fontSize: '1rem', mt: 1.5, mb: 0.75 }}>{c}</Typography>,
    h3: ({ children: c }) => <Typography sx={{ ...textSx, fontWeight: 700, mt: 1.25, mb: 0.5 }}>{c}</Typography>,
    ul: ({ children: c }) => <Box component="ul" sx={{ m: 0, mb: 1.25, pl: 2.5 }}>{c}</Box>,
    ol: ({ children: c }) => <Box component="ol" sx={{ m: 0, mb: 1.25, pl: 2.5 }}>{c}</Box>,
    li: ({ children: c }) => <Typography component="li" sx={{ ...textSx, mb: 0.35 }}>{c}</Typography>,
    a: ({ href, children: c }) => (
      <Link href={href} target="_blank" rel="noreferrer" sx={{ color: theme.accent }}>{c}</Link>
    ),
    blockquote: ({ children: c }) => (
      <Box
        sx={{
          borderLeft: `3px solid ${alpha(theme.accent, 0.6)}`,
          pl: 1.5, my: 1.25,
          color: theme.textSecondary,
        }}
      >
        {c}
      </Box>
    ),
    // Una tabla ancha no puede empujar el ancho del panel: se desplaza sola.
    table: ({ children: c }) => (
      <Box sx={{ overflowX: 'auto', my: 1.25 }}>
        <Box component="table" sx={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.85rem' }}>
          {c}
        </Box>
      </Box>
    ),
    th: ({ children: c }) => (
      <Box component="th" sx={{
        border: `1px solid ${alpha(theme.textSecondary, 0.3)}`,
        p: 0.75, textAlign: 'left', color: theme.textPrimary, fontWeight: 700,
      }}>{c}</Box>
    ),
    td: ({ children: c }) => (
      <Box component="td" sx={{
        border: `1px solid ${alpha(theme.textSecondary, 0.3)}`,
        p: 0.75, color: theme.textPrimary,
      }}>{c}</Box>
    ),
    hr: () => <Box sx={{ borderTop: `1px solid ${alpha(theme.textSecondary, 0.3)}`, my: 1.5 }} />,
  };

  return (
    // `& > *:last-child` quita el margen de abajo del último bloque, que si no
    // deja un hueco raro dentro de la burbuja.
    <Box sx={{ '& > *:last-child': { mb: 0 } }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </Box>
  );
};

export default AiMarkdown;
