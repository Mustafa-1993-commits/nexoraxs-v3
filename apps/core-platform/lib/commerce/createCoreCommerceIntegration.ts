import { createCommerceProjectionPort } from "@nexoraxs/sdk";

/** Core-side composition root for the read-only Commerce projection adapter. */
export const coreCommerceIntegration = Object.freeze({
  projection: createCommerceProjectionPort(),
});
