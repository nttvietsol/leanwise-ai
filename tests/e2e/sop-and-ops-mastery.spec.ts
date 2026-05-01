import { test, expect } from '@playwright/test';

test.describe('SOP Mastery (coming soon)', () => {
  test('renders R&D pill, hero, and waitlist form', async ({ page }) => {
    await page.goto('/solutions/sop-mastery');

    await expect(page.getByRole('heading', { name: 'SOP Mastery' })).toBeVisible();
    await expect(page.getByText(/R&D · In development/)).toBeVisible();
    await expect(page.getByText('Optimize your processes')).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Join the waitlist' })).toBeVisible();
  });

  test('waitlist form rejects invalid email', async ({ page }) => {
    await page.goto('/solutions/sop-mastery#waitlist');
    await page.getByLabel(/Work email/).fill('not-an-email');
    await page.getByRole('button', { name: 'Join waitlist' }).click();
    await expect(page.getByText('Please enter a valid email.')).toBeVisible();
  });

  test('waitlist form succeeds with a valid email', async ({ page }) => {
    await page.goto('/solutions/sop-mastery#waitlist');
    await page.getByLabel(/Work email/).fill('test@factory.vn');
    await page.getByLabel(/Company/).fill('Test Factory');
    await page.getByRole('button', { name: 'Join waitlist' }).click();
    await expect(page.getByRole('heading', { name: /You're on the list/ })).toBeVisible();
    await expect(page.getByText('test@factory.vn')).toBeVisible();
  });
});

test.describe('Operations Mastery (research)', () => {
  test('renders research pill, ops mock, and follow-research form', async ({ page }) => {
    await page.goto('/solutions/operations-mastery');

    await expect(page.getByRole('heading', { name: 'Operations Mastery' })).toBeVisible();
    await expect(page.getByText(/R&D · Research/)).toBeVisible();
    await expect(page.getByText('Boost operational performance')).toBeVisible();

    // Mock dashboard tiles
    await expect(page.getByText('OEE')).toBeVisible();
    await expect(page.getByText('DEFECTS')).toBeVisible();

    // Form succeeds
    await page.getByLabel(/Work email/).fill('ops@factory.vn');
    await page.getByRole('button', { name: 'Join waitlist' }).click();
    await expect(page.getByRole('heading', { name: /You're on the list/ })).toBeVisible();
  });
});
