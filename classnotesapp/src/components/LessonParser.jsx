import React from "react";
import LessonContainer from "./LessonContainer";
import LessonTitle from "./LessonTittle";
import LessonSubtitle from "./LessonSubtitle";
import LessonParagraph from "./LessonParagraph";
import CodeBlock from "./CodeBlock";
import YouTubeEmbed from "./YouTubeEmbed";
import ImageBlock from "./ImageBlock";
import DartPadEmbed from "./DartPadEmbed";
import IconBlock from "./IconBlock";
import images from "../assets";

const LessonParser = ({ content }) => {
  const lines = content.split("\n");
  const elements = [];
  let paragraphBuffer = "";
  let codeBuffer = "";
  let parsingCode = false;
  let codeLang = "";

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmedLine = rawLine.trim();

    // --- TÍTULO PRINCIPAL ---
    if (trimmedLine.startsWith("# ")) {
      elements.push(
        <LessonTitle key={`title-${i}`}>
          {parseInlineCode(trimmedLine.slice(2))}
        </LessonTitle>
      );
      continue;
    }

    // --- SUBTÍTULO ---
    if (trimmedLine.startsWith("## ")) {
      elements.push(
        <LessonSubtitle key={`subtitle-${i}`}>
          {parseInlineCode(trimmedLine.slice(3))}
        </LessonSubtitle>
      );
      continue;
    }

    // --- CIERRE DE BLOQUE DE CÓDIGO ---
    if (parsingCode) {
      const isDirective = trimmedLine.match(/^\[[a-z]+.*\]$/i);
      const isLastLine = i === lines.length - 1;

      if (isDirective || isLastLine) {
        if (isLastLine && !isDirective) {
          codeBuffer += rawLine + "\n";
        }

        parsingCode = false;
        elements.push(
          <CodeBlock key={`code-${i}`} language={codeLang}>
            {codeBuffer}
          </CodeBlock>
        );

        if (isDirective) {
          i--; // re-procesar esta línea
        }

        continue;
      }

      codeBuffer += rawLine + "\n";
      continue;
    }

    // --- PÁRRAFO ---
    if (trimmedLine === "[p]") {
      paragraphBuffer = "";
      continue;
    }

    if (paragraphBuffer !== "" || lines[i - 1]?.trim() === "[p]") {
      if (trimmedLine.startsWith("[") || i === lines.length - 1) {
        if (i === lines.length - 1 && trimmedLine !== "") {
          paragraphBuffer += (paragraphBuffer ? " " : "") + trimmedLine;
        }
        elements.push(
          <LessonParagraph key={`p-${i}`}>
            {parseInlineCode(paragraphBuffer)}
          </LessonParagraph>
        );
        paragraphBuffer = "";
      } else {
        paragraphBuffer += (paragraphBuffer ? " " : "") + trimmedLine;
        continue;
      }
    }

    // --- VIDEO EMBED ---
    if (trimmedLine.startsWith("[v]")) {
      const [id, title] = trimmedLine.slice(3).split("|").map((s) => s.trim());
      elements.push(
        <YouTubeEmbed key={`video-${i}`} videoId={id} title={title} />
      );
      continue;
    }

    // --- IMAGEN ---
    if (trimmedLine.startsWith("[i]")) {
      const [imgName, altText] = trimmedLine.slice(3).split("|").map((s) => s.trim());
      const isWebImage = imgName.startsWith("http://") || imgName.startsWith("https://");
      const src = isWebImage ? imgName : images[imgName];

      elements.push(
        <ImageBlock key={`img-${i}`} src={src} alt={altText} />
      );
      continue;
    }

    // --- ÍCONO SIMPLE ---
    if (trimmedLine.startsWith("[icon]")) {
      const [iconName, altText] = trimmedLine.slice(6).split("|").map((s) => s.trim());
      const isWebImage = iconName.startsWith("http://") || iconName.startsWith("https://");
      const src = isWebImage ? iconName : images[iconName];

      elements.push(
        <IconBlock key={`icon-${i}`} src={src} alt={altText} />
      );
      continue;
    }

    // --- DARTPAD EMBED ---
    if (trimmedLine.startsWith("[dartpad]")) {
      const gistId = trimmedLine.slice(9).trim();
      elements.push(
        <DartPadEmbed key={`dartpad-${i}`} gistId={gistId} />
      );
      continue;
    }

    // --- INICIO DE BLOQUE DE CÓDIGO ---
    if (trimmedLine.startsWith("[c:")) {
      parsingCode = true;
      codeLang = trimmedLine.match(/\[c:(.*)\]/)[1];
      codeBuffer = "";
      continue;
    }
  }

  return <LessonContainer>{elements}</LessonContainer>;
};

// --- inline code: `algo` → <code className="inline-code">algo</code> ---
const parseInlineCode = (text) => {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const code = part.slice(1, -1);
      return (
        <code key={index} className="inline-code">
          {code}
        </code>
      );
    } else {
      return part;
    }
  });
};

export default LessonParser;
