import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('Solutions dropdown opens and links work', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop dropdown only');

    await page.goto('/');
    const trigger = page.getByRole('button', { name: /Solutions/ });
    await trigger.hover();

    await expect(page.getByRole('link', { name: /CONNECT Mastery/ }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /SOP Mastery/ }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Operations Mastery/ }).first()).toBeVisible();

    await page.getByRole('link', { name: /CONNECT Mastery/ }).first().click();
    await expect(page).toHaveURL('/solutions/connect-mastery');
  });

  test('mobile burger opens menu', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile only');

    await page.goto('/');
    await page.getByRole('button', { name: 'Menu' }).click();

    await expect(page.getByRole('link', { name: 'About' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Blog' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' }).first()).toBeVisible();
  });

  test('footer links all work', async ({ page }) => {
    await page.goto('/');
    // Each footer column has a few links — sample one from each.
    await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Terms of Service' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'support@leanwise.ai' })).toHaveAttribute(
      'href',
      'mailto:support@leanwise.ai',
    );
  });
});
