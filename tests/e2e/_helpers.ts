import { test, type Page, type Locator } from '@playwright/test';

/**
 * Wait for React to hydrate. `useReveal` (run in the root layout) adds
 * `lw-reveal-ready` to <html> from a useEffect — it only appears once the
 * client bundle has hydrated, so it is a reliable "interactive now" signal.
 * Call this before clicking buttons/tabs that rely on JS event handlers.
 */
export async function hydrated(page: Page) {
  await page.locator('html.lw-reveal-ready').waitFor({ state: 'attached' });
}

/**
 * Skip the current test when the D1-backed content it asserts hasn't been
 * seeded. Blog posts and customer stories render from Cloudflare D1; a fresh
 * local checkout has an empty DB (drafts pending — see content/drafts/), so
 * a content-dependent spec skips cleanly instead of hard-failing. It still
 * runs in full against a seeded store (e.g. `pnpm test:e2e:remote`). Pass a
 * locator that is only present once the expected content has rendered.
 */
export async function skipUnlessSeeded(marker: Locator, reason: string) {
  const present = await marker.first().isVisible().catch(() => false);
  test.skip(!present, reason);
}
