#!/usr/bin/env node
/**
 * Checks the articles in src/content/blog/ before they ship.
 *
 *   node scripts/check-articles.mjs               # every article, plus cross-article similarity
 *   node scripts/check-articles.mjs <file.md>...  # just these files (no similarity check)
 *   --urls        also fetch every outside link the articles cite and report dead ones
 *   --urls=all    the same, plus every source on the town and area-service pages
 *   --include-review   also validate review records; drafts and public-link rules stay unchanged
 *
 * FAIL (exit 1):
 *   - invalid publication status, missing article body or short answer
 *   - fewer than 2 sources, or an outside link in the text that is not among the sources
 *   - a link to a page of ours that doesn't exist, or a `related` slug that doesn't exist
 *   - a banned phrase: the owner, claims we can't back (we've installed, cheapest, affordable),
 *     demographics, self-congratulating honesty, or a phone number that isn't ours
 *   - two articles sharing more than 25% of their five-word runs (warn above 15%)
 *   - with --urls: an outside link that answers 404, 410 or 5xx
 * WARN (read each one by hand): dollar figures, "licensed", "insured", "warranty", "guarantee",
 *   "review", "best", "owner", or a body over 1,600 words. Archived sources do not need public links.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { CONTENT_STATUSES, isPublished } from '../src/lib/content-policy.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'); // fileURLToPath: the repo path has spaces
const BLOG = path.join(ROOT, 'src/content/blog');
const LOCAL = [['src/content/towns', ''], ['src/content/local-services', 'service']];
const read = (p) => fs.readFileSync(p, 'utf8');
const norm = (u) => u.replace(/&amp;/g, '&').replace(/[.,;]+$/, '').replace(/\/$/, '');
const ids = (dir, ext) => (fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(ext)).map((f) => f.slice(0, -ext.length)) : []);
const slugsIn = (f) => new Set([...read(path.join(ROOT, f)).matchAll(/['"]?\bslug['"]?\s*:\s*['"]([a-z0-9-]+)['"]/g)].map((m) => m[1]));
const json = (p) => { try { return JSON.parse(read(p)); } catch { return null; } };
const frontmatter = (p) => { try { return yaml.load(read(p).match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || ''); } catch { return null; } };

const SERVICES = slugsIn('src/data/services.ts');
const GUIDES = slugsIn('src/data/guides.ts');
const MARKETS = new Set(['denver-metro', 'grand-strand', 'northeast-florida']);
const ROUTES = new Set(['/', '/estimate/', '/blog/', '/guides/', '/services/',
  ...[...SERVICES].map((s) => `/services/${s}/`), ...[...GUIDES].map((g) => `/guides/${g}/`),
  ...[...MARKETS].map((m) => `/${m}/`), ...ids(BLOG, '.md').filter((p) => isPublished(frontmatter(path.join(BLOG, `${p}.md`)))).map((p) => `/blog/${p}/`)]);
for (const [dir, key] of LOCAL) for (const id of ids(path.join(ROOT, dir), '.json')) {
  const d = json(path.join(ROOT, dir, `${id}.json`));
  if (isPublished(d)) ROUTES.add(`/${d.market}/${key ? d[key] : id}/`);
}

const FAIL = [
  /\bbrian\b/i, /\bashley\b/i, /family[- ]owned/i, /\bfounders?\b/i, /\bnoco\b/i, /windsor/i,
  /cheapest/i, /affordable/i, /#1\b/, /\bnumber one\b/i, /we charge/i, /our prices?\b/i, /starting at \$/i,
  /we(?:'ve|’ve| have) (?:installed|done|built|completed)/i, /our (?:customers|clients)\b/i,
  /\b(?:hundreds|thousands) of (?:yards|lawns|installs|installations|projects|customers|clients)\b/i,
  /\b(?:household|median|average|per capita) income\b/i, /home values?\b/i, /retirees?\b/i, /affluent/i, /wealthy/i, /upscale/i, /demographic/i,
  /won['’]t pretend/i, /honest answer/i, /to be honest/i, /\bhonestly\b/i, /let['’]s be honest/i,
];
const WARN = [
  /\$\s?\d[\d,.]*/g, /\blicensed\b/gi, /\binsured\b/gi, /warrant(?:y|ies)/gi, /guarantee/gi, /(?<!\d{4} |systematic )\breviews?\b/gi, /\bbest\b/gi,
  /\bowners?\b/gi,
];

const words = (s) => s.split(/\s+/).filter(Boolean);
const plain = (md) => md.replace(/```[\s\S]*?```/g, ' ').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/<[^>]+>/g, ' ')
  .replace(/^\s{0,3}(?:#{1,6}|[-*+]|\d+\.|>)\s+/gm, '').replace(/[*_`]/g, '');
const ctx = (s, i, len) => s.slice(Math.max(0, i - 55), i + len + 55).replace(/\s+/g, ' ').trim();
const shingles = (s) => { const w = words(s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')); const set = new Set(); for (let i = 0; i + 5 <= w.length; i++) set.add(w.slice(i, i + 5).join(' ')); return set; };
const jaccard = (a, b) => { let n = 0; for (const x of a) if (b.has(x)) n++; return n / (a.size + b.size - n || 1); };

const args = process.argv.slice(2);
const urlMode = args.find((a) => a.startsWith('--urls'));
const includeReview = args.includes('--include-review');
const named = args.filter((a) => !a.startsWith('--'));
const files = named.length ? named.map((f) => path.resolve(f)) : ids(BLOG, '.md').map((id) => path.join(BLOG, `${id}.md`));

let fails = 0, warns = 0;
const bodies = [];
const external = new Map(); // url -> the pages that cite it
const cite = (u, id) => (external.get(u) || external.set(u, []).get(u)).push(id);

for (const file of files) {
  const id = path.basename(file, '.md');
  const out = [];
  const src = read(file);
  const fmMatch = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  let fm = null;
  try { fm = fmMatch && yaml.load(fmMatch[1]); } catch (e) { console.log(`x FAIL ${id}: frontmatter is not valid YAML (${e.message.split('\n')[0]})`); fails++; continue; }
  if (!fm) { console.log(`x FAIL ${id}: no frontmatter`); fails++; continue; }
  if (fm.status !== undefined && !CONTENT_STATUSES.includes(fm.status)) { console.log(`x FAIL ${id}: invalid publication status`); fails++; continue; }
  if (!isPublished(fm) && !(includeReview && fm.status === 'review')) { console.log(`${fm.status || 'draft'}  ${id} (not published)`); continue; }
  const body = src.slice(fmMatch[0].length);
  const faqText = (Array.isArray(fm.faq) ? fm.faq : []).map((f) => `${f?.q}\n${f?.a}`).join('\n');
  const everything = [fm.title, fm.description, fm.h1, fm.answer?.question, fm.answer?.answer, faqText, body].join('\n');

  // the page's own words: the body, plus the short answer and the FAQ answers it carries
  const n = words(plain(body)).length;
  if (!n || !fm.answer?.question?.trim() || !fm.answer?.answer?.trim()) out.push(['FAIL', 'Article body and short answer are required.']);
  if (fm.faq !== undefined && !Array.isArray(fm.faq)) out.push(['FAIL', 'faq must be an array when provided']);
  for (const f of Array.isArray(fm.faq) ? fm.faq : []) if (typeof f?.q !== 'string' || typeof f?.a !== 'string') out.push(['FAIL', 'faq entries must contain string q and a fields']);
  if ((fm.title || '').length > 70) out.push(['FAIL', `title is ${fm.title.length} characters; the limit is 70`]);
  if (!/\| TIMELESS Grass & Greens$/.test(fm.title || '')) out.push(['WARN', 'title does not end "| TIMELESS Grass & Greens"']);
  if ((fm.description || '').length > 170) out.push(['FAIL', `description is ${fm.description.length} characters; the limit is 170`]);

  // Public links must have evidence. Retained internal evidence need not appear in the prose.
  const sources = fm.sources || [];
  if (sources.length < 2) out.push(['FAIL', `${sources.length} source(s); the minimum is 2`]);
  const listed = new Set(sources.map((s) => norm(s.url)));
  const linked = [...everything.matchAll(/\]\((https?:\/\/(?:[^()\s]|\([^()\s]*\))+)\)|href="(https?:\/\/[^"]+)"/g)].map((x) => x[1] || x[2]);
  for (const u of new Set(linked)) if (!listed.has(norm(u))) out.push(['FAIL', `outside link not among the sources: ${u}`]);
  if (fm.publicReferences !== undefined && !Array.isArray(fm.publicReferences)) out.push(['FAIL', 'publicReferences must be an array when provided']);
  for (const url of Array.isArray(fm.publicReferences) ? fm.publicReferences : []) {
    if (typeof url !== 'string' || !/^https?:\/\//.test(url) || !sources.some((source) => source.url === url)) out.push(['FAIL', `public reference has no matching source: ${url}`]);
  }
  for (const s of sources) {
    cite(s.url, id);
    if (!s.checked) out.push(['WARN', `source has no checked date: ${s.url}`]);
  }

  // links to our own pages
  const internal = [...everything.matchAll(/\]\((\/[^)\s]*)\)|href="(\/[^"]*)"/g)].map((x) => (x[1] || x[2]).replace(/[#?].*$/, ''));
  for (const h of new Set(internal)) {
    if (!h.endsWith('/')) out.push(['FAIL', `link without its trailing slash: ${h}`]);
    else if (!ROUTES.has(h)) out.push(['FAIL', `link to a page of ours that doesn't exist: ${h}`]);
  }
  if (!internal.length) out.push(['WARN', 'no links to our own pages']);
  const rel = fm.related || {};
  for (const s of rel.services || []) if (!SERVICES.has(s)) out.push(['FAIL', `related service doesn't exist: ${s}`]);
  for (const s of rel.markets || []) if (!MARKETS.has(s)) out.push(['FAIL', `related market doesn't exist: ${s}`]);
  for (const s of rel.guides || []) if (!GUIDES.has(s)) out.push(['FAIL', `related guide doesn't exist: ${s}`]);

  // phrases, read without the URLs
  const text = everything.replace(/https?:\/\/[^\s)"]+/g, ' ');
  for (const p of text.matchAll(/\(?\b\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b/g)) if (p[0].replace(/\D/g, '') !== '3033492368') out.push(['FAIL', `a phone number that isn't ours: ${p[0]}`]);
  for (const re of FAIL) { const x = text.match(re); if (x) out.push(['FAIL', `banned phrase "${x[0]}": …${ctx(text, x.index, x[0].length)}…`]); }
  for (const re of WARN) {
    const hits = [...text.matchAll(re)];
    for (const x of hits.slice(0, 4)) out.push(['WARN', `"${x[0]}": …${ctx(text, x.index, x[0].length)}…`]);
    if (hits.length > 4) out.push(['WARN', `…and ${hits.length - 4} more like "${hits[4][0]}"`]);
  }

  bodies.push({ id, sh: shingles(plain(body)) });
  const f = out.filter((o) => o[0] === 'FAIL').length, w = out.length - f;
  fails += f; warns += w;
  console.log(`${f ? 'x FAIL' : w ? '! WARN' : 'ok    '} ${id} (${n} words)`);
  for (const [lvl, msg] of out) console.log(`     ${lvl === 'FAIL' ? 'x' : '!'} ${msg}`);
}

if (!named.length) {
  for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
    const s = jaccard(bodies[i].sh, bodies[j].sh);
    if (s > 0.25) { console.log(`x FAIL similarity ${bodies[i].id} ~ ${bodies[j].id}: ${(s * 100).toFixed(1)}%`); fails++; }
    else if (s > 0.15) { console.log(`! WARN similarity ${bodies[i].id} ~ ${bodies[j].id}: ${(s * 100).toFixed(1)}%`); warns++; }
  }
}

if (urlMode) {
  if (urlMode === '--urls=all') for (const [dir] of LOCAL) for (const id of ids(path.join(ROOT, dir), '.json')) {
    const d = json(path.join(ROOT, dir, `${id}.json`));
    if (isPublished(d) || (includeReview && d?.status === 'review')) for (const s of d.sources || []) cite(s.url, id);
  }
  const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
  const probe = async (u) => {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 20000);
    try {
      const r = await fetch(u, { redirect: 'follow', signal: ctl.signal, headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8' } });
      r.body?.cancel().catch(() => {});
      return r.status;
    } catch (e) { return e.name === 'AbortError' ? 'timeout' : e.cause?.code || e.message; }
    finally { clearTimeout(t); }
  };
  const urls = [...external.keys()];
  console.log(`\nOutside links: ${urls.length}`);
  for (let i = 0; i < urls.length; i += 8) {
    for (const [u, s] of await Promise.all(urls.slice(i, i + 8).map(async (u) => [u, await probe(u)]))) {
      if (typeof s === 'number' && s < 400) continue;
      const dead = s === 404 || s === 410 || (typeof s === 'number' && s >= 500);
      if (dead) fails++; else warns++;
      console.log(`${dead ? 'x DEAD' : '! CHECK BY HAND'} ${s}  ${u}\n       cited by: ${[...new Set(external.get(u))].join(', ')}`);
    }
  }
}

console.log(`\n${files.length} files · ${fails} fail(s) · ${warns} warning(s)`);
process.exit(fails ? 1 : 0);
