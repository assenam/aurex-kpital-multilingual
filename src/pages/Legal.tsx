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
            <h1 className="text-4xl font-bold mb-8 text-center">{t('legal.mentions.title')}</h1>
            
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {/* Company Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.mentions.company.title')}</h2>
                <div className="bg-muted/50 p-6 rounded-lg space-y-2">
                  <p><strong>{t('legal.mentions.company.name')}</strong></p>
                  <p>{t('legal.mentions.company.type')}</p>
                  <p>{t('legal.mentions.company.capital')}</p>
                  <p>{t('legal.mentions.company.address')}</p>
                  <p>{t('legal.mentions.company.register')}</p>
                  <p>{t('legal.mentions.company.vat')}</p>
                  <p>{t('legal.mentions.company.siren')}</p>
                </div>
              </section>

              {/* Management */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.mentions.management.title')}</h2>
                <div className="space-y-2">
                  <p>{t('legal.mentions.management.ceo')}</p>
                  <p>{t('legal.mentions.management.cio')}</p>
                  <p>{t('legal.mentions.management.cro')}</p>
                </div>
              </section>

              {/* Activity */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.mentions.activity.title')}</h2>
                <p className="mb-4">{t('legal.mentions.activity.description')}</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>{t('legal.mentions.activity.services.banking')}</li>
                  <li>{t('legal.mentions.activity.services.investment')}</li>
                  <li>{t('legal.mentions.activity.services.insurance')}</li>
                  <li>{t('legal.mentions.activity.services.wealth')}</li>
                </ul>
              </section>

              {/* Contact */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.mentions.contact.title')}</h2>
                <div className="space-y-2">
                  <p>{t('legal.mentions.contact.phone')}</p>
                  <p>{t('legal.mentions.contact.email')}</p>
                  <p>{t('legal.mentions.contact.hours')}</p>
                </div>
              </section>

              {/* Hosting */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.mentions.hosting.title')}</h2>
                <p className="mb-2">{t('legal.mentions.hosting.description')}</p>
                <div className="bg-muted/30 p-4 rounded">
                  <pre className="whitespace-pre-line text-sm">{t('legal.mentions.hosting.company')}</pre>
                </div>
              </section>

              {/* Intellectual Property */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.mentions.intellectual.title')}</h2>
                <p>{t('legal.mentions.intellectual.description')}</p>
              </section>

              {/* Liability */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('legal.mentions.responsibility.title')}</h2>
                <p>{t('legal.mentions.responsibility.description')}</p>
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