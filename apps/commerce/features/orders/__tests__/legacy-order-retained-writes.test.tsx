import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
const source = readFileSync(join(process.cwd(), "apps/commerce/lib/store/AppProvider.tsx"), "utf8");
const orderService = readFileSync(join(process.cwd(), "apps/commerce/features/orders/application/LegacyOrderCreationService.ts"), "utf8");
describe("retained Order writers", () => { it("keeps POS/return writes single-source and repositories read-only", () => {
  expect(source).not.toContain("const createOrder = useCallback"); expect(source.match(/const createReturn = useCallback/g)).toHaveLength(1);
  expect(source).toContain("services.commandPublication.subscribe"); expect(source).toContain("services.returns.create");
  expect(source).not.toContain("ordersRepository.create");
  expect(orderService).not.toContain("LegacyCommerceOperationsStore");
  expect(orderService).not.toContain("legacy-inventory-policy");
  expect(orderService).not.toContain("BranchInventory");
  expect(orderService).not.toContain("StockMovement");
  expect(orderService).not.toContain("replacePositions");
  expect(orderService).not.toContain("replaceMovements");
}); });
