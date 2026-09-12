#!/usr/bin/env node
/**
 * Checks town pages and market × service pages before they ship.
 *
 *   node scripts/check-local-content.mjs                 # every file, plus cross-page similarity
 *   node scripts/check-local-content.mjs <file.json>...  # just these files (no similarity check)
 *   --include-review   also validate review records; drafts and public-link rules stay unchanged
 *
 * FAIL (exit 1):
 *   - invalid publication status, unsupported territory, missing required content or sources
 *   - a number (11 and up, or with a decimal) that appears nowhere in the research the page was
 *     written from: its town record(s) in src/data/cities/, plus extra.json, guides.ts,
 *     services.ts and markets.ts for market × service pages
 *   - a link to an outside URL that is not among the sources on file
 *   - a banned phrase: the owner, unsourced claims (licensed, insured, warranty, customer reviews, best,
 *     prices), or demographics
 *   - two town pages sharing more than 25% of their five-word runs (warn above 15%)
 *   - anything the content schema would reject (lengths, counts, icons, slugs), so a writer
 *     sees it here instead of in a failed build
 * WARN: a nearby area with no page of its own. Word counts are diagnostics, not quality gates.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTENT_STATUSES, isPublished } from '../src/lib/content-policy.mjs';
import { MARKET_STATES, townEligibility } from '../src/data/service-territory.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'); // fileURLToPath: the repo path has spaces
const TOWNS_DIR = path.join(ROOT, 'src/content/towns');
const LOCAL_DIR = path.join(ROOT, 'src/content/local-services');
const read = (p) => fs.readFileSync(p, 'utf8');

const CITIES = Object.fromEntries(['denver-metro', 'grand-strand', 'northeast-florida'].flatMap((m) =>
  JSON.parse(read(path.join(ROOT, `src/data/cities/${m}.json`))).map((r) => [r.slug, r])));
const ARCHIVE_FILE = path.join(ROOT, 'src/data/editorial-research-archive.json');
// Preserve the same legacy research available before public copy was shortened. An editorial
// snapshot is not independent verification of a new claim; claim scope still needs review.
const archived = fs.existsSync(ARCHIVE_FILE) ? Object.values(JSON.parse(read(ARCHIVE_FILE)).files || {}).join('\n') : '';
const SITE_TEXT = ['src/data/extra.json', 'src/data/guides.ts', 'src/data/services.ts', 'src/data/markets.ts'].map((f) => read(path.join(ROOT, f))).join('\n') + '\n' + archived;
// a URL may carry balanced parentheses (Wikipedia's Myakka_(soil)); a ")" it didn't open is prose
const urlsIn = (s) => [...s.matchAll(/https?:\/\/[^\s"'<>\\]+/g)].map((m) => {
  let u = m[0].replace(/[.,;]+$/, '');
  while (u.endsWith(')') && u.split(')').length > u.split('(').length) u = u.slice(0, -1);
  return norm(u);
});
const EVIDENCE_FILE = path.join(ROOT, 'src/data/local-evidence.json');
const EVIDENCE_DIR = path.join(ROOT, 'src/data/local-evidence');
const LOCAL_EVIDENCE = fs.existsSync(EVIDENCE_FILE) ? JSON.parse(read(EVIDENCE_FILE)) : {};
// one file per page as well, so two writers working at once never overwrite each other
if (fs.existsSync(EVIDENCE_DIR)) for (const f of fs.readdirSync(EVIDENCE_DIR).filter((x) => x.endsWith('.json'))) {
  LOCAL_EVIDENCE[f.slice(0, -5)] = JSON.parse(read(path.join(EVIDENCE_DIR, f)));
}
const ALL_URLS = new Set(urlsIn(SITE_TEXT + JSON.stringify(Object.values(CITIES)) + JSON.stringify(LOCAL_EVIDENCE)));
function norm(u) { return u.replace(/&amp;/g, '&').replace(/[.,;]+$/, '').replace(/\/$/, ''); }

const ALWAYS = ['13', '2024', '303', '349', '2368', '3033492368'];
const BANNED = [
  /\bbrian\b/i, /\bashley\b/i, /\bour owners?\b/i, /\bthe owner\b(?! of)/i, /owner[- ]operated/i, /owned and operated/i, /family[- ]owned/i, /\bhusband\b/i, /\bwife\b/i,
  /\blicensed\b/i, /\binsured\b/i, /warrant(y|ies)/i, /guarantee/i, /\b(?:customer|client|google|yelp|online|star|our|glowing|verified) reviews?\b/i, /\breviews? (?:from|by) (?:our|happy)\b/i, /star rating/i, /\bbest\b/i, /#1\b/,
  /cheapest/i, /affordable/i, /\bnoco\b/i, /windsor/i, /we charge/i, /our price/i, /starting at/i, /\bprices? start/i,
  /we(?:'ve| have) (?:installed|done|built)/i, /our (?:customers|clients|jobs|projects)/i, /(?:projects|jobs|installs) (?:in|near) /i,
  /\b(?:household|median|average|per capita) income\b/i, /median household/i, /home values?\b/i, /retirees?/i, /affluent/i, /wealthy/i, /upscale/i, /demographic/i, /who lives/i,
];

const ICONS = new Set([...read(path.join(ROOT, 'src/components/Icon.astro')).matchAll(/^\s*['"]?([a-z][a-z-]*)['"]?\s*:\s*['"`<]/gm)].map((m) => m[1]));
const SERVICES = new Set([...read(path.join(ROOT, 'src/data/services.ts')).matchAll(/\bslug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1]));
const MARKETS = MARKET_STATES;

const words = (s) => s.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean);
const copyOf = (d) => [d.lede, ...(d.wins || []), d.answer?.answer || '', d.servicesNote || '',
  ...(d.blocks || []).flatMap((b) => [b.h2, ...b.paras]), ...(Array.isArray(d.faq) ? d.faq : []).flatMap((f) => [f?.q, f?.a])].join('\n');
const shingles = (s) => { const w = words(s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')); const set = new Set(); for (let i = 0; i + 5 <= w.length; i++) set.add(w.slice(i, i + 5).join(' ')); return set; };
const jaccard = (a, b) => { let n = 0; for (const x of a) if (b.has(x)) n++; return n / (a.size + b.size - n || 1); };

const args = process.argv.slice(2);
const includeReview = args.includes('--include-review');
const named = args.filter((a) => a !== '--include-review');
const files = named.length ? named.map((f) => path.resolve(f)) : [TOWNS_DIR, LOCAL_DIR].filter(fs.existsSync)
  .flatMap((d) => fs.readdirSync(d).filter((f) => f.endsWith('.json')).map((f) => path.join(d, f)));
const townSlugs = new Set(fs.existsSync(TOWNS_DIR) ? fs.readdirSync(TOWNS_DIR).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)) : []);
const publishedTownSlugs = new Set([...townSlugs].filter((s) => isPublished(JSON.parse(read(path.join(TOWNS_DIR, `${s}.json`))))));

let fails = 0, warns = 0;
const bodies = [];
for (const file of files) {
  const id = path.basename(file, '.json');
  const isTown = file.startsWith(TOWNS_DIR);
  const out = [];
  let d;
  try { d = JSON.parse(read(file)); } catch (e) { console.log(`x FAIL ${id}: not valid JSON (${e.message})`); fails++; continue; }
  if (d.status !== undefined && !CONTENT_STATUSES.includes(d.status)) { console.log(`x FAIL ${id}: invalid publication status`); fails++; continue; }
  if (!isPublished(d) && !(includeReview && d.status === 'review')) { console.log(`${d.status || 'draft'}  ${id} (not published)`); continue; }
  const copy = copyOf(d);
  const n = words(copy).length;

  // what src/content.config.ts would reject
  const need = (ok, msg) => { if (!ok) out.push(['FAIL', msg]); };
  need((d.title || '').length <= 70, `title is ${(d.title || '').length} characters; the limit is 70`);
  need((d.description || '').length <= 170, `description is ${(d.description || '').length} characters; the limit is 170`);
  for (const k of ['title', 'description', 'h1', 'lede', 'checked']) need(typeof d[k] === 'string' && d[k].trim(), `missing ${k}`);
  need(d.answer?.question && d.answer?.answer, 'missing answer.question or answer.answer');
  need(Array.isArray(d.wins) && d.wins.length === 3, `wins must be exactly 3 (has ${d.wins?.length ?? 0})`);
  need(Array.isArray(d.blocks) && d.blocks.length >= 1 && d.blocks.length <= 5, `blocks must be 1–5 (has ${d.blocks?.length ?? 0})`);
  for (const b of d.blocks || []) {
    need(ICONS.has(b.icon), `block icon "${b.icon}" doesn't exist`);
    need(b.kicker && b.h2 && Array.isArray(b.paras) && b.paras.length, `block "${b.h2 || b.kicker}" is missing its kicker, h2 or paras`);
  }
  need(d.faq === undefined || (Array.isArray(d.faq) && d.faq.length <= 6), `faq must have 0–6 entries when provided (has ${d.faq?.length ?? 0})`);
  for (const f of Array.isArray(d.faq) ? d.faq : []) need(typeof f?.q === 'string' && typeof f?.a === 'string', 'faq entries must contain string q and a fields');
  need(Array.isArray(d.sources) && d.sources.length >= 2, `sources must have at least 2 (has ${d.sources?.length ?? 0})`);
  need(d.publicReferences === undefined || Array.isArray(d.publicReferences), 'publicReferences must be an array when provided');
  for (const url of Array.isArray(d.publicReferences) ? d.publicReferences : []) {
    need(typeof url === 'string' && /^https?:\/\//.test(url) && (d.sources || []).some((source) => source.url === url), `public reference has no matching source: ${url}`);
  }
  need(MARKETS[d.market], `market "${d.market}" doesn't exist`);
  if (isTown) {
    const eligibility = townEligibility(id, d);
    need(eligibility.eligible, eligibility.reason);
    need(typeof d.servicesNote === 'string' && d.servicesNote.trim(), 'missing servicesNote');
    need(Array.isArray(d.services) && d.services.length >= 2 && d.services.length <= 4, `services must be 2–4 (has ${d.services?.length ?? 0})`);
    for (const s of d.services || []) need(SERVICES.has(s), `service "${s}" doesn't exist`);
    need(Array.isArray(d.nearby) && d.nearby.length >= 2 && d.nearby.length <= 6, `nearby must be 2–6 (has ${d.nearby?.length ?? 0})`);
  } else {
    need(SERVICES.has(d.service), `service "${d.service}" doesn't exist`);
    need(id === `${d.market}--${d.service}`, `file name should be ${d.market}--${d.service}.json`);
  }

  // the research this page may draw on
  let research = SITE_TEXT;
  const evidence = LOCAL_EVIDENCE[id];
  const dedicatedResearch = evidence?.intent?.trim() && evidence?.distinctValue?.trim()
    && Array.isArray(evidence.sources) && evidence.sources.length >= 2
    && evidence.sources.every((s) => typeof s.url === 'string' && /^https?:\/\//.test(s.url)
      && /^\d{4}-\d{2}-\d{2}$/.test(s.checked || '') && Array.isArray(s.supports) && s.supports.length);
  if (isTown) {
    const recs = [id, ...(d.foldedFrom || [])].map((s) => CITIES[s]).filter(Boolean);
    if (!recs.length && !dedicatedResearch && id !== 'jacksonville-fl') out.push(['FAIL', 'no legacy research or complete dedicated evidence record for this slug']);
    research = JSON.stringify(recs.length ? recs : Object.values(CITIES).filter((r) => r.market === d.market)) + '\n' + SITE_TEXT;
  } else {
    research += JSON.stringify(Object.values(CITIES).filter((r) => r.market === d.market));
  }
  research += JSON.stringify(evidence || {});
  const flat = research.replace(/(\d),(\d{3})/g, '$1$2');
  const plain = copy.replace(/<a [^>]*>|<\/a>/g, ' ').replace(/https?:\/\/\S+/g, ' ');
  const nums = [...new Set([...plain.matchAll(/\d[\d,]*(?:\.\d+)?/g)].map((m) => m[0].replace(/,/g, '')))];
  const missing = nums.filter((x) => (x.includes('.') || Number(x) >= 11) && !ALWAYS.includes(x) && !flat.includes(x));
  if (missing.length) out.push(['FAIL', `numbers not found in the research: ${missing.join(', ')}`]);

  const allowed = new Set([...(d.sources || []).map((s) => norm(s.url))]);
  const hrefs = [...copy.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  for (const h of hrefs) {
    if (h.startsWith('/')) continue;
    if (!allowed.has(norm(h))) out.push(['FAIL', `link not in this page's sources: ${h}`]);
  }
  for (const s of d.sources || []) if (!ALL_URLS.has(norm(s.url))) out.push(['FAIL', `source URL not found in the research on file: ${s.url}`]);

  const text = `${d.title} ${d.description} ${d.h1} ${copy}`.replace(/href="[^"]*"/g, ' '); // a URL's words aren't claims (a city's Architectural Review Board page)
  for (const re of BANNED) { const m = text.match(re); if (m) out.push(['FAIL', `banned phrase: "${m[0]}"`]); }
  if (isTown) for (const s of d.nearby || []) {
    if (townSlugs.has(s) && !publishedTownSlugs.has(s)) out.push(['FAIL', `nearby area points to an unpublished page: ${s}`]);
    else if (!townSlugs.has(s)) out.push(['WARN', `nearby area has no page yet: ${s}`]);
  }

  if (isTown) bodies.push({ id, sh: shingles((d.blocks || []).flatMap((b) => b.paras).join(' ') + ' ' + (Array.isArray(d.faq) ? d.faq : []).map((f) => f?.a).join(' ')) });
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
console.log(`\n${files.length} files · ${fails} fail(s) · ${warns} warning(s)`);
process.exit(fails ? 1 : 0);
