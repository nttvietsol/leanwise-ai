import type { Page } from '@playwright/test';

/**
 * Wait for React to hydrate. `useReveal` (run in the root layout) adds
 * `lw-reveal-ready` to <html> from a useEffect — it only appears once the
 * client bundle has hydrated, so it is a reliable "interactive now" signal.
 * Call this before clicking buttons/tabs that rely on JS event handlers.
 */
export async function hydrated(page: Page) {
  await page.locator('html.lw-reveal-ready').waitFor({ state: 'attached' });
}
