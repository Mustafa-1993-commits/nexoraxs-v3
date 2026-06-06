"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { CommerceShell } from "@/components/shell/CommerceShell";

export default function CommerceLayout({ children }: { children: React.ReactNode }) {
  const { isHydrated, isAuthenticated, isOnboardingComplete, isCommerceSetupComplete, hasCommerceSetupContext } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;
    if (!hasCommerceSetupContext) {
      window.location.href = "http://localhost:3001/dashboard/apps";
      return;
    }
    if (!isAuthenticated) {
      window.location.href = "http://localhost:3001/login";
      return;
    }
    if (!isOnboardingComplete) {
      window.location.href = "http://localhost:3001/onboarding";
      return;
    }
    if (!isCommerceSetupComplete) {
      router.replace("/setup");
    }
  }, [isHydrated, hasCommerceSetupContext, isAuthenticated, isOnboardingComplete, isCommerceSetupComplete, router]);

  if (!isHydrated || !hasCommerceSetupContext || !isAuthenticated || !isOnboardingComplete || !isCommerceSetupComplete) return null;

  return <CommerceShell>{children}</CommerceShell>;
}
