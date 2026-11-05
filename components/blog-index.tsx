'use client';

import { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { filterPosts, type BlogPost, type BlogSort } from '@/lib/blog';
import { localePath, type Locale } from '@/lib/locale';

export function BlogIndex({ posts, locale }: { posts: BlogPost[]; locale: Locale }) {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('');
  const [sort, setSort] = useState<BlogSort>('newest');
  const en = locale === 'en';
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b, locale));
  const results = filterPosts(posts, query, tag, sort, locale);
  const reset = () => { setQuery(''); setTag(''); setSort('newest'); };
  const date = (value: string) => new Intl.DateTimeFormat(en ? 'en-GB' : 'vi-VN', {
    day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(value));
  return (
    <section className="blog-index" aria-label={en ? 'Browse articles' : 'Khám phá bài viết'}>
      <div className="blog-tools">
        <div className="blog-search">
          <label htmlFor="blog-search">{en ? 'Search articles' : 'Tìm bài viết'}</label>
          <div className="blog-search-input">
            <Search size={18} aria-hidden="true" />
            <input id="blog-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)}
              placeholder={en ? 'Title, summary or topic…' : 'Tiêu đề, tóm tắt hoặc chủ đề…'} />
          </div>
        </div>
        <div className="blog-sort">
          <label htmlFor="blog-sort">{en ? 'Sort by' : 'Sắp xếp'}</label>
          <select id="blog-sort" value={sort} onChange={(event) => setSort(event.target.value as BlogSort)}>
            <option value="newest">{en ? 'Newest first' : 'Mới nhất'}</option>
            <option value="oldest">{en ? 'Oldest first' : 'Cũ nhất'}</option>
            <option value="title">{en ? 'Title A–Z' : 'Tiêu đề A–Z'}</option>
          </select>
        </div>
      </div>
      <div className="blog-topics" role="group" aria-label={en ? 'Filter by topic' : 'Lọc theo chủ đề'}>
        <button type="button" aria-pressed={!tag} onClick={() => setTag('')}>{en ? 'All topics' : 'Tất cả chủ đề'} <span>{posts.length}</span></button>
        {tags.map((topic) => <button type="button" key={topic} aria-pressed={tag === topic} onClick={() => setTag(topic)}>
          {topic} <span>{posts.filter((post) => post.tags.includes(topic)).length}</span>
        </button>)}
      </div>
      <div className="blog-results-bar">
        <p role="status" aria-live="polite">{en ? `${results.length} of ${posts.length} articles` : `${results.length} / ${posts.length} bài viết`}</p>
        {(query || tag || sort !== 'newest') && <button type="button" onClick={reset}>{en ? 'Reset filters' : 'Đặt lại bộ lọc'}</button>}
      </div>
      {results.length ? <div className="blog-list">
        {results.map((post) => <article className="blog-post" key={post.slug}>
          <div className="blog-post-meta">
            {post.date ? <time dateTime={post.date}>{date(post.date)}</time> : <span>{en ? 'Undated' : 'Chưa ghi ngày'}</span>}
            <span>{post.minutes} {en ? 'min read' : 'phút đọc'}</span>
            {post.sample && <span className="sample-badge">{en ? 'Sample' : 'Nội dung mẫu'}</span>}
          </div>
          <div className="blog-post-body">
            <h2><a href={localePath(locale, `/blog/${post.slug}/`)}>{post.title}<ArrowRight size={20} aria-hidden="true" /></a></h2>
            <p>{post.summary}</p>
            <div className="blog-post-tags">{post.tags.map((topic) => <button type="button" key={topic} onClick={() => setTag(topic)}
              aria-label={`${en ? 'Filter by topic' : 'Lọc theo chủ đề'}: ${topic}`}>{topic}</button>)}</div>
          </div>
        </article>)}
      </div> : <div className="empty-state">
        <h2>{posts.length ? (en ? 'No matching articles' : 'Không tìm thấy bài viết') : (en ? 'Articles are on the way' : 'Bài viết đang được chuẩn bị')}</h2>
        <p>{en ? 'Try a different keyword or choose another topic.' : 'Thử từ khóa khác hoặc chọn chủ đề khác. Bạn có thể tìm bằng tiếng Việt không dấu.'}</p>
        {posts.length > 0 && <button type="button" className="inline-link" onClick={reset}>{en ? 'View all articles' : 'Xem tất cả bài viết'} →</button>}
      </div>}
    </section>
  );
}
