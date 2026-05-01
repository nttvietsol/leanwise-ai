import { createFileRoute, Link } from '@tanstack/react-router';
import { Page, SectionHeader } from '~/components/ui';
import { FinalCTA } from '~/components/final-cta';
import { WaitlistForm } from '~/components/waitlist-form';

export const Route = createFileRoute('/solutions/sop-mastery')({
  component: SopMasteryPage,
  head: () => ({ meta: [{ title: 'SOP Mastery — Optimize your processes' }] }),
});

function SopMasteryPage() {
  return (
    <Page>
      <section className="section coming-hero">
        <div className="container">
          <div className="coming-grid">
            <div className="coming-copy">
              <span className="pill">
                <span className="dot" style={{ background: 'var(--muted)', boxShadow: '0 0 0 3px var(--bg-3)' }}></span>
                R&amp;D · In development
              </span>
              <h1 className="h-display">SOP Mastery</h1>
              <div className="cm-tag" style={{ color: 'var(--ink-3)' }}>Optimize your processes</div>
              <p className="lead">
                Transform your SOPs into visual, interactive work instructions. Train faster, reduce mistakes, and build a factory that runs consistently.
              </p>
              <div className="hero-ctas">
                <a href="#waitlist" className="btn btn-dark btn-lg">Join Waitlist</a>
                <Link to="/contact" className="btn btn-ghost btn-lg">Talk to founders →</Link>
              </div>
            </div>
            <div className="coming-art">
              <div className="sop-mock">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="sop-step">
                    <div className="sop-step-n mono">0{i}</div>
                    <div className="sop-step-bar"><span style={{ width: `${30 + i * 15}%` }}></span></div>
                  </div>
                ))}
                <div className="sop-overlay">
                  <div className="mono">VISUAL SOP BUILDER · PREVIEW</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="waitlist">
        <div className="container coming-form-wrap">
          <SectionHeader
            eyebrow="Be first"
            title="Join the waitlist"
            sub="We'll reach out when SOP Mastery is ready for early customers — likely Q4 2026."
            align="center"
          />
          <WaitlistForm product="SOP Mastery" />
        </div>
      </section>

      <FinalCTA
        title="Curious about CONNECT Mastery instead?"
        sub="It's available today and saving factories 75% on document review."
        primary="See CONNECT Mastery"
        primaryTo="/solutions/connect-mastery"
      />
    </Page>
  );
}
