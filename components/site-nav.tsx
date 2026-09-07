'use client';
import { usePathname } from 'next/navigation';
import { localePath, languageTarget, type Locale } from '@/lib/locale';
import type { UI } from '@/lib/i18n';

export function SiteNav({
  locale,
  ui,
  availablePaths,
}: {
  locale: Locale;
  ui: UI;
  availablePaths: string[];
}) {
  const pathname = usePathname();
  const items = [
    ['/', ui.nav.about],
    ['/research/', ui.nav.research],
    ['/gallery/', ui.nav.gallery],
    ['/posts/', ui.nav.posts],
  ];
  return (
    <div className="site-controls">
      <nav className="site-nav" aria-label={ui.navLabel}>
        {items.map(([path, label]) => {
          const href = localePath(locale, path);
          const normalized = pathname.replace(/\/$/, '') || '/';
          const base = href.replace(/\/$/, '') || '/';
          const active =
            path === '/'
              ? normalized === base
              : normalized === base || normalized.startsWith(base + '/');
          return (
            <a
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
            >
              {label}
            </a>
          );
        })}
      </nav>
      <nav className="language-switch" aria-label={ui.languageLabel}>
        {(['vi', 'en'] as const).map((targetLocale) => {
          const target = languageTarget(pathname, targetLocale, availablePaths);
          const name = targetLocale === 'vi' ? 'Tiếng Việt' : 'English';
          return (
            <a
              key={targetLocale}
              href={target.href}
              hrefLang={targetLocale}
              lang={targetLocale}
              aria-current={targetLocale === locale ? 'true' : undefined}
              aria-label={name}
              title={
                target.missing ? `${name} — ${ui.translationMissing}` : name
              }
            >
              {targetLocale.toUpperCase()}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
