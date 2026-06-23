import { Link } from '@tanstack/react-router';
import type { LinkProps } from '@tanstack/react-router';
import { Logo } from './logo';

const TRUST_LOGOS = [
  { src: '/assets/Talimex-logo.png', alt: 'Talimex' },
  { src: '/assets/cpc-logo.png', alt: 'CPC' },
  { src: '/assets/ngoc-son-logo.png', alt: 'Ngoc Son' },
  { src: '/assets/sedo-logo.png', alt: 'Sedo' },
];

/**
 * Footer column entries — a `to` renders a router Link, its absence renders a
 * non-interactive `.soft` label (for pages that don't exist yet).
 */
type FooterEntry = { label: string; to?: LinkProps['to']; hash?: string };

const FOOTER_COLUMNS: { heading: string; entries: FooterEntry[] }[] = [
  {
    heading: 'Product',
    entries: [
      { label: 'Compliance validation', to: '/product' },
      { label: 'Roadmap', to: '/product', hash: 'roadmap' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    heading: 'Customers',
    entries: [
      { label: 'All customer stories', to: '/customers' },
      { label: 'Case · Talimex', to: '/case-studies/talimex' },
      { label: 'Get a demo', to: '/contact' },
    ],
  },
  {
    heading: 'Resources',
    entries: [
      { label: 'Blog & essays', to: '/resources' },
      { label: 'Customer stories', to: '/customers' },
      // Documentation / Changelog have no page yet — shown as
      // non-interactive labels rather than dead links.
      { label: 'Documentation' },
      { label: 'Changelog' },
    ],
  },
  {
    heading: 'Company',
    entries: [
      { label: 'Company', to: '/company' },
      { label: 'Contact', to: '/contact' },
      { label: 'Press', to: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    entries: [
      { label: 'Privacy' },
      { label: 'Terms' },
      { label: 'Security' },
    ],
  },
];

/** Customer-logo rail — used between hero and content on most pages. */
export function TrustStrip() {
  return (
    <div className="lw-trust">
      <div className="lw-container">
        <div className="row">
          <span className="label">Live at IKEA-supplier plants</span>
          <div className="logos">
            {TRUST_LOGOS.map((l) => (
              <img key={l.alt} src={l.src} alt={l.alt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="lw-footer">
      <div className="lw-container">
        <div className="grid">
          <div>
            <Logo />
            <p className="desc">
              IKEA CONNECT compliance validation — and the operating system for
              lean factories. Built in Ho Chi Minh City for IKEA-supplier plants
              in Vietnam.
            </p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <div className="col-h">{col.heading}</div>
              {col.entries.map((entry) =>
                entry.to ? (
                  <Link key={entry.label} to={entry.to} hash={entry.hash}>
                    {entry.label}
                  </Link>
                ) : (
                  <span key={entry.label} className="soft">
                    {entry.label}
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
        <div className="lw-footer-bot">
          <span>© 2026 LEANWISE AI · NODE: HCMC · BUILD 26.05.07</span>
          <span>HO CHI MINH CITY · UTC+7</span>
        </div>
      </div>
    </footer>
  );
}
