import {
  test as base,
  expect,
  type Locator,
  type Page,
  type Request,
  type Route,
} from '@playwright/test';

/**
 * Estimate flow regression tests using local mock form responses.
 * Prerequisite: serve the BUILT dist output at http://127.0.0.1:8769.
 * Astro dev intentionally sets data-preview and refuses submissions; these tests
 * must not bypass that safeguard. This file does not start a server or install dependencies.
 *
 * Every POST, including an unexpected external POST, is intercepted at context
 * level. No POST is ever continued or fetched. GET assets/pages remain real.
 * A fixture fails if anything tries to POST outside the two local form endpoints.
 * Native no-JS POST success is a test HTML response, not a Netlify delivery test.
 *
 * Run Chromium first; root should verify the intended browser projects/config.
 * Tests use the current source selectors, field values and native dialog behavior.
 */

const BASE_URL = 'http://127.0.0.1:8769';
const ORIGIN = new URL(BASE_URL).origin;
const LEAD = {
  use: 'Pet turf',
  size: '500 to 1,500 sq ft',
  timeline: 'In the next few months',
  town: 'Conway, SC 29526',
  name: 'E2E Test Visitor',
  phone: '+1 (202) 555-0123',
  email: 'timeless-e2e@example.com',
};

type CapturedPost = { url: string; body: string; contentType: string };
type PostGuard = {
  posts: CapturedPost[];
  respondWith: (handler: (route: Route, request: Request) => Promise<void>) => void;
};

const test = base.extend<{ postGuard: PostGuard }>({
  postGuard: [
    async ({ context }, use) => {
      const posts: CapturedPost[] = [];
      const unexpected: string[] = [];
      let handler = async (route: Route) => {
        await route.fulfill({ status: 503, body: 'Test guard: no success response configured.' });
      };
      await context.route('**/*', async (route) => {
        const request = route.request();
        if (request.method() !== 'POST') {
          await route.continue();
          return;
        }
        const url = new URL(request.url());
        posts.push({
          url: request.url(),
          body: request.postData() ?? '',
          contentType: request.headers()['content-type'] ?? '',
        });
        if (url.origin !== ORIGIN || !['/', '/thanks/'].includes(url.pathname)) {
          unexpected.push(request.url());
          await route.fulfill({ status: 400, body: 'Blocked unexpected POST during E2E.' });
          return;
        }
        await handler(route);
      });
      await use({
        posts,
        respondWith(next) { handler = (route) => next(route, route.request()); },
      });
      expect(unexpected, 'No external or unexpected form destination may receive a POST').toEqual([]);
    },
    { auto: true },
  ],
});

test.use({
  baseURL: BASE_URL,
  serviceWorkers: 'block', // service workers must not bypass the context POST guard
  reducedMotion: 'reduce',
});

const wizard = (page: Page) => page.locator('form[data-wizard].wiz--inline');

async function openBuiltWizard(page: Page) {
  const response = await page.goto('/estimate/');
  expect(response?.status()).toBe(200);
  const form = wizard(page);
  await expect(form).toHaveClass(/is-wizard/);
  expect(await form.getAttribute('data-preview'), 'Serve a build, not Astro dev').not.toBe('true');
  return form;
}

async function chooseWithKeyboard(form: Locator, label: string) {
  const radio = form.getByRole('radio', { name: label, exact: true });
  await radio.focus();
  await radio.press('Space');
  await expect(radio).toBeChecked();
  await form.locator('[data-wiz-next]').click();
}

async function fillContactStep(page: Page) {
  const form = await openBuiltWizard(page);
  // Keyboard selection plus Next avoids racing the intentional pointer auto-advance.
  await chooseWithKeyboard(form, LEAD.use);
  await chooseWithKeyboard(form, LEAD.size);
  await chooseWithKeyboard(form, LEAD.timeline);
  await form.locator('input[name="town"]').fill(LEAD.town);
  await form.locator('[data-wiz-next]').click();
  await form.locator('input[name="name"]').fill(LEAD.name);
  await form.locator('input[name="phone"]').fill(LEAD.phone);
  await form.locator('input[name="email"]').fill(LEAD.email);
  await expect(form.locator('[data-wiz-n]')).toHaveText('5');
  return form;
}

function expectPayload(post: CapturedPost, expectedPath: string, expectedUse = LEAD.use) {
  expect(new URL(post.url).pathname).toBe(expectedPath);
  expect(post.contentType).toContain('application/x-www-form-urlencoded');
  const body = new URLSearchParams(post.body);
  for (const [field, value] of Object.entries({ ...LEAD, use: expectedUse })) expect(body.get(field), field).toBe(value);
  expect(body.get('form-name')).toBe('quote');
  expect(body.get('landing-page')).toBe('/estimate/');
  expect(body.get('company')).toBe('');
}

async function twoFrames(page: Page) {
  await page.evaluate(() => new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  ));
}

async function expectFormReflow(page: Page, form: Locator) {
  await page.evaluate(() => document.fonts.ready);
  const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth);
  for (const control of await form.locator('.wiz__head, .wiz__nav, .opt:visible, .fld input:visible, .wiz__nav .btn:visible').all()) {
    const bounds = await control.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(-1);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewportWidth + 1);
  }
  const overflow = await form.evaluate((node) => node.scrollWidth - node.clientWidth);
  expect(overflow, 'The form must not require horizontal scrolling').toBeLessThanOrEqual(1);
}

test.describe('narrow estimate layout', () => {
  test.use({ viewport: { width: 320, height: 640 } });

  for (const mode of ['inline', 'modal'] as const) {
    test(mode + ' keeps all seven choices and final actions within 320px', async ({ page, postGuard }) => {
      let form: Locator;
      if (mode === 'inline') form = await openBuiltWizard(page);
      else {
        await page.goto('/');
        await expect(page.locator('form[data-wizard]')).toHaveClass(/is-wizard/);
        await page.locator('.hero__cta [data-estimate]').click();
        form = page.locator('form.wiz--modal');
        await expect(page.locator('dialog.estimate')).toBeVisible();
      }
      await expect(form.locator('input[name="use"]')).toHaveCount(7);
      await expectFormReflow(page, form);
      await chooseWithKeyboard(form, 'Indoor turf');
      await chooseWithKeyboard(form, LEAD.size);
      await chooseWithKeyboard(form, LEAD.timeline);
      await form.locator('input[name="town"]').fill(LEAD.town);
      await form.locator('[data-wiz-next]').click();
      await form.locator('input[name="name"]').fill(LEAD.name);
      await form.locator('input[name="phone"]').fill(LEAD.phone);
      await expectFormReflow(page, form);

      const labelStyles = await form.locator('.fld > span').evaluateAll((nodes) => nodes.map((node) => {
        const style = getComputedStyle(node);
        return { size: parseFloat(style.fontSize), case: style.textTransform };
      }));
      for (const label of labelStyles) {
        expect(label.size).toBeGreaterThanOrEqual(14);
        expect(label.case).toBe('none');
      }
      const submit = form.getByRole('button', { name: 'Request a free estimate', exact: true });
      await submit.focus();
      await submit.scrollIntoViewIfNeeded();
      await expect.poll(() => submit.evaluate((node) => {
        const r = node.getBoundingClientRect();
        const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
        return !!hit && (hit === node || node.contains(hit));
      })).toBe(true);
      await form.locator('[data-wiz-back]').click();
      await expect(form.locator('input[name="town"]')).toHaveValue(LEAD.town);
      await form.locator('[data-wiz-next]').click();
      await expect(form.locator('input[name="name"]')).toHaveValue(LEAD.name);
      await expect(form.locator('input[name="phone"]')).toHaveValue(LEAD.phone);
      expect(postGuard.posts).toHaveLength(0);
    });
  }
});

test('Indoor turf query preset reaches the unchanged use field in the request', async ({ page, postGuard }) => {
  postGuard.respondWith(async (route) => { await route.fulfill({ status: 200, body: 'Mock success' }); });
  await page.goto('/estimate/?use=Indoor%20turf');
  const form = wizard(page);
  await expect(form.locator('[data-wiz-n]')).toHaveText('2');
  await expect(form.locator('input[name="use"]:checked')).toHaveValue('Indoor turf');
  await chooseWithKeyboard(form, LEAD.size);
  await chooseWithKeyboard(form, LEAD.timeline);
  await form.locator('input[name="town"]').fill(LEAD.town);
  await form.locator('[data-wiz-next]').click();
  for (const field of ['name', 'phone', 'email'] as const) await form.locator(`input[name="${field}"]`).fill(LEAD[field]);
  await form.getByRole('button', { name: 'Request a free estimate', exact: true }).click();
  await expect(form.locator('[data-wiz-done]')).toContainText('call to arrange');
  expect(postGuard.posts).toHaveLength(1);
  expectPayload(postGuard.posts[0], '/', 'Indoor turf');
});

test('every service estimate action selects its matching project type', async ({ page, postGuard }) => {
  const presets = {
    'putting-greens': 'Putting green', 'residential-turf': 'Lawn', 'pet-turf': 'Pet turf',
    'commercial-turf': 'Commercial or sports field', 'sports-field-turf': 'Commercial or sports field',
    'indoor-turf': 'Indoor turf', 'turf-removal-and-replacement': 'Replace old turf',
  };
  for (const [slug, use] of Object.entries(presets)) await test.step(slug, async () => {
    await page.goto(`/services/${slug}/`);
    await expect(page.locator('form[data-wizard]')).toHaveClass(/is-wizard/);
    await page.locator('.hero__cta [data-estimate]').click();
    const form = page.locator('form.wiz--modal');
    await expect(form.locator('input[name="use"]:checked')).toHaveValue(use);
    await expect(form.locator('[data-wiz-n]')).toHaveText('2');
  });
  expect(postGuard.posts).toHaveLength(0);
});

test('failed submission retains every answer; retry succeeds without navigation', async ({ page, postGuard }) => {
  let attempt = 0;
  postGuard.respondWith(async (route) => {
    attempt++;
    await route.fulfill({ status: attempt === 1 ? 503 : 200, body: 'Mock form response' });
  });

  const form = await fillContactStep(page);
  const submit = form.getByRole('button', { name: 'Request a free estimate', exact: true });
  await submit.click();

  const error = form.locator('[data-wiz-send-error]');
  await expect(error).toContainText('could not confirm');
  await expect(error).toBeFocused();
  await expect(submit).toBeEnabled();
  await expect(form.locator('[data-wiz-done]')).toBeHidden();
  await expect(page).toHaveURL(BASE_URL + '/estimate/');
  for (const [field, value] of Object.entries(LEAD)) {
    const input = form.locator('input[name="' + field + '"]');
    if (['use', 'size', 'timeline'].includes(field)) {
      await expect(form.locator('input[name="' + field + '"]:checked')).toHaveValue(value);
    } else {
      await expect(input).toHaveValue(value);
    }
  }
  expect(postGuard.posts).toHaveLength(1);
  expectPayload(postGuard.posts[0], '/');

  await submit.click();
  await expect(form.locator('[data-wiz-done]')).toBeVisible();
  await expect(form.locator('[data-wiz-done]')).toContainText('all set, E2E');
  await expect(form.locator('[data-wiz-done]')).toBeFocused();
  await expect(error).toBeHidden();
  await expect(page).toHaveURL(BASE_URL + '/estimate/');
  expect(postGuard.posts).toHaveLength(2);
  expectPayload(postGuard.posts[1], '/');
});

test('pending and completed requests cannot submit duplicate leads', async ({ page, postGuard }) => {
  let release!: () => void;
  const heldResponse = new Promise<void>((resolve) => { release = resolve; });
  postGuard.respondWith(async (route) => {
    await heldResponse;
    await route.fulfill({ status: 200, body: 'Mock success' });
  });
  const form = await fillContactStep(page);
  const submit = form.getByRole('button', { name: 'Request a free estimate', exact: true });
  try {
    await submit.click();
    await expect.poll(() => postGuard.posts.length).toBe(1);
    await expect(submit).toBeDisabled();
    await expect(form).toHaveAttribute('aria-busy', 'true');

    // Native requestSubmit also exercises duplicate submission through Enter/form APIs;
    // a disabled button alone does not protect those entry points.
    await form.evaluate((node: HTMLFormElement) => {
      node.requestSubmit();
      node.requestSubmit();
    });
    await twoFrames(page);
    expect(postGuard.posts).toHaveLength(1);
  } finally {
    release(); // avoid a held route on assertion failure
  }
  await expect(form.locator('[data-wiz-done]')).toBeVisible();
  await form.evaluate((node: HTMLFormElement) => node.requestSubmit());
  await twoFrames(page);
  expect(postGuard.posts).toHaveLength(1);
});

test('keyboard radio changes stay on the question until Next', async ({ page, postGuard }) => {
  const form = await openBuiltWizard(page);
  const lawn = form.getByRole('radio', { name: 'Lawn', exact: true });
  const pet = form.getByRole('radio', { name: 'Pet turf', exact: true });
  await lawn.focus();
  await lawn.press('Space');
  await lawn.press('ArrowRight');
  await expect(pet).toBeChecked();
  await expect(pet).toBeFocused();
  // Intentional bounded timer regression: old behavior advanced after 280 ms.
  await page.waitForTimeout(400);
  await expect(form.locator('[data-wiz-n]')).toHaveText('1');
  await expect(form.locator('[data-step]').nth(0)).toBeVisible();
  await form.locator('[data-wiz-next]').click();
  await expect(form.locator('[data-wiz-n]')).toHaveText('2');
  expect(postGuard.posts).toHaveLength(0);
});

test('phone native pattern and enhanced validation reject bad numbers', async ({ page, postGuard }) => {
  const form = await fillContactStep(page);
  const phone = form.locator('input[name="phone"]');
  const submit = form.getByRole('button', { name: 'Request a free estimate', exact: true });

  for (const value of ['2025550123', '+1 (202) 555-0123', '202.555.0123', '123456789012345']) {
    await test.step('Accept phone format ' + value, async () => {
      await phone.fill(value);
      expect(await phone.evaluate((node: HTMLInputElement) => node.checkValidity())).toBe(true);
    });
  }
  for (const value of ['', '123', '1234567890123456', '202-555-0123x']) {
    await test.step('Reject phone format ' + (value || '(empty)'), async () => {
      await phone.fill(value);
      expect(await phone.evaluate((node: HTMLInputElement) => node.checkValidity())).toBe(false);
      await submit.click();
      await expect(form.locator('[data-step]').nth(4).locator('.wiz__err')).not.toBeEmpty();
      await expect(phone).toBeFocused();
      expect(postGuard.posts).toHaveLength(0);
    });
  }
});

test.describe('mobile navigation and final submit', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('resizing an open mobile menu restores desktop navigation and page interaction', async ({ page, postGuard }) => {
    await page.goto('/services/putting-greens/');
    await expect(page.locator('form[data-wizard]')).toHaveClass(/is-wizard/);
    const menuButton = page.locator('.chrome__menu');
    const menu = page.getByRole('dialog', { name: 'Site menu', exact: true });
    await menuButton.click();
    await expect(menu).toBeVisible();
    await page.setViewportSize({ width: 1440, height: 900 });
    const nav = page.getByRole('navigation', { name: 'Main navigation', exact: true });
    await expect(menu).toBeHidden();
    await expect(menuButton).toBeHidden();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('html')).not.toHaveClass(/nav-open/);
    await expect(page.locator('dialog[open]')).toHaveCount(0);
    await expect(nav.getByRole('link', { name: 'Services', exact: true })).toBeFocused();
    await expect(page.locator('.chrome__wordmark')).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Services', exact: true })).toHaveAttribute('href', '/services/');
    await expect(nav.getByRole('link', { name: 'Areas', exact: true })).toHaveAttribute('href', '/#markets');
    await nav.getByRole('link', { name: 'Our work', exact: true }).click();
    await expect(page).toHaveURL(BASE_URL + '/#work');
    await expect(page.locator('#work')).toBeVisible();
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(nav).toBeHidden();
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(menu).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menuButton).toBeFocused();
    expect(postGuard.posts).toHaveLength(0);
  });

  test('menu traps focus, Escape restores it, and menu estimate opens one dialog', async ({ page, postGuard }) => {
    await page.goto('/');
    await expect(page.locator('form[data-wizard]')).toHaveClass(/is-wizard/);
    const menuButton = page.locator('.chrome__menu');
    const menu = page.getByRole('dialog', { name: 'Site menu', exact: true });
    await menuButton.click();
    await expect(menu).toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await expect(menu.getByRole('button', { name: 'Close', exact: true })).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(menu.locator('[data-cta="call-menu"]')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(menu.getByRole('button', { name: 'Close', exact: true })).toBeFocused();
    // Modal background is inert, including to programmatic focus attempts.
    await page.locator('.chrome__mark').evaluate((node: HTMLAnchorElement) => node.focus());
    expect(await menu.evaluate((node) => node.contains(document.activeElement))).toBe(true);

    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(menuButton).toBeFocused();

    await menuButton.click();
    await menu.locator('[data-cta="quote-menu"]').click();
    const estimate = page.getByRole('dialog', { name: 'Free estimate', exact: true });
    await expect(estimate).toBeVisible();
    await expect(menu).toBeHidden();
    await expect(page.locator('dialog[open]')).toHaveCount(1);
    await expect.poll(() => estimate.evaluate((node) => node.contains(document.activeElement))).toBe(true);
    await expect(page.locator('html')).not.toHaveClass(/nav-open/);

    await page.keyboard.press('Escape');
    await expect(estimate).toBeHidden();
    // Intended focus destination after the originating menu has closed.
    await expect(menuButton).toBeFocused();
    expect(postGuard.posts).toHaveLength(0);
  });

  test('sticky call bar does not cover the final inline Submit button', async ({ page }) => {
    const form = await fillContactStep(page);
    const submit = form.getByRole('button', { name: 'Request a free estimate', exact: true });
    await submit.scrollIntoViewIfNeeded();
    await expect.poll(() => submit.evaluate((node) => {
      const r = node.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const hit = document.elementFromPoint(x, y);
      return y >= 0 && y < innerHeight && !!hit && (hit === node || node.contains(hit));
    })).toBe(true);
  });
});

for (const viewport of [{ width: 320, height: 640 }, { width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1440, height: 900 }]) {
  test('core routes have no document overflow at ' + viewport.width + 'px', async ({ page }) => {
    await page.setViewportSize(viewport);
    for (const path of ['/', '/services/', '/services/putting-greens/', '/services/pet-turf/', '/grand-strand/', '/grand-strand/shallotte-nc/', '/grand-strand/forestbrook-sc/', '/grand-strand/commercial-turf/', '/blog/how-to-clean-pet-turf/', '/estimate/']) {
      await test.step(path, async () => {
        const response = await page.goto(path);
        expect(response?.status()).toBe(200);
        await expect(page.locator('main')).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
        await twoFrames(page);
        const sizes = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          content: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
        }));
        expect(sizes.content - sizes.viewport, path + ' horizontal overflow').toBeLessThanOrEqual(1);
      });
    }
  });
}

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 320, height: 640 } });

  test('native constraints block bad phone; valid form posts only to the mock', async ({ page, postGuard }) => {
    postGuard.respondWith(async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<!doctype html><title>Captured test request</title><h1>Captured locally</h1>',
      });
    });
    await page.goto('/estimate/');
    const form = wizard(page);
    await expect(form).not.toHaveClass(/is-wizard/);
    await expect(form.locator('[data-step]')).toHaveCount(5);
    for (const step of await form.locator('[data-step]').all()) await expect(step).toBeVisible();
    expect(await form.evaluate((node: HTMLFormElement) => node.noValidate)).toBe(false);
    await expectFormReflow(page, form);

    await form.getByRole('radio', { name: LEAD.use, exact: true }).check();
    await form.getByRole('radio', { name: LEAD.size, exact: true }).check();
    await form.getByRole('radio', { name: LEAD.timeline, exact: true }).check();
    await form.locator('input[name="town"]').fill(LEAD.town);
    await form.locator('input[name="name"]').fill(LEAD.name);
    await form.locator('input[name="email"]').fill(LEAD.email);
    const phone = form.locator('input[name="phone"]');
    await phone.fill('123');
    await form.getByRole('button', { name: 'Request a free estimate', exact: true }).click();
    await expect(phone).toBeFocused();
    expect(await phone.evaluate((node: HTMLInputElement) => node.validity.patternMismatch)).toBe(true);
    expect(postGuard.posts).toHaveLength(0);
    await expect(page).toHaveURL(BASE_URL + '/estimate/');

    await phone.fill(LEAD.phone);
    expect(await form.evaluate((node: HTMLFormElement) => node.checkValidity())).toBe(true);
    await form.getByRole('button', { name: 'Request a free estimate', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Captured locally' })).toBeVisible();
    await expect(page).toHaveURL(BASE_URL + '/thanks/');
    expect(postGuard.posts).toHaveLength(1);
    expectPayload(postGuard.posts[0], '/thanks/');
  });
});
