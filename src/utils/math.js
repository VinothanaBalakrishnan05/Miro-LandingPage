/* ═══════════════════════════════════════════════════
   MATH UTILITIES
   ═══════════════════════════════════════════════════ */

/** Linear interpolation */
export const lerp = (a, b, t) => a + (b - a) * t;

/** Clamp value between min and max */
export const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

/** Map value from one range to another */
export const mapRange = (v, inMin, inMax, outMin, outMax) =>
  outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin);

/** Map + clamp combined */
export const mapClamped = (v, inMin, inMax, outMin, outMax) =>
  mapRange(clamp(v, inMin, inMax), inMin, inMax, outMin, outMax);

/** Cubic ease-out */
export const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/** Cubic ease-in-out */
export const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Distance between two points */
export const dist = (x1, y1, x2, y2) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

/** Degrees to radians */
export const degToRad = (deg) => (deg * Math.PI) / 180;

/** Radians to degrees */
export const radToDeg = (rad) => (rad * 180) / Math.PI;
