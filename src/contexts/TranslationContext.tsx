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
    about: {
      badge: "Excellence depuis 1997",
      title: "Votre partenaire financier de confiance",
      subtitle: "Depuis plus de 25 ans, nous accompagnons les entreprises européennes dans leur développement avec des solutions de financement innovantes et personnalisées.",
      hero: {
        cta: {
          contact: "Nous contacter",
          simulate: "Simuler mon financement"
        }
      },
      stats: {
        experience: {
          value: "25+",
          label: "Années d'expérience"
        },
        companies: {
          value: "50K+",
          label: "Entreprises accompagnées"
        },
        funding: {
          value: "€5B+",
          label: "Financements facilités"
        },
        countries: {
          value: "8",
          label: "Pays européens"
        }
      },
      values: {
        badge: "Nos Valeurs",
        title: "Ce qui nous guide au quotidien",
        description: "Notre réussite repose sur des valeurs fortes qui orientent chacune de nos actions et décisions.",
        security: {
          title: "Sécurité & Conformité",
          description: "Nos solutions respectent les normes bancaires les plus strictes et la réglementation RGPD."
        },
        innovation: {
          title: "Innovation Continue",
          description: "Nous développons constamment de nouvelles solutions pour anticiper vos besoins futurs."
        },
        support: {
          title: "Accompagnement Personnel",
          description: "Chaque client bénéficie d'un conseiller dédié pour un service sur mesure."
        },
        excellence: {
          title: "Excellence Reconnue",
          description: "Plus de 25 ans d'expertise et la confiance de milliers d'entreprises."
        }
      },
      history: {
        badge: "Notre Histoire",
        title: "Plus de 25 ans d'innovation",
        description: "Découvrez les moments clés qui ont façonné notre entreprise et notre expertise.",
        milestone1: {
          title: "Création de l'entreprise",
          description: "Fondation avec la vision de démocratiser l'accès au financement pour les PME."
        },
        milestone2: {
          title: "Expansion européenne",
          description: "Ouverture de bureaux en Allemagne, Pologne et Espagne."
        },
        milestone3: {
          title: "Innovation digitale",
          description: "Lancement de notre plateforme de simulation en ligne révolutionnaire."
        },
        milestone4: {
          title: "50 000ème client",
          description: "Franchissement du cap des 50 000 entreprises accompagnées."
        },
        milestone5: {
          title: "€5 milliards financés",
          description: "Atteinte du record de 5 milliards d'euros de financements facilités."
        }
      },
      team: {
        badge: "Notre Équipe",
        title: "L'expertise au service de votre réussite",
        description: "Rencontrez les experts qui pilotent notre vision et accompagnent votre croissance.",
        member1: {
          name: "Marie Dubois",
          role: "Directrice Générale",
          experience: "15 ans d'expérience en financement d'entreprise"
        },
        member2: {
          name: "Thomas Schmidt",
          role: "Directeur Technique",
          experience: "Expert en solutions fintech et sécurité bancaire"
        },
        member3: {
          name: "Elena Rodriguez",
          role: "Directrice Commerciale",
          experience: "Spécialiste des marchés européens depuis 12 ans"
        }
      },
      cta: {
        title: "Prêt à développer votre entreprise ?",
        description: "Rejoignez plus de 50 000 entreprises qui nous font confiance pour leurs besoins de financement.",
        simulate: "Commencer la simulation",
        expert: "Parler à un expert"
      },
      blog: {
        badge: "Expertise & Insights",
        title: "Blog Aurex",
        subtitle: "K-pital",
        description: "Analyses d'experts, tendances du marché et conseils pratiques pour optimiser vos décisions financières et d'investissement.",
        stats: {
          articles: {
            value: "150+",
            label: "Articles publiés"
          },
          experts: {
            value: "8",
            label: "Experts auteurs"
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
          title: "Article à la Une"
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
          disclaimer: "1 email par semaine maximum. Désabonnement facile."
        },
        actions: {
          readMore: "Lire l'article complet",
          read: "Lire",
          loadMore: "Charger plus d'articles",
          readTime: "de lecture"
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
    },
    about: {
      badge: "Exzellenz seit 1997",
      title: "Ein Vierteljahrhundert",
      subtitle: "Finanzinnovation",
      description: "Von Hamburg aus revolutionieren wir die Finanzberatung durch die Kombination traditioneller menschlicher Expertise mit modernster Technologie.",
      story: {
        title: "Unsere Geschichte",
        subtitle: "Von einem Hamburger Startup zum europäischen Marktführer der Finanzinnovation",
        paragraph1: "Aurex K-pital entstand 1997 aus der visionären Idee, die europäischen Finanzdienstleistungen zu revolutionieren. Mit Sitz in Hamburg, im wirtschaftlichen Herzen Deutschlands, hat sich unser Unternehmen die Mission gesetzt, den Zugang zu innovativen Finanzlösungen zu demokratisieren.",
        paragraph2: "Als Pioniere bei der Integration künstlicher Intelligenz in Finanzdienstleistungen seit 2010 haben wir proprietäre Algorithmen entwickelt, die eine hochpräzise Risikoanalyse und personalisierte Empfehlungen für jeden Kunden ermöglichen.",
        paragraph3: "Heute, mit mehr als 50.000 Kunden in ganz Europa und 5 Milliarden Euro gewährter Finanzierungen, innovieren wir weiter, um die besten Marktlösungen zu bieten."
      },
      timeline: {
        title: "Unsere Meilensteine",
        milestones: [
          {
            year: "1997",
            title: "Gründung in Hamburg",
            description: "Gründung von Aurex K-pital mit der Vision, die Finanzdienstleistungen in Europa zu revolutionieren"
          },
          {
            year: "2003",
            title: "Europäische Expansion",
            description: "Eröffnung von Büros in 5 europäischen Ländern und Start der ersten digitalen Services"
          },
          {
            year: "2010",
            title: "KI-Innovation",
            description: "Pionierhafte Integration künstlicher Intelligenz in die Kreditanalyse"
          },
          {
            year: "2015",
            title: "Exzellenz-Zertifizierung",
            description: "Erhalt der strengsten europäischen Zertifizierungen im Finanzbereich"
          },
          {
            year: "2020",
            title: "Digitale Transformation",
            description: "Start der 100% digitalen Plattform und fortgeschrittener Vorhersagealgorithmen"
          },
          {
            year: "2024",
            title: "Marktführer",
            description: "Position als europäischer Marktführer mit über 50.000 zufriedenen Kunden"
          }
        ]
      },
      values: {
        title: "Unsere Werte",
        subtitle: "Die Prinzipien, die jede unserer Handlungen leiten",
        items: [
          {
            title: "Kundenexzellenz",
            description: "Jeder Kunde ist einzigartig und verdient persönliche Aufmerksamkeit mit maßgeschneiderten Lösungen."
          },
          {
            title: "Absolute Sicherheit", 
            description: "Maximaler Schutz von Daten und Investitionen mit den fortschrittlichsten Technologien."
          },
          {
            title: "Kontinuierliche Innovation",
            description: "Permanente Suche nach neuen Lösungen zur Antizipation zukünftiger Bedürfnisse."
          },
          {
            title: "Totale Transparenz",
            description: "Klare und ehrliche Kommunikation über alle unsere Produkte, Services und Konditionen."
          }
        ]
      },
      team: {
        badge: "Unser Team",
        title: "Unser Führungsteam",
        description: "Anerkannte Experten im Dienste Ihres Erfolgs",
        member1: {
          name: "Dr. Klaus Müller",
          role: "Geschäftsführer",
          experience: "25 Jahre Erfahrung in Finanzstrategie"
        },
        member2: {
          name: "Sophie Laurent",
          role: "Innovationsleiterin", 
          experience: "15 Jahre Expertise in FinTech & KI"
        },
        member3: {
          name: "Marco Antonelli",
          role: "Risikoleiter",
          experience: "20 Jahre Erfahrung in Risikomanagement"
        }
      },
      history: {
        badge: "Unsere Geschichte",
        title: "Unsere Meilensteine", 
        description: "Die wichtigsten Etappen unserer Entwicklung",
        milestone1: {
          title: "Gründung in Hamburg",
          description: "Gründung von Aurex K-pital mit der Vision, die Finanzdienstleistungen in Europa zu revolutionieren"
        },
        milestone2: {
          title: "Europäische Expansion", 
          description: "Eröffnung von Büros in 5 europäischen Ländern und Start der ersten digitalen Services"
        },
        milestone3: {
          title: "KI-Innovation",
          description: "Pionierhafte Integration künstlicher Intelligenz in die Kreditanalyse"
        },
        milestone4: {
          title: "Exzellenz-Zertifizierung",
          description: "Erhalt der strengsten europäischen Zertifizierungen im Finanzbereich"
        },
        milestone5: {
          title: "Marktführer",
          description: "Position als europäischer Marktführer mit über 50.000 zufriedenen Kunden"
        }
      },
      cta: {
        title: "Bereit, Ihr Unternehmen zu entwickeln?",
        description: "Schließen Sie sich mehr als 50.000 Unternehmen an, die uns für ihre Finanzierungsbedürfnisse vertrauen.",
        simulate: "Simulation starten",
        expert: "Mit einem Experten sprechen"
      },
      blog: {
        badge: "Expertise & Einblicke",
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
        }
      },
      certifications: {
        title: "Zertifizierungen & Akkreditierungen",
        subtitle: "Offizielle Anerkennung unserer operativen Exzellenz",
        items: [
          {
            name: "ISO 27001",
            description: "Informationssicherheit",
            year: "2018"
          },
          {
            name: "PCI DSS",
            description: "Zahlungssicherheit",
            year: "2020"
          },
          {
            name: "DSGVO-Konform",
            description: "Datenschutz",
            year: "2018"
          },
          {
            name: "SOC 2 Type II",
            description: "Organisationskontrollen",
            year: "2021"
          }
        ],
        sinceLabel: "Seit"
      },
      contact: {
        title: "Besuchen Sie uns",
        subtitle: "Unsere Büros empfangen Sie im Herzen von Hamburg",
        address: {
          title: "Adresse",
          value: ["Irma-Keilhack-Ring 24", "22145 Hamburg", "Deutschland"]
        },
        phone: {
          title: "Telefon",
          value: "+49 40 710 97523",
          schedule: ["Mo-Fr: 8-19 Uhr", "Sa: 9-17 Uhr"]
        },
        email: {
          title: "E-Mail",
          values: ["contact@aurex-kpital.de", "info@aurex-kpital.de", "support@aurex-kpital.de"]
        },
        buttons: {
          appointment: "Termin vereinbaren",
          customRequest: "Individuelle Anfrage"
        }
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
    },
    about: {
      badge: "Exzellenz seit 1997",
      title: "Ihr vertrauensvoller Finanzpartner",
      subtitle: "Seit über 25 Jahren begleiten wir europäische Unternehmen bei ihrer Entwicklung mit innovativen und personalisierten Finanzierungslösungen.",
      hero: {
        cta: {
          contact: "Kontakt aufnehmen",
          simulate: "Finanzierung simulieren"
        }
      },
      stats: {
        experience: {
          value: "25+",
          label: "Jahre Erfahrung"
        },
        companies: {
          value: "50K+",
          label: "Begleitete Unternehmen"
        },
        funding: {
          value: "€5B+",
          label: "Finanzierungen ermöglicht"
        },
        countries: {
          value: "8",
          label: "Europäische Länder"
        }
      },
      values: {
        badge: "Unsere Werte",
        title: "Was uns täglich leitet",
        description: "Unser Erfolg basiert auf starken Werten, die jede unserer Handlungen und Entscheidungen lenken.",
        security: {
          title: "Sicherheit & Compliance",
          description: "Unsere Lösungen entsprechen den strengsten Bankenstandards und der DSGVO-Verordnung."
        },
        innovation: {
          title: "Kontinuierliche Innovation",
          description: "Wir entwickeln ständig neue Lösungen, um Ihre zukünftigen Bedürfnisse zu antizipieren."
        },
        support: {
          title: "Persönliche Betreuung",
          description: "Jeder Kunde profitiert von einem dedizierten Berater für einen maßgeschneiderten Service."
        },
        excellence: {
          title: "Anerkannte Exzellenz",
          description: "Über 25 Jahre Expertise und das Vertrauen von Tausenden von Unternehmen."
        }
      },
      history: {
        badge: "Unsere Geschichte",
        title: "Über 25 Jahre Innovation",
        description: "Entdecken Sie die Schlüsselmomente, die unser Unternehmen und unsere Expertise geprägt haben.",
        milestone1: {
          title: "Unternehmensgründung",
          description: "Gründung mit der Vision, den Zugang zu Finanzierungen für KMU zu demokratisieren."
        },
        milestone2: {
          title: "Europäische Expansion",
          description: "Eröffnung von Büros in Deutschland, Polen und Spanien."
        },
        milestone3: {
          title: "Digitale Innovation",
          description: "Start unserer revolutionären Online-Simulationsplattform."
        },
        milestone4: {
          title: "50.000ster Kunde",
          description: "Erreichen der Marke von 50.000 begleiteten Unternehmen."
        },
        milestone5: {
          title: "€5 Milliarden finanziert",
          description: "Erreichen des Rekords von 5 Milliarden Euro erleichterte Finanzierungen."
        }
      },
      team: {
        badge: "Unser Team",
        title: "Expertise im Dienste Ihres Erfolgs",
        description: "Lernen Sie die Experten kennen, die unsere Vision vorantreiben und Ihr Wachstum begleiten.",
        member1: {
          name: "Marie Dubois",
          role: "Geschäftsführerin",
          experience: "15 Jahre Erfahrung in der Unternehmensfinanzierung"
        },
        member2: {
          name: "Thomas Schmidt",
          role: "Technischer Direktor",
          experience: "Experte für Fintech-Lösungen und Bankensicherheit"
        },
        member3: {
          name: "Elena Rodriguez",
          role: "Vertriebsleiterin",
          experience: "Spezialistin für europäische Märkte seit 12 Jahren"
        }
      },
      cta: {
        title: "Bereit, Ihr Unternehmen zu entwickeln?",
        description: "Schließen Sie sich über 50.000 Unternehmen an, die uns für ihre Finanzierungsbedürfnisse vertrauen.",
        simulate: "Simulation starten",
        expert: "Mit einem Experten sprechen"
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
      },
      contactPage: {
        hero: {
          badge: "Support Excellence",
          title: "Kontaktieren Sie unsere",
          titleSpan: "Experten",
          description: "Unser engagiertes Team begleitet Sie bei jedem Schritt Ihres Finanzprojekts. Mehrere Möglichkeiten, uns je nach Ihren Vorlieben zu erreichen.",
          stats: {
            satisfaction: {
              value: "97%",
              label: "Kundenzufriedenheit"
            },
            response: {
              value: "2h",
              label: "Durchschnittliche Antwortzeit"
            },
            advisors: {
              value: "25+",
              label: "Fachberater"
            }
          }
        },
        methods: {
          title: "Wie Sie uns erreichen",
          description: "Wählen Sie den Kanal, der Ihnen am besten passt",
          phone: {
            title: "Telefon",
            description: "Sprechen Sie direkt mit unseren Beratern",
            value: "+49 40 710 97523",
            hours: "Mo-Fr: 8-19 Uhr, Sa: 9-17 Uhr"
          },
          email: {
            title: "E-Mail",
            description: "Senden Sie uns Ihre Fragen",
            value: "contact@aurex-kpital.de",
            hours: "Antwort innerhalb von 4h im Durchschnitt"
          },
          address: {
            title: "Adresse",
            description: "Besuchen Sie unsere Büros in Hamburg",
            value: "Irma-Keilhack-Ring 24, 22145 Hamburg",
            hours: "Nur nach Terminvereinbarung"
          },
          chat: {
            title: "Online-Chat",
            description: "Sofortige Unterstützung",
            value: "24/7 verfügbar",
            hours: "Sofortige Antwort"
          }
        },
        form: {
          title: "Senden Sie uns eine Nachricht",
          description: "Wir antworten schnell und persönlich",
          fields: {
            name: "Vollständiger Name",
            email: "E-Mail",
            phone: "Telefon",
            subject: "Betreff",
            message: "Ihre Nachricht",
            preferredContact: "Bevorzugte Kontaktart",
            urgency: "Dringlichkeitsstufe"
          },
          placeholders: {
            subject: "Wählen Sie ein Thema",
            message: "Beschreiben Sie Ihre Anfrage im Detail...",
            preferredContact: "Wie möchten Sie kontaktiert werden?",
            urgency: "Auswählen"
          },
          subjects: {
            loanRequest: "Kreditantrag",
            investment: "Anlageberatung",
            insurance: "Versicherung",
            existingClient: "Bestehender Kunde",
            partnership: "Partnerschaft",
            complaint: "Beschwerde",
            other: "Sonstiges"
          },
          contactMethods: {
            phone: "Telefon",
            email: "E-Mail",
            appointment: "Termin"
          },
          urgencyLevels: {
            low: "Normal (48h)",
            medium: "Dringend (24h)",
            high: "Sehr dringend (4h)"
          },
          submit: "Nachricht senden",
          commitment: "Wir verpflichten uns, Ihnen innerhalb der angegebenen Fristen je nach gewählter Dringlichkeitsstufe zu antworten.",
          successMessage: "Ihre Nachricht wurde erfolgreich gesendet! Wir werden Sie schnell kontaktieren."
        },
        departments: {
          title: "Unsere Abteilungen",
          commercial: {
            name: "Vertrieb",
            description: "Neue Anfragen und Informationen",
            email: "commercial@aurex-kpital.de",
            phone: "+49 40 710 97523"
          },
          client: {
            name: "Kundendienst",
            description: "Betreuung bestehender Fälle",
            email: "client@aurex-kpital.de",
            phone: "+49 40 710 97524"
          },
          support: {
            name: "Technischer Support",
            description: "Plattform- und Toolunterstützung",
            email: "support@aurex-kpital.de",
            phone: "+49 40 710 97525"
          },
          management: {
            name: "Leitung",
            description: "Beschwerden und Vorschläge",
            email: "direction@aurex-kpital.de",
            phone: "+49 40 710 97520"
          }
        },
        officeHours: {
          title: "Öffnungszeiten",
          monday: "Montag - Freitag",
          mondayHours: "8:00 - 19:00",
          mondayType: "Berater verfügbar",
          saturday: "Samstag",
          saturdayHours: "9:00 - 17:00",
          saturdayType: "Reduzierter Service",
          sunday: "Sonntag",
          sundayHours: "Geschlossen",
          sundayType: "Nur Notfälle"
        },
        certifications: {
          title: "Garantien & Zertifizierungen",
          iso: "ISO 27001 sichere Daten",
          gdpr: "DSGVO-Konformität",
          eu: "EU-zugelassen"
        }
      }
    }
  },
  es: {
    menu: {
      home: "Inicio",
      services: "Servicios",
      simulator: "Simulador",
      request: "Solicitud",
      about: "Sobre nosotros",
      contact: "Contacto",
      faq: "FAQ",
      careers: "Carreras",
      partners: "Socios",
      blog: "Blog"
    },
    footer: {
      tools: "Herramientas",
      company: "Empresa",
      legal: "Legal",
      privacyPolicy: "Política de privacidad",
      terms: "Términos y condiciones",
      mentions: "Aviso legal",
      gdpr: "RGPD",
      rights: "© 2024 Aurex K-pital. Todos los derechos reservados.",
      description: "Su socio financiero de confianza desde 1997. Excelencia, innovación y experiencia para todos sus proyectos financieros en Europa.",
      services: "Servicios",
      copyright: "© 2024 Aurex K-pital. Todos los derechos reservados.",
      establishment: "Institución financiera autorizada en Europa",
      links: {
        personalLoans: "Préstamos personales",
        proFinancing: "Financiación empresarial",
        investments: "Inversiones",
        insurance: "Seguros",
        simulator: "Simulador de préstamos",
        request: "Solicitud de financiación",
        faq: "FAQ",
        contact: "Contacto",
        about: "Sobre nosotros",
        partners: "Nuestros socios",
        careers: "Carreras",
        blog: "Blog",
        legal: "Aviso legal",
        privacy: "Política de privacidad",
        terms: "Términos y condiciones",
        gdpr: "RGPD"
      }
    },
    partners: {
      title: "Nuestros Socios de Confianza",
      description: "Una red de excelencia europea para ofrecerle las mejores soluciones financieras",
      stats: "Más de 25 socios europeos • 27 países cubiertos • 2,5 mil millones € de volumen tratado"
    },
    home: {
      hero: {
        title: "Su Socio Financiero",
        subtitle: "desde 1997",
        description: "Excelencia, innovación y confianza para todos sus proyectos financieros",
        ctaBtn: "Descubrir nuestras soluciones",
        simulateBtn: "Simular un préstamo",
        scrollText: "Descubrir",
        carousel: {
          text1: "Lance su proyecto con Aurex K-pital",
          text2: "Obtenga financiación sin aporte",
          text3: "Invierta hoy en su futuro"
        },
        stats: {
          experience: {
            title: "Años de excelencia",
            subtitle: "Innovación continua"
          },
          clients: {
            title: "Clientes satisfechos",
            subtitle: "Satisfacción garantizada"
          },
          funding: {
            title: "Financiaciones realizadas",
            subtitle: "Impacto transformador"
          }
        }
      },
      services: {
        badge: "Servicios",
        title: "Soluciones",
        subtitle: "Innovadoras",
        description: "Descubra nuestras soluciones financieras",
        description2: "revolucionarias",
        description3: "para sus proyectos"
      },
      about: {
        badge: "Sobre nosotros",
        title: "Su socio",
        subtitle: "financiero",
        subtitle2: "de confianza",
        description1: {
          highlight: "Desde 1997,",
          text: " Aurex K-pital acompaña a particulares y empresas en sus proyectos financieros con un enfoque que combina",
          expertise: "experiencia humana",
          and: "e",
          technology: "innovación tecnológica"
        },
        description2: {
          text: "Nuestra misión: democratizar el acceso a la financiación gracias a soluciones",
          highlight: "rápidas, transparentes y a medida",
          success: "para hacer realidad sus ambiciones"
        },
        stats: {
          founded: "Año de fundación",
          location: "Sede social",
          certified: "Registro",
          security: "Safe-Nummer"
        },
        trust: {
          title: "Su confianza, nuestra prioridad",
          description: "Certificados y regulados por las autoridades europeas"
        },
        buttons: {
          history: "Nuestra historia",
          contact: "Contáctanos"
        }
      },
      cta: {
        title: "¿Listo para transformar",
        titleHighlight: "sus proyectos",
        titleEnd: "en realidad?",
        description: "Nuestros expertos le acompañan en cada paso para hacer realidad sus ambiciones financieras.",
        buttons: {
          request: "Hacer una solicitud",
          simulate: "Simular un préstamo",
          contact: "Contáctanos"
        },
        contact: {
          phone: "Teléfono",
          address: "Dirección",
          addressValue: "Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemania"
        }
      }
    },
    services: {
      personalLoan: {
        title: "Préstamos personales",
        description: "Soluciones de financiación personalizadas con condiciones revolucionarias.",
        points: ["IA para tasas óptimas", "Respuesta en 2h", "Máxima flexibilidad"],
        cta: "Descubrir",
        useCases: [
          "Trabajos de renovación",
          "Viaje de ensueño",
          "Boda",
          "Estudios", 
          "Compra de vehículo"
        ]
      },
      businessLoan: {
        title: "Financiamiento para empresas",
        description: "Impulsa tu empresa con nuestras soluciones innovadoras.",
        points: ["Financiamiento exprés", "Acompañamiento experto", "Soluciones a medida"],
        cta: "Descubrir",
        useCases: [
          "Creación de empresa",
          "Expansión comercial",
          "Compra de equipos",
          "Tesorería",
          "Compra de participaciones"
        ]
      },
      investment: {
        title: "Inversiones inteligentes",
        description: "Optimización patrimonial con inteligencia artificial y experiencia humana.",
        points: ["Cartera inteligente", "Asesoría premium", "Rendimiento optimizado"],
        cta: "Descubrir",
        useCases: [
          "Inversión inmobiliaria",
          "Diversificación patrimonial",
          "Preparación jubilación",
          "Optimización fiscal",
          "Inversión ESG"
        ]
      },
      insurance: {
        title: "Seguros 360°",
        description: "Protección total e innovadora para todos tus proyectos de vida y negocio.",
        points: ["Cobertura completa", "Gestión de reclamos en 24h", "Atención premium"],
        cta: "Descubrir",
        useCases: [
          "Protección familiar",
          "Seguro profesional",
          "Garantía préstamo",
          "Responsabilidad civil",
          "Previsión salud"
        ]
      },
      explore: "Explorar todos nuestros servicios",
      features: "Características",
      useCases: "Casos de uso",
      discover: "Descubrir",
      specialized: {
        title: "Productos especializados", 
        description: "Soluciones expertas para sus necesidades específicas",
        mortgage: {
          title: "Préstamo inmobiliario",
          description: "Financie su proyecto inmobiliario en las mejores condiciones",
          rate: "Desde 1,2% TAE"
        },
        student: {
          title: "Préstamo estudiantil",
          description: "Soluciones adaptadas para financiar sus estudios",
          rate: "0% durante los estudios"
        },
        savings: {
          title: "Libreta de ahorro+",
          description: "Ahorro remunerado y disponible",
          rate: "Hasta 4% neto"
        },
        premium: {
          title: "Tarjeta Premium",
          description: "Ventajas exclusivas y servicios de alta gama",
          rate: "Sin costos el primer año"
        }
      },
      process: {
        title: "Nuestro proceso",
        description: "Un recorrido simplificado para concretar sus proyectos",
        step1: {
          title: "Análisis de su proyecto",
          description: "Estudio personalizado de sus necesidades y capacidades financieras"
        },
        step2: {
          title: "Propuesta a medida",
          description: "Soluciones adaptadas con condiciones optimizadas por IA"
        },
        step3: {
          title: "Validación exprés",
          description: "Respuesta de principio en menos de 2h laborables"
        },
        step4: {
          title: "Desbloqueo de fondos",
          description: "Puesta a disposición rápida y acompañamiento continuo"
        }
      }
    },
    testimonials: {
      title: "Confían en nosotros",
      subtitle: "Lo que dicen nuestros clientes satisfechos",
      clients: [
        {
          name: "Jean-Marc Rousseau",
          location: "Lyon, Francia",
          feedback: "Servicio rápido y confiable. ¡Mi crédito fue aprobado en 48 horas! Gracias Aurex K-pital."
        },
        {
          name: "Amélie Blanchard",
          location: "París, Francia",
          feedback: "Equipo profesional, plataforma clara y una atención realmente personalizada."
        },
        {
          name: "Thomas Bonnet",
          location: "Toulouse, Francia",
          feedback: "El simulador fue muy claro y obtuve mejores condiciones que en mi banco."
        }
      ]
    },
    simulator: {
      title: "Calculadora de Préstamo",
      titleSecond: "Inteligente",
      subtitle: "Obtenga una estimación personalizada en tiempo real de su financiación",
      form: {
        loanType: "Tipo de financiación",
        amount: "Cantidad deseada (€)",
        duration: "Duración de reembolso (meses)",
        income: "Ingresos mensuales netos (opcional)",
        incomeHelper: "Información utilizada para optimizar su tasa",
        guarantee: "¿Tiene una garantía o aval?",
        guaranteeOptions: {
          yes: "Sí, tengo una garantía",
          no: "No, sin garantía",
          maybe: "A evaluar según la oferta"
        },
        loanTypes: {
          personal: {
            label: "Préstamo Personal",
            description: "Para todos sus proyectos personales"
          },
          auto: {
            label: "Crédito Auto",
            description: "Financiación vehículo nuevo o de ocasión"
          },
          realEstate: {
            label: "Crédito Inmobiliario",
            description: "Compra, construcción o renovación"
          },
          professional: {
            label: "Financiación Profesional",
            description: "Inversión profesional"
          },
          student: {
            label: "Préstamo Estudiantil",
            description: "Financiación estudios superiores"
          },
          consolidation: {
            label: "Reunificación de Créditos",
            description: "Agrupación de deudas existentes"
          }
        }
      },
      configuration: {
        title: "Configuración de su préstamo",
        description: "Personalice los parámetros según sus necesidades"
      },
      result: {
        title: "Su estimación",
        monthlyPayment: "Cuota mensual",
        interestRate: "Tipo de interés",
        totalCost: "Costo total del crédito",
        totalRepayment: "Importe total a reembolsar",
        units: {
          months: "meses",
          years: "años"
        },
        disclaimer: "Esta estimación es indicativa y puede variar según su perfil final. Oferta sujeta a aceptación."
      },
      advantages: {
        title: "Sus ventajas Aurex K-pital",
        items: {
          rates: "Tipos preferenciales negociados",
          earlyRepayment: "Reembolso anticipado sin gastos",
          response: "Respuesta garantizada en 24h",
          support: "Acompañamiento personalizado"
        }
      },
      cta: {
        title: "¿Listo para concretar su proyecto?",
        description: "Nuestros consejeros expertos le acompañan para transformar esta simulación en realidad",
        buttons: {
          request: "Hacer mi solicitud",
          consultant: "Hablar con un consejero",
          officialRequest: "Hacer mi solicitud oficial",
          allServices: "Ver todos nuestros servicios"
        }
      }
    },
    legal: {
      badge: "Información Legal",
      title: {
        main: "Aviso",
        subtitle: "Legal"
      },
      description: "Toda la información legal y reglamentaria sobre Aurex K-pital y el uso de nuestros servicios.",
      tabs: {
        mentions: "Aviso Legal",
        privacy: "Privacidad",
        terms: "Términos",
        gdpr: "RGPD"
      },
      mentions: {
        title: "Aviso Legal",
        description: "Información de la empresa y responsabilidades legales",
        company: {
          title: "Identificación de la Empresa",
          name: "Denominación social",
          type: "Forma jurídica",
          typeValue: "Sociedad de responsabilidad limitada (GmbH)",
          capital: "Capital social",
          address: "Sede social",
          register: "Registro mercantil",
          vat: "Número de IVA",
          siren: "Número SIREN"
        },
        management: {
          title: "Dirección",
          ceo: "Director General",
          cio: "Directora de Innovación",
          cro: "Director de Riesgos"
        },
        activity: {
          title: "Actividad",
          description: "Aurex K-pital es una institución financiera autorizada por la BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht) bajo el número de autorización 147-FS-2015. Nuestras actividades incluyen:",
          services: {
            banking: "Intermediación en operaciones bancarias y servicios de pago",
            investment: "Asesoramiento en inversiones financieras",
            insurance: "Intermediación en seguros",
            wealth: "Servicios de gestión patrimonial"
          }
        },
        contact: {
          title: "Contacto",
          phone: "Teléfono",
          email: "Email",
          hours: "Horarios",
          schedule: "Lunes-Viernes 8h-19h, Sábado 9h-17h"
        },
        hosting: {
          title: "Alojamiento",
          description: "Este sitio está alojado por:"
        },
        intellectual: {
          title: "Propiedad Intelectual",
          description: "Todos los contenidos presentes en este sitio (textos, imágenes, logos, gráficos, etc.) están protegidos por derechos de autor y pertenecen a Aurex K-pital o a sus socios. Cualquier reproducción, incluso parcial, está prohibida sin autorización escrita previa."
        },
        responsibility: {
          title: "Responsabilidad",
          description: "Aurex K-pital se esfuerza por proporcionar información precisa y actualizada. Sin embargo, la empresa no puede garantizar la exactitud, integridad o actualidad de la información difundida en este sitio. El uso de la información se hace bajo la responsabilidad exclusiva del usuario."
        }
      }
    },
    about: {
      badge: "Excelencia desde 1997",
      title: "Su socio financiero de confianza",
      subtitle: "Desde hace más de 25 años, acompañamos a las empresas europeas en su desarrollo con soluciones de financiación innovadoras y personalizadas.",
      hero: {
        cta: {
          contact: "Contactarnos",
          simulate: "Simular mi financiación"
        }
      },
      stats: {
        experience: {
          value: "25+",
          label: "Años de experiencia"
        },
        companies: {
          value: "50K+",
          label: "Empresas acompañadas"
        },
        funding: {
          value: "€5B+",
          label: "Financiaciones facilitadas"
        },
        countries: {
          value: "8",
          label: "Países europeos"
        }
      },
      values: {
        badge: "Nuestros Valores",
        title: "Lo que nos guía cada día",
        description: "Nuestro éxito se basa en valores sólidos que orientan cada una de nuestras acciones y decisiones.",
        security: {
          title: "Seguridad y Cumplimiento",
          description: "Nuestras soluciones respetan las normas bancarias más estrictas y la regulación RGPD."
        },
        innovation: {
          title: "Innovación Continua",
          description: "Desarrollamos constantemente nuevas soluciones para anticipar sus necesidades futuras."
        },
        support: {
          title: "Acompañamiento Personal",
          description: "Cada cliente se beneficia de un asesor dedicado para un servicio a medida."
        },
        excellence: {
          title: "Excelencia Reconocida",
          description: "Más de 25 años de experiencia y la confianza de miles de empresas."
        }
      },
      history: {
        badge: "Nuestra Historia",
        title: "Más de 25 años de innovación",
        description: "Descubra los momentos clave que han forjado nuestra empresa y nuestra experiencia.",
        milestone1: {
          title: "Creación de la empresa",
          description: "Fundación con la visión de democratizar el acceso a la financiación para las PYME."
        },
        milestone2: {
          title: "Expansión europea",
          description: "Apertura de oficinas en Alemania, Polonia y España."
        },
        milestone3: {
          title: "Innovación digital",
          description: "Lanzamiento de nuestra plataforma de simulación en línea revolucionaria."
        },
        milestone4: {
          title: "Cliente número 50.000",
          description: "Franqueo del hito de 50.000 empresas acompañadas."
        },
        milestone5: {
          title: "€5 mil millones financiados",
          description: "Alcance del récord de 5 mil millones de euros de financiaciones facilitadas."
        }
      },
      team: {
        badge: "Nuestro Equipo",
        title: "La experiencia al servicio de su éxito",
        description: "Conozca a los expertos que impulsan nuestra visión y acompañan su crecimiento.",
        member1: {
          name: "Marie Dubois",
          role: "Directora General",
          experience: "15 años de experiencia en financiación empresarial"
        },
        member2: {
          name: "Thomas Schmidt",
          role: "Director Técnico",
          experience: "Experto en soluciones fintech y seguridad bancaria"
        },
        member3: {
          name: "Elena Rodriguez",
          role: "Directora Comercial",
          experience: "Especialista en mercados europeos desde hace 12 años"
        }
      },
      cta: {
        title: "¿Listo para desarrollar su empresa?",
        description: "Únase a más de 50.000 empresas que confían en nosotros para sus necesidades de financiación.",
        simulate: "Comenzar la simulación",
        expert: "Hablar con un experto"
      },
      blog: {
        badge: "Experiencia y Perspectivas",
        title: "Blog Aurex",
        subtitle: "K-pital",
        description: "Análisis de expertos, tendencias del mercado y consejos prácticos para optimizar sus decisiones financieras y de inversión.",
        stats: {
          articles: {
            value: "150+",
            label: "Artículos publicados"
          },
          experts: {
            value: "8",
            label: "Expertos autores"
          },
          readers: {
            value: "50K+",
            label: "Lectores mensuales"
          },
          satisfaction: {
            value: "95%",
            label: "Satisfacción de lectores"
          }
        },
        featured: {
          title: "Artículo Destacado"
        },
        search: {
          placeholder: "Buscar un artículo...",
          allCategories: "Todas las categorías"
        },
        categories: {
          title: "Categorías",
          innovation: "Innovación",
          realEstate: "Inmobiliario",
          regulation: "Regulación",
          economy: "Economía",
          esg: "ESG",
          education: "Educación"
        },
        trending: {
          title: "Tendencias"
        },
        newsletter: {
          title: "Newsletter",
          description: "Reciba nuestros últimos artículos y análisis directamente en su buzón",
          placeholder: "Su email",
          subscribe: "Suscribirse",
          disclaimer: "Máximo 1 email por semana. Fácil cancelación."
        },
        actions: {
          readMore: "Leer el artículo completo",
          read: "Leer",
          loadMore: "Cargar más artículos",
          readTime: "de lectura"
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
      contact: "Contatto",
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
      terms: "Termini e condizioni",
      mentions: "Note legali",
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Tutti i diritti riservati.",
      description: "Il vostro partner finanziario di fiducia dal 1997. Eccellenza, innovazione ed esperienza per tutti i vostri progetti finanziari in Europa.",
      services: "Servizi",
      copyright: "© 2024 Aurex K-pital. Tutti i diritti riservati.",
      establishment: "Istituzione finanziaria autorizzata in Europa",
      links: {
        personalLoans: "Prestiti personali",
        proFinancing: "Finanziamento aziendale",
        investments: "Investimenti",
        insurance: "Assicurazioni",
        simulator: "Simulatore di prestito",
        request: "Richiesta di finanziamento",
        faq: "FAQ",
        contact: "Contatto",
        about: "Chi siamo",
        partners: "I nostri partner",
        careers: "Carriere",
        blog: "Blog",
        legal: "Note legali",
        privacy: "Politica sulla privacy",
        terms: "Termini e condizioni",
        gdpr: "GDPR"
      }
    },
    partners: {
      title: "I Nostri Partner di Fiducia",
      description: "Una rete europea di eccellenza per offrire le migliori soluzioni finanziarie",
      stats: "Oltre 25 partner europei • 27 paesi coperti • 2,5 miliardi € di volume trattato"
    },
    home: {
      hero: {
        title: "Il tuo Partner Finanziario",
        subtitle: "dal 1997",
        description: "Eccellenza, innovazione e fiducia per tutti i tuoi progetti finanziari",
        ctaBtn: "Scopri le nostre soluzioni",
        simulateBtn: "Simula un prestito",
        scrollText: "Scopri",
        carousel: {
          text1: "Lancia il tuo progetto con Aurex K-pital",
          text2: "Ottieni finanziamenti senza anticipo",
          text3: "Investi oggi nel tuo futuro"
        },
        stats: {
          experience: {
            title: "Anni di eccellenza",
            subtitle: "Innovazione continua"
          },
          clients: {
            title: "Clienti soddisfatti",
            subtitle: "Soddisfazione garantita"
          },
          funding: {
            title: "Finanziamenti realizzati",
            subtitle: "Impatto trasformativo"
          }
        }
      },
      services: {
        badge: "Servizi",
        title: "Soluzioni",
        subtitle: "Innovative",
        description: "Scopri le nostre soluzioni finanziarie",
        description2: "rivoluzionarie",
        description3: "per i tuoi progetti"
      },
      about: {
        badge: "Chi siamo",
        title: "Il vostro partner",
        subtitle: "finanziario",
        subtitle2: "di fiducia",
        description1: {
          highlight: "Dal 1997,",
          text: " Aurex K-pital accompagna privati e aziende nei loro progetti finanziari con un approccio che combina",
          expertise: "esperienza umana",
          and: "e",
          technology: "innovazione tecnologica"
        },
        description2: {
          text: "La nostra missione: democratizzare l'accesso ai finanziamenti grazie a soluzioni",
          highlight: "rapide, trasparenti e su misura",
          success: "per concretizzare le vostre ambizioni"
        },
        stats: {
          founded: "Anno di fondazione",
          location: "Sede sociale",
          certified: "Registro",
          security: "Safe-Nummer"
        },
        trust: {
          title: "La vostra fiducia, la nostra priorità",
          description: "Certificati e regolamentati dalle autorità europee"
        },
        buttons: {
          history: "La nostra storia",
          contact: "Contattaci"
        }
      },
      cta: {
        title: "Pronti a trasformare",
        titleHighlight: "i vostri progetti",
        titleEnd: "in realtà?",
        description: "I nostri esperti vi accompagnano in ogni passaggio per concretizzare le vostre ambizioni finanziarie.",
        buttons: {
          request: "Fare una richiesta",
          simulate: "Simulare un prestito",
          contact: "Contattaci"
        },
        contact: {
          phone: "Telefono",
          address: "Indirizzo",
          addressValue: "Irma-Keilhack-Ring 24, 22145 Amburgo, Germania"
        }
      }
    },
    services: {
      personalLoan: {
        title: "Prestiti personali",
        description: "Soluzioni di finanziamento personalizzate con condizioni rivoluzionarie.",
        points: ["IA per tassi ottimali", "Risposta in 2h", "Massima flessibilità"],
        cta: "Scopri",
        useCases: [
          "Lavori di ristrutturazione",
          "Viaggio da sogno",
          "Matrimonio",
          "Studi",
          "Acquisto veicolo"
        ]
      },
      businessLoan: {
        title: "Finanziamenti aziendali",
        description: "Potenzia la tua azienda con le nostre soluzioni innovative.",
        points: ["Finanziamento express", "Accompagnamento esperto", "Soluzioni su misura"],
        cta: "Scopri",
        useCases: [
          "Creazione d'impresa",
          "Espansione commerciale",
          "Acquisto attrezzature",
          "Tesoreria",
          "Acquisto quote"
        ]
      },
      investment: {
        title: "Investimenti intelligenti",
        description: "Ottimizzazione patrimoniale con intelligenza artificiale ed esperienza umana.",
        points: ["Portfolio intelligente", "Consulenza premium", "Rendimento ottimizzato"],
        cta: "Scopri",
        useCases: [
          "Investimento immobiliare",
          "Diversificazione patrimoniale",
          "Preparazione pensione",
          "Ottimizzazione fiscale",
          "Investimento ESG"
        ]
      },
      insurance: {
        title: "Assicurazioni 360°",
        description: "Protezione totale e innovativa per tutti i tuoi progetti di vita e business.",
        points: ["Copertura completa", "Gestione sinistri 24h", "Supporto premium"],
        cta: "Scopri",
        useCases: [
          "Protezione famiglia",
          "Assicurazione professionale",
          "Garanzia prestito",
          "Responsabilità civile",
          "Previdenza salute"
        ]
      },
      explore: "Esplora tutti i nostri servizi",
      features: "Caratteristiche",
      useCases: "Casi d'uso",
      discover: "Scopri",
      specialized: {
        title: "Prodotti specializzati",
        description: "Soluzioni esperte per le vostre esigenze specifiche",
        mortgage: {
          title: "Mutuo immobiliare",
          description: "Finanziate il vostro progetto immobiliare alle migliori condizioni",
          rate: "A partire dall'1,2% TAEG"
        },
        student: {
          title: "Prestito studenti",
          description: "Soluzioni adatte per finanziare i vostri studi",
          rate: "0% durante gli studi"
        },
        savings: {
          title: "Libretto risparmio+",
          description: "Risparmio remunerato e disponibile",
          rate: "Fino al 4% netto"
        },
        premium: {
          title: "Carta Premium",
          description: "Vantaggi esclusivi e servizi di alta gamma",
          rate: "Senza spese il primo anno"
        }
      },
      process: {
        title: "Il nostro processo",
        description: "Un percorso semplificato per concretizzare i vostri progetti",
        step1: {
          title: "Analisi del vostro progetto",
          description: "Studio personalizzato delle vostre esigenze e capacità finanziarie"
        },
        step2: {
          title: "Proposta su misura",
          description: "Soluzioni adatte con condizioni ottimizzate dall'IA"
        },
        step3: {
          title: "Validazione express",
          description: "Risposta di principio in meno di 2h lavorative"
        },
        step4: {
          title: "Sblocco dei fondi",
          description: "Messa a disposizione rapida e accompagnamento continuo"
        }
      }
    },
    testimonials: {
      title: "Ci danno fiducia",
      subtitle: "Cosa dicono i nostri clienti soddisfatti",
      clients: [
        {
          name: "Jean-Marc Rousseau",
          location: "Lione, Francia",
          feedback: "Servizio veloce e professionale. Il mio prestito è stato approvato in 48 ore. Grazie Aurex K-pital!"
        },
        {
          name: "Amélie Blanchard",
          location: "Parigi, Francia",
          feedback: "Team competente, interfaccia semplice e assistenza davvero personalizzata."
        },
        {
          name: "Thomas Bonnet",
          location: "Tolosa, Francia",
          feedback: "Il simulatore è chiaro e ho ottenuto condizioni migliori rispetto alla mia banca."
        }
      ]
    },
    simulator: {
      title: "Calcolatore di Prestito",
      titleSecond: "Intelligente",
      subtitle: "Ottieni una stima personalizzata in tempo reale del tuo finanziamento",
      form: {
        loanType: "Tipo di finanziamento",
        amount: "Importo desiderato (€)",
        duration: "Durata di rimborso (mesi)",
        income: "Reddito mensile netto (opzionale)",
        incomeHelper: "Informazione utilizzata per ottimizzare il tuo tasso",
        guarantee: "Hai una garanzia o fideiussione?",
        guaranteeOptions: {
          yes: "Sì, ho una garanzia",
          no: "No, nessuna garanzia",
          maybe: "Da valutare secondo l'offerta"
        },
        loanTypes: {
          personal: {
            label: "Prestito Personale",
            description: "Per tutti i tuoi progetti personali"
          },
          auto: {
            label: "Credito Auto",
            description: "Finanziamento veicolo nuovo o usato"
          },
          realEstate: {
            label: "Credito Immobiliare",
            description: "Acquisto, costruzione o ristrutturazione"
          },
          professional: {
            label: "Finanziamento Professionale",
            description: "Investimento professionale"
          },
          student: {
            label: "Prestito Studenti",
            description: "Finanziamento studi universitari"
          },
          consolidation: {
            label: "Consolidamento Crediti",
            description: "Raggruppamento debiti esistenti"
          }
    },
    about: {
      badge: "Eccellenza dal 1997",
      title: "Il vostro partner finanziario di fiducia",
      subtitle: "Da oltre 25 anni, accompagniamo le aziende europee nel loro sviluppo con soluzioni di finanziamento innovative e personalizzate.",
      hero: {
        cta: {
          contact: "Contattaci",
          simulate: "Simula il mio finanziamento"
        }
      },
      stats: {
        experience: {
          value: "25+",
          label: "Anni di esperienza"
        },
        companies: {
          value: "50K+",
          label: "Aziende accompagnate"
        },
        funding: {
          value: "€5B+",
          label: "Finanziamenti facilitati"
        },
        countries: {
          value: "8",
          label: "Paesi europei"
        }
      },
      values: {
        badge: "I Nostri Valori",
        title: "Ciò che ci guida ogni giorno",
        description: "Il nostro successo si basa su valori forti che orientano ogni nostra azione e decisione.",
        security: {
          title: "Sicurezza e Conformità",
          description: "Le nostre soluzioni rispettano le norme bancarie più rigorose e la regolamentazione GDPR."
        },
        innovation: {
          title: "Innovazione Continua",
          description: "Sviluppiamo costantemente nuove soluzioni per anticipare le vostre esigenze future."
        },
        support: {
          title: "Accompagnamento Personale",
          description: "Ogni cliente beneficia di un consulente dedicato per un servizio su misura."
        },
        excellence: {
          title: "Eccellenza Riconosciuta",
          description: "Oltre 25 anni di competenza e la fiducia di migliaia di aziende."
        }
      },
      history: {
        badge: "La Nostra Storia",
        title: "Oltre 25 anni di innovazione",
        description: "Scoprite i momenti chiave che hanno plasmato la nostra azienda e la nostra competenza.",
        milestone1: {
          title: "Creazione dell'azienda",
          description: "Fondazione con la visione di democratizzare l'accesso ai finanziamenti per le PMI."
        },
        milestone2: {
          title: "Espansione europea",
          description: "Apertura di uffici in Germania, Polonia e Spagna."
        },
        milestone3: {
          title: "Innovazione digitale",
          description: "Lancio della nostra piattaforma di simulazione online rivoluzionaria."
        },
        milestone4: {
          title: "50.000º cliente",
          description: "Raggiungimento del traguardo di 50.000 aziende accompagnate."
        },
        milestone5: {
          title: "€5 miliardi finanziati",
          description: "Raggiungimento del record di 5 miliardi di euro di finanziamenti facilitati."
        }
      },
      team: {
        badge: "Il Nostro Team",
        title: "L'expertise al servizio del vostro successo",
        description: "Incontrate gli esperti che guidano la nostra visione e accompagnano la vostra crescita.",
        member1: {
          name: "Marie Dubois",
          role: "Direttrice Generale",
          experience: "15 anni di esperienza nel finanziamento aziendale"
        },
        member2: {
          name: "Thomas Schmidt",
          role: "Direttore Tecnico",
          experience: "Esperto in soluzioni fintech e sicurezza bancaria"
        },
        member3: {
          name: "Elena Rodriguez",
          role: "Direttrice Commerciale",
          experience: "Specialista dei mercati europei da 12 anni"
        }
      },
      cta: {
        title: "Pronti a sviluppare la vostra azienda?",
        description: "Unitevi a oltre 50.000 aziende che si fidano di noi per le loro esigenze di finanziamento.",
        simulate: "Inizia la simulazione",
        expert: "Parla con un esperto"
      },
      blog: {
        badge: "Competenza e Approfondimenti",
        title: "Blog Aurex",
        subtitle: "K-pital",
        description: "Analisi di esperti, tendenze di mercato e consigli pratici per ottimizzare le vostre decisioni finanziarie e di investimento.",
        stats: {
          articles: {
            value: "150+",
            label: "Articoli pubblicati"
          },
          experts: {
            value: "8",
            label: "Esperti autori"
          },
          readers: {
            value: "50K+",
            label: "Lettori mensili"
          },
          satisfaction: {
            value: "95%",
            label: "Soddisfazione lettori"
          }
        },
        featured: {
          title: "Articolo in Evidenza"
        },
        search: {
          placeholder: "Cerca un articolo...",
          allCategories: "Tutte le categorie"
        },
        categories: {
          title: "Categorie",
          innovation: "Innovazione",
          realEstate: "Immobiliare",
          regulation: "Regolamentazione",
          economy: "Economia",
          esg: "ESG",
          education: "Educazione"
        },
        trending: {
          title: "Tendenze"
        },
        newsletter: {
          title: "Newsletter",
          description: "Ricevi i nostri ultimi articoli e analisi direttamente nella tua casella di posta",
          placeholder: "La tua email",
          subscribe: "Iscriviti",
          disclaimer: "Massimo 1 email a settimana. Facile cancellazione."
        },
        actions: {
          readMore: "Leggi l'articolo completo",
          read: "Leggi",
          loadMore: "Carica più articoli",
          readTime: "di lettura"
        }
      }
    }
      },
      configuration: {
        title: "Configurazione del tuo prestito",
        description: "Personalizza i parametri secondo le tue esigenze"
      },
      result: {
        title: "La tua stima",
        monthlyPayment: "Rata mensile",
        interestRate: "Tasso di interesse",
        totalCost: "Costo totale del credito",
        totalRepayment: "Importo totale da rimborsare",
        units: {
          months: "mesi",
          years: "anni"
        },
        disclaimer: "Questa stima è indicativa e può variare secondo il tuo profilo finale. Offerta soggetta ad accettazione."
      },
      advantages: {
        title: "I tuoi vantaggi Aurex K-pital",
        items: {
          rates: "Tassi preferenziali negoziati",
          earlyRepayment: "Rimborso anticipato senza costi",
          response: "Risposta garantita entro 24h",
          support: "Accompagnamento personalizzato"
        }
      },
      cta: {
        title: "Pronto a realizzare il tuo progetto?",
        description: "I nostri consulenti esperti ti accompagnano per trasformare questa simulazione in realtà",
        buttons: {
          request: "Fare domanda",
          consultant: "Parlare con un consulente",
          officialRequest: "Fare domanda ufficiale",
          allServices: "Vedere tutti i nostri servizi"
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
      legal: "Informacje prawne",
      privacyPolicy: "Polityka prywatności",
      terms: "Regulamin",
      mentions: "Informacje prawne",
      gdpr: "RODO",
      rights: "© 2024 Aurex K-pital. Wszelkie prawa zastrzeżone.",
      description: "Wasz zaufany partner finansowy od 1997 roku. Doskonałość, innowacyjność i doświadczenie dla wszystkich projektów finansowych w Europie.",
      services: "Usługi",
      copyright: "© 2024 Aurex K-pital. Wszelkie prawa zastrzeżone.",
      establishment: "Licencjonowana instytucja finansowa w Europie",
      links: {
        personalLoans: "Kredyty osobiste",
        proFinancing: "Finansowanie biznesu",
        investments: "Inwestycje",
        insurance: "Ubezpieczenia",
        simulator: "Symulator kredytu",
        request: "Wniosek o finansowanie",
        faq: "FAQ",
        contact: "Kontakt",
        about: "O nas",
        partners: "Nasi partnerzy",
        careers: "Kariera",
        blog: "Blog",
        legal: "Informacje prawne",
        privacy: "Polityka prywatności",
        terms: "Regulamin",
        gdpr: "RODO"
      }
    },
    partners: {
      title: "Nasi Zaufani Partnerzy",
      description: "Europejska sieć doskonałości, aby zapewnić najlepsze rozwiązania finansowe",
      stats: "Ponad 25 europejskich partnerów • 27 krajów objętych • 2,5 mld € wolumenu transakcji"
    },
    home: {
      hero: {
        title: "Twój Partner Finansowy",
        subtitle: "od 1997",
        description: "Doskonałość, innowacyjność i zaufanie dla wszystkich Twoich projektów finansowych",
        ctaBtn: "Odkryj nasze rozwiązania",
        simulateBtn: "Symuluj kredyt",
        scrollText: "Odkryj",
        carousel: {
          text1: "Rozpocznij swój projekt z Aurex K-pital",
          text2: "Uzyskaj finansowanie bez wkładu własnego",
          text3: "Inwestuj już dziś w swoją przyszłość"
        },
        stats: {
          experience: {
            title: "Lat doskonałości",
            subtitle: "Ciągła innowacja"
          },
          clients: {
            title: "Zadowolonych klientów",
            subtitle: "Gwarantowane zadowolenie"
          },
          funding: {
            title: "Zrealizowanych finansowań",
            subtitle: "Transformacyjny wpływ"
          }
        }
      },
      services: {
        badge: "Usługi",
        title: "Rozwiązania",
        subtitle: "Innowacyjne",
        description: "Odkryj nasze rewolucyjne",
        description2: "rozwiązania finansowe",
        description3: "dla Twoich projektów"
      },
      about: {
        badge: "O nas",
        title: "Wasz partner",
        subtitle: "finansowy",
        subtitle2: "zaufania",
        description1: {
          highlight: "Od 1997 roku",
          text: " Aurex K-pital towarzyszy osobom prywatnym i firmom w ich projektach finansowych, łącząc",
          expertise: "ludzką wiedzę specjalistyczną",
          and: "z",
          technology: "innowacjami technologicznymi"
        },
        description2: {
          text: "Nasza misja: demokratyzacja dostępu do finansowania dzięki rozwiązaniom",
          highlight: "szybkim, przejrzystym i szytym na miarę",
          success: "aby zrealizować Wasze ambicje"
        },
        stats: {
          founded: "Rok założenia",
          location: "Siedziba",
          certified: "Rejestr",
          security: "Safe-Nummer"
        },
        trust: {
          title: "Wasze zaufanie, nasz priorytet",
          description: "Certyfikowani i regulowani przez władze europejskie"
        },
        buttons: {
          history: "Nasza historia",
          contact: "Skontaktuj się"
        }
      },
      cta: {
        title: "Gotowi przekształcić",
        titleHighlight: "wasze projekty",
        titleEnd: "w rzeczywistość?",
        description: "Nasi eksperci towarzyszą Wam na każdym kroku w realizacji finansowych ambicji.",
        buttons: {
          request: "Złożyć wniosek",
          simulate: "Symulować kredyt",
          contact: "Skontaktuj się"
        },
        contact: {
          phone: "Telefon",
          address: "Adres",
          addressValue: "Irma-Keilhack-Ring 24, 22145 Hamburg, Niemcy"
        }
      }
    },
    services: {
      personalLoan: {
        title: "Kredyty osobiste",
        description: "Spersonalizowane rozwiązania finansowe z rewolucyjnymi warunkami.",
        points: ["Sztuczna inteligencja do optymalnych stawek", "Odpowiedź w 2 godziny", "Maksymalna elastyczność"],
        cta: "Odkryj",
        useCases: [
          "Prace remontowe",
          "Wymarzona podróż",
          "Wesele",
          "Studia",
          "Zakup pojazdu"
        ]
      },
      businessLoan: {
        title: "Finansowanie biznesu",
        description: "Rozwiń firmę dzięki naszym innowacyjnym rozwiązaniom.",
        points: ["Ekspresowe finansowanie", "Wsparcie ekspertów", "Rozwiązania szyte na miarę"],
        cta: "Odkryj",
        useCases: [
          "Założenie firmy",
          "Rozwój biznesu",
          "Zakup sprzętu",
          "Płynność finansowa",
          "Zakup udziałów"
        ]
      },
      investment: {
        title: "Inteligentne inwestycje",
        description: "Optymalizacja majątku z wykorzystaniem AI i wiedzy eksperckiej.",
        points: ["Inteligentne portfolio", "Konsultacje premium", "Zoptymalizowany zwrot"],
        cta: "Odkryj",
        useCases: [
          "Inwestycje nieruchomościowe",
          "Dywersyfikacja portfela",
          "Przygotowanie emerytury",
          "Optymalizacja podatkowa",
          "Inwestycje ESG"
        ]
      },
      insurance: {
        title: "Ubezpieczenia 360°",
        description: "Pełna ochrona dla Twojego życia i biznesu.",
        points: ["Pełna ochrona", "Reklamacje w 24h", "Wsparcie premium"],
        cta: "Odkryj",
        useCases: [
          "Ochrona rodziny",
          "Ubezpieczenie zawodowe",
          "Gwarancja kredytu",
          "Odpowiedzialność cywilna",
          "Ubezpieczenie zdrowotne"
        ]
      },
      explore: "Poznaj wszystkie nasze usługi",
      features: "Cechy",
      useCases: "Przypadki użycia",
      discover: "Odkryj",
      specialized: {
        title: "Produkty specjalistyczne",
        description: "Ekspertowe rozwiązania dla Twoich specyficznych potrzeb",
        mortgage: {
          title: "Kredyt hipoteczny",
          description: "Sfinansuj swój projekt nieruchomościowy na najlepszych warunkach",
          rate: "Od 1,2% RRSO"
        },
        student: {
          title: "Kredyt studencki",
          description: "Dostosowane rozwiązania finansowania studiów",
          rate: "0% w czasie studiów"
        },
        savings: {
          title: "Konto oszczędnościowe+",
          description: "Oprocentowane i dostępne oszczędności",
          rate: "Do 4% netto"
        },
        premium: {
          title: "Karta Premium",
          description: "Ekskluzywne korzyści i usługi najwyższej klasy",
          rate: "Bez opłat w pierwszym roku"
        }
      },
      process: {
        title: "Nasz proces",
        description: "Uproszczona ścieżka realizacji Twoich projektów",
        step1: {
          title: "Analiza Twojego projektu",
          description: "Spersonalizowane badanie Twoich potrzeb i możliwości finansowych"
        },
        step2: {
          title: "Propozycja szyta na miarę",
          description: "Dostosowane rozwiązania z warunkami zoptymalizowanymi przez AI"
        },
        step3: {
          title: "Ekspresowa walidacja",
          description: "Wstępna odpowiedź w mniej niż 2 godziny robocze"
        },
        step4: {
          title: "Uwolnienie środków",
          description: "Szybkie udostępnienie i ciągłe wsparcie"
        }
      }
    },
    testimonials: {
      title: "Zaufali nam",
      subtitle: "Opinie naszych zadowolonych klientów",
      clients: [
        {
          name: "Jean-Marc Rousseau",
          location: "Lyon, Francja",
          feedback: "Szybka i rzetelna obsługa. Mój kredyt został zatwierdzony w 48 godzin. Dziękuję Aurex K-pital!"
        },
        {
          name: "Amélie Blanchard",
          location: "Paryż, Francja",
          feedback: "Profesjonalny zespół, przejrzysty interfejs i naprawdę spersonalizowane wsparcie."
        },
        {
          name: "Thomas Bonnet",
          location: "Tuluza, Francja",
          feedback: "Symulator był bardzo przejrzysty, a warunki lepsze niż w moim banku."
        }
      ]
    },
    simulator: {
      title: "Kalkulator Pożyczkowy",
      titleSecond: "Inteligentny",
      subtitle: "Otrzymaj spersonalizowane oszacowanie finansowania w czasie rzeczywistym",
      form: {
        loanType: "Rodzaj finansowania",
        amount: "Żądana kwota (€)",
        duration: "Czas spłaty (miesiące)",
        income: "Miesięczny dochód netto (opcjonalnie)",
        incomeHelper: "Informacja używana do optymalizacji stawki",
        guarantee: "Czy masz gwarancję lub poręczenie?",
        guaranteeOptions: {
          yes: "Tak, mam gwarancję",
          no: "Nie, bez gwarancji",
          maybe: "Do oceny według oferty"
        },
        loanTypes: {
          personal: {
            label: "Kredyt Osobisty",
            description: "Na wszystkie Twoje osobiste projekty"
          },
          auto: {
            label: "Kredyt Samochodowy",
            description: "Finansowanie pojazdu nowego lub używanego"
          },
          realEstate: {
            label: "Kredyt Hipoteczny",
            description: "Zakup, budowa lub remont"
          },
          professional: {
            label: "Finansowanie Biznesowe",
            description: "Inwestycja biznesowa"
          },
          student: {
            label: "Kredyt Studencki",
            description: "Finansowanie studiów wyższych"
          },
          consolidation: {
            label: "Konsolidacja Kredytów",
            description: "Łączenie istniejących długów"
          }
        }
      },
      configuration: {
        title: "Konfiguracja Twojego kredytu",
        description: "Dostosuj parametry według swoich potrzeb"
      },
      result: {
        title: "Twoje oszacowanie",
        monthlyPayment: "Miesięczna rata",
        interestRate: "Stopa procentowa",
        totalCost: "Całkowity koszt kredytu",
        totalRepayment: "Całkowita kwota do spłaty",
        units: {
          months: "miesięcy",
          years: "lat"
        },
        disclaimer: "To oszacowanie jest orientacyjne i może się różnić w zależności od Twojego ostatecznego profilu. Oferta podlega akceptacji."
      },
      advantages: {
        title: "Twoje korzyści Aurex K-pital",
        items: {
          rates: "Wynegocjowane preferencyjne stawki",
          earlyRepayment: "Wcześniejsza spłata bez opłat",
          response: "Gwarantowana odpowiedź w 24h",
          support: "Spersonalizowane wsparcie"
        }
      },
      cta: {
        title: "Gotowy na realizację swojego projektu?",
        description: "Nasi eksperci doradcy towarzyszą Ci w przekształceniu tej symulacji w rzeczywistość",
        buttons: {
          request: "Złożyć wniosek",
          consultant: "Porozmawiać z doradcą",
          officialRequest: "Złożyć oficjalny wniosek",
          allServices: "Zobacz wszystkie nasze usługi"
        }
      },
      blog: {
        badge: "Ekspertyza i Spostrzeżenia",
        title: "Blog Aurex",
        subtitle: "K-pital",
        description: "Analizy ekspertów, trendy rynkowe i praktyczne porady do optymalizacji Twoich decyzji finansowych i inwestycyjnych.",
        stats: {
          articles: { value: "150+", label: "Opublikowane artykuły" },
          experts: { value: "8", label: "Eksperci autorzy" },
          readers: { value: "50K+", label: "Miesięczni czytelnicy" },
          satisfaction: { value: "95%", label: "Zadowolenie czytelników" }
        },
        featured: { title: "Artykuł na Wyróżnienie" },
        search: { placeholder: "Szukaj artykułu...", allCategories: "Wszystkie kategorie" },
        categories: { title: "Kategorie", innovation: "Innowacje", realEstate: "Nieruchomości", regulation: "Regulacje", economy: "Ekonomia", esg: "ESG", education: "Edukacja" },
        trending: { title: "Trendy" },
        newsletter: { title: "Newsletter", description: "Otrzymuj nasze najnowsze artykuły i analizy bezpośrednio do skrzynki pocztowej", placeholder: "Twój email", subscribe: "Zapisz się", disclaimer: "Maksymalnie 1 email tygodniowo. Łatwa rezygnacja." },
        actions: { readMore: "Przeczytaj pełny artykuł", read: "Czytaj", loadMore: "Załaduj więcej artykułów", readTime: "czytania" }
      }
    }
  },
  fi: {
    menu: {
      home: "Etusivu",
      services: "Palvelut",
      simulator: "Lainalaskuri",
      request: "Hakemus",
      about: "Tietoa meistä",
      contact: "Yhteystiedot",
      faq: "UKK",
      careers: "Ura",
      partners: "Yhteistyökumppanit",
      blog: "Blogi"
    },
    footer: {
      tools: "Työkalut",
      company: "Yritys",
      legal: "Oikeudelliset",
      privacyPolicy: "Tietosuojakäytäntö",
      terms: "Käyttöehdot",
      mentions: "Oikeudellinen ilmoitus",
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Kaikki oikeudet pidätetään.",
      description: "Luotettava rahoituskumppanisi vuodesta 1997. Huippuosaamista, innovaatiota ja asiantuntemusta kaikkiin rahoitusprojekteihisi Euroopassa.",
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
        partners: "Yhteistyökumppanit",
        careers: "Ura",
        blog: "Blogi",
        legal: "Oikeudellinen ilmoitus",
        privacy: "Tietosuojakäytäntö",
        terms: "Käyttöehdot",
        gdpr: "GDPR"
      }
    },
    partners: {
      title: "Luotettavat Kumppanimme",
      description: "Eurooppalainen huippuosaamisen verkosto parhaimpia rahoitusratkaisuja varten",
      stats: "Yli 25 eurooppalaista kumppania • 27 maata katettu • 2,5 miljardia € käsitelty volyymi"
    },
    home: {
      hero: {
        title: "Rahoituskumppanisi",
        subtitle: "vuodesta 1997",
        description: "Huippuosaamista, innovaatiota ja luottamusta kaikkiin rahoitusprojekteihisi",
        ctaBtn: "Tutustu ratkaisuihimme",
        simulateBtn: "Simuloi laina",
        scrollText: "Tutustu",
        carousel: {
          text1: "Käynnistä projektisi Aurex K-pitalin kanssa",
          text2: "Hanki rahoitus ilman omarahoitusta",
          text3: "Sijoita tänään tulevaisuuteesi"
        },
        stats: {
          experience: {
            title: "Vuotta huippuosaamista",
            subtitle: "Jatkuva innovaatio"
          },
          clients: {
            title: "Tyytyväistä asiakasta",
            subtitle: "Taattu tyytyväisyys"
          },
          funding: {
            title: "Toteutettua rahoitusta",
            subtitle: "Muutosvaikutus"
          }
        }
      },
      services: {
        badge: "Palvelut",
        title: "Ratkaisut",
        subtitle: "Innovatiiviset",
        description: "Tutustu vallankumouksellisiin",
        description2: "rahoitusratkaisuihimme",
        description3: "projekteillesi"
      },
      about: {
        badge: "Tietoa meistä",
        title: "Rahoituskumppanisi",
        subtitle: "joka ansaitsee",
        subtitle2: "luottamuksenne",
        description1: {
          highlight: "Vuodesta 1997",
          text: " Aurex K-pital on tukenut yksityishenkilöitä ja yrityksiä heidän rahoitusprojekteissaan yhdistäen",
          expertise: "inhimillisen asiantuntemuksen",
          and: "ja",
          technology: "teknologisen innovaation"
        },
        description2: {
          text: "Missiomme: demokratisoida rahoituksen saatavuus",
          highlight: "nopeiden, läpinäkyvien ja räätälöityjen ratkaisujen",
          success: "avulla kunnianhimojesi toteuttamiseksi"
        },
        stats: {
          founded: "Perustamisvuosi",
          location: "Päämaja",
          certified: "Rekisteri",
          security: "Safe-Nummer"
        },
        trust: {
          title: "Luottamuksenne, prioriteettimme",
          description: "Sertifioitu ja säännelty eurooppalaisten viranomaisten toimesta"
        },
        buttons: {
          history: "Tarinamme",
          contact: "Ota yhteyttä"
        }
      },
      cta: {
        title: "Valmiita muuttamaan",
        titleHighlight: "projektinne",
        titleEnd: "todeksi?",
        description: "Asiantuntijamme tukevat teitä joka askeleella rahoituskunnianhimojenne toteuttamisessa.",
        buttons: {
          request: "Tehdä hakemus",
          simulate: "Simuloida laina",
          contact: "Ota yhteyttä"
        },
        contact: {
          phone: "Puhelin",
          address: "Osoite",
          addressValue: "Irma-Keilhack-Ring 24, 22145 Hamburg, Saksa"
        }
      }
    },
    services: {
      personalLoan: {
        title: "Henkilökohtaiset lainat",
        description: "Räätälöidyt rahoitusratkaisut vallankumouksellisilla ehdoilla.",
        points: ["Älykäs korkolaskenta", "Vastaus 2 tunnissa", "Maksimaalinen joustavuus"],
        cta: "Tutustu",
        useCases: [
          "Remonttityöt",
          "Unelmien matka",
          "Häät",
          "Opinnot",
          "Ajoneuvon osto"
        ]
      },
      businessLoan: {
        title: "Yritysrahoitus",
        description: "Vie yrityksesi uudelle tasolle innovatiivisilla ratkaisuilla.",
        points: ["Pikainen rahoitus", "Asiantuntijatuki", "Räätälöidyt ratkaisut"],
        cta: "Tutustu",
        useCases: [
          "Yrityksen perustaminen",
          "Liiketoiminnan laajentaminen",
          "Laitteiden hankinta",
          "Kassavirta",
          "Osuuksien osto"
        ]
      },
      investment: {
        title: "Älykkäät sijoitukset",
        description: "Varallisuuden optimointi tekoälyllä ja asiantuntijuudella.",
        points: ["Älykäs salkku", "Premium-neuvonta", "Optimoitu tuotto"],
        cta: "Tutustu",
        useCases: [
          "Kiinteistösijoitus",
          "Salkun hajauttaminen",
          "Eläkevalmistelu",
          "Verooptimointi",
          "ESG-sijoitus"
        ]
      },
      insurance: {
        title: "360° vakuutukset",
        description: "Täydellinen suoja elämäsi ja liiketoimintasi projekteille.",
        points: ["Kattava suoja", "Korvaus 24h kuluessa", "Premium-tuki"],
        cta: "Tutustu",
        useCases: [
          "Perheen suoja",
          "Ammattivakuutus",
          "Lainatakuu",
          "Vastuuvakuutus",
          "Terveysvakuutus"
        ]
      },
      explore: "Tutustu kaikkiin palveluihimme",
      features: "Ominaisuudet",
      useCases: "Käyttötapaukset",
      discover: "Tutustu",
      specialized: {
        title: "Erikoistuotteet",
        description: "Asiantuntijaratkaisut erityistarpeisiinne",
        mortgage: {
          title: "Asuntolaina",
          description: "Rahoita kiinteistöprojektisi parhailla ehdoilla",
          rate: "Alkaen 1,2% todellinen vuosikorko"
        },
        student: {
          title: "Opintolaina",
          description: "Räätälöidyt ratkaisut opintojen rahoittamiseen",
          rate: "0% opintojen aikana"
        },
        savings: {
          title: "Säästötili+",
          description: "Korkoa tuottava ja käytettävissä oleva säästö",
          rate: "Jopa 4% netto"
        },
        premium: {
          title: "Premium-kortti",
          description: "Eksklusiiviset edut ja premium-palvelut",
          rate: "Maksuton ensimmäinen vuosi"
        }
      },
      process: {
        title: "Prosessimme",
        description: "Yksinkertaistettu polku projektienne toteuttamiseen",
        step1: {
          title: "Projektinne analysointi",
          description: "Henkilökohtainen tutkimus tarpeistanne ja taloudellisista mahdollisuuksistanne"
        },
        step2: {
          title: "Räätälöity ehdotus",
          description: "Mukautetut ratkaisut AI:n optimoimilla ehdoilla"
        },
        step3: {
          title: "Pikavalidointi",
          description: "Periaatevastaus alle 2 työajassa tunnissa"
        },
        step4: {
          title: "Varojen vapautus",
          description: "Nopea käyttöönotto ja jatkuva tuki"
        }
      }
    },
    testimonials: {
      title: "Asiakkaamme luottavat meihin",
      subtitle: "Tyytyväisten asiakkaidemme palautteet",
      clients: [
        {
          name: "Jean-Marc Rousseau",
          location: "Lyon, Ranska",
          feedback: "Nopea ja luotettava palvelu. Lainani hyväksyttiin 48 tunnissa. Kiitos Aurex K-pital!"
        },
        {
          name: "Amélie Blanchard",
          location: "Pariisi, Ranska",
          feedback: "Ammattimainen tiimi, helppo käyttöliittymä ja yksilöllinen tuki."
        },
        {
          name: "Thomas Bonnet",
          location: "Toulouse, Ranska",
          feedback: "Laskuri oli selkeä ja sain paremmat ehdot kuin pankistani."
        }
      ]
    },
    simulator: {
      title: "Lainalaskuri",
      titleSecond: "Älykäs",
      subtitle: "Saa henkilökohtainen reaaliaikainen arvio rahoituksestasi",
      form: {
        loanType: "Rahoitustyyppi",
        amount: "Haluttu summa (€)",
        duration: "Takaisinmaksuaika (kuukausia)",
        income: "Kuukausittaiset nettotulot (valinnainen)",
        incomeHelper: "Tieto käytetään korkosi optimointiin",
        guarantee: "Onko sinulla takuuta tai takausta?",
        guaranteeOptions: {
          yes: "Kyllä, minulla on takuu",
          no: "Ei, ei takuuta",
          maybe: "Arvioitava tarjouksen mukaan"
        },
        loanTypes: {
          personal: {
            label: "Henkilökohtainen Laina",
            description: "Kaikkiin henkilökohtaisiin projekteihin"
          },
          auto: {
            label: "Autolaina",
            description: "Uuden tai käytetyn ajoneuvon rahoitus"
          },
          realEstate: {
            label: "Asuntolaina",
            description: "Osto, rakentaminen tai remontti"
          },
          professional: {
            label: "Yrityslaina",
            description: "Liiketoimintainvestointi"
          },
          student: {
            label: "Opintolaina",
            description: "Korkeakouluopintojen rahoitus"
          },
          consolidation: {
            label: "Lainojen Yhdistäminen",
            description: "Olemassa olevien velkojen yhdistäminen"
          }
        }
      },
      configuration: {
        title: "Lainasi konfigurointi",
        description: "Mukauta parametrit tarpeidesi mukaan"
      },
      result: {
        title: "Arviosi",
        monthlyPayment: "Kuukausierä",
        interestRate: "Korko",
        totalCost: "Luoton kokonaiskustannus",
        totalRepayment: "Takaisinmaksettava kokonaissumma",
        units: {
          months: "kuukautta",
          years: "vuotta"
        },
        disclaimer: "Tämä arvio on ohjeellinen ja voi vaihdella lopullisen profiilisi mukaan. Tarjous hyväksymisen varauksella."
      },
      advantages: {
        title: "Aurex K-pital -etusi",
        items: {
          rates: "Neuvotellut etuuskorot",
          earlyRepayment: "Ennenaikainen takaisinmaksu ilman maksuja",
          response: "Taattu vastaus 24h kuluessa",
          support: "Henkilökohtainen tuki"
        }
      },
      cta: {
        title: "Valmis toteuttamaan projektisi?",
        description: "Asiantuntijakonsulttimme auttavat sinua muuttamaan tämän simulaation todellisuudeksi",
        buttons: {
          request: "Tehdä hakemus",
          consultant: "Puhua konsultin kanssa",
          officialRequest: "Tehdä virallinen hakemus",
          allServices: "Katso kaikki palvelumme"
        }
      }
      },
      blog: {
        badge: "Asiantuntemus ja Näkemykset",
        title: "Aurex Blog",
        subtitle: "K-pital",
        description: "Asiantuntija-analyysejä, markkinatrendejä ja käytännön neuvoja talous- ja sijoituspäätöstesi optimointiin.",
        stats: {
          articles: { value: "150+", label: "Julkaistuja artikkeleita" },
          experts: { value: "8", label: "Asiantuntijakirjoittajia" },
          readers: { value: "50K+", label: "Kuukausittaisia lukijoita" },
          satisfaction: { value: "95%", label: "Lukijatyytyväisyys" }
        },
        featured: { title: "Pääartikkeli" },
        search: { placeholder: "Etsi artikkeli...", allCategories: "Kaikki kategoriat" },
        categories: { title: "Kategoriat", innovation: "Innovaatio", realEstate: "Kiinteistöt", regulation: "Säännökset", economy: "Talous", esg: "ESG", education: "Koulutus" },
        trending: { title: "Trendit" },
        newsletter: { title: "Uutiskirje", description: "Saa uusimmat artikkelimme ja analyysimme suoraan sähköpostiisi", placeholder: "Sähköpostisi", subscribe: "Tilaa", disclaimer: "Enintään 1 sähköposti viikossa. Helppo peruuttaa." },
        actions: { readMore: "Lue koko artikkeli", read: "Lue", loadMore: "Lataa lisää artikkeleita", readTime: "lukuaikaa" }
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
      terms: "Termos e condições",
      mentions: "Informações legais",
      gdpr: "RGPD",
      rights: "© 2024 Aurex K-pital. Todos os direitos reservados.",
      description: "O vosso parceiro financeiro de confiança desde 1997. Excelência, inovação e experiência para todos os vossos projetos financeiros na Europa.",
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
        partners: "Nossos parceiros",
        careers: "Carreiras",
        blog: "Blog",
        legal: "Informações legais",
        privacy: "Política de privacidade",
        terms: "Termos e condições",
        gdpr: "RGPD"
      }
    },
    partners: {
      title: "Nossos Parceiros de Confiança",
      description: "Uma rede europeia de excelência para oferecer as melhores soluções financeiras",
      stats: "Mais de 25 parceiros europeus • 27 países cobertos • 2,5 mil milhões € de volume tratado"
    },
    home: {
      hero: {
        title: "Seu Parceiro Financeiro",
        subtitle: "desde 1997",
        description: "Excelência, inovação e confiança para todos os seus projetos financeiros",
        ctaBtn: "Descobrir nossas soluções",
        simulateBtn: "Simular um empréstimo",
        scrollText: "Descobrir",
        carousel: {
          text1: "Lance o seu projeto com a Aurex K-pital",
          text2: "Obtenha financiamento sem entrada",
          text3: "Invista hoje no seu futuro"
        },
        stats: {
          experience: {
            title: "Anos de excelência",
            subtitle: "Inovação contínua"
          },
          clients: {
            title: "Clientes satisfeitos",
            subtitle: "Satisfação garantida"
          },
          funding: {
            title: "Financiamentos realizados",
            subtitle: "Impacto transformador"
          }
        }
      },
      services: {
        badge: "Serviços",
        title: "Soluções",
        subtitle: "Inovadoras",
        description: "Descubra as nossas soluções financeiras",
        description2: "revolucionárias",
        description3: "para os seus projetos"
      },
      about: {
        badge: "Sobre nós",
        title: "O vosso parceiro",
        subtitle: "financeiro",
        subtitle2: "de confiança",
        description1: {
          highlight: "Desde 1997,",
          text: " a Aurex K-pital acompanha particulares e empresas nos seus projetos financeiros com uma abordagem que combina",
          expertise: "experiência humana",
          and: "e",
          technology: "inovação tecnológica"
        },
        description2: {
          text: "A nossa missão: democratizar o acesso ao financiamento graças a soluções",
          highlight: "rápidas, transparentes e à medida",
          success: "para concretizar as vossas ambições"
        },
        stats: {
          founded: "Ano de fundação",
          location: "Sede social",
          certified: "Registo",
          security: "Safe-Nummer"
        },
        trust: {
          title: "A vossa confiança, a nossa prioridade",
          description: "Certificados e regulamentados pelas autoridades europeias"
        },
        buttons: {
          history: "A nossa história",
          contact: "Contactar-nos"
        }
      },
      cta: {
        title: "Prontos para transformar",
        titleHighlight: "os vossos projetos",
        titleEnd: "em realidade?",
        description: "Os nossos especialistas acompanham-vos em cada etapa para concretizar as vossas ambições financeiras.",
        buttons: {
          request: "Fazer um pedido",
          simulate: "Simular um empréstimo",
          contact: "Contactar-nos"
        },
        contact: {
          phone: "Telefone",
          address: "Morada",
          addressValue: "Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemanha"
        }
      }
    },
    services: {
      personalLoan: {
        title: "Créditos pessoais",
        description: "Soluções de financiamento à medida com condições revolucionárias.",
        points: ["IA para taxas otimais", "Resposta em 2h", "Flexibilidade máxima"],
        cta: "Descobrir",
        useCases: [
          "Trabalhos de renovação",
          "Viagem de sonho",
          "Casamento",
          "Estudos",
          "Compra de veículo"
        ]
      },
      businessLoan: {
        title: "Financiamento empresarial",
        description: "Impulsione a sua empresa com as nossas soluções inovadoras.",
        points: ["Financiamento expresso", "Acompanhamento especializado", "Soluções à medida"],
        cta: "Descobrir",
        useCases: [
          "Criação de empresa",
          "Expansão comercial",
          "Compra de equipamentos",
          "Tesouraria",
          "Compra de participações"
        ]
      },
      investment: {
        title: "Investimentos inteligentes",
        description: "Otimização patrimonial com inteligência artificial e experiência humana.",
        points: ["Carteira inteligente", "Consultoria premium", "Rendimento otimizado"],
        cta: "Descobrir",
        useCases: [
          "Investimento imobiliário",
          "Diversificação patrimonial",
          "Preparação reforma",
          "Otimização fiscal",
          "Investimento ESG"
        ]
      },
      insurance: {
        title: "Seguros 360°",
        description: "Proteção total e inovadora para todos os seus projetos de vida e negócio.",
        points: ["Cobertura completa", "Gestão de sinistros 24h", "Suporte premium"],
        cta: "Descobrir",
        useCases: [
          "Proteção familiar",
          "Seguro profissional",
          "Garantia empréstimo",
          "Responsabilidade civil",
          "Previdência saúde"
        ]
      },
      explore: "Explorar todos os nossos serviços",
      features: "Características",
      useCases: "Casos de uso",
      discover: "Descobrir",
      specialized: {
        title: "Produtos especializados",
        description: "Soluções especializadas para as suas necessidades específicas",
        mortgage: {
          title: "Crédito habitação",
          description: "Financie o seu projeto imobiliário nas melhores condições",
          rate: "A partir de 1,2% TAEG"
        },
        student: {
          title: "Crédito estudante",
          description: "Soluções adaptadas para financiar os seus estudos",
          rate: "0% durante os estudos"
        },
        savings: {
          title: "Conta poupança+",
          description: "Poupança remunerada e disponível",
          rate: "Até 4% líquidos"
        },
        premium: {
          title: "Cartão Premium",
          description: "Vantagens exclusivas e serviços de alta gama",
          rate: "Sem custos no 1º ano"
        }
      },
      process: {
        title: "O nosso processo",
        description: "Um percurso simplificado para concretizar os seus projetos",
        step1: {
          title: "Análise do seu projeto",
          description: "Estudo personalizado das suas necessidades e capacidades financeiras"
        },
        step2: {
          title: "Proposta à medida",
          description: "Soluções adaptadas com condições otimizadas por IA"
        },
        step3: {
          title: "Validação expressa",
          description: "Resposta de princípio em menos de 2h úteis"
        },
        step4: {
          title: "Desbloqueio dos fundos",
          description: "Disponibilização rápida e acompanhamento contínuo"
        }
      }
    },
    testimonials: {
      title: "Confiam em nós",
      subtitle: "O que dizem os nossos clientes satisfeitos",
      clients: [
        {
          name: "Jean-Marc Rousseau",
          location: "Lyon, França",
          feedback: "Serviço rápido e sério. O meu crédito foi aprovado em 48h! Obrigado Aurex K-pital."
        },
        {
          name: "Amélie Blanchard",
          location: "Paris, França",
          feedback: "Equipa profissional, plataforma clara e um acompanhamento verdadeiramente personalizado."
        },
        {
          name: "Thomas Bonnet",
          location: "Toulouse, França",
          feedback: "O simulador foi muito claro e obtive melhores condições que no meu banco."
        }
      ]
    },
    simulator: {
      title: "Calculadora de Empréstimo",
      titleSecond: "Inteligente",
      subtitle: "Obtenha uma estimativa personalizada em tempo real do seu financiamento",
      form: {
        loanType: "Tipo de financiamento",
        amount: "Quantia desejada (€)",
        duration: "Duração de reembolso (meses)",
        income: "Rendimento mensal líquido (opcional)",
        incomeHelper: "Informação utilizada para otimizar a sua taxa",
        guarantee: "Tem garantia ou fiança?",
        guaranteeOptions: {
          yes: "Sim, tenho garantia",
          no: "Não, sem garantia",
          maybe: "A avaliar conforme a oferta"
        },
        loanTypes: {
          personal: {
            label: "Empréstimo Pessoal",
            description: "Para todos os seus projetos pessoais"
          },
          auto: {
            label: "Crédito Auto",
            description: "Financiamento veículo novo ou usado"
          },
          realEstate: {
            label: "Crédito Habitação",
            description: "Compra, construção ou renovação"
          },
          professional: {
            label: "Financiamento Profissional",
            description: "Investimento profissional"
          },
          student: {
            label: "Empréstimo Estudante",
            description: "Financiamento estudos superiores"
          },
          consolidation: {
            label: "Consolidação de Créditos",
            description: "Agrupamento de dívidas existentes"
          }
        }
      },
      configuration: {
        title: "Configuração do seu empréstimo",
        description: "Personalize os parâmetros conforme as suas necessidades"
      },
      result: {
        title: "A sua estimativa",
        monthlyPayment: "Prestação mensal",
        interestRate: "Taxa de juro",
        totalCost: "Custo total do crédito",
        totalRepayment: "Montante total a reembolsar",
        units: {
          months: "meses",
          years: "anos"
        },
        disclaimer: "Esta estimativa é indicativa e pode variar conforme o seu perfil final. Oferta sujeita a aceitação."
      },
      advantages: {
        title: "As suas vantagens Aurex K-pital",
        items: {
          rates: "Taxas preferenciais negociadas",
          earlyRepayment: "Reembolso antecipado sem custos",
          response: "Resposta garantida em 24h",
          support: "Acompanhamento personalizado"
        }
      },
      cta: {
        title: "Pronto para concretizar o seu projeto?",
        description: "Os nossos consultores especialistas acompanham-no para transformar esta simulação em realidade",
        buttons: {
          request: "Fazer pedido",
          consultant: "Falar com um consultor",
          officialRequest: "Fazer pedido oficial",
          allServices: "Ver todos os nossos serviços"
        }
      }
      },
      blog: {
        badge: "Perícia e Insights",
        title: "Blog Aurex",
        subtitle: "K-pital",
        description: "Análises de especialistas, tendências do mercado e conselhos práticos para otimizar as suas decisões financeiras e de investimento.",
        stats: {
          articles: { value: "150+", label: "Artigos publicados" },
          experts: { value: "8", label: "Especialistas autores" },
          readers: { value: "50K+", label: "Leitores mensais" },
          satisfaction: { value: "95%", label: "Satisfação dos leitores" }
        },
        featured: { title: "Artigo em Destaque" },
        search: { placeholder: "Procurar um artigo...", allCategories: "Todas as categorias" },
        categories: { title: "Categorias", innovation: "Inovação", realEstate: "Imobiliário", regulation: "Regulamentação", economy: "Economia", esg: "ESG", education: "Educação" },
        trending: { title: "Tendências" },
        newsletter: { title: "Newsletter", description: "Receba os nossos últimos artigos e análises diretamente na sua caixa de correio", placeholder: "O seu email", subscribe: "Subscrever", disclaimer: "Máximo 1 email por semana. Fácil cancelamento." },
        actions: { readMore: "Ler o artigo completo", read: "Ler", loadMore: "Carregar mais artigos", readTime: "de leitura" }
      }
  },
  el: {
    menu: {
      home: "Αρχική",
      services: "Υπηρεσίες",
      simulator: "Υπολογιστής Δανείου",
      request: "Αίτηση",
      about: "Σχετικά με εμάς",
      contact: "Επικοινωνία",
      faq: "Συχνές ερωτήσεις",
      careers: "Καριέρα",
      partners: "Συνεργάτες",
      blog: "Ιστολόγιο"
    },
    footer: {
      tools: "Εργαλεία",
      company: "Εταιρεία",
      legal: "Νομικά",
      privacyPolicy: "Πολιτική Απορρήτου",
      terms: "Όροι Χρήσης",
      mentions: "Νομική Ειδοποίηση",
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Με την επιφύλαξη παντός δικαιώματος.",
      description: "Ο αξιόπιστος χρηματοοικονομικός σας εταίρος από το 1997. Αριστεία, καινοτομία και εμπειρία για όλα τα χρηματοοικονομικά σας έργα στην Ευρώπη.",
      services: "Υπηρεσίες",
      copyright: "© 2024 Aurex K-pital. Με την επιφύλαξη παντός δικαιώματος.",
      establishment: "Αδειοδοτημένο χρηματοπιστωτικό ίδρυμα στην Ευρώπη",
      links: {
        personalLoans: "Προσωπικά δάνεια",
        proFinancing: "Επιχειρηματική χρηματοδότηση",
        investments: "Επενδύσεις",
        insurance: "Ασφάλειες",
        simulator: "Προσομοιωτής δανείου",
        request: "Αίτηση χρηματοδότησης",
        faq: "Συχνές ερωτήσεις",
        contact: "Επικοινωνία",
        about: "Σχετικά με εμάς",
        partners: "Οι συνεργάτες μας",
        careers: "Καριέρα",
        blog: "Ιστολόγιο",
        legal: "Νομική ειδοποίηση",
        privacy: "Πολιτική απορρήτου",
        terms: "Όροι χρήσης",
        gdpr: "GDPR"
      }
    },
    partners: {
      title: "Οι Αξιόπιστοι Συνεργάτες μας",
      description: "Ένα ευρωπαϊκό δίκτυο αριστείας για τις καλύτερες χρηματοοικονομικές λύσεις",
      stats: "Πάνω από 25 ευρωπαίους συνεργάτες • 27 χώρες κάλυψης • 2,5 δισ. € όγκος συναλλαγών"
    },
    home: {
      hero: {
        title: "Ο Χρηματοοικονομικός σας Εταίρος",
        subtitle: "από το 1997",
        description: "Αριστεία, καινοτομία και εμπιστοσύνη για όλα τα χρηματοοικονομικά σας έργα",
        ctaBtn: "Ανακαλύψτε τις λύσεις μας",
        simulateBtn: "Προσομοιώστε ένα δάνειο",
        scrollText: "Ανακαλύψτε",
        carousel: {
          text1: "Ξεκινήστε το έργο σας με την Aurex K-pital",
          text2: "Αποκτήστε χρηματοδότηση χωρίς προκαταβολή",
          text3: "Επενδύστε σήμερα στο μέλλον σας"
        },
        stats: {
          experience: {
            title: "Χρόνια αριστείας",
            subtitle: "Συνεχής καινοτομία"
          },
          clients: {
            title: "Ικανοποιημένοι πελάτες",
            subtitle: "Εγγυημένη ικανοποίηση"
          },
          funding: {
            title: "Πραγματοποιημένες χρηματοδοτήσεις",
            subtitle: "Μεταμορφωτικός αντίκτυπος"
          }
        }
      },
      services: {
        badge: "Υπηρεσίες",
        title: "Λύσεις",
        subtitle: "Καινοτόμες",
        description: "Ανακαλύψτε τις επαναστατικές",
        description2: "χρηματοοικονομικές λύσεις μας",
         description3: "για τα έργα σας"
       },
       about: {
         badge: "Σχετικά με εμάς",
         title: "Ο εταίρος σας",
         subtitle: "για χρηματοοικονομικά",
         subtitle2: "θέματα",
         description1: {
           highlight: "Από το 1997,",
           text: " η Aurex K-pital συνοδεύει ιδιώτες και επιχειρήσεις στα χρηματοοικονομικά τους έργα με προσέγγιση που συνδυάζει",
           expertise: "ανθρώπινη εμπειρία",
           and: "και",
           technology: "τεχνολογική καινοτομία"
         },
         description2: {
           text: "Η αποστολή μας: εκδημοκρατισμός της πρόσβασης στη χρηματοδότηση μέσω λύσεων",
           highlight: "γρήγορων, διαφανών και εξατομικευμένων",
           success: "για την υλοποίηση των φιλοδοξιών σας"
         },
         stats: {
           founded: "Έτος ίδρυσης",
           location: "Έδρα",
           certified: "Μητρώο",
           security: "Safe-Nummer"
         },
         trust: {
           title: "Η εμπιστοσύνη σας, προτεραιότητά μας",
           description: "Πιστοποιημένοι και ρυθμιζόμενοι από ευρωπαϊκές αρχές"
         },
         buttons: {
           history: "Η ιστορία μας",
           contact: "Επικοινωνήστε μαζί μας"
         }
       },
       cta: {
         title: "Έτοιμοι να μεταμορφώσετε",
         titleHighlight: "τα έργα σας",
         titleEnd: "σε πραγματικότητα;",
         description: "Οι ειδικοί μας σας συνοδεύουν σε κάθε βήμα για την υλοποίηση των χρηματοοικονομικών σας φιλοδοξιών.",
         buttons: {
           request: "Υποβολή αίτησης",
           simulate: "Προσομοίωση δανείου",
           contact: "Επικοινωνήστε μαζί μας"
         },
         contact: {
           phone: "Τηλέφωνο",
           address: "Διεύθυνση",
           addressValue: "Irma-Keilhack-Ring 24, 22145 Αμβούργο, Γερμανία"
         }
       }
     },
    services: {
      personalLoan: {
        title: "Προσωπικά δάνεια",
        description: "Εξατομικευμένες χρηματοδοτικές λύσεις με επαναστατικούς όρους.",
        points: ["AI για βέλτιστα επιτόκια", "Απάντηση σε 2 ώρες", "Μέγιστη ευελιξία"],
        cta: "Ανακάλυψε",
        useCases: [
          "Εργασίες ανακαίνισης",
          "Ταξίδι των ονείρων",
          "Γάμος",
          "Σπουδές",
          "Αγορά οχήματος"
        ]
      },
      businessLoan: {
        title: "Επιχειρηματικά δάνεια",
        description: "Αναπτύξτε την επιχείρησή σας με τις καινοτόμες λύσεις μας.",
        points: ["Άμεση χρηματοδότηση", "Υποστήριξη από ειδικούς", "Εξατομικευμένες λύσεις"],
        cta: "Ανακάλυψε",
        useCases: [
          "Δημιουργία επιχείρησης",
          "Εμπορική επέκταση",
          "Αγορά εξοπλισμού",
          "Ταμείο",
          "Αγορά μετοχών"
        ]
      },
      investment: {
        title: "Έξυπνες επενδύσεις",
        description: "Βελτιστοποίηση περιουσίας με τεχνητή νοημοσύνη και ανθρώπινη εμπειρία.",
        points: ["Έξυπνο χαρτοφυλάκιο", "Premium συμβουλευτική", "Βελτιστοποιημένες αποδόσεις"],
        cta: "Ανακάλυψε",
        useCases: [
          "Επένδυση ακινήτων",
          "Διαφοροποίηση περιουσίας",
          "Προετοιμασία συνταξιοδότησης",
          "Φορολογική βελτιστοποίηση",
          "Επένδυση ESG"
        ]
      },
      insurance: {
        title: "Ασφάλειες 360°",
        description: "Πλήρης και καινοτόμα κάλυψη για τη ζωή και τις επιχειρήσεις σας.",
        points: ["Πλήρης κάλυψη", "Αποζημίωση σε 24 ώρες", "Premium υποστήριξη"],
        cta: "Ανακάλυψε",
        useCases: [
          "Προστασία οικογένειας",
          "Επαγγελματική ασφάλιση",
          "Εγγύηση δανείου",
          "Αστική ευθύνη",
          "Υγειονομική πρόνοια"
        ]
      },
      explore: "Εξερευνήστε όλες τις υπηρεσίες μας",
      features: "Χαρακτηριστικά",
      useCases: "Περιπτώσεις χρήσης",
      discover: "Ανακάλυψε",
      specialized: {
        title: "Εξειδικευμένα προϊόντα",
        description: "Εξειδικευμένες λύσεις για τις συγκεκριμένες ανάγκες σας",
        mortgage: {
          title: "Στεγαστικό δάνειο",
          description: "Χρηματοδοτήστε το ακίνητο έργο σας με τους καλύτερους όρους",
          rate: "Από 1,2% ΕΠΣ"
        },
        student: {
          title: "Φοιτητικό δάνειο",
          description: "Προσαρμοσμένες λύσεις για τη χρηματοδότηση των σπουδών σας",
          rate: "0% κατά τη διάρκεια των σπουδών"
        },
        savings: {
          title: "Λογαριασμός αποταμίευσης+",
          description: "Επικερδής και διαθέσιμη αποταμίευση",
          rate: "Έως 4% καθαρά"
        },
        premium: {
          title: "Κάρτα Premium",
          description: "Αποκλειστικά πλεονεκτήματα και υπηρεσίες υψηλής ποιότητας",
          rate: "Χωρίς χρέωση τον 1ο χρόνο"
        }
      },
      process: {
        title: "Η διαδικασία μας",
        description: "Μια απλοποιημένη διαδρομή για την υλοποίηση των έργων σας",
        step1: {
          title: "Ανάλυση του έργου σας",
          description: "Εξατομικευμένη μελέτη των αναγκών και χρηματοδοτικών δυνατοτήτων σας"
        },
        step2: {
          title: "Εξατομικευμένη πρόταση",
          description: "Προσαρμοσμένες λύσεις με όρους βελτιστοποιημένους από AI"
        },
        step3: {
          title: "Ταχεία επικύρωση",
          description: "Απάντηση αρχής σε λιγότερο από 2 εργάσιμες ώρες"
        },
        step4: {
          title: "Απελευθέρωση κεφαλαίων",
          description: "Ταχεία διάθεση και συνεχής υποστήριξη"
        }
      }
    },
    testimonials: {
      title: "Μας εμπιστεύονται",
      subtitle: "Τι λένε οι ικανοποιημένοι πελάτες μας",
      clients: [
        {
          name: "Jean-Marc Rousseau",
          location: "Λυών, Γαλλία",
          feedback: "Γρήγορη και αξιόπιστη εξυπηρέτηση. Το δάνειό μου εγκρίθηκε σε 48 ώρες. Ευχαριστώ Aurex K-pital!"
        },
        {
          name: "Amélie Blanchard",
          location: "Παρίσι, Γαλλία",
          feedback: "Επαγγελματική ομάδα, απλό περιβάλλον και πραγματικά εξατομικευμένη υποστήριξη."
        },
        {
          name: "Thomas Bonnet",
          location: "Τουλούζη, Γαλλία",
          feedback: "Ο υπολογιστής ήταν ξεκάθαρος και πήρα καλύτερους όρους από την τράπεζά μου."
        }
      ]
    },
    simulator: {
      title: "Υπολογιστής Δανείου",
      titleSecond: "Έξυπνος",
      subtitle: "Λάβετε μια εξατομικευμένη εκτίμηση σε πραγματικό χρόνο για τη χρηματοδότησή σας",
      form: {
        loanType: "Τύπος χρηματοδότησης",
        amount: "Επιθυμητό ποσό (€)",
        duration: "Διάρκεια αποπληρωμής (μήνες)",
        income: "Μηνιαίο καθαρό εισόδημα (προαιρετικό)",
        incomeHelper: "Πληροφορία που χρησιμοποιείται για τη βελτιστοποίηση του επιτοκίου σας",
        guarantee: "Έχετε εγγύηση ή εγγυητή;",
        guaranteeOptions: {
          yes: "Ναι, έχω εγγύηση",
          no: "Όχι, χωρίς εγγύηση",
          maybe: "Προς αξιολόγηση σύμφωνα με την προσφορά"
        },
        loanTypes: {
          personal: {
            label: "Προσωπικό Δάνειο",
            description: "Για όλα σας τα προσωπικά έργα"
          },
          auto: {
            label: "Δάνειο Αυτοκινήτου",
            description: "Χρηματοδότηση καινούργιου ή μεταχειρισμένου οχήματος"
          },
          realEstate: {
            label: "Στεγαστικό Δάνειο",
            description: "Αγορά, κατασκευή ή ανακαίνιση"
          },
          professional: {
            label: "Επιχειρηματική Χρηματοδότηση",
            description: "Επιχειρηματική επένδυση"
          },
          student: {
            label: "Φοιτητικό Δάνειο",
            description: "Χρηματοδότηση τριτοβάθμιων σπουδών"
          },
          consolidation: {
            label: "Ενοποίηση Δανείων",
            description: "Ομαδοποίηση υπαρχόντων χρεών"
          }
        }
      },
      configuration: {
        title: "Διαμόρφωση του δανείου σας",
        description: "Προσαρμόστε τις παραμέτρους σύμφωνα με τις ανάγκες σας"
      },
      result: {
        title: "Η εκτίμησή σας",
        monthlyPayment: "Μηνιαία δόση",
        interestRate: "Επιτόκιο",
        totalCost: "Συνολικό κόστος πίστωσης",
        totalRepayment: "Συνολικό ποσό προς αποπληρωμή",
        units: {
          months: "μήνες",
          years: "χρόνια"
        },
        disclaimer: "Αυτή η εκτίμηση είναι ενδεικτική και μπορεί να διαφέρει ανάλογα με το τελικό σας προφίλ. Προσφορά υπό έγκριση."
      },
      advantages: {
        title: "Τα πλεονεκτήματά σας Aurex K-pital",
        items: {
          rates: "Διαπραγματευμένα προνομιακά επιτόκια",
          earlyRepayment: "Πρόωρη αποπληρωμή χωρίς χρεώσεις",
          response: "Εγγυημένη απάντηση εντός 24ώρου",
          support: "Εξατομικευμένη υποστήριξη"
        }
      },
      cta: {
        title: "Έτοιμοι να υλοποιήσετε το έργο σας;",
        description: "Οι ειδικοί σύμβουλοί μας σας συνοδεύουν για να μετατρέψουν αυτή τη προσομοίωση σε πραγματικότητα",
        buttons: {
          request: "Κάντε αίτηση",
          consultant: "Μιλήστε με σύμβουλο",
          officialRequest: "Κάντε επίσημη αίτηση",
          allServices: "Δείτε όλες τις υπηρεσίες μας"
        }
      },
      blog: {
        badge: "Εμπειρία & Ανάλυση",
        title: "Blog Aurex",
        subtitle: "K-pital", 
        description: "Αναλύσεις ειδικών, τάσεις της αγοράς και πρακτικές συμβουλές για τη βελτιστοποίηση των χρηματοοικονομικών και επενδυτικών σας αποφάσεων.",
        stats: {
          articles: {
            value: "150+",
            label: "Δημοσιευμένα άρθρα"
          },
          experts: {
            value: "8", 
            label: "Συγγραφείς ειδικοί"
          },
          readers: {
            value: "50K+",
            label: "Μηνιαίοι αναγνώστες"
          },
          satisfaction: {
            value: "95%",
            label: "Ικανοποίηση αναγνωστών"
          }
        },
        featured: {
          title: "Κύριο Άρθρο"
        },
        search: {
          placeholder: "Αναζήτηση άρθρου...",
          allCategories: "Όλες οι κατηγορίες"
        },
        categories: {
          title: "Κατηγορίες",
          innovation: "Καινοτομία",
          realEstate: "Ακίνητα",
          regulation: "Κανονισμοί",
          economy: "Οικονομία",
          esg: "ESG",
          education: "Εκπαίδευση"
        },
        trending: {
          title: "Τάσεις"
        },
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
          readTime: "ανάγνωσης"
        }
      }
    }
  }
};