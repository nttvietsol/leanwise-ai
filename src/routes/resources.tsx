import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { listPublishedPosts, listStories } from '~/server/content';
import type { Post, Story } from '~/server/db';

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
  loader: async () => {
    const [posts, stories] = await Promise.all([
      listPublishedPosts(),
      listStories(),
    ]);
    return { posts, stories };
  },
});

/** ISO timestamp → 2026·02·14 */
function fmtDate(iso: string | null): string {
  return iso ? iso.slice(0, 10).replace(/-/g, '·') : '';
}

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
  const { posts, stories } = Route.useLoaderData();
  const [tab, setTab] = useState('all');

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.id !== featured?.id);
  const filtered =
    tab === 'all' ? rest : rest.filter((p) => p.category === TAB_CAT[tab]);
  const counts: Record<string, number> = {
    all: rest.length,
    essays: rest.filter((p) => p.category === 'ESSAY').length,
    method: rest.filter((p) => p.category === 'METHOD').length,
    eng: rest.filter((p) => p.category === 'ENGINEERING').length,
    cases: rest.filter((p) => p.category === 'CASE').length,
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
          {featured && (
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="lw-feature-post lw-reveal"
              style={{ display: 'grid' }}
            >
              <div className="body">
                <div className="meta">
                  FEATURED · {featured.category} · {fmtDate(featured.publishedAt)}{' '}
                  · {featured.readMinutes} MIN
                </div>
                <h2>{featured.title}</h2>
                <p>{featured.dek}</p>
                <div className="by">
                  <span className="av"></span>
                  <span>{featured.author.toUpperCase()} · LEANWISE AI</span>
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
                    {featured.readMinutes}
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
          )}

          <div className="lw-post-grid lw-reveal" style={{ marginTop: 32 }}>
            {filtered.map((p: Post) => (
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                key={p.id}
                className="lw-post"
              >
                <div className="topmeta">
                  <span className="cat">{p.category}</span>
                  <span>{fmtDate(p.publishedAt)}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.dek}</p>
                <div className="by">
                  <span className="name">{p.author}</span>
                  <span>{p.readMinutes} MIN</span>
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
            {stories.slice(0, 6).map((s: Story) =>
              s.caseStudySlug ? (
                <Link key={s.id} to="/case-studies/talimex" className="lw-story">
                  <StoryInner s={s} />
                </Link>
              ) : (
                <Link key={s.id} to="/customers" className="lw-story">
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
        {s.company.split(' ')[0].slice(0, 3).toUpperCase()}
      </div>
      <div>
        <div className="lw-eyebrow muted" style={{ marginBottom: 12, fontSize: 10 }}>
          {s.industry}
        </div>
        <h3>{s.company}</h3>
        <p>{s.description}</p>
        <div className="meta">
          <span>
            <b>{s.kpi}</b> · {s.kpiSub}
          </span>
        </div>
      </div>
    </>
  );
}
