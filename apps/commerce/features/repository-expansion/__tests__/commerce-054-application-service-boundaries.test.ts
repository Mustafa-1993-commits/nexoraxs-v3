import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const services = [
  "setup/application/LegacyCommerceSetupService.ts", "media/application/LegacyProductMediaService.ts",
  "inventory/application/LegacyStockAdjustmentService.ts", "transfers/application/LegacyStockTransferService.ts",
  "orders/application/LegacyOrderCreationService.ts", "invoices/application/LegacyInvoiceCreationService.ts",
  "returns/application/LegacyReturnCreationService.ts",
];

describe("retained application service boundaries", () => {
  it("depends on inward ports and contains no React, query-key, hook, browser, or concrete SDK dependency", () => {
    for (const relative of services) {
      const source = readFileSync(join(process.cwd(), "apps/commerce/features", relative), "utf8");
      for (const forbidden of ["@tanstack/react-query", "QueryClient", "/hooks/", "legacy-product-query-keys", "localStorage", "sessionStorage", "@nexoraxs/sdk", "File", "Blob", "window.", "document."]) {
        expect(source, `${relative}: ${forbidden}`).not.toContain(forbidden);
      }
      expect(source).toContain("@nexoraxs/contracts");
    }
  });
});
