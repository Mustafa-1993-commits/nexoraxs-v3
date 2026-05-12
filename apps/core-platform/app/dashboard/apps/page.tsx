import { AppCard } from "@/components/dashboard/AppCard";
import { mockApps } from "@/lib/mock-data/apps";

export default function AppsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">App Launcher</h1>
        <p className="mt-1 text-sm text-white/50">
          All NexoraXS apps available for your workspace.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockApps.map((app) => (
          <AppCard key={app.id} {...app} />
        ))}
      </div>
    </div>
  );
}
