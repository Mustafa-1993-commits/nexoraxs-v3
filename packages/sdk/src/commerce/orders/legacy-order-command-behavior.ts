export type LegacyOrderCommandFailureOperation = "read" | "replace";

export interface LegacyOrderCommandFailureRule {
  readonly operation: LegacyOrderCommandFailureOperation;
  readonly remaining: number;
}

/** Deterministic test behavior only. It never uses randomness, timers, or artificial latency. */
export class LegacyOrderCommandBehavior {
  private readonly failures: { operation: LegacyOrderCommandFailureOperation; remaining: number }[];

  constructor(rules: readonly LegacyOrderCommandFailureRule[] = []) {
    this.failures = rules.map((rule) => ({ ...rule }));
  }

  before(operation: LegacyOrderCommandFailureOperation): void {
    const failure = this.failures.find((candidate) => candidate.operation === operation && candidate.remaining > 0);
    if (!failure) return;
    failure.remaining -= 1;
    throw new Error("commerce.orders.command.store.configured_failure");
  }
}
