import React, { useRef, useEffect } from 'react';
import { FLOATERS } from '../data/floaters';
import '../styles/background.css';

export default function FloatingPapers({ mouse }) {
  const refs = useRef([]);

  useEffect(() => {
    let raf;

    const update = () => {
      refs.current.forEach((el, i) => {
        if (!el) return;
        const f = FLOATERS[i];
        const mx = (mouse.current.x / window.innerWidth - 0.5) * f.speed * 15;
        const my = (mouse.current.y / window.innerHeight - 0.5) * f.speed * 10;
        el.style.transform = `translate(${mx}px, ${my}px) rotate(${f.r}deg)`;
      });
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [mouse]);

  return (
    <>
      {FLOATERS.map((f, i) => (
        <div
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className={`floater${f.shape === 'circle' ? ' circle' : ''}`}
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            '--r': `${f.r}deg`,
            '--speed': `${6 + i * 1.5}s`,
          }}
        />
      ))}
    </>
  );
}
