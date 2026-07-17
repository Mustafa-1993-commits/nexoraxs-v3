import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");
describe("Feature 053 accessible async states", () => {
  it("provides localized state copy and semantic status, alert, busy, and retry controls", () => {
    for (const [directory, file] of [["customers", "customer"], ["inventory", "inventory"], ["orders", "order"], ["invoices", "invoice"]]) {
      const messages = read(`apps/commerce/features/${directory}/i18n/${file}-messages.ts`);
      expect(messages).toContain("en:"); expect(messages).toContain("ar:"); expect(messages).toContain("retry:");
    }
    const routes = ["customers/page.tsx", "inventory/page.tsx", "orders/page.tsx", "invoices/page.tsx"];
    for (const route of routes) { const source = read(`apps/commerce/app/(commerce)/${route}`); expect(source).toContain('role="status"'); expect(source).toContain('role="alert"'); }
    expect(read("apps/commerce/app/(commerce)/customers/page.tsx")).toContain("aria-busy");
  });
});
