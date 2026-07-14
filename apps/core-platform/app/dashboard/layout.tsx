"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { CoreShell } from "@/components/shell/CoreShell";
import { ShellStateNotice } from "@/components/shell/ShellStateNotice";
import { useShellPresentation } from "@/lib/shell/useShellPresentation";
import { createShellPresentationState } from "@/lib/shell/presentation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isHydrated, isAuthenticated, onboardingState } = useApp();
  const { context, retryContext, state } = useShellPresentation();
  const hasCompletedCommerceOnboarding = onboardingState.completedOS.includes("commerce");
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated) {
      router.replace("/login");
    } else if (!hasCompletedCommerceOnboarding) {
      router.replace("/onboarding");
    }
  }, [hasCompletedCommerceOnboarding, isHydrated, isAuthenticated, router]);

  if (!isHydrated || !isAuthenticated || !hasCompletedCommerceOnboarding) {
    return (
      <div className="nx-shell-loading-frame">
        <ShellStateNotice state={createShellPresentationState("loading")} />
      </div>
    );
  }

  if (state.kind !== "ready") {
    return (
      <CoreShell>
        <ShellStateNotice state={state} contextStatus={context.status} onAction={retryContext} />
      </CoreShell>
    );
  }

  return <CoreShell>{children}</CoreShell>;
}
