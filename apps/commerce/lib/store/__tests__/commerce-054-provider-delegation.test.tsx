import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("../AppProvider.tsx", import.meta.url), "utf8");

describe("Commerce AppProvider operation delegation", () => {
  it("delegates each retained callback exactly once and only publishes returned snapshots", () => {
    const delegates = [
      "services.setupCommands.save(", "services.productMedia.attach(", "services.stockAdjustments.adjust(",
      "services.transfers.transfer(", "services.returns.create(", "services.commandPublication.subscribe(",
    ];
    for (const call of delegates) expect(source.match(new RegExp(call.replace(/[.()]/g, "\\$&"), "g")), call).toHaveLength(1);
    for (const forbidden of ["buildStockMovement", "buildStockTransfer", "buildCommerceReturn", "computeReturnTotals", "writeCollection(STORAGE_KEYS.stockMovements", "writeCollection(STORAGE_KEYS.stockTransfers", "writeCollection(STORAGE_KEYS.commerceReturns"]) {
      expect(source, forbidden).not.toContain(forbidden);
    }
    expect(source).not.toContain("services.orderCommands.create(");
    expect(source).not.toContain("services.invoiceCommands.create(");
  });
});
