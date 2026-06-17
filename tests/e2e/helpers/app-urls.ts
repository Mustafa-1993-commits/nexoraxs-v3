export const CORE_URL = process.env.CORE_URL ?? "http://localhost:3001";
export const COMMERCE_URL = process.env.COMMERCE_URL ?? "http://localhost:3002";

export function corePath(path = "/"): string {
  return new URL(path, CORE_URL).toString();
}

export function commercePath(path = "/"): string {
  return new URL(path, COMMERCE_URL).toString();
}
