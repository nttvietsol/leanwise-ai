import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Page, SectionHeader } from '~/components/ui';
import { NewsletterBox } from '~/components/newsletter-box';
import { BLOG_POSTS, BLOG_CATS, type BlogPost } from '~/data/blog-posts';

export const Route = createFileRoute('/blog/')({
  component: BlogPage,
  head: () => ({ meta: [{ title: 'Blog — Field notes from the factory floor' }] }),
});

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link to="/blog/$slug" params={{ slug: post.slug }} className="blog-card">
      <div className="blog-card-art" style={{ ['--hue' as any]: post.hue }}>
        <div className="blog-feat-art-grad"></div>
        <div className="blog-card-mark">{post.cat[0]}</div>
      </div>
      <div className="blog-card-body">
        <div className="blog-meta">
          <span className="blog-cat-tag">{post.cat}</span>
          <span className="dot-sep"></span>
          <span>{post.read}</span>
        </div>
        <h3 className="blog-card-title">{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="blog-author">
          <div className="avatar avatar-sm" style={{ ['--hue' as any]: post.hue }}>{post.initials}</div>
          <span>{post.author}</span>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--muted)' }}>{post.date}</span>
        </div>
      </div>
    </Link>
  );
}

function BlogPage() {
  const [cat, setCat] = useState<string>('All');
  const [q, setQ] = useState('');
  const filtered = BLOG_POSTS.filter(
    p =>
      (cat === 'All' || p.cat === cat) &&
      (!q || (p.title + p.excerpt).toLowerCase().includes(q.toLowerCase())),
  );
  const featured = filtered.find(p => p.feat) || filtered[0];
  const rest = filtered.filter(p => p !== featured);

  return (
    <Page>
      <section className="section blog-hero">
        <div className="container">
          <div className="blog-hero-grid">
            <div>
              <div className="eyebrow">Knowledge Hub</div>
              <h1 className="h-display">
                Field notes from the<br />
                <span className="ink-grad">factory floor.</span>
              </h1>
              <p className="lead">
                Practical guides, case studies, and essays on Lean Manufacturing, IKEA CONNECT compliance, and AI in production.
              </p>
            </div>
            <NewsletterBox />
          </div>
        </div>
      </section>

      <section className="blog-toolbar-sec">
        <div className="container blog-toolbar">
          <div className="blog-cats">
            {BLOG_CATS.map(c => (
              <button
                key={c}
                className={`blog-cat ${cat === c ? 'is-active' : ''}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="blog-search">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search articles..." />
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          {featured && (
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="blog-feat"
            >
              <div className="blog-feat-art" style={{ ['--hue' as any]: featured.hue }}>
                <div className="blog-feat-art-grad"></div>
                <div className="blog-feat-art-mark">{featured.cat[0]}</div>
              </div>
              <div className="blog-feat-copy">
                <div className="blog-meta">
                  <span className="blog-cat-tag">{featured.cat}</span>
                  <span className="dot-sep"></span>
                  <span>{featured.date}</span>
                  <span className="dot-sep"></span>
                  <span>{featured.read}</span>
                </div>
                <h2 className="h2">{featured.title}</h2>
                <p className="lead">{featured.excerpt}</p>
                <div className="blog-author">
                  <div className="avatar" style={{ ['--hue' as any]: featured.hue }}>{featured.initials}</div>
                  <span>{featured.author}</span>
                  <span className="lang-flags">
                    {featured.lang.map(l => <span key={l} className="lang-flag">{l}</span>)}
                  </span>
                </div>
              </div>
            </Link>
          )}

          <div className="blog-grid">
            {rest.map(p => <BlogCard key={p.slug} post={p} />)}
          </div>

          {filtered.length === 0 && <div className="blog-empty">No articles found for that filter yet.</div>}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Free downloads" title="Resources you can use today" align="left" />
          <div className="resource-mini-grid">
            <Link to="/resources" className="resource-mini">
              <div
                className="resource-mini-art"
                style={{ background: 'linear-gradient(135deg, oklch(0.85 0.06 180), oklch(0.65 0.1 200))' }}
              ></div>
              <div>
                <div className="mono small-mono">EBOOK · 32 PAGES</div>
                <strong>The CONNECT Compliance Playbook</strong>
              </div>
              <span className="resource-arrow">→</span>
            </Link>
            <Link to="/resources" className="resource-mini">
              <div
                className="resource-mini-art"
                style={{ background: 'linear-gradient(135deg, oklch(0.85 0.06 30), oklch(0.65 0.12 30))' }}
              ></div>
              <div>
                <div className="mono small-mono">INFOGRAPHIC</div>
                <strong>TSS mismatch decision tree</strong>
              </div>
              <span className="resource-arrow">→</span>
            </Link>
            <Link to="/resources" className="resource-mini">
              <div
                className="resource-mini-art"
                style={{ background: 'linear-gradient(135deg, oklch(0.85 0.06 280), oklch(0.6 0.12 260))' }}
              ></div>
              <div>
                <div className="mono small-mono">TEMPLATE</div>
                <strong>SOP visual builder starter</strong>
              </div>
              <span className="resource-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </Page>
  );
}
