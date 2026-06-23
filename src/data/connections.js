/* ═══════════════════════════════════════════════════
   CONNECTIONS
   from/to = note IDs
   curve   = bezier offset (positive = bow down, negative = bow up)
   enter   = scroll progress when line begins drawing
   ═══════════════════════════════════════════════════ */

const CONNECTIONS = [
  { from: 1, to: 3, enter: 0.46, curve: 30 },
  { from: 2, to: 3, enter: 0.49, curve: -25 },
  { from: 3, to: 4, enter: 0.52, curve: 20 },
  { from: 3, to: 5, enter: 0.55, curve: -35 },
  { from: 4, to: 6, enter: 0.57, curve: 25 },
  { from: 5, to: 6, enter: 0.59, curve: -20 },
];

export default CONNECTIONS;
