"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import type { CoreSearchEntry } from "@/lib/shell/contracts";
import { searchCoreDestinations } from "@/lib/shell/presentation";
import { useShellPresentation } from "@/lib/shell/useShellPresentation";

interface ShellSearchProps {
  entries: readonly CoreSearchEntry[];
}

export const ShellSearch = memo(function ShellSearch({ entries }: ShellSearchProps) {
  const { t } = useApp();
  const { preferences } = useShellPresentation();
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const results = useMemo(
    () => searchCoreDestinations(entries, query, preferences.locale),
    [entries, preferences.locale, query],
  );
  const unavailable = entries.length === 0;

  useEffect(() => {
    function close(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function choose(index: number) {
    const result = results[index];
    if (!result) return;
    setOpen(false);
    setActiveIndex(-1);
    router.push(result.href);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
      inputRef.current?.focus();
    } else if (event.key === "ArrowDown" && results.length > 0) {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp" && results.length > 0) {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => (index <= 0 ? results.length - 1 : index - 1));
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      choose(activeIndex);
    }
  }

  return (
    <div ref={wrapperRef} className="nx-shell-search">
      <input
        ref={inputRef}
        type="search"
        role="combobox"
        aria-label={t("search")}
        aria-autocomplete="list"
        aria-controls="core-search-results"
        aria-expanded={open}
        aria-activedescendant={activeIndex >= 0 ? `core-search-option-${activeIndex}` : undefined}
        aria-disabled={unavailable}
        placeholder={`${t("search")}…`}
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActiveIndex(0);
        }}
        onKeyDown={handleKeyDown}
      />

      {open && (
        <div id="core-search-results" className="nx-search-surface">
          {unavailable ? (
            <div className="nx-search-state" role="status">{t("search_unavailable")}</div>
          ) : !query.trim() ? (
            <div className="nx-search-state" role="status">{t("search_core_destinations")}</div>
          ) : results.length === 0 ? (
            <div className="nx-search-state" role="status">{t("search_no_results")}</div>
          ) : (
            <div role="listbox" aria-label={t("search_results")}>
              {results.map((result, index) => (
                <button
                  key={result.id}
                  id={`core-search-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={activeIndex === index}
                  className="nx-search-option"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(index)}
                >
                  {result.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
});
