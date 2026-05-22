import { test, expect } from '@playwright/test';

test.describe('Blog article', () => {
  test('renders the long-form essay with author and related posts', async ({
    page,
  }) => {
    await page.goto('/blog/the-auditor-doesnt-care');

    await expect(page).toHaveTitle(/auditor doesn't care/);
    await expect(
      page.getByRole('heading', { name: /auditor doesn't care/, level: 1 }),
    ).toBeVisible();
    await expect(page.getByText('Trần Minh Đức').first()).toBeVisible();

    await expect(
      page.getByRole('heading', { name: /is a liability/ }),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Related field notes' }),
    ).toBeVisible();
  });

  test('back link returns to resources', async ({ page }) => {
    await page.goto('/blog/the-auditor-doesnt-care');
    await page.getByRole('link', { name: /Resources/ }).first().click();
    await expect(page).toHaveURL('/resources');
  });
});

test.describe('Talimex case study', () => {
  test('renders hero stats and body', async ({ page }) => {
    await page.goto('/case-studies/talimex');
    await expect(
      page.getByRole('heading', { name: /3-minute click/, level: 1 }),
    ).toBeVisible();
    await expect(page.getByText('Audit time', { exact: true })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /The result · Q1 2026/ }),
    ).toBeVisible();
  });
});
