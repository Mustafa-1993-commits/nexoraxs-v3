"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { SplashScreen } from "./SplashScreen";
import { CoreIllustration } from "./CoreIllustration";

export default function Hero() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <section
        id="hero"
        className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20 lg:py-28"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: splashDone ? 1 : 0, x: splashDone ? 0 : -20 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Business{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Operating System
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            NexoraXS is a modular SaaS platform designed to power modern
            businesses with scalable applications, shared infrastructure, and
            cloud-native architecture.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="#"
              className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold transition-colors hover:bg-blue-500"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="rounded-2xl border border-white/20 px-6 py-3 font-semibold transition-colors hover:bg-white/10"
            >
              See Features
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: splashDone ? 1 : 0, scale: splashDone ? 1 : 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex md:justify-center lg:justify-end"
        >
          <CoreIllustration />
        </motion.div>
      </section>
    </>
  );
}
