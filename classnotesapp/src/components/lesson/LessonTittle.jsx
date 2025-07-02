// components/LessonTitle.jsx
import React from "react";
import Typography from "@mui/material/Typography";
import { useThemeMode } from '@/theme/ThemeContext';

const LessonTitle = ({ children }) => {
  const { theme } = useThemeMode();
  return (
    <Typography
      variant="h2"
      component="h1"
      sx={{
        color: theme.primaryTitle,
        fontWeight: 800,
        fontSize: { xs: "2.5rem", md: "3.5rem" },
        letterSpacing: "0.05em",
        mt: 4,
        mb: 2,
        lineHeight: 1.1,
        textAlign: "left",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {children}
    </Typography>
  );
};

export default LessonTitle;
