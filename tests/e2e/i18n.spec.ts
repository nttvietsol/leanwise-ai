import { test, expect } from '@playwright/test';

test.describe('i18n EN/VI toggle', () => {
  test('default language is English', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'About' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get a Demo' }).first()).toBeVisible();
  });

  test('toggling to VI translates nav and CTA', async ({ page, isMobile }) => {
    test.skip(isMobile, 'lang toggle is in the desktop nav actions');

    await page.goto('/');
    // Multiple toggles exist (header + footer) — pick the first visible.
    await page.locator('.lang-toggle').first().getByRole('button', { name: 'VI', exact: true }).click();

    await expect(page.getByRole('link', { name: 'Về chúng tôi' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Đặt lịch demo' }).first()).toBeVisible();
    await expect(page.getByText('Tư duy Lean. Tốc độ AI. Kết quả thực.').first()).toBeVisible();
  });

  test('language preference persists across navigation', async ({ page, isMobile }) => {
    test.skip(isMobile, 'lang toggle is in the desktop nav actions');

    await page.goto('/');
    await page.locator('.lang-toggle').first().getByRole('button', { name: 'VI', exact: true }).click();
    await expect(page.getByRole('link', { name: 'Về chúng tôi' }).first()).toBeVisible();

    await page.getByRole('link', { name: 'Về chúng tôi' }).first().click();
    await expect(page).toHaveURL('/about');

    // Nav should still be in Vietnamese.
    await expect(page.getByRole('link', { name: 'Liên hệ' }).first()).toBeVisible();
  });
});
