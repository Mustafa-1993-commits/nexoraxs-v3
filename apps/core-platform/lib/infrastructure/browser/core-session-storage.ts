import { STORAGE_KEYS } from "@nexoraxs/shared";

function session(): Storage | null {
  return typeof window === "undefined" ? null : window.sessionStorage;
}

export function readCoreSessionValue<T>(key: string, fallback: T): T {
  const raw = session()?.getItem(key);
  if (raw === null || raw === undefined) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function readCoreSessionText(key: string): string | null {
  return session()?.getItem(key) ?? null;
}

export function writeCoreSessionValue(key: string, value: unknown): void {
  session()?.setItem(key, JSON.stringify(value));
}

export function writeCoreSessionText(key: string, value: string): void {
  session()?.setItem(key, value);
}

export function removeCoreSessionValue(key: string): void {
  session()?.removeItem(key);
}

export function consumeCoreDemoFlag(): boolean {
  const flag = readCoreSessionValue<string | null>(STORAGE_KEYS.demo, null);
  if (flag !== "1" && flag !== "true") return false;
  removeCoreSessionValue(STORAGE_KEYS.demo);
  return true;
}
