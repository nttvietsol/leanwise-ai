import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads with hero, products, stats, and final CTA', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/LeanWise AI/);

    // Hero
    await expect(page.getByText('Lean Thinking. AI Speed. Real Results.').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Your Factory/ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get a Demo' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Explore the Platform/ })).toBeVisible();

    // Hero stats
    await expect(page.getByText(/4\s*factories live/)).toBeVisible();
    await expect(page.getByText(/3,000\+\s*docs processed/)).toBeVisible();
    await expect(page.getByText(/75%\s*time saved/)).toBeVisible();

    // Trust bar
    await expect(page.getByText(/Trusted by manufacturers supplying IKEA/)).toBeVisible();

    // Problem section
    await expect(
      page.getByRole('heading', { name: /CONNECT Compliance Is Complex/ }),
    ).toBeVisible();
    await expect(page.getByText("There's a smarter way.")).toBeVisible();

    // Platform cards
    await expect(page.getByText(/One Platform\. Three AI Products\./)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'CONNECT Mastery' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'SOP Mastery' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Operations Mastery' })).toBeVisible();

    // Results stats
    await expect(page.getByText('75%').first()).toBeVisible();
    await expect(page.getByText('3,000+').first()).toBeVisible();

    // Final CTA
    await expect(page.getByRole('heading', { name: /Ready to See It in Action/ })).toBeVisible();
  });

  test('hero CTA navigates to /get-a-demo', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Get a Demo' }).first().click();
    await expect(page).toHaveURL('/get-a-demo');
    await expect(page.getByRole('heading', { name: /See CONNECT Mastery in Action/ })).toBeVisible();
  });

  test('explore platform navigates to CONNECT Mastery', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Explore the Platform/ }).click();
    await expect(page).toHaveURL('/solutions/connect-mastery');
  });
});
