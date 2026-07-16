import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": new URL("./apps/commerce", import.meta.url).pathname,
      "@nexoraxs/contracts": new URL("./packages/contracts/src/index.ts", import.meta.url).pathname,
      "@nexoraxs/sdk": new URL("./packages/sdk/src/index.ts", import.meta.url).pathname,
    },
  },
  test: {
    environment: "node",
    include: [
      "packages/**/*.test.ts",
      "packages/**/*.test.tsx",
      "apps/**/*.test.ts",
      "apps/**/*.test.tsx",
    ],
    restoreMocks: true,
    clearMocks: true,
  },
});
