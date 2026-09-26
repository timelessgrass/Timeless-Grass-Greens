#!/usr/bin/env node
/**
 * Makes the business numbers in body copy tap-to-call.
 *
 * Every page already carries tel: links in the header, sticky bar and call buttons. The numbers also
 * appear inside sentences that come from content data (FAQ answers, the guides' answer box and prose,
 * article bodies), and there they render as plain text a phone can't dial. This wraps those, after the
 * build, so copy written later is covered too.
 *
 * - Only our own numbers: 303-349-2368, and 720-630-0108 for the Grand Strand. Town halls, utilities and
 *   HOA offices quoted as sources stay plain text; they are citations, not calls we want.
 * - Text between tags only. Attributes (meta descriptions carry the number), head, scripts and JSON-LD are
 *   never touched, and nothing already inside a link, button or form control is wrapped again.
 * - The href is the digits alone, the same form as src/data/brief.ts and contact.ts, so check-entity's
 *   PHONE-1 and the Grand Strand tel: test see one consistent number.
 * - No data-cta: check-consistency's CTA-1 keeps that attribute for styled controls, and an inline number
 *   is a plain link.
 *
 * Runs as part of `npm run build`, after astro build and before the mirrors and checks read dist/.
 * Adapted from the Timeless Grass Restoration site's scripts/link-phones.mjs.
 */
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = process.argv[2] || 'dist';
const OURS = ['303-349-2368', '720-630-0108'];
/* The lookarounds refuse ten digits inside a longer run: the Facebook profile id 61556909127385 contains
   615-569-0912's digits, and a crawler once read it as a second phone number. */
const PHONE = /(?<!\d)\(?\d{3}\)?[\s.‑-]?\d{3}[\s.‑-]?\d{4}(?!\d)/g;
const digits = (s) => s.replace(/\D/g, '');
const HREF = new Map(OURS.map((n) => [digits(n), `tel:${digits(n)}`]));
const SKIP = new Set(['a', 'script', 'style', 'title', 'head', 'textarea', 'option', 'button', 'select', 'noscript']);

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

let linked = 0, touched = 0;
for (const file of walk(DIST).filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  let out = '', i = 0, depth = 0, changed = 0;
  const rewrite = (text) => {
    if (depth > 0 || !/\d/.test(text)) return text;
    return text.replace(PHONE, (m) => {
      const href = HREF.get(digits(m));
      if (!href) return m;
      changed++;
      return `<a href="${href}">${m}</a>`;
    });
  };
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt < 0) { out += rewrite(html.slice(i)); break; }
    out += rewrite(html.slice(i, lt));
    if (html.startsWith('<!--', lt)) {
      const end = html.indexOf('-->', lt);
      const stop = end < 0 ? html.length : end + 3;
      out += html.slice(lt, stop); i = stop; continue;
    }
    const gt = html.indexOf('>', lt);
    if (gt < 0) { out += html.slice(lt); break; }
    const tag = html.slice(lt, gt + 1);
    const name = (tag.match(/^<\/?\s*([a-zA-Z0-9-]+)/) || [])[1]?.toLowerCase();
    if (name && SKIP.has(name)) {
      if (tag.startsWith('</')) depth = Math.max(0, depth - 1);
      else if (!tag.endsWith('/>')) depth++;
    }
    out += tag;
    i = gt + 1;
  }
  if (changed) { writeFileSync(file, out); linked += changed; touched++; }
}
console.log(`phones: ${linked} number(s) made tap-to-call across ${touched} page(s)`);
