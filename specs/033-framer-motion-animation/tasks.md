# Tasks: Framer Motion — Add to Approved Stack

**Branch**: `033-framer-motion-animation`
**Input**: Design documents from `specs/033-framer-motion-animation/`
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅

**Tests**: Not requested — no test tasks included.

**Note**: This is a small 3-file change. framer-motion is already installed at `^12.38.0`. No package installation task needed.

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Setup (Verification Only)

**Purpose**: Verify framer-motion is already installed before making any changes.

- [x] T001 Verify `framer-motion` is declared in `apps/landing/package.json` dependencies (run `cat apps/landing/package.json | grep framer-motion` — expected: `"framer-motion": "^12.38.0"`)

**Checkpoint**: framer-motion confirmed present — no installation needed.

---

## Phase 2: Foundational (No blocking prerequisites beyond Phase 1)

No foundational phase needed — all three changes are independent files.

---

## Phase 3: User Story 1 — Constitution Approves Framer Motion (Priority: P1)

**Goal**: The Constitution formally lists Framer Motion in the Approved Stack table with a version bump to 1.1.0 and a Sync Impact Report.

**Independent Test**: Open `.specify/memory/constitution.md` — confirm Framer Motion row in the Approved Stack table, version field reads `1.1.0`, and a Sync Impact Report comment block appears at the top of the file.

- [x] T002 [US1] Amend `.specify/memory/constitution.md` — add Framer Motion row to the Approved Stack table after the `| Infra | Docker Compose | — | Local + production |` row: `| Animation | Framer Motion | latest | Landing + future apps |`; bump the version footer from `1.0.0` to `1.1.0`; update the `Last Amended` date to `2026-05-17`; add a Sync Impact Report HTML comment block at the very top of the file documenting: version change 1.0.0 → 1.1.0 (MINOR), added row, no principles modified, no templates affected

**Checkpoint**: US1 complete — constitution formally approves Framer Motion.

---

## Phase 4: User Story 2 — Developer Uses Shared Animation Presets (Priority: P1)

**Goal**: Five typed animation presets are available for import from `@/lib/animations` in any landing app component.

**Independent Test**: Import `fadeInUp` and `staggerContainer` in any landing component file and run `pnpm --filter landing exec tsc --noEmit` — confirm zero TypeScript errors and the imports resolve correctly.

- [x] T003 [US2] Create `apps/landing/src/lib/animations.ts` — export 5 typed animation presets using Framer Motion's `Variants` type: `fadeInUp` (hidden: `{opacity:0, y:20}` → visible: `{opacity:1, y:0}`), `fadeIn` (hidden: `{opacity:0}` → visible: `{opacity:1}`), `staggerContainer` (visible adds `transition: {staggerChildren: 0.1}`), `slideInLeft` (hidden: `{opacity:0, x:-40}` → visible: `{opacity:1, x:0}`), `slideInRight` (hidden: `{opacity:0, x:40}` → visible: `{opacity:1, x:0}`); all positional presets use `transition: {duration: 0.5, ease: "easeOut"}`; import type from `"framer-motion"` — no `any`; full file content in `data-model.md`

**Checkpoint**: US2 complete — animation presets importable and typed.

---

## Phase 5: User Story 3 — Landing Build Continues to Pass (Priority: P1)

**Goal**: The landing app builds with zero errors after all changes.

**Independent Test**: `pnpm --filter landing build` exits with code 0.

- [x] T004 [US3] Run `pnpm --filter landing exec tsc --noEmit` from repo root — fix any TypeScript errors before proceeding to the build
- [x] T005 [US3] Run `pnpm --filter landing build` from repo root — confirm exit code 0 and all routes build successfully

**Checkpoint**: US3 complete — landing build passes.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T006 [P] Update `AGENTS.md` — add Framer Motion to the approved packages documentation under the Shared Packages Rules section: state it is approved for `apps/landing` only; document that adding it to `apps/core-platform` or `apps/shops-app` requires a separate constitution amendment; note the import path is `import { motion } from "framer-motion"` and presets are at `@/lib/animations` in the landing app

---

## Dependencies & Execution Order

- **Phase 1** (T001): Verify-only, no dependency — run first
- **Phase 3** (T002): Depends on Phase 1 — amend constitution
- **Phase 4** (T003): Independent of T002 — can run in parallel with Phase 3
- **Phase 5** (T004, T005): Depends on T003 (animations.ts must exist before tsc check)
- **Phase 6** (T006): Can run in parallel with any phase (different file)

### Parallel Opportunities

- T002 and T003 can run in parallel (different files)
- T006 can run in parallel with any task (AGENTS.md is independent)

---

## Parallel Example

```bash
# All three changes can be made simultaneously:
Task T002: "Amend .specify/memory/constitution.md"
Task T003: "Create apps/landing/src/lib/animations.ts"
Task T006: "Update AGENTS.md"

# Then verify:
Task T004: "tsc --noEmit"
Task T005: "pnpm build"
```

---

## Implementation Strategy

### MVP (All 3 stories = entire feature)

This feature is small enough that the entire implementation is the MVP:

1. T001 — verify framer-motion installed
2. T002 + T003 + T006 — three parallel file changes
3. T004 + T005 — TypeScript check + build verification
4. **Done** — feature complete

---

## Notes

- T002 references the exact row format from `data-model.md` — use it verbatim
- T003 references the full preset code from `data-model.md` — use it verbatim
- The Sync Impact Report in T002 follows the format from `.specify/memory/constitution.md` existing comment block at the top of the file (reference the 032 amendment comment block for format)
- Constitution version footer format: `**Version**: X.Y.Z | **Ratified**: 2026-05-11 | **Last Amended**: YYYY-MM-DD`
- Zero `any` in animations.ts — `Variants` type from framer-motion handles everything
