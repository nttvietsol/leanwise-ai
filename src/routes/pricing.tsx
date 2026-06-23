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

type Plan = {
  lbl: string;
  name: string;
  price: React.ReactNode;
  desc: string;
  features: React.ReactNode[];
  featured?: boolean;
  cta: { label: string; variant: 'ghost' | 'amber' };
};

const PLANS: Plan[] = [
  {
    lbl: 'PLAN.01',
    name: 'Starter',
    price: (
      <>
        Contact<span className="unit">us for pricing</span>
      </>
    ),
    desc: 'For a single plant getting started with CONNECT audits.',
    features: [
      'CONNECT Mastery (full)',
      'Up to 50 audits / month',
      '2 connected systems',
      'Standard SLA · 99.5%',
      'Email support · business hours',
    ],
    cta: { label: 'Talk to sales', variant: 'ghost' },
  },
  {
    lbl: 'PLAN.02',
    name: 'Plant',
    price: (
      <>
        Contact<span className="unit">us for pricing</span>
      </>
    ),
    desc: 'For plants running CONNECT audits and piloting SOP.',
    features: [
      'Everything in Starter',
      'Unlimited audits',
      <>SOP Mastery early access (Q4 &rsquo;26)</>,
      'Bilingual reports · EN / VI',
      'Premium SLA · 99.9%',
      'Slack channel · founder access',
    ],
    featured: true,
    cta: { label: 'Book a demo', variant: 'amber' },
  },
  {
    lbl: 'PLAN.03',
    name: 'Portfolio',
    price: (
      <>
        Contact<span className="unit">5+ plants</span>
      </>
    ),
    desc: 'For multi-plant operators and contract-manufacturer groups.',
    features: [
      'Everything in Plant',
      'Operations Mastery research access',
      'SOC 2 + on-prem deployment',
      'Cross-plant rollups',
      'Dedicated solutions engineer',
      <>Custom integrations &amp; SLAs</>,
    ],
    cta: { label: 'Talk to founders', variant: 'ghost' },
  },
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
            {PLANS.map((plan) => (
              <div
                key={plan.lbl}
                className={plan.featured ? 'lw-price featured' : 'lw-price'}
              >
                {plan.featured && <span className="ribbon">MOST PICKED</span>}
                <div className="lbl">{plan.lbl}</div>
                <h3>{plan.name}</h3>
                <div className="price">{plan.price}</div>
                <div className="desc">{plan.desc}</div>
                <ul>
                  {plan.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`lw-btn lw-btn-${plan.cta.variant}`}
                  style={{ justifyContent: 'center', marginTop: 'auto' }}
                >
                  {plan.cta.label} <span className="arrow">→</span>
                </Link>
              </div>
            ))}
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
