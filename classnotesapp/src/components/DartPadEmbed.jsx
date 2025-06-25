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
        borderRadius: 2,
        my: 3,
        boxShadow: 2,
      }}
      title="DartPad Embed"
    />
  );
};

export default DartPadEmbed;
