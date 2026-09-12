# DESIGN.md — TIMELESS Grass & Greens

The single source of truth for the visual system. If a page disagrees with this file,
the page is wrong. Values are measured, not chosen — see `archive/brand/tokens.md`.

## The object

**The cup and flagstick on a mown green.** Brian designed the mark himself around a
putting green with two flags, and his own test of a competitor's work is whether the
green is blown clean. Every colour, weight and motion decision traces back to that.

## Homepage order (2026-09-10)

Every line says what the customer gets; Ty's test is "would a homeowner care?". Order: dark
hero (Call + free estimate, three proof points) → services → photographs → before/after
(gated) → why choose us (four benefits, zoom photo) → how it works (four static steps) → areas → FAQ →
close + form. "Who shows up", "what goes wrong", "the written quote" and "the finish" were cut
the same day: business structure, soil science and process philosophy no buyer asked about.
The numbers ledger, the answer box and the close fold into the hero, the areas section and the
form section, so the last thing on the page is the thing to do. The original structural model was
greenforeverarizona.com/artificial-turf/; we keep its motion vocabulary, never its review
count-up or homeowner count — neither is sourced here.

## Colour — `src/styles/tokens.css`

| Role | Token | Value | From |
|---|---|---|---|
| Ground | `--ground` | `#EFEDE7` | chalk — the cup liner. Never `#fff` |
| Band | `--ground-band` | `#E7E4DC` | tonal alternate |
| Dark | `--ground-dark` | `#0E0E0C` | 38.4% of the mark is black |
| Deep green | `--ground-green` | `#16330C` | the green in shadow — interstitials only |
| **Accent (the only one)** | `--accent` | `#307408` | ribbon's deep stop, away from Murphy's sage |
| Accent on dark | `--accent-on-dark` | `#8ACF35` | ribbon's light stop; dark ground only |
| Ribbon | `--ribbon` | `#48A008 → #80D028 → #409800` | the mark's own gradient — hairlines and the process bar |
| Ink | `--ink` | `#15150F` at 1 / .68 / .14 | one text colour, four opacities, no second grey |

The wordmark gold (`#DEBA1F`) lives in the logo and is **never** a system colour.
Section rhythm alternates **dark → ground → band → ground → deep green → …** so no two
adjacent sections share a ground. The homepage sets the pattern; sub-pages follow it.

## Type

- **Display:** Newsreader 400/500/600, `letter-spacing: -.022em`, line-height ≈ 1.0.
- **Body:** Instrument Sans 400/500/600, 16px floor, line-height 1.6.
- **Micro:** `.micro` — .68rem, `+.24em` tracking, uppercase. Quarantined ≤ .75rem.
- **Bimodal tracking:** display negative, micro positive, **nothing between**.
- One Google Fonts host, `display=swap`, real fallbacks.

## Shape

- `--radius: 0` — the default. Sections, rules, images in prose: square.
- `--radius-card: 1.1rem` — cards and media frames only (the reference earns it).
- `--radius-input: 8px` — form fields.
- `--radius-pill: 999px` — **every button**. No square buttons anywhere.

## Motion — `src/scripts/motion.ts`

One library (GSAP + ScrollTrigger), **one curve** (`expo.out`; scrubs use `none`).
Grep the built CSS for a second `cubic-bezier` before shipping.

| Effect | Hook | Where |
|---|---|---|
| Rise on load | `.hero--home` lines | homepage only |
| Reveal once on enter | `[data-reveal]` → `.is-in` | every page — ScrollTrigger adds the class, a CSS transition on `translate` does the motion |
| Count-up on **true** numbers | `[data-count]` | ships the final number in HTML |
| Ken-burns on scroll | `.hero__img` | any hero with an image |
| Gallery drift | `.strip__track` | wide + pointer only; narrow/touch gets native swipe |
| Readable process | `.proc` | static at every width; no pinning, stacking or dimming |
| Before/after wipe | `.wipe` | scroll-scrubbed |
| Stripe drift | `.turf-marks--drift` | dark bands |
| Stroke under "no mud." | `.scribble` | homepage intro, drawn with `stroke-dashoffset` |
| Photo curtain | `[data-reveal="photo"]` | clip-path opens from the bottom edge; the picture keeps its parallax |
| Sticky bar yields | `.bar` | phones: hidden while the hero buttons, the form or the footer is on screen |

**Nothing hides until the ticker proves alive.** Start states live in CSS under
`html.js-motion`, added only after two rAF ticks. If the intro has not completed in 4s
the class comes off and the page shows itself. `prefers-reduced-motion` neutralises all
start states. The static HTML is complete without any of this.

## Components — `src/styles/components.css`

| Component | Class | Rule |
|---|---|---|
| Utility bar | `.util` | dark, true facts only, all pages |
| Header | `.chrome` | sticky, name + tap-to-call |
| Hero | `.hero` (+ `--home` / `--sub`) | **always dark**, optional `.hero__img` under a wash |
| Section | `.sec` (+ `--band` / `--dark` / `--green`) | rhythm above |
| Kicker | `.kick` | centred micro + h2 + one line |
| Cards | `.cards > .card` | grid, `--radius-card`, hover lift 4px |
| Numbers | `.nums > .num` | count-up tiles |
| Gallery | `.strip > .strip__track` | drift / swipe |
| Story | `.story` | two columns, text + figure |
| Process | `.proc` | pinned steps + ribbon bar |
| Wipe | `.wipe` | before under, after clipped over |
| FAQ | `.faq > .qa` | `<details>`, answer leads with the answer |
| Form | `.quote` | **the one form**; short — walkthrough buyer |
| Close | `.close` | dark, one CTA, no invented scarcity |
| Figure | `<Figure>` | real → stock (dev, labelled) → placeholder (dev) → nothing (prod) |

Old list classes (`.svcs`, `.idx`, `.mkts`) render as `.cards` so legacy markup obeys the
system without edits. New markup should use `.cards` directly.

## Imagery

Only the client's own photographs ship. Stock stand-ins are **dev-only**, labelled
"STOCK · NOT OUR WORK", gated in both `<Figure>` and `heroSrc()`. After every build:
`find dist -name '*.html' -exec grep -l 'pexels.com' {} +` must return nothing.
Proof floor (turf): 4 finished · 4 before/after pairs · 2 crew · 1 detail · 2 context.

Encoding (measured 2026-09-10): WebP only. Astro's AVIF (sharp, 4:4:4 chroma) came out
25–35% larger than WebP on these photographs, width for width. `<Figure>` emits 320–1280 at
q66 with per-slot `sizes`; the hero emits 640–1920 at q55 and asks for 75vw on phones because
it sits under a 55% wash. Phones load seven gallery photographs until "See all" is tapped.
Check orientation by eye on every new batch: one file arrived rotated 90° with no EXIF tag.

## Copy

- Business claims retain support in `.site/truth/`; consequential technical and local claims retain their scoped evidence records. Source storage does not require a citation in every public paragraph.
- The client's vocabulary ("blown clean", "anything that's turf", "you get what you pay
  for") over marketing vocabulary.
- **Never:** a rating or review count except beside a live third-party link; a founding
  year, customer count or project count he did not state; a superlative without a source;
  a placeholder that reads as real; a second accent; stock presented as our work.

## Gates

`python3 scripts/check-consistency.py dist` must pass — it enforces the rules above
(pill buttons, dark heroes, no light stripe on dark, styled CTAs, no inline colour, one
curve) and warns on adjacent sections sharing a ground. `seo`, `entity`, `build` must pass. `craft` fails on photographs until the client's land —
stock is deliberately not allowed to satisfy it. Known tooling limits: `docs/GATE-NOTES.md`.

## Decisions from the by-eye pass (2026-09-08)

Screenshots became possible once the harness window was foregrounded (GATE-NOTES §9–10).
Every rule below was seen, fixed, then re-measured — not inferred.

| Rule | Where it lives |
|---|---|
| Process displays all four steps in normal flow; no progress animation or dimmed steps | `Process.astro`, `components.css` |
| Mixed-ratio galleries align to `start` so every caption sits on its own image | `.strip__track`, `.proof__grid` |
| Proof sections are dark on every page type (home strip, hub "Jobs in…", service "…we've installed") | `sec--dark on-dark` |
| The standard band carries one photo slot (fin-1); with no photo on file it collapses to one column via `:has(.band__fig:empty)` | `.band`, `index.astro` |
| Every link is a ≥44px target — breadcrumbs pad without moving the row, source URLs wrap anywhere | `.crumbs a`, `.srcs__u` |
| On phones the utility bar shows the markets only, one line; the header Call link and sticky bar carry the number | `.util__in` ≤640px |

## Contrast (final, 2026-09-08)

The accent was deepened from the measured ribbon stop `#3F8C0A` to `#307408` so it passes
WCAG AA everywhere it is used as text or as a fill under warm-white text. Hover goes
deeper (`#245A05`), never lighter. Faint and dim ink both use 68% on light surfaces. Readable labels do not get a contrast exception. Form labels are 14px, normal case; regular body copy remains at least 16px. Dark-surface secondary ink uses 70%.

| Pair | Ratio |
|---|---|
| Brand green text on chalk / band | 4.9 / 4.6 |
| Primary button: green fill + warm white | 5.1 (hover 6.7) |
| Faint ink on chalk / band | 5.91 / 5.69 |
| Dim ink on chalk / band | 5.91 / 5.69 |
| Bright green on dark / deep green | 10.2 / 7.3 |
| Warm white on dark / deep green | 16.9 / 12.2 |

Gold `#DEBA1F` lives in the logo file only. One accent on the page.

## The pattern (2026-09-09)

`.mown-stripe` is retired. The diagonal stripe read as abstract texture rather than as
anything to do with this trade, and the client asked for it replaced.

`.turf-marks` tiles six line icons drawn from the work: a roll of turf, a cup with the
flag in, a grass tuft, a rake, a mound with a tree, and a circle of infill. One inline SVG
at 470x188, 7% on dark and 7.5% on deep green, seaming through the middle of a mark so the
repeat cannot be seen. Regenerate with `python3 scripts/build-pattern.py`.

`.btn--light` joins the button set: warm white fill, deep green text. It exists because the
brand green on the deep-green band is green on green — 1.4:1. The light button is 12.2:1 on
that ground and 16.9:1 on the dark. Every call to action on a dark section uses it.

## Lead capture and service pages (2026-09-10)

- **The form is a wizard.** `EstimateWizard` is the one Netlify form (`quote`), rendered in a
  `<dialog class="estimate">` on every page and inline on `/estimate/` (noindex, never both on one
  page). Five steps: use (tiles) → size → timing → ZIP → name, phone, optional email. Any
  `[data-estimate]` opens it; a value presets step one. Without JavaScript it is a plain form
  posting to `/thanks/`. Motion: the sheet slides up on phones, steps slide, the done seal draws.
- **Every page ends on the offer** (`OfferPanel`): what the free estimate includes, one button.
- **Service pages** follow the buyer: hero → concise benefits → the work → service-specific
  inclusions and options → how it works → useful questions → areas → offer. Any extra questions
  in `extra.json` must help a customer plan the work. Copy lives in `services.ts`.
- **Market pages** (`/denver-metro/`, `/grand-strand/`, `/northeast-florida/`) use the same order
  for one place: hero → concise reasons and relevant work → what we
  install → how it works → practical local questions → where we work (every place the client named, and
  the map) → offer. Copy lives in `markets.ts`. Only places named on the call or the old site ship:
  no photograph is captioned as a market, because no photograph's location is on file.
- Every page ends on the offer: guides, the guides index and the 404 included. The thanks page ends
  on "what happens next" instead — the lead is already in.


## Audit implementation, September 11, 2026

These decisions supersede the earlier pinned/stacked Process and overlay-gallery-caption specifications.

- Homepage leads with artificial turf installation, the free visit, turf options and written price. Estimate is the primary action; phone is the alternative. Layout approval and supported material facts replace the unattributed experience badge.
- Process stays in document flow with all four steps legible. There is no fixed viewport height, progress bar, pin spacer, card stacking or drifting pattern behind it.
- Gallery photographs have a separate `.fig__media` frame with captions below. Mobile gets a full-width lead photograph; related views follow in a smaller grid. Lightbox geometry comes from the image frame, while keyboard focus returns to the opening figure.
- Desktop navigation shows the business name, Services, Our work and Areas. Mobile retains the dialog menu. Its modal state must end when switching to desktop navigation.
- Service and market primary benefits form a concise ruled list. Each service has its own installation inclusions; indoor flooring does not inherit a soil-base promise.
- Guide and article contents links are generated from their real headings. Optional FAQs render no empty heading or schema.
- Micro styling remains for secondary section labels; form labels use normal case at 14px and dim ink. Test real text contrast and reflow at 320px.

## Site-wide editorial direction, September 11, 2026

- Sales copy explains use, options, scope, price factors, relevant limitations and the estimate. Remove lab-study tables, research-process narration, irrelevant legal history and local trivia from the sales journey.
- Each page must earn its detail. A short town page still needs a meaningful local decision; guides need an answer and useful steps rather than an archive of discarded research.
- `sources` is internal evidence. `publicReferences` deliberately selects useful external links; an empty selection renders nothing. PublicReferences uses descriptive labels and never prints internal source annotations or checked-date logs.
- Revised HTML, metadata, FAQ/schema and Markdown mirrors describe the same public answer. Internal research stays out of hidden public appendices and machine-only content.
- Preserve real limitations and evidence. Do not replace technical padding with invented testimonials, prices, project locations, credentials or performance promises.
