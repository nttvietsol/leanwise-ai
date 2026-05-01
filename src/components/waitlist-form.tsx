import { useState } from 'react';
import { joinWaitlist } from '~/server/forms';

export function WaitlistForm({ product }: { product: string }) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');
  const [pending, setPending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr('Please enter a valid email.');
      return;
    }
    setErr('');
    setPending(true);
    try {
      await joinWaitlist({ data: { email, company, product } });
      setDone(true);
    } catch {
      setErr('Something went wrong. Please try again.');
    } finally {
      setPending(false);
    }
  };

  if (done) {
    return (
      <div className="form-success">
        <div className="form-success-icon">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.6" />
            <path d="M6 11.5l3.2 3.2L16 7.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="h3">You&apos;re on the list.</h3>
        <p>We&apos;ll email <strong>{email}</strong> with updates. Talk soon.</p>
      </div>
    );
  }

  return (
    <form className="waitlist-form" onSubmit={submit} noValidate>
      <div className="field">
        <label>Work email <span className="req">*</span></label>
        <input
          className="input"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@factory.com"
        />
      </div>
      <div className="field">
        <label>Company</label>
        <input
          className="input"
          value={company}
          onChange={e => setCompany(e.target.value)}
          placeholder="Your factory"
        />
      </div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={pending}>
        {pending ? 'Joining…' : 'Join waitlist'}
      </button>
      {err && (
        <div className="field-error" style={{ gridColumn: '1 / -1' }}>
          {err}
        </div>
      )}
    </form>
  );
}
