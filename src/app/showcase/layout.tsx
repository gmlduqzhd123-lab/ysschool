import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '에듀테크 쇼케이스 | 엽쌤스쿨',
  description: '교실에서 탄생한 미니 웹앱과 AI를 활용한 교육 콘텐츠를 직접 체험해보세요.',
};

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
