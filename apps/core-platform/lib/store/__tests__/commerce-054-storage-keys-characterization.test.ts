// @vitest-environment jsdom

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { STORAGE_KEYS } from "@nexoraxs/shared";

afterEach(() => { localStorage.clear(); sessionStorage.clear(); });

describe("Feature 054 Core storage characterization", () => {
  it("uses the existing theme and session keys", () => {
    expect(STORAGE_KEYS.theme).toBe("nexoraxs.ui.theme");
    expect(STORAGE_KEYS.currentUserId).toBe("nexoraxs.session.currentUserId");
    expect(STORAGE_KEYS.currentWorkspaceId).toBe("nexoraxs.session.currentWorkspaceId");
  });

  it("preserves keys while isolating browser access behind infrastructure adapters", () => {
    const provider = readFileSync(join(process.cwd(), "apps/core-platform/lib/store/AppProvider.tsx"), "utf8");
    const theme = readFileSync(join(process.cwd(), "apps/core-platform/components/dashboard/ThemeToggle.tsx"), "utf8");
    const adapter = readFileSync(join(process.cwd(), "apps/core-platform/lib/infrastructure/browser/core-theme-storage.ts"), "utf8");
    expect(provider).not.toMatch(/\blocalStorage\b|\bsessionStorage\b/);
    expect(theme).not.toMatch(/\blocalStorage\b|\bsessionStorage\b/);
    expect(adapter).toContain("localStorage");
  });
});
