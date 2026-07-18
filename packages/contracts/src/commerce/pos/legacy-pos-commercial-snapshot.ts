import type { OrderItem } from "@nexoraxs/types";

/** Current browser-demo tax inputs; not canonical Pricing or Tax policy. */
export interface LegacyPosCommercialSettings {
  readonly vatRegistered?: boolean;
  readonly vatRate?: number;
  readonly pricesIncludeTax?: boolean;
}

export interface LegacyPosCommercialLineSnapshot {
  readonly name: string;
  readonly qty: number;
  readonly price: number;
  readonly vat: number;
  readonly total: number;
}

/** Applied compatibility values retained by the current POS and Order flow. */
export interface LegacyPosCommercialSnapshot {
  readonly lines: readonly LegacyPosCommercialLineSnapshot[];
  readonly gross: number;
  readonly subtotal: number;
  readonly discount: number;
  readonly net: number;
  readonly vat: number;
  readonly total: number;
  readonly rate: number;
}

export interface LegacyPosCommercialSnapshotPort {
  calculate(input: {
    readonly items: readonly OrderItem[];
    readonly setup: LegacyPosCommercialSettings;
    readonly discount: number;
  }): LegacyPosCommercialSnapshot;
}

