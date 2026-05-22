import { createFileRoute, Link } from '@tanstack/react-router';
import { LiveTelemetry } from '~/components/live-telemetry';
import { TrustStrip } from '~/components/footer';
import { WaitlistForm } from '~/components/forms';

export const Route = createFileRoute('/solutions/operations-mastery')({
  component: OpsPage,
  head: () => ({
    meta: [
      { title: 'Operations Mastery — LeanWise AI' },
      {
        name: 'description',
        content:
          'A live nerve center for plant managers: real-time KPIs, AI decision alerts, and cross-module intelligence. In research with two partners.',
      },
    ],
  }),
});

const QUESTIONS = [
  {
    num: 'Q.01',
    t: 'What does a manager actually look at in 30 seconds?',
    b: 'We are shadowing shift handoffs at two plants. Early signal: managers ignore 80% of dashboards and look at 2 numbers + the alert feed. Designing for that, not for everything.',
  },
  {
    num: 'Q.02',
    t: 'When is an alert worth interrupting someone?',
    b: 'False positives are worse than missing a signal. We calibrate per-plant thresholds and use CONNECT/SOP context to suppress noise.',
  },
  {
    num: 'Q.03',
    t: 'How do you compare plants without lying with averages?',
    b: 'Cross-plant rollups hide the line that is bleeding. Working on segment-aware comparisons that respect product mix and shift pattern.',
  },
  {
    num: 'Q.04',
    t: 'What does "the right number of integrations" feel like?',
    b: 'Every plant has a different MES, ERP, and homemade Excel layer. We are standardizing on a thin ingest contract instead of N×N adapters.',
  },
];

function OpsPage() {
  return (
    <>
      <section className="lw-page-hero dark">
        <div className="lw-container">
          <div className="lw-page-hero-grid">
            <div>
              <div className="lw-eyebrow lw-reveal">
                MOD.03 · RESEARCH · 2027
              </div>
              <h1 className="lw-h1 lw-reveal" data-d="1">
                The 30 seconds
                <br />
                between <em>shifts.</em>
              </h1>
              <p
                className="lw-lead lw-reveal"
                data-d="2"
                style={{ marginBottom: 32 }}
              >
                A live nerve center for plant managers. Real-time KPIs across
                lines and plants, AI decision alerts before downtime hits,
                cross-module intelligence pulling signal from CONNECT and SOP.
                Currently in research with two design partners.
              </p>
              <div className="lw-hero-ctas lw-reveal" data-d="3">
                <Link to="/contact" className="lw-btn lw-btn-amber">
                  Become a research partner <span className="arrow">→</span>
                </Link>
                <a
                  href="#research"
                  className="lw-btn lw-btn-ghost"
                  style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.24)' }}
                >
                  What we&apos;re learning
                </a>
              </div>
              <div className="meta">
                <span>
                  <b>2027</b> · target pilot
                </span>
                <span>
                  <b>2 plants</b> · research partners
                </span>
                <span>
                  <b>3 modules</b> · cross-product signal
                </span>
              </div>
            </div>
            <div className="lw-reveal" data-d="2">
              <LiveTelemetry />
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="lw-section" id="research">
        <div className="lw-container">
          <div className="lw-section-h lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                Open questions · 04
              </div>
              <h2 className="lw-h2">
                What we&apos;re
                <br />
                still figuring out.
              </h2>
            </div>
            <p className="lw-lead">
              Operations Mastery is intentionally early. These are the real
              questions we&apos;re working through with our research partners — not
              marketing copy waiting for engineering.
            </p>
          </div>
          <div
            className="lw-features lw-reveal"
            style={{ marginTop: 48, gridTemplateColumns: 'repeat(2, 1fr)' }}
          >
            {QUESTIONS.map((f) => (
              <div key={f.num} className="lw-feature">
                <div className="num">{f.num}</div>
                <h3>{f.t}</h3>
                <p>{f.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lw-section" style={{ paddingTop: 0 }}>
        <div className="lw-container">
          <div className="lw-section-h lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                Roadmap · honest
              </div>
              <h2 className="lw-h2">2026 → 2027</h2>
            </div>
            <p className="lw-lead">
              A long horizon, on purpose. We&apos;d rather build it right than rush
              a half-baked dashboard layer.
            </p>
          </div>
          <div className="lw-roadmap lw-reveal" style={{ marginTop: 40 }}>
            <div className="lw-rm-cell now">
              <div className="q">2026 · H2</div>
              <span className="status">RESEARCH</span>
              <h4>Field study</h4>
              <ul>
                <li>Shift-handoff shadowing</li>
                <li>Alert calibration</li>
                <li>Ingest contract draft</li>
              </ul>
            </div>
            <div className="lw-rm-cell next">
              <div className="q">2027 · H1</div>
              <span className="status">PROTOTYPE</span>
              <h4>Live KPI core</h4>
              <ul>
                <li>Single-plant dashboard</li>
                <li>CONNECT/SOP signal in</li>
                <li>2 partner instances</li>
              </ul>
            </div>
            <div className="lw-rm-cell next">
              <div className="q">2027 · H2</div>
              <span className="status">PILOT</span>
              <h4>Cross-plant</h4>
              <ul>
                <li>Portfolio rollup</li>
                <li>AI decision alerts</li>
                <li>4 design partners</li>
              </ul>
            </div>
            <div className="lw-rm-cell next">
              <div className="q">2028+</div>
              <span className="status">GA</span>
              <h4>General release</h4>
              <ul>
                <li>Plans finalized</li>
                <li>Partner integrations</li>
                <li>SOC 2 / on-prem</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="lw-section">
        <div className="lw-container">
          <div className="lw-waitlist lw-reveal">
            <div>
              <div
                className="lw-eyebrow"
                style={{ color: 'var(--amber)', marginBottom: 12 }}
              >
                Research partners · 2 of 4
              </div>
              <h3>
                Help us
                <br />
                build it <em>right.</em>
              </h3>
              <p>
                Looking for two more IKEA-supplier plants to join the research
                cohort. Direct line to founders, free access through pilot, and
                real influence on what gets built — and what doesn&apos;t.
              </p>
            </div>
            <div>
              <WaitlistForm
                product="Operations Mastery"
                submitLabel="Apply as partner"
                fields={[
                  { key: 'name', label: 'Name', placeholder: 'Plant manager' },
                  { key: 'email', label: 'Work email', placeholder: 'you@plant.com' },
                  { key: 'company', label: 'Plant + lines', placeholder: 'e.g. CPC · 18 lines' },
                  { key: 'extra', label: 'Current ops stack', placeholder: 'MES / ERP / Excel' },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
