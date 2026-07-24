import { test, expect } from '@playwright/test';

test('home page loads and renders content', async ({ page }) => {
  const response = await page.goto('/?lang=en');
  expect(response?.ok()).toBeTruthy();
  await expect(page.locator('#root')).not.toBeEmpty();
  // A real title is set (not the empty index shell).
  await expect(page).toHaveTitle(/CarMarket365/i);
});
