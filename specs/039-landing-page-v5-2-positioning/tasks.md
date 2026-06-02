---
description: "Task list for landing page v5.2 positioning — content-only updates across 7 section files"
---

# Tasks: Landing Page v5.2 Positioning

**Input**: Design documents from `specs/039-landing-page-v5-2-positioning/`
**Prerequisites**: plan.md ✅ · spec.md ✅ · research.md ✅ · data-model.md ✅ · contracts/os-item.md ✅ · quickstart.md ✅

**Tests**: Not requested. Verification is manual via grep commands and visual browser check (see quickstart.md).

**Organization**: Tasks are grouped by user story. All changes are content/copy edits in `apps/landing/src/sections/`. No new files, no new packages.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no state dependencies)
- **[Story]**: Which user story this task belongs to
- **No [P]**: Same file as prior task — must run sequentially

---

## Phase 1: Setup

**Purpose**: Confirm icon availability before implementation begins — blocks US3 work

- [x] T001 Verify `Dumbbell` and `BriefcaseBusiness` icons exist in lucide-react v1.14.0 by running `grep -r "Dumbbell\|BriefcaseBusiness" apps/landing/node_modules/lucide-react/dist/lucide-react.js | head -5` — if `BriefcaseBusiness` is absent, use `Briefcase` as fallback and update research.md accordingly

---

## Phase 2: Foundational (Blocking Prerequisite)

**Purpose**: Update the section anchor id — this is the single change that must land before US5 anchor links can be independently verified

**⚠️ CRITICAL**: US5 anchor verification depends on this being complete first

- [x] T002 Update section element id from `"apps"` to `"products"` in `apps/landing/src/sections/apps/apps.tsx` — change `<motion.section id="apps"` to `<motion.section id="products"`

**Checkpoint**: Section anchor `#products` is now live — US5 nav/footer/CTA links can be verified once their labels are updated

---

## Phase 3: User Story 1 — Business Operating Platform Hero (Priority: P1) 🎯 MVP

**Goal**: Replace outdated "modular SaaS platform" hero copy with Business Operating Platform positioning

**Independent Test**: Open the landing page in a browser. Read only the hero section. The headline must contain "Business Operating Platform", the description must not contain "modular SaaS" or "future business apps", and the three feature pills must reflect OS platform language.

### Implementation for User Story 1

- [x] T003 [US1] Update `headline` constant and gradient range in `apps/landing/src/sections/hero/hero.tsx` — replace headline string with `"The Business Operating Platform for every business domain"` and update the `isGradient` condition to highlight words at index 1–3 ("Business", "Operating", "Platform"): change `i >= headlineWords.indexOf("modular")` to `i >= 1 && i <= 3`
- [x] T004 [US1] Update the description `<motion.p>` text in `apps/landing/src/sections/hero/hero.tsx` — replace with: `"NexoraXS is a Business Operating Platform — a shared foundation powering independent Operating Systems for Commerce, Healthcare, HR, CRM, Gym, and Maintenance."`
- [x] T005 [US1] Replace the `featurePills` array in `apps/landing/src/sections/hero/hero.tsx` with: `["Business Operating Platform", "6 Operating Systems planned", "Commerce OS — available now"]`

**Checkpoint**: Hero section now communicates Business Operating Platform identity; US1 is independently testable

---

## Phase 4: User Story 2 — Commerce OS Active Product Card (Priority: P1) 🎯 MVP

**Goal**: Rename the "Shops" card to "Commerce OS" and update its chip, heading, and description so visitors identify Commerce OS as the current active product

**Independent Test**: Scroll to the products section. The first card must be labeled "Commerce OS" with no Coming Soon badge, show tagline "Commerce & Business Presets", and describe POS, inventory, and presets including restaurants and pharmacy.

### Implementation for User Story 2

- [x] T006 [US2] Update the products section chip text from `"// app launcher"` to `"// product hub"` in `apps/landing/src/sections/apps/apps.tsx`
- [x] T007 [US2] Update the section `<h2>` from `"Our Apps"` to `"Product Hub"` in `apps/landing/src/sections/apps/apps.tsx`
- [x] T008 [US2] Update the section subheading paragraph from `"One platform. Multiple business tools. All under one login."` to `"One platform. Multiple Operating Systems. All under one login."` in `apps/landing/src/sections/apps/apps.tsx`
- [x] T009 [US2] Update the first entry in the `apps` array in `apps/landing/src/sections/apps/apps.tsx` — change `name` to `"Commerce OS"`, `tagline` to `"Commerce & Business Presets"`, and `description` to `"Sell, manage inventory, run POS, and serve customers — with presets for retail, restaurants, pharmacy, and more."`

**Checkpoint**: Products section heading is correct and Commerce OS card is visible as the active product; US2 is independently testable

---

## Phase 5: User Story 3 — Full Operating System Roadmap (Priority: P2)

**Goal**: Replace Clinics card with Healthcare OS, remove Restaurants card, add HR OS and Gym OS cards, and update CRM and Maintenance card names and descriptions — resulting in exactly 6 OS product cards

**Independent Test**: Scroll to the products section. Count the cards: exactly 6. Verify Healthcare OS, HR OS, CRM OS, Gym OS, and Maintenance OS each have a Coming Soon badge. Confirm no "Clinics" or "Restaurants" card exists.

### Implementation for User Story 3

- [x] T010 [US3] Update imports at the top of `apps/landing/src/sections/apps/apps.tsx` — add `BriefcaseBusiness` and `Dumbbell` to the lucide-react import; remove `Utensils` (use `Briefcase` instead of `BriefcaseBusiness` if T001 found it unavailable)
- [x] T011 [US3] Update the Clinics entry in the `apps` array in `apps/landing/src/sections/apps/apps.tsx` — change `name` to `"Healthcare OS"`, update `description` to `"A planned Operating System for appointments, patient records, clinical workflows, and healthcare teams."` (keep `Stethoscope` icon, emerald accent, Coming Soon badge)
- [x] T012 [US3] Replace the Restaurants entry in the `apps` array in `apps/landing/src/sections/apps/apps.tsx` with the new HR OS card: `name: "HR OS"`, `tagline: "People & Workforce"`, `description: "A planned Operating System for employees, attendance, payroll, leaves, and HR workflows."`, `badge: "Coming Soon"`, `icon: BriefcaseBusiness`, `accent: "text-violet-300"`, `iconBg: "bg-violet-500/15"`, `glow: "rgba(139, 92, 246, 0.2)"`
- [x] T013 [US3] Update the CRM entry in the `apps` array in `apps/landing/src/sections/apps/apps.tsx` — change `name` to `"CRM OS"`, update `description` to `"A planned Operating System for leads, deals, campaigns, and customer relationship workflows."` (keep `UsersRound`, cyan accent, Coming Soon badge)
- [x] T014 [US3] Add a new Gym OS card after CRM OS in the `apps` array in `apps/landing/src/sections/apps/apps.tsx`: `name: "Gym OS"`, `tagline: "Fitness & Memberships"`, `description: "A planned Operating System for gym members, memberships, trainers, classes, and renewals."`, `badge: "Coming Soon"`, `icon: Dumbbell`, `accent: "text-orange-300"`, `iconBg: "bg-orange-500/15"`, `glow: "rgba(249, 115, 22, 0.2)"`
- [x] T015 [US3] Update the Maintenance entry in the `apps` array in `apps/landing/src/sections/apps/apps.tsx` — change `name` to `"Maintenance OS"`, update `description` to `"A planned Operating System for repair centers, tickets, technicians, warranties, and service operations."`, change `accent` to `"text-pink-300"`, `iconBg` to `"bg-pink-500/15"`, `glow` to `"rgba(236, 72, 153, 0.2)"` (color reassigned from orange to pink; orange now belongs to Gym OS)

**Checkpoint**: Products section shows exactly 6 OS cards with correct names and badges; US3 is independently testable

---

## Phase 6: User Story 4 — Platform Model Section (Priority: P2)

**Goal**: Update platform section heading, description, "App Satellites" label, and tile list to reflect the Core Platform + Operating Systems architecture model

**Independent Test**: Scroll to the platform model section. The heading must not say "Many Apps". The right panel must be labeled "Operating Systems" and its tiles must list the 6 OS names (Commerce OS through Maintenance OS). No legacy tile names ("Shops", "Clinics", "Restaurants") should appear.

### Implementation for User Story 4

- [x] T016 [US4] Update the platform section `<h2>` from `"One Core. Many Apps."` to `"One Core. Six Operating Systems."` in `apps/landing/src/sections/platform/platform.tsx`
- [x] T017 [US4] Update the platform section description paragraph in `apps/landing/src/sections/platform/platform.tsx` — replace with: `"NexoraXS separates the shared Core Platform from independent Operating Systems — so workspaces, authentication, billing, and OS access stay in one core while each Operating System owns its domain."`
- [x] T018 [US4] Change the `<p className="mono-chip text-cyan-200">` label from `"App Satellites"` to `"Operating Systems"` in `apps/landing/src/sections/platform/platform.tsx`
- [x] T019 [US4] Replace the `appTiles` array in `apps/landing/src/sections/platform/platform.tsx` with: `["Commerce OS", "Healthcare OS", "HR OS", "CRM OS", "Gym OS", "Maintenance OS"]`

**Checkpoint**: Platform section communicates Core Platform + 6 OS model; US4 is independently testable

---

## Phase 7: User Story 5 — Navigation and Footer Labels (Priority: P3)

**Goal**: Rename all "Apps" nav/footer/CTA references to "Products" and update all `#apps` href values to `#products`

**Independent Test**: Click the "Products" link in the navbar — page scrolls to the products section. Click the "Products" link in the footer — same result. Click the "Explore Products" CTA button — same result. All three links must resolve correctly (T002 section id change is a prerequisite).

### Implementation for User Story 5

- [x] T020 [P] [US5] Update the `navLinks` array in `apps/landing/src/sections/navbar/navbar.tsx` — change the entry `{ label: "Apps", href: "#apps" }` to `{ label: "Products", href: "#products" }`
- [x] T021 [P] [US5] Update the footer "Apps" link in `apps/landing/src/sections/footer/footer.tsx` — change `{ label: "Apps", href: "#apps" }` to `{ label: "Products", href: "#products" }` in the Product link group
- [x] T022 [P] [US5] Update the CTA section in `apps/landing/src/sections/cta/cta.tsx` — change the secondary button `href` from `"#apps"` to `"#products"`, its label from `"Explore Apps"` to `"Explore Products"`, and the description paragraph from `"Explore the MVP path for a workspace-based platform with modular apps."` to `"Explore Commerce OS — the first Operating System available on the platform."`

**Checkpoint**: All three anchor links resolve to `#products`; US5 is independently testable. All 5 user stories are now complete.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Update the two features.tsx descriptions that still reference "apps" and run the full verification checklist

- [x] T023 Update the `"Modular Architecture"` and `"Workspace Management"` card descriptions in `apps/landing/src/sections/features/features.tsx` — change `"Start with the platform core, then add focused business apps as the product expands."` to `"Start with the Core Platform, then activate independent Operating Systems as your business grows."` and change `"Keep teams, billing, and enabled apps organized around workspace boundaries."` to `"Keep teams, billing, and enabled Operating Systems organized around workspace boundaries."`
- [x] T024 Run verification checklist from `specs/039-landing-page-v5-2-positioning/quickstart.md` — confirm all grep checks return zero results (`"Shops"`, `"Clinics"`, `"Restaurants"`, `#apps`, `"Apps"` in nav/footer context) and perform visual browser check at all viewports

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1; MUST complete before US5 anchor testing
- **US1 (Phase 3)**: Independent after Phase 1 — hero.tsx is isolated from all other changes
- **US2 (Phase 4)**: Depends on Phase 2 (shares apps.tsx)
- **US3 (Phase 5)**: Depends on Phase 4 (continues apps.tsx edits; also depends on T001 icon check)
- **US4 (Phase 6)**: Independent after Phase 1 — platform.tsx is isolated; can run in parallel with US1–US3
- **US5 (Phase 7)**: Depends on Phase 2 (anchor id must be live first); otherwise navbar/footer/cta are independent files
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

```
Phase 1 (Setup)
    └── Phase 2 (Foundational: section id)
            ├── US1 (Phase 3): hero.tsx — fully independent
            ├── US2 (Phase 4): apps.tsx chip/heading/Commerce OS card
            │       └── US3 (Phase 5): apps.tsx remaining OS cards — sequential after US2 (same file)
            ├── US4 (Phase 6): platform.tsx — fully independent
            └── US5 (Phase 7): navbar + footer + cta — parallel files, depends on Phase 2 anchor
Phase 8 (Polish): features.tsx + verification — after all stories
```

### Parallel Opportunities

- After Phase 1+2: US1, US4, and US5 can all run in parallel (different files)
- US2 and US3 must run sequentially (same file: apps.tsx)
- Within US5: T020, T021, T022 are all [P] — three different files, no dependencies

---

## Parallel Example: After Phase 2

```text
# Developer A — hero and platform (parallel):
T003 → T004 → T005 (hero.tsx)
T016 → T017 → T018 → T019 (platform.tsx)

# Developer B — products section (sequential within file):
T006 → T007 → T008 → T009 (apps.tsx US2)
  → T010 → T011 → T012 → T013 → T014 → T015 (apps.tsx US3)

# Developer C — navigation (parallel files):
T020 (navbar.tsx) + T021 (footer.tsx) + T022 (cta.tsx)
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. Complete Phase 1: Setup — icon check
2. Complete Phase 2: Foundational — section id
3. Complete Phase 3: US1 — hero copy
4. Complete Phase 4: US2 — Commerce OS card + products heading
5. **STOP and VALIDATE**: Hero says "Business Operating Platform"; products section shows "Commerce OS" as active product
6. Ship or demo the hero + Commerce OS positioning

### Incremental Delivery

1. Setup + Foundational → anchor working
2. US1 → Business Operating Platform hero ✅
3. US2 → Commerce OS card visible ✅
4. US3 → Full 6-card OS roadmap ✅
5. US4 → Platform model section updated ✅
6. US5 → All nav/footer/CTA labels updated ✅
7. Polish → features.tsx + verification ✅

### Single-Developer Order

T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013 → T014 → T015 → T016 → T017 → T018 → T019 → T020 → T021 → T022 → T023 → T024

---

## Notes

- No new files created — all 24 tasks edit existing files
- No new packages or dependencies added
- `[P]` in US5 (T020–T022): three different files, fully parallelizable
- T002 (section id) is the only foundational blocker; everything else is independent
- If `BriefcaseBusiness` icon is unavailable (T001 result), substitute `Briefcase` in T010 and T012
- Commit after each Phase checkpoint for clean git history
- Run TypeScript check after completing all tasks: `pnpm --filter landing build`
