import { test, expect } from '@playwright/test';

test.describe('Resources page', () => {
  test('renders hero, filters, and at least one card', async ({ page }) => {
    await page.goto('/resources');

    await expect(page.getByText('Resources').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Free playbooks, templates,/ })).toBeVisible();

    await expect(page.getByRole('heading', { name: 'The CONNECT Compliance Playbook' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'TSS Mismatch Decision Tree' })).toBeVisible();
  });

  test('filters by category', async ({ page }) => {
    await page.goto('/resources');
    await page.getByRole('button', { name: 'Lean' }).first().click();

    await expect(page.getByRole('heading', { name: 'SOP Visual Builder Starter' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The CONNECT Compliance Playbook' })).not.toBeVisible();
  });

  test('opens gate modal and submits with valid email', async ({ page }) => {
    await page.goto('/resources');

    // The first gated resource is the Playbook.
    await page
      .locator('article', { hasText: 'The CONNECT Compliance Playbook' })
      .getByRole('button', { name: /Download/ })
      .click();

    // Modal opens — scope to the dialog, not the card on the page
    const modal = page.locator('.gate-modal');
    await expect(modal).toBeVisible();
    await expect(modal.getByText(/Tell us where to send it/)).toBeVisible();

    // Invalid email
    await page.getByLabel(/Work email/).fill('bad');
    await page.getByRole('button', { name: /Send me the/ }).click();
    await expect(page.getByText(/Please enter a valid work email/)).toBeVisible();

    // Valid email → success state
    await page.getByLabel(/Work email/).fill('me@factory.vn');
    await page.getByLabel(/Full name/).fill('Test Lead');
    await page.getByRole('button', { name: /Send me the/ }).click();

    await expect(page.getByRole('heading', { name: /Check your inbox/ })).toBeVisible();
    await expect(page.getByText('me@factory.vn')).toBeVisible();
  });
});
