"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CreditCard,
  KeyRound,
  LayoutGrid,
  Users,
} from "lucide-react";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";

const coreItems = [
  { label: "Auth", icon: KeyRound },
  { label: "Workspaces", icon: Users },
  { label: "Billing", icon: CreditCard },
  { label: "Launcher", icon: LayoutGrid },
];

const appTiles = ["Commerce OS", "Healthcare OS", "HR OS", "CRM OS", "Gym OS", "Maintenance OS"];

export default function Platform() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-16 md:px-6 md:py-20 lg:py-28">
      <div
        className="glow-blob left-1/2 top-12 h-64 w-64 -translate-x-1/2 bg-cyan-500 opacity-20"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 max-w-3xl"
        >
          <span className="mono-chip inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-blue-200">
            {"// platform model"}
          </span>
          <h2 className="mt-5 text-3xl font-bold md:text-4xl">
            One Core. Six Operating Systems.
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/60">
            NexoraXS separates the shared Core Platform from independent
            Operating Systems — so workspaces, authentication, billing, and OS
            access stay in one core while each Operating System owns its domain.
          </p>
        </motion.div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_96px_1.35fr]">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="glass-card p-6 md:p-8"
          >
            <p className="mono-chip text-purple-200">Core Platform</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Shared foundation
            </h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {coreItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm text-white/75"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/15 text-purple-200">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {item.label}
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div className="hidden items-center justify-center lg:flex">
            <div className="relative h-px w-full bg-gradient-to-r from-blue-400/20 via-white/30 to-purple-400/20">
              <ArrowRight
                className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-white/45"
                aria-hidden="true"
              />
            </div>
          </div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="glass-card p-6 md:p-8"
          >
            <p className="mono-chip text-cyan-200">Operating Systems</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Domain modules
            </h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {appTiles.map((app) => (
                <div
                  key={app}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm font-medium text-white/75"
                >
                  {app}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
