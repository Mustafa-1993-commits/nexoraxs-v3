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
          <p className="mt-3 mx-auto max-w-xs text-sm text-white/50">
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
