import { test, expect } from '@playwright/test';

/**
 * Placeholder smoke test so the harness + CI job are wired and green.
 * Real critical-path flows (sign in, create listing, search, contact seller)
 * are added in W3 step 2.
 */
test('home page loads', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.ok()).toBeTruthy();
  // The app mounts into #root; assert it renders something.
  await expect(page.locator('#root')).not.toBeEmpty();
});
