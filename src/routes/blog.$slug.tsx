import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { getPublishedPost, listPublishedPosts } from '~/server/content';
import { renderMarkdown } from '~/lib/markdown';
import { fmtDate } from '~/lib/format';
import type { Post } from '~/server/db';

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
  // The ctx param is hand-typed (not the inferred AssetFnContextOptions) on
  // purpose: contextually typing it pulls in TLoaderFn, which creates a
  // circular dependency that silently drops the route's loader-data type.
  head: (ctx: { loaderData?: { post?: Post } }) => {
    const post = ctx.loaderData?.post;
    return {
      meta: post
        ? [
            { title: `${post.title} — LeanWise AI` },
            { name: 'description', content: post.dek },
          ]
        : [{ title: 'Article — LeanWise AI' }],
    };
  },
  loader: async ({
    params,
  }): Promise<{ post: Post; related: Post[]; html: string }> => {
    const [post, all] = await Promise.all([
      getPublishedPost({ data: { slug: params.slug } }),
      listPublishedPosts(),
    ]);
    if (!post) throw notFound();
    const related = all.filter((p) => p.slug !== post.slug).slice(0, 3);
    return { post, related, html: renderMarkdown(post.bodyMd) };
  },
  notFoundComponent: () => (
    <section className="lw-section" style={{ textAlign: 'center' }}>
      <div className="lw-container">
        <div className="lw-eyebrow" style={{ justifyContent: 'center', marginBottom: 16 }}>
          404 · Not found
        </div>
        <h1 className="lw-h2">That article doesn&apos;t exist.</h1>
        <p className="lw-lead" style={{ margin: '20px auto 28px' }}>
          It may have been unpublished or the link is wrong.
        </p>
        <Link to="/resources" className="lw-btn lw-btn-primary">
          Back to Resources <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  ),
});

function BlogPost() {
  const { post, related, html } = Route.useLoaderData();
  return (
    <>
      <section className="lw-article-hero">
        <div className="lw-container" style={{ maxWidth: 920 }}>
          <div className="topmeta lw-reveal">
            <Link to="/resources" style={{ color: 'var(--ink-4)' }}>
              ← Resources
            </Link>
            <span className="cat">{post.category}</span>
            <span>{fmtDate(post.publishedAt)}</span>
            <span>{post.readMinutes} MIN READ</span>
          </div>
          <h1 className="lw-reveal">{post.title}</h1>
          <p className="lead lw-reveal">{post.dek}</p>
          <div className="by lw-reveal">
            <div className="av"></div>
            <div>
              <div className="name">{post.author}</div>
              <div className="role">LEANWISE AI</div>
            </div>
          </div>
        </div>
      </section>

      <div className="lw-container">
        <div className="lw-article-body">
          <aside className="sticky">
            <div className="label">Filed under</div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--ink-3)',
                textTransform: 'none',
                letterSpacing: 0,
                lineHeight: 1.6,
              }}
            >
              {post.category} · {post.author}
              <br />
              Published {fmtDate(post.publishedAt)}
            </div>
            <div className="label" style={{ marginTop: 32 }}>
              Discuss
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--ink-3)',
                textTransform: 'none',
                letterSpacing: 0,
                lineHeight: 1.55,
              }}
            >
              Reply at{' '}
              <a
                href="mailto:notes@leanwise.ai"
                style={{ color: 'var(--ink)', borderBottom: '1px solid var(--ink)' }}
              >
                notes@leanwise.ai
              </a>
            </div>
          </aside>

          <article
            className="lw-reveal"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <aside className="sticky">
            <div className="label">Related</div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                marginTop: 12,
              }}
            >
              {related.map((r: Post) => (
                <Link
                  key={r.id}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    color: 'var(--ink-2)',
                    textTransform: 'none',
                    letterSpacing: '-0.005em',
                    lineHeight: 1.4,
                  }}
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="lw-related">
          <div className="lw-container">
            <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
              Continue reading
            </div>
            <h3>Related field notes</h3>
            <div className="lw-post-grid lw-reveal" style={{ marginTop: 8 }}>
              {related.map((r: Post) => (
                <Link
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  key={r.id}
                  className="lw-post"
                >
                  <div className="topmeta">
                    <span className="cat">{r.category}</span>
                    <span>{fmtDate(r.publishedAt)}</span>
                  </div>
                  <h3>{r.title}</h3>
                  <p>{r.dek}</p>
                  <div className="by">
                    <span className="name">{r.author}</span>
                    <span>{r.readMinutes} MIN</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
