import { Check } from "lucide-react";

const CORE_LOGIN_URL =
  (process.env.NEXT_PUBLIC_CORE_PLATFORM_URL ?? "http://localhost:3001") + "/login";

const betaFeatures = [
  "Free during beta",
  "Core platform access",
  "Workspace setup",
  "Shops app MVP access",
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:py-28"
    >
      <div className="mb-12 text-center">
        <span className="mono-chip inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-blue-200">
          {"// beta pricing"}
        </span>
        <h2 className="mt-5 text-3xl font-bold md:text-4xl">Pricing</h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/60">
          Early pricing stays simple while the MVP is being built and tested.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        <div className="glass-card relative overflow-hidden p-6 ring-1 ring-purple-500/30 md:p-8">
          <div
            className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-purple-500/25 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <p className="mono-chip text-purple-200">Beta Early-Bird</p>
            <h3 className="gradient-text mt-4 text-3xl font-bold">
              Free during beta
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/60">
              Access the MVP as it evolves, with the core platform and first
              app experience shaped around early workspace feedback.
            </p>
            <ul className="mt-6 space-y-3">
              {betaFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-white/75"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={CORE_LOGIN_URL}
              className="btn-primary mt-8 w-full rounded-xl px-6 py-3 font-semibold text-white"
            >
              Join Beta
            </a>
          </div>
        </div>

        <div className="glass-card p-6 opacity-85 md:p-8">
          <p className="mono-chip text-cyan-200">Future Plans</p>
          <h3 className="mt-4 text-3xl font-bold text-white">Coming later</h3>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Paid plans will be introduced after the MVP validates the core
            platform, workspace model, and app launcher experience.
          </p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/60">
            Plan tiers, limits, and billing details will be published when they
            are ready.
          </div>
          <a
            href="#faq"
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-white/15 px-6 py-3 font-semibold text-white/80 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            Read FAQ
          </a>
        </div>
      </div>
    </section>
  );
}
