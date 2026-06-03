import type { BusinessIdentity } from "@/lib/settings-store";

export interface PreviewLineItem {
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export const MOCK_PREVIEW_ITEMS: PreviewLineItem[] = [
  { name: "Product A",  quantity: 2, unitPrice: 50.00, lineTotal: 100.00 },
  { name: "Product B",  quantity: 1, unitPrice: 30.00, lineTotal:  30.00 },
  { name: "Product C",  quantity: 3, unitPrice: 15.00, lineTotal:  45.00 },
];

export const MOCK_DISCOUNT_RATE = 0.10;

export const MOCK_IDENTITY: Omit<BusinessIdentity, "logoState"> & { logoState: "none" } = {
  displayName: "Your Business Name",
  legalName: "Your Legal Company Name",
  logoState: "none",
  phone: "+20 10 0000 0000",
  email: "info@yourbusiness.com",
  address: "123 Main Street, Cairo, Egypt",
  taxNumber: "TAX-123456789",
  commercialReg: "CR-987654321",
};
