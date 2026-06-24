import React, { useState, useCallback } from 'react';
import '../styles/usecases.css';

const TABS = [
  {
    id: 'research',
    label: 'Research',
    color: '#FFD54F',
    title: 'Turn research into a shared direction',
    desc: 'Pull outputs from Claude, NotebookLM, or any research tool into one canvas. Your team reviews the findings together, surfaces what matters, and commits to a direction — then flow the insights back out to your roadmap, specs, or next AI prompt.',
    cta: 'Explore research',
    docs: [
      { title: 'Interview Script', x: 5, y: 8, w: 38, h: 42 },
      { title: '', x: 28, y: 5, w: 35, h: 38, hasPlay: true },
      { title: 'P1 – Jess', x: 58, y: 3, w: 38, h: 35, hasNotes: true },
      { title: '', x: 30, y: 45, w: 32, h: 35, hasPlay: true },
      { title: 'P2 – Ryan', x: 58, y: 40, w: 38, h: 35, hasNotes: true },
    ],
    cursors: [
      { name: 'Andrey', color: '#34D399', x: 52, y: 4 },
      { name: 'Michael', color: '#F472B6', x: 88, y: 12 },
      { name: 'Brian', color: '#FB923C', x: 42, y: 55 },
    ],
    badge: { text: 'Research Sidekick', x: 72, y: 78, color: '#A78BFA' },
  },
  {
    id: 'roadmaps',
    label: 'Roadmaps',
    color: '#7C3AED',
    title: 'Align your team around what\'s next',
    desc: 'Build living roadmaps that connect strategy to execution. Drag milestones, adjust timelines, and keep every stakeholder aligned — all on one visual, always up-to-date plan.',
    cta: 'Explore roadmaps',
    timeline: [
      { label: 'Q1', items: ['Research', 'Design'], color: '#4361EE' },
      { label: 'Q2', items: ['Prototype', 'Testing'], color: '#34D399' },
      { label: 'Q3', items: ['Launch', 'Iterate'], color: '#FFB930' },
      { label: 'Q4', items: ['Scale', 'Optimize'], color: '#FF6B6B' },
    ],
    cursors: [
      { name: 'Sara', color: '#4361EE', x: 35, y: 20 },
      { name: 'Tom', color: '#34D399', x: 70, y: 45 },
    ],
  },
  {
    id: 'diagrams',
    label: 'Diagrams',
    color: '#4361EE',
    title: 'Map complexity with clarity',
    desc: 'From system architecture to user flows, build technical diagrams that your whole team can understand. Auto-layout, smart connectors, and real-time collaboration keep everyone on the same page.',
    cta: 'Explore diagrams',
    flowchart: [
      { text: 'Start', x: 40, y: 5, type: 'oval' },
      { text: 'Input Data', x: 40, y: 22, type: 'rect' },
      { text: 'Valid?', x: 40, y: 42, type: 'diamond' },
      { text: 'Process', x: 65, y: 60, type: 'rect' },
      { text: 'Error', x: 15, y: 60, type: 'rect', accent: true },
      { text: 'Output', x: 65, y: 78, type: 'rect' },
    ],
    cursors: [
      { name: 'Priya', color: '#FF6B6B', x: 80, y: 15 },
    ],
  },
  {
    id: 'workshops',
    label: 'Workshops',
    color: '#FF6B6B',
    title: 'Facilitate sessions that drive outcomes',
    desc: 'Run brainstorms, retros, and design sprints with built-in facilitation tools. Timers, voting, and structured activities keep sessions focused and productive.',
    cta: 'Explore workshops',
    stickies: [
      { text: 'Great idea!', color: '#FFF3B0', x: 8, y: 8, r: -3 },
      { text: 'Need data', color: '#D0ECFF', x: 38, y: 5, r: 4 },
      { text: 'Priority', color: '#FFD6E0', x: 68, y: 10, r: -2 },
      { text: 'Next step', color: '#C8F7DC', x: 10, y: 42, r: 5 },
      { text: 'Blocked', color: '#FFD6E0', x: 42, y: 38, r: -4 },
      { text: 'Approved ✓', color: '#C8F7DC', x: 70, y: 40, r: 2 },
      { text: 'Revisit', color: '#E8DEFF', x: 25, y: 70, r: -3 },
      { text: 'Ship it! 🚀', color: '#FFF3B0', x: 60, y: 72, r: 5 },
    ],
    cursors: [
      { name: 'Emma', color: '#FFB930', x: 25, y: 18 },
      { name: 'Carlos', color: '#34D399', x: 75, y: 50 },
      { name: 'Yuki', color: '#A78BFA', x: 50, y: 75 },
    ],
    timer: { minutes: '04', seconds: '32' },
  },
];

/* ── Visual: Research (document cards + cursors) ── */
function ResearchVisual({ tab }) {
  return (
    <div className="uc-canvas">
      {tab.docs.map((d, i) => (
        <div key={i} className="uc-doc" style={{ left: `${d.x}%`, top: `${d.y}%`, width: `${d.w}%`, height: `${d.h}%`, animationDelay: `${i * 0.08}s` }}>
          {d.title && <div className="doc-header"><span className="doc-icon">📄</span>{d.title}</div>}
          <div className="doc-lines"><div/><div/><div className="short"/><div/></div>
          {d.hasPlay && <div className="doc-play">▶</div>}
          {d.hasNotes && <div className="doc-stickies"><div/><div/><div/><div/></div>}
        </div>
      ))}
      {tab.cursors.map((c, i) => (
        <div key={i} className="uc-cursor" style={{ left: `${c.x}%`, top: `${c.y}%`, animationDelay: `${0.3 + i * 0.12}s` }}>
          <svg width="12" height="16" viewBox="0 0 12 16"><path d="M0 0L12 10H5L3 16L0 0Z" fill={c.color}/></svg>
          <span style={{ background: c.color }}>{c.name}</span>
        </div>
      ))}
      {tab.badge && (
        <div className="uc-badge" style={{ left: `${tab.badge.x}%`, top: `${tab.badge.y}%`, borderColor: tab.badge.color }}>
          <span className="badge-sparkle">✦</span> {tab.badge.text}
        </div>
      )}
    </div>
  );
}

/* ── Visual: Roadmap (timeline lanes) ── */
function RoadmapVisual({ tab }) {
  return (
    <div className="uc-canvas">
      <div className="rm-timeline">
        {tab.timeline.map((q, i) => (
          <div key={i} className="rm-quarter" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="rm-label" style={{ color: q.color }}>{q.label}</div>
            <div className="rm-lane">
              {q.items.map((item, j) => (
                <div key={j} className="rm-item" style={{ background: q.color + '20', borderLeft: `3px solid ${q.color}`, animationDelay: `${i * 0.1 + j * 0.06}s` }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {tab.cursors.map((c, i) => (
        <div key={i} className="uc-cursor" style={{ left: `${c.x}%`, top: `${c.y}%`, animationDelay: `${0.4 + i * 0.12}s` }}>
          <svg width="12" height="16" viewBox="0 0 12 16"><path d="M0 0L12 10H5L3 16L0 0Z" fill={c.color}/></svg>
          <span style={{ background: c.color }}>{c.name}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Visual: Diagrams (flowchart) ── */
function DiagramVisual({ tab }) {
  return (
    <div className="uc-canvas">
      <svg className="flow-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="50" y1="12" x2="50" y2="22" stroke="#ccc" strokeWidth="0.5"/>
        <line x1="50" y1="30" x2="50" y2="42" stroke="#ccc" strokeWidth="0.5"/>
        <line x1="50" y1="52" x2="72" y2="60" stroke="#ccc" strokeWidth="0.5"/>
        <line x1="50" y1="52" x2="25" y2="60" stroke="#ccc" strokeWidth="0.5"/>
        <line x1="72" y1="68" x2="72" y2="78" stroke="#ccc" strokeWidth="0.5"/>
      </svg>
      {tab.flowchart.map((node, i) => (
        <div key={i} className={`flow-node flow-${node.type}${node.accent ? ' accent' : ''}`}
          style={{ left: `${node.x}%`, top: `${node.y}%`, animationDelay: `${i * 0.1}s` }}>
          {node.text}
        </div>
      ))}
      {tab.cursors.map((c, i) => (
        <div key={i} className="uc-cursor" style={{ left: `${c.x}%`, top: `${c.y}%`, animationDelay: `${0.5 + i * 0.12}s` }}>
          <svg width="12" height="16" viewBox="0 0 12 16"><path d="M0 0L12 10H5L3 16L0 0Z" fill={c.color}/></svg>
          <span style={{ background: c.color }}>{c.name}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Visual: Workshop (sticky notes + timer) ── */
function WorkshopVisual({ tab }) {
  return (
    <div className="uc-canvas">
      {tab.stickies.map((s, i) => (
        <div key={i} className="ws-sticky" style={{
          left: `${s.x}%`, top: `${s.y}%`, background: s.color,
          transform: `rotate(${s.r}deg)`, animationDelay: `${i * 0.06}s`,
        }}>
          {s.text}
          <div className="ws-votes"><span/><span/><span/></div>
        </div>
      ))}
      {tab.timer && (
        <div className="ws-timer" style={{ animationDelay: '0.4s' }}>
          ⏱ {tab.timer.minutes}:{tab.timer.seconds}
        </div>
      )}
      {tab.cursors.map((c, i) => (
        <div key={i} className="uc-cursor" style={{ left: `${c.x}%`, top: `${c.y}%`, animationDelay: `${0.5 + i * 0.12}s` }}>
          <svg width="12" height="16" viewBox="0 0 12 16"><path d="M0 0L12 10H5L3 16L0 0Z" fill={c.color}/></svg>
          <span style={{ background: c.color }}>{c.name}</span>
        </div>
      ))}
    </div>
  );
}

const VISUALS = { research: ResearchVisual, roadmaps: RoadmapVisual, diagrams: DiagramVisual, workshops: WorkshopVisual };

export default function UseCases() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  const Visual = VISUALS[tab.id];

  const handleTab = useCallback((i) => { if (i !== active) setActive(i); }, [active]);

  return (
    <section className="uc-section">
      {/* Tab bar */}
      <div className="uc-tabs" role="tablist">
        {TABS.map((t, i) => (
          <button key={t.id} role="tab" aria-selected={i === active}
            className={`uc-tab${i === active ? ' active' : ''}`}
            style={i === active ? { background: t.color } : {}}
            onClick={() => handleTab(i)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Panel — key forces remount → triggers CSS enter animation */}
      <div className="uc-panel" key={tab.id}>
        <div className="uc-text">
          <h3 className="uc-title">{tab.title}</h3>
          <p className="uc-desc">{tab.desc}</p>
          <a href="#" className="uc-cta">{tab.cta}</a>
        </div>
        <div className="uc-visual-wrap">
          <Visual tab={tab} />
        </div>
      </div>
    </section>
  );
}
