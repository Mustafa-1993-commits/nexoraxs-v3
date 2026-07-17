import { describe, it } from "vitest";
import { MemoryCommerceStore } from "../../products/MemoryCommerceStore";
import { MockInvoicesRepository } from "../MockInvoicesRepository";
import { assertLegacyInvoicesRepositoryContract, INVOICE_A, INVOICE_B } from "./legacy-invoices-repository.contract";
describe("Memory Invoice repository", () => { it("conforms read-only", async () => {
  await assertLegacyInvoicesRepositoryContract(new MockInvoicesRepository(new MemoryCommerceStore([], { invoices: [INVOICE_A, INVOICE_B] })));
}); });
