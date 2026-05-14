# Research: Core Workspace Onboarding Flow

**Feature**: 020-core-workspace-onboarding-flow
**Date**: 2026-05-14

No external research needed. All decisions are derived from auditing the existing codebase and the spec.

---

## Decision 1: Standalone Route — No Dashboard Layout

**Decision**: Add `apps/core-platform/app/onboarding/page.tsx` as a sibling of `app/login/` and `app/register/`. It does NOT use `app/dashboard/layout.tsx`. The root `app/layout.tsx` (which provides only `bg-[#0a0a0f] text-white` and fonts) is sufficient.

**Rationale**: The dashboard layout (`Sidebar + Topbar`) is for authenticated, post-setup pages. The onboarding page precedes dashboard entry and mirrors the pattern used by `login/page.tsx` and `register/page.tsx` — both are full-screen standalone pages with their own centered layout.

**Alternatives considered**:
- Adding a nested layout under `app/onboarding/layout.tsx`: unnecessary indirection; the page can define its own header inline.

---

## Decision 2: Minimal Onboarding Header Pattern

**Decision**: The onboarding page renders a slim sticky header row with the NexoraXS wordmark/logo on the left and a step indicator on the right (or centered below). This matches the brand bar style seen in the Topbar but is not the Topbar component itself (which requires auth-related context).

**Pattern reference**: The `Topbar.tsx` brand bar uses `h-16 border-b border-white/5 bg-[#0a0a0f]/85 backdrop-blur-xl`. The onboarding header will use the same token palette inline — no Topbar import.

---

## Decision 3: Icon Extension — New Icons for Core Platform

**Decision**: Add 4 new `IconName` values to `apps/core-platform/lib/types.ts` and their SVG paths to `apps/core-platform/components/ui/Icon.tsx`.

**New icons needed**:

| IconName | Purpose | SVG path |
|----------|---------|---------|
| `"check"` | Step completed indicator, app selected badge | `"M20 6L9 17l-5-5"` (stroke-based; use `fill="none" stroke="currentColor"`) |
| `"globe"` | Region select label | `"M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2c1.07 0 2.09.19 3.04.52L13 7H11L9.24 4.62A7.96 7.96 0 0 1 12 4zm-4.88 1.38L9 8v1l-3 3H3.08A8.01 8.01 0 0 1 7.12 5.38zM4 12c0-.34.02-.67.08-1H7l2 2v3l-2 2-2.92-.37A7.96 7.96 0 0 1 4 12zm8 8a7.96 7.96 0 0 1-4.6-1.46L9 17l2-2h4l1.5 3.17A7.97 7.97 0 0 1 12 20zm5.5-2.5L16 15V12l2-2h2.92c.06.33.08.66.08 1a7.96 7.96 0 0 1-3.5 6.5z"` |
| `"currency"` | Currency select label (dollar sign circle) | `"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.88 14.76V18h-1.75v-1.29c-1.35-.29-2.46-1.04-2.54-2.48h1.71c.07.73.62 1.28 1.58 1.28 1.03 0 1.58-.56 1.58-1.28 0-.8-.62-1.28-1.74-1.58-1.46-.38-3.01-1-3.01-2.76 0-1.3.98-2.24 2.42-2.5V6h1.75v1.41c1.4.31 2.21 1.23 2.28 2.5h-1.7c-.07-.73-.56-1.28-1.45-1.28-.85 0-1.44.44-1.44 1.2 0 .75.62 1.07 1.92 1.44 1.88.5 2.85 1.24 2.85 2.92 0 1.35-1.02 2.36-2.46 2.57z"` |
| `"package"` | App card icon (generic for Shops) | `"M20 7l-8-4-8 4m16 0v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7m16 0l-8 4M4 7l8 4"` |

**Note on `"check"` icon**: The existing Icon component uses `fill="currentColor"`. For a check (typically stroke-based), the SVG will use `fill="none"` with stroke attributes. The Icon component needs a minor adaptation for this icon OR use a filled checkmark path instead:
- Filled check path: `"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17"` — no stroke needed, works with `fill="currentColor"`.

**Final decision**: Use the filled check path `"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17"` to avoid modifying the Icon component's SVG fill behavior.

**Existing icons available** (already in core-platform `IconName`):
- `"dashboard"` — reuse for workspace card in step 3
- `"apps"` — reuse for enabled apps section
- `"users"` — reuse for team owner card in step 3
- `"settings"` — available if needed
- `"chevron-right"`, `"chevron-down"` — navigation affordances
- `"trending-up"` — reuse for currency/region if needed

**Actual new icons needed after audit**:
- `"check"` — step complete state, app selected badge
- `"globe"` — region select
- `"building"` — workspace icon on review step: `"M3 21h18M9 8h1m-1 4h1m4-4h1m-1 4h1m-6 9v-9m4 9v-9M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"` 
- `"zap"` — "Continue to dashboard" CTA accent: `"M13 2L3 14h9l-1 8 10-12h-9l1-8z"`

Minimum required new icons: **`"check"`, `"building"`, `"globe"`, `"zap"`** — 4 additions.

---

## Decision 4: Hydration Pattern — `useSyncExternalStore`

**Decision**: Identical to the pattern established in shops-app features 015 and 019. All sessionStorage reads use `useSyncExternalStore` to avoid hydration mismatch.

```typescript
const mounted = useSyncExternalStore(
  () => () => {},   // subscribe (no-op)
  () => true,       // getSnapshot (client)
  () => false       // getServerSnapshot (server/SSR)
)
```

The `isComplete` check gates the completion state display: `const isComplete = mounted ? isOnboardingComplete() : false`.

**Rationale**: Prevents `typeof window === "undefined"` crashes on SSR, avoids `react-hooks/set-state-in-effect` lint errors from `useEffect`-based hydration.

---

## Decision 5: Slug Auto-Generation Logic

**Decision**: Client-side transform only — no server validation, no debounce needed.

```typescript
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
```

**Auto-gen stops when**: user directly edits the slug input (`slugManuallyEdited` boolean flag in state). Once `true`, workspace name changes no longer overwrite the slug.

**Edge case (spec mandated)**: If workspace name is cleared after slug was auto-generated, slug remains (treated as user-confirmed), but "Continue" disables because `workspaceName` is empty (FR-006).

---

## Decision 6: State Management

**Decision**: All state lives in the onboarding page component (no Context, no external state). Data flows down as props to step components.

```typescript
// Page state
const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
const [workspaceName, setWorkspaceName] = useState("")
const [slug, setSlug] = useState("")
const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
const [region, setRegion] = useState("me-central")
const [currency, setCurrency] = useState("EGP")
const [shopsEnabled, setShopsEnabled] = useState(true)  // pre-selected
```

`WorkspaceSetup` and `EnabledApps` are written to sessionStorage only when "Continue to dashboard" is clicked (not at each step).

**sessionStorage key written on completion**: `core_workspace_onboarding_done = "true"`.

---

## Decision 7: Step Component Structure

**Decision**: Inline step panels in the page file (no separate component files). The 3-step core-platform flow is significantly simpler than the 4-step shops flow (no two-column form+preview, no business type grid). Estimating ~350 lines total — manageable as a single file.

**Rationale**: The onboarding page was ~600+ lines in shops-app 019, which justified extraction. Core-platform's flow has:
- Step 1: Simple form (4 inputs/selects)
- Step 2: 5 app cards (1 interactive, 4 static)
- Step 3: Read-only summary cards
This fits in a single well-structured file without extraction overhead.

**Alternatively**: If the file exceeds 400 lines, extract `StepCreateWorkspace`, `StepChooseApps`, `StepReview` into `components/onboarding/` — but plan as a single file first.

**Final decision**: Single-file implementation at `app/onboarding/page.tsx`. No new component files unless the file exceeds 500 lines during implementation.

---

## Decision 8: App Cards Data

**Decision**: Inline constant array for the 5 app cards. Shops app uses the existing `package` icon (new addition). Others use `apps` icon with "Coming Soon" visual treatment.

```typescript
const APPS = [
  { id: "shops",       name: "NexoraXS Shops",   desc: "Retail & e-commerce management", icon: "package",   available: true  },
  { id: "clinics",     name: "NexoraXS Clinics",  desc: "Healthcare clinic management",   icon: "apps",      available: false },
  { id: "maintenance", name: "NexoraXS Maint.",   desc: "Field service management",       icon: "apps",      available: false },
  { id: "restaurants", name: "NexoraXS Eats",     desc: "Restaurant management",          icon: "apps",      available: false },
  { id: "crm",         name: "NexoraXS CRM",      desc: "Customer relationship mgmt",     icon: "apps",      available: false },
] as const;
```

---

## Decision 9: Region and Currency Options

**Region options** (matching spec FR-004, at least 2 required):
- `me-central`: Middle East (Central)
- `eu-central`: EU (Central)
- `us-east`: US East
- `ap-southeast`: Asia Pacific (SE)

**Currency options** (matching spec FR-004, at least 5 required):
- EGP, USD, SAR, AED, EUR

---

## Decision 10: Returning User Completion State

**Decision**: Completion state renders a centered card ("Workspace already set up") with a "Go to dashboard" link to `/dashboard/apps`. No redirect — show the card, let user click. This avoids router.push on mount (which can cause flicker) and gives the user a clear affordance.

**sessionStorage helper functions** (to add to core-platform — new file `lib/session.ts`):

```typescript
const ONBOARDING_KEY = "core_workspace_onboarding_done";

export function completeWorkspaceOnboarding(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ONBOARDING_KEY, "true");
}

export function isWorkspaceOnboardingComplete(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ONBOARDING_KEY) === "true";
}
```

Additionally, workspace data can be written as a JSON blob under `core_workspace_setup`:
```typescript
export function saveWorkspaceSetup(data: WorkspaceSetup): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("core_workspace_setup", JSON.stringify(data));
}
```

---

## Files Summary

### Modified:
- `apps/core-platform/lib/types.ts` — add 4 new `IconName` values: `"check"`, `"building"`, `"globe"`, `"zap"`
- `apps/core-platform/components/ui/Icon.tsx` — add 4 new SVG paths
- `AGENTS.md` — update SPECKIT block to 020

### Created:
- `apps/core-platform/lib/session.ts` — sessionStorage helpers for workspace onboarding
- `apps/core-platform/app/onboarding/page.tsx` — full 3-step onboarding page

### Unchanged (verified compatible):
- `apps/core-platform/app/dashboard/layout.tsx` — not used by onboarding route
- `apps/core-platform/app/login/page.tsx`, `app/register/page.tsx` — no dependency
- `apps/core-platform/app/dashboard/apps/page.tsx` — destination after onboarding; no changes needed
