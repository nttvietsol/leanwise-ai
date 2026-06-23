import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/case-studies/talimex')({
  component: CaseTalimex,
  head: () => ({
    meta: [
      { title: 'Talimex case study — LeanWise AI' },
      {
        name: 'description',
        content:
          'From 6-hour audits to a 3-minute click. How Talimex ran a clean quarter of zero failed CONNECT cycles.',
      },
    ],
  }),
});

const HERO_STATS: { num: React.ReactNode; lbl: string; desc: string }[] = [
  {
    num: (
      <>
        <span className="a">−99</span>%
      </>
    ),
    lbl: 'Audit time',
    desc: '6h baseline → 3min average, measured across 47 cycles',
  },
  {
    num: <span className="a">0</span>,
    lbl: 'Failed audits Q1',
    desc: 'First clean quarter in two years of CONNECT submissions',
  },
  {
    num: (
      <>
        <span className="a">$184</span>K
      </>
    ),
    lbl: 'Saved · year one',
    desc: 'Direct labor + avoided audit-failure shipment delays',
  },
];

const FACTS: [string, string][] = [
  ['Customer', 'Talimex JSC'],
  ['Industry', 'Furniture · IKEA Tier-1 supplier'],
  ['Location', 'HCMC, Vietnam'],
  ['Plant size', '14 lines · 320 operators'],
  ['Module', 'CONNECT Mastery'],
  ['Live since', 'November 2025'],
];

function CaseTalimex() {
  return (
    <>
      <section className="lw-page-hero">
        <div className="lw-container">
          <div
            className="lw-reveal"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              marginBottom: 32,
            }}
          >
            <img
              src="/assets/Talimex-logo.png"
              alt="Talimex"
              style={{ height: 36 }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                color: 'var(--ink-4)',
              }}
            >
              CASE.01 · Q1 2026 · IKEA SUPPLIER · HCMC
            </span>
          </div>
          <h1 className="lw-h1 lw-reveal" data-d="1" style={{ maxWidth: 980 }}>
            From 6-hour audits to a
            <br />
            <em>3-minute click</em>. Zero
            <br />
            failed CONNECT cycles.
          </h1>
          <div className="lw-case-hero-stats lw-reveal" data-d="2">
            {HERO_STATS.map((stat) => (
              <div key={stat.lbl} className="lw-case-stat">
                <div className="num">{stat.num}</div>
                <div className="lbl">{stat.lbl}</div>
                <div className="desc">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lw-section">
        <div className="lw-container">
          <div className="lw-case-body lw-reveal">
            <aside>
              {FACTS.map(([label, value]) => (
                <div key={label} style={{ display: 'contents' }}>
                  <div className="label">{label}</div>
                  <div className="v">{value}</div>
                </div>
              ))}
              <Link
                to="/contact"
                className="lw-btn lw-btn-primary"
                style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}
              >
                Get a similar audit <span className="arrow">→</span>
              </Link>
            </aside>

            <article>
              <h3>The problem · 6 hours, every cycle</h3>
              <p>
                Talimex runs 14 lines producing IKEA furniture frames out of HCMC.
                Every shipment needs a CONNECT audit — a manual cross-reference of
                200+ requirements between the latest IKEA spec, the test plan, and
                the technical specification sheet (TSS). Their quality team had two
                engineers doing this by hand, six hours per cycle, sometimes
                back-to-back through the night before a deadline.
              </p>
              <p>
                Two compliance failures in 2025 froze shipments for three weeks
                each. The cost was not just the labor — it was the customer trust,
                the airfreight to recover, the engineers pulled off other
                improvement work to fight the fire.
              </p>

              <h3>What we changed</h3>
              <p>
                LeanWise AI deployed CONNECT Mastery in a 6-week onboarding
                starting October 2025. The pilot covered one product line; by week
                4 we extended to all 14. Critically, we did not replace the quality
                team — we replaced the manual cross-referencing they were doing.
                Engineers now spend their day on root cause analysis, not
                Ctrl-F-ing PDFs.
              </p>
              <blockquote>
                We replaced a 6-hour manual audit with a 3-minute AI check. Zero
                failed CONNECT audits this quarter — and our quality team finally
                gets to do quality work.
                <br />
                <span
                  style={{
                    display: 'block',
                    marginTop: 12,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    color: 'var(--ink-4)',
                    fontStyle: 'normal',
                  }}
                >
                  — PHAM QUOC ANH · HEAD OF QUALITY · TALIMEX
                </span>
              </blockquote>

              <h3>The result · Q1 2026</h3>
              <p>
                Across 47 audit cycles in Q1, average audit time dropped from 6
                hours to 3 minutes. Zero CONNECT audit failures — the first clean
                quarter in two years. Two quality engineers reallocated to defect
                root-cause investigation, which moved Talimex&apos;s defect rate
                from 0.61% to 0.38% in the same quarter. Year-one savings,
                including direct labor and avoided shipment delays, came in at
                $184K.
              </p>

              <h3>What is next</h3>
              <p>
                Talimex is one of two design partners for SOP Mastery, joining the
                Q4 2026 pilot. The same operator tablets running CONNECT today will
                surface the new visual SOPs at launch — same hardware, same login,
                new module.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="lw-page-cta">
        <div className="lw-container">
          <div className="lw-page-cta-inner">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 12 }}>
                Run your own pilot
              </div>
              <h2>
                Bring your audit set.
                <br />
                We&apos;ll run it live.
              </h2>
              <p>
                30-minute walkthrough on a real instance with one of your real
                audit document sets. See pass/fail at the line level — not a sales
                demo.
              </p>
            </div>
            <div className="lw-page-cta-actions">
              <Link to="/contact" className="lw-btn lw-btn-primary">
                Book a demo <span className="arrow">→</span>
              </Link>
              <Link to="/product" className="lw-btn lw-btn-ghost">
                Product details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
