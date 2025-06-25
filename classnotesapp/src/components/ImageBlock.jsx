import React from 'react';
import Box from '@mui/material/Box';

const ImageBlock = ({ src, alt = 'Imagen' }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        borderRadius: 2,
        boxShadow: 3,
        overflow: 'hidden',
        my: 3,
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