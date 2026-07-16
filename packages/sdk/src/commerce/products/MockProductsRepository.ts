import {
  LegacyProductRepositoryError,
  type CreateLegacyProductCommand,
  type LegacyProductListResult,
  type LegacyProductRecord,
  type LegacyProductScope,
  type LegacyProductsRepository,
  type ListLegacyProductsQuery,
  type RemoveLegacyProductResult,
  type UpdateLegacyProductCommand,
} from "@nexoraxs/contracts";
import type { MockCommerceStore } from "./MockCommerceStore";
import { MockProductBehavior, type MockProductBehaviorOptions } from "./mock-product-behavior";
import {
  createLegacyProductRecord,
  parseLegacyProductRecords,
  updateLegacyProductRecord,
} from "./legacy-product-serialization";

const MAX_PAGE_SIZE = 1_000;

function validationError(messageKey: string, field?: string): LegacyProductRepositoryError {
  return new LegacyProductRepositoryError({
    code: "validation",
    messageKey,
    fieldIssues: field ? [{ field, messageKey }] : [],
  });
}

function normalizedScope(scope: LegacyProductScope): Required<LegacyProductScope> {
  const workspaceId = scope.workspaceId.trim();
  const legacyBusinessUnitId = scope.legacyBusinessUnitId.trim();
  const branchId = scope.branchId?.trim() ?? "";
  if (!workspaceId) throw validationError("products.errors.scope.workspace", "workspaceId");
  if (!legacyBusinessUnitId) {
    throw validationError("products.errors.scope.legacy_business_unit", "legacyBusinessUnitId");
  }
  if (scope.branchId !== undefined && !branchId) {
    throw validationError("products.errors.scope.branch", "branchId");
  }
  return { workspaceId, legacyBusinessUnitId, branchId };
}

function inScope(record: LegacyProductRecord, scope: Required<LegacyProductScope>): boolean {
  return record.workspaceId === scope.workspaceId
    && record.businessUnitId === scope.legacyBusinessUnitId;
}

function normalizedSku(value: string): string {
  return value.trim().toLocaleLowerCase("en-US");
}

function missingProduct(): LegacyProductRepositoryError {
  return new LegacyProductRepositoryError({
    code: "not_found",
    messageKey: "products.errors.not_found",
  });
}

function duplicateSku(): LegacyProductRepositoryError {
  return new LegacyProductRepositoryError({
    code: "duplicate_sku",
    messageKey: "products.errors.duplicate_sku",
    fieldIssues: [{ field: "sku", messageKey: "products.errors.duplicate_sku" }],
  });
}

export class MockProductsRepository implements LegacyProductsRepository {
  private mutationTail: Promise<void> = Promise.resolve();
  private idSequence = 0;
  private readonly now: () => Date;
  private readonly createId: () => string;
  private readonly behavior: MockProductBehavior;

  constructor(
    private readonly store: MockCommerceStore,
    private readonly options: MockProductBehaviorOptions = {},
  ) {
    this.behavior = new MockProductBehavior(options);
    this.now = options.now ?? (() => new Date());
    this.createId = options.createId ?? (() => {
      this.idSequence += 1;
      return `p_${this.now().getTime().toString(36)}${this.idSequence.toString(36)}`;
    });
  }

  async list(scopeInput: LegacyProductScope, query: ListLegacyProductsQuery = {}): Promise<LegacyProductListResult> {
    return this.behavior.execute({
      operation: "list",
      scope: scopeInput,
      action: async () => {
        const scope = normalizedScope(scopeInput);
        const records = (await this.readRecords()).filter((record) => inScope(record, scope));
        const hasPage = query.page !== undefined;
        const hasPageSize = query.pageSize !== undefined;
        if (hasPage !== hasPageSize) throw validationError("products.errors.pagination");
        if (!hasPage || !hasPageSize) {
          return { items: structuredClone(records), total: records.length, page: null, pageSize: null, hasNextPage: false };
        }
        if (!Number.isInteger(query.page) || query.page! < 1) throw validationError("products.errors.page", "page");
        if (!Number.isInteger(query.pageSize) || query.pageSize! < 1 || query.pageSize! > MAX_PAGE_SIZE) {
          throw validationError("products.errors.page_size", "pageSize");
        }
        const start = (query.page! - 1) * query.pageSize!;
        const items = records.slice(start, start + query.pageSize!);
        return {
          items: structuredClone(items),
          total: records.length,
          page: query.page!,
          pageSize: query.pageSize!,
          hasNextPage: start + query.pageSize! < records.length,
        };
      },
    });
  }

  async getById(scopeInput: LegacyProductScope, productIdInput: string): Promise<LegacyProductRecord> {
    const productId = productIdInput.trim();
    return this.behavior.execute({
      operation: "get",
      scope: scopeInput,
      ...(productId ? { productId } : {}),
      action: async () => {
        const scope = normalizedScope(scopeInput);
        if (!productId) throw validationError("products.errors.id", "productId");
        const record = (await this.readRecords()).find((candidate) => candidate.id === productId && inScope(candidate, scope));
        if (!record) throw missingProduct();
        return structuredClone(record);
      },
    });
  }

  create(scopeInput: LegacyProductScope, command: CreateLegacyProductCommand): Promise<LegacyProductRecord> {
    const sku = normalizedSku(command.sku);
    return this.mutate(() => this.behavior.execute({
      operation: "create",
      scope: scopeInput,
      ...(sku ? { normalizedSku: sku } : {}),
      action: async () => {
        const scope = normalizedScope(scopeInput);
        const records = await this.readRecords();
        if (sku && records.some((record) => inScope(record, scope) && normalizedSku(record.sku) === sku)) {
          throw duplicateSku();
        }
        const record = createLegacyProductRecord({
          scope,
          command,
          id: this.createId(),
          timestamp: this.now().toISOString(),
        });
        await this.store.replaceProducts([...records, record]);
        return structuredClone(record);
      },
    }));
  }

  update(
    scopeInput: LegacyProductScope,
    productIdInput: string,
    command: UpdateLegacyProductCommand,
  ): Promise<LegacyProductRecord> {
    const productId = productIdInput.trim();
    const sku = command.sku === undefined ? undefined : normalizedSku(command.sku);
    return this.mutate(() => this.behavior.execute({
      operation: "update",
      scope: scopeInput,
      ...(productId ? { productId } : {}),
      ...(sku ? { normalizedSku: sku } : {}),
      action: async () => {
        const scope = normalizedScope(scopeInput);
        if (!productId) throw validationError("products.errors.id", "productId");
        const records = await this.readRecords();
        const index = records.findIndex((record) => record.id === productId && inScope(record, scope));
        if (index < 0) throw missingProduct();
        const candidateSku = command.sku === undefined ? normalizedSku(records[index].sku) : normalizedSku(command.sku);
        if (candidateSku && records.some((record, recordIndex) => (
          recordIndex !== index && inScope(record, scope) && normalizedSku(record.sku) === candidateSku
        ))) {
          throw duplicateSku();
        }
        const updated = updateLegacyProductRecord({
          record: records[index],
          command,
          timestamp: this.now().toISOString(),
        });
        const next = records.slice();
        next[index] = updated;
        await this.store.replaceProducts(next);
        return structuredClone(updated);
      },
    }));
  }

  remove(scopeInput: LegacyProductScope, productIdInput: string): Promise<RemoveLegacyProductResult> {
    const productId = productIdInput.trim();
    return this.mutate(() => this.behavior.execute({
      operation: "remove",
      scope: scopeInput,
      ...(productId ? { productId } : {}),
      action: async () => {
        const scope = normalizedScope(scopeInput);
        if (!productId) throw validationError("products.errors.id", "productId");
        const records = await this.readRecords();
        const index = records.findIndex((record) => record.id === productId && inScope(record, scope));
        if (index < 0) throw missingProduct();
        const next = records.slice();
        next.splice(index, 1);
        await this.store.replaceProducts(next);
        return { removedId: productId };
      },
    }));
  }

  private async readRecords(): Promise<LegacyProductRecord[]> {
    return parseLegacyProductRecords(await this.store.readProducts());
  }

  private mutate<T>(operation: () => Promise<T>): Promise<T> {
    const result = this.mutationTail.then(operation, operation);
    this.mutationTail = result.then(() => undefined, () => undefined);
    return result;
  }
}
