"use client";

import { useApp } from "@/lib/store";

export function LocaleToggle() {
  const { lang, setLang } = useApp();
  return (
    <div className="nx-langswitch">
      <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button>
      <button className={lang === "ar" ? "on" : ""} onClick={() => setLang("ar")} aria-pressed={lang === "ar"}>ع</button>
    </div>
  );
}
