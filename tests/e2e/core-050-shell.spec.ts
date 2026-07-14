import { expect, test, type Page, type TestInfo } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { STORAGE_KEYS, t } from "../../packages/shared/src";
import {
  createShellPresentationState,
  evaluateShellContext,
  projectShellNotifications,
  searchCoreDestinations,
  shellStateForContext,
} from "../../apps/core-platform/lib/shell/presentation";
import type {
  CoreSearchEntry,
  CoreSearchKind,
  ShellContextSnapshot,
  ShellPresentationStateKind,
} from "../../apps/core-platform/lib/shell/contracts";
import {
  CORE_050_SEED_IDS,
  buildCoreStorage,
  fixtureContractSnapshot,
  installCoreFixture,
  snapshotCoreStorage,
  type CoreFixtureName,
} from "./fixtures/core-050";

const DASHBOARD_ROUTES = [
  "/dashboard",
  "/dashboard/apps",
  "/dashboard/billing",
  "/dashboard/team",
  "/dashboard/integrations",
  "/dashboard/settings",
] as const;

const SIDEBAR_ROUTES = [
  "/dashboard/apps",
  "/dashboard/billing",
  "/dashboard/team",
  "/dashboard/integrations",
  "/dashboard/settings",
] as const;

async function openDashboard(page: Page, fixture: CoreFixtureName = "valid"): Promise<void> {
  await installCoreFixture(page, fixture);
  await gotoHydrated(page, "/dashboard/apps");
  await expect(page).toHaveURL(/\/dashboard\/apps$/);
  await expect(page.locator(".nx-app-root")).toBeVisible();
}

async function gotoHydrated(page: Page, path: string): Promise<void> {
  await page.goto(path);
  await expect(page.locator("html")).toHaveAttribute("dir", /^(ltr|rtl)$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", /^(light|dark)$/);
}

async function attachJson(testInfo: TestInfo, name: string, value: unknown): Promise<void> {
  await testInfo.attach(name, {
    body: Buffer.from(JSON.stringify(value, null, 2)),
    contentType: "application/json",
  });
}

if (process.env.CORE_050_PLAYWRIGHT === "1") registerCoreShellTests();

function registerCoreShellTests(): void {
test.describe("T005 route, redirect, context, and storage characterization", () => {
  test("preserves public entry, auth aliases, and recovery routes", async ({ page }) => {
    await installCoreFixture(page, "missing");

    await gotoHydrated(page, "/");
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.locator(".nx-auth-title")).toHaveText("Log in");

    await gotoHydrated(page, "/register");
    await expect(page).toHaveURL(/\/register$/);
    await expect(page.locator(".nx-auth-title")).toHaveText("Start your free trial");

    for (const alias of ["/verify", "/verify-email"] as const) {
      await gotoHydrated(page, alias);
      await expect(page).toHaveURL(/\/register$/);
    }

    await gotoHydrated(page, "/forgot-password");
    await expect(page.locator(".nx-auth-title")).toHaveText("Reset your password");

    await gotoHydrated(page, "/reset-password");
    await expect(page.locator(".nx-auth-title")).toHaveText("Set new password");
  });

  test("preserves the local reset completion outcome", async ({ page }) => {
    await installCoreFixture(page, "missing");
    await gotoHydrated(page, "/reset-password");
    await page.getByLabel("New password").fill("fixture-password");
    await page.getByLabel("Confirm password").fill("fixture-password");
    await page.getByRole("button", { name: "Set new password" }).click();
    await expect(page).toHaveURL(/\/login\?reset=success$/);
    await expect(page.getByText("Password reset successfully")).toBeVisible();
  });

  test("preserves authenticated welcome, login, and onboarding redirects", async ({ page }) => {
    await installCoreFixture(page, "valid");

    await gotoHydrated(page, "/login");
    await expect(page).toHaveURL(/\/dashboard\/apps$/);

    await gotoHydrated(page, "/register");
    await expect(page).toHaveURL(/\/welcome$/);
    await expect(page.getByRole("heading", { name: "Create your workspace" })).toBeVisible();

    await gotoHydrated(page, "/onboarding");
    await expect(page).toHaveURL(/\/dashboard\/apps$/);
  });

  test("preserves true redirects and reconciles completed stale context", async ({ page }, testInfo) => {
    const cases: Array<{ fixture: CoreFixtureName; expected: RegExp; status?: string }> = [
      { fixture: "missing", expected: /\/login$/ },
      { fixture: "onboarding-incomplete", expected: /\/onboarding$/ },
      { fixture: "stale", expected: /\/dashboard\/apps$/, status: "stale" },
      { fixture: "malformed", expected: /\/onboarding$/ },
    ];
    const observations: Array<{ fixture: CoreFixtureName; destination: string }> = [];

    for (const item of cases) {
      const context = await page.context().browser()!.newContext({ baseURL: "http://127.0.0.1:3001" });
      const isolatedPage = await context.newPage();
      await installCoreFixture(isolatedPage, item.fixture);
      await gotoHydrated(isolatedPage, "/dashboard/apps");
      await expect(isolatedPage).toHaveURL(item.expected);
      if (item.status) {
        await expect(isolatedPage.locator(`[data-shell-context-status="${item.status}"]`)).toBeVisible();
      }
      observations.push({ fixture: item.fixture, destination: new URL(isolatedPage.url()).pathname });
      await context.close();
    }

    testInfo.annotations.push({
      type: "phase-d-reconciliation",
      description: "True incomplete and malformed-onboarding state retains its redirect; completed stale context now stays on the requested route with read-only recovery.",
    });
    await attachJson(testInfo, "guard-outcomes", observations);
  });

  test("keeps all six dashboard destinations ready under the current shell", async ({ page }) => {
    await installCoreFixture(page, "valid");
    for (const route of DASHBOARD_ROUTES) {
      await gotoHydrated(page, route);
      await expect(page).toHaveURL(new RegExp(`${route}$`));
      await expect(page.locator(".nx-app-root")).toBeVisible();
      await expect(page.locator("main.nx-main")).toBeVisible();
    }
  });

  test("preserves storage keys, seeded IDs, and context through navigation", async ({ page }, testInfo) => {
    const installed = await installCoreFixture(page, "valid");
    await gotoHydrated(page, "/dashboard/apps");
    await page.getByRole("navigation").getByRole("link", { name: "Billing", exact: true }).click();
    await expect(page).toHaveURL(/\/dashboard\/billing$/);
    const observed = await snapshotCoreStorage(page);

    for (const [key, value] of Object.entries(installed.local)) expect(observed.local[key]).toBe(value);
    for (const [key, value] of Object.entries(installed.session)) expect(observed.session[key]).toBe(value);

    expect(JSON.parse(observed.session[STORAGE_KEYS.currentUserId])).toBe(CORE_050_SEED_IDS.userId);
    expect(JSON.parse(observed.session[STORAGE_KEYS.currentWorkspaceId])).toBe(CORE_050_SEED_IDS.workspaceId);
    expect(JSON.parse(observed.session[STORAGE_KEYS.currentBusinessUnitId])).toBe(CORE_050_SEED_IDS.businessUnitId);
    expect(JSON.parse(observed.session[STORAGE_KEYS.currentBranchId])).toBe(CORE_050_SEED_IDS.branchId);
    await attachJson(testInfo, "fixture-contract", fixtureContractSnapshot("valid"));
  });

  test("preserves cross-scope legacy IDs while suppressing foreign projection exposure", async ({ page }, testInfo) => {
    const installed = await installCoreFixture(page, "cross-scope");
    await gotoHydrated(page, "/dashboard/apps");
    await expect(page).toHaveURL(/\/dashboard\/apps$/);
    await expect(page.locator(".nx-sb-switch-name")).toHaveText("Mustafa Group");
    await expect(page.getByText("Foreign Workspace")).toHaveCount(0);
    await expect(page.getByText("Foreign Business", { exact: true })).toHaveCount(0);
    await expect(page.locator('[data-shell-context-status="cross-scope"]')).toBeVisible();

    const observed = await snapshotCoreStorage(page);
    expect(observed.session[STORAGE_KEYS.currentBusinessUnitId]).toBe(
      installed.session[STORAGE_KEYS.currentBusinessUnitId],
    );
    expect(observed.session[STORAGE_KEYS.currentBranchId]).toBe(
      installed.session[STORAGE_KEYS.currentBranchId],
    );
    testInfo.annotations.push({
      type: "phase-d-reconciliation",
      description: "The legacy IDs remain byte-compatible while the shell blocks foreign BusinessUnit/Branch projection and presents safe recovery.",
    });
  });
});

test.describe("T006 shell control characterization", () => {
  test("freezes sidebar order and existing topbar placement", async ({ page }) => {
    await openDashboard(page);
    const sidebarLinks = page.locator(".nx-sb-nav a");
    await expect(sidebarLinks).toHaveCount(SIDEBAR_ROUTES.length);
    await expect(sidebarLinks).toHaveText([
      "Product Hub",
      "Billing",
      "Team & Access",
      "Integrations",
      "Settings",
    ]);
    expect(await sidebarLinks.evaluateAll((links) => links.map((link) => link.getAttribute("href"))))
      .toEqual(SIDEBAR_ROUTES);

    const topbarOrder = await page.locator(".nx-topbar").evaluate((topbar) => {
      const controls = Array.from(topbar.querySelectorAll("a, input, button"))
        .filter((control) => !control.closest("[hidden]"));
      return controls.map((control) =>
        control.getAttribute("aria-label")
        || control.getAttribute("placeholder")
        || control.querySelector("img")?.getAttribute("alt")
        || control.textContent?.trim()
        || control.tagName,
      );
    });
    expect(topbarOrder).toEqual([
      "NexoraXS",
      "Menu",
      "Search",
      "English",
      "العربية",
      "Switch to dark mode",
      "Notifications",
      "User menu",
    ]);
  });

  test("preserves search placement with destination-only behavior", async ({ page }) => {
    await openDashboard(page);
    const search = page.getByRole("combobox", { name: "Search" });
    await search.fill("billing");
    await expect(page.getByRole("option", { name: "Billing", exact: true })).toBeVisible();
    await search.press("Enter");
    await expect(page).toHaveURL(/\/dashboard\/billing$/);
    await expect(page.getByRole("listbox")).toHaveCount(0);
  });

  test("preserves populated notification indicator and projection order", async ({ page }) => {
    await openDashboard(page, "populated");
    const trigger = page.getByRole("button", { name: "Notifications" });
    await expect(trigger.locator(".nx-notif-dot")).toHaveCount(1);
    await trigger.click();
    const items = page
      .getByRole("dialog", { name: "Notifications" })
      .locator(".nx-dd-item");
    await expect(items).toHaveText([
      /Starter.*plan.*Free Trial/,
      /Out of stock:.*Fixture Out Product/,
      /Low stock:.*Fixture Low Product.*2 left/,
      /New order.*ORD-FIXTURE-001.*EGP/,
    ]);
  });

  test("preserves the empty notification outcome", async ({ page }) => {
    await openDashboard(page, "empty");
    const trigger = page.getByRole("button", { name: "Notifications" });
    await expect(trigger.locator(".nx-notif-dot")).toHaveCount(0);
    await trigger.click();
    await expect(page.getByText("No new notifications")).toBeVisible();
  });

  test("preserves profile destinations and logout storage compatibility", async ({ page }) => {
    await openDashboard(page);
    const destinations = [
      { label: "Account", route: "/dashboard/settings" },
      { label: "Billing", route: "/dashboard/billing" },
      { label: "Team", route: "/dashboard/team" },
    ] as const;

    for (const destination of destinations) {
      await gotoHydrated(page, "/dashboard/apps");
      await page.getByRole("button", { name: "User menu" }).click();
      await page.getByRole("menuitem", { name: destination.label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${destination.route}$`));
    }

    await gotoHydrated(page, "/dashboard/apps");
    await page.getByRole("button", { name: "User menu" }).click();
    await page.getByRole("menuitem", { name: "Sign out", exact: true }).click();
    await expect(page).toHaveURL(/\/login$/);
    const storage = await snapshotCoreStorage(page);
    expect(storage.session[STORAGE_KEYS.currentUserId]).toBeUndefined();
    expect(JSON.parse(storage.session[STORAGE_KEYS.currentWorkspaceId])).toBe(CORE_050_SEED_IDS.workspaceId);
    expect(JSON.parse(storage.session[STORAGE_KEYS.currentBusinessUnitId])).toBe(CORE_050_SEED_IDS.businessUnitId);
  });

  test("preserves locale and theme persistence formats", async ({ page }) => {
    await openDashboard(page);
    await page.getByRole("button", { name: "العربية" }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    expect((await snapshotCoreStorage(page)).session[STORAGE_KEYS.locale]).toBe(json("ar"));

    await page.locator('.nx-topbar button.nx-icon-btn[aria-pressed="false"]').click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect((await snapshotCoreStorage(page)).local[STORAGE_KEYS.theme]).toBe("dark");
  });

  test("preserves compact drawer close paths with stabilized Escape behavior", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await openDashboard(page);
    const burger = page.getByRole("button", { name: "Menu", exact: true });
    await burger.click();
    await expect(page.locator(".nx-sidebar")).toHaveClass(/open/);
    await expect(burger).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(page.locator(".nx-sidebar")).not.toHaveClass(/open/);
    await expect(burger).toBeFocused();

    await burger.click();
    await page.locator(".nx-shell-scrim").click({ position: { x: 370, y: 400 } });
    await expect(page.locator(".nx-sidebar")).not.toHaveClass(/open/);
    await burger.click();
    await page.locator('.nx-sb-nav a[href="/dashboard/billing"]').click();
    await expect(page).toHaveURL(/\/dashboard\/billing$/);
    await expect(page.locator(".nx-sidebar")).not.toHaveClass(/open/);
  });
});

test.describe("T007 accessibility, direction, theme, motion, and responsive baseline", () => {
  const viewports = [375, 768, 879, 881, 1024, 1440] as const;

  for (const width of viewports) {
    test(`records shell geometry at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: width < 800 ? 900 : 1000 });
      await installCoreFixture(page, "valid", {
        locale: width === 768 || width === 881 ? "ar" : "en",
        theme: width === 879 || width === 1024 ? "dark" : "light",
      });
      await gotoHydrated(page, "/dashboard/apps");
      await expect(page.locator(".nx-app-root")).toBeVisible();
      const geometry = await page.evaluate(() => ({
        viewport: { width: window.innerWidth, height: window.innerHeight },
        documentWidth: document.documentElement.scrollWidth,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        direction: document.documentElement.dir,
        language: document.documentElement.lang,
        theme: document.documentElement.getAttribute("data-theme"),
        sidebarVisible: getComputedStyle(document.querySelector(".nx-sidebar")!).display !== "none",
        burgerVisible: getComputedStyle(document.querySelector(".nx-burger")!).display !== "none",
      }));
      await attachJson(testInfo, `geometry-${width}`, geometry);
      expect(geometry.viewport.width).toBe(width);
      expect(geometry.language).toBe(width === 768 || width === 881 ? "ar" : "en");
      expect(geometry.direction).toBe(width === 768 || width === 881 ? "rtl" : "ltr");
      expect(geometry.theme).toBe(width === 879 || width === 1024 ? "dark" : "light");
    });
  }

  test("records current English LTR and Arabic RTL labels", async ({ browser }, testInfo) => {
    const observations: Array<Record<string, unknown>> = [];
    for (const locale of ["en", "ar"] as const) {
      const context = await browser.newContext({ baseURL: "http://127.0.0.1:3001" });
      const page = await context.newPage();
      await installCoreFixture(page, "valid", { locale });
      await gotoHydrated(page, "/dashboard/apps");
      observations.push({
        locale,
        lang: await page.locator("html").getAttribute("lang"),
        dir: await page.locator("html").getAttribute("dir"),
        nav: await page.locator(".nx-sb-nav a").allTextContents(),
        searchPlaceholder: await page
          .getByRole("combobox", { name: locale === "ar" ? "بحث" : "Search" })
          .getAttribute("placeholder"),
      });
      await context.close();
    }
    expect(observations[0]).toMatchObject({ locale: "en", lang: "en", dir: "ltr" });
    expect(observations[1]).toMatchObject({ locale: "ar", lang: "ar", dir: "rtl" });
    testInfo.annotations.push({
      type: "baseline-defect",
      description: "The original direction baseline is retained while changed shell controls now use the existing bilingual translation path.",
    });
    await attachJson(testInfo, "direction-label-observations", observations);
  });

  test("captures Axe, landmark, accessible-name, and touch-target findings", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await openDashboard(page);
    const results = await new AxeBuilder({ page }).include(".nx-app-root").analyze();
    const controls = await page.locator(".nx-topbar button:visible").evaluateAll((buttons) =>
      buttons.map((button) => {
        const rect = button.getBoundingClientRect();
        return {
          name: button.getAttribute("aria-label") || button.textContent?.trim(),
          width: rect.width,
          height: rect.height,
          meets44By44: rect.width >= 44 && rect.height >= 44,
        };
      }),
    );
    const semantics = {
      mainCount: await page.getByRole("main").count(),
      navigationCount: await page.getByRole("navigation").count(),
      bannerCount: await page.getByRole("banner").count(),
      axeViolations: results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.length,
      })),
      controls,
    };
    expect(semantics.mainCount).toBe(1);
    expect(semantics.navigationCount).toBe(1);
    expect(Array.isArray(semantics.axeViolations)).toBe(true);
    expect(results.violations.filter((violation) => violation.impact === "critical" || violation.impact === "serious"))
      .toEqual([]);
    testInfo.annotations.push({
      type: "baseline-defect",
      description: "Phase A records current landmark, Axe, and sub-44px primary-control findings without suppressing them.",
    });
    await attachJson(testInfo, "accessibility-baseline", semantics);
  });

  test("records keyboard order and current popup focus behavior", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await openDashboard(page);
    const focusOrder: string[] = [];
    for (let index = 0; index < 10; index += 1) {
      await page.keyboard.press("Tab");
      focusOrder.push(await page.evaluate(() => {
        const active = document.activeElement;
        return active?.getAttribute("aria-label")
          || active?.getAttribute("href")
          || active?.textContent?.trim()
          || active?.tagName
          || "unknown";
      }));
    }

    const userMenu = page.getByRole("button", { name: "User menu" });
    await userMenu.click();
    const focusAfterOpen = await page.evaluate(() => document.activeElement?.textContent?.trim());
    await page.keyboard.press("Escape");
    await expect(page.getByRole("menuitem", { name: "Account" })).toBeHidden();
    await expect(userMenu).toBeFocused();
    await attachJson(testInfo, "keyboard-baseline", { focusOrder, focusAfterOpen });
  });

  test("records reduced-motion media preference without changing current animations", async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openDashboard(page);
    const observation = await page.evaluate(() => ({
      mediaMatches: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      transitionDurations: Array.from(document.querySelectorAll(".nx-sidebar, .nx-dd"))
        .map((element) => getComputedStyle(element).transitionDuration),
    }));
    expect(observation.mediaMatches).toBe(true);
    await attachJson(testInfo, "reduced-motion-baseline", observation);
  });
});

test.describe("T010 semantic shell contract", () => {
  test("exposes one named primary navigation, banner, main, and keyboard skip target", async ({ page }) => {
    await openDashboard(page);

    await expect(page.getByRole("banner")).toHaveCount(1);
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toHaveCount(1);
    await expect(page.getByRole("main")).toHaveCount(1);
    await expect(page.getByRole("main")).toHaveAttribute("id", "nx-main-content");

    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await page.keyboard.press("Tab");
    await expect(skipLink).toBeFocused();
    await skipLink.press("Enter");
    await expect(page.getByRole("main")).toBeFocused();
  });

  test("marks each current dashboard destination without changing order", async ({ page }) => {
    await openDashboard(page);

    for (const route of SIDEBAR_ROUTES) {
      await gotoHydrated(page, route);
      const active = page.locator(`.nx-sb-nav a[href="${route}"]`);
      await expect(active).toHaveAttribute("aria-current", "page");
      await expect(page.locator('.nx-sb-nav a[aria-current="page"]')).toHaveCount(1);
      await expect(page.getByRole("main").getByRole("heading", { level: 1 }).first()).toBeVisible();
    }
  });

  test("localizes semantic navigation and skip labels in Arabic", async ({ page }) => {
    await installCoreFixture(page, "valid", { locale: "ar" });
    await gotoHydrated(page, "/dashboard/apps");

    await expect(page.getByRole("navigation", { name: "التنقل الرئيسي" })).toBeVisible();
    await expect(page.getByRole("link", { name: "انتقل إلى المحتوى الرئيسي" })).toHaveAttribute(
      "href",
      "#nx-main-content",
    );
    await expect(page.locator(".nx-sb-nav a")).toHaveText([
      "مركز المنتجات",
      "الفواتير والاشتراك",
      "الفريق والصلاحيات",
      "التكاملات",
      "الإعدادات",
    ]);
  });
});

test.describe("T011 accessible shell controls", () => {
  test("connects existing popups and restores opener focus on Escape", async ({ page }) => {
    await openDashboard(page);

    const cases = [
      { trigger: "Workspace menu", surface: "workspace-menu" },
      { trigger: "Notifications", surface: "notifications-menu" },
      { trigger: "User menu", surface: "user-menu" },
    ] as const;

    for (const item of cases) {
      const trigger = page.getByRole("button", { name: item.trigger });
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      await expect(trigger).toHaveAttribute("aria-controls", item.surface);
      await trigger.click();
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await expect(page.locator(`#${item.surface}`)).toBeVisible();
      await page.keyboard.press("Escape");
      if (item.surface === "user-menu") await expect(page.locator("#user-menu")).toBeHidden();
      else await expect(page.locator(`#${item.surface}`)).toHaveCount(0);
      await expect(trigger).toBeFocused();
    }
  });

  test("exposes localized locale and theme state", async ({ page }) => {
    await openDashboard(page);

    const language = page.getByRole("group", { name: "Language" });
    await expect(language).toBeVisible();
    await expect(language.getByRole("button", { name: "English" })).toHaveAttribute("aria-pressed", "true");
    await expect(language.getByRole("button", { name: "العربية" })).toHaveAttribute("aria-pressed", "false");
    await expect(page.getByRole("button", { name: "Switch to dark mode" })).toHaveAttribute("aria-pressed", "false");
  });

  for (const width of [375, 768] as const) {
    test(`keeps primary shell controls at least 44 by 44 CSS pixels at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await openDashboard(page);

      const controls = page.locator([
        ".nx-burger:visible",
        ".nx-sb-switch",
        ".nx-langswitch button",
        ".nx-topbar > .nx-topbar-controls > .nx-icon-btn",
      ].join(","));
      const sizes = await controls.evaluateAll((elements) => elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      }));
      expect(sizes.length).toBeGreaterThan(0);
      for (const size of sizes) {
        expect(size.width).toBeGreaterThanOrEqual(44);
        expect(size.height).toBeGreaterThanOrEqual(44);
      }
    });
  }

  test("renders a visible direction-safe focus indicator", async ({ page }) => {
    await openDashboard(page);
    const context = page.getByRole("button", { name: "Workspace menu" });
    await context.focus();
    const focusStyle = await context.evaluate((element) => {
      const style = getComputedStyle(element);
      return { outline: style.outlineStyle, boxShadow: style.boxShadow };
    });
    expect(focusStyle.outline !== "none" || focusStyle.boxShadow !== "none").toBe(true);
  });
});

test.describe("T017 responsive drawer contract", () => {
  test("contains compact focus and closes with close, Escape, scrim, and navigation", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await openDashboard(page);
    const burger = page.getByRole("button", { name: "Menu", exact: true });

    await burger.click();
    const drawer = page.locator("#nx-primary-sidebar");
    await expect(drawer).toHaveAttribute("role", "dialog");
    await expect(drawer).toHaveAttribute("aria-modal", "true");
    await expect(page.getByRole("main")).toHaveAttribute("inert", "");
    const close = page.getByRole("button", { name: "Close menu" });
    await expect(close).toBeFocused();
    await close.click();
    await expect(drawer).not.toHaveClass(/open/);
    await expect(burger).toBeFocused();

    await burger.click();
    await page.keyboard.press("Escape");
    await expect(drawer).not.toHaveClass(/open/);
    await expect(burger).toBeFocused();

    await burger.click();
    await page.locator(".nx-shell-scrim").click({ position: { x: 370, y: 400 } });
    await expect(drawer).not.toHaveClass(/open/);
    await expect(burger).toBeFocused();

    await burger.click();
    await drawer.locator('a[href="/dashboard/billing"]').click();
    await expect(page).toHaveURL(/\/dashboard\/billing$/);
    await expect(drawer).not.toHaveClass(/open/);
    await expect(page.getByRole("main")).not.toHaveAttribute("inert", "");
  });

  test("cycles focus inside the compact drawer and releases it on breakpoint change", async ({ page }) => {
    await page.setViewportSize({ width: 879, height: 900 });
    await openDashboard(page);
    const burger = page.getByRole("button", { name: "Menu", exact: true });
    await burger.click();
    const drawer = page.locator("#nx-primary-sidebar");
    const close = page.getByRole("button", { name: "Close menu" });
    await expect(close).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(drawer.locator(".nx-sb-user")).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(close).toBeFocused();

    await page.setViewportSize({ width: 881, height: 900 });
    await expect(drawer).not.toHaveClass(/open/);
    await expect(drawer).not.toHaveAttribute("role", "dialog");
    await expect(page.getByRole("main")).not.toHaveAttribute("inert", "");
  });

  test("closes on browser history navigation", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await openDashboard(page);
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await page.locator('.nx-sb-nav a[href="/dashboard/billing"]').click();
    await expect(page).toHaveURL(/\/dashboard\/billing$/);
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await expect(page.locator("#nx-primary-sidebar")).toHaveClass(/open/);
    await page.goBack();
    await expect(page).toHaveURL(/\/dashboard\/apps$/);
    await expect(page.locator("#nx-primary-sidebar")).not.toHaveClass(/open/);
  });

  for (const locale of ["en", "ar"] as const) {
    test(`opens from logical start in ${locale.toUpperCase()}`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await installCoreFixture(page, "valid", { locale });
      await gotoHydrated(page, "/dashboard/apps");
      await page.getByRole("button", { name: locale === "ar" ? "القائمة" : "Menu", exact: true }).click();
      const drawer = page.locator("#nx-primary-sidebar");
      await expect(drawer).toHaveClass(/open/);
      await expect.poll(async () => {
        const box = await drawer.boundingBox();
        if (!box) return Number.NaN;
        return locale === "ar" ? box.x + box.width : box.x;
      }).toBeCloseTo(locale === "ar" ? 375 : 0, 0);
    });
  }

  for (const width of [375, 768, 879, 881, 1024, 1440] as const) {
    test(`keeps shell reachable without horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await openDashboard(page);
      const geometry = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        topbarRight: document.querySelector(".nx-topbar")!.getBoundingClientRect().right,
      }));
      expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.clientWidth);
      expect(geometry.topbarRight).toBeLessThanOrEqual(width);
      const burger = page.getByRole("button", { name: "Menu", exact: true });
      if (width <= 880) await expect(burger).toBeVisible();
      else await expect(burger).toBeHidden();
    });
  }

  test("keeps every topbar control keyboard-reachable in the compact scroll region", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await openDashboard(page);
    const controls = page.locator(
      ".nx-topbar a:visible, .nx-topbar input:visible, .nx-topbar button:visible",
    );
    for (let index = 0; index < await controls.count(); index += 1) {
      const control = controls.nth(index);
      await control.focus();
      await expect(control).toBeInViewport();
    }
  });

  test("retains one scroll owner at a 200 percent CSS zoom reference", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await openDashboard(page);
    await page.evaluate(() => { document.body.style.zoom = "2"; });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
});

test.describe("T021 Workspace context contract", () => {
  const recoveryCases = [
    { fixture: "missing-context-complete", status: "missing" },
    { fixture: "malformed-complete", status: "missing" },
    { fixture: "stale", status: "stale" },
    { fixture: "stale-business-unit", status: "stale" },
    { fixture: "stale-branch", status: "stale" },
    { fixture: "branch-mismatch", status: "cross-scope" },
    { fixture: "cross-scope", status: "cross-scope" },
  ] as const satisfies ReadonlyArray<{ fixture: CoreFixtureName; status: string }>;

  test("keeps valid context ready and Workspace-only", async ({ page }) => {
    await openDashboard(page);
    await expect(page.locator('[data-shell-context-status="ready"]')).toBeVisible();
    await expect(page.locator(".nx-sb-switch-name")).toHaveText("Mustafa Group");
    await expect(page.getByRole("button", { name: /Business|Branch/ })).toHaveCount(0);
    await expect(page.locator(".nx-shell-state-notice")).toHaveCount(0);
  });

  for (const item of recoveryCases) {
    test(`presents ${item.fixture} as ${item.status} without storage writes`, async ({ page }) => {
      await installCoreFixture(page, item.fixture);
      await gotoHydrated(page, "/dashboard/apps");
      await expect(page).toHaveURL(/\/dashboard\/apps$/);
      await expect(page.locator(`[data-shell-context-status="${item.status}"]`)).toBeVisible();
      await expect(page.locator(".nx-shell-state-notice")).toBeVisible();
      await expect(page.getByText("Foreign Workspace")).toHaveCount(0);
      await expect(page.getByText("Foreign Business", { exact: true })).toHaveCount(0);
      await expect(page.getByText("Foreign Branch", { exact: true })).toHaveCount(0);

      const before = await snapshotCoreStorage(page);
      await page.getByRole("button", { name: "Retry context" }).click();
      await expect(page.locator(`[data-shell-context-status="${item.status}"]`)).toBeVisible();
      expect(await snapshotCoreStorage(page)).toEqual(before);
    });
  }

  test("preserves true incomplete and malformed-onboarding redirects", async ({ browser }) => {
    for (const fixture of ["onboarding-incomplete", "malformed"] as const) {
      const context = await browser.newContext({ baseURL: "http://127.0.0.1:3001" });
      const page = await context.newPage();
      await installCoreFixture(page, fixture);
      await gotoHydrated(page, "/dashboard/apps");
      await expect(page).toHaveURL(/\/onboarding$/);
      await context.close();
    }
  });

  test("evaluates every bounded tuple deterministically without mutating its snapshot", () => {
    const base: ShellContextSnapshot = {
      actorId: "user_001",
      workspaceId: "ws_001",
      workspace: { id: "ws_001", name: "Mustafa Group" },
      legacyBusinessUnitId: "bu_001",
      legacyBusinessUnit: { id: "bu_001", name: "Mustafa Pharmacy", workspaceId: "ws_001" },
      branchId: "br_001",
      branch: { id: "br_001", name: "Smouha Branch", workspaceId: "ws_001", businessUnitId: "bu_001" },
    };
    const cases: Array<{ snapshot: ShellContextSnapshot; status: string }> = [
      { snapshot: base, status: "ready" },
      { snapshot: { ...base, workspaceId: null, workspace: null }, status: "missing" },
      { snapshot: { ...base, workspace: null }, status: "stale" },
      { snapshot: { ...base, legacyBusinessUnit: null }, status: "stale" },
      { snapshot: { ...base, branch: null }, status: "stale" },
      {
        snapshot: { ...base, legacyBusinessUnit: { ...base.legacyBusinessUnit!, workspaceId: "ws_other" } },
        status: "cross-scope",
      },
      {
        snapshot: { ...base, branch: { ...base.branch!, businessUnitId: "bu_other" } },
        status: "cross-scope",
      },
      {
        snapshot: { ...base, legacyBusinessUnitId: null, legacyBusinessUnit: null },
        status: "unavailable",
      },
    ];

    for (const item of cases) {
      const before = JSON.stringify(item.snapshot);
      const first = evaluateShellContext(item.snapshot);
      const second = evaluateShellContext(item.snapshot);
      expect(first.status).toBe(item.status);
      expect(second).toEqual(first);
      expect(JSON.stringify(item.snapshot)).toBe(before);
      expect(first.globalDisplayLevel).toBe("workspace");
      expect(first.recoveryHref).toBeNull();
    }
  });
});

test.describe("T028 topbar presentation contract", () => {
  test("searches only existing Core destinations with deterministic keyboard behavior", async ({ page }) => {
    await openDashboard(page);
    const before = await snapshotCoreStorage(page);
    const search = page.getByRole("combobox", { name: "Search" });
    const startedAt = Date.now();
    await search.fill("billing");
    const billing = page.getByRole("option", { name: "Billing", exact: true });
    await expect(billing).toBeVisible();
    expect(Date.now() - startedAt).toBeLessThan(100);
    await expect(page.getByRole("option")).toHaveCount(1);
    await expect(page.getByRole("option", { name: /product|inventory|order|customer|marketplace|AI|command/i })).toHaveCount(0);
    await search.press("ArrowDown");
    await search.press("Enter");
    await expect(page).toHaveURL(/\/dashboard\/billing$/);
    expect(await snapshotCoreStorage(page)).toEqual(before);
  });

  test("presents neutral, no-match, and Escape states without inventing capability", async ({ page }) => {
    await openDashboard(page);
    const search = page.getByRole("combobox", { name: "Search" });
    await search.focus();
    await expect(page.getByText("Search Core destinations")).toBeVisible();
    await search.fill("no-such-core-destination");
    await expect(page.getByText("No Core destinations found")).toBeVisible();
    await search.press("Escape");
    await expect(page.getByRole("listbox")).toHaveCount(0);
    await expect(search).toBeFocused();
  });

  test("preserves exact notification projection order in English and Arabic", async ({ browser }) => {
    const observations: string[][] = [];
    for (const locale of ["en", "ar"] as const) {
      const context = await browser.newContext({ baseURL: "http://127.0.0.1:3001" });
      const page = await context.newPage();
      await installCoreFixture(page, "populated", { locale });
      await gotoHydrated(page, "/dashboard/apps");
      await page.getByRole("button", { name: locale === "ar" ? "الإشعارات" : "Notifications" }).click();
      observations.push(await page.locator("#notifications-menu .nx-dd-item").allTextContents());
      await context.close();
    }
    expect(observations[0]).toEqual([
      "Starter plan — Free Trial",
      "Out of stock: Fixture Out Product",
      "Low stock: Fixture Low Product (2 left)",
      "New order ORD-FIXTURE-001 — 28.50 EGP",
    ]);
    expect(observations[1]).toEqual([
      "Starter الخطة — تجربة مجانية",
      "نفد المخزون: Fixture Out Product",
      "مخزون منخفض: Fixture Low Product (متبقي 2)",
      "طلب جديد ORD-FIXTURE-001 — 28.50 ج.م",
    ]);
  });

  test("coordinates existing topbar popups and preserves profile outcomes", async ({ page }) => {
    await openDashboard(page);
    const userMenu = page.getByRole("button", { name: "User menu" });
    await userMenu.click();
    await expect(page.getByRole("menuitem", { name: "Account" })).toBeVisible();
    await page.getByRole("button", { name: "Notifications" }).click();
    await expect(page.getByRole("menuitem", { name: "Account" })).toBeHidden();
    await expect(page.locator("#notifications-menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#notifications-menu")).toHaveCount(0);
  });

  test("keeps Arabic search and profile presentation reachable at compact width", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await installCoreFixture(page, "valid", { locale: "ar" });
    await gotoHydrated(page, "/dashboard/apps");
    const search = page.getByRole("combobox", { name: "بحث" });
    await search.fill("الفواتير");
    await expect(page.getByRole("option", { name: "الفواتير والاشتراك" })).toBeVisible();
    await search.press("Escape");

    await page.getByRole("button", { name: "قائمة المستخدم" }).click();
    await expect(page.getByRole("menuitem", { name: "الحساب" })).toBeVisible();
    const box = await page.locator("#user-menu").boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(375);
  });

  test("retains locale and theme focus, values, and compatibility keys", async ({ page }) => {
    await openDashboard(page);
    const before = await snapshotCoreStorage(page);
    const arabic = page.getByRole("button", { name: "العربية" });
    await arabic.click();
    await expect(arabic).toBeFocused();
    expect((await snapshotCoreStorage(page)).session[STORAGE_KEYS.locale]).toBe(json("ar"));

    const theme = page.locator(".nx-topbar-controls > button.nx-icon-btn");
    await theme.click();
    await expect(theme).toBeFocused();
    expect((await snapshotCoreStorage(page)).local[STORAGE_KEYS.theme]).toBe("dark");

    const after = await snapshotCoreStorage(page);
    expect(Object.keys(after.local).sort()).toEqual(Object.keys(before.local).sort());
    expect(Object.keys(after.session).sort()).toEqual(Object.keys(before.session).sort());
  });

  test("filters search sources and notification projections through pure read-only functions", () => {
    const entries: CoreSearchEntry[] = [
      {
        id: "billing",
        kind: "navigation",
        label: "Billing",
        keywords: ["subscription"],
        href: "/dashboard/billing",
        availability: "available",
      },
      {
        id: "docs-unavailable",
        kind: "documentation",
        label: "Documentation",
        keywords: [],
        href: "/documentation",
        availability: "unavailable",
      },
      {
        id: "record-forbidden",
        kind: "record" as CoreSearchKind,
        label: "Fixture Product",
        keywords: ["inventory"],
        href: "/dashboard/products",
        availability: "available",
      },
    ];
    expect(searchCoreDestinations(entries, "bill", "en").map((entry) => entry.href))
      .toEqual(["/dashboard/billing"]);
    expect(searchCoreDestinations(entries, "documentation", "en")).toEqual([]);
    expect(searchCoreDestinations(entries, "product", "en")).toEqual([]);
    expect(searchCoreDestinations(entries, "", "en")).toEqual([]);

    expect(projectShellNotifications({
      products: [],
      orders: [],
      plan: null,
      money: (amount) => String(amount),
      locale: "en",
    })).toEqual({ items: [], hasIndicator: false, state: "empty" });
  });

  test("provides browser-side visible topbar feedback within 100 ms", async ({ page }) => {
    await openDashboard(page);
    const timings = await page.evaluate(async () => {
      async function waitFor(predicate: () => boolean): Promise<void> {
        while (!predicate()) await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      }
      const result: Record<string, number> = {};

      const search = document.querySelector<HTMLInputElement>('.nx-shell-search input')!;
      let startedAt = performance.now();
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(search, "billing");
      search.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: "billing" }));
      await waitFor(() => document.querySelector('[role="option"]') !== null);
      result.search = performance.now() - startedAt;

      const profile = document.querySelector<HTMLButtonElement>('[aria-controls="user-menu"]')!;
      startedAt = performance.now();
      profile.click();
      await waitFor(() => !document.querySelector<HTMLElement>("#user-menu")!.hidden);
      result.profile = performance.now() - startedAt;
      profile.click();

      const arabic = document.querySelector<HTMLButtonElement>('.nx-langswitch button[aria-label="العربية"]')!;
      startedAt = performance.now();
      arabic.click();
      await waitFor(() => document.documentElement.lang === "ar" && document.documentElement.dir === "rtl");
      result.locale = performance.now() - startedAt;

      const theme = document.querySelector<HTMLButtonElement>(".nx-topbar-controls > button.nx-icon-btn")!;
      const currentTheme = document.documentElement.dataset.theme;
      startedAt = performance.now();
      theme.click();
      await waitFor(() => document.documentElement.dataset.theme !== currentTheme);
      result.theme = performance.now() - startedAt;
      return result;
    });

    for (const value of Object.values(timings)) expect(value).toBeLessThan(100);
  });
});

test.describe("T041-T044 localization, direction, theme, and motion", () => {
  const shellTranslationKeys = [
    "menu", "primary_navigation", "skip_to_main", "close_menu", "navigation_drawer",
    "workspace_menu", "business_context_menu", "user_menu", "language", "english", "arabic",
    "switch_to_light", "switch_to_dark", "notifications", "no_new_notifications", "team_short",
    "context_attention_title", "context_missing_description", "context_stale_description",
    "context_cross-scope_description", "context_unavailable_description", "retry_context", "retry_read",
    "search", "search_core_destinations", "search_no_results", "search_unavailable", "search_results",
    "notification_plan", "notification_status_free_trial", "notification_status_active",
    "notification_status_past_due", "notification_status_canceled", "notification_out_of_stock",
    "notification_low_stock", "notification_left", "notification_new_order",
    "shell_state_loading_title", "shell_state_loading_description", "shell_state_empty_title",
    "shell_state_empty_description", "shell_state_error_title", "shell_state_error_description",
    "shell_state_unauthorized_title", "shell_state_unauthorized_description",
    "shell_state_unavailable_title", "shell_state_unavailable_description",
    "shell_state_recovering_title", "shell_state_recovering_description",
  ] as const;

  test("has English and Arabic copy for every changed shell key", () => {
    for (const key of shellTranslationKeys) {
      expect(t(key, "en"), `${key} English translation`).not.toBe(key);
      expect(t(key, "ar"), `${key} Arabic translation`).not.toBe(key);
    }
  });

  for (const locale of ["en", "ar"] as const) {
    for (const theme of ["light", "dark"] as const) {
      for (const width of [375, 768, 1024, 1440] as const) {
        test(`${locale} ${theme} shell at ${width}px`, async ({ page }) => {
          await page.setViewportSize({ width, height: 900 });
          const workspaceName = "Nexora مختبر 050 Workspace";
          await installCoreFixture(page, "valid", {
            locale,
            theme,
            workspaceName,
            businessUnitName: "Business نشاط 050",
            branchName: "Branch فرع 050",
          });
          await gotoHydrated(page, "/dashboard/apps");

          await expect(page.locator("html")).toHaveAttribute("lang", locale);
          await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
          await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
          await expect(page.getByRole("banner")).toHaveCount(1);
          await expect(page.getByRole("navigation", { name: locale === "ar" ? "التنقل الرئيسي" : "Primary navigation" })).toHaveCount(1);
          await expect(page.getByRole("main")).toHaveCount(1);
          await expect(page.locator(".nx-sb-switch-name")).toHaveText(workspaceName);
          await expect(page.locator(".nx-sb-switch-name")).toHaveAttribute("dir", "auto");
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

          const targets = await page.locator([
            ".nx-topbar-brand > a",
            ".nx-burger:visible",
            ".nx-topbar-search input",
            ".nx-topbar-controls button",
          ].join(", ")).evaluateAll((elements) => elements
            .filter((element) => element.getClientRects().length > 0)
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return { width: rect.width, height: rect.height };
            }));
          expect(targets.length).toBeGreaterThan(0);
          expect(targets.every((target) => target.width >= 44 && target.height >= 44)).toBe(true);

          const search = page.getByRole("combobox", { name: locale === "ar" ? "بحث" : "Search" });
          await search.focus();
          await expect(search).toBeFocused();
          const outline = await search.evaluate((element) => getComputedStyle(element).outlineStyle);
          expect(outline).not.toBe("none");

          const axe = await new AxeBuilder({ page }).include(".nx-app-root").analyze();
          expect(axe.violations.filter((violation) => violation.impact === "critical" || violation.impact === "serious"))
            .toEqual([]);
        });
      }
    }
  }

  for (const locale of ["en", "ar"] as const) {
    for (const width of [879, 881] as const) {
      test(`keeps long mixed-direction context and overlays bounded for ${locale} at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await installCoreFixture(page, "valid", {
          locale,
          workspaceName: "NexoraXS مساحة عمل تجريبية طويلة 050 Workspace",
          businessUnitName: "Business نشاط تشغيلي طويل 050",
          branchName: "Branch فرع طويل 050",
        });
        await gotoHydrated(page, "/dashboard/apps");
        if (width <= 880) await page.getByRole("button", { name: locale === "ar" ? "القائمة" : "Menu", exact: true }).click();
        await page.getByRole("button", { name: locale === "ar" ? "قائمة مساحة العمل" : "Workspace menu" }).click();
        const workspaceMenu = page.locator("#workspace-menu");
        await expect(workspaceMenu).toBeVisible();
        const menuBox = await workspaceMenu.boundingBox();
        expect(menuBox).not.toBeNull();
        expect(menuBox!.x).toBeGreaterThanOrEqual(0);
        expect(menuBox!.x + menuBox!.width).toBeLessThanOrEqual(width);
        await page.keyboard.press("Escape");
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      });
    }
  }

  test("keeps critical shell feedback immediate with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 375, height: 812 });
    await openDashboard(page);
    const transitionDuration = await page.locator(".nx-sidebar").evaluate((element) => getComputedStyle(element).transitionDuration);
    expect(Number.parseFloat(transitionDuration)).toBeLessThanOrEqual(0.00001);
    const burger = page.getByRole("button", { name: "Menu", exact: true });
    await burger.click();
    await expect(page.locator(".nx-sidebar")).toHaveClass(/open/);
    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(page.locator(".nx-sidebar")).not.toHaveClass(/open/);
    const search = page.getByRole("combobox", { name: "Search" });
    await search.fill("billing");
    await expect(page.getByRole("option", { name: "Billing", exact: true })).toBeVisible();
  });
});

test.describe("T036 shell presentation-state contract", () => {
  test("defines every required state without inventing domain outcomes", () => {
    const kinds: ShellPresentationStateKind[] = [
      "loading",
      "ready",
      "empty",
      "error",
      "unauthorized",
      "unavailable",
      "recovering",
    ];

    for (const kind of kinds) {
      const state = createShellPresentationState(
        kind,
        kind === "error" ? "retry-read" : null,
      );
      expect(state.kind).toBe(kind);
      expect(state.busy).toBe(kind === "loading" || kind === "recovering");
      expect(state.announcement).toBe(
        kind === "ready" ? "none" : kind === "error" ? "assertive" : "polite",
      );
      expect(state.titleKey === null).toBe(kind === "ready");
      expect(state.descriptionKey === null).toBe(kind === "ready");
    }

    const readyContext = evaluateShellContext({
      actorId: "user_001",
      workspaceId: "ws_001",
      workspace: { id: "ws_001", name: "Mustafa Group" },
      legacyBusinessUnitId: "bu_001",
      legacyBusinessUnit: { id: "bu_001", name: "Mustafa Pharmacy", workspaceId: "ws_001" },
      branchId: "br_001",
      branch: { id: "br_001", name: "Smouha Branch", workspaceId: "ws_001", businessUnitId: "bu_001" },
    });
    expect(shellStateForContext(readyContext).kind).toBe("ready");
    expect(shellStateForContext({ ...readyContext, status: "missing", reason: "workspace-missing" }).kind).toBe("empty");
    expect(shellStateForContext({ ...readyContext, status: "stale", reason: "workspace-not-found" }).kind).toBe("unavailable");
    expect(shellStateForContext({ ...readyContext, status: "cross-scope", reason: "business-unit-workspace-mismatch" }).kind).toBe("unauthorized");
  });

  test("renders the named hydration state without relying on client animation", async ({ browser }) => {
    const context = await browser.newContext({
      baseURL: "http://127.0.0.1:3001",
      javaScriptEnabled: false,
    });
    const page = await context.newPage();
    await page.goto("/dashboard/apps");
    const status = page.locator('[data-shell-state="loading"]');
    await expect(status).toHaveRole("status");
    await expect(status).toHaveAttribute("aria-busy", "true");
    await expect(status.getByRole("heading", { name: "Loading Core Platform" })).toBeVisible();
    await context.close();
  });

  for (const item of [
    { fixture: "missing-context-complete", state: "empty" },
    { fixture: "stale", state: "unavailable" },
    { fixture: "unavailable-context", state: "unavailable" },
    { fixture: "cross-scope", state: "unauthorized" },
  ] as const satisfies ReadonlyArray<{ fixture: CoreFixtureName; state: string }>) {
    test(`presents ${item.fixture} as ${item.state} with one safe announcement`, async ({ page }) => {
      await installCoreFixture(page, item.fixture);
      await gotoHydrated(page, "/dashboard/apps");
      const notice = page.locator(`[data-shell-state="${item.state}"]`);
      await expect(notice).toBeVisible();
      await expect(notice.locator(':scope[role="status"], :scope[role="alert"]')).toHaveCount(1);
      await expect(page.locator(".nx-main-scroll .nx-shell-state-notice")).toHaveCount(1);
      await expect(page.getByText("Foreign Workspace")).toHaveCount(0);
      await expect(page.getByText("Foreign Business", { exact: true })).toHaveCount(0);
      await expect(page.getByText("Foreign Branch", { exact: true })).toHaveCount(0);
    });
  }

  test("announces a read-only recovery transition and preserves storage", async ({ page }) => {
    await installCoreFixture(page, "stale");
    await gotoHydrated(page, "/dashboard/apps");
    const before = await snapshotCoreStorage(page);
    const sawRecovering = await page.evaluate(() => new Promise<boolean>((resolve) => {
      const notice = document.querySelector(".nx-shell-state-notice")!;
      const observer = new MutationObserver(() => {
        if (notice.getAttribute("data-shell-state") === "recovering") {
          observer.disconnect();
          resolve(true);
        }
      });
      observer.observe(notice, { attributes: true, attributeFilter: ["data-shell-state"] });
      document.querySelector<HTMLButtonElement>(".nx-shell-state-notice button")!.click();
      window.setTimeout(() => {
        observer.disconnect();
        resolve(false);
      }, 500);
    }));
    expect(sawRecovering).toBe(true);
    await expect(page.locator('[data-shell-state="unavailable"]')).toBeVisible();
    expect(await snapshotCoreStorage(page)).toEqual(before);
  });

  test("keeps safe context states bilingual and theme-readable at compact and desktop widths", async ({ browser }) => {
    const cases = [
      { fixture: "missing-context-complete", state: "empty" },
      { fixture: "stale", state: "unavailable" },
      { fixture: "cross-scope", state: "unauthorized" },
    ] as const satisfies ReadonlyArray<{ fixture: CoreFixtureName; state: string }>;
    for (const locale of ["en", "ar"] as const) {
      for (const theme of ["light", "dark"] as const) {
        for (const [index, item] of cases.entries()) {
          const context = await browser.newContext({ baseURL: "http://127.0.0.1:3001" });
          const page = await context.newPage();
          await page.setViewportSize({ width: index % 2 === 0 ? 375 : 1440, height: 900 });
          await installCoreFixture(page, item.fixture, { locale, theme });
          await gotoHydrated(page, "/dashboard/apps");
          await expect(page.locator(`[data-shell-state="${item.state}"]`)).toBeVisible();
          await expect(page.locator("html")).toHaveAttribute("lang", locale);
          await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
          await context.close();
        }
      }
    }
  });
});

test.describe("T039 dashboard scroll ownership", () => {
  test("keeps one shell-owned scroll region and one main on every dashboard route", async ({ page }) => {
    await installCoreFixture(page, "valid");
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of DASHBOARD_ROUTES) {
        await gotoHydrated(page, route);
        await expect(page.getByRole("main")).toHaveCount(1);
        await expect(page.locator("main.nx-main > .nx-main-scroll")).toHaveCount(1);
        await expect(page.locator(".nx-main-scroll .nx-main-scroll")).toHaveCount(0);
        await expect(page.locator("main.nx-main h1").first()).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      }
    }
  });

  test("keeps route content reachable at the 200 percent CSS-zoom reference", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await openDashboard(page);
    await page.evaluate(() => { document.body.style.zoom = "2"; });
    await expect(page.locator("main.nx-main h1").first()).toBeVisible();
    await expect(page.locator("main.nx-main > .nx-main-scroll")).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });
});

function json(value: unknown): string {
  return JSON.stringify(value);
}

test("fixture definitions cover every approved Phase A state", async () => {
  const names: CoreFixtureName[] = [
    "valid",
    "missing",
    "malformed",
    "stale",
    "missing-context-complete",
    "malformed-complete",
    "stale-business-unit",
    "stale-branch",
    "branch-mismatch",
    "unavailable-context",
    "cross-scope",
    "onboarding-incomplete",
    "empty",
    "populated",
  ];
  for (const name of names) {
    const payload = buildCoreStorage(name);
    expect(payload).toHaveProperty("local");
    expect(payload).toHaveProperty("session");
  }
});
}
