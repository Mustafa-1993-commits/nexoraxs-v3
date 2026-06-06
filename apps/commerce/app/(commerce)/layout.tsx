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

  if (!isHydrated) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#0c0e14" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", border: "3px solid #4f46e5", borderTopColor: "transparent", animation: "nx-spin 0.8s linear infinite" }} />
      </div>
    );
  }
  if (!hasCommerceSetupContext || !isAuthenticated || !isOnboardingComplete || !isCommerceSetupComplete) return null;

  return <CommerceShell>{children}</CommerceShell>;
}
