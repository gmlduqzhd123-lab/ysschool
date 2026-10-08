import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '연수 강의안·자료실',
  description: '교사 연수 및 강의에서 사용된 발표 자료를 다운로드하세요.',
};

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
