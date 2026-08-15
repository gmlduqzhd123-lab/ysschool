import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '프롬프트 놀이터 | 엽쌤스쿨',
  description: 'AI에게 똑똑하게 질문하는 법을 빈칸 채우기 게임으로 배워보세요.',
};

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
