import { createFileRoute, Link } from '@tanstack/react-router';
import { TrustStrip } from '~/components/footer';

export const Route = createFileRoute('/company')({
  component: Company,
  head: () => ({
    meta: [
      { title: 'Company — LeanWise AI' },
      {
        name: 'description',
        content:
          'LeanWise AI is a Ho Chi Minh City company building compliance validation for IKEA-supplier plants in Vietnam — and, from there, the operating system for lean factories.',
      },
    ],
  }),
});

const VALUES = [
  {
    num: 'P.01',
    t: "Earn the operator's minute",
    b: 'A second on the floor is worth a hundred in a meeting room. If our UI takes more clicks than the old way, the old way wins. We earn every interaction.',
  },
  {
    num: 'P.02',
    t: 'Honest about uncertainty',
    b: 'AI that pretends to be certain is dangerous in a factory. Every match has a confidence score, every ambiguity gets flagged, and reviewers stay in the loop on the hard calls.',
  },
  {
    num: 'P.03',
    t: 'Bilingual day one',
    b: 'English-first products fail on Vietnamese floors. We build EN and VI side-by-side from the first wireframe — not as a translation layer six months later.',
  },
  {
    num: 'P.04',
    t: 'Lean before AI',
    b: 'AI without lean thinking is just expensive automation. We start by removing the waste, then apply AI to what is left. Same order, every time.',
  },
];

const TEAM = [
  {
    name: 'Nguyen Tien Dat',
    role: 'CEO · COFOUNDER',
    bio: '12 years in IKEA-supplier operations. Former plant director at a Tier-1 furniture supplier in Binh Duong. Lean Six Sigma Black Belt.',
  },
  {
    name: 'Le Minh Anh',
    role: 'CTO · COFOUNDER',
    bio: 'Ex-Grab AI platform. Led ML systems for fraud detection. Built the semantic matching engine behind CONNECT compliance validation.',
  },
  {
    name: 'Tran Van Khoa',
    role: 'COO · COFOUNDER',
    bio: '15 years in supply chain at Procter & Gamble Vietnam. Runs deployments, customer success, and the field team.',
  },
  {
    name: 'Pham Hoang Long',
    role: 'HEAD OF DESIGN',
    bio: 'Designer for two factory-floor product launches. Spent 200+ hours in audits before drawing a wireframe.',
  },
  {
    name: 'Vo Thi Mai',
    role: 'HEAD OF FIELD',
    bio: 'Quality engineer at NSF Vietnam, then Talimex. Knows what a CONNECT audit looks like at 3am before a deadline.',
  },
  {
    name: 'Bui Hai Nam',
    role: 'PRINCIPAL ENGINEER',
    bio: 'Backend systems at Tiki and Lazada. Owns the ingest pipeline and the plant-to-cloud sync layer.',
  },
];

function Company() {
  return (
    <>
      <section className="lw-page-hero">
        <div className="lw-container">
          <div style={{ maxWidth: 880 }} className="lw-reveal">
            <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
              Company · est. 2024 · HCMC
            </div>
            <h1 className="lw-h1">
              Built in the
              <br />
              same factories
              <br />
              we <em>serve.</em>
            </h1>
            <p className="lw-lead" style={{ marginTop: 32, fontSize: 18 }}>
              LeanWise AI is a Ho Chi Minh City company building compliance
              validation for IKEA-supplier plants in Vietnam — and, from there,
              the operating system for lean factories. We started by spending six
              months on the floor — not in slide decks — with quality engineers,
              line leads, and plant managers. Every feature still has to survive
              the test of someone in a high-vis vest using it on a Tuesday.
            </p>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="lw-section">
        <div className="lw-container">
          <div className="lw-section-h lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                Principles · 04
              </div>
              <h2 className="lw-h2">
                How we
                <br />
                build.
              </h2>
            </div>
            <p className="lw-lead">
              Four rules that guide every product decision. They came from the
              floor — not from a strategy offsite.
            </p>
          </div>
          <div className="lw-values lw-reveal" style={{ marginTop: 48 }}>
            {VALUES.map((v) => (
              <div key={v.num} className="lw-value">
                <div className="num">{v.num}</div>
                <h3>{v.t}</h3>
                <p>{v.b}</p>
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
                Team · founders
              </div>
              <h2 className="lw-h2">
                Manufacturing
                <br />+ AI in one room.
              </h2>
            </div>
            <p className="lw-lead">
              Three founders. Decades of factory floor between them. Currently 11
              people across HCMC and Singapore — engineering, design, and field
              support.
            </p>
          </div>
          <div className="lw-team lw-reveal" style={{ marginTop: 48 }}>
            {TEAM.map((p) => (
              <div key={p.name} className="lw-person">
                <div className="av"></div>
                <div className="name">{p.name}</div>
                <div className="role">{p.role}</div>
                <p>{p.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lw-page-cta">
        <div className="lw-container">
          <div className="lw-page-cta-inner">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 12 }}>
                Work with us
              </div>
              <h2>See the product on your factory floor.</h2>
              <p>
                A 30-minute walkthrough on a real instance, with one of your own
                audit document sets. We come prepared.
              </p>
            </div>
            <div className="lw-page-cta-actions">
              <Link to="/contact" className="lw-btn lw-btn-primary">
                Get a demo <span className="arrow">→</span>
              </Link>
              <Link to="/product" className="lw-btn lw-btn-ghost">
                Explore the product
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
