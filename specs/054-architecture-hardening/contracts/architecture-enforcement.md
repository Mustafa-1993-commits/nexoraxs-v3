# Frontend Architecture Enforcement Contract

**Feature**: 054 Architecture Hardening  
**Status**: Delivery-blocking production source contract  
**Scope**: Active frontend production source under `apps/**` and `packages/**`

## 1. Purpose

Architecture conformance is a deterministic build/lint property, not a review convention. The
standard quality workflow must fail when a production source file violates an approved boundary.

The enforcement mechanism combines:

- a TypeScript-compiler-API source/dependency scanner for repository-wide rules;
- targeted ESLint `no-restricted-imports`/zero-warning feedback for common local violations;
- package `exports` that make private SDK infrastructure physically unavailable; and
- valid/invalid architecture fixtures proving every rule.

No known-debt suppression list is permitted at completion.

## 2. Production Source Inventory

### Included

- Roots: `apps/**`, `packages/**`.
- Extensions: `.ts`, `.tsx`, `.mts`, `.cts`, `.js`, `.jsx`, `.mjs`, `.cjs`.
- Configuration files under those roots receive global/cross-app/package checks when applicable.

### Excluded

- directories named `__tests__`, `__fixtures__`, `.next`, `.turbo`, `node_modules`, `dist`,
  `build`, `out`, `coverage`, `playwright-report`, or `test-results`;
- filenames containing `.test.`, `.spec.`, or `.stories.`;
- architecture fixture roots;
- `next-env.d.ts`, generated declarations, and `*.generated.*`; and
- backend, tests, specs, documentation, and archives outside the clarified roots.

The inventory is sorted, printed in diagnostics/summary, and tested against representative nested
paths. A missing directory or failed read is an error, not an empty successful scan.

## 3. Resolution Requirements

The scanner parses and resolves:

- static `import` declarations;
- `export ... from` and `export * from` declarations;
- dynamic `import()` with a static string;
- CommonJS `require()` with a static string;
- relative paths;
- each app's `@/` alias;
- package roots and subpaths;
- package `exports`; and
- re-export/barrel chains.

An unresolved relative, app-alias, `apps/`, `packages/`, or `@nexoraxs/*` internal-looking import is
a violation. Resolution cannot silently ignore a misspelled private path.

## 4. Required Rules

Every diagnostic contains the stable ID below.

### `ARCH-APP-001` — Application layers stay framework-neutral

Files classified as application ports/services may not import or reference:

- React, React Query, Next.js, QueryClient;
- hooks, components, pages, providers, query-key/cache modules;
- concrete SDK classes or testing paths;
- `File`, Blob, DOM image/canvas/document/window storage APIs; or
- environment variables.

### `ARCH-CONTRACT-001` — Contracts never depend outward

`packages/contracts/**` may not import:

- `packages/sdk`, any app, React/UI/framework code;
- repository/store/facade implementations;
- environment/browser/storage/transport modules; or
- another app's private source.

Contracts may import only contract-safe values/types and domain-neutral type dependencies already
approved by package structure.

### `ARCH-REPOSITORY-001` — Repository implementations depend inward

Repository/facade implementations may import contracts and narrow infrastructure ports. They may
not import pages, components, hooks, providers, query-key/cache modules, or another application's
source. Repositories cannot access browser storage directly; only approved storage adapters may.

### `ARCH-UI-001` — UI and hooks cannot select infrastructure

Pages, components, hooks, providers, and presentation modules may not import:

- mock repositories;
- browser/memory stores;
- serializers;
- deterministic behavior simulators;
- concrete compatibility facade classes;
- deep SDK source/internal paths; or
- `@nexoraxs/sdk/testing`.

### `ARCH-COMPOSITION-001` — Selection is composition-only

Only exact Core/Commerce composition-root files may call SDK runtime factories or construct
repository, facade, service, cache-adapter, and store implementations. Hooks/renders cannot create
them.

The composition allowlist contains the SDK runtime root, Commerce application/React assembly, and
the Core read-only Commerce integration root as exact files. It is reviewed when changed;
directory globs are not accepted.

### `ARCH-CROSS-APP-001` — Apps never import another app's internals

Any resolved dependency from one `apps/<name>` source tree into another app tree fails, whether
written as a relative path, alias, absolute project path, package-like path, or barrel.

Core/Commerce interaction is permitted only through public contract-typed package surfaces or
locally declared consumer ports whose implementations are supplied by composition.

### `ARCH-OWNER-001` — Core does not write Commerce operational state

Core production source may not:

- write known Commerce Product, Customer, Inventory, Movement, Transfer, Return, Order, Invoice,
  document, media-association, or setup keys;
- construct those records for persistence;
- expose the removed operational write callbacks; or
- import a Commerce internal writer.

Approved read-only projection and handoff port calls are allowed.

### `ARCH-OWNER-002` — Commerce does not write Core identity state

Commerce production source may not construct/persist Core User, Workspace, Business, Business
Unit, Department, Branch, Membership, Subscription, or enablement identity as a fallback for a
handoff. Read-only context projection/session caching through the approved adapter is allowed.

### `ARCH-SHARED-001` — Shared remains owner-neutral

`packages/shared` may not import Core/Commerce application/domain implementations or contain/export
the moved Commerce Stock, Movement, Transfer, Return, Order, Invoice/document, tax, discount,
refund, setup, media, quota, or operational-report policy.

Because import analysis cannot prove a pure function is neutral, enforcement also verifies the
approved shared public barrel/symbol inventory and rejects the removed policy exports.

### `ARCH-STORAGE-001` — Browser storage is infrastructure-only

Bare, `window.`, `globalThis.`, and computed-string access to `localStorage` or `sessionStorage`
fails outside exact approved files.

Initial expected final allowlist:

```text
packages/shared/src/mock-db/storage.ts
packages/sdk/src/commerce/products/BrowserStorageCommerceStore.ts
packages/sdk/src/commerce/operations/BrowserLegacyCommerceOperationsStore.ts
packages/sdk/src/commerce/integration/BrowserLegacyCommerceIntegrationStore.ts
packages/sdk/src/core/BrowserLegacyCorePlatformStore.ts
apps/core-platform/lib/infrastructure/browser/core-session-storage.ts
apps/core-platform/lib/infrastructure/browser/core-theme-storage.ts
apps/core-platform/lib/infrastructure/browser/core-locale-storage.ts
```

Implementation may use fewer files. Any additional file requires contract/documentation review and
an explicit exact-path addition. Providers, pages, components, hooks, application services, and
repositories are never allowed.

### `ARCH-SDK-001` — Private SDK infrastructure stays private

Production source may import the general SDK runtime entry only for the composition factory and
stable runtime types. It may not import:

- removed domain implementation subpaths;
- deep SDK source paths;
- an `/internal` path; or
- `@nexoraxs/sdk/testing`.

The rule also inspects `packages/sdk/package.json` exports and root barrel declarations.

### `ARCH-ENV-001` — Commerce environment reads are centralized

`process.env` and `NEXT_PUBLIC_*` Commerce runtime variables are permitted only in:

```text
apps/commerce/lib/commerce/commerce-runtime-config.ts
```

Contracts, hooks, pages, providers, application services, and repositories cannot read them.

### `ARCH-CACHE-001` — React Query remains outer

React Query imports are permitted in feature hooks, outer cache adapters, provider setup, and tests
only. Application directories and contracts cannot import QueryClient, query-key implementation,
or cache helpers.

### `ARCH-PROVIDER-001` — Commerce AppProvider delegates

The gate and focused source tests require:

- no direct browser storage;
- no QueryClient/query-key import;
- no moved policy imports;
- no record factory/calculation implementation for included Commerce operations; and
- one service-delegation path for each retained callback.

Behavior tests, not token checks alone, prove one persistence effect and committed-state
publication.

### `ARCH-RESOLUTION-001` — Internal imports resolve explicitly

Relative, app-alias, `apps/`, `packages/`, and `@nexoraxs/*` imports must resolve through the
filesystem and applicable package export map. A private or misspelled internal path fails closed.

## 5. Diagnostic Contract

Example:

```text
ARCH-APP-001 apps/commerce/features/orders/application/Example.ts:3:1
application modules cannot import @tanstack/react-query
dependency: @tanstack/react-query
```

Diagnostics:

- sort by relative file, line, column, rule ID;
- include source location, rule ID, reason, and offending dependency/global;
- return nonzero when one or more violations exist;
- return zero only after the complete production inventory is processed; and
- never print source payloads, tenant/browser values, records, secrets, or Customer data.

## 6. SDK Export Contract

Expected package export shape:

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./testing": "./src/testing/index.ts"
  }
}
```

The root may export only:

- `createCommerceServices` and the bounded projection, Core Storage Coordination, and temporary
  Core compatibility composition factories;
- `CommerceRuntimeConfig`;
- contract-typed runtime/factory interfaces genuinely required by production consumers; and
- an intentionally public Core/Commerce projection/handoff composition view if required.

The root/subpaths must not export:

- mock repositories;
- browser or memory stores;
- serializers;
- behavior/failure simulators;
- concrete compatibility facades; or
- raw storage adapters.

The testing entry may export those test utilities. Production source cannot import that entry.
Tests migrate from the SDK root to the testing entry. Vitest aliases use exact-match rules so root
and testing paths resolve independently.

## 7. Fixture Contract

Invalid fixtures exist outside production roots and are read as text/AST; they are never imported
or compiled into applications.

At minimum, invalid fixtures prove rejection of:

1. application → React Query;
2. application → hook query-key barrel;
3. component/hook → concrete SDK implementation through root/subpath/barrel;
4. app → another app through relative path;
5. app → another app through alias/package-like path;
6. contract → implementation/framework;
7. repository → UI/provider;
8. shared → owner policy/module;
9. browser storage outside the allowlist, including computed/globalThis access;
10. Core → Commerce writer/key;
11. Commerce → Core identity writer;
12. production → `@nexoraxs/sdk/testing`;
13. environment read outside runtime config; and
14. unresolved internal-looking import.

Valid fixtures prove:

- presentation → hook → application → contract;
- SDK repository → contract → storage port;
- composition root → SDK factory;
- outer React Query adapter → application change port + query keys;
- approved storage adapter browser-global use;
- Core → read-only Commerce projection port; and
- tests → `@nexoraxs/sdk/testing`.

Each invalid fixture asserts the exact rule ID and normalized location. Consecutive runs produce
identical ordering/output.

## 8. ESLint and Quality Workflow

Targeted ESLint overrides mirror common rules for immediate editor feedback. ESLint scripts use
`--max-warnings=0`. The whole-repository scanner remains authoritative for resolved graph,
ownership, browser, and export rules.

Root scripts include:

```json
{
  "architecture:check": "node scripts/check-frontend-architecture.mjs",
  "lint": "pnpm architecture:check && turbo run lint",
  "typecheck": "turbo run typecheck",
  "quality": "pnpm lint && pnpm typecheck && pnpm test:unit && pnpm build"
}
```

Every active app/package receives a no-output typecheck task compatible with its existing strict
configuration. The architecture check is delivery-blocking before merge.

The final exact composition files are:

```text
packages/sdk/src/commerce/runtime/createCommerceServices.ts
apps/commerce/lib/commerce/createCommerceApplicationServices.ts
apps/commerce/lib/commerce/CommerceServicesProvider.tsx
apps/core-platform/lib/commerce/createCoreCommerceIntegration.ts
```

## 9. Completion Evidence

The enforcement contract passes only when:

- 100% of included production files are scanned;
- every invalid fixture fails with the expected rule/location;
- every valid fixture passes;
- no real-source violation remains;
- SDK manifest and root barrel expose no private concrete infrastructure;
- `pnpm lint` has zero warnings;
- strict type checks and production builds pass; and
- twenty consecutive deterministic runs produce identical diagnostics/results.
