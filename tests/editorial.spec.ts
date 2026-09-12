import { test, expect } from '@playwright/test';

test.use({ reducedMotion: 'reduce', serviceWorkers: 'block' });
test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => route.request().method() === 'POST' ? route.abort() : route.continue());
});

test('commercial visitors can inspect relevant work and request an estimate without a research appendix', async ({ page }) => {
  await page.goto('/grand-strand/commercial-turf/');
  await expect(page.locator('main')).not.toContainText(/MRSA|BYU study|Leon fine sand|Rules and research|The fine print/);
  await expect(page.locator('[data-public-references]')).toHaveCount(0);
  const figure = page.locator('.local__intro .fig');
  await figure.scrollIntoViewIfNeeded();
  await expect.poll(() => figure.locator('img').evaluate(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0)).toBe(true);
  const frame = await figure.locator('.fig__media').boundingBox();
  const caption = await figure.locator('figcaption').boundingBox();
  expect(caption!.y).toBeGreaterThanOrEqual(frame!.y + frame!.height - 1);
  await expect(figure).toHaveAttribute('role', 'button');
  await figure.focus();
  await figure.press('Enter');
  const photoDialog = page.getByRole('dialog', { name: 'Photo', exact: true });
  await expect(photoDialog).toBeVisible();
  await expect(photoDialog.locator('.lightbox__text')).toHaveText((await figure.locator('figcaption').textContent())!);
  await page.keyboard.press('Escape');
  await expect(photoDialog).toBeHidden();
  await expect(figure).toBeFocused();
  await page.locator('.hero__cta [data-estimate]').click();
  await expect(page.locator('dialog.estimate')).toBeVisible();
  await expect(page.locator('dialog.estimate input[name="use"][value="Commercial or sports field"]')).toBeChecked();
});

test('only intentionally selected references appear in the reading experience', async ({ page }) => {
  await page.goto('/northeast-florida/doctors-inlet-fl/');
  await expect(page.locator('[data-public-references], .local__sources')).toHaveCount(0);
  await page.goto('/grand-strand/shallotte-nc/');
  const references = page.getByRole('complementary', { name: 'Useful links' });
  await expect(references.getByRole('link')).toHaveCount(1);
  await expect(references.getByRole('link')).toHaveAttribute('href', 'https://www.townofshallotte.org/planning_zoning');
  await page.goto('/blog/how-to-clean-pet-turf/');
  await expect(page.locator('main')).not.toContainText(/MRSA|27 hours|Rules and research/);
  await expect(page.getByRole('heading', { name: 'Sources', exact: true })).toHaveCount(0);
  await expect(page.getByRole('complementary', { name: 'Useful links' }).getByRole('link')).not.toHaveCount(0);
});

test('article and guide readers can request an estimate directly after the short answer', async ({ page }) => {
  for (const [route, preset] of [
    ['/blog/how-to-read-a-turf-quote/', ''],
    ['/guides/is-artificial-turf-impervious/', ''],
    ['/blog/how-fast-should-a-putting-green-roll/', 'Putting green'],
    ['/blog/what-infill-works-best-for-dogs/', 'Pet turf'],
  ]) {
    await page.goto(route);
    const offer = page.getByRole('complementary', { name: 'Plan your installation' });
    const action = offer.getByRole('link', { name: 'Request a free estimate' });
    await expect(offer.getByRole('link', { name: /^Call / })).toHaveAttribute('href', /^tel:/);
    await expect(action).toHaveAttribute('href', preset ? `/estimate/?use=${encodeURIComponent(preset)}` : '/estimate/');
    expect(await offer.evaluate(node => {
      const contents = document.querySelector('.doc__toc');
      return contents && !!(node.compareDocumentPosition(contents) & Node.DOCUMENT_POSITION_FOLLOWING);
    })).toBe(true);
    await action.click();
    const form = page.locator('dialog.estimate form');
    await expect(page.locator('dialog.estimate')).toBeVisible();
    await expect(form.locator('[data-wiz-n]')).toHaveText(preset ? '2' : '1');
    if (preset) await expect(form.locator(`input[name="use"][value="${preset}"]`)).toBeChecked();
  }
});

test('the phone contact bar yields to the reading estimate actions', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto('/blog/how-to-read-a-turf-quote/');
  const offer = page.getByRole('complementary', { name: 'Plan your installation' });
  const action = offer.getByRole('link', { name: 'Request a free estimate' });
  await action.scrollIntoViewIfNeeded();
  await expect(page.locator('.bar')).toHaveClass(/is-hidden/);
  await action.click();
  await expect(page.locator('dialog.estimate')).toBeVisible();
});

test('the reading estimate link reaches the native form without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  await context.route('**/*', route => route.request().method() === 'POST' ? route.abort() : route.continue());
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:8769/blog/what-infill-works-best-for-dogs/');
    await page.getByRole('complementary', { name: 'Plan your installation' }).getByRole('link', { name: 'Request a free estimate' }).click();
    await expect(page).toHaveURL(/\/estimate\/\?use=Pet%20turf$/);
    await expect(page.locator('form[name="quote"]')).toHaveCount(1);
    await expect(page.locator('input[name="town"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  } finally {
    await context.close();
  }
});

test('edited sales and educational pages reflow at phone and desktop widths', async ({ page }, testInfo) => {
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/grand-strand/commercial-turf/', '/guides/', '/guides/is-artificial-turf-impervious/', '/blog/how-to-clean-pet-turf/', '/services/pet-turf/', '/grand-strand/shallotte-nc/', '/northeast-florida/doctors-inlet-fl/', '/services/', '/grand-strand/']) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${route} at ${width}px`).toBeLessThanOrEqual(1);
      if (testInfo.project.name === 'desktop') {
        // Scroll to the closing photos so the full-page capture includes normally lazy-loaded images.
        const closingPhotos = page.locator('#quote img');
        if (await closingPhotos.count()) {
          await closingPhotos.first().scrollIntoViewIfNeeded();
          await expect.poll(() => closingPhotos.evaluateAll(images => images.every(image => {
            const img = image as HTMLImageElement;
            return img.complete && img.naturalWidth > 0;
          }))).toBe(true);
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: testInfo.outputPath(`${route.slice(1, -1).replaceAll('/', '-')}-${width}.png`), fullPage: true });
      }
    }
  }
});
