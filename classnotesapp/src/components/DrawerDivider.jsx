// components/DrawerDivider.jsx
import React from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const DrawerDivider = () => (
  <Box sx={{ px: 2 }}>
    <Divider sx={{ backgroundColor: '#333' }} />
  </Box>
);

export default DrawerDivider;
