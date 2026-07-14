"use client";

import { memo } from "react";
import { useApp } from "@/lib/store";

export const LocaleToggle = memo(function LocaleToggle() {
  const { lang, setLang, t } = useApp();
  function selectLocale(locale: "en" | "ar") {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    setLang(locale);
  }
  return (
    <div className="nx-langswitch" role="group" aria-label={t("language")}>
      <button type="button" aria-label={t("english")} className={lang === "en" ? "on" : ""} onClick={() => selectLocale("en")} aria-pressed={lang === "en"}>EN</button>
      <button type="button" aria-label={t("arabic")} className={lang === "ar" ? "on" : ""} onClick={() => selectLocale("ar")} aria-pressed={lang === "ar"}>ع</button>
    </div>
  );
});
