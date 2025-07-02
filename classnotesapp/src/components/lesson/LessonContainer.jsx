import React from 'react';
import Box from '@mui/material/Box';

const LessonContainer = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: "100%",
        px: { xs: 2, sm: 4, md: 6 },
        pt: { xs: 3, sm: 4, md: 6 },
        pb: { xs: 2, sm: 3 },
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
};

export default LessonContainer;
