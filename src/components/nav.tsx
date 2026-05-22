import { useEffect, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Logo } from './logo';

/* ────── Top status bar — live node tick ────── */
const NODES = ['TALIMEX', 'CPC', 'NGOC SON', 'SEDO'];

export function StatusBar({ build = '26.05.07' }: { build?: string }) {
  const [nodeIdx, setNodeIdx] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setNodeIdx((i) => (i + 1) % NODES.length), 4200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="lw-statusbar">
      <div className="lw-container">
        <div className="row">
          <div className="left">
            <span className="live">SYS · ONLINE</span>
            <span>
              NODE ·{' '}
              <span key={nodeIdx} className="lw-tick">
                {NODES[nodeIdx]}
              </span>
            </span>
          </div>
          <div className="meta">
            <span>UPTIME · 99.97%</span>
            <span>BUILD · {build}</span>
            <span>HCMC · UTC+7</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────── Primary nav ────── */
const LINKS = [
  { name: 'Platform', to: '/' },
  { name: 'CONNECT', to: '/solutions/connect-mastery' },
  { name: 'SOP', to: '/solutions/sop-mastery' },
  { name: 'Operations', to: '/solutions/operations-mastery' },
  { name: 'Pricing', to: '/pricing' },
  { name: 'Customers', to: '/customers' },
  { name: 'Resources', to: '/resources' },
  { name: 'About', to: '/about' },
] as const;

function activeName(pathname: string): string {
  if (pathname === '/') return 'Platform';
  if (pathname.startsWith('/case-studies') || pathname.startsWith('/customers'))
    return 'Customers';
  if (pathname.startsWith('/resources') || pathname.startsWith('/blog'))
    return 'Resources';
  const hit = LINKS.find((l) => l.to !== '/' && pathname.startsWith(l.to));
  return hit ? hit.name : '';
}

export function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = activeName(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`lw-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="lw-container">
        <div className="row">
          <Logo />
          <nav className="lw-nav-links" aria-label="Primary">
            {LINKS.map((l) => (
              <Link
                key={l.name}
                to={l.to}
                className={active === l.name ? 'active' : ''}
              >
                {l.name}
              </Link>
            ))}
          </nav>
          <div className="lw-nav-cta-row">
            <Link to="/contact" className="lw-btn lw-btn-ghost">
              Talk to founders
            </Link>
            <Link to="/contact" className="lw-btn lw-btn-primary">
              <span>Get a demo</span> <span className="arrow">→</span>
            </Link>
            <button
              className="lw-nav-toggle"
              aria-label="Menu"
              onClick={() => setOpen(true)}
            >
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10,22,40,0.6)',
            backdropFilter: 'blur(6px)',
            zIndex: 100,
          }}
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            style={{
              background: '#fff',
              maxWidth: 360,
              marginLeft: 'auto',
              height: '100%',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                style={{ fontSize: 20, color: 'var(--ink-3)' }}
              >
                ✕
              </button>
            </div>
            {LINKS.map((l) => (
              <Link
                key={l.name}
                to={l.to}
                style={{
                  padding: '14px 8px',
                  borderBottom: '1px solid var(--line)',
                  fontSize: 16,
                  color: 'var(--ink-2)',
                }}
              >
                {l.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="lw-btn lw-btn-primary"
              style={{ marginTop: 16, justifyContent: 'center' }}
            >
              Get a demo <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
