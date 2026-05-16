# Implementation Plan: App Launcher — Complete Card States

**Branch**: `030-app-launcher-card-states` | **Date**: 2026-05-16 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/030-app-launcher-card-states/spec.md`

## Summary

Migrate `AppCard` from a 2-state boolean model (`available`) to a 4-state enum model (`status: AppStatus`) covering `active`, `enable`, `upgrade`, and `coming-soon`. Add an `EnableModal` confirmation dialog for the `enable` state. All changes are confined to `apps/core-platform` and operate on mock data only — no API calls or persistence.

## Technical Context

**Language/Version**: TypeScript 5.x — `strict: true` (confirmed in `tsconfig.json`)  
**Primary Dependencies**: Next.js 16.2.6, React 19.2.4, TailwindCSS 4.x  
**Storage**: N/A — mock data only, no persistence layer in this feature  
**Testing**: No test framework configured in `core-platform` — manual verification  
**Target Platform**: Web browser, Next.js App Router  
**Project Type**: Web application (frontend-only change)  
**Performance Goals**: Modal opens within 300ms (user-perceivable threshold from SC-003)  
**Constraints**: No business logic in `core-platform` (Constitution Principle III); TypeScript strict throughout (Principle IV)  
**Scale/Scope**: 5 app cards, 1 new component, 3 modified files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| **I** — Modular Monolith | Change is self-contained in `core-platform`; no new modules introduced | ✅ PASS |
| **II** — Multi-Tenant Isolation | No database operations; N/A | ✅ N/A |
| **III** — App Boundary Enforcement | No domain logic in `core-platform`; enablement is a mock stub only | ✅ PASS |
| **IV** — Type Safety | `AppStatus` defined as a union literal; `any` not used; `"use client"` justified by interactive state | ✅ PASS |
| **V** — SDK-First API Access | No API calls in this feature | ✅ N/A |
| **VI** — Spec-Driven Development | Spec written first, plan follows | ✅ PASS |

**Post-design re-check**: All gates still pass. `"use client"` in `AppCard.tsx` is justified — `enable` state requires `useState` for modal open/close. No cross-app imports introduced.

## Project Structure

### Documentation (this feature)

```text
specs/030-app-launcher-card-states/
├── plan.md              ← this file
├── research.md          ← Phase 0 complete
├── data-model.md        ← Phase 1 complete
└── tasks.md             ← Phase 2 output (/speckit.tasks)
```

### Source Code (affected files only)

```text
apps/core-platform/
├── lib/
│   ├── types.ts                              ← ADD AppStatus type
│   └── mock-data/
│       └── apps.ts                           ← REPLACE available: boolean → status: AppStatus, update all mock entries
├── components/
│   └── dashboard/
│       ├── AppCard.tsx                       ← REFACTOR to 4-state rendering + "use client"
│       └── EnableModal.tsx                   ← NEW confirmation modal component
└── app/
    └── dashboard/
        └── apps/
            └── page.tsx                      ← NO CHANGE (already Server Component, no state needed here)
```

**Structure Decision**: Single app — `Option 1` (web app, frontend only). No backend changes. The `apps/page.tsx` page remains a Server Component; only `AppCard.tsx` becomes a Client Component because interactive state is required.

## Implementation Steps

### Step 1 — Add `AppStatus` type

**File**: `apps/core-platform/lib/types.ts`

Append:
```ts
export type AppStatus = "active" | "enable" | "upgrade" | "coming-soon";
```

---

### Step 2 — Update `App` interface and mock data

**File**: `apps/core-platform/lib/mock-data/apps.ts`

1. Import `AppStatus` from `@/lib/types`
2. Replace `App` interface:
   - Remove `available: boolean`
   - Remove `buttonLabel?: string`
   - Add `status: AppStatus`
   - Keep `href?: string` and `subtitle?: string`
3. Update mock entries:
   - `shops` → `status: "active"`, `href: SHOPS_URL`
   - `crm` → `status: "upgrade"`
   - `clinics`, `maintenance`, `restaurants` → `status: "coming-soon"`

---

### Step 3 — Create `EnableModal` component

**File**: `apps/core-platform/components/dashboard/EnableModal.tsx`  
**Directive**: `"use client"`

Props:
```ts
interface EnableModalProps {
  app: { name: string; description: string };
  onConfirm: () => void;
  onClose: () => void;
}
```

Behaviour:
- Renders as a fixed overlay with backdrop
- Dismisses on backdrop click or Escape key
- "Enable" button calls `onConfirm` then `onClose`
- "Cancel" button calls `onClose`

---

### Step 4 — Refactor `AppCard` component

**File**: `apps/core-platform/components/dashboard/AppCard.tsx`  
**Directive**: `"use client"` (required for modal `useState`)

State:
```ts
const [enableModalOpen, setEnableModalOpen] = useState(false);
```

Rendering by `status`:

| `status` | Card opacity | Badge | Button |
|---|---|---|---|
| `"active"` | Full | None | `<a href={href}>` blue, "Open →" |
| `"enable"` | Full | None | `<button>` outline, "Enable App" → opens modal |
| `"upgrade"` | Dimmed (`opacity-50`) | None | `<button>` amber bg, "Upgrade Plan" |
| `"coming-soon"` | Dimmed (`opacity-50`) | "Coming Soon" badge | `<button disabled>` ghost, "Coming Soon" |

Include `<EnableModal>` rendered when `enableModalOpen === true`.

---

### Step 5 — Verify no TypeScript errors

```bash
cd apps/core-platform && pnpm tsc --noEmit
```

Expected: zero errors.

---

### Step 6 — Lint check

```bash
pnpm lint
```

Expected: zero errors.

## Complexity Tracking

No constitution violations. No complexity justification required.
