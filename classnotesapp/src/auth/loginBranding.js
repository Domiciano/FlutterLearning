// src/auth/loginBranding.js
//
// Per-course look of the login / profile gate. This is a variation axis like
// the theme: only the values below change per course, the rendering lives in
// the shared LoginScreen.jsx / LoginIllustration.jsx.
//
//   courseName:       shown on the login card.
//   backgroundImages: optional array of photos for the left panel. With more
//                     than one they cross-fade as a slideshow. When null, the
//                     generated prototype mosaic is used instead.
//   motif:            backdrop pattern — 'mobile' | 'fullstack' | 'network' |
//                     'geometric' | 'app-grid'.
//   comic:            when true the sign-in side gets the comic treatment —
//                     inked-and-outlined lettering for the course name and the
//                     Icesi logo masked to paper white. Left out, the panel
//                     keeps the plain look.
//   comicFont:        display face for that lettering (loaded in index.html).

import cover1 from '@/assets/login-1.jpg';
import cover2 from '@/assets/login-2.jpg';
import cover3 from '@/assets/login-3.jpg';
import cover4 from '@/assets/login-4.jpg';

// Distinctive display face for the course title (loaded in index.html).
export const DISPLAY_FONT = "'Space Grotesk', 'Segoe UI', sans-serif";

export const loginBranding = {
  courseName: 'Aplicaciones Móviles',
  backgroundImages: [cover1, cover2, cover3, cover4],
  motif: 'mobile',
  comic: true,
  comicFont: "'Bangers', 'Space Grotesk', system-ui, sans-serif",
};
