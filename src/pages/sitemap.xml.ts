/**
 * One sitemap.xml listing exactly the indexable routes.
 *
 * Built from the same data the pages are, so a new market, service or guide
 * cannot ship absent from the sitemap. Globbing the source tree missed dynamic
 * routes entirely and silently orphaned three pages.
 */
import type { APIRoute } from 'astro';
import { MARKETS } from '../data/markets';
import { SERVICES } from '../data/services';
import { GUIDES } from '../data/guides';

const SITE = 'https://www.timelessgrass.com';

export function routes(): string[] {
  return [
    '/',
    '/services/',
    '/guides/',
    ...MARKETS.map((m) => `/${m.slug}/`),
    ...SERVICES.map((s) => `/services/${s.slug}/`),
    ...GUIDES.map((g) => `/guides/${g.slug}/`),
  ];
}

export const GET: APIRoute = async () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes().map((r) => `  <url><loc>${SITE}${r}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
