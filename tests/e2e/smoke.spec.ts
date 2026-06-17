import { expect, test } from "@playwright/test";
import { CORE_URL, COMMERCE_URL, LANDING_URL, corePath, commercePath, landingPath } from "./helpers/app-urls";
import { expectNoFatalAppCrash } from "./helpers/assertions";
import { installDemoSeed } from "./helpers/reset";

test.describe("NexoraXS dev-server smoke", () => {
  test.setTimeout(120_000);

  test("loads Landing on 3000", async ({ page }) => {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      await page.goto(landingPath("/"), { waitUntil: "domcontentloaded" });
      try {
        await expect(page.locator("body")).toContainText(/NexoraXS/i, { timeout: 20_000 });
        break;
      } catch (error) {
        if (attempt === 2) throw error;
      }
    }
    await expect(page).toHaveURL(new RegExp(LANDING_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    await expectNoFatalAppCrash(page);
  });

  test("loads Core Platform shell on 3001", async ({ page }) => {
    await installDemoSeed(page);
    await page.goto(corePath("/dashboard/apps"));
    await expect(page.getByTestId("core-shell")).toBeVisible();
    await expect(page.getByTestId("core-product-hub")).toBeVisible();
    await expect(page).toHaveURL(/localhost:3001\/dashboard\/apps/);
    await expectNoFatalAppCrash(page);
  });

  test("loads Commerce OS shell on 3002", async ({ page }) => {
    await installDemoSeed(page);
    await page.goto(commercePath("/dashboard"));
    await expect(page.getByTestId("commerce-shell")).toBeVisible();
    await expect(page.getByTestId("commerce-dashboard")).toBeVisible();
    await expect(page).toHaveURL(new RegExp(`${COMMERCE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/dashboard`));
    await expectNoFatalAppCrash(page);
  });

  test("confirms required local origins are distinct", async () => {
    expect(new URL(LANDING_URL).port).toBe("3000");
    expect(new URL(CORE_URL).port).toBe("3001");
    expect(new URL(COMMERCE_URL).port).toBe("3002");
  });
});
