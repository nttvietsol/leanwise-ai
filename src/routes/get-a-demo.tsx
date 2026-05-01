import { useId, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Page } from '~/components/ui';
import { useI18n } from '~/i18n';
import { submitDemo } from '~/server/forms';

export const Route = createFileRoute('/get-a-demo')({
  component: GetDemoPage,
  head: () => ({ meta: [{ title: 'Get a Demo — LeanWise AI' }] }),
});

function DemoForm() {
  const { t } = useI18n();
  const ids = {
    firstName: useId(),
    lastName: useId(),
    email: useId(),
    company: useId(),
    role: useId(),
    factories: useId(),
    message: useId(),
  };
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    factories: '',
    message: '',
  });
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
    if (!data.company.trim()) newErrs.company = t('form.required');
    if (Object.keys(newErrs).length) { setErrs(newErrs); return; }
    setErrs({});
    setPending(true);
    try {
      await submitDemo({
        data: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          company: data.company,
          interest: data.role || undefined,
          message: data.factories ? `Factories: ${data.factories}${data.message ? `\n${data.message}` : ''}` : data.message || undefined,
        },
      });
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
        <h3 className="h3">{t('demo.success.title')}</h3>
        <p>{t('demo.success.body')}</p>
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
        <label htmlFor={ids.company}>{t('contact.label.company')} <span className="req">*</span></label>
        <input id={ids.company} className="input" value={data.company} onChange={e => set('company', e.target.value)} />
        {errs.company && <div className="field-error">{errs.company}</div>}
      </div>
      <div className="form-grid-2">
        <div className="field">
          <label htmlFor={ids.role}>{t('demo.label.role')}</label>
          <select id={ids.role} className="select" value={data.role} onChange={e => set('role', e.target.value)}>
            <option value="">{t('demo.label.role.placeholder')}</option>
            <option>{t('demo.label.role.qm')}</option>
            <option>{t('demo.label.role.pm')}</option>
            <option>{t('demo.label.role.coo')}</option>
            <option>{t('demo.label.role.other')}</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor={ids.factories}>{t('demo.label.factories')}</label>
          <select id={ids.factories} className="select" value={data.factories} onChange={e => set('factories', e.target.value)}>
            <option value="">{t('demo.label.factories.placeholder')}</option>
            <option>1</option>
            <option>2–5</option>
            <option>6–10</option>
            <option>10+</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor={ids.message}>{t('contact.label.message')}</label>
        <textarea id={ids.message} className="textarea" rows={4} value={data.message} onChange={e => set('message', e.target.value)} placeholder={t('demo.label.message.ph')} />
      </div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={pending}>
        {pending ? t('demo.submit.pending') : t('demo.submit')}
      </button>
      {errs.form && <div className="field-error">{errs.form}</div>}
      <p className="form-trust">{t('contact.trust')}</p>
    </form>
  );
}

const DEMO_STEPS = [1, 2, 3] as const;

function GetDemoPage() {
  const { t } = useI18n();
  return (
    <Page>
      <section className="section">
        <div className="container">
          <h1 className="h1">{t('demo.title')}</h1>
          <p className="lead" style={{ maxWidth: 560, marginTop: 8 }}>{t('demo.sub')}</p>

          <div className="demo-steps">
            {DEMO_STEPS.map(n => (
              <div key={n} className="demo-step">
                <div className="demo-step-num">0{n}</div>
                <strong>{t(`demo.step.${n}.title`)}</strong>
                <span className="muted-text">{t(`demo.step.${n}.body`)}</span>
              </div>
            ))}
          </div>

          <div className="contact-grid" style={{ marginTop: 48 }}>
            <div className="contact-info-col">
              <p className="lead">{t('demo.form.intro')}</p>
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
              </div>
            </div>
            <DemoForm />
          </div>
        </div>
      </section>
    </Page>
  );
}
