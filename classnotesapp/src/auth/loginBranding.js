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
//   motif:            mosaic pattern when backgroundImages is null —
//                     'mobile' | 'network' | 'geometric'.

import cover1 from '@/assets/login-1.jpg';
import cover2 from '@/assets/login-2.jpg';
import cover3 from '@/assets/login-3.jpg';
import cover4 from '@/assets/login-4.jpg';

export const loginBranding = {
  courseName: 'Aplicaciones Móviles',
  backgroundImages: [cover1, cover2, cover3, cover4],
  motif: 'mobile',
};
