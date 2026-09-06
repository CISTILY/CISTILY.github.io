import type { Metadata } from 'next';
import { profile } from '@/content/portfolio';
import './globals.css';
export const metadata: Metadata = {
  title: `${profile.name} — Portfolio & Blog`,
  description: profile.intro,
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
