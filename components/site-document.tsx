import type { Metadata } from 'next';
import { SiteNav } from '@/components/site-nav';
import { ProfileSidebar } from '@/components/profile-sidebar';
import { collections, getEntriesForLocale } from '@/lib/content';
import { getSite, getUI } from '@/lib/i18n';
import { locales, localePath, type Locale } from '@/lib/locale';
import '@/app/globals.css';

export function layoutMetadata(locale: Locale): Metadata {
  const site = getSite(locale),
    ui = getUI(locale);
  return {
    title: {
      default: `${site.name} — ${ui.nav.about}`,
      template: `%s — ${site.name}`,
    },
    description: site.description,
    icons: { icon: '/favicon.svg' },
  };
}
export function SiteDocument({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const site = getSite(locale),
    ui = getUI(locale);
  const availablePaths = locales.flatMap((language) => [
    localePath(language),
    ...collections.flatMap((collection) => [
      localePath(language, `/${collection}/`),
      ...getEntriesForLocale(collection, language).map((entry) =>
        localePath(language, `/${collection}/${entry.slug}/`),
      ),
    ]),
  ]);
  return (
    <html lang={locale}>
      <body>
        <a className="skip-link" href="#main">
          {ui.skip}
        </a>
        <header className="masthead">
          <div className="masthead-inner">
            <a className="site-title" href={localePath(locale)}>
              {site.name}
              <span className="site-title-dot">.</span>
            </a>
            <SiteNav locale={locale} ui={ui} availablePaths={availablePaths} />
          </div>
        </header>
        <div className="site-layout">
          <ProfileSidebar locale={locale} />
          <main id="main" className="main-content">
            {children}
          </main>
        </div>
        <footer className="site-footer">
          <div>
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
            <span>
              {ui.nav.research} · {ui.nav.gallery} · {ui.nav.posts}
            </span>
            <a href="#main">{ui.backTop}</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
