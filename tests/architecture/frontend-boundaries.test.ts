import { describe, expect, it } from "vitest";
import { resolve } from "node:path";
import { analyzeFrontendBoundaries } from "../../scripts/architecture/frontend-boundaries.mjs";
import { discoverFrontendProductionSources } from "../../scripts/architecture/source-inventory.mjs";

const root = resolve(process.cwd());
const invalid = [
  ["layer-boundaries/application-react-query.ts", "ARCH-APP-001"],
  ["layer-boundaries/application-react-query.ts", "ARCH-CACHE-001"],
  ["layer-boundaries/contract-sdk.ts", "ARCH-CONTRACT-001"],
  ["layer-boundaries/repository-provider.ts", "ARCH-REPOSITORY-001"],
  ["layer-boundaries/hook-concrete-facade.ts", "ARCH-UI-001"],
  ["layer-boundaries/application-barrel.ts", "ARCH-APP-001"],
  ["layer-boundaries/application-barrel.ts", "ARCH-CACHE-001"],
  ["layer-boundaries/application-dynamic-react-query.ts", "ARCH-APP-001"],
  ["layer-boundaries/application-require-sdk.ts", "ARCH-APP-001"],
  ["layer-boundaries/hook-implementation-selection.ts", "ARCH-COMPOSITION-001"],
  ["ownership-boundaries/cross-app-relative.ts", "ARCH-CROSS-APP-001"],
  ["ownership-boundaries/cross-app-alias.ts", "ARCH-CROSS-APP-001"],
  ["ownership-boundaries/core-commerce-writer.ts", "ARCH-OWNER-001"],
  ["ownership-boundaries/commerce-core-writer.ts", "ARCH-OWNER-002"],
  ["ownership-boundaries/shared-owner-policy.ts", "ARCH-SHARED-001"],
  ["ownership-boundaries/provider-business-rule.ts", "ARCH-PROVIDER-001"],
  ["infrastructure-boundaries/browser-storage.ts", "ARCH-STORAGE-001"],
  ["infrastructure-boundaries/browser-storage-global.ts", "ARCH-STORAGE-001"],
  ["infrastructure-boundaries/sdk-testing.ts", "ARCH-SDK-001"],
  ["infrastructure-boundaries/environment-read.ts", "ARCH-ENV-001"],
  ["infrastructure-boundaries/unresolved-internal.ts", "ARCH-RESOLUTION-001"],
  ["infrastructure-boundaries/sdk-private-subpath.ts", "ARCH-SDK-001"],
  ["order-command-boundaries/application-framework.ts", "ARCH-APP-001"],
  ["order-command-boundaries/ui-concrete-repository.ts", "ARCH-UI-001"],
  ["order-command-boundaries/page-checkout-orchestration.ts", "ARCH-POS-001"],
  ["order-command-boundaries/order-inventory-writer.ts", "ARCH-OWNER-003"],
  ["order-command-boundaries/return-order-writer.ts", "ARCH-OWNER-004"],
  ["order-command-boundaries/core-order-writer.ts", "ARCH-OWNER-004"],
  ["order-command-boundaries/provider-order-writer.ts", "ARCH-OWNER-004"],
  ["order-command-boundaries/repository-ui.ts", "ARCH-REPOSITORY-001"],
  ["order-command-boundaries/browser-storage.ts", "ARCH-STORAGE-001"],
  ["order-command-boundaries/non-root-construction.ts", "ARCH-COMPOSITION-001"],
] as const;

describe("frontend architecture rules", () => {
  it.each(invalid)("rejects %s with stable %s diagnostics", (relative, ruleId) => {
    const file = `tests/architecture/fixtures/invalid/${relative}`;
    const diagnostics = analyzeFrontendBoundaries({ root, files: [file] });
    expect(diagnostics.some((item) => item.ruleId === ruleId && item.file === file && item.line > 0 && item.column > 0)).toBe(true);
  });

  it("accepts every valid fixture and the complete production inventory deterministically", () => {
    const fixtures = ["inward-layers.ts", "composition-root.ts", "outer-adapters.ts", "core-projection.ts", "sdk-testing.test.ts", "order-command-boundary.ts"]
      .map((name) => `tests/architecture/fixtures/valid/${name}`);
    expect(analyzeFrontendBoundaries({ root, files: fixtures })).toEqual([]);
    const files = discoverFrontendProductionSources(root);
    const first = analyzeFrontendBoundaries({ root, files });
    expect(first).toEqual([]);
    expect(analyzeFrontendBoundaries({ root, files })).toEqual(first);
  }, 30_000);

  it("resolves app aliases and fails closed for unresolved alias targets", () => {
    expect(analyzeFrontendBoundaries({
      root,
      files: ["tests/architecture/fixtures/valid/apps/commerce/app-alias.ts"],
    })).toEqual([]);
    const diagnostics = analyzeFrontendBoundaries({
      root,
      files: ["tests/architecture/fixtures/invalid/infrastructure-boundaries/apps/commerce/unresolved-app-alias.ts"],
    });
    expect(diagnostics).toMatchObject([{
      ruleId: "ARCH-RESOLUTION-001",
      file: "tests/architecture/fixtures/invalid/infrastructure-boundaries/apps/commerce/unresolved-app-alias.ts",
    }]);
  });
});
