import React from "react";
import Typography from "@mui/material/Typography";

const LessonSub = ({ children, id }) => {
  return (
    <Typography
      id={id}
      variant="h4"
      sx={{
        color: "#0175C2",
        fontWeight: 600,
        fontSize: { xs: "1.5rem", md: "2rem" },
        letterSpacing: "0.02em",
        textAlign: "left",
        mt: 3,
        mb: 2,
        lineHeight: 1.2,
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {children}
    </Typography>
  );
};

export default LessonSub;