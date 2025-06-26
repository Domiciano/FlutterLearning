import React from 'react';
import Box from '@mui/material/Box';

const ImageBlock = ({ src, alt = 'Imagen' }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        borderRadius: 6,
        boxShadow: 20,
        overflow: 'hidden',
        my: 1,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    </Box>
  );
};

export default ImageBlock;