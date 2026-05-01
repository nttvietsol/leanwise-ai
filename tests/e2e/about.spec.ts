import { test, expect } from '@playwright/test';

test.describe('About page', () => {
  test('renders origin story, vision, values, and founding team', async ({ page }) => {
    await page.goto('/about');

    // Origin
    await expect(page.getByRole('heading', { name: /10\+ Years/ })).toBeVisible();
    await expect(
      page.getByText(/working directly with IKEA suppliers/),
    ).toBeVisible();

    // Vision
    await expect(page.getByText('Our vision')).toBeVisible();
    await expect(page.getByText(/1,000\+ smart factories/)).toBeVisible();

    // Values — exact 4
    for (const v of ['Integrity', 'Continuous Improvement', 'Responsibility', 'Collaboration']) {
      await expect(page.getByRole('heading', { name: v })).toBeVisible();
    }

    // Founders
    await expect(page.getByRole('heading', { name: 'Truong Xuan Truong' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Nguyen Thanh Trung' })).toBeVisible();
    await expect(page.getByText('Founder & CEO')).toBeVisible();
    await expect(page.getByText('Co-Founder & CTO')).toBeVisible();

    // €1.2M+ proof point
    await expect(page.getByText(/€1\.2M\+/)).toBeVisible();
  });
});
