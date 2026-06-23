import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import NOTES from '../data/notes';
import CONNECTIONS_DATA from '../data/connections';
import { mapClamped, easeInOut, easeOut } from '../utils/math';
import '../styles/connections.css';

export default function Connections({ progress }) {
  const pathRefs = useRef([]);
  const dotRefs = useRef([]);

  /** Look up a note's viewport-% center by its ID */
  const getCenter = useCallback((noteId) => {
    const n = NOTES.find((note) => note.id === noteId);
    return n ? { x: n.x, y: n.y } : { x: 50, y: 50 };
  }, []);

  /** Pre-compute SVG path strings */
  const paths = useMemo(
    () =>
      CONNECTIONS_DATA.map((c) => {
        const from = getCenter(c.from);
        const to = getCenter(c.to);
        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2 + c.curve;
        return {
          ...c,
          d: `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`,
          toCenter: getCenter(c.to),
        };
      }),
    [getCenter]
  );

  useEffect(() => {
    let raf;

    const update = () => {
      const p = progress.current;

      pathRefs.current.forEach((el, i) => {
        if (!el) return;
        const conn = paths[i];
        const drawP = mapClamped(p, conn.enter, conn.enter + 0.05, 0, 1);
        const len = el.getTotalLength ? el.getTotalLength() : 300;

        el.style.strokeDasharray = len;
        el.style.strokeDashoffset = len * (1 - easeInOut(drawP));
        el.style.opacity = drawP > 0 ? mapClamped(p, 0.82, 0.92, 1, 0) : 0;
      });

      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        const conn = paths[i];
        const showP = mapClamped(p, conn.enter + 0.03, conn.enter + 0.05, 0, 1);
        el.style.opacity = showP * mapClamped(p, 0.82, 0.92, 1, 0);
        el.setAttribute('r', String(3 * easeOut(showP)));
      });

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [paths, progress]);

  return (
    <svg
      className="connections-svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {paths.map((path, i) => (
        <g key={i}>
          <path
            ref={(el) => (pathRefs.current[i] = el)}
            d={path.d}
            className="connection-path"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            ref={(el) => (dotRefs.current[i] = el)}
            cx={path.toCenter.x}
            cy={path.toCenter.y}
            r="0"
            className="connection-dot"
          />
        </g>
      ))}
    </svg>
  );
}
