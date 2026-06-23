import React, { useRef, useEffect, useState, useMemo } from 'react';
import { mapClamped } from '../utils/math';
import '../styles/hero.css';

const HEADLINE = 'Where Ideas Take Shape';

export default function Hero({ progress }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Build character array with stagger delays
  const chars = useMemo(() => {
    let idx = 0;
    return HEADLINE.split('').map((ch) => ({
      char: ch,
      isSpace: ch === ' ',
      delay: idx++ * 0.035,
    }));
  }, []);

  useEffect(() => {
    let raf;
    let revealed = false;

    const update = () => {
      const p = progress.current;

      // Trigger character reveal once
      if (p > 0.02 && !revealed) {
        revealed = true;
        setVisible(true);
      }

      // Fade out hero as workspace takes over
      if (ref.current) {
        const opacity = p < 0.22 ? 1 : mapClamped(p, 0.22, 0.30, 1, 0);
        const ty = p < 0.22 ? 0 : mapClamped(p, 0.22, 0.30, 0, -60);
        const scale = p < 0.22 ? 1 : mapClamped(p, 0.22, 0.30, 1, 0.95);
        ref.current.style.opacity = opacity;
        ref.current.style.transform = `translateY(${ty}px) scale(${scale})`;
      }

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  return (
    <div ref={ref} className="hero-container">
      <div className={`hero-eyebrow${visible ? ' visible' : ''}`}>
        ✦ A new kind of workspace
      </div>

      <h1 className="hero-headline">
        {chars.map((c, i) => (
          <span
            key={i}
            className={`hero-char${c.isSpace ? ' space' : ''}${visible ? ' visible' : ''}`}
            style={{ '--d': `${c.delay + 0.15}s` }}
          >
            {c.isSpace ? '\u00A0' : c.char}
          </span>
        ))}
      </h1>

      <p className={`hero-subtitle${visible ? ' visible' : ''}`}>
        Think together on an infinite canvas. Sketch, connect, and build —
        your ideas deserve a space as expansive as your imagination.
      </p>

      <div className={`hero-line${visible ? ' visible' : ''}`} />
    </div>
  );
}
