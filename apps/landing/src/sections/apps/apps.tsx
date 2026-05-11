interface AppCard {
  name: string;
  tagline: string;
  description: string;
  badge?: string;
}

const apps: AppCard[] = [
  {
    name: "Shops",
    tagline: "Commerce & POS",
    description:
      "Manage products, inventory, sales, and customers in one place.",
  },
  {
    name: "Clinics",
    tagline: "Healthcare Management",
    description:
      "Appointments, patient records, and billing for modern clinics.",
    badge: "Coming Soon",
  },
  {
    name: "Maintenance",
    tagline: "Field Service",
    description:
      "Schedule jobs, track assets, and manage technicians on the go.",
    badge: "Coming Soon",
  },
  {
    name: "Restaurants",
    tagline: "Hospitality Operations",
    description:
      "Table management, orders, and kitchen flow for restaurants.",
    badge: "Coming Soon",
  },
  {
    name: "CRM",
    tagline: "Customer Relations",
    description:
      "Track leads, deals, and customer communication all in one view.",
    badge: "Coming Soon",
  },
];

export default function Apps() {
  return (
    <section id="apps" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold">Our Apps</h2>
        <p className="mt-4 text-white/60">
          One platform. Multiple business tools. All under one login.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <div
            key={app.name}
            className="relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-purple-500/40"
          >
            {app.badge && (
              <span className="absolute right-4 top-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-400">
                {app.badge}
              </span>
            )}
            <h3 className="text-xl font-semibold">{app.name}</h3>
            <p className="mt-1 text-sm text-purple-400">{app.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {app.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
