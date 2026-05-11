"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0f]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="relative mb-8 w-[520px] max-w-[90vw] h-[200px] flex justify-center">
            <Image
              src="/branding/Splash.png"
              alt="NexoraXS Platform"
              width={520}
              height={200}
              className="h-full w-auto object-contain relative z-10 drop-shadow-2xl"
              priority
            />
            <motion.div
              className="absolute inset-0 bg-purple-500/40 blur-3xl z-0"
              animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.p
            className="text-purple-300/80 text-sm font-medium tracking-wider uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Business Operating System
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
