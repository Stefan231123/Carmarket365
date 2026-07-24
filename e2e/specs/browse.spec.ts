import { test, expect } from '@playwright/test';

/**
 * Read-only browse + listing-detail flow. Safe to run against production:
 * navigates and reads only, never signs in, writes, or submits a form.
 * `?lang=en` forces English so selectors don't depend on the geo-detected locale.
 */
test.describe('Browse listings', () => {
  test('the browse page renders listings', async ({ page }) => {
    await page.goto('/cars?lang=en');

    // Result count header is rendered in English regardless of locale.
    await expect(page.getByText(/\d+ Results/i).first()).toBeVisible();

    // At least one listing card with its actions.
    await expect(page.getByText(/View Details/i).first()).toBeVisible();
    await expect(page.getByText(/Contact/i).first()).toBeVisible();
  });

  test('opening a listing shows its detail page', async ({ page }) => {
    await page.goto('/cars?lang=en');

    await page.getByText(/View Details/i).first().click();

    // Detail route is /cars/<uuid>.
    await expect(page).toHaveURL(/\/cars\/[0-9a-f-]{36}/i);

    // The detail page renders a price and a way to contact the seller.
    await expect(page.getByText('€').first()).toBeVisible();
    await expect(page.getByText(/Contact/i).first()).toBeVisible();
  });
});
