// src/auth/LoginSlideshow.jsx
// Cross-fading cover slideshow for the login left panel. Stacks the images and
// fades between them on an interval. With a single image it's just static.

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

const LoginSlideshow = ({ images, interval = 5000, fade = 1200 }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!images || images.length < 2) return undefined;
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images, interval]);

  return (
    <>
      {images.map((src, i) => (
        <Box
          key={src}
          component="img"
          src={src}
          alt=""
          aria-hidden={i !== idx}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === idx ? 1 : 0,
            transition: `opacity ${fade}ms ease-in-out`,
          }}
        />
      ))}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.30) 100%)',
        }}
      />
    </>
  );
};

export default LoginSlideshow;
