import React from 'react';
import '../styles/sections.css';

const STATS = [
  { value: '100M+', label: 'people collaborating' },
  { value: '250+', label: 'apps & integrations' },
  { value: '6,000+', label: 'ready-made templates' },
  { value: '99.9%', label: 'uptime reliability' },
];

export default function StatsBar() {
  return (
    <section className="section-stats" aria-label="Platform statistics">
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <div key={i} className="stat-card">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
