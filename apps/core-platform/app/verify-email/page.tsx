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
  const [email] = useState<string>(getStoredEmail);
  const [seconds, setSeconds] = useState(0);

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
