import React, { useState, useEffect } from 'react';
import '../styles/hero.css';

export default function ScrollHint({ progress }) {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Appear after initial delay
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  // Hide once user starts scrolling
  useEffect(() => {
    let raf;
    const check = () => {
      setHidden(progress.current > 0.04);
      raf = requestAnimationFrame(check);
    };
    raf = requestAnimationFrame(check);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  return (
    <div className={`scroll-hint${visible ? ' visible' : ''}${hidden ? ' hidden' : ''}`}>
      <div className="scroll-mouse" />
      <span>Scroll to explore</span>
    </div>
  );
}
