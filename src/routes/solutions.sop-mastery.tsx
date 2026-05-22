import { createFileRoute, Link } from '@tanstack/react-router';
import { TrustStrip } from '~/components/footer';
import { WaitlistForm } from '~/components/forms';

export const Route = createFileRoute('/solutions/sop-mastery')({
  component: SopPage,
  head: () => ({
    meta: [
      { title: 'SOP Mastery — LeanWise AI' },
      {
        name: 'description',
        content:
          'Visual, interactive work instructions on the factory floor. Train faster, reduce mistakes, run consistently shift after shift.',
      },
    ],
  }),
});

const HERO_STEPS = [
  { n: '01', t: 'Inspect frame for surface defects', m: '00:45' },
  { n: '02', t: 'Apply primer · 2 coats, 60s flash', m: '02:30' },
  { n: '03', t: 'Dry station · 110°C · 8 min', m: '08:00' },
  { n: '04', t: 'QC checkpoint · Talimex spec NSF-026', m: '01:15' },
  { n: '05', t: 'Stage for next line', m: '00:30' },
];

const CAPS = [
  { num: 'CAP.01', t: 'Visual SOP builder', b: 'Drag-drop steps, attach photos and short clips. No CMS training required — line leads can author directly.' },
  { num: 'CAP.02', t: 'Live versioning', b: 'Every approved change syncs to operator tablets in seconds. No more outdated PDFs printed last quarter.' },
  { num: 'CAP.03', t: 'Bilingual native', b: 'Author once in EN or VI, auto-render the other. Same content, side-by-side, on the same screen.' },
  { num: 'CAP.04', t: 'Operator training flow', b: 'Built-in checks confirm understanding before the operator runs unsupervised. Reduces ramp time week-one.' },
  { num: 'CAP.05', t: 'Floor analytics', b: 'See which steps take longest, which are skipped, where defects cluster. Data flows into Operations Mastery.' },
  { num: 'CAP.06', t: 'Offline-first', b: 'Tablets keep working through patchy WiFi. Sync queues and replays when the connection returns.' },
];

function SopPage() {
  return (
    <>
      <section className="lw-page-hero">
        <div className="lw-container">
          <div className="lw-page-hero-grid">
            <div>
              <div className="lw-eyebrow lw-reveal">MOD.02 · R&amp;D · Q4 2026</div>
              <h1 className="lw-h1 lw-reveal" data-d="1">
                Visual SOPs that
                <br />
                operators <em>actually use.</em>
              </h1>
              <p
                className="lw-lead lw-reveal"
                data-d="2"
                style={{ marginBottom: 32 }}
              >
                Replace 40-page PDFs with interactive, step-by-step work
                instructions on the floor. Built with operators, in Vietnamese and
                English, with live versioning so the SOP in their hands is always
                the latest one approved.
              </p>
              <div className="lw-hero-ctas lw-reveal" data-d="3">
                <a href="#waitlist" className="lw-btn lw-btn-primary">
                  Join the waitlist <span className="arrow">→</span>
                </a>
                <Link to="/contact" className="lw-btn lw-btn-ghost">
                  Talk to founders
                </Link>
              </div>
              <div className="meta">
                <span>
                  <b>Q4 2026</b> · pilot release
                </span>
                <span>
                  <b>2 plants</b> · co-design partners
                </span>
                <span>
                  <b>VI · EN</b> · day-one bilingual
                </span>
              </div>
            </div>
            <div className="lw-reveal" data-d="2">
              <div className="lw-console">
                <header className="lw-console-h">
                  <div className="left">
                    <div className="lights">
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>
                    <span className="url">app.leanwise.ai/sop/builder</span>
                  </div>
                  <span style={{ color: 'var(--ink-4)' }}>DRAFT v0.3</span>
                </header>
                <div
                  className="lw-console-body"
                  style={{ padding: '24px 28px', minHeight: 360 }}
                >
                  {HERO_STEPS.map((s, i) => (
                    <div
                      key={s.n}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '64px 1fr 80px',
                        gap: 16,
                        alignItems: 'center',
                        padding: '12px 0',
                        borderBottom: i === 4 ? 0 : '1px solid var(--line)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          letterSpacing: '0.14em',
                          color: 'var(--ink-4)',
                        }}
                      >
                        STEP {s.n}
                      </span>
                      <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>
                        {s.t}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          color: 'var(--ink-4)',
                          textAlign: 'right',
                        }}
                      >
                        {s.m}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="lw-console-foot">
                  <span>SOP-NSF-026-v0.3</span>
                  <span>5 STEPS · 13 MIN</span>
                  <span>EN / VI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="lw-section">
        <div className="lw-container">
          <div className="lw-section-h lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                Module · 06 capabilities
              </div>
              <h2 className="lw-h2">
                Designed with the
                <br />
                floor, for the floor.
              </h2>
            </div>
            <p className="lw-lead">
              Co-built with line leads at two IKEA-supplier plants. Pilot opens Q4
              2026 — first eight customers shape the roadmap.
            </p>
          </div>
          <div className="lw-features lw-reveal" style={{ marginTop: 48 }}>
            {CAPS.map((f) => (
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
                Roadmap · 04 quarters
              </div>
              <h2 className="lw-h2">
                Where we are.
                <br />
                What&apos;s next.
              </h2>
            </div>
            <p className="lw-lead">
              No promises we can&apos;t keep. The plan as it stands today, updated
              every sprint review.
            </p>
          </div>
          <div className="lw-roadmap lw-reveal" style={{ marginTop: 40 }}>
            <div className="lw-rm-cell done">
              <div className="q">Q1 · 2026</div>
              <span className="status">SHIPPED</span>
              <h4>Discovery</h4>
              <ul>
                <li>40+ floor interviews</li>
                <li>2 plant design partners</li>
                <li>Wireframe round 3</li>
              </ul>
            </div>
            <div className="lw-rm-cell done">
              <div className="q">Q2 · 2026</div>
              <span className="status">SHIPPED</span>
              <h4>Builder MVP</h4>
              <ul>
                <li>Step authoring</li>
                <li>Photo capture</li>
                <li>Versioning core</li>
              </ul>
            </div>
            <div className="lw-rm-cell now">
              <div className="q">Q3 · 2026</div>
              <span className="status">IN PROGRESS</span>
              <h4>Operator app</h4>
              <ul>
                <li>Tablet + offline</li>
                <li>Bilingual render</li>
                <li>Training checks</li>
              </ul>
            </div>
            <div className="lw-rm-cell next">
              <div className="q">Q4 · 2026</div>
              <span className="status">PILOT</span>
              <h4>First 8 customers</h4>
              <ul>
                <li>Floor analytics</li>
                <li>QMS hooks</li>
                <li>Public release</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="lw-section" id="waitlist">
        <div className="lw-container">
          <div className="lw-waitlist lw-reveal">
            <div>
              <div
                className="lw-eyebrow"
                style={{ color: 'var(--amber)', marginBottom: 12 }}
              >
                Waitlist · open
              </div>
              <h3>
                Pilot opens
                <br />
                <em>Q4 2026.</em>
              </h3>
              <p>
                First eight customers get founder-level access, free Q4–Q1, and
                direct input on the roadmap. We&apos;re picking partners by fit,
                not first-come.
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: 24,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                <span>
                  <b style={{ color: '#fff' }}>21</b> ON LIST
                </span>
                <span>
                  <b style={{ color: '#fff' }}>8</b> SLOTS
                </span>
                <span>
                  <b style={{ color: '#fff' }}>Q4 &rsquo;26</b> START
                </span>
              </div>
            </div>
            <div>
              <WaitlistForm
                product="SOP Mastery"
                submitLabel="Request pilot slot"
                fields={[
                  { key: 'name', label: 'Name', placeholder: 'Pham Quoc Anh' },
                  { key: 'email', label: 'Work email', placeholder: 'anh@talimex.com' },
                  { key: 'company', label: 'Plant / company', placeholder: 'Talimex · HCMC' },
                  { key: 'extra', label: 'Lines on site', placeholder: 'e.g. 12' },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
