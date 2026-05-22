import { useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { adminGetPost, createPost, updatePost } from '~/server/content';
import { renderMarkdown } from '~/lib/markdown';
import type { PostCategory, PostStatus } from '~/server/db';

export const Route = createFileRoute('/admin/posts/$id')({
  loader: async ({ params }) => {
    if (params.id === 'new') return { post: null };
    return { post: await adminGetPost({ data: { id: params.id } }) };
  },
  component: PostEditor,
});

const CATEGORIES: PostCategory[] = ['ESSAY', 'METHOD', 'ENGINEERING', 'CASE'];

function PostEditor() {
  const { id } = Route.useParams();
  const { post } = Route.useLoaderData();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [form, setForm] = useState({
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    dek: post?.dek ?? '',
    category: post?.category ?? ('ESSAY' as PostCategory),
    author: post?.author ?? 'LeanWise AI',
    readMinutes: post?.readMinutes ?? 6,
    bodyMd: post?.bodyMd ?? '',
    status: post?.status ?? ('draft' as PostStatus),
    featured: post?.featured ?? false,
  });
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  if (!isNew && !post) {
    return (
      <div>
        <p className="adm-err">Post not found.</p>
        <Link to="/admin" className="lw-btn lw-btn-ghost" style={{ marginTop: 16 }}>
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setSaving(true);
    try {
      if (isNew) {
        await createPost({ data: form });
      } else {
        await updatePost({ data: { id, ...form } });
      }
      navigate({ to: '/admin' });
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Could not save the post.');
      setSaving(false);
    }
  };

  return (
    <>
      <div className="adm-head">
        <div>
          <Link to="/admin" style={{ color: 'var(--ink-4)', fontSize: 13 }}>
            ← Dashboard
          </Link>
          <h1 className="lw-h3" style={{ marginTop: 8 }}>
            {isNew ? 'New post' : 'Edit post'}
          </h1>
        </div>
      </div>

      <form className="adm-form" onSubmit={submit}>
        <div className="adm-field">
          <label htmlFor="f-title">Title</label>
          <input
            id="f-title"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="The auditor doesn't care that you tried."
            required
          />
        </div>

        <div className="adm-grid2">
          <div className="adm-field">
            <label htmlFor="f-slug">Slug</label>
            <input
              id="f-slug"
              value={form.slug}
              onChange={(e) => set('slug', e.target.value)}
              placeholder="auto-generated from title if blank"
            />
            <span className="hint">URL: /blog/{form.slug || '…'}</span>
          </div>
          <div className="adm-field">
            <label htmlFor="f-author">Author</label>
            <input
              id="f-author"
              value={form.author}
              onChange={(e) => set('author', e.target.value)}
            />
          </div>
        </div>

        <div className="adm-field">
          <label htmlFor="f-dek">Summary (dek)</label>
          <textarea
            id="f-dek"
            rows={2}
            value={form.dek}
            onChange={(e) => set('dek', e.target.value)}
            placeholder="One- or two-sentence summary shown on cards."
          />
        </div>

        <div className="adm-grid2">
          <div className="adm-field">
            <label htmlFor="f-category">Category</label>
            <select
              id="f-category"
              value={form.category}
              onChange={(e) => set('category', e.target.value as PostCategory)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="adm-field">
            <label htmlFor="f-read">Read time (minutes)</label>
            <input
              id="f-read"
              type="number"
              min={1}
              max={99}
              value={form.readMinutes}
              onChange={(e) => set('readMinutes', Number(e.target.value))}
            />
          </div>
        </div>

        <div className="adm-field">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <label htmlFor="f-body">Body (Markdown)</label>
            <button
              type="button"
              className="lw-btn lw-btn-ghost adm-btn-sm"
              onClick={() => setPreview((p) => !p)}
            >
              {preview ? 'Edit' : 'Preview'}
            </button>
          </div>
          {preview ? (
            <div
              className="adm-preview"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(form.bodyMd) }}
            />
          ) : (
            <textarea
              id="f-body"
              className="mono"
              rows={20}
              value={form.bodyMd}
              onChange={(e) => set('bodyMd', e.target.value)}
              placeholder="## Heading&#10;&#10;Paragraph text. Use **bold**, lists, > quotes, and ```code```."
            />
          )}
        </div>

        <div className="adm-grid2">
          <div className="adm-field">
            <label htmlFor="f-status">Status</label>
            <select
              id="f-status"
              value={form.status}
              onChange={(e) => set('status', e.target.value as PostStatus)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="adm-field" style={{ justifyContent: 'flex-end' }}>
            <label className="adm-checkrow">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set('featured', e.target.checked)}
              />
              Feature this post on the Resources page
            </label>
          </div>
        </div>

        <div className="adm-formfoot">
          <button
            type="submit"
            className="lw-btn lw-btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving…' : isNew ? 'Create post' : 'Save changes'}
          </button>
          <Link to="/admin" className="lw-btn lw-btn-ghost">
            Cancel
          </Link>
          {err && <span className="adm-err">{err}</span>}
        </div>
      </form>
    </>
  );
}
