import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/contexts/TranslationContext';

const Terms = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Page Content */}
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">{t('page.terms.title')}</h1>
            
            <div className="prose prose-lg max-w-none">
              {/* Purpose */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.terms.sections.purpose')}</h2>
                <p>{t('page.terms.content.purpose')}</p>
              </section>

              {/* Services Description */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.terms.sections.services')}</h2>
                <p>{t('page.terms.content.services')}</p>
              </section>

              {/* Client Obligations */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.terms.sections.obligations')}</h2>
                <p>{t('page.terms.content.obligations')}</p>
              </section>

              {/* Liability */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.terms.sections.liability')}</h2>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg">
                  <p className="text-amber-800 dark:text-amber-200">{t('page.terms.content.liability')}</p>
                </div>
              </section>

              {/* Modifications */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.terms.sections.modifications')}</h2>
                <p>{t('page.terms.content.modifications')}</p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;