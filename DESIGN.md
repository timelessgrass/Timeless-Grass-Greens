# DESIGN.md — TIMELESS Grass & Greens

The single source of truth for the visual system. If a page disagrees with this file,
the page is wrong. Values are measured, not chosen — see `archive/brand/tokens.md`.

## The object

**The cup and flagstick on a mown green.** Brian designed the mark himself around a
putting green with two flags, and his own test of a competitor's work is whether the
green is blown clean. Every colour, weight and motion decision traces back to that.

## Reference structure

The client chose greenforeverarizona.com/artificial-turf/ as the structural model:
dark full-bleed hero → proof numbers → gallery → story → standard → services →
differentiators → process → before/after → FAQ → form → close. We keep the structure
and the motion vocabulary. We do not reproduce its review count-up or homeowner count —
neither is sourced here.

## Colour — `src/styles/tokens.css`

| Role | Token | Value | From |
|---|---|---|---|
| Ground | `--ground` | `#EFEDE7` | chalk — the cup liner. Never `#fff` |
| Band | `--ground-band` | `#E7E4DC` | tonal alternate |
| Dark | `--ground-dark` | `#0E0E0C` | 38.4% of the mark is black |
| Deep green | `--ground-green` | `#16330C` | the green in shadow — interstitials only |
| **Accent (the only one)** | `--accent` | `#3F8C0A` | ribbon's deep stop, away from Murphy's sage |
| Accent on dark | `--accent-on-dark` | `#8ACF35` | ribbon's light stop; dark ground only |
| Ribbon | `--ribbon` | `#48A008 → #80D028 → #409800` | the mark's own gradient — hairlines and the process bar |
| Ink | `--ink` | `#15150F` at 1 / .68 / .42 / .14 | one text colour, four opacities, no second grey |

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
| Pinned steps | `.proc` | ≥ 900px only |
| Before/after wipe | `.wipe` | scroll-scrubbed |
| Stripe drift | `.mown-stripe--drift` | dark bands |

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

## Copy

- Every claim → receipt within one element. No claim without a source in `.site/truth/`.
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
