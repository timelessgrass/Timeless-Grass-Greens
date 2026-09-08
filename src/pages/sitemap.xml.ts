/**
 * One sitemap.xml listing exactly the indexable routes.
 *
 * @astrojs/sitemap emits sitemap-index.xml + sitemap-0.xml, which is correct for
 * very large sites but leaves no sitemap.xml for robots to advertise. At this
 * scale (~164 pages, well under the 50,000 limit) a single file is simpler and
 * is what robots.txt points at.
 */
import type { APIRoute } from 'astro';

const SITE = 'https://www.timelessgrass.com';

export const GET: APIRoute = async () => {
  const pages = import.meta.glob('./**/*.astro', { eager: true });
  const routes = Object.keys(pages)
    .map((f) =>
      f.replace(/^\.\//, '').replace(/\.astro$/, '').replace(/(^|\/)index$/, '')
    )
    .filter((r) => !r.includes('['))
    .map((r) => `${SITE}/${r ? r + '/' : ''}`)
    .sort();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
