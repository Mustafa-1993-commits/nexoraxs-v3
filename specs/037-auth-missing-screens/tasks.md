# Tasks: Core Platform Auth — Missing Screens

**Branch**: `037-auth-missing-screens`
**App**: `apps/core-platform`
**Input**: `specs/037-auth-missing-screens/`
**Prerequisites**: spec.md ✅ | plan.md ✅

---

## Phase 1: `/verify-email` Page (US1)

- [x] T001 Create `apps/core-platform/app/verify-email/page.tsx` —
  full file content:
  ```tsx
  "use client";
  import { useState, useEffect } from "react";
  import { useRouter } from "next/navigation";
  import { Logo } from "@nexoraxs/ui";

  function getStoredEmail(): string {
    if (typeof window === "undefined") return "owner@nexoraxs.local";
    return sessionStorage.getItem("core_mock_user_email") ?? "owner@nexoraxs.local";
  }

  export default function VerifyEmailPage() {
    const router = useRouter();
    const [email, setEmail] = useState("owner@nexoraxs.local");
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
      setEmail(getStoredEmail());
    }, []);

    useEffect(() => {
      if (seconds <= 0) return;
      const t = setTimeout(() => setSeconds(s => s - 1), 1000);
      return () => clearTimeout(t);
    }, [seconds]);

    const canResend = seconds === 0;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0f] px-4">
        <div className="mb-8">
          <Logo app="core" />
        </div>
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          {/* Envelope icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-white">Check your inbox</h1>
          <p className="mt-2 text-sm text-white/50">
            We sent a verification link to
          </p>
          <p className="mt-1 text-sm font-medium text-blue-400">{email}</p>

          <button
            type="button"
            onClick={() => setSeconds(60)}
            disabled={!canResend}
            className={`mt-8 w-full rounded-xl py-3 text-sm font-semibold transition-colors ${
              canResend
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "cursor-not-allowed bg-white/5 text-white/30"
            }`}
          >
            {canResend ? "Resend email" : `Resend in ${seconds}s`}
          </button>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="mt-4 text-sm text-white/40 hover:text-white transition-colors"
          >
            ← Back to login
          </button>
        </div>
      </div>
    );
  }
  ```

**Checkpoint**: Navigate to `/verify-email`. Envelope icon + "Check your inbox" visible.
Email address shown. Click "Resend email" → button disables + countdown starts.
"Back to login" → navigates to `/login`.

---

## Phase 2: `/forgot-password` Page (US2)

- [x] T002 Create `apps/core-platform/app/forgot-password/page.tsx` —
  full file content:
  ```tsx
  "use client";
  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import { Logo } from "@nexoraxs/ui";

  export default function ForgotPasswordPage() {
    const router = useRouter();
    const [sent, setSent] = useState(false);
    const [email, setEmail] = useState("");

    if (sent) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0f] px-4">
          <div className="mb-8">
            <Logo app="core" />
          </div>
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Check your inbox</h1>
            <p className="mt-3 text-sm text-white/50 max-w-xs mx-auto">
              If <span className="text-white/70">{email || "that email"}</span> is
              registered, we&apos;ve sent a password reset link.
            </p>
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="mt-8 text-sm text-white/40 hover:text-white transition-colors"
            >
              ← Back to login
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0f] px-4">
        <div className="mb-8">
          <Logo app="core" />
        </div>
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h1 className="text-2xl font-bold text-white">Forgot password?</h1>
          <p className="mt-2 text-sm text-white/50">
            Enter your email and we&apos;ll send you a reset link.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-white/60">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="button"
              onClick={() => setSent(true)}
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Send reset link
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              ← Back to login
            </button>
          </div>
        </div>
      </div>
    );
  }
  ```

**Checkpoint**: Navigate to `/forgot-password`. Email input + "Send reset link" visible.
Click button → confirmation state appears in-place (no navigation). "Back to login" → `/login`.

---

## Phase 3: `/reset-password` Page (US3)

- [x] T003 Create `apps/core-platform/app/reset-password/page.tsx` —
  full file content:
  ```tsx
  "use client";
  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import { Logo } from "@nexoraxs/ui";

  export default function ResetPasswordPage() {
    const router = useRouter();
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const EyeIcon = ({ show }: { show: boolean }) => (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {show ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        ) : (
          <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </>
        )}
      </svg>
    );

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0f] px-4">
        <div className="mb-8">
          <Logo app="core" />
        </div>
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h1 className="text-2xl font-bold text-white">Reset your password</h1>
          <p className="mt-2 text-sm text-white/50">
            Choose a new password for your account.
          </p>

          <div className="mt-6 space-y-4">
            {/* New password */}
            <div>
              <label htmlFor="new-password" className="mb-1.5 block text-xs font-medium text-white/60">
                New password
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showNew ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-11 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  <EyeIcon show={showNew} />
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="confirm-password" className="mb-1.5 block text-xs font-medium text-white/60">
                Confirm new password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your new password"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-11 text-sm text-white placeholder:text-white/25 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  <EyeIcon show={showConfirm} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push("/login?reset=success")}
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Reset password
            </button>
          </div>
        </div>
      </div>
    );
  }
  ```

**Checkpoint**: Navigate to `/reset-password`. Two password fields with show/hide eye icons.
Click eye → field toggles. Click "Reset password" → navigates to `/login?reset=success`.

---

## Phase 4: Modify `/login` — Forgot Password Link + Success Banner (US2 + US3)

- [x] T004 Modify `apps/core-platform/app/login/page.tsx` —
  
  **Step A** — Add `useSearchParams` and success banner state.
  Find the imports section and add (if not already imported):
  ```typescript
  import { useSearchParams } from "next/navigation";
  ```
  Add `"use client"` directive if not already present.
  
  Inside the component, add after existing state declarations:
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
  
  **Step B** — Add success banner JSX at the top of the card (before the heading):
  ```tsx
  {showBanner && (
    <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <p className="text-sm text-emerald-300">
        Password reset successfully — you can now sign in.
      </p>
    </div>
  )}
  ```
  
  **Step C** — Wire "Forgot password?" link.
  Find the existing "Forgot password?" text (may be a `<span>`, `<p>`, or unlinked `<a>`).
  Replace it with:
  ```tsx
  <a href="/forgot-password"
    className="text-sm text-white/40 hover:text-white transition-colors">
    Forgot password?
  </a>
  ```

**Checkpoint**: Navigate to `/login`. "Forgot password?" link is clickable → goes to `/forgot-password`.
Navigate to `/login?reset=success` → green banner visible. Wait 4s → banner fades out.

---

## Phase 5: Modify `/register` — Redirect to `/verify-email` (US1)

- [x] T005 Modify `apps/core-platform/app/register/page.tsx` —
  Find the "Create Account" click handler. It currently calls `router.push("/login")`.
  Change to `router.push("/verify-email")`.
  
  Search pattern: `router.push("/login")` inside the register handler.
  
  If the handler uses `href="/login"` on an anchor tag instead of `router.push`,
  change to `href="/verify-email"`.
  
  Confirm only ONE redirect is changed — do not change the "Already have an account?
  Sign In" link (that still goes to `/login`).

**Checkpoint**: Navigate to `/register`. Fill in any values. Click "Create Account".
Confirm navigation lands on `/verify-email` (not `/login`).
Confirm "Already have an account? Sign In" link still goes to `/login`.

---

## Phase 6: Build Gate

- [x] T006 Run `pnpm --filter core-platform lint` from repo root — fix all errors, exit 0
- [x] T007 [P] Run `pnpm --filter core-platform build` from repo root — exit 0;
  confirm new routes in output: `/verify-email`, `/forgot-password`, `/reset-password`

---

## Dependencies & Execution Order

```
T001 (verify-email)      ← independent
T002 (forgot-password)   ← independent
T003 (reset-password)    ← independent
T004 (login modify)      ← independent
T005 (register modify)   ← independent

T001–T005 all done → T006 → T007 (parallel)
```

T001–T005 can all run in parallel (different files, no shared dependencies).

---

## Notes

- All 3 new pages MUST NOT be inside `app/(app)/` or any route group — they are
  standalone auth pages at root level like `/login` and `/register`.
- `useSearchParams()` in `/login` requires `"use client"` — confirm the directive
  is at the top of `login/page.tsx`. If the file is currently a Server Component,
  converting to Client Component is required.
- The success banner uses `useState(resetSuccess)` — this initialises once from
  the query param. On subsequent renders, only `showBanner` state controls visibility.
- Do NOT add `Suspense` wrapper for `useSearchParams` — since the page is fully
  `"use client"`, it's not needed (no SSR boundary conflict).
- The `EyeIcon` component in `/reset-password` is defined inline in the same file —
  do not extract to a separate file.
- After T005, run a quick test: confirm the "Sign In" link on `/register` still goes
  to `/login` and ONLY the "Create Account" redirect changed.
- Mark tasks complete with `[x]` after implementation.
