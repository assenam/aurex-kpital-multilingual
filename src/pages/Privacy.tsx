import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/contexts/TranslationContext';

const Privacy = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Page Content */}
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">{t('page.privacy.title')}</h1>
            
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-8">
                <div className="bg-primary/10 p-6 rounded-lg mb-6">
                  <p className="text-lg">{t('page.privacy.content.intro')}</p>
                </div>
              </section>

              {/* Data Collection */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.privacy.sections.collection')}</h2>
                <p>{t('page.privacy.content.collection')}</p>
              </section>

              {/* Data Usage */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.privacy.sections.usage')}</h2>
                <p>{t('page.privacy.content.usage')}</p>
              </section>

              {/* Data Storage */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.privacy.sections.storage')}</h2>
                <p>{t('page.privacy.content.storage')}</p>
              </section>

              {/* Your Rights */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.privacy.sections.rights')}</h2>
                <p>{t('page.privacy.content.rights')}</p>
              </section>

              {/* Contact */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('page.privacy.sections.contact')}</h2>
                <p>{t('page.privacy.content.contact')}</p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;