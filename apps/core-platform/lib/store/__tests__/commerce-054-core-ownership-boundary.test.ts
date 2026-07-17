import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Feature 054 Core ownership source boundary", () => {
  it("contains no Commerce operational record factories, callbacks, or persistence", () => {
    const source = readFileSync(new URL("../AppProvider.tsx", import.meta.url), "utf8");
    for (const forbidden of [
      "CommerceProduct", "CommerceCustomer", "CommerceOrder", "CommerceInvoice", "CommerceSetup",
      "addProduct", "updateProduct", "deleteProduct", "createOrder", "createInvoice", "createCustomer", "updateCustomer",
      "STORAGE_KEYS.products", "STORAGE_KEYS.customers", "STORAGE_KEYS.orders", "STORAGE_KEYS.invoices", "STORAGE_KEYS.commerceSetups",
    ]) {
      expect(source, forbidden).not.toMatch(new RegExp(`\\b${forbidden.replaceAll(".", "\\.")}\\b`));
    }
  });
});
