/**
 * Homepage motion. One curve, one library, every effect degrades to static.
 *
 * Content is complete in the HTML before any of this runs — retrieval agents and
 * no-JS visitors get the whole page. Motion is added on top, never relied on.
 * prefers-reduced-motion: everything below is skipped and elements render at rest.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'expo.out'; // the single curve. tokens.css: cubic-bezier(.16,1,.3,1) ≈ expo.out

gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  /* ---- 1. hero intro: lines rise, then the rest ------------------------------ */
  const intro = gsap.timeline({ defaults: { ease: EASE } });
  intro
    .from('.hero__eyebrow', { y: 14, opacity: 0, duration: .7 })
    .from('.hero h1 .line > span', { yPercent: 110, duration: 1.05, stagger: .11 }, '-=.4')
    .from('.hero__deck, .hero__qual, .hero__cta', { y: 18, opacity: 0, duration: .8, stagger: .1 }, '-=.55')
    .from('.hero__badge', { scale: .92, opacity: 0, duration: .8 }, '-=.6')
    .from('.hero__steps > *', { y: 12, opacity: 0, duration: .6, stagger: .08 }, '-=.5');

  /* hero image: slow ken-burns on scroll, not on a timer — it only moves if you do */
  gsap.to('.hero__img', {
    scale: 1.12, yPercent: 8, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  /* ---- 2. reveals: anything marked data-reveal rises once when it enters ------ */
  gsap.set('[data-reveal]', { y: 28, opacity: 0 });
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 86%',
    once: true,
    onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: .9, ease: EASE, stagger: .09, overwrite: true }),
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
        onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString() + suffix; },
      }),
    });
  });

  /* ---- 4. gallery drift: the strip slides as you pass it (not pinned — mobile safe) */
  const strip = document.querySelector<HTMLElement>('.strip__track');
  if (strip) {
    const overflow = () => Math.max(0, strip.scrollWidth - strip.clientWidth);
    gsap.to(strip, {
      x: () => -overflow(), ease: 'none',
      scrollTrigger: { trigger: '.strip', start: 'top bottom', end: 'bottom top', scrub: 1.2, invalidateOnRefresh: true },
    });
  }

  /* ---- 5. process: pinned, scroll advances the four steps -------------------- */
  const proc = document.querySelector<HTMLElement>('.proc');
  if (proc && window.matchMedia('(min-width: 900px)').matches) {
    const steps = gsap.utils.toArray<HTMLElement>('.proc__step');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: proc, start: 'top top', end: () => `+=${steps.length * 70}%`, pin: true, scrub: .6 },
    });
    steps.forEach((s, i) => {
      if (i > 0) tl.to(steps[i - 1], { opacity: .22, y: -18, duration: 1, ease: 'none' });
      tl.from(s, { opacity: 0, y: 38, duration: 1, ease: 'none' }, i > 0 ? '<' : 0)
        .to('.proc__fill', { scaleX: (i + 1) / steps.length, duration: 1, ease: 'none' }, '<');
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

/* fonts and lazy images shift layout; recalc once they settle */
document.fonts?.ready.then(() => ScrollTrigger.refresh());
window.addEventListener('load', () => ScrollTrigger.refresh());
