/**
 * A website estimate request, turned into what Brian needs to call it back.
 *
 * netlify/functions/submission-created.mjs hands every verified "quote" submission to
 * buildLead(). The result goes to Make (scenario "Timeless · Website Estimate Lead"), which routes
 * it by `lane`: every real lead to the TTM portal, and an email to Brian from the route for that
 * lane. Pure: no network, and no clock beyond the submission's own timestamp.
 * tests/lead-routing.test.mjs covers every branch.
 *
 * Nothing here is shown to the visitor. The email is Brian's working copy, so it can say what the
 * site never does: a lane, a priority, and where a ZIP sits against NoCo Turf's area.
 */
import PLACES from './places.mjs';

export const SITE = 'www.timelessgrass.com';
export const LEAD_TYPE = 'Website turf installation lead';
export const CAMPAIGN_NAME = 'Website — Turf Installation Lead';

export const MARKETS = {
  'denver-metro': { label: 'Denver metro', tz: 'America/Denver' },
  'grand-strand': { label: 'The Grand Strand', tz: 'America/New_York' },
  'northeast-florida': { label: 'Northeast Florida', tz: 'America/New_York' },
};

/* The wizard's first question, keyed by the exact value the form posts (EstimateWizard.astro USES).
   `lane` decides the Make route; `prep` is what to ask on the callback. */
export const SERVICES = {
  'Lawn': { label: 'Lawn', lane: 'home', prep: [
    'What is there now: grass, dirt, rock or old turf?',
    'Who uses the yard: kids, dogs, entertaining?',
    'Sprinklers to cap or reroute, and any slope or drainage trouble?',
  ] },
  'Pet turf': { label: 'Pet turf', lane: 'home', prep: [
    'How many dogs, and how big?',
    'Where do they go now, and is there a hose nearby for rinsing?',
    'Any odor or drainage problem they want solved?',
  ] },
  'Putting green': { label: 'Putting green', lane: 'home', prep: [
    'How many cups, and do they want a fringe or a chipping area?',
    'Rough size, and where in the yard: sun, slope, trees?',
    'Anything to plan around it: lighting, a patio, a fire pit?',
  ] },
  'Play area': { label: 'Play area', lane: 'home', prep: [
    'What goes over it: a play set, swings, or open play?',
    'If there is equipment, how high is the tallest platform?',
    'How much shade, and how old are the kids?',
  ] },
  'Commercial or sports field': { label: 'Commercial, HOA or sports', lane: 'bid', prep: [
    'What kind of site: HOA common area, daycare, sports field or business?',
    'Who approves the work, and is there a bid deadline or budget cycle?',
    'Is there a site plan, drawings or measurements they can send?',
  ] },
  'Indoor turf': { label: 'Indoor turf', lane: 'bid', prep: [
    'What kind of space: gym, training facility, retail or home?',
    'What floor is underneath, and how big is the area?',
    'Access for the rolls: doors, stairs, a loading bay?',
  ] },
  'Replace old turf': { label: 'Replace old turf', lane: 'home', prep: [
    'How old is the turf, and what is failing: flat, torn, smelly, draining badly?',
    'Pets on it?',
    'Who installed it? The base may need rebuilding.',
  ] },
};
const OTHER_SERVICE = { label: 'Not given', lane: 'home', prep: [
  'What are they looking to build?',
  'Roughly how big is the area?',
  'When would they like it done?',
] };

export const TIMELINES = {
  'As soon as possible': { key: 'ready-now', label: 'Ready now', line: 'They want it done as soon as possible. Call first, and text if there is no answer.' },
  'In the next few months': { key: 'planning', label: 'Next few months', line: 'Planning for the next few months. Book the free visit while it is fresh.' },
  'Just getting prices': { key: 'pricing', label: 'Comparing prices', line: 'Comparing prices. The free visit and a written price are the reason to meet.' },
};
const LARGE_SIZES = new Set(['1,500 to 5,000 sq ft', 'Over 5,000 sq ft']);

export const LANES = {
  home: { label: 'Home project', kicker: 'Website estimate request', subject: 'New estimate' },
  bid: { label: 'Commercial bid', kicker: 'Commercial bid request', subject: 'Bid request' },
  'check-area': { label: 'Check the area', kicker: 'Check the service area first', subject: 'Check the area' },
};

/* ---- where the project is -------------------------------------------------------------------
   A ZIP decides it when there is one. Otherwise a known town (places.mjs), then a state, then the
   market of the page they were on. `served` and `edge` keep the service's lane with a note;
   `noco`, `outside` and `unknown` go to the check-the-area lane. */
const STATE_MARKET = { CO: 'denver-metro', SC: 'grand-strand', NC: 'grand-strand', FL: 'northeast-florida' };
const STATE_NAMES = { CO: 'Colorado', SC: 'South Carolina', NC: 'North Carolina', FL: 'Florida' };
const US_STATES = new Set('AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'.split(' '));

const WORDLIKE_STATES = new Set('AL CT DE HI ID IN LA MA ME MO NE OH OK OR PA WY'.split(' '));

const inRanges = (n, ranges) => ranges.some(([a, b = a]) => n >= a && n <= b);
const ZIPS = {
  CO: {
    served: [[80001, 80047], [80104], [80108, 80113], [80120, 80131], [80134], [80138], [80201, 80299], [80301, 80310],
      [80401, 80403], [80419], [80433], [80437], [80439], [80453, 80454], [80457], [80465], [80516], [80544], [80601, 80603], [80640]],
    /* Fort Collins, Loveland, Windsor, Greeley, Longmont and their neighbours: NoCo Turf's side. */
    noco: [[80501, 80502], [80504], [80510, 80515], [80517], [80520, 80543], [80545, 80551], [80610], [80615], [80620],
      [80623], [80631, 80639], [80644], [80645], [80651]],
    edge: [[80000, 80699]],
  },
  SC: { served: [[29511], [29526, 29528], [29544, 29545], [29566], [29568, 29569], [29572], [29575, 29579], [29581, 29582], [29587, 29588]], edge: [[29500, 29599]] },
  NC: { served: [[28420], [28452], [28459], [28467, 28470]], edge: [[28462]] },
  FL: {
    served: [[32003], [32009], [32011], [32034, 32035], [32041], [32043], [32046], [32050], [32065], [32067, 32068], [32073],
      [32079, 32082], [32084, 32086], [32091, 32092], [32095], [32097], [32099], [32201, 32277]],
    edge: [[32000, 32199]],
  },
};
const zipState = (n) => (n >= 80000 && n <= 81699 ? 'CO' : n >= 29000 && n <= 29999 ? 'SC'
  : n >= 27000 && n <= 28999 ? 'NC' : n >= 32000 && n <= 34999 ? 'FL' : null);

function fromZip(zip) {
  const n = Number(zip);
  const state = zipState(n);
  if (!state) return { status: 'outside', market: null, via: 'zip', note: `ZIP ${zip} is outside all three service areas.` };
  const r = ZIPS[state];
  const market = STATE_MARKET[state];
  const label = MARKETS[market].label;
  if (inRanges(n, r.served)) return { status: 'served', market, via: 'zip', note: '' };
  if (r.noco && inRanges(n, r.noco)) return { status: 'noco', market: null, via: 'zip', note: `ZIP ${zip} is in northern Colorado, NoCo Turf’s area.` };
  if (inRanges(n, r.edge)) {
    return { status: 'edge', market, via: 'zip', note: n === 28462
      ? `ZIP ${zip} covers Supply and Holden Beach. Holden Beach isn’t served, so confirm the address.`
      : `ZIP ${zip} is on the edge of ${label}. Confirm it’s a trip you make.` };
  }
  return { status: 'outside', market: null, via: 'zip', note: `ZIP ${zip} is in ${STATE_NAMES[state]}, outside ${label}.` };
}

const norm = (s) => ` ${String(s).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/['’.]/g, '').replace(/\bsaint\b/g, 'st').replace(/[^a-z0-9]+/g, ' ').trim()} `;
const INDEX = PLACES
  .flatMap(([name, state, market]) => name.split(' / ').map((alias) => ({ key: norm(alias), name, state, market })))
  .sort((a, b) => b.key.length - a.key.length);

/** The state named at the end of what they typed ("Conway, SC", "Denver Colorado 80202"). */
export function stateOf(text) {
  const t = String(text).trim().replace(/[\s,.]*\d{5}(?:-\d{4})?[\s,.]*$/, '');
  const full = t.match(/(?:^|[\s,])(colorado|south carolina|north carolina|florida)\.?$/i)?.[1]?.toLowerCase();
  if (full) return { colorado: 'CO', 'south carolina': 'SC', 'north carolina': 'NC', florida: 'FL' }[full];
  /* Codes that are also everyday words or street endings ("Pelican Ct", "near me", "Castle Rock in")
     count only after a comma ("Portland, ME"). Our four states and every other code count bare. */
  const end = t.match(/(,\s*|^|\s)(colo|fla|[a-z]\.?[a-z])\.?$/i);
  if (!end) return null;
  const abbr = end[2].replace('.', '').toUpperCase();
  const code = abbr === 'COLO' ? 'CO' : abbr === 'FLA' ? 'FL' : abbr;
  if (STATE_MARKET[code]) return code;
  if (!US_STATES.has(code)) return null;
  return end[1].startsWith(',') || !WORDLIKE_STATES.has(code) ? code : null;
}

function fromTown(text, state, pageMarket) {
  const hay = norm(text);
  let hits = [];
  for (const p of INDEX) {
    if (hits.length && p.key.length < hits[0].key.length) break;
    if (hay.includes(p.key) && (!state || p.state === state)) hits.push(p);
  }
  if (!hits.length) return null;
  const pick = hits.find((p) => p.market === pageMarket) ?? hits[0];
  const ambiguous = !state && new Set(hits.map((p) => p.state)).size > 1 && pick.market !== pageMarket;
  return {
    status: 'served', market: pick.market, via: 'town', place: pick.name,
    note: ambiguous ? `“${pick.name}” is in more than one of our areas. Check the state.` : '',
  };
}

export function resolveArea({ town = '', pageMarket = null } = {}) {
  const zip = String(town).match(/\b(\d{5})(?:-\d{4})?\b/)?.[1];
  if (zip) return fromZip(zip);
  const state = stateOf(town);
  if (state && !STATE_MARKET[state]) return { status: 'outside', market: null, via: 'state', note: `${state} is outside all three service areas.` };
  const place = town ? fromTown(town, state, pageMarket) : null;
  if (place) return place;
  if (state) return { status: 'edge', market: STATE_MARKET[state], via: 'state', note: `The town isn’t one we recognise in ${STATE_NAMES[state]}. Confirm it’s in the area.` };
  if (pageMarket) return { status: 'edge', market: pageMarket, via: 'page', note: `No ZIP or state given. They were on the ${MARKETS[pageMarket].label} pages.` };
  return { status: 'unknown', market: null, via: 'none', note: 'No ZIP, state or town we recognise. Ask where the project is.' };
}

const AREA_LABELS = { noco: 'Northern Colorado (NoCo Turf’s area)', outside: 'Outside our service areas', unknown: 'Not clear yet' };

/* ---- the lead ----------------------------------------------------------------------------- */
export function phoneParts(raw) {
  const digits = String(raw ?? '').replace(/\D/g, '');
  const ten = digits.length === 11 && digits[0] === '1' ? digits.slice(1) : digits;
  if (ten.length === 10) return { display: `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`, e164: `+1${ten}` };
  return { display: String(raw ?? '').trim(), e164: digits ? `+${digits}` : '' };
}

const pageMarketOf = (field, landingPage) => {
  if (MARKETS[field]) return field;
  const seg = String(landingPage || '').split('/').filter(Boolean)[0];
  return MARKETS[seg] ? seg : null;
};

const ATTRIBUTION = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'first_referrer'];

/**
 * @param payload the Netlify submission payload: { id, created_at, form_name, data: { field: value } }
 * @param opts.test a test run: Make sends it to the agency inbox only, never to Brian or the portal
 * @returns the lead for Make, or null when it should not be forwarded (honeypot, or no way to reach them)
 */
export function buildLead(payload, { test = false } = {}) {
  const data = payload?.data ?? {};
  const f = (k) => String(data[k] ?? '').trim();
  if (f('company')) return null; // the honeypot: a person never sees that field
  const name = f('name').replace(/\s+/g, ' ');
  const phone = f('phone');
  const emailRaw = f('email');
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw) ? emailRaw.toLowerCase() : '';
  if (!name && !phone && !email) return null;

  const service = SERVICES[f('use')] ?? { ...OTHER_SERVICE, label: f('use') || OTHER_SERVICE.label };
  const timeline = TIMELINES[f('timeline')] ?? { key: 'unknown', label: f('timeline') || 'Not given', line: '' };
  const size = f('size') || 'Not given';
  const town = f('town').replace(/\s+/g, ' ');
  /* A same-site path only: a hand-made POST could otherwise point the email's page link off-site. */
  const landingPage = /^\/(?!\/)[^\s@\\]*$/.test(f('landing-page')) ? f('landing-page') : '/';
  const pageMarket = pageMarketOf(f('market'), landingPage);
  const area = resolveArea({ town, pageMarket });
  const lane = area.status === 'served' || area.status === 'edge' ? service.lane : 'check-area';
  const highValue = service.lane === 'bid' || LARGE_SIZES.has(size);
  const marketLabel = area.market ? MARKETS[area.market].label : AREA_LABELS[area.status];

  const submitted = new Date(payload?.created_at ?? Date.now());
  const tz = MARKETS[area.market ?? pageMarket ?? 'grand-strand'].tz;
  const submittedLocal = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
  }).format(submitted);

  const { display: phoneDisplay, e164: phoneE164 } = phoneParts(phone);
  const firstName = name.split(' ')[0] || '';
  const where = town || marketLabel;
  const who = name || phoneDisplay || email;
  const subject = `${test ? '[TEST] ' : ''}${timeline.key === 'ready-now' ? 'Ready now · ' : ''}${LANES[lane].subject}: ${service.label} in ${where} · ${who}`;
  const pageUrl = `https://${SITE}${landingPage}`;
  const attribution = Object.fromEntries(ATTRIBUTION.map((k) => [k, f(k)]));

  const lead = {
    source: SITE,
    leadType: LEAD_TYPE,
    campaignName: CAMPAIGN_NAME,
    isTest: Boolean(test),
    leadId: String(payload?.id ?? ''),
    submittedAt: submitted.toISOString(),
    submittedLocal,
    name, firstName, phone, phoneDisplay, phoneE164, email,
    town,
    service: f('use'), serviceLabel: service.label,
    size, highValue,
    timeline: f('timeline'), timelineLabel: timeline.label, priority: timeline.key,
    lane, laneLabel: LANES[lane].label,
    market: area.market ?? '', marketLabel, areaStatus: area.status, areaNote: area.note, place: area.place ?? '',
    landingPage, pageUrl,
    ...attribution,
    summary: [service.label, size, timeline.label, marketLabel].join(' · '),
    subject,
  };
  lead.emailHtml = renderEmail(lead, { prep: service.prep, timelineLine: timeline.line });
  return lead;
}

/* ---- the email ---------------------------------------------------------------------------
   Table layout with inline styles, because that is what Gmail, Outlook and Apple Mail all keep.
   Colours are the site's tokens (src/styles/tokens.css); fonts fall back to Georgia and the system
   sans, since mail clients do not load web fonts. Every visitor-typed value passes through esc(). */
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const C = {
  page: '#E7E4DC', card: '#F7F6F2', chalk: '#EFEDE7', dark: '#0E0E0C', green: '#16330C', accent: '#307408',
  lime: '#8ACF35', ink: '#15150F', dim: '#5E5D55', rule: '#DDD9CF', onDark: '#F2F0E8', gold: '#DEBA1F', note: '#FBF3D6',
};
const SERIF = "Georgia,'Times New Roman',serif";
const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

const micro = (text, color = C.dim) => `<p style="margin:0 0 6px;font-family:${SANS};font-size:11px;line-height:14px;font-weight:600;letter-spacing:1.8px;text-transform:uppercase;color:${color};">${text}</p>`;
const chip = (text, strong) => `<span style="display:inline-block;margin:0 6px 6px 0;padding:6px 12px;border-radius:999px;font-family:${SANS};font-size:12px;line-height:14px;font-weight:600;${strong
  ? `background:${C.lime};color:${C.dark};` : `border:1px solid rgba(242,240,232,.38);color:${C.onDark};`}">${text}</span>`;
const button = (href, text, primary) => `<a href="${href}" style="display:inline-block;margin:0 8px 10px 0;padding:13px 22px;border-radius:999px;font-family:${SANS};font-size:15px;line-height:18px;font-weight:600;text-decoration:none;${primary
  ? `background:${C.accent};color:#FFFFFF;border:1px solid ${C.accent};` : `background:transparent;color:${C.ink};border:1px solid #BDB9AE;`}">${text}</a>`;
const row = (label, value) => `<tr>
  <td valign="top" style="padding:11px 12px 11px 0;border-bottom:1px solid ${C.rule};width:34%;font-family:${SANS};font-size:13px;line-height:18px;color:${C.dim};">${label}</td>
  <td valign="top" style="padding:11px 0;border-bottom:1px solid ${C.rule};font-family:${SANS};font-size:15px;line-height:21px;color:${C.ink};word-break:break-word;">${value}</td>
</tr>`;

export function renderEmail(lead, { prep = [], timelineLine = '' } = {}) {
  const lane = LANES[lead.lane];
  const headerBg = lead.lane === 'bid' ? C.green : C.dark;
  const kickerColor = lead.lane === 'check-area' ? C.gold : C.lime;
  const first = esc(lead.firstName || 'them');
  const tel = lead.phoneE164 ? `tel:${lead.phoneE164}` : '';
  const sms = lead.phoneE164 ? `sms:${lead.phoneE164}` : '';
  const mail = lead.email ? `mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent('Your turf estimate request')}` : '';
  const preheader = esc(`${lead.name || 'Someone'} wants ${lead.serviceLabel.toLowerCase()} in ${lead.town || lead.marketLabel}. ${lead.timelineLabel}. ${lead.phoneDisplay}`);
  const trackLines = ATTRIBUTION.filter((k) => lead[k]).map((k) => `${k.replace('first_referrer', 'first referrer')}: ${esc(lead[k])}`);

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only"><title>${esc(lead.subject)}</title></head>
<body style="margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.page};">
<tr><td align="center" style="padding:24px 12px 32px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:${C.card};border-radius:14px;overflow:hidden;">
  <tr><td height="6" style="height:6px;line-height:6px;font-size:0;background:#48A008;background-image:linear-gradient(100deg,#48A008 0%,#80D028 48%,#409800 100%);">&nbsp;</td></tr>
  <tr><td style="background:${headerBg};padding:24px 28px 20px;">
    <p style="margin:0 0 18px;font-family:${SANS};font-size:11px;line-height:14px;font-weight:600;letter-spacing:2.4px;text-transform:uppercase;color:rgba(242,240,232,.66);">TIMELESS Grass &amp; Greens</p>
    ${micro(esc(lane.kicker), kickerColor)}
    <h1 style="margin:0 0 16px;font-family:${SERIF};font-size:30px;line-height:36px;font-weight:normal;color:${C.onDark};">${esc(lead.serviceLabel)}<br><span style="color:rgba(242,240,232,.7);">in ${esc(lead.town || lead.marketLabel)}</span></h1>
    <div>${chip(esc(lead.timelineLabel), lead.priority === 'ready-now')}${chip(esc(lead.size))}${chip(esc(lead.marketLabel))}${lead.highValue ? chip('High-value job') : ''}</div>
  </td></tr>
  <tr><td style="padding:26px 28px 8px;">
    ${micro('Call back')}
    <p style="margin:0 0 4px;font-family:${SERIF};font-size:26px;line-height:32px;color:${C.ink};word-break:break-word;">${esc(lead.name || 'No name given')}</p>
    ${lead.phoneDisplay ? `<p style="margin:0 0 2px;font-family:${SANS};font-size:21px;line-height:28px;font-weight:600;"><a href="${tel}" style="color:${C.ink};text-decoration:none;">${esc(lead.phoneDisplay)}</a></p>` : ''}
    ${lead.email ? `<p style="margin:0;font-family:${SANS};font-size:15px;line-height:22px;word-break:break-all;"><a href="${mail}" style="color:${C.accent};text-decoration:underline;">${esc(lead.email)}</a></p>` : ''}
  </td></tr>
  <tr><td style="padding:14px 28px 6px;">
    ${tel ? button(tel, `Call ${first}`, true) : ''}${sms ? button(sms, 'Text') : ''}${mail ? button(mail, 'Email') : ''}
  </td></tr>
  ${lead.areaNote ? `<tr><td style="padding:8px 28px 4px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.note};border-left:3px solid ${C.gold};border-radius:6px;"><tr><td style="padding:14px 16px;font-family:${SANS};font-size:14px;line-height:21px;color:${C.ink};"><strong>Where is it?</strong> ${esc(lead.areaNote)}</td></tr></table>
  </td></tr>` : ''}
  <tr><td style="padding:14px 28px 4px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${row('Project', esc(lead.serviceLabel))}
      ${row('Size', esc(lead.size))}
      ${row('Timing', esc(lead.timeline || lead.timelineLabel))}
      ${row('Location', esc(lead.town || 'Not given'))}
      ${row('Service area', esc(lead.marketLabel))}
      ${row('Route', esc(lane.label))}
    </table>
  </td></tr>
  <tr><td style="padding:20px 28px 8px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.chalk};border-left:3px solid ${C.accent};border-radius:6px;"><tr><td style="padding:18px 20px 12px;">
      ${micro('Before you call', C.accent)}
      ${timelineLine ? `<p style="margin:0 0 10px;font-family:${SANS};font-size:14px;line-height:21px;color:${C.ink};">${esc(timelineLine)}</p>` : ''}
      ${prep.map((q) => `<p style="margin:0 0 8px;padding-left:16px;text-indent:-16px;font-family:${SANS};font-size:14px;line-height:21px;color:${C.ink};">&bull;&nbsp;&nbsp;${esc(q)}</p>`).join('')}
    </td></tr></table>
  </td></tr>
  <tr><td style="padding:14px 28px 24px;">
    <p style="margin:0;font-family:${SANS};font-size:13px;line-height:20px;color:${C.dim};">This lead is also in your TTM portal under My Leads, as a ${esc(lead.campaignName)}. Mark it won or lost there once it’s decided.</p>
  </td></tr>
  <tr><td style="background:${C.chalk};border-top:1px solid ${C.rule};padding:18px 28px 22px;">
    ${micro('Lead record')}
    <p style="margin:0;font-family:${SANS};font-size:12px;line-height:19px;color:${C.dim};word-break:break-all;">
      Submitted ${esc(lead.submittedLocal)}<br>
      From the estimate form on <a href="${esc(lead.pageUrl)}" style="color:${C.dim};">${esc(lead.pageUrl.replace(/^https?:\/\//, ''))}</a><br>
      ${lead.leadId ? `Netlify submission ${esc(lead.leadId)}<br>` : ''}
      ${trackLines.join('<br>')}
    </p>
  </td></tr>
</table>
<p style="margin:16px 0 0;font-family:${SANS};font-size:12px;line-height:18px;color:${C.dim};">Sent automatically when someone asks for an estimate on timelessgrass.com.${lead.email ? ` Reply to write back to ${first}.` : ''}</p>
</td></tr>
</table>
</body></html>`;
}
