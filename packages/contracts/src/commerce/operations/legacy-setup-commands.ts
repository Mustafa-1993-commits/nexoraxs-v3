import type { CommerceSetup } from "@nexoraxs/types";

export interface LegacyCommerceSetupContext {
  readonly workspaceId: string;
  readonly legacyBusinessUnitId: string;
  readonly osSubscriptionId: string;
  readonly industryOrPreset?: string | null;
}

export interface LegacySaveCommerceSetupCommand {
  readonly context: LegacyCommerceSetupContext;
  readonly changes: Partial<CommerceSetup>;
}

export interface LegacyCommerceSetupResult {
  readonly setup: CommerceSetup;
  readonly setups: readonly CommerceSetup[];
}

export interface LegacyCommerceSetupWritePort {
  readSetups(): readonly CommerceSetup[];
  replaceSetups(records: readonly CommerceSetup[]): void;
}

export interface LegacyCommerceSetupPort {
  read(context: LegacyCommerceSetupContext): CommerceSetup;
  save(command: LegacySaveCommerceSetupCommand): LegacyCommerceSetupResult;
}
