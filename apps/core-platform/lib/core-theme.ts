// @deprecated — use lib/store/ instead
import { readCoreSessionText, writeCoreSessionText } from "./infrastructure/browser/core-session-storage";

const THEME_KEY   = "core_theme";
const THEME_EVENT = "nexoraxs:theme-change";

export type Theme = "light" | "dark";

export function getTheme(): Theme {
  return readCoreSessionText(THEME_KEY) === "light" ? "light" : "dark";
}

export function setTheme(value: Theme): void {
  if (typeof window === "undefined") return;
  writeCoreSessionText(THEME_KEY, value);
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function subscribeToTheme(cb: () => void): () => void {
  window.addEventListener(THEME_EVENT, cb);
  return () => window.removeEventListener(THEME_EVENT, cb);
}
