import type { CommerceRuntimeConfig } from "@nexoraxs/sdk";

/** The only Commerce module allowed to read NEXT_PUBLIC runtime variables. */
export function readCommerceRuntimeConfig(): CommerceRuntimeConfig {
  const source = process.env.NEXT_PUBLIC_COMMERCE_DATA_SOURCE?.trim() || "mock";
  const apiBaseUrl = process.env.NEXT_PUBLIC_COMMERCE_API_BASE_URL?.trim() || undefined;
  const latencyValue = process.env.NEXT_PUBLIC_COMMERCE_MOCK_LATENCY_MS?.trim();
  return {
    dataSource: source as CommerceRuntimeConfig["dataSource"],
    ...(apiBaseUrl ? { apiBaseUrl } : {}),
    ...(latencyValue === undefined ? {} : { mockLatencyMs: Number(latencyValue) }),
  };
}
