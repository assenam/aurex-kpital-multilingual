import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback, useRef } from 'react';

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

// Pre-computed translations cache for instant access
const translationCache = new Map<string, string>();

// Pre-populate cache for all languages and keys
const populateCache = () => {
  const allLanguages: Language[] = ['fr', 'de', 'pl', 'fi', 'es', 'pt', 'el', 'it'];
  
  const extractKeys = (obj: any, prefix = '', lang: Language) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        extractKeys(obj[key], prefix ? `${prefix}.${key}` : key, lang);
      } else if (typeof obj[key] === 'string') {
        const cacheKey = `${lang}:${prefix ? `${prefix}.${key}` : key}`;
        translationCache.set(cacheKey, obj[key]);
      }
    }
  };

  allLanguages.forEach(lang => {
    if (translations[lang]) {
      extractKeys(translations[lang], '', lang);
    }
  });
};

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('preferredLanguage') as Language) || 'fr';
  });
  const [isLoading] = useState(false);
  const cacheInitialized = useRef(false);

  // Initialize cache on first render
  if (!cacheInitialized.current) {
    populateCache();
    cacheInitialized.current = true;
  }

  const changeLanguage = useCallback((newLanguage: Language) => {
    if (newLanguage === language) return;
    
    // Use requestAnimationFrame to ensure smooth transition
    requestAnimationFrame(() => {
      setLanguage(newLanguage);
      localStorage.setItem('preferredLanguage', newLanguage);
    });
  }, [language]);
  
  const t = useCallback((key: string): string => {
    // Try cache first for instant lookup
    const cacheKey = `${language}:${key}`;
    const cachedValue = translationCache.get(cacheKey);
    
    if (cachedValue) {
      return cachedValue;
    }

    // Fallback to original method if not in cache
    const keys = key.split('.');
    let current: any = translations[language];
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        // Fallback to French if translation not found
        const fallbackCacheKey = `fr:${key}`;
        const fallbackCached = translationCache.get(fallbackCacheKey);
        
        if (fallbackCached) {
          return fallbackCached;
        }

        let fallback: any = translations.fr;
        for (const fallbackKey of keys) {
          if (fallback && typeof fallback === 'object' && fallbackKey in fallback) {
            fallback = fallback[fallbackKey];
          } else {
            return key; // Return key if no fallback found
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }
    
    const result = typeof current === 'string' ? current : key;
    
    // Cache the result for future use
    translationCache.set(cacheKey, result);
    
    return result;
  }, [language]);

  // Stable context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    changeLanguage,
    isLoading,
    t
  }), [language, changeLanguage, t]);

  return (
    <TranslationContext.Provider value={contextValue}>
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
    menu: {
      home: "Accueil",
      services: "Services",
      simulator: "Simulateur",
      request: "Demande",
      about: "À propos",
      contact: "Contact",
      faq: "FAQ",
      careers: "Carrières",
      partners: "Partenaires",
      blog: "Blog"
    },
    footer: {
      tools: "Outils",
      company: "Entreprise",
      legal: "Légal",
      privacyPolicy: "Politique de confidentialité",
      terms: "Conditions générales",
      mentions: "Mentions légales",
      gdpr: "RGPD",
      rights: "© 2024 Aurex K-pital. Tous droits réservés.",
      description: "Votre partenaire financier de confiance depuis 1997. Excellence, innovation et expertise pour tous vos projets financiers en Europe.",
      services: "Services",
      copyright: "© 2024 Aurex K-pital. Tous droits réservés.",
      establishment: "Établissement financier agréé en Europe",
      links: {
        personalLoans: "Prêts personnels",
        proFinancing: "Financements pro",
        investments: "Investissements",
        insurance: "Assurances",
        simulator: "Simulateur de prêt",
        request: "Demande de financement",
        faq: "FAQ",
        contact: "Contact",
        about: "À propos",
        partners: "Nos partenaires",
        careers: "Carrières",
        blog: "Blog",
        legal: "Mentions légales",
        privacy: "Politique de confidentialité",
        terms: "Conditions générales",
        gdpr: "RGPD"
      }
    },
    partners: {
      title: "Nos Partenaires de Confiance",
      description: "Un réseau d'excellence européen pour vous offrir les meilleures solutions financières",
      stats: "Plus de 25 partenaires européens • 27 pays couverts • 2.5Md€ de volume traité"
    },
    home: {
      hero: {
        title: "Votre Partenaire Financier",
        subtitle: "depuis 1997",
        description: "Excellence, innovation et confiance pour tous vos projets financiers",
        ctaBtn: "Découvrir nos solutions",
        simulateBtn: "Simuler un prêt",
        scrollText: "Découvrir",
        carousel: {
          text1: "Lancez votre projet avec Aurex K-pital",
          text2: "Obtenez un financement sans apport",
          text3: "Investissez dès aujourd'hui dans votre avenir"
        },
        stats: {
          experience: {
            title: "Années d'excellence",
            subtitle: "Innovation continue"
          },
          clients: {
            title: "Clients conquis",
            subtitle: "Satisfaction garantie"
          },
          funding: {
            title: "Financements réalisés",
            subtitle: "Impact transformateur"
          }
        }
      },
      services: {
        badge: "Services",
        title: "Solutions",
        subtitle: "Innovantes",
        description: "Découvrez nos solutions financières",
        description2: "révolutionnaires",
        description3: "pour vos projets"
      },
      about: {
        badge: "À propos",
        title: "Votre partenaire",
        subtitle: "financier",
        subtitle2: "de confiance",
        description1: {
          highlight: "Depuis 1997,",
          text: " Aurex K-pital accompagne particuliers et entreprises dans leurs projets financiers avec une approche alliant",
          expertise: "expertise humaine",
          and: "et",
          technology: "innovation technologique"
        },
        description2: {
          text: "Notre mission : démocratiser l'accès au financement grâce à des solutions",
          highlight: "rapides, transparentes et sur-mesure",
          success: "pour concrétiser vos ambitions"
        },
        stats: {
          founded: "Année de création",
          location: "Siège social",
          certified: "Registre",
          security: "Safe-Nummer"
        },
        trust: {
          title: "Votre confiance, notre priorité",
          description: "Certifiés et régulés par les autorités européennes"
        },
        buttons: {
          history: "Notre histoire",
          contact: "Nous contacter"
        }
      },
      cta: {
        title: "Prêt à transformer",
        titleHighlight: "vos projets",
        titleEnd: "en réalité ?",
        description: "Nos experts vous accompagnent à chaque étape pour concrétiser vos ambitions financières.",
        buttons: {
          request: "Faire une demande",
          simulate: "Simuler un prêt",
          contact: "Nous contacter"
        },
        contact: {
          phone: "Téléphone",
          address: "Adresse",
          addressValue: "Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne"
        }
      }
    },
    services: {
      personalLoan: {
        title: "Prêts Personnels",
        description: "Solutions de financement sur-mesure avec des conditions révolutionnaires.",
        points: ["IA pour taux optimaux", "Réponse en 2h", "Flexibilité maximale"],
        cta: "Découvrir",
        useCases: [
          "Travaux de rénovation",
          "Voyage de rêve", 
          "Mariage",
          "Études",
          "Achat de véhicule"
        ]
      },
      businessLoan: {
        title: "Financement entreprise",
        description: "Boostez votre entreprise avec nos solutions innovantes.",
        points: ["Financement express", "Accompagnement expert", "Solutions sur-mesure"],
        cta: "Découvrir",
        useCases: [
          "Création d'entreprise",
          "Expansion commerciale",
          "Achat d'équipement", 
          "Trésorerie",
          "Rachat de parts"
        ]
      },
      investment: {
        title: "Investissements intelligents",
        description: "Optimisation patrimoniale avec intelligence artificielle et expertise humaine.",
        points: ["Portefeuille intelligent", "Conseil premium", "Rendement optimisé"],
        cta: "Découvrir",
        useCases: [
          "Placement immobilier",
          "Diversification patrimoniale",
          "Préparation retraite",
          "Optimisation fiscale",
          "Investissement ESG"
        ]
      },
      insurance: {
        title: "Assurances 360°",
        description: "Protection totale et innovante pour tous vos projets de vie et business.",
        points: ["Couverture complète", "Gestion sinistres 24h", "Support premium"],
        cta: "Découvrir",
        useCases: [
          "Protection famille",
          "Assurance professionnelle",
          "Garantie emprunt",
          "Responsabilité civile",
          "Prévoyance santé"
        ]
      },
      explore: "Explorer tous nos services",
      features: "Caractéristiques",
      useCases: "Cas d'usage",
      discover: "Découvrir",
      specialized: {
        title: "Produits spécialisés",
        description: "Solutions expertes pour vos besoins spécifiques",
        mortgage: {
          title: "Prêt immobilier",
          description: "Financez votre projet immobilier aux meilleures conditions",
          rate: "À partir de 1,2% TAEG"
        },
        student: {
          title: "Prêt étudiant", 
          description: "Solutions adaptées pour financer vos études",
          rate: "0% pendant les études"
        },
        savings: {
          title: "Livret épargne+",
          description: "Épargne rémunérée et disponible", 
          rate: "Jusqu'à 4% net"
        },
        premium: {
          title: "Carte Premium",
          description: "Avantages exclusifs et services haut de gamme",
          rate: "Sans frais la 1ère année"
        }
      },
      process: {
        title: "Notre processus",
        description: "Un parcours simplifié pour concrétiser vos projets",
        step1: {
          title: "Analyse de votre projet",
          description: "Étude personnalisée de vos besoins et capacités financières"
        },
        step2: {
          title: "Proposition sur-mesure", 
          description: "Solutions adaptées avec conditions optimisées par IA"
        },
        step3: {
          title: "Validation express",
          description: "Réponse de principe en moins de 2h ouvrées"
        },
        step4: {
          title: "Déblocage des fonds",
          description: "Mise à disposition rapide et accompagnement continu"
        }
      }
    },
    testimonials: {
      title: "Ils nous font confiance",
      subtitle: "Ce que disent nos clients satisfaits",
      clients: [
        {
          name: "Jean-Marc Rousseau",
          location: "Lyon, France",
          feedback: "Service rapide et sérieux. Mon crédit a été approuvé en 48h ! Merci Aurex K-pital."
        },
        {
          name: "Amélie Blanchard",
          location: "Paris, France",
          feedback: "Équipe professionnelle, plateforme claire et un accompagnement vraiment personnalisé."
        },
        {
          name: "Thomas Bonnet",
          location: "Toulouse, France",
          feedback: "Le simulateur était très clair et j'ai obtenu de meilleures conditions qu'à ma banque."
        }
      ]
    },
    legal: {
      badge: "Informations Légales",
      title: {
        main: "Mentions",
        subtitle: "Légales"
      },
      description: "Toutes les informations légales et réglementaires concernant Aurex K-pital et l'utilisation de nos services.",
      tabs: {
        mentions: "Mentions Légales",
        privacy: "Confidentialité",
        terms: "CGU",
        gdpr: "RGPD"
      },
      mentions: {
        title: "Mentions Légales",
        description: "Informations sur la société et responsabilités légales",
        company: {
          title: "Identification de la Société",
          name: "Dénomination sociale",
          type: "Forme juridique",
          typeValue: "Société à responsabilité limitée (GmbH)",
          capital: "Capital social",
          address: "Siège social",
          register: "Registre du commerce",
          vat: "Numéro de TVA",
          siren: "Numéro SIREN"
        },
        management: {
          title: "Direction",
          ceo: "Directeur Général",
          cio: "Directrice Innovation",
          cro: "Directeur des Risques"
        },
        activity: {
          title: "Activité",
          description: "Aurex K-pital est un établissement financier agréé par la BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht) sous le numéro d'agrément 147-FS-2015. Nos activités incluent :",
          services: {
            banking: "Courtage en opérations bancaires et services de paiement",
            investment: "Conseil en investissements financiers",
            insurance: "Intermédiation en assurance",
            wealth: "Services de gestion de patrimoine"
          }
        },
        contact: {
          title: "Contact",
          phone: "Téléphone",
          email: "Email",
          hours: "Horaires",
          schedule: "Lundi-Vendredi 8h-19h, Samedi 9h-17h"
        },
        hosting: {
          title: "Hébergement",
          description: "Ce site est hébergé par :"
        },
        intellectual: {
          title: "Propriété Intellectuelle",
          description: "Tous les contenus présents sur ce site (textes, images, logos, graphismes, etc.) sont protégés par le droit d'auteur et appartiennent à Aurex K-pital ou à ses partenaires. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable."
        },
        responsibility: {
          title: "Responsabilité",
          description: "Aurex K-pital s'efforce de fournir des informations exactes et à jour. Cependant, la société ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées sur ce site. L'utilisation des informations se fait sous la responsabilité exclusive de l'utilisateur."
        }
      }
    }
  },
  de: {
    menu: {
      home: "Startseite",
      services: "Dienstleistungen",
      simulator: "Kreditrechner",
      request: "Anfrage",
      about: "Über uns",
      contact: "Kontakt",
      faq: "FAQ",
      careers: "Karriere",
      partners: "Unsere Partner",
      blog: "Blog"
    },
    footer: {
      tools: "Tools",
      company: "Unternehmen",
      legal: "Rechtliches",
      privacyPolicy: "Datenschutzrichtlinie",
      terms: "Allgemeine Geschäftsbedingungen",
      mentions: "Impressum",
      gdpr: "DSGVO",
      rights: "© 2024 Aurex K-pital. Alle Rechte vorbehalten.",
      description: "Ihr vertrauensvoller Finanzpartner seit 1997. Exzellenz, Innovation und Expertise für all Ihre Finanzprojekte in Europa.",
      services: "Dienstleistungen",
      copyright: "© 2024 Aurex K-pital. Alle Rechte vorbehalten.",
      establishment: "Lizenzierte Finanzinstitution in Europa",
      links: {
        personalLoans: "Privatkredite",
        proFinancing: "Unternehmensfinanzierung",
        investments: "Investitionen",
        insurance: "Versicherungen",
        simulator: "Kreditrechner",
        request: "Finanzierungsanfrage",
        faq: "FAQ",
        contact: "Kontakt",
        about: "Über uns",
        partners: "Unsere Partner",
        careers: "Karriere",
        blog: "Blog",
        legal: "Impressum",
        privacy: "Datenschutzrichtlinie",
        terms: "Allgemeine Geschäftsbedingungen",
        gdpr: "DSGVO"
      }
    },
    partners: {
      title: "Unsere Vertrauenspartner",
      description: "Ein europäisches Exzellenznetzwerk für die besten Finanzlösungen",
      stats: "Über 25 europäische Partner • 27 abgedeckte Länder • 2,5 Mrd€ Handelsvolumen"
    },
    home: {
      hero: {
        title: "Ihr Finanzpartner",
        subtitle: "seit 1997",
        description: "Exzellenz, Innovation und Vertrauen für all Ihre Finanzprojekte",
        ctaBtn: "Unsere Lösungen entdecken",
        simulateBtn: "Kredit simulieren",
        scrollText: "Entdecken",
        carousel: {
          text1: "Starten Sie Ihr Projekt mit Aurex K-pital",
          text2: "Erhalten Sie Finanzierung ohne Eigenkapital",
          text3: "Investieren Sie heute in Ihre Zukunft"
        },
        stats: {
          experience: {
            title: "Jahre der Exzellenz",
            subtitle: "Kontinuierliche Innovation"
          },
          clients: {
            title: "Zufriedene Kunden",
            subtitle: "Garantierte Zufriedenheit"
          },
          funding: {
            title: "Realisierte Finanzierungen",
            subtitle: "Transformative Wirkung"
          }
        }
      },
      services: {
        badge: "Dienstleistungen",
        title: "Lösungen",
        subtitle: "Innovativ",
        description: "Entdecken Sie unsere revolutionären",
        description2: "Finanzlösungen",
        description3: "für Ihre Projekte"
      },
      about: {
        badge: "Über uns",
        title: "Ihr Partner",
        subtitle: "für Finanzen",
        subtitle2: "des Vertrauens",
        description1: {
          highlight: "Seit 1997",
          text: " begleitet Aurex K-pital Privatpersonen und Unternehmen bei ihren Finanzprojekten mit einem Ansatz, der",
          expertise: "menschliche Expertise",
          and: "und",
          technology: "technologische Innovation"
        },
        description2: {
          text: "Unsere Mission: Den Zugang zu Finanzierungen demokratisieren durch",
          highlight: "schnelle, transparente und maßgeschneiderte Lösungen",
          success: "zur Verwirklichung Ihrer Ambitionen"
        },
        stats: {
          founded: "Gründungsjahr",
          location: "Hauptsitz",
          certified: "Register",
          security: "Safe-Nummer"
        },
        trust: {
          title: "Ihr Vertrauen, unsere Priorität",
          description: "Zertifiziert und reguliert von europäischen Behörden"
        },
        buttons: {
          history: "Unsere Geschichte",
          contact: "Kontakt aufnehmen"
        }
      },
      cta: {
        title: "Bereit, Ihre Projekte",
        titleHighlight: "in die Realität",
        titleEnd: "umzusetzen?",
        description: "Unsere Experten begleiten Sie bei jedem Schritt zur Verwirklichung Ihrer finanziellen Ambitionen.",
        buttons: {
          request: "Anfrage stellen",
          simulate: "Kredit simulieren",
          contact: "Kontakt aufnehmen"
        },
        contact: {
          phone: "Telefon",
          address: "Adresse",
          addressValue: "Irma-Keilhack-Ring 24, 22145 Hamburg, Deutschland"
        }
      }
    },
    services: {
      personalLoan: {
        title: "Privatkredite",
        description: "Maßgeschneiderte Finanzierungslösungen mit revolutionären Konditionen.",
        points: ["KI für optimale Zinssätze", "Antwort in 2 Stunden", "Maximale Flexibilität"],
        cta: "Entdecken",
        useCases: [
          "Renovierungsarbeiten",
          "Traumreise",
          "Hochzeit", 
          "Studium",
          "Fahrzeugkauf"
        ]
      },
      businessLoan: {
        title: "Unternehmensfinanzierung",
        description: "Bringen Sie Ihr Geschäft mit unseren innovativen Lösungen voran.",
        points: ["Express-Finanzierung", "Expertenbegleitung", "Maßgeschneiderte Lösungen"],
        cta: "Entdecken",
        useCases: [
          "Unternehmensgründung",
          "Geschäftserweiterung",
          "Ausrüstungskauf",
          "Liquidität",
          "Anteilsübernahme"
        ]
      },
      investment: {
        title: "Intelligente Investments",
        description: "Vermögensoptimierung mit KI und menschlicher Expertise.",
        points: ["Intelligentes Portfolio", "Premium-Beratung", "Optimierte Rendite"],
        cta: "Entdecken",
        useCases: [
          "Immobilieninvestition",
          "Vermögensdiversifikation",
          "Rentenvorbereitung",
          "Steueroptimierung",
          "ESG-Investment"
        ]
      },
      insurance: {
        title: "360° Versicherungen",
        description: "Umfassender Schutz für Ihre Lebens- und Geschäftsprojekte.",
        points: ["Vollständiger Schutz", "Schadenregulierung in 24h", "Premium-Support"],
        cta: "Entdecken",
        useCases: [
          "Familienschutz",
          "Berufsversicherung", 
          "Kreditgarantie",
          "Haftpflicht",
          "Gesundheitsvorsorge"
        ]
      },
      explore: "Alle unsere Services entdecken",
      features: "Eigenschaften",
      useCases: "Anwendungsfälle", 
      discover: "Entdecken",
      specialized: {
        title: "Spezialisierte Produkte",
        description: "Expertenlösungen für Ihre spezifischen Bedürfnisse",
        mortgage: {
          title: "Immobilienkredit",
          description: "Finanzieren Sie Ihr Immobilienprojekt zu besten Konditionen",
          rate: "Ab 1,2% effektiver Jahreszins"
        },
        student: {
          title: "Studentenkredit",
          description: "Angepasste Lösungen zur Finanzierung Ihres Studiums",
          rate: "0% während des Studiums"
        },
        savings: {
          title: "Sparkonto+",
          description: "Verzinste und verfügbare Ersparnisse",
          rate: "Bis zu 4% netto"
        },
        premium: {
          title: "Premium-Karte", 
          description: "Exklusive Vorteile und erstklassige Services",
          rate: "Gebührenfrei im 1. Jahr"
        }
      },
      process: {
        title: "Unser Prozess",
        description: "Ein vereinfachter Weg zur Verwirklichung Ihrer Projekte",
        step1: {
          title: "Analyse Ihres Projekts",
          description: "Personalisierte Studie Ihrer Bedürfnisse und finanziellen Möglichkeiten"
        },
        step2: {
          title: "Maßgeschneidertes Angebot",
          description: "Angepasste Lösungen mit KI-optimierten Konditionen"
        },
        step3: {
          title: "Express-Validierung", 
          description: "Grundsätzliche Antwort in weniger als 2 Arbeitsstunden"
        },
        step4: {
          title: "Freigabe der Mittel",
          description: "Schnelle Bereitstellung und kontinuierliche Begleitung"
        }
      }
    },
    testimonials: {
      title: "Vertrauen Sie uns",
      subtitle: "Was unsere zufriedenen Kunden sagen",
      clients: [
        {
          name: "Jean-Marc Rousseau",
          location: "Lyon, Frankreich",
          feedback: "Schneller und seriöser Service. Mein Kredit wurde in 48 Stunden genehmigt. Danke Aurex K-pital!"
        },
        {
          name: "Amélie Blanchard",
          location: "Paris, Frankreich",
          feedback: "Professionelles Team, einfache Plattform und wirklich individuelle Betreuung."
        },
        {
          name: "Thomas Bonnet",
          location: "Toulouse, Frankreich",
          feedback: "Der Simulator war sehr klar, und ich erhielt bessere Konditionen als bei meiner Bank."
        }
      ]
    },
    legal: {
      badge: "Rechtliche Informationen",
      title: {
        main: "Impressum",
        subtitle: "und Rechtliches"
      },
      description: "Alle rechtlichen und regulatorischen Informationen zu Aurex K-pital und der Nutzung unserer Dienstleistungen.",
      tabs: {
        mentions: "Impressum",
        privacy: "Datenschutz",
        terms: "AGB",
        gdpr: "DSGVO"
      },
      mentions: {
        title: "Impressum",
        description: "Unternehmensangaben und rechtliche Verantwortlichkeiten",
        company: {
          title: "Unternehmensidentifikation",
          name: "Firmenbezeichnung",
          type: "Rechtsform",
          typeValue: "Gesellschaft mit beschränkter Haftung (GmbH)",
          capital: "Stammkapital",
          address: "Firmensitz",
          register: "Handelsregister",
          vat: "Umsatzsteuer-ID",
          siren: "SIREN-Nummer"
        },
        management: {
          title: "Geschäftsführung",
          ceo: "Geschäftsführer",
          cio: "Innovationsleiterin",
          cro: "Risikoleiter"
        },
        activity: {
          title: "Tätigkeit",
          description: "Aurex K-pital ist ein von der BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht) lizenziertes Finanzinstitut mit der Lizenznummer 147-FS-2015. Unsere Aktivitäten umfassen:",
          services: {
            banking: "Vermittlung von Bankgeschäften und Zahlungsdienstleistungen",
            investment: "Anlageberatung",
            insurance: "Versicherungsvermittlung",
            wealth: "Vermögensverwaltungsdienstleistungen"
          }
        },
        contact: {
          title: "Kontakt",
          phone: "Telefon",
          email: "E-Mail",
          hours: "Öffnungszeiten",
          schedule: "Montag-Freitag 8-19 Uhr, Samstag 9-17 Uhr"
        },
        hosting: {
          title: "Hosting",
          description: "Diese Website wird gehostet von:"
        },
        intellectual: {
          title: "Geistiges Eigentum",
          description: "Alle auf dieser Website vorhandenen Inhalte (Texte, Bilder, Logos, Grafiken usw.) sind urheberrechtlich geschützt und gehören Aurex K-pital oder seinen Partnern. Jede Vervielfältigung, auch auszugsweise, ist ohne vorherige schriftliche Genehmigung untersagt."
        },
        responsibility: {
          title: "Haftung",
          description: "Aurex K-pital bemüht sich, genaue und aktuelle Informationen bereitzustellen. Das Unternehmen kann jedoch nicht die Richtigkeit, Vollständigkeit oder Aktualität der auf dieser Website verbreiteten Informationen garantieren. Die Nutzung der Informationen erfolgt ausschließlich auf eigene Verantwortung des Nutzers."
        }
      }
    }
  },
  pl: {
    menu: {
      home: "Strona główna",
      services: "Usługi",
      simulator: "Symulator",
      request: "Wniosek",
      about: "O nas",
      contact: "Kontakt",
      faq: "FAQ",
      careers: "Kariera",
      partners: "Partnerzy",
      blog: "Blog"
    },
    footer: {
      tools: "Narzędzia",
      company: "Firma",
      legal: "Prawne",
      privacyPolicy: "Polityka prywatności",
      terms: "Warunki ogólne",
      mentions: "Informacje prawne",
      gdpr: "RODO",
      rights: "© 2024 Aurex K-pital. Wszelkie prawa zastrzeżone.",
      description: "Twój zaufany partner finansowy od 1997 roku. Doskonałość, innowacyjność i ekspertyza dla wszystkich Twoich projektów finansowych w Europie.",
      services: "Usługi",
      copyright: "© 2024 Aurex K-pital. Wszelkie prawa zastrzeżone.",
      establishment: "Licencjonowana instytucja finansowa w Europie",
      links: {
        personalLoans: "Pożyczki osobiste",
        proFinancing: "Finansowanie biznesowe",
        investments: "Inwestycje",
        insurance: "Ubezpieczenia",
        simulator: "Symulator pożyczki",
        request: "Wniosek o finansowanie",
        faq: "FAQ",
        contact: "Kontakt",
        about: "O nas",
        partners: "Nasi partnerzy",
        careers: "Kariera",
        blog: "Blog",
        legal: "Informacje prawne",
        privacy: "Polityka prywatności",
        terms: "Warunki ogólne",
        gdpr: "RODO"
      }
    },
    legal: {
      badge: "Informacje Prawne",
      title: {
        main: "Informacje",
        subtitle: "Prawne"
      },
      description: "Wszystkie informacje prawne i regulacyjne dotyczące Aurex K-pital i korzystania z naszych usług.",
      tabs: {
        mentions: "Informacje Prawne",
        privacy: "Prywatność",
        terms: "Regulamin",
        gdpr: "RODO"
      },
      mentions: {
        title: "Informacje Prawne",
        description: "Informacje o firmie i odpowiedzialności prawnej",
        company: {
          title: "Identyfikacja Spółki",
          name: "Nazwa firmy",
          type: "Forma prawna",
          typeValue: "Spółka z ograniczoną odpowiedzialnością (GmbH)",
          capital: "Kapitał społeczny",
          address: "Siedziba",
          register: "Rejestr handlowy",
          vat: "Numer VAT",
          siren: "Numer SIREN"
        },
        management: {
          title: "Zarząd",
          ceo: "Dyrektor Generalny",
          cio: "Dyrektor ds. Innowacji",
          cro: "Dyrektor ds. Ryzyka"
        },
        activity: {
          title: "Działalność",
          description: "Aurex K-pital to instytucja finansowa autoryzowana przez BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht) pod numerem autoryzacji 147-FS-2015. Nasze działania obejmują:",
          services: {
            banking: "Pośrednictwo w operacjach bankowych i usługach płatniczych",
            investment: "Doradztwo w zakresie inwestycji finansowych",
            insurance: "Pośrednictwo ubezpieczeniowe",
            wealth: "Usługi zarządzania majątkiem"
          }
        },
        contact: {
          title: "Kontakt",
          phone: "Telefon",
          email: "Email",
          hours: "Godziny pracy",
          schedule: "Poniedziałek-Piątek 8-19, Sobota 9-17"
        },
        hosting: {
          title: "Hosting",
          description: "Ta strona jest hostowana przez:"
        },
        intellectual: {
          title: "Własność Intelektualna",
          description: "Wszystkie treści obecne na tej stronie (teksty, obrazy, logotypy, grafiki, itp.) są chronione prawem autorskim i należą do Aurex K-pital lub jego partnerów. Jakiekolwiek powielanie, nawet częściowe, jest zabronione bez wcześniejszej pisemnej autoryzacji."
        },
        responsibility: {
          title: "Odpowiedzialność",
          description: "Aurex K-pital stara się dostarczać dokładne i aktualne informacje. Jednak firma nie może zagwarantować dokładności, kompletności lub aktualności informacji rozpowszechnianych na tej stronie. Korzystanie z informacji odbywa się na wyłączną odpowiedzialność użytkownika."
        }
      }
    }
  },
  fi: {
    menu: {
      home: "Etusivu",
      services: "Palvelut",
      simulator: "Simulaattori",
      request: "Hakemus",
      about: "Tietoa meistä",
      contact: "Yhteystiedot",
      faq: "UKK",
      careers: "Ura",
      partners: "Kumppanit",
      blog: "Blogi"
    },
    footer: {
      tools: "Työkalut",
      company: "Yritys",
      legal: "Juridinen",
      privacyPolicy: "Tietosuojakäytäntö",
      terms: "Yleiset ehdot",
      mentions: "Oikeudelliset tiedot",
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Kaikki oikeudet pidätetään.",
      description: "Luotettava rahoituskumppanisi vuodesta 1997. Erinomaisuutta, innovaatiota ja asiantuntemusta kaikille rahoitusprojekteillesi Euroopassa.",
      services: "Palvelut",
      copyright: "© 2024 Aurex K-pital. Kaikki oikeudet pidätetään.",
      establishment: "Lisensoitu rahoituslaitos Euroopassa",
      links: {
        personalLoans: "Henkilökohtaiset lainat",
        proFinancing: "Yritysrahoitus",
        investments: "Sijoitukset",
        insurance: "Vakuutukset",
        simulator: "Lainasimulator",
        request: "Rahoitushakemus",
        faq: "UKK",
        contact: "Yhteystiedot",
        about: "Tietoa meistä",
        partners: "Kumppanimme",
        careers: "Ura",
        blog: "Blogi",
        legal: "Oikeudelliset tiedot",
        privacy: "Tietosuojakäytäntö",
        terms: "Yleiset ehdot",
        gdpr: "GDPR"
      }
    },
    legal: {
      badge: "Oikeudelliset Tiedot",
      title: {
        main: "Oikeudelliset",
        subtitle: "Tiedot"
      },
      description: "Kaikki oikeudelliset ja säännöstöä koskevat tiedot Aurex K-pitalista ja palvelujemme käytöstä.",
      tabs: {
        mentions: "Oikeudelliset Tiedot",
        privacy: "Yksityisyys",
        terms: "Käyttöehdot",
        gdpr: "GDPR"
      },
      mentions: {
        title: "Oikeudelliset Tiedot",
        description: "Yritystiedot ja oikeudelliset vastuut",
        company: {
          title: "Yrityksen Tunnistaminen",
          name: "Yritysnimi",
          type: "Oikeudellinen muoto",
          typeValue: "Osakeyhtiö (GmbH)",
          capital: "Osakepääoma",
          address: "Pääkonttori",
          register: "Kaupparekisteri",
          vat: "ALV-numero",
          siren: "SIREN-numero"
        },
        management: {
          title: "Johto",
          ceo: "Toimitusjohtaja",
          cio: "Innovaatiojohtaja",
          cro: "Riskijohtaja"
        },
        activity: {
          title: "Toiminta",
          description: "Aurex K-pital on BaFin:n (Bundesanstalt für Finanzdienstleistungsaufsicht) valtuuttama rahoituslaitos luvan numerolla 147-FS-2015. Toimintamme sisältää:",
          services: {
            banking: "Pankkitoimintojen ja maksupalvelujen välitys",
            investment: "Rahoitussijoitusten neuvonta",
            insurance: "Vakuutusvälitys",
            wealth: "Varallisuudenhoitopalvelut"
          }
        },
        contact: {
          title: "Yhteystiedot",
          phone: "Puhelin",
          email: "Sähköposti",
          hours: "Aukioloajat",
          schedule: "Maanantai-Perjantai 8-19, Lauantai 9-17"
        },
        hosting: {
          title: "Hosting",
          description: "Tämä sivusto on isännöity:"
        },
        intellectual: {
          title: "Henkinen Omaisuus",
          description: "Kaikki tällä sivustolla olevat sisällöt (tekstit, kuvat, logot, grafiikat jne.) ovat tekijänoikeuksien suojaamia ja kuuluvat Aurex K-pitalille tai sen kumppaneille. Kaikenlainen jäljentäminen, myös osittainen, on kielletty ilman etukäteen annettua kirjallista lupaa."
        },
        responsibility: {
          title: "Vastuu",
          description: "Aurex K-pital pyrkii tarjoamaan tarkkoja ja ajantasaisia tietoja. Yritys ei kuitenkaan voi taata tällä sivustolla levitettyjen tietojen tarkkuutta, täydellisyyttä tai ajankohtaisuutta. Tietojen käyttö tapahtuu käyttäjän omalla vastuulla."
        }
      }
    }
  },
  pt: {
    menu: {
      home: "Início",
      services: "Serviços",
      simulator: "Simulador",
      request: "Pedido",
      about: "Sobre nós",
      contact: "Contacto",
      faq: "FAQ",
      careers: "Carreiras",
      partners: "Parceiros",
      blog: "Blog"
    },
    footer: {
      tools: "Ferramentas",
      company: "Empresa",
      legal: "Legal",
      privacyPolicy: "Política de privacidade",
      terms: "Termos gerais",
      mentions: "Informações legais",
      gdpr: "RGPD",
      rights: "© 2024 Aurex K-pital. Todos os direitos reservados.",
      description: "O seu parceiro financeiro de confiança desde 1997. Excelência, inovação e expertise para todos os seus projetos financeiros na Europa.",
      services: "Serviços",
      copyright: "© 2024 Aurex K-pital. Todos os direitos reservados.",
      establishment: "Instituição financeira licenciada na Europa",
      links: {
        personalLoans: "Empréstimos pessoais",
        proFinancing: "Financiamento empresarial",
        investments: "Investimentos",
        insurance: "Seguros",
        simulator: "Simulador de empréstimo",
        request: "Pedido de financiamento",
        faq: "FAQ",
        contact: "Contacto",
        about: "Sobre nós",
        partners: "Os nossos parceiros",
        careers: "Carreiras",
        blog: "Blog",
        legal: "Informações legais",
        privacy: "Política de privacidade",
        terms: "Termos gerais",
        gdpr: "RGPD"
      }
    },
    legal: {
      badge: "Informações Legais",
      title: {
        main: "Informações",
        subtitle: "Legais"
      },
      description: "Todas as informações legais e regulamentares relativas à Aurex K-pital e à utilização dos nossos serviços.",
      tabs: {
        mentions: "Informações Legais",
        privacy: "Confidencialidade",
        terms: "CGU",
        gdpr: "RGPD"
      },
      mentions: {
        title: "Informações Legais",
        description: "Informações sobre a sociedade e responsabilidades legais",
        company: {
          title: "Identificação da Sociedade",
          name: "Denominação social",
          type: "Forma jurídica",
          typeValue: "Sociedade por quotas (GmbH)",
          capital: "Capital social",
          address: "Sede",
          register: "Registo comercial",
          vat: "Número de IVA",
          siren: "Número SIREN"
        },
        management: {
          title: "Direção",
          ceo: "Diretor Geral",
          cio: "Diretora de Inovação",
          cro: "Diretor de Riscos"
        },
        activity: {
          title: "Atividade",
          description: "A Aurex K-pital é uma instituição financeira autorizada pela BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht) sob o número de autorização 147-FS-2015. As nossas atividades incluem:",
          services: {
            banking: "Mediação em operações bancárias e serviços de pagamento",
            investment: "Aconselhamento em investimentos financeiros",
            insurance: "Mediação em seguros",
            wealth: "Serviços de gestão patrimonial"
          }
        },
        contact: {
          title: "Contacto",
          phone: "Telefone",
          email: "Email",
          hours: "Horários",
          schedule: "Segunda-Sexta 8h-19h, Sábado 9h-17h"
        },
        hosting: {
          title: "Alojamento",
          description: "Este site está alojado por:"
        },
        intellectual: {
          title: "Propriedade Intelectual",
          description: "Todos os conteúdos presentes neste site (textos, imagens, logotipos, gráficos, etc.) estão protegidos por direitos de autor e pertencem à Aurex K-pital ou aos seus parceiros. Qualquer reprodução, mesmo parcial, é proibida sem autorização escrita prévia."
        },
        responsibility: {
          title: "Responsabilidade",
          description: "A Aurex K-pital esforça-se por fornecer informações exatas e atualizadas. No entanto, a sociedade não pode garantir a exatidão, completude ou atualidade das informações difundidas neste site. A utilização das informações faz-se sob a responsabilidade exclusiva do utilizador."
        }
      }
    }
  },
  el: {
    menu: {
      home: "Αρχική",
      services: "Υπηρεσίες",
      simulator: "Προσομοιωτής",
      request: "Αίτηση",
      about: "Σχετικά με εμάς",
      contact: "Επικοινωνία",
      faq: "Συχνές Ερωτήσεις",
      careers: "Καριέρα",
      partners: "Συνεργάτες",
      blog: "Blog"
    },
    footer: {
      tools: "Εργαλεία",
      company: "Εταιρεία",
      legal: "Νομικά",
      privacyPolicy: "Πολιτική απορρήτου",
      terms: "Γενικοί όροι",
      mentions: "Νομικές πληροφορίες",
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Όλα τα δικαιώματα διατηρούνται.",
      description: "Ο αξιόπιστος χρηματοοικονομικός συνεργάτης σας από το 1997. Αριστεία, καινοτομία και εμπειρία για όλα τα χρηματοοικονομικά σας έργα στην Ευρώπη.",
      services: "Υπηρεσίες",
      copyright: "© 2024 Aurex K-pital. Όλα τα δικαιώματα διατηρούνται.",
      establishment: "Αδειοδοτημένο χρηματοπιστωτικό ίδρυμα στην Ευρώπη",
      links: {
        personalLoans: "Προσωπικά δάνεια",
        proFinancing: "Επιχειρηματική χρηματοδότηση",
        investments: "Επενδύσεις",
        insurance: "Ασφάλειες",
        simulator: "Προσομοιωτής δανείου",
        request: "Αίτηση χρηματοδότησης",
        faq: "Συχνές Ερωτήσεις",
        contact: "Επικοινωνία",
        about: "Σχετικά με εμάς",
        partners: "Οι συνεργάτες μας",
        careers: "Καριέρα",
        blog: "Blog",
        legal: "Νομικές πληροφορίες",
        privacy: "Πολιτική απορρήτου",
        terms: "Γενικοί όροι",
        gdpr: "GDPR"
      }
    },
    legal: {
      badge: "Νομικές Πληροφορίες",
      title: {
        main: "Νομικές",
        subtitle: "Πληροφορίες"
      },
      description: "Όλες οι νομικές και κανονιστικές πληροφορίες σχετικά με την Aurex K-pital και τη χρήση των υπηρεσιών μας.",
      tabs: {
        mentions: "Νομικές Πληροφορίες",
        privacy: "Εμπιστευτικότητα",
        terms: "Όροι Χρήσης",
        gdpr: "GDPR"
      },
      mentions: {
        title: "Νομικές Πληροφορίες",
        description: "Πληροφορίες για την εταιρεία και νομικές ευθύνες",
        company: {
          title: "Ταυτοποίηση της Εταιρείας",
          name: "Εταιρική επωνυμία",
          type: "Νομική μορφή",
          typeValue: "Εταιρεία περιορισμένης ευθύνης (GmbH)",
          capital: "Εταιρικό κεφάλαιο",
          address: "Έδρα",
          register: "Εμπορικό μητρώο",
          vat: "Αριθμός ΦΠΑ",
          siren: "Αριθμός SIREN"
        },
        management: {
          title: "Διοίκηση",
          ceo: "Γενικός Διευθυντής",
          cio: "Διευθύντρια Καινοτομίας",
          cro: "Διευθυντής Κινδύνων"
        },
        activity: {
          title: "Δραστηριότητα",
          description: "Η Aurex K-pital είναι χρηματοπιστωτικό ίδρυμα εξουσιοδοτημένο από την BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht) υπό τον αριθμό εξουσιοδότησης 147-FS-2015. Οι δραστηριότητές μας περιλαμβάνουν:",
          services: {
            banking: "Μεσιτεία σε τραπεζικές συναλλαγές και υπηρεσίες πληρωμών",
            investment: "Συμβουλευτική σε χρηματοοικονομικές επενδύσεις",
            insurance: "Ασφαλιστική μεσιτεία",
            wealth: "Υπηρεσίες διαχείρισης περιουσίας"
          }
        },
        contact: {
          title: "Επικοινωνία",
          phone: "Τηλέφωνο",
          email: "Email",
          hours: "Ώρες λειτουργίας",
          schedule: "Δευτέρα-Παρασκευή 8-19, Σάββατο 9-17"
        },
        hosting: {
          title: "Φιλοξενία",
          description: "Αυτή η ιστοσελίδα φιλοξενείται από:"
        },
        intellectual: {
          title: "Πνευματική Ιδιοκτησία",
          description: "Όλα τα περιεχόμενα αυτής της ιστοσελίδας (κείμενα, εικόνες, λογότυπα, γραφικά κ.λπ.) προστατεύονται από δικαιώματα πνευματικής ιδιοκτησίας και ανήκουν στην Aurex K-pital ή στους συνεργάτες της. Κάθε αναπαραγωγή, ακόμη και μερική, απαγορεύεται χωρίς προηγούμενη γραπτή άδεια."
        },
        responsibility: {
          title: "Ευθύνη",
          description: "Η Aurex K-pital προσπαθεί να παρέχει ακριβείς και ενημερωμένες πληροφορίες. Ωστόσο, η εταιρεία δεν μπορεί να εγγυηθεί την ακρίβεια, πληρότητα ή επικαιρότητα των πληροφοριών που διανέμονται σε αυτήν την ιστοσελίδα. Η χρήση των πληροφοριών γίνεται με αποκλειστική ευθύνη του χρήστη."
        }
      }
    }
  },
  it: {
    menu: {
      home: "Home",
      services: "Servizi",
      simulator: "Simulatore",
      request: "Richiesta",
      about: "Chi siamo",
      contact: "Contatti",
      faq: "FAQ",
      careers: "Carriere",
      partners: "Partner",
      blog: "Blog"
    },
    footer: {
      tools: "Strumenti",
      company: "Azienda",
      legal: "Legale",
      privacyPolicy: "Politica sulla privacy",
      terms: "Termini generali",
      mentions: "Informazioni legali",
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Tutti i diritti riservati.",
      description: "Il vostro partner finanziario di fiducia dal 1997. Eccellenza, innovazione ed esperienza per tutti i vostri progetti finanziari in Europa.",
      services: "Servizi",
      copyright: "© 2024 Aurex K-pital. Tutti i diritti riservati.",
      establishment: "Istituzione finanziaria autorizzata in Europa",
      links: {
        personalLoans: "Prestiti personali",
        proFinancing: "Finanziamenti aziendali",
        investments: "Investimenti",
        insurance: "Assicurazioni",
        simulator: "Simulatore di prestito",
        request: "Richiesta di finanziamento",
        faq: "FAQ",
        contact: "Contatti",
        about: "Chi siamo",
        partners: "I nostri partner",
        careers: "Carriere",
        blog: "Blog",
        legal: "Informazioni legali",
        privacy: "Politica sulla privacy",
        terms: "Termini generali",
        gdpr: "GDPR"
      }
    },
    legal: {
      badge: "Informazioni Legali",
      title: {
        main: "Informazioni",
        subtitle: "Legali"
      },
      description: "Tutte le informazioni legali e normative riguardanti Aurex K-pital e l'utilizzo dei nostri servizi.",
      tabs: {
        mentions: "Informazioni Legali",
        privacy: "Riservatezza",
        terms: "CGU",
        gdpr: "GDPR"
      },
      mentions: {
        title: "Informazioni Legali",
        description: "Informazioni sulla società e responsabilità legali",
        company: {
          title: "Identificazione della Società",
          name: "Denominazione sociale",
          type: "Forma giuridica",
          typeValue: "Società a responsabilità limitata (GmbH)",
          capital: "Capitale sociale",
          address: "Sede legale",
          register: "Registro delle imprese",
          vat: "Numero IVA",
          siren: "Numero SIREN"
        },
        management: {
          title: "Direzione",
          ceo: "Direttore Generale",
          cio: "Direttrice Innovazione",
          cro: "Direttore Rischi"
        },
        activity: {
          title: "Attività",
          description: "Aurex K-pital è un istituto finanziario autorizzato dalla BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht) sotto il numero di autorizzazione 147-FS-2015. Le nostre attività includono:",
          services: {
            banking: "Intermediazione in operazioni bancarie e servizi di pagamento",
            investment: "Consulenza in investimenti finanziari",
            insurance: "Intermediazione assicurativa",
            wealth: "Servizi di gestione patrimoniale"
          }
        },
        contact: {
          title: "Contatti",
          phone: "Telefono",
          email: "Email",
          hours: "Orari",
          schedule: "Lunedì-Venerdì 8-19, Sabato 9-17"
        },
        hosting: {
          title: "Hosting",
          description: "Questo sito è ospitato da:"
        },
        intellectual: {
          title: "Proprietà Intellettuale",
          description: "Tutti i contenuti presenti su questo sito (testi, immagini, loghi, grafiche, ecc.) sono protetti dal diritto d'autore e appartengono ad Aurex K-pital o ai suoi partner. Qualsiasi riproduzione, anche parziale, è vietata senza autorizzazione scritta preventiva."
        },
        responsibility: {
          title: "Responsabilità",
          description: "Aurex K-pital si sforza di fornire informazioni precise e aggiornate. Tuttavia, la società non può garantire l'accuratezza, completezza o attualità delle informazioni diffuse su questo sito. L'utilizzo delle informazioni avviene sotto la responsabilità esclusiva dell'utente."
        }
      }
    }
  }
};