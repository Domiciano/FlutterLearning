// components/DrawerDivider.jsx
import React from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { useThemeMode } from '@/theme/ThemeContext';

const DrawerDivider = () => {
  const { theme } = useThemeMode();
  return (
    <Box sx={{ px: 2 }}>
      <Divider sx={{ backgroundColor: theme.border }} />
    </Box>
  );
};

export default DrawerDivider;
