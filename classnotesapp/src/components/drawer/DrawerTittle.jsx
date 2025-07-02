// components/DrawerTitle.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { useThemeMode } from '@/theme/ThemeContext';

const DrawerTittle = ({ children }) => {
  const { theme } = useThemeMode();
  return (
    <Typography
      variant="subtitle2"
      sx={{
        color: theme.drawerTitle,
        fontWeight: 700,
        fontSize: '1rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        mb: 1,
        mt: 2,
      }}
    >
      {children}
    </Typography>
  );
};

export default DrawerTittle;