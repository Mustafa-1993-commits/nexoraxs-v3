export type Locale = "en" | "ar";

const LOCALE_KEY = "nexoraxs_locale";
const LOCALE_EVENT = "nexoraxs:locale-change";

export function getLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = sessionStorage.getItem(LOCALE_KEY);
  return stored === "ar" ? "ar" : "en";
}

export function setLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(LOCALE_KEY, locale);
  window.dispatchEvent(new Event(LOCALE_EVENT));
}

export function subscribeToLocale(cb: () => void): () => void {
  window.addEventListener(LOCALE_EVENT, cb);
  return () => window.removeEventListener(LOCALE_EVENT, cb);
}
