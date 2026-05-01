import { test, expect } from '@playwright/test';

test.describe('CONNECT Mastery product page', () => {
  test('renders hero, 3 features, results, steps, testimonials', async ({ page }) => {
    await page.goto('/solutions/connect-mastery');

    // Hero
    await expect(page.getByRole('heading', { name: 'CONNECT Mastery', exact: true })).toBeVisible();
    await expect(page.getByText('Eliminate Compliance Waste')).toBeVisible();
    await expect(page.getByText(/Available now/i).first()).toBeVisible();

    // Three feature blocks
    await expect(page.getByRole('heading', { name: /Catch the Errors That Actually Fail Audits/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Every Requirement in Your TSS/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: /One Click\. Walk Away\. Results Waiting/ })).toBeVisible();

    // Results stats
    await expect(page.getByText('75%').first()).toBeVisible();
    await expect(page.getByText('99%').first()).toBeVisible();

    // Steps
    await expect(page.getByRole('heading', { name: /Up and Running in 2 Weeks/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Book Demo' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '1 Week Setup' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Start Saving Time' })).toBeVisible();

    // Testimonials
    await expect(page.getByText(/full afternoon now takes under an hour/)).toBeVisible();

    // Final CTA + trust badges
    await expect(page.getByRole('heading', { name: /Ready to Master CONNECT/ })).toBeVisible();
    await expect(page.getByText(/No credit card needed/)).toBeVisible();
    await expect(page.getByText(/2 weeks to full deployment/)).toBeVisible();
  });
});
