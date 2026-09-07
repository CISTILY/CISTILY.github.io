'use client';
import { usePathname } from 'next/navigation';
const items = [
  ['/', 'About'],
  ['/research/', 'Research'],
  ['/gallery/', 'Gallery'],
  ['/posts/', 'Posts'],
];
export function SiteNav() {
  const pathname = usePathname();
  return (
    <nav className="site-nav" aria-label="Điều hướng chính">
      {items.map(([href, label]) => {
        const active =
          href === '/'
            ? pathname === '/'
            : pathname === href.slice(0, -1) || pathname.startsWith(href);
        return (
          <a key={href} href={href} aria-current={active ? 'page' : undefined}>
            {label}
          </a>
        );
      })}
    </nav>
  );
}
