// components/LessonParagraph.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import { useThemeMode } from '@/theme/ThemeContext';

const LessonParagraph = ({ children }) => {
  const { theme } = useThemeMode();
  return (
    <Typography
      sx={{
        color: theme.textPrimary,
        fontSize: { xs: '1.05rem', md: '1.18rem' },
        lineHeight: 1.7,
        fontFamily: 'Roboto, Arial, sans-serif',
      }}
    >
      {children}
    </Typography>
  );
};

export default LessonParagraph;
