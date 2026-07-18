import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("Feature 055 checkout characterization", () => {
  it("records the existing synchronous owner and last-Order sequence", () => {
    const source = readFileSync(join(process.cwd(), "apps/commerce/features/pos/application/LegacyPosCheckoutService.ts"), "utf8");
    const page = readFileSync(join(process.cwd(), "apps/commerce/app/(commerce)/pos/page.tsx"), "utf8");
    const order = source.indexOf("this.orders.create");
    const orderPublication = source.indexOf("this.publication.publishOrderResult", order);
    const invoice = source.indexOf("this.invoices.create", orderPublication);
    const invoicePublication = source.indexOf("this.publication.publishInvoiceResult", invoice);
    const lastOrder = source.indexOf("this.lastOrder.write", invoicePublication);
    const navigation = page.indexOf("router.push(result.successRoute)");
    expect(order).toBeGreaterThan(-1);
    expect(orderPublication).toBeGreaterThan(order);
    expect(invoice).toBeGreaterThan(orderPublication);
    expect(invoicePublication).toBeGreaterThan(invoice);
    expect(lastOrder).toBeGreaterThan(invoicePublication);
    expect(navigation).toBeGreaterThan(-1);
  });
});
