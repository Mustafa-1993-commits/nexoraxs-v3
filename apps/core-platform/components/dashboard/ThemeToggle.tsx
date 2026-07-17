"use client";

import { memo } from "react";
import { Sun, Moon } from "lucide-react";
import { useApp } from "@/lib/store";
import { applyCoreTheme } from "@/lib/infrastructure/browser/core-theme-storage";

export const ThemeToggle = memo(function ThemeToggle() {
  const { theme, toggleTheme, t } = useApp();
  function changeTheme() {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyCoreTheme(nextTheme);
    window.setTimeout(toggleTheme, 0);
  }
  return (
    <button
      type="button"
      className="nx-icon-btn"
      onClick={changeTheme}
      aria-label={theme === "dark" ? t("switch_to_light") : t("switch_to_dark")}
      aria-pressed={theme === "dark"}
    >
      <span aria-hidden hidden={theme !== "dark"}><Sun size={16} /></span>
      <span aria-hidden hidden={theme === "dark"}><Moon size={16} /></span>
    </button>
  );
});
