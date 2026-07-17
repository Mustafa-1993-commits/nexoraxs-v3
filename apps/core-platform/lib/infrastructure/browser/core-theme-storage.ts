import { STORAGE_KEYS } from "@nexoraxs/shared";

export type CoreTheme = "light" | "dark";

export function readCoreTheme(): CoreTheme {
  if (typeof window === "undefined") return "light";
  return window.localStorage.getItem(STORAGE_KEYS.theme) === "dark" ? "dark" : "light";
}

export function writeCoreTheme(theme: CoreTheme): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEYS.theme, theme);
}

export function applyCoreTheme(theme: CoreTheme): void {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
}
