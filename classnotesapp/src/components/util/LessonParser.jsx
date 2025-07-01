import React from "react";
import LessonTitle from "@/components/lesson/LessonTittle";
import LessonSub from "@/components/lesson/LessonSub";
import LessonParagraph from "@/components/lesson/LessonParagraph";
import CodeBlock from "@/components/code/CodeBlock";
import YouTubeEmbed from "@/components/embed/YouTubeEmbed";
import ImageBlock from "@/components/lesson/ImageBlock";
import LessonContainer from "@/components/lesson/LessonContainer";
import DartPadEmbed from "@/components/embed/DartPadEmbed";
import IconBlock from "@/components/lesson/IconBlock";
import images from "@/assets";

const LessonParser = ({ content }) => {
  const lines = content.split("\n");
  const elements = [];
  const subtitles = [];
  let paragraphBuffer = "";
  let codeBuffer = "";
  let parsingCode = false;
  let codeLang = "";

  // Helper function to flush the current code block
  const flushCodeBlock = (index) => {
    if (parsingCode) {
      elements.push(
        <CodeBlock key={`code-${index}`} language={codeLang}>
          {codeBuffer}
        </CodeBlock>
      );
      parsingCode = false;
      codeBuffer = "";
      codeLang = "";
    }
  };

  // Helper function to flush the current paragraph buffer
  const flushParagraph = (elements, buffer, key) => {
    if (buffer.trim() !== "") {
      elements.push(
        <LessonParagraph key={`p-${key}`}>
          {parseInlineCode(buffer.trim())}
        </LessonParagraph>
      );
    }
  };

  // Helper function for inline code parsing
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

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmedLine = rawLine.trim();

    // Check if the current line is a directive *before* checking parsingCode
    const isDirective = trimmedLine.match(/^\[(t|st|p|v|i|icon|dartpad|c:).*\]$/);

    // If we are parsing code and encounter [end], flush the code block
    if (parsingCode && trimmedLine === "[end]") {
      flushCodeBlock(i);
      continue;
    }

    // If we are parsing code and encounter any other directive, flush the code block first
    if (parsingCode && isDirective) {
      flushCodeBlock(i);
      // We don't continue here; we let the subsequent directive handling logic run
      // on the *current* line.
    }

    // --- TÍTULO PRINCIPAL ---
    if (trimmedLine.startsWith("[t]")) {
      flushParagraph(elements, paragraphBuffer, i);
      paragraphBuffer = "";
      elements.push(
        <LessonTitle key={`title-${i}`}>
          {parseInlineCode(trimmedLine.slice(3).trim())}
        </LessonTitle>
      );
      continue;
    }

    // --- SUBTÍTULO ---
    if (trimmedLine.startsWith("[st]")) {
      flushParagraph(elements, paragraphBuffer, i);
      paragraphBuffer = "";
      const subtitleText = trimmedLine.slice(4).trim();
      subtitles.push({
        id: `subtitle-${i}`,
        text: subtitleText,
        element: (
          <LessonSub key={`subtitle-${i}`}>
            {parseInlineCode(subtitleText)}
          </LessonSub>
        )
      });
      elements.push(
        <LessonSub key={`subtitle-${i}`} id={`subtitle-${i}`}>
          {parseInlineCode(subtitleText)}
        </LessonSub>
      );
      continue;
    }

    // --- INICIO DE NUEVO PÁRRAFO ---
    if (trimmedLine === "[p]") {
      flushParagraph(elements, paragraphBuffer, i);
      paragraphBuffer = "";
      continue;
    }

    // --- VIDEO EMBED ---
    if (trimmedLine.startsWith("[v]")) {
      flushParagraph(elements, paragraphBuffer, i);
      paragraphBuffer = "";
      const [id, title] = trimmedLine.slice(3).split("|").map((s) => s.trim());
      elements.push(
        <YouTubeEmbed key={`video-${i}`} videoId={id} title={title} />
      );
      continue;
    }

    // --- IMAGEN ---
    if (trimmedLine.startsWith("[i]")) {
      flushParagraph(elements, paragraphBuffer, i);
      paragraphBuffer = "";
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
      flushParagraph(elements, paragraphBuffer, i);
      paragraphBuffer = "";
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
      flushParagraph(elements, paragraphBuffer, i);
      paragraphBuffer = "";
      const gistId = trimmedLine.slice(9).trim();
      elements.push(
        <DartPadEmbed key={`dartpad-${i}`} gistId={gistId} />
      );
      continue;
    }

    // --- INICIO DE BLOQUE DE CÓDIGO ---
    if (trimmedLine.startsWith("[c:")) {
      flushParagraph(elements, paragraphBuffer, i);
      paragraphBuffer = "";
      parsingCode = true;
      codeLang = trimmedLine.match(/\[c:(.*)\]/)[1];
      codeBuffer = "";
      continue;
    }

    // --- CIERRE DE BLOQUE DE CÓDIGO o CÓDIGO CONTINUO ---
    // This logic needs to be after all other directives
    if (parsingCode) {
      // If the current line is a directive, it would have been caught earlier,
      // and flushCodeBlock would have been called.
      // So, if we are still parsing code here, it means it's a content line for the code block.
      codeBuffer += rawLine + "\n";
      // We don't need a specific "end of code block" directive check inside parsingCode anymore
      // because any new directive will trigger the flush.
      // The only remaining case to flush is the very end of the file.
      if (i === lines.length - 1) {
        flushCodeBlock(i);
      }
      continue;
    }

    // --- TEXTO CONTINUO (NOT PART OF CODE BLOCK) ---
    if (trimmedLine !== "") {
      paragraphBuffer += (paragraphBuffer ? " " : "") + trimmedLine;
    }

    // --- FIN DEL ARCHIVO ---
    if (i === lines.length - 1) {
      flushParagraph(elements, paragraphBuffer, i);
    }
  }

  return {
    elements: <LessonContainer>{elements}</LessonContainer>,
    subtitles: subtitles
  };
};

export default LessonParser;