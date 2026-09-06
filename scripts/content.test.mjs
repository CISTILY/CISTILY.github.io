import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseEntry, getEntries, renderMarkdown, safeLink } from '../lib/content.ts';

const entry = (metadata = '', body = '## Nội dung\n\nMột đoạn **in đậm**.') => `---\ntitle: "Ví dụ"\nsummary: "Tóm tắt"\npublished: true\n${metadata}\n---\n${body}`;
test('Markdown supports headings, lists, tables and code while disabling executable HTML and links', () => {
  const html = renderMarkdown('## Tiêu đề\n\n- Một mục\n\n| A | B |\n| - | - |\n| 1 | 2 |\n\n```js\nconst x = 1;\n```\n\n<script>alert(1)</script>\n\n[bad](javascript:alert(1))');
  for (const tag of ['<h2>', '<ul>', '<table>', '<pre>']) assert.ok(html.includes(tag));
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('href="javascript:'));
});
test('published must be an explicit boolean; omitted and false entries stay hidden', () => {
  assert.equal(parseEntry('---\npublished: false\n---\nNháp', 'draft', 'posts'), null);
  assert.equal(parseEntry('---\ntitle: Nháp\n---\nNháp', 'draft', 'posts'), null);
  assert.throws(() => parseEntry(entry().replace('published: true', 'published: "false"'), 'draft', 'posts'), /published/);
});
test('gallery uses its first image as cover and keeps captions', () => {
  const result = parseEntry(entry('images:\n  - src: "/images/one.jpg"\n    alt: "Ảnh một"\n    caption: "Chú thích"'), 'album', 'gallery');
  assert.equal(result.cover, '/images/one.jpg');
  assert.equal(result.coverAlt, 'Ảnh một');
  assert.equal(result.images[0].caption, 'Chú thích');
});
test('content errors identify file and field; invalid dates, image URLs, slugs and duplicate YAML keys fail', () => {
  assert.throws(() => parseEntry(entry('date: "2026-02-30"'), 'bad-date', 'posts'), /posts\/bad-date.md.*date/);
  assert.throws(() => parseEntry(entry('cover: "javascript:alert(1)"'), 'bad-cover', 'research'), /Ảnh/);
  assert.throws(() => parseEntry(entry(), '../escape', 'posts'), /Tên file/);
  assert.throws(() => parseEntry(entry('title: "duplicate"'), 'duplicate', 'posts'), /unique/);
  assert.throws(() => parseEntry(entry().replace('summary: "Tóm tắt"', 'summary: ""'), 'empty', 'posts'), /summary/);
});
test('new Markdown files appear automatically, templates/drafts stay excluded, order/date sorting works', (context) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'cistily-content-test-'));
  context.after(() => {
    const resolved = path.resolve(directory);
    if (path.dirname(resolved) !== path.resolve(os.tmpdir()) || !path.basename(resolved).startsWith('cistily-content-test-')) throw Error('Unexpected test cleanup path');
    fs.rmSync(resolved, { recursive: true, force: true });
  });
  fs.mkdirSync(path.join(directory, 'posts'));
  const write = (name, text) => fs.writeFileSync(path.join(directory, 'posts', name + '.md'), text);
  write('older', entry('order: 10\ndate: "2025-01-01"'));
  write('newer', entry('order: 10\ndate: "2026-01-01"'));
  write('_template', entry());
  write('hidden', entry().replace('published: true', 'published: false'));
  assert.deepEqual(getEntries('posts', directory).map(item => item.slug), ['newer', 'older']);
  write('added-later', entry('order: 1'));
  assert.deepEqual(getEntries('posts', directory).map(item => item.slug), ['added-later', 'newer', 'older']);
  write('added-later', entry('order: 1').replace('published: true', 'published: false'));
  assert.deepEqual(getEntries('posts', directory).map(item => item.slug), ['newer', 'older']);
});
test('profile links allow supported URLs and reject executable or protocol-relative links', () => {
  assert.equal(safeLink('javascript:alert(1)'), '');
  assert.equal(safeLink('//evil.example'), '');
  assert.equal(safeLink('/files/cv.pdf'), '/files/cv.pdf');
  assert.equal(safeLink('https://github.com/CISTILY'), 'https://github.com/CISTILY');
});
