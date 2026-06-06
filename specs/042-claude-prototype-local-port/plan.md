# Implementation Plan: Claude Prototype Local Port

**Branch**: `041-core-platform-ux-alignment` | **Date**: 2026-06-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/042-claude-prototype-local-port/spec.md`

---

## Summary

Port the authenticated product experience from the NexoraXS Claude prototype (`docs/claude.aidesign/`) into the real local Next.js application — visually 1:1 as much as practical. The port covers: auth screens, welcome gateway, onboarding wizard, OS activation, Commerce Setup wizard, Commerce OS shell, and all Commerce OS operation screens (Dashboard, POS, Products, Inventory, Orders, Invoices, Customers, Reports, Settings) plus Core Platform screens (Billing, Team, Integrations, Platform Settings).

Technical approach: **conversion** (not copy-paste). Each Claude JSX component → TypeScript React component. Claude `store.jsx` + `db.jsx` → local mock adapter (`lib/store/`) matching the same relational data contract, designed as a backend-ready swap. Claude CSS (`nx-*` BEM classes) → Tailwind utility classes + CSS variables. Routing: SPA `nav(screen)` → Next.js App Router `router.push('/route')`.

Landing page is explicitly excluded and must not be touched at any phase.

Boundary correction: Commerce screens must live in `apps/commerce` (renamed from `apps/shops-app` when safe), not in `apps/core-platform/app/commerce`. Core Platform links to Commerce at `http://localhost:3002` in local development. The old `apps/core-platform/app/commerce` route tree is removed after migration.

---

## Technical Context

**Language/Version**: TypeScript 5.x, React 18, Next.js 14 (App Router)
**Primary Dependencies**: Next.js 14, React 18, Tailwind CSS 3, lucide-react, `@nexoraxs/ui` (shared package), localStorage / sessionStorage (mock adapter)
**Storage**: localStorage + sessionStorage for Phase 1 mock adapter; keyed as `nexoraxs.*` — backend-ready swap in Phase 2
**Testing**: `tsc --noEmit` (TypeScript strict), ESLint, manual browser QA (no automated test runner in scope for this port)
**Target Platform**: Web browser — Chrome, Firefox, Safari, Edge; mobile-responsive
**Project Type**: SaaS web application — multi-tenant, multi-OS platform frontend
**Performance Goals**: Route navigation < 100ms (client-side); initial page load ≤ 2s; localStorage reads < 5ms
**Constraints**: Arabic (RTL) + English (LTR) from day one; `dir` attribute on `<html>` must flip on locale change; no changes to public landing route (`/`); mock adapter must be synchronous in Phase 1 to avoid async complexity in components
**Scale/Scope**: ~31 routes, ~60 components, 1 mock adapter with ~10 entity types, Phase 1 single-workspace/single-BU scope

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Article | Rule | Status | Notes |
|---------|------|--------|-------|
| I — BOP Identity | Core Platform + Commerce OS only | ✅ Pass | Spec correctly separates Core Platform screens from Commerce OS screens |
| II — Core Platform Boundary | Core owns auth, workspace, billing, team, integrations; NOT commerce data | ✅ Pass | Commerce UI routes live in `apps/commerce`; Core only links to Commerce |
| III — Independent OS | Commerce OS works without other OS | ✅ Pass | No dependency on Healthcare, HR, CRM, Gym, Maintenance |
| IV — Workspace/BU/Branch Model | BU visible during onboarding only because spec explicitly exposes it for OS activation | ✅ Pass | Constitution allows BU UI when "a spec explicitly exposes Business Unit UI" — onboarding OS activation is that explicit exposure. No typed workspaces. |
| V — Multi-Tenant Isolation | All data scoped to workspace_id + business_unit_id + branch_id | ✅ Pass | Data model entities include workspaceId, businessUnitId, branchId as required |
| VI — OS Subscription Model | OS subscription states: trial/active/etc | ✅ Pass | OSSubscription entity includes status field with correct states |
| IX — Commerce OS Boundary | Commerce OS owns all commerce workflows; no parallel systems | ✅ Pass | No Commerce routes under Core Platform; POS creates orders through Commerce data adapter only |
| XI — Localization First | Arabic/English, RTL/LTR from day one | ✅ Pass | AppProvider manages lang + dir; i18n dictionary with full en/ar keys; LocaleToggle in all shells |
| XIV — Spec-Driven | Implementation follows spec | ✅ Pass | This plan follows spec.md which defines scope, user journeys, and acceptance criteria |
| XV — MVP Discipline | Only MVP scope items | ✅ Pass | Only Commerce OS implemented. Healthcare/HR/CRM/Gym/Maintenance shown as "Coming Soon" cards only |
| XVI — Engineering Rules | TypeScript strict, no `any`, loading/empty/error states, modular monolith | ✅ Pass | TypeScript throughout; components must implement loading/empty/error states; no new apps created |

**No constitution violations. Gate passed.**

---

## Project Structure

### Documentation (this feature)

```text
specs/042-claude-prototype-local-port/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── routes.md        # Route contract
│   └── store-api.md     # AppProvider / useApp() contract
├── mapping.md           # Phase 0 output (TASK-003)
└── tasks.md             # Existing (created with spec)
```

### Source Code (repository root)

```text
apps/core-platform/
├── app/
│   ├── page.tsx                         # Landing — PRESERVED AS-IS
│   ├── login/page.tsx                   # Auth — REPLACE
│   ├── register/page.tsx                # Auth — REPLACE
│   ├── verify-email/page.tsx            # Auth — REPLACE
│   ├── forgot-password/page.tsx         # Auth — REPLACE
│   ├── reset-password/page.tsx          # Auth — REPLACE
│   ├── welcome/page.tsx                 # NEW — welcome gateway
│   ├── onboarding/page.tsx              # REPLACE — full phase stepper
│   ├── workspaces/page.tsx              # REVIEW
│   ├── dashboard/
│   │   ├── layout.tsx                   # REPLACE — uses CoreShell
│   │   ├── page.tsx                     # REVIEW — redirect or OS launcher
│   │   ├── apps/page.tsx                # REPLACE — OS Launcher port
│   │   ├── billing/page.tsx             # REPLACE — Core Platform port
│   │   ├── team/page.tsx                # REPLACE — Core Platform port
│   │   ├── integrations/page.tsx        # REPLACE — Core Platform port
│   │   └── settings/page.tsx            # REPLACE — Platform Settings port
│   └── commerce/                        # DEPRECATED/REMOVED — Commerce belongs to apps/commerce
├── components/
│   ├── auth/
│   │   ├── AuthShell.tsx                # NEW
│   │   ├── SocialAuth.tsx               # NEW
│   │   ├── PasswordInput.tsx            # NEW
│   │   └── PasswordStrength.tsx         # NEW
│   ├── shell/
│   │   ├── Shell.tsx                    # NEW — generic shell
│   │   ├── CoreShell.tsx                # NEW
│   │   └── ContextSwitcher.tsx          # NEW
│   ├── onboarding/
│   │   └── PhaseStepper.tsx             # NEW (replaces OnboardingStepper)
│   ├── ui/
│   │   ├── Avatar.tsx                   # NEW
│   │   ├── Badge.tsx                    # NEW
│   │   ├── BrandMark.tsx                # NEW
│   │   ├── Toast.tsx                    # NEW
│   │   └── ToastHost.tsx                # NEW
│   └── dashboard/
│       ├── BranchPill.tsx               # NEW
│       ├── NotificationsDropdown.tsx    # UPDATE — wire to AppProvider
│       ├── UserMenuDropdown.tsx         # UPDATE — wire to AppProvider
│       ├── ThemeToggle.tsx              # UPDATE — wire to AppProvider
│       └── LocaleToggle.tsx             # UPDATE — wire to AppProvider + dir
└── lib/
    └── store/
        ├── storage-keys.ts              # NEW
        ├── catalogs.ts                  # NEW
        ├── db.ts                        # NEW — mock DB helpers
        ├── i18n.ts                      # NEW — en/ar dictionary
        ├── commerce-helpers.ts          # NEW — metrics helpers
        ├── AppProvider.tsx              # NEW — React context + useApp()
        └── index.ts                     # NEW — re-exports
```

```text
apps/commerce/
├── app/
│   ├── setup/                           # Commerce setup wizard, no shell
│   ├── (commerce)/                      # CommerceShell wrapper + guards
│   │   ├── dashboard/
│   │   ├── pos/
│   │   ├── products/
│   │   ├── inventory/
│   │   ├── orders/
│   │   ├── invoices/
│   │   ├── customers/
│   │   ├── reports/
│   │   └── settings/
│   └── page.tsx                         # Redirects to /dashboard
├── components/shell/                    # Commerce shell copy for this app
└── lib/store/                           # Temporary duplicated mock store using shared nexoraxs.* keys
```

**Structure Decision**: Web application split across two Next.js App Router apps. Core Platform routes stay under `apps/core-platform/app/dashboard/` with their own CoreShell. Commerce OS routes live in `apps/commerce/app/` and run on port `3002` locally. Auth routes are top-level in Core with no shell layout. The mock data adapter currently exists in both apps using the same `nexoraxs.*` keys; this avoids cross-app imports until the store is promoted to a shared package.

---

## Complexity Tracking

> No constitution violations detected. This section documents one design decision that touches on Article IV.

| Decision | Why Needed | Simpler Alternative Rejected Because |
|----------|-----------|-------------------------------------|
| BU name + preset exposed in onboarding | Commerce OS activation requires naming the business and choosing its type to generate correct Commerce Setup defaults | Silently creating a default BU would work for a generic workspace, but the Commerce preset selection is needed immediately for Tax, Categories, and Document Template defaults — without it the Commerce Setup wizard cannot pre-populate. Constitution allows this when a spec explicitly exposes BU UI. |
