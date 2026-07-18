"use client";

import type { LegacyPosCheckoutInput } from "@nexoraxs/contracts";
import { useCallback, useState } from "react";
import { useCommerceServices } from "@/lib/commerce/CommerceServicesProvider";

/** React status adapter for synchronous checkout; it performs no owner work or retry. */
export function useLegacyPosCheckout() {
  const { services } = useCommerceServices();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const checkout = useCallback((input: LegacyPosCheckoutInput) => {
    setIsPending(true);
    setError(null);
    try {
      return services.posCheckout.checkout(input);
    } catch (caught) {
      const nextError = caught instanceof Error ? caught : new Error(String(caught));
      setError(nextError);
      throw nextError;
    } finally {
      setIsPending(false);
    }
  }, [services.posCheckout]);

  return { checkout, isPending, error } as const;
}
