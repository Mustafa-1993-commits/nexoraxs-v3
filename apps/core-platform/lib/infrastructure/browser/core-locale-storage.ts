import { STORAGE_KEYS } from "@nexoraxs/shared";
import type { Lang } from "@nexoraxs/shared";
import { readCoreSessionValue, writeCoreSessionValue } from "./core-session-storage";

export function readCoreLocale(): Lang {
  return readCoreSessionValue<Lang>(STORAGE_KEYS.locale, "en") === "ar" ? "ar" : "en";
}

export function writeCoreLocale(locale: Lang): void {
  writeCoreSessionValue(STORAGE_KEYS.locale, locale);
}

export function applyCoreLocale(locale: Lang): void {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
}
