"use client";

import { Logo, Icon } from "@nexoraxs/ui";
import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockWorkspaces } from "@/lib/mock-data/workspaces";
import { getMockUserEmail, getMockUserName } from "@/lib/session";

const subscribeToNothing = () => () => {};

function getInitials(name: string): string {
  return (
    name.trim().split(/\s+/).filter(Boolean)
      .slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("")
    || "WO"
  );
}

export default function WorkspacesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();
  const userName  = useSyncExternalStore(subscribeToNothing, () => getMockUserName()  ?? "Workspace owner",     () => "Workspace owner");
  const userEmail = useSyncExternalStore(subscribeToNothing, () => getMockUserEmail() ?? "owner@nexoraxs.local", () => "owner@nexoraxs.local");

  const handleContinue = () => {
    if (selectedId) router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a0f]">
      {/* Top brand bar */}
      <header className="relative z-10 border-b border-white/5 bg-[#0a0a0f]/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Logo />

          <div className="flex items-center gap-3">
            {/* User pill */}
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
              <div
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-white"
                style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)" }}
              >
                {getInitials(userName)}
              </div>
              <div className="hidden leading-tight sm:block">
                <p className="text-xs font-medium text-white">{userName}</p>
                <p className="font-mono text-[10px] text-white/40">
                  {userEmail}
                </p>
              </div>
            </div>

            <Link
              href="/login"
              className="text-xs text-white/40 transition-colors hover:text-white"
            >
              Sign out
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto max-w-xl px-4 pb-16 pt-14">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="chip mb-3 text-white/30">{"// workspace"}</p>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Select a workspace
          </h1>
          <p className="mt-3 text-sm text-white/50">
            Each workspace is an isolated tenant with its own apps, data, and team.
          </p>
        </div>

        {/* Workspace cards */}
        <div className="space-y-3">
          {mockWorkspaces.map((ws) => {
            const isSelected = selectedId === ws.id;
            return (
              <button
                key={ws.id}
                type="button"
                onClick={() => setSelectedId(ws.id)}
                className={`w-full rounded-2xl border p-5 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-blue-500/50 bg-blue-500/5 shadow-[0_0_24px_-6px_rgba(59,130,246,0.35)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Initials avatar */}
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${ws.color}, ${ws.color}60)`,
                    }}
                  >
                    {ws.initials}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        {ws.name}
                      </span>
                      <span className="chip rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-blue-300">
                        Beta
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4">
                      <span className="font-mono text-[10px] text-white/30">
                        {ws.members} members
                      </span>
                      <span className="font-mono text-[10px] text-white/30">
                        {ws.apps} apps
                      </span>
                      <span className="font-mono text-[10px] text-white/30">
                        {ws.region}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <Icon
                    name="chevron-right"
                    className={`h-5 w-5 flex-shrink-0 transition-colors ${
                      isSelected ? "text-blue-400" : "text-white/20"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={handleContinue}
            className={`w-full rounded-xl py-3 text-sm font-semibold text-white transition-all ${
              selectedId
                ? "btn-primary"
                : "cursor-not-allowed border border-white/10 bg-white/5 text-white/30"
            }`}
          >
            Continue →
          </button>

          <button
            type="button"
            className="w-full rounded-xl border border-dashed border-white/10 py-3 text-sm text-white/40 transition-colors hover:border-white/20 hover:text-white/60"
          >
            + New workspace
          </button>
        </div>

        {/* Support links */}
        <div className="mt-10 flex justify-center gap-6">
          <a
            href="#"
            className="text-xs text-white/30 transition-colors hover:text-white/60"
          >
            Documentation
          </a>
          <a
            href="#"
            className="text-xs text-white/30 transition-colors hover:text-white/60"
          >
            Support
          </a>
        </div>
      </main>

      {/* Bottom footer */}
      <footer className="relative z-10 border-t border-white/5 py-5 text-center">
        <p className="chip text-white/20">
          © 2026 NexoraXS. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
