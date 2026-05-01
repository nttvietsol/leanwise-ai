import { useCallback, useEffect, useState } from 'react';
import { type Lang, translate } from './strings';

const STORAGE_KEY = 'lw.lang';
const EVENT = 'lw:langchange';

export function setLangGlobal(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { lang } }));
}

/**
 * Always start with 'en' on both server and client to match SSR output.
 * Hydrate the user's stored preference after mount via useEffect.
 */
export function useI18n() {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if ((stored === 'en' || stored === 'vi') && stored !== lang) {
        setLang(stored);
      }
    } catch {
      /* ignore */
    }
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ lang: Lang }>).detail;
      if (detail?.lang) setLang(detail.lang);
    };
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = useCallback((key: string) => translate(lang, key), [lang]);

  return {
    lang,
    setLang: setLangGlobal,
    t,
  };
}

export type { Lang };
