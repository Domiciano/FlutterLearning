// src/ai/ChatPanel.jsx
//
// Hilo de turnos con la lección actual como contexto. Al cambiar de lección el
// proveedor abre una conversación nueva (ver AiProvider): mezclar dos lecciones
// en un hilo rompe el anclaje a `contentId`, que es lo que hace útil el corpus.

import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import StopIcon from '@mui/icons-material/Stop';
import { alpha } from '@mui/material/styles';
import { useThemeMode } from '@/theme/ThemeContext';
import { useAi } from './AiProvider';

const Turn = ({ turn, theme }) => {
  const mine = turn.role === 'user';
  return (
    <Box sx={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start', mb: 1.5 }}>
      <Box
        sx={{
          maxWidth: '85%',
          px: 1.75, py: 1.25,
          borderRadius: 2,
          background: mine ? alpha(theme.accent, 0.18) : alpha(theme.textSecondary, 0.08),
          border: `1px solid ${mine ? alpha(theme.accent, 0.4) : alpha(theme.textSecondary, 0.25)}`,
          color: theme.textPrimary,
          fontSize: '0.9rem',
          lineHeight: 1.6,
          // La respuesta trae markdown y saltos de línea; se muestra tal cual en
          // vez de renderizarla, para no reinterpretar el código que devuelve.
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {turn.text}
        {turn.pending && !turn.text && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: theme.textSecondary }}>
            <CircularProgress size={14} sx={{ color: theme.accent }} />
            <Typography sx={{ fontSize: '0.85rem' }}>Pensando…</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const ChatPanel = ({ draft, onDraftUsed }) => {
  const { theme } = useThemeMode();
  const { turns, sending, error, send, stop, lesson, clearError } = useAi();

  const [text, setText] = useState('');
  // Tema del último atajo pulsado, solo para registrar por dónde entró la
  // pregunta. No cambia cómo responde el asistente.
  const [topicTag, setTopicTag] = useState(null);
  const bottomRef = useRef(null);

  // "Volver a preguntar" desde el historial deja el texto aquí, sin enviarlo: el
  // estudiante decide si lo reformula antes.
  useEffect(() => {
    if (!draft) return;
    setText(draft);
    onDraftUsed?.();
  }, [draft, onDraftUsed]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [turns]);

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim() || sending) return;
    send(text, topicTag);
    setText('');
    setTopicTag(null);
  };

  // Un atajo no envía nada: deja la pregunta escrita para que el estudiante la
  // afine antes de mandarla. Enviar de golpe convierte el chip en una ruleta.
  const useTopic = (topic) => {
    setText(`Explícame «${topic}»`);
    setTopicTag(topic);
  };

  const restBorder = alpha(theme.textSecondary, 0.45);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>
      <Typography sx={{ color: theme.textSecondary, fontSize: '0.78rem', mb: 1 }}>
        {lesson.lessonTitle
          ? <>Preguntando sobre <b>{lesson.lessonTitle}</b>{lesson.subsectionTitle ? ` › ${lesson.subsectionTitle}` : ''}</>
          : 'Abre una lección para preguntar sobre ella.'}
      </Typography>

      <Box sx={{ flex: '1 1 auto', overflowY: 'auto', minHeight: 160, pr: 0.5, mb: 1 }}>
        {turns.length === 0 && (
          <Typography sx={{ color: theme.textSecondary, fontSize: '0.88rem', py: 2 }}>
            Pregúntale lo que quieras sobre esta lección. Tiene el material delante.
          </Typography>
        )}
        {turns.map((turn, i) => <Turn key={i} turn={turn} theme={theme} />)}
        <div ref={bottomRef} />
      </Box>

      {error && (
        <Box
          sx={{
            p: 1.25, mb: 1, borderRadius: 1.5,
            border: `1px solid ${alpha(theme.error, 0.5)}`,
            background: alpha(theme.error, 0.1),
          }}
        >
          <Typography sx={{ color: theme.error, fontSize: '0.82rem' }}>{error}</Typography>
          <Button onClick={clearError} size="small" sx={{ textTransform: 'none', color: theme.textSecondary }}>
            Entendido
          </Button>
        </Box>
      )}

      {/* Atajos de la lección que se está leyendo, no cinco frases genéricas
          iguales en todo el curso. Salen de las etiquetas del .md o, si no las
          hay, de los títulos de los apartados. Ver ai/lessonTags.js. */}
      {turns.length === 0 && lesson.topics?.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1 }}>
          {lesson.topics.map((topic) => (
            <Chip
              key={topic}
              label={topic}
              size="small"
              onClick={() => useTopic(topic)}
              sx={{
                fontSize: '0.75rem',
                color: theme.textSecondary,
                borderColor: restBorder,
                '&:hover': { borderColor: theme.accent, color: theme.accent },
              }}
              variant="outlined"
            />
          ))}
        </Box>
      )}

      <Box component="form" onSubmit={submit} sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            // Enter envía, Shift+Enter salta de línea: el estudiante pega código
            // a menudo y necesita los saltos.
            if (e.key === 'Enter' && !e.shiftKey) submit(e);
          }}
          placeholder="Escribe tu pregunta…"
          multiline
          maxRows={6}
          fullWidth
          size="small"
          sx={{
            '& .MuiInputBase-input': { color: theme.textPrimary, fontSize: '0.9rem' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: restBorder },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.accent },
          }}
        />
        {sending ? (
          <IconButton onClick={stop} aria-label="Detener" sx={{ color: theme.error }}>
            <StopIcon />
          </IconButton>
        ) : (
          <IconButton type="submit" disabled={!text.trim()} aria-label="Enviar" sx={{ color: theme.accent }}>
            <SendIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default ChatPanel;
