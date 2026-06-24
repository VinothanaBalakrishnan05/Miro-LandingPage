import React, { useRef, useEffect } from 'react';
import { mapClamped } from '../utils/math';
import '../styles/cta.css';

export default function RevealLabel({ progress }) {
  const ref = useRef(null);

  useEffect(() => {
    let raf;
    const update = () => {
      if (!ref.current) { raf = requestAnimationFrame(update); return; }
      ref.current.style.opacity = mapClamped(progress.current, 0.92, 0.97, 0, 0.7);  /* was 0.88-0.94 */
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  return (
    <div ref={ref} className="reveal-label">
      ✦ Your entire workspace, one infinite canvas ✦
    </div>
  );
}
