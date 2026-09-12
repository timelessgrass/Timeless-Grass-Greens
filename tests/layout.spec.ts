import { test, expect } from '@playwright/test';

test.use({ reducedMotion: 'no-preference', serviceWorkers: 'block' });
test.beforeEach(async ({ context }) => {
  await context.route('**/*', async route => {
    if (route.request().method() === 'POST') await route.abort();
    else await route.continue();
  });
});

for (const route of ['/', '/services/putting-greens/', '/grand-strand/']) {
  test(`project captions remain below images and lightbox restores focus: ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    const figure = page.locator('.mosaic .fig, .workgrid .fig').first();
    await figure.scrollIntoViewIfNeeded();
    await expect(figure).toHaveAttribute('role', 'button');
    await expect.poll(() => figure.evaluate(node => {
      const frame = node.querySelector('.fig__media')!.getBoundingClientRect();
      const caption = node.querySelector('figcaption')!.getBoundingClientRect();
      const img = node.querySelector('img')!;
      return img.complete && img.naturalWidth > 0 && frame.width > 250 && caption.top >= frame.bottom - 1;
    })).toBe(true);
    const imageAlt = await figure.locator('img').getAttribute('alt');
    const caption = await figure.locator('figcaption').textContent();
    await figure.focus();
    await figure.press('Enter');
    const dialog = page.locator('dialog.lightbox');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('.lightbox__img')).toHaveAttribute('alt', imageAlt!);
    await expect(dialog.locator('.lightbox__text')).toHaveText(caption!);
    await page.keyboard.press('ArrowRight');
    await expect(dialog.locator('.lightbox__count')).toContainText('2 /');
    await page.keyboard.press('ArrowLeft');
    await expect(dialog.locator('.lightbox__count')).toContainText('1 /');
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(figure).toBeFocused();
  });
}

test('normal-motion process stays readable in document flow', async ({ page }) => {
  await page.goto('/');
  const process = page.locator('.proc');
  await process.scrollIntoViewIfNeeded();
  await expect(process.getByRole('link', { name: 'Email photos of your space' })).toBeVisible();
  await expect.poll(() => process.evaluate(node => {
    const steps = [...node.querySelectorAll<HTMLElement>('.proc__step')];
    const paragraphs = [...steps[0].querySelectorAll('p')];
    return steps.length === 4 && steps.every(step => {
      const css = getComputedStyle(step);
      return Number(css.opacity) === 1 && css.position !== 'sticky' && css.transform === 'none';
    }) && Math.abs(paragraphs[0].getBoundingClientRect().left - paragraphs[1].getBoundingClientRect().left) < 1;
  })).toBe(true);
  const before = await process.boundingBox();
  await page.evaluate(() => window.scrollBy(0, 180));
  await expect.poll(async () => (before!.y - (await process.boundingBox())!.y)).toBeGreaterThan(120);
});

for (const route of ['/blog/how-to-read-a-turf-quote/', '/guides/is-artificial-turf-impervious/']) {
  test(`contents links point to actual headings: ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    const contents = page.getByRole('navigation', { name: 'On this page', exact: true });
    await expect(contents).toBeVisible();
    const links = contents.locator('a');
    expect(await links.count()).toBeGreaterThan(1);
    expect(await links.evaluateAll(nodes => nodes.every(node => {
      const id = (node.getAttribute('href') || '').slice(1);
      const target = document.getElementById(id);
      return !!target && /^H[23]$/.test(target.tagName) && !!target.textContent?.trim();
    }))).toBe(true);
    const jump = page.getByRole('link', { name: 'Jump to the checklist', exact: true });
    if (await jump.count()) {
      const href = await jump.getAttribute('href');
      await jump.click();
      const target = page.locator(href!);
      await expect.poll(async () => {
        const r = await target.boundingBox();
        return !!r && r.y > 60 && r.y < 300;
      }).toBe(true);
    }
  });
}


test('reduced motion shows hero labels and actions without delayed entrance states', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of ['/', '/grand-strand/shallotte-nc/', '/services/pet-turf/']) {
    await page.goto(route);
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
    const states = await page.locator('.hero__eyebrow, .hero__cta').evaluateAll(nodes => nodes.map(node => {
      const css = getComputedStyle(node);
      return { opacity: css.opacity, animationDelay: css.animationDelay };
    }));
    expect(states).toHaveLength(2);
    for (const state of states) {
      expect(state.opacity).toBe('1');
      expect(state.animationDelay).toBe('0s');
    }
  }
});
