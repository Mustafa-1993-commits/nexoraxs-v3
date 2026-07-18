# NexoraXS Repository Discovery — Executive Summary

## Report status

| Field | Value |
|---|---|
| Phase | Master Repository Discovery and System Inventory |
| Scope | Repository state only; documentation and implementation were inventoried but not reconciled |
| Snapshot date | 2026-07-18 |
| Git branch | `055-commerce-order-command-boundary` |
| Git commit | `31937784e4b2c0951cff1d803ab1537835f6b14c` |
| Tracked files inspected | 1,469 |
| Tracked bytes | 31,540,457 |
| Aggregate tracked line count | 287,381, including generated text and non-source formats counted by `wc` |
| Content-read fingerprint | `ad7c897e1656b2dfbffc68d98aa6fb85717dc9facb5304b9dbf23b1286993aa4` |
| Production source inventory | 299 JavaScript/TypeScript files discovered by the repository architecture scanner |
| Repository changes made by this phase | This report and `01-REPOSITORY-STATE.md` only |

This is a discovery baseline. It contains no architecture-to-documentation comparison, gap
finding, recommendation, migration, refactoring proposal, or implementation decision.

## Repository purpose

NexoraXS is represented in the repository as a Business Operating Intelligence Platform with a
shared Core Platform and independent Operating Systems. The executable tree currently contains a
marketing experience, a Core Platform frontend, and the Commerce OS frontend. The broader product
and domain program is captured in the governed documentation and Spec Kit corpus.

The current executable implementation is frontend-first. All three applications are Next.js App
Router projects. Core and Commerce currently execute against browser-backed mock and compatibility
stores; the checked-in runtime contains no server API routes, backend application, database
migrations, or infrastructure definitions. The Commerce SDK exposes an HTTP selection seam, but
the checked-in composition root rejects that selection as unavailable and performs no request.

Primary evidence: [root package manifest](../../package.json),
[workspace definition](../../pnpm-workspace.yaml),
[Core application](../../apps/core-platform),
[Commerce application](../../apps/commerce),
[Commerce SDK composition](../../packages/sdk/src/commerce/runtime/createCommerceServices.ts), and
[repository instructions](../../AGENTS.md).

## Current architecture style

The implemented system is a pnpm/Turborepo TypeScript monorepo with these structural properties:

- three separately runnable frontend applications with ports `3000`, `3001`, and `3002`;
- five source-consumed workspace packages for types, contracts, SDK/infrastructure, shared
  compatibility utilities, and reusable presentation;
- no direct source imports between applications;
- a feature-oriented Commerce application with presentation, hooks/cache orchestration,
  application services, contract ports, SDK adapters, and browser stores;
- a Core application organized around routes, shell/auth/onboarding presentation, a provider
  facade, browser adapters, and read-only Commerce projection/handoff integration;
- dependency constraints enforced through package export maps, app ESLint restrictions, and a
  repository-specific static architecture scanner; and
- browser `localStorage` and `sessionStorage` as the active persistence and cross-screen state
  mechanisms for the current mock journey.

The architecture is therefore best described, for this snapshot, as a frontend modular monorepo
with feature-oriented layers and ports/adapters seams around a browser-mock runtime. This describes
the code that exists; it does not evaluate conformance to the architecture documentation.

## Repository scale and composition

| Surface | Tracked files | Current role |
|---|---:|---|
| `apps/` | 330 | Landing, Core Platform, and Commerce OS frontends |
| `packages/` | 157 | Shared types, contracts, SDK adapters, utilities, and UI |
| `docs/` | 350 | Governance, Genesis, milestone architectures, execution guidance, releases, freezes, and archives |
| `specs/` | 345 | 51 numbered Spec Kit feature directories and their planning/evidence artifacts |
| `tests/` | 66 | Architecture fixtures/tests and browser end-to-end suites |
| `.agents/` | 28 | Generic/Codex Spec Kit commands and skills |
| `.claude/` | 109 | Claude command and skill integrations |
| `.codex/` | 31 | Repository-local UI/UX skill data and tooling |
| `.specify/` | 38 | Constitution, templates, workflow configuration, scripts, and integration manifests |
| `scripts/` | 5 | Frontend architecture enforcement and deterministic test runner |
| Root files | 10 | Workspace, build, test, runtime guidance, and ignore configuration |

The tracked tree contains 649 Markdown files and 501 TypeScript/TSX files. It also includes
documentation assets, historical prototypes, images, CSV design data, HTML, DOCX, scripts, and
integration metadata. Archived assets are repository evidence and provenance, not executable
runtime dependencies.

## Major applications

| Application | Logical owner | Purpose | Public/runtime surface | Active state source |
|---|---|---|---|---|
| `apps/landing` | Marketing experience | Public product positioning and calls to action | `/` on port `3000`; links to Core login | Static React content plus `NEXT_PUBLIC_CORE_PLATFORM_URL` |
| `apps/core-platform` | Core Platform frontend | Authentication mock flows, onboarding, workspace shell, Product Hub, billing, integrations, settings, and team views | 15 route paths on port `3001`; Commerce launch/handoff URL | React provider state, shared mock DB helpers, Core browser session/theme/locale adapters, SDK compatibility adapters |
| `apps/commerce` | Commerce OS frontend | Commerce setup, catalog, customers, inventory, orders, POS, invoices, returns, reports, and Commerce settings | 20 page route files on port `3002`; accepts Core handoff context | React Query, Commerce application services, SDK repositories/adapters, browser storage, and provider compatibility state |

Application details, route inventories, consumers, and module responsibilities are recorded in
[01-REPOSITORY-STATE.md](./01-REPOSITORY-STATE.md).

## Major packages

| Package | Responsibility | Direct internal dependency | Primary consumers |
|---|---|---|---|
| `@nexoraxs/types` | Shared current frontend record types for Core and Commerce | None | Core, Commerce, Contracts, SDK, Shared |
| `@nexoraxs/contracts` | Framework- and storage-independent frontend compatibility ports, commands, queries, records, results, and errors | Types | Core, Commerce, SDK, architecture tests |
| `@nexoraxs/sdk` | Mock repositories, browser/memory adapters, compatibility mapping, serialization, diagnostics, integration adapters, and runtime composition | Contracts, Types | Core and Commerce composition roots; tests use `@nexoraxs/sdk/testing` |
| `@nexoraxs/shared` | Existing mock DB schema/storage, catalogs, i18n dictionary, formatting, identity/date helpers, selectors, and seed data | Types | Core and Commerce |
| `@nexoraxs/ui` | Shared presentation components, branding, design tokens, and Core/Commerce themes | React and React DOM peers | Core and Commerce |

At manifest level, Core and Commerce consume the five workspace packages; SDK consumes Contracts
and Types; Contracts and Shared consume Types; UI consumes React through peer dependencies; and
Landing consumes only external frontend libraries. No manifest-level cycle exists among the five
workspace packages.

## Runtime communication and data flow

The current user-facing journey crosses applications through navigation and compatibility
adapters, not through a checked-in HTTP API:

1. Landing links users to the Core login route.
2. Core creates a Commerce handoff URL containing selected session and organization context.
3. Commerce accepts that context through the SDK handoff ingress and persists the compatible
   browser state used by the Commerce journey.
4. Core can compose Commerce summary information through a read-only projection adapter.
5. Within Commerce, pages use scoped hooks or the provider facade; hooks and application services
   depend on contract ports; the composition roots supply SDK repositories and browser adapters.
6. Mutations persist to browser stores and publish scoped cache/provider change notifications;
   readers then obtain refreshed projections.

The active Commerce flow is:

```text
Page/component
  -> feature hook or AppProvider facade
  -> application service / contract port
  -> SDK repository or compatibility adapter
  -> browser storage adapter
  -> localStorage/sessionStorage
  -> change publication / React Query invalidation / provider refresh
```

No application imports source from another application. Cross-app addresses are configured or
hard-coded development URLs, and the code scanner treats cross-app imports as violations.

## Technology stack

| Concern | Checked-in technology |
|---|---|
| Frontend framework | Next.js `16.2.6`, App Router |
| UI runtime | React / React DOM `19.2.4` |
| Language | TypeScript `5.9.3` at root; app manifests accept TypeScript 5 |
| Styling | Tailwind CSS 4 through `@tailwindcss/postcss`, shared CSS themes/tokens |
| Client cache | TanStack React Query `^5.101.2` in Commerce |
| Motion and icons | Framer Motion in Landing; Lucide in all product frontends; Flag Icons in Core |
| Package/workspace manager | pnpm `9.15.9` with `apps/*` and `packages/*` workspaces |
| Task orchestration | Turborepo `^2.0.0` |
| Static quality | TypeScript strict mode, ESLint 9/Next rules, custom architecture scanner |
| Unit/component/contract tests | Vitest `^4.1.10`, Testing Library, jsdom |
| Browser tests | Playwright `^1.61.0`, Axe integration |
| Specification workflow | Spec Kit `0.8.8.dev0`, repository constitution, templates, commands, and feature artifacts |

There is no repository-level Prettier configuration. No checked-in `.github/` workflow, backend
runtime, `infra/` directory, Docker definition, PHP/Laravel source, database schema, PostgreSQL
configuration, or Redis configuration is present in this snapshot.

## Testing and development workflow

The root scripts provide development, build, lint, typecheck, architecture check, unit test, E2E,
and aggregate quality commands. Turborepo delegates app/package scripts and respects upstream
package tasks. Vitest covers 105 colocated Commerce/Core/SDK test files plus four repository
architecture test files. The root E2E tree contains 19 Playwright spec files and four fixture
files. A separate Core Playwright configuration runs the Core characterization suite on port
`3001`; the default Playwright configuration runs Commerce visibly on port `3002`.

The static architecture command was executed during discovery and reported:

```text
Frontend architecture: PASS (299 production files, 0 violations).
```

That command result is an inventory fact about its configured rules and current source set, not a
code-review or broader architecture verdict. The discovery did not run the complete lint,
typecheck, unit, build, or E2E suites.

## Documentation and specification corpus

The documentation tree is larger than the executable application tree by file count. It contains:

- 41 numbered ADRs plus governance lifecycle and glossary material;
- 20 Genesis documents;
- Core Platform, Business Brain, Commerce OS, Marketplace, AI Expert Network, and Global Platform
  architecture milestone sets;
- 13 architecture-freeze/readiness documents;
- design intelligence and execution standards;
- release validation reports;
- one implementation audit; and
- 168 archived/provenance files, including historical Markdown, HTML, images, CSVs, and DOCX files.

The `specs/` tree contains 51 feature directories from the implemented feature history through
Feature 055. Across those directories, 51 `spec.md`, 48 `plan.md`, 45 `tasks.md`, 46
`requirements.md`, 43 `research.md`, 25 `data-model.md`, 28 `quickstart.md`, and feature-specific
contracts, checklists, matrices, evidence, and performance artifacts are tracked. The active Spec
Kit pointer and Git branch both identify `055-commerce-order-command-boundary`.

This report inventories those sources without comparing their assertions or deciding which
implementation elements conform to them.

## Initial observations

The following are descriptive observations only:

- The current runnable product surface is entirely frontend code.
- Core and Commerce are independent Next.js applications with distinct ports and no direct source
  imports.
- Commerce contains the most developed internal layering and the largest executable/test surface.
- Browser storage is both the current mock persistence mechanism and an integration seam for the
  active frontend journey.
- Contracts and SDK records are explicitly named and documented as frontend-internal compatibility
  surfaces rather than future HTTP or platform contracts.
- The application providers remain broad compatibility facades for session, setup, organization,
  and retained operational state while newer Commerce slices use repositories and application
  services.
- Arabic/English data and RTL/LTR behavior are represented in shared dictionaries, application
  state, UI code, and test suites.
- Architecture enforcement is executable and covers import resolution, cross-app access, layer
  dependencies, SDK exports, browser storage/environment access, composition roots, and selected
  domain ownership patterns.
- The documentation, specification, and agent-workflow surfaces together account for most tracked
  files, reflecting a documentation- and spec-driven repository organization.
- CI/CD provider behavior, production deployment topology, production API behavior, server-side
  authorization, database persistence, and production observability cannot be determined from
  checked-in executable evidence because those implementation surfaces are not present.

## Discovery confidence

Confidence is high for the checked-in frontend topology, package direction, routes, current
browser data path, test/tool configuration, and documentation/spec inventory. Every tracked file
was content-read for the snapshot fingerprint, and all source/configuration/test files were
semantically classified.

Confidence is intentionally not asserted for runtime systems that are not represented in this
tree: production backend services, databases, infrastructure, deployment, CI/CD execution,
external integrations, secrets management, and operational telemetry. Additional repository or
environment evidence would be required to inventory those systems.
