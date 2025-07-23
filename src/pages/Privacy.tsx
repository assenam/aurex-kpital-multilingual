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
            <h1 className="text-4xl font-bold mb-8 text-center">{t('legal.privacy.title')}</h1>
            
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {/* Header */}
              <div className="bg-primary/10 p-6 rounded-lg mb-8">
                <p className="text-lg mb-2">{t('legal.privacy.description')}</p>
                <p className="text-sm text-muted-foreground">{t('legal.privacy.lastUpdate')}</p>
                <p className="text-sm font-medium mt-2">{t('legal.privacy.compliance')}</p>
              </div>

              {/* Data Collection */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.collection.title')}</h2>
                <p className="mb-4">{t('legal.privacy.collection.description')}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">{t('legal.privacy.collection.personal.title')}</h3>
                    <ul className="text-sm space-y-1">
                      <li>• {t('legal.privacy.collection.personal.identity')}</li>
                      <li>• {t('legal.privacy.collection.personal.contact')}</li>
                      <li>• {t('legal.privacy.collection.personal.financial')}</li>
                      <li>• {t('legal.privacy.collection.personal.professional')}</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">{t('legal.privacy.collection.technical.title')}</h3>
                    <ul className="text-sm space-y-1">
                      <li>• {t('legal.privacy.collection.technical.navigation')}</li>
                      <li>• {t('legal.privacy.collection.technical.device')}</li>
                      <li>• {t('legal.privacy.collection.technical.cookies')}</li>
                      <li>• {t('legal.privacy.collection.technical.analytics')}</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Usage */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.usage.title')}</h2>
                <p className="mb-4">{t('legal.privacy.usage.description')}</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm">{t('legal.privacy.usage.purposes.financing')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm">{t('legal.privacy.usage.purposes.communication')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm">{t('legal.privacy.usage.purposes.improvement')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm">{t('legal.privacy.usage.purposes.compliance')}</p>
                  </div>
                </div>
              </section>

              {/* Your Rights */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.rights.title')}</h2>
                <p className="mb-4">{t('legal.privacy.rights.description')}</p>
                <div className="grid gap-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold">{t('legal.privacy.rights.access.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('legal.privacy.rights.access.description')}</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold">{t('legal.privacy.rights.rectification.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('legal.privacy.rights.rectification.description')}</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold">{t('legal.privacy.rights.erasure.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('legal.privacy.rights.erasure.description')}</p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold">{t('legal.privacy.rights.portability.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('legal.privacy.rights.portability.description')}</p>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section className="mb-8">
                <div className="bg-primary/5 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.contact.title')}</h2>
                  <p className="mb-4">{t('legal.privacy.contact.description')}</p>
                  <div className="space-y-2">
                    <p className="font-semibold">{t('legal.privacy.contact.dpo.title')}</p>
                    <p className="text-sm">{t('legal.privacy.contact.dpo.email')}</p>
                    <p className="text-sm">{t('legal.privacy.contact.dpo.address')}</p>
                  </div>
                </div>
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