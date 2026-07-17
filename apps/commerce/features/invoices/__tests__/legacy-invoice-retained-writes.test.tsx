import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
const source = readFileSync(join(process.cwd(), "apps/commerce/lib/store/AppProvider.tsx"), "utf8");
describe("retained Invoice writer", () => { it("keeps issuance single-source and repository exports read-only", () => {
  expect(source.match(/const createInvoice = useCallback/g)).toHaveLength(1); expect(source).toContain("services.invoiceCommands.create");
  expect(source).not.toContain("invoicesRepository.create");
}); });
