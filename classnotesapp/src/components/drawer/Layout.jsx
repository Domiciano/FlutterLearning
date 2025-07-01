// components/Layout.jsx
import React, { useState } from "react";
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
import DrawerDivider from "./DrawerDivider";
import images from '@/assets';

const drawerWidth = 240;

const Layout = ({ children, sections = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ width: drawerWidth }}>
      <Box sx={{ px: 2, pt: 2, textAlign: "center" }}>
        <img
          src={images['logo.svg']}
          alt="Flutter"
          style={{ width: "100%", maxWidth: "180px", borderRadius: 8 }}
        />
      </Box>
      <Divider sx={{ my: 1, backgroundColor: '#333' }} />
      <List>
        {sections.map((sec, index) => {
          if (sec.type === "divider") return <DrawerDivider key={`divider-${index}`} />;
          if (sec.type === "title") {
            return (
              <Box
                key={`title-${index}`}
                sx={{
                  px: 2,
                  py: 1,
                  fontWeight: "bold",
                  color: "#42a5f5",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                }}
              >
                {sec.label}
              </Box>
            );
          }
          if (sec.type === "lesson") {
            return (
              <ListItemButton
                key={`lesson-${sec.id}`}
                component={Link}
                to={`/lesson/${sec.id}`}
                selected={location.pathname === `/lesson/${sec.id}`}
                sx={{
                  color: "#e0e0e0",
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(66, 165, 245, 0.1)',
                    color: '#42a5f5',
                  },
                  '&:hover': { color: '#42a5f5' },
                }}
                onClick={() => setMobileOpen(false)}
              >
                <ListItemText primary={sec.label} />
              </ListItemButton>
            );
          }
          return null;
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {isMobile && (
        <AppBar position="fixed" sx={{ backgroundColor: "#1e1e1e" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Flutter Lecciones
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              backgroundColor: "#1e1e1e",
              color: "#fff",
              borderRight: "1px solid #333",
              overflowX: "hidden",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              backgroundColor: "#1e1e1e",
              color: "#fff",
              borderRight: "1px solid #333",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: isMobile ? 0 : 2, 
          mt: isMobile ? 7 : 0,
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
