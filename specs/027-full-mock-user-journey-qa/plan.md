# Implementation Plan: Full Mock User Journey QA

**Branch**: `028-mock-journey-qa` | **Date**: 2026-05-15 | **Spec**: [spec.md](./spec.md)

## Summary

This is a QA and connection feature. The majority of the mock journey is already implemented across features 024–026. The audit (detailed below) found **two broken CTAs on the landing page** as the only remaining gaps. Everything else — register identity capture, login routing, workspace onboarding region/country filtering, App Launcher Shops navigation, Shops onboarding branch country/currency, Shops session writes, Shops dashboard session reads, and Back to Platform routing — is already working correctly.

The implementation is therefore **minimal**: fix two `href="#"` links in landing and update one inconsistent in-page CTA anchor.

---

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)
**Primary Dependencies**: Next.js 16.x (App Router), React 19.x
**Storage**: sessionStorage (read-only from this feature's perspective — all writes already implemented)
**Testing**: None
**Target Platform**: Web (desktop + mobile)
**Project Type**: QA patch — surgical routing fixes in `apps/landing` only
**Constraints**: No new packages; no API; no backend; no cross-app imports; no new routes

---

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I — Modular Monolith | ✅ Pass | Landing changes are self-contained in `apps/landing` |
| II — Multi-Tenant Isolation | N/A | No database |
| III — App Boundary Enforcement | ✅ Pass | Landing only adds routing URLs via env var constants |
| IV — Type Safety | ✅ Pass | No new TypeScript; only href values change |
| V — SDK-First | N/A | No API calls |
| VI — Spec-Driven | ✅ Pass | Spec written before plan |

---

## Audit: Current State vs Spec Requirements

### ✅ Already Implemented (No Changes Needed)

| Requirement | Where Implemented | Status |
|---|---|---|
| FR-004/005/006/007 — Register saves name/email, routes to /login | `apps/core-platform/app/register/page.tsx` | ✅ feature 026 |
| FR-008/009/010/011 — Login routes + fallback identity | `apps/core-platform/app/login/page.tsx` | ✅ feature 026 |
| FR-012/013 — Region filters/resets Country in onboarding | `apps/core-platform/app/onboarding/page.tsx` | ✅ earlier fix |
| FR-014/015/016 — Team owner shows mock user name | `apps/core-platform/app/onboarding/page.tsx` | ✅ feature 026 |
| FR-017/018 — Onboarding saves + routes to /dashboard/apps | `apps/core-platform/app/onboarding/page.tsx` | ✅ existing |
| FR-019 — /dashboard/apps loads without 404 | `apps/core-platform/app/dashboard/apps/page.tsx` | ✅ existing |
| FR-020 — Open Shops navigates same tab | `apps/core-platform/lib/mock-data/apps.ts` + `AppCard.tsx` | ✅ earlier fix |
| FR-021/022 — Shops entry routes based on onboarding state | `apps/shops-app/app/page.tsx` redirects to `/onboarding`; completion state detected in onboarding page | ✅ existing |
| FR-023–026 — Shops branch country/currency selects + auto-suggest | `apps/shops-app/components/onboarding/StepStoreSetup.tsx` | ✅ feature 024 |
| FR-027/028 — Shops Review shows 7 items with qualified labels | `apps/shops-app/components/onboarding/StepReview.tsx` | ✅ feature 024 |
| FR-029/030/031 — Shops Finish writes session + routes to /dashboard | `apps/shops-app/app/onboarding/page.tsx` | ✅ feature 024 |
| FR-032/033/034 — Shops dashboard reads session data | `apps/shops-app/components/dashboard/Topbar.tsx`, `StoreProfile.tsx` | ✅ earlier fix |
| FR-035 — Back to Platform routes to Core Platform | `apps/shops-app/components/dashboard/Sidebar.tsx` | ✅ earlier fix |
| FR-036 — Returning login routes to /workspaces | `apps/core-platform/app/login/page.tsx` | ✅ feature 026 |
| FR-037 — Open Shops after completion routes to dashboard | Via Shops root redirect + onboarding completion state | ✅ existing |
| FR-038 — Shops onboarding shows completion state for returning user | `apps/shops-app/app/onboarding/page.tsx` `CompletionState` component | ✅ existing |
| SC-004 — No "Mustafa Ahmed" in source | All apps audited | ✅ feature 026 + settings/billing fix |

### ❌ Gaps Requiring Fixes

| Requirement | File | Issue |
|---|---|---|
| FR-002 (mobile) — Header Get Started → Core Platform | `apps/landing/src/sections/navbar/navbar.tsx:80` | `href="#"` — broken dead link |
| FR-003 — No broken CTA links | `apps/landing/src/sections/pricing/pricing.tsx:55` | `href="#"` "Join Beta" — broken dead link |
| FR-001/003 (minor) — CTA section Get Started | `apps/landing/src/sections/cta/cta.tsx:25` | `href="#pricing"` — in-page anchor, not broken but CTA should lead to Core Platform |

---

## Project Structure

### Documentation (this feature)

```text
specs/027-full-mock-user-journey-qa/
├── spec.md              ✅ written
├── plan.md              ✅ this file
├── research.md          ✅ written below
└── checklists/
    └── requirements.md  ✅ written
```

### Source Code Changes

```text
apps/landing/src/sections/
├── navbar/navbar.tsx          MODIFY — fix mobile Get Started href="#" → CORE_LOGIN_URL
├── pricing/pricing.tsx        MODIFY — fix Join Beta href="#" → CORE_LOGIN_URL
└── cta/cta.tsx                MODIFY — fix Get Started href="#pricing" → CORE_LOGIN_URL

AGENTS.md                      MODIFY — update SPECKIT block to 027
```

**No changes to `apps/core-platform` or `apps/shops-app` — all already implemented.**

---

## Detailed Implementation Notes

### 1. `apps/landing/src/sections/navbar/navbar.tsx` — Fix Mobile Get Started

**Current state**: The mobile menu (shown when the hamburger is open) has a "Get Started" button with `href="#"`. The desktop version correctly uses `CORE_LOGIN_URL`. The `CORE_LOGIN_URL` constant is already defined at the top of the file.

**Change**: Replace `href="#"` with `href={CORE_LOGIN_URL}` on the mobile "Get Started" button (line ~80).

```tsx
// Before:
<a href="#" className="btn-primary mt-2 w-full ...">
  Get Started
</a>

// After:
<a href={CORE_LOGIN_URL} className="btn-primary mt-2 w-full ...">
  Get Started
</a>
```

No new constants, no new imports — `CORE_LOGIN_URL` is already declared in the same file.

---

### 2. `apps/landing/src/sections/pricing/pricing.tsx` — Fix Join Beta

**Current state**: The "Join Beta" CTA button in the pricing section uses `href="#"`. This is a dead link that takes users to the top of the page instead of the register/login flow.

**Change**: Add `CORE_LOGIN_URL` constant (same pattern as hero and navbar) and use it on the "Join Beta" `<a>` tag.

```typescript
const CORE_LOGIN_URL =
  (process.env.NEXT_PUBLIC_CORE_PLATFORM_URL ?? "http://localhost:3001") + "/login";
```

Update the button:
```tsx
// Before:
<a href="#" className="btn-primary mt-8 w-full ...">Join Beta</a>

// After:
<a href={CORE_LOGIN_URL} className="btn-primary mt-8 w-full ...">Join Beta</a>
```

---

### 3. `apps/landing/src/sections/cta/cta.tsx` — Fix CTA Get Started

**Current state**: The dedicated call-to-action section has a "Get Started" button with `href="#pricing"`. This is an in-page anchor (not a 404), but it contradicts the intent of a primary conversion CTA — it scrolls to pricing instead of taking the user to Core Platform.

**Change**: Same pattern as pricing.tsx — add `CORE_LOGIN_URL` constant and use it on the "Get Started" `<a>` tag.

---

## Complexity Tracking

No constitution violations. All three changes are identical pattern: replace a static href with `CORE_LOGIN_URL` derived from an env var. The `CORE_LOGIN_URL` constant pattern is already established in `navbar.tsx` and `hero.tsx`. This is the lowest-risk category of change — no logic, no state, no component changes, only an href value.
