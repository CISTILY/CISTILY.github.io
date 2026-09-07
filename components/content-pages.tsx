import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import {
  getAbout,
  getEntriesForLocale,
  isCollection,
  formatDate,
} from '@/lib/content';
import { getSite, getUI } from '@/lib/i18n';
import { localePath, type Locale } from '@/lib/locale';
import { EntryCard } from '@/components/entry-card';

export function AboutContent({ locale }: { locale: Locale }) {
  const ui = getUI(locale);
  const sections = [
    ['research-interests', ui.sections.researchInterests],
    ['background', ui.sections.background],
  ] as const;
  return (
    <>
      <header className="page-heading">
        <span className="page-kicker">{ui.aboutKicker}</span>
        <h1>{ui.nav.about}</h1>
      </header>
      <div className="about-sections">
        {sections.map(([id, title]) => (
          <section className="about-section" id={id} key={id}>
            <h2>{title}</h2>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: getAbout(id, locale) }}
            />
            {id === 'research-interests' && (
              <a
                className="inline-link"
                href={localePath(locale, '/research/')}
              >
                {ui.exploreResearch} <span aria-hidden="true">→</span>
              </a>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
export function collectionMetadata(
  collection: string,
  locale: Locale,
): Metadata {
  if (!isCollection(collection)) notFound();
  return {
    title: getSite(locale).pages[collection].title,
    description: getSite(locale).pages[collection].description,
  };
}
export function CollectionContent({
  collection,
  locale,
}: {
  collection: string;
  locale: Locale;
}) {
  if (!isCollection(collection)) notFound();
  const entries = getEntriesForLocale(collection, locale),
    ui = getUI(locale),
    page = getSite(locale).pages[collection];
  return (
    <>
      <header className="page-heading">
        <span className="page-kicker">{ui.kickers[collection]}</span>
        <h1>{page.title}</h1>
        {page.description && <p>{page.description}</p>}
      </header>
      <div className="collection-bar">
        <span>{ui.collectionLabels[collection]}</span>
        <span>
          {String(entries.length).padStart(2, '0')} {ui.items}
        </span>
      </div>
      {entries.length ? (
        <div className="collection-grid">
          {entries.map((entry) => (
            <EntryCard key={entry.slug} entry={entry} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>{ui.emptyTitle}</h2>
          <p>{ui.emptyDescription}</p>
        </div>
      )}
    </>
  );
}
export function getLocalizedEntry(
  collection: string,
  slug: string,
  locale: Locale,
) {
  if (!isCollection(collection)) notFound();
  const entry = getEntriesForLocale(collection, locale).find(
    (item) => item.slug === slug,
  );
  if (!entry) notFound();
  return entry;
}
export function detailMetadata(
  collection: string,
  slug: string,
  locale: Locale,
): Metadata {
  const entry = getLocalizedEntry(collection, slug, locale);
  return { title: entry.title, description: entry.summary };
}
export function DetailContent({
  collection,
  slug,
  locale,
}: {
  collection: string;
  slug: string;
  locale: Locale;
}) {
  const entry = getLocalizedEntry(collection, slug, locale),
    ui = getUI(locale);
  const title = getSite(locale).pages[entry.collection].title;
  const back = localePath(locale, `/${entry.collection}/`);
  const showCover =
    entry.cover && !entry.images.some((image) => image.src === entry.cover);
  return (
    <article className="detail-content">
      <a className="back-link" href={back}>
        <ArrowLeft size={16} /> {ui.all} {title}
      </a>
      <header className="page-heading detail-heading">
        <span className="page-kicker">{title.toUpperCase()}</span>
        <h1>{entry.title}</h1>
        <p>{entry.summary}</p>
        <div className="entry-meta">
          {entry.sample && <span className="sample-badge">{ui.sample}</span>}
          {entry.date && (
            <time dateTime={entry.date}>{formatDate(entry.date, locale)}</time>
          )}
          {entry.collection === 'posts' && (
            <span>
              {entry.minutes} {ui.minuteRead}
            </span>
          )}
          {entry.images.length > 0 && (
            <span>
              {entry.images.length}{' '}
              {entry.images.length === 1 ? ui.photo : ui.photos}
            </span>
          )}
        </div>
      </header>
      {showCover && (
        <figure className="detail-cover">
          <img
            src={entry.cover}
            alt={entry.coverAlt}
            width={1000}
            height={625}
          />
        </figure>
      )}
      <div className="prose" dangerouslySetInnerHTML={{ __html: entry.html }} />
      {entry.images.length > 0 && (
        <div className="album-images">
          {entry.images.map((image, index) => (
            <figure key={`${image.src}-${index}`}>
              <a
                href={image.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`${ui.openImage}: ${image.alt}`}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
              </a>
              {image.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
      <footer className="detail-footer">
        {entry.tags.length > 0 && (
          <div className="entry-tags">
            {entry.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
        <a className="back-link" href={back}>
          <ArrowLeft size={16} /> {ui.back} {title}
        </a>
      </footer>
    </article>
  );
}
export function NotFoundContent({ locale }: { locale: Locale }) {
  const ui = getUI(locale);
  return (
    <>
      <header className="page-heading">
        <span className="page-kicker">404</span>
        <h1>{ui.notFoundTitle}</h1>
        <p>{ui.notFoundDescription}</p>
      </header>
      <a className="inline-link" href={localePath(locale)}>
        ← {ui.backHome}
      </a>
    </>
  );
}
