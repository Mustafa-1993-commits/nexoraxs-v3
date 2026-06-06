"use client";

import type { ReactNode } from "react";

type Tone = "accent" | "warn" | "danger" | "neutral" | "success";

interface BadgeProps {
  tone?: Tone;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}

const TONE_CLASS: Record<Tone, string> = {
  accent: "tone-accent",
  warn: "tone-warn",
  danger: "tone-danger",
  neutral: "tone-neutral",
  success: "tone-pos",
};

export function Badge({ tone = "neutral", dot, children, className = "" }: BadgeProps) {
  return (
    <span className={`nx-badge ${TONE_CLASS[tone]} ${className}`}>
      {dot && <span className="nx-badge-dot" />}
      {children}
    </span>
  );
}
