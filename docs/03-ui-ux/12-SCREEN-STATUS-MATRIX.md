# Screen Status Matrix

- **Status:** Current implementation assessment
- **Snapshot date:** 2026-07-19
- **Owner:** Product Experience and the owning frontend application
- **Scope:** `apps/landing`, `apps/core-platform`, and `apps/commerce`

## 1. Purpose

This matrix records the observable completion state of every current page endpoint and every
screen already reserved by the canonical [Screen Map](./02-SCREEN-MAP.md). It is an implementation
snapshot, not an architecture decision or a claim of production backend readiness.

The requested `docs/ui-ux/` location is represented by the repository's existing canonical UI/UX
workspace, `docs/03-ui-ux/`. Creating a second UI/UX tree would conflict with the documentation
authority defined in this workspace's [README](./README.md).

## 2. Rating Method

| Rating | Meaning |
|---|---|
| ✅ Complete | The current frontend supplies the assessed behavior for its present mock scope, or the behavior is genuinely not applicable and is marked `N/A`. |
| 🟡 Partial | Some supporting behavior exists, but it is incomplete, route-external, unverified at screen level, or dependent on temporary compatibility state. |
| ❌ Missing | No supporting screen behavior was verified. |

Additional interpretation rules:

- **Visual Completion** measures whether the current screen has a coherent rendered layout and
  primary interaction. It does not mean the target journey or production integration is complete.
- **Mock Data** measures integration with the current browser mock/repository boundary. Static
  pages and redirect-only routes are marked `✅ N/A`.
- **Responsive** is `✅` only where responsive source rules or route-level evidence were verified.
  Shared-shell behavior without complete content evidence is `🟡`.
- **i18n Ready** requires user-visible copy to have a translation path. Setting only the document
  language is insufficient.
- **RTL Ready** requires direction-aware layout as well as document direction. A global `dir`
  switch with unverified or hard-coded route content is `🟡`.
- **Loading / Empty / Error / Success** rate user-visible states. A silent redirect or blank render
  is not a completed state.
- **Roles** describes current route protection evidence. “No role guard” means the frontend does
  not currently enforce a role-specific route decision; it does not authorize access.

## 3. Current Route Screens

### 3.1 Landing

| Screen | Route | Exists | Visual Completion | Mock Data | Responsive | i18n Ready | RTL Ready | Loading | Empty | Error | Success | Roles | Priority | Required Action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Public Landing | `/` | ✅ Complete | ✅ Complete | ✅ N/A | ✅ Complete | ❌ Missing | ❌ Missing | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | Public | P0 | Needs Localization |

### 3.2 Core Platform

| Screen | Route | Exists | Visual Completion | Mock Data | Responsive | i18n Ready | RTL Ready | Loading | Empty | Error | Success | Roles | Priority | Required Action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Core root redirect | `/` | ✅ Complete | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | ✅ Complete | Public routing utility | P0 | Minor Polish |
| Login | `/login` | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | Public; authenticated mock session redirects | P0 | Needs Localization |
| Register | `/register` | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | Public; authenticated mock session redirects | P0 | Needs Localization |
| Forgot Password | `/forgot-password` | ✅ Complete | ✅ Complete | 🟡 Partial | ✅ Complete | ❌ Missing | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | Public recovery presentation | P1 | Needs Localization |
| Reset Password | `/reset-password` | ✅ Complete | 🟡 Partial | 🟡 Partial | ✅ Complete | ❌ Missing | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | Public recovery presentation | P1 | Visual Improvements |
| Verify alias | `/verify` | ✅ Complete | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | ✅ Complete | Current authenticated mock account | P0 | Minor Polish |
| Verify Email | `/verify-email` | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | ❌ Missing | ✅ Complete | 🟡 Partial | ✅ Complete | Current authenticated mock account | P0 | Needs Localization |
| Workspace introduction | `/welcome` | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | ❌ Missing | ✅ Complete | ❌ Missing | ✅ Complete | Authenticated mock session | P0 | Needs Localization |
| Workspace / OS / plan onboarding | `/onboarding` | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | 🟡 Partial | ❌ Missing | ✅ Complete | ❌ Missing | ✅ Complete | Authenticated mock session; no role guard | P0 | Major Redesign |
| Platform Dashboard | `/dashboard` | ✅ Complete | 🟡 Partial | ✅ Complete | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | 🟡 Partial | ✅ Complete | ✅ Complete | Workspace mock context; no role guard | P0 | Visual Improvements |
| Product Hub | `/dashboard/apps` | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | ❌ Missing | ✅ Complete | ✅ Complete | 🟡 Partial | ✅ Complete | ✅ Complete | Workspace mock context; no action-level role guard | P0 | Needs Localization |
| Billing and Subscriptions | `/dashboard/billing` | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | ❌ Missing | 🟡 Partial | ✅ Complete | 🟡 Partial | ✅ Complete | 🟡 Partial | Workspace mock context; no billing-role guard | P1 | Needs Localization |
| Integrations | `/dashboard/integrations` | ✅ Complete | 🟡 Partial | 🟡 Partial | 🟡 Partial | ❌ Missing | 🟡 Partial | ✅ Complete | ❌ Missing | 🟡 Partial | 🟡 Partial | Workspace mock context; no integration-role guard | P2 | Needs Mock Integration |
| Workspace Settings | `/dashboard/settings` | ✅ Complete | 🟡 Partial | 🟡 Partial | 🟡 Partial | ❌ Missing | 🟡 Partial | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | Workspace mock context; no settings-role guard | P1 | Needs Mock Integration |
| Team and Access | `/dashboard/team` | ✅ Complete | 🟡 Partial | 🟡 Partial | 🟡 Partial | ❌ Missing | 🟡 Partial | ✅ Complete | ❌ Missing | ❌ Missing | 🟡 Partial | Workspace mock context; hard-coded roles; no canonical role guard | P1 | Major Redesign |

Core protected routes inherit tested shell-level loading, empty, error, unauthorized, retry,
English/LTR, Arabic/RTL, and responsive drawer behavior from
`apps/core-platform/app/dashboard/layout.tsx`, `apps/core-platform/components/shell/`, and
`tests/e2e/core-050-shell.spec.ts`. A `✅` shell state does not imply that each page's own data
source has a route-specific state.

### 3.3 Commerce

| Screen | Route | Exists | Visual Completion | Mock Data | Responsive | i18n Ready | RTL Ready | Loading | Empty | Error | Success | Roles | Priority | Required Action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Commerce root redirect | `/` | ✅ Complete | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | ✅ N/A | ✅ Complete | Public routing utility | P1 | Minor Polish |
| Commerce Setup | `/setup` | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | Core handoff context and authenticated mock actor; no setup-role guard | P1 | Needs Localization |
| Commerce Dashboard | `/dashboard` | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | 🟡 Partial | 🟡 Partial | ❌ Missing | ✅ Complete | Commerce mock context; no role guard | P1 | Needs Localization |
| POS | `/pos` | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | Commerce mock actor; no POS permission guard | P1 | Needs Localization |
| Sale Success | `/pos/success` | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | 🟡 Partial | 🟡 Partial | ❌ Missing | ❌ Missing | ❌ Missing | ✅ Complete | Commerce mock actor; no POS permission guard | P1 | Add Recovery States |
| Product List | `/products` | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | Commerce mock actor; no Product permission guard | P1 | Needs Responsive |
| Product Create/Edit | `/products/new`; `?edit=<id>` | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | Commerce mock actor; no Product permission guard | P1 | Needs Responsive |
| Inventory | `/inventory` | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | Commerce mock actor; no Inventory permission guard | P1 | Needs Responsive |
| Stock Transfers | `/inventory/transfers` | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | 🟡 Partial | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | Commerce mock actor; no transfer permission guard | P1 | Needs Localization |
| Customer List | `/customers` | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | Commerce mock actor; no Customer permission guard | P1 | Needs Localization |
| Customer Detail | `/customers/[id]` | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | 🟡 Partial | ✅ Complete | ✅ Complete | Commerce mock actor; no Customer permission guard | P1 | Needs Localization |
| Order List | `/orders` | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | Commerce mock actor; no Order permission guard | P1 | Needs Localization |
| Order Detail / Return initiation | `/orders/[id]` | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | 🟡 Partial | ✅ Complete | ✅ Complete | Commerce mock actor; no Order/Return permission guard | P1 | Needs Localization |
| Invoice List | `/invoices` | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | Commerce mock actor; no Invoice permission guard | P1 | Needs Localization |
| Invoice Detail | `/invoices/[id]` | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | 🟡 Partial | ✅ Complete | ✅ Complete | Commerce mock actor; no Invoice permission guard | P1 | Needs Localization |
| Invoice Document | `/invoices/[id]/document` | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | 🟡 Partial | 🟡 Partial | ✅ Complete | ❌ Missing | ✅ Complete | ✅ Complete | Commerce mock actor; no Document permission guard | P1 | Needs Responsive |
| Return Document | `/returns/[id]/document` | ✅ Complete | 🟡 Partial | ✅ Complete | 🟡 Partial | ❌ Missing | 🟡 Partial | ❌ Missing | ❌ Missing | ❌ Missing | ✅ Complete | Commerce mock actor; no Return permission guard | P2 | Add Recovery States |
| Reports | `/reports` | ✅ Complete | 🟡 Partial | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | 🟡 Partial | 🟡 Partial | ❌ Missing | ✅ Complete | Commerce mock actor; no Report permission guard | P2 | Needs Localization |
| Commerce Settings | `/settings` | ✅ Complete | 🟡 Partial | 🟡 Partial | 🟡 Partial | ❌ Missing | 🟡 Partial | 🟡 Partial | ✅ Complete | ❌ Missing | 🟡 Partial | Commerce mock actor; no settings permission guard | P1 | Needs Mock Integration |
| Document Settings | `/settings/documents` | ✅ Complete | 🟡 Partial | 🟡 Partial | 🟡 Partial | ❌ Missing | 🟡 Partial | ❌ Missing | ✅ Complete | ❌ Missing | 🟡 Partial | Commerce mock actor; no settings permission guard | P2 | Needs Mock Integration |

The Commerce repository-backed areas above are the current frontend compatibility scope from
Features 052–055. Their `✅` ratings do not promote the temporary records in `packages/contracts`
or `packages/sdk` into backend or canonical platform contracts.

## 4. Verified Embedded Screens and Stages

These are independently visible stages or overlays found in the frontend even though they do not
have their own route.

| Screen | Route | Exists | Visual Completion | Mock Data | Responsive | i18n Ready | RTL Ready | Loading | Empty | Error | Success | Roles | Priority | Required Action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Workspace creation step | `/onboarding` step 1 | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | ❌ Missing | ✅ Complete | ❌ Missing | ✅ Complete | Authenticated mock actor | P0 | Needs Localization |
| Operating System selection step | `/onboarding` step 2 | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | ❌ Missing | ✅ Complete | ❌ Missing | ✅ Complete | Authenticated mock actor | P0 | Re-sequence after Business Architect |
| Plan selection step | `/onboarding` step 3 | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | ❌ Missing | ❌ Missing | ❌ Missing | ✅ Complete | Authenticated mock actor; no purchase permission guard | P0 | Re-sequence after Recommendations |
| Workspace context switcher | Core protected shell | ✅ Complete | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | 🟡 Partial | ✅ Complete | ✅ Complete | Authenticated Workspace mock context | P1 | Complete Multi-Workspace States |
| Core notifications dropdown | Core protected shell | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | Authenticated mock recipient | P2 | Minor Polish |
| Core profile/user menu | Core protected shell | ✅ Complete | 🟡 Partial | ✅ Complete | ✅ Complete | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | Authenticated mock user | P2 | Needs Localization |
| Team invitation modal | `/dashboard/team` overlay | ✅ Complete | 🟡 Partial | 🟡 Partial | 🟡 Partial | ❌ Missing | 🟡 Partial | ❌ Missing | ✅ Complete | ❌ Missing | 🟡 Partial | No membership-management permission guard | P1 | Needs Mock Integration |
| Team permission matrix | `/dashboard/team` section | ✅ Complete | 🟡 Partial | 🟡 Partial | ❌ Missing | ❌ Missing | 🟡 Partial | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | Hard-coded role presentation; no permission guard | P2 | Major Redesign |
| Commerce setup: Identity | `/setup` step 1 | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | No setup-role guard | P1 | Needs Localization |
| Commerce setup: Preset | `/setup` step 2 | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | No setup-role guard | P1 | Needs Localization |
| Commerce setup: Mode | `/setup` step 3 | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | No setup-role guard | P1 | Needs Localization |
| Commerce setup: Tax | `/setup` step 4 | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | No setup-role guard | P1 | Needs Localization |
| Commerce setup: Numbering | `/setup` step 5 | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | No setup-role guard | P1 | Needs Localization |
| Commerce setup: Templates | `/setup` step 6 | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | No setup-role guard | P1 | Needs Localization |
| Commerce setup: Categories | `/setup` step 7 | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | No setup-role guard | P1 | Needs Localization |
| Commerce setup: Review | `/setup` step 8 | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ❌ Missing | 🟡 Partial | 🟡 Partial | ✅ Complete | ✅ Complete | ✅ Complete | No setup-role guard | P1 | Needs Localization |

## 5. Documented Screens Not Yet Implemented

Every row below comes from the canonical [Screen Map](./02-SCREEN-MAP.md); none is inferred from a
backend contract. Proposed routes remain planning identifiers until an approved frontend feature
specification authorizes implementation.

| Screen | Route | Exists | Visual Completion | Mock Data | Responsive | i18n Ready | RTL Ready | Loading | Empty | Error | Success | Roles | Priority | Required Action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Business Architect Introduction | `/onboarding/business-architect` | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | Authorized Business participant; exact permission unresolved | P0 | Create New Screen |
| Guided Business Interview | `/onboarding/business-architect/interview` | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | Authorized Business participant | P0 | Create New Screen |
| Supporting Information | `/onboarding/business-architect/evidence` | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | Authorized Business participant; evidence visibility may be narrower | P1 | Create New Screen |
| Interview Review | `/onboarding/business-architect/review` | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | Authorized Business participant | P0 | Create New Screen |
| Business Analysis | `/onboarding/business-architect/analysis` | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | Authorized Business viewer; trigger/retry permission unresolved | P0 | Create New Screen |
| Business Blueprint | `/onboarding/business-architect/blueprint` | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | Authorized Business viewer | P0 | Create New Screen |
| Recommendations | `/onboarding/business-architect/recommendations` | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | Authorized Business viewer; action permissions separate | P0 | Create New Screen |
| Resume Incomplete Interview | Same interview route at saved safe point | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | Same authorized Business context | P0 | Create New Screen |
| Core Workspace Setup | `/onboarding/workspace-setup` | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | Authenticated Workspace member; mutations separately permissioned | P0 | Create New Screen |
| Audit Logs | `/dashboard/audit` | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | Explicit audit-view permission required | P2 | Create New Screen |
| Stock Movements | `/inventory/movements` | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | Commerce Inventory movement-view permission | P2 | Create New Screen |
| Returns List and Detail | `/returns`; `/returns/[id]` | ❌ Missing | ❌ Missing | 🟡 Partial | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | ❌ Missing | Commerce Return permission | P2 | Create New Screen |

## 6. Cross-Screen Findings

1. **The route estate is substantial, but the canonical onboarding journey is absent.** Current
   Core onboarding contains Workspace, OS, and Plan steps; it contains no Business Architect,
   deterministic analysis, Business Blueprint, or Recommendations screen.
2. **Core shell readiness exceeds Core page readiness.** Feature 050 supplies tested shell states,
   direction, compact navigation, and keyboard behavior, but most page copy remains hard-coded.
3. **Commerce repository-backed lists are the strongest state-aware surfaces.** Products,
   Customers, Inventory, Orders, and Invoices expose loading, empty, and recoverable error states.
   Dashboards, reports, document settings, and some print/success screens do not provide equivalent
   state coverage.
4. **Responsive foundations exist in all three apps.** Landing uses responsive utility classes;
   Core and Commerce use shared CSS media rules. Table, document, and route-specific compact
   behavior remains uneven, so those rows are not promoted to complete without direct evidence.
5. **Role labels are not authorization evidence.** Current protected layouts establish mock
   session/context guards, but route-specific role and permission enforcement is generally absent.
6. **Localization is fragmented.** The browser mock supports `en`/`ar`, document direction changes,
   shell translations, and several Commerce feature dictionaries. It is not an open-ended locale
   engine, and hard-coded strings remain across Landing, authentication, onboarding, dashboards,
   settings, reports, and documents.

## 7. Relationships

- [Platform Experience](./01-PLATFORM-EXPERIENCE.md) defines the target journey.
- [Screen Map](./02-SCREEN-MAP.md) defines current/planned screen classification.
- [Frontend Experience Gap Analysis](./03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md) explains target-to-current differences.
- [User Journeys](./05-USER-JOURNEYS.md), [User Flows](./06-USER-FLOWS.md), and
  [State Machines](./07-STATE-MACHINES.md) define cross-screen behavior.
- [Localization](./10-LOCALIZATION.md) defines the target localization UX contract.
- [UX Gaps](./13-UX-GAPS.md) and [Frontend Backlog](./14-FRONTEND-BACKLOG.md) turn this snapshot into
  prioritized documentation for later specification work.

## 8. Verified Against

- all `page.tsx`, `layout.tsx`, route-group layouts, and route-used components under
  `apps/landing/src/app/`, `apps/landing/src/sections/`, `apps/core-platform/app/`,
  `apps/core-platform/components/`, `apps/commerce/app/`, and `apps/commerce/components/`;
- `apps/core-platform/lib/store/`, `apps/core-platform/lib/infrastructure/browser/`,
  `apps/commerce/lib/store/`, `apps/commerce/lib/commerce/`, and `apps/commerce/features/`;
- `packages/shared/src/mock-db/`, `packages/contracts/src/commerce/`, and
  `packages/sdk/src/commerce/` as current frontend mock/compatibility evidence only;
- `tests/e2e/core-050-shell.spec.ts`, `tests/e2e/commerce-052-products-accessibility.spec.ts`,
  `tests/e2e/commerce-053-localization-accessibility.spec.ts`,
  `tests/e2e/commerce-054-characterization-accessibility.spec.ts`, and
  `tests/e2e/commerce-055-localization-accessibility.spec.ts` as existing evidence only; and
- [Screen Map](./02-SCREEN-MAP.md), [Frontend-First Policy](../11-execution/05-FRONTEND-FIRST-POLICY.md),
  Feature 052–055 specifications, Accepted ADRs, and the applicable freezes.

## 9. Open Questions

- Which approved role/permission catalog should future screen-level access matrices cite?
- Which canonical Business creation or selection experience precedes Business Architect entry?
- Which preference scope and precedence governs locale persistence after the current browser-only
  frontend stage?

