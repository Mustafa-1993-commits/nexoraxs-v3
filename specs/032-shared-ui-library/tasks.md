# Tasks: packages/ui — Shared Component Library

**Branch**: `032-shared-ui-library`
**Input**: Design documents from `specs/032-shared-ui-library/`
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/component-api.md ✅

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks are grouped by user story. US6 (Icon) is built first despite being listed sixth in the spec — it has the most consumers and unblocks migration verification earliest. US8 (migration) is the final user story phase because it depends on all components existing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on each other)
- **[Story]**: Which user story this task belongs to (US1–US8)
- Exact file paths in every task description

---

## Phase 1: Setup (Package Infrastructure)

**Purpose**: Create the `packages/ui` package scaffolding — package.json, tsconfig.json, and design tokens. These files must exist before any component can be written or imported.

- [x] T001 Create `packages/ui/package.json` — set `name: "@nexoraxs/ui"`, `version: "0.1.0"`, `private: true`, `main: "src/index.ts"`, `types: "src/index.ts"`, `peerDependencies: { "react": "^19.0.0", "react-dom": "^19.0.0" }`
- [x] T002 [P] Create `packages/ui/tsconfig.json` — set `"strict": true`, `"jsx": "react-jsx"`, `"module": "esnext"`, `"moduleResolution": "bundler"`, `"paths": { "@nexoraxs/ui": ["./src/index.ts"] }`, `"include": ["src/**/*"]`
- [x] T003 [P] Create `packages/ui/src/tokens.css` — define all 8 NexoraXS CSS custom properties on `:root`: `--color-bg: #0a0a0f`, `--color-purple: #7C3AED`, `--color-purple-light: #8B5CF6`, `--color-blue: #3B82F6`, `--color-cyan: #06B6D4`, `--color-cyan-light: #00D4FF`, `--color-white: #FFFFFF`, `--color-muted: #94A3B8`

**Checkpoint**: `packages/ui/` directory has package.json, tsconfig.json, and src/tokens.css — the package scaffold is ready.

---

## Phase 2: Foundational (App Configuration — BLOCKS ALL USER STORIES)

**Purpose**: Wire consuming apps to the new package. Must complete before any component can be imported and tested in the apps.

⚠️ **CRITICAL**: No migration or app-level verification can happen until this phase is complete.

- [x] T004 [P] Add `"@nexoraxs/ui": "workspace:*"` to `dependencies` in `apps/core-platform/package.json`; update `apps/core-platform/next.config.ts` to add `transpilePackages: ["@nexoraxs/ui"]` to the `nextConfig` object
- [x] T005 [P] Add `"@nexoraxs/ui": "workspace:*"` to `dependencies` in `apps/shops-app/package.json`; update `apps/shops-app/next.config.ts` to add `transpilePackages: ["@nexoraxs/ui"]` to the `nextConfig` object
- [x] T006 Run `pnpm install` from repo root to create the workspace symlink for `@nexoraxs/ui` in both apps' `node_modules`

**Checkpoint**: Both `apps/core-platform/node_modules/@nexoraxs/ui` and `apps/shops-app/node_modules/@nexoraxs/ui` are symlinked to `packages/ui/`.

---

## Phase 3: User Story 6 — Icon Component (Priority: P1) 🎯 First Milestone

**Goal**: A shared `Icon` component with the merged 48-icon set from both apps, importable from `@nexoraxs/ui`.

**Independent Test**: Create a temporary test import `import { Icon } from "@nexoraxs/ui"` in any shops-app file, render `<Icon name="search" />` and `<Icon name="apps" />` (core-platform-only icon), confirm both render correctly and TypeScript passes.

- [x] T007 [US6] Create `packages/ui/src/components/Icon.tsx` — define the `IconName` union type with all 48 icons (union of shops-app set + core-platform-only: `apps`, `check`, `building`, `globe`, `zap`); copy the SVG path definitions from `apps/shops-app/components/ui/Icon.tsx` as the base and add the 5 missing core-platform paths; export `IconName`, `IconProps`, and `Icon` function — same API as existing apps (name, className, strokeWidth props; viewBox 0 0 24 24; fill="none"; stroke="currentColor"; aria-hidden="true")

**Checkpoint**: `import { Icon, type IconName } from "@nexoraxs/ui"` resolves; all 48 icon names render a valid SVG.

---

## Phase 4: User Story 2 — Button Component (Priority: P1)

**Goal**: A shared `Button` with 4 variants and 3 sizes, importable from `@nexoraxs/ui`.

**Independent Test**: In `apps/core-platform/app/login/page.tsx`, replace `import { Button } from "@/components/ui/Button"` with `import { Button } from "@nexoraxs/ui"` — confirm the login page builds and renders identically.

- [x] T008 [US2] Create `packages/ui/src/components/Button.tsx` — implement `ButtonProps` per `contracts/component-api.md`; variants: `primary` (uses `btn-primary` class from app globals), `secondary` (border + hover), `ghost` (no border, hover only), `destructive` (rose/red style); sizes: `sm` (`px-3 py-1.5 text-xs`), `md` (`px-4 py-2.5 text-sm`), `lg` (`px-6 py-3 text-base`); disabled adds `opacity-40 cursor-not-allowed`; export `Button`, `ButtonProps`, `ButtonVariant`, `ButtonSize`

**Checkpoint**: `import { Button } from "@nexoraxs/ui"` resolves; all 4 variants and 3 sizes render correctly.

---

## Phase 5: User Story 3 — Input Component (Priority: P1)

**Goal**: A shared `Input` with label, error state, and disabled support, importable from `@nexoraxs/ui`.

**Independent Test**: In `apps/core-platform/app/register/page.tsx`, replace `import { Input } from "@/components/ui/Input"` with `import { Input } from "@nexoraxs/ui"` — confirm the register page builds and the field renders identically; add `error="Required"` and confirm the error message appears in red below the field.

- [x] T009 [US3] Create `packages/ui/src/components/Input.tsx` — implement `InputProps` per `contracts/component-api.md`; base style: `rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`; when `error` is set, add `border-rose-500` to input and render `<p className="text-xs text-rose-400 mt-1">{error}</p>`; label renders as `<label htmlFor={id}>`; export `Input`, `InputProps`

**Checkpoint**: `import { Input } from "@nexoraxs/ui"` resolves; label, input, and error message all render correctly.

---

## Phase 6: User Story 4 — Badge Component (Priority: P1)

**Goal**: A shared `Badge` with 6 semantic variants, importable from `@nexoraxs/ui`. Replaces the shops-app `Badge` that used color names.

**Independent Test**: Render `<Badge variant="success">Paid</Badge>`, `<Badge variant="warning">Pending</Badge>`, and `<Badge>Default</Badge>` — confirm each displays a distinct color per the NexoraXS palette.

- [x] T010 [US4] Create `packages/ui/src/components/Badge.tsx` — implement `BadgeProps` per `contracts/component-api.md`; variant-to-color mapping per data-model.md table (`default`→gray, `success`→emerald, `warning`→amber, `error`→rose, `info`→blue, `purple`→purple); render as `<span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium {variantClass}">` ; export `Badge`, `BadgeProps`, `BadgeVariant`

**Checkpoint**: `import { Badge } from "@nexoraxs/ui"` resolves; all 6 variants render with correct distinct colors.

---

## Phase 7: User Story 5 — Card Component (Priority: P2)

**Goal**: A shared `Card` with the NexoraXS dark glass style, importable from `@nexoraxs/ui`.

**Independent Test**: Wrap any content in `<Card>` — confirm the dark glass border and rounded corners appear. Add `hover` prop — confirm border subtly lightens on hover.

- [x] T011 [US5] Create `packages/ui/src/components/Card.tsx` — implement `CardProps` per `contracts/component-api.md`; base: `border border-white/[0.08] bg-white/[0.03] rounded-[20px]`; `hover={true}` adds `transition-colors hover:border-white/[0.16] hover:bg-white/5`; `as` prop allows `div | section | article` (default `div`); `className` is appended; export `Card`, `CardProps`

**Checkpoint**: `import { Card } from "@nexoraxs/ui"` resolves; dark glass style renders; hover effect works.

---

## Phase 8: User Story 7 — Logo Component (Priority: P2)

**Goal**: A shared `Logo` with `app` prop for both the NexoraXS wordmark and Shops brandmark, importable from `@nexoraxs/ui`.

**Independent Test**: Render `<Logo app="core" />` — confirm NexoraXS gradient wordmark appears. Render `<Logo app="shops" size="sm" />` — confirm the Shops brandmark appears at smaller size.

- [x] T012 [US7] Create `packages/ui/src/components/Logo.tsx` — implement `LogoProps` per `contracts/component-api.md`; `app="core"` renders the NexoraXS wordmark (gradient box + "NexoraXS" text — copy from `apps/core-platform/components/ui/Logo.tsx`); `app="shops"` renders the Shops brandmark (shopping-bag icon box + "Shops" text — copy from `apps/shops-app/components/ui/Logo.tsx`); `size` prop scales icon and text size (`sm`: `h-5 w-5 text-[13px]`, `md`: `h-7 w-7 text-[15px]`); the `apps="shops"` variant uses `<Icon name="shopping-bag">` from the shared Icon component; export `Logo`, `LogoProps`, `LogoApp`, `LogoSize`

**Checkpoint**: `import { Logo } from "@nexoraxs/ui"` resolves; both app variants render their correct brand mark.

---

## Phase 9: User Story 1 — Package Barrel Export (Priority: P1)

**Goal**: All 6 components and their types are accessible from a single `import { ... } from "@nexoraxs/ui"` statement.

**Independent Test**: Write `import { Button, Input, Badge, Card, Icon, Logo } from "@nexoraxs/ui"` in any app file and run `pnpm exec tsc --noEmit` — confirm zero TypeScript errors and all exports resolve.

- [x] T013 [US1] Create `packages/ui/src/index.ts` — barrel export all 6 components and their types per data-model.md barrel exports section: `Button`, `ButtonProps`, `ButtonVariant`, `ButtonSize`; `Input`, `InputProps`; `Badge`, `BadgeProps`, `BadgeVariant`; `Card`, `CardProps`; `Icon`, `IconProps`, `IconName`; `Logo`, `LogoProps`, `LogoApp`, `LogoSize`

**Checkpoint**: TypeScript resolves all named exports from `@nexoraxs/ui` with zero errors across both apps.

---

## Phase 10: User Story 8 — Migration & Build Verification (Priority: P1) 🔴 Critical

**Goal**: Remove all local copies of migrated components from both apps; update every import to `@nexoraxs/ui`; verify all builds pass.

**Independent Test**: After migration, run `pnpm --filter core-platform build && pnpm --filter shops-app build && pnpm --filter landing build` — all three must exit with code 0.

### Core-Platform Migration

- [x] T014 [US8] Update `apps/core-platform/lib/types.ts` — add re-export `export type { IconName } from "@nexoraxs/ui"` to preserve backward compatibility for any file that imports `IconName` from `@/lib/types`
- [x] T015 [P] [US8] Update all `apps/core-platform` source files that import from `@/components/ui/Icon` — replace with `import { Icon, type IconName } from "@nexoraxs/ui"` (files include: `components/dashboard/Sidebar.tsx`, `components/dashboard/Topbar.tsx`, and any other core-platform component importing Icon — run `grep -r "@/components/ui/Icon" apps/core-platform --include="*.tsx" --include="*.ts" -l` to get the full list)
- [x] T016 [P] [US8] Update `apps/core-platform/components/dashboard/Sidebar.tsx` — replace `import { Logo } from "@/components/ui/Logo"` with `import { Logo } from "@nexoraxs/ui"`; no prop change needed (Logo defaults to "core" variant)
- [x] T017 [P] [US8] Update `apps/core-platform/app/login/page.tsx` and `apps/core-platform/app/register/page.tsx` — replace `import { Button } from "@/components/ui/Button"` and `import { Input } from "@/components/ui/Input"` with a single `import { Button, Input } from "@nexoraxs/ui"`
- [x] T018 [US8] Delete `apps/core-platform/components/ui/Icon.tsx`, `apps/core-platform/components/ui/Logo.tsx`, `apps/core-platform/components/ui/Button.tsx`, `apps/core-platform/components/ui/Input.tsx` after confirming zero remaining imports reference these local files

### Shops-App Migration

- [x] T019 [P] [US8] Update all `apps/shops-app` source files that import from `@/components/ui/Icon` — replace with `import { Icon, type IconName } from "@nexoraxs/ui"` (run `grep -r "@/components/ui/Icon" apps/shops-app --include="*.tsx" --include="*.ts" -l` for full file list; includes all pos/, onboarding/, and dashboard/ components)
- [x] T020 [P] [US8] Update `apps/shops-app/components/dashboard/Sidebar.tsx` and `apps/shops-app/components/pos/POSHeader.tsx` — replace `import { Logo } from "@/components/ui/Logo"` with `import { Logo } from "@nexoraxs/ui"`; update usage from `<Logo />` to `<Logo app="shops" />` and `<Logo size="sm" />` to `<Logo app="shops" size="sm" />`
- [x] T021 [US8] Update all `apps/shops-app` source files that import from `@/components/dashboard/Badge` — replace with `import { Badge } from "@nexoraxs/ui"`; update every `<Badge color="X">` prop to the semantic variant per data-model.md migration mapping: `emerald`→`success`, `amber`→`warning`, `rose`→`error`, `blue`→`info`, `cyan`→`info`, `purple`→`purple`, `gray`→`default` (or omit variant for default); run `grep -r "components/dashboard/Badge" apps/shops-app --include="*.tsx" -l` for the full file list
- [x] T022 [US8] Delete `apps/shops-app/components/ui/Icon.tsx`, `apps/shops-app/components/ui/Logo.tsx`, `apps/shops-app/components/dashboard/Badge.tsx` after confirming zero remaining imports reference these local files

### Build Verification

- [x] T023 [US8] Run `pnpm --filter core-platform build` from repo root — fix any TypeScript or import errors until exit code is 0
- [x] T024 [US8] Run `pnpm --filter shops-app build` from repo root — fix any TypeScript or import errors until exit code is 0
- [x] T025 [US8] Run `pnpm --filter landing build` from repo root — confirm it still passes with exit code 0 (no changes expected)

**Checkpoint**: All three app builds pass. No local copies of Icon, Logo, Button, Input, or Badge remain in any app's components directory.

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, lint, and final type verification.

- [x] T026 Update `AGENTS.md` — add or update the `packages/ui` entry in the Monorepo Structure section: document package name `@nexoraxs/ui`, list all 6 exported components (Button, Input, Badge, Card, Icon, Logo), state the Principle III constraint (UI components only — no business logic, no domain data, no API calls)
- [x] T027 [P] Run `pnpm --filter core-platform lint` from repo root and fix any ESLint errors introduced by import changes
- [x] T028 [P] Run `pnpm --filter shops-app lint` from repo root and fix any ESLint errors introduced by import changes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — T002 and T003 can start in parallel immediately
- **Foundational (Phase 2)**: Depends on Phase 1; T004 and T005 can run in parallel; T006 depends on T004+T005
- **US6 Icon (Phase 3)**: Depends on Phase 2 (package must be installable)
- **US2 Button (Phase 4)**: Depends on Phase 2; independent of US6
- **US3 Input (Phase 5)**: Depends on Phase 2; independent of US6, US2
- **US4 Badge (Phase 6)**: Depends on Phase 2; independent of US6, US2, US3
- **US5 Card (Phase 7)**: Depends on Phase 2; independent of all other components
- **US7 Logo (Phase 8)**: Depends on Phase 3 (Logo uses the shared Icon component internally)
- **US1 Barrel (Phase 9)**: Depends on Phases 3–8 (all components must exist before barrel can export them)
- **US8 Migration (Phase 10)**: Depends on Phase 9 (barrel must exist before imports can be changed)
- **Polish (Phase 11)**: Depends on Phase 10

### User Story Dependencies

- **US6 (P1)**: Depends on Phase 2 foundational only
- **US2 (P1)**: Depends on Phase 2 foundational only
- **US3 (P1)**: Depends on Phase 2 foundational only
- **US4 (P1)**: Depends on Phase 2 foundational only
- **US5 (P2)**: Depends on Phase 2 foundational only
- **US7 (P2)**: Depends on US6 (uses Icon internally)
- **US1 (P1)**: Depends on US2, US3, US4, US5, US6, US7 (all components must exist)
- **US8 (P1)**: Depends on US1 (barrel must export everything before migration imports are updated)

### Parallel Opportunities Within Phases

- T002, T003 — parallel (Phase 1)
- T004, T005 — parallel (Phase 2)
- T007, T008, T009, T010, T011 — all parallel to each other (Phases 3–7, different files, no shared dependencies after Phase 2)
- T015, T016, T017 — parallel (core-platform migration, different files)
- T019, T020 — parallel (shops-app migration, different files)
- T027, T028 — parallel (different apps)

---

## Parallel Example: Component Creation (Phases 3–7)

After Phase 2 (foundational) completes, all component creation tasks can run in parallel because they touch different files:

```bash
# Run all of these simultaneously:
Task T007: "Create packages/ui/src/components/Icon.tsx"
Task T008: "Create packages/ui/src/components/Button.tsx"
Task T009: "Create packages/ui/src/components/Input.tsx"
Task T010: "Create packages/ui/src/components/Badge.tsx"
Task T011: "Create packages/ui/src/components/Card.tsx"
# (T012 Logo depends on T007 Icon, so run after)
```

## Parallel Example: Migration (Phase 10)

```bash
# Core-platform: run T015, T016, T017 in parallel (different files)
# Shops-app: run T019, T020 in parallel (different files)
# Note: T021 (Badge migration) touches many files — do sequentially after T019/T020
```

---

## Implementation Strategy

### MVP First (Package Setup + Icon + Migration Subset)

The smallest verifiable milestone is: Icon component live in @nexoraxs/ui + one app file migrated.

1. Complete Phase 1 (Setup) + Phase 2 (Foundational)
2. Complete Phase 3 (Icon)
3. Complete Phase 9 (Barrel — just Icon for now, add others as built)
4. Migrate ONE file in shops-app (e.g., `components/dashboard/Sidebar.tsx`) to `@nexoraxs/ui`
5. **STOP and VALIDATE**: Does the migrated file compile? Does the app build?

### Incremental Delivery

1. Phase 1+2 → package wired to apps
2. + Phase 3+4+5+6 (all P1 components) → parallel component build
3. + Phase 7+8 (P2 components) → Card + Logo
4. + Phase 9 (Barrel) → full package API ready
5. + Phase 10 (Migration) → all local copies replaced ← **Full Migration Point**
6. + Phase 11 (Polish) → lint + AGENTS.md

---

## Notes

- [P] tasks = touch different files, no blocking dependency between them
- T007 (Icon) must be done before T012 (Logo) because Logo imports Icon
- T013 (barrel) must be done after ALL components (T007–T012) because it references all component files
- T018 and T022 (delete local files) MUST only run after all import updates in the same app are confirmed complete — deleting first will break the TypeScript build
- Badge migration (T021) involves a prop rename (`color` → `variant`) — use find-and-replace carefully; every `color=` on a Badge element must be updated
- Logo migration (T020) involves a prop addition (`app="shops"`) — every `<Logo />` in shops-app becomes `<Logo app="shops" />`
- The shops-app Icon already has `minus`, `wallet`, `check-circle` added in the previous feature (031) — these must be included in the merged Icon set in packages/ui
- After migration, `apps/core-platform/lib/types.ts` keeps `IconName` as a re-export (T014) — do NOT remove it; other core-platform files may import IconName from there
