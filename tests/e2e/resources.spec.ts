import { test, expect } from '@playwright/test';
import { hydrated } from './_helpers';

test.describe('Resources page', () => {
  test('renders hero, featured post, and tabs', async ({ page }) => {
    await page.goto('/resources');
    await expect(
      page.getByRole('heading', { name: /Lean methodology/, level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /The auditor doesn't care/ }),
    ).toBeVisible();
    for (const t of ['All articles', 'Essays', 'Customer cases']) {
      await expect(page.getByRole('button', { name: new RegExp(t) })).toBeVisible();
    }
  });

  test('filters posts by category', async ({ page }) => {
    await page.goto('/resources');
    await hydrated(page);
    await page.getByRole('button', { name: /Customer cases/ }).click();
    await expect(
      page.getByRole('heading', { name: /How Talimex eliminated 11 of 12/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /Andon on a 200-person line/ }),
    ).not.toBeVisible();
  });

  test('featured post links to the article', async ({ page }) => {
    await page.goto('/resources');
    await page.getByRole('heading', { name: /The auditor doesn't care/ }).click();
    await expect(page).toHaveURL('/blog/the-auditor-doesnt-care');
  });
});
