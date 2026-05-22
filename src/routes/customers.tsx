import { createFileRoute, Link } from '@tanstack/react-router';
import { listStories } from '~/server/content';
import type { Story } from '~/server/db';

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
  loader: async () => ({ stories: await listStories() }),
});

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
        {s.caseStudySlug && (
          <span className="lw-pill" style={{ fontSize: 10, padding: '3px 8px' }}>
            <span className="dot"></span>FULL CASE
          </span>
        )}
      </div>
      <h3 style={{ fontSize: 22, marginBottom: 12 }}>{s.company}</h3>
      <p>{s.description}</p>
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
            {s.kpiUnit}
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
          {s.kpiSub.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

function Customers() {
  const { stories } = Route.useLoaderData();
  return (
    <>
      <section className="lw-page-hero">
        <div className="lw-container">
          <div className="lw-page-hero-grid lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 20 }}>
                Customer stories · {stories.length} plants
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
                <span>· {stories.length} PLANTS LIVE · 47 ON WAITLIST</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lw-section">
        <div className="lw-container">
          <div className="lw-stories-grid lw-reveal" style={{ gap: 16 }}>
            {stories.map((s) =>
              s.caseStudySlug ? (
                <Link
                  key={s.id}
                  to="/case-studies/talimex"
                  className="lw-story"
                  style={{ gridTemplateColumns: '1fr', alignItems: 'stretch' }}
                >
                  <StoryBody s={s} />
                </Link>
              ) : (
                <div
                  key={s.id}
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
