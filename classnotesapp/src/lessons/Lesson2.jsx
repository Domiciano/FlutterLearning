// Lesson1.jsx
import React from "react";
import Box from "@mui/material/Box";
import LessonTitle from "../components/LessonTittle";
import LessonParagraph from "../components/LessonParagraph";
import CodeBlock from "../components/CodeBlock";
import DartPadEmbed from "../components/DartPadEmbed";
import YouTubeEmbed from '../components/YouTubeEmbed';
import ImageBlock from '../components/ImageBlock';


const Lesson2 = () => {
  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "auto",
        px: { xs: 0, sm: 0 },
        py: { xs: 0, sm: 0 },
      }}
    >
      <LessonTitle>Creación de aplicaciones</LessonTitle>

      <LessonParagraph>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, asperiores! Ad tenetur magnam at doloribus a quaerat. Magni nobis atque excepturi quis dolor delectus commodi eaque placeat porro officia aspernatur odio dicta nesciunt, voluptatum dolores veritatis suscipit repellat minus eveniet? Tenetur saepe, in quas at aliquam omnis adipisci animi corporis?
      </LessonParagraph>

    </Box>
  );
};

export default Lesson2;
