import type { LegacyPosCommercialSnapshotPort } from "@nexoraxs/contracts";
import { LegacyPosDraftCommandError } from "@nexoraxs/contracts";
import { describe, expect, it, vi } from "vitest";
import { LegacyPosDraftService } from "../application/LegacyPosDraftService";

const setup = { vatRegistered: true, vatRate: 15, pricesIncludeTax: true };

function calculator(): LegacyPosCommercialSnapshotPort {
  return {
    calculate: vi.fn(({
      items,
      discount,
    }: Parameters<LegacyPosCommercialSnapshotPort["calculate"]>[0]) => {
      const gross = items.reduce((sum, item) => sum + item.price * item.qty, 0);
      return { lines: [], gross, subtotal: gross, discount, net: gross - discount, vat: 0, total: gross - discount, rate: 15 };
    }),
  };
}

const product = {
  id: "p1", name: "Product", price: 25, sku: "SKU", taxable: true,
  stock: 4, category: "General",
};

describe("LegacyPosDraftService", () => {
  it("applies every supported draft command without mutating prior state", () => {
    const service = new LegacyPosDraftService(calculator());
    const initial = service.createInitial();
    const first = service.execute({ draft: initial, command: { type: "add-product", product }, setup });
    const repeated = service.execute({ draft: first.draft, command: { type: "add-product", product }, setup });
    const decremented = service.execute({ draft: repeated.draft, command: { type: "change-quantity", productId: "p1", delta: -99 }, setup });
    const customer = service.execute({ draft: decremented.draft, command: { type: "select-customer", customerId: "c1" }, setup });
    const payment = service.execute({ draft: customer.draft, command: { type: "select-payment", payment: "wallet" }, setup });
    const discount = service.execute({ draft: payment.draft, command: { type: "set-discount-input", value: "7.5" }, setup });
    const removedDiscount = service.execute({ draft: discount.draft, command: { type: "remove-discount" }, setup });
    const removedItem = service.execute({ draft: removedDiscount.draft, command: { type: "remove-item", productId: "p1" }, setup });
    const cleared = service.execute({
      draft: {
        ...removedItem.draft,
        items: [{ ...product, qty: 1 }],
        customerId: "c1",
        payment: "wallet",
        discount: 7.5,
      },
      command: { type: "clear" },
      setup,
    });

    expect(initial).toEqual({ items: [], customerId: null, payment: "cash", discount: 0 });
    expect(first.draft.items).toEqual([{ ...product, qty: 1 }]);
    expect(repeated.draft.items[0].qty).toBe(2);
    expect(decremented.draft.items[0].qty).toBe(1);
    expect(payment.draft).toMatchObject({ customerId: "c1", payment: "wallet" });
    expect(discount.draft.discount).toBe(7.5);
    expect(removedDiscount.draft.discount).toBe(0);
    expect(removedItem.draft.items).toEqual([]);
    expect(cleared.draft).toEqual({ items: [], customerId: "c1", payment: "wallet", discount: 7.5 });
    expect(initial.items).toEqual([]);
  });

  it("preserves discount coercion and Product-to-Order snapshots", () => {
    const service = new LegacyPosDraftService(calculator());
    const withProduct = service.execute({ draft: service.createInitial(), command: { type: "add-product", product }, setup }).draft;
    const negative = service.execute({ draft: withProduct, command: { type: "set-discount-input", value: -10 }, setup });
    const nonNumeric = service.execute({ draft: negative.draft, command: { type: "set-discount-input", value: "not-a-number" }, setup });

    expect(negative.draft.discount).toBe(0);
    expect(nonNumeric.draft.discount).toBe(0);
    expect(service.toOrderItems(withProduct)).toEqual([{
      productId: "p1", id: "p1", name: "Product", qty: 1, price: 25, sku: "SKU", taxable: true,
    }]);
  });

  it("rejects zero stock without persisting or inventing a price command", () => {
    const service = new LegacyPosDraftService(calculator());
    expect(() => service.execute({
      draft: service.createInitial(),
      command: { type: "add-product", product: { ...product, stock: 0 } },
      setup,
    })).toThrowError(LegacyPosDraftCommandError);
    expect("update-price" in service).toBe(false);
  });
});
