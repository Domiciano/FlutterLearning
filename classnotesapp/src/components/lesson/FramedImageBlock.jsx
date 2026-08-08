import React from 'react';
import Box from '@mui/material/Box';

// For screenshots exported with a transparent background (isolated component
// crops). The inner box wraps the image with a small padding, so the white
// card hugs the image's rendered size (plus breathing room) instead of the
// full column width — white shows through only around the image, never
// beyond it. `scale` shrinks that whole unit (kept at its own aspect ratio)
// inside a fully transparent outer container.
// `card={false}` deja solo el escalado, para capturas que ya traen su propio
// fondo opaco y no necesitan (ni quieren) el marco blanco.
const FramedImageBlock = ({ src, alt = 'Imagen', scale = 1, card = true }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', my: 2 }}>
      <Box
        sx={{
          width: `${scale * 100}%`,
          backgroundColor: card ? 'rgb(246, 247, 250)' : 'transparent',
          borderRadius: 3,
          p: card ? 2 : 0,
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
    </Box>
  );
};

export default FramedImageBlock;
