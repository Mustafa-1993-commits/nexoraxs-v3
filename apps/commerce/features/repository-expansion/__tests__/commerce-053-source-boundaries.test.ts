import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();
const RUNTIME_CONFIG = "apps/commerce/lib/commerce/commerce-runtime-config.ts";

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
  it("keeps Feature 052 Product contracts and runtime exports present", () => {
    expect(readFileSync(join(ROOT, "packages/contracts/src/index.ts"), "utf8"))
      .toContain('export * from "./commerce/products"');
    expect(readFileSync(join(ROOT, "packages/sdk/src/index.ts"), "utf8"))
      .toContain('export * from "./commerce/products"');
  });

  it("keeps environment reads in the designated runtime-config module", () => {
    const candidates = [
      ...sourceFiles("apps/commerce/features"),
      ...sourceFiles("apps/commerce/lib/commerce"),
      ...sourceFiles("packages/contracts/src/commerce"),
      ...sourceFiles("packages/sdk/src/commerce"),
    ];
    const readers = candidates.filter((file) => /NEXT_PUBLIC_|process\.env/.test(
      readFileSync(join(ROOT, file), "utf8"),
    ));
    expect(readers).toEqual([RUNTIME_CONFIG]);
  });

  it("keeps browser storage and transport out of existing Product hooks and repositories", () => {
    const candidates = [
      ...sourceFiles("apps/commerce/features/products/hooks"),
      "packages/sdk/src/commerce/products/MockProductsRepository.ts",
    ];
    const offenders = candidates.filter((file) => /localStorage|sessionStorage|\bfetch\s*\(/.test(
      readFileSync(join(ROOT, file), "utf8"),
    ));
    expect(offenders).toEqual([]);
  });

  it("does not import application source from another application", () => {
    const files = sourceFiles("apps/commerce");
    const offenders = files.filter((file) => /from\s+["']@?\/?apps\//.test(
      readFileSync(join(ROOT, file), "utf8"),
    ));
    expect(offenders).toEqual([]);
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

  it("keeps migrated pages on hooks and keeps storage/transport out of pages, hooks, and repositories", () => {
    const pages = [
      "apps/commerce/app/(commerce)/customers/page.tsx",
      "apps/commerce/app/(commerce)/inventory/page.tsx",
      "apps/commerce/app/(commerce)/orders/page.tsx",
      "apps/commerce/app/(commerce)/invoices/page.tsx",
    ];
    for (const file of pages) expect(readFileSync(join(ROOT, file), "utf8")).toMatch(/useLegacy(Customers|Inventory|Orders|Invoices)/);
    const candidates = [
      ...pages,
      ...sourceFiles("apps/commerce/features/customers/hooks"),
      ...sourceFiles("apps/commerce/features/inventory/hooks"),
      ...sourceFiles("apps/commerce/features/orders/hooks"),
      ...sourceFiles("apps/commerce/features/invoices/hooks"),
      ...sourceFiles("packages/sdk/src/commerce/customers").filter((file) => !file.includes("serialization")),
      ...sourceFiles("packages/sdk/src/commerce/inventory").filter((file) => !file.includes("serialization")),
      ...sourceFiles("packages/sdk/src/commerce/orders").filter((file) => !file.includes("serialization")),
      ...sourceFiles("packages/sdk/src/commerce/invoices").filter((file) => !file.includes("serialization")),
    ];
    const offenders = candidates.filter((file) => /localStorage|sessionStorage|\bfetch\s*\(|NEXT_PUBLIC_|process\.env/.test(readFileSync(join(ROOT, file), "utf8")));
    expect(offenders).toEqual([]);
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
