import Header from '@/components/navigation/Header';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import AboutPreview from '@/components/sections/AboutPreview';
import Testimonials from '@/components/sections/Testimonials';
import PartnersCarousel from '@/components/sections/PartnersCarousel';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/layout/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect } from 'react';

const Index = () => {
  const { visibleElements } = useScrollAnimation();

  useEffect(() => {
    // Initialize scroll animations
    const elements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-right, .scroll-slide-left');
    elements.forEach(el => {
      el.classList.add('scroll-animation-ready');
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <AboutPreview />
        <Testimonials />
        <PartnersCarousel />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
