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
    footer: {
      tools: "Narzędzia",
      company: "Firma",
      legal: "Prawne",
      privacyPolicy: "Polityka prywatności",
      terms: "Regulamin",
      mentions: "Informacje prawne",
      gdpr: "RODO",
      rights: "© 2024 Aurex K-pital. Wszelkie prawa zastrzeżone.",
      description: "Twój zaufany partner finansowy od 1997 roku. Doskonałość, innowacja i ekspertyza dla wszystkich Twoich projektów finansowych w Europie.",
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
        careers: "Kariery",
        blog: "Blog",
        legal: "Informacje prawne",
        privacy: "Polityka prywatności",
        terms: "Regulamin",
        gdpr: "RODO"
      }
    },
    partners: {
      title: "Nasi Zaufani Partnerzy",
      description: "Europejska sieć doskonałości oferująca najlepsze rozwiązania finansowe",
      stats: "Ponad 25 partnerów europejskich • 27 krajów objętych • 2,5 mln€ wolumenu transakcji"
    },
    home: {
      hero: {
        title: "Twój Partner Finansowy",
        subtitle: "od 1997 roku",
        description: "Doskonałość, innowacja i zaufanie dla wszystkich Twoich projektów finansowych",
        ctaBtn: "Odkryj nasze rozwiązania",
        simulateBtn: "Symuluj pożyczkę",
        scrollText: "Odkryj"
      },
      cta: {
        title: "Gotowy, aby przekształcić",
        titleHighlight: "swoje projekty",
        titleEnd: "w rzeczywistość?",
        description: "Nasi eksperci towarzyszą Ci na każdym kroku, aby urzeczywistnić Twoje ambicje finansowe."
      }
    },
    testimonials: {
      title: "Oni nam ufają",
      subtitle: "Co mówią nasi zadowoleni klienci"
    },
    blog: {
      badge: "Ekspertyza i Analiza",
      title: "Blog Aurex",
      subtitle: "K-pital",
      description: "Analizy ekspertów, trendy rynkowe i praktyczne porady dla optymalizacji decyzji finansowych i inwestycyjnych.",
      stats: {
        articles: { value: "150+", label: "Opublikowane artykuły" },
        experts: { value: "8", label: "Eksperci autorzy" },
        readers: { value: "50K+", label: "Miesięczni czytelnicy" },
        satisfaction: { value: "95%", label: "Satysfakcja czytelników" }
      },
      featured: { title: "Artykuł główny" },
      search: { placeholder: "Szukaj artykułu...", allCategories: "Wszystkie kategorie" },
      categories: {
        title: "Kategorie",
        innovation: "Innowacje",
        realEstate: "Nieruchomości",
        regulation: "Regulacje",
        economy: "Ekonomia",
        esg: "ESG",
        education: "Edukacja"
      },
      trending: { title: "Trendy" },
      newsletter: {
        title: "Newsletter",
        description: "Otrzymuj nasze najnowsze artykuły i analizy bezpośrednio na email",
        placeholder: "Twój email",
        subscribe: "Zapisz się",
        disclaimer: "Maksymalnie 1 email tygodniowo. Łatwa rezygnacja."
      },
      actions: {
        readMore: "Czytaj pełny artykuł",
        read: "Czytaj",
        loadMore: "Załaduj więcej artykułów",
        readTime: "min czytania"
      },
      content: {
        featuredArticle: {
          title: "Sztuczna inteligencja rewolucjonizuje europejski sektor finansowy",
          excerpt: "Odkryj, jak nowe technologie transformują usługi bankowe i inwestycyjne, oferując europejskim klientom bardziej spersonalizowane i efektywne rozwiązania.",
          author: "Dr. Marie Dubois",
          role: "Dyrektor Innowacji FinTech",
          date: "15 stycznia 2024",
          category: "innovation"
        },
        articles: [
          { title: "Kompletny przewodnik po kredycie hipotecznym 2024", excerpt: "Wszystko co musisz wiedzieć o aktualnych warunkach rynku nieruchomości.", author: "Pierre Martin", date: "12 stycznia 2024", category: "realEstate" },
          { title: "Nowe europejskie regulacje dotyczące krypto-aktywów", excerpt: "Analiza wpływu rozporządzenia MiCA na inwestorów.", author: "Sophie Bernard", date: "10 stycznia 2024", category: "regulation" },
          { title: "Trendy ekonomiczne 2024: prognozy ekspertów", excerpt: "Główne trendy, które będą kształtować europejską gospodarkę w tym roku.", author: "Jean-Claude Moreau", date: "8 stycznia 2024", category: "economy" },
          { title: "Inwestycje ESG: wydajność i wpływ", excerpt: "Jak połączyć rentowność z odpowiedzialnością środowiskową w inwestycjach.", author: "Émilie Rousseau", date: "5 stycznia 2024", category: "esg" },
          { title: "Edukacja finansowa: podstawy inwestowania", excerpt: "Praktyczny przewodnik dla początkujących inwestorów.", author: "Marc Lefebvre", date: "3 stycznia 2024", category: "education" },
          { title: "Optymalizacja podatkowa 2024: nowości i strategie", excerpt: "Najnowsze zmiany podatkowe i strategie optymalizacji.", author: "Anne Durand", date: "1 stycznia 2024", category: "economy" }
        ],
        trending: [
          { title: "Jak negocjować oprocentowanie kredytu hipotecznego" },
          { title: "Inwestowanie w nieruchomości na wynajem 2024" },
          { title: "Najlepsze europejskie ubezpieczenia na życie" },
          { title: "Zakładanie firmy: przewodnik finansowania" },
          { title: "Emerytura: porównanie rozwiązań" }
        ]
      }
    }
  },
  fi: { 
    menu: { home: "Etusivu", services: "Palvelut", simulator: "Simulaattori", request: "Hakemus", about: "Meistä", contact: "Yhteystiedot", faq: "UKK", careers: "Urat", partners: "Kumppanit", blog: "Blogi" },
    footer: {
      tools: "Työkalut",
      company: "Yritys", 
      legal: "Laillinen",
      privacyPolicy: "Tietosuojakäytäntö",
      terms: "Käyttöehdot",
      mentions: "Oikeudellinen",
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Kaikki oikeudet pidätetään.",
      description: "Luotettava rahoituskumppanisi vuodesta 1997. Huippuosaamista, innovaatiota ja asiantuntemusta kaikille rahoitusprojekteillesi Euroopassa.",
      services: "Palvelut",
      copyright: "© 2024 Aurex K-pital. Kaikki oikeudet pidätetään.",
      establishment: "Lisensoitu rahoituslaitos Euroopassa"
    },
    partners: {
      title: "Luotettavat Kumppanimme",
      description: "Eurooppalainen huippuosaamisen verkosto tarjoamassa parhaat rahoitusratkaisut",
      stats: "Yli 25 eurooppalaista kumppania • 27 katettu maata • 2,5 milj€ transaktiomäärä"
    },
    home: {
      hero: {
        title: "Rahoituskumppanisi",
        subtitle: "vuodesta 1997",
        description: "Huippuosaamista, innovaatiota ja luottamusta kaikille rahoitusprojekteillesi",
        ctaBtn: "Tutustu ratkaisuihimme",
        simulateBtn: "Simuloi lainaa",
        scrollText: "Tutustu"
      },
      cta: {
        title: "Valmis muuttamaan",
        titleHighlight: "projektisi",
        titleEnd: "todellisuudeksi?",
        description: "Asiantuntijamme tukevat sinua jokaisessa vaiheessa rahoitustavoitteidesi toteuttamisessa."
      }
    },
    testimonials: {
      title: "He luottavat meihin",
      subtitle: "Mitä tyytyväiset asiakkaamme sanovat"
    },
    blog: { 
      badge: "Asiantuntemus ja Analyysi", 
      title: "Aurex Blogi", 
      subtitle: "K-pital",
      description: "Asiantuntija-analyysit, markkinatrendit ja käytännön neuvot rahoitus- ja investointipäätöstenne optimointiin.",
      stats: {
        articles: { value: "150+", label: "Julkaistua artikkelia" },
        experts: { value: "8", label: "Asiantuntija kirjoittajaa" },
        readers: { value: "50K+", label: "Kuukausittaista lukijaa" },
        satisfaction: { value: "95%", label: "Lukijatyytyväisyys" }
      },
      featured: { title: "Pääartikkeli" },
      search: { placeholder: "Etsi artikkeli...", allCategories: "Kaikki kategoriat" },
      categories: { 
        title: "Kategoriat", 
        innovation: "Innovaatio", 
        realEstate: "Kiinteistöt", 
        regulation: "Säännökset", 
        economy: "Talous", 
        esg: "ESG", 
        education: "Koulutus" 
      }, 
      trending: { title: "Trendit" },
      newsletter: { 
        title: "Uutiskirje", 
        description: "Saa uusimmat artikkelit ja analyysit suoraan sähköpostiisi", 
        placeholder: "Sähköpostisi", 
        subscribe: "Tilaa", 
        disclaimer: "Enintään 1 sähköposti viikossa. Helppo peruuttaa." 
      },
      actions: { 
        readMore: "Lue koko artikkeli", 
        read: "Lue", 
        loadMore: "Lataa lisää artikkeleita", 
        readTime: "min lukuaika" 
      },
      content: {
        featuredArticle: {
          title: "Tekoäly mullistaa Euroopan rahoitussektorin",
          excerpt: "Tutustu siihen, miten uudet teknologiat muuttavat pankki- ja sijoituspalveluja tarjoten eurooppalaisille asiakkaille henkilökohtaisempia ja tehokkaampia ratkaisuja.",
          author: "Dr. Marie Dubois",
          role: "FinTech innovaatiojohtaja",
          date: "15. tammikuuta 2024",
          category: "innovation"
        },
        articles: [
          { title: "Täydellinen opas asuntolainaan 2024", excerpt: "Kaikki mitä sinun tarvitsee tietää nykyisistä kiinteistömarkkinoiden olosuhteista.", author: "Pierre Martin", date: "12. tammikuuta 2024", category: "realEstate" },
          { title: "Uudet eurooppalaiset kryptoomaisuussäännökset", excerpt: "MiCA-asetuksen vaikutusten analyysi sijoittajille.", author: "Sophie Bernard", date: "10. tammikuuta 2024", category: "regulation" },
          { title: "Taloudelliset trendit 2024: asiantuntijennusteet", excerpt: "Tärkeimmät trendit, jotka muokkaavat Euroopan taloutta tänä vuonna.", author: "Jean-Claude Moreau", date: "8. tammikuuta 2024", category: "economy" },
          { title: "ESG-sijoittaminen: suorituskyky ja vaikutus", excerpt: "Kuinka yhdistää kannattavuus ja ympäristövastuu sijoituksissa.", author: "Émilie Rousseau", date: "5. tammikuuta 2024", category: "esg" },
          { title: "Rahoituskoulutus: sijoittamisen perusteet", excerpt: "Käytännön opas aloitteleville sijoittajille.", author: "Marc Lefebvre", date: "3. tammikuuta 2024", category: "education" },
          { title: "Verooptimointi 2024: uutuudet ja strategiat", excerpt: "Uusimmat verokehitykset ja optimointistrategiat.", author: "Anne Durand", date: "1. tammikuuta 2024", category: "economy" }
        ],
        trending: [
          { title: "Kuinka neuvotella asuntolainan korko" },
          { title: "Sijoittaminen vuokra-asuntoihin 2024" },
          { title: "Parhaat eurooppalaiset henkivakuutukset" },
          { title: "Yrityksen perustaminen: rahoitusopas" },
          { title: "Eläke: ratkaisujen vertailu" }
        ]
      }
    } 
  },
  es: { 
    menu: { home: "Inicio", services: "Servicios", simulator: "Simulador", request: "Solicitud", about: "Acerca de", contact: "Contacto", faq: "FAQ", careers: "Carreras", partners: "Socios", blog: "Blog" },
    footer: {
      tools: "Herramientas",
      company: "Empresa",
      legal: "Legal", 
      privacyPolicy: "Política de privacidad",
      terms: "Términos y condiciones",
      mentions: "Avisos legales",
      gdpr: "RGPD",
      rights: "© 2024 Aurex K-pital. Todos los derechos reservados.",
      description: "Su socio financiero de confianza desde 1997. Excelencia, innovación y experiencia para todos sus proyectos financieros en Europa.",
      services: "Servicios",
      copyright: "© 2024 Aurex K-pital. Todos los derechos reservados.",
      establishment: "Institución financiera autorizada en Europa"
    },
    partners: {
      title: "Nuestros Socios de Confianza",
      description: "Una red europea de excelencia para ofrecerle las mejores soluciones financieras",
      stats: "Más de 25 socios europeos • 27 países cubiertos • 2,5M€ de volumen tratado"
    },
    home: {
      hero: {
        title: "Su Socio Financiero", 
        subtitle: "desde 1997",
        description: "Excelencia, innovación y confianza para todos sus proyectos financieros",
        ctaBtn: "Descubrir nuestras soluciones",
        simulateBtn: "Simular un préstamo",
        scrollText: "Descubrir"
      },
      cta: {
        title: "¿Listo para transformar",
        titleHighlight: "sus proyectos",
        titleEnd: "en realidad?",
        description: "Nuestros expertos le acompañan en cada paso para materializar sus ambiciones financieras."
      }
    },
    testimonials: {
      title: "Confían en nosotros",
      subtitle: "Lo que dicen nuestros clientes satisfechos"
    },
    blog: { 
      badge: "Experiencia y Análisis", 
      title: "Blog Aurex", 
      subtitle: "K-pital",
      description: "Análisis de expertos, tendencias del mercado y consejos prácticos para optimizar sus decisiones financieras e inversiones.",
      stats: {
        articles: { value: "150+", label: "Artículos publicados" },
        experts: { value: "8", label: "Autores expertos" },
        readers: { value: "50K+", label: "Lectores mensuales" },
        satisfaction: { value: "95%", label: "Satisfacción de lectores" }
      },
      featured: { title: "Artículo destacado" },
      search: { placeholder: "Buscar artículo...", allCategories: "Todas las categorías" },
      categories: { 
        title: "Categorías", 
        innovation: "Innovación", 
        realEstate: "Inmobiliario", 
        regulation: "Regulación", 
        economy: "Economía", 
        esg: "ESG", 
        education: "Educación" 
      }, 
      trending: { title: "Tendencias" },
      newsletter: { 
        title: "Newsletter", 
        description: "Reciba nuestros últimos artículos y análisis directamente en su buzón", 
        placeholder: "Su email", 
        subscribe: "Suscribirse", 
        disclaimer: "Máximo 1 email por semana. Fácil cancelación." 
      },
      actions: { 
        readMore: "Leer artículo completo", 
        read: "Leer", 
        loadMore: "Cargar más artículos", 
        readTime: "min de lectura" 
      },
      content: {
        featuredArticle: {
          title: "La inteligencia artificial revoluciona el sector financiero europeo",
          excerpt: "Descubra cómo las nuevas tecnologías transforman los servicios bancarios y de inversión, ofreciendo a los clientes europeos soluciones más personalizadas y eficientes.",
          author: "Dr. Marie Dubois",
          role: "Directora de Innovación FinTech",
          date: "15 de enero de 2024",
          category: "innovation"
        },
        articles: [
          { title: "Guía completa del crédito hipotecario 2024", excerpt: "Todo lo que necesita saber sobre las condiciones actuales del mercado inmobiliario.", author: "Pierre Martin", date: "12 de enero de 2024", category: "realEstate" },
          { title: "Nueva regulación europea sobre cripto-activos", excerpt: "Análisis del impacto del reglamento MiCA para los inversores.", author: "Sophie Bernard", date: "10 de enero de 2024", category: "regulation" },
          { title: "Tendencias económicas 2024: pronósticos de expertos", excerpt: "Las principales tendencias que darán forma a la economía europea este año.", author: "Jean-Claude Moreau", date: "8 de enero de 2024", category: "economy" },
          { title: "Inversión ESG: rendimiento e impacto", excerpt: "Cómo combinar rentabilidad y responsabilidad ambiental en las inversiones.", author: "Émilie Rousseau", date: "5 de enero de 2024", category: "esg" },
          { title: "Educación financiera: fundamentos de la inversión", excerpt: "Guía práctica para inversores principiantes.", author: "Marc Lefebvre", date: "3 de enero de 2024", category: "education" },
          { title: "Optimización fiscal 2024: novedades y estrategias", excerpt: "Los últimos desarrollos fiscales y estrategias de optimización.", author: "Anne Durand", date: "1 de enero de 2024", category: "economy" }
        ],
        trending: [
          { title: "Cómo negociar el tipo de interés de su hipoteca" },
          { title: "Invertir en inmuebles de alquiler 2024" },
          { title: "Los mejores seguros de vida europeos" },
          { title: "Crear una empresa: guía de financiación" },
          { title: "Jubilación: comparar soluciones" }
        ]
      }
    } 
  },
  pt: { 
    menu: { home: "Início", services: "Serviços", simulator: "Simulador", request: "Pedido", about: "Sobre", contact: "Contacto", faq: "FAQ", careers: "Carreiras", partners: "Parceiros", blog: "Blog" },
    footer: {
      tools: "Ferramentas",
      company: "Empresa",
      legal: "Legal",
      privacyPolicy: "Política de privacidade", 
      terms: "Termos e condições",
      mentions: "Avisos legais",
      gdpr: "RGPD",
      rights: "© 2024 Aurex K-pital. Todos os direitos reservados.",
      description: "O seu parceiro financeiro de confiança desde 1997. Excelência, inovação e expertise para todos os seus projetos financeiros na Europa.",
      services: "Serviços",
      copyright: "© 2024 Aurex K-pital. Todos os direitos reservados.",
      establishment: "Instituição financeira licenciada na Europa"
    },
    partners: {
      title: "Os Nossos Parceiros de Confiança",
      description: "Uma rede europeia de excelência para lhe oferecer as melhores soluções financeiras",
      stats: "Mais de 25 parceiros europeus • 27 países cobertos • 2,5M€ de volume tratado"
    },
      stats: "Mais de 25 parceiros europeus • 27 países cobertos • 2,5 mil milhões€ de volume tratado"
    },
    home: {
      hero: {
        title: "O Seu Parceiro Financeiro",
        subtitle: "desde 1997",
        description: "Excelência, inovação e confiança para todos os seus projetos financeiros",
        ctaBtn: "Descobrir as nossas soluções",
        simulateBtn: "Simular um empréstimo",
        scrollText: "Descobrir"
      },
      cta: {
        title: "Pronto para transformar",
        titleHighlight: "os seus projetos",
        titleEnd: "em realidade?",
        description: "Os nossos especialistas acompanham-no em cada etapa para concretizar as suas ambições financeiras."
      }
    },
    testimonials: {
      title: "Confiam em nós",
      subtitle: "O que dizem os nossos clientes satisfeitos"
    },
    blog: { 
      badge: "Perícia e Análise", 
      title: "Blog Aurex", 
      subtitle: "K-pital",
      description: "Análises de especialistas, tendências de mercado e conselhos práticos para otimizar as suas decisões financeiras e investimentos.",
      stats: {
        articles: { value: "150+", label: "Artigos publicados" },
        experts: { value: "8", label: "Autores especialistas" },
        readers: { value: "50K+", label: "Leitores mensais" },
        satisfaction: { value: "95%", label: "Satisfação dos leitores" }
      },
      featured: { title: "Artigo em destaque" },
      search: { placeholder: "Procurar artigo...", allCategories: "Todas as categorias" },
      categories: { 
        title: "Categorias", 
        innovation: "Inovação", 
        realEstate: "Imobiliário", 
        regulation: "Regulamentação", 
        economy: "Economia", 
        esg: "ESG", 
        education: "Educação" 
      }, 
      trending: { title: "Tendências" },
      newsletter: { 
        title: "Newsletter", 
        description: "Receba os nossos últimos artigos e análises diretamente na sua caixa de correio", 
        placeholder: "O seu email", 
        subscribe: "Subscrever", 
        disclaimer: "Máximo 1 email por semana. Cancelamento fácil." 
      },
      actions: { 
        readMore: "Ler o artigo completo", 
        read: "Ler", 
        loadMore: "Carregar mais artigos", 
        readTime: "min de leitura" 
      },
      content: {
        featuredArticle: {
          title: "A inteligência artificial revoluciona o setor financeiro europeu",
          excerpt: "Descubra como as novas tecnologias transformam os serviços bancários e de investimento, oferecendo aos clientes europeus soluções mais personalizadas e eficientes.",
          author: "Dr. Marie Dubois",
          role: "Diretora de Inovação FinTech",
          date: "15 de janeiro de 2024",
          category: "innovation"
        },
        articles: [
          { title: "Guia completo do crédito habitação 2024", excerpt: "Tudo o que precisa de saber sobre as condições atuais do mercado imobiliário.", author: "Pierre Martin", date: "12 de janeiro de 2024", category: "realEstate" },
          { title: "Nova regulamentação europeia sobre cripto-ativos", excerpt: "Análise do impacto do regulamento MiCA para os investidores.", author: "Sophie Bernard", date: "10 de janeiro de 2024", category: "regulation" },
          { title: "Tendências económicas 2024: previsões de especialistas", excerpt: "As principais tendências que moldarão a economia europeia este ano.", author: "Jean-Claude Moreau", date: "8 de janeiro de 2024", category: "economy" },
          { title: "Investimento ESG: desempenho e impacto", excerpt: "Como combinar rentabilidade e responsabilidade ambiental nos investimentos.", author: "Émilie Rousseau", date: "5 de janeiro de 2024", category: "esg" },
          { title: "Educação financeira: fundamentos do investimento", excerpt: "Guia prático para investidores iniciantes.", author: "Marc Lefebvre", date: "3 de janeiro de 2024", category: "education" },
          { title: "Otimização fiscal 2024: novidades e estratégias", excerpt: "Os últimos desenvolvimentos fiscais e estratégias de otimização.", author: "Anne Durand", date: "1 de janeiro de 2024", category: "economy" }
        ],
        trending: [
          { title: "Como negociar a taxa de juro do crédito habitação" },
          { title: "Investir em imóveis para arrendamento 2024" },
          { title: "Os melhores seguros de vida europeus" },
          { title: "Criar uma empresa: guia de financiamento" },
          { title: "Reforma: comparar soluções" }
        ]
      }
    } 
  },
  el: { 
    menu: { home: "Αρχική", services: "Υπηρεσίες", simulator: "Προσομοιωτής", request: "Αίτηση", about: "Σχετικά", contact: "Επικοινωνία", faq: "Συχνές ερωτήσεις", careers: "Καριέρες", partners: "Συνεργάτες", blog: "Ιστολόγιο" },
    footer: {
      tools: "Εργαλεία",
      company: "Εταιρεία",
      legal: "Νομικά",
      privacyPolicy: "Πολιτική απορρήτου",
      terms: "Όροι και προϋποθέσεις",
      mentions: "Νομικές αναφορές", 
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Όλα τα δικαιώματα διατηρούνται.",
      description: "Ο αξιόπιστος χρηματοοικονομικός σας εταίρος από το 1997. Αριστεία, καινοτομία και εμπειρογνωμοσύνη για όλα τα χρηματοοικονομικά σας έργα στην Ευρώπη.",
      services: "Υπηρεσίες",
      copyright: "© 2024 Aurex K-pital. Όλα τα δικαιώματα διατηρούνται.",
      establishment: "Αδειοδοτημένο χρηματοπιστωτικό ίδρυμα στην Ευρώπη"
    },
    partners: {
      title: "Οι Αξιόπιστοι Συνεργάτες μας",
      description: "Ένα ευρωπαϊκό δίκτυο αριστείας για να σας προσφέρουμε τις καλύτερες χρηματοοικονομικές λύσεις",
      stats: "Πάνω από 25 ευρωπαίους εταίρους • 27 καλυπτόμενες χώρες • 2,5Μ€ όγκος συναλλαγών"
    },
      stats: "Πάνω από 25 ευρωπαίους συνεργάτες • 27 χώρες κάλυψης • 2,5 δισ.€ όγκου συναλλαγών"
    },
    home: {
      hero: {
        title: "Ο Χρηματοοικονομικός σας Εταίρος",
        subtitle: "από το 1997",
        description: "Αριστεία, καινοτομία και εμπιστοσύνη για όλα τα χρηματοοικονομικά σας έργα",
        ctaBtn: "Ανακαλύψτε τις λύσεις μας",
        simulateBtn: "Προσομοιώστε ένα δάνειο", 
        scrollText: "Ανακαλύψτε"
      },
      cta: {
        title: "Έτοιμοι να μετατρέψετε",
        titleHighlight: "τα έργα σας",
        titleEnd: "σε πραγματικότητα;",
        description: "Οι ειδικοί μας σας συνοδεύουν σε κάθε βήμα για να υλοποιήσετε τις χρηματοοικονομικές σας φιλοδοξίες."
      }
    },
    testimonials: {
      title: "Μας εμπιστεύονται",
      subtitle: "Τι λένε οι ικανοποιημένοι πελάτες μας"
    },
    blog: { 
      badge: "Εμπειρογνωμοσύνη και Ανάλυση", 
      title: "Aurex Blog", 
      subtitle: "K-pital",
      description: "Αναλύσεις ειδικών, τάσεις αγοράς και πρακτικές συμβουλές για τη βελτιστοποίηση των χρηματοοικονομικών και επενδυτικών σας αποφάσεων.",
      stats: {
        articles: { value: "150+", label: "Δημοσιευμένα άρθρα" },
        experts: { value: "8", label: "Συγγραφείς ειδικοί" },
        readers: { value: "50K+", label: "Μηνιαίοι αναγνώστες" },
        satisfaction: { value: "95%", label: "Ικανοποίηση αναγνωστών" }
      },
      featured: { title: "Κύριο άρθρο" },
      search: { placeholder: "Αναζήτηση άρθρου...", allCategories: "Όλες οι κατηγορίες" },
      categories: { 
        title: "Κατηγορίες", 
        innovation: "Καινοτομία", 
        realEstate: "Ακίνητα", 
        regulation: "Κανονισμοί", 
        economy: "Οικονομία", 
        esg: "ESG", 
        education: "Εκπαίδευση" 
      }, 
      trending: { title: "Τάσεις" },
      newsletter: { 
        title: "Newsletter", 
        description: "Λάβετε τα τελευταία μας άρθρα και αναλύσεις απευθείας στο γραμματοκιβώτιό σας", 
        placeholder: "Το email σας", 
        subscribe: "Εγγραφή", 
        disclaimer: "Μέγιστο 1 email την εβδομάδα. Εύκολη ακύρωση." 
      },
      actions: { 
        readMore: "Διαβάστε το πλήρες άρθρο", 
        read: "Διαβάστε", 
        loadMore: "Φορτώστε περισσότερα άρθρα", 
        readTime: "λεπτά ανάγνωσης" 
      },
      content: {
        featuredArticle: {
          title: "Η τεχνητή νοημοσύνη επαναστατεί στον ευρωπαϊκό χρηματοπιστωτικό τομέα",
          excerpt: "Ανακαλύψτε πώς οι νέες τεχνολογίες μεταμορφώνουν τις τραπεζικές και επενδυτικές υπηρεσίες, προσφέροντας στους ευρωπαίους πελάτες πιο εξατομικευμένες και αποτελεσματικές λύσεις.",
          author: "Δρ. Marie Dubois",
          role: "Διευθύντρια Καινοτομίας FinTech",
          date: "15 Ιανουαρίου 2024",
          category: "innovation"
        },
        articles: [
          { title: "Πλήρης οδηγός στεγαστικού δανείου 2024", excerpt: "Όλα όσα χρειάζεται να γνωρίζετε για τις τρέχουσες συνθήκες της αγοράς ακινήτων.", author: "Pierre Martin", date: "12 Ιανουαρίου 2024", category: "realEstate" },
          { title: "Νέα ευρωπαϊκή νομοθεσία για κρυπτο-περιουσιακά στοιχεία", excerpt: "Ανάλυση της επίδρασης του κανονισμού MiCA για τους επενδυτές.", author: "Sophie Bernard", date: "10 Ιανουαρίου 2024", category: "regulation" },
          { title: "Οικονομικές τάσεις 2024: προβλέψεις ειδικών", excerpt: "Οι κύριες τάσεις που θα διαμορφώσουν την ευρωπαϊκή οικονομία φέτος.", author: "Jean-Claude Moreau", date: "8 Ιανουαρίου 2024", category: "economy" },
          { title: "Επένδυση ESG: απόδοση και επίδραση", excerpt: "Πώς να συνδυάσετε κερδοφορία και περιβαλλοντική υπευθυνότητα στις επενδύσεις.", author: "Émilie Rousseau", date: "5 Ιανουαρίου 2024", category: "esg" },
          { title: "Χρηματοοικονομική εκπαίδευση: βάσεις επένδυσης", excerpt: "Πρακτικός οδηγός για αρχάριους επενδυτές.", author: "Marc Lefebvre", date: "3 Ιανουαρίου 2024", category: "education" },
          { title: "Φορολογική βελτιστοποίηση 2024: νέα και στρατηγικές", excerpt: "Οι τελευταίες φορολογικές εξελίξεις και στρατηγικές βελτιστοποίησης.", author: "Anne Durand", date: "1 Ιανουαρίου 2024", category: "economy" }
        ],
        trending: [
          { title: "Πώς να διαπραγματευτείτε το επιτόκιο του στεγαστικού σας δανείου" },
          { title: "Επένδυση σε ενοικιαζόμενα ακίνητα 2024" },
          { title: "Οι καλύτερες ευρωπαϊκές ασφάλειες ζωής" },
          { title: "Δημιουργία εταιρείας: οδηγός χρηματοδότησης" },
          { title: "Σύνταξη: σύγκριση λύσεων" }
        ]
      }
    } 
  },
  it: { 
    menu: { home: "Home", services: "Servizi", simulator: "Simulatore", request: "Richiesta", about: "Chi siamo", contact: "Contatto", faq: "FAQ", careers: "Carriere", partners: "Partner", blog: "Blog" },
    footer: {
      tools: "Strumenti",
      company: "Azienda",
      legal: "Legale",
      privacyPolicy: "Politica sulla privacy",
      terms: "Termini e condizioni",
      mentions: "Note legali",
      gdpr: "GDPR", 
      rights: "© 2024 Aurex K-pital. Tutti i diritti riservati.",
      description: "Il vostro partner finanziario di fiducia dal 1997. Eccellenza, innovazione ed expertise per tutti i vostri progetti finanziari in Europa.",
      services: "Servizi",
      copyright: "© 2024 Aurex K-pital. Tutti i diritti riservati.",
      establishment: "Istituzione finanziaria autorizzata in Europa"
    },
    partners: {
      title: "I Nostri Partner di Fiducia",
      description: "Una rete europea di eccellenza per offrirvi le migliori soluzioni finanziarie",
      stats: "Oltre 25 partner europei • 27 paesi coperti • 2,5M€ di volume trattato"
    }
      stats: "Oltre 25 partner europei • 27 paesi coperti • 2,5 miliardi€ di volume trattato"
    },
    home: {
      hero: {
        title: "Il Vostro Partner Finanziario",
        subtitle: "dal 1997",
        description: "Eccellenza, innovazione e fiducia per tutti i vostri progetti finanziari",
        ctaBtn: "Scoprire le nostre soluzioni",
        simulateBtn: "Simulare un prestito",
        scrollText: "Scoprire"
      },
      cta: {
        title: "Pronti a trasformare",
        titleHighlight: "i vostri progetti",
        titleEnd: "in realtà?",
        description: "I nostri esperti vi accompagnano ad ogni passo per concretizzare le vostre ambizioni finanziarie."
      }
    },
    testimonials: {
      title: "Si fidano di noi",
      subtitle: "Cosa dicono i nostri clienti soddisfatti"
    },
    blog: { 
      badge: "Competenza e Analisi", 
      title: "Blog Aurex", 
      subtitle: "K-pital",
      description: "Analisi di esperti, tendenze di mercato e consigli pratici per ottimizzare le vostre decisioni finanziarie e di investimento.",
      stats: {
        articles: { value: "150+", label: "Articoli pubblicati" },
        experts: { value: "8", label: "Autori esperti" },
        readers: { value: "50K+", label: "Lettori mensili" },
        satisfaction: { value: "95%", label: "Soddisfazione lettori" }
      },
      featured: { title: "Articolo in evidenza" },
      search: { placeholder: "Cerca articolo...", allCategories: "Tutte le categorie" },
      categories: { 
        title: "Categorie", 
        innovation: "Innovazione", 
        realEstate: "Immobiliare", 
        regulation: "Regolamentazione", 
        economy: "Economia", 
        esg: "ESG", 
        education: "Educazione" 
      }, 
      trending: { title: "Tendenze" },
      newsletter: { 
        title: "Newsletter", 
        description: "Ricevete i nostri ultimi articoli e analisi direttamente nella vostra casella di posta", 
        placeholder: "La vostra email", 
        subscribe: "Iscriversi", 
        disclaimer: "Massimo 1 email a settimana. Facile cancellazione." 
      },
      actions: { 
        readMore: "Leggi l'articolo completo", 
        read: "Leggi", 
        loadMore: "Carica più articoli", 
        readTime: "min di lettura" 
      },
      content: {
        featuredArticle: {
          title: "L'intelligenza artificiale rivoluziona il settore finanziario europeo",
          excerpt: "Scoprite come le nuove tecnologie trasformano i servizi bancari e di investimento, offrendo ai clienti europei soluzioni più personalizzate ed efficienti.",
          author: "Dr. Marie Dubois",
          role: "Direttrice Innovazione FinTech",
          date: "15 gennaio 2024",
          category: "innovation"
        },
        articles: [
          { title: "Guida completa al mutuo casa 2024", excerpt: "Tutto quello che dovete sapere sulle condizioni attuali del mercato immobiliare.", author: "Pierre Martin", date: "12 gennaio 2024", category: "realEstate" },
          { title: "Nuova regolamentazione europea sui cripto-asset", excerpt: "Analisi dell'impatto del regolamento MiCA per gli investitori.", author: "Sophie Bernard", date: "10 gennaio 2024", category: "regulation" },
          { title: "Tendenze economiche 2024: previsioni degli esperti", excerpt: "Le principali tendenze che plasmeranno l'economia europea quest'anno.", author: "Jean-Claude Moreau", date: "8 gennaio 2024", category: "economy" },
          { title: "Investimenti ESG: performance e impatto", excerpt: "Come combinare redditività e responsabilità ambientale negli investimenti.", author: "Émilie Rousseau", date: "5 gennaio 2024", category: "esg" },
          { title: "Educazione finanziaria: fondamenti degli investimenti", excerpt: "Guida pratica per investitori principianti.", author: "Marc Lefebvre", date: "3 gennaio 2024", category: "education" },
          { title: "Ottimizzazione fiscale 2024: novità e strategie", excerpt: "Gli ultimi sviluppi fiscali e strategie di ottimizzazione.", author: "Anne Durand", date: "1 gennaio 2024", category: "economy" }
        ],
        trending: [
          { title: "Come negoziare il tasso di interesse del mutuo" },
          { title: "Investire in immobili in affitto 2024" },
          { title: "Le migliori assicurazioni vita europee" },
          { title: "Creare un'azienda: guida al finanziamento" },
          { title: "Pensione: confrontare le soluzioni" }
        ]
      }
    } 
  }
};

export default translations;
