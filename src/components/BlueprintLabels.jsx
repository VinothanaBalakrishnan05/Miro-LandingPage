import React, { useRef, useEffect } from 'react';
import { BLUEPRINT_LABELS } from '../data/floaters';
import { mapClamped } from '../utils/math';
import '../styles/sticky-notes.css';

export default function BlueprintLabels({ progress }) {
  const refs = useRef([]);

  useEffect(() => {
    let raf;

    const update = () => {
      const p = progress.current;

      refs.current.forEach((el, i) => {
        if (!el) return;
        const lbl = BLUEPRINT_LABELS[i];
        const show = p > lbl.enter && p < 0.88;
        el.style.opacity = show
          ? 0.35 *
            mapClamped(p, lbl.enter, lbl.enter + 0.04, 0, 1) *
            mapClamped(p, 0.82, 0.88, 1, 0)
          : 0;
      });

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  return (
    <>
      {BLUEPRINT_LABELS.map((lbl, i) => (
        <div
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className="blueprint-label"
          style={{ left: lbl.x, top: lbl.y }}
        >
          {lbl.text}
        </div>
      ))}
    </>
  );
}
