# Quickstart: Auth Missing Screens

**Branch**: `037-auth-missing-screens` | **App**: `apps/core-platform` | **Port**: 3001

---

## Prerequisites

- `pnpm --filter core-platform dev` running on `http://localhost:3001`

---

## Verification Scenarios

### Scenario 1 — Register → Verify Email

1. Navigate to `http://localhost:3001/register`
2. Fill in any name, email, password, confirm password
3. Click **"Create Account"**
4. Confirm landing on `/verify-email` ✅ (NOT `/login`)
5. Verify email address shown in subtext ✅
6. Click **"Resend email"** → button disables + countdown from 60 ✅
7. Click **"← Back to login"** → navigates to `/login` ✅

### Scenario 2 — Forgot Password Flow

1. Navigate to `http://localhost:3001/login`
2. Click **"Forgot password?"** → lands on `/forgot-password` ✅
3. Enter any email address
4. Click **"Send reset link"** → confirmation state appears (no navigation) ✅
5. Confirmation shows "Check your inbox" + email in subtext ✅
6. Click **"← Back to login"** → `/login` ✅

### Scenario 3 — Reset Password

1. Navigate to `http://localhost:3001/reset-password`
2. Verify two password fields visible ✅
3. Click eye icon on "New password" → toggles to visible text ✅
4. Click eye icon on "Confirm" → toggles ✅
5. Click **"Reset password"** → navigates to `/login?reset=success` ✅

### Scenario 4 — Success Banner on Login

1. Navigate to `http://localhost:3001/login?reset=success`
2. Green banner visible: "Password reset successfully — you can now sign in." ✅
3. Wait 4 seconds → banner fades out ✅
4. Navigate to `http://localhost:3001/login` (no param) → no banner ✅

### Scenario 5 — Mobile (375px)

1. Set DevTools to 375px
2. Check `/verify-email` — centred, no overflow ✅
3. Check `/forgot-password` — form fits, no overflow ✅
4. Check `/reset-password` — eye icons reachable, no overflow ✅

---

## Build Gate

```bash
# From repo root
pnpm --filter core-platform lint    # exit 0
pnpm --filter core-platform build   # exit 0
```

Confirm routes in build output:
- `/verify-email`
- `/forgot-password`
- `/reset-password`

---

## Git Commit

```bash
git add \
  specs/037-auth-missing-screens/ \
  apps/core-platform/app/verify-email/ \
  apps/core-platform/app/forgot-password/ \
  apps/core-platform/app/reset-password/ \
  apps/core-platform/app/login/page.tsx \
  apps/core-platform/app/register/page.tsx \
  AGENTS.md \
  .specify/feature.json

git commit -m "feat(core-platform): auth missing screens — verify email, forgot password, reset password"
```
