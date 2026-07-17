import { LegacyCommerceRepositoryError } from "@nexoraxs/contracts";

/** A missing compatibility relation is optional; every other failure remains observable. */
export async function optionalCompatibilityRelation<T>(read: () => Promise<T>): Promise<T | null> {
  try {
    return await read();
  } catch (error) {
    if (error instanceof LegacyCommerceRepositoryError && error.code === "not_found") return null;
    throw error;
  }
}
