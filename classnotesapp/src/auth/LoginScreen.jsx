// src/auth/LoginScreen.jsx
// Two-panel login: a flat illustration panel (per-course motif) on the left,
// the sign-in form on the right. Sign-in is open — anyone with a Google
// account can enter; we only ask for identity afterwards.

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useThemeMode } from '@/theme/ThemeContext';
import { useAuth } from './AuthContext';
import LoginBackground from './LoginBackground';
import LoginIllustration from './LoginIllustration';
import LoginSlideshow from './LoginSlideshow';
import { loginBranding, DISPLAY_FONT } from './loginBranding';
import {
  SEAM_INK,
  SEAM_SPAN,
  seamBandPath,
  seamClipPath,
  seamInnerPath,
  seamOuterPath,
} from './comicSeam';
import icesiLogo from '@/assets/icesi-logo.svg';

const INK = '#141821';
const PAPER = '#FFFFFF';

const GoogleG = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true">
    <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.88 2.68-6.62z" />
    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.83.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.34A9 9 0 0 0 9 18z" />
    <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.94H.96a9 9 0 0 0 0 8.12l3.01-2.34z" />
    <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.89 11.43 0 9 0A9 9 0 0 0 .96 4.94l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58z" />
  </svg>
);

// The viewBox is stretched vertically (preserveAspectRatio="none"), so the
// outline is non-scaling to keep an even thickness. The two sides are stroked
// separately: the outer one runs along the cover's clip boundary, which eats
// the half of the stroke that falls outside it, so it is drawn double width to
// come out the same weight as the inner side.
const ComicSeam = ({ paper, ink }) => (
  <Box aria-hidden sx={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: `${SEAM_SPAN}px` }}>
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${SEAM_SPAN} 100`}
      preserveAspectRatio="none"
      style={{ display: 'block' }}
    >
      <path d={seamBandPath} fill={paper} />
      <path
        d={seamInnerPath}
        fill="none"
        stroke={ink}
        strokeWidth={SEAM_INK}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={seamOuterPath}
        fill="none"
        stroke={ink}
        strokeWidth={SEAM_INK * 2}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  </Box>
);

// Comic lettering: paper-white glyphs with a heavy ink outline and a hard
// offset shadow in the course accent. It is built from three stacked copies of
// the same text rather than -webkit-text-stroke alone, because that stroke is
// centred on the glyph and would eat into the letterforms:
//   1. accent silhouette, nudged down-right  → the drop shadow
//   2. ink silhouette, in place              → the outline
//   3. the real text, filled paper           → the letters
// Only the third one is readable by assistive tech; the other two are hidden.
const ComicTitle = ({ children, accent, font }) => {
  const base = {
    fontFamily: font,
    fontWeight: 400,
    fontSize: { xs: '2.6rem', sm: '3.2rem' },
    lineHeight: 1.02,
    letterSpacing: '0.015em',
    m: 0,
  };
  const silhouette = (color, offset) => ({
    ...base,
    position: 'absolute',
    left: offset,
    top: offset,
    right: offset === 0 ? 0 : `-${offset}px`,
    color,
    WebkitTextStroke: `9px ${color}`,
    userSelect: 'none',
  });

  return (
    <Box sx={{ position: 'relative', display: 'block', mb: 4.5 }}>
      <Typography aria-hidden component="span" sx={silhouette(accent, 7)}>{children}</Typography>
      <Typography aria-hidden component="span" sx={silhouette(INK, 0)}>{children}</Typography>
      <Typography component="h1" sx={{ ...base, position: 'relative', color: PAPER }}>
        {children}
      </Typography>
    </Box>
  );
};

const LoginScreen = () => {
  const { theme } = useThemeMode();
  const { signInWithGoogle, authError } = useAuth();
  // Per-course look: the comic treatment is a branding choice, like the cover
  // images or the motif, so the component stays shared between courses.
  const comic = !!loginBranding.comic;
  const comicFont = loginBranding.comicFont || DISPLAY_FONT;

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', background: theme.background }}>
      {/* The sign-in backdrop spans the whole screen, not just the right half,
          so the zigzag notches cut into the cover reveal exactly the same
          gradient as the panel next to them — clipping the cover against a
          separately-painted panel makes the teeth read as off-color triangles. */}
      <LoginBackground />

      {/* Left — decorative panel (hidden on small screens): a per-course photo
          if one is set in loginBranding, otherwise the prototype mosaic. */}
      <Box
        sx={{
          flex: '1.05',
          display: { xs: 'none', md: 'block' },
          position: 'relative',
          overflow: 'hidden',
          background: theme.accent,
          clipPath: seamClipPath,
        }}
      >
        {loginBranding.backgroundImages?.length ? (
          <LoginSlideshow images={loginBranding.backgroundImages} />
        ) : (
          <LoginIllustration />
        )}
        {/* Painted last so the band sits on top of the cover. */}
        <ComicSeam paper={PAPER} ink={INK} />
      </Box>

      {/* Right — sign-in panel */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, sm: 6 },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 420, textAlign: 'center' }}>
          {comic ? (
            // The logo is a single-color SVG, so it is used as a mask and the
            // color comes from the CSS — over the dark panel it has to be paper
            // white, and the file stays untouched for anywhere it is used plain.
            <Box
              role="img"
              aria-label="Universidad Icesi"
              sx={{
                width: 180,
                height: 68, // the logo's viewBox is 1536 x 584.44
                mx: 'auto',
                mb: 3.5,
                backgroundColor: PAPER,
                WebkitMask: `url(${icesiLogo}) center / contain no-repeat`,
                mask: `url(${icesiLogo}) center / contain no-repeat`,
              }}
            />
          ) : (
            <img
              src={icesiLogo}
              alt="Universidad Icesi"
              style={{ height: 40, width: 'auto', display: 'block', margin: '0 auto 28px' }}
            />
          )}

          {comic ? (
            <ComicTitle accent={theme.accent} font={comicFont}>
              {loginBranding.courseName}
            </ComicTitle>
          ) : (
            <Typography
              component="h1"
              sx={{
                fontFamily: DISPLAY_FONT,
                color: theme.textPrimary,
                fontWeight: 700,
                fontSize: { xs: '1.9rem', sm: '2.2rem' },
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                mb: 1.5,
              }}
            >
              {loginBranding.courseName}
            </Typography>
          )}

          {/* The comic panel goes straight from the lettering to the button —
              the button already says what to do, so the instruction line only
              appears in the plain layout. */}
          {!comic && (
            <Typography sx={{ color: theme.textSecondary, mb: 4, fontSize: '1rem' }}>
              Inicia sesión con tu cuenta de Google para entrar al contenido del curso.
            </Typography>
          )}

          <Button
            onClick={signInWithGoogle}
            fullWidth
            startIcon={
              <Box sx={{ display: 'flex', background: PAPER, borderRadius: '6px', p: '4px', border: `2px solid ${INK}` }}>
                <GoogleG />
              </Box>
            }
            disableRipple
            sx={{
              textTransform: 'none',
              fontFamily: comic ? comicFont : DISPLAY_FONT,
              fontWeight: comic ? 400 : 600,
              fontSize: comic ? '1.25rem' : '1rem',
              letterSpacing: comic ? '0.04em' : 'normal',
              py: 1.35,
              gap: 0.5,
              color: INK,
              background: PAPER,
              border: `2.5px solid ${INK}`,
              borderRadius: '14px',
              boxShadow: `5px 5px 0 ${theme.accent}`,
              transition: 'transform .12s ease, box-shadow .12s ease',
              '&:hover': {
                background: PAPER,
                transform: 'translate(2px, 2px)',
                boxShadow: `3px 3px 0 ${theme.accent}`,
              },
            }}
          >
            Continuar con Google
          </Button>

          {authError && (
            <Typography sx={{ color: theme.error, mt: 2, fontSize: '0.85rem' }}>
              {authError}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginScreen;
