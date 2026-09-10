/**
 * Photo lightbox. A photograph in the gallery (.mosaic) or a service page's work grid (.workgrid)
 * grows from where it sits to fill the screen; arrows, keys and a sideways swipe move between
 * photographs; the X, Escape, the backdrop or a swipe down closes it, shrinking back into its
 * frame. Native <dialog>: focus is trapped and returned. Reduced motion: a plain fade.
 */
const dlg = document.querySelector<HTMLDialogElement>('dialog.lightbox');
const figs = Array.from(document.querySelectorAll<HTMLElement>('.mosaic .fig, .workgrid .fig'));

if (dlg && figs.length && typeof dlg.showModal === 'function') {
  const big = dlg.querySelector<HTMLImageElement>('.lightbox__img')!;
  const count = dlg.querySelector<HTMLElement>('.lightbox__count')!;
  const text = dlg.querySelector<HTMLElement>('.lightbox__text')!;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const ease = getComputedStyle(document.documentElement).getPropertyValue('--ease').trim() || 'ease-out';
  let cur = -1;

  const thumb = (i: number) => figs[i].querySelector<HTMLImageElement>('img')!;
  const sharpest = (img: HTMLImageElement) => {
    const cands = (img.getAttribute('srcset') || '').split(',')
      .map((s) => s.trim().split(/\s+/)).filter((p) => p[0])
      .sort((a, b) => parseInt(b[1] || '0', 10) - parseInt(a[1] || '0', 10));
    return cands[0]?.[0] || img.currentSrc || img.src;
  };
  const inView = (r: DOMRect) => r.bottom > 0 && r.top < innerHeight && r.width > 0;
  /* uniform scale from the frame's centre to the photo's centre: the photo grows out of its frame */
  const fromFrame = (r: DOMRect) => {
    const to = big.getBoundingClientRect();
    if (!to.width) return 'none';
    const s = r.width / to.width;
    const dx = r.left + r.width / 2 - (to.left + to.width / 2);
    const dy = r.top + r.height / 2 - (to.top + to.height / 2);
    return `translate(${dx}px, ${dy}px) scale(${s})`;
  };
  const show = (i: number) => {
    cur = (i + figs.length) % figs.length;
    const t = thumb(cur);
    big.src = t.currentSrc || t.src;               // already loaded: lays out at once
    big.width = t.naturalWidth; big.height = t.naturalHeight;
    big.alt = t.alt;
    const sharp = sharpest(t);
    if (sharp !== big.src) { const pre = new Image(); pre.onload = () => { if (thumb(cur) === t) big.src = sharp; }; pre.src = sharp; }
    count.textContent = `${cur + 1} / ${figs.length}`;
    text.textContent = figs[cur].querySelector('figcaption')?.textContent ?? '';
  };
  const open = (i: number) => {
    show(i);
    dlg.showModal();
    document.documentElement.classList.add('lightbox-open');
    const r = figs[cur].getBoundingClientRect();
    if (!reduce.matches) {
      big.animate([{ transform: fromFrame(r), opacity: .6 }, { transform: 'none', opacity: 1 }], { duration: 500, easing: ease });
    }
    requestAnimationFrame(() => dlg.classList.add('is-open'));
  };
  const close = () => {
    if (!dlg.open) return;
    const r = figs[cur].getBoundingClientRect();
    dlg.classList.remove('is-open');
    document.documentElement.classList.remove('lightbox-open');
    const done = () => dlg.close();
    if (!reduce.matches && inView(r)) {
      big.animate([{ transform: 'none', opacity: 1 }, { transform: fromFrame(r), opacity: .4 }], { duration: 380, easing: ease }).onfinish = done;
    } else {
      big.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200 }).onfinish = done;
    }
  };
  const step = (d: 1 | -1) => {
    show(cur + d);
    if (!reduce.matches) big.animate([{ transform: `translateX(${d * 40}px)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 320, easing: ease });
  };

  figs.forEach((f, i) => {
    f.setAttribute('role', 'button');
    f.tabIndex = 0;
    f.setAttribute('aria-label', `Open photo: ${thumb(i).alt || 'our work'}`);
    f.addEventListener('click', () => open(i));
    f.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
  });
  dlg.querySelector('[data-lightbox-close]')?.addEventListener('click', close);
  dlg.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => step(-1));
  dlg.querySelector('[data-lightbox-next]')?.addEventListener('click', () => step(1));
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
  dlg.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });
  /* swipe: sideways moves, down closes */
  let sx = 0, sy = 0;
  big.addEventListener('pointerdown', (e) => { sx = e.clientX; sy = e.clientY; });
  big.addEventListener('pointerup', (e) => {
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    else if (dy > 80) close();
  });
}
