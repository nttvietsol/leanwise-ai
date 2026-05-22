import { createFileRoute } from '@tanstack/react-router';
import { ContactForm } from '~/components/forms';

export const Route = createFileRoute('/contact')({
  component: Contact,
  head: () => ({
    meta: [
      { title: 'Contact — LeanWise AI' },
      {
        name: 'description',
        content:
          '30-minute walkthrough on a real instance, your data, your questions. You will be on a call with a founder.',
      },
    ],
  }),
});

function Contact() {
  return (
    <>
      <section className="lw-page-hero">
        <div className="lw-container">
          <div style={{ maxWidth: 760 }} className="lw-reveal">
            <div className="lw-eyebrow" style={{ marginBottom: 16 }}>
              Contact · founders
            </div>
            <h1 className="lw-h1">
              Bring your audit.
              <br />
              We&apos;ll run it <em>live.</em>
            </h1>
            <p className="lw-lead" style={{ marginTop: 24 }}>
              30-minute walkthrough on a real instance, your data, your questions.
              No NDA at the door, no slideware, no junior sales rep. You will be on
              a call with a founder.
            </p>
          </div>
        </div>
      </section>

      <section className="lw-section">
        <div className="lw-container">
          <div className="lw-contact-grid lw-reveal">
            <ContactForm />

            <div className="lw-contact-side">
              <div className="lw-contact-card">
                <div className="lbl">Direct line · founders</div>
                <div className="big">
                  Skip the form. Email a founder directly.
                </div>
                <div style={{ marginTop: 24 }}>
                  <div className="row">
                    <span>Demo / sales</span>
                    <span>founders@leanwise.ai</span>
                  </div>
                  <div className="row">
                    <span>Press</span>
                    <span>press@leanwise.ai</span>
                  </div>
                  <div className="row">
                    <span>Careers</span>
                    <span>jobs@leanwise.ai</span>
                  </div>
                  <div className="row">
                    <span>Security</span>
                    <span>security@leanwise.ai</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--r-3)',
                  padding: 28,
                }}
              >
                <div className="lw-eyebrow" style={{ marginBottom: 12 }}>
                  Office · HCMC
                </div>
                <div
                  style={{
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: 'var(--ink-2)',
                  }}
                >
                  Saigon Centre Tower 2
                  <br />
                  67 Le Loi, District 1
                  <br />
                  Ho Chi Minh City, Vietnam
                </div>
                <div
                  style={{
                    marginTop: 16,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    color: 'var(--ink-4)',
                  }}
                >
                  10.7769° N · 106.7009° E · UTC+7
                </div>
                <div
                  style={{
                    height: 160,
                    marginTop: 20,
                    borderRadius: 'var(--r-2)',
                    background:
                      'linear-gradient(135deg, var(--paper-2), var(--paper-3))',
                    border: '1px solid var(--line)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 400 160"
                    style={{ position: 'absolute', inset: 0, opacity: 0.5 }}
                  >
                    <defs>
                      <pattern
                        id="grid"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 20 0 L 0 0 0 20"
                          fill="none"
                          stroke="rgba(15,45,74,0.15)"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="400" height="160" fill="url(#grid)" />
                    <path
                      d="M 0 80 Q 100 60 200 90 T 400 70"
                      stroke="rgba(15,45,74,0.25)"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        background: 'var(--amber)',
                        boxShadow: '0 0 0 6px rgba(245,158,11,0.18)',
                      }}
                    ></div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        letterSpacing: '0.14em',
                        color: 'var(--ink-3)',
                      }}
                    >
                      HQ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
