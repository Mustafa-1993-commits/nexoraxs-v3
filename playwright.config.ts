import { defineConfig, devices } from "@playwright/test";

const LANDING_URL = process.env.LANDING_URL ?? "http://localhost:3000";
const CORE_URL = process.env.CORE_URL ?? "http://localhost:3001";
const COMMERCE_URL = process.env.COMMERCE_URL ?? "http://localhost:3002";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  metadata: {
    LANDING_URL,
    CORE_URL,
    COMMERCE_URL,
  },
  use: {
    baseURL: COMMERCE_URL,
    // headless=false shows the browser during E2E runs for manual QA review.
    headless: false,
    launchOptions: {
      // slowMo adds a 2000ms delay between Playwright actions.
      slowMo: 2000,
    },
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "pnpm dev",
    url: COMMERCE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
