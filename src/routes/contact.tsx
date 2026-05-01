import { useId, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Page } from '~/components/ui';
import { useI18n } from '~/i18n';
import { submitContact } from '~/server/forms';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({ meta: [{ title: 'Contact — LeanWise AI' }] }),
});

function ContactForm() {
  const { t } = useI18n();
  const ids = {
    firstName: useId(),
    lastName: useId(),
    email: useId(),
    company: useId(),
    message: useId(),
  };
  const [data, setData] = useState({ firstName: '', lastName: '', email: '', company: '', message: '' });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  const set = (k: keyof typeof data, v: string) => setData(d => ({ ...d, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrs: Record<string, string> = {};
    if (!data.firstName.trim()) newErrs.firstName = t('form.required');
    if (!data.lastName.trim()) newErrs.lastName = t('form.required');
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrs.email = t('form.email.invalid');
    if (!data.message.trim()) newErrs.message = t('form.message.required');
    if (Object.keys(newErrs).length) { setErrs(newErrs); return; }
    setErrs({});
    setPending(true);
    try {
      await submitContact({ data: { name: `${data.firstName} ${data.lastName}`, email: data.email, subject: data.company ? `[${data.company}]` : undefined, message: data.message } });
      setDone(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setErrs({ form: msg });
    } finally {
      setPending(false);
    }
  };

  if (done) {
    return (
      <div className="form-card form-success">
        <div className="form-success-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="h3">{t('contact.success.title')}</h3>
        <p>{t('contact.success.body')}</p>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <div className="form-grid-2">
        <div className="field">
          <label htmlFor={ids.firstName}>{t('contact.label.firstName')} <span className="req">*</span></label>
          <input id={ids.firstName} className="input" value={data.firstName} onChange={e => set('firstName', e.target.value)} />
          {errs.firstName && <div className="field-error">{errs.firstName}</div>}
        </div>
        <div className="field">
          <label htmlFor={ids.lastName}>{t('contact.label.lastName')} <span className="req">*</span></label>
          <input id={ids.lastName} className="input" value={data.lastName} onChange={e => set('lastName', e.target.value)} />
          {errs.lastName && <div className="field-error">{errs.lastName}</div>}
        </div>
      </div>
      <div className="field">
        <label htmlFor={ids.email}>{t('contact.label.email')} <span className="req">*</span></label>
        <input id={ids.email} className="input" type="email" value={data.email} onChange={e => set('email', e.target.value)} />
        {errs.email && <div className="field-error">{errs.email}</div>}
      </div>
      <div className="field">
        <label htmlFor={ids.company}>{t('contact.label.company')}</label>
        <input id={ids.company} className="input" value={data.company} onChange={e => set('company', e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor={ids.message}>{t('contact.label.message')} <span className="req">*</span></label>
        <textarea id={ids.message} className="textarea" rows={5} value={data.message} onChange={e => set('message', e.target.value)} />
        {errs.message && <div className="field-error">{errs.message}</div>}
      </div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={pending}>
        {pending ? t('contact.submit.pending') : t('contact.submit')}
      </button>
      {errs.form && <div className="field-error">{errs.form}</div>}
      <p className="form-trust">{t('contact.trust')}</p>
    </form>
  );
}

function ContactPage() {
  const { t } = useI18n();
  return (
    <Page>
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-col">
              <h1 className="h1">{t('contact.title')}</h1>
              <p className="lead">{t('contact.sub')}</p>
              <div className="contact-info">
                <div className="contact-detail">
                  <svg className="contact-detail-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <a href="mailto:hello@leanwise.ai">hello@leanwise.ai</a>
                    <div className="muted-text">{t('contact.response')}</div>
                  </div>
                </div>
                <div className="contact-detail">
                  <svg className="contact-detail-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                  <div>
                    <span>{t('contact.location')}</span>
                  </div>
                </div>
                <div className="contact-detail">
                  <svg className="contact-detail-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                  <div>
                    <a href="https://www.linkedin.com/company/leanwise-ai" target="_blank" rel="noopener noreferrer">LinkedIn →</a>
                  </div>
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
