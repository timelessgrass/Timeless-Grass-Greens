/**
 * Service pages. Market-independent — no geo token in the title, which is what
 * lets this tier scale without reading as doorway pages.
 *
 * Each carries something that exists nowhere else on the domain. A service that
 * is only a list of benefits does not earn a URL.
 */
export type Service = {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  answer: { question: string; answer: string };
  sections: { h2: string; body: string[] }[];
};

const P = '303-349-2368';

export const SERVICES: Service[] = [
  {
    slug: 'putting-greens',
    name: 'Putting greens',
    title: 'Backyard Putting Greens | TIMELESS Grass & Greens',
    description: `Backyard putting greens built for roll, not just for looks. Fringe, cup, breaks and slope. Denver, the Grand Strand and northeast Florida. Call ${P}.`,
    h1: 'Backyard putting greens.',
    lede: 'The green is the part of this trade people judge you on, and the part most installers treat as a lawn with a hole in it.',
    answer: {
      question: 'What goes into a backyard putting green?',
      answer: `A putting green is a base problem before it is a turf problem. TIMELESS Grass & Greens builds the sub-base to hold a true roll, sets the cups, cuts the fringe, and shapes break deliberately rather than by accident. Greens across Denver, the Grand Strand and northeast Florida. Call ${P}.`,
    },
    sections: [
      { h2: 'Roll is built underneath, not bought off a roll',
        body: [
          'A putting surface is only as true as what is under it. The turf itself is the last two hours of the job. Everything before that — excavation depth, base material, compaction in lifts, laser-checked grade — decides whether a ball holds its line or wanders.',
          'That is also why a green costs more per square foot than a lawn. You are not paying for greener turf. You are paying for a surface that behaves the same way twice.',
        ] },
      { h2: 'Break, if you want it, is designed',
        body: [
          'A flat green gets boring in a fortnight. Slope that was not planned gets frustrating in a day. We set break where you want to practice it and keep the rest true, then tell you where the ball will do something surprising before you find out yourself.',
        ] },
      { h2: 'The fringe is where installs come apart',
        body: [
          'The seam between putting surface and fringe takes traffic from both directions and is the first thing to lift on a rushed job. It gets a proper edge and a proper fastening.',
        ] },
    ],
  },
  {
    slug: 'residential-turf',
    name: 'Residential landscape turf',
    title: 'Residential Artificial Turf | TIMELESS Grass & Greens',
    description: `Artificial lawns installed for the soil you actually have — Front Range clay or coastal sand. Denver, the Grand Strand, northeast Florida. Call ${P}.`,
    h1: 'Artificial lawns.',
    lede: 'The same product installed three different ways, because the ground is different in each of our markets.',
    answer: {
      question: 'How is an artificial lawn installed?',
      answer: `Excavate, build and compact a base suited to the local soil, lay and seam the turf, then infill and groom. TIMELESS Grass & Greens builds against Front Range expansive clay in Colorado and against sand with a high water table on the coast. Residential lawns quoted across all three markets. Call ${P}.`,
    },
    sections: [
      { h2: 'Your soil decides the base',
        body: [
          'Front Range clay swells and shrinks with moisture, so a Denver base is built to stop the surface heaving. Coastal Carolina and northeast Florida are sand over a shallow water table, so those bases are built to move water. Same turf, different job, different number.',
          'An installer who quotes the same base everywhere has not looked at your soil.',
        ] },
      { h2: 'What it does not fix',
        body: [
          'Turf does not solve a drainage problem, it inherits one. If water pools in that spot now, it will pool under turf unless the grade and base are corrected first — which we will quote, or we will tell you the job is not worth doing.',
        ] },
    ],
  },
  {
    slug: 'pet-turf',
    name: 'Pet turf',
    title: 'Pet Turf Installation | TIMELESS Grass & Greens',
    description: `Pet turf that drains instead of holding odor. The infill and the base do that work, not a spray. Three markets. Call ${P}.`,
    h1: 'Pet turf.',
    lede: 'Odor is a drainage failure, not a turf failure. It is fixed underneath.',
    answer: {
      question: 'Does pet turf smell?',
      answer: `Only if the base cannot drain. Urine passes through the turf; what holds odor is infill that stays wet over a base compacted without a drainage layer. TIMELESS Grass & Greens builds pet installs with a different infill and a base designed to move liquid. Pet turf quoted across all three markets. Call ${P}.`,
    },
    sections: [
      { h2: 'Where the smell actually comes from',
        body: [
          'Liquid passes through the turf almost immediately. What matters is what happens in the next six inches. A base compacted flat with no drainage layer holds moisture against the backing, and that is what you smell in August.',
          'So a pet install is a different build, not a different marketing page. Ask any installer what changes between their standard base and their pet base. If nothing changes, nothing changes.',
        ] },
      { h2: 'Dogs dig at edges, so edges get fastened properly',
        body: [
          'The perimeter is the failure point with dogs. It gets a real edge restraint and real fastening, because a lifted corner becomes a destroyed lawn in one afternoon.',
        ] },
    ],
  },
  {
    slug: 'commercial-turf',
    name: 'Commercial turf',
    title: 'Commercial Artificial Turf | TIMELESS Grass & Greens',
    description: `Commercial turf for HOAs, daycares, pet facilities and multifamily. Colorado now treats functional turf differently — that matters here. Call ${P}.`,
    h1: 'Commercial turf.',
    lede: 'Common areas, daycares, pet facilities, multifamily. Where the rules are tighter and the scrutiny is real.',
    answer: {
      question: 'Can commercial property install artificial turf?',
      answer: `It depends on the state and on what the turf is for. In Colorado, SB24-005 as amended by HB25-1113 separates functional turf from non-functional on commercial and HOA-common property. TIMELESS Grass & Greens works to those rules rather than around them. Commercial work quoted across all three markets. Call ${P}.`,
    },
    sections: [
      { h2: 'Colorado draws a line that most installers have not read',
        body: [
          'Colorado now requires local governments to prohibit non-functional artificial turf on commercial, institutional, HOA-common, right-of-way and parking-lot property. Functional turf — recreation, playgrounds, sports surfaces — is exempt. Which side of that line your project falls on decides whether it can be built at all.',
          'We would rather tell you that at the quoting stage than after the base is in.',
        ] },
      { h2: 'Procurement, where it applies',
        body: [
          'Municipal and school work runs through bid thresholds and vendor registration that differ by county. Where a project is public, we will say plainly whether we are registered to bid it.',
        ] },
    ],
  },
  {
    slug: 'sports-field-turf',
    name: 'Sports field turf',
    title: 'Sports Field Turf Installation | TIMELESS Grass & Greens',
    description: `Synthetic sports surfaces for municipal complexes and schools. Functional turf is the exempt category under Colorado's 2026 rules. Call ${P}.`,
    h1: 'Sports fields.',
    lede: 'The category Colorado explicitly protects, and the work municipal parks departments are actually buying.',
    answer: {
      question: 'Who installs synthetic sports fields?',
      answer: `TIMELESS Grass & Greens installs synthetic sports surfaces across Denver, the Grand Strand and northeast Florida. Sports fields are functional turf, the category Colorado's 2026 rules exempt. Municipal complexes, schools and training facilities. Call ${P}.`,
    },
    sections: [
      { h2: 'Functional turf is the protected category',
        body: [
          'Where Colorado now restricts non-functional artificial turf on commercial and institutional property, recreational and sports surfaces are exempt. A municipality replacing a field is on the safe side of the statute, and that is worth knowing before a council meeting rather than after.',
        ] },
      { h2: 'Heat is the question you will be asked',
        body: [
          'Any parks board evaluating synthetic will raise surface temperature, and they should. Measured across a full day, synthetic surfaces averaged about 117&deg;F against 78&deg;F for natural grass. We bring the measurements rather than avoiding the subject, and we will tell you where shade or scheduling matters more than product choice.',
        ] },
    ],
  },
  {
    slug: 'indoor-turf',
    name: 'Indoor facility turf',
    title: 'Indoor Turf Installation | TIMELESS Grass & Greens',
    description: `Turf for gyms, training facilities and indoor sports spaces. No UV load, no drainage — different problems entirely. Call ${P}.`,
    h1: 'Indoor turf.',
    lede: 'Indoors removes the two things that usually drive the spec, and introduces two others.',
    answer: {
      question: 'How is indoor turf different from outdoor?',
      answer: `Indoors there is no UV degradation and no drainage requirement, so the spec is driven by traffic, pad thickness and how the turf is fixed to a hard floor instead. TIMELESS Grass & Greens installs indoor turf for gyms and training facilities across three markets. Call ${P}.`,
    },
    sections: [
      { h2: 'What stops mattering, and what starts',
        body: [
          'UV stability and drainage are the two specs that dominate an outdoor job, and indoors neither applies. What replaces them is traffic pattern, pad thickness under the turf, and how the surface is fixed down without damaging the floor beneath it.',
          'That usually means a lower pile and a denser stitch than the same client would want in a garden.',
        ] },
    ],
  },
  {
    slug: 'turf-removal-and-replacement',
    name: 'Removal and replacement',
    title: 'Turf Removal & Replacement | TIMELESS Grass & Greens',
    description: `Failed turf pulled, base assessed, and an honest answer on whether the base can be reused. Three markets. Call ${P}.`,
    h1: 'Removal and replacement.',
    lede: 'Somebody else installed it, it failed, and the question is whether the base underneath is worth keeping.',
    answer: {
      question: 'Can old artificial turf be replaced without redoing the base?',
      answer: `Sometimes. If the base was built properly and has not settled, it can be reused and the job costs far less. If it was compacted flat with no drainage layer, reusing it repeats the failure. TIMELESS Grass & Greens assesses the base before quoting. Call ${P}.`,
    },
    sections: [
      { h2: 'We look underneath before we quote',
        body: [
          'Most failed installs failed underneath. Lifting a corner and checking depth, material and compaction takes twenty minutes and decides whether your replacement costs half what you expect or the same as starting over.',
          'An installer who quotes a replacement without looking under the existing turf is guessing with your money.',
        ] },
      { h2: 'Where the old turf goes',
        body: [
          'Removal produces a genuinely awkward volume of material. We will tell you where it goes and what the haul-off costs, as a line on the quote rather than a surprise.',
        ] },
    ],
  },
];

export const serviceBySlug = (s: string) => SERVICES.find((x) => x.slug === s);
