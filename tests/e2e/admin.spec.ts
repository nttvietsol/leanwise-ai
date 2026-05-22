import { test, expect } from '@playwright/test';
import { hydrated } from './_helpers';

/**
 * The admin console is fronted by Cloudflare Access in production. Under the
 * dev server `import.meta.env.DEV` grants a dev identity, so these tests run
 * without an Access proxy. Each test cleans up the rows it creates.
 */
test.describe('Admin console', () => {
  test('dashboard renders posts and stories sections', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.getByRole('heading', { name: /^Posts/ })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /Customer stories/ }),
    ).toBeVisible();
  });

  test('create, edit, and delete a blog post', async ({ page }) => {
    const title = `E2E Post ${Date.now()}`;
    const edited = `${title} (edited)`;

    // ── create ──
    await page.goto('/admin/posts/new');
    await hydrated(page);
    await page.getByLabel('Title').fill(title);
    await page.getByLabel('Summary (dek)').fill('Created by the e2e suite.');
    await page.getByLabel('Body (Markdown)').fill('## Heading\n\nBody text.');
    await page.getByLabel('Status').selectOption('published');
    await page.getByRole('button', { name: 'Create post' }).click();

    await expect(page).toHaveURL('/admin');
    await expect(page.getByText(title, { exact: true })).toBeVisible();

    // published post is live on the public Resources page
    await page.goto('/resources');
    await expect(page.getByText(title, { exact: true })).toBeVisible();

    // ── edit ──
    await page.goto('/admin');
    await hydrated(page);
    await page
      .getByRole('row')
      .filter({ hasText: title })
      .getByRole('link', { name: 'Edit' })
      .click();
    await hydrated(page);
    await page.getByLabel('Title').fill(edited);
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page).toHaveURL('/admin');
    await expect(page.getByText(edited, { exact: true })).toBeVisible();

    // ── delete (cleanup) ──
    page.on('dialog', (d) => d.accept());
    await page
      .getByRole('row')
      .filter({ hasText: edited })
      .getByRole('button', { name: 'Delete' })
      .click();
    await expect(page.getByText(edited, { exact: true })).toHaveCount(0);
  });
});
