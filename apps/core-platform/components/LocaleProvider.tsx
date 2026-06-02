"use client";

import { useEffect, useSyncExternalStore } from "react";
import { getLocale, subscribeToLocale } from "@/lib/locale";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocale,
    () => "en" as const,
  );

  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  return <>{children}</>;
}
