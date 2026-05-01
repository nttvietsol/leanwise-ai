import { createFileRoute } from '@tanstack/react-router';
import { Page, SectionHeader } from '~/components/ui';
import { FinalCTA } from '~/components/final-cta';

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => ({ meta: [{ title: 'About — LeanWise AI' }] }),
});

function ValueCard({ num, name, body }: { num: string; name: string; body: string }) {
  return (
    <div className="value-card">
      <div className="value-num mono">{num}</div>
      <h3 className="h3">{name}</h3>
      <p>{body}</p>
    </div>
  );
}

function FounderCard({
  name, role, initials, bullets, hue,
}: {
  name: string;
  role: string;
  initials: string;
  bullets: string[];
  hue: number;
}) {
  return (
    <div className="founder-card">
      <div className="founder-photo" style={{ ['--hue' as any]: hue }}>
        <div className="founder-photo-grad"></div>
        <div className="founder-initials">{initials}</div>
        <div className="founder-photo-meta mono">photo · 1:1</div>
      </div>
      <div className="founder-info">
        <div className="founder-role mono">{role}</div>
        <h3 className="founder-name">{name}</h3>
        <ul className="founder-bullets">
          {bullets.map((b, i) => (
            <li key={i}>
              <span className="bullet-dot"></span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <Page>
      <section className="section about-origin">
        <div className="container">
          <div className="about-origin-grid">
            <div className="about-origin-copy">
              <div className="eyebrow">Where we come from</div>
              <h1 className="h-display">
                10+ Years.<br />Thousands of Hours.<br />
                <span className="ink-grad">One Mission.</span>
              </h1>
              <div className="about-origin-paras">
                <p className="lead">
                  Over more than 10 years working directly with IKEA suppliers, we saw that improving quality, optimizing delivery, and reducing costs are always top priorities for factories. To get there, automation and lean manufacturing have been the go-to choices.
                </p>
                <p className="lead">
                  Now, with AI, factories can go even further — working not just more efficiently, but more intelligently. LeanWise AI was founded with the mission to combine the power of AI and Lean Manufacturing principles to eliminate waste, optimize processes, and boost tangible productivity for manufacturing plants.
                </p>
              </div>
            </div>
            <div className="vision-card">
              <div className="vision-bg" aria-hidden="true"></div>
              <div className="vision-inner">
                <div className="eyebrow" style={{ color: 'var(--accent)' }}>Our vision</div>
                <p className="vision-text">
                  To become a trusted partner in enabling <strong>1,000+ smart factories</strong> — where AI technology and Lean thinking operate in harmony to achieve maximum efficiency.
                </p>
                <div className="vision-meta">
                  <div><strong>1,000+</strong><span>Target factories</span></div>
                  <div><strong>SEA</strong><span>Initial focus</span></div>
                  <div><strong>2026</strong><span>Founded</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section values-sec">
        <div className="container">
          <SectionHeader
            eyebrow="What we stand for"
            title="The Values We Truly Believe In"
            sub="These aren't just words on a wall — they guide every decision we make and every product we build."
            align="center"
          />
          <div className="values-grid">
            <ValueCard
              num="01"
              name="Integrity"
              body="Trust is the foundation of any lasting relationship. We keep our word, stay consistent between what we say and what we do, and hold ourselves to the highest standards of legal and ethical conduct — because we believe this is how sustainable partnerships are built."
            />
            <ValueCard
              num="02"
              name="Continuous Improvement"
              body="Rooted in the Lean Manufacturing philosophy, we are committed to continuously improving — making our products better, more practical, and more valuable for our customers, our partners, and ourselves."
            />
            <ValueCard
              num="03"
              name="Responsibility"
              body="We take full responsibility for the quality of every product and service we deliver. We also choose to use our time and energy with care and intention."
            />
            <ValueCard
              num="04"
              name="Collaboration"
              body="We work towards win-win outcomes for everyone involved and support one another along the way."
            />
          </div>
        </div>
      </section>

      <section className="section team-sec">
        <div className="container">
          <SectionHeader eyebrow="Founding team" title="The People Behind LeanWise AI" align="center" />
          <div className="team-grid">
            <FounderCard
              name="Truong Xuan Truong"
              role="Founder & CEO"
              initials="TX"
              hue={180}
              bullets={[
                '10+ years as a Senior Production Engineer — led projects with a team of 20+ specialists across 8 countries in the IKEA supply chain',
                'Directly resolved hundreds of CONNECT compliance issues — with deep understanding from both the factory and the IKEA side',
                'Architect of CONNECT Mastery System — built from real problems he personally experienced on the factory floor',
              ]}
            />
            <FounderCard
              name="Nguyen Thanh Trung"
              role="Co-Founder & CTO"
              initials="NT"
              hue={220}
              bullets={[
                '15+ years in engineering — including 5+ years specializing in AI, automation, and digitalization in manufacturing environments',
                'Senior leader who managed a team of 25+ engineers and delivered 15+ enterprise-level automation projects at Bosch',
                'Proven that AI drives real financial results — €1.2M+ in annual savings achieved at Bosch through AI-powered solutions',
              ]}
            />
          </div>
        </div>
      </section>

      <FinalCTA />
    </Page>
  );
}
