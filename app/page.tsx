import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import About from '@/components/About';
import VideoGallery from '@/components/VideoGallery';
import ImageGallery from '@/components/ImageGallery';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero
        backgroundImageDesktop="/HeroDesk.jpeg"
        backgroundImageMobile="/HeroMob.jpeg"
      />
      <Intro />
      <About />
      <ImageGallery />
      <VideoGallery />
      
      <CTA />
      <Footer />
    </main>
  );
}
