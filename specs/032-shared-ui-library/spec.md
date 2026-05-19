# Feature Specification: packages/ui — Shared Component Library

**Feature Branch**: `032-shared-ui-library`
**Created**: 2026-05-17
**Status**: Draft
**Package**: `packages/ui` → published as `@nexoraxs/ui`

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Developer Imports Shared Components (Priority: P1)

A developer working on any NexoraXS app (core-platform, shops-app, landing) can import any shared UI component from the single package `@nexoraxs/ui` instead of copying components between apps. The import works out of the box after running `pnpm install`.

**Why this priority**: This is the foundational value of the entire feature — without a working importable package, no other component migration has meaning.

**Independent Test**: In `apps/shops-app`, replace a local `Icon` import with `import { Icon } from "@nexoraxs/ui"` and verify the app builds and renders correctly with zero errors.

**Acceptance Scenarios**:

1. **Given** a developer adds `"@nexoraxs/ui": "workspace:*"` to an app's package.json, **When** they run `pnpm install`, **Then** the package resolves from `packages/ui` within the monorepo.
2. **Given** the package is installed, **When** the developer writes `import { Button } from "@nexoraxs/ui"`, **Then** TypeScript resolves the type definitions without errors.
3. **Given** the package is installed, **When** the app is built, **Then** the build completes with zero TypeScript errors and zero lint errors.

---

### User Story 2 — Use Button Component (Priority: P1)

A developer renders a `<Button>` from `@nexoraxs/ui` with the desired variant and size. The button matches the NexoraXS dark-theme visual style.

**Why this priority**: Button is the most frequently used interactive element across all apps.

**Independent Test**: Render `<Button variant="primary" size="md">Save</Button>` in any app — confirm it renders with the NexoraXS gradient style, correct sizing, and no console errors.

**Acceptance Scenarios**:

1. **Given** a Button is rendered, **When** `variant="primary"` is set, **Then** the button displays the NexoraXS blue gradient style.
2. **Given** a Button is rendered, **When** `variant="secondary"` is set, **Then** the button displays a bordered low-emphasis style.
3. **Given** a Button is rendered, **When** `variant="ghost"` is set, **Then** the button has no border or background until hover.
4. **Given** a Button is rendered, **When** `variant="destructive"` is set, **Then** the button displays a red-toned style signaling a dangerous action.
5. **Given** a Button is rendered, **When** `size` is `sm`, `md`, or `lg`, **Then** the padding and font size scale correctly for each size.
6. **Given** a Button is rendered with `disabled`, **When** the user views it, **Then** it appears visually inactive and is not clickable.

---

### User Story 3 — Use Input Component (Priority: P1)

A developer renders an `<Input>` with a label and optionally an error message. The input matches the NexoraXS dark-theme style.

**Why this priority**: Input is used in every form across core-platform and shops-app.

**Independent Test**: Render `<Input label="Email" id="email" error="Required" />` — confirm the label renders above, the field has the dark-glass style, and the error message appears below in red.

**Acceptance Scenarios**:

1. **Given** an Input is rendered with a `label`, **When** the user views it, **Then** the label appears above the field.
2. **Given** an Input is rendered with an `error` string, **When** the user views it, **Then** the error message appears below the field in a warning color and the field border becomes red.
3. **Given** no `error` is provided, **When** the field is rendered, **Then** no error message space is reserved or shown.

---

### User Story 4 — Use Badge Component (Priority: P1)

A developer renders a `<Badge>` with a semantic variant (success, warning, error, info, purple, default). Badges match the NexoraXS dark-glass style used throughout the platform.

**Why this priority**: Badge is used for status indicators and tags in both core-platform and shops-app.

**Independent Test**: Render all Badge variants side by side — confirm each has a distinct color, matching the NexoraXS palette, and renders inline without layout disruption.

**Acceptance Scenarios**:

1. **Given** a Badge is rendered, **When** `variant="success"` is set, **Then** it displays a green-toned style.
2. **Given** a Badge is rendered, **When** `variant="warning"` is set, **Then** it displays an amber-toned style.
3. **Given** a Badge is rendered, **When** `variant="error"` is set, **Then** it displays a red-toned style.
4. **Given** a Badge is rendered, **When** `variant="info"` is set, **Then** it displays a blue-toned style.
5. **Given** a Badge is rendered, **When** `variant="purple"` is set, **Then** it displays a purple-toned style.
6. **Given** a Badge is rendered without a variant, **When** rendered, **Then** it defaults to the neutral (default) style.

---

### User Story 5 — Use Card Component (Priority: P2)

A developer renders a `<Card>` wrapper that applies the NexoraXS glass-morphism dark style automatically — eliminating manual repetition of the same `border border-white/8 bg-white/3 rounded-2xl` pattern.

**Why this priority**: Card is the most repeated structural pattern across every dashboard screen, but it is purely presentational and does not block other components.

**Independent Test**: Replace one hardcoded `<div className="card ...">` in shops-app dashboard with `<Card>` — confirm identical visual output and no regressions.

**Acceptance Scenarios**:

1. **Given** a Card is rendered, **When** viewed in the browser, **Then** it displays the dark glass-morphism style: dark translucent background, subtle border, rounded corners.
2. **Given** a Card with `hover` prop is rendered, **When** the user hovers, **Then** the border and background subtly lighten.
3. **Given** any content is placed inside a Card, **When** rendered, **Then** the content renders without clipping or overflow issues.

---

### User Story 6 — Use Icon Component (Priority: P1)

A developer renders `<Icon name="search" />` from `@nexoraxs/ui`. The Icon component from the package replaces the local copies that currently exist in both `apps/core-platform` and `apps/shops-app`.

**Why this priority**: Icon is imported in nearly every component in both apps — consolidating it eliminates divergence (the two apps already have different icon sets).

**Independent Test**: Remove `apps/shops-app/components/ui/Icon.tsx`, add `import { Icon } from "@nexoraxs/ui"` wherever Icon was imported, and confirm all icons render identically with zero build errors.

**Acceptance Scenarios**:

1. **Given** the shared Icon is imported, **When** `name` is a valid icon key, **Then** the correct SVG path renders.
2. **Given** `className` and `strokeWidth` props are passed, **When** the icon renders, **Then** sizing and stroke apply correctly.
3. **Given** a name exists in one app's current icon set but not the other's, **When** the shared Icon is released, **Then** the merged icon set includes all icons from both apps.

---

### User Story 7 — Use Logo Component (Priority: P2)

A developer renders `<Logo />` from `@nexoraxs/ui`. The Logo component replaces the local copies in `apps/core-platform` and `apps/shops-app` — each app's logo variant (NexoraXS wordmark vs. Shops brandmark) is selectable via a prop.

**Why this priority**: Logo is decorative and renders in only a few places; it matters for brand consistency but does not block the core component work.

**Independent Test**: Replace `apps/shops-app/components/ui/Logo.tsx` local import with `@nexoraxs/ui`, verify the Shops logo renders in the sidebar and POS header identically to before.

**Acceptance Scenarios**:

1. **Given** `<Logo app="shops" />` is rendered, **When** viewed, **Then** the Shops branded logo (shopping-bag icon + "Shops" text) appears.
2. **Given** `<Logo app="core" />` is rendered, **When** viewed, **Then** the NexoraXS wordmark appears.
3. **Given** no `app` prop, **When** rendered, **Then** the default (NexoraXS) logo appears.

---

### User Story 8 — All App Builds Pass After Migration (Priority: P1)

After migrating shared components to `packages/ui` and updating all imports, every app in the monorepo builds successfully with zero TypeScript errors and zero lint errors.

**Why this priority**: A migration that breaks builds is worse than no migration. Build health is the non-negotiable exit criterion for this feature.

**Independent Test**: Run `pnpm build` from repo root — all three apps (`core-platform`, `shops-app`, `landing`) complete their builds with exit code 0.

**Acceptance Scenarios**:

1. **Given** all migrations are complete, **When** `pnpm --filter core-platform build` runs, **Then** it exits with code 0.
2. **Given** all migrations are complete, **When** `pnpm --filter shops-app build` runs, **Then** it exits with code 0.
3. **Given** all migrations are complete, **When** `pnpm --filter landing build` runs, **Then** it exits with code 0.
4. **Given** all migrations are complete, **When** TypeScript is checked across all packages, **Then** zero errors are reported.

---

### Edge Cases

- What if an icon name exists in shops-app but not core-platform (or vice versa)? → The shared Icon must include the union of all icon names from both apps — no existing icon may be dropped.
- What if a component has different implementations between apps (e.g., Badge color variants differ)? → The shared version includes the superset of all variants; existing app-specific variants are preserved under new unified naming.
- What if an app does not need `@nexoraxs/ui` at all (e.g., landing)? → Landing is not forced to adopt the package unless it already imports shared components; build verification still runs against it.
- What if packages/ui itself has a TypeScript error? → The error blocks all consuming apps — packages/ui must have zero TypeScript errors before apps are updated.
- What if the workspace symlink is not resolved during build? → Verify `pnpm-workspace.yaml` already covers `packages/*`; if not, add it.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `packages/ui` MUST have a `package.json` with `name: "@nexoraxs/ui"`, valid entry points, and all peer dependencies declared.
- **FR-002**: `packages/ui` MUST have a `tsconfig.json` with `"strict": true` and appropriate `paths` and `include` settings.
- **FR-003**: `packages/ui` MUST export all components from a single `src/index.ts` barrel file.
- **FR-004**: `packages/ui` MUST export design token CSS variables as a importable stylesheet or token object under `@nexoraxs/ui/tokens`.
- **FR-005**: The `Button` component MUST support variants: `primary`, `secondary`, `ghost`, `destructive` and sizes: `sm`, `md`, `lg`.
- **FR-006**: The `Input` component MUST support a `label` prop, an `error` prop for validation messages, and standard HTML input attributes.
- **FR-007**: The `Badge` component MUST support variants: `default`, `success`, `warning`, `error`, `info`, `purple`.
- **FR-008**: The `Card` component MUST apply the NexoraXS glass-morphism dark style and accept a `hover` boolean prop for interactive hover effects.
- **FR-009**: The `Icon` component MUST contain the merged icon set from both `apps/core-platform` and `apps/shops-app` — no existing icon may be removed.
- **FR-010**: The `Logo` component MUST accept an `app` prop (`"core"` | `"shops"`) to render the appropriate brand mark.
- **FR-011**: All local `Icon.tsx` and `Logo.tsx` files in `apps/core-platform/components/ui/` and `apps/shops-app/components/ui/` MUST be removed after migration.
- **FR-012**: All imports in `apps/core-platform` and `apps/shops-app` that previously referenced local `Icon` or `Logo` MUST be updated to import from `@nexoraxs/ui`.
- **FR-013**: The `Badge` in `apps/shops-app/components/dashboard/Badge.tsx` MUST be replaced by the shared `Badge` from `@nexoraxs/ui` after migration; the local file removed.
- **FR-014**: Any app consuming `@nexoraxs/ui` MUST declare `"@nexoraxs/ui": "workspace:*"` in its `package.json` dependencies.
- **FR-015**: `pnpm-workspace.yaml` MUST include `packages/*` (verify — do not duplicate if already present).
- **FR-016**: `AGENTS.md` MUST be updated to document `packages/ui` scope, exports, and the rule that it contains UI components only.
- **FR-017**: `pnpm --filter core-platform build`, `pnpm --filter shops-app build`, and `pnpm --filter landing build` MUST all pass with zero errors after migration.
- **FR-018**: `pnpm lint` across the monorepo MUST pass with zero errors after migration.

### Key Entities

- **Package**: `packages/ui` — the shared component library; owns Button, Input, Badge, Card, Icon, Logo and their types
- **DesignToken**: CSS custom properties (color-bg, color-purple, color-blue, color-cyan, color-white, color-muted) defining the NexoraXS visual identity
- **Component**: A typed, exportable React component living in `packages/ui/src/`
- **IconSet**: The merged union of SVG path definitions from both apps' existing Icon components

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All three app builds (`core-platform`, `shops-app`, `landing`) complete in their normal build time with zero additional errors introduced by the migration.
- **SC-002**: Zero TypeScript errors across `packages/ui` and all consuming apps after migration completes.
- **SC-003**: Zero lint errors across `packages/ui` and all consuming apps after migration completes.
- **SC-004**: The total number of duplicate UI component files across `apps/` drops to zero — no `Icon.tsx`, `Logo.tsx`, or `Badge.tsx` remains in any app's `components/ui/` directory after migration.
- **SC-005**: A new app can import and render any component from `@nexoraxs/ui` with a single dependency declaration and a single import statement — no additional configuration required.
- **SC-006**: All existing visual appearances of migrated components (Icon, Logo, Badge) are identical before and after migration — zero visual regressions.

---

## Assumptions

- `pnpm-workspace.yaml` already includes `packages/*`; if not, it requires a one-line addition.
- The `landing` app does not currently import `Icon`, `Logo`, or `Badge` from app-local paths, so it requires no import updates — only build verification.
- ShadCN UI is referenced in the constitution as the component base, but the packages/ui components in this spec are custom-built in the NexoraXS style (ShadCN is not a runtime dependency of packages/ui itself).
- Tailwind CSS is available to all apps and packages via the monorepo config; packages/ui does not need to bundle its own CSS.
- The `Button` and `Input` components already exist in `apps/core-platform/components/ui/` and serve as the starting point for the shared versions; they will be enhanced (additional variants) rather than rewritten from scratch.
- The two `Icon.tsx` implementations diverge (different icon sets, different `IconName` type sources) — the shared version merges both sets into a single `IconName` union type.
- No server-side rendering or Next.js-specific patterns are needed inside `packages/ui` itself — components are plain React.
- The `packages/ui` package is not published to npm; it is consumed only within the monorepo via `workspace:*`.
