import type { Lang } from '~/i18n';

export function LangToggle({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        className={lang === 'en' ? 'is-active' : ''}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <span className="lang-sep">/</span>
      <button
        className={lang === 'vi' ? 'is-active' : ''}
        onClick={() => setLang('vi')}
        aria-pressed={lang === 'vi'}
      >
        VI
      </button>
    </div>
  );
}
