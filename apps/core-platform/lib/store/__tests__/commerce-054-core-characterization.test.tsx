import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const provider = readFileSync(join(process.cwd(), "apps/core-platform/lib/store/AppProvider.tsx"), "utf8");
const shell = readFileSync(join(process.cwd(), "apps/core-platform/lib/shell/presentation.ts"), "utf8");
const billing = readFileSync(join(process.cwd(), "apps/core-platform/app/dashboard/billing/page.tsx"), "utf8");
const commerceUrl = readFileSync(join(process.cwd(), "apps/core-platform/lib/commerce-url.ts"), "utf8");
const handoff = readFileSync(join(process.cwd(), "apps/core-platform/lib/commerce/CommerceHandoffAdapter.ts"), "utf8");

describe("Feature 054 Core Commerce characterization", () => {
  it("preserves Core Commerce summaries through a read-only projection after ownership cleanup", () => {
    expect(provider).toContain("commerceProjection");
    for (const token of ["createOrder", "createInvoice", "STORAGE_KEYS.products", "STORAGE_KEYS.orders"]) {
      expect(provider).not.toContain(token);
    }
  });

  it("captures current shell and billing dependence on narrow Commerce presentation fields", () => {
    expect(shell).toContain("products");
    expect(shell).toContain("orders");
    expect(billing).toContain("billingAddress");
  });

  it("captures the current explicit Commerce URL handoff seam", () => {
    expect(commerceUrl).toContain("commerceDashboardUrl");
    expect(commerceUrl).toContain("commerceSetupUrl");
    expect(handoff).toContain("nx_handoff");
  });
});
