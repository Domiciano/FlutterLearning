// src/auth/AccountMenu.jsx
// Compact avatar + menu for the app bar: shows who's signed in and lets them
// sign out. Renders nothing when Firebase isn't configured or nobody is
// signed in, so it's safe to drop into the AppBar unconditionally.

import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import GavelIcon from '@mui/icons-material/Gavel';
import { useAuth } from './AuthContext';
import { useThemeMode } from '@/theme/ThemeContext';
import TermsDialog from './TermsDialog';

const AccountMenu = () => {
  const { configured, user, profile, signOutUser } = useAuth();
  const { theme } = useThemeMode();
  const [anchorEl, setAnchorEl] = useState(null);
  const [termsOpen, setTermsOpen] = useState(false);

  if (!configured || !user) return null;

  const name = profile?.fullName || user.displayName || user.email;
  const initial = (name || '?').trim().charAt(0).toUpperCase();

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small" aria-label="Cuenta">
        <Avatar
          src={user.photoURL || undefined}
          // Google avatar URLs (lh3.googleusercontent.com) 403 when a referrer is
          // sent, which makes the Avatar fall back to the initial — suppress it.
          imgProps={{ referrerPolicy: 'no-referrer' }}
          sx={{ width: 32, height: 32, fontSize: '0.9rem', bgcolor: theme.accent, color: theme.appBarText }}
        >
          {initial}
        </Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
        <Box sx={{ px: 2, py: 1, maxWidth: 260 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }} noWrap>{name}</Typography>
          {user.email && (
            <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }} noWrap>{user.email}</Typography>
          )}
          {profile?.github && (
            <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }} noWrap>{profile.github}</Typography>
          )}
        </Box>
        <Divider />
        {/* Consulta del documento aceptado y única vía de retiro del
            consentimiento (requisito ético de analitics/plan.md). */}
        <MenuItem onClick={() => { setAnchorEl(null); setTermsOpen(true); }}>
          <GavelIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography sx={{ fontSize: '0.9rem' }}>Términos y condiciones</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { setAnchorEl(null); signOutUser(); }}>
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Cerrar sesión
        </MenuItem>
      </Menu>
      <TermsDialog open={termsOpen} onClose={() => setTermsOpen(false)} />
    </>
  );
};

export default AccountMenu;
