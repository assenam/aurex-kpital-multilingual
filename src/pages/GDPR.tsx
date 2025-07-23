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
            <h1 className="text-4xl font-bold mb-8 text-center">{t('legal.gdpr.title')}</h1>
            
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {/* Introduction */}
              <div className="bg-primary/10 p-6 rounded-lg mb-8">
                <p className="text-lg">{t('legal.gdpr.description')}</p>
              </div>

              {/* Principles */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.gdpr.principles.title')}</h2>
                <p className="mb-4">{t('legal.gdpr.principles.description')}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">{t('legal.gdpr.principles.fundamental.title')}</h3>
                    <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-300">
                      <li>• {t('legal.gdpr.principles.fundamental.lawfulness')}</li>
                      <li>• {t('legal.gdpr.principles.fundamental.fairness')}</li>
                      <li>• {t('legal.gdpr.principles.fundamental.transparency')}</li>
                      <li>• {t('legal.gdpr.principles.fundamental.limitation')}</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">{t('legal.gdpr.principles.technical.title')}</h3>
                    <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-300">
                      <li>• {t('legal.gdpr.principles.technical.accuracy')}</li>
                      <li>• {t('legal.gdpr.principles.technical.storage')}</li>
                      <li>• {t('legal.gdpr.principles.technical.security')}</li>
                      <li>• {t('legal.gdpr.principles.technical.accountability')}</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Legal Basis */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.gdpr.legal_basis.title')}</h2>
                <p className="mb-4">{t('legal.gdpr.legal_basis.description')}</p>
                <div className="space-y-3">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold">{t('legal.gdpr.legal_basis.consent.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('legal.gdpr.legal_basis.consent.description')}</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold">{t('legal.gdpr.legal_basis.contract.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('legal.gdpr.legal_basis.contract.description')}</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold">{t('legal.gdpr.legal_basis.legitimate.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('legal.gdpr.legal_basis.legitimate.description')}</p>
                  </div>
                </div>
              </section>

              {/* Data Processing */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.gdpr.processing.title')}</h2>
                <p className="mb-4">{t('legal.gdpr.processing.description')}</p>
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">{t('legal.gdpr.processing.activities.title')}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="text-sm space-y-1">
                      <li>• {t('legal.gdpr.processing.activities.collection')}</li>
                      <li>• {t('legal.gdpr.processing.activities.analysis')}</li>
                      <li>• {t('legal.gdpr.processing.activities.storage')}</li>
                    </ul>
                    <ul className="text-sm space-y-1">
                      <li>• {t('legal.gdpr.processing.activities.communication')}</li>
                      <li>• {t('legal.gdpr.processing.activities.sharing')}</li>
                      <li>• {t('legal.gdpr.processing.activities.deletion')}</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Security */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.gdpr.security.title')}</h2>
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 mb-4">{t('legal.gdpr.security.description')}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">{t('legal.gdpr.security.technical.title')}</h3>
                      <ul className="text-sm space-y-1 text-green-700 dark:text-green-300">
                        <li>• {t('legal.gdpr.security.technical.encryption')}</li>
                        <li>• {t('legal.gdpr.security.technical.access_control')}</li>
                        <li>• {t('legal.gdpr.security.technical.backup')}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">{t('legal.gdpr.security.organizational.title')}</h3>
                      <ul className="text-sm space-y-1 text-green-700 dark:text-green-300">
                        <li>• {t('legal.gdpr.security.organizational.training')}</li>
                        <li>• {t('legal.gdpr.security.organizational.procedures')}</li>
                        <li>• {t('legal.gdpr.security.organizational.audit')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Data Transfers */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.gdpr.transfers.title')}</h2>
                <p className="mb-4">{t('legal.gdpr.transfers.description')}</p>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <p className="text-orange-800 dark:text-orange-200 text-sm">{t('legal.gdpr.transfers.safeguards')}</p>
                </div>
              </section>

              {/* Contact DPO */}
              <section className="mb-8">
                <div className="bg-primary/5 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">{t('legal.gdpr.contact.title')}</h2>
                  <p className="mb-4">{t('legal.gdpr.contact.description')}</p>
                  <div className="space-y-2">
                    <p className="font-semibold">{t('legal.gdpr.contact.dpo.title')}</p>
                    <p className="text-sm">{t('legal.gdpr.contact.dpo.name')}</p>
                    <p className="text-sm">{t('legal.gdpr.contact.dpo.email')}</p>
                    <p className="text-sm">{t('legal.gdpr.contact.dpo.address')}</p>
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

export default GDPR;