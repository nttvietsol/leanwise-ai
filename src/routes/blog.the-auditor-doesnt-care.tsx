import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/the-auditor-doesnt-care')({
  component: BlogPost,
  head: () => ({
    meta: [
      { title: "The auditor doesn't care that you tried — LeanWise AI" },
      {
        name: 'description',
        content:
          'A meditation on outcome-based quality systems for IKEA-supplier plants — and why "process compliance" is the wrong metric to optimize for in 2026.',
      },
    ],
  }),
});

const RELATED = [
  {
    cat: 'METHOD',
    date: '2026·01·15',
    read: '8 MIN',
    author: 'Trần Minh',
    title: 'The cost of a 5-day audit cycle (and the math on cutting it to 6 hours).',
    dek: 'Per-shift labor, lost OEE, scrap from delayed change-control. The hidden tax of slow conformance.',
  },
  {
    cat: 'METHOD',
    date: '2026·01·30',
    read: '9 MIN',
    author: 'Nguyễn Hoa',
    title: 'Mistake-proofing for paper-based plants: 7 patterns we steal from Toyota.',
    dek: "Poka-yoke wasn't designed for tablets. Here's how we map it onto SOPs that exist on a clipboard today.",
  },
  {
    cat: 'CASE',
    date: '2026·02·08',
    read: '6 MIN',
    author: 'Talimex Q',
    title: 'How Talimex eliminated 11 of 12 NSF audit findings in one quarter.',
    dek: 'A line-by-line breakdown of the September 2025 NSF audit and what changed before December.',
  },
];

function BlogPost() {
  return (
    <>
      {/* HERO */}
      <section className="lw-article-hero">
        <div className="lw-container" style={{ maxWidth: 920 }}>
          <div className="topmeta lw-reveal">
            <Link to="/resources" style={{ color: 'var(--ink-4)' }}>
              ← Resources
            </Link>
            <span className="cat">ESSAY</span>
            <span>2026·02·14</span>
            <span>12 MIN READ</span>
            <span>FILED UNDER · QUALITY · NSF · AUDIT</span>
          </div>
          <h1 className="lw-reveal">
            The auditor doesn&apos;t care that you tried.
          </h1>
          <p className="lead lw-reveal">
            A meditation on outcome-based quality systems for IKEA-supplier plants
            — and why &ldquo;process compliance&rdquo; is the wrong metric to
            optimize for in 2026.
          </p>
          <div className="by lw-reveal">
            <div className="av"></div>
            <div>
              <div className="name">Trần Minh Đức</div>
              <div className="role">FIELD OPS · LEANWISE AI</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <button
                className="lw-btn lw-btn-ghost"
                style={{ padding: '8px 14px', fontSize: 12 }}
              >
                Share
              </button>
              <button
                className="lw-btn lw-btn-ghost"
                style={{ padding: '8px 14px', fontSize: 12 }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <div className="lw-container">
        <div className="lw-article-body">
          <aside className="sticky">
            <div className="label">In this essay</div>
            <ol>
              <li>The Tuesday morning problem</li>
              <li>&ldquo;Process compliance&rdquo; is a liability</li>
              <li>What outcome-based looks like</li>
              <li>Three patterns that work</li>
              <li>What we got wrong</li>
              <li>The math, briefly</li>
              <li>Where this goes next</li>
            </ol>
            <div className="label" style={{ marginTop: 32 }}>
              Related
            </div>
            <ol style={{ counterReset: 'rel' }}>
              <li>The cost of a 5-day audit cycle</li>
              <li>Mistake-proofing for paper plants</li>
              <li>Hiring quality engineers in 2026</li>
            </ol>
          </aside>

          <article className="lw-reveal">
            <p>
              Last September I sat in a 3.5-hour closing meeting at a Tier-1 IKEA
              furniture supplier outside Bình Dương. Twelve major findings. Three
              of them — by my count — were not the plant&apos;s fault in any
              reasonable reading. They were the consequence of the IKEA-1138-NSF
              spec being revised eighteen times in fourteen months, with no
              version-control discipline on either side. The plant had been
              running on revision 14. The auditor was checking against revision
              18.
            </p>

            <p>
              The plant manager — a 22-year veteran, the kind of operator who can
              hear a press going out of tolerance from across the floor — opened
              his binder, showed the auditor the signed-off rev-14 procedure, and
              said, in clear if accented English: &ldquo;We followed the
              procedure. We have evidence. We trained the operators. We did
              everything you asked.&rdquo;
            </p>

            <p className="pull">
              The auditor took out his pen, said &ldquo;I understand,&rdquo; and
              then wrote up the finding anyway. Because the auditor doesn&apos;t
              care that you tried. The auditor cares whether the part conforms.
            </p>

            <h2>1 · &ldquo;Process compliance&rdquo; is a liability</h2>

            <p>
              Most quality systems in factories like this one — and there are
              several thousand of them in Vietnam alone — were architected around
              a single, unstated assumption:
              <em>
                {' '}
                if we follow the documented process, the output will be acceptable
              </em>
              . This is the foundational logic of ISO 9001, of every quality
              manual I have ever read, and of approximately 80% of the SOPs
              sitting in three-ring binders on shop-floor desks in this country
              right now.
            </p>

            <p>
              This assumption is wrong. Not in a philosophical sense — wrong
              operationally. It was wrong even in 1987 when ISO 9001 was first
              published, but it was less wrong then, because the rate at which
              downstream specifications changed was an order of magnitude slower
              than it is today. A spec might be revised once a year. Today, on the
              IKEA supplier programs we work with, the average is 1.3 revisions
              per month per active spec, and the median time between revisions for
              high-velocity programs is under 17 days.
            </p>

            <p>
              Process compliance is not a strategy in that environment. It is a
              slow-moving liability. By the time your operators have been
              retrained on revision 14, your customer is shipping you revision 16,
              and your auditor will arrive carrying revision 18.
            </p>

            <h3>What we mean by &ldquo;outcome-based&rdquo;</h3>

            <p>
              An outcome-based quality system optimizes a different objective:{' '}
              <em>
                the part that left the dock conforms to the version of the spec
                the customer holds you to, on the day of the audit, with traceable
                evidence of conformance for every operation that touched it
              </em>
              .
            </p>

            <p>That is a long sentence. Read it again. Specifically, three properties:</p>

            <ul>
              <li>
                The version is determined by the customer, not by your release
                calendar.
              </li>
              <li>Conformance is evidenced per-operation, not per-procedure.</li>
              <li>
                The audit window is &ldquo;today,&rdquo; not &ldquo;the most
                recent quarterly internal review.&rdquo;
              </li>
            </ul>

            <p>
              A quality system organized around process compliance can be airtight
              on all three procedural questions and still fail an outcome audit.
              We see this constantly. Roughly 60% of major non-conformities we
              triage in the first 90 days of a CONNECT deployment are not
              procedure failures — they are spec-version drift between what the
              plant ran and what the customer held them to.
            </p>

            <h2>2 · Three patterns that work</h2>

            <p>
              Here are the three architectural patterns that, in our deployments
              to date, have most consistently moved a plant from &ldquo;process
              compliant&rdquo; to &ldquo;outcome compliant.&rdquo; None of these
              are novel. We did not invent them. We saw them work, repeatedly, and
              standardized on them.
            </p>

            <h3>2.1 — Version-pinned routings</h3>

            <p>
              Every routing — the document that tells an operator what to do — is
              pinned to a specific version of the upstream customer spec. When the
              customer publishes a new revision, the routing does not auto-update.
              Instead, the system creates a candidate routing, surfaces the deltas
              that are operationally meaningful (a tolerance change, a material
              substitution, a new test requirement), and routes it for review. The
              active routing on the floor never silently changes underneath an
              operator. Period.
            </p>

            <pre>
<span className="com">// CONNECT routing object — simplified</span>
{`{
  "routing_id": "RTG-A2391",
  "active_revision": "v14.2",
  "pinned_to_spec": {
    "spec": "IKEA-1138-NSF",
    "revision": "rev-14",
    "received_at": "2026-01-08T09:14:00+07:00",
    "checksum": "0xA8F3..."
  },
  "candidate_revision": "v15.0",
  "candidate_pinned_to": "rev-18",
  "delta_count": `}<span className="num">23</span>{`,
  "review_state": "AWAITING_QE_SIGN_OFF"
}`}
            </pre>

            <h3>2.2 — Per-operation evidence, not per-shift</h3>

            <p>
              The second pattern is more boring and more valuable. Capture evidence
              — measurement, photo, signature, sensor read — at the operation, not
              at the end of the shift. End-of-shift capture is a write-only audit
              trail. It tells you nothing actionable, and it falls apart the moment
              an auditor asks &ldquo;show me the dimensional check on serial
              #19284.&rdquo;
            </p>

            <figure>
              <div className="ph">
                FIG · 02 — Per-op evidence capture · CONNECT screenshot placeholder
              </div>
              <figcaption>
                FIG 02 · CONNECT operator console — per-operation evidence capture
                in production
              </figcaption>
            </figure>

            <h3>2.3 — Continuous internal audit, not quarterly</h3>

            <p>
              Quarterly internal audits are theatre. They satisfy the requirement
              in your quality manual that says &ldquo;internal audits shall be
              conducted at planned intervals,&rdquo; and they do nothing to surface
              real conformance drift. The plants we work with that pass NSF audits
              in two-thirds the industry-typical time all share one practice: they
              run a rolling internal audit, every working day, with a randomized
              sample of in-process and finished parts, and they treat the findings
              exactly the way they would treat customer findings.
            </p>

            <blockquote>
              &ldquo;We don&apos;t have an audit season anymore. The audit is just
              every Tuesday.&rdquo; — Plant manager, anonymized, three months into
              deployment.
            </blockquote>

            <h2>3 · What we got wrong</h2>

            <p>
              In our first six deployments — late 2024 through mid-2025 — we made
              one significant architectural mistake. We let CONNECT auto-acknowledge
              new spec revisions on the customer side as soon as they landed, on
              the assumption that operators would notice the new routing in the
              queue and route it correctly. They did not, consistently. We saw a
              brief regression where plants on CONNECT had <em>worse</em>{' '}
              first-pass yields than plants on paper, because the system was
              creating a false sense of currency. The routing on the floor was
              rev-14. The system said &ldquo;you&apos;re current.&rdquo; The
              customer was on rev-15. The plant believed the system.
            </p>

            <p>
              We changed it. New revisions land in a quarantine state, surface a
              hard interrupt at the QE workstation, and require an explicit
              sign-off before any operator-facing surface reflects the change. The
              first 90 days after that change, plants on CONNECT beat their
              pre-deployment baselines by 11–18% on first-pass yield. The mistake
              was ours, the lesson was real.
            </p>

            <h2>4 · The math, briefly</h2>

            <p>
              A back-of-envelope on why this matters financially, for a typical
              Tier-1 IKEA furniture supplier (≈ 200-person plant, $24M annual
              revenue, 4–6% scrap-and-rework cost as a share of COGS):
            </p>

            <ul>
              <li>
                One major NSF non-conformity, by our customer data, costs
                $42K–$190K to remediate (CAPA, retraining, re-audit, sometimes
                external consulting).
              </li>
              <li>
                The &ldquo;average&rdquo; plant we observe carries 8–14 open major
                findings at any given time across all customer audits.
              </li>
              <li>
                A 50% reduction in major-findings backlog, sustained for 12
                months, is a $400K–$1.3M operating-cost recovery.
              </li>
            </ul>

            <p>
              This is before you consider the upside on retained customer
              programs, which for a Tier-1 IKEA supplier is the ballgame.
            </p>

            <h2>5 · Where this goes next</h2>

            <p>
              The next 18 months are about closing the loop between CONNECT (today:
              spec-to-floor for live deployments) and SOP (in R&amp;D: digitized
              standard work), so that a spec revision from the customer side flows
              automatically into a candidate routing
              <em> and</em> a candidate updated SOP, both pinned to the same
              upstream version, both reviewed in the same workflow.
            </p>

            <p>
              We have a working prototype on two pilot lines. It is not ready. When
              it is, we&apos;ll publish the playbook here.
            </p>

            <p
              style={{
                color: 'var(--ink-4)',
                fontSize: 14,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.06em',
                marginTop: 56,
                paddingTop: 32,
                borderTop: '1px solid var(--line)',
              }}
            >
              Thanks to Lê Quang Hùng, Nguyễn Thị Hoa, and the QE team at Talimex
              for reviewing drafts of this essay. Mistakes are mine. — TMD
            </p>
          </article>

          <aside className="sticky">
            <div className="label">Author</div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                marginTop: 12,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, var(--paper-3), var(--paper-4))',
                  border: '1px solid var(--line)',
                }}
              ></div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--ink)',
                    letterSpacing: '-0.005em',
                    textTransform: 'none',
                  }}
                >
                  Trần Minh Đức
                </div>
                <div style={{ marginTop: 4 }}>FIELD OPS LEAD</div>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    color: 'var(--ink-3)',
                    letterSpacing: 0,
                    textTransform: 'none',
                    lineHeight: 1.55,
                    marginTop: 12,
                  }}
                >
                  14 years in furniture and consumer-goods QA. Previously head of
                  quality at two IKEA Tier-1 plants in Bình Dương and Đồng Nai.
                </p>
              </div>
            </div>

            <div className="label" style={{ marginTop: 32 }}>
              Cite this essay
            </div>
            <div
              style={{
                marginTop: 8,
                padding: 12,
                background: 'var(--paper-2)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--r-2)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--ink-2)',
                letterSpacing: 0,
                textTransform: 'none',
                lineHeight: 1.5,
              }}
            >
              Trần, M. (2026). <i>The auditor doesn&apos;t care that you tried.</i>{' '}
              LeanWise AI Field Notes.
            </div>

            <div className="label" style={{ marginTop: 32 }}>
              Discuss
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--ink-3)',
                letterSpacing: 0,
                textTransform: 'none',
                lineHeight: 1.55,
              }}
            >
              Reply at{' '}
              <a
                href="mailto:notes@leanwise.ai"
                style={{ color: 'var(--ink)', borderBottom: '1px solid var(--ink)' }}
              >
                notes@leanwise.ai
              </a>{' '}
              — we read everything, signal &gt; noise.
            </div>
          </aside>
        </div>
      </div>

      {/* RELATED */}
      <section className="lw-related">
        <div className="lw-container">
          <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
            Continue reading
          </div>
          <h3>Related field notes</h3>
          <div className="lw-post-grid lw-reveal" style={{ marginTop: 8 }}>
            {RELATED.map((p, i) => (
              <Link to="/resources" key={i} className="lw-post">
                <div className="topmeta">
                  <span className="cat">{p.cat}</span>
                  <span>{p.date}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.dek}</p>
                <div className="by">
                  <span className="name">{p.author}</span>
                  <span>{p.read}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
