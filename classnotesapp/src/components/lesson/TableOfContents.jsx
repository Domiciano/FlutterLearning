import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

const TableOfContents = ({ subtitles = [] }) => {
  const [activeSubtitle, setActiveSubtitle] = useState('');

  const scrollToSubtitle = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // Función para detectar qué subtítulo está visible
  const updateActiveSubtitle = () => {
    if (subtitles.length === 0) return;

    const scrollPosition = window.scrollY + 100; // Offset para mejor detección

    // Encontrar el subtítulo más cercano a la posición del scroll
    let currentActive = '';
    
    for (let i = subtitles.length - 1; i >= 0; i--) {
      const subtitle = subtitles[i];
      const element = document.getElementById(subtitle.id);
      
      if (element) {
        const elementTop = element.offsetTop;
        
        if (scrollPosition >= elementTop) {
          currentActive = subtitle.id;
          break;
        }
      }
    }

    // Si no encontramos ninguno, usar el primero
    if (!currentActive && subtitles.length > 0) {
      currentActive = subtitles[0].id;
    }

    setActiveSubtitle(currentActive);
  };

  // Efecto para manejar el scroll
  useEffect(() => {
    const handleScroll = () => {
      updateActiveSubtitle();
    };

    // Actualizar al montar el componente
    updateActiveSubtitle();

    // Agregar listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [subtitles]);

  if (subtitles.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        overflowY: 'auto',
        position: 'sticky',
        top: 0,
        pt: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          backgroundColor: 'rgba(30, 30, 30, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#0175C2',
            fontWeight: 600,
            mb: 2,
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Contenido
        </Typography>
        
        <List dense sx={{ p: 0 }}>
          {subtitles.map((subtitle) => (
            <ListItem key={subtitle.id} sx={{ p: 0, mb: 0.5 }}>
              <ListItemButton
                onClick={() => scrollToSubtitle(subtitle.id)}
                sx={{
                  borderRadius: 1,
                  py: 0.5,
                  px: 1,
                  backgroundColor: activeSubtitle === subtitle.id 
                    ? 'rgba(1, 117, 194, 0.2)' 
                    : 'transparent',
                  border: activeSubtitle === subtitle.id 
                    ? '1px solid rgba(1, 117, 194, 0.5)' 
                    : '1px solid transparent',
                  '&:hover': {
                    backgroundColor: activeSubtitle === subtitle.id 
                      ? 'rgba(1, 117, 194, 0.3)' 
                      : 'rgba(1, 117, 194, 0.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        color: activeSubtitle === subtitle.id 
                          ? '#0175C2' 
                          : '#e0e0e0',
                        fontSize: '0.875rem',
                        fontWeight: activeSubtitle === subtitle.id ? 600 : 400,
                        lineHeight: 1.3,
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      {subtitle.text}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default TableOfContents; 