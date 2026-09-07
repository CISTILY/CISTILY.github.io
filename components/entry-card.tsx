import { ArrowRight, Images } from 'lucide-react';
import { formatDate, type Entry } from '@/lib/content';
import { getUI } from '@/lib/i18n';
import { localePath, type Locale } from '@/lib/locale';

export function EntryCard({ entry, locale }: { entry: Entry; locale: Locale }) {
  const ui = getUI(locale);
  const isGallery = entry.collection === 'gallery';
  const label = ui.actions[entry.collection];
  return (
    <article className={`entry-card ${entry.collection}-card`}>
      <a
        className="entry-link"
        href={localePath(locale, `/${entry.collection}/${entry.slug}/`)}
      >
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
                <span>{ui.photoAlbum}</span>
              </div>
            )}
          </div>
        )}
        <div className="entry-body">
          <div className="entry-meta">
            {entry.sample && <span className="sample-badge">{ui.sample}</span>}
            {entry.date && (
              <time dateTime={entry.date}>
                {formatDate(entry.date, locale)}
              </time>
            )}
            {entry.collection === 'posts' && (
              <span>
                {entry.minutes} {ui.minuteRead}
              </span>
            )}
            {isGallery && entry.images.length > 0 && (
              <span>
                {entry.images.length}{' '}
                {entry.images.length === 1 ? ui.photo : ui.photos}
              </span>
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
