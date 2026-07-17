import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(join(process.cwd(), "apps/commerce/lib/store/AppProvider.tsx"), "utf8");

describe("Feature 053 AppProvider compatibility characterization", () => {
  it("removes legacy Customer writes after the repository cutover", () => {
    expect(source).not.toContain("const createCustomer =");
    expect(source).not.toContain("const updateCustomer =");
    expect(source).toContain("services.customersCompatibility.subscribe");
  });

  it("keeps Inventory, Order, Invoice, and Return writes on explicit retained paths", () => {
    for (const callback of ["adjustStock", "transferStock", "createReturn", "createOrder", "createInvoice"]) {
      expect(source).toContain(`const ${callback} = useCallback`);
    }
    expect(source).toContain("services.stockAdjustments.adjust");
    expect(source).toContain("services.orderCommands.create");
    expect(source).toContain("services.invoiceCommands.create");
  });
});
