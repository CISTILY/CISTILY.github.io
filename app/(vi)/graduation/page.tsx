import type { Metadata } from 'next';
import { GraduationPage } from '@/components/graduation-page';

export const metadata: Metadata = {
  title: 'Tốt nghiệp',
  description: 'Thiệp mời dự lễ tốt nghiệp và thông tin địa điểm.',
};

export default function Page() {
  return <GraduationPage locale="vi" />;
}
