export default function Features() {
  const features = [
    "Modular SaaS Architecture",
    "Shared Authentication",
    "Workspace Management",
    "Cloud-Native Infrastructure",
    "Multi-Tenant System",
    "AI-Ready Platform",
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold">
          Everything Your Business Needs
        </h2>

        <p className="mt-4 text-white/60">
          Build, manage, and scale your business with one unified platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <h3 className="text-xl font-semibold">{feature}</h3>

            <p className="mt-3 text-sm text-white/60">
              Powerful enterprise-grade infrastructure built for scalability.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}