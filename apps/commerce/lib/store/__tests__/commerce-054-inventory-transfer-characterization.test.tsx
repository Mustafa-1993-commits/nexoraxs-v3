import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { legacyEffectiveStock as effectiveStockFor } from "@/features/inventory/application/legacy-inventory-policy";
import type { BranchInventory, CommerceProduct } from "@nexoraxs/types";

const adjustmentSource = readFileSync(join(process.cwd(), "apps/commerce/features/inventory/application/LegacyStockAdjustmentService.ts"), "utf8");
const transferSource = readFileSync(join(process.cwd(), "apps/commerce/features/transfers/application/LegacyStockTransferService.ts"), "utf8");

const product = {
  id: "p", workspaceId: "ws", businessUnitId: "bu", branchId: "br", osSubscriptionId: "sub",
  name: "P", category: "C", sku: "SKU", barcode: "", price: 1, cost: 0, taxable: true,
  stock: 7, lowStockThreshold: 2, notes: "", createdAt: "created", updatedAt: "product-updated",
} satisfies CommerceProduct;

describe("Feature 054 Inventory and Transfer characterization", () => {
  it("uses Branch Inventory when present and legacy Product Stock otherwise", () => {
    expect(effectiveStockFor(product, "br-a", [])).toEqual({
      qty: 7, lowStockThreshold: 2, updatedAt: "product-updated", hasRecord: false,
    });
    const records: BranchInventory[] = [{
      id: "bi", workspaceId: "ws", businessUnitId: "bu", branchId: "br-a", productId: "p",
      qty: 3, lowStockThreshold: 1, updatedAt: "inventory-updated",
    }];
    expect(effectiveStockFor(product, "br-a", records)).toEqual({
      qty: 3, lowStockThreshold: 1, updatedAt: "inventory-updated", hasRecord: true,
    });
  });

  it("preserves adjustment validation, zero-delta suppression, and commit order", () => {
    expect(adjustmentSource).toContain("error: \"no_active_branch\"");
    expect(adjustmentSource).toContain("error: \"product_not_found\"");
    expect(adjustmentSource).toContain("if (qtyChange !== 0)");
    const inventoryWrite = adjustmentSource.indexOf("replacePositions");
    const movementWrite = adjustmentSource.indexOf("replaceMovements", inventoryWrite);
    expect(movementWrite).toBeGreaterThan(inventoryWrite);
  });

  it("preserves Transfer numbering, completed status, two movements, and write order", () => {
    expect(transferSource).toContain("TRF-${String(scopedTransfers.length + 1).padStart(4, \"0\")}");
    expect(transferSource).toContain("reason: \"transfer_out\"");
    expect(transferSource).toContain("reason: \"transfer_in\"");
    const inventoryWrite = transferSource.indexOf("replacePositions");
    const movementWrite = transferSource.indexOf("replaceMovements", inventoryWrite);
    const transferWrite = transferSource.indexOf("replaceTransfers", movementWrite);
    expect(movementWrite).toBeGreaterThan(inventoryWrite);
    expect(transferWrite).toBeGreaterThan(movementWrite);
  });
});
