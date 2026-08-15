import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '에듀테크 나눔 서재 | 엽쌤스쿨',
  description: '바쁜 선생님들을 위한 AI 도구 활용 노하우를 한곳에 모았습니다.',
};

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
