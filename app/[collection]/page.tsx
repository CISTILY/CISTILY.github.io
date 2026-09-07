import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import site from '@/content/site.json';
import { collections, getEntries, isCollection } from '@/lib/content';
import { EntryCard } from '@/components/entry-card';
type Props = { params: Promise<{ collection: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return collections.map((collection) => ({ collection }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection } = await params;
  if (!isCollection(collection)) notFound();
  return {
    title: site.pages[collection].title,
    description: site.pages[collection].description,
  };
}
export default async function CollectionPage({ params }: Props) {
  const { collection } = await params;
  if (!isCollection(collection)) notFound();
  const entries = getEntries(collection);
  const page = site.pages[collection];
  const kicker = {
    research: 'PROJECTS & EXPLORATIONS',
    gallery: 'MOMENTS & COLLECTIONS',
    posts: 'NOTES & IDEAS',
  }[collection];
  return (
    <>
      <header className="page-heading">
        <span className="page-kicker">{kicker}</span>
        <h1>{page.title}</h1>
        {page.description && <p>{page.description}</p>}
      </header>
      <div className="collection-bar">
        <span>
          {collection === 'gallery'
            ? 'ALBUMS'
            : collection === 'posts'
              ? 'BÀI VIẾT'
              : 'NGHIÊN CỨU & DỰ ÁN'}
        </span>
        <span>{String(entries.length).padStart(2, '0')} MỤC</span>
      </div>
      {entries.length ? (
        <div className="collection-grid">
          {entries.map((entry) => (
            <EntryCard key={entry.slug} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Nội dung đang được chuẩn bị</h2>
          <p>Các mục mới sẽ xuất hiện tại đây khi được chia sẻ.</p>
        </div>
      )}
    </>
  );
}
