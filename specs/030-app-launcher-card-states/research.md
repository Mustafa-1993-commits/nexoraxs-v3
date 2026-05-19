# Research: App Launcher — Complete Card States

**Branch**: `030-app-launcher-card-states` | **Date**: 2026-05-16

## Findings

---

### Decision 1: AppStatus type location

**Decision**: Define `AppStatus` in `apps/core-platform/lib/types.ts`

**Rationale**: The type is consumed only within `core-platform`. Constitution Principle III states shared code lives in `packages/types`, but since this type is not shared across apps it belongs in the app's own `lib/types.ts` — co-located with other platform-local types (`IconName`).

**Alternatives considered**:
- `packages/types` — premature if no other app needs `AppStatus` yet
- Inline in `apps.ts` — would create a circular-import risk if `AppCard` imports the type from mock-data

---

### Decision 2: `"use client"` boundary

**Decision**: Add `"use client"` to `AppCard.tsx`

**Rationale**: The `enable` state requires local modal open/close state (`useState`). Constitution Principle IV explicitly permits `"use client"` when interactive state is strictly required. Making the entire `AppCard` a Client Component is simpler than splitting it into a server shell + client `EnableButton` sub-component, and the card is already a leaf component with no server-only data fetching.

**Alternatives considered**:
- Separate `EnableButton` client sub-component — valid but adds a file for minimal gain; worthwhile only if other card states need server-rendered data in future
- Server Component with URL-based modal state — over-engineered for a local UI concern

---

### Decision 3: `EnableModal` placement

**Decision**: Implement `EnableModal` as a standalone component at `components/dashboard/EnableModal.tsx`

**Rationale**: Keeping the modal out of `AppCard.tsx` keeps each file focused. `AppCard` manages card layout and state dispatch; `EnableModal` manages modal presentation and confirm/cancel actions.

**Alternatives considered**:
- Inline in `AppCard.tsx` — clutters the card logic; harder to test independently
- Shared in `packages/ui` — premature; no other app needs a generic enable modal

---

### Decision 4: `available: boolean` migration

**Decision**: Replace `available: boolean` entirely with `status: AppStatus` in both the `App` interface and all mock data entries. Remove `buttonLabel` as a data field — button labels are now derived deterministically from `status`.

**Rationale**: A boolean cannot represent four states. Keeping `available` alongside `status` would create ambiguity and duplicate the source of truth.

**Alternatives considered**:
- Keep `available` and add `status` — backwards-compatible but contradictory; banned by Constitution Principle IV's requirement for unambiguous types

---

### Decision 5: No contracts/ directory

**Decision**: Skip `contracts/` for this feature

**Rationale**: This feature is entirely UI-side mock data. There are no new API endpoints, no SDK changes, and no inter-app interfaces introduced. The only "contract" is the `App` TypeScript interface which is documented in `data-model.md`.

---

## Resolved Clarifications

All specification clarifications resolved with zero NEEDS CLARIFICATION markers (see spec.md). No outstanding unknowns.
