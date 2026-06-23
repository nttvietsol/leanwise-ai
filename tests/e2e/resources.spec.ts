import { test, expect } from '@playwright/test';
import { hydrated, skipUnlessSeeded } from './_helpers';

const UNSEEDED =
  'Resources posts not seeded in D1 (drafts pending — see content/drafts/)';

test.describe('Resources page', () => {
  test('renders hero, featured post, and tabs', async ({ page }) => {
    await page.goto('/resources');
    // Hero copy and the filter tabs are static — always present.
    await expect(
      page.getByRole('heading', { name: /Lean methodology/, level: 1 }),
    ).toBeVisible();
    for (const t of ['All articles', 'Essays', 'Customer cases']) {
      await expect(page.getByRole('button', { name: new RegExp(t) })).toBeVisible();
    }
    // The featured card comes from D1 — only present once a post is seeded.
    const featured = page.getByRole('heading', { name: /The auditor doesn't care/ });
    await skipUnlessSeeded(featured, UNSEEDED);
    await expect(featured).toBeVisible();
  });

  test('filters posts by category', async ({ page }) => {
    await page.goto('/resources');
    await hydrated(page);
    await page.getByRole('button', { name: /Customer cases/ }).click();
    await skipUnlessSeeded(
      page.getByRole('heading', { name: /How Talimex eliminated 11 of 12/ }),
      UNSEEDED,
    );
    await expect(
      page.getByRole('heading', { name: /How Talimex eliminated 11 of 12/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /Andon on a 200-person line/ }),
    ).not.toBeVisible();
  });

  test('featured post links to the article', async ({ page }) => {
    await page.goto('/resources');
    const featured = page.getByRole('heading', { name: /The auditor doesn't care/ });
    await skipUnlessSeeded(featured, UNSEEDED);
    await featured.click();
    await expect(page).toHaveURL('/blog/the-auditor-doesnt-care');
  });
});
