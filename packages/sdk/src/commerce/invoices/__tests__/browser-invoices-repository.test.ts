import { describe, expect, it } from "vitest";
import { BrowserStorageCommerceStore, LEGACY_INVOICES_STORAGE_KEY } from "../../products/BrowserStorageCommerceStore";
import { MockInvoicesRepository } from "../MockInvoicesRepository";
import { assertLegacyInvoicesRepositoryContract, INVOICE_A, INVOICE_B } from "./legacy-invoices-repository.contract";
describe("Browser Invoice repository", () => { it("reads the legacy key without rewriting", async () => {
  const serialized = JSON.stringify([INVOICE_A, INVOICE_B]); const map = new Map([[LEGACY_INVOICES_STORAGE_KEY, serialized]]);
  await assertLegacyInvoicesRepositoryContract(new MockInvoicesRepository(new BrowserStorageCommerceStore({ getItem: (key) => map.get(key) ?? null, setItem: (key, value) => map.set(key, value) })));
  expect(map.get(LEGACY_INVOICES_STORAGE_KEY)).toBe(serialized);
}); });
