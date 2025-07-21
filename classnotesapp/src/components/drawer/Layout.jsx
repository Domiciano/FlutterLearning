// components/Layout.jsx
import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import { useThemeMode } from '@/theme/ThemeContext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useStudiedLessons } from '@/theme/StudiedLessonsContext';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Utilidad para persistir el estado de colapso de cada sección en localStorage
const LS_SECTIONS_COLLAPSED = 'flutter_sidebar_sections_collapsed';
const getSectionCollapseState = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_SECTIONS_COLLAPSED) || '{}');
  } catch {
    return {};
  }
};
const setSectionCollapseState = (state) => {
  localStorage.setItem(LS_SECTIONS_COLLAPSED, JSON.stringify(state));
};
const normalize = s => s.trim().toLowerCase();

const drawerWidth = 240;

const Layout = ({ children, sections = [], onOpenMobileNav }) => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme } = useThemeMode();
  const { studiedLessons, toggleStudied } = useStudiedLessons();
  const selectedLessonRef = useRef(null);

  // Estado para secciones retráctiles
  const sectionTitles = sections.filter(s => s.type === 'title').map(s => normalize(s.label));
  const [sectionsCollapsed, setSectionsCollapsed] = useState(() => {
    const stored = getSectionCollapseState();
    const initial = {};
    sectionTitles.forEach(title => {
      initial[title] = stored[title] ?? false;
    });
    return initial;
  });

  // Persistir en localStorage
  useEffect(() => {
    setSectionCollapseState(sectionsCollapsed);
  }, [sectionsCollapsed]);

  // Agrupa las lessons bajo cada sección
  const groupedSections = [];
  let currentTitle = null;
  let currentGroup = null;
  sections.forEach((sec) => {
    if (sec.type === 'title') {
      if (currentGroup) groupedSections.push(currentGroup);
      currentTitle = normalize(sec.label);
      currentGroup = { title: sec.label, normalized: currentTitle, items: [] };
    } else if (sec.type === 'lesson') {
      if (!currentGroup) {
        // Si hay lessons antes de cualquier título
        currentGroup = { title: '', normalized: '', items: [] };
      }
      currentGroup.items.push(sec);
    } else if (sec.type === 'divider') {
      if (currentGroup) groupedSections.push(currentGroup);
      groupedSections.push({ type: 'divider' });
      currentGroup = null;
      currentTitle = null;
    }
  });
  if (currentGroup) groupedSections.push(currentGroup);

  const drawerContent = (
    <Box sx={{
      width: 260,
      position: 'fixed  ',
      left:0,
      zIndex:10,
      height: '100vh',
      overflowY: 'auto',
      scrollbarWidth: 'none', // Firefox
      '&::-webkit-scrollbar': { display: 'none' }, // Chrome/Safari
    }}>
      <List>
        {groupedSections.map((group, idx) => {
          if (group.type === 'divider') {
            return <Divider key={`divider-${idx}`} sx={{ my: 1, backgroundColor: theme.border }} />;
          }
          // Renderiza el título y el bloque de lessons
          return (
            <React.Fragment key={`section-${group.normalized || idx}`}>
              {group.title && (
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    fontWeight: "bold",
                    color: theme.drawerTitle,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    mb: '2px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                  }}
                  onClick={() => setSectionsCollapsed(prev => ({ ...prev, [group.normalized]: !prev[group.normalized] }))}
                >
                  <ChevronRightIcon
                    sx={{
                      fontSize: 18,
                      color: theme.drawerTitle,
                      transition: 'transform 0.18s',
                      transform: sectionsCollapsed[group.normalized] ? 'rotate(0deg)' : 'rotate(90deg)',
                      opacity: 0.7,
                      mr: 0.5,
                    }}
                  />
                  {group.title}
                </Box>
              )}
              {!sectionsCollapsed[group.normalized] && group.items.map((sec) => {
                const isStudied = studiedLessons.includes(sec.id);
                const isSelected = location.pathname === `/lesson/${sec.id}`;
                return (
                  <ListItemButton
                    key={`lesson-${sec.id}`}
                    component={Link}
                    to={`/lesson/${sec.id}`}
                    selected={isSelected}
                    ref={isSelected ? selectedLessonRef : null}
                    sx={{
                      m:1,
                      color: theme.drawerSection,
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(100,181,246,0.25)',
                        color: theme.drawerTitle,
                      },
                      '&:hover': {
                        color: theme.drawerTitle,
                        backgroundColor: 'rgba(100,181,246,0.25)',
                      },
                      backgroundColor: isStudied && !isSelected ? 'rgba(33, 150, 243, 0.08)' : undefined,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <ListItemText primary={sec.label} />
                    <IconButton
                      size="small"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleStudied(String(sec.id));
                      }}
                      sx={{ ml: 1 }}
                      aria-label={isStudied ? 'Marcar como no estudiada' : 'Marcar como estudiada'}
                    >
                      {isStudied
                        ? <CheckCircleIcon sx={{ color: theme.accent }} />
                        : <CheckCircleOutlineIcon sx={{ color: isSelected ? theme.accent : theme.border, opacity: isSelected ? 0.8 : 1 }} />}
                    </IconButton>
                  </ListItemButton>
                );
              })}
            </React.Fragment>
          );
        })}
      </List>
      <Box sx={{ height: 100 }} /> {/* Espacio de relleno al final */}
    </Box>
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (!onOpenMobileNav) return;
    onOpenMobileNav.current = () => setMobileOpen(true);
  }, [onOpenMobileNav]);

  useEffect(() => {
    if (selectedLessonRef.current) {
      selectedLessonRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [location.pathname]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Primera columna: Nav Drawer */}
      {!isMobile && (
        <Box
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            backgroundColor: theme.background,
            color: '#fff',
            overflowX: 'hidden',
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100vh',
            zIndex: 1201,
            display: 'flex',
            flexDirection: 'column',
            pt: '64px',
          }}
        >
          {drawerContent}
        </Box>
      )}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ 
            keepMounted: true,
            disableScrollLock: false,
          }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: "85%",
              maxWidth: 260,
              backgroundColor: theme.background,
              color: theme.textPrimary,
              borderRight: `1px solid ${theme.border}`,
              boxShadow: "4px 0 20px rgba(0,0,0,0.5)",
              paddingTop: '64px',
            },
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }
          }}
        >
          {drawerContent}
        </Drawer>
      )}
      {/* Contenido principal */}
      <Box
        component="main"
        sx={{ 
          flex: 1,
          p: isMobile ? 1 : 2, 
          pt: isMobile ? 8 : 2, // Más espacio arriba en móvil para el AppBar
          width: "100%",
          boxSizing: "border-box",
          backgroundColor: theme.background,
          minHeight: "100vh",
          ml: !isMobile ? `${drawerWidth}px` : 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;


