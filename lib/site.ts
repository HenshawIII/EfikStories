/** Canonical site origin (no trailing slash). Used for metadata, sitemap, robots. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

export function getMetadataBase(): URL {
  const base = getSiteUrl();
  return new URL(base.endsWith("/") ? base : `${base}/`);
}
