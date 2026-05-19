"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is NexoraXS?",
    answer:
      "NexoraXS is an MVP-stage modular SaaS platform that combines a core platform shell with focused business apps under workspace-based access.",
  },
  {
    question: "Can I use multiple apps under one account?",
    answer:
      "That is the intended platform model. The core platform is designed for shared authentication, workspaces, billing, and an app launcher for enabled modules.",
  },
  {
    question: "Is my business data kept separate from other users?",
    answer:
      "The product is being built around workspace-level isolation, so business data belongs to its workspace and app modules must query within that boundary.",
  },
  {
    question: "What apps are available right now?",
    answer:
      "The current MVP scope focuses on the Core Platform and Shops app. Clinics, Maintenance, Restaurants, and CRM are future app modules.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Beta access is positioned as free during beta. Future paid plans will be defined after the MVP validates the platform and app model.",
  },
  {
    question: "How do I get started?",
    answer:
      "Use the beta entry points on this page to follow the MVP onboarding path as the platform becomes ready for early users.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section
      id="faq"
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20 lg:py-28"
    >
      <motion.div variants={fadeInUp} className="mb-12 text-center">
        <span className="mono-chip inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-cyan-200">
          {"// faq"}
        </span>
        <h2 className="mt-5 text-3xl font-bold md:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-white/60">
          Everything you need to know about NexoraXS.
        </p>
      </motion.div>

      <div className="space-y-3">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${index}`;

          return (
            <motion.div
              key={item.question}
              variants={fadeInUp}
              className="glass-card overflow-hidden"
            >
              <button
                type="button"
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-white/90 transition-colors hover:text-white"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={answerId}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-white/60">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
