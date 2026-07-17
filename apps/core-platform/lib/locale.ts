// @deprecated — use lib/store/ instead
import { readCoreSessionText, writeCoreSessionText } from "./infrastructure/browser/core-session-storage";

export type Locale = "en" | "ar";

const LOCALE_KEY = "core_locale";
const LOCALE_EVENT = "nexoraxs:locale-change";

export function getLocale(): Locale {
  const stored = readCoreSessionText(LOCALE_KEY);
  return stored === "ar" ? "ar" : "en";
}

export function setLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  writeCoreSessionText(LOCALE_KEY, locale);
  window.dispatchEvent(new Event(LOCALE_EVENT));
}

export function subscribeToLocale(cb: () => void): () => void {
  window.addEventListener(LOCALE_EVENT, cb);
  return () => window.removeEventListener(LOCALE_EVENT, cb);
}
