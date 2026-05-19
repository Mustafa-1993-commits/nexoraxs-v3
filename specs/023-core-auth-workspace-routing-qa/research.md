# Research: Core Auth & Workspace Routing QA

**Feature**: 023-core-auth-workspace-routing-qa
**Date**: 2026-05-14

No external research needed. All decisions derived from auditing the existing codebase.

---

## Decision 1: Current State of `/register` and `/login`

**Finding**: Both pages are Server Components with no `"use client"` directive. They import and render the `Button` component (which accepts `onClick?: () => void`) but pass no `onClick` prop — the buttons are inert.

**`/register/page.tsx`** — Server Component. Button renders, does nothing on click.

**`/login/page.tsx`** — Server Component. Button renders, does nothing on click.

**Both pages need**:
- `"use client"` directive (required for `useRouter` hook)
- `import { useRouter } from "next/navigation"`
- `onClick` handler wired to the `Button` component

---

## Decision 2: Register — Simplest Navigation Pattern

**Decision**: Add `"use client"` + `useRouter` to `/register/page.tsx`. Add `onClick={() => router.push("/login")}` to the "Create Account" `Button`.

**Alternatives considered**:
- Wrap Button in `<Link href="/login">`: invalid HTML (`<a>` inside `<button>`) — rejected
- Replace Button with styled Link: changes visual component unnecessarily — rejected
- Keep as Server Component and convert Button to anchor: diverges from existing Button component pattern — rejected

**Why `"use client"` + onClick**: `Button` already accepts `onClick`; adding `"use client"` is the minimal change that makes the button interactive. No form validation logic is needed — click navigates unconditionally.

---

## Decision 3: Login — Session Read at Click Time

**Decision**: The session check happens inside the `onClick` handler — NOT on page mount or in a `useEffect`.

**Implementation**:
```typescript
const handleSignIn = () => {
  router.push(isWorkspaceOnboardingComplete() ? "/workspaces" : "/onboarding");
};
```

**Why click time, not mount**: The spec (FR-007) explicitly requires the routing decision at click time to avoid SSR-triggered redirects. Reading session storage on mount would require `useSyncExternalStore` and could produce a redirect flash or hydration mismatch. Inside an event handler, the browser is guaranteed to be available — no SSR guard needed.

**Why `isWorkspaceOnboardingComplete()`**: This helper already exists in `apps/core-platform/lib/session.ts` (exported) and returns `false` when `typeof window === "undefined"` (i.e. on server/SSR). Inside an event handler this guard is always false (event handlers never run server-side), but using the existing function is cleaner than reimplementing the logic inline.

**No `useSyncExternalStore` needed**: The session value is not used for rendering — only for navigation on click. No hydration concern.

---

## Decision 4: Session Key

**Key**: `core_workspace_onboarding_done`
**Source**: `apps/core-platform/lib/session.ts` — constant `ONBOARDING_KEY`, helper `isWorkspaceOnboardingComplete()` (exported).

No new session keys are introduced. No new helpers needed. The existing `isWorkspaceOnboardingComplete()` is imported directly into the login page.

---

## Decision 5: `/dashboard/apps` Route Verification

**Finding**: The route exists at `apps/core-platform/app/dashboard/apps/page.tsx` and built correctly in prior sessions (confirmed by build output). No code changes are needed for this route — the spec's US3 is a verification story, not a build story.

**Action**: Run `pnpm --filter core-platform build` as part of the tasks to confirm `/dashboard/apps` still appears in the route list. No file edits needed for this story.

---

## Files Summary

### Modified:

- `apps/core-platform/app/register/page.tsx` — add `"use client"`, `useRouter`, `onClick` on Create Account button
- `apps/core-platform/app/login/page.tsx` — add `"use client"`, `useRouter`, `isWorkspaceOnboardingComplete` import, `onClick` on Sign In button

**`AGENTS.md`** — update SPECKIT block to 023

### Not modified:

- `apps/core-platform/lib/session.ts` — `isWorkspaceOnboardingComplete` already exported; no changes
- `apps/core-platform/app/dashboard/apps/page.tsx` — route already exists; no changes
- `apps/core-platform/app/onboarding/page.tsx` — completion flow already correct; no changes
- `apps/core-platform/app/workspaces/page.tsx` — destination is correct; its internal routing is out of scope
- All other files — untouched
