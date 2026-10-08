import Header from '@/components/Header';
import InteractiveTimeline from '@/components/InteractiveTimeline';
import CVSection from '@/components/CVSection';
import ArchiveTabs from '@/components/ArchiveTabs';
import QuizGame from '@/components/QuizGame';
import Footer from '@/components/Footer';

export const metadata = {
  title: '프로필 & 발자취',
  description: '교육 여정, 주요 약력, 수상 내역, 출간 도서, 아카펠라 공연 등 엽쌤의 활동 기록을 한눈에 확인하세요.',
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* 통합 아카이브 탭 (최상단 노출) */}
        <ArchiveTabs />

        {/* 교육 여정 타임라인 */}
        <InteractiveTimeline />

        {/* 상세 이력 & 수상 실적 */}
        <CVSection />

        {/* 엽쌤 퀴즈 */}
        <QuizGame />
      </main>
      <Footer />
    </div>
  );
}
