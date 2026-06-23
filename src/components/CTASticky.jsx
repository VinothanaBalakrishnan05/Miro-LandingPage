import React, { useRef, useEffect } from 'react';
import { mapClamped, easeOut } from '../utils/math';
import '../styles/cta.css';

export default function CTASticky({ progress }) {
  const ref = useRef(null);

  useEffect(() => {
    let raf;

    const update = () => {
      if (!ref.current) {
        raf = requestAnimationFrame(update);
        return;
      }

      const p = progress.current;
      const show = mapClamped(p, 0.90, 0.96, 0, 1);

      ref.current.style.opacity = easeOut(show);
      ref.current.style.pointerEvents = show > 0.5 ? 'auto' : 'none';

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  return (
    <div ref={ref} className="cta-sticky" style={{ opacity: 0 }}>
      <span className="cta-text">
        Start Creating <span className="cta-arrow">→</span>
      </span>
    </div>
  );
}
