import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { analyzeFrontendBoundaries } from "../../../../../scripts/architecture/frontend-boundaries.mjs";
import { discoverFrontendProductionSources } from "../../../../../scripts/architecture/source-inventory.mjs";

const ROOT = process.cwd();

function sourceFiles(directory: string): string[] {
  try {
    return readdirSync(join(ROOT, directory)).flatMap((entry) => {
      const relativePath = join(directory, entry);
      const absolutePath = join(ROOT, relativePath);
      if (statSync(absolutePath).isDirectory()) {
        return entry === "__tests__" ? [] : sourceFiles(relativePath);
      }
      return /\.(ts|tsx)$/.test(entry) ? [relativePath] : [];
    });
  } catch {
    return [];
  }
}

describe("Feature 053 source boundaries", () => {
  it("keeps Feature 052 Product contracts while narrowing the SDK runtime root", () => {
    expect(readFileSync(join(ROOT, "packages/contracts/src/index.ts"), "utf8"))
      .toContain('export * from "./commerce/products"');
    const sdkRoot = readFileSync(join(ROOT, "packages/sdk/src/index.ts"), "utf8");
    expect(sdkRoot).toContain('from "./commerce/runtime/createCommerceServices"');
    expect(sdkRoot).not.toContain('export * from "./commerce/products"');
  });

  it("uses the central engine for full-inventory architectural enforcement", () => {
    const root = resolve(process.cwd());
    const files = discoverFrontendProductionSources(root).filter((file) => (
      /apps\/commerce\/features\/(?:customers|inventory|orders|invoices|repository-expansion)\//.test(file)
      || /packages\/(?:contracts|sdk)\/src\/commerce\/(?:common|customers|inventory|orders|invoices)\//.test(file)
    ));

    expect(analyzeFrontendBoundaries({ root, files })).toEqual([]);
  });

  it("keeps Inventory, Order, and Invoice repositories read-only and free of generic pagination", () => {
    const files = [
      "packages/contracts/src/commerce/inventory/legacy-inventory-repository.ts",
      "packages/contracts/src/commerce/orders/legacy-orders-repository.ts",
      "packages/contracts/src/commerce/invoices/legacy-invoices-repository.ts",
      "packages/sdk/src/commerce/inventory/MockInventoryRepository.ts",
      "packages/sdk/src/commerce/orders/MockOrdersRepository.ts",
      "packages/sdk/src/commerce/invoices/MockInvoicesRepository.ts",
    ];
    for (const file of files) {
      const source = readFileSync(join(ROOT, file), "utf8");
      expect(source).not.toMatch(/\b(create|update|remove|delete|archive)\s*\(/);
      expect(source).not.toMatch(/pageSize|cursor|hasNextPage/);
    }
  });

  it("keeps migrated pages on their Feature 053 hooks", () => {
    const pages = [
      "apps/commerce/app/(commerce)/customers/page.tsx",
      "apps/commerce/app/(commerce)/inventory/page.tsx",
      "apps/commerce/app/(commerce)/orders/page.tsx",
      "apps/commerce/app/(commerce)/invoices/page.tsx",
    ];
    for (const file of pages) expect(readFileSync(join(ROOT, file), "utf8")).toMatch(/useLegacy(Customers|Inventory|Orders|Invoices)/);
  });

  it("does not introduce canonical businessId or Commerce business logic into shared", () => {
    const featureSources = [
      ...sourceFiles("apps/commerce/features/customers"),
      ...sourceFiles("apps/commerce/features/inventory"),
      ...sourceFiles("apps/commerce/features/orders"),
      ...sourceFiles("apps/commerce/features/invoices"),
      ...sourceFiles("packages/contracts/src/commerce/common"),
      ...sourceFiles("packages/contracts/src/commerce/customers"),
      ...sourceFiles("packages/contracts/src/commerce/inventory"),
      ...sourceFiles("packages/contracts/src/commerce/orders"),
      ...sourceFiles("packages/contracts/src/commerce/invoices"),
    ];
    expect(featureSources.filter((file) => /\bbusinessId\b/.test(readFileSync(join(ROOT, file), "utf8")))).toEqual([]);
    expect(sourceFiles("packages/shared/src").filter((file) => /MockCustomersRepository|LegacyInventoryProjectionService|LegacyOrderViewService/.test(readFileSync(join(ROOT, file), "utf8")))).toEqual([]);
  });
});
