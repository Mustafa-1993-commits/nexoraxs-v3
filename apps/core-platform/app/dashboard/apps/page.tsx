import { OSCard } from "@/components/dashboard/AppCard";
import { mockOS } from "@/lib/mock-data/apps";

export default function ProductHubPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Product Hub</h1>
        <p className="mt-1 text-sm text-white/50">
          Your active and available operating systems.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockOS.map((os) => (
          <OSCard key={os.id} {...os} />
        ))}
      </div>
    </div>
  );
}
