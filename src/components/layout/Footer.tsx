import { Link } from 'react-router-dom';

import { useTranslation } from '@/contexts/TranslationContext';

const Footer = () => {
  const { t } = useTranslation();
  const footerSections = [
    {
      title: t('footer.services'),
      links: [
        { name: t('footer.links.personalLoans'), href: "/services#prets" },
        { name: t('footer.links.proFinancing'), href: "/services#pro" },
        { name: t('footer.links.investments'), href: "/services#investissements" },
        { name: t('footer.links.insurance'), href: "/services#assurances" }
      ]
    },
    {
      title: t('footer.tools'),
      links: [
        { name: t('footer.links.simulator'), href: "/simulateur" },
        { name: t('footer.links.request'), href: "/demande" },
        { name: t('footer.links.faq'), href: "/faq" },
        { name: t('footer.links.contact'), href: "/contact" }
      ]
    },
    {
      title: "Légal",
      links: [
        { name: t('footer.legal'), href: "/mentions-legales" },
        { name: t('footer.privacyPolicy'), href: "/politique-confidentialite" },
        { name: t('footer.terms'), href: "/conditions-generales" },
        { name: t('footer.gdpr'), href: "/protection-donnees" }
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
                  src="/lovable-uploads/1d79ff42-26c3-4b9b-bab8-3c9b2d1e8db2.png" 
                  alt="Aurex K-pital" 
                  className="h-10 w-auto filter brightness-0 invert"
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