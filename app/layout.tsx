import type { Metadata } from 'next';
import site from '@/content/site.json';
import { SiteNav } from '@/components/site-nav';
import { ProfileSidebar } from '@/components/profile-sidebar';
import './globals.css';
export const metadata: Metadata = { title: { default: `${site.name} — About`, template: `%s — ${site.name}` }, description: site.description, icons: { icon: '/favicon.svg' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body><a className="skip-link" href="#main">Đi đến nội dung</a><header className="masthead"><div className="masthead-inner"><a className="site-title" href="/">{site.name}<span className="site-title-dot">.</span></a><SiteNav/></div></header><div className="site-layout"><ProfileSidebar/><main id="main" className="main-content">{children}</main></div><footer className="site-footer"><div><span>© {new Date().getFullYear()} {site.name}</span><span>Research · Gallery · Posts</span><a href="#main">Về đầu trang ↑</a></div></footer></body></html>;
}
