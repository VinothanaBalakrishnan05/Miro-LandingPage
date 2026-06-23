import React, { useRef, useEffect } from 'react';
import { lerp, mapClamped, easeOut } from '../utils/math';
import '../styles/sticky-notes.css';

export default function StickyNote({ note, progress, mouse }) {
  const ref = useRef(null);
  const state = useRef({
    opacity: 0,
    y: 80,
    scale: 0.85,
    wobbleR: 0,
  });

  useEffect(() => {
    let raf;

    const update = () => {
      const p = progress.current;
      const s = state.current;

      // Enter animation
      const enterP = mapClamped(p, note.enter, note.enter + 0.06, 0, 1);
      const exitP = mapClamped(p, 0.82, 0.92, 1, 0);
      const eased = easeOut(enterP);

      s.opacity = lerp(s.opacity, eased * exitP, 0.12);
      s.y = lerp(s.y, enterP < 1 ? (1 - eased) * 80 : 0, 0.1);
      s.scale = lerp(s.scale, enterP < 1 ? 0.85 + eased * 0.15 : 1, 0.1);

      // Cursor proximity wobble
      if (ref.current && mouse.current.x > 0) {
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouse.current.x - cx;
        const dy = mouse.current.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 250) * 3;
        s.wobbleR = lerp(s.wobbleR, dx * influence * 0.02, 0.06);
      }

      // Apply
      if (ref.current) {
        ref.current.style.opacity = s.opacity;
        ref.current.style.transform =
          `translate(${note.x}vw, ${note.y}vh) translateX(-50%) ` +
          `translateY(${s.y}px) rotate(${note.r + s.wobbleR}deg) scale(${s.scale})`;
      }

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [note, progress, mouse]);

  return (
    <div
      ref={ref}
      className="sticky-note"
      style={{
        background: note.color,
        boxShadow: 'var(--shadow-md)',
        opacity: 0,
      }}
    >
      <span className="note-icon">{note.icon}</span>
      <span className="note-text">{note.text}</span>
      <div className="note-dot" style={{ background: note.border }} />
    </div>
  );
}
