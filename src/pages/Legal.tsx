import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';

const Legal = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Page Content */}
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Page en construction</h1>
            <p className="text-lg text-muted-foreground">
              Cette page sera bientôt disponible.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;