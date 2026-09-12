import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { MARKET_STATES } from './data/service-territory.mjs';

const status = z.enum(['draft', 'review', 'published']).default('draft');

/* Articles: one Markdown file per question a buyer actually asks (src/content/blog/*.md).
   The frontmatter carries what the page needs around the body: the short answer (answer box and
   speakable), a FAQ (FAQPage), internal evidence, selected public references, and the service,
   area and guide pages it hands the reader on to. Same rules as the rest of the site: claims about
   the business come only from the call or the old site; consequential claims retain source support. */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    status,
    title: z.string().max(70),
    description: z.string().max(170),
    h1: z.string(),
    topic: z.enum(['Costs and planning', 'Lawns', 'Pets', 'Putting greens', 'Heat and safety', 'Care and lifespan', 'Local rules', 'Commercial and sports']),
    published: z.string(),
    updated: z.string(),
    answer: z.object({ question: z.string(), answer: z.string() }),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    sources: z.array(z.object({ label: z.string(), url: z.string().url(), checked: z.string().optional() })).min(1),
    publicReferences: z.array(z.string().url()).default([]),
    related: z.object({
      services: z.array(z.string()).default([]),
      markets: z.array(z.string()).default([]),
      guides: z.array(z.string()).default([]),
    }).default({ services: [], markets: [], guides: [] }),
  }).refine((d) => d.publicReferences.every((url) => d.sources.some((s) => s.url === url)), { message: 'Public references must have a matching source record.', path: ['publicReferences'] }),
});

/* Town pages (src/content/towns/{town-st}.json) and the six market × service pages
   (src/content/local-services/{market}--{service}.json). Written from the town research in
   src/data/cities/ and the cited sources already on the site; scripts/check-local-content.mjs
   checks every number against the research, every link against the sources, and every page
   against every other for near-duplicate text. */
const link = z.object({ label: z.string(), url: z.string().url() });
const block = z.object({ icon: z.string(), kicker: z.string(), h2: z.string(), paras: z.array(z.string()).min(1) });
const MARKET = z.enum(['denver-metro', 'grand-strand', 'northeast-florida']);
const towns = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/towns' }),
  schema: z.object({
    status,
    market: MARKET,
    name: z.string(),
    state: z.enum(['CO', 'SC', 'NC', 'FL']),
    placeType: z.enum(['City', 'Place']).default('Place'),
    parentPlace: z.string().optional(),
    county: z.string().nullable().optional(),
    title: z.string().max(70),
    description: z.string().max(170),
    h1: z.string(),
    lede: z.string(),
    wins: z.array(z.string()).length(3),
    answer: z.object({ question: z.string(), answer: z.string() }),
    blocks: z.array(block).min(1).max(4),
    services: z.array(z.string()).min(2).max(4),
    servicesNote: z.string(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).max(6).default([]),
    nearby: z.array(z.string()).min(2).max(6),
    sources: z.array(link).min(2),
    publicReferences: z.array(z.string().url()).default([]),
    checked: z.string(),
    /* Nearby research incorporated here; distinct future pages remain possible. */
    foldedFrom: z.array(z.string()).optional(),
  }).refine((d) => MARKET_STATES[d.market].includes(d.state), { message: 'State must belong to the selected market.', path: ['state'] })
    .refine((d) => d.publicReferences.every((url) => d.sources.some((s) => s.url === url)), { message: 'Public references must have a matching source record.', path: ['publicReferences'] }),
});
const localServices = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/local-services' }),
  schema: z.object({
    status,
    market: MARKET,
    service: z.string(),
    title: z.string().max(70),
    description: z.string().max(170),
    h1: z.string(),
    lede: z.string(),
    wins: z.array(z.string()).length(3),
    answer: z.object({ question: z.string(), answer: z.string() }),
    blocks: z.array(block).min(1).max(4),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).max(6).default([]),
    towns: z.array(z.string()).default([]),
    sources: z.array(link).min(2),
    publicReferences: z.array(z.string().url()).default([]),
    checked: z.string(),
  }).refine((d) => d.publicReferences.every((url) => d.sources.some((s) => s.url === url)), { message: 'Public references must have a matching source record.', path: ['publicReferences'] }),
});

export const collections = { blog, towns, localServices };
