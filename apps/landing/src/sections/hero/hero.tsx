import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2">
      <div>
        <h1 className="text-5xl font-bold leading-tight md:text-6xl">
          Business Operating
          <span className="text-blue-500"> System</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-white/70">
          NexoraXS is a modular SaaS platform designed to power modern
          businesses with scalable applications, shared infrastructure,
          and cloud-native architecture.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500">
            Start Free
          </button>

          <button className="rounded-2xl border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10">
            Live Demo
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <Image
          src="/branding/Splash.png"
          alt="NexoraXS Platform"
          width={700}
          height={700}
          priority
          className="drop-shadow-[0_0_60px_rgba(59,130,246,0.35)]"
        />
      </div>
    </section>
  );
}