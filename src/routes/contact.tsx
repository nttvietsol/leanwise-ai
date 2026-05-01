import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Page } from '~/components/ui';
import { submitContact } from '~/server/forms';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({ meta: [{ title: 'Contact — LeanWise AI' }] }),
});

function ContactForm() {
  const [data, setData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  const set = (k: keyof typeof data, v: string) =>
    setData(d => ({ ...d, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrs: Record<string, string> = {};
    if (!data.name.trim()) newErrs.name = 'Required';
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrs.email = 'Please enter a valid email';
    if (!data.message.trim()) newErrs.message = 'Tell us a bit about what you need';
    if (Object.keys(newErrs).length) {
      setErrs(newErrs);
      return;
    }
    setErrs({});
    setPending(true);
    try {
      await submitContact({ data });
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
        <h3 className="h3">Message sent.</h3>
        <p>
          Thanks {data.name}. We&apos;ll reply to <strong>{data.email}</strong> within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <div className="field">
        <label>Full name <span className="req">*</span></label>
        <input className="input" value={data.name} onChange={e => set('name', e.target.value)} />
        {errs.name && <div className="field-error">{errs.name}</div>}
      </div>
      <div className="field">
        <label>Email <span className="req">*</span></label>
        <input className="input" type="email" value={data.email} onChange={e => set('email', e.target.value)} />
        {errs.email && <div className="field-error">{errs.email}</div>}
      </div>
      <div className="field">
        <label>Subject</label>
        <input className="input" value={data.subject} onChange={e => set('subject', e.target.value)} placeholder="Optional" />
      </div>
      <div className="field">
        <label>Message <span className="req">*</span></label>
        <textarea className="textarea" value={data.message} onChange={e => set('message', e.target.value)} />
        {errs.message && <div className="field-error">{errs.message}</div>}
      </div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={pending}>
        {pending ? 'Sending…' : 'Send message'}
      </button>
      {errs.form && <div className="field-error">{errs.form}</div>}
    </form>
  );
}

function ContactPage() {
  return (
    <Page>
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <h1 className="h1">Talk to Our Team</h1>
              <p className="lead">
                Have a question, a partnership idea, or just want to learn more? We&apos;d love to hear from you.
              </p>
              <div className="contact-info">
                <div>
                  <div className="mono small-mono">EMAIL</div>
                  <a href="mailto:support@leanwise.ai">support@leanwise.ai</a>
                  <div className="muted-text">Reply within 1 business day</div>
                </div>
                <div>
                  <div className="mono small-mono">LOCATION</div>
                  <div>Ho Chi Minh City, Vietnam</div>
                  <div className="muted-text">Serving factories across Southeast Asia</div>
                </div>
                <div>
                  <div className="mono small-mono">SOCIAL</div>
                  <a href="#">LinkedIn →</a>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </Page>
  );
}
