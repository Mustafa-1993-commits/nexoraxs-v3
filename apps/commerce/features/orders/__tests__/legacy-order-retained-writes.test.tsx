import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
const source = readFileSync(join(process.cwd(), "apps/commerce/lib/store/AppProvider.tsx"), "utf8");
describe("retained Order writers", () => { it("keeps POS/return writes single-source and repositories read-only", () => {
  expect(source.match(/const createOrder = useCallback/g)).toHaveLength(1); expect(source.match(/const createReturn = useCallback/g)).toHaveLength(1);
  expect(source).toContain("services.readCoordinator.orderCommitted"); expect(source).not.toContain("ordersRepository.create");
}); });
