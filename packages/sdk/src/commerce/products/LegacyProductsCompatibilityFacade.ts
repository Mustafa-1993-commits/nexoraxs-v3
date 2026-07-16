import type {
  CreateLegacyProductCommand,
  LegacyProductListResult,
  LegacyProductRecord,
  LegacyProductScope,
  LegacyProductsRepository,
  ListLegacyProductsQuery,
  RemoveLegacyProductResult,
  UpdateLegacyProductCommand,
} from "@nexoraxs/contracts";
import type { MockCommerceStore } from "./MockCommerceStore";

export type LegacyProductsCompatibilityListener = (
  scope: LegacyProductScope,
  products: readonly LegacyProductRecord[],
) => void;

/** Temporary repository-fed bridge for existing in-app Product readers. */
export class LegacyProductsCompatibilityFacade {
  private readonly listeners = new Set<LegacyProductsCompatibilityListener>();

  constructor(
    private readonly repository: LegacyProductsRepository,
    private readonly store: MockCommerceStore,
  ) {}

  async list(
    scope: LegacyProductScope,
    query: ListLegacyProductsQuery = {},
  ): Promise<LegacyProductListResult> {
    const result = await this.repository.list(scope, query);
    if (query.page === undefined && query.pageSize === undefined) {
      this.publish(scope, result.items);
    }
    return result;
  }

  async create(
    scope: LegacyProductScope,
    command: CreateLegacyProductCommand,
  ): Promise<LegacyProductRecord> {
    const product = await this.repository.create(scope, command);
    await this.publishCurrent(scope);
    return product;
  }

  async update(
    scope: LegacyProductScope,
    productId: string,
    command: UpdateLegacyProductCommand,
  ): Promise<LegacyProductRecord> {
    const product = await this.repository.update(scope, productId, command);
    await this.publishCurrent(scope);
    return product;
  }

  async remove(scope: LegacyProductScope, productId: string): Promise<RemoveLegacyProductResult> {
    const result = await this.repository.remove(scope, productId);
    await this.publishCurrent(scope);
    return result;
  }

  subscribe(listener: LegacyProductsCompatibilityListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /** Demo-only seed seam; preserves characterized compatible IDs and record shape. */
  async seedCompatibleProducts(products: readonly LegacyProductRecord[]): Promise<void> {
    await this.store.replaceProducts(structuredClone(products));
  }

  private async publishCurrent(scope: LegacyProductScope): Promise<void> {
    const current = await this.repository.list(scope);
    this.publish(scope, current.items);
  }

  private publish(scope: LegacyProductScope, products: readonly LegacyProductRecord[]): void {
    for (const listener of this.listeners) {
      listener({ ...scope }, structuredClone(products));
    }
  }
}
