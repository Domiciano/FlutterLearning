// components/lesson/LessonTable.jsx
import React from 'react';
import Box from '@mui/material/Box';
import { useThemeMode } from '@/theme/ThemeContext';

// GFM tables arrive as bare <table>/<th>/<td>, which render with no borders and
// no padding — unreadable. These renderers give them visible rules in both
// modes. The `border` token of the palette is too close to the surface color to
// be seen, so the rule color is picked here per mode.
const rules = {
  light: {
    border: '#c9d2dd',
    headerBg: '#eaeff5',
    stripeBg: 'rgba(0, 0, 0, 0.02)',
  },
  dark: {
    border: '#3a4453',
    headerBg: '#262d3a',
    stripeBg: 'rgba(255, 255, 255, 0.02)',
  },
};

export const LessonTable = ({ children }) => {
  const { mode, theme } = useThemeMode();
  const rule = rules[mode] ?? rules.dark;

  return (
    // Wide tables scroll inside their own box instead of stretching the lesson.
    <Box sx={{ width: '100%', overflowX: 'auto', my: 3 }}>
      <Box
        component="table"
        sx={{
          borderCollapse: 'collapse',
          width: '100%',
          minWidth: 'min(100%, 520px)',
          color: theme.textPrimary,
          fontFamily: 'Roboto, Arial, sans-serif',
          fontSize: { xs: '0.95rem', md: '1rem' },
          border: `1px solid ${rule.border}`,
          borderRadius: '6px',
          overflow: 'hidden',
          '& tbody tr:nth-of-type(even)': { backgroundColor: rule.stripeBg },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export const LessonTableHead = ({ children }) => {
  const { mode } = useThemeMode();
  const rule = rules[mode] ?? rules.dark;
  return (
    <Box component="thead" sx={{ backgroundColor: rule.headerBg }}>
      {children}
    </Box>
  );
};

export const LessonTableHeaderCell = ({ children, style }) => {
  const { mode, theme } = useThemeMode();
  const rule = rules[mode] ?? rules.dark;
  return (
    <Box
      component="th"
      style={style}
      sx={{
        border: `1px solid ${rule.border}`,
        padding: '10px 14px',
        textAlign: style?.textAlign || 'left',
        fontWeight: 700,
        color: theme.textPrimary,
        verticalAlign: 'top',
      }}
    >
      {children}
    </Box>
  );
};

export const LessonTableCell = ({ children, style }) => {
  const { mode, theme } = useThemeMode();
  const rule = rules[mode] ?? rules.dark;
  return (
    <Box
      component="td"
      style={style}
      sx={{
        border: `1px solid ${rule.border}`,
        padding: '10px 14px',
        textAlign: style?.textAlign || 'left',
        color: theme.textPrimary,
        lineHeight: 1.6,
        verticalAlign: 'top',
      }}
    >
      {children}
    </Box>
  );
};
