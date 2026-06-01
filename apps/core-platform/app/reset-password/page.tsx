"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@nexoraxs/ui";

function EyeIcon({ show }: { show: boolean }) {
  return (
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
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
