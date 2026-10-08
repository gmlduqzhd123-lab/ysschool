import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '에듀테크 쇼케이스',
  description: '교직·수업·여가를 아우르는 19종 개발 웹앱과 100종 교실 배움게임, 에듀테크 콘텐츠를 직접 체험해보세요.',
};

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
