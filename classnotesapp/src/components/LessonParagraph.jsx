// components/LessonParagraph.jsx
import React from 'react';
import Typography from '@mui/material/Typography';

const LessonParagraph = ({ children }) => {
  return (
    <Typography
      variant="body1"
      sx={{
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 300,
        fontSize: '1.1rem',
        mt: 1,
        mb: 2,
        color: '#fff',
        textAlign: 'left'
      }}
    >
      {children}
    </Typography>
  );
};

export default LessonParagraph;
