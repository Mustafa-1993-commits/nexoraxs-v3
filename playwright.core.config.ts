import { defineConfig, devices } from "@playwright/test";

process.env.CORE_050_PLAYWRIGHT = "1";

/**
 * Feature 050 Core-only characterization harness.
 *
 * This config intentionally does not extend the existing Commerce config: Core uses port 3001,
 * one worker, headless Chromium, and no injected slow motion so interaction measurements remain
 * comparable. Run a Core production build before executing the suite.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: ["core-050-*.spec.ts"],
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report/core-050" }],
  ],
  outputDir: "test-results/core-050",
  use: {
    baseURL: "http://127.0.0.1:3001",
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: "pnpm --filter core-platform exec next start -p 3001",
    url: "http://127.0.0.1:3001/login",
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
