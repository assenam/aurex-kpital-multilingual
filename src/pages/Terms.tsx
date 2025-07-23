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
            <h1 className="text-4xl font-bold mb-8 text-center">{t('legal.terms.title')}</h1>
            
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {/* Introduction */}
              <div className="bg-primary/10 p-6 rounded-lg mb-8">
                <p className="text-lg">{t('legal.terms.description')}</p>
              </div>

              {/* Acceptance */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.acceptance.title')}</h2>
                <p>{t('legal.terms.acceptance.description')}</p>
              </section>

              {/* Services */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.services.title')}</h2>
                <p className="mb-4">{t('legal.terms.services.description')}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">{t('legal.terms.services.types.title')}</h3>
                    <ul className="text-sm space-y-1">
                      <li>• {t('legal.terms.services.types.personal')}</li>
                      <li>• {t('legal.terms.services.types.professional')}</li>
                      <li>• {t('legal.terms.services.types.real_estate')}</li>
                      <li>• {t('legal.terms.services.types.insurance')}</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">{t('legal.terms.services.process.title')}</h3>
                    <ul className="text-sm space-y-1">
                      <li>• {t('legal.terms.services.process.analysis')}</li>
                      <li>• {t('legal.terms.services.process.research')}</li>
                      <li>• {t('legal.terms.services.process.negotiation')}</li>
                      <li>• {t('legal.terms.services.process.follow_up')}</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Obligations */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.obligations.title')}</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">{t('legal.terms.obligations.client.title')}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{t('legal.terms.obligations.client.description')}</p>
                    <ul className="text-sm space-y-1">
                      <li>• {t('legal.terms.obligations.client.information')}</li>
                      <li>• {t('legal.terms.obligations.client.documents')}</li>
                      <li>• {t('legal.terms.obligations.client.cooperation')}</li>
                      <li>• {t('legal.terms.obligations.client.notification')}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{t('legal.terms.obligations.company.title')}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{t('legal.terms.obligations.company.description')}</p>
                    <ul className="text-sm space-y-1">
                      <li>• {t('legal.terms.obligations.company.professionalism')}</li>
                      <li>• {t('legal.terms.obligations.company.confidentiality')}</li>
                      <li>• {t('legal.terms.obligations.company.best_efforts')}</li>
                      <li>• {t('legal.terms.obligations.company.information')}</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Fees */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.fees.title')}</h2>
                <p className="mb-4">{t('legal.terms.fees.description')}</p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">{t('legal.terms.fees.transparency')}</p>
                </div>
              </section>

              {/* Liability */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.liability.title')}</h2>
                <p className="mb-4">{t('legal.terms.liability.description')}</p>
                <div className="border-l-4 border-primary pl-4">
                  <p className="text-sm">{t('legal.terms.liability.limitation')}</p>
                </div>
              </section>

              {/* Modification */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.modification.title')}</h2>
                <p>{t('legal.terms.modification.description')}</p>
              </section>

              {/* Applicable Law */}
              <section className="mb-8">
                <div className="bg-primary/5 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">{t('legal.terms.applicable_law.title')}</h2>
                  <p>{t('legal.terms.applicable_law.description')}</p>
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

export default Terms;