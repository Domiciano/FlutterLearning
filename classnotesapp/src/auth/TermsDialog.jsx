// src/auth/TermsDialog.jsx
// Consulta del documento ya aceptado, desde el menú de cuenta. Muestra el mismo
// texto que la puerta de entrada y ofrece el retiro del consentimiento.
//
// Retirar implica salir: el acceso a la plataforma está condicionado a la
// aceptación, así que dejar la sesión abierta con el consentimiento en `false`
// sería un estado que la puerta rechaza. Se pide confirmación porque la acción
// cierra la sesión.

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useThemeMode } from '@/theme/ThemeContext';
import { useAuth } from './AuthContext';
import TermsDocument from './TermsDocument';
import { loginBranding } from './loginBranding';

const TermsDialog = ({ open, onClose }) => {
  const { theme } = useThemeMode();
  const { withdrawConsent } = useAuth();
  const [confirming, setConfirming] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState(null);

  const close = () => {
    setConfirming(false);
    setError(null);
    onClose();
  };

  const onWithdraw = async () => {
    setWorking(true);
    setError(null);
    try {
      await withdrawConsent();
      // withdrawConsent cierra la sesión: el árbol se desmonta solo.
    } catch (err) {
      console.error('[Auth] Error retirando el consentimiento:', err);
      setError('No se pudo retirar el consentimiento. Inténtalo de nuevo.');
      setWorking(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { background: theme.backgroundLight, backgroundImage: 'none' },
      }}
    >
      <DialogTitle sx={{ color: theme.textPrimary, fontWeight: 700 }}>
        Términos y condiciones
      </DialogTitle>
      <DialogContent dividers sx={{ borderColor: theme.border }}>
        <TermsDocument courseName={loginBranding.courseName} />
      </DialogContent>

      {confirming && (
        <Box sx={{ px: 3, pt: 2 }}>
          <Typography sx={{ color: theme.textPrimary, fontSize: '0.88rem', lineHeight: 1.6 }}>
            Al retirar tu consentimiento se cerrará tu sesión y perderás el acceso al
            visor. No afecta tu nota ni tu situación en el curso, y el profesor te dará
            el material por otra vía. ¿Continuar?
          </Typography>
          {error && (
            <Typography sx={{ color: theme.error, mt: 1, fontSize: '0.85rem' }}>{error}</Typography>
          )}
        </Box>
      )}

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        {confirming ? (
          <>
            <Button
              onClick={() => setConfirming(false)}
              disabled={working}
              sx={{ textTransform: 'none', color: theme.textSecondary }}
            >
              Cancelar
            </Button>
            <Button
              onClick={onWithdraw}
              disabled={working}
              variant="contained"
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                background: theme.error,
                '&:hover': { background: theme.error, filter: 'brightness(0.94)' },
              }}
            >
              {working ? 'Retirando…' : 'Sí, retirar y salir'}
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => setConfirming(true)}
              sx={{ textTransform: 'none', color: theme.error, mr: 'auto' }}
            >
              Retirar mi consentimiento
            </Button>
            <Button
              onClick={close}
              variant="contained"
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                background: theme.accent,
                '&:hover': { background: theme.accent, filter: 'brightness(0.94)' },
              }}
            >
              Cerrar
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TermsDialog;
