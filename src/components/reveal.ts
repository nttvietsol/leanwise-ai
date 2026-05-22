import { useEffect } from 'react';

/**
 * Reveal-on-scroll observer. Ported from v2 chrome.jsx `useReveal`.
 *
 * `.lw-reveal` elements are visible by default; the CSS only hides them once
 * `<html>` carries `lw-reveal-ready`, so SSR output is never stuck invisible.
 * Pass the current pathname so the scan re-runs after client-side navigation.
 */
export function useReveal(dep?: unknown) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.lw-reveal'));
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.95) el.classList.add('in');
    });
    document.documentElement.classList.add('lw-reveal-ready');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    els.forEach((el) => {
      if (!el.classList.contains('in')) io.observe(el);
    });

    const t = setTimeout(() => {
      document
        .querySelectorAll('.lw-reveal:not(.in)')
        .forEach((el) => el.classList.add('in'));
    }, 1500);

    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [dep]);
}
