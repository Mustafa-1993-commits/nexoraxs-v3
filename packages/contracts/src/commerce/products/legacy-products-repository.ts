import type { LegacyProductScope } from "./legacy-product-scope";
import type {
  CreateLegacyProductCommand,
  LegacyProductListResult,
  LegacyProductRecord,
  ListLegacyProductsQuery,
  RemoveLegacyProductResult,
  UpdateLegacyProductCommand,
} from "./legacy-product-record";

/**
 * Frontend-internal repository used only to migrate the existing mock journey.
 * It is not a canonical Product repository and is not an HTTP API contract.
 */
export interface LegacyProductsRepository {
  list(scope: LegacyProductScope, query?: ListLegacyProductsQuery): Promise<LegacyProductListResult>;
  getById(scope: LegacyProductScope, productId: string): Promise<LegacyProductRecord>;
  create(scope: LegacyProductScope, command: CreateLegacyProductCommand): Promise<LegacyProductRecord>;
  update(
    scope: LegacyProductScope,
    productId: string,
    command: UpdateLegacyProductCommand,
  ): Promise<LegacyProductRecord>;
  remove(scope: LegacyProductScope, productId: string): Promise<RemoveLegacyProductResult>;
}
