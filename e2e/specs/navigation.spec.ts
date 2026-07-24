import { test, expect } from '@playwright/test';

/**
 * Every key route must render without a blank screen or the error boundary —
 * the "white screen after a deploy / on navigation" class of bug. Read-only.
 */
const ROUTES = ['/', '/cars', '/about', '/contact', '/faq', '/privacy-policy', '/terms-of-service'];

for (const route of ROUTES) {
  test(`renders ${route} without crashing`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('pageerror', (err) => consoleErrors.push(String(err)));

    const res = await page.goto(`${route}?lang=en`);
    expect(res?.ok(), `HTTP status for ${route}`).toBeTruthy();

    // App mounts into #root and must render real content.
    const root = page.locator('#root');
    await expect(root).not.toBeEmpty();
    const text = (await root.innerText()).trim();
    expect(text.length, `content length for ${route}`).toBeGreaterThan(30);

    // The error boundary must not have caught anything.
    await expect(page.getByText(/something went wrong/i)).toHaveCount(0);

    // No uncaught runtime errors on load.
    expect(consoleErrors, `page errors on ${route}`).toEqual([]);
  });
}

test('unknown routes render the not-found page, not a crash', async ({ page }) => {
  await page.goto('/this-route-does-not-exist-xyz?lang=en');
  const root = page.locator('#root');
  await expect(root).not.toBeEmpty();
  // Should not white-screen or throw the error boundary.
  await expect(page.getByText(/something went wrong/i)).toHaveCount(0);
});
