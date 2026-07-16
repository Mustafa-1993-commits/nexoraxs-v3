#!/usr/bin/env bash
set -euo pipefail

for run in $(seq 1 20); do
  echo "Feature 052 deterministic run ${run}/20"
  pnpm exec vitest run \
    packages/sdk/src/commerce/products/__tests__/mock-products-failures.test.ts \
    packages/sdk/src/commerce/products/__tests__/mock-products-diagnostics.test.ts \
    --reporter=dot
done
