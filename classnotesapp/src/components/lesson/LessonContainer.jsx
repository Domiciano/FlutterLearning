import React from 'react';
import Box from '@mui/material/Box';

const LessonContainer = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: "100%",
        px: { xs: 1, sm: 2 },
        py: { xs: 1, sm: 2 },
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
};

export default LessonContainer;
