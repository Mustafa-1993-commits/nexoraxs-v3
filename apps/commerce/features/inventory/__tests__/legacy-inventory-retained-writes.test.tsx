import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
const source = readFileSync(join(process.cwd(), "apps/commerce/lib/store/AppProvider.tsx"), "utf8");
describe("retained Inventory writers", () => { it("keeps one writer path and notifies exact read keys after commit", () => {
  for (const name of ["adjustStock", "transferStock", "createOrder", "createReturn"]) expect(source.match(new RegExp(`const ${name} = useCallback`, "g"))).toHaveLength(1);
  expect(source).toContain("services.readCoordinator.inventoryCommitted");
  expect(source).not.toContain("inventoryRepository.update");
}); });
