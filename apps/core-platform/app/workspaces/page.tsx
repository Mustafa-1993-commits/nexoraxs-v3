import { WorkspaceCard } from "@/components/dashboard/WorkspaceCard";
import { mockWorkspaces } from "@/lib/mock-data/workspaces";

export default function WorkspacesPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] px-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Select a Workspace</h1>
          <p className="mt-2 text-sm text-white/50">
            Choose the workspace you want to manage.
          </p>
        </div>

        <div className="space-y-3">
          {mockWorkspaces.map((workspace) => (
            <WorkspaceCard key={workspace.id} workspace={workspace} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-white/30">
          Signed in as{" "}
          <span className="text-white/50">mustafa@nexoraxs.com</span>
        </p>
      </div>
    </div>
  );
}
