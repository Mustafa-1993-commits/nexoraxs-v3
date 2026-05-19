"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SplashScreen } from "./SplashScreen";
import { CoreIllustration } from "./CoreIllustration";
import { staggerContainer, fadeInUp, fadeIn } from "@/lib/animations";

const CORE_LOGIN_URL =
  (process.env.NEXT_PUBLIC_CORE_PLATFORM_URL ?? "http://localhost:3001") + "/login";

const headline = "Business operations, connected by one modular core";
const headlineWords = headline.split(" ");

const featurePills = [
  "Modular SaaS architecture",
  "Workspace-based platform",
  "Built for future apps",
];

export default function Hero() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <section
        id="hero"
        className="relative overflow-hidden px-4 py-16 md:px-6 md:py-20 lg:min-h-[calc(100vh-76px)] lg:py-28"
      >
        {/* Animated gradient orbs */}
        <div
          className="animate-orb-slow pointer-events-none absolute -left-40 -top-20 h-[400px] w-[400px] rounded-full bg-purple-600/30 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="animate-orb-medium pointer-events-none absolute -bottom-32 -right-20 h-[320px] w-[320px] rounded-full bg-blue-500/25 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="animate-orb-fast pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          {/* Left column — animated content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={splashDone ? "visible" : "hidden"}
          >
            <motion.span
              variants={fadeInUp}
              className="mono-chip inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-cyan-200"
            >
              {"// platform"}
            </motion.span>

            {/* Word-by-word headline */}
            <motion.h1
              variants={staggerContainer}
              className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
            >
              {headlineWords.map((word, i) => {
                const isGradient = i >= headlineWords.indexOf("modular");
                return (
                  <motion.span
                    key={i}
                    variants={fadeInUp}
                    className={[
                      "mr-[0.25em] inline-block",
                      isGradient ? "gradient-text" : "",
                    ].join(" ")}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="mt-6 max-w-xl text-lg leading-8 text-white/65"
            >
              NexoraXS is an MVP-stage modular SaaS platform for workspaces,
              shared authentication, app launching, and future business apps
              built around a single platform shell.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <motion.a
                variants={fadeInUp}
                href={CORE_LOGIN_URL}
                className="btn-primary rounded-2xl px-6 py-3 font-semibold text-white"
              >
                Get Started
              </motion.a>
              <motion.a
                variants={fadeInUp}
                href="#features"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-3 font-semibold text-white/85 transition-colors hover:border-white/25 hover:bg-white/8 hover:text-white"
              >
                See Features
              </motion.a>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="mt-7 flex flex-wrap gap-3"
            >
              {featurePills.map((pill) => (
                <motion.span
                  key={pill}
                  variants={fadeInUp}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/65"
                >
                  {pill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — floating illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: splashDone ? 1 : 0,
              scale: splashDone ? 1 : 0.95,
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="animate-float hidden md:flex md:justify-center lg:justify-end"
          >
            <CoreIllustration />
          </motion.div>
        </div>
      </section>
    </>
  );
}
