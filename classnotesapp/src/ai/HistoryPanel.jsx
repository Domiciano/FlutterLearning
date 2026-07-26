// src/ai/HistoryPanel.jsx
//
// Historial del propio estudiante, descendente por fecha y agrupado por
// conversación. Cada entrada se puede reabrir: se reusa el texto de la pregunta
// contra el contenido ACTUAL de la lección, no contra el que tenía entonces.

import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useThemeMode } from '@/theme/ThemeContext';
import { useAi } from './AiProvider';

const fmtDate = (createdAt) => {
  const d = createdAt?.toDate?.() ?? (createdAt ? new Date(createdAt) : null);
  if (!d) return '';
  return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
};

const HistoryPanel = ({ onReuse }) => {
  const { theme } = useThemeMode();
  const { history, loadHistory, reusePrompt } = useAi();
  const [lessonFilter, setLessonFilter] = useState('todas');

  useEffect(() => { if (history === null) loadHistory(); }, [history, loadHistory]);

  // Una conversación de 10 turnos es UN episodio de ayuda, no diez: se muestra
  // por hilo, con la primera pregunta como encabezado.
  const conversations = useMemo(() => {
    if (!history) return [];
    const byId = new Map();
    for (const entry of history) {
      const key = entry.conversationId ?? entry.id;
      const group = byId.get(key);
      if (!group) byId.set(key, { key, first: entry, turns: 1, last: entry });
      else {
        group.turns += 1;
        if ((entry.turnIndex ?? 0) < (group.first.turnIndex ?? 0)) group.first = entry;
      }
    }
    return [...byId.values()];
  }, [history]);

  const lessons = useMemo(() => {
    const seen = new Map();
    conversations.forEach((c) => {
      if (c.first.contentId) seen.set(c.first.contentId, c.first.lessonTitle || c.first.contentId);
    });
    return [...seen.entries()];
  }, [conversations]);

  const shown = lessonFilter === 'todas'
    ? conversations
    : conversations.filter((c) => c.first.contentId === lessonFilter);

  if (history === null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={22} sx={{ color: theme.accent }} />
      </Box>
    );
  }

  if (conversations.length === 0) {
    return (
      <Typography sx={{ color: theme.textSecondary, fontSize: '0.88rem', py: 3 }}>
        Todavía no has preguntado nada. Lo que preguntes aquí quedará guardado para que
        puedas volver a consultarlo.
      </Typography>
    );
  }

  const restBorder = alpha(theme.textSecondary, 0.45);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {lessons.length > 1 && (
        <TextField
          select
          size="small"
          value={lessonFilter}
          onChange={(e) => setLessonFilter(e.target.value)}
          sx={{
            mb: 1.5,
            '& .MuiInputBase-input': { color: theme.textPrimary, fontSize: '0.85rem' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: restBorder },
          }}
        >
          <MenuItem value="todas">Todas las lecciones</MenuItem>
          {lessons.map(([id, title]) => (
            <MenuItem key={id} value={id}>{title}</MenuItem>
          ))}
        </TextField>
      )}

      <Box sx={{ flex: '1 1 auto', overflowY: 'auto', pr: 0.5 }}>
        {shown.map(({ key, first, turns }) => (
          <Box
            key={key}
            sx={{
              p: 1.5, mb: 1.25, borderRadius: 2,
              border: `1px solid ${restBorder}`,
              background: alpha(theme.textSecondary, 0.05),
            }}
          >
            <Typography sx={{ color: theme.textSecondary, fontSize: '0.72rem', mb: 0.5 }}>
              {[first.lessonTitle, first.subsectionTitle].filter(Boolean).join(' › ') || 'Sin lección'}
              {' · '}{fmtDate(first.createdAt)}
              {turns > 1 ? ` · ${turns} turnos` : ''}
            </Typography>
            <Typography
              sx={{
                color: theme.textPrimary, fontSize: '0.87rem', lineHeight: 1.5,
                display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}
            >
              {first.text}
            </Typography>
            <Button
              size="small"
              onClick={() => onReuse?.(reusePrompt(first))}
              sx={{ textTransform: 'none', color: theme.accent, mt: 0.5, px: 0 }}
            >
              Volver a preguntar
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HistoryPanel;
