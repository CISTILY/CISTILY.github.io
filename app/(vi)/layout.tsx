import { SiteDocument, layoutMetadata } from '@/components/site-document';
export const metadata = layoutMetadata('vi');
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="vi">{children}</SiteDocument>;
}
