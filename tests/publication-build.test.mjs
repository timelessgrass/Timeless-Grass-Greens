import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

async function loadGuides() {
  const { outputText } = ts.transpileModule(read('src/data/guides.ts'), { compilerOptions: { module: ts.ModuleKind.ESNext } });
  return (await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)).GUIDES;
}

test('private records stay private and compact published pages render without an empty FAQ', { timeout: 120000 }, async (t) => {
  const workspace = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'timeless publication ')));
  t.after(() => fs.rmSync(workspace, { recursive: true, force: true }));
  for (const dir of ['src', 'scripts']) fs.cpSync(path.join(root, dir), path.join(workspace, dir), { recursive: true });
  for (const file of ['package.json', 'astro.config.mjs', 'tsconfig.json']) fs.copyFileSync(path.join(root, file), path.join(workspace, file));
  fs.mkdirSync(path.join(workspace, '.site/truth'), { recursive: true });
  fs.copyFileSync(path.join(root, '.site/truth/brief.json'), path.join(workspace, '.site/truth/brief.json'));
  for (const dir of ['node_modules', 'public']) fs.symlinkSync(path.join(root, dir), path.join(workspace, dir), 'dir');
  const readFixture = (p) => fs.readFileSync(path.join(workspace, p), 'utf8');
  const writeFixture = (p, value) => fs.writeFileSync(path.join(workspace, p), typeof value === 'string' ? value : JSON.stringify(value));
  const town = JSON.parse(readFixture('src/content/towns/shallotte-nc.json'));
  const regional = JSON.parse(readFixture('src/content/local-services/grand-strand--commercial-turf.json'));
  const article = readFixture('src/content/blog/how-to-clean-pet-turf.md');
  const compact = {
    ...JSON.parse(readFixture('src/content/towns/doctors-inlet-fl.json')),
    blocks: [{ icon: 'flag', kicker: 'Planning', h2: 'Bring a sketch.', paras: ['Mark gates and paths so the estimate can address access and transitions.'] }],
    faq: [], publicReferences: [],
    sources: [
      { label: 'Internal planning evidence', url: 'https://example.com/internal-planning-evidence' },
      { label: 'Internal site evidence', url: 'https://example.com/internal-site-evidence' },
    ],
  };
  writeFixture('src/content/towns/doctors-inlet-fl.json', compact);
  writeFixture('src/content/local-services/grand-strand--commercial-turf.json', { ...regional, faq: [] });
  const guides = (await loadGuides()).map((g) => g.slug === 'is-artificial-turf-impervious' ? { ...g, faq: [] } : g);
  writeFixture('src/data/guides.ts', `import type { Guide } from './guides.types';\nexport const GUIDES: Guide[] = ${JSON.stringify(guides)};\nexport const guideBySlug = (s: string) => GUIDES.find((g) => g.slug === s);\n`);
  const fixtures = [
    ['src/content/towns/qa-unpublished-default-nc.json', JSON.stringify({ ...town, status: undefined })],
    ['src/content/towns/qa-unpublished-review-nc.json', JSON.stringify({ ...town, status: 'review' })],
    ['src/content/local-services/grand-strand--qa-unpublished-draft.json', JSON.stringify({ ...regional, status: 'draft', service: 'qa-unpublished-draft' })],
    ['src/content/blog/qa-unpublished-article.md', article.replace(/^status: published$/m, 'status: review')],
  ];
  for (const [file, body] of fixtures) {
    fs.writeFileSync(path.join(workspace, file), body, { flag: 'wx' });
  }
  // These deliberately compact fixtures isolate rendering and publication behavior.
  // The separate production-build test below enforces every check on the real content.
  const build = spawnSync('npm', ['exec', '--', 'astro', 'build'], { cwd: workspace, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);
  const mirrors = spawnSync(process.execPath, ['scripts/md-mirrors.mjs', 'dist'], { cwd: workspace, encoding: 'utf8' });
  assert.equal(mirrors.status, 0, mirrors.stdout + mirrors.stderr);
  const files = fs.readdirSync(path.join(workspace, 'dist'), { recursive: true });
  assert.equal(files.some((p) => p.includes('qa-unpublished')), false, 'an unpublished output file exists');
  for (const file of files.filter((p) => /\.(html|xml|md|txt)$/.test(p))) {
    assert.equal(readFixture(`dist/${file}`).includes('qa-unpublished'), false, `unpublished link in ${file}`);
  }
  for (const id of ['shallotte-nc', 'carolina-shores-nc', 'conway-sc', 'forestbrook-sc']) {
    assert.ok(fs.existsSync(path.join(workspace, `dist/grand-strand/${id}/index.html`)), id);
    assert.ok(readFixture('dist/sitemap.xml').includes(`/grand-strand/${id}/`), id);
    assert.ok(fs.existsSync(path.join(workspace, `dist/grand-strand/${id}/index.html.md`)), id);
  }
  // The one-block fixture is isolated from both working source and the preview output.
  const compactPath = 'dist/northeast-florida/doctors-inlet-fl/index.html';
  const compactHtml = readFixture(compactPath);
  assert.equal((compactHtml.match(/class="[^"]*\blocal__block\b[^"]*"/g) || []).length, 1);
  assert.ok(compactHtml.includes('href="/estimate/"'), 'compact page retains its estimate link');
  assert.ok(compact.sources.length >= 2, 'compact-page research remains stored internally');
  assert.equal((compact.publicReferences || []).length, 0);
  assert.doesNotMatch(compactHtml, /data-public-references|local__sources|>Sources<|>Checked /, 'empty public references must not render');
  for (const source of compact.sources) {
    assert.equal(compactHtml.includes(source.url.replaceAll('&', '&amp;')), false, `internal-only source leaked: ${source.url}`);
    assert.equal(readFixture(`${compactPath}.md`).includes(source.url), false, 'internal-only source leaked into the mirror');
  }
  const selected = JSON.parse(readFixture('src/content/towns/shallotte-nc.json'));
  const selectedPath = 'dist/grand-strand/shallotte-nc/index.html';
  assert.ok(selected.publicReferences.length > 0, 'exercise a page with a useful public reference');
  for (const url of selected.publicReferences) {
    assert.ok(readFixture(selectedPath).includes(url.replaceAll('&', '&amp;')));
    assert.ok(readFixture(`${selectedPath}.md`).includes(url));
  }
  const commercialPath = 'dist/grand-strand/commercial-turf/index.html';
  for (const file of [commercialPath, `${commercialPath}.md`]) {
    assert.doesNotMatch(readFixture(file), /MRSA|53\.5|0\.95|BYU study|Leon fine sand|Rules and research|The fine print/, 'retired research must not remain in public output');
  }
  assert.equal(files.some((file) => file.includes('editorial-research-archive')), false, 'internal archive must not be published');
  for (const route of ['guides/is-artificial-turf-impervious', 'blog/how-to-read-a-turf-quote']) {
    const html = readFixture(`dist/${route}/index.html`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const headingId = html.match(/<h2\b[^>]*id="([^"]+)"/)?.[1];
    assert.ok(canonical && headingId, 'a guide/article with section navigation is required');
    assert.ok(readFixture(`dist/${route}/index.html.md`).includes(`${canonical}#${headingId}`), 'mirror section link must target the current page');
  }
  assert.ok(readFixture(`${compactPath}.md`).includes(compact.blocks[0].h2), 'compact text mirror retains its section');
  for (const page of [compactPath, commercialPath, 'dist/guides/is-artificial-turf-impervious/index.html']) {
    const html = readFixture(page);
    assert.doesNotMatch(html, /class="faq"/, `empty visible FAQ in ${page}`);
    const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    assert.ok(scripts.length, `missing structured data in ${page}`);
    for (const [, json] of scripts) {
      const data = JSON.parse(json);
      assert.doesNotMatch(JSON.stringify(data), /"@type":"FAQPage"/, `empty FAQPage schema in ${page}`);
    }
  }
  console.log(build.stdout.split('\n').filter((line) => /files ·|pages? built|SCALE|CONSISTENT/.test(line)).join('\n'));
});

test('the real publication passes all build checks and guide references reach HTML and mirrors', { timeout: 120000 }, async () => {
  const build = spawnSync('npm', ['run', 'build'], { cwd: root, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);
  for (const guide of await loadGuides()) {
    assert.ok(guide.publicReferences?.length, `${guide.slug} lost its useful reference selection`);
    const html = read(`dist/guides/${guide.slug}/index.html`);
    const mirror = read(`dist/guides/${guide.slug}/index.html.md`);
    const references = html.match(/<aside\b[^>]*data-public-references[\s\S]*?<\/aside>/)?.[0];
    assert.ok(references, `${guide.slug}: useful links section missing`);
    const hrefs = [...references.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(([, href]) => href.replaceAll('&amp;', '&'));
    for (const url of guide.publicReferences) {
      assert.ok(guide.sources.some((source) => source.url === url), `${guide.slug}: reference lacks evidence`);
      assert.ok(hrefs.includes(url), `${guide.slug}: reference missing from HTML`);
      assert.ok(mirror.includes(url), `${guide.slug}: reference missing from mirror`);
    }
  }
  console.log(build.stdout.split('\n').filter((line) => /files ·|pages? built|SCALE|CONSISTENT/.test(line)).join('\n'));
});
