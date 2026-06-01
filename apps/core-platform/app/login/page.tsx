"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input } from "@nexoraxs/ui";
import { initMockUserFallback, isWorkspaceOnboardingComplete } from "@/lib/session";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetSuccess = searchParams.get("reset") === "success";
  const [showBanner, setShowBanner] = useState(resetSuccess);

  useEffect(() => {
    if (!resetSuccess) return;
    const t = setTimeout(() => setShowBanner(false), 4000);
    return () => clearTimeout(t);
  }, [resetSuccess]);

  const handleSignIn = () => {
    initMockUserFallback();
    router.push(isWorkspaceOnboardingComplete() ? "/workspaces" : "/onboarding");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
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

          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-white">NexoraXS</h1>
            <p className="mt-2 text-sm text-white/50">
              Sign in to your account
            </p>
          </div>

          <form className="space-y-4">
            <Input
              label="Email address"
              id="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />

            <div className="flex items-center justify-end">
              <a
                href="/forgot-password"
                className="text-sm text-white/40 hover:text-white transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                type="button"
                className="w-full"
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-white/40">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
