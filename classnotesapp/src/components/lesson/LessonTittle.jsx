// components/LessonTitle.jsx
import React from "react";
import Typography from "@mui/material/Typography";

const LessonTitle = ({ children }) => {
  return (
    <Typography
      variant="h2"
      component="h1"
      sx={{
        color: "#0175C2",
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
