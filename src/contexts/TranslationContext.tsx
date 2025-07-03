import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'de' | 'pl' | 'fi' | 'es' | 'pt' | 'el' | 'it';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  changeLanguage: (lang: Language) => void;
  isLoading: boolean;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('preferredLanguage') as Language) || 'fr';
  });
  const [isLoading, setIsLoading] = useState(false);

  const changeLanguage = (newLanguage: Language) => {
    setIsLoading(true);
    // Animation courte pour le changement de langue
    setTimeout(() => {
      setLanguage(newLanguage);
      localStorage.setItem('preferredLanguage', newLanguage);
      setIsLoading(false);
    }, 300); // Réduit de 1500ms à 300ms
  };
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = translations[language];
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return key;
      }
    }
    
    return typeof current === 'string' ? current : key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, changeLanguage, isLoading, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

const translations = {
  fr: {
    nav: {
      home: "Accueil",
      services: "Services", 
      simulator: "Simulateur",
      about: "À Propos",
      blog: "Blog",
      contact: "Contact",
      quickRequest: "Demande rapide"
    },
    home: {
      hero: {
        title: "Votre Partenaire Financier",
        subtitle: "depuis 1997",
        description: "Excellence, innovation et confiance pour tous vos projets financiers",
        ctaBtn: "Découvrir nos solutions",
        simulateBtn: "Simuler un prêt"
      },
      services: {
        badge: "Innovation Financière",
        title: "Services",
        subtitle: "Nouvelle Génération", 
        description: "L'avenir de la finance est ici. Découvrez nos solutions révolutionnaires",
        description2: "alimentées par l'IA",
        description3: "et l'expertise humaine.",
        personalLoans: {
          title: "Prêts Personnels",
          description: "Solutions de financement ultra-personnalisées avec des conditions révolutionnaires.",
          feature1: "IA pour taux optimal",
          feature2: "Réponse en 2h", 
          feature3: "Flexibilité maximale"
        },
        businessFinancing: {
          title: "Financements Pro",
          description: "Propulsez votre entreprise vers l'excellence avec nos solutions innovantes.",
          feature1: "Financement express",
          feature2: "Accompagnement expert",
          feature3: "Solutions sur mesure"
        },
        smartInvestments: {
          title: "Investissements Smart",
          description: "Optimisation patrimoniale avec intelligence artificielle et expertise humaine.",
          feature1: "Portfolio intelligent",
          feature2: "Conseils premium", 
          feature3: "Rendement optimisé"
        },
        insurance360: {
          title: "Assurances 360°",
          description: "Protection totale et innovative pour tous vos projets de vie et business.",
          feature1: "Couverture complète",
          feature2: "Claims en 24h",
          feature3: "Support premium"
        },
        discoverBtn: "Découvrir →",
        exploreBtn: "Explorer tous nos services"
      },
      about: {
        badge: "Pionniers depuis 25 ans",
        title: "Un quart de siècle",
        subtitle: "d'innovation",
        subtitle2: "financière",
        description: "Depuis Hamburg 1997",
        description2: "Aurex K-pital révolutionne l'accompagnement financier en combinant",
        description3: "expertise traditionnelle",
        description4: "technologies de pointe",
        description5: "Notre approche unique allie intelligence artificielle, analyses prédictives et conseil humain personnalisé pour des solutions qui transforment",
        description6: "réellement vos projets",
        description7: "en succès.",
        ourStoryBtn: "Notre Histoire",
        talkProjectBtn: "Parlons Projet",
        stats: {
          founded: "Fondée avec vision",
          location: "Cœur de l'Europe",
          certified: "Excellence certifiée",
          security: "Sécurité garantie",
          leader: "Leader Européen Certifié",
          excellence: "Excellence reconnue en financement innovant"
        }
      },
      cta: {
        title: "Prêt à concrétiser",
        subtitle: "vos projets",
        description: "Nos experts sont à votre disposition pour étudier votre situation et vous proposer les meilleures solutions de financement.",
        requestBtn: "Faire une demande",
        simulateBtn: "Simuler un prêt",
        contactBtn: "Nous contacter",
        phone: "Téléphone :",
        address: "Adresse :",
        phoneNumber: "+49 40 710 97523",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne"
      }
    },
    footer: {
      description: "Depuis 1997, Aurex K-pital accompagne particuliers et entreprises dans leurs projets financiers avec expertise et confiance.",
      services: "Services",
      tools: "Outils", 
      company: "Entreprise",
      legal: "Légal",
      copyright: "© 2024 Aurex K-pital. Tous droits réservés.",
      establishment: "Établissement financier agréé - Allemagne"
    }
  },
  de: {
    nav: {
      home: "Startseite",
      services: "Dienstleistungen",
      simulator: "Simulator", 
      about: "Über uns",
      blog: "Blog",
      contact: "Kontakt",
      quickRequest: "Schnelle Anfrage"
    },
    home: {
      hero: {
        title: "Ihr Finanzpartner",
        subtitle: "seit 1997",
        description: "Exzellenz, Innovation und Vertrauen für all Ihre Finanzprojekte",
        ctaBtn: "Unsere Lösungen entdecken",
        simulateBtn: "Kredit simulieren"
      },
      services: {
        badge: "Finanzinnovation",
        title: "Services",
        subtitle: "Neue Generation",
        description: "Die Zukunft der Finanzierung ist da. Entdecken Sie unsere revolutionären",
        description2: "KI-gestützten",
        description3: "Lösungen und menschliche Expertise.",
        personalLoans: {
          title: "Persönliche Kredite",
          description: "Ultra-personalisierte Finanzierungslösungen mit revolutionären Bedingungen.",
          feature1: "KI für optimalen Zinssatz",
          feature2: "Antwort in 2h",
          feature3: "Maximale Flexibilität"
        },
        businessFinancing: {
          title: "Geschäftsfinanzierung",
          description: "Bringen Sie Ihr Unternehmen mit unseren innovativen Lösungen zum Erfolg.",
          feature1: "Express-Finanzierung",
          feature2: "Expertenbegleitung",
          feature3: "Maßgeschneiderte Lösungen"
        },
        smartInvestments: {
          title: "Smart Investments",
          description: "Vermögensoptimierung mit künstlicher Intelligenz und menschlicher Expertise.",
          feature1: "Intelligentes Portfolio",
          feature2: "Premium-Beratung",
          feature3: "Optimierte Rendite"
        },
        insurance360: {
          title: "Versicherungen 360°",
          description: "Vollständiger und innovativer Schutz für alle Ihre Lebens- und Geschäftsprojekte.",
          feature1: "Vollständige Abdeckung",
          feature2: "Schadensmeldung in 24h",
          feature3: "Premium-Support"
        },
        discoverBtn: "Entdecken →",
        exploreBtn: "Alle Services erkunden"
      },
      about: {
        badge: "Pioniere seit 25 Jahren",
        title: "Ein Vierteljahrhundert",
        subtitle: "Finanzinnovation",
        subtitle2: "",
        description: "Seit Hamburg 1997",
        description2: "revolutioniert Aurex K-pital die Finanzbegleitung durch Kombination",
        description3: "traditioneller Expertise",
        description4: "modernster Technologien",
        description5: "Unser einzigartiger Ansatz kombiniert künstliche Intelligenz, Predictive Analytics und personalisierte menschliche Beratung für Lösungen, die",
        description6: "Ihre Projekte wirklich",
        description7: "in Erfolg verwandeln.",
        ourStoryBtn: "Unsere Geschichte",
        talkProjectBtn: "Projekt besprechen",
        stats: {
          founded: "Gegründet mit Vision",
          location: "Herz Europas",
          certified: "Zertifizierte Exzellenz",
          security: "Garantierte Sicherheit",
          leader: "Zertifizierter Europäischer Marktführer",
          excellence: "Anerkannte Exzellenz in innovativer Finanzierung"
        }
      },
      cta: {
        title: "Bereit, Ihre Projekte",
        subtitle: "zu verwirklichen",
        description: "Unsere Experten stehen Ihnen zur Verfügung, um Ihre Situation zu analysieren und Ihnen die besten Finanzierungslösungen anzubieten.",
        requestBtn: "Anfrage stellen",
        simulateBtn: "Kredit simulieren",
        contactBtn: "Kontakt aufnehmen",
        phone: "Telefon:",
        address: "Adresse:",
        phoneNumber: "+49 40 710 97523",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hamburg, Deutschland"
      }
    },
    footer: {
      description: "Seit 1997 begleitet Aurex K-pital Privatpersonen und Unternehmen bei ihren Finanzprojekten mit Expertise und Vertrauen.",
      services: "Dienstleistungen",
      tools: "Tools",
      company: "Unternehmen", 
      legal: "Rechtliches",
      copyright: "© 2024 Aurex K-pital. Alle Rechte vorbehalten.",
      establishment: "Zugelassenes Finanzinstitut - Deutschland"
    }
  }
  // ... autres langues (abrégées pour la longueur)
};