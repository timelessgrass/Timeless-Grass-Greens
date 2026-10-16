/** One publication policy shared by Astro routes and the prebuild checks. */
export const CONTENT_STATUSES = ['draft', 'review', 'published'];
/**
 * Today in Myrtle Beach time, YYYY-MM-DD. The weekly blog (care plan) merges posts
 * ahead with a future `published` date; they exist on the site only from the
 * first build on or after that date. Netlify builds in UTC, so the date is
 * read in the business's own time zone. BLOG_TODAY overrides it for a preview
 * build (BLOG_TODAY=2027-01-31 shows the whole queue). Never set it on Netlify.
 */
export function todayHere(now = new Date()) {
  const override = globalThis.process?.env?.BLOG_TODAY;
  if (override) return override;
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

/** Published, and its date has arrived. Every route, the sitemap and the prebuild checks read this. */
export function isPublished(data) {
  if (data?.status !== 'published') return false;
  const date = typeof data?.published === 'string' ? data.published.slice(0, 10) : '';
  return !date || date <= todayHere();
}
export function assertUniqueRoutes(paths) {
  const seen = new Set();
  for (const path of paths) {
    if (seen.has(path)) throw new Error(`Duplicate content route: ${path}`);
    seen.add(path);
  }
}
