import React, { useRef, useEffect } from 'react';
import { mapClamped } from '../utils/math';
import '../styles/background.css';

export default function BackgroundGrid({ mouse, progress }) {
  const ref = useRef(null);

  useEffect(() => {
    let raf;
    const update = () => {
      if (ref.current) {
        const mx = (mouse.current.x / window.innerWidth - 0.5) * 8;
        const my = (mouse.current.y / window.innerHeight - 0.5) * 8;
        ref.current.style.transform = `translate(${mx}px, ${my}px)`;

        const p = progress.current;
        const opacity = p < 0.03
          ? mapClamped(p, 0, 0.03, 0.3, 1)
          : p > 0.92                                /* was 0.82 */
            ? mapClamped(p, 0.92, 0.98, 1, 0.4)    /* was 0.82-0.95 */
            : 1;
        ref.current.style.opacity = opacity;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [mouse, progress]);

  return <div ref={ref} className="bg-grid" />;
}
