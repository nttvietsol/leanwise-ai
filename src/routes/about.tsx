import type { ReactNode } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useI18n } from '~/i18n';
import { Page, SectionHeader } from '~/components/ui';

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => ({ meta: [{ title: 'About — LeanWise AI' }] }),
});

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"/>
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4"/>
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
    </svg>
  );
}

function ValueCard({ icon, name, body }: { icon: ReactNode; name: string; body: string }) {
  return (
    <div className="value-card">
      <div className="value-icon">{icon}</div>
      <h3 className="h3">{name}</h3>
      <p>{body}</p>
    </div>
  );
}

function FounderCard({ photo, name, role, bio }: { photo: string; name: string; role: string; bio: string }) {
  return (
    <div className="founder-card">
      <img className="founder-photo" src={photo} alt={name} />
      <div className="founder-info">
        <div className="founder-role">{role}</div>
        <h3 className="founder-name">{name}</h3>
        <p className="lead">{bio}</p>
      </div>
    </div>
  );
}

function AboutPage() {
  const { t } = useI18n();
  return (
    <Page>
      <section className="section section-tight">
        <div className="container-wide">
          <div className="origin-grid">
            <div>
              <SectionHeader
                eyebrow={t('about.eyebrow')}
                title={t('about.title')}
                titleClass="h1"
              />
              <p className="lead" style={{ marginTop: 16 }}>{t('about.lead')}</p>
            </div>
            <div className="origin-stat-card">
              <div className="origin-stat-bg" aria-hidden="true"></div>
              <div className="small-mono" style={{ color: 'var(--accent)' }}>{t('vision.eyebrow')} / 02</div>
              <p className="origin-stat-text">{t('vision.text')}</p>
              <div className="origin-stat-meta">
                <div><strong>{t('vision.stat1')}</strong><span>{t('vision.stat1.l')}</span></div>
                <div><strong>{t('vision.stat2')}</strong><span>{t('vision.stat2.l')}</span></div>
                <div><strong>{t('vision.stat3')}</strong><span>{t('vision.stat3.l')}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section values-sec">
        <div className="container-wide">
          <SectionHeader
            eyebrow={t('values.eyebrow')}
            title={t('values.title')}
            align="center"
          />
          <div className="values-grid">
            <ValueCard icon={<ShieldIcon />} name={t('values.1.title')} body={t('values.1.body')} />
            <ValueCard icon={<TrendingUpIcon />} name={t('values.2.title')} body={t('values.2.body')} />
            <ValueCard icon={<TargetIcon />} name={t('values.3.title')} body={t('values.3.body')} />
            <ValueCard icon={<HandshakeIcon />} name={t('values.4.title')} body={t('values.4.body')} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <SectionHeader
            eyebrow={t('team.eyebrow')}
            title={t('team.title')}
            align="center"
          />
          <div className="team-grid">
            <FounderCard
              photo="/assets/founder-Truong.png"
              name={t('founder1.name')}
              role={t('founder1.role')}
              bio={t('founder1.bio')}
            />
            <FounderCard
              photo="/assets/founder-Trung.png"
              name={t('founder2.name')}
              role={t('founder2.role')}
              bio={t('founder2.bio')}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="final-cta-card about-vision-card">
            <div className="final-cta-bg" aria-hidden="true"></div>
            <div className="final-cta-inner">
              <div className="eyebrow" style={{ color: 'var(--accent)' }}>{t('about.vision.eyebrow')}</div>
              <h2 className="h1">{t('about.vision.title')}</h2>
              <p className="lead">{t('about.vision.body')}</p>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
