/**
 * Netlify runs this on every verified form submission: the filename is the event
 * (docs.netlify.com/build/functions/trigger-on-events, "Legacy filename convention").
 *
 * The estimate form ("quote", src/components/EstimateWizard.astro) becomes a routed lead
 * (lib/lead-routing.mjs) and goes to Make, scenario "Timeless · Website Estimate Lead", which adds
 * it to the TTM portal and emails Brian from the route for its lane. Netlify has already stored
 * the submission and filtered spam before this runs, so a failure here loses nothing: the lead is
 * still under Forms in the Netlify dashboard. Failures are logged without the visitor's details.
 */
import { buildLead } from './lib/lead-routing.mjs';

/* The Make webhook. TIMELESS_LEAD_WEBHOOK in the site's environment overrides it, so the lead can
   be pointed at another scenario without a code change. */
const WEBHOOK = process.env.TIMELESS_LEAD_WEBHOOK || 'https://hook.us2.make.com/am805kqt9di5w34kpqjh2fave2q5uaaa';

export default async (req) => {
  let payload;
  try {
    ({ payload } = await req.json());
  } catch {
    console.error('[lead] the event body did not parse');
    return new Response('unreadable event', { status: 400 });
  }
  if (payload?.form_name !== 'quote') return new Response('not the estimate form');

  const lead = buildLead(payload);
  if (!lead) {
    console.warn(`[lead] ${payload.id}: no way to reach them, or the honeypot was filled; not forwarded`);
    return new Response('not forwarded');
  }

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        console.log(`[lead] ${lead.leadId} sent to Make: ${lead.lane}, ${lead.market || lead.areaStatus}`);
        return new Response('sent');
      }
      console.error(`[lead] ${lead.leadId}: Make answered ${res.status} (attempt ${attempt})`);
    } catch (err) {
      console.error(`[lead] ${lead.leadId}: ${err instanceof Error ? err.message : err} (attempt ${attempt})`);
    }
  }
  return new Response('Make did not accept the lead', { status: 502 });
};
