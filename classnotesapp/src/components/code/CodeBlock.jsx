// components/CodeBlock.jsx
import React, { useEffect, useRef } from "react";
import Prism from "prismjs"; 
import "prismjs/components/prism-dart";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-java";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism-tomorrow.css";

// Importar lenguajes personalizados
import "@/prism/languages/prism-http.js";
import "@/prism/languages/prism-sql-enhanced.js";
import "@/prism/languages/prism-java-enhanced.js";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import "@/styles/flutter-like.css"; 

const CodeBlock = ({ children, language, className = "" }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children, language]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
  };

  return (
    <Box
      className={`flutter-code ${className}`}
      sx={{ 
        position: "relative", 
        my: 0,
        '& pre': {
          border: 'none !important',
          boxShadow: 'none !important',
        },
        '& code': {
          border: 'none !important',
          boxShadow: 'none !important',
        },
      }}
    >
      <IconButton
        onClick={copyToClipboard}
        sx={{ position: "absolute", top: 8, right: 8, color: "#fff", background: 'rgba(0,0,0,0.18)', '&:hover': { background: 'rgba(0,0,0,0.32)' } }}
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