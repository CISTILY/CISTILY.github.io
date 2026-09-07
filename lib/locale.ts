export const locales = ['vi', 'en'] as const;
export type Locale = (typeof locales)[number];
export function localePath(locale: Locale, pathname = '/') {
  const clean = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return `${locale === 'en' ? '/en' : ''}${clean.startsWith('/') ? clean : '/' + clean}`;
}
export function languageTarget(
  pathname: string,
  locale: Locale,
  availablePaths: string[],
) {
  const clean =
    (pathname.replace(/^\/en(?=\/|$)/, '') || '/').replace(/\/$/, '') || '/';
  const target = localePath(locale, clean === '/' ? '/' : clean + '/');
  if (availablePaths.includes(target)) return { href: target, missing: false };
  const collection = clean.split('/')[1];
  const fallback = ['research', 'gallery', 'posts'].includes(collection)
    ? `/${collection}/`
    : '/';
  return { href: localePath(locale, fallback), missing: true };
}
