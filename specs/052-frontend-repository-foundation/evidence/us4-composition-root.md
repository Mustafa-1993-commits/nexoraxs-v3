# US4 Composition Root Evidence

Date: 2026-07-17

`createCommerceServices` is the single implementation-selection boundary. Mock mode accepts
isolated store/clock/ID/failure overrides. Negative or non-finite latency and an unknown source
fail during construction. HTTP mode requires a base URL but always reports the implementation as
unavailable; the test installs a `fetch` spy and observes zero calls.

`commerce-runtime-config.ts` is the only non-test file in the Feature 052 Product/runtime surface
that contains `process.env` or the three `NEXT_PUBLIC_COMMERCE_*` names. Contracts, SDK
repositories, hooks, pages, and services do not read environment values.

```text
pnpm exec vitest run \
  packages/sdk/src/commerce/products/__tests__/commerce-composition.test.ts \
  apps/commerce/features/products/__tests__/commerce-services-provider.test.tsx \
  apps/commerce/features/products/__tests__/commerce-runtime-boundaries.test.ts

Test Files  3 passed (3)
Tests       10 passed (10)
```

The provider identity test re-renders the same root 100 times. Repository, QueryClient, and bounded
editor service each retain exactly one reference. The provider uses lazy state construction and
renders a startup recovery alert if construction rejects. Pages and components select no mock or
future HTTP implementation.
