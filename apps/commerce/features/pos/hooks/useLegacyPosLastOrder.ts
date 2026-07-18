"use client";

import { useCallback } from "react";
import { useCommerceServices } from "@/lib/commerce/CommerceServicesProvider";

export function useLegacyPosLastOrder() {
  const { services } = useCommerceServices();
  const read = useCallback(() => services.posLastOrder.read(), [services.posLastOrder]);
  const clear = useCallback(() => services.posLastOrder.clear(), [services.posLastOrder]);
  return { read, clear } as const;
}
