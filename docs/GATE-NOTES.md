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

## 9. Playwright screenshots hung — resolved: it was window occlusion (see §10)

Five attempts hung after "fonts loaded" regardless of GSAP/ScrollTrigger/backdrop-filter.
Cause: the Playwright window was occluded, so the compositor produced no frame for the
capture to wait on. After `page.bringToFront()` a viewport screenshot returns in ~130ms
and full-page captures work. Same fix as §10; measure `rafPerSec` first, then capture.

## 10. Playwright's Chromium runs rAF at 1Hz when its window is occluded — every GSAP tween crawls

Measured: `visibilityState: "visible"`, `document.hasFocus(): true`, and **1 rAF per
second**. Playwright launches with `--disable-backgrounding-occluded-windows`, so an
occluded window keeps reporting visible while Chromium throttles BeginFrames to 1Hz.
GSAP's default `lagSmoothing(500, 33)` then advances the timeline only 33ms per tick:
a 1.4s count-up takes ~40s, the hero intro cannot finish inside 4s, and the safety net
strips `html.js-motion` — the page shows itself, as designed, but every "tween stuck at
partial opacity" reading is an artefact of the harness, not the site.

That was the real cause behind the sub-page reveal "failure" first pinned on
`overwrite: true`. The class-based reveal (`[data-reveal]` → `.is-in`, CSS transition)
stays because it does not depend on the ticker at all — it passed under the same 1Hz
starvation that froze the tweens.

Rule: **before reading any GSAP end-state, measure `rafPerSec` in the page.** If it is
not ~60, call `page.bringToFront()` (`browser_run_code_unsafe` passes `page` as the sole
argument: `async (page) => { await page.bringToFront(); ... }`) and re-measure;
only then trust intro/count-up/pin readings. CSS-transition effects can be read either way.
Note 9's screenshot hang is almost certainly the same occlusion — a capture waits on a
compositor frame that never comes.

## 11. Preview deploy, and what it did and did not settle

2026-09-09. Pushed 37 commits (739e2b0..6533f0d) and deployed to
timeless-grass-greens-preview.netlify.app.

SETTLED by the deploy:
- Netlify detected the "quote" form: 5 fields, honeypot on. A test POST returned 200 and the
  submission is in the dashboard with name, phone, town and use intact (id 6aa0b8f1cb63aca1a6e4d7a7).
  Gate 10's first two flags are now true. The lead no longer goes nowhere.
- The build gates run in Netlify's build system and pass there, not just locally. That is why
  check-links.py carries no 3.10-only syntax.
- Live measurements on the deployed page: 669KB transferred, 10 requests, DOMContentLoaded 552ms,
  zero console errors, 7 figures, 1,048 words.

NOT settled, and each blocks launch:
- No notification email. Netlify captures the lead; nobody is told it arrived.
- The repo is NOT connected to this Netlify project. This deploy was pushed from the CLI, so a
  git push does not rebuild it. Continuous deploy needs connecting in the Netlify UI.
- "timeless-grass-greens" was already taken on Netlify — possibly the client's own account. Worth
  finding out before creating a production site.
- www.timelessgrass.com still CNAMEs to a BunnyCDN pull zone from the previous vendor. Nothing about
  this deploy changes what a visitor to the real domain sees.
- The GitHub repo is public and .site/truth/brief.json publishes the client's pricing strategy.
