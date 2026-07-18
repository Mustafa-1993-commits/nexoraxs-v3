import { describe, expect, it } from "vitest";
import { computeDoc } from "@/features/documents/application/legacy-commerce-documents";
import { LegacyDocumentSnapshotAdapter } from "@/lib/commerce/pos/LegacyDocumentSnapshotAdapter";

const items = [
  { productId: "taxable", name: "Taxable", qty: 2, price: 115, taxable: true },
  { productId: "plain", name: "Plain", qty: 1, price: 70, taxable: false },
];

describe("LegacyDocumentSnapshotAdapter", () => {
  it.each([
    { vatRegistered: true, vatRate: 15, pricesIncludeTax: true },
    { vatRegistered: true, vatRate: 15, pricesIncludeTax: false },
    { vatRegistered: false, vatRate: 15, pricesIncludeTax: true },
  ])("preserves computeDoc floating results for %#", (setup) => {
    const expected = computeDoc(items, setup, 37.25);
    const actual = new LegacyDocumentSnapshotAdapter().calculate({ items, setup, discount: 37.25 });
    expect(actual).toEqual(expected);
  });

  it("preserves non-clamped discount totals", () => {
    const snapshot = new LegacyDocumentSnapshotAdapter().calculate({
      items: [{ name: "Small", qty: 1, price: 10, taxable: true }],
      setup: { vatRegistered: true, vatRate: 15, pricesIncludeTax: true },
      discount: 100,
    });
    expect(snapshot.total).toBe(-90);
    expect(snapshot.net).toBe(-90);
  });
});

