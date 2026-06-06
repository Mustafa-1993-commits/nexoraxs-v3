---

description: "Task list for Core Platform UX Alignment"
---

# Tasks: Core Platform UX Alignment

**Input**: Design documents from `/specs/041-core-platform-ux-alignment/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: Not requested — manual visual verification + `pnpm --filter core-platform build` only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no shared-state dependencies)
- **[Story]**: Which user story this task belongs to (US1–US7)
- Include exact file paths in every task description

---

## Phase 1: Setup

**Purpose**: Verify the baseline build passes before changes begin.

- [x] T001 Run `pnpm --filter core-platform build` to confirm the current build passes with zero TypeScript errors before any modifications

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core session/theme/locale infrastructure and the `CoreProvider` that replaces `LocaleProvider`. MUST be complete before any user story implementation begins.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T002 Modify `apps/core-platform/lib/locale.ts` — change `LOCALE_KEY` from `"nexoraxs_locale"` to `"core_locale"` (single constant change per research Decision 3 and session contract)
- [x] T003 Create `apps/core-platform/lib/core-session.ts` — implement the 12 exact session keys from the session contract using the `ss()` / `sw()` helper pattern from quickstart.md; export `getWorkspaceName`, `setWorkspaceName`, `getWorkspaceCountry`, `setWorkspaceCountry`, `getWorkspaceCurrency`, `setWorkspaceCurrency`, `getWorkspaceTimezone`, `setWorkspaceTimezone`, `getBUName`, `setBUName`, `getBUIndustry`, `setBUIndustry`, `getBranchName`, `setBranchName`, `getBranchCity`, `setBranchCity`, `getBranchCountry`, `setBranchCountry`, `isOnboardingDone`, `completeOnboarding`; all functions must guard against SSR (`typeof window === "undefined"`)
- [x] T004 Create `apps/core-platform/lib/core-theme.ts` — implement `getTheme(): "light" | "dark"`, `setTheme(value: Theme): void`, and `subscribeToTheme(cb: () => void): () => void` using a custom `nexoraxs:theme-change` window event for reactive subscriptions; guard against SSR; default to `"dark"` when key is absent
- [x] T005 Create `apps/core-platform/components/CoreProvider.tsx` — `"use client"` component that uses `useSyncExternalStore` for both `locale` (from `lib/locale.ts`) and `theme` (from `lib/core-theme.ts`); applies `document.documentElement.dir` and `document.documentElement.lang` from locale in a `useEffect`; applies `document.documentElement.setAttribute("data-theme", theme)` in a separate `useEffect`; renders `<>{children}</>`
- [x] T006 Modify `apps/core-platform/app/layout.tsx` — replace `LocaleProvider` import with `CoreProvider` from `@/components/CoreProvider`; wrap children with `<CoreProvider>` instead of `<LocaleProvider>`; do NOT delete `apps/core-platform/components/LocaleProvider.tsx` at this stage — either refactor it to be a no-op wrapper that delegates to `CoreProvider` (for import compatibility) or leave it in place; it will only be removed in Phase 10 (T029) after confirming the build passes with zero remaining imports of `LocaleProvider`
- [x] T007 Modify `apps/core-platform/app/globals.css` — **add incrementally, do not rewrite existing styles**: append a new `:root` block for dark-default CSS custom properties (`--bg-page: #0a0a0f`, `--bg-surface: rgba(255,255,255,0.04)`, `--border-default: rgba(255,255,255,0.08)`, `--text-primary: #e5e7eb`, `--text-muted: rgba(255,255,255,0.5)`) and a `[data-theme="light"]` block for light overrides (`--bg-page: #f8fafc`, `--bg-surface: #ffffff`, `--border-default: #e2e8f0`, `--text-primary: #0f172a`, `--text-muted: #64748b`); only add `background: var(--bg-page)` and `color: var(--text-primary)` to `body` **if `body` does not already set those properties** — otherwise add the CSS vars alongside the existing rules rather than replacing them; only add the `background` and `border-color` vars to `.card` **if a `.card` selector already exists in globals.css** — do not create it if absent; the existing NexoraXS dark identity is the baseline dark default and must be preserved exactly

**Checkpoint**: Foundation ready — `CoreProvider` active, `core_locale` key in use, CSS theme system live, session helpers available.

---

## Phase 3: User Story 2 — Theme & Locale Controls (Priority: P1)

**Goal**: Create the two shared toggle UI components (LocaleToggle, ThemeToggle) that are reused in both the onboarding topbar (US1) and the platform shell topbar (US3). These are foundational shared components — US1 and US3 both depend on them.

**Independent Test**: Import `LocaleToggle` and `ThemeToggle` in isolation. Clicking EN/AR switches `core_locale` and triggers `CoreProvider` to update `document.dir`. Clicking the icon button switches `core_theme` and triggers `CoreProvider` to update `data-theme` on `<html>`. Both controls update without page reload.

- [x] T008 [P] [US2] Create `apps/core-platform/components/dashboard/LocaleToggle.tsx` — `"use client"` component; reads locale via `useSyncExternalStore(subscribeToLocale, getLocale, () => "en")`; renders a pill with two buttons `EN` and `AR`; active button style: `bg-white/15 text-white`; inactive: `text-white/40`; clicking EN fires `setLocale("en")`, clicking AR fires `setLocale("ar")`; no props required per topbar contract
- [x] T009 [P] [US2] Create `apps/core-platform/components/dashboard/ThemeToggle.tsx` — `"use client"` component; reads theme via `useSyncExternalStore(subscribeToTheme, getTheme, () => "dark")`; renders a single icon button; shows `<Sun>` icon when in dark mode (click → `setTheme("light")`), shows `<Moon>` icon when in light mode (click → `setTheme("dark")`); icons from lucide-react only; no props required per topbar contract

**Checkpoint**: LocaleToggle and ThemeToggle ready for use in onboarding and shell topbars.

---

## Phase 4: User Story 1 — 4-step Onboarding (Priority: P1) 🎯 MVP

**Goal**: Replace the current 3-step onboarding with a 4-step horizontal stepper flow: Language → Workspace → Business Unit → Main Branch. Writes all 12 session keys on completion and redirects to dashboard.

**Independent Test**: Open Core Platform with no session data. The onboarding screen appears with a horizontal 4-step stepper. Complete all four steps. Verify in DevTools → Application → Session Storage that all 12 session keys exist with correct values and `core_onboarding_done = "true"`. Refresh the page — redirects to `/dashboard`, not onboarding.

- [x] T010 [US1] Create `apps/core-platform/components/onboarding/OnboardingStepper.tsx` — pure display component (no state, no sessionStorage reads); accepts `currentStep: 1 | 2 | 3 | 4` prop; renders 4 nodes connected by 3 lines in a horizontal row; each node is a 40×40 circle with step number or `<Check>` icon (16×16 lucide); completed steps (`step < currentStep`): `bg-blue-600/30 text-blue-400` with Check icon; active step (`step === currentStep`): `bg-blue-600 text-white` with step number; upcoming steps (`step > currentStep`): `border border-white/20 text-white/30` with step number; connecting lines: `bg-blue-500/40 h-px flex-1` between completed/active nodes, `bg-white/10 h-px flex-1` for upcoming; step labels below each circle: "Language", "Workspace", "Business Unit", "Main Branch" in matching colors per stepper contract; uses logical CSS margin/padding for RTL compliance
- [x] T011 [P] [US1] Create `apps/core-platform/components/onboarding/steps/StepLanguage.tsx` — accepts `onNext: () => void` prop (no `onBack`, Back is hidden on Step 1); renders two full-width card buttons for English (`<Globe2>` icon + "English" label) and Arabic (`<Globe2>` icon + "العربية" label in Arabic); selected card style: `border-blue-500 bg-blue-500/10`; selecting a language immediately calls `setLocale("en" | "ar")` and persists current selection; Continue button triggers `onNext()`; Continue is only enabled when a language is selected; Back button is not rendered
- [x] T012 [P] [US1] Create `apps/core-platform/components/onboarding/steps/StepWorkspace.tsx` — accepts `onNext: () => void` and `onBack: () => void` props; contains fields: Workspace Name (text, required), Country (select from `COUNTRY_DEFAULTS` keys, required), Currency (text, auto-filled from country selection via `COUNTRY_DEFAULTS`, user-editable), Timezone (text, auto-filled from country selection, user-editable); include `COUNTRY_DEFAULTS` map from data-model.md; inline field-level validation errors on Continue click for empty required fields; on Continue, writes `core_workspace_name`, `core_workspace_country`, `core_workspace_currency`, `core_workspace_timezone` via `core-session.ts`, then calls `onNext()`; pre-fills fields from existing session values if returning to this step
- [x] T013 [P] [US1] Create `apps/core-platform/components/onboarding/steps/StepBusinessUnit.tsx` — accepts `onNext: () => void` and `onBack: () => void` props; contains fields: Business Unit Name (text, required), Industry (select from `BU_INDUSTRIES` list, required); `BU_INDUSTRIES` from data-model.md: "Retail / General", "Retail / Pharmacy", "Restaurant / Cafe", "Supermarket", "Electronics / Mobile", "Cosmetics", "Medical Supplies", "Other"; inline validation on Continue click; on Continue, writes `core_bu_name` and `core_bu_industry` via `core-session.ts`, then calls `onNext()`; pre-fills from session if returning to this step
- [x] T014 [P] [US1] Create `apps/core-platform/components/onboarding/steps/StepBranch.tsx` — accepts `onFinish: () => void` and `onBack: () => void` props; contains fields: Branch Name (text, required), City (text, required), Country (select pre-filled from `getWorkspaceCountry()`, user-editable); inline validation on Finish click; on valid submit, writes `core_branch_name`, `core_branch_city`, `core_branch_country` via `core-session.ts`, then calls `completeOnboarding()` (writes `core_onboarding_done = "true"`), then calls `onFinish()`; Continue button labeled "Finish"
- [x] T015 [US1] Rewrite `apps/core-platform/app/onboarding/page.tsx` — `"use client"` component; `useState<OnboardingStep>(1)` for current step; `useEffect` on mount: if `isOnboardingDone()` then `router.replace("/dashboard")`; renders a minimal topbar (NexoraXS logo left + `<LocaleToggle />` + `<ThemeToggle />` right — login page NOT modified); centered card layout `max-w-lg` with `<OnboardingStepper currentStep={step} />` above the card; renders `<StepLanguage>`, `<StepWorkspace>`, `<StepBusinessUnit>`, or `<StepBranch>` conditionally based on `step`; `handleFinish` calls `router.replace("/dashboard")`; Back navigation restores previous step index

**Checkpoint**: Full onboarding flow works end-to-end. All 12 session keys written. Dashboard redirect fires on completion. Locale/theme toggles functional in onboarding topbar. Stepper shows correct active/completed/upcoming states.

---

## Phase 5: User Story 3 — Platform Shell Improvements (Priority: P1)

**Goal**: Clean up the sidebar to 6 exact links, remove beta card and dead items, and add all four topbar controls. Guard dashboard entry so users without completed onboarding are redirected.

**Independent Test**: Open the dashboard. Sidebar shows exactly 6 links: Dashboard, Product Hub, Billing, Team & Access, Integrations, Settings — no Documentation/Changelog/Support. Clicking Notifications opens a dropdown with 3 items. Clicking the user avatar opens a menu with 4 items. LocaleToggle and ThemeToggle are visible in the topbar and functional.

- [x] T016 [P] [US3] Create `apps/core-platform/components/dashboard/NotificationsDropdown.tsx` — `"use client"` component; `useState(false)` for open state; click-outside handler via `useEffect` with a `mousedown` listener on `document`; closed state: `<Bell>` lucide icon button with an unread badge dot; open state: absolutely positioned dropdown (`absolute right-0 z-50`, min-width 320px) showing 3 rows from `MOCK_NOTIFICATIONS` data-model (alert-triangle/amber, check-circle/emerald, credit-card/blue); each row: colored icon + bold title + small muted body + xs timestamp; "View all" link at bottom is disabled with Coming Soon label; no props required
- [x] T017 [P] [US3] Create `apps/core-platform/components/dashboard/UserMenuDropdown.tsx` — `"use client"` component; reads `getMockUserName()` and `getMockUserEmail()` from existing `lib/session.ts`; click-outside handler; closed state: circle div with user initials (first letter of name) or `<UserCircle2>` fallback; open state: dropdown with header (name + email, read-only), divider, four items: Account (disabled + "Coming Soon" badge), Billing (navigates to `/dashboard/billing` via `router.push`), Team (navigates to `/dashboard/team`), divider, Sign out; **Sign out behavior**: first check `lib/session.ts` for an existing mock logout or sign-out helper and call it if one exists; if no such helper exists, remove only the Core Platform session keys defined in the `KEYS` object in `lib/core-session.ts` one by one (do NOT call `sessionStorage.clear()` — this would wipe Commerce OS / shops-app demo data that may be present in the same session); after key removal call `router.replace("/login")`; no props required per topbar contract
- [x] T018 [US3] Modify `apps/core-platform/lib/mock-data/nav-items.ts` — replace the existing nav items array with exactly 6 items in this order: `{ label: "Dashboard", href: "/dashboard", icon: "dashboard" }`, `{ label: "Product Hub", href: "/dashboard/apps", icon: "apps" }`, `{ label: "Billing", href: "/dashboard/billing", icon: "credit-card" }`, `{ label: "Team & Access", href: "/dashboard/team", icon: "users" }`, `{ label: "Integrations", href: "/dashboard/integrations", icon: "layers" }`, `{ label: "Settings", href: "/dashboard/settings", icon: "settings" }`; remove any `resources` array if it exists
- [x] T019 [US3] Modify `apps/core-platform/components/dashboard/Sidebar.tsx` — remove any rendering of Documentation, Changelog, and Support nav links; remove the bottom Beta access card entirely; remove the `resources` section if present; keep the top logo area and primary nav items only; ensure the sidebar renders the 6 nav items from the updated `nav-items.ts`
- [x] T020 [US3] Modify `apps/core-platform/components/dashboard/Topbar.tsx` — add the four controls to the right side of the topbar in order: `<LocaleToggle />`, `<ThemeToggle />`, `<NotificationsDropdown />`, `<UserMenuDropdown />`; wrap them in `<div className="flex items-center gap-2">`; keep the existing breadcrumb/title on the left side; remove any existing `LanguageSwitcher` component usage (replaced by `LocaleToggle`)
- [x] T021 [US3] Create `apps/core-platform/components/dashboard/DashboardOnboardingGuard.tsx` — a small `"use client"` component with no visible output (`return null`); on mount via `useEffect`, calls `isOnboardingDone()` from `@/lib/core-session` and calls `router.replace("/onboarding")` if it returns false; this isolates the client-side guard into a dedicated component so the layout stays a server component; then modify `apps/core-platform/app/dashboard/layout.tsx` — render `<DashboardOnboardingGuard />` as the **first child** inside the existing layout JSX, without adding a `"use client"` directive to the layout file itself

**Checkpoint**: Sidebar has exactly 6 links. All four topbar controls functional. Dashboard entry guard active.

---

## Phase 6: User Story 4 — Product Hub BU Context (Priority: P2)

**Goal**: Surface the Business Unit name on the Commerce OS card in Product Hub. Remove all "Apps" language from the page.

**Independent Test**: Complete onboarding with BU name "Mustafa Pharmacy". Open `/dashboard/apps`. The Commerce OS card shows a pill with "Mustafa Pharmacy". Search the page source — zero instances of the word "Apps" as a heading or label. All non-Commerce OS cards show a Coming Soon badge.

- [x] T022 [P] [US4] Modify `apps/core-platform/lib/mock-data/apps.ts` — add `businessUnit?: string` field to the `OSItem` interface (or equivalent type definition in that file); this is the new optional field described in data-model.md
- [x] T023 [P] [US4] Modify `apps/core-platform/components/dashboard/AppCard.tsx` — add `businessUnit?: string` to the component's props interface; when `businessUnit` is provided, render a small pill `<span>` below the OS name (e.g. `text-xs px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400`) displaying the BU name; when not provided, render nothing extra
- [x] T024 [US4] Modify `apps/core-platform/app/dashboard/apps/page.tsx` — add `"use client"` directive if not already present; read `getBUName()` from `@/lib/core-session` and pass it as `businessUnit` prop to the Commerce OS `AppCard` only; ensure the page heading, section labels, and all card labels use "Product Hub" and "Operating Systems" — replace any occurrence of "Apps" as a product/section label; ensure all non-Commerce OS cards receive a Coming Soon badge and their action buttons are disabled or absent

**Checkpoint**: Product Hub shows BU context on Commerce OS card. Zero "Apps" label occurrences. All non-Commerce OS cards marked Coming Soon.

---

## Phase 7: User Story 5 — Team & Access (Priority: P2)

**Goal**: Create the `/dashboard/team` page with a team list and functional Invite User modal.

**Independent Test**: Navigate to `/dashboard/team`. The page loads with at least one mock team member (the workspace owner). Click "Invite User" — modal opens with 7 fields. Fill email "test@example.com", select Commerce OS, click Send Invite. Modal closes. Team list now shows the invited mock member. Try submitting with an empty email — inline validation error appears, modal stays open.

- [x] T025 [US5] Create `apps/core-platform/components/dashboard/InviteUserModal.tsx` — modal overlay component; props: `open: boolean`, `onClose: () => void`, `onInvite: (member: MockTeamMember) => void`; fields: Email (text input, required — show inline error "Email is required" on submit if empty), Name (text input, optional), Workspace Role (select: Owner/Admin/Member), Operating System (select: "Commerce OS" as only enabled option), Business Unit (select: value from `getBUName()` + "All"), Branch (select: value from `getBranchName()` + "All"), OS Role (select: `COMMERCE_OS_ROLES` from data-model.md — Commerce Admin/Branch Manager/Cashier/Inventory Manager/Accountant/Viewer); on valid submit, construct a `MockTeamMember` object and call `onInvite(member)` then `onClose()`; clicking the X or clicking outside closes without persisting; no real email sent, no backend calls per FR-035 and FR-036
- [x] T026 [US5] Create `apps/core-platform/app/dashboard/team/page.tsx` — `"use client"` page; initial state: one mock owner member from `getMockUserName()` / `getMockUserEmail()` with `workspaceRole: "Owner"`, `osAccess: "Commerce OS"`, `status: "active"`; `useState<MockTeamMember[]>` for the team list; renders a page heading "Team & Access", team list table/grid showing each member's email, name, role, OS access, status; "Invite User" button that sets `modalOpen = true`; renders `<InviteUserModal>` with `open`, `onClose`, and `onInvite` (appends new member to list) props; list updates immediately on invite without page reload

**Checkpoint**: `/dashboard/team` page functional. Invite modal opens, validates required email, adds mock member to list.

---

## Phase 8: User Story 6 — Integrations Hub (Priority: P3)

**Goal**: Create the `/dashboard/integrations` read-only page with 5 integration cards.

**Independent Test**: Click Integrations in the sidebar. Page loads with 5 cards in a 2-column grid. Each card shows two OS pills, a title, description, and a "Coming Soon" badge. All action buttons are disabled or absent — no navigation occurs.

- [x] T027 [US6] Create `apps/core-platform/app/dashboard/integrations/page.tsx` — server component (no `"use client"` needed since no interactivity); render page heading "Integrations Hub"; render the 5 `INTEGRATION_CARD` entries from data-model.md in a `grid grid-cols-1 md:grid-cols-2 gap-4` layout; each card shows: two OS pills (osA and osB labels), card title, card description, a "Coming Soon" badge (`bg-amber-500/15 text-amber-400`), and a "Notify Me" button that is `disabled` with `cursor-not-allowed` styling; no real action on any button per FR-039

**Checkpoint**: `/dashboard/integrations` page shows 5 cards, all in Coming Soon state, zero functional actions.

---

## Phase 9: User Story 7 — Settings Cleanup (Priority: P3)

**Goal**: Restructure the Settings page to show only the 5 MVP-relevant sections and hide or disable the rest.

**Acceptance Scenarios**:
1. Settings shows: Workspace, Language & Region, Appearance, Team & Access, Billing sections.
2. API Keys, Delete Workspace are hidden or marked Coming Soon.

- [x] T028 [US7] Modify `apps/core-platform/app/dashboard/settings/page.tsx` — restructure into 5 sections: (1) **Workspace** — reads `getWorkspaceName()` / `getWorkspaceCountry()` / `getWorkspaceCurrency()` and shows them as read-only display fields; (2) **Language & Region** — renders `<LocaleToggle />` inline + shows `getWorkspaceTimezone()` as a read-only display; (3) **Appearance** — renders `<ThemeToggle />` inline; (4) **Team & Access** — a card/link directing to `/dashboard/team`; (5) **Billing** — a card/link directing to `/dashboard/billing`; hide API Keys and Delete Workspace sections entirely; any advanced security toggles that exist must be disabled and labeled "Coming Soon" per FR-040 and FR-041

**Checkpoint**: Settings page shows exactly 5 sections. No API Keys or Delete Workspace visible. All controls are functional, navigating, or clearly disabled.

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and compliance checks across all user stories.

- [x] T029 [P] Audit every visible and enabled button across all Core Platform pages (`/onboarding`, `/dashboard`, `/dashboard/apps`, `/dashboard/team`, `/dashboard/integrations`, `/dashboard/settings`, `/dashboard/billing`) to ensure each satisfies FR-042: (a) works as expected, (b) navigates to an existing route, or (c) is disabled or shows Coming Soon — fix any dead active buttons found; also run `grep -r "LocaleProvider" apps/core-platform/` and if the result is empty (no remaining imports), delete `apps/core-platform/components/LocaleProvider.tsx` and re-run the build to confirm zero errors — if imports remain, leave the file in place
- [x] T030 Run `pnpm --filter core-platform build` and resolve all TypeScript errors to zero — this is the primary automated quality gate for SC-011
- [x] T031 Complete the quickstart.md verification checklist — manually walk through all 28 verification steps listed in `specs/041-core-platform-ux-alignment/quickstart.md` and confirm each passes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 passing — **BLOCKS all user stories**
- **US2 Controls (Phase 3)**: Depends on Phase 2 (imports locale.ts and core-theme.ts) — **BLOCKS US1 onboarding topbar and US3 shell topbar**
- **US1 Onboarding (Phase 4)**: Depends on Phase 2 + Phase 3 (US2 toggle components)
- **US3 Shell (Phase 5)**: Depends on Phase 2 + Phase 3 (US2 toggle components)
- **US4 Product Hub (Phase 6)**: Depends on Phase 2 (needs core-session.ts for `getBUName()`)
- **US5 Team & Access (Phase 7)**: Depends on Phase 2 (needs core-session.ts for mock data); independent of US4
- **US6 Integrations (Phase 8)**: Depends on Phase 2 only (static data page); can run in parallel with US4, US5
- **US7 Settings (Phase 9)**: Depends on Phase 2 + US2 (uses LocaleToggle + ThemeToggle inline); can run in parallel with US4–US6
- **Polish (Phase 10)**: Depends on all user stories complete

### User Story Dependencies

- **US2 (P1)**: Depends on Foundation (Phase 2) — no user story dependencies
- **US1 (P1)**: Depends on Foundation + US2 controls (LocaleToggle, ThemeToggle)
- **US3 (P1)**: Depends on Foundation + US2 controls; independent of US1
- **US4 (P2)**: Depends on Foundation only; independent of US1/US2/US3
- **US5 (P2)**: Depends on Foundation only; independent of all P1 stories
- **US6 (P3)**: Depends on Foundation only; fully independent
- **US7 (P3)**: Depends on Foundation + US2 controls; independent of US1/US3–US6

### Within Each Phase

- Steps components in US1 (T011–T014) — parallel
- NotificationsDropdown + UserMenuDropdown in US3 (T016–T017) — parallel
- apps.ts + AppCard.tsx in US4 (T022–T023) — parallel
- LocaleToggle + ThemeToggle in US2 (T008–T009) — parallel

---

## Parallel Execution Examples

### Phase 3 (US2) — Both controls in parallel

```
Parallel track:
  T008: Create LocaleToggle.tsx (imports from lib/locale.ts)
  T009: Create ThemeToggle.tsx  (imports from lib/core-theme.ts)
```

### Phase 4 (US1) — Step components in parallel, then page

```
Sequential:
  T010: OnboardingStepper.tsx

Parallel after T010:
  T011: StepLanguage.tsx
  T012: StepWorkspace.tsx
  T013: StepBusinessUnit.tsx
  T014: StepBranch.tsx

Sequential after all steps:
  T015: onboarding/page.tsx rewrite
```

### Phase 5 (US3) — Dropdowns in parallel, then topbar/sidebar

```
Parallel:
  T016: NotificationsDropdown.tsx
  T017: UserMenuDropdown.tsx

Sequential after T016+T017:
  T018: nav-items.ts update
  T019: Sidebar.tsx modification
  T020: Topbar.tsx modification (uses T016, T017, T008, T009)
  T021: DashboardOnboardingGuard.tsx (new file) + minimal layout.tsx edit
```

### Phase 6 (US4) — Data and component in parallel, then page

```
Parallel:
  T022: apps.ts OSItem interface update
  T023: AppCard.tsx businessUnit prop

Sequential after T022+T023:
  T024: apps/page.tsx BU context + "Apps" cleanup
```

---

## Implementation Strategy

### MVP Scope (US1 + US2 + US3 only)

1. Complete Phase 1: Setup (verify baseline)
2. Complete Phase 2: Foundation (6 tasks — CRITICAL)
3. Complete Phase 3: US2 (2 toggle components)
4. Complete Phase 4: US1 (6 tasks — onboarding)
5. Complete Phase 5: US3 (6 tasks — shell cleanup)
6. **STOP and VALIDATE**: Full P1 user stories working
7. Run `pnpm --filter core-platform build`

### Full Incremental Delivery

1. Foundation → US2 → US1 → Validate onboarding flow
2. US3 → Validate shell (sidebar + topbar + entry guard)
3. US4 → Validate Product Hub BU context
4. US5 → Validate Team & Access invite modal
5. US6 → Validate Integrations Hub
6. US7 → Validate Settings
7. Polish (T029–T031)

---

## Notes

- `[P]` = different files, no intra-task dependencies — safe to implement in parallel
- `[USn]` label maps directly to user story n in spec.md
- No tests were requested — verification is manual + build compilation
- The build check (`pnpm --filter core-platform build`) is the authoritative quality gate (SC-011)
- **Scope**: All implementation changes are confined to `apps/core-platform` and `specs/041-core-platform-ux-alignment` — do not modify `apps/shops-app` or any other app/package in this spec
- **LocaleProvider.tsx**: kept in place after T006; only removed during Polish (T029) if `grep -r "LocaleProvider"` shows zero remaining imports and the build passes
- **dashboard/layout.tsx**: remains a server component — the onboarding guard runs via the dedicated `DashboardOnboardingGuard.tsx` client component (T021)
- **Sign out**: removes Core Platform keys individually (never `sessionStorage.clear()`) to avoid wiping shops-app or other demo data
- **Theme CSS**: added incrementally in T007 — existing dark styles are the authoritative dark baseline; never overwrite styles not being intentionally updated
- All Lucide icons: lucide-react only — no emoji, no custom SVGs
- No new npm packages — existing TailwindCSS v4 + `@nexoraxs/ui` patterns only
- Session storage is the only persistence layer — no backend, no API calls
