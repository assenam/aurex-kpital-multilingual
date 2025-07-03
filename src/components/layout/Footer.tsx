import { Link } from 'react-router-dom';
import PartnersCarousel from '@/components/sections/PartnersCarousel';

const Footer = () => {
  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Prêts personnels", href: "/services#prets" },
        { name: "Financements pro", href: "/services#pro" },
        { name: "Investissements", href: "/services#investissements" },
        { name: "Assurances", href: "/services#assurances" }
      ]
    },
    {
      title: "Outils",
      links: [
        { name: "Simulateur de prêt", href: "/simulateur" },
        { name: "Demande de financement", href: "/demande" },
        { name: "FAQ", href: "/faq" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Entreprise",
      links: [
        { name: "À propos", href: "/a-propos" },
        { name: "Nos partenaires", href: "/partenaires" },
        { name: "Carrières", href: "/carrieres" },
        { name: "Blog", href: "/blog" }
      ]
    },
    {
      title: "Légal",
      links: [
        { name: "Mentions légales", href: "/mentions-legales" },
        { name: "Politique de confidentialité", href: "/mentions-legales#privacy" },
        { name: "Conditions générales", href: "/mentions-legales#terms" },
        { name: "RGPD", href: "/mentions-legales#gdpr" }
      ]
    }
  ];

  return (
    <>
      <PartnersCarousel />
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
                Depuis 1997, Aurex K-pital accompagne particuliers et entreprises 
                dans leurs projets financiers avec expertise et confiance.
              </p>
              
              <div className="space-y-2 text-sm text-primary-foreground/70">
                <p><strong>Aurex K-pital</strong></p>
                <p>Irma-Keilhack-Ring 24</p>
                <p>22145 Hamburg, Allemagne</p>
                <p>Tél: +49 40 710 97523</p>
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
              © 2024 Aurex K-pital. Tous droits réservés.
            </p>
            
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <p className="text-primary-foreground/60 text-xs">
                Établissement financier agréé - Allemagne
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;