import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  parseEntry,
  getEntries,
  renderMarkdown,
  safeLink,
  getEntriesForLocale,
  formatDate,
} from '../lib/content.ts';
import { localePath, languageTarget } from '../lib/locale.ts';

const entry = (metadata = '', body = '## Nội dung\n\nMột đoạn **in đậm**.') =>
  `---\ntitle: "Ví dụ"\nsummary: "Tóm tắt"\npublished: true\n${metadata}\n---\n${body}`;
test('Markdown supports headings, lists, tables and code while disabling executable HTML and links', () => {
  const html = renderMarkdown(
    '## Tiêu đề\n\n- Một mục\n\n| A | B |\n| - | - |\n| 1 | 2 |\n\n```js\nconst x = 1;\n```\n\n<script>alert(1)</script>\n\n[bad](javascript:alert(1))',
  );
  for (const tag of ['<h2>', '<ul>', '<table>', '<pre>'])
    assert.ok(html.includes(tag));
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('href="javascript:'));
});
test('published must be an explicit boolean; omitted and false entries stay hidden', () => {
  assert.equal(
    parseEntry('---\npublished: false\n---\nNháp', 'draft', 'posts'),
    null,
  );
  assert.equal(
    parseEntry('---\ntitle: Nháp\n---\nNháp', 'draft', 'posts'),
    null,
  );
  assert.throws(
    () =>
      parseEntry(
        entry().replace('published: true', 'published: "false"'),
        'draft',
        'posts',
      ),
    /published/,
  );
});
test('gallery uses its first image as cover and keeps captions', () => {
  const result = parseEntry(
    entry(
      'images:\n  - src: "/images/one.jpg"\n    alt: "Ảnh một"\n    caption: "Chú thích"',
    ),
    'album',
    'gallery',
  );
  assert.equal(result.cover, '/images/one.jpg');
  assert.equal(result.coverAlt, 'Ảnh một');
  assert.equal(result.images[0].caption, 'Chú thích');
});
test('content errors identify file and field; invalid dates, image URLs, slugs and duplicate YAML keys fail', () => {
  assert.throws(
    () => parseEntry(entry('date: "2026-02-30"'), 'bad-date', 'posts'),
    /posts\/bad-date.md.*date/,
  );
  assert.throws(
    () =>
      parseEntry(
        entry('cover: "javascript:alert(1)"'),
        'bad-cover',
        'research',
      ),
    /Ảnh/,
  );
  assert.throws(() => parseEntry(entry(), '../escape', 'posts'), /Tên file/);
  assert.throws(
    () => parseEntry(entry('title: "duplicate"'), 'duplicate', 'posts'),
    /unique/,
  );
  assert.throws(
    () =>
      parseEntry(
        entry().replace('summary: "Tóm tắt"', 'summary: ""'),
        'empty',
        'posts',
      ),
    /summary/,
  );
});
test('new Markdown files appear automatically, templates/drafts stay excluded, order/date sorting works', (context) => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'cistily-content-test-'),
  );
  context.after(() => {
    const resolved = path.resolve(directory);
    if (
      path.dirname(resolved) !== path.resolve(os.tmpdir()) ||
      !path.basename(resolved).startsWith('cistily-content-test-')
    )
      throw Error('Unexpected test cleanup path');
    fs.rmSync(resolved, { recursive: true, force: true });
  });
  const viRoot = path.join(directory, 'vi');
  fs.mkdirSync(path.join(viRoot, 'posts'), { recursive: true });
  const write = (name, text) =>
    fs.writeFileSync(path.join(viRoot, 'posts', name + '.md'), text);
  write('older', entry('order: 10\ndate: "2025-01-01"'));
  write('newer', entry('order: 10\ndate: "2026-01-01"'));
  write('_template', entry());
  write('hidden', entry().replace('published: true', 'published: false'));
  assert.deepEqual(
    getEntries('posts', viRoot).map((item) => item.slug),
    ['newer', 'older'],
  );
  write('added-later', entry('order: 1'));
  assert.deepEqual(
    getEntries('posts', viRoot).map((item) => item.slug),
    ['added-later', 'newer', 'older'],
  );
  write(
    'added-later',
    entry('order: 1').replace('published: true', 'published: false'),
  );
  assert.deepEqual(
    getEntries('posts', viRoot).map((item) => item.slug),
    ['newer', 'older'],
  );
  fs.mkdirSync(path.join(directory, 'en', 'posts'), { recursive: true });
  fs.writeFileSync(
    path.join(directory, 'en', 'posts', 'newer.md'),
    entry().replace('title: "Ví dụ"', 'title: "English title"'),
  );
  assert.deepEqual(
    getEntriesForLocale('posts', 'en', directory).map((item) => [
      item.slug,
      item.title,
    ]),
    [['newer', 'English title']],
  );
  assert.equal(getEntriesForLocale('posts', 'vi', directory).length, 2);
  assert.equal(getEntriesForLocale('posts', 'vi', directory)[0].title, 'Ví dụ');
  fs.writeFileSync(
    path.join(directory, 'en', 'posts', 'newer.md'),
    entry().replace('published: true', 'published: false'),
  );
  assert.equal(
    getEntriesForLocale('posts', 'en', directory).length,
    0,
    'An English draft must not fall back to a published Vietnamese entry',
  );
});
test('profile links allow supported URLs and reject executable or protocol-relative links', () => {
  assert.equal(safeLink('javascript:alert(1)'), '');
  assert.equal(safeLink('//evil.example'), '');
  assert.equal(safeLink('/files/cv.pdf'), '/files/cv.pdf');
  assert.equal(
    safeLink('https://github.com/CISTILY'),
    'https://github.com/CISTILY',
  );
});

test('language switching preserves a translated detail page and falls back safely when translation is missing', () => {
  const paths = [
    '/',
    '/en/',
    '/posts/',
    '/en/posts/',
    '/posts/shared/',
    '/en/posts/shared/',
  ];
  assert.deepEqual(languageTarget('/posts/shared/', 'en', paths), {
    href: '/en/posts/shared/',
    missing: false,
  });
  assert.deepEqual(languageTarget('/en/posts/shared', 'vi', paths), {
    href: '/posts/shared/',
    missing: false,
  });
  assert.deepEqual(languageTarget('/posts/vi-only/', 'en', paths), {
    href: '/en/posts/',
    missing: true,
  });
  assert.deepEqual(languageTarget('/en/posts/en-only/', 'vi', paths), {
    href: '/posts/',
    missing: true,
  });
  assert.deepEqual(languageTarget('/unknown/', 'en', paths), {
    href: '/en/',
    missing: true,
  });
  assert.equal(localePath('vi', '/en/research/'), '/research/');
  assert.equal(localePath('en', '/en/research/'), '/en/research/');
  assert.equal(localePath('en', '/english-topic/'), '/en/english-topic/');
});
test('English and Vietnamese interface dictionaries expose the same editable keys and localized dates differ', () => {
  const leaves = (object, prefix = '') =>
    Object.entries(object)
      .flatMap(([key, value]) =>
        typeof value === 'object'
          ? leaves(value, prefix + key + '.')
          : [prefix + key],
      )
      .sort();
  const vi = JSON.parse(fs.readFileSync('content/vi/ui.json', 'utf8'));
  const en = JSON.parse(fs.readFileSync('content/en/ui.json', 'utf8'));
  assert.deepEqual(leaves(vi), leaves(en));
  assert.notEqual(
    formatDate('2026-09-07', 'vi'),
    formatDate('2026-09-07', 'en'),
  );
});
