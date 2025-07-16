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
    contact: {
      hero: {
        badge: "Support Excellence",
        title: "Contactez Nos",
        titleHighlight: "Experts",
        description: "Notre équipe dédiée vous accompagne à chaque étape de votre projet financier. Plusieurs moyens pour nous joindre selon vos préférences.",
        stats: {
          satisfaction: "Satisfaction client",
          responseTime: "Temps de réponse moyen",
          experts: "Conseillers experts"
        }
      },
      methods: {
        title: "Comment Nous Joindre",
        description: "Choisissez le canal qui vous convient le mieux",
        phone: {
          title: "Téléphone",
          description: "Parlez directement à nos conseillers",
          hours: "Lun-Ven: 8h-19h, Sam: 9h-17h"
        },
        email: {
          title: "Email",
          description: "Envoyez-nous vos questions",
          hours: "Réponse sous 4h en moyenne"
        },
        address: {
          title: "Adresse",
          description: "Visitez nos bureaux à Hamburg",
          hours: "Sur rendez-vous uniquement"
        },
        chat: {
          title: "Chat en ligne",
          description: "Assistance instantanée",
          value: "Disponible 24h/7j",
          hours: "Réponse immédiate"
        }
      },
      form: {
        title: "Envoyez-nous un message",
        description: "Nous vous répondons rapidement et de manière personnalisée",
        fields: {
          name: "Nom complet",
          email: "Email",
          phone: "Téléphone",
          subject: "Sujet",
          message: "Votre message",
          preferredContact: "Mode de contact préféré",
          urgency: "Niveau d'urgence"
        },
        placeholders: {
          subject: "Choisissez un sujet",
          contact: "Comment préférez-vous être contacté ?",
          urgency: "Sélectionnez",
          message: "Décrivez votre demande en détail..."
        },
        subjects: {
          loanRequest: "Demande de prêt",
          investment: "Conseil en investissement",
          insurance: "Assurance",
          existingClient: "Client existant",
          partnership: "Partenariat",
          complaint: "Réclamation",
          other: "Autre"
        },
        contactMethods: {
          phone: "Téléphone",
          email: "Email",
          appointment: "Rendez-vous"
        },
        urgencyLevels: {
          low: "Normal (48h)",
          medium: "Urgent (24h)",
          high: "Très urgent (4h)"
        },
        submit: "Envoyer le message",
        commitment: "Nous nous engageons à vous répondre dans les délais indiqués selon le niveau d'urgence sélectionné.",
        required: "*"
      },
      departments: {
        title: "Nos Départements",
        commercial: {
          name: "Service Commercial",
          description: "Nouvelles demandes et informations"
        },
        client: {
          name: "Service Client",
          description: "Suivi de dossiers existants"
        },
        support: {
          name: "Support Technique",
          description: "Assistance plateforme et outils"
        },
        management: {
          name: "Direction",
          description: "Réclamations et suggestions"
        }
      },
      schedule: {
        title: "Horaires d'ouverture",
        weekdays: "Lundi - Vendredi",
        saturday: "Samedi",
        sunday: "Dimanche",
        hours: {
          weekdays: "8h00 - 19h00",
          saturday: "9h00 - 17h00",
          sunday: "Fermé"
        },
        types: {
          advisors: "Conseillers disponibles",
          reduced: "Service réduit",
          emergency: "Urgences uniquement"
        }
      },
      certifications: {
        title: "Garanties & Certifications",
        iso: "Données sécurisées ISO 27001",
        gdpr: "Conformité RGPD",
        eu: "Agréé Union Européenne",
        bafin: "Régulé par BaFin"
      },
      success: "Votre message a été envoyé avec succès ! Nous vous contacterons rapidement."
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
    contact: {
      hero: {
        badge: "Excelência em Suporte",
        title: "Contacte os Nossos",
        titleHighlight: "Especialistas",
        description: "A nossa equipa dedicada acompanha-o em cada etapa do seu projeto financeiro. Várias formas de nos contactar de acordo com as suas preferências.",
        stats: {
          satisfaction: "Satisfação do cliente",
          responseTime: "Tempo médio de resposta",
          experts: "Conselheiros especialistas"
        }
      },
      methods: {
        title: "Como Nos Contactar",
        description: "Escolha o canal que melhor lhe convém",
        phone: {
          title: "Telefone",
          description: "Fale diretamente com os nossos conselheiros",
          hours: "Seg-Sex: 8-19h, Sáb: 9-17h"
        },
        email: {
          title: "Email",
          description: "Envie-nos as suas questões",
          hours: "Resposta em 4h em média"
        },
        address: {
          title: "Morada",
          description: "Visite os nossos escritórios em Hamburgo",
          hours: "Apenas com marcação"
        },
        chat: {
          title: "Chat online",
          description: "Assistência instantânea",
          value: "Disponível 24h/7",
          hours: "Resposta imediata"
        }
      },
      form: {
        title: "Envie-nos uma mensagem",
        description: "Respondemos rapidamente e de forma personalizada",
        fields: {
          name: "Nome completo",
          email: "Email",
          phone: "Telefone",
          subject: "Assunto",
          message: "A sua mensagem",
          preferredContact: "Método de contacto preferido",
          urgency: "Nível de urgência"
        },
        placeholders: {
          subject: "Escolha um assunto",
          contact: "Como prefere ser contactado?",
          urgency: "Selecionar",
          message: "Descreva o seu pedido em detalhe..."
        },
        subjects: {
          loanRequest: "Pedido de empréstimo",
          investment: "Aconselhamento em investimentos",
          insurance: "Seguro",
          existingClient: "Cliente existente",
          partnership: "Parceria",
          complaint: "Reclamação",
          other: "Outro"
        },
        contactMethods: {
          phone: "Telefone",
          email: "Email",
          appointment: "Encontro"
        },
        urgencyLevels: {
          low: "Normal (48h)",
          medium: "Urgente (24h)",
          high: "Muito urgente (4h)"
        },
        submit: "Enviar mensagem",
        commitment: "Comprometemo-nos a responder nos prazos indicados de acordo com o nível de urgência selecionado.",
        required: "*"
      },
      departments: {
        title: "Os Nossos Departamentos",
        commercial: {
          name: "Serviço Comercial",
          description: "Novos pedidos e informações"
        },
        client: {
          name: "Serviço ao Cliente",
          description: "Acompanhamento de casos existentes"
        },
        support: {
          name: "Suporte Técnico",
          description: "Assistência de plataforma e ferramentas"
        },
        management: {
          name: "Direção",
          description: "Reclamações e sugestões"
        }
      },
      schedule: {
        title: "Horários de funcionamento",
        weekdays: "Segunda - Sexta",
        saturday: "Sábado",
        sunday: "Domingo",
        hours: {
          weekdays: "8:00 - 19:00",
          saturday: "9:00 - 17:00",
          sunday: "Fechado"
        },
        types: {
          advisors: "Conselheiros disponíveis",
          reduced: "Serviço reduzido",
          emergency: "Apenas urgências"
        }
      },
      certifications: {
        title: "Garantias e Certificações",
        iso: "Dados seguros ISO 27001",
        gdpr: "Conformidade RGPD",
        eu: "Aprovado UE",
        bafin: "Regulado por BaFin"
      },
      success: "A sua mensagem foi enviada com sucesso! Contactaremos rapidamente."
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
      terms: "Condizioni generali",
      mentions: "Note legali",
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Tutti i diritti riservati.",
      description: "Il vostro partner finanziario di fiducia dal 1997. Eccellenza, innovazione ed esperienza per tutti i vostri progetti finanziari in Europa.",
      services: "Servizi",
      copyright: "© 2024 Aurex K-pital. Tutti i diritti riservati.",
      establishment: "Istituto finanziario autorizzato in Europa",
      links: {
        personalLoans: "Prestiti personali",
        proFinancing: "Finanziamenti professionali",
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
        terms: "Condizioni generali",
        gdpr: "GDPR"
      }
    },
  }
};