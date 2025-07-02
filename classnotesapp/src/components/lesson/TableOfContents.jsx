import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useThemeMode } from '@/theme/ThemeContext';

const TableOfContents = ({ subtitles = [], lessonTitle }) => {
  const [activeSubtitle, setActiveSubtitle] = useState('');
  const { theme } = useThemeMode();

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
        position: 'sticky',
        top: { xs: '56px', sm: '64px' },
        pt: 2,
        pl: { lg: 3 },
        background: { lg: theme.background, xs: 'none' },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: theme.textPrimary,
          fontWeight: 700,
          mb: 2,
          fontSize: '1.1rem',
          textTransform: 'none',
          letterSpacing: '0.01em',
        }}
      >
        {lessonTitle}
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
                  ? 'rgba(66, 165, 245, 0.15)' // accent con opacidad
                  : 'transparent',
                border: activeSubtitle === subtitle.id 
                  ? `1px solid ${theme.accent}`
                  : '1px solid transparent',
                '&:hover': {
                  backgroundColor: activeSubtitle === subtitle.id 
                    ? 'rgba(66, 165, 245, 0.22)'
                    : 'rgba(66, 165, 245, 0.08)',
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
                        ? theme.primaryTitle
                        : theme.textSecondary,
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
    </Box>
  );
};

export default TableOfContents; 