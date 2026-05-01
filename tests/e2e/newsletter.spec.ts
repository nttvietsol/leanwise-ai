import { test, expect } from '@playwright/test';

test.describe('Newsletter signup', () => {
  test('appears on the Blog hero and Resources hero', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByText('NEWSLETTER').first()).toBeVisible();
    await expect(page.getByText('One email a month. No fluff.')).toBeVisible();

    await page.goto('/resources');
    await expect(page.getByText('NEWSLETTER').first()).toBeVisible();
  });

  test('rejects invalid email', async ({ page }) => {
    await page.goto('/blog');
    await page
      .locator('form.newsletter-box')
      .first()
      .getByPlaceholder('you@factory.com')
      .fill('not-an-email');
    await page.locator('form.newsletter-box').first().getByRole('button', { name: 'Subscribe' }).click();
    await expect(page.getByText('Please enter a valid email.')).toBeVisible();
  });

  test('subscribes successfully with a valid email', async ({ page }) => {
    await page.goto('/blog');
    const form = page.locator('form.newsletter-box').first();
    await form.getByPlaceholder('you@factory.com').fill('reader@factory.vn');
    await form.getByRole('button', { name: 'Subscribe' }).click();

    await expect(page.getByText('Subscribed.')).toBeVisible();
  });
});
