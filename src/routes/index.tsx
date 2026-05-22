import { createFileRoute, Link } from '@tanstack/react-router';
import { LiveTelemetry } from '~/components/live-telemetry';
import { ProductPicker } from '~/components/product-picker';
import { HowItWorks } from '~/components/how-it-works';
import { TrustStrip } from '~/components/footer';
import {
  CompactStatBanner,
  ScaleAnchors,
  BeforeAfter,
  ComparisonTable,
  QuoteRotator,
  ResourcesTeaser,
} from '~/components/optimizations';

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [
      { title: 'LeanWise AI — Operating system for lean factories' },
    ],
  }),
});

const RESULTS = [
  { num: '+8.2', unit: 'pts', lbl: 'OEE improvement', desc: 'vs Q4 2025 baseline' },
  { num: '−34', unit: '%', lbl: 'Downtime reduction', desc: 'unplanned stops · weekly avg' },
  { num: '75', unit: '%', lbl: 'Faster audit cycle', desc: 'minutes vs hours per cycle' },
  { num: '3.4', unit: '×', lbl: 'ROI · year one', desc: 'direct + indirect labor savings' },
];

function Home() {
  return (
    <>
      {/* HERO — distilled */}
      <section className="lw-hero">
        <div className="lw-container">
          <div className="lw-hero-grid">
            <div>
              <div className="lw-eyebrow lw-reveal">The platform</div>
              <h1 className="lw-h1 lw-reveal" data-d="1">
                The operating system
                <br />
                for <em>lean factories.</em>
              </h1>
              <p className="lw-lead lw-reveal" data-d="2">
                LeanWise AI replaces manual compliance checks, scattered SOPs, and
                end-of-day reports with one live operations layer — so plant
                managers spend their day on decisions, not paperwork.
              </p>
              <div className="lw-hero-ctas lw-reveal" data-d="3">
                <Link to="/contact" className="lw-btn lw-btn-primary">
                  Get a demo <span className="arrow">→</span>
                </Link>
                <a href="#platform" className="lw-btn lw-btn-ghost">
                  See the platform
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
              <LiveTelemetry />
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />
      <CompactStatBanner />

      {/* PROBLEM — visceral scale */}
      <section className="lw-section">
        <div className="lw-container">
          <div className="lw-section-h lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                The waste
              </div>
              <h2 className="lw-h2">
                Where lean factories
                <br />
                still bleed hours.
              </h2>
            </div>
            <p className="lw-lead">
              Three structural inefficiencies, measured at four HCMC plants. Each
              anchor below is a real cost — not an estimate.
            </p>
          </div>
          <div className="lw-reveal">
            <ScaleAnchors />
          </div>
        </div>
      </section>

      {/* PRODUCT PICKER */}
      <section className="lw-picker lw-section" id="platform">
        <div className="lw-container">
          <div className="lw-section-h lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                The platform
              </div>
              <h2 className="lw-h2">
                One platform.
                <br />
                Three AI modules.
              </h2>
            </div>
            <p className="lw-lead">
              Compliance, process, and live ops — every layer of manufacturing
              excellence. Click a module to see what it does.
            </p>
          </div>
          <div className="lw-reveal">
            <ProductPicker />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — with before/after */}
      <section className="lw-howit lw-section">
        <div className="lw-container">
          <div className="lw-section-h lw-reveal">
            <div>
              <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
                How it works
              </div>
              <h2 className="lw-h2">
                From upload to
                <br />
                shippable in minutes.
              </h2>
            </div>
            <p className="lw-lead">
              One audit cycle, two timelines. Same start, same end, same quality
              bar — measured at Talimex, Q1 2026.
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
              not pilot fluff. Real production lines, real shipments.
            </p>
          </div>
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
                Bring your factory
                <br />
                <em>online.</em>
              </h2>
              <p className="lw-lead">
                30-minute walkthrough. Real instance, your data, your questions.
                No slideware, no NDAs at the door.
              </p>
            </div>
            <div className="lw-cta-actions lw-reveal" data-d="1">
              <Link to="/contact" className="lw-btn lw-btn-amber lw-btn-lg">
                Get a demo <span className="arrow">→</span>
              </Link>
              <div className="lw-cta-links">
                <Link to="/contact">
                  Talk to founders <span className="arrow">→</span>
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
