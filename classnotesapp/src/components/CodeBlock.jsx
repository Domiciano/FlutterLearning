// components/CodeBlock.jsx
import React, { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/lib/common";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import "../styles/flutter-like.css";

const CodeBlock = ({ children, language, className = "" }) => {
  const [highlightedCode, setHighlightedCode] = useState("");

  useEffect(() => {
    const highlighted = hljs.highlight(children, { language }).value;

    const widgetNames = [
      "AlertDialog",
      "Align",
      "AppBar",
      "AssetImage",
      "Box",
      "BottomNavigationBar",
      "Builder",
      "Card",
      "Center",
      "Checkbox",
      "CircleAvatar",
      "Column",
      "Container",
      "CupertinoApp",
      "DefaultTabController",
      "Divider",
      "Drawer",
      "DropdownButton",
      "ElevatedButton",
      "Expanded",
      "FloatingActionButton",
      "FutureBuilder",
      "GestureDetector",
      "GridView",
      "Icon",
      "Image",
      "InkWell",
      "ListTile",
      "ListView",
      "MaterialApp",
      "NetworkImage",
      "Obx",
      "OutlinedButton",
      "Padding",
      "PageView",
      "Positioned",
      "Provider",
      "Radio",
      "Row",
      "Scaffold",
      "SingleChildScrollView",
      "SizedBox",
      "Spacer",
      "Stack",
      "StatefulWidget",
      "StatelessWidget",
      "StreamBuilder",
      "Switch",
      "TabBar",
      "TabBarView",
      "Text",
      "TextButton",
      "TextField",
      "Theme",
    ];
    const widgetRegex = new RegExp(`\\b(${widgetNames.join("|")})\\b`, "g");

    const enhanced = highlighted.replace(
      widgetRegex,
      '<span class="hljs-widget">$1</span>'
    );
    setHighlightedCode(enhanced);
  }, [children, language]);

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
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </Box>
  );
};

export default CodeBlock;
