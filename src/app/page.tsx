import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import EduArchiveSection from '@/components/EduArchiveSection';
import HallOfFameSection from '@/components/HallOfFameSection';
import MediaRoomSection from '@/components/MediaRoomSection';
import WebAppLabSection from '@/components/WebAppLabSection';
import PublicationsSection from '@/components/PublicationsSection';
import CVSection from '@/components/CVSection';
import AcappellaSection from '@/components/AcappellaSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <CVSection />
        <EduArchiveSection />
        <HallOfFameSection />
        <AcappellaSection />
        <MediaRoomSection />
        <WebAppLabSection />
        <PublicationsSection />
      </main>
      <Footer />
    </div>
  );
}
