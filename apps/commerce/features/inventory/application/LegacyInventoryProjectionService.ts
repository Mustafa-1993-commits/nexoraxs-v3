import type { LegacyCommerceBranchScope, LegacyInventoryRepository, LegacyProductRecord, LegacyProductsRepository } from "@nexoraxs/contracts";

export interface LegacyInventoryProjectionRow {
  readonly product: LegacyProductRecord;
  readonly stock: number | null;
  readonly lowStockThreshold: number;
}
export class LegacyInventoryProjectionService {
  constructor(private readonly products: LegacyProductsRepository, private readonly inventory: LegacyInventoryRepository) {}
  async listInventory(input: { scope: LegacyCommerceBranchScope }): Promise<readonly LegacyInventoryProjectionRow[]> {
    const [products, inventory] = await Promise.all([
      this.products.list({ ...input.scope }), this.inventory.list(input.scope),
    ]);
    const byProduct = new Map(inventory.items.map((record) => [record.productId, record]));
    return products.items.map((product) => {
      const record = byProduct.get(product.id);
      return {
        product,
        stock: record ? record.qty : product.stock,
        lowStockThreshold: record?.lowStockThreshold ?? product.lowStockThreshold,
      };
    });
  }
}
