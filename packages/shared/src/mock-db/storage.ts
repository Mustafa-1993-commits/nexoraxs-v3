import { STORAGE_KEYS } from "./schema";

function isDbKey(key: string): boolean {
  return key.startsWith("nexoraxs.db.");
}

export function readCollection<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function writeCollection<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    if (error instanceof DOMException && (
      error.name === "QuotaExceededError"
      || error.name === "NS_ERROR_DOM_QUOTA_REACHED"
      || error.code === 22
      || error.code === 1014
    )) {
      throw new Error("Storage is full. Large uploaded images are not saved in demo mode.");
    }
    throw error;
  }
}

export function readSession<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const store = isDbKey(key) || key === STORAGE_KEYS.theme ? localStorage : sessionStorage;
    const raw = store.getItem(key);
    return raw !== null ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeSession(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  const store = isDbKey(key) || key === STORAGE_KEYS.theme ? localStorage : sessionStorage;
  store.setItem(key, JSON.stringify(value));
}

export function clearAllStorage(): void {
  if (typeof window === "undefined") return;
  Object.values(STORAGE_KEYS).forEach((key) => {
    try { localStorage.removeItem(key); } catch { /* noop */ }
    try { sessionStorage.removeItem(key); } catch { /* noop */ }
  });
}

// ---- POS last-order helpers (isolates direct sessionStorage access from pages) ----

export function readPosLastOrderId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(STORAGE_KEYS.posLastOrderId);
}

export function writePosLastOrderId(orderId: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEYS.posLastOrderId, orderId);
}

export function clearPosLastOrderId(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEYS.posLastOrderId);
}
