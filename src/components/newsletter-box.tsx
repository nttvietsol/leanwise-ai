import { useState } from 'react';
import { subscribeNewsletter } from '~/server/forms';

export function NewsletterBox() {
  const [email, setEmail] = useState('');
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
      await subscribeNewsletter({ data: { email } });
      setDone(true);
    } catch {
      setErr('Something went wrong. Please try again.');
    } finally {
      setPending(false);
    }
  };

  if (done) {
    return (
      <div className="newsletter-box newsletter-done">
        <div className="form-success-icon" style={{ width: 40, height: 40 }}>
          <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.6" />
            <path d="M6 11.5l3.2 3.2L16 7.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <strong>Subscribed.</strong>
        <span>We&apos;ll send the next post your way.</span>
      </div>
    );
  }

  return (
    <form className="newsletter-box" onSubmit={submit}>
      <div className="newsletter-h">
        <div className="mono small-mono">NEWSLETTER</div>
        <strong>One email a month. No fluff.</strong>
        <span>Lean + AI tactics for factory leaders.</span>
      </div>
      <div className="newsletter-row">
        <input
          className="input"
          type="email"
          placeholder="you@factory.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="btn btn-dark" type="submit" disabled={pending}>
          {pending ? '…' : 'Subscribe'}
        </button>
      </div>
      {err && <div className="field-error">{err}</div>}
    </form>
  );
}
