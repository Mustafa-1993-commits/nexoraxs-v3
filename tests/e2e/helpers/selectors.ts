export const DEMO_FLAG = "nexoraxs.session.demo";
export const PRODUCT_ID = "p1";
export const MAIN_BRANCH = "Smouha Branch";
export const SECOND_BRANCH = "Nasr City";

export function branchSlug(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "branch";
}
