import { useEffect, useRef } from 'react';

/**
 * Runs a callback on every animation frame.
 * Automatically cleans up on unmount.
 *
 * @param {(dt: number) => void} callback  — receives delta time in ms
 */
export default function useAnimationLoop(callback) {
  const rafRef = useRef(null);
  const prevTime = useRef(performance.now());
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    const loop = (now) => {
      const dt = now - prevTime.current;
      prevTime.current = now;
      cbRef.current(dt);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);
}
