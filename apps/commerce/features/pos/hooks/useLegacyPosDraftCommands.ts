"use client";

import type {
  LegacyPosCommercialSettings,
  LegacyPosDraftCommand,
  LegacyPosDraftResult,
} from "@nexoraxs/contracts";
import { useCallback, useMemo, useRef, useState } from "react";
import { useCommerceServices } from "@/lib/commerce/CommerceServicesProvider";

/** React state adapter for the synchronous POS draft service; it owns no persistence or retry. */
export function useLegacyPosDraftCommands(setup: LegacyPosCommercialSettings) {
  const { services } = useCommerceServices();
  const service = services.posDraftCommands;
  const [draft, setDraft] = useState(() => service.createInitial());
  const draftRef = useRef(draft);
  const [error, setError] = useState<Error | null>(null);

  const commercialSnapshot = useMemo(
    () => service.snapshot(draft, setup),
    [draft, service, setup],
  );

  const execute = useCallback((command: LegacyPosDraftCommand): LegacyPosDraftResult => {
    try {
      const result = service.execute({ draft: draftRef.current, command, setup });
      draftRef.current = result.draft;
      setDraft(result.draft);
      setError(null);
      return result;
    } catch (caught) {
      const nextError = caught instanceof Error ? caught : new Error(String(caught));
      setError(nextError);
      throw nextError;
    }
  }, [service, setup]);

  const reset = useCallback(() => {
    const initial = service.createInitial();
    draftRef.current = initial;
    setDraft(initial);
    setError(null);
  }, [service]);

  return {
    draft,
    commercialSnapshot,
    execute,
    reset,
    isPending: false,
    error,
  } as const;
}
