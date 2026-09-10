/**
 * The three markets, and the copy for each market page (src/pages/[market]/index.astro).
 *
 * URL scheme (fixed, never mixed): /{market}/ · /{market}/{town-st}/
 * Market slugs carry no state token. If town pages ever ship, the state suffix rides on the TOWN
 * (Atlantic Beach exists in both SC and FL).
 *
 * Places: only those the client named on the discovery call or listed on his old site. A town he
 * did not name is a claim about the business, so it stays off. Local rules come from the cited
 * research in guides.ts and extra.json; every one in an answer carries its source link. Written
 * to the same test as the rest of the site: would a homeowner care?
 */
export type Market = {
  slug: 'grand-strand' | 'denver-metro' | 'northeast-florida';
  name: string;
  short: string;
  /** The short list for compact rows (homepage, service pages, the ticker). */
  towns: string[];
  /** Every place named on the call or on the old site, for the market page. Nothing else. */
  places: string[];
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lede: string;
  wins: string[];
  /** Shot id from shotlist.ts. Our work, never captioned as this market: no photo's location is on file. */
  heroShot: string;
  whyHeading: string;
  why: { icon: string; h: string; p: string; guide?: { slug: string; label: string } }[];
  /** Service slugs, in the order this market asks for them. */
  services: string[];
  svcHeading: string;
  work: string[];
  faqHeading: string;
  /** Answers may hold source links; they render with set:html and feed FAQPage. */
  faq: { q: string; a: string }[];
  /** The rules that govern THIS market, linked from its body so the guides tier is reachable. */
  guides: { slug: string; anchor: string }[];
  /** The "where we work" headline: the two ends of the area, both places the client named. */
  reach: string;
  /** The offer panel's headline. */
  close: string;
  answer: { question: string; answer: string };
  /** Where to centre the service-area map. A region, never an address — we do not have one. */
  map: { query: string; zoom: number };
  /** Does a verified GBP back this market? Drives whether a LocalBusiness node emits. */
  gbp: { verified: boolean; id: string | null };
};

const P = '303-349-2368';
const src = (href: string, label: string) => `<a href="${href}" target="_blank" rel="nofollow noopener">${label}</a>`;

const U = {
  sb24: src('https://content.leg.colorado.gov/sites/default/files/2024a_005_signed.pdf', 'SB24-005'),
  hb25: src('https://content.leg.colorado.gov/sites/default/files/2025a_1113_signed.pdf', 'HB25-1113'),
  crs126: src('https://codes.findlaw.com/co/title-37-water-and-irrigation/co-rev-st-sect-37-60-126/', 'C.R.S. 37-60-126'),
  sb23: src('https://content.leg.colorado.gov/sites/default/files/2023a_178_signed.pdf', 'SB23-178'),
  denverWater: src('https://www.denverwater.org/tap/ditching-useless-turf-coloradoscape-we-can-help', 'Denver Water'),
  denverRules: src('https://www.denverwater.org/residential/rebates-and-conservation-tips/summer-watering-rules', 'Denver Water’s 2026 Stage 1 drought rules'),
  thornton: src('https://www.thorntonwater.com/wp-content/uploads/2026/02/2026-residential_artificial_turf_info__rules-1.pdf', 'Thornton Water'),
  cgs: src('https://coloradogeologicalsurvey.org/hazards/expansive-soil-rock/', 'Colorado Geological Survey'),
  leon: src('https://soilseries.sc.egov.usda.gov/OSD_Docs/L/LEON.html', 'USDA'),
  horryCode: src('https://library.municode.com/sc/horry_county/codes/code_of_ordinances?nodeId=COOR_CH17.7STMA_ARTIISTUTFE_S17.7-16DE', 'Horry County code'),
  horrySw: src('https://www.horrycountysc.gov/media/4wqkxbxg/horry-county-sw-design-manual_rev2024.pdf', 'Horry County'),
  gswsa: src('https://www.gswsa.com/Community.cfm?page=35', 'Grand Strand Water and Sewer Authority'),
  ccua: src('https://clayutility.org/residents-business/irrigation-information/', 'Clay County Utility Authority'),
  sjc: src('https://www.sjcfl.us/protect-our-water/', 'St. Johns County'),
  fl720: src('https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&amp;Search_String=&amp;URL=0700-0799/0720/Sections/0720.3045.html', 'Fla. Stat. 720.3045'),
  fl125: src('https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&amp;Search_String=&amp;URL=0100-0199%2F0125%2FSections%2F0125.572.html', 'Fla. Stat. 125.572'),
  flRule: src('https://www.flrules.org/gateway/ruleNo.asp?id=62-308.100', 'DEP Rule 62-308.100'),
  dep: src('https://floridadep.gov/sites/default/files/SyntheticTurfFAQ%20final.pdf', 'DEP'),
};

export const MARKETS: Market[] = [
  {
    slug: 'grand-strand',
    name: 'The Grand Strand',
    short: 'Grand Strand',
    towns: ['North Myrtle Beach', 'Carolina Forest', 'Loris', 'Longs'], // the call, 00:28:21–24 ("Loras" in the transcript)
    places: ['Myrtle Beach', 'North Myrtle Beach', 'Carolina Forest', 'Longs', 'Loris'], // + Myrtle Beach, the market he names throughout (00:36:25, 00:46:21)
    title: 'Artificial Turf in Myrtle Beach | TIMELESS Grass & Greens',
    description: `Artificial turf, pet turf, putting greens and sports fields across the Grand Strand, from Loris and Longs to Myrtle Beach and Carolina Forest. Free estimates: call ${P}.`,
    eyebrow: 'The Grand Strand',
    h1: 'Turf that drains after a Grand Strand downpour.',
    lede: 'Artificial turf, pet turf, putting greens and sports fields from Loris and Longs to Myrtle Beach, on a base built to drain.',
    wins: ['No mud after the rain, no mowing in the heat', 'Pet turf that rinses clean with a hose', 'Sports fields and commercial grounds, too'],
    heroShot: 'fin-4',
    whyHeading: 'Made for rain, pets and game days.',
    why: [
      { icon: 'drop', h: 'Built to drain', p: 'A lot of ground here is sandy but slow to drain, with the water table close to the surface. We build the base so rain drains through and away.', guide: { slug: 'is-artificial-turf-impervious', label: 'Is turf impervious?' } },
      { icon: 'paw', h: 'Easy on paws', p: 'Pet turf drains when the dog goes and rinses clean with a hose. No more mud at the back door.' },
      { icon: 'trophy', h: 'Fields that stay playable', p: 'Ball fields, practice areas and school grounds, with no mud and no bare patches.' },
      { icon: 'building', h: 'Grounds that stay green', p: 'Daycares, pet daycares and HOA common areas that stay green without a maintenance crew.' },
    ],
    services: ['residential-turf', 'sports-field-turf', 'commercial-turf', 'pet-turf', 'putting-greens', 'turf-removal-and-replacement', 'indoor-turf'],
    svcHeading: 'Anything that’s turf, across the Strand.',
    work: ['fin-4', 'ctx-1', 'fin-3', 'fin-8', 'fin-2', 'det-2'],
    faqHeading: 'Questions about turf on the Grand Strand.',
    faq: [
      { q: 'Will artificial turf drain on my lot?',
        a: `Yes, if the base is built for the ground under it. Soils like Leon sand, found in Horry County, are poorly drained, with the water table close to the surface for part of the year (${U.leon}). We build the base to move water through and away.` },
      { q: 'Does turf count as impervious surface in Horry County?',
        a: `Nothing in the ${U.horryCode}, or in the Myrtle Beach and North Myrtle Beach codes, names artificial turf either way. If your lot has a coverage limit, ask the county or your HOA before you build.` },
      { q: 'Are there rebates for artificial turf here?',
        a: `No. The ${U.gswsa} has no turf or landscape rebate, and the Horry County, Myrtle Beach and North Myrtle Beach codes carry none either.` },
      { q: 'Do I need a permit to put turf in my back yard?',
        a: `Usually not from the county. ${U.horrySw} requires a stormwater permit when half an acre or more is disturbed, which catches sports fields rather than back yards. Your HOA may still want to see the plan.` },
      { q: 'Do you install sports fields and commercial turf?',
        a: 'Yes: <a href="/services/sports-field-turf/">sports field turf</a> for ball fields, practice areas and schools, and <a href="/services/commercial-turf/">commercial turf</a> for daycares, pet daycares and HOA common areas.' },
    ],
    guides: [
      { slug: 'no-turf-rebates-grand-strand', anchor: 'Why there are no turf rebates in Horry County' },
      { slug: 'is-artificial-turf-impervious', anchor: 'Is artificial turf impervious?' },
      { slug: 'nc-vs-sc-built-upon-area', anchor: 'Built-upon area: North Carolina against South Carolina' },
      { slug: 'turf-installer-licensing-by-state', anchor: 'What license a turf installer needs' },
    ],
    reach: 'From Loris to Carolina Forest.',
    close: 'Stop mowing it. Start using it.',
    answer: {
      question: 'Who installs artificial turf and putting greens on the Grand Strand?',
      answer: 'We install artificial turf, pet turf, putting greens and sports field turf across the Grand Strand.',
    },
    map: { query: 'Myrtle Beach, South Carolina', zoom: 9 },
    gbp: { verified: true, id: '13971044913229673568' },
  },
  {
    slug: 'denver-metro',
    name: 'Denver Metro',
    short: 'Denver',
    towns: ['Denver', 'Aurora', 'Westminster', 'Lakewood', 'Broomfield', 'Thornton'], // old site, "Do you serve my area?"
    // old site (above), plus the call, 00:31:12–00:32:11 ("Eerie", "Lewisville" and "Ken Carl" in the transcript)
    places: ['Denver', 'Aurora', 'Lakewood', 'Westminster', 'Thornton', 'Broomfield', 'Brighton', 'Erie', 'Lafayette', 'Louisville', 'Superior', 'Boulder', 'Golden', 'Ken Caryl', 'Highlands Ranch', 'Castle Pines', 'Castle Rock'],
    title: 'Artificial Turf in Denver | TIMELESS Grass & Greens',
    description: `Artificial turf, pet turf and backyard putting greens across the Denver metro, from Erie and Boulder to Castle Rock. Free estimates: call ${P}.`,
    eyebrow: 'Denver metro',
    h1: 'Green all year, even on Denver clay.',
    lede: 'Artificial turf, pet turf and backyard putting greens from Erie and Boulder to Castle Rock, on a base built for the ground under your yard.',
    wins: ['No mowing, no watering days, no brown patches', 'A base built for clay, so the surface stays flat', 'Putting greens with real break, a fringe and as many cups as you want'],
    heroShot: 'fin-6',
    whyHeading: 'Made for Denver ground and Denver rules.',
    why: [
      { icon: 'shovel', h: 'Stays flat on clay', p: 'Much of the metro sits on clay that swells when it gets wet. We build the base for it, so the surface stays level.' },
      { icon: 'drop', h: 'Off the watering schedule', p: 'Lawn watering here runs on set days and hours. Turf never needs it.', guide: { slug: 'colorado-water-rebates-and-turf', label: 'Water rules and rebates' } },
      { icon: 'home', h: 'Your HOA can’t ban it out back', p: 'Colorado law bars HOA rules that prohibit nonvegetative turf in a back yard.', guide: { slug: 'colorado-hoa-turf-rules', label: 'What an HOA can and can’t stop' } },
      { icon: 'shield', h: 'Legal at home', p: 'Colorado’s turf law covers new commercial and HOA common-area projects, not single-family yards.', guide: { slug: 'colorado-turf-law', label: 'Colorado’s turf law' } },
    ],
    services: ['putting-greens', 'residential-turf', 'pet-turf', 'commercial-turf', 'sports-field-turf', 'indoor-turf', 'turf-removal-and-replacement'],
    svcHeading: 'Anything that’s turf, across the metro.',
    work: ['fin-6', 'fin-1', 'fin-5', 'fin-7', 'fin-2', 'det-1'],
    faqHeading: 'Questions about turf in Denver.',
    faq: [
      { q: 'Is artificial turf legal in Colorado?',
        a: `Yes. Colorado’s turf law (${U.sb24}, as amended by ${U.hb25}) stops local governments allowing non-functional turf in new commercial, institutional and HOA common-area projects. Single-family yards aren’t covered by state law, and putting greens count as functional turf. Your town can still set its own rules, so check before you build.` },
      { q: 'Can my HOA ban artificial turf in my back yard?',
        a: `Not with a flat ban. Under ${U.crs126}, an HOA rule that prohibits nonvegetative turf in a back yard is unenforceable, and ${U.sb23} says design guidelines for detached homes can’t prohibit it there. Front yards can be treated differently, so send your plan to the board in writing.` },
      { q: 'Will my water provider give me a rebate for artificial turf?',
        a: `Probably not. ${U.denverWater}, Aurora Water, Castle Rock Water, Erie and Centennial Water in Highlands Ranch all leave artificial turf out of their rebates. ${U.thornton} is the exception: up to $2 a square foot on qualifying single-family projects, with a permit first.` },
      { q: 'Will turf stay flat on clay soil?',
        a: `Yes, when the base is built for it. The ${U.cgs} says swelling clay underlies all the major cities on the Front Range, so we prepare the ground and build the base for your soil before the turf goes down.` },
      { q: 'When can I water a lawn in Denver?',
        a: `Only on set days and hours. ${U.denverRules} allow two assigned days a week, before 10 a.m. or after 6 p.m., and lawn watering ends for the season after 30 September. Turf needs none of it.` },
    ],
    guides: [
      { slug: 'colorado-turf-law', anchor: "Colorado's turf law: SB24-005 as amended by HB25-1113" },
      { slug: 'colorado-water-rebates-and-turf', anchor: 'Denver-metro water rebates and artificial turf' },
      { slug: 'colorado-hoa-turf-rules', anchor: 'What a Colorado HOA board can and cannot stop' },
      { slug: 'turf-installer-licensing-by-state', anchor: 'What license a turf installer needs' },
    ],
    reach: 'From Erie to Castle Rock.',
    close: 'Stop watering it. Start using it.',
    answer: {
      question: 'Who installs artificial turf and putting greens in the Denver metro?',
      answer: 'We install artificial turf, pet turf and backyard putting greens across the Denver metro.',
    },
    map: { query: 'Denver, Colorado', zoom: 9 },
    gbp: { verified: true, id: '05426208594558680150' },
  },
  {
    slug: 'northeast-florida',
    name: 'Northeast Florida',
    short: 'Jacksonville',
    towns: ['Jacksonville', 'Jacksonville Beach', 'Ponte Vedra', 'Fernandina Beach'], // the call, 00:38:41 / 00:39:50
    // the call, 00:38:35–00:40:12: from Fernandina Beach and Yulee out to Fleming Island, Lakeside, Middleburg and
    // Baldwin, down to St. Augustine Shores, with Atlantic Beach, Jacksonville Beach and Ponte Vedra as the focus
    places: ['Jacksonville', 'Jacksonville Beach', 'Atlantic Beach', 'Ponte Vedra', 'St. Augustine Shores', 'Fleming Island', 'Lakeside', 'Middleburg', 'Baldwin', 'Yulee', 'Fernandina Beach'],
    title: 'Artificial Turf in Jacksonville | TIMELESS Grass & Greens',
    description: `Artificial turf, pet turf and backyard putting greens across northeast Florida, from Fernandina Beach to Jacksonville, the beaches and St. Augustine Shores. Free estimates: call ${P}.`,
    eyebrow: 'Northeast Florida',
    h1: 'Green all year, no watering days needed.',
    lede: 'Artificial turf, pet turf and backyard putting greens from Fernandina Beach to St. Augustine Shores, on a base built for sandy ground.',
    wins: ['No watering days, no mowing, no brown patches', 'Pet turf that drains and rinses clean', 'Putting greens with real break, a fringe and as many cups as you want'],
    heroShot: 'fin-2',
    whyHeading: 'Made for Florida sand and Florida rules.',
    why: [
      { icon: 'drop', h: 'Off the watering schedule', p: 'Lawn watering here is limited to set days, and to one day a week in winter. Turf never needs it.' },
      { icon: 'home', h: 'Out of the HOA’s reach', p: 'Florida law stops an HOA restricting artificial turf that can’t be seen from the street, a neighbor’s lot or a common area.', guide: { slug: 'florida-friendly-landscaping-and-hoas', label: 'Turf and your HOA' } },
      { icon: 'shield', h: 'Safe from local bans', p: 'Florida law stops cities and counties banning turf on single-family lots that meets the state standard.', guide: { slug: 'florida-turf-infill-rules', label: 'Florida’s turf rules' } },
      { icon: 'shovel', h: 'Built for sandy ground', p: 'Sand drains fast, but a slower layer sits under it in places. We build the base for what’s under your yard.' },
    ],
    services: ['residential-turf', 'pet-turf', 'putting-greens', 'commercial-turf', 'turf-removal-and-replacement', 'sports-field-turf', 'indoor-turf'],
    svcHeading: 'Anything that’s turf, from the beaches to Fleming Island.',
    work: ['fin-2', 'fin-3', 'fin-4', 'fin-8', 'det-3', 'fin-9'],
    faqHeading: 'Questions about turf in northeast Florida.',
    faq: [
      { q: 'How often can I water a lawn here?',
        a: `The St. Johns River Water Management District allows twice a week during daylight saving time and once a week from November to March, never between 10 a.m. and 4 p.m. A water shortage order in 2026 cut that to one day a week. Turf needs none of it. Sources: ${U.ccua}, ${U.sjc}.` },
      { q: 'Can my HOA stop me putting in artificial turf?',
        a: `Not where it can’t be seen. ${U.fl720} bars an HOA from restricting artificial turf that isn’t visible from the frontage, a neighbor’s lot, a common area or a community golf course. A front yard is different, so send the plan to your board in writing.` },
      { q: 'Can my city or county ban artificial turf?',
        a: `Not on a single-family lot, if the turf meets the state standard. ${U.fl125} and ${U.flRule}, in force since 19 May 2026, protect compliant turf from local bans. They don’t cover HOA rules (${U.dep}).` },
      { q: 'What goes under the turf in Florida?',
        a: `Florida’s standard for home lawns (${U.flRule}) allows natural infill such as clean silica sand, rock or shell. Rubber and other synthetic infill are allowed only under playground equipment.` },
    ],
    guides: [
      { slug: 'florida-turf-infill-rules', anchor: 'Turf infill rules in northeast Florida' },
      { slug: 'florida-friendly-landscaping-and-hoas', anchor: 'Florida-Friendly Landscaping and your HOA' },
      { slug: 'is-artificial-turf-impervious', anchor: 'Is artificial turf impervious?' },
      { slug: 'turf-installer-licensing-by-state', anchor: 'What license a turf installer needs' },
    ],
    reach: 'From Fernandina Beach to St. Augustine Shores.',
    close: 'Stop watering it. Start using it.',
    answer: {
      question: 'Who installs artificial turf and putting greens in northeast Florida?',
      answer: 'We install artificial turf, pet turf and backyard putting greens across northeast Florida.',
    },
    map: { query: 'Jacksonville, Florida', zoom: 9 },
    gbp: { verified: true, id: '1255349' },
  },
];

export const marketBySlug = (s: string) => MARKETS.find((m) => m.slug === s);
