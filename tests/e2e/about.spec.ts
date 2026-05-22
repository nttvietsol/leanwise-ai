import { test, expect } from '@playwright/test';

test.describe('About page', () => {
  test('renders hero, principles, and founding team', async ({ page }) => {
    await page.goto('/about');

    await expect(
      page.getByRole('heading', { name: /same factories/, level: 1 }),
    ).toBeVisible();

    // Principles
    await expect(
      page.getByRole('heading', { name: /Earn the operator/ }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Lean before AI' })).toBeVisible();

    // Team
    await expect(page.getByText('Nguyen Tien Dat')).toBeVisible();
    await expect(page.getByText('CTO · COFOUNDER')).toBeVisible();
  });
});

test.describe('Pricing page', () => {
  test('renders three plans and comparison table', async ({ page }) => {
    await page.goto('/pricing');
    await expect(
      page.getByRole('heading', { name: /Priced per plant/, level: 1 }),
    ).toBeVisible();
    for (const plan of ['Starter', 'Plant', 'Portfolio']) {
      await expect(page.getByRole('heading', { name: plan, exact: true })).toBeVisible();
    }
    await expect(page.getByText('MOST PICKED')).toBeVisible();
  });
});

test.describe('Customers page', () => {
  test('renders customer stories and links to the case study', async ({ page }) => {
    await page.goto('/customers');
    await expect(
      page.getByRole('heading', { name: /customers/, level: 1 }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Talimex' })).toBeVisible();
    await page.getByRole('heading', { name: 'Talimex' }).click();
    await expect(page).toHaveURL('/case-studies/talimex');
  });
});
