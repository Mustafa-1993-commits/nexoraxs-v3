#!/usr/bin/env bash
set -euo pipefail

for run in $(seq 1 20); do
  echo "Commerce repository architecture deterministic run ${run}/20"
  pnpm exec vitest run \
    packages/sdk/src/commerce/products/__tests__/mock-products-failures.test.ts \
    packages/sdk/src/commerce/products/__tests__/mock-products-diagnostics.test.ts \
    apps/commerce/features/repository-expansion/__tests__/optional-compatibility-relation.test.ts \
    apps/commerce/features/repository-expansion/__tests__/commerce-054-cache-change-adapter.test.ts \
    apps/commerce/features/setup/__tests__/legacy-commerce-setup-service.test.ts \
    apps/commerce/features/media/__tests__/legacy-product-media-service.test.ts \
    apps/commerce/features/inventory/__tests__/legacy-stock-adjustment-service.test.ts \
    apps/commerce/features/transfers/__tests__/legacy-stock-transfer-service.test.ts \
    apps/commerce/features/orders/__tests__/legacy-order-creation-service.test.ts \
    apps/commerce/features/orders/__tests__/legacy-order-number-service.test.ts \
    apps/commerce/features/orders/__tests__/commerce-055-order-command-scope-isolation.test.ts \
    packages/sdk/src/commerce/orders/__tests__/memory-order-command-repository.test.ts \
    apps/commerce/features/inventory/__tests__/legacy-order-inventory-effect-service.test.ts \
    apps/commerce/features/inventory/__tests__/legacy-order-inventory-effect-failures.test.ts \
    apps/commerce/features/pos/__tests__/legacy-pos-draft-service.test.ts \
    apps/commerce/features/pos/__tests__/legacy-pos-commercial-snapshot.test.ts \
    apps/commerce/features/pos/__tests__/legacy-pos-checkout-service.test.ts \
    apps/commerce/features/pos/__tests__/commerce-055-checkout-failures.test.ts \
    apps/commerce/features/invoices/__tests__/legacy-invoice-creation-service.test.ts \
    apps/commerce/features/returns/__tests__/legacy-return-creation-service.test.ts \
    tests/architecture/frontend-boundaries.test.ts \
    --reporter=dot
done
