export const TIF_AUTH_COOKIE = "tif_auth";

export function validateTifAccessKey(key: string | string[] | undefined): boolean {
  const secret = process.env.TIF_ACCESS_KEY?.trim();
  if (!secret) return false;

  const candidate = Array.isArray(key) ? key[0] : key;
  return typeof candidate === "string" && candidate.trim() === secret;
}
