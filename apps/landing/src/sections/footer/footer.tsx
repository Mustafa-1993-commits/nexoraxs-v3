import Image from "next/image";

const linkGroups = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Apps", href: "#apps" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-white/10 bg-[#0a0a0f]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex-shrink-0">
            <Image
              src="/branding/logo-bottom.png"
              alt="NexoraXS"
              width={140}
              height={38}
            />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {linkGroups.map((group) => (
              <div key={group.heading}>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                  {group.heading}
                </h4>
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="mb-2 block text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-sm text-white/40">
            © 2026 NexoraXS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
