import { test, expect } from '@playwright/test';

test.use({ reducedMotion: 'reduce', serviceWorkers: 'block' });
test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => route.request().method() === 'POST' ? route.abort() : route.continue());
});

test('article contents work by keyboard on phones and remain reachable beside the desktop article', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/blog/how-to-read-a-turf-quote/');

  const contents = page.locator('[data-reading-contents]');
  const summary = contents.locator('summary');
  const navigation = contents.getByRole('navigation', { name: 'On this page' });
  await expect(contents).toHaveJSProperty('open', false);
  await summary.focus();
  await summary.press('Enter');
  await expect(navigation).toBeVisible();

  // A minor phone resize must not undo the reader's decision to expand contents.
  await page.setViewportSize({ width: 420, height: 844 });
  await expect(contents).toHaveJSProperty('open', true);
  await summary.press('Enter');
  await expect(contents).toHaveJSProperty('open', false);

  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(contents).toHaveJSProperty('open', true);
  await expect(summary).toBeHidden();
  await navigation.getByRole('link', { name: 'The checklist', exact: true }).click();
  await expect(page).toHaveURL(/#the-checklist$/);
  await expect(page.getByRole('heading', { name: 'The checklist', exact: true })).toBeInViewport();
  await expect(navigation).toBeInViewport();

  await page.setViewportSize({ width: 320, height: 844 });
  await expect(contents).toHaveJSProperty('open', false);
  const checklist = page.locator('#the-checklist + ol');
  await expect(checklist).toHaveCount(1);
  await expect(checklist.getByRole('listitem')).toHaveCount(11);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);

  await page.goto('/blog/how-fast-should-a-putting-green-roll/');
  const comparison = page.getByRole('region', { name: 'Putting green speed comparison' });
  const speedTable = comparison.getByRole('table');
  await expect(speedTable).toHaveCount(1);
  await expect(speedTable.getByRole('row', { name: /Tournament play/ }).getByRole('cell')).toHaveText(['Tournament play', 'under 8.5 ft', '8.5 to 9.5 ft', 'over 9.5 ft']);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  await comparison.focus();
  await comparison.press('ArrowRight');
  await expect.poll(() => comparison.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
});

test('article contents and the estimate fallback remain usable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: 'reduce',
    serviceWorkers: 'block',
    viewport: { width: 390, height: 844 },
  });
  await context.route('**/*', route => route.request().method() === 'POST' ? route.abort() : route.continue());

  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}/blog/how-to-read-a-turf-quote/`);
    const contents = page.locator('[data-reading-contents]');
    await expect(contents).toHaveAttribute('open', '');
    await contents.getByRole('navigation', { name: 'On this page' }).getByRole('link', { name: 'The checklist', exact: true }).click();
    await expect(page).toHaveURL(/#the-checklist$/);
    await expect(page.getByRole('heading', { name: 'The checklist', exact: true })).toBeInViewport();

    await page.getByRole('complementary', { name: 'Plan your installation' }).getByRole('link', { name: 'Request a free estimate' }).click();
    await expect(page).toHaveURL(/\/estimate\/$/);
    await expect(page.locator('form[name="quote"]')).toHaveCount(1);
    await expect(page.locator('input[name="town"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  } finally {
    await context.close();
  }
});
