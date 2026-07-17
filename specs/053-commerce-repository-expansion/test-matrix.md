# Feature 053 Acceptance-to-Test Matrix

## Requirement Coverage

| Requirements | Primary evidence |
|---|---|
| FR-001–FR-008 | Characterization E2E, Feature 052 regression, route/storage compatibility |
| FR-009–FR-018 | Repository scope contracts, overlap matrix, query-key/cache and relationship isolation |
| FR-019–FR-031 | Customer repository/facade/hook/service tests, Customer and POS E2E, callback source scan |
| FR-032–FR-038 | Inventory contract/projection tests and retained-write E2E |
| FR-039–FR-045 | Order contract/view tests and retained POS/Return write E2E |
| FR-046–FR-051 | Invoice contract/view/document tests and retained issuance E2E |
| FR-052–FR-063 | Contract/source-boundary tests, memory/browser parity, deterministic mock tests |
| FR-064–FR-074 | Composition identity, provider lifetime, manual retry, exact invalidation, facade tests |
| FR-075–FR-085 | EN/AR, RTL/LTR, keyboard, focus, screen-reader, axe, all quality/regression gates |
| FR-086–FR-092 | Source audit for prohibited HTTP/backend/lifecycle/canonical ownership behavior |

## Success-Criteria Coverage

| Criterion | Evidence |
|---|---|
| SC-001 | Characterization replay and route/UI regression screenshots/assertions |
| SC-002 | Customer list/get/create/update through both entry points and pending duplicate guard |
| SC-003 | Browser refresh tests for Customer and retained Inventory/Order/Invoice writes |
| SC-004 | Serialized key/ID/field/reference compatibility tests |
| SC-005 | Multi-Workspace/BU/Branch overlapping-ID isolation matrix |
| SC-006 | Shared conformance suites against memory and browser-compatible stores |
| SC-007 | Twenty deterministic failure/latency suite runs |
| SC-008 | Exact-once retained-write observation tests |
| SC-009 | Customer callback source scan and single persistence-path tests |
| SC-010 | Composition boundary and 100-rerender identity tests |
| SC-011 | Explicit retry-only hook/E2E tests in EN and AR |
| SC-012 | Keyboard, semantic, focus, mixed-direction, non-color-only, and axe tests |
| SC-013 | Feature 052, Commerce 044, and applicable Core 050 regressions |
| SC-014 | Strict type, zero-warning lint, Vitest, Playwright, and production build gates |

## Repository Contract Matrix

| Domain | Memory | Browser-compatible | Scope | Deterministic failure | Writes |
|---|---|---|---|---|---|
| Products | Existing Feature 052 | Existing Feature 052 | Existing legacy Product scope | Existing | Existing Feature 052 behavior |
| Customers | Required | Required | Workspace + legacy BU; create Branch | Required | create/update only |
| Inventory | Required | Required | Workspace + legacy BU + Branch | Required | none |
| Orders | Required | Required | Branch-filtered list; legacy-BU get | Required | none |
| Invoices | Required | Required | Branch-filtered list; legacy-BU get | Required | none |

## User-Visible State Matrix

| Surface | Loading | Empty | Error + manual retry | Not found | Pending | Validation | EN/AR + direction |
|---|---:|---:|---:|---:|---:|---:|---:|
| Customers list | ✓ | ✓ | ✓ | N/A | create | ✓ | ✓ |
| Customer detail | ✓ | N/A | ✓ | ✓ | update | ✓ | ✓ |
| POS Customer | ✓ | ✓ | ✓ | N/A | create | ✓ | ✓ |
| Inventory | ✓ | ✓ | ✓ | N/A | N/A | N/A | ✓ |
| Orders list | ✓ | ✓ | ✓ | N/A | N/A | N/A | ✓ |
| Order detail | ✓ | N/A | ✓ | ✓ | N/A | N/A | ✓ |
| Invoices list | ✓ | ✓ | ✓ | N/A | N/A | N/A | ✓ |
| Invoice detail/document | ✓ | N/A | ✓ | ✓ | N/A | N/A | ✓ |
