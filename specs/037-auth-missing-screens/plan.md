# Implementation Plan: Core Platform Auth — Missing Screens

**Branch**: `037-auth-missing-screens` | **Date**: 2026-05-20 | **Spec**: [spec.md](spec.md)

---

## Summary

Build three missing auth screens for `apps/core-platform`:

1. `/verify-email` — post-register confirmation with 60s resend cooldown
2. `/forgot-password` — email input → in-place confirmation state
3. `/reset-password` — new password form → redirect to `/login?reset=success`

Plus two modifications to existing pages:
- `/register` → change redirect from `/login` to `/verify-email`
- `/login` → wire "Forgot password?" link + show success banner on `?reset=success`

All screens are UI-only mock. No backend calls. No new npm packages.

---

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I — Modular Monolith | ✅ PASS | All changes inside `apps/core-platform` |
| II — Multi-Tenant Isolation | ✅ N/A | No database — mock only |
| III — App Boundary | ✅ PASS | No cross-app imports |
| IV — Type Safety | ✅ PASS | Strict mode; countdown state typed |
| V — SDK-First | ✅ N/A | No API calls |
| VI — Spec-Driven | ✅ PASS | Spec written first |

---

## Technical Context

**Framework**: Next.js 16.x App Router — `"use client"` on all new screens
(countdown, in-place state change, show/hide toggle, query param reading)
**Styling**: TailwindCSS 4.x — replicate the existing `/login` and `/register` visual pattern
**State**: `useState` for countdown / sent state / show/hide; `useSearchParams` for `?reset=success`
**sessionStorage**: Read `core_mock_user_email` on `/verify-email` (via `useSyncExternalStore` pattern already in codebase)
**Animation**: Optional `framer-motion` fade-in (already in stack from spec 033)
**New routes**: 3 new standalone pages (no layout wrapper)
**No new packages**

---

## Visual Pattern (replicate from `/login`)

```
Background: bg-[#0a0a0f]
Card: border border-white/10 bg-white/[0.03] rounded-2xl p-8
Heading: text-2xl font-bold text-white
Subtext: text-sm text-white/50
Input: rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white
       focus:border-blue-500 focus:ring-1 focus:ring-blue-500
CTA button: rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white
            hover:bg-blue-700 transition-colors
Secondary link: text-sm text-white/40 hover:text-white transition-colors
Logo: <Logo app="core" /> from @nexoraxs/ui — top center, above card
```

---

## File Map

```
apps/core-platform/
│
├── app/
│   ├── verify-email/
│   │   └── page.tsx          CREATE — "use client"; envelope icon; email display; resend cooldown
│   ├── forgot-password/
│   │   └── page.tsx          CREATE — "use client"; email form → in-place confirmation
│   ├── reset-password/
│   │   └── page.tsx          CREATE — "use client"; 2 password fields + show/hide
│   ├── register/
│   │   └── page.tsx          MODIFY — change redirect: /login → /verify-email
│   └── login/
│       └── page.tsx          MODIFY — wire "Forgot password?" link + ?reset=success banner
```

---

## Screen Designs

### `/verify-email`

```
[Logo]

┌─────────────────────────────────────┐
│  📧  (envelope icon — large)        │
│                                     │
│  Check your inbox                   │
│  We sent a verification link to     │
│  mustafa@example.com                │
│                                     │
│  [  Resend email  ]  ← blue btn     │
│  (disabled + "Resend in 58s" when   │
│   countdown running)                │
│                                     │
│  ← Back to login                    │
└─────────────────────────────────────┘
```

**Countdown implementation:**
```typescript
const [seconds, setSeconds] = useState(0); // 0 = not counting
const [sent, setSent] = useState(false);

const handleResend = () => {
  setSent(true);
  setSeconds(60);
};

useEffect(() => {
  if (seconds <= 0) return;
  const t = setTimeout(() => setSeconds(s => s - 1), 1000);
  return () => clearTimeout(t);
}, [seconds]);

const canResend = seconds === 0;
```

### `/forgot-password`

Two states, no page navigation between them:

```
STATE A — Form:                    STATE B — Confirmation:
[Logo]                             [Logo]

┌──────────────────────┐           ┌──────────────────────┐
│ Forgot password?     │           │ 📧                   │
│ Enter your email...  │     →     │ Check your inbox     │
│                      │           │ If [email] is        │
│ [email input      ]  │           │ registered, we sent  │
│ [Send reset link  ]  │           │ a reset link.        │
│                      │           │                      │
│ ← Back to login      │           │ ← Back to login      │
└──────────────────────┘           └──────────────────────┘
```

**State toggle:**
```typescript
const [sent, setSent] = useState(false);
// sent=false → show form; sent=true → show confirmation
```

### `/reset-password`

```
[Logo]

┌─────────────────────────────────────┐
│  Reset your password                │
│                                     │
│  New password                       │
│  [••••••••••••••••] 👁              │
│                                     │
│  Confirm new password               │
│  [••••••••••••••••] 👁              │
│                                     │
│  [  Reset password  ]               │
└─────────────────────────────────────┘
```

**Show/hide toggle:**
```typescript
const [showNew, setShowNew] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);
// input type = showNew ? "text" : "password"
```

**On submit:** `router.push("/login?reset=success")`

### `/login` — Success Banner

```
┌─────────────────────────────────────┐
│ ✓ Password reset successfully —     │  ← green banner, top of card
│   you can now sign in.              │     auto-dismiss after 4s
└─────────────────────────────────────┘
```

**Banner implementation:**
```typescript
const searchParams = useSearchParams();
const resetSuccess = searchParams.get("reset") === "success";
const [showBanner, setShowBanner] = useState(resetSuccess);

useEffect(() => {
  if (!resetSuccess) return;
  const t = setTimeout(() => setShowBanner(false), 4000);
  return () => clearTimeout(t);
}, [resetSuccess]);
```

---

## Modifications to Existing Files

### `apps/core-platform/app/register/page.tsx`

Find the "Create Account" click handler (currently routes to `/login`) and change:
```typescript
// BEFORE
router.push("/login")
// AFTER
router.push("/verify-email")
```

### `apps/core-platform/app/login/page.tsx`

1. Find "Forgot password?" — currently `<span>` or plain text → change to:
```tsx
<a href="/forgot-password"
  className="text-sm text-white/40 hover:text-white transition-colors">
  Forgot password?
</a>
```

2. Add `useSearchParams` + banner state + banner JSX (see above).

---

## Implementation Order

Sequential (all in `apps/core-platform` — one developer):

1. `/verify-email` — new page (self-contained, no dependencies)
2. `/forgot-password` — new page (self-contained)
3. `/reset-password` — new page (self-contained)
4. Modify `/register` — one-line redirect change
5. Modify `/login` — add link + banner
6. Build gate — lint + build
