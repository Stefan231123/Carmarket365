import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E config.
 *
 * Target URL comes from E2E_BASE_URL (a Vercel preview/staging URL in CI, or a
 * local dev server). Defaults to production so a manual `npx playwright test`
 * has something to hit, but CI sets it explicitly.
 *
 * Real flows land tomorrow (W3 step 2). For now this holds one smoke test so
 * the harness and CI job are wired and green.
 */
export default defineConfig({
  testDir: './specs',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: process.env.E2E_BASE_URL || 'https://www.carmarket365.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
