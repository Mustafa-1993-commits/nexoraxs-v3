import type {
  LegacyCommerceCommandPublicationListener,
  LegacyCommerceCommandPublicationPort,
  LegacyCreateInvoiceResult,
  LegacyCreateOrderResult,
} from "@nexoraxs/contracts";

/** React-neutral in-process publication of already committed compatibility snapshots. */
export class LegacyCommandPublicationHub implements LegacyCommerceCommandPublicationPort {
  private readonly listeners = new Set<LegacyCommerceCommandPublicationListener>();

  publishOrderResult(result: LegacyCreateOrderResult): void {
    this.publish({ type: "order", result: structuredClone(result) });
  }

  publishInvoiceResult(result: LegacyCreateInvoiceResult): void {
    this.publish({ type: "invoice", result: structuredClone(result) });
  }

  subscribe(listener: LegacyCommerceCommandPublicationListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private publish(publication: Parameters<LegacyCommerceCommandPublicationListener>[0]): void {
    for (const listener of this.listeners) listener(structuredClone(publication));
  }
}
