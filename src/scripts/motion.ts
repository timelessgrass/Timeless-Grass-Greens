/**
 * Site-wide motion. Every block guards on its hook, so a page without a gallery or
 * a process section simply skips those. One curve, one library, every effect degrades to static.
 *
 * Content is complete in the HTML before any of this runs — retrieval agents and
 * no-JS visitors get the whole page. Motion is added on top, never relied on.
 * prefers-reduced-motion: everything below is skipped and elements render at rest.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = 'expo.out'; // the single curve. tokens.css: cubic-bezier(.16,1,.3,1) ≈ expo.out
const html = document.documentElement;

/* Nothing is hidden until the ticker proves it is alive. The hidden start states live in
   CSS under html.js-motion (components.css); if the intro has not finished within 4s — throttled
   background tab, blocked chunk, ancient device — the class comes off and the page shows
   itself. A blank page is the one failure mode we refuse. */
let introDone = false;
requestAnimationFrame(() => requestAnimationFrame(() => {
  html.classList.add('js-motion');
  start();
  setTimeout(() => {
    if (introDone) return;
    /* The net fires when the ticker stalled (throttled tab, blocked chunk, old device).
       Dropping the class is not enough on its own: GSAP writes its start state inline the
       moment a tween is created, so a stalled page can be left with a photograph parked at
       scale 1.28 or a frame at opacity 0 — invisible damage that outlives the class. Kill
       the triggers, empty the timeline, then clear every inline value motion wrote. */
    html.classList.remove('js-motion');
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.globalTimeline.clear();
    gsap.set(
      '[data-parallax] img, [data-zoom] img, .hero__img, .hero__eyebrow, .hero h1 .line > span,'
      + ' .hero__wins > li, .hero__cta, .hero__trust, .scribble path, .strip__track, .grassline__g, .h2-line, .mosaicsec',
      { clearProps: 'all' },
    );
  }, 4000);
}));

function start() {
gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  /* ---- 1. hero intro (homepage only): animate TO rest from the CSS start state -- */
  const intro = gsap.timeline({ defaults: { ease: EASE }, onComplete: () => { introDone = true; } });
  if (!document.querySelector('.hero--home')) { introDone = true; intro.kill(); } else intro
    .to('.hero__eyebrow', { y: 0, opacity: 1, duration: .5 }, 0)
    .to('.hero h1 .line > span', { y: 0, duration: .8, stagger: .08 }, .1) // y not yPercent: GSAP parses the CSS % start as px
    .to('.hero__wins > li, .hero__cta, .hero__trust', { y: 0, opacity: 1, duration: .6, stagger: .05 }, .35)
    .to('.hero--home .scribble path', { strokeDashoffset: 0, duration: .9 }, .55) // the stroke under "no mud." draws as the copy lands
    .call(() => { document.querySelector('.hero--home')?.classList.add('is-grown'); }, [], .2); // the grass grows up as the headline rises

  /* hero image: slow ken-burns on scroll, not on a timer — it only moves if you do */
  if (document.querySelector('.hero__img')) gsap.to('.hero__img', {
    scale: 1.12, yPercent: 8, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  /* ---- 2. reveals: ScrollTrigger only adds a class; CSS transitions do the rest --
     A GSAP tween here could be killed mid-flight (seen: staggered batch tweens
     frozen at partial opacity). A class is idempotent, survives refresh, and the
     safety net still reveals everything by removing html.js-motion. */
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 86%',
    once: true,
    onEnter: (els) => els.forEach((el, i) => setTimeout(() => el.classList.add('is-in'), i * 90)),
  });

  /* ---- 3. count-ups on TRUE numbers only ------------------------------------- */
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    const o = { v: 0 };
    el.textContent = '0' + suffix; // the HTML ships the real number; only zero it once motion is confirmed on
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => gsap.to(o, {
        v: end, duration: 1.4, ease: EASE,
        onUpdate: () => { el.textContent = String(Math.round(o.v)) + suffix; },
      }),
    });
  });

  /* ---- 4. gallery drift: the strip slides as you pass it (not pinned — mobile safe) */
  const strip = document.querySelector<HTMLElement>('.strip__track');
  const wideAndPointer = window.matchMedia('(min-width: 900px) and (hover: hover)').matches;
  if (strip && wideAndPointer) { // narrow/touch gets native swipe instead (home.css)
    const overflow = () => Math.max(0, strip.scrollWidth - (strip.parentElement?.clientWidth ?? 0));
    gsap.to(strip, {
      x: () => -overflow(), ease: 'none',
      scrollTrigger: { trigger: '.strip', start: 'top bottom', end: 'bottom top', scrub: 1.2, invalidateOnRefresh: true },
    });
  }

  /* ---- 4b. mosaic: each frame drifts inside its own crop, at its own rate ---------
     The image is oversized by the same 12% it travels, so the crop never runs off the
     bottom edge. Alternating direction stops the whole wall moving as one sheet. */
  gsap.utils.toArray<HTMLElement>('[data-parallax] img').forEach((img, i) => {
    const dir = i % 2 ? -1 : 1;
    gsap.set(img, { scale: 1.14 });
    gsap.fromTo(img, { yPercent: -6 * dir }, {
      yPercent: 6 * dir, ease: 'none',
      scrollTrigger: { trigger: img.closest('figure') as Element, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  /* ---- 4c. the cross-section draws its strata when you reach it ------------------ */
  const cut = document.querySelector<HTMLElement>('.cut');
  if (cut) ScrollTrigger.create({ trigger: cut, start: 'top 78%', once: true, onEnter: () => cut.classList.add('is-cut') });

  /* ---- 4d. services: the frame beside the list changes as you read it -------------
     One source of truth for "which row is live", driven by scroll and by hover, so a
     visitor who mouses down the list gets the same behaviour as one who scrolls. */
  const list = document.querySelector<HTMLElement>('[data-svclist]');
  const frames = gsap.utils.toArray<HTMLElement>('[data-svcfig-i]');
  if (list && frames.length) {
    const rows = gsap.utils.toArray<HTMLElement>('.svcrow', list);
    let live = -1;
    const light = (i: number) => {
      if (i === live || i < 0 || i >= rows.length) return;
      live = i;
      rows.forEach((r, n) => r.classList.toggle('is-on', n === i));
      frames.forEach((f, n) => f.classList.toggle('is-on', n === i));
    };
    light(0);
    rows.forEach((row, i) => {
      row.addEventListener('mouseenter', () => light(i));
      row.addEventListener('focusin', () => light(i));
      /* Scroll ownership: the row nearest the middle of the viewport wins, in both
         directions, so the frame tracks reading position rather than only entry. */
      ScrollTrigger.create({
        trigger: row, start: 'top 62%', end: 'bottom 38%',
        onEnter: () => light(i), onEnterBack: () => light(i),
      });
    });
  }

  /* ---- 4e. the standard band: the photograph pulls back while the sentence is read.
     Scrubbed, so the pull-back IS the reading — it cannot finish before you do. */
  const zoom = document.querySelector<HTMLElement>('[data-zoom] img');
  if (zoom) gsap.fromTo(zoom, { scale: 1.28 }, {
    scale: 1, ease: 'none',
    scrollTrigger: { trigger: '[data-zoom]', start: 'top 88%', end: 'bottom 52%', scrub: .6 },
  });

  /* ---- 5. process: pinned, scroll advances the four steps -------------------- */
  const proc = document.querySelector<HTMLElement>('.proc');
  /* Pin only where the whole panel fits: a short laptop viewport would clip step four. */
  if (proc && window.matchMedia('(min-width: 900px)').matches && window.innerHeight >= 720) {
    const steps = gsap.utils.toArray<HTMLElement>('.proc__step');
    /* All four steps are readable at rest; scrolling lights the current one and fills the
       bar. Nothing is hidden, so the pinned panel is never mostly empty. */
    const fill = proc.querySelector<HTMLElement>('.proc__fill');
    const light = (i: number) => {
      steps.forEach((s, k) => s.classList.toggle('is-on', k === i));
      if (fill) fill.style.transform = `scaleX(${(i + 1) / steps.length})`;
    };
    proc.classList.add('proc--live'); // only now may the CSS dim the inactive steps
    light(0);
    ScrollTrigger.create({
      trigger: proc, start: 'top top', end: () => `+=${(steps.length - 1) * 65}%`, pin: true, scrub: .4,
      onUpdate: (self) => light(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))),
    });
  }

  /* ---- 6. before/after: scroll wipes the AFTER over the BEFORE ---------------- */
  document.querySelectorAll<HTMLElement>('.wipe').forEach((w) => {
    const after = w.querySelector<HTMLElement>('.wipe__after');
    const line  = w.querySelector<HTMLElement>('.wipe__line');
    if (!after) return;
    gsap.fromTo(after, { clipPath: 'inset(0 100% 0 0)' }, {
      clipPath: 'inset(0 0% 0 0)', ease: 'none',
      scrollTrigger: { trigger: w, start: 'top 75%', end: 'bottom 45%', scrub: .8 },
    });
    if (line) gsap.fromTo(line, { left: '0%' }, {
      left: '100%', ease: 'none',
      scrollTrigger: { trigger: w, start: 'top 75%', end: 'bottom 45%', scrub: .8 },
    });
  });

  /* ---- 7. dark bands: the turf marks drift slowly with scroll ------------------ */
  gsap.utils.toArray<HTMLElement>('.turf-marks--drift').forEach((b) => {
    const layer = b.querySelector<HTMLElement>('.turf-marks__layer');
    if (!layer) return;
    gsap.fromTo(layer, { x: 0 }, {
      x: 124, ease: 'none',
      scrollTrigger: { trigger: b, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  /* ---- 14. the grass leans as the hero scrolls away, like wind ----------------------- */
  if (document.querySelector('.grassline__g')) gsap.to('.grassline__g', {
    skewX: -10, ease: 'none', transformOrigin: '50% 100%',
    scrollTrigger: { trigger: '.hero--home', start: 'top top', end: 'bottom top', scrub: true },
  });

  /* ---- 12. icons draw themselves when their row arrives ------------------------- */
  const drawn = gsap.utils.toArray<HTMLElement>('.benefit, .diff--ico, .proc__step, .offer__list li, .checks li, .arearow');
  drawn.forEach((el) => el.classList.add('draw')); // the hidden start state exists only once motion is confirmed
  ScrollTrigger.batch(drawn, {
    start: 'top 88%', once: true,
    onEnter: (els) => els.forEach((el, i) => setTimeout(() => el.classList.add('is-drawn'), i * 70)),
  });

  /* ---- 11. phones: each step card shrinks and dims as the next slides over it ------ */
  if (window.matchMedia('(max-width: 899px)').matches) {
    const cards = gsap.utils.toArray<HTMLElement>('.proc__step');
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      gsap.to(card, {
        scale: .94, opacity: .5, ease: 'none', transformOrigin: '50% 0%',
        scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 25%', scrub: true },
      });
    });
  }

  /* ---- 8. headings: each line rises from behind its own mask, like the hero ---- */
  gsap.utils.toArray<HTMLElement>('main h2:not(.benefit__h)').forEach((h) => {
    SplitText.create(h, {
      type: 'lines', mask: 'lines', linesClass: 'h2-line', autoSplit: true,
      onSplit: (self) => {
        if (h.dataset.lined === 'done') return; // re-split after a resize: never replay
        return gsap.from(self.lines, {
          yPercent: 110, duration: .9, ease: EASE, stagger: .08,
          scrollTrigger: { trigger: h, start: 'top 88%', once: true },
          onComplete: () => { h.dataset.lined = 'done'; },
        });
      },
    });
  });

  /* ---- 9. the estimate buttons catch the light once ---------------------------- */
  const sheen = (el: Element) => { el.classList.add('btn--sheen'); requestAnimationFrame(() => el.classList.add('is-sheen')); };
  document.querySelectorAll('.hero__cta [data-estimate]').forEach((el) => gsap.delayedCall(1.4, () => sheen(el)));
  document.querySelectorAll('.offer__card [data-estimate]').forEach((el) => {
    ScrollTrigger.create({ trigger: el, start: 'top 82%', once: true, onEnter: () => sheen(el) });
  });

  /* ---- 10. the gallery opens from a panel to full width (wide screens only) ------ */
  const gallery = document.querySelector<HTMLElement>('.mosaicsec');
  if (gallery && window.matchMedia('(min-width: 900px)').matches) {
    gsap.fromTo(gallery, { clipPath: 'inset(0% 4% 0% 4% round 28px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
      scrollTrigger: { trigger: gallery, start: 'top 92%', end: 'top 35%', scrub: .5 },
    });
  }

  /* ---- 13. the ribbon at the top edge fills with scroll progress ------------------- */
  if (document.querySelector('.progress span')) gsap.to('.progress span', {
    scaleX: 1, ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: .3 },
  });

  return () => {}; // matchMedia handles revert
});
}

/* ---- interactions (not motion: they run regardless of reduced-motion) ---------- */
const menu = document.getElementById('menu');
const menuBtn = document.querySelector<HTMLButtonElement>('.chrome__menu');
function setMenu(open: boolean) {
  if (!menu) return;
  if (open) {
    menu.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open')));
    html.classList.add('nav-open');
    menuBtn?.setAttribute('aria-expanded', 'true');
    menu.querySelector<HTMLElement>('.menu__close')?.focus();
  } else {
    menu.classList.remove('is-open');
    html.classList.remove('nav-open');
    menuBtn?.setAttribute('aria-expanded', 'false');
    window.setTimeout(() => { menu.hidden = true; }, 340);
    menuBtn?.focus();
  }
}
document.querySelectorAll('[data-menu-toggle]').forEach((t) => t.addEventListener('click', () => setMenu(!!menu?.hidden)));
menu?.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu && !menu.hidden) setMenu(false); });

/* header condenses once the hero is behind you */
const chrome = document.querySelector('.chrome');
let scrolled = false;
const onScroll = () => { const s = window.scrollY > 72; if (s !== scrolled) { scrolled = s; chrome?.classList.toggle('is-scrolled', s); } };
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* The sticky bar steps aside while the hero's own buttons, the form or the footer is on
   screen: two identical Call buttons stacked on a phone read as a mistake, and the bar must
   never cover Submit. The first placement snaps; only later changes slide. */
const bar = document.querySelector<HTMLElement>('.bar');
const yieldTo = document.querySelectorAll('.hero__cta, .offer, .foot');
if (bar && yieldTo.length && 'IntersectionObserver' in window) {
  const seen = new Set<Element>();
  bar.classList.add('is-still');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? seen.add(en.target) : seen.delete(en.target)));
    bar.classList.toggle('is-hidden', seen.size > 0);
    if (bar.classList.contains('is-still')) requestAnimationFrame(() => requestAnimationFrame(() => bar.classList.remove('is-still')));
  }, { threshold: 0.12 });
  yieldTo.forEach((el) => io.observe(el));
}

/* Photographs: phones get the lead frame and three pairs, then a button for the rest
   (home.css clamps only below 900px). Without JavaScript every frame shows. */
const mosaic = document.querySelector<HTMLElement>('[data-mosaic]');
const more = document.querySelector<HTMLButtonElement>('[data-mosaic-more]');
if (mosaic && more) {
  mosaic.classList.add('is-clamped');
  more.hidden = false;
  more.addEventListener('click', () => {
    mosaic.classList.remove('is-clamped');
    more.hidden = true;
    ScrollTrigger.refresh();
  });
}

if (import.meta.env.DEV) (window as any).__motion = { gsap, ScrollTrigger };

/* fonts and lazy images shift layout; recalc once they settle */
document.fonts?.ready.then(() => ScrollTrigger.refresh());
window.addEventListener('load', () => ScrollTrigger.refresh());
