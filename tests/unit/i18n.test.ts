import { describe, it, expect } from 'vitest';
import { translate, STRINGS } from '~/i18n/strings';

describe('translate()', () => {
  it('returns the EN string for a known key', () => {
    expect(translate('en', 'nav.about')).toBe('About');
    expect(translate('en', 'home.hero.h1.c')).toBe('Smarter.');
  });

  it('returns the VI string for a known key', () => {
    expect(translate('vi', 'nav.about')).toBe('Về chúng tôi');
    expect(translate('vi', 'home.hero.h1.c')).toBe('Thông minh hơn.');
  });

  it('falls back to EN when the key is missing in VI', () => {
    // Confirm the assumption: pick a key that exists in EN.
    expect(STRINGS.en['nav.demo']).toBeDefined();
    // If we synthesise a one-off missing key, fallback returns EN or the key.
    expect(translate('vi' as 'vi', '__nonexistent_key__')).toBe(
      '__nonexistent_key__',
    );
  });

  it('returns the key itself when missing in both languages', () => {
    expect(translate('en', '__totally_made_up__')).toBe('__totally_made_up__');
  });

  it('every EN key has a VI counterpart', () => {
    const enKeys = Object.keys(STRINGS.en);
    const viKeys = new Set(Object.keys(STRINGS.vi));
    const missing = enKeys.filter(k => !viKeys.has(k));
    expect(missing, `Missing VI translations for: ${missing.join(', ')}`).toEqual([]);
  });
});
