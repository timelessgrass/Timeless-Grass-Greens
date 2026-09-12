# Timeless Grass & Greens

Installation website for Timeless Grass & Greens, built with Astro and GSAP. Astro generates static HTML for Netlify; pages do not depend on client-side JavaScript for their content.

## Local development

Use Node 24, matching `netlify.toml`.

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Development previews keep estimate answers local and display an explicit preview message instead of submitting a lead.

## Build and verify

```sh
npm run check
npm run build
npx playwright install chromium
npm test
```

`npm test` runs TypeScript checks, publication/territory tests, a real build with temporary unpublished fixtures, and desktop/mobile browser tests. Every test POST is intercepted locally. These tests verify the form experience, not Netlify notification delivery.

`npm run preview -- --host 127.0.0.1` serves the generated `dist` directory. A static preview does not provide Netlify Forms processing.

## Content publication

Town, regional-service and blog records use `status: draft`, `review` or `published`. Missing status defaults to draft. All three states require the full collection schema; keep incomplete briefs in `plans/`. Only published records generate pages, hub links, sitemap entries and Markdown copies.

New locality pages also need approved service territory and sourced, distinct customer value. Territory eligibility is in `src/data/service-territory.mjs`; research is in `src/data/cities/` and `src/data/local-evidence.json`. Page length is a diagnostic, not a publication requirement. Build checks catch missing sources, unsupported numeric claims, repeated text, conflicting routes and broken/orphan links; editorial review still determines whether a page is useful.

The current site contains 89 town/locality pages, six regional-service pages and 29 articles, alongside the service, market and guide pages. The Grand Strand research and expansion queue are in `plans/seo-aeo/`.

## Hosting and launch

Netlify builds with `npm run build` and publishes `dist`. A push to `main` triggers deployment. This completion pass is local; nothing was pushed or deployed.

The existing installation canonical is configured as `https://www.timelessgrass.com`. The cleaning site's undecided domain does not block this build. Before production launch, verify the installation domain and Netlify form detection, notification recipient and receipt of an approved test lead. Do not treat local mock submission success as delivery evidence.

## Dependency maintenance

The September 11, 2026 audit reports pre-existing Astro 5 / Sharp / esbuild advisories. This project serves static output and builds checked-in JPEGs, with no upload endpoint or runtime image processing. No exposed path to the cited AVIF-processing or Windows-server issues was found in this configuration. Astro 5 has no patch release that clears the audit; remediation requires a separately verified major upgrade. Do not use an unreviewed force upgrade.
