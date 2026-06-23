import { test, expect } from '@playwright/test';
import { hydrated } from './_helpers';

test.describe('Navigation', () => {
  test('desktop nav links route correctly', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop nav only');

    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await nav.getByRole('link', { name: 'Product', exact: true }).click();
    await expect(page).toHaveURL('/product');

    await nav.getByRole('link', { name: 'Pricing', exact: true }).click();
    await expect(page).toHaveURL('/pricing');
  });

  test('mobile menu opens and links work', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile only');

    await page.goto('/');
    await hydrated(page);
    await page.getByRole('button', { name: 'Menu' }).click();
    const menu = page.getByRole('dialog', { name: 'Menu' });
    await expect(menu.getByRole('link', { name: 'Product' })).toBeVisible();
    await menu.getByRole('link', { name: 'Company', exact: true }).click();
    await expect(page).toHaveURL('/company');
  });

  test('status bar shows the spec-aligned system marker', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('CONNECT · ALIGNED')).toBeVisible();
  });
});
