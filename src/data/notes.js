import { COLORS } from '../utils/tokens';

/* ═══════════════════════════════════════════════════
   STICKY NOTES
   x/y   = viewport percentage position
   r     = base rotation in degrees
   enter = scroll progress when note appears (0–1)
   ═══════════════════════════════════════════════════ */

const NOTES = [
  {
    id: 1,
    x: 12,
    y: 18,
    r: -4,
    color: COLORS.noteYellow,
    border: COLORS.noteYellowDark,
    text: 'User Research',
    icon: '🔍',
    enter: 0.26,
  },
  {
    id: 2,
    x: 68,
    y: 12,
    r: 5,
    color: COLORS.noteBlue,
    border: COLORS.noteBlueDark,
    text: 'Design Sprint',
    icon: '⚡',
    enter: 0.3,
  },
  {
    id: 3,
    x: 42,
    y: 48,
    r: -2,
    color: COLORS.notePink,
    border: COLORS.notePinkDark,
    text: 'Prototype',
    icon: '✨',
    enter: 0.34,
  },
  {
    id: 4,
    x: 78,
    y: 42,
    r: 3,
    color: COLORS.noteGreen,
    border: COLORS.noteGreenDark,
    text: 'Test & Iterate',
    icon: '🔄',
    enter: 0.38,
  },
  {
    id: 5,
    x: 22,
    y: 65,
    r: -5,
    color: COLORS.noteLavender,
    border: COLORS.noteLavenderDark,
    text: 'Ship It!',
    icon: '🚀',
    enter: 0.42,
  },
  {
    id: 6,
    x: 55,
    y: 72,
    r: 2,
    color: COLORS.noteYellow,
    border: COLORS.noteYellowDark,
    text: 'Celebrate',
    icon: '🎉',
    enter: 0.44,
  },
];

export default NOTES;
