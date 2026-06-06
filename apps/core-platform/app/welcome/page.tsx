"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NexoraLogo } from "@nexoraxs/ui";
import { useApp } from "@/lib/store";

export default function WelcomePage() {
  const { isHydrated, isAuthenticated, currentUserDisplayName } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated) { router.replace("/login"); return; }
  }, [isHydrated, isAuthenticated, router]);

  const displayName = isHydrated ? currentUserDisplayName : "";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "NX";

  return (
    <div className="nx-welcome-screen">
      <div className="nx-welcome-glow" />

      <div className="nx-welcome-card nx-pop">
        <div className="nx-welcome-card-top">
          <NexoraLogo variant="top" className="nx-welcome-logo" />
          <div className="nx-welcome-avatar" aria-label={displayName || "NexoraXS user"}>
            {initials}
          </div>
        </div>

        <div className="nx-welcome-illustration" aria-hidden="true">
          <svg viewBox="0 0 220 170" fill="none" focusable="false">
            <rect x="35" y="32" width="150" height="106" rx="22" fill="url(#welcomePanel)" />
            <rect x="51" y="51" width="74" height="12" rx="6" fill="#eef2ff" />
            <rect x="51" y="72" width="48" height="8" rx="4" fill="#c7d2fe" />
            <rect x="51" y="96" width="36" height="30" rx="10" fill="#ede9fe" />
            <rect x="96" y="96" width="36" height="30" rx="10" fill="#e0e7ff" />
            <rect x="141" y="96" width="28" height="30" rx="10" fill="#ddd6fe" />
            <circle cx="156" cy="60" r="18" fill="#4f46e5" />
            <path d="M147.5 60h17m-8.5-8.5v17" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <path d="M29 136c30-13 54-13 82 0s53 13 80 0" stroke="#a5b4fc" strokeWidth="5" strokeLinecap="round" />
            <circle cx="42" cy="28" r="5" fill="#8b5cf6" />
            <circle cx="186" cy="28" r="4" fill="#6366f1" />
            <circle cx="193" cy="118" r="6" fill="#c4b5fd" />
            <defs>
              <linearGradient id="welcomePanel" x1="35" x2="185" y1="32" y2="138" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" />
                <stop offset="1" stopColor="#f4f1ff" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="nx-welcome-copyblock">
          <h1 className="nx-welcome-title">Create your workspace</h1>
          <p className="nx-welcome-copy">
            Set up your workspace, branch, and Commerce OS in a few guided steps.
          </p>
        </div>

        <button type="button" className="nx-welcome-cta" onClick={() => router.push("/onboarding")}>
          Create workspace
        </button>
      </div>
    </div>
  );
}
