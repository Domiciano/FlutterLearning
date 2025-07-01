// components/DrawerTitle.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const DrawerTitle = ({ label }) => {
  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        fontWeight: 'bold',
        color: '#42a5f5', // Un color vibrante para el título de la sección
        fontSize: '0.75rem',
        textTransform: 'uppercase',
      }}
    >
      <Typography variant="overline" display="block">
        {label}
      </Typography>
    </Box>
  );
};

export default DrawerTitle;