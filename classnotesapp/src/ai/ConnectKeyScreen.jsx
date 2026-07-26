// src/ai/ConnectKeyScreen.jsx
//
// Lo primero que ve quien abre el módulo de IA sin clave conectada. No es un
// diálogo dentro del chat: es la pantalla del módulo, y no se salta.
//
// "Verificar" hace una llamada real antes de guardar nada. Una clave mal pegada
// que solo falle en la primera duda de verdad es la peor forma de perder a un
// estudiante. Ver features.md § F2.

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useThemeMode } from '@/theme/ThemeContext';
import { useAi } from './AiProvider';
import { looksLikeApiKey } from './apiKeyStore';

const AI_STUDIO_URL = 'https://aistudio.google.com/apikey';

const ConnectKeyScreen = ({ onDone, onDismiss }) => {
  const { theme } = useThemeMode();
  const { connectKey, acceptAiConsent, aiConsent } = useAi();

  const [key, setKey] = useState('');
  const [consent, setConsent] = useState(aiConsent);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState(null);
  // Lo que dice Google, textual. Va debajo del mensaje amable porque es lo único
  // que permite diagnosticar un fallo sin abrir la consola del navegador — y un
  // estudiante no la va a abrir.
  const [detail, setDetail] = useState(null);

  const restBorder = alpha(theme.textSecondary, 0.45);
  const fieldSx = {
    '& .MuiInputBase-input': { color: theme.textPrimary },
    '& .MuiInputLabel-root': { color: theme.textSecondary },
    '& .MuiInputLabel-root.Mui-focused': { color: theme.accent },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: restBorder, borderWidth: 1.5 },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.accent },
    '& .MuiFormHelperText-root': { color: theme.textSecondary },
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setDetail(null);
    if (!looksLikeApiKey(key)) {
      setError('Eso no parece una clave de API. Cópiala completa, sin espacios ni comillas.');
      return;
    }
    setChecking(true);
    try {
      await connectKey(key);
      // El consentimiento se guarda después de que la clave sirva: si la clave
      // falla, el estudiante no ha consentido nada todavía.
      if (!aiConsent) await acceptAiConsent();
      onDone?.();
    } catch (err) {
      setError(err?.message ?? 'No se pudo verificar la clave.');
      setDetail(err?.detail ?? null);
    } finally {
      setChecking(false);
    }
  };

  return (
    <Box component="form" onSubmit={submit} sx={{ p: 1 }}>
      <Typography variant="h6" sx={{ color: theme.textPrimary, fontWeight: 700, mb: 0.5 }}>
        Conecta tu Gemini
      </Typography>
      <Typography sx={{ color: theme.textSecondary, fontSize: '0.9rem', mb: 2 }}>
        Este módulo usa tu propia clave de Google AI Studio. Es gratis y toma un minuto.
      </Typography>

      <Box
        component="ol"
        sx={{ color: theme.textSecondary, fontSize: '0.88rem', lineHeight: 1.7, pl: 2.5, mb: 2 }}
      >
        <li>
          Entra a{' '}
          <Link href={AI_STUDIO_URL} target="_blank" rel="noreferrer" sx={{ color: theme.accent }}>
            aistudio.google.com/apikey
          </Link>
        </li>
        <li>«Create API key» → cópiala</li>
        <li>Pégala aquí</li>
      </Box>

      <TextField
        label="Clave de API"
        type="password"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        fullWidth
        autoFocus
        autoComplete="off"
        spellCheck={false}
        error={!!error}
        helperText={error || ' '}
        sx={{ mb: detail ? 0.5 : 1, ...fieldSx }}
      />

      {detail && (
        <Box
          sx={{
            mb: 1.5, p: 1.25, borderRadius: 1.5,
            border: `1px solid ${alpha(theme.error, 0.4)}`,
            background: alpha(theme.error, 0.08),
          }}
        >
          <Typography sx={{ color: theme.textSecondary, fontSize: '0.72rem', mb: 0.5 }}>
            Respuesta de Google:
          </Typography>
          <Typography
            sx={{
              color: theme.textPrimary, fontSize: '0.75rem', lineHeight: 1.5,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              wordBreak: 'break-word',
            }}
          >
            {detail}
          </Typography>
        </Box>
      )}

      <FormControlLabel
        control={
          <Checkbox
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            sx={{ color: theme.textSecondary, '&.Mui-checked': { color: theme.accent }, pt: 0 }}
          />
        }
        sx={{ alignItems: 'flex-start', m: 0, mb: 2 }}
        label={
          <Typography sx={{ color: theme.textPrimary, fontSize: '0.85rem', lineHeight: 1.5 }}>
            Entiendo que mis preguntas y las respuestas del modelo se guardan para la
            investigación del curso.
          </Typography>
        }
      />

      <Box
        sx={{
          p: 1.5, mb: 2, borderRadius: 2,
          border: `1px solid ${restBorder}`,
          background: alpha(theme.textSecondary, 0.05),
        }}
      >
        <Typography sx={{ color: theme.textSecondary, fontSize: '0.8rem', lineHeight: 1.6 }}>
          <Box component="span" sx={{ fontWeight: 700, color: theme.textPrimary }}>
            Tu clave se guarda solo en este navegador.
          </Box>{' '}
          Nunca se envía a la base de datos del curso, así que tendrás que pegarla otra
          vez en cada dispositivo, y se borra al cerrar sesión.
          <br /><br />
          Si quieres protegerla más, puedes restringirla por dominio desde la consola de
          Google Cloud — una clave sin restricción, si se filtra, la puede usar
          cualquiera. Si al restringirla el chat deja de funcionar, quítale la
          restricción y avísale al profesor.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-end' }}>
        <Button
          onClick={onDismiss}
          disabled={checking}
          sx={{ textTransform: 'none', color: theme.textSecondary }}
        >
          Ahora no
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={checking || !consent || !key.trim()}
          sx={{
            textTransform: 'none', fontWeight: 700,
            background: theme.accent,
            '&:hover': { background: theme.accent, filter: 'brightness(0.94)' },
          }}
        >
          {checking ? 'Verificando…' : 'Conectar'}
        </Button>
      </Box>
    </Box>
  );
};

export default ConnectKeyScreen;
