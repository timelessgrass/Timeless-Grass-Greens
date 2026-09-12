import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

test('private records stay private and compact published pages render without an empty FAQ', { timeout: 120000 }, () => {
  const town = JSON.parse(read('src/content/towns/shallotte-nc.json'));
  const regional = JSON.parse(read('src/content/local-services/grand-strand--commercial-turf.json'));
  const article = read('src/content/blog/how-to-clean-pet-turf.md');
  const fixtures = [
    ['src/content/towns/qa-unpublished-default-nc.json', JSON.stringify({ ...town, status: undefined })],
    ['src/content/towns/qa-unpublished-review-nc.json', JSON.stringify({ ...town, status: 'review' })],
    ['src/content/local-services/grand-strand--qa-unpublished-draft.json', JSON.stringify({ ...regional, status: 'draft', service: 'qa-unpublished-draft' })],
    ['src/content/blog/qa-unpublished-article.md', article.replace(/^status: published$/m, 'status: review')],
  ];
  const created = [];
  try {
    for (const [file, body] of fixtures) {
      fs.writeFileSync(path.join(root, file), body, { flag: 'wx' });
      created.push(file);
    }
    const build = spawnSync('npm', ['run', 'build'], { cwd: root, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
    assert.equal(build.status, 0, `${build.stdout}\n${build.stderr}`);
    const files = fs.readdirSync(path.join(root, 'dist'), { recursive: true });
    assert.equal(files.some((p) => p.includes('qa-unpublished')), false, 'an unpublished output file exists');
    for (const file of files.filter((p) => /\.(html|xml|md|txt)$/.test(p))) {
      assert.equal(read(`dist/${file}`).includes('qa-unpublished'), false, `unpublished link in ${file}`);
    }
    for (const id of ['shallotte-nc', 'carolina-shores-nc', 'conway-sc', 'forestbrook-sc']) {
      assert.ok(fs.existsSync(path.join(root, `dist/grand-strand/${id}/index.html`)), id);
      assert.ok(read('dist/sitemap.xml').includes(`/grand-strand/${id}/`), id);
      assert.ok(fs.existsSync(path.join(root, `dist/grand-strand/${id}/index.html.md`)), id);
    }
    // Exercise the real one-block pilot; no temporary published route is left in dist.
    const compact = JSON.parse(read('src/content/towns/doctors-inlet-fl.json'));
    assert.equal(compact.blocks.length, 1);
    assert.equal((compact.faq || []).length, 0);
    const compactPath = 'dist/northeast-florida/doctors-inlet-fl/index.html';
    const compactHtml = read(compactPath);
    assert.equal((compactHtml.match(/class="[^"]*\blocal__block\b[^"]*"/g) || []).length, 1);
    assert.ok(compactHtml.includes('href="/estimate/"'), 'compact page retains its estimate link');
    assert.ok(compact.sources.length >= 2, 'compact-page research remains stored internally');
    assert.equal((compact.publicReferences || []).length, 0);
    assert.doesNotMatch(compactHtml, /data-public-references|local__sources|>Sources<|>Checked /, 'empty public references must not render');
    for (const source of compact.sources) {
      assert.equal(compactHtml.includes(source.url.replaceAll('&', '&amp;')), false, `internal-only source leaked: ${source.url}`);
      assert.equal(read(`${compactPath}.md`).includes(source.url), false, 'internal-only source leaked into the mirror');
    }
    const selected = JSON.parse(read('src/content/towns/shallotte-nc.json'));
    const selectedPath = 'dist/grand-strand/shallotte-nc/index.html';
    assert.ok(selected.publicReferences.length > 0, 'exercise a page with a useful public reference');
    for (const url of selected.publicReferences) {
      assert.ok(read(selectedPath).includes(url.replaceAll('&', '&amp;')));
      assert.ok(read(`${selectedPath}.md`).includes(url));
    }
    const commercialPath = 'dist/grand-strand/commercial-turf/index.html';
    for (const file of [commercialPath, `${commercialPath}.md`]) {
      assert.doesNotMatch(read(file), /MRSA|53\.5|0\.95|BYU study|Leon fine sand|Rules and research|The fine print/, 'retired research must not remain in public output');
    }
    assert.equal(files.some((file) => file.includes('editorial-research-archive')), false, 'internal archive must not be published');
    for (const route of ['guides/is-artificial-turf-impervious', 'blog/how-to-read-a-turf-quote']) {
      const html = read(`dist/${route}/index.html`);
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
      const headingId = html.match(/<h2\b[^>]*id="([^"]+)"/)?.[1];
      assert.ok(canonical && headingId, 'a guide/article with section navigation is required');
      assert.ok(read(`dist/${route}/index.html.md`).includes(`${canonical}#${headingId}`), 'mirror section link must target the current page');
    }
    assert.ok(read(`${compactPath}.md`).includes(compact.blocks[0].h2), 'compact text mirror retains its section');
    for (const page of [compactPath, 'dist/grand-strand/carolina-forest-sc/index.html', 'dist/guides/is-artificial-turf-impervious/index.html']) {
      const html = read(page);
      assert.doesNotMatch(html, /class="faq"/, `empty visible FAQ in ${page}`);
      const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
      assert.ok(scripts.length, `missing structured data in ${page}`);
      for (const [, json] of scripts) {
        const data = JSON.parse(json);
        assert.doesNotMatch(JSON.stringify(data), /"@type":"FAQPage"/, `empty FAQPage schema in ${page}`);
      }
    }
    console.log(build.stdout.split('\n').filter((line) => /files ·|pages? built|SCALE|CONSISTENT/.test(line)).join('\n'));
  } finally {
    for (const file of created) fs.unlinkSync(path.join(root, file));
  }
});
