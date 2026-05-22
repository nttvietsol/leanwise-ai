import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/resources')({
  component: Resources,
  head: () => ({
    meta: [
      { title: 'Resources — LeanWise AI' },
      {
        name: 'description',
        content:
          'Engineer-to-engineer essays, customer case breakdowns, and method notes from LeanWise AI deployment teams.',
      },
    ],
  }),
});

type Post = {
  cat: string;
  date: string;
  read: string;
  author: string;
  title: string;
  dek: string;
  feat?: boolean;
};

const POSTS: Post[] = [
  { cat: 'ESSAY', date: '2026·02·14', read: '12 MIN', author: 'Trần Minh', title: "The auditor doesn't care that you tried.", dek: 'A meditation on outcome-based quality systems for IKEA-supplier plants — and why "process compliance" is the wrong metric.', feat: true },
  { cat: 'CASE', date: '2026·02·08', read: '6 MIN', author: 'Talimex Q', title: 'How Talimex eliminated 11 of 12 NSF audit findings in one quarter.', dek: 'A line-by-line breakdown of the Sept 2025 NSF audit, the gaps it surfaced, and what changed before the December re-audit.' },
  { cat: 'METHOD', date: '2026·01·30', read: '9 MIN', author: 'Nguyễn Hoa', title: 'Mistake-proofing for paper-based plants: 7 patterns we steal from Toyota.', dek: "Poka-yoke wasn't designed for tablets. Here's how we map it onto SOPs that actually exist on a clipboard today." },
  { cat: 'ENGINEERING', date: '2026·01·22', read: '14 MIN', author: 'Lê Quang', title: "Why we don't store extracted requirements in a vector database.", dek: 'Notes on building auditable spec extraction. Embeddings are great for search, terrible for evidence. RAG is not a substitute for traceability.' },
  { cat: 'METHOD', date: '2026·01·15', read: '8 MIN', author: 'Trần Minh', title: 'The cost of a 5-day audit cycle (and the math on cutting it to 6 hours).', dek: 'Per-shift labor, lost OEE, scrap from delayed change-control. The hidden tax of slow conformance.' },
  { cat: 'ESSAY', date: '2026·01·08', read: '11 MIN', author: 'Phạm Anh', title: '"AI for manufacturing" is mostly bullshit. Here\'s what isn\'t.', dek: 'A short, opinionated taxonomy of what LLMs can credibly do on a factory floor in 2026 — and what they cannot.' },
  { cat: 'ENGINEERING', date: '2025·12·19', read: '7 MIN', author: 'Lê Quang', title: 'Document parsing in five languages: the surprisingly hard parts.', dek: 'EN, VI, ZH, JA, DE. Layout, table reconstruction, footnote chasing. The benchmarks nobody publishes.' },
  { cat: 'CASE', date: '2025·12·11', read: '5 MIN', author: 'KL Pacific', title: 'KL Pacific: cutting first-pass yield variance from ±9% to ±2.4%.', dek: 'Six lines, two shifts, one rolling SPC dashboard. Three months of operating data.' },
  { cat: 'METHOD', date: '2025·12·02', read: '10 MIN', author: 'Nguyễn Hoa', title: 'A practical guide to digitizing SOPs without losing the institutional memory.', dek: "The notebook in the line lead's back pocket is doing real work. Here's how to capture it before you replace it." },
  { cat: 'ESSAY', date: '2025·11·24', read: '6 MIN', author: 'Trần Minh', title: 'On hiring quality engineers in 2026.', dek: "What we look for, what we don't, and why CAPA writing is more telling than any certification." },
  { cat: 'ENGINEERING', date: '2025·11·15', read: '13 MIN', author: 'Đỗ Hải', title: 'Building offline-first for factories with intermittent connectivity.', dek: 'Sync conflict resolution, audit-trail integrity, and why we ship our own service worker instead of using a library.' },
  { cat: 'CASE', date: '2025·11·07', read: '7 MIN', author: 'Vinatex F.', title: "A textile finishing line ran 47 days without a recordable incident. Here's the dashboard they used.", dek: 'Real-time defect feed, threshold alerting, and the change-control process that backs it up.' },
  { cat: 'METHOD', date: '2025·10·28', read: '9 MIN', author: 'Phạm Anh', title: 'Andon on a 200-person line: what we learned the hard way.', dek: 'Notification fatigue, escalation paths, and the difference between an alert and a signal.' },
  { cat: 'ESSAY', date: '2025·10·19', read: '5 MIN', author: 'Trần Minh', title: 'Why we don\'t do generic "manufacturing AI."', dek: "Vertical focus is not a marketing position. It's the only way the math works on a furniture supplier's margins." },
];

type Story = {
  co: string;
  industry: string;
  kpi: string;
  sub: string;
  desc: string;
  caseStudy?: boolean;
};

const STORIES: Story[] = [
  { co: 'Talimex', industry: 'Furniture · Tier-1 IKEA', kpi: '11/12 audit findings closed', sub: 'in 11 weeks', desc: 'Containerboard supplier. Used CONNECT to bridge an 18-version IKEA spec drift across two plants ahead of NSF re-audit.', caseStudy: true },
  { co: 'KL Pacific', industry: 'Plastics · Injection', kpi: '±2.4% FPY', sub: 'down from ±9%', desc: 'Six lines, two shifts. Real-time SPC, automated change-control, and a 3-month operating window of zero scrap excursions.' },
  { co: 'Vinatex F.', industry: 'Textile · Finishing', kpi: '47 days', sub: 'incident-free streak', desc: 'Defect feed integrated with line PLCs. Andon escalation flows replaced four overlapping spreadsheets and a WhatsApp group.' },
  { co: 'Đông Á Wood', industry: 'Furniture · Components', kpi: '6.4 hrs', sub: 'audit cycle (was 5 days)', desc: 'Three-plant roll-up. Cross-line spec mismatch detection. Inspector-shadow mode used in two consecutive customer audits.' },
  { co: 'Hưng Phát', industry: 'Metal · Stamping', kpi: '$184K', sub: 'rework avoided · 2025', desc: 'Quoting-to-PO traceability tied directly to inbound IKEA spec versions. CONNECT flagged 23 pre-production drift cases.' },
  { co: 'Bình An Co.', industry: 'Packaging · Corrugated', kpi: '0', sub: 'major non-conformities · 2025 H2', desc: 'CAPA backlog cleared in 9 weeks. Now running monthly internal audits that mirror NSF format end-to-end.' },
];

const TABS: [string, string][] = [
  ['all', 'All articles'],
  ['essays', 'Essays'],
  ['method', 'Method'],
  ['eng', 'Engineering'],
  ['cases', 'Customer cases'],
];

const TAB_CAT: Record<string, string> = {
  essays: 'ESSAY',
  method: 'METHOD',
  eng: 'ENGINEERING',
  cases: 'CASE',
};

function Resources() {
  const [tab, setTab] = useState('all');
  const featured = POSTS[0];
  const rest = POSTS.filter((p) => !p.feat);
  const filtered =
    tab === 'all' ? rest : rest.filter((p) => p.cat === TAB_CAT[tab]);
  // Counts are derived from `rest` (the set actually rendered — the featured
  // post is excluded) so each tab badge matches the number of cards shown.
  const counts: Record<string, number> = {
    all: rest.length,
    essays: rest.filter((p) => p.cat === 'ESSAY').length,
    method: rest.filter((p) => p.cat === 'METHOD').length,
    eng: rest.filter((p) => p.cat === 'ENGINEERING').length,
    cases: rest.filter((p) => p.cat === 'CASE').length,
  };

  return (
    <>
      <section className="lw-res-hero">
        <div className="lw-container lw-reveal">
          <div className="lw-eyebrow" style={{ marginBottom: 20 }}>
            Field notes · Updated weekly
          </div>
          <h1
            className="lw-h1"
            style={{ maxWidth: '18ch', fontSize: 'clamp(40px, 5vw, 72px)' }}
          >
            Lean methodology, written by the people{' '}
            <em className="lw-italic-amber">on the line.</em>
          </h1>
          <p
            className="lw-lead"
            style={{ marginTop: 24, fontSize: 18, maxWidth: '60ch' }}
          >
            Engineer-to-engineer essays, customer case breakdowns, and method
            notes from LeanWise AI&apos;s deployment teams across IKEA-supplier
            plants in Vietnam.
          </p>

          <div className="lw-res-tabs">
            {TABS.map(([k, label]) => (
              <button
                key={k}
                className={'lw-res-tab' + (tab === k ? ' active' : '')}
                onClick={() => setTab(k)}
              >
                {label}
                <span className="count">{counts[k]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="lw-section">
        <div className="lw-container">
          <Link
            to="/blog/the-auditor-doesnt-care"
            className="lw-feature-post lw-reveal"
            style={{ display: 'grid' }}
          >
            <div className="body">
              <div className="meta">
                FEATURED · {featured.cat} · {featured.date} · {featured.read}
              </div>
              <h2>{featured.title}</h2>
              <p>{featured.dek}</p>
              <div className="by">
                <span className="av"></span>
                <span>{featured.author.toUpperCase()} · FIELD OPS · LEANWISE AI</span>
              </div>
            </div>
            <div className="visual" aria-hidden="true">
              <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                <rect
                  x="20"
                  y="20"
                  width="140"
                  height="140"
                  stroke="rgba(255,255,255,0.15)"
                  strokeDasharray="4 4"
                />
                <text
                  x="90"
                  y="98"
                  textAnchor="middle"
                  fill="#FFB800"
                  fontFamily="Geist Mono, monospace"
                  fontSize="40"
                  fontWeight="600"
                >
                  12
                </text>
                <text
                  x="90"
                  y="120"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.4)"
                  fontFamily="Geist Mono, monospace"
                  fontSize="9"
                  letterSpacing="2"
                >
                  MINUTES
                </text>
              </svg>
            </div>
          </Link>

          <div className="lw-post-grid lw-reveal" style={{ marginTop: 32 }}>
            {filtered.map((p, i) => (
              <Link
                to="/blog/the-auditor-doesnt-care"
                key={i}
                className="lw-post"
              >
                <div className="topmeta">
                  <span className="cat">{p.cat}</span>
                  <span>{p.date}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.dek}</p>
                <div className="by">
                  <span className="name">{p.author}</span>
                  <span>{p.read}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="lw-section tight"
        style={{
          background: 'var(--paper-2)',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="lw-container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'end',
              marginBottom: 32,
              flexWrap: 'wrap',
              gap: 16,
            }}
            className="lw-reveal"
          >
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                Customer stories
              </div>
              <h2 className="lw-h2" style={{ maxWidth: '20ch' }}>
                What the plants we work with actually shipped.
              </h2>
            </div>
            <Link to="/customers" className="lw-btn lw-btn-ghost">
              View all stories <span className="arrow">→</span>
            </Link>
          </div>

          <div className="lw-stories-grid lw-reveal">
            {STORIES.map((s, i) =>
              s.caseStudy ? (
                <Link key={i} to="/case-studies/talimex" className="lw-story">
                  <StoryInner s={s} />
                </Link>
              ) : (
                <Link key={i} to="/customers" className="lw-story">
                  <StoryInner s={s} />
                </Link>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function StoryInner({ s }: { s: Story }) {
  return (
    <>
      <div className="logo">
        {s.co.split(' ')[0].slice(0, 3).toUpperCase()}
      </div>
      <div>
        <div className="lw-eyebrow muted" style={{ marginBottom: 12, fontSize: 10 }}>
          {s.industry}
        </div>
        <h3>{s.co}</h3>
        <p>{s.desc}</p>
        <div className="meta">
          <span>
            <b>{s.kpi}</b> · {s.sub}
          </span>
        </div>
      </div>
    </>
  );
}
