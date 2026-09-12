/**
 * Service pages — one sales page per service (src/pages/services/[slug].astro).
 *
 * Written from a buyer-research pass (2026-09-10): what people want from each service, the
 * options they choose, and the questions they ask, taken from competitor FAQs and search results.
 * Every line says what the customer gets.
 *
 * Claims about the business trace to the discovery call or the old site: the services list,
 * 13 years' experience, premium American-made turf, a free visit, a custom layout approved before
 * install, prep/base/turf/finishing/cleanup and a care walkthrough. Broad safety assurances are
 * omitted without product-specific evidence. Public answers focus on use, scope, care and project
 * decisions. Original supporting source text is preserved in editorial-research-archive.json; public references are
 * selected separately so internal research is not automatically appended to sales pages.
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
  /** Included work, tailored to this service rather than a shared outdoor specification. */
  inclusions: string[];
  options: { heading: string; items: string[] };
  /** Answers may hold source links; they render with set:html. */
  faq: { q: string; a: string }[];
  close: string;
  answer: { question: string; answer: string };
};

const P = '303-349-2368';

export const SERVICES: Service[] = [
  {
    slug: 'putting-greens',
    name: 'Putting greens',
    title: 'Backyard Putting Greens | TIMELESS Grass & Greens',
    description: "Backyard putting greens with a custom layout, cup positions and fringe. Denver, the Grand Strand and northeast Florida. Free estimate: 303-349-2368.",
    preset: 'Putting green',
    icon: 'flag',
    line: 'Practice your putting right outside your back door.',
    eyebrow: 'Backyard putting greens',
    h1: 'Your own green, steps from the back door.',
    lede: "Make room for a few putts before work or an evening practice session. We draw the shape, break and cup positions for your yard, then give you a written price.",
    wins: ["A custom layout you approve before installation", "Cup positions, break and fringe chosen for your game", "A free visit and written price"],
    heroShot: 'fin-6',
    benefitsHeading: 'The short game, at home.',
    benefits: [
      { icon: "flag", h: "Practice close to home", p: "Ten minutes before work or an hour after dinner. No tee time, no drive." },
      { icon: "layout", h: "Putts worth practicing", p: "Choose cup positions, slopes and the putting surface around the shots you want to work on." },
      { icon: "home", h: "Room for more than golf", p: "Fit the green around your patio, planting beds and the way you use the rest of the yard." },
    ],
    workHeading: 'Greens we’ve built.',
    work: ['fin-1', 'fin-5', 'fin-9', 'ctx-3'],
    inclusions: [
      "A free visit to measure the space and discuss your practice goals",
      "Turf options, a custom layout and a written price",
      "Your approval of the shape and cup positions before work starts",
      "Site preparation and base shaping for the agreed layout",
      "Putting turf, cups, seams, edges and the selected infill",
      "Cleanup and a walkthrough of brushing, debris removal and other care",
    ],
    options: {
      "heading": "Choose what you want to practice.",
      "items": [
        "Cup positions for short and longer putts",
        "A fringe or collar around the green",
        "Contours and breaks for different putting lines",
        "A chipping area or tee line where the space suits it",
        "Surface options and the roll you prefer",
        "A shape that leaves room for the rest of the yard"
      ]
    },
    faq: [
      {
        "q": "What affects the price of a putting green?",
        "a": "The footprint, access, removal, base shaping, cup positions and fringe all affect the scope. We review the site and provide a custom layout and written price before work starts."
      },
      {
        "q": "How many cups do I need?",
        "a": "Think about the putts you want to practice and the space available. A compact green can be useful without adding cups that all create the same putt. We discuss positions and contours on the visit."
      },
      {
        "q": "Can I choose how it rolls?",
        "a": "Putting-grade turf, shaping, infill and brushing influence the roll. Discuss your preferred speed and breaks before selecting the system, including what can be adjusted later and the care that requires."
      },
      {
        "q": "Can I chip onto it?",
        "a": "Include the approach area and intended shots in the design conversation. Chipping can be part of the layout where the space and selected system suit it."
      },
      {
        "q": "What upkeep does it need?",
        "a": "Clear leaves and debris, brush as the product requires and inspect infill, seams and edges. The green needs no irrigation to grow, but cleaning can use water. We explain care for the selected system."
      },
      {
        "q": "What should I check with my HOA?",
        "a": "Bring the landscape guidelines and a sketch showing the patio, paths and proposed green. Ask which layout and product information the association needs, and confirm any separate local requirements before the design is finalized."
      }
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
    description: "Artificial lawn installation with a custom layout, site preparation and written price. Denver, the Grand Strand and northeast Florida. Free estimate: 303-349-2368.",
    preset: 'Lawn',
    icon: 'leaf',
    line: "Spend less time mowing, with an artificial lawn planned around your yard and its use.",
    eyebrow: 'Artificial grass lawns',
    h1: "Less mowing. More room to enjoy the yard.",
    lede: "Replace the lawn you keep mowing with a surface planned around your patio, paths and daily use. Compare turf options and a custom layout at your free visit.",
    wins: [
      "Skip mowing in the area you convert",
      "Choose the look and footprint for your yard",
      "Review the layout and price before work starts"
    ],
    heroShot: 'fin-2',
    benefitsHeading: 'Your weekends, back.',
    benefits: [
      { icon: "clock", h: "A different care routine", p: "Skip mowing and reseeding. Keep the surface in shape with debris removal, brushing and cleaning as needed." },
      { icon: "layout", h: "Change the space you use", p: "Choose a whole lawn or a smaller area beside the patio, along a path or in a side yard." },
      { icon: "sparkle", h: "A finished edge", p: "Plan how the turf meets beds, concrete and pavers, with seams and borders included in the installation." },
    ],
    workHeading: 'Lawns we’ve installed.',
    work: ['fin-8', 'fin-7', 'det-3', 'det-2'],
    inclusions: [
      "A free visit to measure the lawn area and check the ground and drainage",
      "Turf options, a custom layout and a written price",
      "Your approval of the design before work starts",
      "Removal and site preparation for the agreed lawn area",
      "Base installation, turf placement, seams, edges and selected infill",
      "Cleanup and a walkthrough of the lawn’s care needs",
    ],
    options: {
      "heading": "Choose the lawn and its edges.",
      "items": [
        "Turf height, color and blade shape",
        "Turf and infill options with sun exposure considered",
        "Transitions to existing rock, pavers or concrete",
        "Turf strips around patios and between pavers",
        "A whole lawn, side yard or smaller usable area",
        "Removal and preparation defined for the chosen footprint"
      ]
    },
    faq: [
      {
        "q": "What affects the cost of a lawn installation?",
        "a": "Area, removal, access, preparation, drainage and edge details affect the price alongside the turf choice. Check that the written estimate identifies those items and cleanup, and agree how any changed work would be handled before proceeding."
      },
      {
        "q": "Does artificial grass get hot?",
        "a": "It can get hot in direct sun. Consider shade and where people or pets will spend time, and check surface conditions before use. Cooling from rinsing can be brief, so include the sunny areas in the layout discussion."
      },
      {
        "q": "Will I still need to use water?",
        "a": "Artificial turf needs no irrigation for growth. Rinsing, cleaning or occasional cooling can still use water. Include those uses when comparing the care routine with your current lawn."
      },
      {
        "q": "Will it drain after heavy rain?",
        "a": "Water needs a route through the turf and base and away from the work area. Show us wet spots and existing drains at the visit so the scope can address those conditions. Drainage and surface condition determine when the area is ready to use after rain."
      },
      {
        "q": "Can I keep some natural grass?",
        "a": "The layout can focus on the area you want to change. Discuss how the new turf meets the remaining lawn, planting beds and paths so transitions and maintenance access are part of the work."
      },
      {
        "q": "How do I keep it looking good?",
        "a": "Remove debris, follow the product’s brushing and cleaning guidance, and inspect seams and edges. Pets and heavy traffic can add care needs. We discuss the routine for your chosen surface."
      }
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
    description: "Pet turf installation for dog runs and lawns, with drainage, infill and cleaning access planned for your pets. Free visit and written estimate: 303-349-2368.",
    preset: 'Pet turf',
    icon: 'paw',
    line: "A dog run or pet lawn planned around drainage, secure edges and regular cleaning.",
    eyebrow: 'Pet turf',
    h1: "Give your dog a place of their own.",
    lede: "Plan a dog run or pet lawn around the door your dog uses, the space available and access for cleaning. We check the ground, discuss turf and infill, and put the layout and price in writing.",
    wins: ["A layout for the way your dog uses the yard", "Drainage and cleaning access considered together", "Care needs explained before installation"],
    heroShot: 'fin-3',
    benefitsHeading: "A pet area you can look after.",
    benefits: [
      { icon: "paw", h: "A defined place to go", p: "Choose a potty area, side-yard run or larger pet lawn around your dog’s daily routine." },
      { icon: "drop", h: "Plan for cleaning", p: "Base, backing and infill choices belong alongside a practical route for rinsing and regular care." },
      { icon: "shield", h: "Attention to the edges", p: "Seams and borders are secured along the agreed layout. Tell us about digging habits before choosing the design." },
    ],
    workHeading: 'Yards we’ve installed.',
    work: ['fin-8', 'det-3', 'fin-2', 'det-1'],
    inclusions: [
      "A free visit to measure the pet area and discuss how it will be used",
      "Review of drainage, cleaning access, turf and infill options",
      "A custom layout and written price to approve before work starts",
      "Site preparation and a base for the agreed pet area",
      "Turf placement, secured seams and edges, and selected infill",
      "Cleanup and a walkthrough of waste removal, rinsing and ongoing care",
    ],
    options: {
      "heading": "Set it up for your dog.",
      "items": [
        "Backing and turf suitable for the proposed pet use",
        "Preparation planned around the water route",
        "Infill matched to the product and property requirements",
        "Pile options considered alongside cleaning needs",
        "A defined potty zone, run or larger pet lawn",
        "Edges planned around gates, fences and beds"
      ]
    },
    faq: [
      {
        "q": "Will pet turf smell?",
        "a": "It can. Waste pickup, drainage and regular cleaning matter, and a good installation does not make the surface odor-proof. <a href=\"/blog/why-does-artificial-turf-smell-like-dog-pee/\">Learn what to check when pet turf develops odor.</a>"
      },
      {
        "q": "What affects the installation price?",
        "a": "The area, removal, gate access, preparation, drainage and finished edges all contribute to the scope. On the visit, show us the route from the house, favorite toilet spots and any digging areas, along with where you will pick up waste and rinse the surface."
      },
      {
        "q": "Does urine drain through the turf?",
        "a": "Permeable backing lets liquid pass into the base; the rest of the system determines where it goes next. Show us existing drains and wet spots when planning the area. Rinsing access matters alongside the drainage route."
      },
      {
        "q": "Can it get too hot for my dog?",
        "a": "Turf can become hot in direct sun. Plan shade and access to a cooler resting place, and check the surface before your dog uses it."
      },
      {
        "q": "Can my dog damage the edges?",
        "a": "Tell us about digging and chewing before the design is agreed. Secured seams and edges are part of the installation; inspect them regularly and discuss damage if it develops."
      },
      {
        "q": "How do I clean it?",
        "a": "Pick up solids, rinse urine spots and follow the turf and cleaner instructions. The routine depends on use and conditions. Inspect infill and edges too, and investigate persistent odor before deciding on extra treatment, repair or replacement."
      }
    ],
    close: 'Ready to plan your dog’s space?',
    answer: {
      question: 'Does pet turf smell?',
      answer: 'Pet turf can develop odor and needs ongoing cleaning. We plan the base, infill and access around how the pet area will be used, and explain its care needs before installation.',
    },
  },
  {
    slug: 'commercial-turf',
    name: 'Commercial turf',
    title: 'Commercial Artificial Turf | TIMELESS Grass & Greens',
    description: "Turf installation for daycares, pet facilities and shared spaces, with the use, site preparation and care needs defined in the quote. Free estimate: 303-349-2368.",
    preset: 'Commercial or sports field',
    icon: 'building',
    line: 'Turf for daycares, pet daycares and common areas, with maintenance planned around daily use.',
    eyebrow: 'Commercial turf',
    h1: "Make the shared space worth using.",
    lede: "Plan turf for a daycare, pet facility, courtyard or common area around the people who use it and the team who maintains it. Start with a free visit and a written scope and price.",
    wins: ["Surface choices for the intended use", "Preparation and drainage considered before pricing", "Layout and care needs clear before installation"],
    heroShot: 'fin-4',
    benefitsHeading: "A useful space with a clear plan.",
    benefits: [
      { icon: "layout", h: "Choose the right use", p: "Define the play area, dog run or gathering space before selecting a surface and any pad." },
      { icon: "drop", h: "Look beyond the surface", p: "Review the work area, installation access and drainage as part of planning the project." },
      { icon: "clock", h: "Know the upkeep", p: "Plan cleaning and grooming around daily use, even where turf replaces mowing and lawn irrigation." },
    ],
    workHeading: 'Some of our work.',
    work: ['ctx-1', 'fin-7', 'fin-9', 'det-2'],
    inclusions: [
      "A free visit to review the area and its intended use",
      "Turf and system options for the proposed commercial space",
      "A custom layout and written price, approved before work starts",
      "Site preparation and base installation for the agreed scope",
      "Turf, seams, edges and the pad or infill specified for the project",
      "Cleanup and a care walkthrough for the finished surface",
    ],
    options: {
      "heading": "Match the surface to the activity.",
      "items": [
        "Play areas with turf and any required pad selected together",
        "Pet-facility layouts with cleaning access and drainage considered",
        "Courtyards, gathering spaces and other proposed shared uses",
        "Games, colors and lines agreed in the layout",
        "Access routes and transitions suited to the site",
        "A construction-access and care plan discussed before work"
      ]
    },
    faq: [
      {
        "q": "What affects the commercial installation price?",
        "a": "The area, existing surface, removal, access, base and drainage work, selected system and finishing details determine the scope. We provide a written price after a free site visit."
      },
      {
        "q": "How do we choose a playground surface?",
        "a": "Review the equipment, fall height and accessibility requirements for the complete turf-and-pad system. Ask for the test documentation for the proposed combination before selecting it."
      },
      {
        "q": "What does a pet facility need to plan?",
        "a": "Discuss the number of dogs, busy areas, waste pickup, cleaning access and water route. Pick the turf and care routine together. Odor can still develop and needs ongoing attention."
      },
      {
        "q": "Can we keep the property open during installation?",
        "a": "Discuss the routes and hours that need to remain available. Delivery, removal and installation access should be agreed in the project schedule, with temporary closures identified before work starts."
      },
      {
        "q": "What approvals should we check?",
        "a": "Confirm the intended use and full scope with the responsible local reviewer and property authority. Include the people who approve, operate and maintain the space, and agree who will obtain the required approvals and product documents. Bring any applicable site or landscape plan to the visit."
      },
      {
        "q": "What care remains after grass is removed?",
        "a": "The converted area no longer needs mowing, but grooming, debris removal, cleaning and inspections remain. Plan for hot weather and surface checks as well as the routine tasks, with responsibility assigned to the people maintaining the space."
      }
    ],
    close: 'Ready to plan the shared space?',
    answer: {
      "question": "What should a commercial turf project include?",
      "answer": "Start with the activity, traffic and care needs of the space. The installation scope should cover the selected surface system, preparation, drainage, access and finishing. Timeless offers a free site visit, custom layout and written price, with property requirements checked before work begins."
    },
  },
  {
    slug: 'sports-field-turf',
    name: 'Sports field turf',
    title: 'Sports Field Turf | TIMELESS Grass & Greens',
    description: "Sports turf for schools, parks and training facilities, with layout, surface options and site preparation planned for the sport. Free estimate: 303-349-2368.",
    preset: 'Commercial or sports field',
    icon: 'trophy',
    line: 'A playing surface planned around the sport, site drainage and maintenance needs.',
    eyebrow: 'Sports field turf',
    h1: "A field planned for the way you play.",
    lede: "Choose the playing area, lines and surface for your sport, then work through the base, drainage and maintenance needs. We start with a free visit, a layout and a written price.",
    wins: ["A layout for the sport and available space", "Turf, pad and infill choices considered together", "Preparation and care included in the discussion"],
    heroShot: 'ctx-1',
    benefitsHeading: "Start with the game and the ground.",
    benefits: [
      { icon: "layout", h: "Lay out the play", p: "Plan field markings, practice areas and any shared uses before the turf is ordered." },
      { icon: "shield", h: "Define the system", p: "Discuss turf, infill, any pad and the testing your project requires. Include the selected system in the scope." },
      { icon: "clock", h: "Plan for the season ahead", p: "Account for grooming, infill checks and cleaning. Surface condition and weather still affect when a field can be used." },
    ],
    workHeading: "Outdoor turf and green projects.",
    work: ['ctx-2', 'fin-4', 'fin-7'],
    inclusions: [
      "A free visit to discuss the sport, layout and work area",
      "Surface, pad and infill options for the proposed use",
      "A custom layout and written price, approved before work starts",
      "Preparation and base installation for the agreed field scope",
      "Turf, seams, perimeter edges and the agreed markings and infill",
      "Cleanup and a walkthrough of the surface’s care needs",
    ],
    options: {
      "heading": "Choose the field details.",
      "items": [
        "Playing surface and base-path treatment",
        "Permanent lines for the intended sports",
        "Practice areas, bullpens and cage layouts",
        "A pad where called for by the selected system",
        "Infill evaluated with the surface and its maintenance needs",
        "Agreed logos and team colors"
      ]
    },
    faq: [
      {
        "q": "What do you need to start an estimate?",
        "a": "The address, sport, approximate dimensions and whether this is a new field or a replacement. Existing drawings, known drainage problems and required access or closure dates help define the site visit."
      },
      {
        "q": "How should we compare field proposals?",
        "a": "Compare the same playing area and intended sports. Each scope should identify excavation, removal, base, drainage, turf, any pad, infill, markings and perimeter details. Ask which product documents, installation access and reopening requirements are included alongside the price."
      },
      {
        "q": "Which pad and infill should we choose?",
        "a": "Review the complete proposed system for the intended sport, traffic and project requirements. Ask for the relevant product and test documentation, then compare care needs and price for that combination of turf, pad and infill."
      },
      {
        "q": "Will the field be ready immediately after rain?",
        "a": "Drainage, the storm and surface condition determine when play can resume. Check the field after rain and keep the facility’s weather and surface-use procedures in the operating plan."
      },
      {
        "q": "How does hot weather affect use?",
        "a": "Turf can become hot in direct sun. Discuss surface checks, shade or rest areas and the facility’s hot-weather procedures before opening the field. Consider heat alongside the other requirements when comparing systems."
      },
      {
        "q": "What does long-term maintenance involve?",
        "a": "Plan for grooming, cleaning, infill checks, seam and edge inspections, repairs and eventual replacement. Assign responsibility and provide access for the equipment the selected system needs."
      }
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
    preset: "Indoor turf",
    icon: 'dumbbell',
    line: 'Turf for gyms and training facilities, so your athletes can train all year.',
    eyebrow: 'Indoor turf',
    h1: "Make room for the way you train.",
    lede: "Sled lanes, sprint tracks and training floors laid out around your gym. Compare turf, pad and marking options, with the floor preparation and written price agreed before installation.",
    wins: ["A layout for your lanes and training space", "Turf and pad options for the intended use", "Lines, logos and edges planned together"],
    heroShot: null,
    benefitsHeading: 'Made for how your members train.',
    benefits: [
      { icon: "dumbbell", h: "Plan the training lanes", p: "Discuss sled routes and seam positions, with gym turf chosen for the activities you run." },
      { icon: "layout", h: "Make the layout yours", p: "Choose yard markers, lane lines, agility ladders and an inlaid logo where they serve the training plan." },
      { icon: "home", h: "Fit the existing floor", p: "Review the slab or rubber flooring, transitions and attachment method before deciding on the system." },
    ],
    workHeading: 'Some of our outdoor work.',
    work: ['fin-9', 'det-2', 'fin-2'],
    inclusions: [
      "A free visit to measure the training space and review the existing floor",
      "Turf, pad and attachment options for the intended activities",
      "A custom layout and written price, approved before work starts",
      "Floor preparation identified for the selected system",
      "Turf placement, seams, edges and any agreed lines or logos",
      "Infill only where the selected indoor system calls for it",
      "Cleanup and a walkthrough of cleaning and care",
    ],
    options: {
      "heading": "Lay out the training space.",
      "items": [
        "Sled lanes and sprint routes",
        "Turf with an attached cushion or separate pad where suitable",
        "Infill requirements of the selected system",
        "Agreed markers, lane lines and agility patterns",
        "Logos and team colors",
        "Transitions between turf and the existing floor"
      ]
    },
    faq: [
      {
        "q": "Can it go over our existing concrete or rubber floor?",
        "a": "Review the existing floor and selected turf, pad and attachment together. Point out damage, uneven areas and transitions, and confirm any landlord or facility approval so preparation and access can be agreed before pricing."
      },
      {
        "q": "Can we use sleds on it?",
        "a": "Describe the sleds, loads, routes and traffic you expect. Choose a product intended for those activities and discuss seam positions and care before installation."
      },
      {
        "q": "What affects the price of an indoor installation?",
        "a": "The footprint, existing floor, removal or preparation, attachment method, turf and pad, seams and any markings contribute to the quote. We review the space and put the agreed work in writing."
      },
      {
        "q": "When can we restart classes?",
        "a": "Agree reopening requirements for the selected system and attachment method before scheduling classes. Include preparation and curing time, identify any routes or equipment that need to move, and plan how the area will be cleared for the work."
      },
      {
        "q": "Does indoor turf need infill?",
        "a": "That depends on the selected product and system. The installation scope identifies any infill required for the proposed floor."
      },
      {
        "q": "How should staff clean the floor?",
        "a": "Follow the selected product’s instructions for vacuuming or sweeping, spot cleaning and any equipment used on the turf. Plan the routine around your activities and high-traffic areas."
      }
    ],
    close: 'Ready to plan your floor?',
    answer: {
      question: 'How is indoor turf different from outdoor?',
      answer: 'An indoor installation starts with the existing floor and intended activities. Turf, any pad, attachment, seams and infill are selected as a system for that space, with cleaning and reopening requirements discussed before work begins.',
    },
  },
  {
    slug: 'turf-removal-and-replacement',
    name: 'Turf replacement',
    title: 'Artificial Turf Removal & Replacement | TIMELESS Grass & Greens',
    description: "Artificial turf removal and replacement, with the existing surface and base assessed before the scope is agreed. Free visit and written price: 303-349-2368.",
    preset: 'Replace old turf',
    icon: 'refresh',
    line: "Replace worn turf with the existing base, edges and drainage considered before the new installation.",
    eyebrow: 'Turf removal and replacement',
    h1: "Worn turf? Plan what comes next.",
    lede: "Tell us what has worn out or stopped working. We review the existing area, discuss what can stay and price the removal, preparation and new turf before you commit.",
    wins: ["Existing turf and base considered before replacement", "Removal and preparation defined in the quote", "A choice of lawn, pet turf or putting green"],
    heroShot: 'fin-8',
    benefitsHeading: "Decide what stays and what changes.",
    benefits: [
      { icon: "refresh", h: "A clear removal scope", p: "Identify the turf and infill to be removed, with haul-away included in the agreed job." },
      { icon: "shovel", h: "Check the existing base", p: "Discuss its condition and drainage before deciding whether to reuse, regrade or rebuild it." },
      { icon: "layout", h: "Choose the next use", p: "Replace like for like or plan a pet area or putting green, with new seams and edges in the layout." },
    ],
    workHeading: "Finished turf and edge details.",
    work: ['fin-2', 'det-1', 'det-3'],
    inclusions: [
      "A free visit to discuss the existing turf and the reason for replacement",
      "Review of the base, drainage and any limits on what can be assessed before removal",
      "Turf options, an approved layout and a written price",
      "Removal and haul-away of the agreed turf and infill",
      "Base work defined in the scope, then new turf, seams, edges and selected infill",
      "Cleanup and a walkthrough of care for the replacement surface",
    ],
    options: {
      "heading": "Define the replacement work.",
      "items": [
        "Removal and haul-away of the agreed surface",
        "Handling of existing infill included in the scope",
        "Assessment of the base and existing grades",
        "Regrading, recompaction or rebuilding where needed",
        "Drainage changes identified before installation",
        "New turf, seams, edges and transitions"
      ]
    },
    faq: [
      {
        "q": "How do I know the turf needs replacing?",
        "a": "Worn fibers, damaged backing or recurring loose seams are reasons to assess the surface. For odor or puddles, review care and drainage as well as the turf condition before choosing cleaning, repair or replacement."
      },
      {
        "q": "Can you reuse the existing base?",
        "a": "Sometimes. Its condition, drainage and the proposed use need assessment. Identify what can stay and what may only become clear after removal, then agree how any findings and changed work will be discussed before proceeding. Records of the original installation or repairs can help."
      },
      {
        "q": "What affects the replacement price?",
        "a": "Area, removal, access, infill handling, base work, drainage and the new product all affect the scope. Discuss possible hidden conditions and how any additional work would be agreed."
      },
      {
        "q": "What happens to the old turf?",
        "a": "Confirm the removal and haul-away arrangements in the scope. Ask about locally available reuse or recycling options before assuming either is included or available."
      },
      {
        "q": "Can I change a lawn into pet turf or a green?",
        "a": "The replacement can be planned for a different use, subject to the space and selected system. A new contour, cup layout or pet-area drainage need can change the work beneath the surface."
      },
      {
        "q": "Do the same approvals still apply?",
        "a": "Check the proposed replacement against current property and project requirements. Include changes to materials, use, the base and drainage when confirming which approvals apply."
      }
    ],
    close: 'Ready to start fresh?',
    answer: {
      question: 'Can old artificial turf be replaced without redoing the base?',
      answer: 'Sometimes. We assess the existing area and discuss whether the base can be reused or needs work. The quote defines the proposed removal, preparation and replacement; odor or puddles alone do not determine that scope.',
    },
  },
];

export const serviceBySlug = (s: string) => SERVICES.find((x) => x.slug === s);
