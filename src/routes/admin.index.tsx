import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import {
  adminListPosts,
  adminListStories,
  deletePost,
  deleteStory,
} from '~/server/content';

export const Route = createFileRoute('/admin/')({
  loader: async () => ({
    posts: await adminListPosts(),
    stories: await adminListStories(),
  }),
  component: Dashboard,
});

/** Monospaced metadata cell (category, dates, sort order). */
const monoCell: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
};
const monoCellMuted: React.CSSProperties = { ...monoCell, color: 'var(--ink-4)' };

function fmtDate(iso: string | null): string {
  return iso ? iso.slice(0, 10) : '—';
}

function Dashboard() {
  const { posts, stories } = Route.useLoaderData();
  const router = useRouter();

  async function removePost(id: string, title: string): Promise<void> {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await deletePost({ data: { id } });
    router.invalidate();
  }
  async function removeStory(id: string, company: string): Promise<void> {
    if (!window.confirm(`Delete the ${company} story?`)) return;
    await deleteStory({ data: { id } });
    router.invalidate();
  }

  return (
    <>
      {/* Posts */}
      <section className="adm-section">
        <div className="adm-head">
          <div>
            <div className="lw-eyebrow">Blog &amp; resources</div>
            <h1 className="lw-h3" style={{ marginTop: 8 }}>
              Posts <span style={{ color: 'var(--ink-4)' }}>· {posts.length}</span>
            </h1>
          </div>
          <Link
            to="/admin/posts/$id"
            params={{ id: 'new' }}
            className="lw-btn lw-btn-primary"
          >
            New post <span className="arrow">→</span>
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="adm-table">
            <div className="adm-empty">No posts yet. Create the first one.</div>
          </div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Updated</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <span className="title">{p.title}</span>
                    {p.featured && (
                      <span
                        className="adm-tag published"
                        style={{ marginLeft: 8 }}
                      >
                        Featured
                      </span>
                    )}
                  </td>
                  <td style={monoCell}>{p.category}</td>
                  <td>
                    <span className={`adm-tag ${p.status}`}>{p.status}</span>
                  </td>
                  <td style={monoCellMuted}>{fmtDate(p.updatedAt)}</td>
                  <td>
                    <div className="adm-actions" style={{ justifyContent: 'flex-end' }}>
                      <Link
                        to="/admin/posts/$id"
                        params={{ id: p.id }}
                        className="lw-btn lw-btn-ghost adm-btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        className="adm-btn-danger adm-btn-sm"
                        onClick={() => removePost(p.id, p.title)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Customer stories */}
      <section className="adm-section">
        <div className="adm-head">
          <div>
            <div className="lw-eyebrow">Customers</div>
            <h2 className="lw-h3" style={{ marginTop: 8 }}>
              Customer stories{' '}
              <span style={{ color: 'var(--ink-4)' }}>· {stories.length}</span>
            </h2>
          </div>
          <Link
            to="/admin/stories/$id"
            params={{ id: 'new' }}
            className="lw-btn lw-btn-primary"
          >
            New story <span className="arrow">→</span>
          </Link>
        </div>

        {stories.length === 0 ? (
          <div className="adm-table">
            <div className="adm-empty">No customer stories yet.</div>
          </div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Industry</th>
                <th>KPI</th>
                <th>Order</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((s) => (
                <tr key={s.id}>
                  <td>
                    <span className="title">{s.company}</span>
                  </td>
                  <td style={{ color: 'var(--ink-3)', fontSize: 13 }}>
                    {s.industry}
                  </td>
                  <td style={monoCell}>
                    {s.kpi} {s.kpiUnit}
                  </td>
                  <td style={monoCellMuted}>{s.sortOrder}</td>
                  <td>
                    <div className="adm-actions" style={{ justifyContent: 'flex-end' }}>
                      <Link
                        to="/admin/stories/$id"
                        params={{ id: s.id }}
                        className="lw-btn lw-btn-ghost adm-btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        className="adm-btn-danger adm-btn-sm"
                        onClick={() => removeStory(s.id, s.company)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
