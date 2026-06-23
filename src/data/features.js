import { COLORS } from '../utils/tokens';

/* ═══════════════════════════════════════════════════
   FEATURE CARDS
   enter = scroll progress when card unfolds
   ═══════════════════════════════════════════════════ */

const FEATURES = [
  {
    title: 'Infinite Canvas',
    desc: 'No edges, no boundaries. Your workspace grows with your thinking — zoom in for detail, zoom out for the big picture.',
    accent: COLORS.blue,
    icon: '◎',
    enter: 0.62,
  },
  {
    title: 'Live Collaboration',
    desc: 'See cursors dance, watch ideas form in real time. Every collaborator adds a new dimension to the canvas.',
    accent: COLORS.coral,
    icon: '◈',
    enter: 0.67,
  },
  {
    title: 'Smart Connections',
    desc: "Ideas don't exist in isolation. Draw relationships, build frameworks, let your thinking reveal its own structure.",
    accent: COLORS.mint,
    icon: '◇',
    enter: 0.72,
  },
];

export default FEATURES;
