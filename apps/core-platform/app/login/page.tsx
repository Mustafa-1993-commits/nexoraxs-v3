"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nexoraxs/ui";
import { initMockUserFallback, isWorkspaceOnboardingComplete } from "@/lib/session";

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = () => {
    initMockUserFallback();
    router.push(isWorkspaceOnboardingComplete() ? "/workspaces" : "/onboarding");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
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
