import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DartPadEmbed from '../embed/DartPadEmbed';

const TryCodeButton = ({ gistId }) => {
  const [show, setShow] = useState(false);
  return (
    <Box sx={{ my: 2 }}>
      <Button
        variant={show ? 'outlined' : 'contained'}
        color="primary"
        onClick={() => setShow((prev) => !prev)}
        sx={{ fontWeight: 700, borderRadius: 2 }}
      >
        {show ? 'Ocultar DartPad' : 'Fire it up!'}
      </Button>
      {show && (
        <Box sx={{ mt: 2 }}>
          <DartPadEmbed gistId={gistId} />
        </Box>
      )}
    </Box>
  );
};

export default TryCodeButton; 