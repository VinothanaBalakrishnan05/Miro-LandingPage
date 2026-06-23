import { useEffect, useRef } from 'react';

/**
 * Tracks scroll progress (0 → 1) inside a given scrollable element ref.
 * Returns a mutable ref with the current progress value.
 */
export default function useScrollProgress(scrollRef) {
  const progress = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      progress.current = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [scrollRef]);

  return progress;
}
