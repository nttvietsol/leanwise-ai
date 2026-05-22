import { test, expect } from '@playwright/test';
import { hydrated } from './_helpers';

test.describe('Home page', () => {
  test('loads hero, trust strip, and core sections', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/LeanWise AI/);

    await expect(
      page.getByRole('heading', { name: /operating system/i, level: 1 }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /Get a demo/ }).first()).toBeVisible();

    await expect(page.getByText('Live at IKEA-supplier plants')).toBeVisible();

    await expect(page.getByRole('heading', { name: /still bleed hours/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Three AI modules/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /How LeanWise compares/ })).toBeVisible();
  });

  test('product picker switches modules', async ({ page }) => {
    await page.goto('/');
    await hydrated(page);
    const sopTab = page.getByRole('tab', { name: /SOP Mastery/ });
    await sopTab.scrollIntoViewIfNeeded();
    await sopTab.click();
    await expect(
      page.getByRole('heading', { name: 'SOP Mastery', exact: true }),
    ).toBeVisible();
  });
});
