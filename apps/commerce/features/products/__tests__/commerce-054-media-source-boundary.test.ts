// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import type { LegacyProductsRepository } from "@nexoraxs/contracts";
import { browserFileToLegacyMediaSource } from "../adapters/browser-file-to-legacy-media-source";
import { BrowserCanvasThumbnailAdapter } from "../../../lib/commerce/media/BrowserCanvasThumbnailAdapter";
import { LegacyProductEditorService } from "../application/LegacyProductEditorService";

const scope = { workspaceId: "ws", legacyBusinessUnitId: "bu", branchId: "br" };
const command = {
  name: "Product",
  category: "Category",
  sku: "SKU",
  barcode: "",
  price: 1,
  cost: 0,
  taxable: true,
  stock: 1,
  lowStockThreshold: 0,
  notes: "",
};
const record = {
  ...command,
  id: "product-id",
  workspaceId: "ws",
  businessUnitId: "bu",
  branchId: "br",
  osSubscriptionId: "subscription-id",
  createdAt: "created",
  updatedAt: "updated",
};
const source = {
  fileName: "photo.png",
  mediaType: "image/png",
  sizeBytes: 3,
  bytes: new Uint8Array([1, 2, 3]),
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Product browser media boundary", () => {
  it("maps File metadata and bytes only at the browser adapter", async () => {
    const file = new File([new Uint8Array([1, 2, 3])], "photo.png", { type: "image/png" });
    await expect(browserFileToLegacyMediaSource(file)).resolves.toMatchObject({ fileName: "photo.png", mediaType: "image/png", sizeBytes: 3, bytes: new Uint8Array([1, 2, 3]) });
  });

  it("returns null when browser image/canvas work cannot complete", async () => {
    const revoke = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:test");
    class FailingImage { onload: (() => void) | null = null; onerror: (() => void) | null = null; set src(_value: string) { this.onerror?.(); } }
    vi.stubGlobal("Image", FailingImage);
    const result = await new BrowserCanvasThumbnailAdapter().compress({ fileName: "bad.png", mediaType: "image/png", sizeBytes: 1, bytes: new Uint8Array([1]) });
    expect(result).toBeNull();
    expect(revoke).toHaveBeenCalledWith("blob:test");
  });

  it("creates bounded JPEG output with preserved byte metadata and rejects the configured byte limit", async () => {
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:success");
    const revoke = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
    class LoadedImage {
      width = 400;
      height = 200;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_value: string) { queueMicrotask(() => this.onload?.()); }
    }
    vi.stubGlobal("Image", LoadedImage);
    const canvas = {
      width: 0,
      height: 0,
      getContext: () => ({ drawImage: vi.fn() }),
      toDataURL: () => "data:image/jpeg;base64,AAAA",
    };
    const createElement = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tagName) => (
      tagName === "canvas"
        ? canvas as unknown as HTMLCanvasElement
        : createElement(tagName)
    ));
    const adapter = new BrowserCanvasThumbnailAdapter();

    await expect(adapter.compress(source, { maxDimension: 200, maxBytes: 100 })).resolves.toEqual({
      dataUrl: "data:image/jpeg;base64,AAAA",
      mimeType: "image/jpeg",
      sizeBytes: 20,
      width: 200,
      height: 100,
    });
    await expect(adapter.compress(source, { maxDimension: 200, maxBytes: 19 })).resolves.toBeNull();
    expect(revoke).toHaveBeenCalledTimes(2);
  });

  it("treats a cancelled selection as no media work", async () => {
    const repository = {
      create: vi.fn(async () => record),
      update: vi.fn(),
      remove: vi.fn(),
      list: vi.fn(),
      getById: vi.fn(),
    } as unknown as LegacyProductsRepository;
    const media = { saveProductImage: vi.fn() };

    await expect(new LegacyProductEditorService(repository, media).create(scope, command, null))
      .resolves.toBe(record);
    expect(media.saveProductImage).not.toHaveBeenCalled();
  });

  it("preserves create compensation, edit ordering, and the localized media failure key", async () => {
    const calls: string[] = [];
    const repository = {
      create: vi.fn(async () => { calls.push("create"); return record; }),
      update: vi.fn(async () => { calls.push("update"); throw new Error("update-failed"); }),
      remove: vi.fn(async () => { calls.push("remove"); return { removedId: record.id }; }),
      list: vi.fn(),
      getById: vi.fn(),
    } as unknown as LegacyProductsRepository;
    const media = {
      saveProductImage: vi.fn(async (): Promise<string | null> => {
        calls.push("media");
        return "image";
      }),
    };
    const service = new LegacyProductEditorService(repository, media);

    await expect(service.create(scope, command, source)).rejects.toThrow("update-failed");
    expect(calls).toEqual(["create", "media", "update", "remove"]);

    calls.length = 0;
    vi.mocked(repository.update).mockImplementationOnce(async () => {
      calls.push("update");
      return record;
    });
    await expect(service.update(scope, record.id, { name: "Edited Product" }, source))
      .resolves.toBe(record);
    expect(calls).toEqual(["media", "update"]);

    calls.length = 0;
    const updateCallsBeforeFailure = vi.mocked(repository.update).mock.calls.length;
    media.saveProductImage.mockResolvedValueOnce(null);
    await expect(service.update(scope, record.id, { name: "Edited Product" }, source))
      .rejects.toThrow("products.errors.image_upload");
    expect(vi.mocked(repository.update)).toHaveBeenCalledTimes(updateCallsBeforeFailure);
    expect(calls).toEqual([]);
  });
});
