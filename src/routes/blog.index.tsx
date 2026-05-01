import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Page } from '~/components/ui';
import { NewsletterBox } from '~/components/newsletter-box';
import { useI18n } from '~/i18n';
import { BLOG_POSTS, BLOG_CATS, type BlogPost } from '~/data/blog-posts';

export const Route = createFileRoute('/blog/')({
  component: BlogPage,
  head: () => ({ meta: [{ title: 'Blog — The Lean Factory Blog' }] }),
});

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="blog-card"
      style={{ ['--hue' as string]: post.hue, color: 'inherit' }}
    >
      <div className="blog-card-art">
        <div className="blog-feat-art-grad"></div>
        <div className="blog-card-mark">{post.cat[0]}</div>
      </div>
      <div className="blog-card-body">
        <div className="blog-meta">
          <span className="blog-cat-tag">{post.cat}</span>
          <span>·</span>
          <span>{post.read}</span>
        </div>
        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <div className="blog-author">
          <div className="avatar avatar-sm" style={{ ['--hue' as string]: post.hue }}>
            {post.initials}
          </div>
          <span>{post.author}</span>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--muted)' }}>{post.date}</span>
        </div>
      </div>
    </Link>
  );
}

function EmptyState() {
  const { t } = useI18n();
  return (
    <div className="blog-empty">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="8" y="12" width="32" height="28" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 20h16M16 27h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="36" cy="12" r="6" fill="var(--accent)" />
      </svg>
      <strong className="blog-empty-title">{t('blog.empty.title')}</strong>
      <p className="blog-empty-body">{t('blog.empty.body')}</p>
      <NewsletterBox />
    </div>
  );
}

function BlogPage() {
  const { t } = useI18n();
  const [cat, setCat] = useState<string>('All');
  const [q, setQ] = useState('');

  const filtered = BLOG_POSTS.filter(
    p =>
      (cat === 'All' || p.cat === cat) &&
      (!q || (p.title + p.excerpt).toLowerCase().includes(q.toLowerCase())),
  );

  const showFeatured = cat === 'All' && !q;
  const featured = showFeatured ? (BLOG_POSTS.find(p => p.feat) ?? BLOG_POSTS[0]) : undefined;
  const rest = featured ? filtered.filter(p => p !== featured) : filtered;

  return (
    <Page>
      <section className="section-tight blog-hero">
        <div className="container">
          <div className="eyebrow">{t('blog.eyebrow')}</div>
          <h1 className="h1">{t('blog.title')}</h1>
          <p className="lead blog-hero-lead">{t('blog.lead')}</p>
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
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder={t('blog.search')}
            />
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {featured && (
                <Link
                  to="/blog/$slug"
                  params={{ slug: featured.slug }}
                  className="blog-feat"
                  style={{ ['--hue' as string]: featured.hue, color: 'inherit' }}
                >
                  <div className="blog-feat-art">
                    <div className="blog-feat-art-grad"></div>
                    <div className="blog-feat-art-mark">{featured.cat[0]}</div>
                  </div>
                  <div className="blog-feat-copy">
                    <div className="blog-meta">
                      <span className="blog-cat-tag">{featured.cat}</span>
                      <span>·</span>
                      <span>{featured.date}</span>
                      <span>·</span>
                      <span>{featured.read}</span>
                    </div>
                    <h2 className="h2">{featured.title}</h2>
                    <p className="blog-feat-excerpt">{featured.excerpt}</p>
                    <div className="blog-author">
                      <div className="avatar" style={{ ['--hue' as string]: featured.hue }}>
                        {featured.initials}
                      </div>
                      <span>{featured.author}</span>
                      {featured.lang.length > 0 && (
                        <span className="lang-flags">
                          {featured.lang.map(l => (
                            <span key={l} className="lang-flag">{l}</span>
                          ))}
                        </span>
                      )}
                    </div>
                    <span className="blog-readmore">{t('blog.readmore')} →</span>
                  </div>
                </Link>
              )}

              {rest.length > 0 && (
                <div className="blog-grid">
                  {rest.map(p => (
                    <BlogCard key={p.slug} post={p} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Page>
  );
}
