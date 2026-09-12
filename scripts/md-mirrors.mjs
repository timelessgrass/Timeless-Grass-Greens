#!/usr/bin/env node
/**
 * Markdown mirrors, llms.txt and llms-full.txt, written after `astro build`.
 *
 *   node scripts/md-mirrors.mjs [dist]
 *
 * Every indexable page gets a clean Markdown copy at its own address + "index.html.md" (the
 * llms.txt convention for URLs that end in a slash), so an answer engine can read the page
 * without the menu, the buttons or the photographs. Each copy is converted from the built
 * <main>, so it can never drift from the page it mirrors. llms.txt lists them by section;
 * llms-full.txt carries all of them in one file. Pages marked noindex get no mirror.
 */
import fs from 'node:fs';
import path from 'node:path';
import TurndownService from 'turndown';

const DIST = path.resolve(process.argv[2] || 'dist');
const SITE = 'https://www.timelessgrass.com';
const TODAY = new Date().toISOString().slice(0, 10);

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(dir, e.name);
  if (e.isDirectory()) return walk(p);
  return e.name === 'index.html' ? [p] : [];
});
const pick = (html, re) => (html.match(re) || [])[1] || '';
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&rsquo;/g, '’').replace(/&nbsp;/g, ' ');
const cls = (n) => (n.getAttribute && n.getAttribute('class')) || '';

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', emDelimiter: '*' });
// addRule, not remove(): turndown consults remove() only when no built-in rule matches, and its
// image rule matches <img> first, so photographs leaked through as ![](…) lines
td.addRule('drop', { filter: ['script', 'style', 'svg', 'dialog', 'form', 'button', 'iframe', 'noscript', 'picture', 'img', 'template'], replacement: () => '' });
// decoration and navigation, not content: hidden layers, the duplicate ticker, breadcrumbs, the sticky bar
td.addRule('hidden', {
  filter: (n) => n.nodeType === 1 && (n.getAttribute('aria-hidden') === 'true' || n.hasAttribute('hidden') || /\b(crumbs|bar)\b/.test(cls(n))),
  replacement: () => '',
});
// the homepage headline is split into display lines; keep the words apart
td.addRule('line', { filter: (n) => n.nodeName === 'SPAN' && /\bline\b/.test(cls(n)), replacement: (c) => `${c} ` });
// photographs are dropped, their captions kept and labelled
td.addRule('caption', { filter: 'figcaption', replacement: (c) => (c.trim() ? `\n\nPhoto: ${c.trim()}\n\n` : '') });
// Every link is absolute. Fragment/relative links resolve against the page being converted.
let mirrorPageUrl = SITE;
td.addRule('link', {
  filter: (n) => n.nodeName === 'A' && n.getAttribute('href'),
  replacement: (c, n) => {
    const text = c.trim();
    if (!text) return '';
    const href = n.getAttribute('href');
    const url = /^(tel|mailto):/.test(href) ? href : new URL(href, mirrorPageUrl).href;
    return `[${text}](${url})`;
  },
});

const pages = [];
for (const file of walk(DIST)) {
  const html = fs.readFileSync(file, 'utf8');
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) continue;
  const main = pick(html, /<main id="main"[^>]*>([\s\S]*?)<\/main>/);
  const url = pick(html, /<link rel="canonical" href="([^"]*)"/);
  if (!main || !url) continue;
  const title = decode(pick(html, /<title>([^<]*)<\/title>/));
  const description = decode(pick(html, /<meta name="description" content="([^"]*)"/));
  mirrorPageUrl = url;
  const body = td.turndown(main).replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  const stated = pick(main.replace(/<[^>]+>/g, ' '), /(?:Updated|Last checked|Checked)\s+(\d{4}-\d{2}-\d{2})/);
  const front = `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\nurl: ${url}\n${stated ? `updated: ${stated}\n` : ''}---\n\n`;
  fs.writeFileSync(file.replace(/index\.html$/, 'index.html.md'), `${front}${body}\n`);
  pages.push({ url, md: `${url}index.html.md`, title: title.replace(/\s*\|\s*TIMELESS Grass & Greens$/, ''), description, body });
}
if (pages.length === 0) { console.error('md-mirrors: no pages mirrored — has <main id="main"> changed?'); process.exit(1); }

/* llms.txt: what the business is, then every page by section, each pointing at its mirror */
const rel = (u) => u.replace(SITE, '');
// a town page ends in its state (/denver-metro/castle-rock-co/); a service's page for one area doesn't
const AREA = /^\/(denver-metro|grand-strand|northeast-florida)\/$/;
const LOCAL = /^\/(denver-metro|grand-strand|northeast-florida)\/[^/]+\/$/;
const TOWN = /^\/(denver-metro|grand-strand|northeast-florida)\/[a-z0-9-]+-(co|sc|nc|fl)\/$/;
const SECTIONS = [
  ['Services', (r) => r.startsWith('/services/')],
  ['Areas we work in', (r) => AREA.test(r)],
  ['Services by area', (r) => LOCAL.test(r) && !TOWN.test(r)],
  ['Towns in the Denver metro', (r) => TOWN.test(r) && r.startsWith('/denver-metro/')],
  ['Towns on the Grand Strand', (r) => TOWN.test(r) && r.startsWith('/grand-strand/')],
  ['Towns in northeast Florida', (r) => TOWN.test(r) && r.startsWith('/northeast-florida/')],
  ['Articles', (r) => r.startsWith('/blog/')],
  ['Turf planning guides', (r) => r.startsWith('/guides/')],
];
const line = (p) => `- [${p.title}](${p.md})${p.description ? `: ${p.description}` : ''}`;
const home = pages.find((p) => rel(p.url) === '/');
let llms = `# TIMELESS Grass & Greens

> We install artificial turf, pet turf, backyard putting greens, commercial turf, sports field turf, indoor facility turf and turf replacement across the Denver metro (Colorado), the Grand Strand (Shallotte, North Carolina, to Burgess, South Carolina, along the coast and inland through Loris and Conway) and northeast Florida (Jacksonville). 13 years' experience and premium American-made turf. Every estimate is free and starts with a visit to measure. Call 303-349-2368 or request an estimate at ${SITE}/estimate/.

Every page below has a Markdown copy at its own address with \`index.html.md\` appended; the links point to those copies.
${home ? `\n- [Home](${home.md}): ${home.description}\n` : ''}`;
for (const [name, test] of SECTIONS) {
  const list = pages.filter((p) => test(rel(p.url))).sort((a, b) => a.url.localeCompare(b.url));
  if (list.length) llms += `\n## ${name}\n\n${list.map(line).join('\n')}\n`;
}
llms += `\n## Optional\n\n- [Full text of every page](${SITE}/llms-full.txt): all of the Markdown copies in one file\n`;
fs.writeFileSync(path.join(DIST, 'llms.txt'), llms);

const full = pages.slice().sort((a, b) => a.url.localeCompare(b.url))
  .map((p) => `# ${p.title}\n\nSource: ${p.url}\n\n${p.body}`).join('\n\n---\n\n');
fs.writeFileSync(path.join(DIST, 'llms-full.txt'), `# TIMELESS Grass & Greens — full text\n\nUpdated ${TODAY}. ${pages.length} pages.\n\n---\n\n${full}\n`);

console.log(`md-mirrors: ${pages.length} Markdown copies, llms.txt, llms-full.txt (${Math.round(Buffer.byteLength(full) / 1024)} KB)`);
