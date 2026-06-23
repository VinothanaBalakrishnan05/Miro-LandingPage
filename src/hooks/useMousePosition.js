import { useEffect, useRef } from 'react';

/**
 * Tracks mouse position in a ref (no re-renders).
 * Returns a mutable ref: { x, y }
 */
export default function useMousePosition() {
  const mouse = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return mouse;
}
