# Research: Core Mock Account Session

**Feature**: 026-core-mock-account-session
**Date**: 2026-05-15

No external research needed. All decisions derived from auditing current `apps/core-platform` files.

---

## Decision 1: Session Helper Location

**Decision**: Add mock user helpers to the existing `apps/core-platform/lib/session.ts`.

**Rationale**: `session.ts` already owns all session-storage read/write helpers for core-platform (`saveWorkspaceSetup`, `saveWorkspaceCountry`, `completeWorkspaceOnboarding`, `isWorkspaceOnboardingComplete`). Adding mock user helpers here keeps the module cohesive and avoids introducing a new file.

**Alternatives considered**: A new `lib/mock-user.ts` file — rejected because it splits closely related session logic across two files with no benefit.

---

## Decision 2: Register Page — Controlled Inputs

**Decision**: Convert the name and email `<Input>` fields in `register/page.tsx` to controlled inputs using `useState<string>`. Password is not captured.

**Rationale**: The current Register page has no form state — all `<Input>` components are uncontrolled. To read entered values on button click, controlled inputs are the standard React pattern in this codebase (consistent with how onboarding forms work in both `core-platform` and `shops-app`).

**Alternatives considered**: `useRef` — works, but inconsistent with the controlled-input pattern used elsewhere. Rejected.

---

## Decision 3: Session Read Pattern — `useSyncExternalStore`

**Decision**: Use `useSyncExternalStore(() => () => {}, clientSnapshot, serverSnapshot)` for all session reads in client components that render on the server.

**Rationale**: This pattern is already established in `apps/core-platform/app/onboarding/page.tsx` (the `subscribeToNothing` + `mounted` pattern) and in `apps/shops-app/app/onboarding/page.tsx`. It prevents React hydration mismatches by returning the server snapshot (a safe fallback) during SSR and switching to the live `sessionStorage` read on the client.

**Alternatives considered**:
- `useEffect` + `useState` (two-render pattern) — works but requires an extra render cycle and is less consistent with the existing codebase pattern. Rejected.
- Direct `sessionStorage.getItem()` in render — causes hydration mismatch since `sessionStorage` is not available during SSR. Rejected.

---

## Decision 4: Initials Derivation

**Decision**: Derive avatar initials by splitting the name on whitespace, taking the first character of each of the first two parts, uppercased. Fallback to `"WO"` (Workspace Owner) if the name produces no characters.

```typescript
function getInitials(name: string): string {
  return name.trim().split(/\s+/).filter(Boolean)
    .slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("") || "WO";
}
```

**Examples**: "Mustafa Mohamed" → "MM", "Workspace owner" → "WO", "Ali" → "A".

**Rationale**: Consistent with the existing `getInitials` pattern in `apps/shops-app/components/onboarding/StepStoreSetup.tsx`. Using `"WO"` as the fallback makes it visually clear the initials represent "Workspace Owner", not a real user.

---

## Decision 5: `initMockUserFallback` — Idempotent Write-Only-If-Absent

**Decision**: `initMockUserFallback` writes fallback values only when the keys are absent or empty. It NEVER overwrites existing values.

**Rationale**: FR-009 explicitly requires that existing mock user values are preserved across a Login. If a user registered first (writing their real name/email), logging in must not overwrite those with the fallback.

**Implementation**: Check `sessionStorage.getItem(key)` — if null or empty string, write the fallback; otherwise, skip.

---

## Decision 6: Dashboard Sidebar — No Change Needed

**Decision**: `Sidebar.tsx` does not display user name or email — no changes required.

**Rationale**: The Sidebar contains a brand logo, navigation links, resource links, and a "Beta access" card. There is no user identity display. Changing it would be scope creep beyond FR-016/FR-017.

---

## Files Summary

### Modified:

| File | Change |
|------|--------|
| `apps/core-platform/lib/session.ts` | Add `saveMockUser`, `getMockUserName`, `getMockUserEmail`, `initMockUserFallback` |
| `apps/core-platform/app/register/page.tsx` | Controlled inputs (name, email); call `saveMockUser` before routing |
| `apps/core-platform/app/login/page.tsx` | Call `initMockUserFallback` in `handleSignIn` before routing |
| `apps/core-platform/app/onboarding/page.tsx` | Team owner SummaryCard reads `getMockUserName()` via `useSyncExternalStore` |
| `apps/core-platform/app/workspaces/page.tsx` | User pill reads `getMockUserName()` + `getMockUserEmail()` via `useSyncExternalStore` |
| `apps/core-platform/components/dashboard/Topbar.tsx` | User button reads `getMockUserName()` via `useSyncExternalStore` |

### Not modified:

- `apps/core-platform/components/dashboard/Sidebar.tsx` — no user identity display
- `apps/core-platform/lib/mock-data/*` — untouched
- All other apps — no cross-app changes
