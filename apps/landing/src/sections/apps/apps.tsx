"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  ShoppingBag,
  Stethoscope,
  UsersRound,
  Utensils,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface AppCard {
  name: string;
  tagline: string;
  description: string;
  badge?: string;
  icon: LucideIcon;
  accent: string;
  iconBg: string;
  glow: string;
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const apps: AppCard[] = [
  {
    name: "Shops",
    tagline: "Commerce & POS",
    description:
      "Manage products, inventory, sales, and customers in one place.",
    icon: ShoppingBag,
    accent: "text-blue-300",
    iconBg: "bg-blue-500/15",
    glow: "rgba(59, 130, 246, 0.22)",
  },
  {
    name: "Clinics",
    tagline: "Healthcare Management",
    description:
      "A planned app for appointments, patient records, and clinic workflows.",
    badge: "Coming Soon",
    icon: Stethoscope,
    accent: "text-emerald-300",
    iconBg: "bg-emerald-500/15",
    glow: "rgba(16, 185, 129, 0.2)",
  },
  {
    name: "Maintenance",
    tagline: "Field Service",
    description:
      "A planned app for jobs, assets, technicians, and service operations.",
    badge: "Coming Soon",
    icon: Wrench,
    accent: "text-orange-300",
    iconBg: "bg-orange-500/15",
    glow: "rgba(249, 115, 22, 0.2)",
  },
  {
    name: "Restaurants",
    tagline: "Hospitality Operations",
    description:
      "A planned app for table flow, orders, menus, and hospitality teams.",
    badge: "Coming Soon",
    icon: Utensils,
    accent: "text-pink-300",
    iconBg: "bg-pink-500/15",
    glow: "rgba(236, 72, 153, 0.2)",
  },
  {
    name: "CRM",
    tagline: "Customer Relations",
    description:
      "A planned customer workspace for leads, deals, and follow-up activity.",
    badge: "Coming Soon",
    icon: UsersRound,
    accent: "text-cyan-300",
    iconBg: "bg-cyan-500/15",
    glow: "rgba(6, 182, 212, 0.2)",
  },
];

export default function Apps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section
      id="apps"
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20 lg:py-28"
    >
      <motion.div variants={fadeInUp} className="mb-12 text-center">
        <span className="mono-chip inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-purple-200">
          {"// app launcher"}
        </span>
        <h2 className="mt-5 text-3xl font-bold md:text-4xl">Our Apps</h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/60">
          One platform. Multiple business tools. All under one login.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {apps.map((app) => {
          const Icon = app.icon;
          const isComingSoon = Boolean(app.badge);

          return (
            <motion.div
              key={app.name}
              variants={scaleIn}
              className={[
                "glass-card relative overflow-hidden p-6 transition-all duration-300",
                isComingSoon
                  ? "opacity-75"
                  : "hover:scale-[1.03]",
              ].join(" ")}
              style={
                !isComingSoon
                  ? { ["--app-glow" as string]: app.glow }
                  : undefined
              }
              whileHover={
                !isComingSoon
                  ? {
                      boxShadow: `0 8px 40px ${app.glow}`,
                    }
                  : undefined
              }
            >
              {/* Background glow accent */}
              <div
                className="absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl"
                style={{ background: app.glow }}
                aria-hidden="true"
              />

              {/* Coming-soon blur overlay */}
              {isComingSoon && (
                <div
                  className="absolute inset-0 z-10 rounded-[20px] backdrop-blur-[1px]"
                  aria-hidden="true"
                />
              )}

              {app.badge && (
                <span className="mono-chip absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-gray-400">
                  {app.badge}
                </span>
              )}

              <div
                className={`relative z-[1] mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${app.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${app.accent}`} aria-hidden="true" />
              </div>
              <h3 className="relative z-[1] pr-24 text-xl font-semibold">{app.name}</h3>
              <p className={`relative z-[1] mt-1 text-sm ${app.accent}`}>{app.tagline}</p>
              <p className="relative z-[1] mt-3 text-sm leading-relaxed text-white/60">
                {app.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
