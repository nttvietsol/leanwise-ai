import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Page } from '~/components/ui';
import { submitDemo } from '~/server/forms';

export const Route = createFileRoute('/get-a-demo')({
  component: GetDemoPage,
  head: () => ({ meta: [{ title: 'Get a Demo — LeanWise AI' }] }),
});

function DemoForm() {
  const [data, setData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: 'CONNECT Mastery — full demo',
  });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  const set = (k: keyof typeof data, v: string) =>
    setData(d => ({ ...d, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrs: Record<string, string> = {};
    if (!data.name.trim()) newErrs.name = 'Required';
    if (!data.company.trim()) newErrs.company = 'Required';
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrs.email = 'Please enter a valid work email';
    if (Object.keys(newErrs).length) {
      setErrs(newErrs);
      return;
    }
    setErrs({});
    setPending(true);
    try {
      await submitDemo({ data });
      setDone(true);
    } catch (e: any) {
      setErrs({ form: e?.message || 'Something went wrong. Please try again.' });
    } finally {
      setPending(false);
    }
  };

  if (done) {
    return (
      <div className="form-card form-success">
        <div className="form-success-icon">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.6" />
            <path d="M6 11.5l3.2 3.2L16 7.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="h3">Demo request received.</h3>
        <p>
          Thanks {data.name}. We&apos;ll reach out to <strong>{data.email}</strong> within 1 business day to schedule.
        </p>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <div className="form-grid-2">
        <div className="field">
          <label>Full name <span className="req">*</span></label>
          <input className="input" value={data.name} onChange={e => set('name', e.target.value)} />
          {errs.name && <div className="field-error">{errs.name}</div>}
        </div>
        <div className="field">
          <label>Company <span className="req">*</span></label>
          <input className="input" value={data.company} onChange={e => set('company', e.target.value)} />
          {errs.company && <div className="field-error">{errs.company}</div>}
        </div>
      </div>
      <div className="form-grid-2">
        <div className="field">
          <label>Work email <span className="req">*</span></label>
          <input className="input" type="email" value={data.email} onChange={e => set('email', e.target.value)} />
          {errs.email && <div className="field-error">{errs.email}</div>}
        </div>
        <div className="field">
          <label>Phone</label>
          <input className="input" type="tel" value={data.phone} onChange={e => set('phone', e.target.value)} placeholder="Optional" />
        </div>
      </div>
      <div className="field">
        <label>What would you like to see?</label>
        <select
          className="select"
          value={data.interest}
          onChange={e => set('interest', e.target.value)}
        >
          <option>CONNECT Mastery — full demo</option>
          <option>CONNECT Mastery — TSS matching</option>
          <option>CONNECT Mastery — error detection</option>
          <option>SOP Mastery preview</option>
          <option>Operations Mastery preview</option>
          <option>Just exploring</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={pending}>
        {pending ? 'Sending…' : 'Request demo'}
      </button>
      {errs.form && <div className="field-error">{errs.form}</div>}
      <div className="form-trust">
        <span>✓</span> No credit card required &nbsp;·&nbsp; <span>✓</span> 30-min only &nbsp;·&nbsp; <span>✓</span> Secure
      </div>
    </form>
  );
}

function GetDemoPage() {
  return (
    <Page>
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <span className="pill pill-amber"><span className="dot"></span>30-min walkthrough</span>
              <h1 className="h1" style={{ marginTop: 16 }}>See CONNECT Mastery in Action</h1>
              <p className="lead">
                Fill in your details and we&apos;ll reach out to schedule a personalized walkthrough for your team.
              </p>
              <ol className="demo-process">
                <li>
                  <span className="mono small-mono">01</span>
                  <div><strong>We review your request</strong><span>within 1 business day</span></div>
                </li>
                <li>
                  <span className="mono small-mono">02</span>
                  <div><strong>30-minute live demo</strong><span>tailored to your workflow</span></div>
                </li>
                <li>
                  <span className="mono small-mono">03</span>
                  <div><strong>You decide if it&apos;s right</strong><span>no commitment required</span></div>
                </li>
              </ol>
              <div className="contact-info">
                <div>
                  <div className="mono small-mono">CAN&apos;T WAIT?</div>
                  <a href="mailto:support@leanwise.ai">support@leanwise.ai</a>
                </div>
              </div>
            </div>
            <DemoForm />
          </div>
        </div>
      </section>
    </Page>
  );
}
