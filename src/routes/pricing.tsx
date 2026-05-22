import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/pricing')({
  component: Pricing,
  head: () => ({
    meta: [
      { title: 'Pricing — LeanWise AI' },
      {
        name: 'description',
        content:
          'Priced per plant, not per seat. One plant, one price, unlimited operators and engineers.',
      },
    ],
  }),
});

const COMPARE: string[][] = [
  ['CONNECT audits / mo', '50', 'Unlimited', 'Unlimited'],
  ['SOP Mastery', '—', 'Early access', 'Early access'],
  ['Operations Mastery', '—', '—', 'Research access'],
  ['Bilingual EN/VI', 'Yes', 'Yes', 'Yes'],
  ['Connected systems', '2', 'Unlimited', 'Unlimited'],
  ['SOC 2 / on-prem', '—', 'SOC 2', 'SOC 2 + on-prem'],
  ['SLA', '99.5%', '99.9%', '99.95% custom'],
  ['Support', 'Email', 'Slack + email', 'Dedicated SE'],
];

const FAQ: [string, string][] = [
  [
    'What counts as a "plant"?',
    'A single physical manufacturing site. If you run two facilities in HCMC, that is two plants.',
  ],
  [
    'Can I switch plans?',
    'Yes, any time. We pro-rate the difference. No annual lock-in punishment.',
  ],
  [
    'Do you offer pilot terms?',
    'Yes — discounted pilot terms for design partners. Talk to founders.',
  ],
  [
    'Where is data stored?',
    'Singapore (default) or your own cloud / on-prem on Portfolio plan. Documents never leave your boundary if you choose.',
  ],
];

function Pricing() {
  return (
    <>
      <section className="lw-page-hero">
        <div className="lw-container">
          <div style={{ maxWidth: 760 }} className="lw-reveal">
            <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
              Pricing · per plant
            </div>
            <h1 className="lw-h1">
              Priced per plant.
              <br />
              Not per <em>seat.</em>
            </h1>
            <p className="lw-lead" style={{ marginTop: 24 }}>
              Quality engineers shouldn&apos;t pay per head to use better tools.
              One plant, one price, unlimited operators and engineers. Volume
              pricing for portfolios of 5+ plants.
            </p>
          </div>
        </div>
      </section>

      <section className="lw-section">
        <div className="lw-container">
          <div className="lw-price-grid lw-reveal">
            <div className="lw-price">
              <div className="lbl">PLAN.01</div>
              <h3>Starter</h3>
              <div className="price">
                Contact<span className="unit">us for pricing</span>
              </div>
              <div className="desc">
                For a single plant getting started with CONNECT audits.
              </div>
              <ul>
                <li>CONNECT Mastery (full)</li>
                <li>Up to 50 audits / month</li>
                <li>2 connected systems</li>
                <li>Standard SLA · 99.5%</li>
                <li>Email support · business hours</li>
              </ul>
              <Link
                to="/contact"
                className="lw-btn lw-btn-ghost"
                style={{ justifyContent: 'center', marginTop: 'auto' }}
              >
                Talk to sales <span className="arrow">→</span>
              </Link>
            </div>

            <div className="lw-price featured">
              <span className="ribbon">MOST PICKED</span>
              <div className="lbl">PLAN.02</div>
              <h3>Plant</h3>
              <div className="price">
                Contact<span className="unit">us for pricing</span>
              </div>
              <div className="desc">
                For plants running CONNECT audits and piloting SOP.
              </div>
              <ul>
                <li>Everything in Starter</li>
                <li>Unlimited audits</li>
                <li>SOP Mastery early access (Q4 &rsquo;26)</li>
                <li>Bilingual reports · EN / VI</li>
                <li>Premium SLA · 99.9%</li>
                <li>Slack channel · founder access</li>
              </ul>
              <Link
                to="/contact"
                className="lw-btn lw-btn-amber"
                style={{ justifyContent: 'center', marginTop: 'auto' }}
              >
                Book a demo <span className="arrow">→</span>
              </Link>
            </div>

            <div className="lw-price">
              <div className="lbl">PLAN.03</div>
              <h3>Portfolio</h3>
              <div className="price">
                Contact<span className="unit">5+ plants</span>
              </div>
              <div className="desc">
                For multi-plant operators and contract-manufacturer groups.
              </div>
              <ul>
                <li>Everything in Plant</li>
                <li>Operations Mastery research access</li>
                <li>SOC 2 + on-prem deployment</li>
                <li>Cross-plant rollups</li>
                <li>Dedicated solutions engineer</li>
                <li>Custom integrations &amp; SLAs</li>
              </ul>
              <Link
                to="/contact"
                className="lw-btn lw-btn-ghost"
                style={{ justifyContent: 'center', marginTop: 'auto' }}
              >
                Talk to founders <span className="arrow">→</span>
              </Link>
            </div>
          </div>

          <div className="lw-compare lw-reveal" style={{ marginTop: 64 }}>
            <div className="lw-compare-row h">
              <div>Capability</div>
              <div>Starter</div>
              <div>Plant</div>
              <div>Portfolio</div>
            </div>
            {COMPARE.map((row, i) => (
              <div key={i} className="lw-compare-row">
                <div className="feat">{row[0]}</div>
                {row.slice(1).map((c, j) => (
                  <div key={j} className={c === '—' ? 'no' : 'yes'}>
                    {c}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 64,
              padding: 32,
              background: 'var(--paper-2)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--r-3)',
            }}
            className="lw-reveal"
          >
            <div className="lw-eyebrow" style={{ marginBottom: 12 }}>
              FAQ · 04 questions
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 32,
              }}
            >
              {FAQ.map(([q, a]) => (
                <div key={q}>
                  <div
                    style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}
                  >
                    {q}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: 'var(--ink-3)',
                      lineHeight: 1.6,
                    }}
                  >
                    {a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
