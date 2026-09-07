import { ArrowRight, Images } from 'lucide-react';
import { formatDate, type Entry } from '@/lib/content';

export function EntryCard({ entry }: { entry: Entry }) {
  const isGallery = entry.collection === 'gallery';
  const label = isGallery
    ? 'Xem album'
    : entry.collection === 'posts'
      ? 'Đọc bài viết'
      : 'Xem nghiên cứu';
  return (
    <article className={`entry-card ${entry.collection}-card`}>
      <a className="entry-link" href={`/${entry.collection}/${entry.slug}/`}>
        {(entry.cover || isGallery) && (
          <div className="entry-cover">
            {entry.cover ? (
              <img
                src={entry.cover}
                alt={entry.coverAlt}
                width={640}
                height={400}
                loading="lazy"
              />
            ) : (
              <div className="cover-placeholder" aria-hidden="true">
                <Images size={35} strokeWidth={1.1} />
                <span>PHOTO ALBUM</span>
              </div>
            )}
          </div>
        )}
        <div className="entry-body">
          <div className="entry-meta">
            {entry.sample && <span className="sample-badge">Nội dung mẫu</span>}
            {entry.date && (
              <time dateTime={entry.date}>{formatDate(entry.date)}</time>
            )}
            {entry.collection === 'posts' && (
              <span>{entry.minutes} phút đọc</span>
            )}
            {isGallery && entry.images.length > 0 && (
              <span>{entry.images.length} ảnh</span>
            )}
          </div>
          <h2>{entry.title}</h2>
          <p>{entry.summary}</p>
          {entry.tags.length > 0 && (
            <div className="entry-tags">
              {entry.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
          <span className="entry-action">
            {label}
            <ArrowRight size={17} />
          </span>
        </div>
      </a>
    </article>
  );
}
