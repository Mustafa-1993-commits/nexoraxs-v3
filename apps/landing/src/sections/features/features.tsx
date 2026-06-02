"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Boxes,
  Building2,
  CloudCog,
  KeyRound,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  accent: string;
  glow: string;
}

const features: FeatureCard[] = [
  {
    icon: Boxes,
    title: "Modular Architecture",
    description:
      "Start with the Core Platform, then activate independent Operating Systems as your business grows.",
    iconBg: "bg-blue-500/15",
    accent: "text-blue-300",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    icon: KeyRound,
    title: "Shared Authentication",
    description:
      "Designed around one account experience across the core platform and app modules.",
    iconBg: "bg-purple-500/15",
    accent: "text-purple-300",
    glow: "rgba(124,58,237,0.15)",
  },
  {
    icon: Building2,
    title: "Workspace Management",
    description:
      "Keep teams, billing, and enabled Operating Systems organized around workspace boundaries.",
    iconBg: "bg-cyan-500/15",
    accent: "text-cyan-300",
    glow: "rgba(6,182,212,0.15)",
  },
  {
    icon: ShieldCheck,
    title: "Multi-Tenant Isolation",
    description:
      "Business data is modeled around workspace-level isolation from the start.",
    iconBg: "bg-emerald-500/15",
    accent: "text-emerald-300",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    icon: CloudCog,
    title: "Cloud-Native Infrastructure",
    description:
      "The MVP stack is planned around Next.js, Laravel, PostgreSQL, Redis, and Docker.",
    iconBg: "bg-orange-500/15",
    accent: "text-orange-300",
    glow: "rgba(249,115,22,0.15)",
  },
  {
    icon: Sparkles,
    title: "AI-Ready Platform",
    description:
      "The platform is structured so future AI workflows can be added without reshaping the core.",
    iconBg: "bg-pink-500/15",
    accent: "text-pink-300",
    glow: "rgba(236,72,153,0.15)",
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section
      id="features"
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:py-28"
    >
      <motion.div variants={fadeInUp} className="mb-12 text-center">
        <span className="mono-chip inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-cyan-200">
          {"// why nexoraxs"}
        </span>
        <h2 className="mt-5 text-3xl font-bold md:text-4xl">
          Everything your business needs
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/60">
          Build, manage, and scale your business with one unified platform.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className="glass-card group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ "--feature-glow": feature.glow } as React.CSSProperties}
            >
              {/* Hover glow overlay */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 0 1px ${feature.glow}, 0 8px 30px ${feature.glow}` }}
                aria-hidden="true"
              />
              <div
                className={`relative mb-5 flex h-11 w-11 items-center justify-center rounded-2xl ${feature.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${feature.accent}`} aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
