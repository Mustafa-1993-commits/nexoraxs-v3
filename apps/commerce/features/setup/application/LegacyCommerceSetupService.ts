import type {
  LegacyCommerceDeterministicDependencies,
  LegacyCommerceOperationsStore,
  LegacyCommerceSetupContext,
  LegacyCommerceSetupPort,
  LegacyCommerceSetupResult,
  LegacySaveCommerceSetupCommand,
} from "@nexoraxs/contracts";
import type { CommerceSetup } from "@nexoraxs/types";
import { LEGACY_COMMERCE_SETUP_DEFAULTS, virtualLegacyCommerceSetup } from "./legacy-commerce-setup-policy";

export class LegacyCommerceSetupService implements LegacyCommerceSetupPort {
  constructor(
    private readonly store: LegacyCommerceOperationsStore,
    private readonly deterministic: LegacyCommerceDeterministicDependencies,
  ) {}

  read(context: LegacyCommerceSetupContext): CommerceSetup {
    return this.store.readSetups().find((setup) =>
      setup.workspaceId === context.workspaceId
      && setup.businessUnitId === context.legacyBusinessUnitId
    ) ?? virtualLegacyCommerceSetup({
      workspaceId: context.workspaceId,
      businessUnitId: context.legacyBusinessUnitId,
      osSubscriptionId: context.osSubscriptionId,
      industryOrPreset: context.industryOrPreset,
    });
  }

  save(command: LegacySaveCommerceSetupCommand): LegacyCommerceSetupResult {
    const records = [...this.store.readSetups()];
    const existing = records.find((setup) =>
      setup.workspaceId === command.context.workspaceId
      && setup.businessUnitId === command.context.legacyBusinessUnitId
    );
    let setup: CommerceSetup;
    let setups: CommerceSetup[];
    if (existing) {
      setup = {
        ...existing,
        ...command.changes,
        workspaceId: existing.workspaceId,
        businessUnitId: existing.businessUnitId,
        osSubscriptionId: existing.osSubscriptionId,
        updatedAt: this.deterministic.now(),
      };
      setups = records.map((item) => item.id === existing.id ? setup : item);
    } else {
      const changes = { ...command.changes };
      delete changes.id;
      delete changes.createdAt;
      delete changes.updatedAt;
      setup = {
        ...LEGACY_COMMERCE_SETUP_DEFAULTS,
        categories: [],
        ...changes,
        id: this.deterministic.createId("cs"),
        createdAt: this.deterministic.now(),
        updatedAt: this.deterministic.now(),
        workspaceId: command.context.workspaceId,
        businessUnitId: command.context.legacyBusinessUnitId,
        osSubscriptionId: command.context.osSubscriptionId,
      };
      setups = [...records, setup];
    }
    this.store.replaceSetups(setups);
    return { setup: structuredClone(setup), setups: structuredClone(setups) };
  }
}
