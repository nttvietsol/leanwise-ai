import { test, expect } from '@playwright/test';

test.describe('SEO + static assets', () => {
  test('home has title, description, OG tags', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/LeanWise AI/);

    const description = await page
      .locator('meta[name="description"]')
      .getAttribute('content');
    expect(description).toBeTruthy();
    expect(description).toMatch(/CONNECT/i);

    const ogTitle = await page
      .locator('meta[property="og:title"]')
      .getAttribute('content');
    expect(ogTitle).toBe('LeanWise AI');

    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute('content');
    expect(ogImage).toContain('/assets/');
  });

  test('html lang="en"', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    expect(await html.getAttribute('lang')).toBe('en');
  });

  test('product page has its own title', async ({ page }) => {
    await page.goto('/product');
    await expect(page).toHaveTitle(/IKEA CONNECT compliance/);
  });

  test('legacy URLs redirect, unknown articles 404 cleanly', async ({ page }) => {
    await page.goto('/get-a-demo');
    await expect(page).toHaveURL('/contact');

    await page.goto('/blog');
    await expect(page).toHaveURL('/resources');

    // /blog/$slug is a real article route — an unknown slug renders a proper
    // 404 page with a route back to Resources, not a soft redirect.
    await page.goto('/blog/some-old-article');
    await expect(
      page.getByRole('heading', { name: /doesn't exist/ }),
    ).toBeVisible();
  });

  test('robots.txt is served', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('User-agent: *');
    expect(body).toContain('Sitemap:');
  });

  test('sitemap.xml is served and lists key URLs', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('<urlset');
    for (const path of [
      '/',
      '/company',
      '/product',
      '/pricing',
      '/resources',
      '/blog/the-auditor-doesnt-care',
    ]) {
      expect(body).toContain(`https://leanwise.ai${path}`);
    }
  });

  test('logo asset is served', async ({ request }) => {
    const res = await request.get('/assets/logo-icon.png');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type'] || '').toMatch(/image\/png/);
  });
});
