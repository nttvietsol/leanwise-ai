import { test, expect } from '@playwright/test';
import { hydrated } from './_helpers';

test.describe('Product page', () => {
  test('renders hero, anatomy, document types, capabilities, results', async ({
    page,
  }) => {
    await page.goto('/product');

    await expect(page).toHaveTitle(/IKEA CONNECT compliance/);
    await expect(
      page.getByRole('heading', { name: /CONNECT audits/, level: 1 }),
    ).toBeVisible();
    await expect(page.getByText('Compliance validation · LIVE · Q1 2026')).toBeVisible();

    // Anatomy stages
    await expect(page.getByRole('heading', { name: 'Ingest' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Report', exact: true }),
    ).toBeVisible();

    // Document types
    await expect(
      page.getByRole('heading', { name: 'Declaration of Substances' }),
    ).toBeVisible();

    // Capabilities ledger
    await expect(page.getByText('Semantic requirement matching')).toBeVisible();

    // Results strip
    await expect(page.getByText('FASTER AUDIT CYCLE')).toBeVisible();

    // Roadmap (folded SOP + Operations)
    await expect(page.getByRole('heading', { name: 'SOP Mastery' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Operations Mastery' }),
    ).toBeVisible();
  });

  test('legacy module URLs redirect to the product page', async ({ page }) => {
    await page.goto('/solutions/connect-mastery');
    await expect(page).toHaveURL('/product');
  });

  test('CTA links to contact', async ({ page }) => {
    await page.goto('/product');
    await hydrated(page);
    await page.getByRole('link', { name: /Book a demo/ }).first().click();
    await expect(page).toHaveURL('/contact');
  });
});
