import { Icon, type IconName } from "@/components/ui/Icon";

interface PlaceholderPageProps {
  icon: IconName;
  title: string;
  description: string;
}

export function PlaceholderPage({ icon, title, description }: PlaceholderPageProps) {
  return (
    <div className="card flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-400">
        <Icon name={icon} className="h-7 w-7" />
      </div>
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">{description}</p>
      <span className="chip mt-6 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-500">
        Foundation release
      </span>
    </div>
  );
}
