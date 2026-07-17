import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { analyzeFrontendBoundaries } from "../../../../../scripts/architecture/frontend-boundaries.mjs";
import { discoverFrontendProductionSources } from "../../../../../scripts/architecture/source-inventory.mjs";

describe("Commerce Product runtime source boundaries", () => {
  it("keeps the complete frontend production inventory within the enforced boundaries", () => {
    const root = resolve(process.cwd());
    const files = discoverFrontendProductionSources(root).filter((file) => (
      file.startsWith("apps/commerce/features/products/")
      || file.startsWith("apps/commerce/app/(commerce)/products/")
      || file.startsWith("apps/commerce/lib/commerce/")
      || file.startsWith("packages/contracts/src/commerce/products/")
      || file.startsWith("packages/sdk/src/commerce/products/")
    ));

    expect(analyzeFrontendBoundaries({ root, files })).toEqual([]);
  });
});
