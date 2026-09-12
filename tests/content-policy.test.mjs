import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import yaml from 'js-yaml';
import { isPublished, assertUniqueRoutes } from '../src/lib/content-policy.mjs';
import { townEligibility, EXISTING_TOWN_IDS } from '../src/data/service-territory.mjs';

test('unreviewed content stays private by default', () => {
  for (const status of [undefined, 'draft', 'review', 'Published', 'invalid']) {
    assert.equal(isPublished({ status }), false);
  }
  assert.equal(isPublished({ status: 'published' }), true);
  assert.equal(isPublished({ status: 'published', data: { status: 'draft' } }), true);
  assert.equal(isPublished({ status: 'draft', data: { status: 'published' } }), false);
});

test('Grand Strand supports North Carolina without admitting an entire county', () => {
  assert.equal(townEligibility('shallotte-nc', { market: 'grand-strand', state: 'NC' }).eligible, true);
  assert.equal(townEligibility('holden-beach-nc', { market: 'grand-strand', state: 'NC' }).eligible, false);
  assert.equal(townEligibility('shallotte-nc', { market: 'grand-strand', state: 'SC' }).eligible, false);
  assert.equal(townEligibility('shallotte-nc', { market: 'denver-metro', state: 'NC' }).eligible, false);
});

test('existing service coverage survives the publication migration', () => {
  assert.equal(EXISTING_TOWN_IDS.size, 85);
  for (const id of EXISTING_TOWN_IDS) {
    const data = JSON.parse(fs.readFileSync(new URL(`../src/content/towns/${id}.json`, import.meta.url)));
    assert.equal(isPublished(data), true, id);
    assert.equal(townEligibility(id, data).eligible, true, id);
  }
});

test('conflicting town and service URLs stop generation', () => {
  assert.throws(() => assertUniqueRoutes(['/grand-strand/example/', '/grand-strand/example/']), /Duplicate content route/);
  assert.doesNotThrow(() => assertUniqueRoutes(['/grand-strand/example/', '/denver-metro/example/']));
});

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const compactTown = () => ({
  ...JSON.parse(read('src/content/towns/little-river-sc.json')),
  title: 'A compact local guide | TIMELESS Grass & Greens',
  description: 'Plan the space around how it will be used.',
  h1: 'Plan a usable outdoor space.',
  lede: 'Choose the footprint before comparing materials.',
  wins: ['Check the access', 'Describe the use', 'Discuss the edges'],
  answer: { question: 'Where should planning start?', answer: 'Measure the intended space and describe how it will be used.' },
  blocks: [{ icon: 'flag', kicker: 'Planning', h2: 'Bring a sketch.', paras: ['Mark gates and paths so the estimate can address access and transitions.'] }],
  faq: [],
  nearby: ['missing-neighbor-one-sc', 'missing-neighbor-two-sc'],
  servicesNote: 'Choose the service that fits the intended use.',
});

function checkerFixture(t) {
  const dir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'timeless checker ')));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const write = (file, value) => {
    const dest = path.join(dir, file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, typeof value === 'string' ? value : JSON.stringify(value));
    return dest;
  };
  for (const file of [
    'scripts/check-local-content.mjs', 'scripts/check-articles.mjs',
    'src/lib/content-policy.mjs', 'src/data/service-territory.mjs',
    'src/data/extra.json', 'src/data/guides.ts', 'src/data/services.ts', 'src/data/markets.ts',
    'src/data/local-evidence.json', 'src/data/editorial-research-archive.json', 'src/components/Icon.astro',
    ...['denver-metro', 'grand-strand', 'northeast-florida'].map((market) => `src/data/cities/${market}.json`),
  ]) write(file, read(file));
  for (const collection of ['towns', 'local-services', 'blog']) fs.mkdirSync(path.join(dir, `src/content/${collection}`), { recursive: true });
  fs.symlinkSync(path.join(root, 'node_modules'), path.join(dir, 'node_modules'), 'dir');
  const run = (script, ...args) => spawnSync(process.execPath, [`scripts/${script}.mjs`, ...args], { cwd: dir, encoding: 'utf8' });
  return { write, run };
}

const article = (status, body = 'Measure gates and paths before choosing the installation footprint. [Plan the work](/estimate/).', faq) => `---\n${yaml.dump({
  status, title: 'Plan an outdoor space | TIMELESS Grass & Greens', description: 'A practical planning question.', h1: 'Plan the footprint.',
  answer: { question: 'What should be measured?', answer: 'Measure access and the space that will receive turf.' },
  ...(faq === undefined ? {} : { faq }),
  sources: [{ label: 'Source one', url: 'https://example.com/one', checked: '2026-09-11' }, { label: 'Source two', url: 'https://example.com/two', checked: '2026-09-11' }],
})}---\n${body}\n`;

test('actual local schemas accept one block and optional zero FAQs while retaining their limits', async () => {
  // Astro resolves these two wrappers during a build. Load the same Zod schemas directly here.
  const source = read('src/content.config.ts')
    .replace("import { defineCollection, z } from 'astro:content';", `import { z } from ${JSON.stringify(import.meta.resolve('zod'))}; const defineCollection = (config) => config;`)
    .replace("import { glob } from 'astro/loaders';", 'const glob = () => ({});')
    .replace("'./data/service-territory.mjs'", JSON.stringify(new URL('../src/data/service-territory.mjs', import.meta.url).href));
  const { collections } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
  const town = compactTown();
  const regional = { ...JSON.parse(read('src/content/local-services/grand-strand--commercial-turf.json')), blocks: town.blocks, faq: [] };
  for (const [schema, data] of [[collections.towns.schema, town], [collections.localServices.schema, regional]]) {
    assert.equal(schema.safeParse(data).success, true);
    const { faq, ...withoutFaq } = data;
    assert.deepEqual(schema.parse(withoutFaq).faq, []);
    const { publicReferences, ...withoutReferences } = data;
    assert.deepEqual(schema.parse(withoutReferences).publicReferences, []);
    assert.equal(schema.safeParse({ ...data, publicReferences: [data.sources[0].url] }).success, true);
    assert.equal(schema.safeParse({ ...data, publicReferences: ['https://example.com/not-in-evidence'] }).success, false);
    for (const patch of [{ blocks: [] }, { blocks: Array(5).fill(town.blocks[0]) }, { faq: Array(7).fill({ q: 'Question', a: 'Answer' }) }, { sources: [] }, { blocks: [{ ...town.blocks[0], paras: [] }] }]) {
      assert.equal(schema.safeParse({ ...data, ...patch }).success, false);
    }
  }
});

test('public references are selected from internal evidence without forcing citations into copy', (t) => {
  const { write, run } = checkerFixture(t);
  const town = compactTown();
  const localFile = write('src/content/towns/little-river-sc.json', { ...town, publicReferences: [] });
  assert.equal(run('check-local-content', localFile).status, 0);
  write('src/content/towns/little-river-sc.json', { ...town, publicReferences: ['https://example.com/unrecorded'] });
  const invalidLocal = run('check-local-content', localFile);
  assert.equal(invalidLocal.status, 1);
  assert.match(invalidLocal.stdout, /public reference has no matching source/);

  const articleFile = write('src/content/blog/reading.md', article('published'));
  const retained = run('check-articles', articleFile);
  assert.equal(retained.status, 0, retained.stdout + retained.stderr);
  assert.doesNotMatch(retained.stdout, /source listed but never linked/);
  write('src/content/blog/reading.md', article('published').replace('sources:', 'publicReferences:\n  - https://example.com/unrecorded\nsources:'));
  const invalidArticle = run('check-articles', articleFile);
  assert.equal(invalidArticle.status, 1);
  assert.match(invalidArticle.stdout, /public reference has no matching source/);
});

test('local checker accepts one block, omitted or empty FAQs, and named files around the review flag', (t) => {
  const { write, run } = checkerFixture(t);
  const town = compactTown();
  const { faq, ...withoutFaq } = town;
  const a = write('src/content/towns/little-river-sc.json', withoutFaq);
  const b = write('src/content/local-services/grand-strand--commercial-turf.json', { ...town, service: 'commercial-turf' });
  for (const args of [[a, '--include-review', b], ['--include-review', a, b], [a, b]]) {
    const result = run('check-local-content', ...args);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.match(result.stdout, /2 files · 0 fail/);
  }
});

test('local review errors and similarity are opt-in; drafts stay excluded and review links stay private', (t) => {
  const { write, run } = checkerFixture(t);
  const town = compactTown();
  const a = write('src/content/towns/little-river-sc.json', town);
  const b = write('src/content/towns/longs-sc.json', { ...town, status: 'review', nearby: ['little-river-sc', 'missing-neighbor-sc'], h1: 'The cheapest surface.' });
  write('src/content/towns/qa-draft-sc.json', { status: 'draft', h1: 'The cheapest surface.' });
  assert.equal(run('check-local-content').status, 0);
  const review = run('check-local-content', '--include-review');
  assert.equal(review.status, 1);
  assert.match(review.stdout, /banned phrase: "cheapest"/);
  assert.match(review.stdout, /FAIL similarity/);
  assert.match(review.stdout, /draft  qa-draft-sc \(not published\)/);
  write('src/content/towns/little-river-sc.json', { ...town, status: 'review', nearby: ['longs-sc', 'missing-neighbor-sc'] });
  const linked = run('check-local-content', a, '--include-review');
  assert.equal(linked.status, 1);
  assert.match(linked.stdout, /nearby area points to an unpublished page: longs-sc/);
  assert.equal(run('check-local-content', b).status, 0);
});

test('article review errors are opt-in and review links never become public routes', (t) => {
  const { write, run } = checkerFixture(t);
  const a = write('src/content/blog/published.md', article('published'));
  const b = write('src/content/blog/candidate.md', article('review', 'The cheapest material. [Another candidate](/blog/other-review/).'));
  write('src/content/blog/other-review.md', article('review'));
  write('src/content/blog/draft.md', article('draft', 'The cheapest material.'));
  const normal = run('check-articles');
  assert.equal(normal.status, 0, normal.stdout + normal.stderr);
  assert.doesNotMatch(normal.stdout, /FAQ entries; aim for/);
  const review = run('check-articles', '--include-review', b, a);
  assert.equal(review.status, 1);
  assert.match(review.stdout, /banned phrase "cheapest"/);
  assert.match(review.stdout, /link to a page of ours that doesn't exist: \/blog\/other-review\//);
  assert.equal(run('check-articles', b).status, 0);
  const all = run('check-articles', '--include-review');
  assert.match(all.stdout, /draft  draft \(not published\)/);
  assert.match(all.stdout, /FAIL similarity/);
});

test('FAQ entries still require question and answer strings in both checkers', (t) => {
  const { write, run } = checkerFixture(t);
  const a = write('src/content/towns/little-river-sc.json', { ...compactTown(), faq: [{ q: 'Question' }] });
  const b = write('src/content/blog/published.md', article('published', undefined, [{ q: 'Question' }]));
  for (const [script, file] of [['check-local-content', a], ['check-articles', b]]) {
    const result = run(script, file);
    assert.equal(result.status, 1);
    assert.match(result.stdout, /faq entries must contain string q and a fields/);
  }
});
