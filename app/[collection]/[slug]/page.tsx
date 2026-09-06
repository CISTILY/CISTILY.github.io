import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import site from '@/content/site.json';
import { collections, getEntries, isCollection, formatDate } from '@/lib/content';
type Props = { params: Promise<{ collection: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return collections.flatMap(collection => getEntries(collection).map(entry => ({ collection, slug: entry.slug }))); }
async function getEntry(params: Props['params']) {
  const { collection, slug } = await params;
  if (!isCollection(collection)) notFound();
  const entry = getEntries(collection).find(item => item.slug === slug);
  if (!entry) notFound();
  return entry;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = await getEntry(params);
  return { title: entry.title, description: entry.summary };
}
export default async function DetailPage({ params }: Props) {
  const entry = await getEntry(params);
  const collectionTitle = site.pages[entry.collection].title;
  const showCover = entry.cover && !entry.images.some(image => image.src === entry.cover);
  return <article className="detail-content"><a className="back-link" href={`/${entry.collection}/`}><ArrowLeft size={16}/> Tất cả {collectionTitle}</a><header className="page-heading detail-heading"><span className="page-kicker">{collectionTitle.toUpperCase()}</span><h1>{entry.title}</h1><p>{entry.summary}</p><div className="entry-meta">{entry.sample && <span className="sample-badge">Nội dung mẫu</span>}{entry.date && <time dateTime={entry.date}>{formatDate(entry.date)}</time>}{entry.collection === 'posts' && <span>{entry.minutes} phút đọc</span>}{entry.images.length > 0 && <span>{entry.images.length} ảnh</span>}</div></header>{showCover && <figure className="detail-cover"><img src={entry.cover} alt={entry.coverAlt} width={1000} height={625}/></figure>}<div className="prose" dangerouslySetInnerHTML={{ __html: entry.html }}/>{entry.images.length > 0 && <div className="album-images">{entry.images.map((image, index) => <figure key={`${image.src}-${index}`}><a href={image.src} target="_blank" rel="noreferrer" aria-label={`Mở ảnh đầy đủ: ${image.alt}`}><img src={image.src} alt={image.alt} loading="lazy"/></a>{image.caption && <figcaption>{image.caption}</figcaption>}</figure>)}</div>}<footer className="detail-footer">{entry.tags.length > 0 && <div className="entry-tags">{entry.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}<a className="back-link" href={`/${entry.collection}/`}><ArrowLeft size={16}/> Quay lại {collectionTitle}</a></footer></article>;
}
