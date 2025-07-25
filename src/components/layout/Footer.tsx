import { Link } from 'react-router-dom';

import { useTranslation } from '@/contexts/TranslationContext';

const Footer = () => {
  const { t, language } = useTranslation();
  const footerSections = [
    {
      title: t('footer.services'),
      links: [
        { name: t('footer.links.personalLoans'), href: `/${language}/services#prets` },
        { name: t('footer.links.proFinancing'), href: `/${language}/services#pro` },
        { name: t('footer.links.investments'), href: `/${language}/services#investissements` },
        { name: t('footer.links.insurance'), href: `/${language}/services#assurances` }
      ]
    },
    {
      title: t('footer.tools'),
      links: [
        { name: t('footer.links.simulator'), href: `/${language}/simulateur` },
        { name: t('footer.links.request'), href: `/${language}/demande` },
        { name: t('footer.links.contact'), href: `/${language}/contact` }
      ]
    },
    {
      title: t('footer.legal'),
      links: [
        { name: t('footer.mentions'), href: `/${language}/mentions-legales` },
        { name: t('footer.privacyPolicy'), href: `/${language}/mentions-legales#privacy` },
        { name: t('footer.terms'), href: `/${language}/mentions-legales#terms` },
        { name: t('footer.gdpr'), href: `/${language}/mentions-legales#gdpr` }
      ]
    }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/lovable-uploads/c585fa4a-691d-4d9e-8b7c-c59cfbeb45d2.png" 
                  alt="Aurex K-pital" 
                  className="h-12 w-auto filter brightness-0 invert"
                />
              </div>
              
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                {t('footer.description')}
              </p>
              
              <div className="space-y-2 text-sm text-primary-foreground/70">
                <p><strong>Aurex K-pital</strong></p>
                <p>Irma-Keilhack-Ring 24</p>
                <p>22145 Hamburg, Allemagne</p>
                <p>Tél: +33759282004</p>
                <p>Tél: +4915781095078</p>
                <p>Registre: HRB 80635</p>
                <p>Safe-Nummer: DE00976259</p>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-lg mb-4 text-gold">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-primary-foreground/70 hover:text-gold transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm">
              {t('footer.copyright')}
            </p>
            
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <p className="text-primary-foreground/60 text-xs">
                {t('footer.establishment')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;