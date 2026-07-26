// src/auth/TermsDocument.jsx
// Renderiza el texto de `terms.js`. Se usa en dos sitios con el mismo cuerpo:
// la puerta de entrada obligatoria (TermsScreen) y el diálogo de consulta del
// menú de cuenta (TermsDialog). Un solo renderizador para que lo que el
// estudiante acepta y lo que después consulta sean literalmente lo mismo.

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useThemeMode } from '@/theme/ThemeContext';
import { termsSections, TERMS_VERSION } from './terms';

// Convierte **negrita** en <strong>; el resto va tal cual.
const richText = (text) =>
  text.split(/\*\*(.+?)\*\*/g).map((chunk, i) =>
    i % 2 === 1
      ? <Box key={i} component="strong" sx={{ fontWeight: 700 }}>{chunk}</Box>
      : <React.Fragment key={i}>{chunk}</React.Fragment>
  );

const TermsDocument = ({ courseName }) => {
  const { theme } = useThemeMode();

  const bodySx = {
    color: theme.textSecondary,
    fontSize: '0.88rem',
    lineHeight: 1.65,
    mb: 1.25,
  };

  const Paragraphs = ({ items }) =>
    (items ?? []).map((text, i) => (
      <Typography key={i} sx={bodySx}>{richText(text)}</Typography>
    ));

  return (
    <Box>
      <Typography sx={{ color: theme.textSecondary, fontSize: '0.78rem', mb: 2 }}>
        Versión {TERMS_VERSION}
        {courseName ? ` · ${courseName}` : ''} · Universidad Icesi
      </Typography>

      {termsSections.map((section) => (
        <Box key={section.id} sx={{ mb: 2.5 }}>
          <Typography
            sx={{
              color: theme.textPrimary,
              fontWeight: 700,
              fontSize: '0.95rem',
              mb: 1,
            }}
          >
            {section.title}
          </Typography>

          <Paragraphs items={section.paragraphs} />

          {section.bullets && (
            <Box component="ul" sx={{ m: 0, mb: 1.25, pl: 2.5 }}>
              {section.bullets.map((text, i) => (
                <Typography key={i} component="li" sx={{ ...bodySx, mb: 0.5 }}>
                  {richText(text)}
                </Typography>
              ))}
            </Box>
          )}

          <Paragraphs items={section.paragraphsAfter} />
        </Box>
      ))}
    </Box>
  );
};

export default TermsDocument;
