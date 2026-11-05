import type { Locale } from './locale';

// Match the repository and deployment branch in .github/workflows/deploy.yml.
export const blogRepository = 'https://github.com/CISTILY/CISTILY.github.io';
export function blogLinks(locale: Locale, template: string, slug?: string) {
  if (slug !== undefined && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error('Invalid blog slug');
  }
  const directory = `content/${locale}/posts`;
  const file = `${directory}/${slug}.md`;
  const query = new URLSearchParams({ filename: '', value: template });
  return {
    create: `${blogRepository}/new/main/${directory}?${query}`,
    browse: `${blogRepository}/tree/main/${directory}`,
    edit: slug ? `${blogRepository}/edit/main/${file}` : undefined,
    delete: slug ? `${blogRepository}/delete/main/${file}` : undefined,
  };
}
