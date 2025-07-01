import React from "react";
import Typography from "@mui/material/Typography";

const LessonSubtitle = ({ children }) => {
  return (
    <Typography
      variant="h6"
      sx={{
        color: "#42a5f5",
        fontWeight: "bold",
        textAlign: "left",
        mt: 3,
        mb: 1,
      }}
    >
      {children}
    </Typography>
  );
};

export default LessonSubtitle;