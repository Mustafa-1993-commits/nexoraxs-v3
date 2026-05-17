"use client";

import { useRouter } from "next/navigation";
import type { Workspace } from "@/lib/mock-data/workspaces";
import { Icon } from "@nexoraxs/ui";

interface WorkspaceCardProps {
  workspace: Workspace;
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/dashboard")}
      className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition-colors hover:border-white/20 hover:bg-white/8"
    >
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-sm font-bold text-blue-400">
        {workspace.initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-semibold text-white">
          {workspace.name}
        </p>
        <p className="text-sm text-white/50">{workspace.type}</p>
      </div>
      <Icon
        name="chevron-right"
        className="h-5 w-5 flex-shrink-0 text-white/30"
      />
    </button>
  );
}
