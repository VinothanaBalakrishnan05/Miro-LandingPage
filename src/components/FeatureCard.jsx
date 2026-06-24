import React, { useRef, useEffect } from 'react';
import { lerp, mapClamped, easeOut } from '../utils/math';
import '../styles/features.css';

export default function FeatureCard({ feature, progress, mouse }) {
  const ref = useRef(null);
  const state = useRef({ opacity:0, rotateX:-40, y:60, tiltX:0, tiltY:0 });

  useEffect(() => {
    let raf;
    const update = () => {
      const p = progress.current;
      const s = state.current;

      const enterP = mapClamped(p, feature.enter, feature.enter + 0.06, 0, 1);
      const exitP  = mapClamped(p, 0.92, 0.98, 1, 0);  /* was 0.85-0.92 */
      const eased  = easeOut(enterP);

      s.opacity = lerp(s.opacity, eased * exitP, 0.1);
      s.rotateX = lerp(s.rotateX, (1 - eased) * -40, 0.08);
      s.y       = lerp(s.y, (1 - eased) * 60, 0.08);

      if (ref.current && mouse.current.x > 0) {
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (mouse.current.x - cx) / rect.width;
        const dy = (mouse.current.y - cy) / rect.height;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1.5) {
          s.tiltX = lerp(s.tiltX, dy * -6, 0.06);
          s.tiltY = lerp(s.tiltY, dx * 6, 0.06);
        } else {
          s.tiltX = lerp(s.tiltX, 0, 0.05);
          s.tiltY = lerp(s.tiltY, 0, 0.05);
        }
      }

      if (ref.current) {
        ref.current.style.opacity = s.opacity;
        ref.current.style.transform =
          `translateY(${s.y}px) perspective(800px) ` +
          `rotateX(${s.rotateX + s.tiltX}deg) rotateY(${s.tiltY}deg)`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [feature, progress, mouse]);

  return (
    <div ref={ref} className="feature-card" style={{ opacity: 0 }}>
      <span className="feature-icon" style={{ color: feature.accent }}>{feature.icon}</span>
      <div className="feature-title">{feature.title}</div>
      <div className="feature-desc">{feature.desc}</div>
      <div className="feature-accent" style={{ background: feature.accent }} />
    </div>
  );
}
