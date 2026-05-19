# Implementation Plan: packages/ui — Shared Component Library

**Branch**: `032-shared-ui-library` | **Date**: 2026-05-17 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/032-shared-ui-library/spec.md`

---

## Summary

Set up `packages/ui` as the `@nexoraxs/ui` shared component library within the NexoraXS monorepo. Create six components (Button, Input, Badge, Card, Icon, Logo) in the NexoraXS dark-glass visual style, using the merged icon set from both existing apps. Migrate all app-local Icon, Logo, and Badge imports to the shared package. Verify all three app builds pass with zero TypeScript and lint errors after migration.

---

## Technical Context

**Language/Version**: TypeScript 5.x, `"strict": true` throughout
**Framework**: React 19.x — plain React components (no Next.js API surface inside the package)
**Styling**: TailwindCSS 4.x — classes used inline; no CSS bundled inside the package
**Monorepo**: pnpm `workspace:*` protocol; `packages/*` already in `pnpm-workspace.yaml`
**Consuming apps**: Next.js 16.x — each consuming app needs `transpilePackages: ['@nexoraxs/ui']` in `next.config.ts` so Next.js transpiles the TypeScript source directly (no separate build step for the package)
**Storage**: N/A
**Testing**: TypeScript compilation + build verification per app
**Target Platform**: Internal monorepo package — not published to npm
**Performance Goals**: No runtime overhead; package adds zero additional bytes beyond the component code
**Constraints**: No cross-app imports; UI components only in packages/ui (Principle III); strict TypeScript; no `any`
**Scale/Scope**: 6 components, 1 package, ~25 import files updated across 2 apps

---

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I — Modular Monolith | ✅ PASS | Shared UI package is explicitly supported by Principle III. No new apps introduced. |
| II — Multi-Tenant Isolation | ✅ N/A | UI components contain no data or database logic. |
| III — App Boundary Enforcement | ✅ PASS | `packages/ui` is explicitly named in Principle III as an approved shared package. Contains UI components only — no business logic, no domain data. |
| IV — Type Safety | ✅ PASS | `"strict": true` in package tsconfig. All component props explicitly typed. Zero `any`. |
| V — SDK-First API Access | ✅ N/A | No API calls inside UI components. |
| VI — Spec-Driven Development | ✅ PASS | Spec written before implementation. |

**Gate result**: PASS — no violations. Proceed to Phase 0.

---

## Project Structure

### Documentation (this feature)

```text
specs/032-shared-ui-library/
├── plan.md              ← This file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/           ← Phase 1 output
│   └── component-api.md
└── tasks.md             ← Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
packages/ui/                           ← existing dir, needs package.json + src/
├── package.json                       ← NEW: name: "@nexoraxs/ui", main, types, peerDeps
├── tsconfig.json                      ← NEW: strict: true
└── src/
    ├── index.ts                       ← NEW: barrel export of all components + types
    ├── tokens.css                     ← NEW: NexoraXS CSS custom properties
    └── components/
        ├── Button.tsx                 ← NEW (based on core-platform Button)
        ├── Input.tsx                  ← NEW (based on core-platform Input)
        ├── Badge.tsx                  ← NEW (merged from shops-app Badge)
        ├── Card.tsx                   ← NEW
        ├── Icon.tsx                   ← NEW (merged icon set: core-platform + shops-app)
        └── Logo.tsx                   ← NEW (app prop: "core" | "shops")

apps/core-platform/
├── next.config.ts                     ← MODIFY: add transpilePackages: ['@nexoraxs/ui']
├── package.json                       ← MODIFY: add "@nexoraxs/ui": "workspace:*"
├── components/ui/Icon.tsx             ← DELETE after imports migrated
├── components/ui/Logo.tsx             ← DELETE after imports migrated
├── components/ui/Button.tsx           ← DELETE after imports migrated
└── components/ui/Input.tsx            ← DELETE after imports migrated

apps/shops-app/
├── next.config.ts                     ← MODIFY: add transpilePackages: ['@nexoraxs/ui']
├── package.json                       ← MODIFY: add "@nexoraxs/ui": "workspace:*"
├── components/ui/Icon.tsx             ← DELETE after imports migrated
├── components/ui/Logo.tsx             ← DELETE after imports migrated
└── components/dashboard/Badge.tsx     ← DELETE after imports migrated
```

**Structure Decision**: TypeScript source-first package with no build step. `transpilePackages` in each Next.js app's config handles compilation at app-build time. This is the standard pattern for internal monorepo component libraries.

---

## Complexity Tracking

No constitution violations — section not applicable.
