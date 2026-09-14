/**
 * The estimate form's endpoint: POST /api/lead. No Netlify Forms (Ty).
 *
 * The form (src/components/EstimateWizard.astro) posts here directly. Each request becomes a routed
 * lead (lib/lead-routing.mjs) and goes to Make, scenario "Timeless · Website Estimate Lead", which
 * adds it to the TTM portal and emails Brian from the route for its lane.
 *
 * The wizard asks for JSON and gets { ok } back; when the hand-off fails it keeps the visitor's
 * answers on screen and offers the phone number. A browser without JavaScript posts the plain form
 * and is sent on to /thanks/, or shown a short page with the number to call. Nothing is stored here,
 * so a lead Make does not take is never silently dropped: the visitor is told to call. Failures are
 * logged without the visitor's details.
 */
import { buildLead } from './lib/lead-routing.mjs';

export const config = { path: '/api/lead' };

/* The Make webhook. TIMELESS_LEAD_WEBHOOK in the site's environment overrides it. */
const WEBHOOK = process.env.TIMELESS_LEAD_WEBHOOK || 'https://hook.us2.make.com/am805kqt9di5w34kpqjh2fave2q5uaaa';
/* The number a market's pages show (src/data/markets.ts, src/data/contact.ts). */
const PHONES = { 'grand-strand': '720-630-0108' };
const DEFAULT_PHONE = '303-349-2368';
const MAX_BODY = 20_000;
const MAX_FIELD = 2_000;

async function forward(lead) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) return true;
      console.error(`[lead] ${lead.leadId}: Make answered ${res.status} (attempt ${attempt})`);
    } catch (err) {
      console.error(`[lead] ${lead.leadId}: ${err instanceof Error ? err.message : err} (attempt ${attempt})`);
    }
  }
  return false;
}

function callUsPage(market) {
  const phone = PHONES[market] ?? DEFAULT_PHONE;
  const body = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>We couldn’t send your request | TIMELESS Grass &amp; Greens</title></head>
<body style="margin:0;background:#EFEDE7;color:#15150F;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;line-height:1.55">
<main style="max-width:34rem;margin:0 auto;padding:3rem 1.25rem">
<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:2rem;line-height:1.2">We couldn’t send your request.</h1>
<p>Call <a href="tel:+1${phone.replace(/\D/g, '')}" style="color:#307408;font-weight:600">${phone}</a> and we’ll set up your free visit.</p>
<p><a href="/estimate/" style="color:#307408">Back to the estimate form</a></p>
</main></body></html>`;
  return new Response(body, { status: 502, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

export default async (req) => {
  if (req.method !== 'POST') return new Response('POST only', { status: 405, headers: { Allow: 'POST' } });
  const wantsJson = (req.headers.get('accept') ?? '').includes('application/json');
  const accepted = () => (wantsJson
    ? Response.json({ ok: true })
    : new Response(null, { status: 303, headers: { Location: '/thanks/' } }));

  if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY) return new Response('Too large', { status: 413 });
  let data;
  try {
    data = Object.fromEntries([...(await req.formData()).entries()].map(([k, v]) => [k, String(v).slice(0, MAX_FIELD)]));
  } catch {
    return wantsJson ? Response.json({ ok: false }, { status: 400 }) : new Response('The request could not be read.', { status: 400 });
  }

  const lead = buildLead({ id: crypto.randomUUID(), created_at: new Date().toISOString(), data });
  if (!lead) {
    console.warn('[lead] not forwarded: the honeypot was filled, or there is no way to reach them');
    return accepted(); // a bot learns nothing from the answer
  }
  if (await forward(lead)) {
    console.log(`[lead] ${lead.leadId} sent to Make: ${lead.lane}, ${lead.market || lead.areaStatus}`);
    return accepted();
  }
  return wantsJson ? Response.json({ ok: false }, { status: 502 }) : callUsPage(data.market);
};
