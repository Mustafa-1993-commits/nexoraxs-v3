# Research: Core Platform UX Alignment

**Feature**: 041-core-platform-ux-alignment
**Date**: 2026-06-03
**Status**: Complete — all decisions resolved

---

## Decision 1: Theme system approach (TailwindCSS v4)

**Decision**: Use a `data-theme` attribute on `<html>` (values: `"dark"` | `"light"`) combined with CSS custom properties defined in `globals.css`.

`CoreProvider` reads `core_theme` from session and sets `document.documentElement.setAttribute("data-theme", theme)`.

`globals.css` defines design token variables on `:root` (dark defaults) and overrides them under `[data-theme="light"]`:

```css
:root {
  --color-bg-page:    #0a0a0f;
  --color-bg-surface: rgba(255,255,255,0.05);
  --color-border:     rgba(255,255,255,0.08);
  --color-text-primary: #e5e7eb;
  --color-text-muted:   rgba(255,255,255,0.5);
}

[data-theme="light"] {
  --color-bg-page:    #f8fafc;
  --color-bg-surface: #ffffff;
  --color-border:     #e2e8f0;
  --color-text-primary: #0f172a;
  --color-text-muted:   #64748b;
}
```

`body`, `.card`, and `.chip` in `globals.css` are updated to use these vars. Deep utility classes (`text-white/50`, `border-white/10`) continue to work in dark mode; the light mode token overrides handle the most structurally visible elements.

**Rationale**: Tailwind v4 uses `@import "tailwindcss"` without a config file — there is no `tailwind.config.ts` to add `darkMode: 'class'`. The CSS custom property approach works independently of Tailwind's dark variant and does not require adding a config file or touching every utility class in the codebase. Minimal component changes, maximum theme coverage.

**Alternatives considered**:
- Tailwind `dark:` variant — requires `tailwind.config.ts` with `darkMode: 'class'`, which v4 handles differently; risk of missing utility coverage for the existing codebase.
- Duplicating entire stylesheet — too much duplication, not maintainable.
- CSS variable per-component — too granular; CSS vars on `:root` cover most structural elements globally.

---

## Decision 2: CoreProvider replaces LocaleProvider

**Decision**: Replace `components/LocaleProvider.tsx` with `components/CoreProvider.tsx`. `CoreProvider` handles both locale effects (setting `document.documentElement.dir` and `document.documentElement.lang` from `core_locale`) and theme effects (setting `document.documentElement.setAttribute("data-theme", ...)` from `core_theme`).

`app/layout.tsx` imports `CoreProvider` instead of `LocaleProvider`. `LocaleProvider.tsx` can be removed.

**Rationale**: Having one root provider that owns both `lang`/`dir` and `data-theme` is simpler than two independent providers and eliminates ordering concerns.

---

## Decision 3: Session key migration — locale

**Decision**: `lib/locale.ts` in `apps/core-platform` MUST update `LOCALE_KEY` from `"nexoraxs_locale"` to `"core_locale"`. All existing components that import from `lib/locale.ts` automatically get the correct key.

**Rationale**: The spec session contract mandates `core_locale` as the Core Platform locale source of truth. The existing `nexoraxs_locale` key was a placeholder. The `shops-app` has its own `lib/locale.ts` that still uses `nexoraxs_locale` — that app is unaffected because each app has its own lib directory.

---

## Decision 4: core-session.ts — single source of all session keys

**Decision**: New `lib/core-session.ts` implements the exact 12 session keys from the spec. Each key gets a typed `get*()`, `set*()`, and `subscribe*()` function following the same caching pattern as `apps/shops-app/lib/settings-store.ts` (to avoid the `getSnapshot` infinite loop).

The existing `lib/session.ts` is not deleted (it still has `getMockUserName`, `getMockUserEmail`, etc. that are used by Topbar). The new `core-session.ts` adds the 12 spec-mandated keys. There is no duplication since `session.ts` uses different keys (`core_workspace_setup`, `core_workspace_onboarding_done`) which are legacy and no longer written by the new onboarding — new keys (`core_workspace_name`, etc.) live only in `core-session.ts`.

---

## Decision 5: Horizontal stepper visual design

**Decision**: The `OnboardingStepper` component renders:
- A row of `{ number, label }` step items connected by `<div>` lines
- Each step indicator: a circle (40×40 px) containing either a number (upcoming/active) or a `<Check>` lucide icon (completed)
- State classes:
  - Active: blue filled circle (`bg-blue-600 text-white`)
  - Completed: blue-tinted circle with Check (`bg-blue-600/30 text-blue-400`)
  - Upcoming: bordered circle with muted number (`border border-white/20 text-white/30`)
- Connecting line between circles: `h-px flex-1 bg-blue-500/40` (completed+active) or `bg-white/10` (upcoming)
- Step label below each circle: small monospaced caption text

Icons for each step (Lucide only):
- Step 1 Language: `<Languages>` or `<Globe2>`
- Step 2 Workspace: `<Building2>`
- Step 3 Business Unit: `<BriefcaseBusiness>` (fallback `<Briefcase>`)
- Step 4 Main Branch: `<MapPin>`

**Rationale**: This pattern mirrors the Claude Design reference screens and the existing `Stepper` implementation in `apps/shops-app/app/onboarding/page.tsx`.

---

## Decision 6: Onboarding card layout

**Decision**: Each step renders inside a centered card (max-width 520px on desktop, full-width on mobile) with:
- A chip label (`// step N of 4`)
- A `<Building2>` / step icon
- Step heading (large, bold)
- Helper text (small, muted)
- Form fields or selector cards
- Continue / Back / Finish buttons at the bottom

The onboarding page background uses the current dark identity. The centered card uses the `.card` utility which will be themed by CSS vars.

---

## Decision 7: Language step — card selectors

**Decision**: Two full-width card buttons: one for English (LTR icon + "English") and one for Arabic (RTL icon + "العربية"). The selected card gets `border-blue-500 bg-blue-500/10`. Selecting a language immediately fires `setLocale("en"|"ar")` which triggers `CoreProvider`'s `useEffect` to update `document.dir` and `document.lang` instantly.

---

## Decision 8: Country → currency → timezone static lookup

**Decision**: A static `COUNTRY_DEFAULTS` map (reuse pattern from `apps/shops-app/lib/mode.ts`) covering the most common countries. When the user selects a country in Step 2 (Workspace), currency and timezone are auto-filled. The user can override the auto-filled values before continuing.

Included countries: Egypt (EGP, Africa/Cairo), Saudi Arabia (SAR, Asia/Riyadh), UAE (AED, Asia/Dubai), Kuwait (KWD, Asia/Kuwait), Qatar (QAR, Asia/Qatar), Jordan (JOD, Asia/Amman), Bahrain (BHD, Asia/Bahrain), Morocco (MAD, Africa/Casablanca), United Kingdom (GBP, Europe/London), United States (USD, America/New_York), + Other (manual entry).

---

## Decision 9: Topbar controls layout

**Decision**: The topbar right side reads (left to right in LTR, reversed in RTL):
```
[breadcrumb/title]  [spacer]  [LocaleToggle]  [ThemeToggle]  [NotificationsBell]  [UserMenuAvatar]
```
- `LocaleToggle`: same pill design as existing `LanguageSwitcher.tsx` (EN/AR buttons)
- `ThemeToggle`: single icon button — `<Sun>` when dark (clicking → light), `<Moon>` when light (clicking → dark)
- `NotificationsDropdown`: `<Bell>` icon button; click opens a positioned dropdown (absolute, right-0)
- `UserMenuDropdown`: initials circle or `<UserCircle2>` icon; click opens dropdown

All four controls are consistent across onboarding topbar and platform shell topbar.

---

## Decision 10: Notifications dropdown content

**Decision**: Mock notifications are hardcoded:
1. `{ icon: AlertTriangle, color: amber, title: "Low stock alert", body: "Product A is running low — 3 units remaining.", time: "2 min ago" }`
2. `{ icon: CheckCircle, color: emerald, title: "Order completed", body: "Order #INV-0042 has been marked as completed.", time: "15 min ago" }`
3. `{ icon: CreditCard, color: blue, title: "Commerce OS renewal", body: "Your Commerce OS plan renews in 7 days.", time: "1 hour ago" }`

Clicking an item does nothing (no route, no action). A "View all" link is disabled.

---

## Decision 11: User menu dropdown content

**Decision**: Four items: Account, Billing, Team, Sign out.
- **Account**: disabled / Coming Soon (no route)
- **Billing**: navigates to `/dashboard/billing`
- **Team**: navigates to `/dashboard/team`
- **Sign out**: clears sessionStorage and navigates to `/login`

---

## Decision 12: Team & Access invite modal field mapping

**Decision**: Modal fields and their static options:

| Field | Type | Notes |
|-------|------|-------|
| Email | text input | Required |
| Name | text input | Optional |
| Workspace Role | select | Owner, Admin, Member |
| Operating System | select | Commerce OS (only active option) |
| Business Unit | select | Value from `core_bu_name` session + "All" option |
| Branch | select | Value from `core_branch_name` session + "All" option |
| OS Role | select | Changes based on OS selection |

Commerce OS roles: Commerce Admin, Branch Manager, Cashier, Inventory Manager, Accountant, Viewer

On submit: push a mock member to a local React state array in the Team page component. This state is not persisted to sessionStorage (resets on page reload, which is acceptable for MVP mock).

---

## Decision 13: Integrations page cards

**Decision**: 5 cards in a grid (2-col on desktop):

| Card | OS A | OS B | Description |
|------|------|------|-------------|
| 1 | Commerce OS | Healthcare OS | Prescription to pharmacy fulfillment |
| 2 | Commerce OS | HR OS | Employees and cashier role sync |
| 3 | Commerce OS | CRM OS | Customer purchase history and campaigns |
| 4 | Gym OS | HR OS | Trainer profiles and attendance |
| 5 | Maintenance OS | Commerce OS | Spare parts inventory sync |

Each card: two OS pills, title, description, "Coming Soon" badge, "Notify Me" button (disabled). No real action.

---

## Decision 14: Settings page cleanup

**Decision**: Settings page restructured into 5 sections:

1. **Workspace** — workspace name (read-only from `core_workspace_name`), country, currency display
2. **Language & Region** — inline locale toggle (EN/AR) + timezone display
3. **Appearance** — inline theme toggle (Light/Dark)
4. **Team & Access** — link to `/dashboard/team`
5. **Billing** — link to `/dashboard/billing`

Hidden entirely: API Keys section, Delete Workspace section.
Shown but disabled with "Coming Soon": advanced security toggles.

---

## Decision 15: Product Hub BU context pill

**Decision**: `AppCard.tsx` gains an optional `businessUnit?: string` prop. When present, a small pill `<span>` renders below the OS name showing the BU name. In `apps/page.tsx`, `core_bu_name` is read from sessionStorage and passed to the Commerce OS card only.

---

## Decision 16: Onboarding guard — redirect logic

**Decision**: The onboarding page checks `core_onboarding_done === "true"` on mount (via `useEffect`). If true, immediately redirects to `/dashboard`. The dashboard layout checks the inverse: if `core_onboarding_done` is not set, redirects to `/onboarding`.

This bidirectional guard prevents both "skip onboarding" and "redo completed onboarding" scenarios.

---

## Decision 17: Sidebar nav-items.ts changes

**Decision**: Update `lib/mock-data/nav-items.ts` to include 6 items:

```ts
export const navItems: NavItem[] = [
  { label: "Dashboard",      href: "/dashboard",               icon: "dashboard"   },
  { label: "Product Hub",    href: "/dashboard/apps",           icon: "apps"        },
  { label: "Billing",        href: "/dashboard/billing",        icon: "credit-card" },
  { label: "Team & Access",  href: "/dashboard/team",           icon: "users"       },
  { label: "Integrations",   href: "/dashboard/integrations",   icon: "layers"      },
  { label: "Settings",       href: "/dashboard/settings",       icon: "settings"    },
];
```

Remove the `resources` array entirely from `Sidebar.tsx`. Remove the bottom Beta card.

---

## Summary Table

| File | Action | Reason |
|------|--------|--------|
| `lib/core-session.ts` | Create | 12 spec-mandated session keys |
| `lib/core-theme.ts` | Create | Theme management |
| `components/CoreProvider.tsx` | Create | Applies locale + theme to `<html>` |
| `components/onboarding/OnboardingStepper.tsx` | Create | Horizontal stepper |
| `components/onboarding/steps/StepLanguage.tsx` | Create | Step 1 |
| `components/onboarding/steps/StepWorkspace.tsx` | Create | Step 2 |
| `components/onboarding/steps/StepBusinessUnit.tsx` | Create | Step 3 |
| `components/onboarding/steps/StepBranch.tsx` | Create | Step 4 |
| `components/dashboard/ThemeToggle.tsx` | Create | Theme control |
| `components/dashboard/LocaleToggle.tsx` | Create | Locale control |
| `components/dashboard/NotificationsDropdown.tsx` | Create | Notifications |
| `components/dashboard/UserMenuDropdown.tsx` | Create | User menu |
| `components/dashboard/InviteUserModal.tsx` | Create | Invite form |
| `app/dashboard/team/page.tsx` | Create | Team & Access page |
| `app/dashboard/integrations/page.tsx` | Create | Integrations Hub |
| `app/layout.tsx` | Modify | Use CoreProvider |
| `app/globals.css` | Modify | Theme CSS vars |
| `app/onboarding/page.tsx` | Rewrite | 4-step flow |
| `lib/locale.ts` | Modify | core_locale key |
| `components/LocaleProvider.tsx` | Remove | Replaced by CoreProvider |
| `components/dashboard/Sidebar.tsx` | Modify | Nav cleanup |
| `components/dashboard/Topbar.tsx` | Modify | Add controls |
| `lib/mock-data/nav-items.ts` | Modify | 6 links |
| `lib/mock-data/apps.ts` | Modify | businessUnit field |
| `app/dashboard/apps/page.tsx` | Modify | BU context |
| `components/dashboard/AppCard.tsx` | Modify | businessUnit prop |
| `app/dashboard/settings/page.tsx` | Modify | MVP sections |
