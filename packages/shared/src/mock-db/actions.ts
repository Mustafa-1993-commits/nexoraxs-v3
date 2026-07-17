let __idseq = 0;

export function uid(prefix: string): string {
  __idseq += 1;
  return `${prefix}_${Date.now().toString(36)}${__idseq.toString(36)}`;
}

export const nowISO = (): string => new Date().toISOString();

export function normalizeEmail(email: string): string {
  return (email || "").trim().toLowerCase();
}

export function getUserDisplayName(
  user: { fullName?: string; name?: string; email?: string } | null,
): string {
  if (!user) return "";
  const fullName = (user.fullName || user.name || "").trim();
  if (fullName) return fullName;
  return normalizeEmail(user.email || "")
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
