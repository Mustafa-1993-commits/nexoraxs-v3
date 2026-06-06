# Research: Claude Prototype Local Port

**Phase**: 0 — Discovery
**Date**: 2026-06-06
**Feature**: `042-claude-prototype-local-port`

---

## Summary

No significant "NEEDS CLARIFICATION" items were found in the spec — all decisions had clear reasonable defaults. This research document resolves the dependency and integration questions that inform Phase 1 design.

---

## Decision 1: Data Adapter Pattern

**Decision**: Use a React Context (`AppProvider` + `useApp()`) backed by a localStorage/sessionStorage mock database (`lib/store/db.ts`), exactly mirroring the prototype's `store.jsx` + `db.jsx` architecture.

**Rationale**:
- The prototype already proved this architecture works for all required Commerce OS flows.
- localStorage provides synchronous access — no async loading state complexity during Phase 1.
- The `nexoraxs.*` key schema is already established; matching it ensures prototype parity and future backend migration is a clean swap.
- The context pattern is idiomatic in Next.js App Router (Client Components wrapped by a Provider in the root layout).

**Alternatives considered**:
- Zustand/Redux: Adds a dependency and complexity not needed for Phase 1 mock data.
- Server-side state (Next.js Server Actions): Requires backend — explicitly out of scope for Phase 1.
- React Query: Designed for async server state; overkill for synchronous localStorage adapter.

---

## Decision 2: CSS Strategy — Tailwind + CSS Variables (no `nx-*` class names)

**Decision**: Extract the prototype's CSS design tokens as CSS custom properties in `globals.css`. Implement components using Tailwind utility classes, with `@apply` for repeated shell patterns (nav items, dropdowns). The `nx-*` BEM class names from the prototype are NOT used as-is — they are converted to semantic component classes where needed.

**Rationale**:
- The local app uses Tailwind throughout. Mixing `nx-*` BEM with Tailwind would create a naming collision nightmare.
- CSS variables are the right mechanism for design tokens (colors, shadows, canvas background) because they support dark mode switching cleanly via `[data-theme="dark"]`.
- `@apply` is appropriate for patterns repeated 5+ times (nav items, dropdown items, auth card structure).

**Alternatives considered**:
- Copy prototype CSS verbatim: Would conflict with Tailwind's `@layer` system and the existing `globals.css` structure.
- CSS Modules per component: Viable but increases file count significantly; Tailwind + CSS vars is simpler.
- Styled Components/Emotion: Not used anywhere in the project — do not introduce.

---

## Decision 3: Next.js Layout Hierarchy for Dual Shells

**Decision**: Two independent layout.tsx files handle the Core and Commerce shells.

```
app/
├── layout.tsx          ← root: AppProvider wraps everything
├── dashboard/
│   └── layout.tsx      ← CoreShell (Core Platform nav)
└── commerce/
    ├── layout.tsx       ← CommerceShell (Commerce OS nav) + auth guards
    └── setup/
        └── layout.tsx   ← minimal setup layout (no sidebar)
```

**Rationale**:
- Next.js App Router layout nesting is designed for exactly this pattern.
- Core Platform and Commerce OS have completely different nav items, context switcher modes, and sidebar content — a single layout cannot cleanly handle both.
- The root layout.tsx wraps the entire app with `AppProvider`, so all Client Components have access to `useApp()`.
- The commerce setup wizard needs a minimal layout (just topbar, no sidebar) because the setup wizard is a multi-step form, not a normal commerce screen.

**Alternatives considered**:
- Single layout with conditional nav: Creates prop-drilling complexity and conditional rendering that grows with each new OS.
- Parallel routes (`@modal`): Not appropriate here — these are full-page routes, not modals.

**Risk confirmed**: The transition from old `dashboard/layout.tsx` (direct Sidebar/Topbar imports) to new CoreShell layout must be done carefully to avoid double-shell rendering. Strategy: replace layout.tsx atomically, keep old Sidebar/Topbar in archive until shell is verified.

---

## Decision 4: Auth Guard Strategy

**Decision**: Auth guards are implemented as React hooks/components at the layout level, not as middleware.

```
app/commerce/layout.tsx
  → useEffect(() => { if (!isAuthenticated) router.push('/login') }, [])
  → useEffect(() => { if (!isOnboardingComplete) router.push('/onboarding') }, [])
  → useEffect(() => { if (!isCommerceSetupComplete) router.push('/commerce/setup') }, [])
```

**Rationale**:
- Phase 1 uses localStorage for session state — Next.js middleware runs on the server/edge and cannot read localStorage.
- Client-side guards via `useEffect` are the standard pattern for localStorage-based auth in Next.js App Router.
- AppProvider exposes computed booleans (`isAuthenticated`, `isOnboardingComplete`, `isCommerceSetupComplete`) that guards consume directly.

**Alternatives considered**:
- Next.js middleware: Cannot read localStorage; would need cookies — adds complexity not justified for Phase 1 mock auth.
- HOC `withAuth()`: Viable but layout-level guards are simpler and more Next.js-idiomatic.

---

## Decision 5: Component Primitive Strategy

**Decision**: Use `@nexoraxs/ui` for existing primitives (Button, Input, Logo). Build locally in `components/ui/` for prototype-specific primitives not in the shared package (Avatar, Badge, BrandMark, Toast). Do NOT modify the shared `@nexoraxs/ui` package.

**Rationale**:
- Modifying the shared package during a port risks breaking other apps in the monorepo.
- Avatar, Badge, BrandMark, and Toast are Commerce/Platform specific enough to live in `apps/core-platform/components/ui/`.
- If the shared package lacks a needed Input variant (e.g., icon prefix), wrap it locally rather than modifying it.

**Alternatives considered**:
- Add everything to `@nexoraxs/ui`: Correct long-term direction, but wrong for a port — adds scope and review requirements.
- Shadcn/ui: Not used in the project; do not introduce.

---

## Decision 6: RTL / Arabic Implementation

**Decision**: The `AppProvider` manages `lang` state. When `lang === 'ar'`, it sets `document.documentElement.dir = 'rtl'` and `document.documentElement.lang = 'ar'`. Tailwind's `rtl:` variant modifier handles component-level flip where needed.

**Rationale**:
- Setting `dir` on the root `<html>` element is the correct HTML mechanism for RTL. Tailwind's `rtl:` variant reads this attribute.
- The prototype uses the same approach (lang state → CSS `dir` attribute).
- Next.js App Router's `<html>` tag in the root `layout.tsx` can have `dir` as a dynamic prop read from `AppProvider` state — but since `AppProvider` is a Client Component, the `dir` must be set imperatively via `useEffect`.

**Alternatives considered**:
- Next.js `i18n` routing (`/ar/...` paths): Adds URL complexity not needed for Phase 1 where language is a user preference, not a routing concern.
- Separate RTL stylesheet: The prototype avoided this successfully; Tailwind's `rtl:` variant is sufficient.

---

## Decision 7: POS Walk-in vs Customer Sale

**Decision**: The POS cart has an optional "Customer" selector. If no customer is selected (default state = "Walk-in"), `createOrder()` is called with `customerId: null`. `createInvoice()` is called with `customerId: null`. No `CommerceCustomer` record is created or modified.

**Rationale**:
- Constitution Article IX: "A POS walk-in sale must NOT create a CommerceCustomer record" — this is explicit in the spec.
- Walk-in is the default state to reduce friction for the most common POS use case.
- The POS cart shows a "Walk-in" placeholder in the customer field — it is never stored as a real entity.

**Alternatives considered**:
- Create a "Walk-in Customer" singleton entity: Explicitly forbidden in spec edge cases.
- Require customer for every sale: Breaks the pharmacy/retail use case where most sales are anonymous.

---

## Decision 8: Dashboard Metrics Calculation

**Decision**: All Dashboard and Reports metrics are computed from `orders` and `invoices` arrays in real-time using `commerce-helpers.ts` functions. No pre-computed/cached aggregates in Phase 1.

**Rationale**:
- Phase 1 data volumes are small (localStorage-backed). Real-time computation is fast enough.
- Pre-computing aggregates requires write-time side effects — adds complexity with no Phase 1 benefit.
- `useMemo` in the Dashboard component caches the computation across renders.

**Alternatives considered**:
- Materialize aggregates on every write: Correct for production scale; premature for Phase 1 mock data.
- Separate analytics slice: Not needed until we have backend and significant data volume.

---

## Known Dependencies

| Dependency | Status | Notes |
|-----------|--------|-------|
| `lucide-react` | Available | Used throughout the local project — maps cleanly to `Icon` component |
| `@nexoraxs/ui` Button, Input, Logo | Available | Verify exact prop interface before writing auth screens |
| Tailwind CSS | Available | Used throughout |
| Next.js 14 App Router | Available | Confirmed from project structure |
| `localStorage` / `sessionStorage` | Browser API | Available in all modern browsers |

---

## Risks Confirmed

| Risk | Likelihood | Confirmed Mitigation |
|------|-----------|---------------------|
| Shell CSS conflict during layout.tsx replacement | High | Replace layout.tsx atomically; keep old components in archive |
| Old `core-session.ts` guard logic conflicts with new AppProvider | High | New AppProvider replaces core-session.ts in Phase 2 — guard components must use AppProvider exclusively |
| `dir` attribute RTL not applying correctly in Next.js App Router | Medium | Set via `useEffect` in AppProvider + `document.documentElement.dir` imperatively |
| Landing page accidentally impacted | Low | Validate `git diff app/page.tsx` shows no changes at end of every phase |
| `@nexoraxs/ui` Input missing icon prop | Medium | Wrap locally; do not modify shared package |
