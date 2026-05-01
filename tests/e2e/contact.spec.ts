import { test, expect } from '@playwright/test';

test.describe('Contact form', () => {
  test('shows side panel info', async ({ page }) => {
    await page.goto('/contact');

    await expect(page.getByRole('heading', { name: 'Talk to Our Team' })).toBeVisible();
    await expect(page.getByText('support@leanwise.ai').first()).toBeVisible();
    await expect(page.getByText('Ho Chi Minh City, Vietnam').first()).toBeVisible();
  });

  test('rejects empty form with field errors', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('button', { name: 'Send message' }).click();

    await expect(page.getByText('Required').first()).toBeVisible();
    await expect(page.getByText(/Please enter a valid email/)).toBeVisible();
    await expect(page.getByText('Tell us a bit about what you need')).toBeVisible();
  });

  test('rejects invalid email but accepts valid', async ({ page }) => {
    await page.goto('/contact');
    await page.getByLabel('Full name *').fill('Test User');
    await page.getByLabel('Email *').fill('not-an-email');
    await page.getByLabel('Message *').fill('Hi from the e2e suite.');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByText(/Please enter a valid email/)).toBeVisible();

    await page.getByLabel('Email *').fill('test@example.com');
    await page.getByRole('button', { name: 'Send message' }).click();

    await expect(page.getByRole('heading', { name: 'Message sent.' })).toBeVisible();
    await expect(page.getByText('test@example.com')).toBeVisible();
    await expect(page.getByText('Test User')).toBeVisible();
  });
});
