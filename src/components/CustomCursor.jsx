import React, { useRef, useEffect } from 'react';
import { lerp } from '../utils/math';
import '../styles/cursor.css';

const TRAIL_COUNT = 5;

export default function CustomCursor({ mouse, isHovering }) {
  const mainRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);

  /* Mutable animation state — never triggers re-renders */
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const trails = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0, opacity: 0 }))
  );
  const prev = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const firstMove = useRef(true);            // snap on very first mouse event
  const hoveringRef = useRef(isHovering);     // avoids stale closure
  hoveringRef.current = isHovering;

  useEffect(() => {
    let raf;

    const update = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      /* ── First real move: snap everything to the cursor ── */
      if (firstMove.current && mx > 0 && my > 0) {
        firstMove.current = false;
        pos.current = { x: mx, y: my };
        ringPos.current = { x: mx, y: my };
        prev.current = { x: mx, y: my };
        trails.current.forEach((t) => { t.x = mx; t.y = my; });
      }

      /* ── Velocity (for stretch direction) ── */
      vel.current.x = mx - prev.current.x;
      vel.current.y = my - prev.current.y;
      prev.current = { x: mx, y: my };

      /* ── Smooth follow ── */
      pos.current.x = lerp(pos.current.x, mx, 0.25);
      pos.current.y = lerp(pos.current.y, my, 0.25);
      ringPos.current.x = lerp(ringPos.current.x, mx, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, my, 0.12);

      /* ── Stretch along movement vector ── */
      const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
      const stretch = Math.min(speed * 0.12, 0.5);
      const angle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI);

      /* ── Apply: main dot ──
         Offset = half the element's current width/height so the
         center of the dot sits on the cursor coordinate.
         Normal 10 px → offset 5 · Hovering 40 px → offset 20      */
      if (mainRef.current) {
        const half = hoveringRef.current ? 20 : 5;
        mainRef.current.style.transform =
          `translate(${pos.current.x - half}px, ${pos.current.y - half}px) ` +
          `rotate(${speed > 1.5 ? angle : 0}deg) ` +
          `scaleX(${1 + stretch}) scaleY(${1 - stretch * 0.25})`;
      }

      /* ── Apply: ring (36 px → offset 18) ── */
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;
      }

      /* ── Apply: trailing dots (4 px → offset 2) ── */
      for (let i = trails.current.length - 1; i > 0; i--) {
        trails.current[i].x = lerp(trails.current[i].x, trails.current[i - 1].x, 0.35);
        trails.current[i].y = lerp(trails.current[i].y, trails.current[i - 1].y, 0.35);
        trails.current[i].opacity =
          speed > 2 ? (1 - i / trails.current.length) * 0.35 : 0;
      }
      trails.current[0] = {
        x: pos.current.x,
        y: pos.current.y,
        opacity: speed > 2 ? 0.35 : 0,
      };

      trailRefs.current.forEach((el, i) => {
        if (!el) return;
        const t = trails.current[i];
        el.style.transform = `translate(${t.x - 2}px, ${t.y - 2}px)`;
        el.style.opacity = t.opacity;
      });

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [mouse]);

  return (
    <>
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          className="cursor-trail"
          ref={(el) => (trailRefs.current[i] = el)}
        />
      ))}
      <div ref={ringRef} className="cursor-ring" />
      <div
        ref={mainRef}
        className={`cursor-main${isHovering ? ' hovering' : ''}`}
      />
    </>
  );
}