# Implementation Plan: Core Platform Application Shell Stabilization and Enhancement

**Branch**: `050-core-shell-stabilization` | **Date**: 2026-07-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/050-core-shell-stabilization/spec.md`
**Approved design**: DP-050-01 Proposal A — Conservative Stabilization
**Approval**: Product Owner — Feature 050 approved-design directive, 2026-07-14

## Summary

Stabilize the existing Core Platform application shell incrementally without replacing its current
topbar/sidebar composition, routes, control placement, browser storage, seeded IDs, mock data,
redirect behavior, `useApp` page facade, BusinessUnit-as-Business compatibility, or application
boundaries. Characterize current behavior and local performance first; then improve semantics,
focus, mobile drawer behavior, stale-context recovery, Core-only destination search, read-only
notification projection, profile/locale/theme controls, shell states, bilingual direction, reduced
motion, and documentation evidence.

Implementation is frontend-only and uses the smallest app-local typed presentation seam over the
existing mock facade. There is no backend, Laravel, database, real API, SDK/auth package work,
canonical organization migration, `OSEnablement` successor, cross-application handoff redesign,
shared shell extraction, command palette, breadcrumb, or AI Assistant.

The feature specification, plan, and Phase 0 Compatibility Map are approved. The Product Owner
explicitly authorized the Phase A T001–T009 implementation slice on 2026-07-14.

## Technical Context

**Language/Version**: TypeScript 5 strict mode, React 19.2.4
**Primary Dependencies**: Next.js 16.2.6 App Router, Tailwind CSS 4/current CSS theme files,
Lucide React 1.14, current `@nexoraxs/ui`, `@nexoraxs/shared`, and `@nexoraxs/types` workspace
packages
**Storage**: Existing browser `sessionStorage` and `localStorage` only, through the current
`useApp`/shared mock storage path; no new key, store, database, or canonical model
**Testing**: Playwright 1.61 with a separate Core configuration; `@axe-core/playwright` for
automated accessibility checks; manual keyboard/screen-reader/visual evidence; ESLint, TypeScript,
Core production build, Commerce boundary regression, and `git diff --check`
**Target Platform**: Current supported modern browser web application; Playwright Chromium
automation plus manual current-stable NVDA/current-stable Google Chrome validation on Windows,
with exact execution versions recorded
**Project Type**: Frontend web application in the existing monorepo
**Performance Goals**: Establish empirical local baselines first; no changed shell route may have a
median readiness regression greater than 10% under identical conditions; at least 95% of measurable
local mock interactions must expose visible/semantic feedback within 100 ms
**Constraints**: DP-050-01 Proposal A only; preserve routes, order, placement, storage keys, seeded
IDs, mocks, redirects, current facade behavior, legacy BusinessUnit compatibility, app boundaries,
and working visuals; WCAG 2.2 AA; English/Arabic and LTR/RTL; light/dark; reduced motion; no
backend/API/SDK/auth/database or material redesign
**Scale/Scope**: Six dashboard routes, nine related entry/auth/onboarding routes, the active Core
shell composition, five topbar entry points, mobile/persistent navigation, and presentation-only
context/search/notification/state seams

Named frameworks remain subordinate repository implementation choices; this plan does not promote
them into frozen architecture.

## Constitution Check

*GATE: evaluated before research and re-evaluated after design. `BLOCKED` stops the affected work;
N/A includes a reason.*

| Gate | Before research | After design |
|---|---|---|
| Frozen authority | **PASS** — Core Platform v1.0/Documentation Baseline v1.0.1 and ADR-002, ADR-004, ADR-020, ADR-023, ADR-024, ADR-025, ADR-033, ADR-034, ADR-035, ADR-037, ADR-038, and ADR-040 control. DP-050-01 Proposal A is the only approved UI direction. | **PASS** — research, presentation model, contracts, phases, tests, and rollback remain within the frozen boundary. The legacy hierarchy conflict is cited and quarantined rather than resolved. |
| Ownership | **PASS** — Core owns Core shell/navigation/search coordination; no canonical writes are affected; Commerce retains Commerce facts and Core Notification Service retains canonical Notification ownership. | **PASS** — the notification/context/search seams are read-only presentation projections and Core-local. No owner transfer or source-of-truth copy is designed. |
| Organization and tenancy | **PASS** — global shell is Workspace-only; stored IDs are untrusted inputs; BusinessUnit-as-Business remains Legacy-compatible; canonical migration is stopped. | **PASS** — `ShellContextSnapshot/View` validates ancestry without inference or mutation; the model contains no canonical Business or migration mapping. |
| OS independence | **PASS** — no OS requires another OS, no cross-app source import is authorized, and Core does not write Commerce facts. | **PASS** — all new behavior remains in `apps/core-platform`; `packages/ui` remains presentation-only; boundary tests preserve independent apps. |
| Knowledge and AI order | **N/A** — no Capability, Knowledge, Rule, Business Brain, Recommendation, or AI behavior is in scope; AI search/entry is prohibited. | **N/A** — no intelligence entity, contract, prompt, action, or entry point appears in the design. |
| Lifecycle separation | **N/A** — the feature changes no entitlement, subscription, installation, setup, configuration, activation, readiness, access, pause, archive, or removal state. | **N/A** — the design introduces no lifecycle aggregate and leaves the `OSEnablement` successor unresolved. Existing lifecycle presentation is preserved. |
| Contracts and compatibility | **PASS** — current routes, keys, IDs, mock shapes, redirects, handoffs, and page-facing facade are protected. | **PASS** — contracts are additive app-local presentation contracts only; no public API, repository, breaking change, or unapproved migration exists. |
| Security and operations | **PASS** — mock guards are compatibility UX, not production authorization; invalid context, safe error disclosure, recovery, and testable outcomes are required. Canonical Audit/production telemetry are N/A because there are no consequential writes/backend changes. | **PASS** — context errors reveal no foreign records, retries are read-only, local measurement does not claim a production SLO, and no fake Audit/telemetry is introduced. |
| Product quality | **PASS** — English/Arabic, LTR/RTL, light/dark, reduced motion, keyboard, semantics, assistive technology, touch, and required viewports are mandatory. | **PASS** — the full 16-combination matrix plus keyboard, screen-reader, and reduced-motion passes is planned with exact evidence. |
| Verification | **PASS** — characterization precedes corresponding change; route, redirect, persistence, drawer, controls, notifications, stale context, boundary, and performance evidence is required. | **PASS** — Phase A establishes the harness/baseline; every later phase declares exact validation and rollback. Backend/API/domain integration tests are N/A because those layers do not change. |
| Documentation sync | **PASS** — feature artifacts, design approval, test evidence, and deferred decisions must stay synchronized without rewriting history. | **PASS** — Phase H names the Design Memory, Core README, feature evidence, and Spec Kit artifacts; D-22, D-23, D-30, and D-42 remain unresolved. |

**Pre-research verdict**: **PASS** — no architectural gate blocks bounded planning.
**Post-design verdict**: **PASS** — the design stays read-only, app-local, compatible, testable, and
reversible.
**Implementation approval gate**: **PASS** — `spec.md`, this plan, DP-050-01 Proposal A, the Phase 0
audit evidence, and entry into Phase A T001–T009 were explicitly approved by the Product Owner on
2026-07-14. The Phase 0 Compatibility Gate is approved at evidence revision `phase0-r1`.

## Governing Sources and Stopped Boundary

- `docs/99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md`
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.0.1-READINESS.md`
- Accepted ADR-002, ADR-004, ADR-020, ADR-023 through ADR-025, ADR-033 through ADR-035,
  ADR-037, ADR-038, and ADR-040
- `docs/02-core-platform/00-CORE-PLATFORM-PRINCIPLES.md`
- `docs/02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md`
- `docs/02-core-platform/04-DATA-OWNERSHIP.md`
- `docs/02-core-platform/08-SECURITY-MODEL.md`
- `docs/02-core-platform/09-OBSERVABILITY.md`
- `docs/02-core-platform/11-TECHNOLOGY-STACK.md`
- `.specify/memory/constitution.md`, `AGENTS.md`, implementation audit, Design Intelligence, and
  execution standards cited in [research.md](./research.md)

ADR-004 requires `Workspace -> Business -> Business Unit -> Department/Branch`; the implementation
has no canonical Business and presents a `BusinessUnit` as Business. This feature preserves that
lower-authority behavior as Legacy-compatible and stops at any rename, duplicate Business,
migration, inference, or re-parenting request. Independent shell stabilization proceeds outside
that stopped boundary.

## Project Structure

### Documentation for this feature

```text
specs/050-core-shell-stabilization/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── shell-presentation-contracts.md
├── evidence/                         # created during execution, not by this plan command
│   ├── characterization.md           # created in Phase 0; extended in Phases A–H
│   ├── accessibility-localization-matrix.md
│   ├── design-quality-checklist.md
│   ├── performance-baseline.json
│   ├── performance-comparison.json
│   ├── usability-validation.md
│   └── rollback-validation.md
└── tasks.md                           # generated later by /speckit.tasks
```

### Implementation surface

```text
apps/core-platform/
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── apps/page.tsx
│   │   ├── billing/page.tsx
│   │   ├── integrations/page.tsx
│   │   ├── settings/page.tsx
│   │   └── team/page.tsx
│   └── globals.css
├── components/
│   ├── dashboard/
│   │   ├── LocaleToggle.tsx
│   │   ├── NotificationsDropdown.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── UserMenuDropdown.tsx
│   └── shell/
│       ├── ContextSwitcher.tsx
│       ├── CoreShell.tsx
│       ├── Shell.tsx
│       ├── ShellSearch.tsx            # new, only because search behavior is missing
│       └── ShellStateNotice.tsx       # new, only because shell states are missing
└── lib/
    ├── shell/
    │   ├── contracts.ts               # new presentation types only
    │   ├── presentation.ts            # new pure context/search/notification mapping
    │   └── useShellPresentation.ts     # new additive useApp compatibility adapter
    └── store/AppProvider.tsx

packages/shared/src/mock-db/schema.ts   # translation keys only; storage constants unchanged
packages/ui/src/styles/core-theme.css   # existing Core-only shell theme; scoped changes

playwright.core.config.ts               # new Core-only test/performance configuration
tests/e2e/
├── fixtures/core-050.ts                # new deterministic browser-state scenarios
├── core-050-shell.spec.ts              # new characterization/acceptance/a11y suite
├── core-050-performance.spec.ts        # new local comparable measurements
└── commerce-044.spec.ts                # unchanged regression boundary
```

**Structure Decision**: Keep all shell behavior inside `apps/core-platform`; use existing shared
presentation tokens/styles and current mock packages without moving ownership. Add a separate Core
browser-test harness at repository level because the existing Playwright configuration is
Commerce-only and timing-invalid for this feature.

## 1. Existing Screen Inventory

All routes currently use the root `AppProvider`. Dashboard routes additionally use
`app/dashboard/layout.tsx -> CoreShell -> Shell`. No Core app `loading.tsx`, `error.tsx`, or
`not-found.tsx` exists, and no Core automated shell test exists.

| Path/surface | Current purpose | Shell/layout usage | Classification | Visible issues | Responsive issues | RTL/LTR issues | Accessibility issues | Test coverage | Planned treatment |
|---|---|---|---|---|---|---|---|---|---|
| `/` | Server entry redirect | Root layout only; redirects to `/login` | Keep | No shell UI | N/A | N/A | Redirect must remain understandable through destination | None | Characterize exact redirect; no change. |
| `/login` | Mock authentication and post-login routing | `AuthShell`, not dashboard shell | Legacy-compatible | Mock-only security; hard-coded copy outside this shell scope | Existing auth responsiveness retained | Partial English-only behavior | Existing auth semantics are outside 050 changes | None | Characterize: complete -> `/dashboard/apps`, incomplete -> `/onboarding`; preserve behavior. |
| `/register` | Mock user creation and verification entry | `AuthShell` | Legacy-compatible | Hydrated authenticated state can render null before redirect | Existing behavior retained | Partial localization | Redirect/focus behavior is not covered | None | Characterize `/verify` and `/welcome` transitions; no redesign. |
| `/verify`, `/verify-email` | Alias and mock email verification | `/verify` re-exports `verify-email`; `AuthShell` | Legacy-compatible | Duplicate alias is compatibility behavior | Existing auth behavior retained | English copy | Auto-submit and redirect announcements need characterization only | None | Preserve both paths and `/register`/`/welcome` outcomes; do not remove alias. |
| `/welcome` | Authenticated pre-onboarding Workspace introduction | Welcome layout, not dashboard shell | Legacy-compatible | Current Workspace copy is implementation legacy | Existing mobile card behavior retained | English-only copy | CTA/focus route transition untested | None | Preserve unauthenticated `/login` redirect and CTA `/onboarding`; characterize only. |
| `/onboarding` | Current mock Workspace/OS/plan/legacy BusinessUnit/Branch setup | Onboarding shell, not `CoreShell` | Legacy-compatible | Contains protected lifecycle and BusinessUnit compatibility behavior | Current multi-step responsiveness retained | Partial Arabic path only | Complex flow is outside shell changes | None | Characterize all entry/finish/back/sign-out destinations and storage; no lifecycle/hierarchy redesign. |
| `/forgot-password`, `/reset-password` | Mock credential recovery | `AuthShell` | Keep | Outside active shell | Existing behavior retained | English-only | Existing form behavior outside 050 | None | Preserve `/login?reset=success`; characterize redirect only. |
| Dashboard guard/loading | Hydration, auth, onboarding checks | `app/dashboard/layout.tsx` before `CoreShell` | Improve | Fixed dark spinner; stale Workspace can look like incomplete onboarding | Full-screen but not theme-aware | No localized status | No name, role, text, recovery, or reduced-motion alternative | None | Preserve true auth/onboarding destinations; distinguish completed-but-stale context after characterization; add named theme-safe status/recovery. |
| `/dashboard` | Compact OS overview, storage, current Commerce open/setup handoff | Active `CoreShell`; not a sidebar link; page adds duplicate scroll wrapper | Keep | Duplicates some Product Hub content; current projections/handoff are protected | Auto-fill grid plus nested padding; topbar risk inherited | English copy; physical arrow | Storage progress lacks complete semantics | None | Preserve URL, absence from sidebar, data, and handoff; remove only nested scroll ownership and improve bounded state semantics. |
| `/dashboard/apps` | Product Hub, subscription summary, current Commerce/future OS cards, activity and quick links | Active `CoreShell`; first sidebar item; duplicate page scroll wrapper | Keep | Raw legacy BU/Branch/`OSEnablement` and Commerce projections; inert notify actions | Several row/button groups can crowd; detail/grid breakpoints exist | English copy; physical chevron | Badges/progress and inert actions need clearer semantics | None | Preserve route, content, IDs, Business labels, and handoffs; shell/state/responsive semantics only. |
| `/dashboard/billing` | Platform subscription, limits, billing details, mock invoice | Active `CoreShell`; sidebar/profile/search destination; duplicate wrapper | Keep | Mock actions; icon-only actions unnamed | Fixed 4/3/2-column regions and hidden-overflow table risk clipping at 375/768 | Mostly logical alignment but untranslated | Ellipsis/download names and progress semantics incomplete | None | Preserve subscription distinction/mock outcomes; bounded container, naming, and reflow fixes only. |
| `/dashboard/team` | Mock member table, invite and permission modals | Active `CoreShell`; sidebar/profile/search destination; duplicate wrapper | Keep | Active invite reads deprecated `core_bu_name`/`core_branch_name`; inert row action | Table hides overflow; modal grids lack narrow adaptation | Physical `marginLeft`; English | Modal semantics, Escape, trap/restore, close names incomplete | None | Preserve route/team outcomes and deprecated-key compatibility; 050 changes only shared shell/container focus if required. |
| `/dashboard/integrations` | Coming-soon cards and mock notify toast | Active `CoreShell`; sidebar/search destination; duplicate wrapper | Keep | Emoji icons and no real integration; must not imply runtime work | Grid generally collapses; nested padding remains | English and visual arrow glyph | Emoji meaning/decorative intent unclear | None | Preserve coming-soon/mock behavior; no integration implementation; shell-only stabilization. |
| `/dashboard/settings` | Workspace, locale, theme, Team/Billing links, mock advanced settings | Active `CoreShell`; sidebar/profile/search destination; duplicate wrapper | Keep | Save is mock toast; tab-like buttons lack selected semantics | Fixed 200px/2-column regions lack compact adaptation | Explicit `textAlign: left`; English | Repeated controls and visual tabs need state semantics | None | Preserve route/sections/mock behavior; use existing settings destinations in search; no new settings architecture. |
| Shell-level empty/error/unauthorized/recovery | Not currently present | No file/component | Missing | Users get spinner/generic absence | No responsive contract | No bilingual/directional contract | No semantic distinction or recovery | None | Create one app-local presentation-only `ShellStateNotice`; do not invent backend errors or canonical authorization. |

Cross-route structural issue: `Shell` already owns `.nx-main-scroll`, while all six dashboard pages
add another `.nx-main-scroll` and most another `.nx-page`. Phase F leaves one scroll owner and
preserves equivalent page width/padding to satisfy FR-015 without a layout redesign.

## 2. Existing Component Inventory

Classifications use only the official vocabulary from `spec.md`: Keep, Improve, Reconcile,
Legacy-compatible, Remove later, or Missing. Historical component terms map through the crosswalk
in the specification and are not additional classifications.

| Component/file | Current role and evidence | Classification | Planned treatment |
|---|---|---|---|
| `components/shell/CoreShell.tsx` | Supplies the preserved five-item Core nav order and localized existing labels | Keep | Keep composition/order. Add typed metadata only if the same data must feed search; do not replace or duplicate. |
| `components/shell/Shell.tsx` | Active topbar/sidebar/drawer/scrim/main/footer sign-out composition | Improve | Add landmarks, skip link, typed icon map, `aria-current`, transient-surface coordination, focus/keyboard behavior, compact handling, and same-placement search. |
| Inline sidebar/navigation in `Shell` | No standalone component exists | Improve | Keep inline structure and current CSS classes; do not create a duplicate Sidebar/Nav component. |
| Inline topbar controls in `Shell` | Brand, burger, search, locale, theme, bell, profile in fixed order | Improve | Preserve order/placement; adapt compact sizing/wrapping/visibility only within DP-050-01. |
| `components/shell/ContextSwitcher.tsx` | Core mode correctly displays Workspace; dormant commerce mode contains legacy BU/Branch choices | Reconcile | Consume validated read-only Workspace presentation; add popup/focus semantics; do not add global Business/BU/Branch. Preserve dormant branch without expansion. |
| `components/dashboard/NotificationsDropdown.tsx` | Reads filtered products/orders/plan directly and renders current read-only outcomes | Reconcile | Map current values through the read-only presentation adapter; preserve order/indicator/empty behavior first; improve semantics/focus/localization. |
| `components/dashboard/UserMenuDropdown.tsx` | Existing Account/Billing/Team/logout outcomes | Improve | Preserve destinations and sign-out; add expanded/popup/Escape/keyboard/focus restoration. |
| `components/dashboard/LocaleToggle.tsx` | Active `useApp.lang/setLang`, `aria-pressed` | Improve | Preserve EN/AR order, values, and key; add group/name/type/touch/focus/localized semantics. |
| `components/dashboard/ThemeToggle.tsx` | Active `useApp.theme/toggleTheme`, dynamic accessible label | Improve | Preserve values/key/icon behavior; validate focus/state in both themes/directions. |
| `app/dashboard/layout.tsx` inline loader | Current hydration/redirect fallback | Improve | Preserve redirect destinations; render the bounded state component for accessible status/recovery. |
| `components/shell/ShellSearch.tsx` | No functional search component exists | Missing | Create only after Phase 0 evidence confirms the current shell has no component that satisfies the bounded destination-search contract; not a command palette. |
| `components/shell/ShellStateNotice.tsx` | No shell loading/empty/error/unauthorized/recovery component exists | Missing | Create only after Phase 0 evidence confirms no current persistent state component satisfies the contract; no business decision or backend simulation. |
| `components/ui/Toast.tsx` | Existing transient alert/live host | Keep | Keep for existing toasts; do not use as the sole persistent shell recovery UI. Test duplicate announcements/reduced motion before any change. |
| Local `Avatar.tsx`, `BrandMark.tsx` | Existing profile/context visual identity | Keep | Reuse; no new avatar/brand component. |
| `components/dashboard/BranchPill.tsx` | Imported only for dormant `Shell mode="commerce"` | Remove later | Do not use, expand, or remove in 050. |
| `components/dashboard/Topbar.tsx` | Explicitly deprecated and unused by active layout | Remove later | Do not revive or remove. |
| `LanguageSwitcher.tsx`, `CoreProvider.tsx`, `DashboardOnboardingGuard.tsx` | Superseded/unreferenced compatibility paths | Remove later | Preserve files/keys; do not switch active shell back. |
| `lib/locale.ts`, `lib/core-theme.ts`, `lib/core-session.ts` | Deprecated helpers with separate `core_*` keys; some keys remain indirectly live | Remove later | Do not consolidate, rename, remove, or create competing keys. |
| `EnableModal.tsx` | Unused legacy enable/activate UI at unresolved lifecycle boundary | Remove later | Never revive/remove/expand in this feature. |
| `OnboardingStepper.tsx` and old onboarding step components | Deprecated/unreferenced paths | Remove later | Preserve untouched. |
| `PhaseStepper.tsx` | Active onboarding step presentation | Keep | Outside shell stabilization. |
| `InviteUserModal.tsx` | Active Team modal; reads deprecated BU/Branch keys | Keep | Keep untouched unless a shell focus fix demonstrably requires a compatibility wrapper; no migration in 050. |
| `@nexoraxs/ui` Core theme/tokens | Active presentation-only shell styles | Improve | Scoped `.nx-app-root` focus/responsive/reduced-motion changes only; no palette/type/token redesign. |
| `@nexoraxs/ui` `NexoraLogo`/branding | Uses current top logo asset | Keep | May replace the raw image only if characterization proves pixel/alt/size parity; no new logo. |
| `@nexoraxs/ui` `Icon` | Typed icon primitive, but lacks active `layout-grid`/`plug` names | Keep | Do not force it into active nav or widen it for this feature; use a typed app-local Lucide map. |
| `@nexoraxs/ui` `Button`, `Input`, `Card`, `Badge`, `Logo` | Shared presentation primitives not used by the active shell; some APIs lack required combobox/ref props and `Logo` carries deprecated `shops` naming | Keep | Reuse at existing consumers only; do not modify or duplicate merely to claim reuse. Native controls/current classes are the lower-risk shell choice. |

No existing component is replaced or duplicated. The two new components are justified by missing
functional search and missing state presentation; both remain Core-local.

## 3. Reuse Map

| Planned behavior | Existing component | Existing hook/store/facade | Existing shared primitive/style | Required bounded improvement | Why a new component is/is not required |
|---|---|---|---|---|---|
| Route list/current destination | `CoreShell`, inline nav in `Shell` | `usePathname`, current `navGroups` | Existing nav classes/Lucide | Add typed active matching and `aria-current`; preserve order/URLs | No new nav/sidebar; behavior already exists. |
| Mobile drawer | `Shell` sidebar/scrim | Local `sidebarOpen` | `.nx-sidebar`, `.open`, `.nx-shell-scrim` logical CSS | IDs, expanded state, explicit close, Escape, containment, restoration, route/breakpoint closure | No new drawer; structure and visuals work. |
| Workspace context | `ContextSwitcher` | Current `useApp` data plus additive shell snapshot | Existing Avatar/BrandMark/context styles | Read-only ancestry/status evaluation and recovery presentation | No new selector; add compatibility seam because validation is missing. |
| Core search | Existing topbar input placement | Nav metadata/current presentation catalog | Native input + existing dropdown styles | Query/result/empty/unavailable model and keyboard behavior | `ShellSearch` is required because no functional component exists; it occupies the same placement. |
| Notifications | `NotificationsDropdown` | Current filtered products/orders/plan/money | Existing icons/dropdown styles | Pure read-only projection; popup semantics/localization/focus | No new notification UI; adapter is data seam, not component replacement. |
| Profile | `UserMenuDropdown` | `useRouter`, `logoutUser`, current actor | Local Avatar/dropdown styles | Menu semantics, Escape, focus/compact behavior | No new component. |
| Locale | `LocaleToggle` | `useApp.lang/setLang`; existing document effect | Current language switch styles | Localized names, group, touch/focus, open-surface behavior | No new locale switcher; deprecated one stays unused. |
| Theme | `ThemeToggle` | `useApp.theme/toggleTheme`; existing document effect | Current theme tokens/icons | Focus/state/readability/reduced-motion validation | No new theme switcher; deprecated helper stays unused. |
| Loading/recovery | Dashboard layout inline fallback | `isHydrated`, auth/onboarding state, shell context | Existing semantic tokens | Named loading plus empty/error/unauthorized/unavailable/recovery | `ShellStateNotice` is required because no equivalent exists. |
| Transient popup dismissal/focus | Context/notification/profile/search components | App-local hook/state within `useShellPresentation` only where shared | Existing dropdown classes | One consistent Escape/outside/restore contract | No shared package primitive; reuse a small Core-local behavior helper only if implementation proves repeated code. |
| Branding | Current logo image/`NexoraLogo` | N/A | Existing brand asset | Preserve dimensions/alt in all widths | No new logo. |
| Localization strings | Existing `t()` path | `useApp.t` and `schema.ts` dictionary | N/A | Add only affected shell keys in EN/AR | No new i18n system. |

## 4. Mock Data and Compatibility Map

### Active storage contract

| Storage | Keys | Required treatment |
|---|---|---|
| `sessionStorage`, JSON through current adapter | `nexoraxs.session.currentUserId`, `.currentWorkspaceId`, `.currentOSSubscriptionId`, `.currentBusinessUnitId`, `.currentBranchId`, `.currentOSId`, `.onboardingState`, `.entryContext`, `.locale`, `.demo` | Preserve exact names, formats, defaults, values, and reset behavior. Shell tests may seed them only in isolated browser contexts. |
| `sessionStorage`, raw compatibility | `nx_last_order_id` | Untouched. |
| `localStorage`, JSON collections | `nexoraxs.db.users`, `.workspaces`, `.branches`, `.osSubscriptions`, `.osEnablements`, `.businessUnits`, `.commerceSetups`, `.teamMembers`, `.commerceProducts`, `.commerceOrders`, `.commerceCustomers`, `.commerceInvoices`, `.branchInventory`, `.stockMovements`, `.stockTransfers`, `.commerceReturns`, `.mediaAssets`, `.workspaceStorageUsage` | Untouched names/shapes/ownership. Core shell reads only through existing facade values. |
| `localStorage`, raw UI | `nexoraxs.ui.theme` | Preserve `light`/`dark`; no new theme key. |
| Deprecated session compatibility | `core_theme`, `core_workspace_name`, `core_workspace_country`, `core_workspace_currency`, `core_workspace_timezone`, `core_bu_name`, `core_bu_industry`, `core_branch_name`, `core_branch_city`, `core_branch_country`, `core_onboarding_done`, `core_locale` | Do not remove, rename, consolidate, or write a third competing value. |

The demo flag values `1`/`true` continue to seed the current database and remove only the demo flag.
Logout continues to remove only the current user ID.

### Stable identifiers and records

- Actor/user: `user_001`
- Workspace: `ws_001` (`Mustafa Group`)
- OS subscription: `sub_001`
- Legacy Business-labelled BusinessUnit: `bu_001` (`Mustafa Pharmacy`)
- Branch: `br_001` (`Smouha Branch`)
- Legacy enablement: `ose_001`
- Team/setup: `tm_001`, `cs_001`
- Products: `p1`, `p2`
- OS IDs: `commerce`, `healthcare`, `hr`, `crm`, `gym`, `maintenance`
- Plan IDs: `commerce_starter`, `commerce_pro`, `commerce_business`
- All existing preset IDs and mock values remain unchanged.

### Current `useApp` interface

Preserve additively:

- hydration/session/current actor, Workspace, Branch, BusinessUnit, subscription,
  `OSEnablement`, onboarding;
- locale/theme/toasts;
- derived authentication/onboarding/Commerce state, filtered BusinessUnits/Branches/Commerce
  collections, plan/storage/currency/translation helpers;
- current auth, Workspace, onboarding, setup, Commerce, and context mutation actions;
- `setCurrent` current behavior for existing page consumers.

The only permitted addition is the minimum read-only context snapshot/presentation value consumed
by `useShellPresentation`. Leaf pages keep their current interface and import.

### Current notification source

`NotificationsDropdown` currently derives, in order, plan status, out-of-stock products, low-stock
products, and latest order from `products`, `orders`, `COMMERCE_PLAN`, and `money`. Products/orders
are filtered by current BusinessUnit. The initial adapter preserves current ordering, threshold,
indicator, and empty behavior exactly, labels Commerce-derived items as compatibility projections,
and exposes no writes.

### Invalid/stale behavior to characterize before reconciling

- Malformed JSON silently falls back to empty/default values.
- Stale user ID becomes unauthenticated and redirects to `/login`.
- Stale Workspace currently makes onboarding incomplete and redirects to `/onboarding`.
- Stale BusinessUnit/Branch can yield null current values and empty filtered projections without
  recovery UI.
- Current entities are found globally by ID; a cross-Workspace BusinessUnit/Branch may resolve even
  when scoped lists exclude it.
- `setCurrent` accepts client IDs and may silently select a main/first Branch when BusinessUnit
  changes.

Phase A freezes this baseline. Phase D changes only shell presentation: true incomplete onboarding
keeps `/onboarding`, while completed mock onboarding with stale/cross-scope context receives an
explainable read-only recovery state. It does not clear, rewrite, infer, or silently select IDs.

### Explicitly untouched

- Browser keys, storage locations, formats, mock collections, seeds, IDs, catalog/preset values
- Current `useApp` page-facing behavior and Commerce actions
- Authentication/onboarding journeys except the approved stale-context presentation distinction
- Current Core-to-Commerce URL helpers/handoff
- BusinessUnit type/name/ID/storage and its existing Business label
- Legacy `OSEnablement` records/semantics
- Backend, Laravel, database, SDK/auth, infrastructure, and production authorization/telemetry

## 5. Bounded Architecture

```text
Core shell components
  -> useShellPresentation (Core-local, typed, additive)
       -> current useApp facade (unchanged page-facing compatibility)
       -> pure context/search/notification presentation mapping
            -> existing mock values and current route metadata
```

Allowed seams:

1. `lib/shell/contracts.ts`: presentation types from [data-model.md](./data-model.md).
2. `lib/shell/presentation.ts`: pure context evaluator, static destination filter, and read-only
   notification mapper.
3. `lib/shell/useShellPresentation.ts`: adapter that selects the minimum existing `useApp` fields
   and callbacks.

No seam may:

- become a generic Repository, storage abstraction, SDK, API client, or service locator;
- write canonical organization, Notification, subscription, or Commerce state;
- import another app or expose raw browser storage to components;
- define canonical Business or an `OSEnablement` successor;
- move shell/context/search/notification logic into `packages/ui` or `packages/shared`;
- replace `useApp` for leaf pages or broadly decompose the provider.

Core shell presentation never creates or updates Product, Inventory, Stock Movement, Transfer,
Order, POS Transaction, Customer, Payment, Refund, Tax, Invoice, Receipt, Return, Exchange, or
other Commerce operational facts.

## 6. Characterization Strategy

Phase A tests current behavior before corresponding implementation files change.

| Concern | Baseline scenarios | Protected evidence |
|---|---|---|
| Current routes | Six dashboard URLs, current five sidebar links/order, `/dashboard` absent from sidebar, refresh, back/forward | URLs, headings, active visuals, route order, current handoffs |
| Auth/onboarding redirects | unauthenticated, authenticated/incomplete, completed onboarding, register/verify/welcome transitions | Exact destinations and mock timing behavior |
| Context persistence | valid Workspace/BU/Branch, refresh/navigation, malformed JSON, stale IDs, cross-scope ancestry | Exact keys/IDs, current null/fallback/redirect behavior, no mutation during read |
| Theme | light/dark load and switch | `nexoraxs.ui.theme`, `<html data-theme>`, current icon/visual state |
| Locale | English/Arabic load and switch | `nexoraxs.session.locale`, `<html lang/dir>`, current labels |
| Mobile drawer | 375/768 open, link close, scrim close; current lack of Escape/trap is recorded | Existing class/transition/direction and route behavior |
| Profile menu | Settings, Billing, Team, sign-out | Exact URLs/logout behavior and focus baseline |
| Notifications | plan, out/low stock, latest order, indicator, empty | Item count/order/text/source values/indicator quirks |
| Search unavailable state | type into current placeholder | No results/navigation/side effect; establishes approved before/after boundary |
| BusinessUnit compatibility | `bu_001`, label Business, Product Hub counts/names | Type, ID, key, labels, no Business entity |
| Invalid/stale recovery | stale Workspace/BU/Branch and cross-scope tuple | Existing redirect/null/leak risk; later recovery must be explainable and read-only |

Test harness rules:

- Dedicated `playwright.core.config.ts`, Core port 3001, one worker for measurements, no `slowMo`.
- Deterministic isolated browser storage fixtures; never mutate developer browser storage.
- Existing `playwright.config.ts` and `commerce-044.spec.ts` remain unchanged.
- Axe/role/name/state automation plus manual keyboard/screen-reader verification.
- Characterization assertions that describe an approved defect are changed only when the relevant
  later phase implements the specified improvement.

## 7. Implementation Phases

Every phase is independently reversible and must pass its validation before the next phase starts.
The exact file set may be reduced by tasks but may not expand without updating this plan.

### Phase 0 — Current implementation reconciliation

**Exact write file**:

- `specs/050-core-shell-stabilization/evidence/characterization.md` (created here; extended by
  Phases A–H)

**Read-only audit roots**:

- `apps/core-platform/app/`
- `apps/core-platform/components/`
- `apps/core-platform/lib/`
- `packages/ui/`, `packages/shared/`, and `packages/types/`
- absent package paths `packages/auth/` and `packages/sdk/` (record absence; do not create)
- `tests/e2e/`, `package.json`, and `pnpm-workspace.yaml`

**Dependencies**: Approved Feature 050 specification; approved DP-050-01 Proposal A; current source
unchanged; controlling Freeze, Accepted ADRs, Constitution, and AGENTS.md available.
**Expected behavior**: No product or test behavior changes. A000–A005 source-verify current
components, screens, routes, state, mocks, packages, consumers, keys, IDs, ownership, and reuse
decisions. The six reports form the Feature 050 Compatibility Map using only Keep, Improve,
Reconcile, Legacy-compatible, Remove later, and Missing.
**Regression risks**: An incomplete consumer scan misclassifies a live compatibility path; a
historical term is treated as a new classification; an audit silently authorizes replacement,
migration, ownership transfer, or a missing package.
**Validation**: Every audited item has source evidence, current consumer/status, official
classification, bounded treatment, protected compatibility, and Blocked reason where applicable.
The approval record contains the evidence revision plus approver role/name, decision, and date.
**Rollback**: Correct the audit record with dated evidence; do not alter source code, delete prior
review history, or reclassify a conflict merely to pass the gate.

#### Phase 0 approval contract

- **Required approver**: The Product Owner approves all six maps and the final Compatibility Gate.
  The Architecture Owner must countersign any Blocked boundary/ownership finding; the Design and
  Accessibility reviewers must review the Component and Screen Compatibility Maps.
- **Approval record location**: `evidence/characterization.md`, section `Phase 0 Approval Record`,
  with approver role/name, decision (`APPROVED` or `BLOCKED`), date, evidence revision, and comments.
- **Blocked state**: Any incomplete audit, unknown live consumer, unresolved source conflict,
  missing compatibility evidence, authority conflict, or requested forbidden change records
  `BLOCKED` and prevents T001–T054.
- **Approval criteria**: A000–A005 are complete; every current item uses the official vocabulary;
  routes, redirects, aliases, storage keys, seeded IDs, `useApp`, mock relationships, package
  boundaries, and new-component evidence are source-verified; no architecture or compatibility
  invariant is weakened; all reviewer comments are resolved or explicitly Blocked.

**Phase 0 gate**: **APPROVED 2026-07-14** at evidence revision `phase0-r1`. T001's prerequisite is
satisfied. The Compatibility Map is authoritative for Feature 050 implementation only while
remaining subordinate to the approved `spec.md`, `plan.md`, contracts, Architecture Freeze,
Accepted ADRs, Constitution, and AGENTS.md.

### Phase A — Characterization and baseline measurements

**Exact files**:

- `playwright.core.config.ts` (new)
- `tests/e2e/fixtures/core-050.ts` (new)
- `tests/e2e/core-050-shell.spec.ts` (new)
- `tests/e2e/core-050-performance.spec.ts` (new)
- `package.json`, `pnpm-lock.yaml` (test-only Axe dependency; no runtime dependency)
- `specs/050-core-shell-stabilization/evidence/characterization.md` (existing from Phase 0; extend
  with executable baselines without recreating or replacing the approved maps)
- `specs/050-core-shell-stabilization/evidence/performance-baseline.json` (new during implementation)

**Dependencies**: Approved specification/implementation gate; approved Phase 0 Compatibility Map;
current source unchanged; deterministic mock fixture definitions.
**Expected behavior**: No product behavior change. Phase A extends the approved Phase 0 evidence
with repeatable observations for all protected routes/redirects/keys/IDs/control outcomes and
current defects; initial shell, controls, locale/theme, and route readiness have raw local samples.
**Regression risks**: Test fixture accidentally overwrites non-test data; Core config inherits
Commerce slow motion; timing noise is mistaken for a product regression.
**Validation**: Run Core characterization/performance in isolated contexts; verify current Commerce
test still uses its original config; review stored environment metadata and raw samples.
**Rollback**: Remove only invalid test/evidence additions after review; do not alter product code or
weaken an assertion because it exposes a current defect.

### Phase B — Accessibility and semantic stabilization

**Exact files**:

- `apps/core-platform/components/shell/Shell.tsx`
- `apps/core-platform/components/shell/ContextSwitcher.tsx`
- `apps/core-platform/components/dashboard/NotificationsDropdown.tsx`
- `apps/core-platform/components/dashboard/UserMenuDropdown.tsx`
- `apps/core-platform/components/dashboard/LocaleToggle.tsx`
- `apps/core-platform/components/dashboard/ThemeToggle.tsx`
- `packages/shared/src/mock-db/schema.ts` (translation keys only)
- `packages/ui/src/styles/core-theme.css`
- `tests/e2e/core-050-shell.spec.ts`

**Dependencies**: Phase A characterization; existing labels/routes/control order frozen.
**Expected behavior**: Semantic header/nav/main, skip link, labelled navigation, `aria-current`,
programmatic names/states, visible focus, typed icons, and equivalent current outcomes without
control relocation.
**Regression risks**: ARIA conflicts with native semantics; focus styling changes visuals; shared
translation additions affect another app.
**Validation**: Axe plus manual landmark/name/order/focus review in EN/AR and both themes; route and
storage parity; package consumer build.
**Rollback**: Revert this phase's semantic/style changes as a unit while keeping Phase A tests; do
not restore invalid semantics after a corrected implementation is available.

### Phase C — Responsive drawer and focus stabilization

**Exact files**:

- `apps/core-platform/components/shell/Shell.tsx`
- `packages/ui/src/styles/core-theme.css`
- `tests/e2e/core-050-shell.spec.ts`

**Dependencies**: Phase B landmarks/IDs and characterized 880 px behavior.
**Expected behavior**: Drawer opens from logical start, declares expanded/controlled state, traps
focus only while modal at compact widths, closes by explicit control/link/Escape/scrim/history/
breakpoint, restores focus appropriately, prevents background interaction, and leaves all topbar
controls reachable at 375/768 without changing their order.
**Regression risks**: Focus remains trapped after close/navigation; RTL transform regresses; body
or nested scrolling locks; compact topbar change hides a critical action.
**Validation**: Keyboard/touch tests at 375, 768, 879, 881, 1024, 1440 in both directions; viewport
change while open; no overflow; feedback timing.
**Rollback**: Revert drawer JS/CSS together to characterized class-toggle behavior; retain semantic
trigger improvements that remain valid; never leave inert/focus locks active.

### Phase D — Context validation and recovery presentation

**Exact files**:

- `apps/core-platform/lib/shell/contracts.ts` (new)
- `apps/core-platform/lib/shell/presentation.ts` (new)
- `apps/core-platform/lib/shell/useShellPresentation.ts` (new)
- `apps/core-platform/lib/store/AppProvider.tsx`
- `apps/core-platform/components/shell/ContextSwitcher.tsx`
- `apps/core-platform/components/shell/ShellStateNotice.tsx` (new)
- `apps/core-platform/app/dashboard/layout.tsx`
- `tests/e2e/fixtures/core-050.ts`
- `tests/e2e/core-050-shell.spec.ts`

**Dependencies**: Phase A stale/cross-scope baselines; [contracts](./contracts/shell-presentation-contracts.md);
Phase B semantics.
**Expected behavior**: Valid state remains unchanged; global shell shows Workspace only; true
incomplete onboarding still redirects; completed onboarding with missing/stale/cross-scope context
gets safe, localized explanation and navigation/retry without silent selection, storage rewrite, or
foreign-record disclosure. Existing page-facing `useApp`/`setCurrent` behavior remains intact.
**Regression risks**: Hydration/redirect loop; additive provider field causes rerenders; valid
legacy state is misclassified; recovery clears or normalizes IDs.
**Validation**: Contract assertions for every validation status; E2E for valid/missing/stale/
malformed/cross-scope tuples; before/after key snapshots; no canonical Business; no Commerce write.
**Rollback**: Switch `ContextSwitcher`/layout back to pass-through display as one bounded unit while
keeping storage untouched; leave pure tests and characterization evidence; do not migrate data.

### Phase E — Search, notification, profile, locale, and theme stabilization

**Exact files**:

- `apps/core-platform/components/shell/CoreShell.tsx`
- `apps/core-platform/components/shell/Shell.tsx`
- `apps/core-platform/components/shell/ShellSearch.tsx` (new)
- `apps/core-platform/components/dashboard/NotificationsDropdown.tsx`
- `apps/core-platform/components/dashboard/UserMenuDropdown.tsx`
- `apps/core-platform/components/dashboard/LocaleToggle.tsx`
- `apps/core-platform/components/dashboard/ThemeToggle.tsx`
- `apps/core-platform/lib/shell/contracts.ts`
- `apps/core-platform/lib/shell/presentation.ts`
- `apps/core-platform/lib/shell/useShellPresentation.ts`
- `packages/shared/src/mock-db/schema.ts`
- `packages/ui/src/styles/core-theme.css`
- `tests/e2e/core-050-shell.spec.ts`
- `tests/e2e/core-050-performance.spec.ts`

**Dependencies**: Stable presentation facade from Phase D; characterized notification/profile/
preference behavior; existing destination inventory.
**Expected behavior**: Same-placement Core-only search with query/result/empty/unavailable and
keyboard contract; documentation source empty because none exists; notification output preserved
through read-only adapter; profile destinations/logout and locale/theme keys/values unchanged;
all popups dismiss/focus consistently.
**Regression risks**: Search exposes excluded data or invents links; notification count/order/dot
changes; profile navigation changes; locale/theme creates competing keys or loses focus.
**Validation**: Allowed/disallowed search source tests; exact notification parity fixtures;
destination/key snapshots; EN/AR popup semantics; 100 ms feedback sampling; cross-app/import scan.
**Rollback**: Disable `ShellSearch` back to characterized unavailable input and switch notification
component to the prior projection adapter implementation without changing UI/storage; revert each
topbar control as an independently tested unit.

### Phase F — Loading, empty, error, unauthorized, and recovery states

**Exact files**:

- `apps/core-platform/app/dashboard/layout.tsx`
- `apps/core-platform/app/dashboard/page.tsx`
- `apps/core-platform/app/dashboard/apps/page.tsx`
- `apps/core-platform/app/dashboard/billing/page.tsx`
- `apps/core-platform/app/dashboard/integrations/page.tsx`
- `apps/core-platform/app/dashboard/settings/page.tsx`
- `apps/core-platform/app/dashboard/team/page.tsx`
- `apps/core-platform/components/shell/Shell.tsx`
- `apps/core-platform/components/shell/ShellStateNotice.tsx`
- `apps/core-platform/lib/shell/contracts.ts`
- `packages/shared/src/mock-db/schema.ts`
- `packages/ui/src/styles/core-theme.css`
- `tests/e2e/core-050-shell.spec.ts`

**Dependencies**: Context and topbar seams stable; all page wrappers characterized.
**Expected behavior**: Named theme-safe loading, distinguishable empty/error/unauthorized/
unavailable/recovering states, read-only retry, one main/scroll owner, equivalent page width/padding,
and no invented backend outcome.
**Regression risks**: Removing duplicate wrappers changes scroll position/spacing; status announces
twice; mock unauthorized wording implies production authority; retry duplicates an action.
**Validation**: State fixtures/semantic assertions; route visual comparison; scroll/zoom/keyboard
tests; retries prove zero storage/domain writes; every state EN/AR and light/dark.
**Rollback**: Restore the page wrapper for only a route with proven layout regression; keep one
main landmark. Revert state rendering to prior phase's safe presentation without touching stored
state.

### Phase G — Localization, RTL/LTR, reduced motion, and theme validation

**Exact files**:

- `apps/core-platform/components/shell/Shell.tsx`
- `apps/core-platform/components/shell/ShellSearch.tsx`
- `apps/core-platform/components/shell/ShellStateNotice.tsx`
- `apps/core-platform/components/shell/ContextSwitcher.tsx`
- `apps/core-platform/components/dashboard/NotificationsDropdown.tsx`
- `apps/core-platform/components/dashboard/UserMenuDropdown.tsx`
- `apps/core-platform/components/dashboard/LocaleToggle.tsx`
- `apps/core-platform/components/dashboard/ThemeToggle.tsx`
- `apps/core-platform/lib/shell/presentation.ts`
- `packages/shared/src/mock-db/schema.ts`
- `packages/ui/src/styles/core-theme.css`
- `tests/e2e/core-050-shell.spec.ts`
- `tests/e2e/core-050-performance.spec.ts`
- `specs/050-core-shell-stabilization/evidence/accessibility-localization-matrix.md`

**Dependencies**: Functional phases complete; current storage effects retained.
**Expected behavior**: All affected shell strings/names have EN/AR; logical positioning/order works;
user-entered names stay unchanged; both themes preserve contrast/focus; reduced motion retains
immediate state feedback; long/mixed-direction copy fits all widths.
**Regression risks**: Translation key fallback leaks; physical icons mirror incorrectly; CSS
motion override suppresses feedback; light/dark focus loses contrast; shared dictionary affects
other consumers.
**Validation**: Full matrix in Section 9, Axe/manual screen reader/keyboard/reduced-motion, long
mixed copy, no horizontal overflow, storage parity, route and performance gates.
**Rollback**: Revert only failing copy/style/motion mapping while retaining compatible functional
behavior; never switch locale/theme keys or remove required semantic feedback.

### Phase H — Documentation and Design Memory synchronization

**Exact files**:

- `specs/050-core-shell-stabilization/spec.md`
- `specs/050-core-shell-stabilization/plan.md`
- `specs/050-core-shell-stabilization/research.md`
- `specs/050-core-shell-stabilization/data-model.md`
- `specs/050-core-shell-stabilization/contracts/shell-presentation-contracts.md`
- `specs/050-core-shell-stabilization/quickstart.md`
- `specs/050-core-shell-stabilization/tasks.md`
- `specs/050-core-shell-stabilization/evidence/characterization.md`
- `specs/050-core-shell-stabilization/evidence/accessibility-localization-matrix.md`
- `specs/050-core-shell-stabilization/evidence/design-quality-checklist.md`
- `specs/050-core-shell-stabilization/evidence/performance-baseline.json`
- `specs/050-core-shell-stabilization/evidence/performance-comparison.json`
- `specs/050-core-shell-stabilization/evidence/usability-validation.md`
- `specs/050-core-shell-stabilization/evidence/rollback-validation.md`
- `docs/11-execution/11-DESIGN-MEMORY.md`
- `apps/core-platform/README.md`

**Dependencies**: All implementation/validation evidence; named Product/design/specialist approvers.
The next unused DX identifier must be allocated at update time; the plan does not invent approver
identities.
**Expected behavior**: DP-050-01 Proposal A and rejected/deferred options are recorded in Design
Memory, commands/evidence are reproducible, deviations are synchronized, and future material
opportunities are DX proposals only. Frozen architecture and the historical implementation audit
are not rewritten.
**Regression risks**: Documentation overstates production security/performance; approval identities
are invented; a future design is accidentally authorized; historical audit is edited as current
truth.
**Validation**: Link/path check, Design Quality Checklist, final Constitution Check, requirement-to-
test traceability, documentation owner review, `git diff --check`.
**Rollback**: Correct factual documentation with dated evidence; preserve decision history and use
supersession for changed design outcomes. Never delete the original approval/rejection record.

## 8. Performance Baseline and Budget

No current shell performance measurements or production budgets exist. Phase A must measure the
unchanged implementation before Phase B begins. D-42 production observability/SLO values remain
deferred; these local references do not resolve them.

| Measure | Start | Ready/feedback condition | Comparison |
|---|---|---|---|
| Initial shell hydration/readiness | Seeded navigation start | `.nx-app-root`, primary `main`, route heading/content, and current navigation state ready | Median before/after for each changed entry route |
| Drawer open/close | User activation | Immediate expanded/open state; animation completion recorded separately | Feedback percentile and median completion |
| Menu open | Bell/profile/context/search activation | Expanded state plus visible, named popup/results | Feedback percentile |
| Locale switch | Locale activation | `<html lang>`, `dir`, pressed state, and changed shell label | Feedback percentile and median |
| Theme switch | Theme activation | `<html data-theme>` plus control/visual state | Feedback percentile and median |
| Route navigation readiness | Existing link activation | URL, route-specific content/heading, and `aria-current` update | Per-route median before/after |

Method:

- Same production Core build/start where route readiness is measured.
- Same machine, OS/CPU, Node/pnpm, Playwright/Chromium, fixture, viewport, theme, locale, and cache
  condition for before/after.
- One worker, headless Chromium, zero `slowMo`, one warm-up, at least 10 recorded samples.
- Browser `performance.now()` for local interaction boundaries where possible.
- Store raw samples/environment, report medians and percentage at/below 100 ms.
- A transition may complete later than 100 ms only when visible/semantic feedback begins within
  100 ms and completion does not regress beyond its characterized reference.

Approved gates:

- **Route gate**: no changed shell route median readiness is more than 10% slower than its own
  characterized baseline under the same conditions.
- **Interaction gate**: at least 95% of measurable local mock drawer/menu/locale/theme/route
  interactions show feedback within 100 ms.

Limitations: single-machine local Chromium, warm local assets, mock-only state, no backend/network
latency, limited device/browser diversity, and scheduling/build variance. Results are regression
references, not production SLAs.

## 9. Accessibility and Localization Matrix

### Base matrix

| Locale/direction | Light | Dark | Widths in each theme |
|---|---|---|---|
| English/LTR | Required | Required | 375, 768, 1024, 1440 |
| Arabic/RTL | Required | Required | 375, 768, 1024, 1440 |

All 16 combinations validate routes, no overflow, topbar reachability, drawer/persistent sidebar,
current-page semantics, Workspace context/recovery, search, notifications, profile, locale/theme,
focus, target size, loading/state presentation, and storage persistence.

### Additional modes

| Mode | Coverage |
|---|---|
| Reduced motion | Repeat critical loading/drawer/popup/locale/theme/route journeys; preferably all 16 combinations; no meaning depends on motion. |
| Keyboard-only | Skip link, drawer containment/restore, nav, search arrows/Enter/Escape, context, notifications, profile, locale/theme, recovery. |
| Screen reader semantics | Manual English and Arabic passes using current stable NVDA with current stable Google Chrome on Windows at mobile and desktop, with light/dark distributed across passes; record exact OS/NVDA/Chrome versions; automated role/name/state/Axe at all base combinations. |
| Touch | 375 and 768; every primary shell control exposes at least a 44 by 44 CSS-pixel activation area in both directions. Inline text links remain subject to WCAG 2.2 AA. |
| Persistent sidebar | 1024 and 1440. |
| Breakpoint diagnostic | 879 and 881 in both directions when diagnosing the current 880 px transition. |
| Content extremes | Long English/Arabic, mixed direction, empty names/fallback, stale IDs, no-match search, empty/unavailable notifications. |
| Zoom/reflow/high contrast | Manual applicable passes; no clipped critical content, hidden focus, or color-only meaning. |

User-entered organization names remain as entered. Directional icons mirror only when meaning
requires it; order and focus remain logical rather than physically left/right coded.

### Manual accessibility evidence format

Each manual assistive-technology row in
`specs/050-core-shell-stabilization/evidence/accessibility-localization-matrix.md` records locale,
direction, theme, viewport, OS/browser/NVDA versions, scripted journey, expected semantic outcome,
observed announcement/focus result, PASS or BLOCKED, reviewer, date, and linked defect/evidence.
Automated Axe or Playwright results cannot substitute for the required NVDA/Chrome pass.

### SC-009 usability validation

T050 executes a moderated-but-unassisted study with 20 representative Core users: 10 English LTR
and 10 Arabic RTL. Every participant starts with the same seeded authenticated/onboarded state and
must identify the current Core destination, active Workspace, context recovery, notifications,
profile menu, locale, and theme controls without prompts. Success requires all seven elements; the
gate requires at least 19 of 20 successful participants. Evidence in
`specs/050-core-shell-stabilization/evidence/usability-validation.md` records an anonymized
participant code, locale/direction, task script revision, per-element outcome, aggregate rate,
observed confusion, moderator, date, environment, and linked defects, with no participant personal
data.

## 10. Risk and Rollback Plan

| Risk | Detection/gate | Rollback treatment |
|---|---|---|
| Focus regression | Keyboard tests show loss, trap after close, incorrect initial focus, obscured focus, or wrong Escape order | Revert the affected drawer/popup focus unit to the last passing phase while retaining characterization; release inert/focus locks unconditionally. |
| Drawer behavior | Open/close/route/history/viewport/RTL tests fail or controls become unreachable | Revert `Shell.tsx` and scoped drawer CSS together to characterized class behavior; keep valid semantic IDs/state only if independently passing. |
| Context recovery | Valid legacy context blocked, foreign context shown, redirect loop, or ID mutated | Switch shell view back to read-only pass-through; remove recovery cutover without clearing/normalizing storage; preserve pure failing fixture for correction. |
| Storage compatibility | Any protected key/name/location/value/seed changes unexpectedly | Hard rollback the responsible phase; restore code path, never migrate/reset test-independent data, and block further phases. |
| Locale/theme compatibility | Competing key, incorrect value, hydration loop, direction/theme loss, or focus loss | Revert control/effect/copy change while preserving `nexoraxs.session.locale` and `nexoraxs.ui.theme`; do not revive deprecated helpers. |
| Notification projection seam | Item count/order/text/threshold/indicator/empty behavior differs before approved semantic update | Switch adapter to parity mapping/previous derivation behind the same UI contract; no write or ownership change is permitted. |
| Search scope expansion | Excluded record/OS/Marketplace/AI/command/result or invented docs link appears | Disable the offending source; rollback to the last allowlisted static catalog, then re-run boundary tests. |
| Test instability | Flaky timing/async assertion without product evidence | Separate functional assertions from timing, pin environment, retain raw samples, improve deterministic fixture; never delete/weaken a required gate solely for flakiness. |
| Performance regression | Repeatable per-route median >10% or <95% feedback within 100 ms | Identify and revert the responsible phase; repeat under identical conditions; do not invent a larger budget. |
| Nested scroll/layout regression | Lost scroll position, spacing drift, page clipping, or duplicate main remains | Restore only the affected route wrapper while redesigning the one-scroll mapping; no broad layout replacement. |
| Shared style/translation consumer impact | Core/auth/onboarding/other app build or visual regression | Scope CSS to `.nx-app-root` or revert shared change; keep app-local behavior and current tokens. |
| Documentation/approval drift | Design Memory overstates scope or lacks accountable approvers | Do not mark UI Freeze/release; correct record with named evidence, preserve history, and keep unapproved opportunities deferred. |

Rollback never uses a data migration, storage cleanup, canonical rename, or destructive Git command.
Each phase must record its rollback rehearsal/result in feature evidence.

## 11. Final Constitution Checks

The post-design result is the matrix near the start of this plan. Final implementation review must
repeat every item with evidence and may use only **PASS**, **N/A with reason**, or **BLOCKED**.

Additional explicit results for this design:

- **PASS — Authority/ADRs**: citations and frozen constraints are present.
- **PASS — Canonical owner/write**: Core shell presentation only; zero canonical writes.
- **PASS — Workspace/organization scope**: Workspace-only global display; legacy tuple validated;
  no Business migration.
- **PASS — OS independence/cross-domain access**: no cross-app import or Commerce write; read-only
  compatibility projection only.
- **N/A — Capability/Knowledge/Rules/Business Brain/Recommendation/AI**: none added; AI entry
  expressly prohibited.
- **N/A — Commercial/operational lifecycle change**: none added; `OSEnablement` remains unresolved.
- **PASS — Security/privacy**: identifiers untrusted; safe failure/recovery; mock UX not production
  authorization; no sensitive telemetry.
- **N/A — Canonical Audit/production observability implementation**: no consequential action or
  backend; testable frontend outcomes/local evidence still required.
- **PASS — Arabic/English, RTL/LTR, accessibility**: full matrix and manual/automated evidence.
- **PASS — Compatibility/migration**: additive presentation seam, no migration, exact protected
  routes/keys/IDs/facade behavior.
- **PASS — Tests/docs**: characterization-first phases, relative performance gate, Design Memory,
  quickstart, rollback, and documentation synchronization are explicit.

If later work needs breadcrumbs, a command palette, AI entry, a global Business/BusinessUnit/Branch
selector, a shared shell primitive, backend/API/SDK, canonical Business migration, `OSEnablement`
successor, or cross-app handoff change, feature 050 stops at that boundary and requires the
applicable approved specification/design/Governance path.

## Complexity Tracking

No frozen-architecture violation or exceptional project complexity is accepted. The separate Core
Playwright configuration and three-file app-local presentation seam are bounded compatibility
tools justified by the current Commerce-only test config and raw shell coupling; neither creates a
new runtime tier, repository layer, public contract, or owner.
