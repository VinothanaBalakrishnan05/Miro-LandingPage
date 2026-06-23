import React from 'react';
import { PARTICLES } from '../data/floaters';
import '../styles/background.css';

export default function ParticleField() {
  return (
    <>
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            '--dur': `${p.duration}s`,
            '--delay': `${p.delay}s`,
            '--dx': p.dx,
            '--dy': p.dy,
          }}
        />
      ))}
    </>
  );
}
