import React, { useRef, useEffect, useState } from 'react';
import '../styles/showcase.css';

const CARDS = [
  {
    id: 'ai',
    title: 'AI',
    headline: 'Bring team & artificial intelligence together',
    desc: 'Accelerate your team with collaborative AI workflows',
    accent: '#7C3AED',
    pills: [
      { label: 'SIDEKICKS', sub: 'Chat-based AI agents to collaborate with on the canvas' },
      { label: 'FLOWS', sub: 'Streamline processes with visual AI workflows' },
      { label: 'KNOWLEDGE', sub: 'Bring in enterprise knowledge to make better decisions' },
    ],
    badge: 'AI TRUST  |  Security  |  Governance  |  Privacy',
    topLabel: 'AI CANVAS',
  },
  {
    id: 'canvas',
    title: 'Intelligent Canvas',
    headline: 'Discover, define, and deliver — as one team on one canvas',
    desc: 'Empower teamwork on one, infinite, multiplayer canvas',
    accent: '#FF6B6B',
    visual: 'canvas',
  },
  {
    id: 'formats',
    title: 'Formats',
    headline: 'From brainstorm to boardroom in one click',
    desc: 'Transform boards into polished, presentation-ready documents',
    accent: '#FFB930',
    visual: 'formats',
  },
  {
    id: 'blueprints',
    title: 'Blueprints',
    headline: 'Start fast with expert-built templates',
    desc: 'Standardize workflows with 6,000+ ready-made templates',
    accent: '#34D399',
    visual: 'blueprints',
  },
  {
    id: 'security',
    title: 'Enterprise Security',
    headline: 'Built for the teams that build the future',
    desc: 'SOC 2, ISO 27001, GDPR — your ideas are safe',
    accent: '#4361EE',
    visual: 'security',
  },
  {
    id: 'integrations',
    title: 'Integrations',
    headline: 'Your tools, connected in one workspace',
    desc: 'Connect 250+ apps to keep everything in flow',
    accent: '#A78BFA',
    visual: 'integrations',
  },
];

/* ── AI Card Visual (matches Miro's diagram layout) ── */
function AIVisual({ card }) {
  return (
    <div className="card-visual card-visual--ai">
      <div className="ai-headline">{card.headline}</div>
      <div className="ai-box">
        <div className="ai-top-label">{card.topLabel}</div>
        <div className="ai-pills">
          {card.pills.map((p, i) => (
            <div key={i} className="ai-pill">
              <strong>{p.label}</strong>
              <span>{p.sub}</span>
            </div>
          ))}
        </div>
        <div className="ai-badge">{card.badge}</div>
      </div>
    </div>
  );
}

/* ── Generic Card Visuals ── */
function CardVisual({ type, accent }) {
  if (type === 'canvas') {
    return (
      <div className="card-visual card-visual--canvas">
        <div className="canvas-flow">
          <div className="flow-ribbon" style={{ background: `linear-gradient(135deg, ${accent}, #FFB930, #A78BFA, #34D399)` }} />
          <div className="flow-avatar" style={{ top: '15%', right: '20%' }}>
            <div className="avatar-dot" style={{ background: '#34D399' }} />
            <span>Brie</span>
          </div>
          <div className="flow-avatar" style={{ bottom: '25%', left: '15%' }}>
            <div className="avatar-dot" style={{ background: '#FFB930' }} />
            <span>Alex</span>
          </div>
          <div className="canvas-text-big">DISCOVER, DEFINE & DELIVER</div>
          <div className="canvas-text-sub">as one team, on one canvas</div>
        </div>
      </div>
    );
  }
  if (type === 'formats') {
    return (
      <div className="card-visual card-visual--formats">
        {[0,1,2].map(i => (
          <div key={i} className="format-doc" style={{ '--i': i }}>
            <div className="doc-bar" /><div className="doc-line" /><div className="doc-line short" /><div className="doc-line" />
          </div>
        ))}
      </div>
    );
  }
  if (type === 'blueprints') {
    return (
      <div className="card-visual card-visual--grid">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="bp-tile" style={{ animationDelay: `${i * 0.08}s`, background: i % 3 === 0 ? accent + '30' : 'rgba(200,195,185,0.12)' }}>
            <div className="bp-line" /><div className="bp-line short" />
          </div>
        ))}
      </div>
    );
  }
  if (type === 'security') {
    return (
      <div className="card-visual card-visual--security">
        <div className="shield">
          <svg viewBox="0 0 60 72" fill="none"><path d="M30 2L4 16v20c0 18 12 28 26 32 14-4 26-14 26-32V16L30 2z" fill={accent + '18'} stroke={accent} strokeWidth="2"/><path d="M20 36l8 8 14-16" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="sec-badges">
          <span>SOC 2</span><span>ISO 27001</span><span>GDPR</span>
        </div>
      </div>
    );
  }
  if (type === 'integrations') {
    return (
      <div className="card-visual card-visual--integrations">
        {['Slack','Jira','Figma','Notion','GitHub','Zoom','Drive','Teams','Asana'].map((name, i) => (
          <div key={i} className="integ-icon" style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="integ-dot" style={{ background: ['#E01E5A','#2684FF','#A259FF','#000','#333','#2D8CFF','#FFB930','#6264A7','#F06A6A'][i] }} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function ProductShowcase() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* Desktop: vertical scroll → horizontal translate */
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    const scroller = document.querySelector('.scroll-container');
    if (!section || !track || !scroller) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const vh = window.innerHeight;
      const scrollable = sectionH - vh;
      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const maxShift = track.scrollWidth - window.innerWidth + 80;
      track.style.transform = `translateX(${-progress * maxShift}px)`;
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  return (
    <section ref={sectionRef} className={`showcase-section${isMobile ? ' mobile' : ''}`}>
      <div className="showcase-sticky">
        <div className="showcase-heading">
          <h2>Experience<br/>the Innovation<br/>Workspace</h2>
        </div>
        <div ref={trackRef} className="showcase-track">
          {CARDS.map((card) => (
            <article key={card.id} className="showcase-card">
              <div className="showcase-card-visual">
                {card.pills ? <AIVisual card={card} /> : <CardVisual type={card.visual} accent={card.accent} />}
              </div>
              <div className="showcase-card-info">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <a href="#" className="learn-more-btn">Learn more</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
