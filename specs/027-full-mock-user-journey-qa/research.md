# Research: Full Mock User Journey QA

**Feature**: 027-full-mock-user-journey-qa
**Date**: 2026-05-15

No external research needed. All decisions derived from auditing current app state against the spec.

---

## Audit Results: Per-Story Verification

### US1 — Landing CTAs

| CTA | Location | Current href | Status |
|---|---|---|---|
| Hero "Get Started" | `hero.tsx:49` | `CORE_LOGIN_URL` | ✅ Correct |
| Navbar desktop "Get Started" | `navbar.tsx:42` | `CORE_LOGIN_URL` | ✅ Correct |
| Navbar mobile "Get Started" | `navbar.tsx:80` | `#` | ❌ Broken |
| CTA section "Get Started" | `cta.tsx:25` | `#pricing` | ⚠️ In-page anchor — not broken but should route to Core |
| Pricing "Join Beta" | `pricing.tsx:55` | `#` | ❌ Broken |

**Decision**: Fix all three non-routing CTAs. The `#pricing` anchor is technically valid but creates an inconsistent experience — the user expects a conversion CTA to take them to registration, not scroll them to a pricing table they can already see.

---

### US2 — Register

**Finding**: `apps/core-platform/app/register/page.tsx` has controlled name and email inputs with `useState`. On Create Account, calls `saveMockUser(name.trim(), email.trim())` then `router.push("/login")`. Password `<Input>` has no `value`/`onChange` — never captured.

**Status**: ✅ Fully implemented (feature 026).

---

### US3 — Login

**Finding**: `apps/core-platform/app/login/page.tsx` imports `initMockUserFallback` and `isWorkspaceOnboardingComplete`. `handleSignIn` calls `initMockUserFallback()` first, then routes based on `isWorkspaceOnboardingComplete()`.

**Status**: ✅ Fully implemented (feature 026).

---

### US4 — Workspace Onboarding

**Finding**:
- Region select calls `handleRegionChange` which sets region AND resets country to `REGION_COUNTRIES[newRegion][0].value`.
- Country select renders `REGION_COUNTRIES[region]` dynamically.
- Team owner SummaryCard uses `value={mockUserName}` from `useSyncExternalStore`.
- `completeWorkspaceOnboarding()` and `router.push("/dashboard/apps")` called on finish.

**Status**: ✅ Fully implemented (features 025 region/country fix + 026 mock user).

---

### US5 — App Launcher

**Finding**:
- `/dashboard/apps` loads `AppsPage` rendering `mockApps` via `AppCard` grid. No 404.
- `mockApps` has `{ id: "shops", href: SHOPS_URL }` where `SHOPS_URL = process.env.NEXT_PUBLIC_SHOPS_APP_URL ?? "http://localhost:3002"`.
- `AppCard` renders `<a href={href}>` for available apps with href → same-tab navigation.

**Status**: ✅ Fully implemented (earlier fix).

---

### US6 — Shops Onboarding

**Finding**:
- `apps/shops-app/app/page.tsx` redirects to `/onboarding`.
- `apps/shops-app/app/onboarding/page.tsx` checks `isOnboardingComplete()` → shows `CompletionState` if true.
- `StepStoreSetup.tsx` has Branch country and Branch currency selects with `BRANCH_COUNTRY_CURRENCY_MAP` auto-suggest.
- `StepReview.tsx` `buildSummary` returns 7 items: Workspace, Business Type, Sales Model, Store Name, Main Branch, Branch country, Branch currency.
- `handleFinish` writes: `shops_store_name`, `shops_branch`, `shops_currency` (via `setCurrency`), `shops_country` (via `setCountry`), `shops_onboarding_done` (via `completeOnboarding`), then `router.push("/dashboard")`.

**Status**: ✅ Fully implemented (feature 024).

---

### US7 — Shops Dashboard

**Finding**:
- `Topbar.tsx` reads `getStoreName() ?? FALLBACK_STORE` and `getBranch()` from session.
- `StoreProfile.tsx` reads `getStoreName() ?? "Mustafa's Co."` and `getBranch()`.
- `Sidebar.tsx` Back to Platform: `href={`${CORE_PLATFORM_URL}/dashboard`}` where `CORE_PLATFORM_URL = process.env.NEXT_PUBLIC_CORE_PLATFORM_URL ?? "http://localhost:3001"`.

**Status**: ✅ Fully implemented (earlier fix).

---

### US8 — Returning User

**Finding**:
- Login routing: `isWorkspaceOnboardingComplete()` → `/workspaces` if true. ✅
- Open Shops → Shops root → redirect to `/onboarding` → `isOnboardingComplete()` → `CompletionState` shown. ✅
- `CompletionState` component has a "Continue to dashboard →" link. ✅

**Status**: ✅ Fully implemented.

---

## Decision: Scope of This Feature

**Decision**: Only fix the three broken/inconsistent landing CTAs. All other journey steps are already implemented across features 024–026 and the earlier ad-hoc routing fixes.

**Rationale**: The audit confirms all 43 functional requirements are either already satisfied or addressable with minimal landing changes. Attempting to re-implement or touch core-platform or shops-app code would introduce unnecessary risk to already-working flows.

**Files NOT changing** (confirmed correct):
- `apps/core-platform/*` — all correct
- `apps/shops-app/*` — all correct
- Landing sections `hero.tsx`, `apps.tsx`, `features.tsx`, `faq.tsx`, `footer.tsx`, `platform.tsx` — no broken CTAs found

**Files changing**:
- `apps/landing/src/sections/navbar/navbar.tsx` — mobile Get Started
- `apps/landing/src/sections/pricing/pricing.tsx` — Join Beta
- `apps/landing/src/sections/cta/cta.tsx` — Get Started anchor
