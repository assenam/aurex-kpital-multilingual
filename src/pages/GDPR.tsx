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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">{t('page.gdpr.title')}</h1>
            
            <div className="prose prose-lg max-w-none">
              {/* Principles */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.gdpr.sections.principles')}</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200">{t('page.gdpr.content.principles')}</p>
                </div>
              </section>

              {/* Lawful Basis */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.gdpr.sections.lawfulBasis')}</h2>
                <p>{t('page.gdpr.content.lawfulBasis')}</p>
              </section>

              {/* Data Processing */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.gdpr.sections.processing')}</h2>
                <p>{t('page.gdpr.content.processing')}</p>
              </section>

              {/* Security */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.gdpr.sections.security')}</h2>
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <p className="text-green-800 dark:text-green-200">{t('page.gdpr.content.security')}</p>
                </div>
              </section>

              {/* Data Transfers */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.gdpr.sections.transfers')}</h2>
                <p>{t('page.gdpr.content.transfers')}</p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GDPR;