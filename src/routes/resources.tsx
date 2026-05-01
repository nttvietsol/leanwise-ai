import { useId, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Page } from '~/components/ui';
import { FinalCTA } from '~/components/final-cta';
import { NewsletterBox } from '~/components/newsletter-box';
import { RESOURCES, RES_CATS, RES_TYPES, type ResourceItem } from '~/data/resources';
import { requestResource } from '~/server/forms';

export const Route = createFileRoute('/resources')({
  component: ResourcesPage,
  head: () => ({ meta: [{ title: 'Resources — Free playbooks and field guides' }] }),
});

function ResourceCard({ res, onDownload }: { res: ResourceItem; onDownload: () => void }) {
  return (
    <article className="res-card" style={{ ['--hue' as any]: res.hue }}>
      <div className="res-card-art">
        <div className="res-card-art-grad"></div>
        <div className="res-type-tag">{res.type}</div>
        <div className="res-card-art-icon">
          {res.type === 'Ebook' && (
            <svg width="56" height="64" viewBox="0 0 56 64" fill="none">
              <rect x="2" y="2" width="52" height="60" rx="3" stroke="currentColor" strokeWidth="2.5" fill="rgba(255,255,255,0.1)" />
              <path d="M12 16h32M12 24h32M12 32h22M12 40h28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
          {res.type === 'Infographic' && (
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <rect x="2" y="2" width="52" height="52" rx="3" stroke="currentColor" strokeWidth="2.5" fill="rgba(255,255,255,0.1)" />
              <path d="M10 40V24M22 40V12M34 40V30M46 40V18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
          {res.type === 'Template' && (
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <rect x="2" y="2" width="52" height="52" rx="3" stroke="currentColor" strokeWidth="2.5" fill="rgba(255,255,255,0.1)" />
              <path d="M2 16h52M14 2v52" stroke="currentColor" strokeWidth="2.5" />
            </svg>
          )}
          {res.type === 'Checklist' && (
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <rect x="2" y="2" width="52" height="52" rx="3" stroke="currentColor" strokeWidth="2.5" fill="rgba(255,255,255,0.1)" />
              <path d="M14 18l5 5 9-11M14 36l5 5 9-11M34 21h8M34 39h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {res.type === 'Worksheet' && (
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <rect x="2" y="2" width="52" height="52" rx="3" stroke="currentColor" strokeWidth="2.5" fill="rgba(255,255,255,0.1)" />
              <path d="M12 16h20M12 24h32M12 32h28M12 40h22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>
      <div className="res-card-body">
        <h3 className="res-card-title">{res.title}</h3>
        <p>{res.desc}</p>
        <div className="res-card-cta">
          <span className="gate">{res.pages}</span>
          <button className="btn btn-link" onClick={onDownload}>
            {res.gated ? 'Download (free)' : 'Download'}
          </button>
        </div>
      </div>
    </article>
  );
}

function GateModal({ res, onClose }: { res: ResourceItem; onClose: () => void }) {
  const nameId = useId();
  const emailId = useId();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');
  const [pending, setPending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr('Please enter a valid work email.');
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
            <h3 className="h3" style={{ marginTop: 4 }}>{res.title}</h3>
            <p style={{ color: 'var(--ink-3)', marginTop: 4 }}>
              Tell us where to send it. We&apos;ll add you to our monthly list — unsubscribe any time.
            </p>
            <form onSubmit={submit} noValidate>
              <div className="field">
                <label htmlFor={nameId}>Full name</label>
                <input id={nameId} className="input" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor={emailId}>Work email <span className="req">*</span></label>
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
                {pending ? 'Sending…' : `Send me the ${res.type.toLowerCase()}`}
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
            <h3 className="h3">Check your inbox.</h3>
            <p>
              We&apos;ve emailed <strong>{email}</strong> with the {res.type.toLowerCase()}.
            </p>
            <button className="btn btn-ghost" onClick={onClose} style={{ marginTop: 12 }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ResourcesPage() {
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
          <div className="res-hero-grid">
            <div>
              <div className="eyebrow">Resources</div>
              <h1 className="h-display">
                Free playbooks, templates,<br />
                <span className="ink-grad">and field guides.</span>
              </h1>
              <p className="lead">
                Practical material from working with IKEA suppliers. Download what you need — no fluff.
              </p>
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
                {RES_TYPES.map(t => (
                  <button
                    key={t}
                    className={`blog-cat ${type === t ? 'is-active' : ''}`}
                    onClick={() => setType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <NewsletterBox />
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="res-grid">
            {filtered.map(r => (
              <ResourceCard
                key={r.slug}
                res={r}
                onDownload={() =>
                  r.gated ? setGating(r) : window.alert('Download started.')
                }
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="blog-empty">Nothing matches that combination yet.</div>
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
