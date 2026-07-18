import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
const source = readFileSync(join(process.cwd(), "apps/commerce/lib/store/AppProvider.tsx"), "utf8");
const checkout = readFileSync(join(process.cwd(), "apps/commerce/features/pos/application/LegacyPosCheckoutService.ts"), "utf8");
describe("retained Invoice writer", () => { it("keeps issuance single-source and repository exports read-only", () => {
  expect(source).not.toContain("const createInvoice = useCallback"); expect(checkout.match(/this\.invoices\.create/g)).toHaveLength(1);
  expect(source).not.toContain("invoicesRepository.create");
}); });
