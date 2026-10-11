import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '엽쌤 제작 수업 자료실 | 엽쌤스쿨',
  description: '현직 초등교사 엽쌤이 제작한 국어·독서, 인문·토론, 에듀테크·AI, 발명영재 지도안 및 HWP 활동지, 학생 출판 도서 원고 59종 무료 나눔 아카이브입니다.',
  keywords: [
    '수업자료',
    '초등수업지도안',
    '국어활동지',
    '한글파일',
    'HWP다운로드',
    '발명영재',
    '독서인문',
    '엽쌤스쿨',
    '초등교사',
    '수업혁신',
  ],
  openGraph: {
    title: '엽쌤 제작 수업 자료실 | 엽쌤스쿨',
    description: '교실에서 검증된 국어, 독서, 인문, 에듀테크, 발명영재 수업 지도안 및 HWP 활동지 59종 무료 다운로드',
    url: 'https://ysschool.vercel.app/materials',
    siteName: '엽쌤스쿨',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function MaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
