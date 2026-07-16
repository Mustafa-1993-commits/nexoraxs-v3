import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();
const CONFIG_PATH = "apps/commerce/lib/commerce/commerce-runtime-config.ts";

function sourceFiles(directory: string): string[] {
  return readdirSync(join(ROOT, directory)).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(join(ROOT, path)).isDirectory()) {
      return entry === "__tests__" ? [] : sourceFiles(path);
    }
    return /\.(ts|tsx)$/.test(entry) ? [path] : [];
  });
}

describe("Commerce Product runtime source boundaries", () => {
  it("reads NEXT_PUBLIC Commerce variables only in the designated config module", () => {
    const candidates = [
      ...sourceFiles("apps/commerce/features/products"),
      ...sourceFiles("apps/commerce/lib/commerce"),
      ...sourceFiles("apps/commerce/app/(commerce)/products"),
      ...sourceFiles("packages/contracts/src/commerce/products"),
      ...sourceFiles("packages/sdk/src/commerce/products"),
    ];
    const readers = candidates.filter((path) => (
      /NEXT_PUBLIC_COMMERCE_|process\.env/.test(readFileSync(join(ROOT, path), "utf8"))
    ));

    expect(readers.map((path) => relative(ROOT, join(ROOT, path)))).toEqual([CONFIG_PATH]);
  });

  it("keeps storage and fetch out of Product hooks, pages, contracts, and repositories", () => {
    const candidates = [
      ...sourceFiles("apps/commerce/features/products/hooks"),
      ...sourceFiles("apps/commerce/app/(commerce)/products"),
      ...sourceFiles("packages/contracts/src/commerce/products"),
      "packages/sdk/src/commerce/products/MockProductsRepository.ts",
    ];
    const offenders = candidates.filter((path) => (
      /localStorage|\bfetch\s*\(/.test(readFileSync(join(ROOT, path), "utf8"))
    ));

    expect(offenders).toEqual([]);
  });
});
