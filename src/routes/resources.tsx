import { useId, useState, type ReactElement } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Page } from '~/components/ui';
import { FinalCTA } from '~/components/final-cta';
import { RESOURCES, RES_CATS, RES_TYPES, type ResourceItem } from '~/data/resources';
import { requestResource } from '~/server/forms';
import { useI18n } from '~/i18n';

export const Route = createFileRoute('/resources')({
  component: ResourcesPage,
  head: () => ({ meta: [{ title: 'Resources — Free Tools & Guides' }] }),
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ArtConfig = { cls: string; icon: ReactElement };

const ART: Record<ResourceItem['type'], ArtConfig> = {
  Ebook: {
    cls: 'res-art--ebook',
    icon: (
      <svg width="56" height="64" viewBox="0 0 56 64" fill="none">
        <rect x="2" y="2" width="52" height="60" rx="3" stroke="currentColor" strokeWidth="2.5" fill="rgba(255,255,255,0.1)" />
        <path d="M12 16h32M12 24h32M12 32h22M12 40h28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  Infographic: {
    cls: 'res-art--guide',
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect x="2" y="2" width="52" height="52" rx="3" stroke="currentColor" strokeWidth="2.5" fill="rgba(255,255,255,0.1)" />
        <path d="M10 40V24M22 40V12M34 40V30M46 40V18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  Template: {
    cls: 'res-art--template',
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect x="2" y="2" width="52" height="52" rx="3" stroke="currentColor" strokeWidth="2.5" fill="rgba(255,255,255,0.1)" />
        <path d="M2 16h52M14 2v52" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
  },
  Checklist: {
    cls: 'res-art--checklist',
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect x="2" y="2" width="52" height="52" rx="3" stroke="currentColor" strokeWidth="2.5" fill="rgba(255,255,255,0.1)" />
        <path d="M14 18l5 5 9-11M14 36l5 5 9-11M34 21h8M34 39h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  Worksheet: {
    cls: 'res-art--template',
    icon: (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect x="2" y="2" width="52" height="52" rx="3" stroke="currentColor" strokeWidth="2.5" fill="rgba(255,255,255,0.1)" />
        <path d="M12 16h20M12 24h32M12 32h28M12 40h22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
};

function ResourceCard({
  res,
  downloadLabel,
  onDownload,
}: {
  res: ResourceItem;
  downloadLabel: string;
  onDownload: () => void;
}) {
  const art = ART[res.type];
  return (
    <article className="res-card">
      <div className={`res-art ${art.cls}`}>
        <div className="res-type-tag">{res.type}</div>
        <div className="res-card-art-icon">{art.icon}</div>
      </div>
      <div className="res-body">
        <h3 className="res-title">{res.title}</h3>
        <p className="res-desc">{res.desc}</p>
        <div className="res-card-cta">
          <span className="gate">{res.pages}</span>
          <button className="btn btn-link" onClick={onDownload}>
            {downloadLabel} →
          </button>
        </div>
      </div>
    </article>
  );
}

function GateModal({ res, onClose }: { res: ResourceItem; onClose: () => void }) {
  const { t } = useI18n();
  const nameId = useId();
  const emailId = useId();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');
  const [pending, setPending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !EMAIL_RE.test(email)) {
      setErr(t('form.email.invalid'));
      return;
    }
    setErr('');
    setPending(true);
    try {
      await requestResource({ data: { email, name, resourceSlug: res.slug } });
      setDone(true);
    } catch {
      setErr('Something went wrong. Please try again.');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="gate-overlay" onClick={onClose}>
      <div className="gate-modal" onClick={e => e.stopPropagation()}>
        <button className="gate-close" onClick={onClose} aria-label="Close">×</button>
        {!done ? (
          <>
            <div className="mono small-mono" style={{ color: 'var(--accent-deep)' }}>
              {res.type.toUpperCase()} · FREE
            </div>
            <h2 className="gate-title">{t('res.gate.title')}</h2>
            <p className="gate-sub">{t('res.gate.sub')}</p>
            <form onSubmit={submit} noValidate>
              <div className="field">
                <label htmlFor={nameId}>{t('res.gate.name')}</label>
                <input id={nameId} className="input" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor={emailId}>
                  {t('res.gate.email')} <span className="req">*</span>
                </label>
                <input
                  id={emailId}
                  className="input"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                {err && <div className="field-error">{err}</div>}
              </div>
              <button type="submit" className="btn btn-primary btn-lg" disabled={pending}>
                {pending ? t('demo.submit.pending') : `${t('res.gate.submit.prefix')} ${res.type.toLowerCase()}`}
              </button>
            </form>
          </>
        ) : (
          <div className="form-success">
            <div className="form-success-icon">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.6" />
                <path d="M6 11.5l3.2 3.2L16 7.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="h3">{t('res.gate.done.title')}</h3>
            <p>{t('res.gate.done.body')}</p>
            <button className="btn btn-ghost" onClick={onClose} style={{ marginTop: 12 }}>
              {t('res.gate.done.close')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ResourcesPage() {
  const { t } = useI18n();
  const [cat, setCat] = useState<string>('All');
  const [type, setType] = useState<string>('All types');
  const [gating, setGating] = useState<ResourceItem | null>(null);

  const filtered = RESOURCES.filter(
    r => (cat === 'All' || r.cat === cat) && (type === 'All types' || r.type === type),
  );

  return (
    <Page>
      <section className="section res-hero">
        <div className="container">
          <div className="eyebrow">{t('res.eyebrow')}</div>
          <h1 className="h1" style={{ marginTop: 8 }}>{t('res.title')}</h1>
          <p className="lead" style={{ marginTop: 12, maxWidth: 600 }}>{t('res.lead')}</p>
          <div className="res-filters">
            {RES_CATS.map(c => (
              <button
                key={c}
                className={`blog-cat ${cat === c ? 'is-active' : ''}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="res-filters" style={{ marginTop: 8 }}>
            {RES_TYPES.map(tp => (
              <button
                key={tp}
                className={`blog-cat ${type === tp ? 'is-active' : ''}`}
                onClick={() => setType(tp)}
              >
                {tp}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="blog-empty">{t('res.empty')}</div>
          ) : (
            <div className="res-grid">
              {filtered.map(r => (
                <ResourceCard
                  key={r.slug}
                  res={r}
                  downloadLabel={r.gated ? t('res.cta.download.free') : t('res.cta.download')}
                  onDownload={() => (r.gated ? setGating(r) : window.alert('Download started.'))}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {gating && <GateModal res={gating} onClose={() => setGating(null)} />}

      <FinalCTA
        title="Need help applying this in your factory?"
        sub="Book a 30-minute walkthrough — we'll work through your real documents with you."
        primary="Get a Demo"
      />
    </Page>
  );
}
