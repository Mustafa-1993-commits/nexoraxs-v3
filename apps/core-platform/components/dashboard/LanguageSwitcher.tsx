"use client";

import { useSyncExternalStore } from "react";
import { getLocale, setLocale, subscribeToLocale } from "@/lib/locale";

export function LanguageSwitcher() {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocale,
    () => "en" as const,
  );

  return (
    <div className="flex items-center rounded-lg border border-white/10 bg-white/5 p-0.5">
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
          locale === "en"
            ? "bg-white/15 text-white"
            : "text-white/40 hover:text-white/70"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("ar")}
        className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
          locale === "ar"
            ? "bg-white/15 text-white"
            : "text-white/40 hover:text-white/70"
        }`}
        aria-pressed={locale === "ar"}
      >
        AR
      </button>
    </div>
  );
}
