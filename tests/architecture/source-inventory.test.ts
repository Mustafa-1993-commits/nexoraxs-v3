import { describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { discoverFrontendProductionSources } from "../../scripts/architecture/source-inventory.mjs";

describe("frontend production source inventory", () => {
  it("is sorted, deterministic, and excludes tests/build output", () => {
    const root = mkdtempSync(join(tmpdir(), "nx-architecture-"));
    mkdirSync(join(root, "apps", "demo", "__tests__"), { recursive: true });
    mkdirSync(join(root, "packages", "demo", "src"), { recursive: true });
    writeFileSync(join(root, "apps", "demo", "z.ts"), "export {};\n");
    writeFileSync(join(root, "apps", "demo", "a.tsx"), "export {};\n");
    writeFileSync(join(root, "apps", "demo", "module.mjs"), "export {};\n");
    writeFileSync(join(root, "apps", "demo", "ignored.json"), "{}\n");
    writeFileSync(join(root, "apps", "demo", "ignored.test.ts"), "export {};\n");
    writeFileSync(join(root, "apps", "demo", "__tests__", "ignored.ts"), "export {};\n");
    writeFileSync(join(root, "packages", "demo", "src", "index.ts"), "export {};\n");
    expect(discoverFrontendProductionSources(root)).toEqual(["apps/demo/a.tsx", "apps/demo/module.mjs", "apps/demo/z.ts", "packages/demo/src/index.ts"]);
    expect(discoverFrontendProductionSources(root)).toEqual(discoverFrontendProductionSources(root));
  });

  it("fails closed when a configured source root is missing", () => {
    const root = mkdtempSync(join(tmpdir(), "nx-architecture-missing-"));
    expect(() => discoverFrontendProductionSources(root)).toThrow("architecture.source_root_missing:apps");
  });
});
