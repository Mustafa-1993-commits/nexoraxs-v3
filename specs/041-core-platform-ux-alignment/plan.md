# Implementation Plan: Core Platform UX Alignment

**Branch**: `041-core-platform-ux-alignment` | **Date**: 2026-06-03 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/041-core-platform-ux-alignment/spec.md`

## Summary

Redesign the Core Platform (`apps/core-platform`) to deliver a polished, reference-quality MVP experience: replace the current 3-step onboarding with a 4-step horizontal stepper flow (Language → Workspace → Business Unit → Main Branch), introduce a theme/locale control system using the exact session keys from the contract, clean up the platform shell sidebar and topbar, improve the Product Hub with Business Unit context, add Team & Access with an Invite User modal, add an Integrations Hub page, and clean up Settings. Login is untouched. No backend. All persistence is sessionStorage.

---

## Technical Context

**Language/Version**: TypeScript (Next.js 16+, App Router)
**Primary Dependencies**: Next.js, React, TailwindCSS v4 (`@import "tailwindcss"` syntax), @nexoraxs/ui, Lucide React
**Storage**: sessionStorage — 12 exact keys from spec session contract
**Testing**: Manual visual verification + `pnpm --filter core-platform build`
**Target Platform**: Web browser — Core Platform at app.nexoraxs.com (`apps/core-platform`)
**Project Type**: Web application (Core Platform SaaS shell + onboarding)
**Performance Goals**: Theme and locale switches take effect within 1 second, no page reload
**Constraints**: Login page unchanged; no backend; no external UI libraries; lucide-react icons only; existing dark design preserved; Tailwind v4 (no tailwind.config.ts in app)
**Scale/Scope**: `apps/core-platform` — 12 new files + 11 modified files; 2 new routes

---

## Constitution Check

| Gate | Status | Notes |
|------|--------|-------|
| Belongs to Core Platform boundary | ✅ Pass | All changes in `apps/core-platform` only |
| Core Platform-allowed features | ✅ Pass | Auth flow, Workspace, BU context, Product Hub, Team, Billing UI, Settings, Notifications, Integrations Hub — all explicitly in Core Platform boundary |
| No OS business logic in Core Platform | ✅ Pass | No Commerce/Healthcare/HR/Gym/CRM/Maintenance domain logic is added |
| Login page unchanged | ✅ Pass | Explicitly verified — login route not touched |
| No backend | ✅ Pass | sessionStorage only |
| No cross-OS dependency | ✅ Pass | Commerce OS URL referenced but not coupled |
| Localization compliance | ✅ Pass | `core_locale` key used; `dir` and `lang` set from session |
| MVP scope | ✅ Pass | All items are explicitly in Core Platform MVP scope per constitution Article XV |
| Business Unit MVP rule | ✅ Pass | One BU created during onboarding; no BU CRUD built |

---

## Project Structure

### Documentation (this feature)

```text
specs/041-core-platform-ux-alignment/
├── plan.md              ← This file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/
│   ├── session-contract.md         ← Phase 1 output
│   ├── onboarding-stepper.md       ← Phase 1 output
│   └── topbar-controls.md          ← Phase 1 output
└── tasks.md             ← Phase 2 output (created by /speckit.tasks)
```

### Source Code (new files)

```text
apps/core-platform/
├── lib/
│   ├── core-session.ts             NEW — 12 exact session keys, get/set/subscribe helpers
│   └── core-theme.ts               NEW — theme management (core_theme key)
│
├── components/
│   ├── CoreProvider.tsx             NEW — replaces LocaleProvider; applies locale (lang/dir) + theme (data-theme attr) to html element
│   ├── onboarding/
│   │   ├── OnboardingStepper.tsx    NEW — horizontal stepper with numbered circles, connecting lines, step labels
│   │   └── steps/
│   │       ├── StepLanguage.tsx     NEW — language card selector (EN/AR)
│   │       ├── StepWorkspace.tsx    NEW — workspace name, country, currency, timezone
│   │       ├── StepBusinessUnit.tsx NEW — BU name + industry selector
│   │       └── StepBranch.tsx       NEW — branch name, city, country
│   └── dashboard/
│       ├── ThemeToggle.tsx          NEW — light/dark toggle button
│       ├── LocaleToggle.tsx         NEW — EN/AR toggle (replaces LanguageSwitcher.tsx)
│       ├── NotificationsDropdown.tsx NEW — bell button + mock notification dropdown
│       ├── UserMenuDropdown.tsx      NEW — avatar/initials + user menu dropdown
│       └── InviteUserModal.tsx       NEW — Team & Access invite form modal
│
└── app/
    └── dashboard/
        ├── team/
        │   └── page.tsx             NEW — Team & Access page with team list + Invite button
        └── integrations/
            └── page.tsx             NEW — Integrations Hub read-only page
```

### Source Code (modified files)

```text
apps/core-platform/
├── app/
│   ├── layout.tsx                   MODIFY — use CoreProvider instead of LocaleProvider; apply theme data-attr to <html>
│   ├── globals.css                  MODIFY — add CSS custom property theme system (dark default / .light override)
│   └── onboarding/
│       └── page.tsx                 REWRITE — 4-step onboarding with horizontal stepper
│
├── components/
│   ├── LocaleProvider.tsx           MODIFY — delegate to CoreProvider or update to use core_locale key
│   └── dashboard/
│       ├── Sidebar.tsx              MODIFY — add Team & Access + Integrations links; remove Documentation/Changelog/Support; remove Beta card
│       └── Topbar.tsx               MODIFY — add ThemeToggle, LocaleToggle, NotificationsDropdown, UserMenuDropdown
│
├── lib/
│   ├── locale.ts                    MODIFY — update LOCALE_KEY from "nexoraxs_locale" to "core_locale"
│   └── mock-data/
│       ├── nav-items.ts             MODIFY — add Team & Access, Integrations entries
│       └── apps.ts                  MODIFY — add optional businessUnit field to OSItem
│
└── app/
    └── dashboard/
        ├── apps/
        │   └── page.tsx             MODIFY — read core_bu_name from session; pass to Commerce OS card
        ├── settings/
        │   └── page.tsx             MODIFY — add Language & Region + Appearance sections; disable advanced sections
        └── layout.tsx               MODIFY — ensure theme data-attr propagates to shell background
```

**Structure Decision**: `CoreProvider` consolidates both locale and theme effects into one root-level client component, mirroring the existing `LocaleProvider` pattern. The `core-session.ts` module is the single source of truth for all 12 session keys. No new packages are introduced.

---

## Complexity Tracking

> No constitution violations — this section is N/A.
