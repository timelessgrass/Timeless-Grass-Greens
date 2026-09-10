/**
 * Service pages — one sales page per service (src/pages/services/[slug].astro).
 *
 * Written from a buyer-research pass (2026-09-10): what people want from each service, the
 * options they choose, and the questions they ask, taken from competitor FAQs and search results.
 * Every line says what the customer gets.
 *
 * Claims about the business trace to the discovery call or the old site: the services list,
 * 13 years' experience, premium American-made turf, a free visit, a custom layout approved before
 * install, prep/base/turf/finishing/cleanup, a care walkthrough, and "non-toxic, lead-free, safe
 * for kids and pets". Any number in a FAQ carries its source link. Installer and industry figures
 * are labelled "one estimate". The researched statutes and studies stay in extra.json, rendered as
 * the closed "fine print" on each page.
 *
 * Market-independent: no geo token in the title, which is what lets this tier scale without
 * reading as doorway pages.
 */
export type Service = {
  slug: string;
  name: string;
  title: string;
  description: string;
  /** The wizard's first answer, so a visitor from this page starts on step two. */
  preset: string;
  /** Icon.astro name, for the services index card. */
  icon: string;
  /** One line for the services index card. */
  line: string;
  eyebrow: string;
  h1: string;
  lede: string;
  wins: string[];
  /** Shot id from shotlist.ts, or null for a photograph-free hero. */
  heroShot: string | null;
  benefitsHeading: string;
  benefits: { icon: string; h: string; p: string }[];
  workHeading: string;
  work: string[];
  options: { heading: string; items: string[] };
  /** Answers may hold source links; they render with set:html. */
  faq: { q: string; a: string }[];
  close: string;
  answer: { question: string; answer: string };
};

const P = '303-349-2368';
const src = (href: string, label: string) => `<a href="${href}" target="_blank" rel="nofollow noopener">${label}</a>`;

const U = {
  byu: src('https://www.westcoastturf.com/getdoc.cfm?id=38', 'BYU study'),
  shade: src('https://pmc.ncbi.nlm.nih.gov/articles/PMC11272752/', 'review of 23 studies'),
  infillHeat: src('https://pmc.ncbi.nlm.nih.gov/articles/PMC11272752/', 'review'),
  crs: src('https://codes.findlaw.com/co/title-37-water-and-irrigation/co-rev-st-sect-37-60-126/', 'C.R.S. 37-60-126'),
  sb23: src('https://content.leg.colorado.gov/sites/default/files/2023a_178_signed.pdf', 'SB23-178'),
  fl720: src('https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&amp;Search_String=&amp;URL=0700-0799/0720/Sections/0720.3045.html', 'Fla. Stat. 720.3045'),
  resource: src('https://resourcecentral.org/lawn/', 'Resource Central'),
  njdep: src('https://dep.nj.gov/wp-content/uploads/dsr/synthetic-turf-report-2025.pdf', 'NJ DEP'),
  thornton: src('https://www.thorntonwater.com/wp-content/uploads/2026/02/2026-residential_artificial_turf_info__rules-1.pdf', 'Thornton Water'),
  denverWater: src('https://www.denverwater.org/tap/ditching-useless-turf-coloradoscape-we-can-help', 'Denver Water'),
  denverWaterBiz: src('https://www.denverwater.org/business/rebates-and-conservation-tips/landscape-transformation-assistance-program/hoa-commercial', 'Denver Water'),
  flInfill: src('https://www.flrules.org/gateway/readFile.asp?sid=0&amp;tid=30839130&amp;type=1&amp;file=62-308.100.doc', 'Florida Rule 62-308.100'),
  playground: src('https://playgroundgrass.com/faq/', 'Playground Grass'),
  sb24: src('https://content.leg.colorado.gov/sites/default/files/2024a_005_signed.pdf', 'SB24-005'),
  hb25: src('https://content.leg.colorado.gov/sites/default/files/2025a_1113_signed.pdf', 'HB25-1113'),
  nc: src('https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_143/GS_143-214.7D.html', 'N.C.G.S. 143-214.7D'),
  horryCode: src('https://library.municode.com/sc/horry_county/codes/code_of_ordinances?nodeId=COOR_CH17.7STMA_ARTIISTUTFE_S17.7-16DE', 'Horry County code'),
  horrySw: src('https://www.horrycountysc.gov/media/4wqkxbxg/horry-county-sw-design-manual_rev2024.pdf', 'Horry County'),
  svc: src('https://sportsvenuecalculator.com/knowledge/artificial-turf-field/turf-field-replacement-and-recycling/', 'Sports Venue Calculator'),
  kiefer: src('https://www.kieferusa.com/blog/baseball-softball-artificial-turf-faq/', 'Kiefer USA'),
  nassau: src('https://www.nassaucountyrecord.com/local-newsletter/warrior-field-renovation-underway-west-nassau-high-school', 'Nassau County Record'),
  apex: src('https://apexturfaz.com/artificial-turf-for-gyms/', 'Apex Turf'),
};

export const SERVICES: Service[] = [
  {
    slug: 'putting-greens',
    name: 'Putting greens',
    title: 'Backyard Putting Greens | TIMELESS Grass & Greens',
    description: `Backyard putting greens with real break, a fringe and as many cups as you want. Denver, the Grand Strand and northeast Florida. Free estimate: ${P}.`,
    preset: 'Putting green',
    icon: 'flag',
    line: 'Practice your putting any day of the week, right outside your back door.',
    eyebrow: 'Backyard putting greens',
    h1: 'Your own green, steps from the back door.',
    lede: 'Practice every day without driving to the course, on a green with real break, a fringe and as many cups as you want.',
    wins: ['Putt and chip any day, no tee time', 'Rolls true, with break where you want it', 'No mowing, no watering'],
    heroShot: 'fin-6',
    benefitsHeading: 'The short game, at home.',
    benefits: [
      { icon: 'flag', h: 'Practice every day', p: 'Ten minutes before work or an hour after dinner. No tee time, no drive.' },
      { icon: 'layout', h: 'Designed for your yard', p: 'Size, shape and cup positions drawn for your space and your game.' },
      { icon: 'star', h: 'A true roll', p: 'Putting-grade turf over a shaped, compacted base, so the ball holds its line.' },
      { icon: 'sparkle', h: 'Real break', p: 'Slopes built in where you want to practice them, so every cup plays differently.' },
      { icon: 'home', h: 'Where everyone hangs out', p: 'Friends, kids and a putter by the fire pit. The backyard becomes the place to be.' },
      { icon: 'drop', h: 'Nothing to mow', p: 'It looks the same in August as it does in April, with nothing to cut or water.' },
    ],
    workHeading: 'Greens we’ve built.',
    work: ['fin-1', 'fin-5', 'fin-9', 'ctx-3'],
    options: {
      heading: 'Pick what your green needs.',
      items: [
        'One cup or several, each on its own slope',
        'A fringe and collar around the edge',
        'Break and slope where you want them',
        'A chipping area or tee line',
        'The speed you like to putt on',
        'Any size or shape the yard allows',
      ],
    },
    faq: [
      { q: 'How much does a putting green cost?', a: 'It depends on the size, the slopes, the extras and the ground you’re starting with. We price it after a free visit, in writing, so you know the number before anything starts.' },
      { q: 'How big should it be, and how many cups?', a: 'Any yard can work, from a one-cup practice green to a multi-hole layout. More cups on different slopes give you more distinct putts to practice.' },
      { q: 'Will it roll like a real green?', a: 'Yes. Putting-grade turf goes over a shaped, compacted base. The infill and brushing set the speed, and the shaping sets the break.' },
      { q: 'Can I chip onto it?', a: 'Yes, if it’s built for it. An infilled surface and a fringe hold chip shots, and a separate chipping area keeps the wear off your cups.' },
      { q: 'What upkeep does it need?', a: 'Very little. Brush it, blow off leaves and debris, and top up the infill now and then. No mowing, no watering.' },
      { q: 'Will my HOA allow it?', a: `In a back yard, usually. Colorado HOAs can’t enforce a ban on turf in back yards (${U.crs}), and Florida HOAs can’t restrict turf that isn’t visible from the street, neighbors or common areas (${U.fl720}).` },
    ],
    close: 'Ready for your own green?',
    answer: {
      question: 'How do you get a backyard putting green?',
      answer: 'Call or send photos, then book a free visit. We measure, draw a layout and give you a written price, and once you approve the design, we build it.',
    },
  },
  {
    slug: 'residential-turf',
    name: 'Artificial lawns',
    title: 'Artificial Grass Lawns | TIMELESS Grass & Greens',
    description: `Artificial grass lawns that stay green all year with no mowing or watering. Denver, the Grand Strand and northeast Florida. Free estimate: ${P}.`,
    preset: 'Lawn',
    icon: 'leaf',
    line: 'Get your weekends back. Your lawn stays green and even, with nothing to mow or water.',
    eyebrow: 'Artificial grass lawns',
    h1: 'A green lawn, without the work.',
    lede: 'No mowing, no watering and no brown patches. Just a lawn that looks good every day of the year.',
    wins: ['Green all year, whatever the watering rules', 'No mowing, fertilizer or reseeding', 'No mud tracked into the house'],
    heroShot: 'fin-2',
    benefitsHeading: 'Your weekends, back.',
    benefits: [
      { icon: 'clock', h: 'Your weekends back', p: 'No mowing, edging, fertilizing or reseeding. The yard is done when we leave.' },
      { icon: 'drop', h: 'Lower water use', p: 'No sprinklers, no watering schedule and no brown lawn in a drought.' },
      { icon: 'leaf', h: 'Looks real up close', p: 'Premium turf, laid and seamed so it reads as a lawn, not a carpet.' },
      { icon: 'shield', h: 'Safe for kids and pets', p: 'Non-toxic, lead-free turf, made to be played on.' },
      { icon: 'home', h: 'Clean all year', p: 'No mud on the floors after rain, and no bare patches by July.' },
      { icon: 'sun', h: 'Works where grass won’t', p: 'Shady corners, slopes and side yards where grass never took.' },
    ],
    workHeading: 'Lawns we’ve installed.',
    work: ['fin-8', 'fin-7', 'det-3', 'det-2'],
    options: {
      heading: 'Choose the look.',
      items: [
        'Turf height, color and blade shape',
        'A cooler turf or infill for sunny yards',
        'Borders in rock, pavers or concrete',
        'Strips between pavers and around patios',
        'Side yards, slopes and small spaces',
        'Old grass and sod removed',
      ],
    },
    faq: [
      { q: 'How hot does artificial grass get?', a: `Hotter than grass in direct sun. One ${U.byu} measured a 117°F daytime average against 78°F for grass, and hosing it down cooled it only for minutes. Shade helps most (${U.shade}), so we’ll point out the sunniest spots on the visit.` },
      { q: 'How much water will I save?', a: `Nearly all of your lawn’s watering. Front Range conversion programs count about 10 gallons saved per square foot each year (${U.resource}).` },
      { q: 'Will it drain in a downpour?', a: `Water passes through the turf into the gravel base, but the soil underneath has to take it too (${U.njdep}). That’s why we check the drainage on the visit, before we price it.` },
      { q: 'Can my HOA stop me?', a: `In Colorado, HOAs can’t ban turf from back yards but can limit it in front yards (${U.sb23}). In Florida, HOAs can’t restrict turf that isn’t visible from the street, neighbors or common areas (${U.fl720}).` },
      { q: 'Are there rebates?', a: `Rarely. Thornton pays up to $2 a square foot, capped at $2,000 (${U.thornton}), but Denver Water excludes artificial turf (${U.denverWater}), and there’s no turf rebate on the Grand Strand. Ask us about your address.` },
      { q: 'How long does it last?', a: `It depends on sun, pets and foot traffic, so compare the warranty on the turf itself. Thornton’s rebate, for one, requires at least an eight-year fade warranty (${U.thornton}).` },
    ],
    close: 'Ready to stop mowing?',
    answer: {
      question: 'How is an artificial lawn installed?',
      answer: 'The old grass comes out, a base is built and compacted for your soil, and the turf is laid, seamed, edged and infilled. Every job starts with a free visit and a written price.',
    },
  },
  {
    slug: 'pet-turf',
    name: 'Pet turf',
    title: 'Pet Turf for Dogs | TIMELESS Grass & Greens',
    description: `Pet turf that ends the mud, holes and yellow spots, and drains when the dog goes. Denver, the Grand Strand and northeast Florida. Free estimate: ${P}.`,
    preset: 'Pet turf',
    icon: 'paw',
    line: 'Tired of muddy paws and dead spots? Pet turf drains fast, so the yard stays fresh.',
    eyebrow: 'Pet turf',
    h1: 'No more muddy paws.',
    lede: 'Pet turf ends the mud, the holes and the yellow spots. It drains when the dog goes, and it rinses clean.',
    wins: ['No mud tracked through the house', 'No holes, no dead spots', 'Built to drain, so it stays fresh'],
    heroShot: 'fin-3',
    benefitsHeading: 'Built for dogs, from the base up.',
    benefits: [
      { icon: 'paw', h: 'Clean paws', p: 'No mud after the rain, and no dirt tracked across the floors.' },
      { icon: 'drop', h: 'Drains fast', p: 'Liquid goes straight through the turf into the base instead of sitting on top.' },
      { icon: 'sparkle', h: 'Stays fresh', p: 'A base and infill chosen to drain, plus a quick rinse, keep smells from building.' },
      { icon: 'shield', h: 'Tough edges', p: 'Edges and seams are anchored, so diggers can’t lift a corner.' },
      { icon: 'leaf', h: 'No yellow spots', p: 'Green all year, wherever the dog goes or digs.' },
      { icon: 'home', h: 'Safe to play on', p: 'Non-toxic, lead-free turf, made for dogs and kids.' },
    ],
    workHeading: 'Yards we’ve installed.',
    work: ['fin-8', 'det-3', 'fin-2', 'det-1'],
    options: {
      heading: 'Set it up for your dog.',
      items: [
        'Fully permeable, flow-through backing',
        'A free-draining base underneath',
        'Odor-control infill, or none at all',
        'A short, dense pile that’s easy to clean',
        'A potty zone or dog run',
        'Anchored edges along fences and beds',
      ],
    },
    faq: [
      { q: 'Will pet turf smell?', a: 'Not if it drains and gets a regular rinse. Smell builds when urine sits in the infill and the base, so we build pet areas to drain first.' },
      { q: 'Does urine drain through?', a: `Yes, through the backing and into the base. The ground underneath has to take it too (${U.njdep}), which is why we check drainage before we price the job.` },
      { q: 'Will it get too hot for my dog?', a: `It can in full summer sun: one ${U.byu} measured a 117°F daytime average against 78°F for grass. Shade helps most, so plan a shaded spot and a water bowl.` },
      { q: 'What infill is best for dogs?', a: `One chosen for drainage and odor control. In Florida, single-family yards have to use natural infill such as sand (${U.flInfill}).` },
      { q: 'Can my dog dig it up?', a: 'Digging usually stops, because there’s no dirt to dig. Anchored edges and seams keep a determined digger from lifting a corner.' },
      { q: 'How do I clean it?', a: 'Pick up solids, hose down pee spots, and use an enzyme turf cleaner where the dog goes most. That’s it.' },
    ],
    close: 'Ready for clean paws?',
    answer: {
      question: 'Does pet turf smell?',
      answer: 'Not when it drains and gets a regular rinse. Pet areas are built with a base and infill that move liquid away, so nothing sits under the turf.',
    },
  },
  {
    slug: 'commercial-turf',
    name: 'Commercial turf',
    title: 'Commercial Artificial Turf | TIMELESS Grass & Greens',
    description: `Commercial turf for daycares, pet daycares, HOA common areas and multifamily. No mowing crew, no mud. Free estimate: ${P}.`,
    preset: 'Commercial or sports field',
    icon: 'building',
    line: 'Daycares, pet daycares and common areas that stay green without a maintenance crew.',
    eyebrow: 'Commercial turf',
    h1: 'Green, safe and usable every day.',
    lede: 'Turf for daycares, pet daycares, HOA common areas and multifamily properties. No mowing crew, no mud and no bare patches.',
    wins: ['Open right after rain, with no mud', 'Lower landscaping and water costs', 'Sharp all year for families, residents and prospects'],
    heroShot: 'fin-4',
    benefitsHeading: 'Less upkeep. More use.',
    benefits: [
      { icon: 'shield', h: 'Built for kids', p: 'Playground turf can go over a shock pad matched to your equipment’s fall height.' },
      { icon: 'paw', h: 'Pet daycare ready', p: 'Flow-through backing, a free-draining base and a daily washdown keep runs clean.' },
      { icon: 'drop', h: 'No mud, no puddles', p: 'Usable right after it rains, so nobody loses outdoor time.' },
      { icon: 'clock', h: 'Lower upkeep', p: 'No mowing crew, no irrigation schedule, no reseeding worn paths.' },
      { icon: 'sparkle', h: 'Sharp all year', p: 'The same clean look in August as in April, for parents, residents and prospects.' },
      { icon: 'home', h: 'Made for daily traffic', p: 'Amenity lawns, dog parks and courtyards that hold up to heavy use.' },
    ],
    workHeading: 'Some of our work.',
    work: ['ctx-1', 'fin-7', 'fin-9', 'det-2'],
    options: {
      heading: 'Built for how the space is used.',
      items: [
        'Playground turf over a matched shock pad',
        'Pet daycare systems with washdown drainage',
        'Heavy-traffic lawns, dog parks and courtyards',
        'Inlaid games, colors and lines',
        'Surfacing that works for strollers and wheelchairs',
        'Drainage planned with the site',
      ],
    },
    faq: [
      { q: 'Is turf safe for playground falls?', a: `It can be, over a shock pad matched to the equipment’s fall height. Ask for ASTM F1292 (fall impact) and ASTM F1951 (wheelchair access) test results for the full system (${U.playground}).` },
      { q: 'Does it get too hot for kids?', a: `All playground surfaces heat up in the sun, and turf runs hotter than grass: 117°F against 78°F in one ${U.byu}. Plan shade over the play areas.` },
      { q: 'Can it handle a pet daycare?', a: 'Yes, with flow-through backing, a free-draining base, odor-control infill and a daily washdown.' },
      { q: 'Can our HOA or business install it in Colorado?', a: `Since January 1, 2026, new nonfunctional turf is barred on commercial, institutional and HOA common property in new or redeveloped landscapes. Playgrounds and sports fields count as functional, and older installs are grandfathered (${U.sb24}, ${U.hb25}).` },
      { q: 'Is there a rebate?', a: `Not in the Denver metro. Denver Water’s HOA and commercial program won’t fund designs that include artificial turf (${U.denverWaterBiz}).` },
      { q: 'Does turf count as impervious surface?', a: `It depends on the state. North Carolina doesn’t count permeable turf over a pervious base as built-upon area (${U.nc}). The ${U.horryCode} doesn’t name turf, so ask before you plan around it.` },
    ],
    close: 'Ready to cut the upkeep?',
    answer: {
      question: 'Can commercial property install artificial turf?',
      answer: 'Usually, depending on the state and what the turf is for. In Colorado, playgrounds and sports fields count as functional turf, which the 2026 rules allow on commercial and HOA property.',
    },
  },
  {
    slug: 'sports-field-turf',
    name: 'Sports field turf',
    title: 'Sports Field Turf | TIMELESS Grass & Greens',
    description: `Synthetic sports fields for schools, parks and training facilities: more games, fewer rainouts, lower upkeep. Free estimate: ${P}.`,
    preset: 'Commercial or sports field',
    icon: 'trophy',
    line: 'Play all season in any weather. No mud, no bare patches.',
    eyebrow: 'Sports field turf',
    h1: 'More games. Fewer rainouts.',
    lede: 'Synthetic fields for schools, parks and training facilities: one consistent surface for baseball, softball, soccer and more.',
    wins: ['Play right after it rains', 'True hops and steady footing', 'Lower upkeep than grass'],
    heroShot: 'ctx-1',
    benefitsHeading: 'A field that’s ready when you are.',
    benefits: [
      { icon: 'clock', h: 'More hours of play', p: 'Fewer rainouts and no resting worn areas, so the field stays on the schedule.' },
      { icon: 'star', h: 'A consistent surface', p: 'True hops and steady footing, game after game.' },
      { icon: 'drop', h: 'Lower upkeep', p: 'No mowing or watering; grooming and infill top-ups instead.' },
      { icon: 'layout', h: 'One field, many sports', p: 'Lines for baseball, softball, soccer and football on the same surface.' },
      { icon: 'trophy', h: 'Tournament ready', p: 'Inlaid lines, logos and colors for a field you’re proud to host on.' },
      { icon: 'shield', h: 'Built to be tested', p: 'Ask for impact (Gmax) testing on the finished field, and a shock pad where the spec calls for one.' },
    ],
    workHeading: 'Some of our work.',
    work: ['ctx-2', 'fin-4', 'fin-7'],
    options: {
      heading: 'Spec it for your sport.',
      items: [
        'Full turf, or turf with clay-colored base paths',
        'Inlaid foul lines, boxes and multi-sport lines',
        'Warning track, bullpens and cages',
        'A shock pad under the turf',
        'Infill matched to heat, budget and feel',
        'Logos and team colors',
      ],
    },
    faq: [
      { q: 'How long does a turf field last?', a: `Usually 8 to 10 years, and up to 10 to 12 with good care, by one industry estimate (${U.svc}).` },
      { q: 'What does a field cost?', a: `It varies widely. One estimate puts baseball and softball fields at $400,000 to $700,000 installed (${U.kiefer}). West Nassau High’s 2025 upgrade was $1.7 million, including a $1,328,070 turf contract (${U.nassau}).` },
      { q: 'Is it cheaper to maintain than grass?', a: `Usually. One estimate puts turf upkeep near $5,000 a year against $20,000 for natural grass (${U.kiefer}), though it still needs grooming, infill top-ups and eventual replacement.` },
      { q: 'How hot does a turf field get?', a: `Hotter than grass: 117°F against 78°F in one ${U.byu}, and watering cooled it only briefly. Infill matters too: crumb rubber measured about 128°F against 114°F for TPE (${U.infillHeat}).` },
      { q: 'Which infill should we choose?', a: 'Crumb rubber, TPE, EPDM, sand and cork or coconut trade off cost, heat and feel. Pick it for your climate, your budget and how the field is played.' },
      { q: 'Do we need a stormwater permit?', a: `Often. ${U.horrySw} requires one where half an acre or more is disturbed, and North Carolina doesn’t count permeable turf over a pervious base as built-upon area (${U.nc}).` },
    ],
    close: 'Ready to talk about your field?',
    answer: {
      question: 'Who installs synthetic sports fields?',
      answer: 'We install synthetic sports surfaces across the Denver metro, the Grand Strand and northeast Florida, for schools, municipal complexes and training facilities.',
    },
  },
  {
    slug: 'indoor-turf',
    name: 'Indoor facility turf',
    title: 'Indoor Turf for Gyms & Training Facilities | TIMELESS Grass & Greens',
    description: `Indoor turf for gyms and training facilities: sled lanes, sprint tracks and training floors with your lines and logo. Free estimate: ${P}.`,
    preset: 'Commercial or sports field',
    icon: 'dumbbell',
    line: 'Turf for gyms and training facilities, so your athletes can train all year.',
    eyebrow: 'Indoor turf',
    h1: 'Turf that takes a beating, indoors.',
    lede: 'Sled lanes, sprint tracks and training floors for gyms and indoor sports facilities.',
    wins: ['Stands up to sleds and daily classes', 'Cushioned and easy on joints', 'Your lines, logo and colors'],
    heroShot: null,
    benefitsHeading: 'Made for how your members train.',
    benefits: [
      { icon: 'dumbbell', h: 'Sled-ready lanes', p: 'Gym-specific turf with the seams kept out of the sled path.' },
      { icon: 'shield', h: 'Easy on joints', p: 'An attached cushion or a separate pad under the turf.' },
      { icon: 'layout', h: 'Lines and logos', p: 'Yard markers, agility ladders, lane lines and your logo, inlaid.' },
      { icon: 'clock', h: 'Use it right away', p: 'Indoor turf is usually ready to use as soon as it’s down.' },
      { icon: 'home', h: 'Over your concrete', p: 'It goes over a level, sound slab or existing rubber flooring.' },
      { icon: 'sparkle', h: 'Easy to keep clean', p: 'Little or no infill, so a vacuum and a sweep keep it tidy.' },
    ],
    workHeading: 'Some of our outdoor work.',
    work: ['fin-9', 'det-2', 'fin-2'],
    options: {
      heading: 'Lay it out your way.',
      items: [
        'Sled lanes and sprint tracks',
        'Attached cushion or a separate shock pad',
        'No-infill or light-infill systems',
        'Inlaid lines, yard markers and agility ladders',
        'Logos and team colors',
        'Clean edges where turf meets rubber flooring',
      ],
    },
    faq: [
      { q: 'Can turf go over our concrete?', a: `Yes, if the slab is level and sound, with a pad underneath for extra cushion (${U.apex}).` },
      { q: 'Will it hold up to sleds?', a: `Yes, with gym-specific turf and the seams kept out of the sled path (${U.apex}).` },
      { q: 'How long will it last?', a: `One installer puts training-facility turf at 6 to 12 years, depending on traffic and care (${U.apex}).` },
      { q: 'How soon can we use it?', a: `Usually right away (${U.apex}).` },
      { q: 'Does it need infill?', a: 'Many gym turfs use little or none, which keeps the floor cleaner and easier to vacuum.' },
      { q: 'How do we keep it clean?', a: `Vacuum and sweep chalk and dust regularly, and disinfect the high-contact zones, since indoor turf never gets rained on (${U.apex}).` },
    ],
    close: 'Ready to plan your floor?',
    answer: {
      question: 'How is indoor turf different from outdoor?',
      answer: 'Indoors there is no sun and no rain, so the spec is driven by traffic, the pad under the turf and how it is fixed to the floor instead.',
    },
  },
  {
    slug: 'turf-removal-and-replacement',
    name: 'Turf replacement',
    title: 'Artificial Turf Removal & Replacement | TIMELESS Grass & Greens',
    description: `Old turf flat, faded or smelly? We pull it, fix what's underneath and lay new turf. Three markets. Free estimate: ${P}.`,
    preset: 'Replace old turf',
    icon: 'refresh',
    line: 'Old turf flat, faded or smelly? We pull it, fix what’s under it and lay new turf.',
    eyebrow: 'Turf removal and replacement',
    h1: 'Tired, faded turf? Start fresh.',
    lede: 'We pull the old turf, check what’s underneath, fix the base and drainage, and lay new turf that looks right again.',
    wins: ['Old turf removed and hauled away', 'Base and drainage checked before we price it', 'An upgrade on the way back in'],
    heroShot: 'fin-8',
    benefitsHeading: 'Fixed from the ground up.',
    benefits: [
      { icon: 'refresh', h: 'Out with the old', p: 'We pull the old turf and infill and haul it away.' },
      { icon: 'layout', h: 'We look underneath first', p: 'If the base is still good, reusing it can save you a lot.' },
      { icon: 'drop', h: 'Drainage fixed', p: 'Puddles and smells usually start underneath, so that’s where we fix them.' },
      { icon: 'sparkle', h: 'An upgrade', p: 'Swap in pet turf, a cooler turf or a putting green on the way back in.' },
      { icon: 'shield', h: 'Safe seams again', p: 'New seams and anchored edges, so nobody trips on a lifted corner.' },
      { icon: 'leaf', h: 'Looks new again', p: 'Fresh color and full blades in place of flat, faded turf.' },
    ],
    workHeading: 'Some of our work.',
    work: ['fin-2', 'det-1', 'det-3'],
    options: {
      heading: 'What the job can include.',
      items: [
        'Tear-out and haul-away',
        'Infill and sand separated out',
        'Base inspection, regrade and recompaction',
        'A full base rebuild where it’s needed',
        'Drainage repair',
        'New seams, edges and borders',
      ],
    },
    faq: [
      { q: 'How do I know it’s time to replace my turf?', a: `The seams keep loosening, the color fades toward gray-green, loose fibers and infill pile up at the edges, and blades split (${U.svc}). A smell that won’t go away, or puddles, are signs too.` },
      { q: 'Can you reuse the old base?', a: 'Sometimes. A level, compacted base that still drains can be regraded and reused, which costs a lot less. If it was never built to drain, reusing it repeats the problem.' },
      { q: 'What happens to the old turf?', a: `Once the infill and sand are separated out, it can be recycled or reused where that’s available. Otherwise it’s disposed of (${U.svc}).` },
      { q: 'How long does removal take?', a: `A yard depends on its size and access. A full sports field takes about two to four working days before new turf goes down (${U.svc}).` },
      { q: 'How long should turf last?', a: `Sports fields usually last 8 to 10 years (${U.svc}). Yards vary with sun, pets and traffic, so check the original warranty.` },
      { q: 'Does new turf have to meet newer rules?', a: `It can. In Florida, a single-family replacement falls under the 2026 standard: natural infill, permeable layers and anchored edges (${U.flInfill}). In Colorado, commercial and HOA turf from before 2026 is grandfathered, but a redevelopment that disturbs more than half the landscape triggers the ban on nonfunctional turf (${U.sb24}).` },
    ],
    close: 'Ready to start fresh?',
    answer: {
      question: 'Can old artificial turf be replaced without redoing the base?',
      answer: 'Sometimes. If the base is level, compacted and still drains, it can be reused and the job costs far less. If it was never built to drain, reusing it repeats the failure.',
    },
  },
];

export const serviceBySlug = (s: string) => SERVICES.find((x) => x.slug === s);
