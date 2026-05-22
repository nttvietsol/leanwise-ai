import { createFileRoute, Link } from '@tanstack/react-router';
import { TrustStrip } from '~/components/footer';
import { ResultStage } from '~/components/how-it-works';

export const Route = createFileRoute('/solutions/connect-mastery')({
  component: ConnectPage,
  head: () => ({
    meta: [
      { title: 'CONNECT Mastery — LeanWise AI' },
      {
        name: 'description',
        content:
          'Automate IKEA CONNECT document verification. Catch every critical error before the auditor does — in minutes, not hours.',
      },
    ],
  }),
});

const ANATOMY = [
  {
    num: 'STG.01',
    t: 'Ingest',
    b: 'Drop PDF / DOCX / XLSX. We parse text, tables, and embedded images. CONNECT spec auto-pinned to the latest version.',
  },
  {
    num: 'STG.02',
    t: 'Extract',
    b: 'Every requirement, every clause, every test parameter pulled into a structured graph. Typically 200–300 items per audit.',
  },
  {
    num: 'STG.03',
    t: 'Match',
    b: 'Semantic comparison against the live CONNECT spec. Ambiguities flagged with confidence scores — never silently accepted.',
  },
  {
    num: 'STG.04',
    t: 'Report',
    b: 'Line-level pass/fail with citations. Export PDF, push to your QMS, or trigger a re-check after fixes — all from the same screen.',
  },
];

const CAPABILITIES: [string, string, string, string][] = [
  ['CAP.01', 'Multi-document ingest', 'Parse PDFs, DOCX, XLSX, embedded tables and figures. Handles scanned docs via OCR.', 'PDF · DOCX · XLSX'],
  ['CAP.02', 'Semantic requirement matching', 'Goes beyond keyword search. Understands "rated load 80kg" equals "maximum static load 80 kilograms".', '99.2% accuracy'],
  ['CAP.03', 'CONNECT spec auto-pinning', 'Every audit references the live IKEA CONNECT spec. No more out-of-date PDFs floating around shared drives.', 'Live · v18'],
  ['CAP.04', 'Confidence-scored ambiguities', "When the AI isn't sure, it says so. Reviewers see a numeric confidence and the source citation, never a black box.", '0–100% scored'],
  ['CAP.05', 'Audit history & diff', 'Every audit is versioned. Compare two cycles side-by-side, see exactly what changed and when.', 'Diff · audit log'],
  ['CAP.06', 'Bilingual reports', 'Generated reports in English and Vietnamese — same content, dual-rendered, no manual translation.', 'EN · VI'],
  ['CAP.07', 'QMS push', "One-click export to your existing QMS (SAP QM, Veeva, custom REST). Doesn't replace your stack.", 'SAP · REST'],
  ['CAP.08', 'SOC 2 + on-prem option', "Cloud (default) or self-hosted on your infrastructure. Documents never leave your boundary if you don't want them to.", 'SOC2 · on-prem'],
];

const RESULTS = [
  { num: '75', unit: '%', lbl: 'Faster audit cycle', desc: '6h → 3min, measured' },
  { num: '99.2', unit: '%', lbl: 'Match accuracy', desc: 'vs human reviewer baseline' },
  { num: '0', unit: '', lbl: 'Failed audits Q1', desc: 'across 3 plants' },
  { num: '$48K', unit: '', lbl: 'Avg cost saved', desc: 'per plant per quarter' },
];

function ConnectPage() {
  return (
    <>
      {/* HERO */}
      <section className="lw-page-hero dark">
        <div className="lw-container">
          <div className="lw-page-hero-grid">
            <div>
              <div className="lw-eyebrow lw-reveal">MOD.01 · LIVE · Q1 2026</div>
              <h1 className="lw-h1 lw-reveal" data-d="1">
                CONNECT audits
                <br />
                in <em>3 minutes,</em>
                <br />
                not 6 hours.
              </h1>
              <p
                className="lw-lead lw-reveal"
                data-d="2"
                style={{ marginBottom: 32 }}
              >
                Drop your test plans, TSS files and CONNECT specs. Our AI
                cross-references every requirement against the latest IKEA spec —
                semantic matching, not keyword search. Get a pass/fail report with
                line-level detail before your coffee cools.
              </p>
              <div className="lw-hero-ctas lw-reveal" data-d="3">
                <Link to="/contact" className="lw-btn lw-btn-amber">
                  Book a live audit demo <span className="arrow">→</span>
                </Link>
                <a
                  href="#anatomy"
                  className="lw-btn lw-btn-ghost"
                  style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.24)' }}
                >
                  See how it works
                </a>
              </div>
              <div className="meta">
                <span>
                  <b>247/248</b> avg requirements verified
                </span>
                <span>
                  <b>2m 47s</b> median audit time
                </span>
                <span>
                  <b>0</b> failed audits · Q1 &rsquo;26
                </span>
              </div>
            </div>
            <div className="lw-reveal" data-d="2">
              <div className="lw-console" style={{ background: 'var(--paper)' }}>
                <header className="lw-console-h">
                  <div className="left">
                    <div className="lights">
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>
                    <span className="url">
                      app.leanwise.ai/connect/audit/1142
                    </span>
                  </div>
                  <span style={{ color: 'var(--ok)' }}>● PASS</span>
                </header>
                <div className="lw-console-body" style={{ padding: 0 }}>
                  <ResultStage />
                </div>
                <div className="lw-console-foot">
                  <span>AUDIT 2026-Q2-1142</span>
                  <span>NSF · TALIMEX</span>
                  <span>14:32 UTC+7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* ANATOMY OF AN AUDIT */}
      <section className="lw-section" id="anatomy">
        <div className="lw-container">
          <div className="lw-section-h lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                Anatomy · 04 stages
              </div>
              <h2 className="lw-h2">
                What an audit
                <br />
                looks like, end to end.
              </h2>
            </div>
            <p className="lw-lead">
              A real cycle, with no editorializing. The same flow we run for every
              IKEA-supplier plant on the platform.
            </p>
          </div>
          <div className="lw-features lw-reveal" style={{ marginTop: 48 }}>
            {ANATOMY.map((f) => (
              <div key={f.num} className="lw-feature">
                <div className="num">{f.num}</div>
                <h3>{f.t}</h3>
                <p>{f.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="lw-section" style={{ paddingTop: 0 }}>
        <div className="lw-container">
          <div className="lw-section-h lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                Capabilities · 08 items
              </div>
              <h2 className="lw-h2">What it actually does.</h2>
            </div>
            <p className="lw-lead">
              No marketing fluff. The eight capabilities that make a real
              difference in a quality engineer&apos;s day.
            </p>
          </div>
          <div className="lw-specs lw-reveal" style={{ marginTop: 40 }}>
            {CAPABILITIES.map(([id, n, d, m]) => (
              <div key={id} className="lw-spec-row">
                <span className="id">{id}</span>
                <span className="name">{n}</span>
                <span className="desc">{d}</span>
                <span className="meta">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULT STRIP */}
      <section
        className="lw-section"
        style={{
          background: 'var(--paper-2)',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="lw-container">
          <div className="lw-results-grid lw-reveal">
            {RESULTS.map((r) => (
              <div key={r.lbl} className="lw-results-cell">
                <div className="lbl">{r.lbl.toUpperCase()}</div>
                <div className="num">
                  <span className="a">{r.num}</span>
                  <span className="unit">{r.unit}</span>
                </div>
                <div className="desc">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lw-page-cta">
        <div className="lw-container">
          <div className="lw-page-cta-inner">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 12 }}>
                Live module · onboarding open
              </div>
              <h2>Run your next audit on CONNECT.</h2>
              <p>
                30-minute walkthrough on a real instance. Bring one of your audit
                document sets — we&apos;ll run it live, side-by-side with your
                current process.
              </p>
            </div>
            <div className="lw-page-cta-actions">
              <Link to="/contact" className="lw-btn lw-btn-primary">
                Book a demo <span className="arrow">→</span>
              </Link>
              <Link to="/pricing" className="lw-btn lw-btn-ghost">
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
