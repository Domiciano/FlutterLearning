// src/components/util/TableOfContentsParser.js

import React from 'react';
import { getFirstTitleFromMarkdown } from './markdownUtils'; // ¡Ruta corregida! Ahora es relativo dentro de util/
import allLessonRawContents from './lessonImporter';   // ¡Ruta corregida! Ahora es relativo dentro de util/

// ... (el resto del código es el mismo que antes) ...

const TableOfContentsParser = async (tocContent) => {
  const lines = tocContent.split('\n').map(line => line.trim()).filter(line => line !== '');
  const sections = [];
  let lessonCounter = 0;

  for (const line of lines) {
    if (line.startsWith('[t]')) {
      const label = line.slice(3).trim();
      const id = label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      sections.push({ type: 'title', id: id, label });
    } else if (line.startsWith('[d]')) {
      sections.push({ type: 'divider' });
    } else if (line.startsWith('[lesson]')) {
      const filePath = line.slice(8).trim();
      const lessonId = ++lessonCounter;

      const rawContent = allLessonRawContents[filePath];

      if (rawContent) {
        const lessonLabel = getFirstTitleFromMarkdown(rawContent);
        sections.push({
          type: 'lesson',
          id: String(lessonId),
          label: lessonLabel || `Lección ${lessonId} (sin título)`,
          filePath: filePath,
        });
      } else {
        console.warn(`[TableOfContentsParser] No se encontró el contenido para la lección: ${filePath}. Asegúrate de que el archivo existe en la carpeta 'content'.`);
        sections.push({
          type: 'lesson',
          id: String(lessonId),
          label: `Error: Lección no encontrada (${filePath})`,
          filePath: filePath,
        });
      }
    }
  }

  return sections;
};

export default TableOfContentsParser;