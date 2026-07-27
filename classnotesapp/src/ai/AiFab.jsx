// src/ai/AiFab.jsx
//
// Punto de entrada del módulo de IA: botón flotante + panel con dos pestañas.
//
// zIndex 1200 a propósito: el panel de TOC móvil de `pages/LessonPage.jsx` usa
// 2000, y tiene que taparlo cuando está abierto, no al revés.
//
// En escritorio el panel abre como diálogo centrado; en móvil, como hoja inferior
// casi a pantalla completa, respetando `env(safe-area-inset-bottom)` para no
// quedar bajo la barra de gestos de iOS.

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Fab from '@mui/material/Fab';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import { useThemeMode } from '@/theme/ThemeContext';
import { useAi } from './AiProvider';
import ConnectKeyScreen from './ConnectKeyScreen';
import ChatPanel from './ChatPanel';
import HistoryPanel from './HistoryPanel';

const FAB_Z = 1200;

const AiFab = () => {
  const { theme } = useThemeMode();
  const { available, hasKey, forgetKey } = useAi();
  const isMobile = useMediaQuery('(max-width:768px)');

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [draft, setDraft] = useState('');

  // Sin modelo configurado o sin sesión, el módulo no existe: mejor que un botón
  // que abre algo roto.
  if (!available) return null;

  const close = () => setOpen(false);

  const onReuse = (text) => { setDraft(text); setTab(0); };

  return (
    <>
      <Tooltip title="Preguntar sobre esta lección">
        <Fab
          onClick={() => setOpen(true)}
          aria-label="Abrir el asistente del curso"
          sx={{
            position: 'fixed',
            right: 24,
            bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
            zIndex: FAB_Z,
            background: theme.accent,
            color: theme.appBarText,
            '&:hover': { background: theme.accent, filter: 'brightness(0.94)' },
          }}
        >
          <AutoAwesomeIcon />
        </Fab>
      </Tooltip>

      <Dialog
        open={open}
        onClose={close}
        fullWidth
        // `maxWidth={false}` desactiva el tope por breakpoint de MUI; el tamaño
        // real lo fija el `sx` de abajo. Con el preajuste "sm" el panel se
        // quedaba en 640 px, y una respuesta con un bloque de código dentro
        // salía envuelta en tres líneas por cada una.
        maxWidth={false}
        PaperProps={{
          sx: {
            background: theme.backgroundLight,
            backgroundImage: 'none',
            ...(isMobile
              ? {
                  position: 'fixed',
                  left: 0, right: 0, bottom: 0, top: 12,
                  m: 0,
                  maxWidth: '100%',
                  borderRadius: '16px 16px 0 0',
                  pb: 'env(safe-area-inset-bottom, 0px)',
                }
              : {
                  // Ancho relativo con tope: en un portátil de 1280 px ocupa
                  // casi todo, y en un monitor grande no se estira hasta hacer
                  // ilegibles las líneas de texto.
                  width: '90vw',
                  maxWidth: 960,
                  height: '85vh',
                  maxHeight: 900,
                }),
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ color: theme.textPrimary, fontWeight: 700 }}>
              Asistente del curso
            </Typography>
            <IconButton onClick={close} size="small" aria-label="Cerrar" sx={{ color: theme.textSecondary }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {!hasKey ? (
            <Box sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
              <ConnectKeyScreen onDone={() => setTab(0)} onDismiss={close} />
            </Box>
          ) : (
            <>
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                sx={{
                  minHeight: 36, mb: 1,
                  '& .MuiTab-root': { minHeight: 36, textTransform: 'none', color: theme.textSecondary },
                  '& .Mui-selected': { color: `${theme.accent} !important` },
                  '& .MuiTabs-indicator': { backgroundColor: theme.accent },
                }}
              >
                <Tab label="Chat" />
                <Tab label="Historial" />
              </Tabs>

              <Box sx={{ flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                {tab === 0
                  ? <ChatPanel draft={draft} onDraftUsed={() => setDraft('')} />
                  : <HistoryPanel onReuse={onReuse} />}
              </Box>

              <Box sx={{ pt: 1, borderTop: `1px solid ${alpha(theme.textSecondary, 0.2)}`, mt: 1 }}>
                <Button
                  size="small"
                  onClick={forgetKey}
                  sx={{ textTransform: 'none', color: theme.textSecondary, fontSize: '0.75rem' }}
                >
                  Olvidar esta clave en este dispositivo
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default AiFab;
