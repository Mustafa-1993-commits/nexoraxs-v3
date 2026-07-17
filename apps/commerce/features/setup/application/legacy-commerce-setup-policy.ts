import type { CommerceSetup } from "@nexoraxs/types";

export const LEGACY_COMMERCE_SETUP_DEFAULTS = Object.freeze({
  displayName: "", legalName: "", phone: "", email: "", address: "", city: "", country: "Egypt",
  crn: "", trn: "", logo: null as string | null,
  presetId: "retail", businessType: "retail", preset: "retail", mode: "physical" as const,
  vatRegistered: true, vatRate: 14, pricesIncludeTax: true, taxLabel: "VAT", taxNumber: "",
  invoicePrefix: "INV", receiptPrefix: "RCPT", invoiceStart: 1001, receiptStart: 1001,
  footer: "Thank you for shopping with us", returnPolicy: "Returns accepted within 14 days with receipt.",
  receiptSize: "80mm" as const, receiptStyle: "classic" as const, invoiceTemplate: "a4-simple" as const,
  categories: [] as string[],
});

export const DEFAULT_SETUP = LEGACY_COMMERCE_SETUP_DEFAULTS;

export const suggestCommercePresetForIndustry = legacyCommercePreset;

export function legacyCommercePreset(industryType: string | null | undefined): string {
  const value = industryType?.trim().toLowerCase().replace(/\s*\/\s*/g, "_").replace(/[\s-]+/g, "_");
  if (!value || value === "retail" || value === "retail_store") return "retail_store";
  if (["pharmacy", "supermarket", "cosmetics", "medical_supplies"].includes(value)) return value;
  if (["restaurant", "restaurant_cafe", "cafe"].includes(value)) return "restaurant_cafe";
  if (["electronics", "electronics_mobile", "mobile"].includes(value)) return "electronics_mobile";
  if (["fashion", "clothing", "clothing_fashion", "fashion_clothing"].includes(value)) return "clothing_fashion";
  return "retail_store";
}

export function virtualLegacyCommerceSetup(input: {
  workspaceId: string; businessUnitId: string; osSubscriptionId: string; industryOrPreset?: string | null;
}): CommerceSetup {
  const preset = legacyCommercePreset(input.industryOrPreset);
  return {
    id: "", workspaceId: input.workspaceId, businessUnitId: input.businessUnitId,
    osSubscriptionId: input.osSubscriptionId, createdAt: "", updatedAt: "",
    ...LEGACY_COMMERCE_SETUP_DEFAULTS, presetId: preset, businessType: preset, preset,
    categories: [],
  };
}
