import { describe, expect, it, vi } from "vitest";
import type { MockProductDiagnosticEvent } from "../mock-product-behavior";
import { MemoryCommerceStore } from "../MemoryCommerceStore";
import { MockProductsRepository } from "../MockProductsRepository";

const scope = {
  workspaceId: "private-workspace-id",
  legacyBusinessUnitId: "private-legacy-bu-id",
  branchId: "private-branch-id",
};

const command = {
  name: "Secret Product Name",
  category: "Private Category",
  sku: "SECRET-SKU",
  barcode: "SECRET-BARCODE",
  price: 99,
  cost: 30,
  taxable: true,
  stock: 5,
  lowStockThreshold: 1,
  notes: "private notes",
};

describe("mock Product diagnostics", () => {
  it("reports deterministic minimized success and controlled failure outcomes", async () => {
    const events: MockProductDiagnosticEvent[] = [];
    const repository = new MockProductsRepository(new MemoryCommerceStore(), {
      latencyMs: 0,
      createId: () => "p_diagnostic",
      onDiagnostic: (event) => events.push(event),
      failureRules: [{ operation: "update", invocation: 1, errorCode: "configured_failure" }],
    });

    await repository.create(scope, command);
    await expect(repository.update(scope, "p_diagnostic", { name: "Foreign Secret" }))
      .rejects.toMatchObject({ code: "configured_failure" });

    expect(events).toEqual([
      {
        operation: "create",
        durationMs: 0,
        outcome: "success",
        scopeCorrelation: `${scope.workspaceId.length}:${scope.legacyBusinessUnitId.length}:${scope.branchId.length}`,
      },
      {
        operation: "update",
        durationMs: 0,
        outcome: "configured_failure",
        scopeCorrelation: `${scope.workspaceId.length}:${scope.legacyBusinessUnitId.length}:${scope.branchId.length}`,
        productId: "p_diagnostic",
      },
    ]);
  });

  it("never emits the scope values, SKU, Product payload, or foreign data", async () => {
    const sink = vi.fn();
    const repository = new MockProductsRepository(new MemoryCommerceStore(), {
      onDiagnostic: sink,
      failureRules: [{ operation: "create", normalizedSku: "secret-sku", errorCode: "configured_failure" }],
    });

    await expect(repository.create(scope, command)).rejects.toMatchObject({ code: "configured_failure" });
    const serialized = JSON.stringify(sink.mock.calls);

    for (const secret of [
      scope.workspaceId,
      scope.legacyBusinessUnitId,
      scope.branchId,
      command.name,
      command.sku,
      command.barcode,
      command.notes,
    ]) {
      expect(serialized).not.toContain(secret);
    }
    expect(serialized).not.toContain("price");
    expect(serialized).not.toContain("stock");
  });
});
