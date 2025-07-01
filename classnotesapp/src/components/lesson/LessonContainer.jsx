import React from 'react';
import Box from '@mui/material/Box';

const LessonContainer = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "auto",
        px: { xs: 0, sm: 0 },
        py: { xs: 0, sm: 0 },
      }}
    >
      {children}
    </Box>
  );
};

export default LessonContainer;
