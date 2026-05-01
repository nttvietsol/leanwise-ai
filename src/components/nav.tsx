import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { useI18n } from '~/i18n';
import { LogoFull } from './logo';
import { LangToggle } from './lang-toggle';

export function Nav() {
  const { t, lang, setLang } = useI18n();
  const { pathname } = useLocation();
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  const openDrop = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSolutionsOpen(true);
  };
  const closeDrop = () => {
    closeTimer.current = setTimeout(() => setSolutionsOpen(false), 120);
  };

  const isActive = (path: string) =>
    pathname === path || (path !== '/' && pathname.startsWith(path));

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container-wide nav-inner">
        <LogoFull />

        <nav className="nav-links" aria-label="Primary">
          <div
            className="nav-item nav-item-drop"
            onMouseEnter={openDrop}
            onMouseLeave={closeDrop}
          >
            <button
              className={`nav-link ${isActive('/solutions') ? 'is-active' : ''}`}
              aria-expanded={solutionsOpen}
              onClick={() => setSolutionsOpen(o => !o)}
            >
              {t('nav.solutions')}
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                style={{
                  transform: solutionsOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform .2s',
                }}
              >
                <path
                  d="M2 4l3 3 3-3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {solutionsOpen && (
              <div className="dropdown" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
                <Link to="/solutions/connect-mastery" className="drop-item">
                  <div className="drop-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2.5" y="2.5" width="15" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M6 10.5L9 13.5L14.5 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="drop-title">
                      {t('nav.solutions.connect')} <span className="tag-avail">{t('nav.available')}</span>
                    </div>
                    <div className="drop-desc">{t('nav.solutions.connect.desc')}</div>
                  </div>
                </Link>
                <Link to="/solutions/sop-mastery" className="drop-item">
                  <div className="drop-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 4h10M5 8h10M5 12h7M5 16h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="drop-title">
                      {t('nav.solutions.sop')} <span className="tag-rd">{t('nav.rd')}</span>
                    </div>
                    <div className="drop-desc">{t('nav.solutions.sop.desc')}</div>
                  </div>
                </Link>
                <Link to="/solutions/operations-mastery" className="drop-item">
                  <div className="drop-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 14L7 9L11 12L17 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="17" cy="5" r="1.6" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <div className="drop-title">
                      {t('nav.solutions.ops')} <span className="tag-rd">{t('nav.rd')}</span>
                    </div>
                    <div className="drop-desc">{t('nav.solutions.ops.desc')}</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link to="/about" className={`nav-link ${isActive('/about') ? 'is-active' : ''}`}>
            {t('nav.about')}
          </Link>
          <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'is-active' : ''}`}>
            {t('nav.blog')}
          </Link>
          <Link to="/resources" className={`nav-link ${isActive('/resources') ? 'is-active' : ''}`}>
            {t('nav.resources')}
          </Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'is-active' : ''}`}>
            {t('nav.contact')}
          </Link>
        </nav>

        <div className="nav-actions">
          <LangToggle lang={lang} setLang={setLang} />
          <Link to="/get-a-demo" className="btn btn-primary nav-cta">
            {t('nav.demo')}
          </Link>
          <button
            className="nav-burger"
            aria-label="Menu"
            onClick={() => setMobileOpen(o => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M3 6h14M3 10h14M3 14h14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={`mobile-menu${mobileOpen ? '' : ' is-hidden'}`}>
        <Link to="/solutions/connect-mastery">{t('nav.solutions.connect')}</Link>
        <Link to="/solutions/sop-mastery">{t('nav.solutions.sop')}</Link>
        <Link to="/about">{t('nav.about')}</Link>
        <Link to="/blog">{t('nav.blog')}</Link>
        <Link to="/resources">{t('nav.resources')}</Link>
        <Link to="/contact">{t('nav.contact')}</Link>
        <Link to="/get-a-demo" className="btn btn-primary">
          {t('nav.demo')}
        </Link>
      </div>
    </header>
  );
}
