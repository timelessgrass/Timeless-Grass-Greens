/**
 * The estimate: a five-step wizard over the one Netlify form ("quote"), shown in a dialog on
 * every page and inline on /estimate/.
 *
 * Progressive: the HTML is a complete form. This file shows one question at a time, advances
 * when an answer is tapped, checks each step, and submits in place with fetch. A failed or timed
 * out request keeps the answers on screen so the visitor can retry or call. Without JavaScript,
 * the native form still posts to Netlify and serves /thanks/.
 *
 * The dialog is a native <dialog> opened with showModal(): focus is trapped, the page behind is
 * inert, Escape closes it, and focus goes back to the button that opened it. Any element with
 * [data-estimate] opens it; a value (data-estimate="Pet turf") answers the first question.
 */
const html = document.documentElement;

type Wizard = { reset: (preset?: string) => void; focus: () => void };

function enhance(form: HTMLFormElement): Wizard {
  const steps = Array.from(form.querySelectorAll<HTMLFieldSetElement>('[data-step]'));
  const total = steps.length;
  const count = form.querySelector('[data-wiz-n]');
  const back = form.querySelector<HTMLButtonElement>('[data-wiz-back]');
  const next = form.querySelector<HTMLButtonElement>('[data-wiz-next]');
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');
  const done = form.querySelector<HTMLElement>('[data-wiz-done]');
  const sendError = form.querySelector<HTMLElement>('[data-wiz-send-error]');
  let cur = 0;
  let busy = false;
  let advanceTimer: number | undefined;
  let pointerSelection = false;
  form.addEventListener('pointerdown', () => { pointerSelection = true; });
  form.addEventListener('keydown', () => { pointerSelection = false; window.clearTimeout(advanceTimer); });

  form.noValidate = true; // each step checks itself; the browser's bubbles would point at hidden fields
  form.classList.add('is-wizard');

  const show = (i: number, dir = 1) => {
    cur = Math.max(0, Math.min(total - 1, i));
    form.style.setProperty('--dir', `${dir * 28}px`);
    form.style.setProperty('--p', String((cur + 1) / total));
    steps.forEach((s, k) => s.classList.toggle('is-on', k === cur));
    if (count) count.textContent = String(cur + 1);
    if (back) back.hidden = cur === 0;
    if (next) next.hidden = cur === total - 1;
    if (submit) submit.hidden = cur !== total - 1;
  };
  const say = (s: Element, msg: string) => { const e = s.querySelector('.wiz__err'); if (e) e.textContent = msg; };
  const valid = (i: number, point = true): boolean => {
    const s = steps[i];
    say(s, '');
    const fail = (el: HTMLElement, msg: string) => { say(s, msg); if (point) el.focus(); return false; };
    const radios = Array.from(s.querySelectorAll<HTMLInputElement>('input[type="radio"]'));
    if (radios.length && !radios.some((r) => r.checked)) return fail(radios[0], 'Pick one to keep going.');
    for (const el of Array.from(s.querySelectorAll<HTMLInputElement>('input[type="text"], input[type="tel"], input[type="email"]'))) {
      const v = el.value.trim();
      if (el.required && !v) return fail(el, el.dataset.msg || 'Please fill this in.');
      if (el.type === 'tel' && (!/^[+()\d .-]+$/.test(v) || !/^\d{10,15}$/.test(v.replace(/\D/g, '')))) return fail(el, 'Please enter a phone number we can call.');
      if (el.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return fail(el, 'That email doesn’t look right.');
    }
    return true;
  };
  const focus = () => {
    const s = steps[cur];
    (s.querySelector<HTMLInputElement>('input:checked') ?? s.querySelector<HTMLInputElement>('input'))?.focus({ preventScroll: true });
  };
  const go = (d: 1 | -1) => { if (d > 0 && !valid(cur)) return; show(cur + d, d); focus(); };

  next?.addEventListener('click', () => go(1));
  back?.addEventListener('click', () => go(-1));
  /* tap an answer, move on — a beat first, so the tick is seen landing */
  steps.forEach((s, i) => s.addEventListener('change', (e) => {
    if ((e.target as HTMLInputElement).type !== 'radio') return;
    say(s, '');
    window.clearTimeout(advanceTimer);
    if (pointerSelection && i === cur && i < total - 1) advanceTimer = window.setTimeout(() => { if (cur === i) go(1); }, 280);
  }));
  /* Enter moves forward instead of submitting half a form */
  form.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || !(e.target instanceof HTMLInputElement)) return;
    if (cur < total - 1) { e.preventDefault(); go(1); }
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (busy || form.classList.contains('is-done')) return;
    for (let i = 0; i < total; i++) if (!valid(i, false)) { show(i, -1); valid(i); return; }
    const showSendError = (message: string) => {
      if (sendError) { sendError.textContent = message; sendError.focus({ preventScroll: true }); }
    };
    if (sendError) sendError.textContent = '';
    if (form.dataset.preview === 'true') {
      showSendError('This preview does not send estimate requests. Your details are still here; use the phone link to contact Timeless.');
      return;
    }
    busy = true;
    form.classList.add('is-busy');
    form.setAttribute('aria-busy', 'true');
    if (submit) submit.disabled = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body, signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const first = (form.querySelector<HTMLInputElement>('input[name="name"]')?.value ?? '').trim().split(/\s+/)[0];
      const slot = form.querySelector('[data-wiz-name]');
      if (slot) slot.textContent = first ? `, ${first}` : '';
      form.style.setProperty('--p', '1');
      form.classList.add('is-done');
      if (done) { done.hidden = false; done.focus({ preventScroll: true }); }
    } catch {
      showSendError('We could not confirm your request was received. Your details are still here. Please try again, or call Timeless.');
    } finally {
      window.clearTimeout(timeout);
      busy = false;
      form.classList.remove('is-busy');
      form.removeAttribute('aria-busy');
      if (submit) submit.disabled = false;
    }
  });

  show(0);
  return {
    reset(preset) {
      if (form.classList.contains('is-done')) {
        form.reset();
        form.classList.remove('is-done');
        if (done) done.hidden = true;
        steps.forEach((s) => say(s, ''));
        if (sendError) sendError.textContent = '';
        show(0);
      }
      if (preset && cur === 0) {
        const r = Array.from(form.querySelectorAll<HTMLInputElement>('input[name="use"]')).find((x) => x.value === preset);
        if (r) { r.checked = true; show(1, 1); }
      }
    },
    focus,
  };
}

const wizards = new Map<HTMLFormElement, Wizard>();
document.querySelectorAll<HTMLFormElement>('form[data-wizard]').forEach((f) => wizards.set(f, enhance(f)));

/* /estimate/?use=Pet%20turf — an ad or a link can land the visitor on step two */
const inline = document.querySelector<HTMLFormElement>('form.wiz--inline');
const asked = new URLSearchParams(location.search).get('use');
if (inline && asked) wizards.get(inline)?.reset(asked);

const dialog = document.querySelector<HTMLDialogElement>('dialog.estimate');
const modalForm = dialog?.querySelector<HTMLFormElement>('form[data-wizard]');
const modal = modalForm ? wizards.get(modalForm) : undefined;
let closeTimer: number | undefined;

function openEstimate(preset?: string): boolean {
  if (!dialog || !modal || typeof dialog.showModal !== 'function') return false; // no dialog support: follow the link to /estimate/
  window.clearTimeout(closeTimer);
  modal.reset(preset);
  if (!dialog.open) dialog.showModal();
  html.classList.add('estimate-open');
  requestAnimationFrame(() => requestAnimationFrame(() => dialog.classList.add('is-open')));
  window.setTimeout(() => { if (dialog.open && html.classList.contains('estimate-open')) modal.focus(); }, 80);
  return true;
}
function closeEstimate() {
  if (!dialog || !dialog.open) return;
  dialog.classList.remove('is-open');
  html.classList.remove('estimate-open');
  window.clearTimeout(closeTimer);
  closeTimer = window.setTimeout(() => dialog.close(), 380); // let the sheet slide away first
}

document.addEventListener('click', (e) => {
  const el = e.target as Element;
  const opener = el.closest<HTMLElement>('[data-estimate]');
  if (opener && openEstimate(opener.dataset.estimate || undefined)) { e.preventDefault(); return; }
  if (el.closest('[data-estimate-close]')) closeEstimate();
});
dialog?.addEventListener('cancel', (e) => { e.preventDefault(); closeEstimate(); }); // Escape
dialog?.addEventListener('click', (e) => { if (e.target === dialog) closeEstimate(); }); // the backdrop
if (location.hash === '#estimate') openEstimate();
