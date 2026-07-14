import { expect, test, type Page } from "@playwright/test";
import os from "node:os";
import { installCoreFixture } from "./fixtures/core-050";

const SAMPLE_COUNT = 10;
const WARM_UP_COUNT = 2;

type Measurement = {
  id: string;
  description: string;
  viewport: { width: number; height: number };
  rawSamplesMs: number[];
  medianMs: number;
  p95Ms: number;
  within100MsPercent: number;
  method: string;
};

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

function percentile(samples: number[], percentileValue: number): number {
  const ordered = samples.slice().sort((left, right) => left - right);
  const index = Math.min(ordered.length - 1, Math.ceil(percentileValue * ordered.length) - 1);
  return round(ordered[index]);
}

function summarize(
  id: string,
  description: string,
  viewport: { width: number; height: number },
  rawSamplesMs: number[],
  method: string,
): Measurement {
  const ordered = rawSamplesMs.slice().sort((left, right) => left - right);
  const middle = Math.floor(ordered.length / 2);
  const medianMs = ordered.length % 2 === 0
    ? (ordered[middle - 1] + ordered[middle]) / 2
    : ordered[middle];
  return {
    id,
    description,
    viewport,
    rawSamplesMs: rawSamplesMs.map(round),
    medianMs: round(medianMs),
    p95Ms: percentile(ordered, 0.95),
    within100MsPercent: round(
      (rawSamplesMs.filter((sample) => sample <= 100).length / rawSamplesMs.length) * 100,
    ),
    method,
  };
}

async function duration(action: () => Promise<void>): Promise<number> {
  const start = performance.now();
  await action();
  return round(performance.now() - start);
}

async function waitForShell(page: Page): Promise<void> {
  await expect(page.locator(".nx-app-root")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("dir", /^(ltr|rtl)$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", /^(light|dark)$/);
}

async function browserClickFeedback(
  page: Page,
  triggerSelector: string,
  targetSelector: string,
  attribute: string,
  expectedValue: string | null,
): Promise<number> {
  await page.evaluate(({ triggerSelector, targetSelector, attribute, expectedValue }) => {
    const measuredWindow = window as typeof window & { __core050FeedbackMs?: number | null };
    measuredWindow.__core050FeedbackMs = null;
    const trigger = document.querySelector<HTMLElement>(triggerSelector)!;
    const target = document.querySelector<HTMLElement>(targetSelector)!;
    trigger.addEventListener("click", () => {
      const start = performance.now();
      const check = () => {
        if (target.getAttribute(attribute) !== expectedValue) return false;
        measuredWindow.__core050FeedbackMs = performance.now() - start;
        return true;
      };
      const observer = new MutationObserver(() => {
        if (check()) observer.disconnect();
      });
      observer.observe(target, { attributes: true, attributeFilter: [attribute] });
      requestAnimationFrame(() => {
        if (check()) observer.disconnect();
      });
    }, { capture: true, once: true });
  }, { triggerSelector, targetSelector, attribute, expectedValue });

  await page.locator(triggerSelector).click();
  await expect.poll(() => page.evaluate(() => (
    window as typeof window & { __core050FeedbackMs?: number | null }
  ).__core050FeedbackMs)).not.toBeNull();
  return round(await page.evaluate(() => (
    window as typeof window & { __core050FeedbackMs: number }
  ).__core050FeedbackMs));
}

if (process.env.CORE_050_PLAYWRIGHT === "1") registerPerformanceBaseline();

function registerPerformanceBaseline(): void {
test("captures the Feature 050 local comparative reference", async ({ page, browser }, testInfo) => {
  test.setTimeout(180_000);
  await installCoreFixture(page, "valid");
  const measurements: Measurement[] = [];

  await page.setViewportSize({ width: 1440, height: 1000 });
  for (let index = 0; index < WARM_UP_COUNT; index += 1) {
    await page.goto(`/dashboard/apps?warmup=hydration-${index}`);
    await waitForShell(page);
  }
  const hydrationSamples: number[] = [];
  for (let index = 0; index < SAMPLE_COUNT; index += 1) {
    hydrationSamples.push(await duration(async () => {
      await page.goto(`/dashboard/apps?sample=hydration-${index}`);
      await waitForShell(page);
    }));
  }
  measurements.push(summarize(
    "initial_shell_readiness",
    "Full local navigation start until the hydrated Core shell is visible and theme/direction effects are applied.",
    { width: 1440, height: 1000 },
    hydrationSamples,
    "Warm-cache page.goto to /dashboard/apps plus visible .nx-app-root and html dir/data-theme readiness.",
  ));

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/dashboard/apps?measure=drawer");
  await waitForShell(page);
  const burger = page.getByRole("button", { name: "Menu", exact: true });
  const drawerSamples: number[] = [];
  const drawerComponents: Array<{ openMs: number; closeMs: number }> = [];
  for (let index = 0; index < SAMPLE_COUNT; index += 1) {
    const openMs = await duration(async () => {
      await burger.click();
      await expect(page.locator(".nx-sidebar")).toHaveClass(/open/);
    });
    const closeMs = await duration(async () => {
      await page.locator(".nx-shell-scrim").click({ position: { x: 370, y: 400 } });
      await expect(page.locator(".nx-sidebar")).not.toHaveClass(/open/);
    });
    drawerComponents.push({ openMs, closeMs });
    drawerSamples.push(Math.max(openMs, closeMs));
  }
  measurements.push(summarize(
    "drawer_open_close_feedback",
    "Slower visible-feedback result from each paired compact drawer open and scrim-close cycle.",
    { width: 375, height: 812 },
    drawerSamples,
    "Playwright click until the existing .open class appears/disappears; raw component timings are attached separately.",
  ));

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/dashboard/apps?measure=menu");
  await waitForShell(page);
  const userMenu = page.getByRole("button", { name: "User menu" });
  const menuSamples: number[] = [];
  for (let index = 0; index < SAMPLE_COUNT; index += 1) {
    menuSamples.push(await duration(async () => {
      await userMenu.click();
      await expect(page.getByRole("menuitem", { name: "Account", exact: true })).toBeVisible();
    }));
    await userMenu.click();
    await expect(page.getByRole("menuitem", { name: "Account", exact: true })).toBeHidden();
  }
  measurements.push(summarize(
    "profile_menu_open_feedback",
    "Profile trigger activation until the existing Account menu item is visible.",
    { width: 1440, height: 1000 },
    menuSamples,
    "Playwright click plus visible menu-item locator; includes automation/action scheduling overhead.",
  ));

  const localeSamples: number[] = [];
  for (let index = 0; index < SAMPLE_COUNT; index += 1) {
    const useArabic = index % 2 === 0;
    localeSamples.push(await duration(async () => {
      await page.getByRole("button", { name: useArabic ? "العربية" : "English", exact: true }).click();
      await expect(page.locator("html")).toHaveAttribute("lang", useArabic ? "ar" : "en");
      await expect(page.locator("html")).toHaveAttribute("dir", useArabic ? "rtl" : "ltr");
    }));
  }
  measurements.push(summarize(
    "locale_switch_feedback",
    "Locale activation until html lang and direction match the selected existing control.",
    { width: 1440, height: 1000 },
    localeSamples,
    "Alternating EN/Arabic control clicks with observable html lang/dir completion.",
  ));

  const themeSamples: number[] = [];
  let expectedTheme: "light" | "dark" = "light";
  for (let index = 0; index < SAMPLE_COUNT; index += 1) {
    expectedTheme = expectedTheme === "light" ? "dark" : "light";
    const nextTheme = expectedTheme;
    themeSamples.push(await duration(async () => {
      await page.locator(".nx-topbar button.nx-icon-btn[aria-pressed]").click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", nextTheme);
    }));
  }
  measurements.push(summarize(
    "theme_switch_feedback",
    "Theme activation until the existing html data-theme effect matches the next theme.",
    { width: 1440, height: 1000 },
    themeSamples,
    "Alternating current theme toggle clicks with observable html data-theme completion.",
  ));

  const routeSamples: number[] = [];
  for (let index = 0; index < SAMPLE_COUNT; index += 1) {
    const route = index % 2 === 0 ? "/dashboard/billing" : "/dashboard/apps";
    routeSamples.push(await duration(async () => {
      await page.locator(`.nx-sb-nav a[href="${route}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${route}(?:\\?.*)?$`));
      await expect(page.locator("main.nx-main").getByRole("heading", { level: 1 }).first()).toBeVisible();
    }));
  }
  measurements.push(summarize(
    "route_navigation_readiness",
    "Existing sidebar activation until the destination URL and main page canvas are ready.",
    { width: 1440, height: 1000 },
    routeSamples,
    "Alternating warm client navigation between Product Hub and Billing using preserved sidebar links.",
  ));

  const browserFeedbackSamples: number[] = [];
  const browserFeedbackComponents: Array<{ profileMs: number; localeMs: number; themeMs: number }> = [];
  for (let index = 0; index < SAMPLE_COUNT; index += 1) {
    const profileMs = await browserClickFeedback(
      page,
      '[aria-controls="user-menu"]',
      "#user-menu",
      "hidden",
      null,
    );
    await page.locator('[aria-controls="user-menu"]').click();
    await expect(page.locator("#user-menu")).toBeHidden();

    const useArabic = index % 2 === 0;
    const localeMs = await browserClickFeedback(
      page,
      `.nx-langswitch button[aria-label="${useArabic ? "العربية" : "English"}"]`,
      "html",
      "lang",
      useArabic ? "ar" : "en",
    );

    const currentTheme = await page.locator("html").getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    const themeMs = await browserClickFeedback(
      page,
      ".nx-topbar-controls > button.nx-icon-btn",
      "html",
      "data-theme",
      nextTheme,
    );
    browserFeedbackComponents.push({ profileMs, localeMs, themeMs });
    browserFeedbackSamples.push(Math.max(profileMs, localeMs, themeMs));
  }
  measurements.push(summarize(
    "browser_event_to_visible_feedback",
    "Slowest browser event-to-DOM feedback among profile, locale, and theme in each cycle.",
    { width: 1440, height: 1000 },
    browserFeedbackSamples,
    "Playwright dispatches a user-like click; performance.now starts in the capture listener and ends when the target DOM attribute/visibility mutation is observed.",
  ));

  const result = {
    schemaVersion: 1,
    feature: "050-core-shell-stabilization",
    capturedAt: new Date().toISOString(),
    sourceRevision: "636952f7ccb49d9c697b8cbbf0250ccbcf2c93b0",
    environment: {
      buildMode: "production",
      server: "http://127.0.0.1:3001",
      node: process.version,
      pnpm: "9.15.9",
      playwright: "1.61.0",
      chromium: browser.version(),
      platform: `${os.platform()} ${os.release()} ${os.arch()}`,
      cpu: os.cpus()[0]?.model ?? "unknown",
      workers: 1,
      slowMotionMs: 0,
      fixture: "valid legacy BusinessUnit compatibility tuple",
      locale: "en/ar alternating where measured",
      theme: "light/dark alternating where measured",
      warmUpCount: WARM_UP_COUNT,
      sampleCount: SAMPLE_COUNT,
    },
    approvedGates: {
      changedRouteMedianMaximumRegressionPercent: 10,
      localInteractionFeedbackTargetMs: 100,
      localInteractionRequiredPercent: 95,
    },
    limitations: [
      "Local loopback, one machine, warm browser cache, no network/CPU throttling; this is not a production SLO.",
      "Playwright action and locator scheduling overhead is included in user-triggered interaction samples.",
      "The additional browser event-to-visible-feedback measure excludes Playwright scheduling before event dispatch and is the applicable 100 ms visible-feedback gate; external action timings remain diagnostic and comparable with Phase A.",
      "Drawer measurement stores the slower result from each paired open/close cycle; component timings are attached to the test report.",
      "Route samples alternate two preserved client-side destinations after warm-up and do not model cold external navigation.",
      "Future comparisons are valid only with the same build mode, browser, fixture, viewport, worker count, and method.",
    ],
    measurements,
  };

  await testInfo.attach("performance-baseline", {
    body: Buffer.from(JSON.stringify(result, null, 2)),
    contentType: "application/json",
  });
  await testInfo.attach("drawer-component-samples", {
    body: Buffer.from(JSON.stringify(drawerComponents, null, 2)),
    contentType: "application/json",
  });
  await testInfo.attach("browser-feedback-component-samples", {
    body: Buffer.from(JSON.stringify(browserFeedbackComponents, null, 2)),
    contentType: "application/json",
  });
  console.log(`CORE_050_PERFORMANCE_RESULT=${JSON.stringify(result)}`);
});
}
