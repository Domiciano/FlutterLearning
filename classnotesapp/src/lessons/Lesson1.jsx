// Lesson1.jsx
import React from "react";
import Box from "@mui/material/Box";
import LessonTitle from "../components/LessonTittle";
import LessonParagraph from "../components/LessonParagraph";
import CodeBlock from "../components/CodeBlock";
import DartPadEmbed from "../components/DartPadEmbed";
import YouTubeEmbed from '../components/YouTubeEmbed';
import images from '../assets';
import ImageBlock from '../components/ImageBlock';
import LessonContainer from "../components/LessonContainer";


const Lesson1 = () => {
  return (
    <LessonContainer>
      <LessonTitle>Principios de Diagramación en Flutter</LessonTitle>

      <LessonParagraph>
        En Flutter, <code>Row</code> y <code>Column</code> son los widgets base
        para ubicar elementos en una <strong>línea horizontal</strong> o <strong>vertical</strong>, respectivamente.
      </LessonParagraph>

      <YouTubeEmbed videoId="dQw4w9WgXcQ" title="Introducción a Flutter" />

      <ImageBlock src={images['logo.svg']} alt="Logo de Flutter" />


      <CodeBlock language="dart">
        {`
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(body: Center(child: Text('Hello, World!'))),
    );
  }
}
    `}
      </CodeBlock>

      <DartPadEmbed gistId="2ce0f8a930b04533ba94b4f4f525e7fc" />
      

   </LessonContainer>
  );
};

export default Lesson1;
