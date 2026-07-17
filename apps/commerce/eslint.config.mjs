import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "dist/**",
    "coverage/**",
    "*.min.js",
  ]),
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["**/__tests__/**", "**/*.test.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [
          { group: ["apps/core-platform/**", "../core-platform/**", "../../core-platform/**"], message: "Commerce must use governed public contracts, never Core source." },
          { group: ["@nexoraxs/sdk/testing", "@nexoraxs/sdk/*/*", "**/packages/sdk/src/**"], message: "Concrete SDK infrastructure is private to composition or tests." },
        ],
      }],
    },
  },
  {
    files: ["features/**/application/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [
          { group: ["react", "react/**", "@tanstack/react-query", "@tanstack/react-query/**", "@nexoraxs/sdk", "@nexoraxs/sdk/**", "**/hooks/**", "**/*query-keys*"], message: "Application modules must remain framework and infrastructure neutral." },
        ],
      }],
    },
  },
]);

export default eslintConfig;
