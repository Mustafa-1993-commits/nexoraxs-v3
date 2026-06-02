"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CORE_LOGIN_URL =
  (process.env.NEXT_PUBLIC_CORE_PLATFORM_URL ?? "http://localhost:3001") + "/login";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Products", href: "#products" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Image
          src="/branding/logo-top.png"
          alt="NexoraXS"
          width={160}
          height={44}
          priority
          className="h-8 w-auto md:h-11"
        />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm text-white/70 transition-colors hover:text-white after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CORE_LOGIN_URL}
            className="btn-primary rounded-xl px-4 py-2 text-sm font-medium text-white hover:shadow-[0_0_24px_rgba(99,102,241,0.6)] transition-shadow duration-300"
          >
            Get Started
          </a>
        </nav>

        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-[#0a0a0f] md:hidden"
          >
            <nav className="flex flex-col gap-4 px-6 pb-6 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={CORE_LOGIN_URL}
                className="btn-primary mt-2 w-full rounded-xl px-4 py-3 text-center text-sm font-medium text-white"
              >
                Get Started
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
