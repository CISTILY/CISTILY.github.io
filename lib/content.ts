import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import { parseDocument } from 'yaml';

export const collections = ['research', 'gallery', 'posts'] as const;
export type Collection = (typeof collections)[number];
export type EntryImage = { src: string; alt: string; caption: string };
export type Entry = {
  slug: string; collection: Collection; title: string; summary: string;
  date: string; order: number; tags: string[]; cover: string; coverAlt: string;
  sample: boolean; images: EntryImage[]; html: string; minutes: number;
};
const root = path.join(process.cwd(), 'content');
const markdown = new MarkdownIt({ html: false, linkify: true, typographer: false });
export const renderMarkdown = (text: string) => markdown.render(text);
export const isCollection = (value: string): value is Collection => collections.includes(value as Collection);

export function safeLink(value: string) {
  if (/^\/(?!\/)/.test(value) && !/[\\\s]/.test(value)) return value;
  try { const url = new URL(value); return ['https:', 'http:', 'mailto:'].includes(url.protocol) ? value : ''; } catch { return ''; }
}
function asset(value: string, fail: (message: string) => never) {
  if (!value) return '';
  if (!safeLink(value) || value.startsWith('mailto:') || value.includes('..')) fail('Ảnh phải dùng /images/ten-anh.jpg hoặc URL https:// hợp lệ.');
  return value;
}
export function parseEntry(text: string, slug: string, collection: Collection, source = `${collection}/${slug}.md`): Entry | null {
  const fail = (message: string): never => { throw new Error(`[content] ${source}: ${message}`); };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail('Tên file chỉ gồm chữ thường không dấu, số và dấu gạch ngang.');
  const match = text.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) fail('Thiếu phần thông tin YAML nằm giữa hai dòng ---.');
  const doc = parseDocument(match![1], { uniqueKeys: true });
  if (doc.errors.length) fail(doc.errors[0].message);
  const data: unknown = doc.toJS({ maxAliasCount: 50 });
  if (!data || typeof data !== 'object' || Array.isArray(data)) fail('Phần thông tin phải là danh sách tên trường: giá trị.');
  const meta = data as Record<string, unknown>;
  if (meta.published !== undefined && typeof meta.published !== 'boolean') fail('published phải là true hoặc false, không đặt trong dấu nháy.');
  if (meta.published !== true) return null;
  const string = (key: string, required = false) => {
    const value = meta[key];
    if (value === undefined && !required) return '';
    if (typeof value !== 'string' || (required && !value.trim())) fail(`${key} phải là chuỗi${required ? ' không rỗng' : ''}.`);
    return (value as string).trim();
  };
  const title = string('title', true), summary = string('summary', true), date = string('date');
  if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date)) fail('date phải là ngày thực theo dạng "YYYY-MM-DD".');
  if (meta.order !== undefined && (typeof meta.order !== 'number' || !Number.isFinite(meta.order))) fail('order phải là một số.');
  if (meta.sample !== undefined && typeof meta.sample !== 'boolean') fail('sample phải là true hoặc false.');
  if (meta.tags !== undefined && (!Array.isArray(meta.tags) || meta.tags.some(tag => typeof tag !== 'string'))) fail('tags phải là danh sách chuỗi.');
  if (meta.images !== undefined && !Array.isArray(meta.images)) fail('images phải là danh sách ảnh.');
  const images: EntryImage[] = ((meta.images ?? []) as unknown[]).map((image) => {
    if (!image || typeof image !== 'object') fail('Mỗi ảnh cần src và alt.');
    const item = image as Record<string, unknown>;
    if (typeof item.src !== 'string' || !item.src.trim() || typeof item.alt !== 'string' || !item.alt.trim()) fail('Mỗi ảnh cần src và alt không rỗng.');
    if (item.caption !== undefined && typeof item.caption !== 'string') fail('caption phải là chuỗi.');
    return { src: asset(item.src as string, fail), alt: item.alt as string, caption: (item.caption as string) || '' };
  });
  const cover = asset(string('cover'), fail) || images[0]?.src || '';
  const body = match![2].trim();
  return { slug, collection, title, summary, date, order: (meta.order as number) ?? 100,
    tags: [...new Set((meta.tags as string[]) ?? [])], cover, coverAlt: string('coverAlt') || images[0]?.alt || title,
    sample: meta.sample === true, images, html: renderMarkdown(body || summary),
    minutes: Math.max(1, Math.ceil(body.split(/\s+/u).filter(Boolean).length / 220)) };
}

export function getEntries(collection: Collection, contentRoot = root): Entry[] {
  const directory = path.join(contentRoot, collection);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter(file => file.isFile() && file.name.endsWith('.md') && !/^[_\.]/.test(file.name))
    .map(file => parseEntry(fs.readFileSync(path.join(directory, file.name), 'utf8'), file.name.slice(0, -3), collection, path.join(collection, file.name)))
    .filter((entry): entry is Entry => entry !== null)
    .sort((a, b) => a.order - b.order || b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}
export function getAbout(section: 'research-interests' | 'background' | 'contact') {
  return renderMarkdown(fs.readFileSync(path.join(root, 'about', `${section}.md`), 'utf8'));
}
export function formatDate(date: string) {
  return date ? new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }).format(new Date(date)) : '';
}
