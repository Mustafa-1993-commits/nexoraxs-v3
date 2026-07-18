# NexoraXS Repository State

## 1. Purpose and scope

This document is the detailed repository-discovery baseline for the NexoraXS workspace at commit
`31937784e4b2c0951cff1d803ab1537835f6b14c` on branch
`055-commerce-order-command-boundary`, inspected on 2026-07-18.

It records what is present, what each executable or supporting module does, how current modules
communicate, and how development work is organized. It does not:

- compare implementation against architecture documentation;
- classify architecture gaps or violations;
- decide whether a current or documented model is canonical;
- recommend changes;
- propose migrations or refactoring; or
- evaluate product-roadmap priority.

Terms such as “owner” in this report mean the logical implementation owner visible from the
current folder, contract, and state-write boundaries. They are not a new governance decision.

## 2. Inspection basis

### 2.1 Snapshot evidence

| Measure | Result |
|---|---:|
| Tracked files | 1,469 |
| Tracked bytes | 31,540,457 |
| Aggregate `wc -l` count | 287,381 |
| Markdown files | 649 |
| TypeScript files | 344 |
| TSX files | 157 |
| JSON files | 30 |
| Shell scripts | 13 |
| Tracked documentation files | 350 |
| Tracked feature-specification files | 345 |
| Tracked application files | 330 |
| Tracked package files | 157 |
| Root test-tree files | 66 |
| Production JS/TS files discovered by the architecture scanner | 299 |

All tracked files were opened through a complete content pass and included in a deterministic
content fingerprint:

```text
ad7c897e1656b2dfbffc68d98aa6fb85717dc9facb5304b9dbf23b1286993aa4
```

Source, configuration, manifests, scripts, tests, README files, architecture documents, ADRs,
Spec Kit artifacts, and comments were then semantically classified. Binary images, icons, DOCX
files, cached Python bytecode in archived tooling, and other non-text assets were inventoried by
path, type, size, and content hash; their binary payload was not interpreted as executable source.

Ignored local outputs were inspected as filesystem surfaces but were not treated as tracked
repository modules. These include installed dependencies, `.next`, `.turbo`, `playwright-report`,
and `test-results` directories.

### 2.2 File-format composition

The principal tracked extensions are:

| Extension | Count | Primary use |
|---|---:|---|
| `.md` | 649 | Architecture, specifications, workflow instructions, reports, and READMEs |
| `.ts` | 344 | Contracts, services, adapters, configuration, unit tests, and tooling |
| `.tsx` | 157 | Next.js routes, React components/providers, and component tests |
| `.png` | 115 | Documentation, design, prototype, and application assets |
| `.csv` | 48 | UI/UX skill datasets |
| `.json` | 30 | Manifests, workflow state, test evidence, and package metadata |
| `.svg` | 17 | Branding and application assets |
| `.sh` | 13 | Spec Kit, Git integration, and deterministic validation scripts |
| `.jsx` | 13 | Archived/prototype UI implementation |
| `.css` | 13 | Application globals, shared themes, tokens, and archived styles |
| `.mjs` | 10 | ESLint, PostCSS, and architecture-enforcement modules |
| Other tracked formats | 60 | HTML, YAML, Python, DOCX, XML, icons, text, and metadata |

## 3. Complete top-level inventory

### 3.1 Tracked source tree

| Path | Files | Responsibility | Logical owner/consumer |
|---|---:|---|---|
| `.agents/` | 28 | 14 Spec Kit command definitions and 14 corresponding Codex/generic skills | Repository automation; consumed by compatible AI agents |
| `.claude/` | 109 | 14 Spec Kit commands plus 95 files supporting Claude development skills | Claude-oriented contributor tooling |
| `.codex/` | 31 | Repository-local UI/UX design skill and searchable datasets/scripts | Codex-oriented contributor tooling |
| `.specify/` | 38 | Spec Kit constitution, feature pointer, templates, shell scripts, integration manifests, Git extension metadata, and workflow definitions | Spec-driven development workflow |
| `apps/` | 330 | Three separately runnable Next.js applications | Marketing, Core Platform, Commerce OS |
| `docs/` | 350 | Governed architecture, design/execution standards, release evidence, freezes, audits, and archives | Architecture/governance/documentation program |
| `packages/` | 157 | Five private workspace packages consumed directly from source | Shared frontend foundations and compatibility boundaries |
| `scripts/` | 5 | Production-source inventory, frontend-boundary policy/scanner, command wrapper, and deterministic repeated-test script | Repository quality/tooling |
| `specs/` | 345 | 51 numbered feature directories containing specification, planning, task, contract, and evidence artifacts | Feature delivery history and active Spec Kit feature |
| `tests/` | 66 | Repository architecture tests/fixtures and Playwright end-to-end tests/fixtures | Cross-cutting verification |
| `.gitignore` | 1 | Root ignore rules for dependencies, builds, tests, environment files, logs, IDE artifacts, and downloaded-file metadata | Workspace configuration |
| `AGENTS.md` | 1 | Repository operating instructions and architecture authority order | Agents and contributors |
| `TESTING.md` | 1 | Current Playwright usage notes and Commerce flow coverage summary | Developers/testers |
| `package.json` | 1 | Root scripts, package-manager declaration, and shared dev tooling | Whole workspace |
| `pnpm-lock.yaml` | 1 | Root dependency lockfile, format version 9 | Whole workspace |
| `pnpm-workspace.yaml` | 1 | Includes `apps/*` and `packages/*` | pnpm workspace |
| `turbo.json` | 1 | Task dependencies, cache behavior, and build outputs | Turborepo |
| `vitest.config.ts` | 1 | Unit/component/contract/architecture test discovery and aliases | Vitest |
| `playwright.config.ts` | 1 | Default Commerce E2E configuration | Playwright/Commerce |
| `playwright.core.config.ts` | 1 | Core 050 characterization/performance configuration | Playwright/Core |

There are no tracked top-level `backend/`, `infra/`, `shared/`, `contracts/`, `sdk/`, `configs/`,
or `.github/` directories in this snapshot. Shared, contract, and SDK code is under `packages/`;
configuration is located at the repository root or beside each app/package.

### 3.2 Local generated and dependency surfaces

The working filesystem also contains ignored local outputs:

- root and per-project `node_modules/` directories;
- root and per-project `.turbo/` caches;
- `.next/` outputs for all three applications;
- `playwright-report/`; and
- `test-results/`.

These directories are products of installation, build, caching, and test execution. They are not
tracked modules and are excluded by the source inventory and root ignore rules.

## 4. Documentation inventory

The documentation tree is inventoried here by folder and declared subject. No assertions in these
documents are reconciled with one another or with code in this phase.

| Documentation path | Files | Content represented |
|---|---:|---|
| `docs/00-governance/` | 44 | 41 numbered ADRs, ADR index, milestone lifecycle, and canonical glossary |
| `docs/01-genesis/` | 20 | Vision, constitution, Business DNA, capabilities, knowledge, Business Brain, recommendations, AI strategy, platform blueprint/ontology, journeys, lifecycles, Product Hub, subscription, marketplace, knowledge packs, AI network, and ecosystem |
| `docs/02-core-platform/` | 17 | Core principles, vision, architecture/proposal, domain and ownership models, permissions, events, API, security, observability, deployment, technology, roadmap, patch, review, and index |
| `docs/03-business-brain/` | 14 | Discovery, capability map, architecture/domain/data ownership, contracts, events, read models, security, observability, behavior, reliability, patch, and review |
| `docs/04-commerce-os/` | 10 | Discovery, capability map, proposal/reviews/patch, three documentation waves, and final review |
| `docs/05-marketplace/` | 10 | Discovery, capability map, proposal/reviews/patch, three waves, and final review |
| `docs/06-ai-expert-network/` | 12 | Discovery, capability map, proposal/patches/conflict analysis/reviews, three waves, and final review |
| `docs/07-global-platform/` | 11 | Discovery/patch, capability map, proposal/reviews/patch, three documentation waves, and final review |
| `docs/08-implementation-audit/` | 1 | Frontend code reconciliation audit v1.0 |
| `docs/10-design-intelligence/` | 10 | Design philosophy/DNA, OS personalities, AI design rules, patterns, component governance, innovation policy, design layer/roadmap, and checklist |
| `docs/11-execution/` | 12 | Development lifecycle, responsibility matrix, feature/Spec Kit standards, frontend-first/mock/refactoring/review/documentation policies, checklist, design memory, and engineering roadmap |
| `docs/12-release/` | 3 | Feature 050 and 052 validation reports plus Windows validation |
| `docs/99-architecture-freeze/` | 13 | Core, Business Brain, Commerce, Marketplace, AI Expert Network, and Global Platform freeze/readiness records plus architecture completion record |
| `docs/archives/` | 168 | Historical plans, prototypes, implementation captures, branding, generated UI design material, HTML, Markdown, CSV, images, DOCX, Python tooling, and cached artifacts |
| `docs/genesis/` | 1 | A separately located customer-journey document |
| `docs/` root | 4 | Master architecture and three root Business Brain proposal/review files |

The 168 archived files are distributed as follows:

- 122 under `docs/archives/claude.aidesign/`;
- 31 under `docs/archives/magicpatterns/`;
- 3 under `docs/archives/branding/`;
- 3 under `docs/archives/implementation/`; and
- 9 archive-root historical HTML, text, Markdown, and DOCX files.

The executable source scanner searches only `apps/` and `packages/`; runtime code was also searched
for imports from `docs/` and archived prototypes, and none forms part of the current application
dependency path.

## 5. Specification and agent-workflow inventory

### 5.1 Spec Kit feature history

`specs/` contains 51 feature directories:

```text
001–020, 022–024, 026–044, 047–055
```

Their names trace the implemented planning history from Landing and Core UI work through the
Commerce foundation, cross-app mock journey, shared UI, localization, operational screens,
architecture reconciliation, repository seams, architecture hardening, and the active Order
command boundary. The exact tracked feature directories are:

```text
001-landing-website
002-mobile-polish
003-seo-metadata
004-footer-contact-emails
005-core-platform-shell
006-core-platform-polish
007-workspace-selector-polish
008-landing-v2-motion-polish
009-core-platform-ui-qa
010-shops-app-foundation
011-shops-app-ui-polish
012-shops-app-ui-qa
013-platform-to-shops-flow
014-shops-onboarding-v2
015-shops-onboarding-flow
016-onboarding-flow-qa
017-shops-operations-foundation
018-shops-operations-qa
019-shops-onboarding-business-type-flow
020-core-workspace-onboarding-flow
022-onboarding-country-currency-from-workspace
023-core-auth-workspace-routing-qa
024-onboarding-branch-country-currency
026-core-mock-account-session
027-full-mock-user-journey-qa
028-full-mock-data-language-qa
029-packages-foundation
030-app-launcher-card-states
031-pos-screen-full-ui
032-shared-ui-library
033-framer-motion-animation
034-landing-page-polish
035-shops-onboarding-redesign
036-commerce-operations-ui
037-auth-missing-screens
038-platform-alignment-localization-product-hub
039-landing-page-v5-2-positioning
040-commerce-identity-tax-document-templates
041-core-platform-ux-alignment
042-claude-prototype-local-port
043-mvp-end-to-end-flow
044-commerce-relationships-branches-transfers-returns
047-onboarding-flow-optimization-v2
048-business-commerce-setup-addresses
049-onboarding-architecture-v2
050-core-shell-stabilization
051-implementation-documentation-reconciliation
052-frontend-repository-foundation
053-commerce-repository-expansion
054-architecture-hardening
055-commerce-order-command-boundary
```

Artifact counts across those directories are:

| Artifact | Count | Role |
|---|---:|---|
| `spec.md` | 51 | Feature requirements and acceptance scenarios |
| `plan.md` | 48 | Technical implementation plans and constitution checks |
| `tasks.md` | 45 | Dependency-ordered delivery tasks |
| `requirements.md` | 46 | Feature-specific requirements/checklists |
| `research.md` | 43 | Discovery and implementation research |
| `data-model.md` | 25 | Feature-local data/model descriptions |
| `quickstart.md` | 28 | Validation and usage instructions |
| Feature-specific artifacts | 59 | Contracts, route/component descriptions, compatibility mappings, test matrices, evidence, reports, and performance JSON |

The current feature pointer [`.specify/feature.json`](../../.specify/feature.json), active Git branch,
and the `AGENTS.md` active-plan entry identify Feature 055. Its directory contains a spec, plan,
tasks, research, data model, quickstart, requirements, Order command contract, test matrix,
traceability record, and implementation evidence.

### 5.2 Spec Kit runtime

The checked-in Spec Kit version is `0.8.8.dev0`. Its workflow surface includes:

| Path | Responsibility |
|---|---|
| `.specify/memory/constitution.md` | Engineering constitution and Constitution Checks |
| `.specify/templates/` | Constitution, spec, plan, tasks, and checklist templates |
| `.specify/scripts/bash/` | Prerequisite checking, feature creation, and plan/task setup |
| `.specify/workflows/speckit/workflow.yml` | Specify → review → plan → review → tasks → implement workflow |
| `.specify/integrations/` | Generic, Codex, and Spec Kit installation manifests |
| `.specify/extensions/git/` | Git extension metadata, commands, and shell support |
| `.agents/commands/` | Generic command prompts for 14 Spec Kit/Git operations |
| `.agents/skills/` | Agent skills implementing the same 14 operations |
| `.claude/commands/` | Claude command variants |
| `.claude/skills/` | Claude development workflows including testing, debugging, review, planning, and UI/UX |
| `.codex/skills/ui-ux-pro-max/` | UI/UX design intelligence skill, data, scripts, and templates |

The workflow registry describes a full SDD cycle with approval gates after specification and plan.
Git extension hooks are configured around Spec Kit operations; this discovery did not invoke them.

## 6. Monorepo and configuration model

### 6.1 Workspace organization

The root [workspace file](../../pnpm-workspace.yaml) includes exactly:

```yaml
apps/*
packages/*
```

The root manifest declares `pnpm@9.15.9`. A root lockfile and three app-local lockfiles use pnpm
lockfile format `9.0`. Workspace packages are private, source-consumed packages at version `0.1.0`.
There is no package publication pipeline represented in the tracked configuration.

Turborepo orchestrates `dev`, `build`, `lint`, and `typecheck`:

- `dev` is uncached;
- `build` depends on upstream package builds and records `.next/**` outputs;
- `lint` and `typecheck` depend on upstream tasks; and
- typecheck declares no output artifacts.

### 6.2 TypeScript hierarchy

Each application has a colocated strict TypeScript configuration:

- target `ES2017`;
- DOM, DOM iterable, and latest ECMAScript libraries;
- `strict`, `noEmit`, `isolatedModules`, and bundler module resolution;
- React JSX transform and the Next.js TypeScript plugin; and
- incremental compilation.

Core and Commerce map `@/*` to their application roots. Landing maps `@/*` to `src/*`. Package
TypeScript configurations use strict, no-emit source checking and reference workspace source types
through package names.

Vitest adds test-time aliases for the SDK root, SDK testing entry point, Contracts root, and the
Commerce `@` alias. The architecture scanner resolves relative paths, app aliases, and public
`@nexoraxs/*` package export-map entries independently of TypeScript.

### 6.3 Styling and asset organization

All applications use Tailwind CSS 4 through the `@tailwindcss/postcss` plugin. Each app owns its
global stylesheet and static `public/` assets. The UI package adds shared CSS tokens and three
named theme entry points:

- `nexoraxs-theme.css`;
- `core-theme.css`; and
- `commerce-theme.css`.

Branding assets exist both in application `public/branding/` folders and the UI package branding
module. Landing also contains SEO/runtime assets such as `robots.txt`, `sitemap.xml`, and icons.

## 7. Application inventory

### 7.1 Application summary

| Application | Files | Runtime | Port | Logical owner | Direct workspace dependencies |
|---|---:|---|---:|---|---|
| `apps/landing` | 36 | Next.js/React marketing site | 3000 | Marketing experience | None |
| `apps/core-platform` | 90 | Next.js/React Core frontend | 3001 | Core Platform frontend | Types, Contracts, SDK, Shared, UI |
| `apps/commerce` | 204 | Next.js/React Commerce frontend | 3002 | Commerce OS frontend | Types, Contracts, SDK, Shared, UI |

All three apps have their own `package.json`, lockfile, Next config, strict TypeScript config,
PostCSS config, ESLint config, `.gitignore`, and README. Landing and Core READMEs contain Create
Next App bootstrap guidance. The app manifests define development ports `3000`, `3001`, and `3002`.
The Commerce README describes the current repository-backed mock boundary and validation commands.

### 7.2 Landing application

**Purpose and owner.** Landing is the public marketing experience. Its only page composes the
platform story, product capabilities, product applications, plans, questions, calls to action, and
footer. It is logically owned by the marketing/presentation surface and does not own platform or
Commerce state.

**Public surface.** `/` on port `3000`. Calls to action navigate to Core `/login` using
`NEXT_PUBLIC_CORE_PLATFORM_URL`, defaulting to `http://localhost:3001`.

| Module | Responsibility | Internal dependencies | External dependencies | Consumer |
|---|---|---|---|---|
| `src/app` | Root layout, SEO metadata, global CSS, favicon assets, and page composition | Section modules | Next.js, React | Browser route `/` |
| `sections/navbar` | Navigation and Core login entry | Core URL configuration | React | Landing page |
| `sections/hero` | Hero content, Core illustration, and splash experience | Animation helper | Framer Motion, Lucide, React | Landing page |
| `sections/features` | Capability/value presentation | Local content | Lucide, React | Landing page |
| `sections/platform` | Platform explanation | Local content | React | Landing page |
| `sections/apps` | Operating-system/product presentation | Local content | Lucide, React | Landing page |
| `sections/pricing` | Plan presentation and Core entry action | Core URL configuration | React | Landing page |
| `sections/faq` | Frequently asked questions | Local state/content | React | Landing page |
| `sections/cta` | Final Core login call to action | Core URL configuration | React | Landing page |
| `sections/footer` | Footer and contact/navigation content | Local content | React | Landing page |
| `src/lib/animations.ts` | Shared Landing motion variants/settings | None | Framer Motion types | Animated sections |
| `public/` | Search-engine, framework, branding, and static assets | None | Browser/Next static serving | Landing pages and crawlers |

Landing has no repository, shared-package, browser-database, or service/API dependency in the
current source.

### 7.3 Core Platform application

**Purpose and owner.** Core provides the current frontend experience for mock authentication,
Workspace onboarding, platform shell, dashboard, Product Hub, subscription/billing views,
integrations, settings, team management, and Commerce launch/context composition. The logical
implementation owner is Core Platform.

**Public route surface.** The application contains 15 page files:

| Route | Current responsibility |
|---|---|
| `/` | Entry redirect |
| `/login` | Sign-in form and demo-session entry |
| `/register` | Account registration form |
| `/forgot-password` | Password-recovery request experience |
| `/reset-password` | Password reset experience |
| `/verify-email` | Email verification experience |
| `/verify` | Alias/re-export of email verification |
| `/welcome` | Post-authentication welcome/routing experience |
| `/onboarding` | Workspace, Business Unit, Branch, locale, and plan onboarding flow |
| `/dashboard` | Core overview |
| `/dashboard/apps` | Product Hub/application access cards and Commerce launch |
| `/dashboard/billing` | Current plan, usage, and billing presentation |
| `/dashboard/integrations` | Integration catalog/status presentation |
| `/dashboard/settings` | Workspace/user preference presentation |
| `/dashboard/team` | Workspace-member presentation and invite interaction |

**Presentation modules.** Core owns 30 component files:

| Module | Files | Responsibility | Consumers |
|---|---:|---|---|
| `components/CoreProvider.tsx` | 1 | Root provider entry | Root layout |
| `components/auth/` | 4 | Auth shell, password input/strength, and social-auth controls | Auth routes |
| `components/dashboard/` | 10 | Top bar, user/notification menus, locale/theme controls, Branch context pill, guards, and enable/invite modals | Dashboard routes/shell |
| `components/onboarding/` | 6 | Phase/step navigation and language, Workspace, Business Unit, and Branch step forms | `/onboarding` |
| `components/shell/` | 5 | Core shell, context switcher, search, and state notice | Dashboard layout |
| `components/ui/` | 4 | App-local avatar, badge, brand mark, and toast | Core presentation |

**Core library modules.**

| Module | Responsibility | Internal/public dependency | Consumer |
|---|---|---|---|
| `lib/store/AppProvider.tsx` | Broad Core session/state facade; hydrates browser state; exposes auth, onboarding, Workspace/context, locale/theme, Commerce projection, and toast operations | Shared mock DB, Types, Core browser adapters, Core-Commerce integration | Routes and components through `useApp()` |
| `lib/core-session.ts` | Named Core session values for Workspace/Business Unit/Branch and onboarding | Core session adapter | Onboarding and provider |
| `lib/core-theme.ts` | Core theme compatibility helper | Core theme adapter | Provider/UI |
| `lib/locale.ts` | Locale support | Shared language type | Provider/UI |
| `lib/domain/core-organization-compatibility.ts` | Current organization compatibility mapping | Shared/types records | Core provider/onboarding |
| `lib/infrastructure/browser/core-session-storage.ts` | Session-storage access boundary | Browser `sessionStorage` | Core session/provider |
| `lib/infrastructure/browser/core-theme-storage.ts` | Theme read/write/application | Browser storage and document root | Core provider/theme UI |
| `lib/infrastructure/browser/core-locale-storage.ts` | Locale read/write/application and direction | Core session adapter and document root | Core provider/locale UI |
| `lib/shell/contracts.ts` | Core shell presentation-state shapes | Types only | Shell presentation/hook/components |
| `lib/shell/presentation.ts` | Pure shell projection functions | Shell contracts | `useShellPresentation` and tests |
| `lib/shell/useShellPresentation.ts` | Maps provider data into shell presentation view | Provider and pure presentation | Core shell |
| `lib/commerce/CommerceProjectionPort.ts` | Core-local re-export/type boundary for Commerce projection | Contracts | Core integration and shell/Product Hub |
| `lib/commerce/CommerceHandoffAdapter.ts` | Builds Commerce setup/launch URLs from current context | Contracts and Core URL helper | Product Hub/provider |
| `lib/commerce/createCoreCommerceIntegration.ts` | Core composition root for read-only Commerce projection and handoff adapter | Public SDK root and contracts | Core provider |
| `lib/commerce-url.ts` | Deprecated compatibility re-export of the explicit Commerce URL builders | `CommerceHandoffAdapter` | Existing handoff/navigation callers |

The app itself has no library export map. Its public interface is its HTTP page routes and the
navigation/handoff behavior presented by those routes. Other applications do not consume Core
source.

### 7.4 Commerce OS application

**Purpose and owner.** Commerce is the independent Commerce Operating System frontend. It owns the
current Commerce setup and operational user journeys for Products, Customers, Inventory, Orders,
POS, Invoices, Returns, transfers, reporting, media, and Commerce settings. The implementation is
the largest app and contains the primary feature-oriented layering in the repository.

**Public route surface.** Commerce contains 20 page files:

| Route | Current responsibility |
|---|---|
| `/` | Entry redirect |
| `/setup` | Commerce setup wizard and Core handoff acceptance |
| `/dashboard` | Commerce operational summary |
| `/products` | Product list |
| `/products/new` | Product/image creation form |
| `/customers` | Customer list and editor |
| `/customers/[id]` | Customer detail/history |
| `/inventory` | Branch inventory projection and adjustment interaction |
| `/inventory/transfers` | Branch stock-transfer interaction |
| `/orders` | Order list |
| `/orders/[id]` | Order detail |
| `/pos` | POS draft and checkout flow |
| `/pos/success` | Checkout success/last-order view |
| `/invoices` | Invoice list |
| `/invoices/[id]` | Invoice detail |
| `/invoices/[id]/document` | Printable invoice document |
| `/returns/[id]/document` | Printable return document |
| `/reports` | Branch-aware sales/return report presentation |
| `/settings` | Commerce settings |
| `/settings/documents` | Receipt/invoice document configuration |

The `(commerce)` route group has its own layout/guard behavior. `/setup` has a separate layout.
The app root layout installs Commerce providers and shared/local theme styles.

**Feature modules.** The feature folders are the primary logical Commerce modules. Counts include
production, test, hooks, i18n, and adapter files tracked under each folder.

| Feature module | Files | Logical owner | Responsibility | Public/application-facing surface | Consumers |
|---|---:|---|---|---|---|
| `customers` | 9 | Commerce Customers | Customer list/detail/edit, localized UI state, customer history composition | `LegacyCustomerHistoryService`, customer hooks, feature barrel | Customer routes, POS customer selection, application composition |
| `documents` | 1 | Commerce Documents | Invoice/receipt/return totals and address formatting helpers | Pure calculation/address functions | Invoice, return, document routes |
| `inventory` | 15 | Commerce Inventory | Inventory reads/projections, adjustments, and Order inventory effects | Projection, adjustment, and Order-inventory-effect services; hooks/policy | Inventory routes, dashboard, POS/Order workflow |
| `invoices` | 11 | Commerce Invoices | Invoice reads, view composition, creation, localization, and retained-write bridge | Creation/view services, hooks, compatibility policy | Invoice routes, POS checkout, reporting |
| `media` | 2 | Commerce Product media | Product image processing/storage coordination | `LegacyProductMediaService` | Product editor/provider |
| `orders` | 16 | Commerce Orders | Order reads/views, numbering, creation command, return handoff, localization | Creation, number, view, return-handoff services and hooks | Order routes, POS, Returns, reporting |
| `pos` | 12 | Commerce POS | POS draft state, commercial snapshot, checkout orchestration, last-order view | Draft and checkout services/hooks | POS routes |
| `products` | 18 | Commerce Products | Product queries/mutations, editor coordination, media bridge, localization | Product hooks, editor service, feature barrel | Product routes, Inventory/POS projections |
| `reporting` | 1 | Commerce Reporting | Current sales/return aggregation calculations | Pure reporting functions | Reports/dashboard |
| `repository-expansion` | 23 | Commerce compatibility integration | Cache change notifications, optional relationship behavior, characterization and boundary tests | Change port adapter and optional-relation helper | Multiple feature services and architecture tests |
| `returns` | 4 | Commerce Returns | Return validation/calculation/creation and Order compatibility handoff | Return creation service and policy | Return document/operational provider |
| `setup` | 6 | Commerce Setup | Setup read/save, default/preset behavior, demo bootstrap data | Setup and demo-bootstrap services | `/setup`, provider, application composition |
| `transfers` | 3 | Commerce Inventory transfers | Stock-transfer validation and creation | Transfer service and policy | Inventory transfer route/provider |

**Application service inventory.** The following application modules contain the main use-case
coordination and domain-compatible calculations. Their dependencies point inward to contracts,
types, pure policy modules, and injected ports; the Commerce composition root supplies concrete
adapters.

| Service/module | Outcome produced |
|---|---|
| `LegacyCustomerHistoryService` | Combines scoped Customer and Order reads into customer history |
| `legacy-commerce-documents` | Calculates document totals and resolves Business/Branch addresses |
| `LegacyInventoryProjectionService` | Joins Product and Inventory read models for display |
| `LegacyOrderInventoryEffectService` | Prepares and commits Inventory effects for an Order sale |
| `LegacyStockAdjustmentService` | Validates and records stock adjustments |
| `legacy-inventory-policy` | Current pure Inventory compatibility rules |
| `LegacyInvoiceCreationService` | Creates an Invoice through the injected write boundary and notifies readers |
| `LegacyInvoiceViewService` | Composes Invoice, Order, and Customer reads for list/detail/document views |
| `legacy-invoice-compatibility-policy` | Current pure Invoice compatibility rules |
| `LegacyProductMediaService` | Creates thumbnails, coordinates storage allocation, and associates media |
| `LegacyOrderCreationService` | Creates an Order through the Order command repository and coordinates Inventory effect/change publication |
| `LegacyOrderNumberService` | Derives the next compatible Order number from scoped Order command records |
| `LegacyOrderReturnHandoffService` | Applies the current return-related Order compatibility patch through the Order repository |
| `LegacyOrderViewService` | Composes Order, Customer, and Invoice read views |
| `legacy-order-compatibility-policy` | Current pure Order validation and record construction rules |
| `LegacyPosDraftService` | Owns POS draft commands and commercial snapshot use |
| `LegacyPosCheckoutService` | Coordinates Order creation, Invoice creation, command publication, and last-order state |
| `LegacyProductEditorService` | Coordinates Product repository mutation with Product-image persistence |
| `LegacyMediaCompatibilityPort` | Product feature-facing media association boundary |
| `legacy-commerce-reporting` | Calculates current Gross Sales, returns/refunds, and Net Sales projections |
| `CommerceChangeNotificationPort` | Application-facing change-notification abstraction/no-op implementation |
| `optionalCompatibilityRelation` | Encodes optional read-model relation behavior |
| `LegacyReturnCreationService` | Creates a return, optional restock effects, and Order handoff through injected ports |
| `legacy-return-compatibility-policy` | Current pure return totals and compatible record construction |
| `LegacyCommerceDemoBootstrapService` | Seeds the current scoped Commerce demo state |
| `LegacyCommerceSetupService` | Reads and saves current Commerce setup through the operations store |
| `legacy-commerce-setup-policy` | Current setup defaults, preset mapping, and virtual setup construction |
| `legacy-commerce-demo-seed` | Infrastructure-level demo records used by bootstrap |
| `LegacyStockTransferService` | Validates and records inter-Branch stock transfers |
| `legacy-transfer-policy` | Current transfer validation/calculation rules |

**Commerce composition and adapters.**

| Module | Responsibility | Depends on | Consumer |
|---|---|---|---|
| `CommerceServicesProvider` | Constructs one SDK runtime, Query Client, and application-service graph; exposes them through context | Public SDK root, React Query, application composition | Root provider stack and hooks |
| `createCommerceApplicationServices` | Wires feature services to SDK ports, deterministic helpers, cache notifications, browser adapters, and Core compatibility | Contracts, public SDK factories, Shared helpers, feature services | `CommerceServicesProvider` |
| `CommerceApplicationServices` | Type surface for the fully wired application service graph | Feature/contract types | Provider and consumers |
| `CommerceProviders` | Installs SDK/query services, broad AppProvider, and Product editor bridge | Runtime config, application services, AppProvider | Root layout |
| `commerce-runtime-config` | Sole allowed Commerce environment reader; selects mock/HTTP setting, base URL, and mock latency | `process.env` | Root provider composition |
| `ReactQueryCommerceChangeAdapter` | Maps committed scoped changes to exact React Query invalidation/update behavior | React Query | Mutating application services |
| `BrowserCanvasThumbnailAdapter` | Browser canvas implementation of thumbnail port | DOM/browser APIs | Product media service |
| `BrowserLegacyPosLastOrderAdapter` | Browser storage implementation of last-Order port | Shared storage helper | POS checkout/success |
| `LegacyDocumentSnapshotAdapter` | Builds the current POS commercial snapshot from compatible records | Types/current state | POS draft service |
| `LegacyCommandPublicationHub` | In-process command-result publication/subscription | Contract event-like port | POS checkout/provider |
| `lib/store/AppProvider.tsx` | Broad compatibility facade for session, context, setup, operational collections, media, returns, storage, and UI state; delegates characterized operations to services | Shared mock DB, Types, application services, contracts | Routes/components through `useApp()` |

Commerce’s app-local public interface is its routes and context/hooks; no other application imports
these modules. Contracts and SDK implementations are consumed through package entry points.

## 8. Package inventory

### 8.1 Package summary and direction

| Package | Files | Public entry points | Direct internal dependency | Logical responsibility |
|---|---:|---|---|---|
| `@nexoraxs/types` | 5 | Source root | None | Current shared frontend record types |
| `@nexoraxs/contracts` | 49 | Root, seven Commerce subpaths, Core subpath | Types | Technology/storage/framework-independent compatibility contracts |
| `@nexoraxs/sdk` | 77 | Root and `./testing` | Contracts, Types | Concrete frontend repositories, stores, adapters, serialization, diagnostics, and composition |
| `@nexoraxs/shared` | 10 | Source root | Types | Existing shared mock DB, storage, catalog, i18n, formatting, seed, and helper surface |
| `@nexoraxs/ui` | 16 | Root and three CSS theme subpaths | React/React DOM peers | Reusable presentation and brand assets |

These are the only tracked workspace package directories. There is no `packages/auth` directory in
this snapshot; authentication-compatible behavior is currently located in the Core app, Shared
helpers/state, Types, and SDK/Core compatibility modules described above.

### 8.2 `@nexoraxs/types`

**Purpose.** Types is a record-shape package. It contains no runtime functions, package scripts,
external dependencies, persistence, or ownership logic.

**Public API.** `src/index.ts` re-exports the following current frontend types:

| Area | Exported records/types | Consumers |
|---|---|---|
| Core | `User`, `Workspace`, `BusinessUnit`, `Branch`, `OSSubscription`, `OSEnablement`, `WorkspaceMember`, `TeamMember`, `WorkspaceStorageUsage`, `MediaAsset`, `MediaOwnerType` | Core, Commerce compatibility state, Contracts, SDK, Shared |
| Commerce | `OrderItem`, `CommerceSetup`, `CommerceProfile`, `CommerceProduct`, `CommerceOrder`, `CommerceInvoice`, `CommerceCustomer`, `BranchInventory`, `StockMovement`, `StockMovementReason`, `StockTransfer`, `CommerceReturn`, `CommerceReturnItem`, `RefundMethod` | Commerce app/services, Contracts, SDK, Shared |

The package is the leaf of the internal manifest dependency chain. Type declarations do not
themselves persist or write state.

### 8.3 `@nexoraxs/contracts`

**Purpose.** Contracts defines frontend-internal compatibility records, ports, commands, queries,
results, and errors without React, browser globals, storage implementations, environment reads, or
transport code. Its own README and root comment explicitly identify the current Commerce shapes as
frontend compatibility contracts rather than a platform/HTTP API.

**Public exports.** The package export map exposes:

```text
@nexoraxs/contracts
@nexoraxs/contracts/commerce/products
@nexoraxs/contracts/commerce/common
@nexoraxs/contracts/commerce/customers
@nexoraxs/contracts/commerce/inventory
@nexoraxs/contracts/commerce/orders
@nexoraxs/contracts/commerce/invoices
@nexoraxs/contracts/commerce/operations
@nexoraxs/contracts/core
```

The root also re-exports Commerce POS contracts, although POS does not have a separately declared
package export-map subpath.

| Contract module | Responsibility/public concepts | Implementers | Consumers |
|---|---|---|---|
| `commerce/common` | Legacy Business Unit/Branch scopes, list/error shapes, command context, Commerce projection/handoff, change notification, compatibility facades, media/thumbnail/association ports | SDK integration/facades; Commerce adapters | Core integration; Commerce services/hooks |
| `commerce/products` | Product record/scope, list/create/update/remove shapes, repository, field/error model | SDK Product repositories/stores | Commerce Product hooks/editor/provider |
| `commerce/customers` | Customer record, create/update commands, errors, list/get/create/update repository | SDK Customer repositories/facade | Customer hooks/history/provider/POS |
| `commerce/inventory` | Branch inventory compatibility record, read repository, Product snapshot and Inventory persistence/effect ports | SDK Inventory repository and gateway; Commerce effect service | Inventory hooks/services, Order creation |
| `commerce/orders` | Order/item record, list/get repository, write repository/store, number port, return handoff, write errors | SDK read repository and local Order command repository; Commerce services | Orders, POS, Returns, Inventory effects |
| `commerce/invoices` | Invoice compatibility record and list/get repository | SDK Invoice repositories | Invoice hooks/views and reporting |
| `commerce/operations` | Inventory adjustment, transfer, Order/Invoice/Return/setup commands, storage coordination, broad compatibility operations store, deterministic dependencies | SDK browser/memory operations stores and adapters; Commerce services | Commerce setup and retained operational write slices |
| `commerce/pos` | Commercial snapshot, last-Order, draft commands/service, checkout result, and publication contracts | Commerce POS services/browser adapters | POS hooks/routes/provider |
| `core` | Legacy Core platform store, deterministic dependencies, and compatibility port | SDK Core browser store/adapter | Core and Commerce composition |

Contracts depends only on Types. The architecture scanner enforces that contract code does not
depend outward on SDK, UI, React, Next.js, React Query, or browser APIs.

### 8.4 `@nexoraxs/sdk`

**Purpose.** SDK owns concrete frontend infrastructure behind contract ports: mock repositories,
browser and memory stores, compatible serialization, deterministic behavior/failure controls,
diagnostics, integration adapters, and runtime composition.

**Production public API.** The root exports only:

- `createCommerceServices`;
- `createCommerceProjectionPort`;
- `createCoreStorageCoordination`;
- `createCorePlatformCompatibility`;
- `CommerceRuntimeConfig`; and
- `CommerceServices`.

**Testing public API.** `@nexoraxs/sdk/testing` exposes concrete mock/memory/browser test helpers.
All other SDK source paths are private according to the package export map and architecture policy.

| SDK module | Files | Responsibility | Contract implemented | Production consumer |
|---|---:|---|---|---|
| `commerce/runtime` | 1 | Validates runtime selection and constructs the full repository/adapter graph | `CommerceServices` surface | Commerce and Core composition factories |
| `commerce/common` | 4 | Deterministic latency/failure/diagnostic behavior and scope normalization | Common error/scope contracts | All mock repositories |
| `commerce/products` | 18 | Browser/memory/mock stores, Product repository, compatibility facade, behavior, and serialization | Product repository and compatibility port | Commerce Product slice through root composition |
| `commerce/customers` | 10 | Browser/memory-compatible stores, Customer repository/facade, behavior, and serialization | Customer repository and compatibility port | Commerce Customer slice |
| `commerce/inventory` | 9 | Inventory stores/read repository and local Order-to-Inventory gateway | Inventory repository and sale effect persistence/snapshot ports | Inventory reads and Order creation |
| `commerce/orders` | 12 | Order read stores/repository, local Order command repository, behavior, and serialization | Order read/write/store ports | Orders, POS, Returns |
| `commerce/invoices` | 7 | Invoice stores/read repository and serialization | Invoice repository | Invoice views/hooks |
| `commerce/operations` | 3 | Browser and memory broad compatibility operations stores | Operations store | Setup, media, adjustments, transfers, Invoice/Return compatibility writes |
| `commerce/integration` | 6 | Browser integration store, Commerce handoff ingress, read-only projection, Core storage coordination | Handoff, projection, storage coordination ports | Core/Commerce composition |
| `core` | 2 | Browser Core platform store and compatibility adapter | Core compatibility port | Commerce application composition and Core state compatibility |
| `testing` | 1 | Curated concrete test exports | Test-only public surface | SDK/app/architecture tests |

`createCommerceServices` accepts `dataSource: "mock" | "http"`. `mock` constructs browser-backed
repositories and integration stores. `http` validates that an API base URL exists and then throws
the configured `http_unavailable` error; no checked-in HTTP transport or fetch client is created.

### 8.5 `@nexoraxs/shared`

**Purpose.** Shared currently re-exports one `mock-db` module. It is a non-owning compatibility
utility surface used by both Core and Commerce.

| File/module | Public API/responsibility | Consumers |
|---|---|---|
| `schema.ts` | Storage-key registry; `Lang`; English/Arabic dictionary and `t`; OS/plan/preset/onboarding/country/currency/timezone catalogs; display helpers | Core/Commerce UI, providers, SDK storage adapters |
| `storage.ts` | Guarded local/session storage primitives, collection/session serialization, clear/reset, POS last-Order helpers | Core/Commerce providers and SDK browser stores |
| `actions.ts` | ID, clock, email normalization, and display-name helpers | Composition and provider flows |
| `seed.ts` | Empty and demo browser DB structures | Core/Commerce demo/bootstrap flows |
| `selectors.ts` | Money/date/byte formatting and current OS/industry compatibility selectors | Core/Commerce presentation/provider flows |
| `index.ts` / `mock-db/index.ts` | Package and module barrels | All consumers |

Shared depends only on Types. The architecture scanner also carries explicit checks for selected
owner-specific Commerce policy symbols in Shared.

### 8.6 `@nexoraxs/ui`

**Purpose.** UI is a presentation-only React peer package.

**Public API.** The root exports:

- `Button` and button props/variant/size types;
- `Input` and input props;
- `Badge` and badge props/variant;
- `Card` and card props;
- `Icon` and icon props/name;
- `Logo` and logo props/app/size; and
- the branding barrel, including `NexoraLogo` and brand-asset metadata.

CSS theme files are public subpath exports. `tokens.css` is tracked source but is not a named
package export-map entry. Core and Commerce are the current package consumers. Landing uses its own
presentation components and does not import the UI package.

## 9. Current architecture and boundaries

### 9.1 Architecture style

The implementation combines several organizational styles:

1. **Monorepo application/package split.** Deployable experiences live in `apps/`; source-consumed
   reusable boundaries live in `packages/`.
2. **Application isolation.** Each app owns its routes, components, configuration, state facade,
   and static assets. Apps communicate through navigation and contracts rather than direct source
   imports.
3. **Feature-oriented Commerce modules.** Commerce groups application services, hooks, i18n,
   adapters, and tests by operational feature.
4. **Ports and adapters around current mock persistence.** Contract interfaces define repository
   and operation ports; SDK and browser modules implement them; composition roots inject those
   implementations into feature services.
5. **Provider-based compatibility state.** Core and Commerce each expose a broad React context
   facade for current session, UI, organization, onboarding/setup, and retained state.
6. **Client cache for repository-backed reads.** Commerce uses React Query in hooks and an outer
   change adapter; application services are kept independent of React Query by lint/scanner rules.
7. **Documentation/spec-driven workflow.** Architecture documents and Spec Kit artifacts are
   first-class repository surfaces alongside source.

This description is derived from folders, imports, composition, and runtime code only. It is not a
conformance assessment.

### 9.2 Layering and dependency direction

The newer Commerce slices follow this direction:

```text
routes/components
  -> hooks/provider facade
  -> application services and policies
  -> @nexoraxs/contracts ports + @nexoraxs/types records
  <- concrete implementations injected by app/SDK composition
  -> SDK adapters/repositories
  -> browser/memory stores
```

Concrete construction is allowlisted in four production composition modules:

- `packages/sdk/src/commerce/runtime/createCommerceServices.ts`;
- `apps/commerce/lib/commerce/createCommerceApplicationServices.ts`;
- `apps/commerce/lib/commerce/CommerceServicesProvider.tsx`; and
- `apps/core-platform/lib/commerce/createCoreCommerceIntegration.ts`.

Application modules are restricted from React, React Query, SDK implementations, hooks, query
keys, providers, and components. UI/hooks/providers are restricted from SDK infrastructure.
Repositories are restricted from presentation dependencies. Contracts are restricted from
outward framework/infrastructure dependencies.

### 9.3 Enforced boundaries

The repository-specific scanner parses static imports, re-exports, `require`, and dynamic imports,
resolves internal aliases/export maps, and evaluates both direct and transitive dependencies. Its
configured rule families cover:

- unresolved internal imports and unexported SDK subpaths;
- direct or transitive cross-application imports;
- application-to-framework/cache/SDK dependency direction;
- contract outward dependencies;
- repository-to-UI and UI-to-concrete-SDK access;
- browser storage and environment-read allowlists;
- concrete implementation construction outside composition roots;
- Core/Commerce write ownership patterns;
- owner-specific policy in Shared;
- business-rule construction in providers;
- Orders writing Inventory records;
- Returns/Core/providers writing Order records; and
- POS presentation orchestrating Order/Invoice persistence directly.

The discovery run returned `PASS (299 production files, 0 violations)` for those configured rules.

Browser storage is allowlisted in eight production files: the Shared storage primitive; SDK
Product, operations, integration, and Core stores; and three Core browser adapters. Commerce
environment access is allowlisted only in `commerce-runtime-config.ts`.

## 10. Dependency overview

### 10.1 Internal dependency relationships

| From | Depends on | Reason |
|---|---|---|
| Landing | No workspace package | Standalone marketing presentation |
| Core | Types | Current session, organization, subscription, storage, and Commerce record shapes |
| Core | Contracts | Commerce projection/handoff and Core compatibility ports |
| Core | SDK | Public projection and compatibility composition factories |
| Core | Shared | Mock DB state, catalogs, i18n, formatting, and storage compatibility |
| Core | UI | Shared presentation and themes |
| Commerce | Types | Current Core-context and Commerce operational records |
| Commerce | Contracts | Repository/use-case ports, commands, results, errors, and scopes |
| Commerce | SDK | Root runtime factory and contract-only service surface |
| Commerce | Shared | Current mock data, session/storage, catalogs, i18n, and helpers |
| Commerce | UI | Shared presentation and Commerce theme |
| SDK | Contracts | Interfaces implemented by repositories/stores/adapters |
| SDK | Types | Compatible stored/runtime record types |
| Contracts | Types | Shared record fields referenced by contracts |
| Shared | Types | Current stored collection and selector types |
| UI | React/React DOM peers | Component runtime only |

Across application, package, and architecture-test TypeScript imports, the scan found 133 Contracts
references, 53 Types references, 45 SDK references, 34 Shared references, and 4 UI references.
These counts are import occurrences, not weighted runtime coupling metrics.

### 10.2 External dependencies

| Dependency | Consumer | Current use |
|---|---|---|
| Next.js `16.2.6` | All apps | Routing, layouts, rendering, metadata, build/dev/start |
| React/React DOM `19.2.4` | All apps, UI peer | Component runtime and contexts/hooks |
| TanStack React Query `^5.101.2` | Commerce | Scoped repository reads/mutations and cache orchestration |
| Lucide React `^1.14.0` | All apps | Icons |
| Framer Motion `^12.38.0` | Landing | Marketing animation |
| Flag Icons `^7.5.0` | Core | Locale/country presentation |
| Tailwind CSS 4/PostCSS plugin | All apps | Styling build pipeline |
| ESLint 9/Next config | All apps | Lint and framework rules |
| TypeScript | Workspace/apps | Static typing and source parsing for architecture tooling |
| Vitest/Testing Library/jsdom | Root test tooling | Unit, component, contract, and architecture tests |
| Playwright/Axe | Root test tooling | Browser journeys and accessibility checks |
| Turborepo | Root | Workspace task orchestration/cache |

No `axios`, generated API client, GraphQL client, database client, ORM, queue client, PHP Composer
dependency, or server framework manifest exists in the tracked executable tree.

## 11. Communication and data flow

### 11.1 Cross-application communication

There are three current navigation relationships:

| Producer | Consumer | Mechanism | Payload/state |
|---|---|---|---|
| Landing | Core | Browser navigation to configured Core `/login` URL | No structured payload |
| Core | Commerce | Browser navigation to a Commerce setup/launch URL produced by `CommerceHandoffAdapter` | Compatible Workspace, Business Unit, Branch, subscription, actor, plan, and entry context where available |
| Commerce | Core | Browser navigation to Core dashboard/login/onboarding URLs from Commerce shell/guards | Route intent; active state remains in browser compatibility storage |

Core’s Commerce projection is built through `createCommerceProjectionPort`, which supplies
`LegacyCommerceProjectionAdapter` over `BrowserLegacyCommerceIntegrationStore`. It is a read
projection used by Core shell/Product Hub/billing presentation. The checked-in integration path
does not call an HTTP service.

### 11.2 Commerce read flow

Repository-backed read pages use this sequence:

1. A route renders a feature hook.
2. The hook obtains `CommerceApplicationServices` from `CommerceServicesProvider`.
3. The hook constructs a key including the current temporary compatible scope.
4. The application-facing service or repository port is called.
5. The SDK mock repository applies scope normalization, deterministic behavior, and serialization.
6. The browser store reads the appropriate local collection.
7. React Query stores the result and the page maps it to loading, error, empty, unauthorized, or
   ready presentation as applicable.

Products and Customers expose repository mutation paths. Inventory, Orders, and Invoices expose
read repositories; retained operational writes are coordinated through feature services and the
operations/Order command stores.

### 11.3 Commerce command flow

The current POS checkout flow is the clearest vertical command path:

```text
POS page/hook
  -> LegacyPosDraftService
  -> LegacyPosCheckoutService
      -> LegacyOrderCreationService
          -> LegacyOrderCommandRepository
          -> LegacyOrderInventoryEffectService
      -> LegacyInvoiceCreationService
      -> LegacyCommandPublicationHub
      -> LegacyPosLastOrderPort
  -> scoped cache/provider refresh
```

Stock adjustment, transfer, setup, media, Return, and other retained command paths similarly call
application services, which use injected stores/ports and publish compatible change information.

### 11.4 Core state flow

Core routes and components call the Core `useApp()` facade. On browser hydration, the provider
loads or seeds compatible user, Workspace, Business Unit, Branch, subscription, enablement,
onboarding, locale, theme, and Commerce projection state. Auth/onboarding/context actions delegate
to Core-compatible helpers/adapters and update provider state. Product Hub Commerce launch delegates
to the handoff adapter.

### 11.5 Storage model

The shared storage-key registry groups current state into:

- session selection: current user, Workspace, OS subscription, Business Unit, Branch, OS,
  onboarding, entry point, locale, demo flag, and POS last Order;
- local compatible collections: users, Workspaces, Branches, subscriptions, enablements, Business
  Units, Commerce setups, team members, Products, Orders, Customers, Invoices, Inventory,
  movements, transfers, Returns, media, and Workspace storage usage; and
- UI preference: theme.

`BrowserStorageCommerceStore` is the repository store for Products and compatible
Customer/Inventory/Order/Invoice collections. `BrowserLegacyCommerceOperationsStore` serves the
broader current operational command surface. `LocalOrderCommandRepository` isolates current Order
record writes. The integration and Core browser stores provide projection/handoff and Core
compatibility behavior. Memory stores support deterministic tests.

No checked-in database schema, server persistence, message broker, server event bus, or external
API data flow is active in this snapshot.

## 12. Testing infrastructure

### 12.1 Test surface counts

| Surface | Test files | Supporting fixture files | Purpose |
|---|---:|---:|---|
| Commerce colocated Vitest | 73 | Commerce `__fixtures__` and inline factories | Application services, hooks, providers, storage, characterization, localization/accessibility state, and boundaries |
| Core colocated Vitest | 5 | Inline factories | Shell projection, provider/storage characterization, and ownership boundaries |
| SDK colocated Vitest | 27 | Memory/browser stores and deterministic options | Repository parity, serialization, scope isolation, failures, composition, and integration contracts |
| Root architecture Vitest | 4 | 39 fixture files | Source inventory, boundary diagnostics, SDK exports, and runtime substitution |
| Playwright E2E | 19 | 4 fixture modules | Core shell/performance/handoff and Commerce Features 044/052/053/054/055 journeys |

Vitest discovers colocated `*.test.ts(x)` files under apps/packages and the root architecture tests.
Architecture fixture directories are excluded as direct test files. It runs in Node by default;
individual component tests request jsdom as needed.

### 12.2 Architecture test modules

| File | Responsibility |
|---|---|
| `frontend-boundaries.test.ts` | Exercises valid and invalid rule fixtures and the real production tree |
| `source-inventory.test.ts` | Verifies deterministic source discovery/exclusions |
| `sdk-exports.test.ts` | Verifies curated root/testing exports and private subpaths |
| `sdk-runtime-substitution.test.ts` | Verifies runtime substitution through public contract surfaces |

Invalid fixtures cover infrastructure, layer, ownership, and Order-command boundaries. Valid
fixtures demonstrate accepted inward-layer, composition-root, projection, adapter, app-alias,
Order command, and SDK-testing patterns.

### 12.3 Browser test configuration

The default [Playwright configuration](../../playwright.config.ts):

- searches `tests/e2e`;
- starts/reuses Commerce on `http://localhost:3002`;
- runs Desktop Chrome;
- is non-parallel;
- runs visibly with two-second action slowdown for manual review;
- retries twice and uses one worker when `CI` is set; and
- retains first-retry traces and failure screenshots.

The [Core configuration](../../playwright.core.config.ts):

- matches `core-050-*.spec.ts`;
- uses a prebuilt Core `next start` server on `127.0.0.1:3001`;
- is headless, single-worker, no-retry, and forbids focused tests;
- retains failure video/screenshots and retry traces; and
- writes Core-specific report/result folders.

E2E filenames show coverage for branch/inventory/POS/transfer/return journeys, Product repository
behavior and accessibility, repository expansion/read models/localization, architecture
characterization, Order commands, and Core shell/performance/Commerce handoff behavior.

### 12.4 Validation scripts

`scripts/validate-commerce-052-determinism.sh` executes a selected set of Commerce/SDK/architecture
tests 20 times with the dot reporter. The static architecture wrapper inventories production
sources and exits non-zero when diagnostics exist.

The full lint, typecheck, unit, build, and E2E suites were not run for this discovery because this
phase inventories structure rather than validating implementation correctness. The static
architecture command was run to record the configured production source count and rule result.

## 13. Development workflow

### 13.1 Root commands

| Command | Action |
|---|---|
| `pnpm dev` | `turbo run dev` for workspace projects with dev scripts |
| `pnpm build` | `turbo run build` with upstream build dependencies |
| `pnpm lint` | Runs architecture check, then workspace lint tasks |
| `pnpm typecheck` | Runs workspace typecheck tasks |
| `pnpm architecture:check` | Runs the custom frontend source/boundary scanner |
| `pnpm quality` | Lint → typecheck → unit test → build |
| `pnpm test:unit` | Runs Vitest once |
| `pnpm test:unit:watch` | Runs Vitest watch mode |
| `pnpm test:e2e` | Runs default Playwright suite |
| `pnpm test:e2e:ui` | Opens Playwright UI |
| `pnpm test:e2e:headed` | Runs Playwright headed |
| `pnpm test:e2e:slow` | Runs the default headed/slow configuration |
| `pnpm test:e2e:debug` | Runs Playwright headed; `PWDEBUG=1` is documented for inspector mode |

App scripts provide `dev`, `build`, `start`, and `lint`; Core and Commerce also expose explicit
`typecheck`. Contracts, SDK, and Shared map lint/typecheck to `tsc --noEmit`. Types and UI have no
package scripts, so Turborepo only runs tasks they declare.

### 13.2 Linting and formatting

All apps use ESLint 9 flat configuration with Next Core Web Vitals and TypeScript rules. Core and
Commerce add import-boundary rules. Commerce adds separate restrictions for UI/hooks/providers and
application modules. `--max-warnings=0` is used by Core and Commerce.

No tracked Prettier configuration or root formatting command was found. Formatting behavior is
therefore not defined by a repository-wide formatter manifest in the current tree.

### 13.3 CI/CD and delivery configuration

The root scripts are CI-usable and Playwright changes behavior when `CI` is set. However, no
tracked `.github/` directory, GitHub Actions workflow, alternative CI provider manifest, deployment
pipeline, container definition, or hosting configuration was found. Consequently the repository
defines quality commands but does not provide checked-in evidence of which external automation
runs them or how artifacts are deployed.

## 14. Infrastructure and services inventory

### 14.1 Checked-in executable services

There are no checked-in backend/API service applications. Searches found no Next.js `route.ts`
handlers, server actions, PHP files, `composer.json`, backend framework manifest, ORM schema,
database migration, queue worker, scheduled job, or serverless function.

The separately runnable processes represented by source are:

| Process | Command | Port | State dependency |
|---|---|---:|---|
| Landing Next.js app | `pnpm --filter landing dev` | 3000 | Static/configured frontend content |
| Core Next.js app | `pnpm --filter core-platform dev` | 3001 | Browser mock/session storage |
| Commerce Next.js app | `pnpm --filter commerce dev` | 3002 | Browser mock storage and React Query |

These Next.js apps can render on the framework server, but their checked-in domain data operations
are client/browser implementations.

### 14.2 Infrastructure configuration

No tracked `infra/`, Dockerfile, Compose file, Kubernetes manifest, Terraform/Pulumi/CDK source,
reverse-proxy configuration, PostgreSQL configuration, Redis configuration, secret-store
integration, monitoring configuration, or deployment descriptor exists in the current tree.

Production hosting, backend deployment, database topology, cache topology, networking,
authorization enforcement, audit persistence, logs, metrics, traces, backups, disaster recovery,
and secret management therefore cannot be inventoried from this repository snapshot.

## 15. Known implementation boundaries

These boundaries are directly visible in current source/configuration:

| Boundary | Current implementation evidence |
|---|---|
| Application boundary | Cross-app imports are rejected; apps navigate by URL and use shared packages/contracts |
| Core/Commerce boundary | Core uses a Commerce projection port and URL handoff; Commerce owns operational UI/services |
| Presentation/application boundary | Commerce application modules are linted/scanned against React, React Query, SDK, hooks, and provider imports |
| Contract/adapter boundary | Contracts contain interfaces and compatible records; SDK contains implementations and serialization |
| SDK public/private boundary | Only root and `./testing` are exported; production code is scanned for private/testing imports |
| Storage boundary | Browser access is allowlisted to named adapters/stores; memory implementations support tests |
| Environment boundary | Commerce runtime config is the sole allowed Commerce environment reader; Landing owns its Core URL reads |
| Cache boundary | React Query exists in hooks/outer adapters, not application services |
| Composition boundary | Concrete implementations are constructed in four allowlisted composition modules |
| Package boundary | Contracts → Types; SDK → Contracts/Types; Shared → Types; UI → React peers |
| Documentation/runtime boundary | Production source discovery is limited to apps/packages; runtime imports do not consume archives/docs |

## 16. Current strengths

“Strength” here means a present, observable repository capability, not a recommendation or approval
judgment.

- Application and workspace-package locations are explicit and consistently manifested.
- Core and Commerce have distinct runtime ports, route trees, components, and state/composition
  roots.
- Workspace package direction is acyclic at the manifest level.
- Package export maps distinguish public SDK/contract surfaces from private implementation files.
- Commerce feature folders colocate use cases, hooks, localization, adapters, and tests by
  operational concern.
- Newer Commerce flows expose contract ports and inject browser/memory implementations through
  composition roots.
- TypeScript strict/no-emit checking is configured across applications and source packages.
- ESLint and the AST-based repository scanner encode multiple dependency and ownership boundaries.
- Browser and memory repositories have contract, failure, serialization, and scope-isolation tests.
- The test tree spans unit, component, contract, architecture, browser journey, localization,
  accessibility, and performance-characterization surfaces.
- Arabic/English and direction state are represented in shared data, app providers, presentation,
  and tests.
- Documentation, specifications, plans, tasks, and implementation evidence are stored alongside
  source and are addressable by numbered milestones/features.
- The active feature is explicitly selected in Git, `AGENTS.md`, and `.specify/feature.json`.

## 17. Current observations

The following statements describe the snapshot without evaluating it against the architecture
documents:

1. The executable system represented here is frontend-only and browser-persistent.
2. Landing is structurally independent from workspace packages; Core and Commerce consume all five
   shared packages.
3. Commerce contains 204 tracked files and 73 colocated test files, making it the largest current
   executable application surface.
4. The Commerce repository/application-service path coexists with broad Core and Commerce
   `AppProvider` compatibility facades.
5. Current contracts, records, stores, and service names intentionally retain many `Legacy*`
   identifiers, and package READMEs describe them as frontend-internal compatibility surfaces.
6. The SDK has a runtime data-source selection point, but only the mock implementation is
   executable.
7. Core/Commerce integration is implemented through navigation, compatible browser state, handoff
   ingress, and read projections rather than a checked-in network transport.
8. Browser storage keys cover identity/session, organization, commercial, setup, and operational
   collections for the current mock journey.
9. The repository includes four pnpm lockfiles: one root lockfile and one within each app.
10. Build and test outputs are present locally but ignored and untracked.
11. Documentation and feature specifications account for 695 of 1,469 tracked files.
12. Historical prototypes and generated design data are retained under archives and agent skill
    directories but are not part of production source discovery.
13. No repository-wide formatter or checked-in CI/CD/deployment system is represented.
14. No backend, database, cache, queue, API gateway, or infrastructure implementation can be
    traced from the current tracked code.

## 18. Evidence index

Key evidence used to establish this inventory includes:

- [Repository operating instructions](../../AGENTS.md)
- [Root package manifest](../../package.json)
- [pnpm workspace](../../pnpm-workspace.yaml)
- [Turborepo configuration](../../turbo.json)
- [Vitest configuration](../../vitest.config.ts)
- [Commerce Playwright configuration](../../playwright.config.ts)
- [Core Playwright configuration](../../playwright.core.config.ts)
- [Testing notes](../../TESTING.md)
- [Landing app](../../apps/landing)
- [Core app](../../apps/core-platform)
- [Commerce app and README](../../apps/commerce/README.md)
- [Types public API](../../packages/types/src/index.ts)
- [Contracts manifest and public API](../../packages/contracts/package.json)
- [Contracts README](../../packages/contracts/README.md)
- [SDK manifest and public API](../../packages/sdk/package.json)
- [SDK README](../../packages/sdk/README.md)
- [SDK runtime composition](../../packages/sdk/src/commerce/runtime/createCommerceServices.ts)
- [Shared public API](../../packages/shared/src/mock-db/index.ts)
- [Shared README](../../packages/shared/README.md)
- [UI public API](../../packages/ui/src/index.ts)
- [Commerce application composition](../../apps/commerce/lib/commerce/createCommerceApplicationServices.ts)
- [Commerce provider composition](../../apps/commerce/lib/commerce/CommerceServicesProvider.tsx)
- [Core-Commerce integration composition](../../apps/core-platform/lib/commerce/createCoreCommerceIntegration.ts)
- [Frontend boundary policy](../../scripts/architecture/frontend-boundary-policy.mjs)
- [Frontend boundary analyzer](../../scripts/architecture/frontend-boundaries.mjs)
- [Production source inventory](../../scripts/architecture/source-inventory.mjs)
- [Spec Kit constitution](../../.specify/memory/constitution.md)
- [Active Feature 055 plan](../../specs/055-commerce-order-command-boundary/plan.md)

## 19. Confidence and information not determinable from this snapshot

### High-confidence inventory

The following are directly established by tracked source and configuration:

- repository and workspace structure;
- all app routes and development ports;
- application and feature responsibilities;
- package public APIs and manifest dependency direction;
- current composition roots, ports, adapters, repositories, and browser stores;
- active browser data flow and cross-app navigation/handoff path;
- build, lint, typecheck, unit, architecture, and E2E configuration;
- documentation/specification folder counts and subjects; and
- current static architecture scan scope/result.

### Additional evidence required

The following cannot be determined with confidence because no corresponding implementation or
configuration is checked in:

- production backend service topology or API contracts;
- server-side authentication/authorization and tenant enforcement;
- production database schemas, ownership, migrations, and retention;
- Redis/cache, messaging, event-delivery, or background-job behavior;
- production deployment targets and network topology;
- CI/CD provider and required branch/merge gates;
- runtime secrets and configuration management;
- production audit, logging, metrics, tracing, alerting, health, backup, and recovery systems;
- live third-party integration protocols; and
- whether local generated test/build outputs correspond to the current commit without rerunning
  their producing commands.

This concludes repository discovery. Architecture reconciliation, gap analysis, recommendations,
and migration planning are outside this report’s scope.
