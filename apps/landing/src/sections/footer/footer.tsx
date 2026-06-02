import Image from "next/image";

const linkGroups = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Products", href: "#products" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
  {
    heading: "Contact Us",
    links: [
      { label: "info@nexoraxs.com", href: "mailto:info@nexoraxs.com" },
      { label: "support@nexoraxs.com", href: "mailto:support@nexoraxs.com" },
      { label: "billing@nexoraxs.com", href: "mailto:billing@nexoraxs.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#0a0a0f]">
      {/* Gradient divider */}
      <div
        className="h-px w-full bg-gradient-to-r from-purple-500/50 via-blue-500/40 to-cyan-500/50"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex-shrink-0">
            <Image
              src="/branding/logo-top.png"
              alt="NexoraXS"
              width={160}
              height={44}
              className="h-10 w-auto"
            />
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {linkGroups.map((group) => (
              <div key={group.heading}>
                <h4 className="mono-chip mb-3 text-white/40">
                  {group.heading}
                </h4>
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block py-1.5 text-sm text-white/60 transition-colors hover:text-purple-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/40">
            © 2026 NexoraXS. All rights reserved.
          </p>
          <p className="text-sm text-white/40">Built with NexoraXS</p>
        </div>
      </div>
    </footer>
  );
}
