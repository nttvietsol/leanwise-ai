import { useState } from 'react';
import { Link } from '@tanstack/react-router';

/* Interactive product picker — landing page module selector. */

type Module = {
  id: string;
  num: string;
  name: string;
  tag: string;
  status: string;
  statusClass: 'live' | 'rd';
  body: string;
  items: string[];
  img: string | null;
  to: string;
};

const MODULES: Module[] = [
  {
    id: 'connect',
    num: 'MOD.01',
    name: 'CONNECT Mastery',
    tag: 'Eliminate compliance waste',
    status: 'LIVE',
    statusClass: 'live',
    body: 'Automate IKEA CONNECT document verification. Catch every critical error before the auditor does — in minutes, not hours.',
    items: [
      'AI document check',
      'TSS vs Test Plan match',
      'Cloud-native, any device',
      '99.2% match accuracy',
    ],
    img: '/assets/dashboard-preview.png',
    to: '/solutions/connect-mastery',
  },
  {
    id: 'sop',
    num: 'MOD.02',
    name: 'SOP Mastery',
    tag: 'Optimize your processes',
    status: 'R&D · Q4 2026',
    statusClass: 'rd',
    body: 'Visual, interactive work instructions. Train faster, reduce mistakes, run consistently shift after shift.',
    items: [
      'Visual SOP builder',
      'Operator training flow',
      'Live process versioning',
      'VI ↔ EN auto-translate',
    ],
    img: null,
    to: '/solutions/sop-mastery',
  },
  {
    id: 'ops',
    num: 'MOD.03',
    name: 'Operations Mastery',
    tag: 'Live nerve center',
    status: 'RESEARCH · 2027',
    statusClass: 'rd',
    body: 'Real-time KPI streams, cross-shift comparisons, and AI decision alerts — engineered for the 30 seconds a plant manager has between shifts.',
    items: [
      'Real-time KPI streams',
      'AI decision alerts',
      'Cross-module intelligence',
      'Plant + portfolio view',
    ],
    img: '/assets/dashboard-preview-2.png',
    to: '/solutions/operations-mastery',
  },
];

function SOPMockPreview() {
  return (
    <div
      style={{
        padding: 32,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        justifyContent: 'center',
      }}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          style={{
            display: 'grid',
            gridTemplateColumns: '64px 1fr',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.12em',
              color: 'var(--ink-3)',
            }}
          >
            STEP 0{n}
          </span>
          <span
            style={{
              height: 24,
              background: '#fff',
              border: '1px solid var(--line)',
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                display: 'block',
                height: '100%',
                width: `${24 + n * 14}%`,
                background: 'linear-gradient(90deg, var(--amber-soft), var(--amber))',
              }}
            ></span>
          </span>
        </div>
      ))}
    </div>
  );
}

export function ProductPicker() {
  const [active, setActive] = useState('connect');
  const m = MODULES.find((x) => x.id === active) as Module;

  return (
    <div className="lw-picker-grid">
      <div className="lw-picker-tabs" role="tablist">
        {MODULES.map((mod) => (
          <button
            key={mod.id}
            role="tab"
            aria-selected={active === mod.id}
            className={`lw-picker-tab ${active === mod.id ? 'active' : ''}`}
            onClick={() => setActive(mod.id)}
          >
            <span className="num">{mod.num}</span>
            <span>
              <span className="name">{mod.name}</span>
              <span className="tag">{mod.tag}</span>
            </span>
            <span className={`pill ${mod.statusClass === 'rd' ? 'rd' : ''}`}>
              {mod.status}
            </span>
          </button>
        ))}
      </div>

      <div className="lw-picker-panel" key={active}>
        <div className="copy">
          <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
            {m.num} · {m.status}
          </div>
          <h3>{m.name}</h3>
          <div className="tag">{m.tag}</div>
          <p>{m.body}</p>
          <ul>
            {m.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          <Link to={m.to} className="lw-btn lw-btn-primary">
            Explore module <span className="arrow">→</span>
          </Link>
        </div>
        <div className="preview">
          {m.img ? <img src={m.img} alt={m.name} /> : <SOPMockPreview />}
        </div>
      </div>
    </div>
  );
}
