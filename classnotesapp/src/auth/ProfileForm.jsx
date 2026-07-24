// src/auth/ProfileForm.jsx
// Two-step gate shown after Google sign-in.
//   Step 1: name + role (profesor / estudiante / otro).
//   Teachers and "otro" go straight into the course; students continue to
//   Step 2 to provide their código + GitHub username.

import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { alpha } from '@mui/material/styles';
import { useThemeMode } from '@/theme/ThemeContext';
import { useAuth } from './AuthContext';
import LoginBackground from './LoginBackground';
import { loginBranding, DISPLAY_FONT } from './loginBranding';
import icesiLogo from '@/assets/icesi-logo.svg';

const ROLES = [
  ['profesor', 'Profesor'],
  ['estudiante', 'Estudiante'],
  ['otro', 'Otro'],
];

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
  // Students are the overwhelming majority → preselect that role.
  const [role, setRole] = useState('estudiante');
  const [roleOther, setRoleOther] = useState('');
  const [codigo, setCodigo] = useState('');
  const [github, setGithub] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Only used when the Google photo is missing or fails to load.
  const avatarInitial = (fullName || user?.displayName || user?.email || '?')
    .trim().charAt(0).toUpperCase();

  // `theme.border` equals `theme.backgroundLight` in the dark palette, so an
  // outline painted with it is invisible on the card. Derive the field borders
  // from the text color instead, so they read at rest, on hover and on focus.
  const restBorder = alpha(theme.textSecondary, 0.45);
  const hoverBorder = alpha(theme.textSecondary, 0.8);

  // MUI's default palette is light → drive input colors from the app theme.
  const fieldSx = {
    '& .MuiInputBase-input': { color: theme.textPrimary },
    '& .MuiInputBase-input::placeholder': { color: theme.textSecondary, opacity: 1 },
    '& .MuiInputLabel-root': { color: theme.textSecondary },
    '& .MuiInputLabel-root.Mui-focused': { color: theme.accent },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: restBorder, borderWidth: 1.5 },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: hoverBorder },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.accent },
    '& .MuiFormHelperText-root': { color: theme.textSecondary },
    '& .MuiInputLabel-root.Mui-error': { color: theme.error },
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: theme.error },
    '& .MuiOutlinedInput-root.Mui-error:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.error },
    '& .MuiFormHelperText-root.Mui-error': { color: theme.error },
  };

  // Role picker: bordered, full-width option buttons instead of bare radios.
  const roleButtonSx = {
    flex: 1,
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.95rem',
    py: 1.15,
    borderRadius: '10px !important',
    border: `1.5px solid ${errors.role ? theme.error : restBorder} !important`,
    color: theme.textPrimary,
    transition: 'background .15s ease, border-color .15s ease, color .15s ease',
    '&:hover': {
      background: alpha(theme.accent, 0.08),
      borderColor: `${hoverBorder} !important`,
    },
    '&.Mui-selected': {
      color: theme.accent,
      background: alpha(theme.accent, 0.16),
      borderColor: `${theme.accent} !important`,
    },
    '&.Mui-selected:hover': {
      background: alpha(theme.accent, 0.24),
      borderColor: `${theme.accent} !important`,
    },
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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Avatar
            src={user?.photoURL || undefined}
            alt={user?.displayName || user?.email || 'Tu foto de perfil'}
            // Google avatar URLs (lh3.googleusercontent.com) 403 when a referrer
            // is sent, which makes the Avatar fall back to the initial.
            imgProps={{ referrerPolicy: 'no-referrer' }}
            sx={{
              width: 56,
              height: 56,
              flexShrink: 0,
              fontSize: '1.4rem',
              fontWeight: 700,
              bgcolor: theme.accent,
              color: theme.appBarText,
              border: `2px solid ${alpha(theme.accent, 0.55)}`,
            }}
          >
            {avatarInitial}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h5" sx={{ color: theme.textPrimary, fontWeight: 700, mb: 0.5 }}>
              Completa tu perfil
            </Typography>
            <Typography sx={{ color: theme.textSecondary, fontSize: '0.95rem' }}>
              Necesitamos estos datos para darte acceso al contenido.
            </Typography>
          </Box>
        </Box>

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
                  color: theme.textSecondary, mb: 1, fontSize: '0.9rem',
                  '&.Mui-focused': { color: theme.textSecondary },
                  '&.Mui-error': { color: theme.error },
                }}
              >
                ¿Cuál es tu rol?
              </FormLabel>
              <ToggleButtonGroup
                exclusive
                value={role || null}
                onChange={(_, val) => { if (val) setRole(val); }}
                aria-label="Rol"
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1,
                  '& .MuiToggleButtonGroup-grouped': { m: 0 },
                }}
              >
                {ROLES.map(([val, label]) => (
                  <ToggleButton key={val} value={val} sx={roleButtonSx}>
                    {label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
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
