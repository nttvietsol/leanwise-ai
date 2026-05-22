import { Link } from '@tanstack/react-router';
import { Logo } from './logo';

const TRUST_LOGOS = [
  { src: '/assets/Talimex-logo.png', alt: 'Talimex' },
  { src: '/assets/cpc-logo.png', alt: 'CPC' },
  { src: '/assets/ngoc-son-logo.png', alt: 'Ngoc Son' },
  { src: '/assets/sedo-logo.png', alt: 'Sedo' },
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
              The operating system for lean factories. Built in Ho Chi Minh City
              for IKEA-supplier plants in Vietnam.
            </p>
          </div>
          <div>
            <div className="col-h">Modules</div>
            <Link to="/solutions/connect-mastery">CONNECT Mastery</Link>
            <Link to="/solutions/sop-mastery">SOP Mastery</Link>
            <Link to="/solutions/operations-mastery">Operations Mastery</Link>
            <Link to="/pricing">Pricing</Link>
          </div>
          <div>
            <div className="col-h">Customers</div>
            <Link to="/customers">All customer stories</Link>
            <Link to="/case-studies/talimex">Case · Talimex</Link>
            <Link to="/contact">Get a demo</Link>
          </div>
          <div>
            <div className="col-h">Resources</div>
            <Link to="/resources">Blog &amp; essays</Link>
            <Link to="/customers">Customer stories</Link>
            {/* Documentation / Changelog have no page yet — shown as
                non-interactive labels rather than dead links. */}
            <span className="soft">Documentation</span>
            <span className="soft">Changelog</span>
          </div>
          <div>
            <div className="col-h">Company</div>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/contact">Careers</Link>
            <Link to="/contact">Press</Link>
          </div>
          <div>
            <div className="col-h">Legal</div>
            <span className="soft">Privacy</span>
            <span className="soft">Terms</span>
            <span className="soft">Security</span>
          </div>
        </div>
        <div className="lw-footer-bot">
          <span>© 2026 LEANWISE AI · NODE: HCMC · BUILD 26.05.07</span>
          <span>HO CHI MINH CITY · UTC+7</span>
        </div>
      </div>
    </footer>
  );
}
