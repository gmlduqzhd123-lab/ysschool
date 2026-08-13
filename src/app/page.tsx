import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import FeaturedHighlights from '@/components/FeaturedHighlights';
import TestimonialsCompact from '@/components/TestimonialsCompact';
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
        <FeaturedHighlights />
        <TestimonialsCompact />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
