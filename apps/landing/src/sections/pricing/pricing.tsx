export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:py-28">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Pricing</h2>
        <p className="mt-4 text-white/60">
          Simple, transparent pricing — coming soon.
        </p>
      </div>

      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 text-center md:p-10">
        <div className="mb-6 text-5xl">⏳</div>
        <h3 className="text-2xl font-bold">Coming Soon</h3>
        <p className="mt-4 text-white/60">
          We&apos;re finalising our pricing plans. Get started for free while
          we prepare.
        </p>
        <a
          href="#"
          className="mt-8 block w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold transition-colors hover:bg-blue-500"
        >
          Get Started Free
        </a>
      </div>
    </section>
  );
}
