"use client";

import { Sun, Moon } from "lucide-react";
import { useApp } from "@/lib/store";

export function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  return (
    <button
      className="nx-icon-btn"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
