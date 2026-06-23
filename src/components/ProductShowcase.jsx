import React, { useState } from 'react';
import '../styles/sections.css';

const TABS = [
  { id: 'ai', label: 'AI Workflows', icon: '✦',
    title: 'Collaborative AI that thinks with your team',
    desc: 'Pull outputs from any AI tool into one shared canvas. Your team reviews together, surfaces what matters, and commits to a direction — then flows insights back out to roadmaps, specs, or the next prompt.',
    accent: 'var(--blue)' },
  { id: 'canvas', label: 'Infinite Canvas', icon: '◎',
    title: 'One canvas, infinite possibilities',
    desc: 'Everything lives in one place — research, designs, roadmaps, diagrams. Zoom in for pixel-level detail, zoom out for the strategic picture. No tab-switching, no context-lost.',
    accent: 'var(--coral)' },
  { id: 'connect', label: 'Smart Connections', icon: '◇',
    title: 'Ideas that know their relationships',
    desc: 'Draw relationships between anything. Sticky notes link to roadmap items, research connects to design decisions. Your thinking reveals its own structure as you build.',
    accent: 'var(--mint)' },
  { id: 'secure', label: 'Enterprise Security', icon: '◈',
    title: 'Built for the teams that build the future',
    desc: 'SOC 2 compliant, ISO 27001 certified, GDPR ready. SSO, domain-level permissions, and audit logs. Your ideas are safe while your team moves fast.',
    accent: 'var(--lavender)' },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className="section-product" aria-label="Product features">
      <h2 className="section-heading">Experience the Innovation Workspace</h2>
      <div className="product-tabs" role="tablist">
        {TABS.map((t, i) => (
          <button key={t.id} role="tab" aria-selected={i === active}
            className={`product-tab${i === active ? ' active' : ''}`}
            onClick={() => setActive(i)}
            style={i === active ? { borderColor: t.accent } : {}}>
            <span className="tab-icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>
      <div className="product-panel" role="tabpanel" style={{ '--accent': tab.accent }}>
        <div className="panel-content">
          <h3 className="panel-title">{tab.title}</h3>
          <p className="panel-desc">{tab.desc}</p>
          <a href="#" className="panel-link" style={{ color: tab.accent }}>Learn more →</a>
        </div>
        <div className="panel-visual">
          <div className="panel-mockup" style={{ borderColor: tab.accent }}>
            <div className="mockup-bar"><span/><span/><span/></div>
            <div className="mockup-grid">
              {[...Array(6)].map((_, i) => <div key={i} className="mockup-block" style={{
                background: i % 2 === 0 ? tab.accent : `${tab.accent}33`,
                animationDelay: `${i * 0.1}s`,
              }}/>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
