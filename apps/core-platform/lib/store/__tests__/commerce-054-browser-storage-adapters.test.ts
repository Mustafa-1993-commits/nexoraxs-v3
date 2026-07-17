// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { STORAGE_KEYS } from "@nexoraxs/shared";
import { consumeCoreDemoFlag, readCoreSessionValue, writeCoreSessionValue } from "../../infrastructure/browser/core-session-storage";
import { readCoreTheme, writeCoreTheme } from "../../infrastructure/browser/core-theme-storage";

describe("Core browser storage adapters", () => {
  it("preserves corrupt fallback, exact demo consumption, and raw theme bytes", () => {
    localStorage.clear(); sessionStorage.clear();
    sessionStorage.setItem(STORAGE_KEYS.locale, "corrupt");
    expect(readCoreSessionValue(STORAGE_KEYS.locale, "en")).toBe("en");
    writeCoreSessionValue(STORAGE_KEYS.demo, "1"); expect(consumeCoreDemoFlag()).toBe(true); expect(consumeCoreDemoFlag()).toBe(false);
    writeCoreTheme("dark"); expect(localStorage.getItem(STORAGE_KEYS.theme)).toBe("dark"); expect(readCoreTheme()).toBe("dark");
  });
});
