import { useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { adminListStories, createStory, updateStory } from '~/server/content';

export const Route = createFileRoute('/admin/stories/$id')({
  loader: async ({ params }) => {
    if (params.id === 'new') return { story: null };
    const all = await adminListStories();
    return { story: all.find((s) => s.id === params.id) ?? null };
  },
  component: StoryEditor,
});

function StoryEditor() {
  const { id } = Route.useParams();
  const { story } = Route.useLoaderData();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [form, setForm] = useState({
    company: story?.company ?? '',
    industry: story?.industry ?? '',
    kpi: story?.kpi ?? '',
    kpiUnit: story?.kpiUnit ?? '',
    kpiSub: story?.kpiSub ?? '',
    description: story?.description ?? '',
    caseStudySlug: story?.caseStudySlug ?? '',
    sortOrder: story?.sortOrder ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]): void {
    setForm((f) => ({ ...f, [k]: v }));
  }

  if (!isNew && !story) {
    return (
      <div>
        <p className="adm-err">Customer story not found.</p>
        <Link to="/admin" className="lw-btn lw-btn-ghost" style={{ marginTop: 16 }}>
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  async function submit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setErr('');
    setSaving(true);
    try {
      if (isNew) {
        await createStory({ data: form });
      } else {
        await updateStory({ data: { id, ...form } });
      }
      navigate({ to: '/admin' });
    } catch (cause) {
      setErr(cause instanceof Error ? cause.message : 'Could not save the story.');
      setSaving(false);
    }
  }

  return (
    <>
      <div className="adm-head">
        <div>
          <Link to="/admin" style={{ color: 'var(--ink-4)', fontSize: 13 }}>
            ← Dashboard
          </Link>
          <h1 className="lw-h3" style={{ marginTop: 8 }}>
            {isNew ? 'New customer story' : 'Edit customer story'}
          </h1>
        </div>
      </div>

      <form className="adm-form" onSubmit={submit}>
        <div className="adm-grid2">
          <div className="adm-field">
            <label htmlFor="s-company">Company</label>
            <input
              id="s-company"
              value={form.company}
              onChange={(e) => set('company', e.target.value)}
              placeholder="Talimex"
              required
            />
          </div>
          <div className="adm-field">
            <label htmlFor="s-industry">Industry</label>
            <input
              id="s-industry"
              value={form.industry}
              onChange={(e) => set('industry', e.target.value)}
              placeholder="Furniture · Tier-1 IKEA"
            />
          </div>
        </div>

        <div className="adm-grid2">
          <div className="adm-field">
            <label htmlFor="s-kpi">KPI value</label>
            <input
              id="s-kpi"
              value={form.kpi}
              onChange={(e) => set('kpi', e.target.value)}
              placeholder="11/12"
            />
          </div>
          <div className="adm-field">
            <label htmlFor="s-kpiunit">KPI unit</label>
            <input
              id="s-kpiunit"
              value={form.kpiUnit}
              onChange={(e) => set('kpiUnit', e.target.value)}
              placeholder="audit findings closed"
            />
          </div>
        </div>

        <div className="adm-grid2">
          <div className="adm-field">
            <label htmlFor="s-kpisub">KPI sub-label</label>
            <input
              id="s-kpisub"
              value={form.kpiSub}
              onChange={(e) => set('kpiSub', e.target.value)}
              placeholder="in 11 weeks"
            />
          </div>
          <div className="adm-field">
            <label htmlFor="s-order">Sort order</label>
            <input
              id="s-order"
              type="number"
              value={form.sortOrder}
              onChange={(e) => set('sortOrder', Number(e.target.value))}
            />
          </div>
        </div>

        <div className="adm-field">
          <label htmlFor="s-desc">Description</label>
          <textarea
            id="s-desc"
            rows={4}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="What this plant shipped, in two or three sentences."
          />
        </div>

        <div className="adm-field">
          <label htmlFor="s-case">Case-study slug (optional)</label>
          <input
            id="s-case"
            value={form.caseStudySlug}
            onChange={(e) => set('caseStudySlug', e.target.value)}
            placeholder="talimex"
          />
          <span className="hint">
            Set to link the card to a case study, e.g. /case-studies/talimex
          </span>
        </div>

        <div className="adm-formfoot">
          <button
            type="submit"
            className="lw-btn lw-btn-primary"
            disabled={saving}
          >
            {saving ? 'Saving…' : isNew ? 'Create story' : 'Save changes'}
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
