import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { Page } from '~/components/ui';
import { NewsletterBox } from '~/components/newsletter-box';
import { BLOG_POSTS } from '~/data/blog-posts';

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostPage,
  loader: ({ params }) => {
    const post = BLOG_POSTS.find(p => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.post.title ?? 'Article'} — LeanWise AI` },
      { name: 'description', content: loaderData?.post.excerpt },
    ],
  }),
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  return (
    <Page>
      <article className="article">
        <div className="container article-narrow">
          <Link to="/blog" className="back-link">← Back to Blog</Link>
          <div className="blog-meta" style={{ marginTop: 24 }}>
            <span className="blog-cat-tag">{post.cat}</span>
            <span className="dot-sep"></span>
            <span>{post.date}</span>
            <span className="dot-sep"></span>
            <span>{post.read}</span>
          </div>
          <h1 className="h1" style={{ marginTop: 12 }}>{post.title}</h1>
          <div className="blog-author" style={{ marginTop: 16 }}>
            <div className="avatar" style={{ ['--hue' as any]: post.hue }}>{post.initials}</div>
            <span>{post.author}</span>
            <span className="lang-flags">
              {post.lang.map(l => <span key={l} className="lang-flag">{l}</span>)}
            </span>
          </div>
        </div>

        <div className="container article-narrow">
          <div className="article-hero" style={{ ['--hue' as any]: post.hue }}>
            <div className="blog-feat-art-grad"></div>
            <div className="article-hero-mark">{post.cat[0]}</div>
          </div>

          <div className="prose">
            <p className="lead">{post.excerpt}</p>
            <p>
              This is a placeholder body. In production, articles render from a headless CMS (Sanity / Payload) so the team can self-publish without a deploy. Each post supports rich text, images, code, callouts, and embedded resources. Bilingual variants (EN/VI) are stored as separate documents linked by slug.
            </p>

            <h2>Why this matters</h2>
            <p>
              Manufacturing leaders are buried in compliance work. The factories winning today aren&apos;t the ones with bigger teams — they&apos;re the ones with sharper tools.
            </p>

            <blockquote>
              &quot;What used to take our team a full afternoon now takes under an hour.&quot; — CONNECT Leader, Vietnam
            </blockquote>

            <h2>The three things to do this week</h2>
            <ol>
              <li>Audit your last three CONNECT submissions. Where did review eat the most hours?</li>
              <li>Map your TSS-to-Test-Plan flow. Anywhere the mapping is implicit, mistakes hide there.</li>
              <li>Pick one document type to automate first. Don&apos;t boil the ocean.</li>
            </ol>

            <h2>Want help applying this?</h2>
            <p>Book a 30-minute walkthrough — we&apos;ll run CONNECT Mastery against one of your batches live.</p>

            <div className="article-cta">
              <Link to="/get-a-demo" className="btn btn-primary">Get a Demo</Link>
              <Link to="/solutions/connect-mastery" className="btn btn-ghost">
                Learn about CONNECT Mastery →
              </Link>
            </div>
          </div>

          <NewsletterBox />
        </div>
      </article>
    </Page>
  );
}
