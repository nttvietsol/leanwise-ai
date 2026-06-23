import { useId, useState } from 'react';
import type { CSSProperties } from 'react';
import { submitDemo } from '~/server/forms';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GENERIC_ERROR = 'Something went wrong. Please try again.';

/* Shared inline style for the mono-styled error line shown below a form. */
const errorLineStyle: CSSProperties = {
  fontSize: 12,
  marginTop: 10,
  fontFamily: 'var(--font-mono)',
};

/* ────────── Contact / demo-request form ────────── */

export function ContactForm() {
  const id = useId();
  const f = (k: string) => `${id}-${k}`;
  const [v, setV] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    company: '',
    module: 'connect',
    lines: '11–20',
    message: '',
  });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof typeof v, val: string) =>
    setV((s) => ({ ...s, [k]: val }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!v.name.trim()) next.name = 'Required';
    if (!v.company.trim()) next.company = 'Required';
    if (!EMAIL_RE.test(v.email)) next.email = 'Please enter a valid work email.';
    setErrs(next);
    if (Object.keys(next).length) return;
    setPending(true);
    try {
      await submitDemo({
        data: {
          name: v.name,
          company: v.company,
          email: v.email,
          phone: v.phone,
          interest: `${v.module} · ${v.lines} lines · ${v.role || 'role n/a'}`,
          message: v.message,
        },
      });
      setSubmitted(true);
    } catch {
      setErrs({ form: GENERIC_ERROR });
    } finally {
      setPending(false);
    }
  };

  if (submitted) {
    return (
      <div className="lw-form">
        <div style={{ padding: '40px 0', textAlign: 'center' }}>
          <div
            className="lw-eyebrow"
            style={{ justifyContent: 'center', color: 'var(--ok)', marginBottom: 16 }}
          >
            Received · ack
          </div>
          <h3
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              marginBottom: 12,
            }}
          >
            We&apos;ll be in touch within one business day.
          </h3>
          <p style={{ color: 'var(--ink-3)', maxWidth: '40ch', margin: '0 auto' }}>
            If it is urgent, ping <b>founders@leanwise.ai</b> directly. We are in
            HCMC (UTC+7).
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="lw-btn lw-btn-ghost"
            style={{ marginTop: 24 }}
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  const Err = ({ k }: { k: string }) =>
    errs[k] ? (
      <span
        style={{
          color: 'var(--err)',
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.04em',
        }}
      >
        {errs[k]}
      </span>
    ) : null;

  return (
    <form className="lw-form" onSubmit={submit} noValidate>
      <div className="row split">
        <div className="row" style={{ marginBottom: 0 }}>
          <label htmlFor={f('name')}>Name *</label>
          <input
            id={f('name')}
            placeholder="Your name"
            value={v.name}
            onChange={(e) => set('name', e.target.value)}
          />
          <Err k="name" />
        </div>
        <div className="row" style={{ marginBottom: 0 }}>
          <label htmlFor={f('role')}>Role</label>
          <input
            id={f('role')}
            placeholder="Head of Quality, Plant Manager…"
            value={v.role}
            onChange={(e) => set('role', e.target.value)}
          />
        </div>
      </div>
      <div className="row split">
        <div className="row" style={{ marginBottom: 0 }}>
          <label htmlFor={f('email')}>Work email *</label>
          <input
            id={f('email')}
            type="email"
            placeholder="you@company.com"
            value={v.email}
            onChange={(e) => set('email', e.target.value)}
          />
          <Err k="email" />
        </div>
        <div className="row" style={{ marginBottom: 0 }}>
          <label htmlFor={f('phone')}>Phone (optional)</label>
          <input
            id={f('phone')}
            placeholder="+84…"
            value={v.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <label htmlFor={f('company')}>Plant / company *</label>
        <input
          id={f('company')}
          placeholder="Talimex · HCMC"
          value={v.company}
          onChange={(e) => set('company', e.target.value)}
        />
        <Err k="company" />
      </div>
      <div className="row split">
        <div className="row" style={{ marginBottom: 0 }}>
          <label htmlFor={f('module')}>Module of interest</label>
          <select
            id={f('module')}
            value={v.module}
            onChange={(e) => set('module', e.target.value)}
          >
            <option value="connect">CONNECT Mastery (live)</option>
            <option value="sop">SOP Mastery (Q4 2026)</option>
            <option value="ops">Operations Mastery (research)</option>
            <option value="all">All three / not sure yet</option>
          </select>
        </div>
        <div className="row" style={{ marginBottom: 0 }}>
          <label htmlFor={f('lines')}>Lines on site</label>
          <select
            id={f('lines')}
            value={v.lines}
            onChange={(e) => set('lines', e.target.value)}
          >
            <option>1–5</option>
            <option>6–10</option>
            <option>11–20</option>
            <option>21–50</option>
            <option>50+</option>
          </select>
        </div>
      </div>
      <div className="row">
        <label htmlFor={f('message')}>
          What is the most expensive thing your quality team does manually?
        </label>
        <textarea
          id={f('message')}
          placeholder="The more specific, the better — we will come prepared."
          value={v.message}
          onChange={(e) => set('message', e.target.value)}
        />
      </div>
      <div className="submit">
        <span className="hint">Replies in &lt; 1 business day · UTC+7</span>
        <button type="submit" className="lw-btn lw-btn-primary" disabled={pending}>
          {pending ? 'Sending…' : 'Request demo'} <span className="arrow">→</span>
        </button>
      </div>
      {errs.form && (
        <div style={{ ...errorLineStyle, color: 'var(--err)' }}>{errs.form}</div>
      )}
    </form>
  );
}
