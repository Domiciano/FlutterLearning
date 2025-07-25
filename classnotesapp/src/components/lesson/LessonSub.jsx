import React from "react";
import Typography from "@mui/material/Typography";
import { useThemeMode } from '@/theme/ThemeContext';

const LessonSub = ({ children, id }) => {
  const { theme } = useThemeMode();
  console.log('LessonSub rendering with ID:', id);
  return (
    <Typography
      id={id}
      variant="h4"
      sx={{
        color: theme.contentSubtitle,
        fontWeight: 600,
        fontSize: { xs: "1.5rem", md: "2rem" },
        letterSpacing: "0.02em",
        textAlign: "left",
        lineHeight: 1.2,
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {children}
    </Typography>
  );
};

export default LessonSub;