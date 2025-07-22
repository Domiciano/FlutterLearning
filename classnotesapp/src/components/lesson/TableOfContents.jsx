import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useThemeMode } from '@/theme/ThemeContext';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';
import { useStudiedLessons } from '@/theme/StudiedLessonsContext';

// Función para convertir texto a slug válido para URL
const createSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD') // Normaliza caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remueve diacríticos
    .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
    .replace(/\s+/g, '-') // Reemplaza espacios con guiones
    .replace(/-+/g, '-') // Reemplaza múltiples guiones con uno solo
    .trim('-'); // Remueve guiones al inicio y final
};

const TableOfContents = ({ subtitles = [], lessonTitle, activeSections = [], lessonId }) => {
  const { theme } = useThemeMode();

  // Estado de lecciones estudiadas
  const { studiedLessons, toggleStudied } = useStudiedLessons();
  const isStudied = studiedLessons.includes(lessonId);

  const scrollToSubtitle = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const elementTop = element.offsetTop;
      const offset = 80; // 64px AppBar + 16px padding
      window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth'
      });
      
      // Find subtitle text and create slug for URL
      const subtitle = subtitles.find(sub => sub.id === id);
      if (subtitle) {
        const slug = createSlug(subtitle.text);
        window.history.replaceState(null, null, `#${slug}`);
      }
    }
  };

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
        // pl: { lg: 3 }, // Eliminar padding izquierdo para alinear
        background: { lg: theme.background, xs: 'none' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop:2, paddingBottom:2 }}>
        {lessonId && (
          <IconButton
            onClick={() => toggleStudied(String(lessonId))}
            sx={{ marginTop:0.5, color: isStudied ? theme.accent : '#fff', p:0}}
            aria-label={isStudied ? 'Marcar como no completado' : 'Marcar como completado'}
          >
            <CheckCircleIcon sx={{ color: isStudied ? theme.accent : '#fff' }} fontSize="small" />
          </IconButton>
        )}
      <Typography
        variant="h6"
        sx={{
            marginLeft:1,
          color: theme.textPrimary,
          fontWeight: 700,
          fontSize: '1.1rem',
          textTransform: 'none',
          letterSpacing: '0.01em',
        }}
      >
        {lessonTitle}
      </Typography>
      </Box>
      <List dense sx={{ p: 0 }}>
        {subtitles.map((subtitle) => (
          <ListItem key={subtitle.id} sx={{ p: 0, mb: 0.5 }}>
            <ListItemButton
              onClick={() => scrollToSubtitle(subtitle.id)}
              sx={{
                borderRadius: 1,
                py: 0.5,
                px: 1,
                backgroundColor: activeSections.includes(subtitle.id)
                  ? 'rgba(66, 165, 245, 0.15)' // accent con opacidad
                  : 'transparent',
                border: activeSections.includes(subtitle.id)
                  ? `1px solid ${theme.accent}`
                  : '1px solid transparent',
                '&:hover': {
                  backgroundColor: activeSections.includes(subtitle.id)
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
                      color: activeSections.includes(subtitle.id)
                        ? theme.primaryTitle
                        : theme.textSecondary,
                      fontSize: '0.875rem',
                      fontWeight: activeSections.includes(subtitle.id) ? 600 : 400,
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