// components/CodeBlock.jsx
import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs"; // Importa la librería principal de Prism
import "prismjs/components/prism-dart"; // Importa específicamente el lenguaje Dart
// Puedes elegir un tema de Prism que te guste, o no importar ninguno
// para usar solo tus estilos personalizados. Aquí importo uno para empezar.
import "prismjs/themes/prism-tomorrow.css"; // Un tema oscuro común de Prism

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import "../styles/flutter-like.css"; // Tu CSS personalizado

const CodeBlock = ({ children, language, className = "" }) => {
  const codeRef = useRef(null); // Usamos una referencia para el elemento <code>

  // No necesitamos 'highlightedCode' en el estado si Prism.js manipula el DOM directamente
  // o si no hacemos procesado adicional con expresiones regulares.

  useEffect(() => {
    // Asegúrate de que el elemento ref exista antes de intentar resaltar
    if (codeRef.current) {
      // Si language es 'dart', asegúrate de que Prism.js tenga el componente cargado.
      // 'Prism.highlightElement' aplica el resaltado in-place al elemento.
      Prism.highlightElement(codeRef.current);
    }
  }, [children, language]); // Vuelve a ejecutar si el código o el lenguaje cambian

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
  };

  return (
    <Box
      className={`flutter-code ${className}`}
      sx={{ position: "relative", my: 3 }}
    >
      <IconButton
        onClick={copyToClipboard}
        sx={{ position: "absolute", top: 8, right: 8, color: "#fff" }}
        size="small"
        aria-label="Copiar código"
      >
        <ContentCopyIcon fontSize="small" />
      </IconButton>
      <pre style={{ margin: 0 }}>
        {/* Usamos 'ref' para que Prism.js pueda acceder al elemento <code> */}
        {/* El texto va directamente dentro de <code>, Prism lo resaltará */}
        <code className={`language-${language}`} ref={codeRef}>
          {children}
        </code>
      </pre>
    </Box>
  );
};

export default CodeBlock;