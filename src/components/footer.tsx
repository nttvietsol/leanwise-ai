import { Link } from '@tanstack/react-router';
import { useI18n } from '~/i18n';
import { LogoFull } from './logo';
import { LangToggle } from './lang-toggle';

export function Footer() {
  const { t, lang, setLang } = useI18n();
  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-grid">
          <div className="footer-brand">
            <LogoFull />
            <p className="footer-tag">{t('footer.tagline')}</p>
            <div className="footer-loc">
              <div className="footer-loc-row">
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <circle cx="10" cy="8" r="2" fill="currentColor"/>
                </svg>
                <span>{t('footer.location')}</span>
              </div>
              <a href="mailto:hello@leanwise.ai" className="footer-email">{t('footer.email')}</a>
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-h">{t('footer.solutions')}</div>
            <Link to="/solutions/connect-mastery">{t('nav.solutions.connect')}</Link>
            <Link to="/solutions/sop-mastery">{t('nav.solutions.sop')}</Link>
            <Link to="/solutions/operations-mastery">{t('nav.solutions.ops')}</Link>
          </div>

          <div className="footer-col">
            <div className="footer-h">{t('footer.company')}</div>
            <Link to="/about">{t('nav.about')}</Link>
            <Link to="/blog">{t('nav.blog')}</Link>
            <Link to="/contact">{t('nav.contact')}</Link>
            <Link to="/get-a-demo">{t('nav.demo')}</Link>
          </div>

          <div className="footer-col">
            <div className="footer-h">{t('footer.resources')}</div>
            <Link to="/resources">{t('nav.resources')}</Link>
          </div>

          <div className="footer-col">
            <div className="footer-h">{t('footer.legal')}</div>
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.terms')}</a>
            <div style={{ marginTop: 14 }}>
              <LangToggle lang={lang} setLang={setLang} />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t('footer.copyright')}</span>
          <div className="footer-social">
            <a
              href="https://www.linkedin.com/company/leanwise-ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.4 3H3.6A.6.6 0 003 3.6v16.8a.6.6 0 00.6.6h16.8a.6.6 0 00.6-.6V3.6a.6.6 0 00-.6-.6zM8.3 18.3H5.7V9.7h2.6v8.6zM7 8.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM18.3 18.3h-2.6v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3h-2.6V9.7h2.5v1.2c.3-.6 1.2-1.4 2.5-1.4 2.7 0 3.2 1.7 3.2 4v4.8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
