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

gsap.registerPlugin(ScrollTrigger);

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
  setTimeout(() => { if (!introDone) html.classList.remove('js-motion'); }, 4000);
}));

function start() {
gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  /* ---- 1. hero intro (homepage only): animate TO rest from the CSS start state -- */
  const intro = gsap.timeline({ defaults: { ease: EASE }, onComplete: () => { introDone = true; } });
  if (!document.querySelector('.hero--home')) { introDone = true; intro.kill(); } else intro
    .to('.hero__eyebrow', { y: 0, opacity: 1, duration: .7 })
    .to('.hero h1 .line > span', { y: 0, duration: 1.05, stagger: .11 }, '-=.4') // y not yPercent: GSAP parses the CSS % start as px
    .to('.hero__deck, .hero__qual, .hero__cta', { y: 0, opacity: 1, duration: .8, stagger: .1 }, '-=.55')
    .to('.hero__badge', { scale: 1, opacity: 1, duration: .8 }, '-=.6')
    .to('.hero__steps > *', { y: 0, opacity: 1, duration: .6, stagger: .08 }, '-=.5');

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

  /* ---- 5. process: pinned, scroll advances the four steps -------------------- */
  const proc = document.querySelector<HTMLElement>('.proc');
  if (proc && window.matchMedia('(min-width: 900px)').matches) {
    const steps = gsap.utils.toArray<HTMLElement>('.proc__step');
    gsap.set('.proc__fill', { scaleX: 1 / steps.length }); // step one is lit the moment the section pins — it never arrives empty
    const tl = gsap.timeline({
      scrollTrigger: { trigger: proc, start: 'top top', end: () => `+=${(steps.length - 1) * 70}%`, pin: true, scrub: .6 },
    });
    steps.slice(1).forEach((s, j) => {
      tl.to(steps[j], { opacity: .22, y: -18, duration: 1, ease: 'none' })
        .from(s, { opacity: 0, y: 38, duration: 1, ease: 'none' }, '<')
        .to('.proc__fill', { scaleX: (j + 2) / steps.length, duration: 1, ease: 'none' }, '<');
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

  /* ---- 7. dark bands: the mown stripes drift slowly with scroll ---------------- */
  gsap.utils.toArray<HTMLElement>('.mown-stripe--drift').forEach((b) => {
    gsap.fromTo(b, { '--stripe-x': '0px' }, {
      '--stripe-x': '124px', ease: 'none',
      scrollTrigger: { trigger: b, start: 'top bottom', end: 'bottom top', scrub: true },
    });
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

/* the sticky call bar steps aside while the form or the footer is on screen — it must never cover Submit */
const bar = document.querySelector('.bar');
const yieldTo = document.querySelectorAll('.quote, .foot');
if (bar && yieldTo.length && 'IntersectionObserver' in window) {
  const seen = new Set<Element>();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? seen.add(en.target) : seen.delete(en.target)));
    bar.classList.toggle('is-hidden', seen.size > 0);
  }, { threshold: 0.12 });
  yieldTo.forEach((el) => io.observe(el));
}

if (import.meta.env.DEV) (window as any).__motion = { gsap, ScrollTrigger };

/* fonts and lazy images shift layout; recalc once they settle */
document.fonts?.ready.then(() => ScrollTrigger.refresh());
window.addEventListener('load', () => ScrollTrigger.refresh());
