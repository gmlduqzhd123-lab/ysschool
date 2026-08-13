import Header from '@/components/Header';
import InteractiveTimeline from '@/components/InteractiveTimeline';
import CVSection from '@/components/CVSection';
import ArchiveTabs from '@/components/ArchiveTabs';
import ScheduleCalendar from '@/components/ScheduleCalendar';
import QuizGame from '@/components/QuizGame';
import Footer from '@/components/Footer';

export const metadata = {
  title: '포트폴리오 & 약력 | 엽쌤스쿨',
  description: '교육 여정, 주요 약력, 수상 내역, 아카펠라 공연, 연수 일정 등 엽쌤의 활동 기록을 한눈에 확인하세요.',
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Page Hero */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-slate-50 via-white to-sky-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-3">
              Portfolio & Activities
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
              포트폴리오 & 약력
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep">
              끊임없이 배우고 도전하는 엽쌤의 교육 여정과 활동 기록을 만나보세요.
            </p>
          </div>
        </section>

        <InteractiveTimeline />
        <CVSection />
        <ArchiveTabs />
        <ScheduleCalendar />
        <QuizGame />
      </main>
      <Footer />
    </div>
  );
}
