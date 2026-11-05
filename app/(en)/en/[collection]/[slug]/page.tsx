import { routeCollections, sourceCollection, getEntriesForLocale } from '@/lib/content';
import { DetailContent, detailMetadata } from '@/components/content-pages';
type Props = { params: Promise<{ collection: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return routeCollections.flatMap((collection) =>
    getEntriesForLocale(sourceCollection(collection) as 'posts' | 'research' | 'projects' | 'gallery', 'en').map((entry) => ({
      collection,
      slug: entry.slug,
    })),
  );
}
export async function generateMetadata({ params }: Props) {
  const { collection, slug } = await params;
  return detailMetadata(collection, slug, 'en');
}
export default async function Page({ params }: Props) {
  const { collection, slug } = await params;
  return <DetailContent collection={collection} slug={slug} locale="en" />;
}
