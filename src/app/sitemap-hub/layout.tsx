import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '사이트맵 허브 | 엽쌤스쿨 전체 콘텐츠 한눈에 보기',
  description: '엽쌤스쿨의 모든 콘텐츠를 시각적으로 탐색하세요. 100종 배움게임, 수업 자료, 연수 강의안, 블로그 등 전체 사이트 구조를 한눈에 확인할 수 있습니다.',
};

export default function SitemapHubLayout({ children }: { children: React.ReactNode }) {
  return children;
}
