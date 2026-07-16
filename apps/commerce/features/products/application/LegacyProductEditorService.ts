import type {
  CreateLegacyProductCommand,
  LegacyProductRecord,
  LegacyProductScope,
  LegacyProductsRepository,
  UpdateLegacyProductCommand,
} from "@nexoraxs/contracts";
import type { LegacyMediaCompatibilityPort } from "./LegacyMediaCompatibilityPort";

/** Bounded orchestration for the existing combined Product-and-image form only. */
export class LegacyProductEditorService {
  constructor(
    private readonly products: LegacyProductsRepository,
    private readonly media: LegacyMediaCompatibilityPort,
  ) {}

  async create(
    scope: LegacyProductScope,
    command: CreateLegacyProductCommand,
    imageFile?: File | null,
  ): Promise<LegacyProductRecord> {
    const created = await this.products.create(scope, command);
    if (!imageFile) return created;

    let image: string | null = null;
    try {
      image = await this.media.saveProductImage({ productId: created.id, file: imageFile });
      if (!image) throw new Error("products.errors.image_upload");
      return await this.products.update(scope, created.id, { image });
    } catch (error) {
      await this.products.remove(scope, created.id).catch(() => undefined);
      throw error;
    }
  }

  async update(
    scope: LegacyProductScope,
    productId: string,
    command: UpdateLegacyProductCommand,
    imageFile?: File | null,
  ): Promise<LegacyProductRecord> {
    if (!imageFile) return this.products.update(scope, productId, command);
    const image = await this.media.saveProductImage({ productId, file: imageFile });
    if (!image) throw new Error("products.errors.image_upload");
    return this.products.update(scope, productId, { ...command, image });
  }
}
