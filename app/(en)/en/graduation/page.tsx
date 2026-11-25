import type { Metadata } from 'next';
import { GraduationPage } from '@/components/graduation-page';

export const metadata: Metadata = {
  title: 'Graduation',
  description: 'Graduation invitation and venue information.',
};

export default function Page() {
  return <GraduationPage locale="en" />;
}
