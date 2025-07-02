// components/DartPadEmbed.jsx
import React from 'react';
import Box from '@mui/material/Box';

const DartPadEmbed = ({ gistId, height = '800px' }) => {
  const src = `https://dartpad.dev/embed-flutter.html?split=50&theme=dark&id=${gistId}`;

  return (
    <Box
      component="iframe"
      src={src}
      width="100%"
      height={height}
      sx={{
        border: 'none',
        borderRadius: 0,
        my: 0,
        boxShadow: 'none',
      }}
      title="DartPad Embed"
    />
  );
};

export default DartPadEmbed;
