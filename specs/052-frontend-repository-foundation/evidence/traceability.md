# Feature 052 Requirement Traceability

Date: 2026-07-17

The paths below are primary evidence; final aggregate commands are recorded in `quality-gates.md`
and the release validation report.

## Functional requirements

| Requirement | Primary implementation / evidence |
|---|---|
| FR-001 | `legacy-product-scope.ts`; scope-isolation tests |
| FR-002 | Scope JSDoc, contracts README, internal contract document |
| FR-003 | `us2-scope-isolation.md`; no-`businessId` source gate |
| FR-004 | `LegacyProductsRepository`; repository contract tests |
| FR-005 | Repository scope matching; complete query-key/cache tests |
| FR-006 | Foreign-ID and invalid-scope isolation tests |
| FR-007 | `packages/contracts/src/commerce/products`; source-boundary test |
| FR-008 | Contract JSDoc, package README, internal contract document |
| FR-009 | `packages/sdk/src/commerce/products`; SDK README |
| FR-010 | SDK store/repository; shared source gate |
| FR-011 | `packages/shared/README.md` quarantine statement |
| FR-012 | Shared boundary documentation and no new shared behavior diff |
| FR-013 | App-import source-boundary gate |
| FR-014 | `LegacyProductRecord` warning and internal contract document |
| FR-015 | Serialization and opaque-field contract/E2E tests |
| FR-016 | Shared list/get/create/update/remove suite |
| FR-017 | Lifecycle-vocabulary source gate; DD-02 Constitution Check |
| FR-018 | Repository result assertions and remove compatibility tests |
| FR-019 | Stored-order pagination contract cases |
| FR-020 | Duplicate-SKU contract and cross-scope tests |
| FR-021 | `legacy-product-errors.ts`; failure/storage/scope suites |
| FR-022 | SDK/contracts README HTTP prohibition; DD-29 check |
| FR-023 | Repository constructor + source-boundary storage assertion |
| FR-024 | Browser adapter contract, refresh E2E, characterization |
| FR-025 | Memory adapter clone/isolation tests |
| FR-026 | Shared contract suite over memory and browser stores |
| FR-027 | Opaque-field, clone, quota, rollback, atomic failure tests |
| FR-028 | Fake-timer latency tests and 20-run evidence |
| FR-029 | Ordered rule/invocation/SKU deterministic tests |
| FR-030 | Pagination and corrupt/unavailable/quota tests |
| FR-031 | Fixed-clock/fixed-ID/order tests |
| FR-032 | `createCommerceServices` and composition tests |
| FR-033 | `commerce-runtime-config.ts`; runtime source test |
| FR-034 | Runtime source-boundary test and `source-boundaries.md` |
| FR-035 | Pages import hooks only; implementation-selection source gate |
| FR-036 | Provider stack and 100-render identity test |
| FR-037 | HTTP unavailable/base-URL/no-fetch composition tests |
| FR-038 | Injected memory store, clock, ID, and failure-rule tests |
| FR-039 | Product hooks and storage/fetch/environment boundary test |
| FR-040 | Hook/cache implementation; no business logic in cache helpers |
| FR-041 | Complete normalized list/item key tests |
| FR-042 | Exact-scope cache mutation/invalidation tests |
| FR-043 | Simple hook mutations call repository directly |
| FR-044 | Editor service and separate media port tests |
| FR-045 | Page loading/error/empty/validation/not-found/success recovery paths |
| FR-046 | Repository-backed hooks + repository-delegating facade tests |
| FR-047 | AppProvider facade subscription and legacy-reader E2E |
| FR-048 | Characterization, regression, persistence, and seed-ID E2E |
| FR-049 | `AppProvider` retained in provider stack |
| FR-050 | Pre-change `characterization.md` evidence |
| FR-051 | Migration sequence and per-story evidence checkpoints |
| FR-052 | Zero-consumer source proof before callback deletion |
| FR-053 | Excluded-domain source diff and regression evidence |
| FR-054 | Contract/scope/facade/Product E2E suites |
| FR-055 | Pagination/failure/storage/key/cache suites |
| FR-056 | Memory/jsdom isolation, fixed inputs, 20 clean runs |
| FR-057 | Bilingual direction/mixed-data/keyboard/focus/axe E2E |
| FR-058 | Contracts/SDK/Commerce README demo-only warnings |
| FR-059 | Minimized diagnostic tests and determinism evidence |
| FR-060 | HTTP unavailable path and documented future approval gate |
| FR-061 | `quality-gates.md` and E2E evidence |
| FR-062 | Reconciled spec/plan/tasks/contract/quickstart and release report |
| FR-063 | No backend/Laravel changes in Feature 052 diff |
| FR-064 | No MSW dependency or source usage |
| FR-065 | Characterization/regression route/UI/key/ID evidence |
| FR-066 | DD-02/DD-14/DD-29 post-implementation check |
| FR-067 | AppProvider retained; no Core/OSEnablement/other-domain migration |
| FR-068 | Ownership warnings in contracts, SDK, shared, and app READMEs |
| FR-069 | Frozen sources/ADRs unchanged; release Constitution Check |

## Success criteria

| Criterion | Evidence |
|---|---|
| SC-001 | Pre/post characterization and Product regression suites |
| SC-002 | Create/edit/reload assertions in both Product E2E suites |
| SC-003 | 14-test scope/repository/cache matrix |
| SC-004 | Shared repository contract over both stores |
| SC-005 | `us6-determinism.md`: 20/20 fresh runs, zero retries/flakes |
| SC-006 | Single composition factory/config reader and source-boundary test |
| SC-007 | 100-render provider identity test |
| SC-008 | Contract, scope, storage, composition, and failure-rule tests |
| SC-009 | English/LTR and Arabic/RTL Product accessibility E2E |
| SC-010 | Runtime source scan and zero old callback proof |
| SC-011 | Zero-latency local repository behavior and Products E2E timings |
| SC-012 | Final type/lint/unit/contract/E2E/a11y/build/source evidence |
