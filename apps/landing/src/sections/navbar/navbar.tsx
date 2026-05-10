import Image from "next/image";

export default function Navbar() {
  return (
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
  );
}