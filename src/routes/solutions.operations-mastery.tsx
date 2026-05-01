import { createFileRoute, Link } from '@tanstack/react-router';
import { Page, SectionHeader } from '~/components/ui';
import { WaitlistForm } from '~/components/waitlist-form';

export const Route = createFileRoute('/solutions/operations-mastery')({
  component: OperationsMasteryPage,
  head: () => ({ meta: [{ title: 'Operations Mastery — Boost operational performance' }] }),
});

function OperationsMasteryPage() {
  return (
    <Page>
      <section className="section coming-hero">
        <div className="container">
          <div className="coming-grid">
            <div className="coming-copy">
              <span className="pill">
                <span className="dot" style={{ background: 'var(--muted)', boxShadow: '0 0 0 3px var(--bg-3)' }}></span>
                R&amp;D · Research
              </span>
              <h1 className="h-display">Operations Mastery</h1>
              <div className="cm-tag" style={{ color: 'var(--ink-3)' }}>Boost operational performance</div>
              <p className="lead">
                Real-time factory dashboards for instant decisions. Give your Plant Managers and leadership team the clarity they need — when they need it.
              </p>
              <div className="hero-ctas">
                <a href="#waitlist" className="btn btn-dark btn-lg">Follow Research</a>
                <Link to="/contact" className="btn btn-ghost btn-lg">Talk to us →</Link>
              </div>
            </div>
            <div className="coming-art">
              <div className="ops-mock">
                <div className="ops-mock-h">
                  <div className="mono small-mono">PLANT · LIVE</div>
                  <div className="mono">14:32</div>
                </div>
                <div className="ops-mock-grid">
                  <div className="ops-tile"><div className="mono small-mono">OEE</div><strong>87%</strong><div className="ops-spark"></div></div>
                  <div className="ops-tile"><div className="mono small-mono">DEFECTS</div><strong>0.4%</strong><div className="ops-spark down"></div></div>
                  <div className="ops-tile"><div className="mono small-mono">THRUPUT</div><strong>1,240</strong><div className="ops-spark"></div></div>
                  <div className="ops-tile"><div className="mono small-mono">DOWNTIME</div><strong>12m</strong><div className="ops-spark down"></div></div>
                </div>
                <div className="sop-overlay"><div className="mono">REAL-TIME OPS · PREVIEW</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="waitlist">
        <div className="container coming-form-wrap">
          <SectionHeader
            eyebrow="Stay in the loop"
            title="Follow our research"
            sub="Periodic updates on what we're building. No spam."
            align="center"
          />
          <WaitlistForm product="Operations Mastery" />
        </div>
      </section>
    </Page>
  );
}
