import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/contexts/TranslationContext';

const Legal = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Page Content */}
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">{t('page.legal.title')}</h1>
            
            <div className="prose prose-lg max-w-none">
              {/* Company Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.legal.sections.company')}</h2>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <p className="mb-2"><strong>{t('page.legal.companyName')}</strong></p>
                  <p className="mb-2">{t('page.legal.address')}</p>
                  <p className="mb-2">Tél: {t('page.legal.phone')}</p>
                  <p className="mb-2">Registre: {t('page.legal.registration')}</p>
                  <p>Safe-Nummer: {t('page.legal.safeNumber')}</p>
                </div>
                <p className="mt-4">{t('page.legal.content.company')}</p>
              </section>

              {/* Publication Director */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.legal.sections.publication')}</h2>
                <p>{t('page.legal.content.publication')}</p>
              </section>

              {/* Hosting */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.legal.sections.hosting')}</h2>
                <p>{t('page.legal.content.hosting')}</p>
              </section>

              {/* Intellectual Property */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.legal.sections.intellectual')}</h2>
                <p>{t('page.legal.content.intellectual')}</p>
              </section>

              {/* Liability */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.legal.sections.liability')}</h2>
                <p>{t('page.legal.content.liability')}</p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;