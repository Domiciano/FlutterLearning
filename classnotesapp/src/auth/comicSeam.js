// src/auth/comicSeam.js
//
// Geometry of the comic-style seam between the login cover and the sign-in
// panel: a hand-torn looking white band with a black outline, the way comic
// panels are gutter-ed. The teeth are deliberately uneven — depth, spacing and
// band thickness all wobble — but the wobble comes from a seeded PRNG, so it is
// identical on every render.
//
// Everything here is derived from ONE vertex list, and that matters: the cover
// is clipped along the band's outer side (`seamClipPath`) while the band itself
// is drawn on top (`seamBandPath`). If the two ever disagree, the mismatch shows
// up as slivers of cover leaking past the outline. Rendering lives in
// LoginScreen.jsx.

const SEAM_TEETH = 15; // roughly, before the spacing jitter
const SEAM_BITE = 34; // how deep a tooth cuts into the cover, px
const SEAM_BAND = 16; // white band thickness, px
const SEAM_LIP = 3; // shallowest depth, so the band never runs off the cover

export const SEAM_INK = 3; // outline thickness, px
export const SEAM_SPAN = SEAM_BITE + SEAM_BAND + 8; // width of the SVG strip, px

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Vertices of the torn edge. `y` is a percentage of the screen height; `outer`
// and `inner` are depths in px measured inward from the cover's right edge, so
// larger means further left. The run starts above the top and ends below the
// bottom, which keeps the band's end caps off-screen.
export function buildSeam(seed) {
  const r = mulberry32(seed);
  const step = 100 / SEAM_TEETH;

  const ys = [-4];
  while (ys[ys.length - 1] < 100) {
    ys.push(ys[ys.length - 1] + step * (0.55 + r() * 0.9));
  }
  ys[ys.length - 1] = 104;
  // Even vertices ride the shallow side; an even count would end the run on a
  // deep tooth and leave the bottom corner cut away.
  if (ys.length % 2 === 0) ys.splice(ys.length - 2, 1);

  return ys.map((y, i) => {
    const outer = i % 2 === 0 ? SEAM_LIP + r() * 4 : SEAM_BITE * (0.5 + r() * 0.5);
    return { y, outer, inner: outer + SEAM_BAND * (0.8 + r() * 0.45) };
  });
}

const vertices = buildSeam(20260725);

// x in the strip's own space, where SEAM_SPAN is the cover's right edge.
const toX = (depth) => (SEAM_SPAN - depth).toFixed(2);
const outerPoints = vertices.map(({ outer, y }) => `${toX(outer)},${y.toFixed(3)}`);
const innerPoints = vertices.map(({ inner, y }) => `${toX(inner)},${y.toFixed(3)}`);

// Right edge of the cover, following the outer side of the band.
export const seamClipPath = `polygon(0% 0%, ${vertices
  .map(({ outer, y }) => `calc(100% - ${outer.toFixed(2)}px) ${y.toFixed(3)}%`)
  .join(', ')}, 0% 100%)`;

// The band as one closed shape: down the outer side, back up the inner one.
export const seamBandPath = `M ${[...outerPoints, ...[...innerPoints].reverse()].join(' L ')} Z`;
export const seamOuterPath = `M ${outerPoints.join(' L ')}`;
export const seamInnerPath = `M ${innerPoints.join(' L ')}`;
