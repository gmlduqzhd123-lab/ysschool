import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import CVSection from '@/components/CVSection';
import ArchiveTabs from '@/components/ArchiveTabs';
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
        <CVSection />
        <ArchiveTabs />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
