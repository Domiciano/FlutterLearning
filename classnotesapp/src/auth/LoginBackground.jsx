// src/auth/LoginBackground.jsx
//
// Minimalist, theme-aware backdrop for the login / profile gate. The motif is
// chosen per course in loginBranding.js. Purely decorative: absolutely
// positioned, non-interactive, and drawn at low opacity so it never competes
// with the card on top.

import React from 'react';
import Box from '@mui/material/Box';
import { useThemeMode } from '@/theme/ThemeContext';
import { loginBranding } from './loginBranding';

// Rounded "app icon" grid — reads unmistakably as a phone home screen.
const AppGrid = ({ color }) => (
  <>
    <defs>
      <pattern id="appgrid" width="88" height="88" patternUnits="userSpaceOnUse">
        <rect x="20" y="20" width="48" height="48" rx="14" fill="none" stroke={color} strokeWidth="2" />
      </pattern>
    </defs>
    <rect width="1200" height="800" fill="url(#appgrid)" opacity="0.10" />
  </>
);

// A simple phone silhouette with a speaker slit and a home indicator.
const Phone = ({ x, y, color, rotate = 0, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`} opacity="0.16">
    <rect x="0" y="0" width="150" height="300" rx="26" fill="none" stroke={color} strokeWidth="3" />
    <line x1="58" y1="20" x2="92" y2="20" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <line x1="55" y1="280" x2="95" y2="280" stroke={color} strokeWidth="4" strokeLinecap="round" />
  </g>
);

const Node = ({ x, y, r, color }) => (
  <circle cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth="2.5" opacity="0.18" />
);

// ── Comic texture ────────────────────────────────────────────────────────────
// Shared by the comic motifs: the halftone screen and the action lines are what
// make a flat drawing read as a comic page. Both are drawn faintly enough to sit
// behind the sign-in text, and live on the right half of the viewBox — the part
// the login cover panel does not hide.

// The dot screen printing gives comics their texture.
const Halftone = ({ color }) => (
  <>
    <defs>
      <pattern id="halftone" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="7" cy="7" r="2.8" fill={color} />
        <circle cx="22" cy="22" r="1.7" fill={color} />
      </pattern>
    </defs>
    <rect width="1200" height="800" fill="url(#halftone)" opacity="0.09" />
  </>
);

// Action lines fanning out from a focal point off the right edge.
const SpeedLines = ({ color }) => {
  const fx = 1330;
  const fy = 400;
  return (
    <g stroke={color} strokeWidth="2" opacity="0.09" strokeLinecap="round">
      {[-40, -29, -19, -9, 0, 9, 19, 29, 40].map((deg) => {
        const a = ((180 + deg) * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={(fx + 250 * Math.cos(a)).toFixed(1)}
            y1={(fy + 250 * Math.sin(a)).toFixed(1)}
            x2={(fx + 1020 * Math.cos(a)).toFixed(1)}
            y2={(fy + 1020 * Math.sin(a)).toFixed(1)}
          />
        );
      })}
    </g>
  );
};

// Mobile course scene: a phone running an app, its widget tree and a couple of
// floating UI cards, in the same comic-outline style as FullstackScene.
const MobileScene = ({ color }) => (
  <g fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" opacity="0.2">
    {/* The phone, with a card list on screen */}
    <g transform="translate(676 150)">
      <rect x="0" y="0" width="212" height="420" rx="30" />
      <line x1="82" y1="24" x2="130" y2="24" strokeWidth="4" strokeLinecap="round" />
      <line x1="78" y1="398" x2="134" y2="398" strokeWidth="5" strokeLinecap="round" />
      <rect x="26" y="58" width="160" height="70" rx="10" />
      <rect x="26" y="146" width="160" height="52" rx="10" />
      <rect x="26" y="216" width="160" height="52" rx="10" />
      <circle cx="60" cy="330" r="16" />
      <circle cx="106" cy="330" r="16" />
      <circle cx="152" cy="330" r="16" />
    </g>

    {/* Widget tree hanging off the phone */}
    <g transform="translate(946 210)">
      <rect x="70" y="0" width="96" height="46" rx="8" />
      <path d="M 118 46 L 118 84 M 46 84 L 190 84 M 46 84 L 46 118 M 190 84 L 190 118" />
      <rect x="0" y="118" width="92" height="42" rx="8" />
      <rect x="146" y="118" width="92" height="42" rx="8" />
      <path d="M 46 160 L 46 196 M 192 160 L 192 196" />
      <rect x="0" y="196" width="92" height="42" rx="8" />
      <rect x="146" y="196" width="92" height="42" rx="8" />
    </g>

    {/* A floating UI card, tilted like a sticker */}
    <g transform="translate(940 560) rotate(-8)">
      <rect x="0" y="0" width="188" height="112" rx="12" />
      <circle cx="34" cy="36" r="16" />
      <line x1="64" y1="28" x2="158" y2="28" />
      <line x1="64" y1="48" x2="132" y2="48" />
      <line x1="22" y1="82" x2="166" y2="82" />
    </g>
  </g>
);

// The stack itself, in comic-outline style.
const FullstackScene = ({ color }) => (
  <g fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" opacity="0.2">
    {/* Browser window — the React frontend */}
    <g>
      <rect x="676" y="92" width="304" height="196" rx="14" />
      <line x1="676" y1="142" x2="980" y2="142" />
      <circle cx="702" cy="117" r="7" />
      <circle cx="726" cy="117" r="7" />
      <circle cx="750" cy="117" r="7" />
      <rect x="704" y="172" width="118" height="86" rx="8" />
      <line x1="846" y1="180" x2="954" y2="180" />
      <line x1="846" y1="208" x2="920" y2="208" />
      <line x1="846" y1="236" x2="944" y2="236" />
    </g>

    {/* React atom */}
    <g transform="translate(1092 176)">
      <circle cx="0" cy="0" r="11" />
      {[0, 60, 120].map((deg) => (
        <ellipse key={deg} cx="0" cy="0" rx="58" ry="23" transform={`rotate(${deg})`} />
      ))}
    </g>

    {/* Request / response arrows down the stack */}
    <g strokeWidth="3.5">
      <path d="M 828 288 L 828 372" />
      <path d="M 816 358 L 828 376 L 840 358" />
      <path d="M 900 372 L 900 288" />
      <path d="M 888 302 L 900 284 L 912 302" />
    </g>

    {/* Spring Boot service — a server with its slots */}
    <g>
      <rect x="700" y="376" width="288" height="128" rx="12" />
      <line x1="700" y1="440" x2="988" y2="440" />
      <circle cx="732" cy="408" r="6" />
      <circle cx="732" cy="472" r="6" />
      <line x1="762" y1="408" x2="944" y2="408" />
      <line x1="762" y1="472" x2="900" y2="472" />
    </g>

    <g strokeWidth="3.5">
      <path d="M 844 504 L 844 588" />
      <path d="M 832 574 L 844 592 L 856 574" />
    </g>

    {/* Database */}
    <g transform="translate(744 592)">
      <ellipse cx="100" cy="26" rx="100" ry="26" />
      <path d="M 0 26 L 0 118" />
      <path d="M 200 26 L 200 118" />
      <path d="M 0 118 A 100 26 0 0 0 200 118" />
      <path d="M 0 72 A 100 26 0 0 0 200 72" />
    </g>
  </g>
);

const motifContent = (motif, color) => {
  switch (motif) {
    case 'mobile':
      return (
        <>
          <Halftone color={color} />
          <SpeedLines color={color} />
          <MobileScene color={color} />
        </>
      );
    case 'app-grid': // the pre-comic look, kept for reference
      return (
        <>
          <AppGrid color={color} />
          <Phone x={-40} y={470} color={color} rotate={-12} />
          <Phone x={1010} y={-70} color={color} rotate={14} scale={1.15} />
        </>
      );
    case 'fullstack':
      return (
        <>
          <Halftone color={color} />
          <SpeedLines color={color} />
          <FullstackScene color={color} />
        </>
      );
    case 'network':
      return (
        <>
          <g stroke={color} strokeWidth="1.5" opacity="0.16">
            <line x1="140" y1="180" x2="420" y2="300" />
            <line x1="420" y1="300" x2="700" y2="160" />
            <line x1="420" y1="300" x2="560" y2="560" />
            <line x1="700" y1="160" x2="980" y2="320" />
            <line x1="560" y1="560" x2="900" y2="620" />
          </g>
          <Node x={140} y={180} r={10} color={color} />
          <Node x={420} y={300} r={16} color={color} />
          <Node x={700} y={160} r={12} color={color} />
          <Node x={560} y={560} r={14} color={color} />
          <Node x={980} y={320} r={10} color={color} />
          <Node x={900} y={620} r={12} color={color} />
        </>
      );
    default: // 'geometric'
      return (
        <>
          <defs>
            <pattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="2.5" fill={color} />
            </pattern>
          </defs>
          <rect width="1200" height="800" fill="url(#dots)" opacity="0.10" />
          <circle cx="1050" cy="120" r="120" fill="none" stroke={color} strokeWidth="2" opacity="0.12" />
          <circle cx="120" cy="680" r="90" fill="none" stroke={color} strokeWidth="2" opacity="0.12" />
        </>
      );
  }
};

const LoginBackground = () => {
  const { theme } = useThemeMode();

  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        // Soft gradient wash behind the motif.
        background: `radial-gradient(1100px 620px at 78% -8%, ${theme.accent}22, transparent 60%),
                     radial-gradient(900px 560px at 12% 108%, ${theme.accent}18, transparent 60%)`,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ display: 'block' }}
      >
        {motifContent(loginBranding.motif, theme.accent)}
      </svg>
    </Box>
  );
};

export default LoginBackground;
