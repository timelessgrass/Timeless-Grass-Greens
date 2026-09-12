/**
 * The three markets, and the copy for each market page (src/pages/[market]/index.astro).
 *
 * URL scheme (fixed, never mixed): /{market}/ · /{market}/{town-st}/
 * Market slugs carry no state token. If town pages ever ship, the state suffix rides on the TOWN
 * (Atlantic Beach exists in both SC and FL).
 *
 * Places: examples within the client's recorded operating outlines, including both states on
 * the Grand Strand. Border candidates are reconciled before publication. Local rules come from the cited
 * research in guides.ts and extra.json; public copy links to guides when they help a project decision. Written
 * to the same test as the rest of the site: would a homeowner care?
 */
export type Market = {
  slug: 'grand-strand' | 'denver-metro' | 'northeast-florida';
  name: string;
  short: string;
  /** The short list for compact rows (homepage, service pages, the ticker). */
  towns: string[];
  /** Prominent coverage examples; published locality pages provide the fuller directory. */
  places: string[];
  placeStates?: Record<string, 'CO' | 'SC' | 'NC' | 'FL'>;
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

export const MARKETS: Market[] = [
  {
    slug: 'grand-strand',
    name: 'The Grand Strand',
    short: 'Grand Strand',
    towns: ['Shallotte, NC', 'Myrtle Beach', 'Carolina Forest', 'Conway', 'Loris'],
    places: ['Shallotte', 'Myrtle Beach', 'North Myrtle Beach', 'Carolina Forest', 'Longs', 'Loris', 'Conway', 'Burgess'],
    placeStates: { Shallotte: 'NC' },
    title: 'Artificial Turf in Myrtle Beach | TIMELESS Grass & Greens',
    description: `Artificial turf and putting greens across the Grand Strand, from Shallotte, NC to Burgess, SC, inland through Loris and Conway. Free estimates: ${P}.`,
    eyebrow: 'The Grand Strand',
    h1: "Make more of your Grand Strand yard.",
    lede: "Artificial lawns, pet areas and putting greens from Shallotte, North Carolina, to Burgess, South Carolina, along the coast and inland through Loris and Conway. Start with a free visit, custom layout and written price.",
    wins: ["A lawn, dog run or green planned for your space", "Ground and drainage checked before pricing", "Turf options and a layout to approve"],
    heroShot: 'fin-4',
    whyHeading: "Plan the space around how you use it.",
    why: [
      {"icon": "drop", "h": "Start with the ground", "p": "Show us where water collects and how it leaves the work area. Drainage belongs in the plan before the turf goes down.", "guide": {"slug": "is-artificial-turf-impervious", "label": "Drainage and surface classification"}},
      {"icon": "paw", "h": "Room for the dog", "p": "Plan the pet area around daily use, rinsing access and ongoing care. A good installation still needs cleaning."},
      {"icon": "flag", "h": "Practice close to home", "p": "Choose a green’s shape, break and cup positions around your yard and the shots you want to practice."},
    ],
    services: ['residential-turf', 'sports-field-turf', 'commercial-turf', 'pet-turf', 'putting-greens', 'turf-removal-and-replacement', 'indoor-turf'],
    svcHeading: "Choose your Grand Strand turf project.",
    work: ['fin-4', 'ctx-1', 'fin-3', 'fin-8', 'fin-2', 'det-2'],
    faqHeading: 'Questions about turf on the Grand Strand.',
    faq: [
      {
        "q": "Can we start with just a dog run or small lawn area?",
        "a": "Yes, the layout can focus on the part of the yard you want to change. Include gates, paths and the connection to grass, beds or paving so the edges and care access are planned together."
      },
      {
        "q": "What happens at the free visit?",
        "a": "We measure the proposed area, discuss how you want to use it and review access, the existing surface and drainage. You receive turf options, a custom layout and a written price before deciding on installation."
      },
      {
        "q": "Will turf solve a wet area in the yard?",
        "a": "Show us where water gathers and how it enters and leaves the work area. We consider that route along with the proposed turf and base when defining any drainage work in the scope."
      },
      {
        "q": "What should I check before work starts?",
        "a": "Confirm the property’s actual town or county jurisdiction on the appropriate side of the state line, along with any association requirements. Include excavation, grading and drainage changes when asking which reviews apply, and obtain property approvals separately."
      },
      {
        "q": "Do you also work on commercial spaces and fields?",
        "a": "We offer <a href=\"/services/commercial-turf/\">commercial turf</a> and <a href=\"/services/sports-field-turf/\">sports surfaces</a>. Describe the activity, traffic and site requirements so the proposed system and care needs can be considered from the start."
      }
    ],
    guides: [
      {
        "slug": "is-artificial-turf-impervious",
        "anchor": "Check drainage and surface classification"
      },
      {
        "slug": "nc-vs-sc-built-upon-area",
        "anchor": "Project checks on either side of the state line"
      }
    ],
    reach: 'Shallotte to Burgess. Coast to Loris and Conway.',
    close: "See the plan for your space.",
    answer: {"question": "Who installs artificial turf and putting greens on the Grand Strand?", "answer": "Timeless installs artificial turf, pet turf, putting greens and sports field turf across the Grand Strand, from Shallotte, NC to Burgess, SC and inland through Loris and Conway. A free visit includes a custom layout, turf options and a written price."},
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
    h1: "A lawn or putting green made for your Denver yard.",
    lede: "Artificial lawns, pet areas and backyard putting greens from Erie and Boulder to Castle Rock. Compare turf options, a custom layout and a written price after a free visit.",
    wins: ["Less routine mowing and lawn irrigation", "Preparation planned for the ground at your address", "Your layout and price before work begins"],
    heroShot: 'fin-6',
    whyHeading: "Choose what the yard should do for you.",
    why: [
      {
        "icon": "shovel",
        "h": "Preparation for your property",
        "p": "Point out uneven areas, settled edges and water that collects. We review the ground and access before defining the preparation."
      },
      {
        "icon": "drop",
        "h": "A different lawn routine",
        "p": "The converted area needs no mowing or irrigation for grass growth. Plan instead for debris removal, brushing and cleaning."
      },
      {
        "icon": "flag",
        "h": "A green outside the door",
        "p": "Choose cup positions, fringe and break for the putts you want to practice, with the layout approved before installation."
      }
    ],
    services: ['putting-greens', 'residential-turf', 'pet-turf', 'commercial-turf', 'sports-field-turf', 'indoor-turf', 'turf-removal-and-replacement'],
    svcHeading: "Choose your Denver-area turf project.",
    work: ['fin-6', 'fin-1', 'fin-5', 'fin-7', 'fin-2', 'det-1'],
    faqHeading: 'Questions about turf in Denver.',
    faq: [
      {
        "q": "Can I choose a putting green instead of a lawn?",
        "a": "We can discuss either use, or a layout that combines a green with another area. Start with the shots you want to practice and the yard space you want to keep available."
      },
      {
        "q": "What affects the installation price?",
        "a": "The area, existing surface, access, removal, preparation, drainage and edge details all contribute to the scope. A free visit lets us put the work and turf options into a written estimate."
      },
      {
        "q": "Do I need to check Colorado’s turf rules?",
        "a": "Check the proposed use and property type before ordering materials. A private yard, association common area and commercial site can raise different questions, and local requirements also matter. Our <a href=\"/guides/colorado-turf-law/\">Colorado turf guide</a> is a starting point for that review."
      },
      {
        "q": "What about my HOA or water provider?",
        "a": "Obtain any applicable landscape and application requirements from the association. If a rebate is part of your budget, confirm current eligibility with the provider serving your address before committing to the work."
      },
      {
        "q": "Will the surface need care in winter?",
        "a": "Follow the selected product’s instructions for snow, ice and debris, and inspect the surface before use. A synthetic yard still needs care and should not be treated as usable in every weather condition."
      }
    ],
    guides: [
      {
        "slug": "colorado-turf-law",
        "anchor": "Check the rules for the proposed turf use"
      },
      {
        "slug": "colorado-hoa-turf-rules",
        "anchor": "Plan an HOA submission"
      },
      {
        "slug": "colorado-water-rebates-and-turf",
        "anchor": "Check a rebate before budgeting for it"
      }
    ],
    reach: 'From Erie to Castle Rock.',
    close: "Plan the yard you want to use.",
    answer: {"question": "Who installs artificial turf and putting greens in the Denver metro?", "answer": "Timeless installs artificial lawns, pet turf and backyard putting greens across the Denver metro. Start with a free visit, turf options, a custom layout and a written price before deciding on installation."},
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
    description: `Artificial lawns, pet turf and putting greens from Fernandina Beach to St. Augustine Shores. Free visit, custom layout and written estimate: ${P}.`,
    eyebrow: 'Northeast Florida',
    h1: "Plan a Florida yard around the way you live.",
    lede: "Artificial lawns, pet areas and putting greens from Fernandina Beach to St. Augustine Shores. Start with a free visit to discuss the space, compare turf options and get a custom layout and written price.",
    wins: ["Choose a lawn, dog run or practice green", "Sun exposure, drainage and care in the plan", "Approve the layout before installation"],
    heroShot: 'fin-2',
    whyHeading: "The surface is one part of the plan.",
    why: [
      {
        "icon": "sun",
        "h": "Consider the sunniest areas",
        "p": "Turf can get hot. Think about when people and pets will use the yard, and include shade and cooler resting areas in the layout."
      },
      {
        "icon": "shovel",
        "h": "Check where water goes",
        "p": "Show us drains, downspouts and low spots. The proposed backing, base and water route need to work together."
      },
      {
        "icon": "layout",
        "h": "Choose the work before the price",
        "p": "Compare the area, turf and finishing details, then review a custom layout and written installation scope."
      }
    ],
    services: ['residential-turf', 'pet-turf', 'putting-greens', 'commercial-turf', 'turf-removal-and-replacement', 'sports-field-turf', 'indoor-turf'],
    svcHeading: "Choose your northeast Florida turf project.",
    work: ['fin-2', 'fin-3', 'fin-4', 'fin-8', 'det-3', 'fin-9'],
    faqHeading: 'Questions about turf in northeast Florida.',
    faq: [
      {
        "q": "Which part of the yard should I convert?",
        "a": "Start with the space you use most, then consider the time of day, sun and shade, paths from the house and cleaning access. Include trees, planting beds and the remaining lawn in the drawing so the transitions are clear."
      },
      {
        "q": "Does turf remove the need for lawn watering?",
        "a": "The converted area needs no irrigation for grass growth. Cleaning, rinsing pet areas or occasional cooling can still use water. Discuss those needs when choosing the layout."
      },
      {
        "q": "What should I check with my HOA?",
        "a": "Bring the current landscape requirements and proposed location. Check visibility from surrounding property and common areas as part of the approval question. Our <a href=\"/guides/florida-friendly-landscaping-and-hoas/\">Florida HOA guide</a> covers the relevant checks."
      },
      {
        "q": "How do I choose the materials for a Florida yard?",
        "a": "Review the turf, base and infill as a system for the intended use and property. The <a href=\"/guides/florida-turf-infill-rules/\">Florida turf guide</a> explains the residential standard’s scope. Commercial, shared and indoor spaces need their own requirements checked."
      },
      {
        "q": "What affects my estimate?",
        "a": "Area, access, removal, ground preparation, drainage and the way the turf meets paving or beds all contribute to the work. We measure and discuss those details on the free visit before providing a layout and written price."
      }
    ],
    guides: [
      {
        "slug": "florida-turf-infill-rules",
        "anchor": "Choose materials within Florida’s requirements"
      },
      {
        "slug": "florida-friendly-landscaping-and-hoas",
        "anchor": "Check the proposed layout with your HOA"
      },
      {
        "slug": "is-artificial-turf-impervious",
        "anchor": "Understand drainage and surface classification"
      }
    ],
    reach: 'From Fernandina Beach to St. Augustine Shores.',
    close: "See the layout before you decide.",
    answer: {"question": "Who installs artificial turf and putting greens in northeast Florida?", "answer": "Timeless installs artificial lawns, pet turf and backyard putting greens across northeast Florida, from Fernandina Beach to St. Augustine Shores. A free visit includes turf options, a custom layout and a written price."},
    map: { query: 'Jacksonville, Florida', zoom: 9 },
    gbp: { verified: true, id: '1255349' },
  },
];

export const marketBySlug = (s: string) => MARKETS.find((m) => m.slug === s);
