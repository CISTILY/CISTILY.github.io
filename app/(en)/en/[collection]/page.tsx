import { collections } from '@/lib/content';
import {
  CollectionContent,
  collectionMetadata,
} from '@/components/content-pages';
type Props = { params: Promise<{ collection: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return collections.map((collection) => ({ collection }));
}
export async function generateMetadata({ params }: Props) {
  return collectionMetadata((await params).collection, 'en');
}
export default async function Page({ params }: Props) {
  return (
    <CollectionContent collection={(await params).collection} locale="en" />
  );
}
