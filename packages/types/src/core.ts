export interface User {
  id: string;
  fullName: string;
  name?: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  region?: string;
  country: string;
  currency: string;
  timezone: string;
  language: string;
  ownerUserId: string;
  createdAt: string;
}

export interface BusinessUnit {
  id: string;
  workspaceId: string;
  osSubscriptionId: string;
  os: string;
  osId: string;
  selectedOS?: string;
  branchIds: string[];
  branchId: string;
  name: string;
  industryType?: string;
  preset: string;
  presetId: string;
  createdAt: string;
}

export interface Branch {
  id: string;
  workspaceId: string;
  businessUnitId: string;
  name: string;
  /** Current MVP compatibility field. Treat as Branch Address line 1. */
  address?: string;
  branchAddressLine1?: string;
  branchAddressLine2?: string;
  city?: string;
  branchCity?: string;
  country?: string;
  branchCountry?: string;
  postalCode?: string;
  currency?: string;
  isMain: boolean;
  createdAt: string;
}

export interface OSSubscription {
  id: string;
  workspaceId: string;
  os: string;
  osId: string;
  plan: string;
  planId: string;
  status: "trialing" | "active" | "past_due" | "canceled";
  startedAt: string;
  trialEndsAt?: string;
  renewsAt?: string;
}

export interface OSEnablement {
  id: string;
  osSubscriptionId: string;
  workspaceId: string;
  osId: string;
  businessUnitId: string | null;
  branchIds: string[];
  /** @deprecated kept only for old mock data compatibility; use branchIds. */
  branchId?: string | null;
  scope: "workspace" | "business" | "branch";
  status: "active" | "disabled" | "locked";
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  workspaceRole: string;
  osId: string | null;
  osRole: string;
  businessUnitId: string | null;
  branchId: string | null;
  status: string;
  lastActive: string;
}

/** @deprecated use WorkspaceMember */
export type TeamMember = WorkspaceMember;

export interface WorkspaceStorageUsage {
  workspaceId: string;
  usedBytes: number;
  limitBytes: number;
  updatedAt: string;
}

export type MediaOwnerType =
  | "business_logo"
  | "business_cover"
  | "brand_image"
  | "certificate"
  | "product_image"
  | "category_image"
  | "store_banner"
  | "document_asset"
  | "other";

export interface MediaAsset {
  id: string;
  workspaceId: string;
  businessUnitId: string | null;
  branchId: string | null;
  ownerType: MediaOwnerType;
  ownerId: string | null;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  width: number | null;
  height: number | null;
  url: string;
  thumbnailUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
