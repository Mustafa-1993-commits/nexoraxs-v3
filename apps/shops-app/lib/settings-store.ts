// ── Types ─────────────────────────────────────────────────────────────────

export interface BusinessIdentity {
  displayName: string;
  legalName?: string;
  logoState: "none" | "mock";
  logoFileName?: string;
  phone: string;
  email: string;
  address: string;
  taxNumber?: string;
  commercialReg?: string;
}

export interface TaxSettings {
  registered: boolean;
  taxRate: number;
  priceMode: "inclusive" | "exclusive";
}

export interface InvoiceNumbering {
  receiptPrefix: string;
  invoicePrefix: string;
  startingNumber: number;
}

export type TemplateType = "receipt-58" | "receipt-80" | "invoice-a4" | "refund";
export type TemplateStyle = "minimal" | "classic" | "detailed";

export interface DocumentTemplatePreference {
  type: TemplateType;
  style: TemplateStyle;
}

// ── Default values ─────────────────────────────────────────────────────────

export const DEFAULT_IDENTITY: BusinessIdentity = {
  displayName: "",
  legalName: undefined,
  logoState: "none",
  logoFileName: undefined,
  phone: "",
  email: "",
  address: "",
  taxNumber: undefined,
  commercialReg: undefined,
};

export const DEFAULT_TAX: TaxSettings = {
  registered: false,
  taxRate: 15,
  priceMode: "exclusive",
};

export const DEFAULT_INVOICING: InvoiceNumbering = {
  receiptPrefix: "RCP",
  invoicePrefix: "INV",
  startingNumber: 1,
};

export const DEFAULT_TEMPLATE_STYLES: Record<TemplateType, TemplateStyle> = {
  "receipt-58": "minimal",
  "receipt-80": "classic",
  "invoice-a4": "detailed",
  "refund": "classic",
};

// ── Session keys & events ──────────────────────────────────────────────────

const IDENTITY_KEY = "commerce:identity";
const TAX_KEY = "commerce:tax";
const INVOICING_KEY = "commerce:invoicing";
const templateKey = (type: TemplateType) => `commerce:template:${type}`;

const IDENTITY_EVENT = "nexoraxs:identity-change";
const TAX_EVENT = "nexoraxs:tax-change";
const INVOICING_EVENT = "nexoraxs:invoicing-change";
const TEMPLATE_EVENT = "nexoraxs:template-change";

// ── Generic helpers ────────────────────────────────────────────────────────

// Cache: key → { raw string last seen, parsed result }
// useSyncExternalStore requires getSnapshot to return a stable reference when
// the underlying data has not changed. Without this, JSON.parse produces a new
// object on every call, triggering an infinite render loop.
const cache = new Map<string, { raw: string | null; value: unknown }>();

function safeGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(key);
    const cached = cache.get(key);
    if (cached && cached.raw === raw) return cached.value as T | null;
    const value = raw ? (JSON.parse(raw) as T) : null;
    cache.set(key, { raw, value });
    return value;
  } catch {
    return null;
  }
}

function safeSet(key: string, value: unknown, eventName: string): void {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(value);
  sessionStorage.setItem(key, raw);
  // Bust the cache so the next getSnapshot call parses the new value.
  cache.set(key, { raw, value });
  window.dispatchEvent(new Event(eventName));
}

function subscribe(eventName: string, cb: () => void): () => void {
  window.addEventListener(eventName, cb);
  return () => window.removeEventListener(eventName, cb);
}

// ── Business Identity ──────────────────────────────────────────────────────

export function getIdentity(): BusinessIdentity | null {
  return safeGet<BusinessIdentity>(IDENTITY_KEY);
}

export function setIdentity(value: BusinessIdentity): void {
  safeSet(IDENTITY_KEY, value, IDENTITY_EVENT);
}

export function subscribeToIdentity(cb: () => void): () => void {
  return subscribe(IDENTITY_EVENT, cb);
}

// ── Tax Settings ───────────────────────────────────────────────────────────

export function getTaxSettings(): TaxSettings | null {
  return safeGet<TaxSettings>(TAX_KEY);
}

export function setTaxSettings(value: TaxSettings): void {
  safeSet(TAX_KEY, value, TAX_EVENT);
}

export function subscribeToTaxSettings(cb: () => void): () => void {
  return subscribe(TAX_EVENT, cb);
}

// ── Invoice Numbering ──────────────────────────────────────────────────────

export function getInvoiceNumbering(): InvoiceNumbering | null {
  return safeGet<InvoiceNumbering>(INVOICING_KEY);
}

export function setInvoiceNumbering(value: InvoiceNumbering): void {
  safeSet(INVOICING_KEY, value, INVOICING_EVENT);
}

export function subscribeToInvoiceNumbering(cb: () => void): () => void {
  return subscribe(INVOICING_EVENT, cb);
}

// ── Document Template Preferences ──────────────────────────────────────────

export function getTemplatePreference(type: TemplateType): DocumentTemplatePreference | null {
  return safeGet<DocumentTemplatePreference>(templateKey(type));
}

export function setTemplatePreference(type: TemplateType, value: DocumentTemplatePreference): void {
  safeSet(templateKey(type), value, TEMPLATE_EVENT);
}

export function subscribeToTemplatePreference(cb: () => void): () => void {
  return subscribe(TEMPLATE_EVENT, cb);
}

// ── Utility: format document number ────────────────────────────────────────

export function formatDocNumber(prefix: string, num: number): string {
  const safeNum = Math.max(1, num || 1);
  const safePrefix = prefix || "DOC";
  return `${safePrefix}-${String(safeNum).padStart(4, "0")}`;
}
