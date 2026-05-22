import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/customers')({
  component: Customers,
  head: () => ({
    meta: [
      { title: 'Customer stories — LeanWise AI' },
      {
        name: 'description',
        content:
          'Operating data from IKEA-supplier plants running LeanWise AI in production. Updated quarterly.',
      },
    ],
  }),
});

type Story = {
  co: string;
  industry: string;
  kpi: string;
  unit: string;
  sub: string;
  desc: string;
  caseStudy?: boolean;
};

const STORIES: Story[] = [
  { co: 'Talimex', industry: 'Furniture · Tier-1 IKEA', kpi: '11/12', unit: 'audit findings closed', sub: 'in 11 weeks', desc: 'Containerboard and component supplier. Bridged an 18-version IKEA-1138-NSF spec drift across two plants ahead of December NSF re-audit.', caseStudy: true },
  { co: 'KL Pacific', industry: 'Plastics · Injection', kpi: '±2.4%', unit: 'first-pass yield variance', sub: 'down from ±9%', desc: 'Six lines, two shifts, one rolling SPC dashboard. 90 days of operating data with zero scrap excursions over threshold.' },
  { co: 'Vinatex Finishing', industry: 'Textile · Finishing', kpi: '47', unit: 'days incident-free', sub: 'longest-ever streak', desc: 'Defect feed integrated with line PLCs. Andon escalation flows replaced four overlapping spreadsheets and a WhatsApp group.' },
  { co: 'Đông Á Wood', industry: 'Furniture · Components', kpi: '6.4', unit: 'hour audit cycle', sub: 'was 5 working days', desc: 'Three-plant roll-up running on a single Operations console. Inspector-shadow mode used in two consecutive customer audits.' },
  { co: 'Hưng Phát', industry: 'Metal · Stamping', kpi: '$184K', unit: 'rework avoided', sub: 'calendar 2025', desc: 'Quoting-to-PO traceability tied directly to inbound IKEA spec versions. CONNECT flagged 23 pre-production drift cases.' },
  { co: 'Bình An Co.', industry: 'Packaging · Corrugated', kpi: '0', unit: 'major non-conformities', sub: '2025 H2', desc: 'CAPA backlog cleared in 9 weeks. Now running monthly internal audits that mirror NSF format end-to-end.' },
  { co: 'Saigon Precision', industry: 'Metal · CNC Machining', kpi: '94%', unit: 'on-time spec acknowledgement', sub: 'within 4 hours', desc: 'Engineering change order routing across three production cells. Auto-attached drawings and tolerance deltas to operator stations.' },
  { co: 'Maple Pacific', industry: 'Furniture · Surface', kpi: '38%', unit: 'reduction in surface defects', sub: 'first 60 days', desc: 'Visual inspection digitized with photo evidence on every reject. Trended by shift, line, and supplier batch.' },
  { co: 'Vinh Tien Glass', industry: 'Building products · Glass', kpi: '12', unit: 'IKEA specs unified', sub: 'across 4 product lines', desc: 'Multi-language ingest (VI/EN/ZH/DE). Single source-of-truth replaced PDFs, paper binders, and a SharePoint folder nobody owned.' },
  { co: 'Phú Mỹ Cast', industry: 'Foundry · Aluminum', kpi: '99.1%', unit: 'inspector pass-rate', sub: 'on traceability checks', desc: 'Heat-lot to finished-part traceability with photo and sensor evidence. NSF auditor cited it as "category-leading".' },
];

function StoryBody({ s }: { s: Story }) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          gap: 16,
          marginBottom: 12,
        }}
      >
        <div className="lw-eyebrow muted" style={{ fontSize: 10 }}>
          {s.industry}
        </div>
        {s.caseStudy && (
          <span className="lw-pill" style={{ fontSize: 10, padding: '3px 8px' }}>
            <span className="dot"></span>FULL CASE
          </span>
        )}
      </div>
      <h3 style={{ fontSize: 22, marginBottom: 12 }}>{s.co}</h3>
      <p>{s.desc}</p>
      <div
        className="meta"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          alignItems: 'baseline',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: 'var(--ink)',
              letterSpacing: '-0.025em',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {s.kpi}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.12em',
              color: 'var(--ink-4)',
              textTransform: 'uppercase',
              marginTop: 4,
            }}
          >
            {s.unit}
          </div>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.10em',
            color: 'var(--ink-3)',
            textAlign: 'right',
          }}
        >
          {s.sub.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

function Customers() {
  return (
    <>
      <section className="lw-page-hero">
        <div className="lw-container">
          <div className="lw-page-hero-grid lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 20 }}>
                Customer stories · {STORIES.length} plants
              </div>
              <h1 className="lw-h1">
                What our
                <br />
                customers <em className="lw-italic-amber">shipped.</em>
              </h1>
            </div>
            <div>
              <p className="lw-lead">
                Operating data from IKEA-supplier plants running LeanWise AI in
                production. Numbers are pulled from our customers&apos; own
                dashboards, not from a survey. We update this page quarterly with
                the wins and the regressions.
              </p>
              <div
                className="meta"
                style={{
                  marginTop: 20,
                  display: 'flex',
                  gap: 16,
                  flexWrap: 'wrap',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  color: 'var(--ink-4)',
                }}
              >
                <span>UPDATED 2026·02·14</span>
                <span>· 10 PLANTS LIVE · 47 ON WAITLIST</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lw-section">
        <div className="lw-container">
          <div className="lw-stories-grid lw-reveal" style={{ gap: 16 }}>
            {STORIES.map((s, i) =>
              s.caseStudy ? (
                <Link
                  key={i}
                  to="/case-studies/talimex"
                  className="lw-story"
                  style={{ gridTemplateColumns: '1fr', alignItems: 'stretch' }}
                >
                  <StoryBody s={s} />
                </Link>
              ) : (
                <div
                  key={i}
                  className="lw-story"
                  style={{ gridTemplateColumns: '1fr', alignItems: 'stretch' }}
                >
                  <StoryBody s={s} />
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="lw-section dark">
        <div className="lw-container" style={{ textAlign: 'center' }}>
          <div
            className="lw-eyebrow"
            style={{
              color: 'var(--amber)',
              marginBottom: 16,
              justifyContent: 'center',
            }}
          >
            Get a demo
          </div>
          <h2
            className="lw-h2"
            style={{ maxWidth: '24ch', margin: '0 auto', color: '#fff' }}
          >
            Bring us into your next IKEA audit.
          </h2>
          <p
            className="lw-lead"
            style={{
              margin: '24px auto 32px',
              maxWidth: '50ch',
              color: 'rgba(255,255,255,0.72)',
            }}
          >
            We&apos;ll come on-site for a half-day, walk your line, and tell you
            whether CONNECT is a fit. No deck.
          </p>
          <Link to="/contact" className="lw-btn lw-btn-amber">
            Book the visit <span className="arrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
