import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/contexts/TranslationContext';

const GDPR = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Page Content */}
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">{t('page.gdpr.title')}</h1>
            <p className="text-lg text-muted-foreground">
              {t('page.gdpr.description')}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GDPR;