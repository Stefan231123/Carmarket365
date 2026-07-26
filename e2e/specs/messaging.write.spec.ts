import { test, expect } from '@playwright/test';
import { isStaging, seedUser, seedListing, unreadCount, loginContext, type SeededUser, type SeededListing } from '../helpers/staging';

/**
 * WRITE-flow: a logged-in buyer contacts a seller from a listing via the
 * messenger widget. Creates data, so it runs on STAGING ONLY (guarded below).
 *
 * Accounts + the listing are seeded through staging's GraphQL API; the browser
 * drives the real UI (open widget → prefilled compose → send), and delivery is
 * verified both in the UI and back through the API (seller's unread count).
 */
test.describe('Messaging (write)', () => {
  test.skip(!isStaging(), 'write-flow tests run against staging only (set E2E_BASE_URL=https://staging.carmarket365.com)');

  let seller: SeededUser;
  let buyer: SeededUser;
  let listing: SeededListing;

  test.beforeAll(async () => {
    seller = await seedUser('seller');
    listing = await seedListing(seller.token);
    buyer = await seedUser('buyer');
  });

  test('buyer contacts the seller from a listing via in-app messaging', async ({ page, context }) => {
    await loginContext(context, buyer.token);

    // Open the seller's listing.
    await page.goto(`/cars/${listing.id}?lang=en`);
    await expect(page.getByRole('heading', { name: /Volkswagen Golf/i })).toBeVisible();

    // Primary CTA: start an in-app conversation with the seller. This posts a
    // prefilled opener and routes to the conversation on the full messages page.
    await page.getByRole('button', { name: /Message on CarMarket365/i }).click();
    await expect(page).toHaveURL(/\/messages\?c=/);

    // The prefilled opener shows in the thread.
    await expect(page.getByText(/interested in your/i)).toBeVisible();

    // And the seller actually has one unread message (verified via the API).
    await expect.poll(() => unreadCount(seller.token), { timeout: 15_000 }).toBe(1);
  });
});
