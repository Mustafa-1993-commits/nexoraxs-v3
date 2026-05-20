# Feature Specification: packages/* Foundation

**Feature Branch**: `029-packages-foundation`
**Created**: 2026-05-19
**Status**: Draft
**App Scope**: `packages/ui` · `packages/types` · `packages/auth` · `packages/sdk`
**Touches**: `apps/core-platform` · `apps/shops-app`

---

## Context & Motivation

الـ `packages/*` folders موجودة في الـ monorepo كـ empty folders منذ البداية.
كل app حاليًا بيستخدم local components بدل الـ shared packages:

- `apps/core-platform/components/ui/` → local Button, Input, Icon, Logo
- `apps/shops-app/components/ui/` → local Icon (مختلفة عن core-platform)
- `apps/core-platform/lib/types.ts` → local IconName union
- `apps/core-platform/lib/session.ts` → mock auth helpers (local)

ده بيخلق:
- **Code duplication** — `IconName` معرفة في مكانين بـ paths مختلفة
- **Inconsistency** — shops-app وcore-platform عندهم Icon components مختلفة
- **Architecture violation** — Constitution Principle III: App Boundary Enforcement

الـ spec ده بيعمل الـ packages foundation بدون ما يكسر أي حاجة شغالة حاليًا.

---

## Scope

### ✅ في الـ scope:
- إنشاء `package.json` لكل package مع الـ correct name و exports
- نقل الـ shared types (`IconName`, `Workspace`, `User`, etc.) لـ `packages/types`
- نقل الـ UI components المشتركة (Icon, Logo, Button, Input) لـ `packages/ui`
- نقل الـ mock session helpers لـ `packages/auth`
- إنشاء base API client في `packages/sdk`
- تحديث imports في كل الـ apps بعد النقل
- التأكد إن `pnpm build` و `pnpm lint` بيعديا بدون أخطاء

### ❌ مش في الـ scope:
- تغيير أي UI أو design
- إضافة أي feature جديدة
- لمس الـ backend
- نقل الـ dashboard components (Sidebar, Topbar, MetricCard) — دول app-specific
- تغيير أي mock data

---

## User Scenarios & Testing

### User Story 1 — packages/types يكون المصدر الوحيد للـ shared types (Priority: P1) 🎯 MVP

**الهدف**: أي type مشترك بين أكتر من app (زي `IconName`) يتعرف في `packages/types` بس، وكل app تستورده من `@nexoraxs/types`.

**Independent Test**: حذف `apps/core-platform/lib/types.ts` ويشتغل الـ build بدون أخطاء — لأن كل الـ imports بقت تيجي من `@nexoraxs/types`.

**Acceptance Scenarios**:

1. **Given** a developer opens `packages/types/src/index.ts`, **When** they look at the exports, **Then** they find `IconName` (unified union of all icons from both apps), `Workspace`, `User`, `NavItem`, and `Plan` types.

2. **Given** `apps/core-platform` builds, **When** `pnpm --filter core-platform build` runs, **Then** zero TypeScript errors — all `IconName` imports resolve to `@nexoraxs/types`.

3. **Given** `apps/shops-app` builds, **When** `pnpm --filter shops-app build` runs, **Then** zero TypeScript errors — all `IconName` imports resolve to `@nexoraxs/types`.

4. **Given** a developer adds a new icon, **When** they edit `packages/types/src/index.ts`, **Then** the new `IconName` value is available in both apps without touching either app's code.

---

### User Story 2 — packages/ui يحتوي على الـ shared UI primitives (Priority: P1)

**الهدف**: `Icon`, `Logo`, `Button`, `Input` تتنقل لـ `packages/ui` وكل app تستوردها من `@nexoraxs/ui`.

**Independent Test**: حذف `apps/core-platform/components/ui/Icon.tsx` والـ build يشتغل — لأن الـ import بقت من `@nexoraxs/ui`.

**Acceptance Scenarios**:

1. **Given** a developer imports `Icon` in core-platform, **When** they write `import { Icon } from "@nexoraxs/ui"`, **Then** TypeScript resolves it correctly with full type safety on the `name` prop.

2. **Given** a developer imports `Icon` in shops-app, **When** they write `import { Icon } from "@nexoraxs/ui"`, **Then** TypeScript resolves it correctly — same component, same types.

3. **Given** `packages/ui/src/components/Icon.tsx` exists, **When** a developer looks at the `IconName` union, **Then** it is the **unified** set of all icons from both the old `core-platform` Icon AND the old `shops-app` Icon — no icon is lost.

4. **Given** a user opens any page in core-platform or shops-app, **When** they view the page, **Then** all icons render exactly as before — zero visual regression.

5. **Given** `Logo` is imported from `@nexoraxs/ui`, **When** it renders, **Then** the gradient logo mark and "NexoraXS" brand name appear identically to the current implementation.

---

### User Story 3 — packages/auth يحتوي على الـ session helpers (Priority: P1)

**الهدف**: الـ mock session helpers (saveMockUser, getMockUserName, isWorkspaceOnboardingComplete, etc.) تتنقل لـ `packages/auth` وتستورد من `@nexoraxs/auth`.

**Independent Test**: حذف `apps/core-platform/lib/session.ts` والـ build يشتغل — الـ imports بقت من `@nexoraxs/auth`.

**Acceptance Scenarios**:

1. **Given** any component in core-platform that calls `getMockUserName()`, **When** it imports from `@nexoraxs/auth`, **Then** it compiles and returns the mock user name as before.

2. **Given** any component in shops-app that reads session data, **When** it imports session helpers from `@nexoraxs/auth`, **Then** it compiles and returns values from sessionStorage as before.

3. **Given** the mock session helpers are in `packages/auth`, **When** a developer reads the file, **Then** they see a clear comment: `// MOCK — will be replaced with real Sanctum auth in Phase 2`.

---

### User Story 4 — packages/sdk يحتوي على base API client (Priority: P2)

**الهدف**: إنشاء base API client في `packages/sdk` — لا بيعمل calls حقيقية دلوقتي، بس بيحدد الـ contract والـ response interface.

**Independent Test**: `import { apiClient } from "@nexoraxs/sdk"` يشتغل في أي app بدون TypeScript errors.

**Acceptance Scenarios**:

1. **Given** a developer imports `apiClient` from `@nexoraxs/sdk`, **When** they call `apiClient.get("/test")`, **Then** TypeScript shows the correct return type `Promise<ApiResponse<unknown>>`.

2. **Given** `packages/sdk/src/index.ts` exists, **When** a developer reads it, **Then** they find the `ApiResponse<T>` interface: `{ success: boolean; data: T; message: string; errors: null | Record<string, string[]> }`.

3. **Given** the SDK is imported, **When** any app builds, **Then** zero TypeScript errors — the SDK doesn't break any existing functionality.

---

### User Story 5 — Turborepo وpnpm workspace wiring صح (Priority: P1)

**الهدف**: الـ monorepo يشوف الـ packages كـ `@nexoraxs/*` dependencies بشكل صحيح.

**Independent Test**: `pnpm install` من الـ root ويشتغل بدون أخطاء. `pnpm --filter core-platform dev` يشتغل. `pnpm --filter shops-app dev` يشتغل.

**Acceptance Scenarios**:

1. **Given** the monorepo root, **When** `pnpm install` runs, **Then** all `@nexoraxs/*` packages are linked correctly via pnpm workspace protocol.

2. **Given** `apps/core-platform/package.json`, **When** a developer reads it, **Then** they find `"@nexoraxs/ui": "workspace:*"`, `"@nexoraxs/types": "workspace:*"`, `"@nexoraxs/auth": "workspace:*"` in dependencies.

3. **Given** `pnpm dev` runs from root, **When** all apps start, **Then** core-platform (port 3001) and shops-app (port 3002) both start successfully with zero module resolution errors.

4. **Given** `pnpm lint` runs from root, **When** it completes, **Then** zero errors across all apps and packages.

5. **Given** `pnpm build` runs from root, **When** it completes, **Then** all apps build successfully — zero TypeScript errors, zero missing module errors.

---

## Requirements

### Functional Requirements

- **FR-001**: `packages/types/package.json` MUST have `name: "@nexoraxs/types"` and correct `exports` pointing to compiled output.
- **FR-002**: `packages/ui/package.json` MUST have `name: "@nexoraxs/ui"` and exports for all shared components.
- **FR-003**: `packages/auth/package.json` MUST have `name: "@nexoraxs/auth"` and exports for session helpers.
- **FR-004**: `packages/sdk/package.json` MUST have `name: "@nexoraxs/sdk"` and exports for the API client.
- **FR-005**: The unified `IconName` type in `packages/types` MUST include ALL icon names currently in both `apps/core-platform/lib/types.ts` AND `apps/shops-app/components/ui/Icon.tsx` — no icon lost.
- **FR-006**: `packages/ui/src/components/Icon.tsx` MUST include ALL SVG paths currently in both apps' Icon components — unified into one map.
- **FR-007**: All imports in `apps/core-platform` that reference local `@/components/ui/Button`, `@/components/ui/Icon`, `@/components/ui/Logo`, `@/components/ui/Input` MUST be updated to `@nexoraxs/ui`.
- **FR-008**: All imports in `apps/core-platform` that reference local `@/lib/types` for `IconName` MUST be updated to `@nexoraxs/types`.
- **FR-009**: All imports in `apps/core-platform` that reference local `@/lib/session` MUST be updated to `@nexoraxs/auth`.
- **FR-010**: All imports in `apps/shops-app` that reference local `@/components/ui/Icon` MUST be updated to `@nexoraxs/ui`.
- **FR-011**: After migration, the local files that were moved MUST be deleted — no dead code left.
- **FR-012**: `pnpm --filter core-platform build` MUST exit 0.
- **FR-013**: `pnpm --filter shops-app build` MUST exit 0.
- **FR-014**: `pnpm lint` from root MUST exit 0.
- **FR-015**: Zero visual regression — every page renders identically before and after the migration.
- **FR-016**: The packages MUST use TypeScript source directly (via `tsconfig` path mapping or `exports` with `ts` condition) — no build step required for local development in the monorepo.
- **FR-017**: `apps/core-platform/lib/types.ts` MAY remain as a re-export shim ONLY if removing it breaks too many imports. Preferred: delete it and update all imports directly.
- **FR-018**: Dashboard-specific components (Sidebar, Topbar, MetricCard, etc.) MUST NOT be moved to packages — they are app-specific and stay in their respective apps.

### Key Entities

- **`@nexoraxs/types`**: Shared TypeScript types — `IconName`, `Workspace`, `User`, `NavItem`, `Plan`, `ApiResponse<T>`
- **`@nexoraxs/ui`**: Shared UI primitives — `Icon`, `Logo`, `Button`, `Input`
- **`@nexoraxs/auth`**: Shared auth/session helpers — all functions from `session.ts` (mock implementations)
- **`@nexoraxs/sdk`**: Base API client — `apiClient` with `get/post/put/delete` methods returning `ApiResponse<T>`

---

## Success Criteria

- **SC-001**: `pnpm build` from monorepo root exits 0 — all apps compile.
- **SC-002**: `pnpm lint` from root exits 0 — zero ESLint errors.
- **SC-003**: `pnpm dev` starts both apps with zero module resolution errors.
- **SC-004**: Zero visual regression — screenshot comparison of key pages (login, dashboard, shops/dashboard) shows no difference.
- **SC-005**: No local `ui/Icon.tsx`, `ui/Logo.tsx`, `ui/Button.tsx`, `ui/Input.tsx`, or `lib/types.ts` files remain in any app — migration is complete, no dead code.
- **SC-006**: A new developer can add a shared component by editing only `packages/ui` — no app-level changes needed.

---

## Assumptions

- الـ packages سيستخدموا TypeScript source مباشرة via pnpm workspace — مش محتاجين separate build step في الـ development.
- الـ `tsconfig.json` في كل app هيتحدث يشمل path mapping لـ `@nexoraxs/*`.
- الـ `pnpm-workspace.yaml` موجود ومضبوط — بس الـ packages مش عندها `package.json` لحد دلوقتي.
- الـ Icon SVG paths في كل app بتستخدم نفس الـ `fill="none" stroke="currentColor"` approach — الـ union straightforward.
- الـ dashboard-specific components (Sidebar, Topbar, MetricCard في core-platform، Sidebar, Topbar, StatCard في shops-app) تفضل في apps لأنها مش مشتركة.
- الـ migration هو refactor بحت — مفيش behavior change، مفيش UI change، مفيش feature جديدة.
- لو في icon موجود في shops-app بس ومش موجود في core-platform، يتضاف للـ unified `IconName` بدون إزالة.
- الـ mock session helpers تنقل كـ mock — مش هيتعملوا real implementation دلوقتي.

---

## Edge Cases

- **Icon name collision**: لو في icon بنفس الاسم بس SVG path مختلف في الـ apps التنين — نستخدم الـ path الأحدث (shops-app أحدث) ونـ verify إن الـ visual مش اتغير.
- **Import loops**: الـ packages مش يستوردوا من apps — one-directional dependency فقط.
- **tsconfig paths**: لو Next.js مش بيحل الـ `@nexoraxs/*` imports بدون config خاص — نضيف `paths` في `tsconfig.json` لكل app.
- **pnpm hoisting**: لو في hoisting issue مع workspace packages — نستخدم `workspace:*` protocol بشكل صريح في كل app's `package.json`.

---

*Spec ready for `/speckit.plan`*
