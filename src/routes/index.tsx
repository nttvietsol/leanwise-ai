import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useI18n } from '~/i18n';
import { Page, SectionHeader, Marquee } from '~/components/ui';
import { FinalCTA, ResultsStrip } from '~/components/final-cta';

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      { title: 'LeanWise AI — Lean Thinking. AI Speed. Real Results.' },
    ],
  }),
});

function HeroAppShot() {
  const { t } = useI18n();
  const [tab, setTab] = useState<'dashboard' | 'validation'>('dashboard');
  const shot = tab === 'dashboard'
    ? '/assets/dashboard-preview.png'
    : '/assets/dashboard-preview-2.png';
  return (
    <div className="hero-panel hero-panel--shot">
      <div className="hero-panel-chrome">
        <div className="chrome-dots">
          <span className="dot-close"></span>
          <span className="dot-min"></span>
          <span className="dot-max"></span>
        </div>
        <div className="chrome-url">dashboard.leanwise.ai</div>
        <div className="chrome-tabs">
          <button
            className={tab === 'dashboard' ? 'is-active' : ''}
            onClick={() => setTab('dashboard')}
          >{t('home.hero.tab.dashboard')}</button>
          <button
            className={tab === 'validation' ? 'is-active' : ''}
            onClick={() => setTab('validation')}
          >{t('home.hero.tab.validation')}</button>
        </div>
      </div>
      <div className="hero-panel-body">
        <img
          src={shot}
          alt="LeanWise CONNECT Mastery dashboard — live product screenshot"
          loading="eager"
        />
      </div>
      <div className="hero-panel-foot">
        <span className="panel-status-dot"></span>{t('home.hero.panel.status')}
      </div>
    </div>
  );
}

function TrustBar() {
  const { t } = useI18n();
  const logos = [
    { src: '/assets/sedo-logo.png', alt: 'SEDO Camping' },
    { src: '/assets/ngoc-son-logo.png', alt: 'Ngoc Son BR' },
    { src: '/assets/cpc-logo.png', alt: 'Continent Packaging' },
    { src: '/assets/Talimex-logo.png', alt: 'Talimex' },
  ];
  return (
    <section className="trust-bar">
      <div className="container-wide">
        <div className="trust-text">{t('home.trust')}</div>
        <Marquee speed={45}>
          <div className="trust-row">
            {logos.map(l => (
              <img key={l.alt} src={l.src} alt={l.alt} className="trust-logo" />
            ))}
          </div>
          <div className="trust-row">
            {logos.map(l => (
              <img key={l.alt + 'b'} src={l.src} alt={l.alt} className="trust-logo" />
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}

function ProblemCard({
  n, title, body, icon,
}: { n: string; title: string; body: string; icon: 'hourglass' | 'shield' | 'people' }) {
  const icons = {
    hourglass: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
        <path d="M7 3h10M7 21h10M7 3v3a5 5 0 005 5 5 5 0 005-5V3M7 21v-3a5 5 0 015-5 5 5 0 015 5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
        <path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V7l-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    people: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
        <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 19a6 6 0 0112 0M16 7a3 3 0 010 6M21 19a5 5 0 00-3-4.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  };
  return (
    <div className="problem-card">
      <div className="problem-card-h">
        <div className="problem-icon">{icons[icon]}</div>
        <div className="problem-num mono">{n}</div>
      </div>
      <h3 className="h3">{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function ProductCard({
  num, available, name, tag, body, features, cta, ctaTo,
}: {
  num: string;
  available?: boolean;
  name: string;
  tag: string;
  body: string;
  features: string[];
  cta: string;
  ctaTo: string;
}) {
  const { t } = useI18n();
  return (
    <div className={`product-card ${available ? 'is-available' : ''}`}>
      <div className="product-card-h">
        <span className="mono small-mono">{num}</span>
        {available
          ? <span className="tag-avail">{t('nav.available')}</span>
          : <span className="tag-rd">{t('nav.rd')}</span>}
      </div>
      <h3 className="product-name">{name}</h3>
      <div className="product-tag">{tag}</div>
      <p className="product-body">{body}</p>
      <ul className="product-features">
        {features.map((f, i) => (
          <li key={i}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <div className="product-cta">
        <Link to={ctaTo} className="btn btn-link">{cta}</Link>
      </div>
    </div>
  );
}

function HomePage() {
  const { t } = useI18n();

  return (
    <Page>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-grid"></div>
          <div className="hero-glow"></div>
        </div>

        <div className="container-wide hero-inner">
          <div className="hero-copy">
            <div className="pill">
              <span className="dot"></span>
              {t('home.hero.badge')}
            </div>
            <h1 className="h-display">
              {t('home.hero.h1.a')}<br />
              {t('home.hero.h1.b')}<br />
              <span className="ink-grad">{t('home.hero.h1.c')}</span>
            </h1>
            <p className="lead" style={{ maxWidth: 540 }}>{t('home.hero.sub')}</p>
            <div className="hero-ctas">
              <Link to="/get-a-demo" className="btn btn-primary btn-lg">{t('home.hero.cta1')}</Link>
              <Link to="/solutions/connect-mastery" className="btn btn-ghost btn-lg">
                {t('home.hero.cta2')} →
              </Link>
            </div>
            <div className="hero-meta">
              <div><strong>3</strong><span className="hero-meta-l">{t('home.hero.meta.factories')}</span></div>
              <div className="dot-sep"></div>
              <div><strong>+8.2 pts</strong><span className="hero-meta-l">{t('home.hero.meta.oee')}</span></div>
              <div className="dot-sep"></div>
              <div><strong>72 hrs</strong><span className="hero-meta-l">{t('home.hero.meta.deploy')}</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <HeroAppShot />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* PROBLEM */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="The compliance reality"
            title={t('home.problem.h2')}
            align="center"
          />
          <div className="problem-grid">
            <ProblemCard n="01" title={t('home.problem.c1.t')} body={t('home.problem.c1.b')} icon="hourglass" />
            <ProblemCard n="02" title={t('home.problem.c2.t')} body={t('home.problem.c2.b')} icon="shield" />
            <ProblemCard n="03" title={t('home.problem.c3.t')} body={t('home.problem.c3.b')} icon="people" />
          </div>
          <div className="problem-transition">
            <div className="problem-line"></div>
            <span>{t('home.problem.transition')}</span>
            <div className="problem-line"></div>
          </div>
          <div className="problem-ctas">
            <Link to="/get-a-demo" className="btn btn-primary btn-lg">{t('home.problem.cta1')}</Link>
            <Link to="/solutions/connect-mastery" className="btn btn-link">{t('home.problem.cta2')}</Link>
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section className="section platform-sec">
        <div className="container">
          <SectionHeader
            eyebrow={t('home.platform.eyebrow')}
            title={<>{t('home.platform.h2')}<br /><span className="muted-h">{t('home.platform.h2.b')}</span></>}
            sub={t('home.platform.sub')}
            align="center"
          />
          <div className="product-grid">
            <ProductCard
              num="01"
              available
              name={t('nav.solutions.connect')}
              tag={t('home.p1.tag')}
              body={t('home.p1.body')}
              features={[t('home.p1.f1'), t('home.p1.f2'), t('home.p1.f3')]}
              cta={t('home.p1.cta')}
              ctaTo="/solutions/connect-mastery"
            />
            <ProductCard
              num="02"
              name={t('nav.solutions.sop')}
              tag={t('home.p2.tag')}
              body={t('home.p2.body')}
              features={[t('home.p2.f1'), t('home.p2.f2'), t('home.p2.f3')]}
              cta={t('home.p2.cta')}
              ctaTo="/solutions/sop-mastery"
            />
            <ProductCard
              num="03"
              name={t('nav.solutions.ops')}
              tag={t('home.p3.tag')}
              body={t('home.p3.body')}
              features={[t('home.p3.f1'), t('home.p3.f2'), t('home.p3.f3')]}
              cta={t('home.p3.cta')}
              ctaTo="/solutions/operations-mastery"
            />
          </div>
        </div>
      </section>

      <ResultsStrip />
      <FinalCTA />
    </Page>
  );
}
