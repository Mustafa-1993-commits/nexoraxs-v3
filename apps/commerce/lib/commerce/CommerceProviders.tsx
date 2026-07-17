"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { AppProvider, useApp } from "@/lib/store";
import { LegacyProductEditorService } from "@/features/products/application/LegacyProductEditorService";
import { readCommerceRuntimeConfig } from "./commerce-runtime-config";
import { CommerceServicesProvider, useCommerceServices } from "./CommerceServicesProvider";

const LegacyProductEditorContext = createContext<LegacyProductEditorService | null>(null);

export function useLegacyProductEditor(): LegacyProductEditorService {
  const service = useContext(LegacyProductEditorContext);
  if (!service) throw new Error("useLegacyProductEditor must be used within CommerceProviders");
  return service;
}

function LegacyProductEditorProvider({ children }: { readonly children: ReactNode }) {
  const { services } = useCommerceServices();
  const { attachMedia } = useApp();
  const [bridge] = useState(() => {
    let currentAttachMedia = attachMedia;
    return {
      setAttachMedia: (next: typeof attachMedia) => { currentAttachMedia = next; },
      service: new LegacyProductEditorService(
        services.productsRepository,
        {
          saveProductImage: async ({ productId, source }) => {
            const result = await currentAttachMedia({
              source,
              ownerType: "product_image",
              ownerId: productId,
              fileName: source.fileName,
            });
            return result?.reference.thumbnailUrl ?? null;
          },
        },
      ),
    };
  });
  useEffect(() => {
    bridge.setAttachMedia(attachMedia);
  }, [attachMedia, bridge]);

  return <LegacyProductEditorContext.Provider value={bridge.service}>{children}</LegacyProductEditorContext.Provider>;
}

export function CommerceProviders({ children }: { readonly children: ReactNode }) {
  const [config] = useState(readCommerceRuntimeConfig);
  return (
    <CommerceServicesProvider config={config}>
      <AppProvider>
        <LegacyProductEditorProvider>{children}</LegacyProductEditorProvider>
      </AppProvider>
    </CommerceServicesProvider>
  );
}
