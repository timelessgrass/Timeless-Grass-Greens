/**
 * The three markets.
 *
 * URL scheme (fixed, never mixed): /{market}/ · /{market}/{town-st}/
 * Market slugs carry no state token — the Grand Strand crosses SC and NC, and a
 * state-rooted path would fracture it. The state suffix rides on the TOWN, which
 * gives two independent disambiguators for collisions (Atlantic Beach exists in
 * both SC and FL).
 *
 * Every fact here is sourced. See archive/research/{market}.json.
 */
export type Market = {
  slug: 'grand-strand' | 'denver-metro' | 'northeast-florida';
  name: string;
  short: string;
  states: string[];
  counties: string[];
  /** Places named by the client on the call, or on his own old site. Nothing else. */
  towns: string[];
  /** Why a job here differs from a job in the other two markets. */
  ground: string;
  /** The regulatory fact that no competitor in this market has written up. */
  law: { headline: string; detail: string; source: string };
  /** Named anchors a local would recognize. */
  anchors: string[];
  /** Does a verified GBP back this market? Drives whether a LocalBusiness node emits. */
  gbp: { verified: boolean; id: string | null };
};

export const MARKETS: Market[] = [
  {
    slug: 'grand-strand',
    name: 'The Grand Strand',
    short: 'Grand Strand',
    states: ['SC', 'NC'],
    counties: ['Horry SC', 'Georgetown SC', 'Brunswick NC', 'Columbus NC'],
    towns: ['North Myrtle Beach', 'Carolina Forest', 'Loris', 'Longs'], // Brian, 00:28:22-24
    ground:
      'Sand with a high water table. The base is built to drain, not to resist heave — the opposite problem to Colorado.',
    law: {
      headline: 'The state line runs through the middle of this market.',
      detail:
        'North Carolina excludes qualifying artificial turf from built-upon area under G.S. 143-214.7D, and bars local governments from adopting a stricter definition. South Carolina has no equivalent. A homeowner in Sunset Beach and a homeowner in Little River, ten minutes apart, are not having the same conversation.',
      source: 'N.C.G.S. 143-214.7D, from S.L. 2024-45 s.4.48',
    },
    anchors: ['Myrtle Beach', 'North Myrtle Beach', 'Conway', 'Little River', 'Sunset Beach NC', 'Shallotte NC'],
    gbp: { verified: true, id: '13971044913229673568' },
  },
  {
    slug: 'denver-metro',
    name: 'Denver Metro',
    short: 'Denver',
    states: ['CO'],
    counties: ['Denver', 'Jefferson', 'Adams', 'Arapahoe', 'Douglas', 'Boulder', 'Broomfield'],
    towns: ['Denver', 'Aurora', 'Westminster', 'Lakewood', 'Broomfield', 'Thornton'], // old site, "Do you serve my area?"
    ground:
      'Expansive clay and claystone. It swells and shrinks with moisture, so the base is built to stop the surface heaving — the single biggest technical difference from a sandy market.',
    law: {
      headline: 'Colorado now separates functional turf from non-functional.',
      detail:
        'SB24-005 as amended by HB25-1113 requires local governments to prohibit non-functional artificial turf on commercial, institutional, HOA-common, right-of-way and parking-lot property. Functional turf — recreation, sports fields, playgrounds and golf playing areas — is exempt. Single-family residential is not covered. Multifamily of twelve units or more follows on 1 January 2028.',
      source: 'Colorado SB24-005, as amended by HB25-1113',
    },
    anchors: ['Denver', 'Aurora', 'Lakewood', 'Highlands Ranch', 'Castle Rock', 'Boulder', 'Superior'],
    gbp: { verified: true, id: '05426208594558680150' },
  },
  {
    slug: 'northeast-florida',
    name: 'Northeast Florida',
    short: 'Jacksonville',
    states: ['FL'],
    counties: ['Nassau', 'Duval', 'Clay', 'St. Johns'],
    towns: ['Jacksonville', 'Jacksonville Beach', 'Ponte Vedra', 'Fernandina Beach'], // Brian, 00:38:41 / 00:39:50
    ground:
      'Sand over a shallow water table, with hardpan in places. Drainage is rarely the problem; heat and shade placement usually are.',
    law: {
      headline: 'Florida limits what can go under residential turf.',
      detail:
        'DEP rules restrict residential infill to clean silica sand, rock, shell or other natural material. Crumb rubber is permitted only within a playground-equipment footprint. That rules out the cheapest infill option before the heat conversation even starts.',
      source: 'Florida DEP residential infill rule',
    },
    anchors: ['Jacksonville', 'Ponte Vedra Beach', 'Nocatee', 'St. Augustine', 'Fernandina Beach', 'Amelia Island'],
    gbp: { verified: true, id: '1255349' },
  },
];

export const marketBySlug = (s: string) => MARKETS.find((m) => m.slug === s);
