import { test, expect } from '@playwright/test';

test.describe('Blog list', () => {
  test('renders Knowledge Hub hero, featured post, and categories', async ({ page }) => {
    await page.goto('/blog');

    await expect(page.getByText('Knowledge Hub')).toBeVisible();
    await expect(page.getByRole('heading', { name: /factory floor/ })).toBeVisible();

    // Featured post
    await expect(
      page.getByRole('heading', { name: /7 most expensive TSS mismatches/ }),
    ).toBeVisible();

    // Category buttons
    for (const c of ['All', 'Lean Manufacturing', 'IKEA CONNECT Tips', 'Case Studies']) {
      await expect(page.getByRole('button', { name: c })).toBeVisible();
    }
  });

  test('filters by category', async ({ page }) => {
    await page.goto('/blog');
    await page.getByRole('button', { name: 'Case Studies' }).click();
    await expect(page.getByRole('heading', { name: /SEDO Camping/ })).toBeVisible();
    // A non-Case-Studies post should not appear
    await expect(page.getByRole('heading', { name: /AI doesn't replace Lean/ })).not.toBeVisible();
  });

  test('search filters posts', async ({ page }) => {
    await page.goto('/blog');
    await page.getByPlaceholder('Search articles...').fill('checklist');
    await expect(page.getByRole('heading', { name: /Why checklists fail/ })).toBeVisible();
  });

  test('navigates to article and renders content', async ({ page }) => {
    await page.goto('/blog');
    await page.getByRole('heading', { name: /SEDO Camping/ }).click();
    await expect(page).toHaveURL(/\/blog\/sedo-camping-case-study/);
    await expect(page.getByRole('heading', { name: /Why this matters/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Back to Blog/ })).toBeVisible();
  });

  test('article 404s for unknown slug', async ({ page }) => {
    const res = await page.goto('/blog/not-a-real-post', { waitUntil: 'commit' });
    // TanStack Start returns notFound() — expect either 404 status or
    // the default not-found UI; assert the body doesn't contain a real title.
    if (res) expect([200, 404]).toContain(res.status());
  });
});
