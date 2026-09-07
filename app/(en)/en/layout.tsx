import { SiteDocument, layoutMetadata } from '@/components/site-document';
export const metadata = layoutMetadata('en');
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
