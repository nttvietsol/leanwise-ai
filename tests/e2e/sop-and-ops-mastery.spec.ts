import { test, expect } from '@playwright/test';
import { hydrated } from './_helpers';

test.describe('SOP Mastery (R&D)', () => {
  test('renders hero and waitlist form', async ({ page }) => {
    await page.goto('/solutions/sop-mastery');
    await expect(
      page.getByRole('heading', { name: /Visual SOPs/, level: 1 }),
    ).toBeVisible();
    await expect(page.getByText('MOD.02 · R&D · Q4 2026')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Pilot opens/ })).toBeVisible();
  });

  test('waitlist rejects invalid email, accepts valid', async ({ page }) => {
    await page.goto('/solutions/sop-mastery#waitlist');
    await hydrated(page);

    await page.getByLabel('Work email').fill('not-an-email');
    await page.getByRole('button', { name: /Request pilot slot/ }).click();
    await expect(page.getByText('Please enter a valid work email.')).toBeVisible();

    await page.getByLabel('Work email').fill('test@factory.vn');
    await page.getByRole('button', { name: /Request pilot slot/ }).click();
    await expect(page.getByText(/You're on the list/)).toBeVisible();
  });
});

test.describe('Operations Mastery (research)', () => {
  test('renders hero, research questions, and partner form', async ({ page }) => {
    await page.goto('/solutions/operations-mastery');
    await expect(
      page.getByRole('heading', { name: /30 seconds/, level: 1 }),
    ).toBeVisible();
    await expect(page.getByText('MOD.03 · RESEARCH · 2027')).toBeVisible();
    await expect(page.getByRole('button', { name: /Apply as partner/ })).toBeVisible();
  });
});
