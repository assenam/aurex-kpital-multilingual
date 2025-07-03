import Header from '@/components/navigation/Header';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import AboutPreview from '@/components/sections/AboutPreview';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <AboutPreview />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
