"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const CORE_LOGIN_URL =
  (process.env.NEXT_PUBLIC_CORE_PLATFORM_URL ?? "http://localhost:3001") + "/login";

const betaFeatures = [
  "Free during beta",
  "Core platform access",
  "Workspace setup",
  "Commerce OS MVP access",
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section
      id="pricing"
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:py-28"
    >
      <motion.div variants={fadeInUp} className="mb-12 text-center">
        <span className="mono-chip inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-blue-200">
          {"// beta pricing"}
        </span>
        <h2 className="mt-5 text-3xl font-bold md:text-4xl">Pricing</h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/60">
          Early pricing stays simple while the MVP is being built and tested.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        <motion.div
          variants={fadeInUp}
          className="glass-card relative overflow-hidden p-6 shadow-[0_0_40px_rgba(124,58,237,0.12)] ring-1 ring-purple-500/40 md:p-8"
        >
          {/* Enhanced glow */}
          <div
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-purple-500/40 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative">
            <div className="flex items-center gap-3">
              <p className="mono-chip text-purple-200">Early Access</p>
              <span className="rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-300">
                Free
              </span>
            </div>
            <h3 className="gradient-text mt-4 text-3xl font-bold">
              Free
            </h3>
            <p className="mt-1 text-sm text-white/50">during beta</p>
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
              className="btn-primary mt-8 block w-full rounded-xl px-6 py-3 text-center font-semibold text-white"
            >
              Join Beta
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="glass-card p-6 opacity-85 md:p-8"
        >
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
        </motion.div>
      </div>
    </motion.section>
  );
}
