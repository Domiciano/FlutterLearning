// components/LessonTitle.jsx
import React from "react";
import Typography from "@mui/material/Typography";

const LessonTitle = ({ children }) => {
  return (
    <Typography
      variant="h4"
      component="h1"
      sx={{ color: "#0175C2", fontWeight: "bold", mt: 4, mb: 2 }}
    >
      {children}
    </Typography>
  );
};

export default LessonTitle;
