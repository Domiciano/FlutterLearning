// src/auth/ProfileForm.jsx
// Two-step gate shown after Google sign-in.
//   Step 1: name + role (profesor / estudiante / otro).
//   Teachers and "otro" go straight into the course; students continue to
//   Step 2 to provide their código + GitHub username.

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useThemeMode } from '@/theme/ThemeContext';
import { useAuth } from './AuthContext';
import LoginBackground from './LoginBackground';

// Accepts "usuario", "github.com/usuario" or "https://github.com/usuario"
// and returns the bare handle, or null.
const parseGithubHandle = (input) => {
  const raw = input.trim();
  if (!raw) return null;
  const urlMatch = raw.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([^/\s?#]+)/i);
  const handle = (urlMatch ? urlMatch[1] : raw).replace(/^@/, '');
  return /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(handle) ? handle : null;
};

const ProfileForm = () => {
  const { theme } = useThemeMode();
  const { user, saveProfile, signOutUser } = useAuth();

  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState(user?.displayName ?? '');
  const [role, setRole] = useState('');
  const [roleOther, setRoleOther] = useState('');
  const [codigo, setCodigo] = useState('');
  const [github, setGithub] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // MUI's default palette is light → drive input colors from the app theme.
  const fieldSx = {
    '& .MuiInputBase-input': { color: theme.textPrimary },
    '& .MuiInputBase-input::placeholder': { color: theme.textSecondary, opacity: 1 },
    '& .MuiInputLabel-root': { color: theme.textSecondary },
    '& .MuiInputLabel-root.Mui-focused': { color: theme.accent },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.border },
    '&:hover .MuiOutlinedInput-root:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': { borderColor: theme.textSecondary },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.accent },
    '& .MuiFormHelperText-root': { color: theme.textSecondary },
    '& .MuiInputLabel-root.Mui-error': { color: theme.error },
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: theme.error },
    '& .MuiFormHelperText-root.Mui-error': { color: theme.error },
  };

  const finish = async (payload) => {
    setSubmitting(true);
    try {
      await saveProfile(payload);
    } catch (err) {
      console.error('[Auth] Error guardando el perfil:', err);
      setErrors({ form: 'No se pudo guardar. Inténtalo de nuevo.' });
      setSubmitting(false);
    }
  };

  const submitStep1 = (e) => {
    e.preventDefault();
    const err = {};
    if (!fullName.trim()) err.fullName = 'Escribe tu nombre completo.';
    if (!role) err.role = 'Selecciona tu rol.';
    if (role === 'otro' && !roleOther.trim()) err.roleOther = 'Especifica tu rol.';
    setErrors(err);
    if (Object.keys(err).length) return;

    if (role === 'estudiante') { setStep(1); return; }
    finish({ fullName, role, roleOther: role === 'otro' ? roleOther.trim() : null });
  };

  const submitStep2 = (e) => {
    e.preventDefault();
    const err = {};
    if (!codigo.trim()) err.codigo = 'Ingresa tu código.';
    const handle = parseGithubHandle(github);
    if (!handle) err.github = 'Ingresa un usuario de GitHub válido.';
    setErrors(err);
    if (Object.keys(err).length) return;

    finish({
      fullName,
      role: 'estudiante',
      codigo: codigo.trim(),
      github: `https://github.com/${handle}`,
      githubUsername: handle,
    });
  };

  const stepperSx = {
    mb: 3,
    '& .MuiStepLabel-label': { color: theme.textSecondary },
    '& .MuiStepLabel-label.Mui-active': { color: theme.textPrimary, fontWeight: 600 },
    '& .MuiStepLabel-label.Mui-completed': { color: theme.textSecondary },
    '& .MuiStepIcon-root': { color: theme.border },
    '& .MuiStepIcon-root.Mui-active': { color: theme.accent },
    '& .MuiStepIcon-root.Mui-completed': { color: theme.accent },
    '& .MuiStepIcon-text': { fill: theme.appBarText },
  };

  const primaryBtnSx = {
    textTransform: 'none',
    fontWeight: 700,
    py: 1.2,
    background: theme.accent,
    '&:hover': { background: theme.accent, filter: 'brightness(0.94)' },
  };

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
        component="form"
        onSubmit={step === 0 ? submitStep1 : submitStep2}
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 480,
          background: theme.backgroundLight,
          border: `1px solid ${theme.border}`,
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
        }}
      >
        <Typography variant="h5" sx={{ color: theme.textPrimary, fontWeight: 700, mb: 0.5 }}>
          Completa tu perfil
        </Typography>
        <Typography sx={{ color: theme.textSecondary, mb: 3, fontSize: '0.95rem' }}>
          Necesitamos estos datos para darte acceso al contenido.
        </Typography>

        <Stepper activeStep={step} sx={stepperSx}>
          <Step><StepLabel>Tu rol</StepLabel></Step>
          <Step><StepLabel>Datos de estudiante</StepLabel></Step>
        </Stepper>

        {step === 0 ? (
          <>
            <TextField
              label="Nombre completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
              fullWidth
              autoFocus
              sx={{ mb: 2.5, ...fieldSx }}
            />

            <FormControl error={!!errors.role} sx={{ mb: role === 'otro' ? 2 : 3, display: 'block' }}>
              <FormLabel
                sx={{
                  color: theme.textSecondary, mb: 0.5, fontSize: '0.9rem',
                  '&.Mui-focused': { color: theme.textSecondary },
                  '&.Mui-error': { color: theme.error },
                }}
              >
                ¿Cuál es tu rol?
              </FormLabel>
              <RadioGroup row value={role} onChange={(e) => setRole(e.target.value)}>
                {[['profesor', 'Profesor'], ['estudiante', 'Estudiante'], ['otro', 'Otro']].map(([val, label]) => (
                  <FormControlLabel
                    key={val}
                    value={val}
                    control={<Radio sx={{ color: theme.textSecondary, '&.Mui-checked': { color: theme.accent } }} />}
                    label={label}
                    sx={{ '& .MuiFormControlLabel-label': { color: theme.textPrimary } }}
                  />
                ))}
              </RadioGroup>
              {errors.role && (
                <Typography sx={{ color: theme.error, fontSize: '0.75rem', mt: 0.5 }}>{errors.role}</Typography>
              )}
            </FormControl>

            {role === 'otro' && (
              <TextField
                label="Especifica tu rol"
                value={roleOther}
                onChange={(e) => setRoleOther(e.target.value)}
                error={!!errors.roleOther}
                helperText={errors.roleOther}
                fullWidth
                sx={{ mb: 3, ...fieldSx }}
              />
            )}

            <Button type="submit" fullWidth variant="contained" disabled={submitting} sx={primaryBtnSx}>
              {role === 'estudiante' ? 'Continuar' : (submitting ? 'Guardando…' : 'Entrar al curso')}
            </Button>
          </>
        ) : (
          <>
            <TextField
              label="Código"
              placeholder="Tu código de estudiante"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              error={!!errors.codigo}
              helperText={errors.codigo}
              fullWidth
              autoFocus
              sx={{ mb: 2.5, ...fieldSx }}
            />
            <TextField
              label="Usuario de GitHub"
              placeholder="tu-usuario"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              error={!!errors.github}
              helperText={errors.github || 'Tu username de GitHub (o la URL de tu perfil).'}
              fullWidth
              sx={{ mb: 3, ...fieldSx }}
            />

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button
                onClick={() => { setStep(0); setErrors({}); }}
                variant="outlined"
                disabled={submitting}
                sx={{ textTransform: 'none', fontWeight: 600, py: 1.2, color: theme.textSecondary, borderColor: theme.border, '&:hover': { borderColor: theme.textSecondary } }}
              >
                Atrás
              </Button>
              <Button type="submit" fullWidth variant="contained" disabled={submitting} sx={primaryBtnSx}>
                {submitting ? 'Guardando…' : 'Entrar al curso'}
              </Button>
            </Box>
          </>
        )}

        {errors.form && (
          <Typography sx={{ color: theme.error, mt: 2, fontSize: '0.85rem' }}>{errors.form}</Typography>
        )}

        <Typography sx={{ color: theme.textSecondary, mt: 3, fontSize: '0.8rem', textAlign: 'center' }}>
          Conectado como {user?.email}.{' '}
          <Link component="button" type="button" onClick={signOutUser} sx={{ color: theme.accent }}>
            Cambiar de cuenta
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileForm;
