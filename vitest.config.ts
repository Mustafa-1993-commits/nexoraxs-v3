import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@nexoraxs\/sdk\/testing$/,
        replacement: new URL("./packages/sdk/src/testing/index.ts", import.meta.url).pathname,
      },
      {
        find: /^@nexoraxs\/sdk$/,
        replacement: new URL("./packages/sdk/src/index.ts", import.meta.url).pathname,
      },
      {
        find: /^@nexoraxs\/contracts$/,
        replacement: new URL("./packages/contracts/src/index.ts", import.meta.url).pathname,
      },
      {
        find: "@",
        replacement: new URL("./apps/commerce", import.meta.url).pathname,
      },
    ],
  },
  test: {
    environment: "node",
    include: [
      "packages/**/*.test.ts",
      "packages/**/*.test.tsx",
      "apps/**/*.test.ts",
      "apps/**/*.test.tsx",
      "tests/architecture/**/*.test.ts",
      "tests/architecture/**/*.test.tsx",
    ],
    exclude: ["tests/architecture/fixtures/**", "**/node_modules/**", "**/.next/**", "**/dist/**"],
    restoreMocks: true,
    clearMocks: true,
  },
});
