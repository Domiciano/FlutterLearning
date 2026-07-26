// components/DartPadEmbed.jsx
import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useAnalytics } from '@/analytics/AnalyticsProvider';
import { EVENTS } from '@/analytics/events';

const DartPadEmbed = ({ gistId, height = '800px' }) => {
  const src = `https://dartpad.dev/embed-flutter.html?split=50&theme=dark&id=${gistId}`;
  const { track } = useAnalytics();
  const frameRef = useRef(null);

  // DartPad corre en un iframe de otro origen: no se puede leer el código escrito,
  // si compila ni el error. Lo único observable es que lo abrieron y cuánto tiempo
  // tuvo el foco, y esto último solo por aproximación — cuando el foco entra en un
  // iframe, `document.activeElement` del documento padre pasa a ser ese iframe.
  // Es una medida pobre y el diccionario la marca como tal: ninguna conclusión
  // debe apoyarse solo en `focusMs`.
  useEffect(() => {
    track(EVENTS.DARTPAD_OPEN, { gistId });

    let focusMs = 0;
    let enteredAt = null;

    const enter = () => {
      if (enteredAt === null && document.activeElement === frameRef.current) {
        enteredAt = Date.now();
      }
    };
    const leave = () => {
      if (enteredAt !== null) {
        focusMs += Date.now() - enteredAt;
        enteredAt = null;
      }
    };

    window.addEventListener('blur', enter);
    window.addEventListener('focus', leave);

    return () => {
      leave();
      window.removeEventListener('blur', enter);
      window.removeEventListener('focus', leave);
      track(EVENTS.DARTPAD_DWELL, { gistId, focusMs });
    };
  }, [gistId, track]);

  return (
    <Box
      component="iframe"
      ref={frameRef}
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
