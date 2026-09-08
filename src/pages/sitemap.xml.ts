/**
 * One sitemap.xml listing exactly the indexable routes.
 *
 * Built from the same data the pages are built from, so a new market or service
 * cannot ship absent from the sitemap. Globbing the source tree missed dynamic
 * routes ([market]/) entirely and quietly orphaned three pages.
 */
import type { APIRoute } from 'astro';
import { MARKETS } from '../data/markets';

const SITE = 'https://www.timelessgrass.com';

export function routes(): string[] {
  return ['/', ...MARKETS.map((m) => `/${m.slug}/`)];
}

export const GET: APIRoute = async () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes().map((r) => `  <url><loc>${SITE}${r}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
