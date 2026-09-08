# Gate notes — known tooling limitations

Recorded rather than worked around. Each is a place where a gate measures something
adjacent to what it intends, and bending the build to satisfy it would make the site
worse, not better.

## 1. CRAFT-9 — false negative on token-driven CSS

`check-craft.py:110` counts literal 6-digit hex occurrences across CSS + HTML and
wants one used 8+ times. Our accent `#3F8C0A` is declared **once** as
`--accent` and referenced as `var(--accent)` throughout, so the literal appears once.

Padding the stylesheet with repeated hex values would satisfy the counter and
improve nothing. The accent does carry the page — see `src/styles/tokens.css`.

**Status:** accepted warning. Any properly token-driven stylesheet trips this.

## 2. PHONE-1 vs CALL-3 — the two gates want opposite things

- `check-entity.py` **PHONE-1** compares the `tel:` href's raw digits against
  `identity.locations[0].phone`. A `+1` country code reads as a different number
  and **fails**.
- `check-build.py` **CALL-3** wants E.164 (`tel:+1…`) and **warns** without it.

Both cannot be satisfied while the brief stores the number as `303-349-2368`.

**Resolution:** render `tel:3033492368`. Entity passes (NAP consistency is the
higher-value check), build carries the CALL-3 warning. A fail avoided for a warn
accepted. All three markets are US, so E.164 buys nothing real here.

## 3. CALL-4 — cannot detect the sticky call layer

`check-build.py` cannot see `position: fixed` in an external stylesheet. The bar
exists (`.bar`, `src/styles/base.css`) and shows below 800px. **Verify on a real
device before launch**, per the gate's own instruction.

## 4. LEAD-2 — form has no capture mechanism

Correct and expected. `brief.conversion.lead_destination` is UNKNOWN — it is the
single highest-leverage open question (unlocks 23 sections). Nothing launches until
all eight `test_lead` flags are true (gate 10).

## 5. check-craft / check-seo take the BUILD dir, not the project root

`python3 ~/.claude/site-tools/check-craft.py dist` — pointing them at the project
root returns `error: no index.html under .`

## 6. CRAFT-2 — now a photo blocker, not a layout defect

The reference structure puts the quote form at the bottom (section 11) rather than in
the hero. A hero form used to satisfy CRAFT-2 ("image or hero form in the first third");
with the form moved and no client hero photograph on file, production has neither.

**Status:** fails together with CRAFT-1 until the client's photographs land. In dev the
hero carries a labelled stock stand-in; production deliberately renders no image at all.
Do not move the form back to fix the gate — the reference's conversion structure is the
client's explicit choice.

## 7. Stock imagery — dev-only, enforced in two places

`<Figure>` and `heroSrc()` both check `import.meta.env.DEV` before returning a stock
URL. Verify after every build: `find dist -name '*.html' -exec grep -l 'pexels.com' {} +`
must return nothing. Caught once already when `heroSrc()` shipped a Pexels URL to prod.

## 8. The in-app Browser pane cannot verify motion

Its document reports `visibilityState: hidden`, so `requestAnimationFrame` never
fires there. GSAP's ticker is dead, every tween freezes at its start state, and
below-fold screenshots paint blank. That is the pane, not the site — but it is why
the motion layer is now hardened (see `src/scripts/home-scroll.ts`): start states
live in CSS under `html.js-motion`, the class is added only after two rAF ticks prove
the ticker alive, tweens animate TO rest, and a 4s safety net drops the class if the
intro never completes. Verified: with rAF dead the page renders fully visible.

Verify motion in a real browser: the Playwright MCP server, or `npx playwright
install chromium` for the gstack `browse` binary (it is missing its headless shell).

## 9. Playwright screenshots of the homepage time out at 5s

Four attempts, including with the GSAP ticker asleep and every ScrollTrigger
disabled — so it is not the animation loop. Console shows "fonts loaded" then the
capture hangs. Most likely `backdrop-filter: blur()` on `.chrome` (sticky header) and
`.hero__eyebrow`, a known headless-Chromium capture stall. Not worth fixing for the
site's sake — it renders fine in a real tab. If a capture is ever needed for tooling,
temporarily strip those two `backdrop-filter` rules or test with them removed first.

Everything else is verifiable by `browser_evaluate`: reveals, count-ups, pin state,
wipe clip-path, strip transform/scrollLeft, tap-target heights. Prefer that.
