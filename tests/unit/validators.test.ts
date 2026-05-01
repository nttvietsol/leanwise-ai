import { describe, it, expect } from 'vitest';

/**
 * The shared email regex used inside src/server/forms.ts. Re-declared here so
 * we test the exact pattern that ships in production. Keep in sync.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

describe('email validation regex', () => {
  it.each([
    'a@b.co',
    'truong@leanwise.ai',
    'first.last+tag@sub.example.com',
    'user_123@factory.vn',
  ])('accepts a valid email: %s', (email) => {
    expect(EMAIL_RE.test(email)).toBe(true);
  });

  it.each([
    '',
    'plainaddress',
    'missing-at.example.com',
    'no-tld@example',
    'spaces in@example.com',
    'two@@example.com',
    '@no-local.com',
    'no-domain@',
  ])('rejects an invalid email: %s', (email) => {
    expect(EMAIL_RE.test(email)).toBe(false);
  });
});
