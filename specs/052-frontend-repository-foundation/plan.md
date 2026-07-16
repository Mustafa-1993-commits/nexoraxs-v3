# Implementation Plan: Frontend Repository Foundation

**Branch**: `052-frontend-repository-foundation` | **Date**: 2026-07-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/052-frontend-repository-foundation/spec.md`

## Summary

Migrate the current Commerce Products mock data seam incrementally into frontend-internal
contracts and SDK implementations while preserving routes, visible behavior, IDs, combined legacy
records, browser key, and refresh compatibility. The design uses `LegacyProductScope`, an internal
`LegacyProductsRepository` with `remove` rather than archive, storage adapters, deterministic mock
behavior, one Commerce composition root/provider, fully scoped TanStack Query keys, a facade-fed
legacy `AppProvider` projection, and a bounded editor service only for real media/combined-field
orchestration. It deliberately defines no canonical Product lifecycle, organization scope, or HTTP
API contract.

## Technical Context

**Language/Version**: TypeScript 5.x strict mode; React 19.2.4; Next.js 16.2.6 App Router  
**Primary Dependencies**: existing pnpm 9.15.9/Turborepo workspace; add
`@tanstack/react-query`; add Vitest/jsdom/React testing utilities for unit and integration evidence  
**Storage**: existing browser localStorage key `nexoraxs.db.commerceProducts` behind
`BrowserStorageCommerceStore`; per-test arrays behind `MemoryCommerceStore`; no backend/database  
**Testing**: Vitest with Node default and per-file jsdom; existing Playwright 1.61 and
`@axe-core/playwright`; TypeScript, ESLint, source-boundary checks, Commerce production build  
**Target Platform**: modern browsers supported by the existing Next.js Commerce app; local mock
runtime only  
**Project Type**: pnpm monorepo with one Next.js frontend app plus internal contract/SDK packages  
**Performance Goals**: preserve visible local mock outcomes within one second for at least 95% of
un-delayed acceptance runs; no instance churn across 100 provider re-renders  
**Constraints**: zero route/UI/storage-key/seed-ID regression; no HTTP implementation, Laravel,
MSW, canonical Business fabrication, Product status/archive semantics, random test failure, other
domain migration, or one-step `AppProvider` removal  
**Scale/Scope**: three existing Product routes, one repository/facade/editor-service vertical
slice, two storage adapters, six user stories, two locales/directions, and a two-Workspace/two
legacy-`BusinessUnit` isolation matrix

## Constitution Check

*GATE: passed before Phase 0 research and re-checked after Phase 1 design.*

| Gate | Required evidence | Result |
|---|---|---|
| Frozen authority | Commerce Freeze/Wave 1, ADR-004, ADR-034 through ADR-036, ADR-038, ADR-040; approved DD-02/DD-14/DD-29 narrowing | **PASS** — internal compatibility naming and prohibitions preserve every deferred decision |
| Ownership | Product Catalog canonical ownership; Pricing/Tax/Inventory/media/Core owners; mock-only write status | **PASS** — combined fields round-trip without ownership transfer; no production authority is created |
| Organization and tenancy | Workspace plus explicitly legacy `BusinessUnit`; optional Branch view context; canonical Business absent and never fabricated | **PASS** — `LegacyProductScope` is fail-closed and prohibited from promotion; future production scope remains blocked |
| OS independence | Commerce Product journey needs no other OS; no app-to-app import or cross-OS internal access | **PASS** |
| Knowledge and AI order | Capability/Knowledge/Rules/Business Brain/Recommendation/AI boundaries | **N/A** — feature creates no intelligence or automated action and leaves ordering unchanged |
| Lifecycle separation | Commercial/operational concepts and Product lifecycle deferral | **PASS** — no status/archive/retention model; `remove` documents only current mock array behavior |
| Contracts and compatibility | Internal-only contract warning; additive legacy facade/storage compatibility; no HTTP surface | **PASS** — DD-29 remains deferred and existing IDs/routes/records are preserved |
| Security and operations | Scope validation, non-leaking errors, deterministic diagnostics, recovery, production cutover gate | **PASS** — frontend checks are explicitly non-authoritative and diagnostics are not Audit |
| Product quality | Arabic/English, RTL/LTR, logical layout, keyboard/focus/naming/readable states | **PASS** — specified in E2E/a11y evidence without redesigning English UI |
| Verification | Characterization, contract, adapters, cache/scope, facade, provider identity, E2E, a11y, build | **PASS** — test categories and measurable gates are designed in quickstart/data model |
| Documentation sync | Spec/research/model/internal contract/quickstart/tasks/evidence; DDs preserved | **PASS** — artifacts state the same narrowed boundary and implementation includes sync tasks |

**Pre-research verdict**: **PASS** — the 2026-07-17 narrowing removes all prior canonical claims.

**Post-design verdict**: **PASS** — Phase 1 artifacts contain no canonical lifecycle, Business
identity, Product ownership scope, platform error taxonomy, HTTP API, or network idempotency choice.

**Post-implementation verdict (2026-07-17)**: **PASS** — source and evidence retain the same
narrowed boundary. DD-02, DD-14, and DD-29 remain deferred; AppProvider remains for excluded
domains; HTTP mode is request-free/unavailable; and all final type, lint, unit, build, Product
E2E/a11y/localization, and affected Commerce regression gates pass.

## Project Structure

### Documentation (this feature)

```text
specs/052-frontend-repository-foundation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── frontend-internal-products.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
packages/contracts/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    └── commerce/products/
        ├── index.ts
        ├── legacy-product-scope.ts
        ├── legacy-product-record.ts
        ├── legacy-product-errors.ts
        └── legacy-products-repository.ts

packages/sdk/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    └── commerce/products/
        ├── index.ts
        ├── MockCommerceStore.ts
        ├── BrowserStorageCommerceStore.ts
        ├── MemoryCommerceStore.ts
        ├── MockProductsRepository.ts
        ├── mock-product-behavior.ts
        ├── legacy-product-serialization.ts
        ├── LegacyProductsCompatibilityFacade.ts
        ├── createCommerceServices.ts
        └── __tests__/
            ├── legacy-products-repository.contract.ts
            ├── memory-products-repository.test.ts
            ├── browser-products-repository.test.ts
            ├── mock-products-failures.test.ts
            ├── compatibility-facade.test.ts
            └── commerce-composition.test.ts

apps/commerce/
├── app/
│   ├── layout.tsx
│   └── (commerce)/products/
│       ├── page.tsx
│       └── new/page.tsx
├── features/products/
│   ├── application/
│   │   ├── LegacyMediaCompatibilityPort.ts
│   │   └── LegacyProductEditorService.ts
│   ├── hooks/
│   │   ├── legacy-product-query-keys.ts
│   │   ├── legacy-product-cache.ts
│   │   ├── useLegacyProducts.ts
│   │   └── useLegacyProductMutations.ts
│   ├── i18n/product-messages.ts
│   └── __tests__/
│       ├── legacy-product-query-keys.test.ts
│       ├── legacy-product-cache-isolation.test.tsx
│       ├── legacy-product-editor-service.test.ts
│       ├── app-provider-product-facade.test.tsx
│       ├── commerce-runtime-boundaries.test.ts
│       └── commerce-services-provider.test.tsx
└── lib/
    ├── commerce/
    │   ├── commerce-runtime-config.ts
    │   ├── CommerceServicesProvider.tsx
    │   └── CommerceProviders.tsx
    └── store/
        └── AppProvider.tsx

tests/e2e/
├── commerce-052-products-characterization.spec.ts
├── commerce-052-products.spec.ts
├── commerce-052-products-accessibility.spec.ts
└── commerce-052-product-compatibility.spec.ts

vitest.config.ts
package.json
pnpm-lock.yaml
scripts/validate-commerce-052-determinism.sh
```

**Structure Decision**: Add boundary-safe `@nexoraxs/contracts` and `@nexoraxs/sdk` workspace
packages because the requested dependency direction crosses the Commerce app's presentation/data
boundary. Keep feature hooks, editor orchestration, localized presentation, and provider wiring
inside `apps/commerce`. Keep the existing route files and `AppProvider`; only their Product seam is
migrated. Tests live beside package/app units plus repository-level Playwright journeys.

## Migration Sequence

1. Freeze characterization evidence against the pre-change Products journey.
2. Add test tooling and package skeletons without changing runtime behavior.
3. Implement internal scope/record/repository/error contracts and both stores.
4. Implement deterministic repository behavior and shared adapter contract suite.
5. Add composition root, config reader, Query Client/provider, and scoped key factory.
6. Feed the existing `AppProvider.products` projection from the compatibility facade.
7. Add direct repository hooks and the combined create/edit application service.
8. Migrate the existing Product route components without visual/route changes.
9. Pass regression/source-usage evidence, then remove only the now-unused Product write callbacks.
10. Run full gates and synchronize package/migration/release evidence.

Every checkpoint retains the legacy storage key and serialized records. A rollback changes code
selection only; it never clears or rewrites browser data.

All ten checkpoints were completed. Product hook mutations call the repository (or the bounded
editor service when media is involved), then request a facade refresh so legacy readers receive
the same repository state without a second Product write. AppProvider no longer reads or writes
the Product collection directly.

## Test Category Rationale

- **Unit**: scope validation, serialization, SKU normalization, pagination, failure rules, query keys.
- **Contract**: identical repository behavior over Memory and Browser stores.
- **Integration**: localStorage persistence/corruption/quota, provider identity, facade projection,
  scoped cache mutation and invalidation.
- **E2E**: routes, list/create/edit/refresh, not-found/duplicate recovery, UI equivalence,
  English/Arabic, RTL/LTR, keyboard/focus, axe.
- **Authorization/Audit**: production authorization and append-only Audit are **N/A for
  implementation** because no backend exists; tests instead prove fail-closed mock isolation and
  verify diagnostics are not represented as authority/Audit. Future HTTP mode remains blocked.
- **Other domains**: **N/A**; non-Product regressions are protected by the existing Commerce build
  and existing affected E2E suite, but no excluded domain is migrated.

## Complexity Tracking

No frozen-architecture violation or exceptional complexity waiver is required. The repository,
facade, adapter, and single application service are direct user requirements and bounded migration
seams, not justifications for bypassing a Constitution gate.
