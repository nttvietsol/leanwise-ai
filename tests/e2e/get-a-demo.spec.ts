import { test, expect } from '@playwright/test';

test.describe('Get a Demo form', () => {
  test('renders process steps and form', async ({ page }) => {
    await page.goto('/get-a-demo');

    await expect(
      page.getByRole('heading', { name: /See CONNECT Mastery in Action/ }),
    ).toBeVisible();
    await expect(page.getByText(/30-min walkthrough/)).toBeVisible();
    await expect(page.getByText(/We review your request/)).toBeVisible();
    await expect(page.getByText(/30-minute live demo/)).toBeVisible();
    await expect(page.getByText(/no commitment required/)).toBeVisible();
  });

  test('requires name, company, valid email', async ({ page }) => {
    await page.goto('/get-a-demo');

    await page.getByRole('button', { name: 'Request demo' }).click();
    await expect(page.getByText('Required').first()).toBeVisible();

    await page.getByLabel('Full name *').fill('Test');
    await page.getByLabel('Company *').fill('Acme');
    await page.getByLabel('Work email *').fill('bad-email');
    await page.getByRole('button', { name: 'Request demo' }).click();
    await expect(page.getByText(/Please enter a valid work email/)).toBeVisible();
  });

  test('submits successfully and shows confirmation', async ({ page }) => {
    await page.goto('/get-a-demo');
    await page.getByLabel('Full name *').fill('Demo User');
    await page.getByLabel('Company *').fill('Acme Furniture');
    await page.getByLabel('Work email *').fill('demo@acme.vn');
    await page.getByLabel('Phone').fill('+84 999 000 111');
    await page.getByLabel(/What would you like to see/).selectOption('CONNECT Mastery — TSS matching');

    await page.getByRole('button', { name: 'Request demo' }).click();

    await expect(page.getByRole('heading', { name: 'Demo request received.' })).toBeVisible();
    await expect(page.getByText('demo@acme.vn')).toBeVisible();
  });
});
