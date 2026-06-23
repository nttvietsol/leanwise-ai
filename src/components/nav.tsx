import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Logo } from './logo';

/* ────── Top status bar — static, factual chrome ──────
   Deliberately not animated: a compliance buyer reads a marquee as decoration
   (and "early-stage"). Static spec facts read as discipline. */
export function StatusBar({ build = '26.05.07' }: { build?: string }) {
  return (
    <div className="lw-statusbar">
      <div className="lw-container">
        <div className="row">
          <div className="left">
            <span className="live">CONNECT · ALIGNED</span>
            <span>TSS SPEC · 2026.1</span>
          </div>
          <div className="meta">
            <span>99.2% MATCH ACCURACY</span>
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
  { name: 'Product', to: '/product' },
  { name: 'Customers', to: '/customers' },
  { name: 'Pricing', to: '/pricing' },
  { name: 'Company', to: '/company' },
] as const;

function activeName(pathname: string): string {
  if (pathname === '/') return '';
  if (pathname.startsWith('/case-studies') || pathname.startsWith('/customers'))
    return 'Customers';
  if (pathname.startsWith('/product') || pathname.startsWith('/solutions'))
    return 'Product';
  if (pathname.startsWith('/company') || pathname.startsWith('/about'))
    return 'Company';
  const hit = LINKS.find((l) => pathname.startsWith(l.to));
  return hit ? hit.name : '';
}

/* Inline styles for the mobile menu — no `.lw-*` class exists for this overlay. */
const mobileMenuStyles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(10,22,40,0.6)',
    backdropFilter: 'blur(6px)',
    zIndex: 100,
  },
  panel: {
    background: '#fff',
    maxWidth: 360,
    marginLeft: 'auto',
    height: '100%',
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  close: { fontSize: 20, color: 'var(--ink-3)' },
  link: {
    padding: '14px 8px',
    borderBottom: '1px solid var(--line)',
    fontSize: 16,
    color: 'var(--ink-2)',
  },
  cta: { marginTop: 16, justifyContent: 'center' },
} satisfies Record<string, CSSProperties>;

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
        <div style={mobileMenuStyles.backdrop} onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            style={mobileMenuStyles.panel}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={mobileMenuStyles.header}>
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                style={mobileMenuStyles.close}
              >
                ✕
              </button>
            </div>
            {LINKS.map((l) => (
              <Link key={l.name} to={l.to} style={mobileMenuStyles.link}>
                {l.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="lw-btn lw-btn-primary"
              style={mobileMenuStyles.cta}
            >
              Get a demo <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
