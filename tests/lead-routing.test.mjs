import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLead, resolveArea, stateOf, phoneParts, CAMPAIGN_NAME, LEAD_TYPE } from '../netlify/functions/lib/lead-routing.mjs';
import PLACES from '../netlify/functions/lib/places.mjs';
import handler from '../netlify/functions/submission-created.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const submission = (data, extra = {}) => ({
  id: 'sub_123', form_name: 'quote', created_at: '2026-09-14T19:05:00.000Z', data: { 'form-name': 'quote', ...data }, ...extra,
});
const BASE = {
  use: 'Putting green', size: '500 to 1,500 sq ft', timeline: 'As soon as possible', town: 'Conway, SC 29526',
  name: 'Kim Test', phone: '(843) 555-0134', email: 'Kim@Example.com', 'landing-page': '/grand-strand/conway-sc/',
};
const where = (a) => [a.status, a.market];

test('every published town page is in the lead places file, and Holden Beach is not', () => {
  const have = new Set(PLACES.map(([n, s, m]) => `${n}|${s}|${m}`));
  const dir = join(root, 'src/content/towns');
  const missing = readdirSync(dir).filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')))
    .filter((t) => t.status === 'published')
    .map((t) => `${t.name}|${t.state}|${t.market}`)
    .filter((k) => !have.has(k));
  assert.deepEqual(missing, [], 'run: node scripts/build-lead-places.mjs');
  assert.ok(!PLACES.some(([n]) => n === 'Holden Beach'));
});

test('a ZIP decides the area', () => {
  const cases = [
    ['Denver 80202', 'served', 'denver-metro'],
    ['80126', 'served', 'denver-metro'],
    ['Loveland, CO 80537', 'noco', null],
    ['Greeley 80634', 'noco', null],
    ['Elizabeth CO 80107', 'edge', 'denver-metro'],
    ['Colorado Springs 80903', 'outside', null],
    ['Conway SC 29526', 'served', 'grand-strand'],
    ['Pawleys Island 29585', 'edge', 'grand-strand'],
    ['Charleston 29401', 'outside', null],
    ['Shallotte 28470', 'served', 'grand-strand'],
    ['Holden Beach 28462', 'edge', 'grand-strand'],
    ['Wilmington NC 28401', 'outside', null],
    ['Ponte Vedra Beach 32082', 'served', 'northeast-florida'],
    ['32246', 'served', 'northeast-florida'],
    ['Lake City FL 32025', 'edge', 'northeast-florida'],
    ['Tampa 33602', 'outside', null],
    ['Beverly Hills 90210', 'outside', null],
  ];
  for (const [town, status, market] of cases) assert.deepEqual(where(resolveArea({ town })), [status, market], town);
  assert.match(resolveArea({ town: '28462' }).note, /Holden Beach isn’t served/);
  assert.match(resolveArea({ town: '80537' }).note, /NoCo Turf/);
});

test('without a ZIP, the town, then the state, then the page decide', () => {
  assert.deepEqual(where(resolveArea({ town: 'Conway, SC' })), ['served', 'grand-strand']);
  assert.equal(resolveArea({ town: 'jacksonville beach' }).place, 'Jacksonville Beach');
  assert.equal(resolveArea({ town: 'Saint Augustine, FL' }).place, 'St. Augustine');
  assert.deepEqual(where(resolveArea({ town: 'Highlands Ranch Colorado' })), ['served', 'denver-metro']);
  assert.deepEqual(where(resolveArea({ town: 'Jacksonville, NC' })), ['edge', 'grand-strand'], 'not Jacksonville, Florida');
  assert.deepEqual(where(resolveArea({ town: 'Atlantic Beach', pageMarket: 'northeast-florida' })), ['served', 'northeast-florida']);
  assert.match(resolveArea({ town: 'Atlantic Beach' }).note, /more than one/);
  assert.deepEqual(where(resolveArea({ town: 'Austin, TX' })), ['outside', null]);
  assert.deepEqual(where(resolveArea({ town: 'the lake house', pageMarket: 'denver-metro' })), ['edge', 'denver-metro']);
  assert.deepEqual(where(resolveArea({ town: 'somewhere' })), ['unknown', null]);
  assert.equal(stateOf('Ocean Isle Beach, N.C.'), 'NC');
  assert.equal(stateOf('Denver co 80202'), 'CO');
  assert.equal(stateOf('Myrtle Beach'), null);
  assert.equal(stateOf('Myrtle Beach, 142 Pelican Ct'), null, 'a street ending is not Connecticut');
  assert.equal(stateOf('near me'), null);
  assert.equal(stateOf('Castle Rock in'), null);
  assert.equal(stateOf('Austin TX'), 'TX');
  assert.equal(stateOf('Portland, ME'), 'ME');
  assert.deepEqual(where(resolveArea({ town: 'Myrtle Beach, 142 Pelican Ct' })), ['served', 'grand-strand']);
});

test('phone numbers become a readable number and a dialable link', () => {
  assert.deepEqual(phoneParts('+1 (303) 349-2368'), { display: '(303) 349-2368', e164: '+13033492368' });
  assert.deepEqual(phoneParts('843.555.0134'), { display: '(843) 555-0134', e164: '+18435550134' });
});

test('a home project is classified, summarised and escaped', () => {
  const lead = buildLead(submission({ ...BASE, name: `Kim <b>"O'Neil"</b>` }));
  assert.equal(lead.leadType, LEAD_TYPE);
  assert.equal(lead.campaignName, CAMPAIGN_NAME);
  assert.equal(lead.lane, 'home');
  assert.equal(lead.market, 'grand-strand');
  assert.equal(lead.priority, 'ready-now');
  assert.equal(lead.email, 'kim@example.com');
  assert.equal(lead.phoneE164, '+18435550134');
  assert.match(lead.subject, /^Ready now · New estimate: Putting green in Conway, SC 29526 · Kim/);
  assert.equal(lead.summary, 'Putting green · 500 to 1,500 sq ft · Ready now · The Grand Strand');
  assert.ok(!lead.emailHtml.includes('<b>"O'), 'what the visitor typed never becomes markup');
  assert.match(lead.emailHtml, /Kim &lt;b&gt;&quot;O&#39;Neil&quot;&lt;\/b&gt;/);
  assert.match(lead.emailHtml, /href="tel:\+18435550134"/);
  assert.match(lead.emailHtml, /How many cups/);
  assert.match(lead.submittedLocal, /EDT/);
  assert.equal(lead.isTest, false);
});

test('commercial and indoor jobs take the bid lane, and big jobs are flagged', () => {
  const lead = buildLead(submission({ ...BASE, use: 'Commercial or sports field', timeline: 'In the next few months', town: 'Aurora, CO 80016', 'landing-page': '/services/commercial-turf/' }));
  assert.equal(lead.lane, 'bid');
  assert.equal(lead.market, 'denver-metro');
  assert.equal(lead.highValue, true);
  assert.match(lead.subject, /^Bid request: Commercial, HOA or sports in Aurora, CO 80016/);
  assert.match(lead.submittedLocal, /MDT/);
  assert.match(lead.emailHtml, /Who approves the work/);
  assert.equal(buildLead(submission({ ...BASE, use: 'Indoor turf' })).lane, 'bid');
  assert.equal(buildLead(submission({ ...BASE, size: 'Over 5,000 sq ft' })).highValue, true);
  assert.equal(buildLead(submission({ ...BASE, size: 'Under 500 sq ft' })).highValue, false);
});

test('northern Colorado, other states and unclear places take the check-the-area lane', () => {
  const noco = buildLead(submission({ ...BASE, town: 'Fort Collins 80525' }));
  assert.equal(noco.lane, 'check-area');
  assert.equal(noco.market, '');
  assert.match(noco.marketLabel, /NoCo Turf/);
  assert.match(noco.subject, /Check the area: Putting green in Fort Collins 80525/);
  assert.match(noco.emailHtml, /Where is it\?/);
  assert.equal(buildLead(submission({ ...BASE, town: 'Austin TX' })).lane, 'check-area');
  const edge = buildLead(submission({ ...BASE, town: '28462' }));
  assert.equal(edge.lane, 'home');
  assert.match(edge.areaNote, /Holden Beach/);
});

test('the page they were on fills in when the town says nothing', () => {
  assert.equal(buildLead(submission({ ...BASE, town: 'Home', market: 'northeast-florida', 'landing-page': '/blog/x/' })).market, 'northeast-florida');
  assert.equal(buildLead(submission({ ...BASE, town: 'Home', 'landing-page': '/denver-metro/aurora-co/' })).market, 'denver-metro');
});

test('attribution and the page address travel with the lead', () => {
  const lead = buildLead(submission({ ...BASE, utm_source: 'google', utm_campaign: 'turf', gclid: 'abc123', referrer: 'https://www.timelessgrass.com/grand-strand/conway-sc/' }));
  assert.equal(lead.gclid, 'abc123');
  assert.equal(lead.utm_source, 'google');
  assert.equal(lead.pageUrl, 'https://www.timelessgrass.com/grand-strand/conway-sc/');
  assert.match(lead.emailHtml, /gclid: abc123/);
});

test('a landing page that is not a path on this site never becomes the email link', () => {
  for (const bad of ['@evil.example/x', '//evil.example/', 'https://evil.example/', '/ok path']) {
    assert.equal(buildLead(submission({ ...BASE, 'landing-page': bad })).pageUrl, 'https://www.timelessgrass.com/', bad);
  }
  assert.equal(buildLead(submission({ ...BASE, referrer: 'https://evil.example/' })).pageUrl, 'https://www.timelessgrass.com/grand-strand/conway-sc/');
});

test('the honeypot and a lead with no way to reach them are dropped; a test is marked', () => {
  assert.equal(buildLead(submission({ ...BASE, company: 'Acme' })), null);
  assert.equal(buildLead(submission({ use: 'Lawn' })), null);
  assert.ok(buildLead(submission({ use: 'Lawn', phone: '3035550100' })));
  assert.match(buildLead(submission(BASE), { test: true }).subject, /^\[TEST\] /);
});

const event = (payload) => new Request('https://example.test/.netlify/functions/submission-created', { method: 'POST', body: JSON.stringify({ payload }) });

test('the Netlify event function sends the estimate form to Make, and only that form', async (t) => {
  const calls = [];
  t.mock.method(console, 'log', () => {});
  t.mock.method(globalThis, 'fetch', async (url, init) => { calls.push({ url, body: JSON.parse(init.body) }); return new Response('Accepted'); });
  const res = await handler(event(submission(BASE)));
  assert.equal(res.status, 200);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /^https:\/\/hook\.us2\.make\.com\//);
  assert.equal(calls[0].body.lane, 'home');
  assert.equal(calls[0].body.campaignName, CAMPAIGN_NAME);
  await handler(event({ ...submission(BASE), form_name: 'newsletter' }));
  assert.equal(calls.length, 1);
});

test('a refused hand-off is tried twice, then reported as a failure', async (t) => {
  let attempts = 0;
  t.mock.method(console, 'error', () => {});
  t.mock.method(globalThis, 'fetch', async () => { attempts++; return new Response('nope', { status: 500 }); });
  const res = await handler(event(submission(BASE)));
  assert.equal(res.status, 502);
  assert.equal(attempts, 2);
});
