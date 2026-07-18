import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(join(process.cwd(), "apps/commerce/lib/store/AppProvider.tsx"), "utf8");
const ownerSources = ["inventory/application/LegacyStockAdjustmentService.ts", "transfers/application/LegacyStockTransferService.ts", "orders/application/LegacyOrderCreationService.ts", "invoices/application/LegacyInvoiceCreationService.ts", "returns/application/LegacyReturnCreationService.ts", "orders/application/legacy-order-compatibility-policy.ts", "invoices/application/legacy-invoice-compatibility-policy.ts"]
  .map((path) => readFileSync(join(process.cwd(), "apps/commerce/features", path), "utf8")).join("\n");

describe("Feature 054 operational byte compatibility", () => {
  it("freezes current generated prefixes and fallback actor names", () => {
    for (const token of ["createId(\"bi\")", "createId(\"ord\")", "createId(\"inv\")", "TRF-", "RET-"]) {
      expect(ownerSources).toContain(token);
    }
    expect(source).toContain('getUserDisplayName(currentUser) || "Unknown"');
    expect(source).toContain('getUserDisplayName(currentUser) || "Cashier"');
  });

  it("keeps one provider callback definition per retained operation", () => {
    for (const name of ["saveCommerceSetup", "attachMedia", "adjustStock", "transferStock", "createReturn"]) {
      expect(source.match(new RegExp(`const ${name} = useCallback`, "g"))).toHaveLength(1);
    }
    expect(source).not.toContain("const createOrder = useCallback");
    expect(source).not.toContain("const createInvoice = useCallback");
    expect(source).toContain("services.commandPublication.subscribe");
  });

  it("keeps cache notification after the final characterized source write", () => {
    const order = readFileSync(join(process.cwd(), "apps/commerce/features/orders/application/LegacyOrderCreationService.ts"), "utf8");
    const write = order.indexOf("inventory.commitSaleDeduction");
    const notify = order.indexOf("changes.ordersChanged", write);
    expect(notify).toBeGreaterThan(write);
  });
});
