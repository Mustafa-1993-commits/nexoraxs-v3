# Feature Specification: Framer Motion — Add to Approved Stack

**Feature Branch**: `033-framer-motion-animation`
**Created**: 2026-05-17
**Status**: Draft
**Scope**: Constitution amendment + animation utility library for `apps/landing`

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Constitution Approves Framer Motion (Priority: P1)

A developer checking whether a library is approved for use in NexoraXS reads the Constitution and finds Framer Motion listed in the Technology Stack table with its scope and version. The amendment record documents exactly what changed and why.

**Why this priority**: Governance approval is the prerequisite for everything else — without it, using Framer Motion in any app is technically a constitution violation.

**Independent Test**: Open `.specify/memory/constitution.md`, confirm Framer Motion appears in the Technology Stack table with scope "Landing + future apps", confirm the version is 1.1.0, and confirm a Sync Impact Report comment documents the change.

**Acceptance Scenarios**:

1. **Given** a developer reads the Constitution, **When** they look at the Technology & Infrastructure Standards table, **Then** they see a row for Framer Motion with version "latest" and scope "Landing + future apps".
2. **Given** the amendment is applied, **When** a developer reads the version field, **Then** it shows `1.1.0` (minor bump — new technology addition without removing existing principles).
3. **Given** the amendment is applied, **When** a developer reads the document header, **Then** the Sync Impact Report comment lists all affected artifacts and the nature of the change.

---

### User Story 2 — Developer Uses Shared Animation Presets (Priority: P1)

A developer building a landing page section imports a ready-made animation variant from the shared animations utility file instead of defining `hidden/visible` states inline on every component. The presets enforce a consistent look and reduce boilerplate.

**Why this priority**: Without shared presets, each developer defines their own variants leading to inconsistent timing, easing, and direction — defeating the purpose of an approved library.

**Independent Test**: Import `fadeInUp` from the animations utility file in a landing page component and use it in a `motion.div` — confirm the component compiles with zero TypeScript errors and the animation variant is typed correctly.

**Acceptance Scenarios**:

1. **Given** the animations utility exists, **When** a developer imports `fadeInUp`, **Then** they get a typed animation variant object with `hidden` and `visible` states (opacity 0→1, y 20→0).
2. **Given** the animations utility exists, **When** a developer imports `fadeIn`, **Then** they get a fade-only variant (opacity 0→1, no positional change).
3. **Given** the animations utility exists, **When** a developer imports `staggerContainer`, **Then** they get a container variant that staggers its children 0.1s apart.
4. **Given** the animations utility exists, **When** a developer imports `slideInLeft` or `slideInRight`, **Then** they get directional slide variants (x offset → 0, with fade).
5. **Given** any preset is imported, **When** used with a Framer Motion component, **Then** TypeScript accepts it without errors or type assertions.

---

### User Story 3 — Landing Build Continues to Pass (Priority: P1)

After the constitution amendment and animation utility are added, the landing app builds successfully with zero errors — confirming nothing regressed.

**Why this priority**: Adding a dependency or file must never silently break the build; verification is non-negotiable.

**Independent Test**: Run `pnpm --filter landing build` and confirm exit code 0 with no TypeScript or build errors.

**Acceptance Scenarios**:

1. **Given** all changes are applied, **When** `pnpm --filter landing build` runs, **Then** it exits with code 0.
2. **Given** all changes are applied, **When** TypeScript checks the landing app, **Then** zero errors are reported.

---

### Edge Cases

- What if framer-motion is already installed in apps/landing? → The install step is skipped or is a no-op; the constitution amendment and animation utilities are still required.
- What if a developer tries to use framer-motion in `apps/shops-app` or `apps/core-platform`? → It is not yet approved for those apps; they must request a second constitution amendment when the need arises.
- What if a future animation preset conflicts with an existing one? → New presets are added additively; existing presets are never renamed or changed in a breaking way.
- What if the constitution version is already above 1.0.0? → The version is bumped to the next appropriate minor version; it is not set to exactly 1.1.0 if another amendment already incremented it.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The NexoraXS Constitution MUST include Framer Motion in the Technology & Infrastructure Standards table with: layer "Animation", technology "Framer Motion", version "latest", notes "Landing + future apps".
- **FR-002**: The Constitution version MUST be bumped from 1.0.0 to 1.1.0 (MINOR — new technology added, no principles removed).
- **FR-003**: The Constitution document MUST include a Sync Impact Report comment at the top documenting: the version change, the added row, and all affected artifacts.
- **FR-004**: `framer-motion` MUST be declared as an explicit dependency in `apps/landing/package.json` (not only hoisted from root).
- **FR-005**: A shared animation utility file MUST exist at `apps/landing/src/lib/animations.ts` exporting at minimum: `fadeInUp`, `fadeIn`, `staggerContainer`, `slideInLeft`, `slideInRight`.
- **FR-006**: Each exported animation preset MUST be a typed object compatible with Framer Motion's variant API — no untyped objects or type assertions.
- **FR-007**: The `fadeInUp` preset MUST define `hidden: { opacity: 0, y: 20 }` and `visible: { opacity: 1, y: 0 }` with an ease transition.
- **FR-008**: The `staggerContainer` preset MUST configure `staggerChildren: 0.1` in `visible.transition`.
- **FR-009**: The `slideInLeft` preset MUST define motion from left (negative x) to center; `slideInRight` from right (positive x) to center.
- **FR-010**: `AGENTS.md` MUST document Framer Motion as an approved package: its approved scope (landing + future apps by explicit approval), and the rule that adding it to a new app requires a constitution amendment.
- **FR-011**: `pnpm --filter landing build` MUST pass with exit code 0 after all changes.

### Key Entities

- **ConstitutionAmendment**: The governance record — version bump, new table row, Sync Impact Report comment
- **AnimationVariant**: A typed Framer Motion variant object with `hidden` and `visible` states (and optional `transition` configuration)
- **AnimationPreset**: A named, exported `AnimationVariant` from `apps/landing/src/lib/animations.ts`

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The Constitution's Technology Stack table has exactly one Framer Motion row with correct scope — verifiable by reading the file.
- **SC-002**: The Constitution version field reads `1.1.0` (or higher if already incremented) after the amendment — verifiable by reading the file.
- **SC-003**: Exactly 5 animation presets are exported from the animations utility file — verifiable by reading `animations.ts`.
- **SC-004**: `pnpm --filter landing build` completes with exit code 0 — verifiable by running the command.
- **SC-005**: Zero TypeScript errors in the landing app after all changes — verifiable with `pnpm --filter landing exec tsc --noEmit`.
- **SC-006**: Any developer can use a preset in a new landing component with a single import line and no additional type configuration.

---

## Assumptions

- framer-motion may already be installed in `apps/landing` (it was added earlier without formal approval); the installation step is idempotent.
- The Constitution version before this amendment is 1.0.0; if it has already been bumped, the next minor version is used instead.
- The animation utility file (`animations.ts`) does not yet exist; if it does, it is extended rather than replaced.
- Framer Motion is approved for `apps/landing` only at this time; other apps require a separate constitution amendment.
- The `staggerContainer` preset is intended to be used on a parent `motion.div`; individual child items use `fadeInUp` or similar variants.
- Default transition duration for all presets is 0.5s with an "easeOut" ease unless otherwise specified.
- The landing app's `next.config.ts` does not require `transpilePackages` for framer-motion (it ships ESM/CJS compatible with Next.js out of the box).
