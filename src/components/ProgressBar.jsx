import React, { useRef, useEffect } from 'react';

export default function ProgressBar({ progress }) {
  const ref = useRef(null);

  useEffect(() => {
    let raf;

    const update = () => {
      if (ref.current) {
        ref.current.style.width = `${progress.current * 100}%`;
      }
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  return <div ref={ref} className="progress-bar" />;
}
