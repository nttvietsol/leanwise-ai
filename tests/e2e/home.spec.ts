import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads hero, trust strip, and core sections', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/LeanWise AI/);

    await expect(
      page.getByRole('heading', { name: /compliance audits/i, level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Book a demo/ }).first(),
    ).toBeVisible();

    await expect(page.getByText('Live at IKEA-supplier plants')).toBeVisible();

    await expect(
      page.getByRole('heading', { name: /where suppliers lose days/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /signed-off audit/ }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /How LeanWise compares/ }),
    ).toBeVisible();
  });

  test('live validation panel and roadmap teaser render', async ({ page }) => {
    await page.goto('/');

    // The hero artifact (Live Validation Panel) summarizes a validated document.
    await expect(page.getByText(/39 pass/)).toBeVisible();

    // The subordinate roadmap teaser points to the product roadmap.
    const roadmapLink = page.getByRole('link', { name: /See the roadmap/ });
    await expect(roadmapLink).toBeVisible();
  });
});
