import { createFileRoute, Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';
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
  num, title, body, bullets, art, reverse,
}: {
  num: string;
  title: string;
  body: string;
  bullets: string[];
  art: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className={`feature-block ${reverse ? 'is-reverse' : ''}`}>
      <div className="feature-copy">
        <div className="feature-num mono">Feature {num}</div>
        <h3 className="h2">{title}</h3>
        <p className="lead">{body}</p>
        <ul className="feature-bullets">
          {bullets.map((b, i) => (
            <li key={i}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
                <path d="M5 8.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className="feature-art">{art}</div>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="step-card">
      <div className="step-n mono">{n}</div>
      <h3 className="h3">{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function Quote({ text, attr, sub }: { text: string; attr: string; sub: string }) {
  return (
    <figure className="quote-card">
      <svg width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden="true">
        <path d="M0 22V12C0 5.4 4.5 0 12 0v4C7.6 4 5 7.6 5 12h5v10H0zm16 0V12C16 5.4 20.5 0 28 0v4c-4.4 0-7 3.6-7 8h5v10H16z" fill="currentColor" opacity=".15" />
      </svg>
      <blockquote>{text}</blockquote>
      <figcaption>
        <strong>{attr}</strong>
        <span>{sub}</span>
      </figcaption>
    </figure>
  );
}

function ConnectMasteryPage() {
  return (
    <Page>
      <section className="cm-hero section">
        <div className="container cm-hero-grid">
          <div className="cm-hero-copy">
            <span className="pill pill-amber"><span className="dot"></span>Available now</span>
            <h1 className="h-display">CONNECT Mastery</h1>
            <div className="cm-tag">Eliminate Compliance Waste</div>
            <p className="lead">
              Automate CONNECT document verification. Catch every critical error before the auditor does — without the manual work.
            </p>
            <div className="hero-ctas">
              <Link to="/get-a-demo" className="btn btn-primary btn-lg">Get a Demo</Link>
              <Link to="/contact" className="btn btn-ghost btn-lg">Try Free for 1 Batch →</Link>
            </div>
          </div>
          <div className="cm-hero-art">
            <figure className="product-shot">
              <img
                src="/assets/dashboard-preview-2.png"
                alt="CONNECT Mastery — document review with PDF extraction and validation pipeline"
                loading="eager"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Key features"
            title="Three jobs CONNECT Mastery does for you"
            align="center"
          />
          <div className="features-list">
            <FeatureBlock
              num="01"
              title="Catch the Errors That Actually Fail Audits."
              body="CONNECT documents have hundreds of fields — but not all of them carry the same risk. CONNECT Mastery System focuses where it matters most: critical and major checkpoints, plus the specific fields that repeatedly cause rejections in real IKEA audits. For document types where full verification is possible, every field is checked."
              bullets={[
                'Critical & major checkpoint verification — the failures that cost you shipments',
                'Real-world error patterns built from actual CONNECT audit experience',
                'Full field verification for supported document types — partial for complex standards',
              ]}
              art={
                <figure className="product-shot">
                  <img src="/assets/auto-check.png" alt="CONNECT Mastery validation results" loading="lazy" />
                </figure>
              }
            />
            <FeatureBlock
              num="02"
              reverse
              title="Every Requirement in Your TSS — Covered and Verified."
              body="You've already downloaded your Test Status Summary from IKEA's CONNECT system — it's your compliance baseline. Simply upload it to CONNECT Mastery System, and we'll automatically map every requirement in your TSS against your Test Plan and submitted documents, instantly surfacing anything that's missing or mismatched."
              bullets={[
                'Critical & major requirement matching — the gaps auditors look for first',
                'Built around common mismatch patterns from real CONNECT submissions',
                "Clear gap report showing exactly what's missing before you submit",
              ]}
              art={
                <figure className="product-shot">
                  <img src="/assets/TSS-check.png" alt="TSS validation heatmap" loading="lazy" />
                </figure>
              }
            />
            <FeatureBlock
              num="03"
              title="One Click. Walk Away. Results Waiting."
              body="Hit 'Process All' and let the cloud handle the rest. CONNECT Mastery System runs your full compliance check — document verification and TSS matching — entirely in the background. Close your laptop, shut the app, step away. Results will be ready on any device when you return."
              bullets={[
                'Full compliance check runs on cloud — no open tabs, no waiting required',
                'Document verification + TSS matching processed simultaneously',
                'Results on any device with internet connection',
              ]}
              art={
                <figure className="product-shot product-shot-bleed">
                  <img src="/assets/cloud-process.png" alt="Cloud processing — Process All" loading="lazy" />
                </figure>
              }
            />
          </div>
        </div>
      </section>

      <ResultsStrip />

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="How it works"
            title="Up and Running in 2 Weeks"
            sub="Simple onboarding process — no complex IT integration required"
            align="center"
          />
          <div className="steps-grid">
            <Step n="01" title="Book Demo" body="30-minute call to see CONNECT Mastery in action with your own documents" />
            <Step n="02" title="1 Week Setup" body="Quick onboarding and training for your team — ready to use in days" />
            <Step n="03" title="Start Saving Time" body="Immediately reduce check time by 75% and eliminate errors" />
          </div>
          <div className="steps-note">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7 4v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            No ERP integration needed. Browser only. Any device. Works with your existing CONNECT workflow.
          </div>
        </div>
      </section>

      <section className="section testimonial-sec">
        <div className="container">
          <SectionHeader
            eyebrow="What customers say"
            title="From CONNECT leaders on the floor"
            align="center"
          />
          <div className="testimonial-grid">
            <Quote
              text="Saving a lot of time — what used to take our team a full afternoon now takes under an hour."
              attr="CONNECT Leader"
              sub="IKEA Supplier Factory, Vietnam"
            />
            <Quote
              text="Thank you — it found the correct issue that we had missed in our manual review."
              attr="CONNECT User"
              sub="Quality Assurance Team"
            />
            <Quote
              text="The software runs correctly and catches errors we didn't even know were there."
              attr="CONNECT User"
              sub="Compliance Officer"
            />
          </div>
        </div>
      </section>

      <FinalCTA
        title="Ready to Master CONNECT?"
        sub="Try with 1 document batch for free. No credit card required."
        primary="Book a Demo"
        secondary="Try Free for 1 Batch"
        secondaryTo="/contact"
      />
      <div className="trust-badges-strip container">
        <div className="trust-badge"><span>✓</span>No credit card needed</div>
        <div className="trust-badge"><span>✓</span>2 weeks to full deployment</div>
        <div className="trust-badge"><span>✓</span>Secure & compliant</div>
      </div>
    </Page>
  );
}
