const CORE_LOGIN_URL =
  (process.env.NEXT_PUBLIC_CORE_PLATFORM_URL ?? "http://localhost:3001") + "/login";

export default function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 px-4 py-16 md:px-6 md:py-20">
      <div
        className="glow-blob -right-16 top-0 h-64 w-64 bg-blue-500"
        aria-hidden="true"
      />
      <div
        className="glow-blob -bottom-24 left-0 h-72 w-72 bg-purple-500"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="mono-chip inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-blue-200">
          {"// next step"}
        </span>
        <h2 className="mt-5 text-3xl font-bold md:text-5xl">
          Start building your business today
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/60">
          Explore the MVP path for a workspace-based platform with modular apps.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={CORE_LOGIN_URL}
            className="btn-primary rounded-2xl px-6 py-3 font-semibold text-white"
          >
            Get Started
          </a>
          <a
            href="#apps"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-3 font-semibold text-white/80 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            Explore Apps
          </a>
        </div>
      </div>
    </section>
  );
}
