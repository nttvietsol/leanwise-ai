import { test, expect } from '@playwright/test';

test.describe('SEO + static assets', () => {
  test('home has title, description, OG tags', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/LeanWise AI/);

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description).toMatch(/AI-powered platform/i);

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBe('LeanWise AI');

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toContain('/assets/');
  });

  test('html lang="en" by default', async ({ page }) => {
    await page.goto('/');
    expect(await page.locator('html').getAttribute('lang')).toBe('en');
  });

  test('product page has its own title', async ({ page }) => {
    await page.goto('/solutions/connect-mastery');
    await expect(page).toHaveTitle(/CONNECT Mastery/);
  });

  test('robots.txt is served', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type'] || '').toMatch(/text\/plain/);
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
      '/about',
      '/solutions/connect-mastery',
      '/get-a-demo',
      '/blog',
    ]) {
      expect(body).toContain(`https://leanwise.ai${path}`);
    }
  });

  test('logo asset is served', async ({ request }) => {
    const res = await request.get('/assets/logo_leanwise.png');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type'] || '').toMatch(/image\/png/);
  });
});
