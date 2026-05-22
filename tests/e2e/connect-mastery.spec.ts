import { test, expect } from '@playwright/test';
import { hydrated } from './_helpers';

test.describe('CONNECT Mastery page', () => {
  test('renders hero, anatomy, capabilities, results', async ({ page }) => {
    await page.goto('/solutions/connect-mastery');

    await expect(page).toHaveTitle(/CONNECT Mastery/);
    await expect(
      page.getByRole('heading', { name: /CONNECT audits/, level: 1 }),
    ).toBeVisible();
    await expect(page.getByText('MOD.01 · LIVE · Q1 2026')).toBeVisible();

    // Anatomy stages
    await expect(page.getByRole('heading', { name: 'Ingest' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Report' })).toBeVisible();

    // Capabilities ledger
    await expect(page.getByText('Semantic requirement matching')).toBeVisible();

    // Results strip
    await expect(page.getByText('FASTER AUDIT CYCLE')).toBeVisible();
  });

  test('CTA links to contact', async ({ page }) => {
    await page.goto('/solutions/connect-mastery');
    await hydrated(page);
    await page.getByRole('link', { name: /Book a demo/ }).click();
    await expect(page).toHaveURL('/contact');
  });
});
