// src/auth/TermsScreen.jsx
// Puerta obligatoria entre el inicio de sesión con Google y el formulario de
// perfil: el estudiante tiene que poder leer el documento completo y aceptarlo
// para entrar. Rechazar cierra la sesión.
//
// La casilla no se habilita hasta que el documento se ha desplazado hasta el
// final: sin eso, "he leído y acepto" sería una afirmación que la interfaz no
// permite sostener.

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { alpha } from '@mui/material/styles';
import { useThemeMode } from '@/theme/ThemeContext';
import { useAuth } from './AuthContext';
import LoginBackground from './LoginBackground';
import TermsDocument from './TermsDocument';
import { loginBranding, DISPLAY_FONT } from './loginBranding';
import icesiLogo from '@/assets/icesi-logo.svg';

// Margen en px para dar por leído el documento sin exigir el píxel exacto
// (los navegadores redondean scrollTop y el zoom del sistema desajusta el resto).
const SCROLL_END_SLACK = 24;

const TermsScreen = () => {
  const { theme } = useThemeMode();
  const { user, acceptTerms, signOutUser } = useAuth();

  const scrollRef = useRef(null);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    // Una medida de altura 0 significa que el navegador todavía no ha maquetado
    // la caja, no que el documento sea corto. Sin esta guarda, la comprobación
    // del montaje daría "ya está al final" y habilitaría la casilla sin que se
    // haya visto una línea.
    if (!el || el.scrollHeight === 0) return;
    // Si el documento cabe entero en la caja no hay nada que desplazar: ya está
    // a la vista, así que cuenta como leído.
    const atEnd = el.scrollHeight - el.scrollTop - el.clientHeight <= SCROLL_END_SLACK;
    if (atEnd) setReachedEnd(true);
  }, []);

  // Se vuelve a medir cuando la caja o su contenido cambian de tamaño (fuentes
  // que terminan de cargar, giro del móvil): un documento que no cabía puede
  // pasar a caber, y al revés.
  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => observer.disconnect();
  }, [checkScroll]);

  const onAccept = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await acceptTerms();
    } catch (err) {
      console.error('[Auth] Error guardando la aceptación de los términos:', err);
      setError('No se pudo guardar tu aceptación. Inténtalo de nuevo.');
      setSubmitting(false);
    }
  };

  const restBorder = alpha(theme.textSecondary, 0.45);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        background: theme.background,
      }}
    >
      <LoginBackground />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 640,
          maxHeight: 'calc(100vh - 32px)',
          display: 'flex',
          flexDirection: 'column',
          background: theme.backgroundLight,
          border: `1px solid ${theme.border}`,
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            mb: 1.5,
          }}
        >
          <Typography
            component="p"
            sx={{
              fontFamily: DISPLAY_FONT,
              color: theme.accent,
              fontWeight: 700,
              fontSize: { xs: '1.35rem', sm: '1.5rem' },
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            {loginBranding.courseName}
          </Typography>
          <img
            src={icesiLogo}
            alt="Universidad Icesi"
            style={{ height: 30, width: 'auto', display: 'block', flexShrink: 0 }}
          />
        </Box>

        <Typography variant="h5" sx={{ color: theme.textPrimary, fontWeight: 700, mb: 0.5 }}>
          Términos y condiciones
        </Typography>
        <Typography sx={{ color: theme.textSecondary, fontSize: '0.95rem', mb: 2.5 }}>
          Léelos antes de entrar. Para usar la plataforma tienes que aceptarlos.
        </Typography>

        <Box
          ref={scrollRef}
          onScroll={checkScroll}
          tabIndex={0}
          sx={{
            flex: '1 1 auto',
            minHeight: 180,
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            p: 2,
            mb: 2,
            borderRadius: 2,
            border: `1px solid ${restBorder}`,
            background: alpha(theme.textSecondary, 0.05),
          }}
        >
          <TermsDocument courseName={loginBranding.courseName} />
        </Box>

        {!reachedEnd && (
          <Typography sx={{ color: theme.textSecondary, fontSize: '0.78rem', mb: 1 }}>
            Desplázate hasta el final del documento para poder aceptarlo.
          </Typography>
        )}

        <FormControlLabel
          control={
            <Checkbox
              checked={accepted}
              disabled={!reachedEnd}
              onChange={(e) => setAccepted(e.target.checked)}
              sx={{ color: theme.textSecondary, '&.Mui-checked': { color: theme.accent }, pt: 0 }}
            />
          }
          sx={{ alignItems: 'flex-start', m: 0, mb: 2 }}
          label={
            <Typography
              sx={{
                color: reachedEnd ? theme.textPrimary : theme.textSecondary,
                fontSize: '0.88rem',
                lineHeight: 1.5,
              }}
            >
              He leído y acepto los términos y condiciones, incluida la{' '}
              <Box component="span" sx={{ fontWeight: 700 }}>
                participación en la investigación del curso
              </Box>.
            </Typography>
          }
        />

        <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column-reverse', sm: 'row' } }}>
          <Button
            onClick={signOutUser}
            variant="outlined"
            disabled={submitting}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              py: 1.2,
              color: theme.textSecondary,
              borderColor: theme.border,
              '&:hover': { borderColor: theme.textSecondary },
            }}
          >
            No acepto
          </Button>
          <Button
            onClick={onAccept}
            fullWidth
            variant="contained"
            disabled={!accepted || submitting}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              py: 1.2,
              background: theme.accent,
              '&:hover': { background: theme.accent, filter: 'brightness(0.94)' },
            }}
          >
            {submitting ? 'Guardando…' : 'Aceptar y continuar'}
          </Button>
        </Box>

        {error && (
          <Typography sx={{ color: theme.error, mt: 2, fontSize: '0.85rem' }}>{error}</Typography>
        )}

        <Typography sx={{ color: theme.textSecondary, mt: 2.5, fontSize: '0.8rem', textAlign: 'center' }}>
          Conectado como {user?.email}.{' '}
          <Link component="button" type="button" onClick={signOutUser} sx={{ color: theme.accent }}>
            Cambiar de cuenta
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default TermsScreen;
