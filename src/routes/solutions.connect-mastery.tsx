import { createFileRoute, Link } from '@tanstack/react-router';
import { Page, SectionHeader } from '~/components/ui';
import { FinalCTA, ResultsStrip } from '~/components/final-cta';

export const Route = createFileRoute('/solutions/connect-mastery')({
  component: ConnectMasteryPage,
  head: () => ({
    meta: [
      { title: 'CONNECT Mastery — Eliminate Compliance Waste' },
      {
        name: 'description',
        content:
          'Automate IKEA CONNECT document verification. Catch every critical error before the auditor does — without the manual work.',
      },
    ],
  }),
});

function FeatureBlock({
  eyebrow,
  title,
  body,
  bullets,
  imgSrc,
  imgAlt,
  flip,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  imgSrc: string;
  imgAlt: string;
  flip?: boolean;
}) {
  return (
    <div className={`feat-block${flip ? ' feat-block--flip' : ''}`}>
      <figure className="feat-img">
        <img src={imgSrc} alt={imgAlt} loading="lazy" />
      </figure>
      <div className="feat-copy">
        <div className="feat-eyebrow mono">{eyebrow}</div>
        <h3 className="h2">{title}</h3>
        <p className="lead">{body}</p>
        <ul className="feat-list">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HowStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="step">
      <div className="step-num">{n}</div>
      <h3 className="step-title">{title}</h3>
      <p className="step-body">{body}</p>
    </div>
  );
}

function ConnectMasteryPage() {
  return (
    <Page>
      <section className="product-hero section">
        <div className="container">
          <span className="pill pill-ok">
            <span className="pill-dot" />
            Available Now
          </span>
          <h1 className="h1">
            <span className="ink-grad">Eliminate Compliance Waste</span>
          </h1>
          <p className="lead">
            CONNECT Mastery automates IKEA CONNECT compliance checks using AI. What takes your team
            4–6 hours now takes minutes — with higher accuracy than any manual process.
          </p>
          <div className="hero-ctas">
            <Link to="/get-a-demo" className="btn btn-primary btn-lg">
              Get a Demo
            </Link>
            <Link to="/contact" className="btn btn-ghost btn-lg">
              See it in Action
            </Link>
          </div>
          <div className="product-hero-trust">
            <img src="/assets/ngoc-son-logo.png" alt="Ngoc Son" loading="lazy" />
            <img src="/assets/sedo-logo.png" alt="Sedo" loading="lazy" />
            <img src="/assets/Talimex-logo.png" alt="Talimex" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="feat-blocks">
            <FeatureBlock
              eyebrow="Feature 01"
              title="AI-Powered Document Verification"
              body="Upload your factory documents and let our AI instantly cross-reference them against IKEA CONNECT requirements. No more manual page-by-page checking."
              bullets={[
                'Processes 50+ document types',
                'Catches mismatches humans miss',
                'Instant pass/fail report',
              ]}
              imgSrc="/assets/auto-check.png"
              imgAlt="AI document verification results"
            />
            <FeatureBlock
              eyebrow="Feature 02"
              title="TSS vs. Test Plan Matching"
              body="Automatically match Technical Specification Sheets against test plans. Our AI understands the semantic relationship between requirements — not just keyword matching."
              bullets={[
                'Semantic requirement matching',
                'Highlights specific discrepancies',
                'Exportable compliance report',
              ]}
              imgSrc="/assets/TSS-check.png"
              imgAlt="TSS vs test plan matching"
              flip
            />
            <FeatureBlock
              eyebrow="Feature 03"
              title="Cloud-Based Processing"
              body="No software to install. Upload documents from anywhere and get results in minutes. Your data is encrypted and never shared."
              bullets={[
                'Works from any device',
                '256-bit encryption',
                'Results in under 3 minutes',
              ]}
              imgSrc="/assets/cloud-process.png"
              imgAlt="Cloud-based processing"
            />
          </div>
        </div>
      </section>

      <ResultsStrip />

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Process"
            title="From upload to results in 3 steps"
            align="center"
          />
          <div className="how-steps">
            <HowStep
              n="01"
              title="Upload Documents"
              body="Drop your factory documents, test plans, or TSS files into the secure upload portal."
            />
            <HowStep
              n="02"
              title="AI Analysis"
              body="Our AI reads, understands, and cross-references every requirement in seconds."
            />
            <HowStep
              n="03"
              title="Review Results"
              body="Get a clear pass/fail report with specific discrepancies highlighted for your team to action."
            />
          </div>
        </div>
      </section>

      <FinalCTA
        title="Start your compliance transformation"
        sub="Join 4 factories already saving hours per audit cycle with CONNECT Mastery."
        primary="Get a Demo"
        secondary="Contact Us"
        secondaryTo="/contact"
      />
    </Page>
  );
}
