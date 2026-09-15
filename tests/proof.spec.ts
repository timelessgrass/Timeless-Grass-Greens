import { test, expect } from '@playwright/test';

/**
 * Reviews, the before/after slider and the lead form's hidden context.
 * Prerequisite, as for the other specs: the BUILT site served by playwright.config.ts.
 * Nothing here submits a form.
 */

test('the before/after divider moves with the keyboard and says where it is', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const ba = page.locator('[data-ba]').first();
  await ba.scrollIntoViewIfNeeded();
  await expect(ba).toHaveClass(/is-live/);
  const range = ba.locator('[data-ba-range]');
  await range.focus();
  await page.keyboard.press('ArrowRight');
  await expect(range).toHaveValue('52');
  await expect(range).toHaveAttribute('aria-valuetext', '48% after');
  expect(await ba.locator('.ba__stage').evaluate((el) => el.style.getPropertyValue('--pos'))).toBe('52%');
});

test('dragging across the photo moves the divider', async ({ page, isMobile }) => {
  test.skip(isMobile, 'mouse drag; a finger is handled by the same pointer events');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const stage = page.locator('[data-ba] .ba__stage').first();
  await stage.scrollIntoViewIfNeeded();
  const box = (await stage.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.6);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.6, { steps: 6 });
  await page.mouse.up();
  const value = Number(await stage.locator('[data-ba-range]').inputValue());
  expect(value).toBeGreaterThanOrEqual(18);
  expect(value).toBeLessThanOrEqual(22);
});

test('every review says where it was posted, and NoCo Turf reviews say they are the sister company’s', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.review')).toHaveCount(6);
  await expect(page.locator('.review', { hasText: 'Ally P.' })).toContainText('Google review of NoCo Turf, our sister company');
  await expect(page.locator('.review', { hasText: 'JP W.' })).toContainText('Google review');
  await expect(page.getByRole('link', { name: 'Read our reviews on Google' })).toHaveAttribute('href', /kgmid=\/g\/11vynn9dqg/);
  const schema = (await page.locator('script[type="application/ld+json"]').allTextContents()).join('');
  expect(schema).not.toMatch(/aggregateRating|"@type":"Review"/);
});

test('the Denver metro page carries the pair and reviews; the other areas do not', async ({ page }) => {
  await page.goto('/denver-metro/');
  await expect(page.locator('[data-ba]')).toHaveCount(1);
  await expect(page.locator('.review')).toHaveCount(3);
  for (const other of ['/grand-strand/', '/northeast-florida/']) {
    await page.goto(other);
    await expect(page.locator('.review, [data-ba]')).toHaveCount(0);
  }
});

test('the estimate form carries the page’s market and the visit’s campaign tags', async ({ page }) => {
  await page.goto('/grand-strand/?utm_source=google&utm_campaign=gs-greens&gclid=abc123');
  const form = page.locator('dialog.estimate form[name="quote"]');
  await expect(form.locator('input[name="market"]')).toHaveValue('grand-strand');
  await expect(form.locator('input[name="utm_source"]')).toHaveValue('google');
  await expect(form.locator('input[name="gclid"]')).toHaveValue('abc123');
  await page.goto('/services/pet-turf/');
  const next = page.locator('dialog.estimate form[name="quote"]');
  await expect(next.locator('input[name="gclid"]'), 'kept for the tab’s session').toHaveValue('abc123');
  await expect(next.locator('input[name="market"]')).toHaveValue('');
});
