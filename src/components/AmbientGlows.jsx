import React from 'react';
import { COLORS } from '../utils/tokens';
import '../styles/background.css';

export default function AmbientGlows() {
  return (
    <>
      <div
        className="ambient-glow"
        style={{ top: '-10%', left: '20%', width: 400, height: 400, background: COLORS.blue }}
      />
      <div
        className="ambient-glow"
        style={{
          top: '30%', right: '-5%', width: 350, height: 350,
          background: COLORS.coral, animationDelay: '-4s',
        }}
      />
      <div
        className="ambient-glow"
        style={{
          bottom: '10%', left: '40%', width: 450, height: 450,
          background: COLORS.gold, animationDelay: '-8s',
        }}
      />
      <div
        className="ambient-glow"
        style={{
          top: '60%', left: '5%', width: 300, height: 300,
          background: COLORS.mint, animationDelay: '-6s',
        }}
      />
    </>
  );
}
