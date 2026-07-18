import type {
  LegacyPosCommercialSnapshotPort,
} from "@nexoraxs/contracts";
import { computeDoc } from "@/features/documents/application/legacy-commerce-documents";

/** Outer compatibility adapter. The arithmetic remains owned by the existing document policy. */
export class LegacyDocumentSnapshotAdapter implements LegacyPosCommercialSnapshotPort {
  calculate(input: Parameters<LegacyPosCommercialSnapshotPort["calculate"]>[0]) {
    return computeDoc([...input.items], input.setup, input.discount);
  }
}
