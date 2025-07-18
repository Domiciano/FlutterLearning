import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DartPadEmbed from '../embed/DartPadEmbed';
import { useThemeMode } from '@/theme/ThemeContext';
import CodeBlock from '../code/CodeBlock';

const TryCodeButton = ({ gistId, code, language }) => {
  console.log('TryCodeButton props:', { code, language, gistId });
  const [showDartPad, setShowDartPad] = useState(false);
  const { theme } = useThemeMode();
  
  return (
    <Box sx={{ my: 2 }}>
      {/* Botones tipo toggle, no pestañas */}
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <Button
          onClick={() => setShowDartPad(false)}
          sx={{
            borderRadius: 2,
            px: 2,
            py: 0.7,
            fontSize: '0.95rem',
            fontWeight: 600,
            backgroundColor: !showDartPad ? theme.accent : 'transparent',
            color: !showDartPad ? '#fff' : theme.textSecondary,
            border: !showDartPad ? 'none' : `1px solid ${theme.border}`,
            boxShadow: 'none',
            outline: 'none',
            minWidth: 0,
            transition: 'all 0.18s',
            '&:hover': {
              backgroundColor: !showDartPad ? theme.accent : theme.backgroundLight,
              color: !showDartPad ? '#fff' : theme.textPrimary,
              border: `1px solid ${theme.accent}`,
            },
          }}
        >
          Código
        </Button>
        <Button
          onClick={() => setShowDartPad(true)}
          sx={{
            borderRadius: 2,
            px: 2,
            py: 0.7,
            fontSize: '0.95rem',
            fontWeight: 600,
            backgroundColor: showDartPad ? theme.accent : 'transparent',
            color: showDartPad ? '#fff' : theme.textSecondary,
            border: showDartPad ? 'none' : `1px solid ${theme.border}`,
            boxShadow: 'none',
            outline: 'none',
            minWidth: 0,
            transition: 'all 0.18s',
            '&:hover': {
              backgroundColor: showDartPad ? theme.accent : theme.backgroundLight,
              color: showDartPad ? '#fff' : theme.textPrimary,
              border: `1px solid ${theme.accent}`,
            },
          }}
        >
          Fire it up!
        </Button>
      </Box>
      {/* Contenido de los botones */}
      <Box sx={{ 
        border: 'none',
        borderRadius: 2,
        overflow: 'hidden',
        mt: 0,
        p: 0
      }}>
        {showDartPad ? (
          <DartPadEmbed gistId={gistId} />
        ) : (
          <CodeBlock language={language}>{code}</CodeBlock>
        )}
      </Box>
    </Box>
  );
};

export default TryCodeButton; 