import { test, expect } from '@playwright/test';

/**
 * SOP Mastery and Operations Mastery are no longer standalone pages — they were
 * folded into the `/product` roadmap section in the compliance-led redesign.
 * Their old URLs now permanently redirect there.
 */
test.describe('Roadmap modules (folded into /product)', () => {
  test('SOP Mastery URL redirects to the product roadmap', async ({ page }) => {
    await page.goto('/solutions/sop-mastery');
    await expect(page).toHaveURL(/\/product(#roadmap)?$/);
    await expect(page.getByRole('heading', { name: 'SOP Mastery' })).toBeVisible();
  });

  test('Operations Mastery URL redirects to the product roadmap', async ({ page }) => {
    await page.goto('/solutions/operations-mastery');
    await expect(page).toHaveURL(/\/product(#roadmap)?$/);
    await expect(
      page.getByRole('heading', { name: 'Operations Mastery' }),
    ).toBeVisible();
  });
});
