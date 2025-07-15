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
    // Direct translation without problematic cache
    const keys = key.split('.');
    let current: any = translations[language];
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        // Fallback to French if translation not found
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
    
    return typeof current === 'string' ? current : key;
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
    simulator: {
      title: "Calculateur de Prêt",
      titleSecond: "Intelligent",
      subtitle: "Obtenez une estimation personnalisée en temps réel de votre financement",
      form: {
        loanType: "Type de financement",
        amount: "Montant souhaité (€)",
        duration: "Durée de remboursement (mois)",
        income: "Revenus mensuels nets (optionnel)",
        incomeHelper: "Information utilisée pour optimiser votre taux",
        guarantee: "Avez-vous une garantie ou caution ?",
        guaranteeOptions: {
          yes: "Oui, j'ai une garantie",
          no: "Non, pas de garantie",
          maybe: "À évaluer selon l'offre"
        },
        loanTypes: {
          personal: {
            label: "Prêt Personnel",
            description: "Pour tous vos projets personnels"
          },
          auto: {
            label: "Crédit Auto",
            description: "Financement véhicule neuf ou occasion"
          },
          realEstate: {
            label: "Crédit Immobilier",
            description: "Achat, construction ou rénovation"
          },
          professional: {
            label: "Financement Pro",
            description: "Investissement professionnel"
          },
          student: {
            label: "Prêt Étudiant",
            description: "Financement études supérieures"
          },
          consolidation: {
            label: "Rachat de Crédits",
            description: "Regroupement de dettes existantes"
          }
        }
      },
      configuration: {
        title: "Configuration de votre prêt",
        description: "Personnalisez les paramètres selon vos besoins"
      },
      result: {
        title: "Votre estimation",
        monthlyPayment: "Mensualité",
        interestRate: "Taux d'intérêt",
        totalCost: "Coût total du crédit",
        totalRepayment: "Montant total à rembourser",
        units: {
          months: "mois",
          years: "ans"
        },
        disclaimer: "Cette estimation est indicative et peut varier selon votre profil final. Offre soumise à acceptation."
      },
      advantages: {
        title: "Vos avantages Aurex K-pital",
        items: {
          rates: "Taux préférentiels négociés",
          earlyRepayment: "Remboursement anticipé sans frais",
          response: "Réponse sous 24h garantie",
          support: "Accompagnement personnalisé"
        }
      },
      cta: {
        title: "Prêt à concrétiser votre projet ?",
        description: "Nos conseillers experts vous accompagnent pour transformer cette simulation en réalité",
        buttons: {
          request: "Faire ma demande",
          consultant: "Parler à un conseiller",
          officialRequest: "Faire ma demande officielle",
          allServices: "Voir tous nos services"
        }
      }
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
    },
    blog: {
      badge: "Expertise & Analyse",
      title: "Blog Aurex",
      subtitle: "K-pital", 
      description: "Analyses d'experts, tendances du marché et conseils pratiques pour optimiser vos décisions financières et investissements.",
      stats: {
        articles: {
          value: "150+",
          label: "Articles publiés"
        },
        experts: {
          value: "8", 
          label: "Experts rédacteurs"
        },
        readers: {
          value: "50K+",
          label: "Lecteurs mensuels"
        },
        satisfaction: {
          value: "95%",
          label: "Satisfaction lecteurs"
        }
      },
      featured: {
        title: "Article vedette"
      },
      search: {
        placeholder: "Rechercher un article...",
        allCategories: "Toutes les catégories"
      },
      categories: {
        title: "Catégories",
        innovation: "Innovation",
        realEstate: "Immobilier",
        regulation: "Réglementation",
        economy: "Économie",
        esg: "ESG",
        education: "Éducation"
      },
      trending: {
        title: "Tendances"
      },
      newsletter: {
        title: "Newsletter",
        description: "Recevez nos derniers articles et analyses directement dans votre boîte mail",
        placeholder: "Votre email",
        subscribe: "S'abonner",
        disclaimer: "Maximum 1 email par semaine. Désabonnement facile."
      },
      actions: {
        readMore: "Lire l'article complet",
        read: "Lire",
        loadMore: "Charger plus d'articles",
        readTime: "de lecture"
      },
      content: {
        featuredArticle: {
          title: "L'intelligence artificielle révolutionne le secteur financier européen",
          excerpt: "Découvrez comment les nouvelles technologies transforment les services bancaires et d'investissement, offrant des solutions plus personnalisées et efficaces aux clients européens.",
          author: "Dr. Marie Dubois",
          role: "Directrice Innovation FinTech",
          date: "15 janvier 2024",
          category: "innovation"
        },
        articles: [
          {
            title: "Guide complet du crédit immobilier en 2024",
            excerpt: "Tout ce qu'il faut savoir sur les conditions actuelles du marché immobilier et les meilleures stratégies pour obtenir un financement optimal.",
            author: "Pierre Martin",
            date: "12 janvier 2024",
            category: "realEstate"
          },
          {
            title: "Nouvelle réglementation européenne sur les crypto-actifs",
            excerpt: "Analyse des implications du règlement MiCA pour les investisseurs et institutions financières en Europe.",
            author: "Sophie Bernard",
            date: "10 janvier 2024",
            category: "regulation"
          },
          {
            title: "Tendances économiques 2024 : prévisions d'experts",
            excerpt: "Les principales tendances qui façonneront l'économie européenne cette année selon nos analystes.",
            author: "Jean-Claude Moreau",
            date: "8 janvier 2024",
            category: "economy"
          },
          {
            title: "Investissement ESG : performance et impact",
            excerpt: "Comment concilier rentabilité et responsabilité environnementale dans vos investissements.",
            author: "Émilie Rousseau",
            date: "5 janvier 2024",
            category: "esg"
          },
          {
            title: "Formation financière : les bases de l'investissement",
            excerpt: "Guide pratique pour débuter en investissement avec les bonnes pratiques et erreurs à éviter.",
            author: "Marc Lefebvre",
            date: "3 janvier 2024",
            category: "education"
          },
          {
            title: "Optimisation fiscale 2024 : nouveautés et stratégies",
            excerpt: "Les dernières évolutions fiscales et comment optimiser légalement vos impôts cette année.",
            author: "Anne Durand",
            date: "1er janvier 2024",
            category: "economy"
          }
        ],
        trending: [
          {
            title: "Comment négocier son taux de crédit immobilier"
          },
          {
            title: "Investir dans l'immobilier locatif en 2024"
          },
          {
            title: "Les meilleures assurances-vie européennes"
          },
          {
            title: "Créer son entreprise : guide du financement"
          },
          {
            title: "Épargne retraite : comparer les solutions"
          }
        ]
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
    simulator: {
      title: "Kreditrechner",
      titleSecond: "Intelligent",
      subtitle: "Erhalten Sie eine personalisierte Echtzeitschätzung Ihrer Finanzierung",
      form: {
        loanType: "Finanzierungsart",
        amount: "Gewünschter Betrag (€)",
        duration: "Rückzahlungsdauer (Monate)",
        income: "Monatliches Nettoeinkommen (optional)",
        incomeHelper: "Information zur Optimierung Ihres Zinssatzes verwendet",
        guarantee: "Haben Sie eine Garantie oder Bürgschaft?",
        guaranteeOptions: {
          yes: "Ja, ich habe eine Garantie",
          no: "Nein, keine Garantie",
          maybe: "Je nach Angebot zu bewerten"
        },
        loanTypes: {
          personal: {
            label: "Privatkredit",
            description: "Für alle Ihre persönlichen Projekte"
          },
          auto: {
            label: "Autokredit",
            description: "Finanzierung von Neu- oder Gebrauchtfahrzeugen"
          },
          realEstate: {
            label: "Immobilienkredit",
            description: "Kauf, Bau oder Renovierung"
          },
          professional: {
            label: "Unternehmensfinanzierung",
            description: "Geschäftsinvestition"
          },
          student: {
            label: "Studienkredit",
            description: "Finanzierung des Hochschulstudiums"
          },
          consolidation: {
            label: "Kreditumschuldung",
            description: "Zusammenfassung bestehender Schulden"
          }
        }
      },
      configuration: {
        title: "Konfiguration Ihres Kredits",
        description: "Passen Sie die Parameter nach Ihren Bedürfnissen an"
      },
      result: {
        title: "Ihre Schätzung",
        monthlyPayment: "Monatliche Rate",
        interestRate: "Zinssatz",
        totalCost: "Gesamtkosten des Kredits",
        totalRepayment: "Gesamtrückzahlungsbetrag",
        units: {
          months: "Monate",
          years: "Jahre"
        },
        disclaimer: "Diese Schätzung ist unverbindlich und kann je nach Ihrem endgültigen Profil variieren. Angebot vorbehaltlich Annahme."
      },
      advantages: {
        title: "Ihre Aurex K-pital Vorteile",
        items: {
          rates: "Ausgehandelte Vorzugszinsen",
          earlyRepayment: "Vorzeitige Rückzahlung ohne Gebühren",
          response: "Garantierte Antwort binnen 24h",
          support: "Persönliche Betreuung"
        }
      },
      cta: {
        title: "Bereit, Ihr Projekt zu verwirklichen?",
        description: "Unsere Expertenberater begleiten Sie dabei, diese Simulation in die Realität umzusetzen",
        buttons: {
          request: "Antrag stellen",
          consultant: "Mit einem Berater sprechen",
          officialRequest: "Offiziellen Antrag stellen",
          allServices: "Alle unsere Services ansehen"
        }
      }
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
    },
    blog: {
      badge: "Expertise & Analyse",
      title: "Aurex Blog",
      subtitle: "K-pital",
      description: "Expertenanalysen, Markttrends und praktische Tipps zur Optimierung Ihrer Finanz- und Investitionsentscheidungen.",
      stats: {
        articles: {
          value: "150+",
          label: "Veröffentlichte Artikel"
        },
        experts: {
          value: "8",
          label: "Experten-Autoren"
        },
        readers: {
          value: "50K+",
          label: "Monatliche Leser"
        },
        satisfaction: {
          value: "95%",
          label: "Leserzufriedenheit"
        }
      },
      featured: {
        title: "Hauptartikel"
      },
      search: {
        placeholder: "Artikel suchen...",
        allCategories: "Alle Kategorien"
      },
      categories: {
        title: "Kategorien",
        innovation: "Innovation",
        realEstate: "Immobilien",
        regulation: "Regulierung",
        economy: "Wirtschaft",
        esg: "ESG",
        education: "Bildung"
      },
      trending: {
        title: "Trends"
      },
      newsletter: {
        title: "Newsletter",
        description: "Erhalten Sie unsere neuesten Artikel und Analysen direkt in Ihr Postfach",
        placeholder: "Ihre E-Mail",
        subscribe: "Abonnieren",
        disclaimer: "Maximal 1 E-Mail pro Woche. Einfach abbestellbar."
      },
      actions: {
        readMore: "Vollständigen Artikel lesen",
        read: "Lesen",
        loadMore: "Weitere Artikel laden",
        readTime: "Lesezeit"
      },
      content: {
        featuredArticle: {
          title: "Künstliche Intelligenz revolutioniert den europäischen Finanzsektor",
          excerpt: "Entdecken Sie, wie neue Technologien Bank- und Investmentdienstleistungen transformieren und europäischen Kunden personalisiertere und effizientere Lösungen bieten.",
          author: "Dr. Marie Dubois",
          role: "Direktorin FinTech Innovation",
          date: "15. Januar 2024",
          category: "innovation"
        },
        articles: [
          { title: "Vollständiger Leitfaden für Immobilienkredite 2024", excerpt: "Alles, was Sie über die aktuellen Bedingungen des Immobilienmarkts wissen müssen.", author: "Pierre Martin", date: "12. Januar 2024", category: "realEstate" },
          { title: "Neue europäische Regelung für Krypto-Assets", excerpt: "Analyse der Auswirkungen der MiCA-Verordnung für Investoren.", author: "Sophie Bernard", date: "10. Januar 2024", category: "regulation" },
          { title: "Wirtschaftstrends 2024: Expertenprognosen", excerpt: "Die wichtigsten Trends, die die europäische Wirtschaft dieses Jahr prägen werden.", author: "Jean-Claude Moreau", date: "8. Januar 2024", category: "economy" },
          { title: "ESG-Investment: Performance und Impact", excerpt: "Wie man Rentabilität und Umweltverantwortung bei Investitionen verbindet.", author: "Émilie Rousseau", date: "5. Januar 2024", category: "esg" },
          { title: "Finanzbildung: Die Grundlagen des Investierens", excerpt: "Praktischer Leitfaden für den Einstieg in Investitionen.", author: "Marc Lefebvre", date: "3. Januar 2024", category: "education" },
          { title: "Steueroptimierung 2024: Neuerungen und Strategien", excerpt: "Die neuesten steuerlichen Entwicklungen und Optimierungsstrategien.", author: "Anne Durand", date: "1. Januar 2024", category: "economy" }
        ],
        trending: [
          { title: "Wie man seinen Immobilienkreditzins verhandelt" },
          { title: "In Mietimmobilien investieren 2024" },
          { title: "Die besten europäischen Lebensversicherungen" },
          { title: "Unternehmen gründen: Finanzierungsleitfaden" },
          { title: "Altersvorsorge: Lösungen vergleichen" }
        ]
      }
    }
  },
  pl: {
    menu: { home: "Strona główna", services: "Usługi", simulator: "Symulator", request: "Wniosek", about: "O nas", contact: "Kontakt", faq: "FAQ", careers: "Kariery", partners: "Partnerzy", blog: "Blog" },
    blog: {
      badge: "Ekspertyza i Analiza", title: "Blog Aurex", subtitle: "K-pital", description: "Analizy ekspertów, trendy rynkowe i praktyczne porady dla optymalizacji decyzji finansowych.",
      stats: { articles: { value: "150+", label: "Opublikowane artykuły" }, experts: { value: "8", label: "Eksperci autorzy" }, readers: { value: "50K+", label: "Miesięczni czytelnicy" }, satisfaction: { value: "95%", label: "Satysfakcja czytelników" } },
      featured: { title: "Artykuł główny" }, search: { placeholder: "Szukaj artykułu...", allCategories: "Wszystkie kategorie" },
      categories: { title: "Kategorie", innovation: "Innowacje", realEstate: "Nieruchomości", regulation: "Regulacje", economy: "Ekonomia", esg: "ESG", education: "Edukacja" },
      trending: { title: "Trendy" }, newsletter: { title: "Newsletter", description: "Otrzymuj nasze najnowsze artykuły bezpośrednio na email", placeholder: "Twój email", subscribe: "Zapisz się", disclaimer: "Maksymalnie 1 email tygodniowo." },
      actions: { readMore: "Czytaj pełny artykuł", read: "Czytaj", loadMore: "Załaduj więcej artykułów", readTime: "czytania" },
      content: {
        featuredArticle: { title: "Sztuczna inteligencja rewolucjonizuje europejski sektor finansowy", excerpt: "Odkryj, jak nowe technologie transformują usługi bankowe i inwestycyjne.", author: "Dr. Marie Dubois", role: "Dyrektor Innowacji FinTech", date: "15 stycznia 2024", category: "innovation" },
        articles: [
          { title: "Kompletny przewodnik po kredycie hipotecznym 2024", excerpt: "Wszystko co musisz wiedzieć o aktualnych warunkach rynku nieruchomości.", author: "Pierre Martin", date: "12 stycznia 2024", category: "realEstate" }
        ],
        trending: [{ title: "Jak negocjować oprocentowanie kredytu hipotecznego" }]
      }
    }
  },
  fi: { 
    menu: { blog: "Blogi" }, 
    blog: { 
      badge: "Asiantuntemus", 
      title: "Aurex Blogi", 
      subtitle: "K-pital",
      description: "Asiantuntija-analyysit, markkinatrendit ja käytännön neuvot rahoitus- ja investointipäätöstenne optimointiin.",
      featured: { title: "Pääartikkeli" },
      search: { placeholder: "Etsi artikkeli...", allCategories: "Kaikki kategoriat" },
      categories: { title: "Kategoriat", innovation: "Innovaatio", realEstate: "Kiinteistöt", regulation: "Säännökset", economy: "Talous", esg: "ESG", education: "Koulutus" }, 
      trending: { title: "Trendit" },
      newsletter: { title: "Uutiskirje", description: "Saa uusimmat artikkelit ja analyysit suoraan sähköpostiisi", placeholder: "Sähköpostisi", subscribe: "Tilaa", disclaimer: "Enintään 1 sähköposti viikossa." },
      actions: { readMore: "Lue koko artikkeli", read: "Lue", loadMore: "Lataa lisää artikkeleita", readTime: "lukuaika" } 
    } 
  },
  es: { 
    menu: { blog: "Blog" }, 
    blog: { 
      badge: "Experiencia", 
      title: "Blog Aurex", 
      subtitle: "K-pital",
      description: "Análisis de expertos, tendencias del mercado y consejos prácticos para optimizar sus decisiones financieras e inversiones.",
      featured: { title: "Artículo destacado" },
      search: { placeholder: "Buscar artículo...", allCategories: "Todas las categorías" },
      categories: { title: "Categorías", innovation: "Innovación", realEstate: "Inmobiliario", regulation: "Regulación", economy: "Economía", esg: "ESG", education: "Educación" }, 
      trending: { title: "Tendencias" },
      newsletter: { title: "Newsletter", description: "Reciba nuestros últimos artículos y análisis directamente en su buzón", placeholder: "Su email", subscribe: "Suscribirse", disclaimer: "Máximo 1 email por semana." },
      actions: { readMore: "Leer artículo completo", read: "Leer", loadMore: "Cargar más artículos", readTime: "de lectura" } 
    } 
  },
  pt: { 
    menu: { blog: "Blog" }, 
    blog: { 
      badge: "Perícia", 
      title: "Blog Aurex", 
      subtitle: "K-pital",
      description: "Análises de especialistas, tendências de mercado e conselhos práticos para otimizar suas decisões financeiras e investimentos.",
      featured: { title: "Artigo em destaque" },
      search: { placeholder: "Procurar artigo...", allCategories: "Todas as categorias" },
      categories: { title: "Categorias", innovation: "Inovação", realEstate: "Imobiliário", regulation: "Regulamentação", economy: "Economia", esg: "ESG", education: "Educação" }, 
      trending: { title: "Tendências" },
      newsletter: { title: "Newsletter", description: "Receba os nossos últimos artigos e análises diretamente na sua caixa de correio", placeholder: "O seu email", subscribe: "Subscrever", disclaimer: "Máximo 1 email por semana." },
      actions: { readMore: "Ler artigo completo", read: "Ler", loadMore: "Carregar mais artigos", readTime: "de leitura" } 
    } 
  },
  el: { 
    menu: { blog: "Ιστολόγιο" }, 
    blog: { 
      badge: "Εμπειρογνωμοσύνη", 
      title: "Aurex Blog", 
      subtitle: "K-pital",
      description: "Αναλύσεις ειδικών, τάσεις αγοράς και πρακτικές συμβουλές για τη βελτιστοποίηση των χρηματοοικονομικών και επενδυτικών σας αποφάσεων.",
      featured: { title: "Κύριο άρθρο" },
      search: { placeholder: "Αναζήτηση άρθρου...", allCategories: "Όλες οι κατηγορίες" },
      categories: { title: "Κατηγορίες", innovation: "Καινοτομία", realEstate: "Ακίνητα", regulation: "Κανονισμοί", economy: "Οικονομία", esg: "ESG", education: "Εκπαίδευση" }, 
      trending: { title: "Τάσεις" },
      newsletter: { title: "Newsletter", description: "Λάβετε τα τελευταία μας άρθρα και αναλύσεις απευθείας στο γραμματοκιβώτιό σας", placeholder: "Το email σας", subscribe: "Εγγραφή", disclaimer: "Μέγιστο 1 email την εβδομάδα." },
      actions: { readMore: "Διαβάστε το πλήρες άρθρο", read: "Διαβάστε", loadMore: "Φορτώστε περισσότερα άρθρα", readTime: "ανάγνωσης" } 
    } 
  },
  it: { 
    menu: { blog: "Blog" }, 
    blog: { 
      badge: "Competenza", 
      title: "Blog Aurex", 
      subtitle: "K-pital",
      description: "Analisi di esperti, tendenze di mercato e consigli pratici per ottimizzare le vostre decisioni finanziarie e di investimento.",
      featured: { title: "Articolo in evidenza" },
      search: { placeholder: "Cerca articolo...", allCategories: "Tutte le categorie" },
      categories: { title: "Categorie", innovation: "Innovazione", realEstate: "Immobiliare", regulation: "Regolamentazione", economy: "Economia", esg: "ESG", education: "Educazione" }, 
      trending: { title: "Tendenze" },
      newsletter: { title: "Newsletter", description: "Ricevete i nostri ultimi articoli e analisi direttamente nella vostra casella di posta", placeholder: "La vostra email", subscribe: "Iscriversi", disclaimer: "Massimo 1 email a settimana." },
      actions: { readMore: "Leggi l'articolo completo", read: "Leggi", loadMore: "Carica più articoli", readTime: "di lettura" } 
    } 
  }
};

export default translations;
