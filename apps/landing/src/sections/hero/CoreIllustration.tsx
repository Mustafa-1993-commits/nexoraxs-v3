import { ShoppingBag, Stethoscope, UsersRound, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SatelliteApp {
  id: string;
  label: string;
  icon: LucideIcon;
  position: string;
  animation: string;
  accent: string;
  iconBg: string;
}

const satelliteApps: SatelliteApp[] = [
  {
    id: "commerce",
    label: "Commerce OS",
    icon: ShoppingBag,
    position: "left-0 top-6",
    animation: "animate-float-b",
    accent: "text-blue-300",
    iconBg: "bg-blue-500/15",
  },
  {
    id: "healthcare",
    label: "Healthcare OS",
    icon: Stethoscope,
    position: "right-0 top-6",
    animation: "animate-float-c",
    accent: "text-emerald-300",
    iconBg: "bg-emerald-500/15",
  },
  {
    id: "maintenance",
    label: "Maintenance OS",
    icon: Wrench,
    position: "bottom-8 left-0",
    animation: "animate-float-d",
    accent: "text-pink-300",
    iconBg: "bg-pink-500/15",
  },
  {
    id: "crm",
    label: "CRM OS",
    icon: UsersRound,
    position: "bottom-8 right-0",
    animation: "animate-float-b",
    accent: "text-cyan-300",
    iconBg: "bg-cyan-500/15",
  },
];

export function CoreIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <div className="absolute inset-8 rounded-full border border-white/5 bg-white/[0.015]" />
      <div className="absolute inset-20 rounded-full border border-white/5" />

      <div className="absolute left-1/2 top-1/2 z-20 h-44 w-44 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-float relative h-full w-full">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/30 to-cyan-500/20 blur-2xl" />
          <div className="glass-card relative z-10 flex h-full w-full flex-col items-center justify-center rounded-3xl border-purple-400/20 shadow-[0_0_70px_rgba(139,92,246,0.28)]">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 shadow-lg shadow-purple-500/25">
              <span className="text-3xl font-bold text-white">N</span>
            </div>
            <div className="text-xl font-bold text-white">CORE</div>
            <div className="mono-chip mt-2 text-purple-200/70">Platform</div>
          </div>
        </div>
      </div>

      {satelliteApps.map((app) => {
        const Icon = app.icon;

        return (
          <div
            key={app.id}
            className={`absolute z-10 ${app.position} ${app.animation}`}
          >
            <div className="glass-card flex h-28 w-32 flex-col items-center justify-center gap-2 rounded-2xl transition-transform duration-200 hover:-translate-y-1">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${app.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${app.accent}`} aria-hidden="true" />
              </div>
              <span className="text-sm font-medium text-white/90">
                {app.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
