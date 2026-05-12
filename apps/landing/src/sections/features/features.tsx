interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    icon: "⚡",
    title: "Modular Architecture",
    description:
      "Launch and manage independent business apps under one unified platform.",
  },
  {
    icon: "🔐",
    title: "Shared Authentication",
    description:
      "One login, every app — your session works seamlessly across all NexoraXS tools.",
  },
  {
    icon: "🏢",
    title: "Workspace Management",
    description:
      "Organise teams, roles, and permissions in dedicated business workspaces.",
  },
  {
    icon: "🛡️",
    title: "Multi-Tenant Isolation",
    description:
      "Complete data separation per workspace — your business data is always private.",
  },
  {
    icon: "☁️",
    title: "Cloud-Native Infrastructure",
    description:
      "Built for scale from day one with Docker, PostgreSQL, and Redis.",
  },
  {
    icon: "🤖",
    title: "AI-Ready Platform",
    description:
      "Designed to integrate AI-powered workflows as your business grows.",
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:py-28">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Everything Your Business Needs</h2>
        <p className="mt-4 text-white/60">
          Build, manage, and scale your business with one unified platform.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-blue-500/40"
          >
            <div className="mb-4 text-3xl">{feature.icon}</div>
            <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-white/60">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
