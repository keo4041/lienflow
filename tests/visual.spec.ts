import { test, expect } from '@playwright/test';

test('landing page visual check', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/landing-desktop.png', fullPage: true });

  // Check for key elements using more specific selectors
  await expect(page.locator('h1')).toContainText('Turn QuickBooks Invoices');
  await expect(page.locator('button:has-text("Sync with QuickBooks")').first()).toBeVisible();
  await expect(page.locator('text=Audit Shield').first()).toBeVisible();
});

test('auth page visual check', async ({ page }) => {
  await page.goto('/auth');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/auth-desktop.png', fullPage: true });

  await expect(page.locator('h2')).toContainText('The Secure Bridge');
  await expect(page.locator('text=Corporate Email')).toBeVisible();
});

test('mobile view check', async ({ page, isMobile }) => {
  if (!isMobile) return;

  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/landing-mobile.png', fullPage: true });

  // Check for mobile nav
  await expect(page.locator('nav.md\\:hidden')).toBeVisible();
});
