import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Image
            src="/branding/logo-top.png"
            alt="NexoraXS"
            width={220}
            height={60}
            priority
          />

          <nav className="flex items-center gap-6 text-sm text-white/80">
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Docs</a>

            <button className="rounded-xl bg-blue-600 px-4 py-2 font-medium transition hover:bg-blue-500">
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2">
        <div>
          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            Business Operating
            <span className="text-blue-500"> System</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/70">
            NexoraXS is a modular SaaS platform designed to power modern
            businesses with scalable applications, shared infrastructure, and
            cloud-native architecture.
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
            src="/branding/splash.png"
            alt="NexoraXS Platform"
            width={700}
            height={700}
            priority
            className="drop-shadow-[0_0_60px_rgba(59,130,246,0.35)]"
          />
        </div>
      </section>
    </main>
  );
}