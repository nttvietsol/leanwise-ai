import { createFileRoute, Link } from '@tanstack/react-router';
import { LiveValidation } from '~/components/live-validation';
import { HowItWorks } from '~/components/how-it-works';
import { TrustStrip } from '~/components/footer';
import {
  CompactStatBanner,
  ScaleAnchors,
  BeforeAfter,
  ComparisonTable,
  QuoteRotator,
  ResourcesTeaser,
  ResultsGrid,
} from '~/components/optimizations';

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [
      { title: 'LeanWise AI — IKEA CONNECT compliance audits in minutes' },
      {
        name: 'description',
        content:
          'LeanWise AI reads your test reports, declarations, SDS and GRS documents and validates every requirement against the live IKEA CONNECT TSS spec — with a confidence score on every line. Audits in 3 minutes, not 6 hours.',
      },
    ],
  }),
});

function Home() {
  return (
    <>
      {/* HERO — compliance-led */}
      <section className="lw-hero">
        <div className="lw-container">
          <div className="lw-hero-grid">
            <div>
              <div className="lw-eyebrow lw-reveal">Compliance validation · live</div>
              <h1 className="lw-h1 lw-reveal" data-d="1">
                IKEA CONNECT
                <br />
                compliance audits in{' '}
                <em>3 minutes,</em> not 6 hours.
              </h1>
              <p className="lw-lead lw-reveal" data-d="2">
                LeanWise AI reads your test reports, self-declarations, SDS and
                GRS documents, extracts every requirement, and cross-checks them
                against the live IKEA CONNECT TSS spec — with a confidence score
                on every line. Built with four IKEA-supplier plants in Vietnam.
              </p>
              <div className="lw-hero-ctas lw-reveal" data-d="3">
                <Link to="/contact" className="lw-btn lw-btn-primary">
                  Book a demo <span className="arrow">→</span>
                </Link>
                <a href="#how" className="lw-btn lw-btn-ghost">
                  See how it works
                </a>
              </div>
              <div className="lw-hero-meta lw-reveal" data-d="3">
                <span className="avatars">
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                </span>
                <span>Built with 4 IKEA-supplier plants in HCMC</span>
              </div>
            </div>
            <div className="lw-reveal" data-d="2">
              <LiveValidation />
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />
      <CompactStatBanner />

      {/* PROBLEM — the audit is where suppliers lose days */}
      <section className="lw-section">
        <div className="lw-container">
          <div className="lw-section-h lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                The problem
              </div>
              <h2 className="lw-h2">
                The compliance audit is
                <br />
                where suppliers lose days.
              </h2>
            </div>
            <p className="lw-lead">
              A single CONNECT audit means 200–300 items checked by hand against a
              spec that updates without notice. One miss is a failed audit and a
              stopped shipment. Each anchor below is a real cost — measured at four
              HCMC plants.
            </p>
          </div>
          <div className="lw-reveal">
            <ScaleAnchors />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — before/after + the audit flow */}
      <section className="lw-howit lw-section" id="how">
        <div className="lw-container">
          <div className="lw-section-h lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                How it works
              </div>
              <h2 className="lw-h2">
                From documents to a
                <br />
                signed-off audit in minutes.
              </h2>
            </div>
            <p className="lw-lead">
              Ingest → extract → match → report. One audit cycle, two timelines —
              same start, same end, same quality bar. Measured at Talimex, Q1 2026.
            </p>
          </div>
          <div className="lw-reveal" style={{ marginBottom: 64 }}>
            <BeforeAfter />
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* RESULTS */}
      <section className="lw-section">
        <div className="lw-container">
          <div className="lw-section-h lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                The proof
              </div>
              <h2 className="lw-h2">
                Three plants. One quarter.
                <br />
                Numbers that moved.
              </h2>
            </div>
            <p className="lw-lead">
              Measured against Q4 2025 baselines at IKEA-supplier plants in HCMC —
              not pilot fluff. Real audits, real shipments.
            </p>
          </div>
          <ResultsGrid />
          <p className="lw-results-foot lw-reveal">
            * Measured Q1 2026 vs Q4 2025 baseline · plant-internal audit at
            Talimex, CPC, Ngoc Son · independent third-party validation pending Q3
            2026 · n=3 plants, 12 production lines.
          </p>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="lw-section tight">
        <div className="lw-container">
          <div className="lw-section-h lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                The alternatives
              </div>
              <h2 className="lw-h2">How LeanWise compares.</h2>
            </div>
            <p className="lw-lead">
              If you&apos;ve already tried spreadsheets, ERP modules, or a custom
              MES build — here&apos;s the honest delta. Footnoted, no
              asterisk-tricks.
            </p>
          </div>
          <div className="lw-reveal">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* QUOTE ROTATOR */}
      <section className="lw-section tight">
        <div className="lw-container">
          <div className="lw-reveal">
            <QuoteRotator />
          </div>
        </div>
      </section>

      {/* ROADMAP TEASER — where this is going (subordinate) */}
      <section className="lw-section tight">
        <div className="lw-container">
          <div className="lw-roadmap-teaser lw-reveal">
            <div className="lw-eyebrow" style={{ marginBottom: 14 }}>
              The roadmap
            </div>
            <p className="lw-lead" style={{ maxWidth: '72ch' }}>
              Today, LeanWise validates CONNECT compliance. Next come{' '}
              <strong>SOP Mastery</strong> (R&amp;D, Q4 2026) and{' '}
              <strong>Operations Mastery</strong> (research, 2027) — the path from
              compliance to a full operating system for lean factories.{' '}
              <Link to="/product" hash="roadmap" className="lw-btn lw-btn-link">
                See the roadmap <span className="arrow">→</span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      <ResourcesTeaser />

      {/* CTA */}
      <section className="lw-cta lw-section">
        <div className="lw-container">
          <div className="lw-cta-inner">
            <div className="lw-reveal">
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                System ready
              </div>
              <h2>
                Run your next audit
                <br />
                <em>on LeanWise.</em>
              </h2>
              <p className="lw-lead">
                30-minute walkthrough. Real instance, your documents, your
                questions. No slideware, no NDAs at the door.
              </p>
            </div>
            <div className="lw-cta-actions lw-reveal" data-d="1">
              <Link to="/contact" className="lw-btn lw-btn-amber lw-btn-lg">
                Book a demo <span className="arrow">→</span>
              </Link>
              <div className="lw-cta-links">
                <Link to="/product">
                  Explore the product <span className="arrow">→</span>
                </Link>
                <span className="sep">·</span>
                <Link to="/pricing">
                  See pricing <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
