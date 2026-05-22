import { test, expect } from '@playwright/test';
import { hydrated } from './_helpers';

test.describe('Contact page', () => {
  test('shows hero and direct-line panel', async ({ page }) => {
    await page.goto('/contact');
    await expect(
      page.getByRole('heading', { name: /Bring your audit/, level: 1 }),
    ).toBeVisible();
    await expect(page.getByText('Direct line · founders')).toBeVisible();
    await expect(page.getByText('founders@leanwise.ai')).toBeVisible();
    await expect(page.getByText('Office · HCMC')).toBeVisible();
  });

  test('rejects empty form with field errors', async ({ page }) => {
    await page.goto('/contact');
    await hydrated(page);
    await page.getByRole('button', { name: 'Request demo' }).click();
    await expect(page.getByText('Required').first()).toBeVisible();
    await expect(page.getByText('Please enter a valid work email.')).toBeVisible();
  });

  test('submits successfully with valid input', async ({ page }) => {
    await page.goto('/contact');
    await hydrated(page);
    await page.getByLabel('Name *').fill('Test User');
    await page.getByLabel('Plant / company *').fill('Talimex');
    await page.getByLabel('Work email *').fill('test@example.com');
    await page.getByRole('button', { name: 'Request demo' }).click();
    await expect(
      page.getByRole('heading', { name: /be in touch within one business day/ }),
    ).toBeVisible();
  });
});
