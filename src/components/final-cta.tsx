import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { useI18n } from '~/i18n';

export function FinalCTA({
  title,
  sub,
  primary,
  primaryTo = '/get-a-demo',
  secondary,
  secondaryTo,
}: {
  title?: ReactNode;
  sub?: ReactNode;
  primary?: ReactNode;
  primaryTo?: string;
  secondary?: ReactNode;
  secondaryTo?: string;
}) {
  const { t } = useI18n();
  return (
    <section className="section final-cta">
      <div className="container">
        <div className="final-cta-card">
          <div className="final-cta-bg" aria-hidden="true"></div>
          <div className="final-cta-inner">
            <h2 className="h1">{title || t('home.final.h2')}</h2>
            <p className="lead" style={{ maxWidth: 520, color: 'rgba(255,255,255,0.78)' }}>
              {sub || t('home.final.sub')}
            </p>
            <div className="final-cta-btns">
              <Link to={primaryTo} className="btn btn-primary btn-lg">
                {primary || t('home.final.cta')}
              </Link>
              {secondary && secondaryTo && (
                <Link to={secondaryTo} className="btn btn-ghost-light btn-lg">
                  {secondary}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ResultsStrip() {
  const stats = [
    { n: '75%', l: 'Reduction in document check time' },
    { n: '3,000+', l: 'Documents processed to date' },
    { n: '4', l: 'Factories using CONNECT Mastery' },
    { n: '99%', l: 'Human error eliminated' },
  ];
  return (
    <section className="results-strip">
      <div className="container">
        <div className="results-grid">
          {stats.map((s, i) => (
            <div key={i} className="result-stat">
              <div className="result-num">{s.n}</div>
              <div className="result-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
