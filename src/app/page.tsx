import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import EduToolsCloud from '@/components/EduToolsCloud';
import CVSection from '@/components/CVSection';
import InteractiveTimeline from '@/components/InteractiveTimeline';
import ArchiveTabs from '@/components/ArchiveTabs';
import PhotoGallery from '@/components/PhotoGallery';
import QuizGame from '@/components/QuizGame';
import ScheduleCalendar from '@/components/ScheduleCalendar';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <EduToolsCloud />
        <ArchiveTabs />
        <InteractiveTimeline />
        <PhotoGallery />
        <CVSection />
        <ScheduleCalendar />
        <QuizGame />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
