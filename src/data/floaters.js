/* ═══════════════════════════════════════════════════
   FLOATING PAPERS
   Decorative paper scraps that drift with mouse parallax
   ═══════════════════════════════════════════════════ */

export const FLOATERS = [
  { x: 8,  y: 35, size: 28, r: 12,  speed: 0.7, opacity: 0.15, shape: 'rect' },
  { x: 88, y: 25, size: 20, r: -8,  speed: 0.9, opacity: 0.12, shape: 'rect' },
  { x: 35, y: 85, size: 32, r: 15,  speed: 0.5, opacity: 0.10, shape: 'rect' },
  { x: 75, y: 75, size: 24, r: -12, speed: 0.8, opacity: 0.14, shape: 'circle' },
  { x: 50, y: 10, size: 18, r: 6,   speed: 1.0, opacity: 0.11, shape: 'rect' },
  { x: 92, y: 60, size: 22, r: -4,  speed: 0.6, opacity: 0.13, shape: 'circle' },
  { x: 5,  y: 70, size: 26, r: 10,  speed: 0.7, opacity: 0.09, shape: 'rect' },
  { x: 60, y: 5,  size: 16, r: -15, speed: 1.1, opacity: 0.10, shape: 'rect' },
];

/* ═══════════════════════════════════════════════════
   PARTICLES
   Tiny ambient dots that drift slowly
   ═══════════════════════════════════════════════════ */

export const PARTICLES = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  opacity: 0.06 + Math.random() * 0.12,
  duration: 15 + Math.random() * 25,
  delay: Math.random() * -30,
  dx: (Math.random() - 0.5) * 30,
  dy: (Math.random() - 0.5) * 20,
}));

/* ═══════════════════════════════════════════════════
   BLUEPRINT LABELS
   Tiny uppercase tags scattered around the workspace
   ═══════════════════════════════════════════════════ */

export const BLUEPRINT_LABELS = [
  { text: 'BRAINSTORM',   x: '8%',  y: '12%', enter: 0.32 },
  { text: 'COLLABORATE',  x: '72%', y: '8%',  enter: 0.36 },
  { text: 'DESIGN',       x: '38%', y: '42%', enter: 0.40 },
  { text: 'ITERATE',      x: '82%', y: '38%', enter: 0.44 },
  { text: 'DELIVER',      x: '18%', y: '58%', enter: 0.48 },
];
