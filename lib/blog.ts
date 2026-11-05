export type BlogPost = {
  slug: string; title: string; summary: string; date: string;
  tags: string[]; minutes: number; sample: boolean;
};
export type BlogSort = 'newest' | 'oldest' | 'title';
export function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').toLowerCase();
}
export function filterPosts(posts: BlogPost[], query: string, tag: string, sort: BlogSort, locale = 'vi') {
  const words = normalizeSearch(query).trim().split(/\s+/).filter(Boolean);
  return posts.filter((post) => {
    const text = normalizeSearch([post.title, post.summary, ...post.tags].join(' '));
    return (!tag || post.tags.includes(tag)) && words.every((word) => text.includes(word));
  }).sort((a, b) => {
    if (sort === 'title') return a.title.localeCompare(b.title, locale) || a.slug.localeCompare(b.slug);
    // Undated articles stay last in either chronological order.
    if (!a.date && b.date) return 1;
    if (a.date && !b.date) return -1;
    const date = sort === 'oldest' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
    return date || a.title.localeCompare(b.title, locale) || a.slug.localeCompare(b.slug);
  });
}
