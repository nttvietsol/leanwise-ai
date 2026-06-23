import { createFileRoute, Link } from '@tanstack/react-router';
import { TrustStrip } from '~/components/footer';
import { FeatureGrid, type Feature } from '~/components/feature-grid';
import { LiveValidation } from '~/components/live-validation';
import { ResultsGrid } from '~/components/optimizations';

export const Route = createFileRoute('/product')({
  component: ProductPage,
  head: () => ({
    meta: [
      { title: 'Product — IKEA CONNECT compliance validation · LeanWise AI' },
      {
        name: 'description',
        content:
          'Automate IKEA CONNECT document verification. LeanWise reads every compliance document — TR, SD, SDS, DS, GRS, SOC — extracts each requirement and validates it against the live CONNECT TSS spec. Catch every error before the auditor does.',
      },
    ],
  }),
});

const ANATOMY: Feature[] = [
  {
    num: 'STG.01',
    title: 'Ingest',
    body: 'Drop PDF / DOCX / XLSX. We parse text, tables, and embedded images — digital-first, with OCR fallback for scans. CONNECT spec auto-pinned to the latest version.',
  },
  {
    num: 'STG.02',
    title: 'Extract',
    body: 'Every requirement, every clause, every test parameter pulled into a structured graph. Typically 200–300 items per audit.',
  },
  {
    num: 'STG.03',
    title: 'Match',
    body: 'Semantic comparison against the live CONNECT spec. Ambiguities flagged with confidence scores — never silently accepted.',
  },
  {
    num: 'STG.04',
    title: 'Report',
    body: 'Line-level pass/fail with citations. Export PDF, push to your QMS, or trigger a re-check after fixes — all from the same screen.',
  },
];

/** The real document types the extraction engine handles, end to end. */
const DOC_TYPES: { code: string; name: string; body: string }[] = [
  { code: 'TR', name: 'Test Report', body: 'Lab results parsed clause-by-clause and matched to the required test parameters.' },
  { code: 'SD', name: 'Self-Declaration', body: 'Supplier declarations checked against the obligations the spec actually requires.' },
  { code: 'SDS', name: 'Safety Data Sheet', body: 'Substance and hazard data extracted and cross-referenced to restricted-substance limits.' },
  { code: 'DS', name: 'Declaration of Substances', body: 'Material composition validated against the CONNECT substance list, line by line.' },
  { code: 'GRS', name: 'Global Recycled Standard', body: 'Recycled-content certificates verified against the claimed percentages.' },
  { code: 'SOC', name: 'Statement of Compliance', body: 'Compliance statements reconciled with the underlying test and declaration evidence.' },
];

/** Capability rows: [id, name, description, meta]. */
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

const ROADMAP: { code: string; name: string; status: string; statusKind: string; body: string }[] = [
  {
    code: 'MOD.02',
    name: 'SOP Mastery',
    status: 'R&D · Q4 2026',
    statusKind: 'rd',
    body: 'Digitize and enforce standard operating procedures on the floor — capturing the tribal knowledge that walks out when a senior engineer retires.',
  },
  {
    code: 'MOD.03',
    name: 'Operations Mastery',
    status: 'Research · 2027',
    statusKind: 'rd',
    body: 'Live OEE, downtime, and decision support — the operating layer that turns a validated factory into a continuously optimized one.',
  },
];

function ProductPage() {
  return (
    <>
      {/* HERO */}
      <section className="lw-page-hero dark">
        <div className="lw-container">
          <div className="lw-page-hero-grid">
            <div>
              <div className="lw-eyebrow lw-reveal">
                Compliance validation · LIVE · Q1 2026
              </div>
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
                Drop your test reports, declarations, SDS and CONNECT specs. Our
                AI cross-references every requirement against the latest IKEA spec
                — semantic matching, not keyword search. Get a pass/fail report
                with line-level detail and a confidence score on every item,
                before your coffee cools.
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
              <LiveValidation />
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
          <FeatureGrid items={ANATOMY} />
        </div>
      </section>

      {/* DOCUMENT TYPES */}
      <section className="lw-section" style={{ paddingTop: 0 }}>
        <div className="lw-container">
          <div className="lw-section-h lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                Document types · 06
              </div>
              <h2 className="lw-h2">
                Every compliance document,
                <br />
                in one pass.
              </h2>
            </div>
            <p className="lw-lead">
              Not just test reports. LeanWise reads the whole evidence pack and
              reconciles it against the spec — so nothing slips through the gaps
              between documents.
            </p>
          </div>
          <div className="lw-doctypes lw-reveal">
            {DOC_TYPES.map((d) => (
              <div key={d.code} className="lw-card hover lw-doctype">
                <span className="code lw-mono">{d.code}</span>
                <h3 className="lw-h3">{d.name}</h3>
                <p>{d.body}</p>
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

      {/* TEST-PLAN GENERATION */}
      <section
        className="lw-section"
        style={{
          background: 'var(--paper-2)',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="lw-container">
          <div className="lw-section-h lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                Test-plan generation
              </div>
              <h2 className="lw-h2">
                From spec to test plan,
                <br />
                automatically.
              </h2>
            </div>
            <p className="lw-lead">
              The same engine, working the other direction. Hand LeanWise your
              material × spec matrix and it assembles the IKEA Internal-TSS test
              plan — full coverage, deterministic, ready to send to the lab. No
              more rebuilding the plan by hand for every new article.
            </p>
          </div>
        </div>
      </section>

      {/* RESULT STRIP */}
      <section className="lw-section">
        <div className="lw-container">
          <ResultsGrid />
        </div>
      </section>

      {/* ROADMAP — SOP + Operations, subordinate */}
      <section
        className="lw-section"
        id="roadmap"
        style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--line)' }}
      >
        <div className="lw-container">
          <div className="lw-section-h lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                The roadmap
              </div>
              <h2 className="lw-h2">
                CONNECT compliance
                <br />
                is step one.
              </h2>
            </div>
            <p className="lw-lead">
              Validation is the wedge. The destination is a full operating system
              for lean factories — built one shipped, proven module at a time.
            </p>
          </div>
          <div className="lw-roadmap-grid lw-reveal">
            {ROADMAP.map((m) => (
              <div key={m.code} className="lw-card lw-roadmap-card">
                <div className="lw-roadmap-card-h">
                  <span className="code lw-mono">{m.code}</span>
                  <span className={`lw-pill ${m.statusKind}`}>
                    <span className="dot"></span>
                    {m.status}
                  </span>
                </div>
                <h3 className="lw-h3">{m.name}</h3>
                <p>{m.body}</p>
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
              <h2>Run your next audit on LeanWise.</h2>
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
