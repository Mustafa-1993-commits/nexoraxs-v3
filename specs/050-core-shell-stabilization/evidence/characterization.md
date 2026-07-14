# Feature 050 Characterization and Compatibility Evidence

**Feature**: `050-core-shell-stabilization`  
**Evidence revision**: `phase0-r1`  
**Prepared**: 2026-07-14  
**Source revision**: `636952f7ccb49d9c697b8cbbf0250ccbcf2c93b0`  
**Approved direction**: DP-050-01 Proposal A — Conservative Stabilization

This is the single Feature 050 characterization record. Phase 0 creates it and later phases append
dated evidence without recreating or replacing the approved compatibility maps. It is subordinate
to the Architecture Freeze, Accepted ADRs, Constitution, `AGENTS.md`, and the approved feature
artifacts.

## Phase 0 — Current Implementation Reconciliation

### A000 — Component Compatibility Map

Source verification covered the active dashboard shell, the separate authentication/onboarding
shells, current and deprecated shell helpers, and the shared presentation primitives available to
Core. `rg` consumer scans found no standalone sidebar/navigation component and no existing
functional shell-search or persistent shell-state component.

| Component or surface | Current owner/consumer and behavior | Classification | Feature 050 treatment and compatibility constraint |
|---|---|---|---|
| `components/shell/CoreShell.tsx` | Core; dashboard layout supplies all dashboard children through it. Defines the five preserved sidebar destinations and localized labels. | Keep | Reuse as the navigation metadata owner. Preserve route order, labels, URLs, and composition. |
| `components/shell/Shell.tsx` | Core; consumed only by `CoreShell`. Owns the active topbar, inline sidebar/nav, compact drawer/scrim, main region, footer logout, and current control order. | Improve | Improve in place only in later approved phases. Do not replace, split, relocate, regroup, or duplicate it. |
| Inline sidebar/navigation in `Shell.tsx` | Core; no standalone sidebar or nav component exists. Renders current links and active visual class. | Improve | Keep inline. Later semantic/focus work must preserve the five-link order and current route matching. |
| Inline topbar/search placement in `Shell.tsx` | Core; current brand, burger, placeholder search, locale, theme, notifications, separator, and profile order. | Improve | Preserve location/order and visual baseline. Search remains unavailable during Phase A. |
| `components/shell/ContextSwitcher.tsx` | Core; active Core mode shows Workspace. Dormant Commerce mode reads legacy BusinessUnit/Branch and calls existing `setCurrent`. | Reconcile | Keep Workspace-only global Core presentation. Preserve the dormant compatibility branch without expanding, removing, or treating it as canonical architecture. |
| `components/dashboard/NotificationsDropdown.tsx` | Core shell UI; reads filtered `products`, `orders`, `COMMERCE_PLAN`, and `money` from `useApp`; displays plan, stock, and latest-order projections without writes. | Reconcile | Preserve bell, item ordering, indicator, empty outcome, and read-only behavior. A later app-local presentation seam may replace only raw presentation coupling. |
| `components/dashboard/UserMenuDropdown.tsx` | Core shell UI; routes to Settings, Billing, Team and signs out through the current facade. | Improve | Preserve exact outcomes and placement; later semantics/focus work stays in place. |
| `components/dashboard/LocaleToggle.tsx` | Core shell and Settings; reads/writes current `useApp.lang` through `setLang`. | Improve | Preserve `en`/`ar`, `nexoraxs.session.locale`, document effects, order, and current visual treatment. |
| `components/dashboard/ThemeToggle.tsx` | Core shell and Settings; toggles current `useApp.theme`. | Improve | Preserve `light`/`dark`, `nexoraxs.ui.theme`, placement, icon outcome, and visual baseline. |
| `app/dashboard/layout.tsx` inline hydration fallback | Core dashboard route group; enforces hydration, authentication, and onboarding redirects before `CoreShell`. | Improve | Characterize first. Preserve `/login` and `/onboarding` outcomes; later status presentation cannot become production authorization. |
| `components/shell/ShellSearch.tsx` | File/component absent. Current shell has only a placeholder input and no result behavior. | Missing | Creation is justified only for the later approved destination-only search task; not created in Phase 0/A and never a command palette. |
| `components/shell/ShellStateNotice.tsx` | File/component absent. Current dashboard layout has only an inline spinner and there is no persistent empty/error/unauthorized/recovery shell component. | Missing | Creation is justified only for later bounded presentation states; not created in Phase 0/A and never a backend or authorization model. |
| `components/ui/Toast.tsx` | Core root layout; current transient alert/live host for existing mock actions. | Keep | Reuse unchanged in Phase 0/A. It is not a replacement for later persistent recovery presentation. |
| `components/ui/Avatar.tsx` and `BrandMark.tsx` | Core profile/context identity presentation. | Keep | Reuse; do not duplicate avatar or brand-mark components. |
| `components/auth/AuthShell.tsx` plus password/social helpers | Separate Core authentication shell used by login/register/recovery/verification routes. | Keep | Characterize routing only. Feature 050 does not redesign or replace authentication surfaces. |
| `components/dashboard/BranchPill.tsx` | Imported only by the dormant `Shell mode="commerce"` branch; active Core mode does not render it. | Remove later | Preserve untouched. Do not add Branch to the global Core shell or remove the compatibility consumer in Feature 050. |
| `components/dashboard/Topbar.tsx` | Explicitly deprecated; consumer scan found no active import. Duplicates an older topbar model and mock Workspace copy. | Remove later | Do not revive, remove, or use as replacement evidence. |
| `components/dashboard/LanguageSwitcher.tsx` and `components/CoreProvider.tsx` | Deprecated locale/theme path using separate helpers; consumer scan found no active root usage. | Remove later | Preserve files and keys; do not consolidate or revive them. |
| `components/dashboard/DashboardOnboardingGuard.tsx` | Superseded guard using deprecated `core_onboarding_done`; consumer scan found no active usage. | Remove later | Preserve without reactivation; active dashboard layout remains authoritative implementation behavior. |
| `components/dashboard/EnableModal.tsx` | Unused legacy enable/activate modal at the unresolved `OSEnablement` boundary. | Remove later | Never revive, remove, or treat its copy/state as an approved lifecycle model. |
| `components/onboarding/OnboardingStepper.tsx` and old step components | Marked deprecated/superseded; current onboarding uses `PhaseStepper`. | Remove later | Preserve untouched; no onboarding rewrite. |
| `components/onboarding/PhaseStepper.tsx` | Active onboarding presentation consumed by `/onboarding`. | Keep | Outside shell stabilization; preserve current behavior and visuals. |
| `components/dashboard/InviteUserModal.tsx` | Active Team page modal; reads deprecated BusinessUnit/Branch display keys for compatibility. | Keep | Preserve current page-facing behavior and legacy labels/keys. No organization migration. |
| `packages/ui/src/styles/core-theme.css` | Shared presentation-only Core theme imported by Core globals; contains active shell classes and the 880px drawer breakpoint. | Improve | Phase A leaves it untouched. Later changes must remain scoped to `.nx-app-root`, preserve tokens/visuals, and be checked against other consumers. |
| `@nexoraxs/ui` `NexoraLogo` and branding | Shared presentation asset helper; active shell currently uses the same runtime logo asset directly. | Keep | Reuse only when parity is proven; no new logo or brand treatment. |
| `@nexoraxs/ui` `Icon` | Shared decorative icon primitive. Its current union does not include active `layout-grid` or `plug` names. | Keep | Do not widen or force it into the current shell merely to claim reuse; current app-local Lucide rendering remains compatible. |
| `@nexoraxs/ui` `Button`, `Input`, `Card`, `Badge`, `Logo` | Presentation primitives with existing consumers; APIs/legacy naming do not match every active shell need. | Keep | Preserve existing consumers. Do not duplicate or change them during Phase 0/A; native controls/current shell classes remain the bounded choice. |

#### A000 evidence and decision

- Active consumer scan: `CoreShell -> Shell`; dashboard layout consumes `CoreShell`; active Shell
  consumes `ContextSwitcher`, locale/theme, notifications, profile, and the dormant `BranchPill`.
- No component is authorized for replacement or removal by Feature 050.
- New-component evidence is limited to the absent `ShellSearch` and `ShellStateNotice`; neither is
  created in the requested implementation slice.
- Architecture boundary observed: current read-only notification UI projects Commerce-shaped mock
  values. It remains Legacy-compatible evidence and gains no write/ownership authority.
- Audit result: **COMPLETE — APPROVED IN THE 2026-07-14 PHASE 0 COMPATIBILITY GATE**.

### A002 — Route Compatibility Matrix

No route rewrites or configured aliases exist in `next.config.ts`. The sole source alias is
`/verify`, which re-exports the `/verify-email` page. Client redirects are compatibility behavior
implemented by the existing mock provider and page effects.

| Source route or transition | Current trigger/precondition | Current destination/outcome | Compatibility status | Forbidden Feature 050 change |
|---|---|---|---|---|
| `/` | Any request | Server redirect to `/login`. | Keep | Change entry URL or destination. |
| `/login` | Authenticated and onboarding complete | `router.replace("/dashboard/apps")`. | Legacy-compatible | Change landing destination or authentication model. |
| `/login` | Authenticated and onboarding incomplete | `router.replace("/onboarding")`. | Legacy-compatible | Change onboarding destination or infer missing organization data. |
| `/login` | Valid local credentials | `loginUser` updates the existing session; the authenticated effect selects the same existing destination. | Legacy-compatible | New backend/API/auth package or storage key. |
| `/login?reset=success` | Reset/forgot-password completion | Same login screen with the current transient success banner. | Keep | Remove query compatibility or change login route. |
| `/register` | Successful local account creation | `router.push("/verify")`. | Legacy-compatible | Bypass/remove verification alias or add real API work. |
| `/register` | Already authenticated while on initial step | `router.replace("/welcome")`; the current component renders null during transition. | Legacy-compatible | Change destination or hide the characterized transition behavior. |
| `/verify` | Direct request | Re-exported `/verify-email` implementation; no separate redirect. | Legacy-compatible alias | Remove/rename alias or make it behaviorally different. |
| `/verify-email` | Unauthenticated or missing current email after hydration | `router.replace("/register")`. | Legacy-compatible | Change guard destination or create backend verification. |
| `/verify-email` | Six-digit completion or explicit Continue | `router.push("/welcome")`. | Legacy-compatible | Change destination or route name. |
| `/welcome` | Unauthenticated after hydration | `router.replace("/login")`. | Legacy-compatible | Change guard destination. |
| `/welcome` | Create Workspace CTA | `router.push("/onboarding")`. | Legacy-compatible | Skip/rewrite onboarding journey. |
| `/onboarding` | Unauthenticated after hydration | `router.replace("/login")`. | Legacy-compatible | Change guard destination. |
| `/onboarding` | Already complete | `router.replace("/dashboard/apps")`. | Legacy-compatible | Change Product Hub destination. |
| `/onboarding` | Commerce completion | Writes current mock records through existing actions, then `router.push("/dashboard/apps")`. | Legacy-compatible | Change keys/IDs/model, create canonical Business, or redesign lifecycle. |
| `/onboarding` | Non-Commerce coming-soon choice | Current mock completion then `router.push("/dashboard")`. | Legacy-compatible | Treat a coming-soon OS as implemented or change route. |
| `/onboarding` | Back from first step | `router.push("/welcome")`. | Legacy-compatible | Change back route. |
| `/onboarding` | Sign out | Existing logout then `router.push("/login")`. | Legacy-compatible | Clear unrelated session/mock state or change route. |
| `/forgot-password` | Local three-step completion | `router.push("/login?reset=success")`. | Keep | Real backend recovery or different route. |
| `/reset-password` | Local direct completion | `router.push("/login?reset=success")`. | Keep | Real backend recovery or different route. |
| Dashboard route group | Not hydrated | Current inline spinner remains until evaluation. | Improve later | Alter routing timing during Phase A. |
| Any `/dashboard*` | Unauthenticated after hydration | `router.replace("/login")`. | Legacy-compatible | Treat mock guard as production authorization or change destination. |
| Any `/dashboard*` | Authenticated but `isOnboardingComplete` is false | `router.replace("/onboarding")`. A stale Workspace currently produces this outcome. | Legacy-compatible baseline | Silent context repair, storage mutation, or redirect change before approved recovery work. |
| `/dashboard` | Compatible authenticated/onboarded state | Renders current overview; intentionally not a sidebar destination. | Keep | Add it to/reorder sidebar or change URL. |
| `/dashboard/apps` | Compatible authenticated/onboarded state | Renders Product Hub; first sidebar destination and Core brand destination. | Keep | Change URL, position, or role. |
| `/dashboard/billing` | Sidebar, profile, Settings, or page link | Existing billing/subscription screen. | Keep | Change URL or outcome. |
| `/dashboard/team` | Sidebar, profile, Settings, or page link | Existing Team screen. | Keep | Change URL or outcome. |
| `/dashboard/integrations` | Sidebar or Product Hub quick link | Existing coming-soon Integrations screen. | Keep | Implement integrations or change URL. |
| `/dashboard/settings` | Sidebar or profile | Existing Settings screen. | Keep | Change URL or outcome. |
| Core sidebar | Current five links | `/dashboard/apps`, `/dashboard/billing`, `/dashboard/team`, `/dashboard/integrations`, `/dashboard/settings`, in that order. | Keep | Add, remove, regroup, reorder, or rewrite destinations. |
| Profile menu | Account, Billing, Team | `/dashboard/settings`, `/dashboard/billing`, `/dashboard/team`. | Keep | Change current destinations. |
| Core brand | Active Core shell | `/dashboard/apps`. | Keep | Change destination or move brand. |
| Commerce open handoff | Existing Product Hub/overview action | `http://localhost:3002/dashboard`. | Legacy-compatible | Redesign D-30 cross-application handoff. |
| Commerce setup handoff | Existing setup-required action with compatible context | Existing `http://localhost:3002/setup?...` URL composed by `commerceSetupUrl`; missing prerequisites fall back to `/dashboard/apps`. | Legacy-compatible | Change parameter/key semantics, ownership, or URL convention in Feature 050. |

Route file inventory contains the nine entry/auth/onboarding paths plus the dashboard layout and six
dashboard destinations listed above. There are no Core `loading.tsx`, `error.tsx`, `not-found.tsx`,
middleware redirects, or additional Next route aliases in the current implementation.

Audit result: **COMPLETE — APPROVED IN THE 2026-07-14 PHASE 0 COMPATIBILITY GATE**.

### Phase 0 Validation Ledger

Validation was run after each audit task was completed. Core has no `test` or unit-test script in
`apps/core-platform/package.json`, and the root package exposes only Playwright E2E tests, so unit
tests are recorded as N/A rather than represented as executed.

| Task | Lint | Typecheck | Unit tests | Evidence note |
|---|---|---|---|---|
| A000 | PASS — `pnpm --filter core-platform lint` | PASS — `pnpm --filter core-platform exec tsc --noEmit` | N/A — no Core unit-test script | The first typecheck encountered stale ignored `.next/types` route metadata. `next typegen` regenerated ignored metadata only; the repeated typecheck passed without a source or route change. |
| A001 | PASS — `pnpm --filter core-platform lint` | PASS — `pnpm --filter core-platform exec tsc --noEmit` | N/A — no Core unit-test script | Screen inventory is documentation-only. |
| A002 | PASS — `pnpm --filter core-platform lint` | PASS — `pnpm --filter core-platform exec tsc --noEmit` | N/A — no Core unit-test script | Route inventory is documentation-only; no route was changed. |
| A003 | PASS — `pnpm --filter core-platform lint` | PASS — `pnpm --filter core-platform exec tsc --noEmit` | N/A — no Core unit-test script | State inventory is documentation-only; no storage or provider behavior was changed. |
| A004 | PASS — `pnpm --filter core-platform lint` | PASS — `pnpm --filter core-platform exec tsc --noEmit` | N/A — no Core unit-test script | Mock inventory is documentation-only; no key, seed, relationship, or mock data was changed. |
| A005 | PASS — `pnpm --filter core-platform lint` | PASS — `pnpm --filter core-platform exec tsc --noEmit` | N/A — no Core unit-test script | Package inventory is documentation-only; no package, manifest, dependency, or application import was changed. |

### Phase 0 Approval Record

| Field | Record |
|---|---|
| Evidence revision | `phase0-r1` |
| Audit completion date | 2026-07-14 |
| Product Owner approver | NexoraXS Product Owner — explicit approval supplied in the 2026-07-14 Phase A implementation instruction. |
| Design review | **COMPLETE** — the Component and Screen Compatibility Maps contain the source-verified conservative-design review; the Product Owner explicitly accepted the Phase 0 audit evidence. |
| Accessibility review | **COMPLETE** — A000/A001 record the current semantic, focus, direction, responsive, and coverage findings; the Product Owner explicitly accepted the Phase 0 audit evidence. |
| Architecture Owner countersign | N/A — the audits identified no new ownership or authority conflict requiring a countersign; the existing legacy boundaries remain quarantined and unchanged. |
| Decision | **APPROVED** |
| Comments | The Product Owner explicitly approved the Feature 050 specification, plan, DP-050-01 Proposal A, Phase 0 audit evidence, and entry into Phase A T001–T009. No later phase is authorized by this record. |

#### Approval criteria evaluation

- A000–A005 complete: **PASS**.
- Official classification vocabulary used: **PASS**.
- Routes, redirects, aliases, keys, seeded IDs, `useApp`, relationships, boundaries, and
  new-component evidence source-verified: **PASS**.
- No architecture or compatibility invariant weakened: **PASS**.
- Component and Screen map design/accessibility evidence reviewed and accepted: **PASS**.
- Six maps and final Compatibility Gate approved by the Product Owner: **PASS — explicit approval
  recorded 2026-07-14**.

The Phase 0 Compatibility Map is now the approved implementation reference for Phase A. Any source
drift, authority conflict, or forbidden change returns the affected work to `BLOCKED`.

### T001 — Phase A Implementation Entry Gate

**Decision date**: 2026-07-14  
**Decision**: **PASS — T001–T009 may proceed**  
**Approved scope**: DP-050-01 Proposal A — Conservative Stabilization only

| Constitution item | Result and implementation-entry evidence |
|---|---|
| Frozen authority and ADR traceability | **PASS** — Core Platform v1.0/Documentation Baseline v1.0.1 and ADR-002, ADR-004, ADR-020, ADR-023, ADR-024, ADR-025, ADR-033, ADR-034, ADR-035, ADR-037, ADR-038, and ADR-040 remain controlling. |
| Owner and canonical write boundary | **PASS** — Core owns shell presentation; Phase A changes test infrastructure/evidence only and writes no canonical Core or Commerce fact. |
| Organization and tenant context | **PASS** — fixtures must preserve Workspace and legacy BusinessUnit/Branch inputs without canonical Business inference, migration, or treating client IDs as authorization. |
| OS independence and cross-domain access | **PASS** — no app-to-app source import, Commerce write, backend, API, SDK, or auth package is introduced. |
| Capability, Knowledge, Rules, Business Brain, Recommendation, and AI | **N/A — Phase A adds no intelligence behavior or AI entry point**. |
| Commercial/operational lifecycle separation | **N/A — no lifecycle state changes; legacy `OSEnablement` remains untouched and unresolved**. |
| Contracts and compatibility | **PASS** — routes, redirects, storage keys/formats, seeded IDs, mock relationships, UI placement, and page-facing `useApp` behavior are protected observations. |
| Security, privacy, Audit, and observability | **PASS** — isolated browser fixtures contain mock data only; no consequential write or production telemetry is added. Canonical Audit/production observability are N/A for test-only Phase A. |
| Arabic/English, RTL/LTR, accessibility | **PASS** — T007 requires automated direction, viewport, keyboard, motion, and Axe baseline evidence while preserving known defects. |
| Tests and measurable evidence | **PASS** — T002–T009 establish isolated route/control/accessibility and local comparative performance baselines before any product source change. |
| Documentation synchronization and deferred decisions | **PASS** — this existing characterization record is extended; D-22, D-23, D-30, and D-42 remain unresolved. |

**Stop conditions**: any product-source write during Phase A; route/key/seed/facade mutation;
BusinessUnit rename or canonical Business inference; Commerce ownership/write expansion; backend,
Laravel, API, database, auth/SDK package, repository, or redesign work; or any new Constitution
`BLOCKED` result.

### A005 — Package Reuse Map

Package manifests, exports, Core imports, and source consumers were scanned. The workspace contains
the private `@nexoraxs/ui`, `@nexoraxs/shared`, and `@nexoraxs/types` packages. `packages/auth/` and
`packages/sdk/` do not exist. No Core-to-Commerce application source import was found.

| Package or seam | Current responsibility and Core consumer | Classification | Permitted bounded use, forbidden use, and component decision |
|---|---|---|---|
| `packages/ui/` package boundary | Private presentation-only package exporting branding, `Button`, `Input`, `Card`, `Badge`, `Logo`, `Icon`, tokens, and app theme styles. | Keep | Reuse exported presentation assets only where their current API fits without visual/behavior change. Do not add domain state, routing, storage, auth, SDK, or owner logic. |
| `@nexoraxs/ui/styles/nexoraxs-theme.css` and `core-theme.css` | Active Core `app/globals.css` imports both; they provide current tokens and shell/dashboard styling. | Improve | Later approved CSS stabilization may improve existing scoped rules in place. Preserve visual patterns, `.nx-app-root` scope, other consumers, and current theme values; no redesign or duplicate theme system. |
| `@nexoraxs/ui` React primitives | Active Core shell does not import these primitives directly; only deprecated `Topbar` and `OnboardingStepper` import `Icon`. Active shell uses current app-local/native controls and Lucide icons. | Keep | Do not force a primitive migration without parity evidence. No shared component is required in Phase 0/A; later app-local components are justified only where the compatibility map records `Missing`. |
| `packages/shared/` package boundary | Private non-owning utility package; depends on `@nexoraxs/types` and exports mock schema/storage, selectors/actions, catalogs, localization, formatting, and compatibility helpers. `AppProvider` and `lib/store/index.ts` actively consume it. | Legacy-compatible | Reuse existing functions and exact keys through the current facade. Do not introduce a Repository Pattern, canonical ownership, shell presentation components, routing, or new cross-OS writes. |
| `packages/shared/src/mock-db/` | Shared browser mock adapter used by the current Core facade and other current applications. | Reconcile | Treat as compatibility infrastructure only. Feature 050 may characterize existing reads; it must not move shell logic into the package, mutate seeds/keys, or interpret co-location as shared canonical ownership. |
| `packages/types/` | Private shared contract-shape package exporting current Core and Commerce TypeScript interfaces. `AppProvider`, shared mock files, and current applications consume it. | Legacy-compatible | Reuse existing types without renaming `BusinessUnit`, creating a canonical Business migration, changing entity relationships, or widening Commerce ownership. A frontend presentation seam may compose read-only fields without changing these contracts. |
| `packages/auth/` | Directory/package absent; Core uses its current local mock session facade. | Missing | Do not create it for Feature 050. Authentication behavior is characterized, not redesigned or promoted to a new package. |
| `packages/sdk/` | Directory/package absent; Feature 050 performs no real API work. | Missing | Do not create it for Feature 050. No API client, fetch helper, service URL, or backend contract is required. |
| Root `package.json` and `pnpm-workspace.yaml` | Define the private pnpm workspace, lint/build/E2E commands, and `apps/*` plus `packages/*` package discovery. | Keep | Preserve workspace/package topology. Add only a specifically approved test dependency if a later task requires it; do not create new packages or change architecture. |
| `apps/core-platform/lib/store/index.ts` and `AppProvider.tsx` | Existing app-local facade over shared compatibility helpers and types; page-facing `useApp` remains the active contract. | Legacy-compatible | Reuse unchanged in Phase 0/A. Later bounded read-only shell projection must preserve leaf behavior and cannot become a generic data layer or write owner. |
| `apps/core-platform/lib/commerce-url.ts` | App-local helper preserves the current Commerce setup handoff URL. | Keep | Leave untouched. Cross-application handoff redesign remains outside Feature 050. |
| Future `ShellSearch` and `ShellStateNotice` | No matching component exists in Core or `@nexoraxs/ui`; A000 records the evidence. | Missing | If reached in later approved phases, create app-local bounded presentation components only. Do not generalize them into shared packages or use them to replace the shell. |

#### A005 boundary result

- Existing packages are sufficient for the requested Phase 0/A evidence work; no dependency or
  package creation is required.
- `packages/ui` remains presentation-only, `packages/shared` remains non-owning compatibility
  utilities, and `packages/types` remains shared shapes rather than a source of canonical writes.
- Missing auth and SDK packages are explicit exclusions, not implementation gaps for this feature.
- No package or app boundary change is authorized by the package audit.
- Audit result: **COMPLETE — APPROVED IN THE 2026-07-14 PHASE 0 COMPATIBILITY GATE**.

### A004 — Mock Compatibility Report

The current mock implementation is a browser-storage adapter composed from schema constants,
typed seed data, storage helpers, selectors, and functional actions. There is no Repository class
or generic Repository Pattern to reuse or introduce. `AppProvider` is the existing Core facade and
must retain its page-facing contract during Feature 050.

| Mock source or relationship | Current owner, consumer, and behavior | Classification | Compatibility requirement, prohibited mutation, and known limitation |
|---|---|---|---|
| `packages/shared/src/mock-db/schema.ts` | Shared compatibility schema supplies all browser keys, the `en`/`ar` dictionary, OS/plan catalogs, and presentation helpers to Core and Commerce. | Keep | Reuse exact keys and values. Do not rename a key, add a Feature 050 persistence format, redefine lifecycle state, or treat the shared adapter as canonical ownership. |
| `packages/shared/src/mock-db/storage.ts` | Shared browser adapter routes `nexoraxs.db.*` and theme data to `localStorage`, session data to `sessionStorage`, JSON-serializes values, and falls back on malformed JSON. | Keep | Preserve store selection, JSON format, null/removal behavior, and malformed-data fallback. It is a mock adapter, not production persistence or authorization. |
| `packages/shared/src/mock-db/seed.ts` | `AppProvider` consumes `seedDB` when the demo session flag is `"1"` or `"true"`; `emptyDB` describes the compatible empty shape. | Legacy-compatible | Preserve all seeded values and relationships. Do not reseed, normalize, migrate, or generate replacement IDs for shell work. |
| Seed identity tuple | `user_001 -> ws_001 -> sub_001`; legacy `bu_001`; `br_001`; `ose_001`; `tm_001`; `cs_001`; products `p1` and `p2`; OS ID `commerce`. | Legacy-compatible | Seed IDs are immutable compatibility inputs for Feature 050. Their human-readable names and existing dates/plan values also remain untouched. |
| Workspace/session relationship | Current session points User, Workspace, OS Subscription, legacy BusinessUnit, Branch, and OS IDs at the seeded tuple. Dashboard guards and projections resolve those IDs after hydration. | Legacy-compatible | Preserve the tuple and current resolution timing. Missing or stale IDs remain characterized states; Phase 0/A must not silently repair storage. |
| Legacy BusinessUnit-as-Business relationship | `bu_001` is stored directly under `ws_001`, links to `sub_001`, `commerce`, and `br_001`, and is presented as Business by current Core pages. | Legacy-compatible | Preserve the model and label compatibility. Do not rename it, add a canonical Business, duplicate records, or infer a canonical Business/Business Unit migration. |
| Branch relationship | `br_001` belongs to `ws_001` and legacy `bu_001`; `isMain` drives the existing fallback used by `setCurrent`. | Legacy-compatible | Preserve IDs, parent fields, and fallback. Shell presentation must not call `setCurrent` for automatic recovery. |
| Legacy `OSEnablement` relationship | `ose_001` joins `sub_001`, `ws_001`, `commerce`, `bu_001`, and `br_001` with current active/scope fields. | Remove later | Preserve untouched. Do not revive it as a canonical aggregate or resolve the ADR-023 successor in Feature 050. |
| Commerce setup/product/order projections | `AppProvider` loads typed Commerce collections; Core Product Hub/pages and notifications read bounded display projections. Existing onboarding/page actions can write through the legacy facade. | Reconcile | Feature 050 shell work may read presentation projections only and must not add, relocate, or invoke Commerce writes. Operational ownership remains Commerce; shared storage does not transfer ownership. |
| `selectors.ts` and `actions.ts` | Shared pure functions provide scoped reads and existing mock mutations to current app facades. | Keep | Reuse existing functions where already consumed. Do not wrap them in repositories or add speculative shell/domain abstractions. Client-side scope filtering is not production authorization. |
| `AppProvider` persistence effects | Loads the current collections, persists state changes to the same keys, seeds on the explicit demo flag, and removes only that flag after seeding. | Legacy-compatible | Preserve exact load/write coverage and current `useApp` behavior. Do not clear unrelated data, change default records, or extend shell writes. |
| Existing E2E fixtures | Current tests primarily seed browser storage for other application journeys; no Feature 050 Core shell fixture or mock repository exists yet. | Missing | Phase A may create isolated characterization helpers in the exact approved test files only. It must reuse the same keys/IDs and avoid shared persistent browser state. |

#### A004 ownership and limitation findings

- The mock store co-locates Core and Commerce-shaped data for compatibility. This is not evidence
  of shared canonical ownership and does not authorize Core shell writes to Commerce facts.
- Global current-record lookup followed by scoped-list filtering can expose inconsistent stale or
  cross-Workspace tuples. Later recovery presentation must explain unavailability without mutating
  records, guessing parents, or treating client IDs as authorization.
- Browser storage, mock passwords, and client redirects are development behavior only. They do not
  satisfy production authentication, authorization, tenancy, Audit, or observability controls.
- Existing seed and compatibility data remain untouched by this audit.
- Audit result: **COMPLETE — APPROVED IN THE 2026-07-14 PHASE 0 COMPATIBILITY GATE**.

### A001 — Screen Compatibility Map

All route files currently present under `apps/core-platform/app/` were inspected. Dashboard pages
share `app/dashboard/layout.tsx -> CoreShell -> Shell`; authentication, recovery, welcome, and
onboarding retain their existing separate shells.

| Path or screen | Purpose and current status | Reuse decision | Required improvements in Feature 050 | Blocked areas |
|---|---|---|---|---|
| `/` | Server entry that immediately redirects to `/login`; no visible shell. | Keep | Characterize the exact destination only. | Any route/destination change. |
| `/login` | Current mock two-step sign-in. Authenticated completed users go to `/dashboard/apps`; incomplete users go to `/onboarding`. | Legacy-compatible | Characterize redirect outcomes and state timing; no screen redesign. | Real authentication/backend work and changed destinations. |
| `/register` | Current mock account creation; successful creation moves to `/verify`; already-authenticated render redirects to `/welcome`. | Legacy-compatible | Characterize transitions and preserved null-during-redirect behavior. | Auth model or visual replacement. |
| `/verify-email` | Current mock six-digit verification; unauthenticated/missing-email state goes to `/register`, completion goes to `/welcome`. | Legacy-compatible | Characterize automatic and explicit completion paths. | Real verification service or route removal. |
| `/verify` | Compatibility alias implemented by re-exporting `/verify-email`. | Legacy-compatible | Preserve the alias and identical outcome. | Alias removal or redirect rewrite. |
| `/welcome` | Authenticated pre-onboarding Workspace introduction; unauthenticated users return to `/login`, CTA opens `/onboarding`. | Legacy-compatible | Characterize entry, display, and CTA route. | Layout redesign or lifecycle reinterpretation. |
| `/onboarding` | Current mock Workspace/OS/Plan onboarding; preserves legacy BusinessUnit/Branch creation and `OSEnablement` compatibility through `useApp`. | Legacy-compatible | Characterize guards, finish destinations, sign-out/back behavior, storage, and IDs only. | Business/BusinessUnit migration, lifecycle redesign, backend, and storage-key changes. |
| `/forgot-password` | Current local request/code/password flow; success goes to `/login?reset=success`. | Keep | Preserve and characterize route outcome. | Backend password recovery or route changes. |
| `/reset-password` | Current direct mock reset form; success goes to `/login?reset=success`. | Keep | Preserve and characterize route outcome. | Backend password recovery or route changes. |
| Dashboard guard/loading | Hydration/auth/onboarding guard before all dashboard pages; current fallback is an unnamed fixed dark spinner. | Improve | Phase A records current timing/outcomes. Later work may improve status semantics without changing guards. | Production authorization claims or altered `/login`/`/onboarding` destinations. |
| `/dashboard` | Current OS overview and Commerce setup/open handoff; intentionally absent from sidebar; includes a nested `.nx-main-scroll`. | Keep | Preserve URL/content/data/handoffs; characterize nested scroll and route behavior. | Sidebar insertion, handoff redesign, Commerce writes, or page replacement. |
| `/dashboard/apps` | Current Product Hub, subscription/limit presentation, legacy BusinessUnit-as-Business counts, Commerce handoff, activity, and quick links. | Keep | Preserve visible mock outcomes, IDs, labels, and destinations; characterize only in Phase A. | Product Hub redesign, Business migration, new lifecycle semantics, or Commerce ownership change. |
| `/dashboard/billing` | Current Workspace-scoped platform subscription presentation, mock billing details/invoices, and plan limits. | Keep | Preserve commercial/operational distinction and all mock outcomes; characterize route and shell behavior. | Real billing, API/backend work, or lifecycle changes. |
| `/dashboard/team` | Current owner/member presentation, invite modal, permission display, and deprecated BU/Branch display-key compatibility. | Keep | Preserve mock behavior and keys; characterize shell/route only. | Permission architecture, Business migration, or modal redesign in Phase A. |
| `/dashboard/integrations` | Current coming-soon integration cards and local notify toast. | Keep | Preserve coming-soon behavior and existing shell usage. | Runtime integrations, cross-OS coupling, API/backend work. |
| `/dashboard/settings` | Current Workspace form, locale/theme controls, Team/Billing links, and mock advanced actions. | Keep | Preserve tabs, values, keys, routes, and mock save/toast behavior; characterize shell usage. | Settings architecture, storage migration, or control relocation. |
| Shell loading/empty/error/unauthorized/recovery surfaces | No shared persistent shell-state surface exists; only the dashboard spinner and page-local empty content are present. | Missing | Later creation requires the approved bounded `ShellStateNotice`; Phase A records absence only. | Invented backend failures, authorization ownership, or record mutation. |

#### A001 responsive, direction, accessibility, and coverage findings

- All six dashboard pages add a second `.nx-main-scroll` beneath the active Shell scroll owner.
- Current compact drawer behavior is inherited by all dashboard pages at the existing 880px CSS
  breakpoint; auth/onboarding use separate responsive styles and are not redesigned by Feature 050.
- Existing dashboard copy is substantially English-only; Arabic document direction is supplied by
  `AppProvider`, but complete shell localization is deferred to the approved later phases.
- The current dashboard fallback has no accessible name/status; several existing page controls and
  tables have known semantic/reflow gaps. Phase A records these defects without fixing them.
- No Core automated shell coverage existed before Feature 050.
- Audit result: **COMPLETE — APPROVED IN THE 2026-07-14 PHASE 0 COMPATIBILITY GATE**.

### A003 — State Compatibility Report

#### Active providers and facade

| State surface | Source/owner | Current readers/writers and effects | Compatibility treatment |
|---|---|---|---|
| Root provider | `app/layout.tsx -> AppProvider` | Every Core route receives the current browser-backed mock facade; `ToastHost` is also mounted here. | Keep active provider placement and hydration model. No broad decomposition. |
| `useApp` | `lib/store/AppProvider.tsx` | Dashboard, auth, onboarding, Settings, Team, and shell components consume the page-facing interface. | Legacy-compatible. Existing fields, actions, derived values, and side effects remain available unchanged. |
| Current session state | `AppProvider` in-memory state loaded after first client render | IDs, onboarding, locale, theme, collections, derived current records, and presentation helpers. | Preserve initial empty SSR state, post-mount hydration, and current derived outcomes. |
| Legacy `CoreProvider` | `components/CoreProvider.tsx` | Consumer scan found no active root usage; reads deprecated locale/theme helpers. | Remove later. Do not revive or remove in Feature 050. |
| Deprecated session helpers | `lib/core-session.ts`, `lib/core-theme.ts`, `lib/locale.ts` | `InviteUserModal` still reads BU/Branch names from `core_*`; other helpers have no active shell consumer. | Remove later/Legacy-compatible. Preserve files and keys; no consolidation or third preference key. |

The page-facing `useApp` contract currently exposes hydration; current User, Workspace, legacy
BusinessUnit, Branch, OS Subscription and legacy `OSEnablement`; onboarding; locale/theme/toasts;
authentication/onboarding/Commerce-derived status; scoped BusinessUnit/Branch and Commerce
collections; subscription/storage/money/translation helpers; auth, Workspace, onboarding, setup,
Commerce, and `setCurrent` actions. Phase 0/A does not alter this interface. Later shell work may
add only the approved read-only shell snapshot while leaf consumers retain current behavior.

#### Active browser storage contract

| Store/format | Keys | Current behavior and required compatibility |
|---|---|---|
| `sessionStorage`, JSON via `readSession`/`writeSession` | `nexoraxs.session.currentUserId`, `.currentWorkspaceId`, `.currentOSSubscriptionId`, `.currentBusinessUnitId`, `.currentBranchId`, `.currentOSId`, `.onboardingState`, `.locale`, `.demo` | Loaded after mount and persisted by the current provider. Preserve names, JSON representation, defaults, and remove-on-null behavior. Demo values `"1"`/`"true"` trigger current seeding, then only the demo flag is removed. |
| Defined session compatibility key | `nexoraxs.session.entryContext` | Defined in `STORAGE_KEYS`; the current `AppProvider` does not load or rewrite it. | Leave untouched. Do not infer a new session model. |
| Raw session compatibility | `nx_last_order_id` | Read/written only through existing POS last-order helpers. | Leave untouched. |
| `localStorage`, JSON collections | `nexoraxs.db.users`, `.workspaces`, `.branches`, `.osSubscriptions`, `.osEnablements`, `.businessUnits`, `.commerceSetups`, `.teamMembers`, `.commerceProducts`, `.commerceOrders`, `.commerceCustomers`, `.commerceInvoices`, `.branchInventory`, `.stockMovements`, `.stockTransfers`, `.commerceReturns`, `.mediaAssets`, `.workspaceStorageUsage` | Existing shared mock adapter is the only approved compatibility source. Some collections are not loaded by Core but remain protected. | Preserve every key, shape, owner, value, and write path; Phase 0/A uses only isolated browser contexts. |
| `localStorage`, raw UI value | `nexoraxs.ui.theme` | Current provider reads and writes raw `light`/`dark`, applies `<html data-theme>`. | Preserve key, raw format, values, and document effect. |
| Deprecated raw `sessionStorage` | `core_theme`, `core_workspace_name`, `core_workspace_country`, `core_workspace_currency`, `core_workspace_timezone`, `core_bu_name`, `core_bu_industry`, `core_branch_name`, `core_branch_city`, `core_branch_country`, `core_onboarding_done`, `core_locale` | Old helpers use raw strings; `InviteUserModal` still reads BU/Branch names. | Legacy-compatible/Remove later. Do not rename, remove, consolidate, migrate, or write a competing key. |

#### Current preference and session effects

- Locale defaults to `en`, persists to `nexoraxs.session.locale`, and updates `<html lang>` plus
  `<html dir>` (`ar -> rtl`, otherwise `ltr`) after hydration.
- Theme defaults to `light`, persists raw to `nexoraxs.ui.theme`, and updates
  `<html data-theme>` after hydration.
- Logout removes only `nexoraxs.session.currentUserId` and retains compatible Workspace,
  BusinessUnit, Branch, locale, theme, onboarding, and mock collections.
- `isAuthenticated` requires both a stored current User ID and a resolved User record.
- `isOnboardingComplete` currently requires `completedOS` to contain `commerce` and a resolved
  current Workspace.
- `setCurrent` accepts client IDs. When BusinessUnit changes without an explicit Branch, it may
  select the first main/first Branch for that BusinessUnit. This behavior is preserved and must not
  be called implicitly by later shell recovery.

#### Invalid and stale state baseline

- Malformed JSON read through the shared adapter falls back to the supplied empty/default value.
- A stale User ID resolves to unauthenticated and produces the current `/login` dashboard guard.
- A stale Workspace ID resolves to null, makes current onboarding incomplete, and produces the
  current `/onboarding` dashboard guard.
- Stale BusinessUnit or Branch IDs resolve to null and can produce empty scoped projections without
  a dedicated recovery surface.
- Current records are resolved globally by ID before scoped `BUSINESS_UNITS`/`BRANCHES` lists are
  filtered. Cross-Workspace tuples can therefore resolve inconsistent current records; this is a
  characterized legacy risk, not authorization proof.
- Invalid raw locale/theme values are not governed migration inputs and must not be normalized by
  Phase 0/A.

#### State boundary result

The active Core provider currently contains legacy Commerce read/write actions for existing page
compatibility. Feature 050 neither invokes those writes from shell presentation nor relocates,
renames, or expands them. The shell may characterize existing read-only projections only. Any new
Core shell write to Commerce facts, any canonical Business inference, or any storage-key/format
change is **BLOCKED**.

Audit result: **COMPLETE — APPROVED IN THE 2026-07-14 PHASE 0 COMPATIBILITY GATE**.

### T004 — Phase A Compatibility Map Validation

**Validated**: 2026-07-14  
**Source revision**: `636952f7ccb49d9c697b8cbbf0250ccbcf2c93b0`  
**Result**: **PASS — no source drift or new live consumer found**

- Route scan resolves the same root, authentication/onboarding, dashboard layout, and six dashboard
  page files recorded by A001/A002; no route, redirect, or alias file changed.
- Consumer scan still resolves `dashboard/layout.tsx -> CoreShell -> Shell`, the same inline
  navigation/topbar composition, current context/notification/profile/locale/theme consumers, and
  dormant Commerce-mode `BranchPill` compatibility import.
- Deprecated `Topbar`, `LanguageSwitcher`, `CoreProvider`, `DashboardOnboardingGuard`,
  `EnableModal`, and `OnboardingStepper` have no newly discovered active shell role.
- Package scan confirms the same active shared/mock/type imports and Core theme CSS consumers;
  `packages/auth/` and `packages/sdk/` remain absent.
- `ShellSearch.tsx` and `ShellStateNotice.tsx` remain absent, so their `Missing` classification and
  later app-local-only justification remain accurate. Neither is created in Phase A.
- All map entries continue to use only Keep, Improve, Reconcile, Legacy-compatible, Remove later,
  and Missing. No classification, treatment, replacement, removal, migration, or architecture
  permission changed.

Validation commands: route-file `find` scan; shell/component `rg` consumer scan; package import
`rg` scan; explicit absence checks for the two justified missing components and the prohibited
auth/SDK package paths. The approved Phase 0 maps remain the single Compatibility Map.

### T005–T007 — Executable Characterization Results

**Execution date**: 2026-07-14  
**Runtime**: local Core production build, Playwright Chromium, one worker, port 3001, no slow motion

| Baseline group | Result | Protected evidence |
|---|---|---|
| T005 routes/context/storage | **PASS — 7/7** | Root/auth/recovery routes; reset completion; login/register/welcome/onboarding redirects; missing/incomplete/stale/malformed guards; all six dashboard destinations; unchanged storage keys/seed IDs; cross-scope tuple. |
| T006 shell controls | **PASS — 7/7** | Five-link sidebar order; topbar control order; unavailable search; notification indicator/order/empty result; profile destinations/logout; locale/theme formats; compact drawer close paths. |
| T007 accessibility/direction/responsive | **PASS — 10/10 characterization checks** | 375, 768, 879, 881, 1024, and 1440 widths; English LTR; Arabic RTL; light/dark; Axe; keyboard; reduced-motion preference. Baseline defects remain explicit and are not represented as remediated. |

#### Current defects and risks frozen by the tests

- Stale/malformed Workspace state redirects to onboarding and has no dedicated recovery surface.
- A cross-scope legacy BusinessUnit/Branch tuple remains unchanged in storage and currently exposes
  the foreign Business name and handoff values in Product Hub. This is a high-risk characterized
  presentation defect; Phase A does not repair, infer, or mutate context.
- Current compact drawer does not close on Escape and its trigger lacks `aria-expanded`.
- Current profile popup does not move focus into the popup or close/restore focus on Escape.
- AuthShell titles are styled text rather than headings; the active topbar is not a semantic banner.
- Several primary topbar controls are smaller than the required 44 by 44 CSS-pixel target.
- Arabic mode sets `lang="ar"` and `dir="rtl"`, while search and multiple shell control strings
  remain English.
- Reduced-motion preference is observable, but current transitions are not yet comprehensively
  suppressed.

The Playwright HTML report contains the per-test JSON attachments for geometry, Axe rule IDs/node
counts, touch target dimensions, focus order, direction labels, and motion values. Automated Axe
and role checks do not replace the required manual current-stable NVDA/current-stable Chrome on
Windows pass; that execution environment was unavailable during this Linux Phase A run and remains
explicitly deferred to the later validation task that owns manual assistive-technology evidence.

### T008 — Local Comparative Performance Baseline

**Result**: **PASS — six reference measures captured with 10 raw samples each**  
**Dataset**: `evidence/performance-baseline.json`  
**Environment**: production build, local loopback port 3001, Chromium 149.0.7827.55, one worker,
zero slow motion, Node v24.15.0, pnpm 9.15.9, Linux/WSL2

| Measure | Median | P95 | Samples at or below 100 ms |
|---|---:|---:|---:|
| Initial shell readiness | 168.64 ms | 183.46 ms | 0% — navigation/readiness reference, not a local control-feedback claim |
| Drawer open/close feedback | 59.52 ms | 121.70 ms | 90% — current baseline contains one over-100 ms cycle |
| Profile menu open feedback | 52.13 ms | 326.46 ms | 90% — current baseline misses the 95% interaction target |
| Locale switch feedback | 54.70 ms | 78.45 ms | 100% |
| Theme switch feedback | 71.81 ms | 83.86 ms | 100% |
| Route navigation readiness | 106.58 ms | 195.16 ms | 20% — route-readiness reference, not a local control-feedback claim |

The measurements are comparative local references, not production SLOs. Playwright action/locator
overhead, warm cache, local machine scheduling, and absence of CPU/network throttling limit external
interpretation. Later changed-route comparisons must use the same environment/method and stay
within the approved 10% median-regression gate. Existing drawer/profile outliers are recorded as
baseline risks and cannot be hidden by weakening the 100 ms/95% target.

### T009 — Phase A Checkpoint

**Checkpoint date**: 2026-07-14  
**Decision**: **PASS — Phase A baseline complete; STOP before T010**  
**Evidence review**: Implementation-agent review completed against the approved Compatibility Map

| Check | Result |
|---|---|
| Clean Core production build | **PASS** — all 16 preserved application routes compiled/prerendered without a product-source change. |
| Complete isolated Core suite | **PASS — 26/26**; `.last-run.json` records `passed` with no failed tests. |
| Core test discovery | **PASS — 26 Core tests in two files**, Chromium only, one worker. |
| Commerce test isolation | **PASS — original Commerce configuration lists only the existing `commerce-044.spec.ts` test**; Core specs register only when the dedicated Core config sets its test-harness marker. |
| Routes, redirects, keys, IDs, control outcomes | **PASS as characterized** — protected outcomes match the approved map; known defects remain tagged baseline defects. |
| Accessibility/direction matrix | **PASS as automated characterization** — six widths, EN/AR, LTR/RTL, light/dark, keyboard, Axe, and reduced-motion evidence captured; manual NVDA/Chrome remains explicitly deferred. |
| Performance dataset | **PASS as characterized** — six measures, 10 raw samples each, environment/method/limitations recorded; current drawer/profile target misses remain visible. |
| Boundary review | **PASS** — no app-to-app source import, backend/API/Laravel/database work, Commerce write, route/key/seed change, BusinessUnit migration, or product-source modification. |

The comparison baseline is immutable input for later phases: later evidence may append comparisons
but must not replace these raw samples or rewrite known baseline defects. Phase B is not authorized
by this execution and T010 remains unchecked.

## Phase B — Accessibility and Semantic Stabilization

**Checkpoint date**: 2026-07-14  
**Decision**: **PASS — bounded semantic stabilization complete**

The Product Owner's later implementation command authorized continuation beyond the Phase A stop.
The Phase A raw baseline above remains unchanged; this section extends its lifecycle with the
Phase B comparison.

### T010–T011 failing-first evidence

The eight new acceptance cases were executed against the clean Phase A production build before
product-source edits. All eight failed for the intended missing contract only:

- no semantic banner or keyboard skip target;
- no named primary navigation or `aria-current` state;
- no localized navigation/skip landmark labels;
- no popup ownership/expanded state or Escape focus restoration;
- no named language group or theme pressed state;
- 22–36 CSS-pixel compact activation widths; and
- no reliable visible focus indicator.

The failures did not request breadcrumbs, routes, reordered navigation, Business/BusinessUnit
selectors, a new shell structure, or storage changes.

### T012–T015 implementation evidence

- `Shell` remains the active inline topbar/sidebar implementation. It now supplies a `header`, one
  named primary `nav`, one stable focusable `main`, a keyboard-only skip link, typed app-local icon
  mapping, and `aria-current` while retaining all five destinations and their order.
- `ContextSwitcher` remains Workspace-only in Core mode. Its existing popup now has a localized
  name, ownership and expanded state, keyboard entry, Escape dismissal, and opener restoration.
  The dormant Commerce compatibility branch and all `setCurrent` behavior remain present.
- Existing notifications and profile components gained popup relationships, deterministic Escape
  behavior, and focus restoration. Existing notification sources/order and profile destinations /
  logout outcomes are unchanged. Locale and theme controls use their existing actions and keys.
- Scoped `.nx-app-root` rules add a visible focus indicator, skip-link reveal, and 44 by 44
  CSS-pixel minimum activation areas. No token, palette, typography, placement, or component was
  replaced.

### T016 checkpoint results

| Check | Result |
|---|---|
| T010/T011 acceptance | **PASS — 8/8** in EN/AR with named landmarks, active destinations, popup state/focus, touch targets, and focus indicator. |
| Complete Core suite | **PASS — 34/34** after updating characterization locators for the improved native/ARIA roles. |
| Axe critical/serious gate | **PASS — 0 critical or serious violations** for the compact Product Hub shell sample. |
| Route/storage/seed parity | **PASS** — T005/T006 route, redirect, storage, seed, notification, profile, locale, and theme outcomes passed. |
| Production build/type/lint | **PASS** — Core lint, strict TypeScript, and optimized build passed. |
| Shared UI consumers | **PASS** — Core, Commerce, and Landing production builds passed with the scoped shared CSS. |
| Direction/theme inspection | **PASS (automated DOM/style scope)** — EN LTR, AR RTL, light, dark, logical positioning, keyboard focus, and required compact widths passed. Manual NVDA/Chrome remains owned by T047. |
| Whitespace gate | **PASS** — `git diff --check`. |

One local comparison sample put route readiness at 118.42 ms versus the 106.58 ms baseline
(11.1% slower), so it does **not** satisfy the eventual 10% release gate and is retained as an
explicit sampling risk rather than called a pass. Initial readiness improved to 164.83 ms. Drawer/profile/locale
feedback met the local target in all ten samples; theme feedback met it in nine of ten. Performance
is re-sampled under the task-owned checkpoints rather than weakening the approved gate.

**Rollback observation**: semantic markup, each popup component, and the scoped CSS rules remain
independently revertible. No rollback touches routes, stored values, seed records, or mock owners.

## Phase C — Responsive Shell Stabilization

**Checkpoint date**: 2026-07-14  
**Decision**: **PASS — existing drawer stabilized at the preserved 880 px boundary**

### T017 failing-first evidence

The new responsive contract was first executed against the Phase B production build. It exposed
the intended gaps: no compact dialog/modal state, no explicit close control, no focus containment,
no breakpoint/history release, and an RTL transform-specificity defect. Existing no-overflow
checks passed and were retained. One initial history setup error (attempting to click an off-canvas
link before opening the drawer) and one non-exact `Menu` locator were corrected in the test itself;
neither changed the product contract.

### T018–T019 bounded implementation

- The existing `Shell` sidebar remains the only drawer/sidebar. It now closes on its close control,
  Escape, scrim, destination selection, history navigation, and crossing above 880 px.
- Compact opening applies dialog/modal semantics, moves focus to the close control, contains Tab /
  Shift+Tab within the drawer, makes background topbar/main regions inert, and restores the opener
  when closure does not navigate.
- Desktop/sidebar behavior has no focus trap or modal state. Resize cleanup releases all transient
  state, and the Workspace popup remains the topmost Escape surface when open inside the drawer.
- Existing logical CSS positioning is retained. The RTL `.open` specificity is reconciled, and the
  compact topbar becomes a keyboard-scrollable region so every existing control remains reachable
  without hiding, relocating, or reordering it.

### T020 checkpoint results

| Check | Result |
|---|---|
| Responsive contract | **PASS — 13/13** across 375, 768, 879, 881, 1024, and 1440 px, EN LTR and AR RTL. |
| Earlier regressions | **PASS — complete Core suite 47/47** including Phase A/B route, storage, seed, notification, profile, locale/theme, Axe, and focus checks. |
| Focus/background lifecycle | **PASS** — compact containment, main/topbar inert state, opener restore, navigation/history/breakpoint release, and no persistent lock. |
| Compact reachability / zoom | **PASS** — every topbar control becomes keyboard-visible in the scroll region; no document overflow at the 200% CSS-zoom reference. |
| Drawer feedback | **PASS — 100% of ten cycles at or below 100 ms**; final sample median 66.76 ms, P95 94.59 ms. |
| Route median gate | **PASS on required identical rerun** — 115.45 ms versus 106.58 ms baseline, 8.3% slower and within the 10% limit. The preceding 124.79 ms sample remains recorded as instability evidence. |
| Initial readiness | **PASS comparison** — 145.57 ms versus 168.64 ms baseline. |
| Lint/type/build/whitespace | **PASS** — Core lint, strict TypeScript, production build, and `git diff --check`. |

Profile and theme samples include isolated over-100 ms automation outliers; those controls are not
changed by Phase C and remain explicit risks for their Phase E checkpoint. No timing threshold was
weakened.

**Rollback observation**: the drawer lifecycle is isolated to `Shell.tsx` and its scoped Core-theme
rules. Reverting that pair returns to the Phase B sidebar class-toggle baseline; cleanup removes the
document marker, modal state, inert regions, and focus containment. Routes and persisted state are
not involved in either forward behavior or rollback.

## Phase D — Workspace Context Stabilization

**Checkpoint date**: 2026-07-14  
**Decision**: **PASS — read-only context recovery with legacy compatibility intact**

### T021 failing-first evidence

The initial contract run showed the approved gaps: no typed ready status, completed stale/malformed
context redirected through onboarding or lacked recovery, cross-scope BusinessUnit/Branch values
could reach leaf presentation, and no zero-write retry existed. Tests cover valid, missing,
malformed-complete, stale Workspace, stale BusinessUnit, stale Branch, Branch/BusinessUnit mismatch,
cross-Workspace, true incomplete onboarding, and malformed-onboarding tuples.

### T022–T026 bounded seam

- `lib/shell/contracts.ts` contains only app-local presentation vocabulary: existing navigation /
  search descriptors, exact-ID context snapshots/results, explicit legacy BusinessUnit annotation,
  read-only notification shapes, presentation states/preferences, and transient interaction state.
  It defines no domain aggregate, authorization proof, persistence API, SDK, or Repository.
- `evaluateShellContext` is a deterministic pure function. It imports no storage, does not select a
  fallback, never infers a Business, and validates Workspace -> legacy BusinessUnit -> Branch
  relationships before returning `ready`.
- `AppProvider` exposes one memoized `shellContextSnapshot` additively. All pre-existing `useApp`
  fields, actions, `setCurrent` fallback behavior, persistence effects, and leaf consumers remain
  source-compatible. Only dashboard layout and existing ContextSwitcher consume the new facade.
- ContextSwitcher remains Workspace-only in Core mode. The dormant Commerce-mode BusinessUnit /
  Branch branch is preserved without expansion or removal.
- Completed-but-invalid tuples stay on the requested dashboard URL and render one localized,
  persistent recovery notice. Retry only re-evaluates local presentation. True unauthenticated,
  incomplete-onboarding, and malformed-onboarding redirects retain `/login` or `/onboarding`.

### T027 checkpoint results

| Check | Result |
|---|---|
| Context UI/pure matrix | **PASS — 10/10 T021 cases** plus deterministic repeated-output and input-nonmutation assertions. |
| Complete shell regression | **PASS — 56/56** across all earlier route, control, semantics, drawer, direction, theme, and accessibility cases. |
| Storage compatibility | **PASS** — each recovery test snapshots every known local/session key before and after retry; byte values are identical. Existing malformed hydration normalization is observed before the retry comparison and is not extended by the shell seam. |
| IDs and legacy model | **PASS** — `bu_001`, `br_001`, all seed fixtures, current BusinessUnit types/labels, and `setCurrent` behavior remain unchanged. No `businessId` or canonical Business record exists. |
| Cross-scope disclosure | **PASS** — foreign Workspace, BusinessUnit, and Branch names are absent from the rendered invalid shell; the original IDs remain untouched for compatibility. |
| Source boundary scan | **PASS** — no storage calls, API/fetch, Repository, app-to-app import, Commerce write, Laravel/backend work, BusinessUnit rename, or OSEnablement replacement in the shell seam. |
| Consumer/rerender scope | **PASS** — snapshot and evaluator inputs are memoized; only dashboard layout and ContextSwitcher adopt the hook. No dashboard leaf-page import changed. |
| Static/build/whitespace | **PASS** — Core lint, strict Core TypeScript, production build, and `git diff --check`. The repository has no root `tsc` binary/script; the app-owned strict check is the applicable type gate. |

**Rollback observation**: remove the layout/ContextSwitcher adapter usage to return to Phase C while
leaving every stored value untouched. The pure types/evaluator can then be removed as unused. No
rollback path requires storage cleanup, data migration, route change, or provider decomposition.

## Phase E — Topbar Stabilization

**Checkpoint date**: 2026-07-14  
**Decision**: **PASS — bounded topbar stabilization complete**

### T028–T035 results

- The same five-item `CoreShell` navigation metadata now supplies destination-only search. Search
  exposes localized combobox/listbox semantics, neutral/no-match/unavailable states, deterministic
  keyboard selection, and only the five existing Core destinations. It has no records, Commerce,
  cross-OS, Marketplace, AI, command, or invented documentation source.
- Notifications retain plan, out-of-stock, low-stock, and latest-order order/copy/indicator through
  a pure read-only projection. Exact populated and empty fixtures pass in English and Arabic. No
  Commerce write or cross-app import was added.
- Profile retains Settings/Account, Billing, Team, and sign-out outcomes. Popup coordination,
  Escape, outside dismissal, compact reachability, and opener restoration pass. Mounted-but-hidden
  menu content is excluded from visible-control characterization.
- Locale and theme retain `nexoraxs.session.locale` (`en`/`ar`) and `nexoraxs.ui.theme`
  (`light`/`dark`). Document language/direction/theme feedback is immediate, focus remains on the
  activated control, and no key is added or renamed.
- T028 topbar contract: **PASS — 8/8**. Browser event-to-visible-feedback samples for search,
  profile, locale, and theme are below 100 ms. External Playwright action timings retain occasional
  scheduler outliers and remain diagnostic rather than hidden.
- Source scan: no Repository, API/fetch, SDK/auth package, app-to-app import, command/AI surface, or
  new route. The sole storage match is the permitted synchronous write to the unchanged theme
  preference key; shell presentation and notification functions contain no persistence calls.

**Rollback observation**: search can return to the characterized unavailable field in the same
placement; notifications can return to the prior read-only computation; profile, locale, and theme
changes are independently revertible. No rollback changes a route, key, seeded ID, or mock record.

## Phase F — Presentation States and Scroll Ownership

**Checkpoint date**: 2026-07-14  
**Decision**: **PASS — presentation-only states and one scroll owner complete**

### T036–T040 results

| Check | Result |
|---|---|
| State vocabulary | **PASS** — loading, ready, empty, error, unauthorized, unavailable, and recovering descriptors have distinct copy/semantics. `unauthorized` copy is explicitly a mock-session context mismatch, not production authorization proof. |
| Named hydration | **PASS** — server-rendered JavaScript-disabled check finds one named, busy status; comprehension does not depend on the spinner. |
| Context presentation | **PASS** — missing maps to empty, stale/unresolvable maps to unavailable, cross-scope maps to the mock-session mismatch, and valid remains ready. No backend error is invented as a production trigger. |
| Retry lifecycle | **PASS** — recovering is observed once, returns to the evaluated state, and all protected local/session values are byte-identical before/after. |
| Disclosure | **PASS** — foreign Workspace, BusinessUnit, and Branch names remain absent from all invalid-context states. |
| Locale/theme/state matrix | **PASS** — safe context states render in EN/AR, light/dark, and compact/desktop samples without overflow. |
| Scroll ownership | **PASS** — all six dashboard routes have one `main`, one direct shell-owned `.nx-main-scroll`, no nested `.nx-main-scroll`, visible headings, unchanged URLs/content/actions, and no document overflow at 375/1440 plus the 200% zoom reference. |
| Focus/Axe/static gates | **PASS** — state roles, atomic announcements, actions, strict typecheck, lint, and production build pass. |

The state seam is presentation-only. It does not write storage, authorize resources, simulate a
backend, expose a reset, or change the authentication/onboarding redirects. The generic error/read
retry descriptor is available for a future real presentation read, but Feature 050 does not create
an artificial production failure trigger.

**Rollback observation**: state rendering can return to the Phase D invalid-context notice without
touching stored values. A page wrapper is restored only for a proven route-specific regression;
tests preserve one main/scroll owner and equivalent route content.

## Phase G — Localization, Direction, Theme, and Motion

**Checkpoint date**: 2026-07-14  
**Decision**: **AUTOMATED PASS; MANUAL ASSISTIVE-TECHNOLOGY ROW BLOCKED**

### T041–T045 results

- Changed shell translation-key parity: **PASS** in English and Arabic with zero key fallback.
  User-entered mixed Arabic/Latin organization names remain byte-for-byte display values and use
  `dir="auto"`; no stored name is translated.
- Required base matrix: **PASS — 16/16** across EN/LTR and AR/RTL, light/dark, and 375, 768, 1024,
  and 1440 pixels. Every row verifies landmarks, current shell, 44-by-44 primary targets, focus,
  overflow, preserved mixed names, and zero critical/serious Axe finding.
- Supplemental direction matrix: **PASS — 4/4** at 879/881 in EN/AR with long mixed-direction
  names and bounded Workspace overlays. Existing control order and the 880-pixel boundary remain.
- Reduced motion: **PASS** — scoped `.nx-core-shell` transitions/animations reduce to effectively
  zero while drawer/search/status changes remain immediately visible.
- The first theme run identified existing token contrast failures. Bounded overrides of the
  existing `--text-3`, `--pos`, and dark `--accent` tokens are scoped to `.nx-core-shell`; Commerce
  is not targeted, no theme system/key is added, and all 16 rows pass after the correction.
- Full matrix and methods are in `evidence/accessibility-localization-matrix.md`.
- Manual current-stable NVDA/current-stable Chrome on Windows: **BLOCKED** because this execution
  environment is Linux/WSL with no Windows/NVDA runner. Exact versions and human announcement
  observations are not fabricated. T047 remains incomplete and release is blocked.

## Phase H — Validation Recovery Results

**Execution date**: 2026-07-14  
**Decision**: **READY FOR WINDOWS VALIDATION — T046 and T048 pass; T047 is environment-blocked**

### T046 Core and Commerce regression

- Core inventory: **PASS — 97/97** when the complete config inventory is executed in bounded groups
  to fit the local command window: T005/T006 14/14; T007/T010/T011 18/18; T017 13/13; T021/T028
  18/18; T036/T039 10/10; required Phase G matrix 16/16; translation/boundary/motion 6/6; fixture
  contract 1/1; performance sampler 1/1. No retry masks a failure.
- Commerce `commerce-044.spec.ts`: **PASS — 1/1** in 19.8 seconds with retries disabled. The
  investigation in `evidence/t046-commerce-regression.md` established that Feature 048 intentionally
  changed branch-card presentation to the resolved operational address and that new branches inherit
  Workspace country `Egypt`; its older exact `Cairo` assertion was therefore synchronized to exact
  `Cairo, Egypt`. The assertion remains strict. No Commerce application, fixture, route, storage key,
  seeded ID, or runtime behavior changed. The WSL run used a temporary headless/no-slow-motion
  configuration with the existing `localhost:3002` origin, and that file was deleted after execution.
- T046 is complete. The full Core inventory and existing Commerce regression pass without retries.

### T047 accessibility

Automated Axe, keyboard, touch, focus, reduced-motion, direction, theme, state, and announcement
checks pass as recorded. The required manual Windows/NVDA/Chrome pass cannot run inside WSL. T047
remains unchecked with status **Blocked by Environment — Waiting for Windows Validation**; it is
neither passed nor failed. The manual handoff is `docs/12-release/WINDOWS-VALIDATION.md`.

### T048 performance

`evidence/performance-comparison.json` retains the earlier failed investigation, one predeclared and
discarded warm-up group, and all raw samples from five controlled production groups on one persistent
server. Their route medians are 118.28, 117.17, 143.50, 112.74, and 108.92 ms; the median is 117.17 ms
versus the 106.58 ms baseline, a **9.94%** increase that passes the approved 10% changed-route gate.
Browser event-to-visible-feedback is **PASS — 50/50 (100%) at or below 100 ms**. No optimization was
required or applied. T048 is complete.

This recovery pass was expressly limited to T046–T048. T049–T054 remain outside this pass and were
not started. T050 also remains dependency-blocked by the environment-blocked T047. No Design Memory,
usability, rollback, final Constitution completion, or release approval claim is made here.

### Recovery final gate ledger

| Gate | Result |
|---|---|
| Root lint | **PASS** — Core, Commerce, and Landing; 3/3 Turbo tasks. |
| Root `pnpm typecheck` | **COMMAND UNAVAILABLE** — the repository has no root script; command executed and returned `Command "typecheck" not found`. |
| Existing strict TypeScript | **PASS** — Core, Commerce, and Landing `tsc --noEmit` exit 0. |
| Root production build | **PASS** — Core, Commerce, and Landing; 3/3 Turbo tasks. |
| Core Playwright final rerun | **PASS — 97/97** in 1.9 minutes, one worker, retries 0. |
| Commerce Playwright final rerun | **PASS — 1/1** in 23.2 seconds, one worker, retries 0. |
| Boundary/architecture scan | **PASS** — no route add/delete, protected key/seed diff, Commerce runtime diff, cross-app import, shell write, forbidden package/frozen-source change, Repository, canonical Business addition, BusinessUnit migration, or OSEnablement replacement. |
| Whitespace | **PASS** — `git diff --check`. |

The final WSL-aware release handoff is `docs/12-release/FEATURE-050-VALIDATION-REPORT.md` and its
native Windows checklist is `docs/12-release/WINDOWS-VALIDATION.md`.
