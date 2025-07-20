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
    // ... keep existing code (all existing translations)
    request: {
      hero: {
        badge: "Demande de Financement",
        title: "Votre projet mérite",
        titleHighlight: "le meilleur financement",
        subtitle: "Obtenez une réponse personnalisée en 24h grâce à notre IA avancée et l'expertise de nos conseillers",
        stats: {
          responseTime: { value: "24h", label: "Réponse garantie" },
          security: { value: "100%", label: "Sécurisé RGPD" },
          expert: { value: "24/7", label: "Support expert" }
        }
      },
      steps: [
        { title: "Informations", description: "Vos données personnelles" },
        { title: "Projet", description: "Détails du financement" },
        { title: "Analyse", description: "Étude personnalisée" },
        { title: "Réponse", description: "Proposition sur-mesure" }
      ],
      form: {
        personalInfo: {
          title: "Informations personnelles",
          subtitle: "Renseignez vos informations de base pour commencer votre demande",
          fields: {
            firstName: "Prénom",
            lastName: "Nom de famille",
            email: "Adresse email",
            emailConfirmation: "Confirmer l'email",
            emailConfirmationPlaceholder: "Ressaisissez votre adresse email",
            phone: "Téléphone",
            birthDate: "Date de naissance",
            nationality: "Nationalité",
            nationalityPlaceholder: "Sélectionnez votre nationalité",
            otherNationality: "Autre nationalité",
            otherNationalityPlaceholder: "Précisez votre nationalité",
            maritalStatus: "Situation familiale",
            maritalStatusPlaceholder: "Sélectionnez votre situation",
            dependents: "Nombre de personnes à charge"
          },
          validation: {
            emailMismatch: "Les adresses email ne correspondent pas",
            emailConfirmed: "Adresses email confirmées"
          },
          maritalOptions: {
            single: "Célibataire",
            married: "Marié(e)",
            divorced: "Divorcé(e)",
            widowed: "Veuf/Veuve",
            partnership: "Union libre"
          },
          nationalityGroups: {
            europe: "Europe",
            northAmerica: "Amérique du Nord",
            centralAmerica: "Amérique Centrale",
            southAmerica: "Amérique du Sud",
            other: "Autre"
          },
          nationalities: {
            german: "Allemande",
            austrian: "Autrichienne",
            belgian: "Belge",
            bulgarian: "Bulgare",
            cypriot: "Chypriote",
            croatian: "Croate",
            danish: "Danoise",
            spanish: "Espagnole",
            estonian: "Estonienne",
            finnish: "Finlandaise",
            french: "Française",
            greek: "Grecque",
            hungarian: "Hongroise",
            irish: "Irlandaise",
            italian: "Italienne",
            latvian: "Lettone",
            lithuanian: "Lituanienne",
            luxembourgish: "Luxembourgeoise",
            maltese: "Maltaise",
            dutch: "Néerlandaise",
            polish: "Polonaise",
            portuguese: "Portugaise",
            romanian: "Roumaine",
            slovak: "Slovaque",
            slovenian: "Slovène",
            swedish: "Suédoise",
            czech: "Tchèque",
            british: "Britannique",
            swiss: "Suisse",
            norwegian: "Norvégienne",
            icelandic: "Islandaise",
            serbian: "Serbe",
            montenegrin: "Monténégrine",
            bosnian: "Bosniaque",
            albanian: "Albanaise",
            macedonian: "Macédonienne",
            moldovan: "Moldave",
            ukrainian: "Ukrainienne",
            belarusian: "Biélorusse",
            russian: "Russe",
            american: "Américaine (États-Unis)",
            canadian: "Canadienne",
            mexican: "Mexicaine",
            guatemalan: "Guatémaltèque",
            belizean: "Bélizienne",
            salvadoran: "Salvadorienne",
            honduran: "Hondurienne",
            nicaraguan: "Nicaraguayenne",
            costarican: "Costaricaine",
            panamanian: "Panaméenne",
            argentine: "Argentine",
            bolivian: "Bolivienne",
            brazilian: "Brésilienne",
            chilean: "Chilienne",
            colombian: "Colombienne",
            ecuadorian: "Équatorienne",
            guyanese: "Guyanienne",
            paraguayan: "Paraguayenne",
            peruvian: "Péruvienne",
            surinamese: "Surinamaise",
            uruguayan: "Uruguayenne",
            venezuelan: "Vénézuélienne",
            other: "Autre nationalité"
          }
        },
        professionalInfo: {
          title: "Situation professionnelle",
          subtitle: "Informations sur votre activité professionnelle et vos revenus",
          fields: {
            employmentStatus: "Statut professionnel",
            employmentStatusPlaceholder: "Votre situation professionnelle",
            profession: "Profession",
            employer: "Employeur",
            employmentDuration: "Ancienneté dans l'emploi",
            monthlyIncome: "Revenus mensuels nets (€)",
            monthlyIncomePlaceholder: "Montant en euros",
            additionalIncome: "Autres revenus mensuels (€)",
            additionalIncomePlaceholder: "Montant en euros",
            company: "Nom de l'entreprise",
            companyPlaceholder: "Nom de l'entreprise",
            position: "Poste occupé",
            positionPlaceholder: "Votre poste",
            workExperience: "Expérience professionnelle (années)",
            workExperiencePlaceholder: "Nombre d'années"
          },
          employmentOptions: {
            employee: "Salarié(e)",
            selfEmployed: "Travailleur indépendant",
            business: "Chef d'entreprise",
            retired: "Retraité(e)",
            student: "Étudiant(e)",
            unemployed: "Sans emploi"
          }
        },
        loanRequest: {
          title: "Demande de financement",
          subtitle: "Précisez les détails de votre projet de financement",
          fields: {
            loanType: "Type de prêt",
            loanTypePlaceholder: "Choisissez le type de financement",
            amount: "Montant souhaité (€)",
            duration: "Durée de remboursement (mois)",
            purpose: "Objet du financement",
            hasGuarantee: "Avez-vous une garantie ?"
          },
          loanTypes: {
            personal: "Prêt personnel",
            auto: "Crédit auto",
            home: "Prêt immobilier",
            business: "Financement professionnel",
            consolidation: "Rachat de crédits"
          },
          guaranteeOptions: {
            yes: "Oui",
            no: "Non",
            discuss: "À discuter"
          }
        },
        financingRequest: {
          title: "Demande de financement",
          subtitle: "Remplissez les informations suivantes pour obtenir une offre personnalisée",
          fields: {
            loanType: "Type de prêt",
            loanTypePlaceholder: "Sélectionnez un type",
            amount: "Montant du prêt (€)",
            duration: "Durée du prêt (mois)",
            hasGuarantee: "Garantie disponible",
            guaranteePlaceholder: "Ex : bien immobilier, véhicule",
            purpose: "Motif du prêt",
            purposePlaceholder: "Indiquez le but de votre demande",
            amountPlaceholder: "Ex: 50000",
            durationPlaceholder: "Ex: 60"
          },
          loanOptions: {
            personal: "Prêt personnel",
            auto: "Prêt automobile",
            realEstate: "Prêt immobilier",
            professional: "Prêt professionnel",
            student: "Prêt étudiant",
            consolidation: "Rachat de crédit"
          },
          guaranteeOptions: {
            yes: "Oui",
            no: "Non",
            maybe: "À déterminer"
          }
        },
        validation: {
          title: "Validation et documents",
          fields: {
            hasRequiredDocs: "Je certifie disposer des documents requis et pouvoir les fournir sur demande",
            acceptsTerms: "J'accepte les conditions générales et la politique de confidentialité *",
            acceptsMarketing: "J'accepte de recevoir des offres commerciales personnalisées"
          },
          submitButton: "Envoyer ma demande",
          qualityCommitment: "Engagement qualité : Nous nous engageons à vous contacter sous 24h pour étudier votre demande et vous proposer une solution adaptée.",
          emailMismatchAlert: "Les adresses email ne correspondent pas. Veuillez vérifier.",
          successAlert: "Votre demande a été envoyée avec succès ! Nous vous contacterons sous 24h."
        }
      },
      sidebar: {
        documents: {
          title: "Documents requis",
          subtitle: "Préparez ces documents pour accélérer votre demande",
          list: [
            "Pièce d'identité en cours de validité",
            "Justificatifs de revenus (3 derniers bulletins)",
            "Relevés bancaires (3 derniers mois)",
            "Justificatif de domicile récent",
            "Compromis de vente (si immobilier)"
          ]
        },
        help: {
          title: "Besoin d'aide ?",
          subtitle: "Nos experts sont là pour vous accompagner",
          phone: "+33 1 78 16 40 00",
          schedule: "Lun-Ven 8h-19h"
        },
        security: {
          title: "Sécurité garantie",
          features: [
            "Chiffrement SSL 256 bits",
            "Conformité RGPD",
            "Données protégées"
          ]
        }
      }
    },
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
        title: "Contactez nos",
        titleSpan: "Experts",
        subtitle: "Une équipe dédiée pour vous accompagner dans tous vos projets financiers",
        stats: {
          responseTime: "Réponse sous 2h",
          experts: "Experts disponibles"
        }
      },
      methods: {
        title: "Moyens de contact",
        subtitle: "Choisissez le canal qui vous convient le mieux pour échanger avec nos conseillers",
        phone: {
          title: "Téléphone",
          description: "Appelez-nous pour un conseil immédiat",
          value: "+33 1 78 16 40 00",
          hours: "Lun-Ven 8h-19h, Sam 9h-17h"
        },
        email: {
          title: "Email",
          description: "Écrivez-nous, nous répondons rapidement",
          value: "contact@aurex-kpital.com",
          hours: "Réponse sous 2h en moyenne"
        },
        address: {
          title: "Adresse",
          description: "Rencontrez-nous dans nos bureaux",
          value: "42 Avenue des Champs-Élysées, 75008 Paris",
          hours: "Sur rendez-vous uniquement"
        }
      },
      form: {
        title: "Envoyez-nous un message",
        fields: {
          name: "Nom et prénom",
          email: "Adresse email",
          message: "Votre message"
        },
        submitButton: "Envoyer le message",
        successMessage: "Merci ! Votre message a été envoyé avec succès. Nous vous répondrons rapidement.",
        commitment: "Nous nous engageons à répondre dans les 2 heures pendant nos horaires d'ouverture."
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
          schedule: "Lundi-Vendredi 8h-19h, Samedi 9h-17h",
          hero: {
            badge: "Support Excellence",
            title: "Contactez Nos",
            titleSpan: "Experts",
            subtitle: "Notre équipe dédiée vous accompagne à chaque étape de votre projet financier. Plusieurs moyens pour nous joindre selon vos préférences.",
            stats: {
              satisfaction: "Satisfaction client",
              responseTime: "Temps de réponse moyen",
              experts: "Conseillers experts"
            }
          },
          methods: {
            title: "Comment Nous Joindre",
            subtitle: "Choisissez le canal qui vous convient le mieux",
            phone: {
              title: "Téléphone",
              description: "Parlez directement à nos conseillers",
              value: "+49 40 710 97523",
              hours: "Lun-Ven: 8h-19h, Sam: 9h-17h"
            },
            email: {
              title: "Email",
              description: "Envoyez-nous vos questions",
              value: "contact@aurex-kpital.de",
              hours: "Réponse sous 4h en moyenne"
            },
            address: {
              title: "Adresse", 
              description: "Visitez nos bureaux à Hamburg",
              value: "Irma-Keilhack-Ring 24, 22145 Hamburg",
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
            title: "Envoyer un Message",
            subtitle: "Remplissez ce formulaire et nous vous contacterons rapidement",
            fields: {
              name: "Nom complet",
              email: "Adresse email",
              phone: "Téléphone", 
              subject: "Sujet",
              message: "Votre message",
              preferredContact: "Moyen de contact préféré",
              urgency: "Niveau d'urgence"
            },
            options: {
              preferredContact: {
                phone: "Téléphone",
                email: "Email",
                meeting: "Rendez-vous"
              },
              urgency: {
                low: "Non urgent",
                normal: "Normal",
                high: "Urgent",
                critical: "Très urgent"
              },
              subjects: {
                loan: "Demande de prêt",
                investment: "Investissement", 
                insurance: "Assurance",
                other: "Autre"
              }
            },
            submitButton: "Envoyer le message",
            successMessage: "Votre message a été envoyé avec succès ! Nous vous contacterons rapidement.",
            commitment: "Nous nous engageons à vous répondre sous 24h"
          },
          departments: {
            title: "Nos Services",
            subtitle: "Contactez directement le service adapté à vos besoins",
            commercial: {
              name: "Service Commercial",
              description: "Nouvelles demandes et informations",
              contact: "commercial@aurex-kpital.de",
              phone: "+49 40 710 97523"
            },
            client: {
              name: "Service Client",
              description: "Suivi de dossiers existants",
              contact: "client@aurex-kpital.de",
              phone: "+49 40 710 97524"
            },
            support: {
              name: "Support Technique",
              description: "Assistance plateforme et outils",
              contact: "support@aurex-kpital.de",
              phone: "+49 40 710 97525"
            },
            management: {
              name: "Direction",
              description: "Réclamations et suggestions",
              contact: "direction@aurex-kpital.de",
              phone: "+49 40 710 97520"
            }
          },
          schedules: {
            title: "Horaires d'Ouverture",
            weekdays: {
              day: "Lundi - Vendredi",
              hours: "8h00 - 19h00",
              type: "Conseillers disponibles"
            },
            saturday: {
              day: "Samedi",
              hours: "9h00 - 17h00", 
              type: "Service réduit"
            },
            sunday: {
              day: "Dimanche",
              hours: "Fermé",
              type: "Urgences uniquement"
            }
          },
          certifications: {
            title: "Certifications & Garanties",
            subtitle: "Votre confiance, notre engagement",
            bafin: {
              title: "Agrément BaFin",
              description: "Autorité fédérale de surveillance financière allemande"
            },
            gdpr: {
              title: "Conformité RGPD",
              description: "Protection maximale de vos données personnelles"
            },
            security: {
              title: "Sécurité Bancaire",
              description: "Chiffrement SSL 256-bit et protocoles sécurisés"
            },
            quality: {
              title: "Certification Qualité",
              description: "ISO 9001:2015 - Excellence du service client"
            }
          }
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
    // ... keep existing code (all existing German translations)
    request: {
      hero: {
        badge: "Finanzierungsantrag",
        title: "Ihr Projekt verdient",
        titleHighlight: "die beste Finanzierung",
        subtitle: "Erhalten Sie in 24h eine personalisierte Antwort dank unserer fortschrittlichen KI und Expertenberatung",
        stats: {
          responseTime: { value: "24h", label: "Garantierte Antwort" },
          security: { value: "100%", label: "DSGVO-konform" },
          expert: { value: "24/7", label: "Expertenunterstützung" }
        }
      },
      steps: [
        { title: "Informationen", description: "Ihre persönlichen Daten" },
        { title: "Projekt", description: "Finanzierungsdetails" },
        { title: "Analyse", description: "Individuelle Prüfung" },
        { title: "Antwort", description: "Maßgeschneidertes Angebot" }
      ],
      form: {
        personalInfo: {
          title: "Persönliche Informationen",
          subtitle: "Geben Sie Ihre Grunddaten ein, um Ihren Antrag zu beginnen",
          fields: {
            firstName: "Vorname",
            lastName: "Nachname",
            email: "E-Mail-Adresse",
            emailConfirmation: "E-Mail bestätigen",
            emailConfirmationPlaceholder: "E-Mail-Adresse erneut eingeben",
            phone: "Telefon",
            birthDate: "Geburtsdatum",
            nationality: "Staatsangehörigkeit",
            nationalityPlaceholder: "Wählen Sie Ihre Staatsangehörigkeit",
            otherNationality: "Weitere Staatsangehörigkeit",
            otherNationalityPlaceholder: "Geben Sie Ihre Staatsangehörigkeit an",
            maritalStatus: "Familienstand",
            maritalStatusPlaceholder: "Wählen Sie Ihren Status",
            dependents: "Anzahl der Angehörigen"
          },
          validation: {
            emailMismatch: "E-Mail-Adressen stimmen nicht überein",
            emailConfirmed: "E-Mail-Adressen bestätigt"
          },
          maritalOptions: {
            single: "Ledig",
            married: "Verheiratet",
            divorced: "Geschieden",
            widowed: "Verwitwet",
            partnership: "Lebenspartnerschaft"
          },
          nationalityGroups: {
            europe: "Europa",
            northAmerica: "Nordamerika",
            centralAmerica: "Zentralamerika",
            southAmerica: "Südamerika",
            other: "Andere"
          },
          nationalities: {
            german: "Deutsch",
            austrian: "Österreichisch",
            belgian: "Belgisch",
            bulgarian: "Bulgarisch",
            cypriot: "Zypriotisch",
            croatian: "Kroatisch",
            danish: "Dänisch",
            spanish: "Spanisch",
            estonian: "Estnisch",
            finnish: "Finnisch",
            french: "Französisch",
            greek: "Griechisch",
            hungarian: "Ungarisch",
            irish: "Irisch",
            italian: "Italienisch",
            latvian: "Lettisch",
            lithuanian: "Litauisch",
            luxembourgish: "Luxemburgisch",
            maltese: "Maltesisch",
            dutch: "Niederländisch",
            polish: "Polnisch",
            portuguese: "Portugiesisch",
            romanian: "Rumänisch",
            slovak: "Slowakisch",
            slovenian: "Slowenisch",
            swedish: "Schwedisch",
            czech: "Tschechisch",
            british: "Britisch",
            swiss: "Schweizerisch",
            norwegian: "Norwegisch",
            icelandic: "Isländisch",
            serbian: "Serbisch",
            montenegrin: "Montenegrinisch",
            bosnian: "Bosnisch",
            albanian: "Albanisch",
            macedonian: "Mazedonisch",
            moldovan: "Moldawisch",
            ukrainian: "Ukrainisch",
            belarusian: "Belarussisch",
            russian: "Russisch",
            american: "Amerikanisch (USA)",
            canadian: "Kanadisch",
            mexican: "Mexikanisch",
            guatemalan: "Guatemaltekisch",
            belizean: "Belizisch",
            salvadoran: "Salvadorianisch",
            honduran: "Honduranisch",
            nicaraguan: "Nicaraguanisch",
            costarican: "Costa-ricanisch",
            panamanian: "Panamaisch",
            argentine: "Argentinisch",
            bolivian: "Bolivianisch",
            brazilian: "Brasilianisch",
            chilean: "Chilenisch",
            colombian: "Kolumbianisch",
            ecuadorian: "Ecuadorianisch",
            guyanese: "Guyanisch",
            paraguayan: "Paraguayisch",
            peruvian: "Peruanisch",
            surinamese: "Surinamisch",
            uruguayan: "Uruguayisch",
            venezuelan: "Venezolanisch",
            other: "Andere Staatsangehörigkeit"
          }
        },
        professionalInfo: {
          title: "Berufliche Situation",
          subtitle: "Informationen zu Ihrer beruflichen Tätigkeit und Ihren Einkünften",
          fields: {
            employmentStatus: "Berufsstatus",
            employmentStatusPlaceholder: "Ihre berufliche Situation",
            profession: "Beruf",
            employer: "Arbeitgeber",
            employmentDuration: "Beschäftigungsdauer",
            monthlyIncome: "Monatliches Nettoeinkommen (€)",
            monthlyIncomePlaceholder: "Betrag in Euro",
            additionalIncome: "Weitere monatliche Einkünfte (€)",
            additionalIncomePlaceholder: "Betrag in Euro",
            company: "Name des Unternehmens",
            companyPlaceholder: "Name des Unternehmens",
            position: "Position",
            positionPlaceholder: "Ihre Position",
            workExperience: "Berufserfahrung (Jahre)",
            workExperiencePlaceholder: "Anzahl Jahre"
          },
          employmentOptions: {
            employee: "Angestellt",
            selfEmployed: "Selbstständig",
            business: "Unternehmer",
            retired: "Rentner",
            student: "Student",
            unemployed: "Arbeitslos"
          }
        },
        loanRequest: {
          title: "Finanzierungsantrag",
          subtitle: "Geben Sie die Details Ihres Finanzierungsprojekts an",
          fields: {
            loanType: "Kreditart",
            loanTypePlaceholder: "Wählen Sie die Finanzierungsart",
            amount: "Gewünschter Betrag (€)",
            duration: "Rückzahlungsdauer (Monate)",
            purpose: "Verwendungszweck",
            hasGuarantee: "Haben Sie eine Sicherheit?"
          },
          loanTypes: {
            personal: "Privatkredit",
            auto: "Autokredit",
            home: "Immobilienkredit",
            business: "Unternehmensfinanzierung",
            consolidation: "Kreditumschuldung"
          },
          guaranteeOptions: {
            yes: "Ja",
            no: "Nein",
            discuss: "Zu besprechen"
          }
        },
        financingRequest: {
          title: "Finanzierungsantrag",
          subtitle: "Füllen Sie die folgenden Informationen aus, um ein maßgeschneidertes Angebot zu erhalten",
          fields: {
            loanType: "Darlehensart",
            loanTypePlaceholder: "Wählen Sie einen Typ",
            amount: "Darlehensbetrag (€)",
            duration: "Darlehensdauer (Monate)",
            hasGuarantee: "Sicherheit verfügbar",
            guaranteePlaceholder: "Z.B.: Immobilie, Fahrzeug",
            purpose: "Verwendungszweck",
            purposePlaceholder: "Geben Sie den Zweck Ihres Antrags an",
            amountPlaceholder: "Z.B.: 50000",
            durationPlaceholder: "Z.B.: 60"
          },
          loanOptions: {
            personal: "Privatkredit",
            auto: "Autokredit",
            realEstate: "Immobilienkredit",
            professional: "Geschäftskredit",
            student: "Studentenkredit",
            consolidation: "Kreditumschuldung"
          },
          guaranteeOptions: {
            yes: "Ja",
            no: "Nein",
            maybe: "Noch zu bestimmen"
          }
        },
        validation: {
          title: "Bestätigung und Dokumente",
          subtitle: "Schließen Sie Ihren Antrag ab",
          fields: {
            hasRequiredDocs: "Ich bestätige, über die erforderlichen Dokumente zu verfügen und diese auf Anfrage vorlegen zu können",
            acceptsTerms: "Ich akzeptiere die Allgemeinen Geschäftsbedingungen und die Datenschutzrichtlinie *",
            acceptsMarketing: "Ich akzeptiere den Erhalt personalisierter Werbeangebote"
          },
          submitButton: "Antrag senden",
          qualityCommitment: "Qualitätsverpflichtung: Wir verpflichten uns, Sie innerhalb von 24 Stunden zu kontaktieren, um Ihren Antrag zu prüfen und Ihnen eine geeignete Lösung vorzuschlagen.",
          emailMismatchAlert: "Die E-Mail-Adressen stimmen nicht überein. Bitte überprüfen Sie sie.",
          successAlert: "Ihr Antrag wurde erfolgreich gesendet! Wir werden Sie innerhalb von 24 Stunden kontaktieren."
        }
      },
      sidebar: {
        documents: {
          title: "Erforderliche Dokumente",
          subtitle: "Bereiten Sie diese Dokumente vor, um Ihren Antrag zu beschleunigen",
          list: [
            "Gültiger Personalausweis",
            "Einkommensnachweise (3 letzte Gehaltsabrechnungen)",
            "Kontoauszüge (3 letzte Monate)",
            "Aktueller Wohnsitznachweis",
            "Kaufvertrag (bei Immobilien)"
          ]
        },
        help: {
          title: "Brauchen Sie Hilfe?",
          subtitle: "Unsere Experten begleiten Sie",
          phone: "+49 40 123 456 789",
          schedule: "Mo-Fr 8-19 Uhr"
        },
        security: {
          title: "Garantierte Sicherheit",
          features: [
            "256-Bit SSL-Verschlüsselung",
            "DSGVO-Konformität",
            "Geschützte Daten"
          ]
        }
      }
    },
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
    contact: {
      hero: {
        title: "Kontaktieren Sie unsere",
        titleSpan: "Experten",
        subtitle: "Ein engagiertes Team, das Sie bei all Ihren Finanzprojekten begleitet",
        stats: {
          responseTime: "Antwort binnen 2h",
          experts: "Experten verfügbar"
        }
      },
      methods: {
        title: "Kontaktmöglichkeiten",
        subtitle: "Wählen Sie den für Sie passenden Kanal, um mit unseren Beratern zu sprechen",
        phone: {
          title: "Telefon",
          description: "Rufen Sie uns für sofortige Beratung an",
          value: "+49 40 123 456 789",
          hours: "Mo-Fr 8-19 Uhr, Sa 9-17 Uhr"
        },
        email: {
          title: "E-Mail",
          description: "Schreiben Sie uns, wir antworten schnell",
          value: "kontakt@aurex-kpital.de",
          hours: "Antwort binnen 2h im Durchschnitt"
        },
        address: {
          title: "Adresse",
          description: "Besuchen Sie uns in unseren Büros",
          value: "Neuer Wall 10, 20354 Hamburg",
          hours: "Nur nach Terminvereinbarung"
        }
      },
      form: {
        title: "Senden Sie uns eine Nachricht",
        fields: {
          name: "Vor- und Nachname",
          email: "E-Mail-Adresse",
          message: "Ihre Nachricht"
        },
        submitButton: "Nachricht senden",
        successMessage: "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir antworten Ihnen schnellstmöglich.",
        commitment: "Wir verpflichten uns, innerhalb von 2 Stunden während unserer Öffnungszeiten zu antworten."
      }
    }
  },
  es: {
    request: {
      hero: {
        badge: "Solicitud de Financiación",
        title: "Tu proyecto merece",
        titleHighlight: "la mejor financiación",
        subtitle: "Obtén una respuesta personalizada en 24h gracias a nuestra IA avanzada y la experiencia de nuestros asesores",
        stats: {
          responseTime: { value: "24h", label: "Respuesta garantizada" },
          security: { value: "100%", label: "Seguro RGPD" },
          expert: { value: "24/7", label: "Soporte experto" }
        }
      },
      steps: [
        { title: "Información", description: "Tus datos personales" },
        { title: "Proyecto", description: "Detalles de financiación" },
        { title: "Análisis", description: "Estudio personalizado" },
        { title: "Respuesta", description: "Propuesta a medida" }
      ],
      form: {
        personalInfo: {
          title: "Información personal",
          subtitle: "Introduce tu información básica para comenzar tu solicitud",
          fields: {
            firstName: "Nombre",
            lastName: "Apellidos",
            email: "Dirección de correo",
            emailConfirmation: "Confirmar correo",
            emailConfirmationPlaceholder: "Vuelve a escribir tu dirección de correo",
            phone: "Teléfono",
            birthDate: "Fecha de nacimiento",
            nationality: "Nacionalidad",
            nationalityPlaceholder: "Selecciona tu nacionalidad",
            otherNationality: "Otra nacionalidad",
            maritalStatus: "Estado civil",
            maritalStatusPlaceholder: "Selecciona tu estado",
            dependents: "Número de personas a cargo"
          },
          validation: {
            emailMismatch: "Las direcciones de correo no coinciden",
            emailConfirmed: "Direcciones de correo confirmadas"
          },
          otherNationalityPlaceholder: "Especifica tu nacionalidad",
          maritalOptions: {
            single: "Soltero/a",
            married: "Casado/a",
            divorced: "Divorciado/a",
            widowed: "Viudo/a",
            partnership: "Pareja de hecho"
          },
          nationalityGroups: {
            europe: "Europa",
            northAmerica: "América del Norte",
            centralAmerica: "América Central",
            southAmerica: "América del Sur",
            other: "Otra"
          },
          nationalities: {
            german: "Alemana", austrian: "Austriaca", belgian: "Belga", bulgarian: "Búlgara", cypriot: "Chipriota", croatian: "Croata", danish: "Danesa", spanish: "Española", estonian: "Estonia", finnish: "Finlandesa", french: "Francesa", greek: "Griega", hungarian: "Húngara", irish: "Irlandesa", italian: "Italiana", latvian: "Letona", lithuanian: "Lituana", luxembourgish: "Luxemburguesa", maltese: "Maltesa", dutch: "Holandesa", polish: "Polaca", portuguese: "Portuguesa", romanian: "Rumana", slovak: "Eslovaca", slovenian: "Eslovena", swedish: "Sueca", czech: "Checa", british: "Británica", swiss: "Suiza", norwegian: "Noruega", icelandic: "Islandesa", serbian: "Serbia", montenegrin: "Montenegrina", bosnian: "Bosnia", albanian: "Albanesa", macedonian: "Macedonia", moldovan: "Moldava", ukrainian: "Ucraniana", belarusian: "Bielorrusa", russian: "Rusa", american: "Estadounidense", canadian: "Canadiense", mexican: "Mexicana", guatemalan: "Guatemalteca", belizean: "Beliceña", salvadoran: "Salvadoreña", honduran: "Hondureña", nicaraguan: "Nicaragüense", costarican: "Costarricense", panamanian: "Panameña", argentine: "Argentina", bolivian: "Boliviana", brazilian: "Brasileña", chilean: "Chilena", colombian: "Colombiana", ecuadorian: "Ecuatoriana", guyanese: "Guyanesa", paraguayan: "Paraguaya", peruvian: "Peruana", surinamese: "Surinamesa", uruguayan: "Uruguaya", venezuelan: "Venezolana", other: "Otra nacionalidad"
          }
        },
        professionalInfo: {
          title: "Situación profesional",
          subtitle: "Información sobre tu actividad profesional e ingresos",
          fields: {
            employmentStatus: "Estado profesional",
            employmentStatusPlaceholder: "Tu situación profesional",
            profession: "Profesión",
            employer: "Empleador",
            employmentDuration: "Antigüedad en el empleo",
            monthlyIncome: "Ingresos mensuales netos (€)",
            monthlyIncomePlaceholder: "Cantidad en euros",
            additionalIncome: "Otros ingresos mensuales (€)",
            additionalIncomePlaceholder: "Cantidad en euros",
            company: "Nombre de la empresa",
            companyPlaceholder: "Nombre de la empresa", 
            position: "Puesto ocupado",
            positionPlaceholder: "Tu puesto",
            workExperience: "Experiencia profesional (años)",
            workExperiencePlaceholder: "Número de años"
          },
          employmentOptions: {
            employee: "Empleado/a",
            selfEmployed: "Autónomo",
            business: "Empresario",
            retired: "Jubilado/a",
            student: "Estudiante",
            unemployed: "Desempleado/a"
          }
        },
        loanRequest: {
          title: "Solicitud de financiación",
          subtitle: "Especifica los detalles de tu proyecto de financiación",
          fields: {
            loanType: "Tipo de préstamo",
            loanTypePlaceholder: "Elige el tipo de financiación",
            amount: "Cantidad deseada (€)",
            duration: "Duración de reembolso (meses)",
            purpose: "Finalidad de la financiación",
            hasGuarantee: "¿Tienes una garantía?"
          },
          loanTypes: {
            personal: "Préstamo personal",
            auto: "Crédito auto",
            home: "Préstamo hipotecario",
            business: "Financiación profesional",
            consolidation: "Reunificación de créditos"
          },
          guaranteeOptions: {
            yes: "Sí",
            no: "No",
            discuss: "A discutir"
          }
        },
        validation: {
          title: "Validación y documentos",
          subtitle: "Finaliza tu solicitud",
          fields: {
            hasRequiredDocs: "Confirmo que tengo los documentos requeridos",
            acceptsTerms: "Acepto las condiciones generales",
            acceptsMarketing: "Acepto recibir información comercial"
          },
          submitButton: "Enviar mi solicitud",
          qualityCommitment: "Nos comprometemos a tratar tu solicitud con la máxima confidencialidad y responderte en el menor tiempo posible.",
          emailMismatchAlert: "Las direcciones de correo no coinciden. Por favor, verifica.",
          successAlert: "¡Tu solicitud se ha enviado con éxito! Te contactaremos en 24h."
        }
      },
      sidebar: {
        documents: {
          title: "Documentos requeridos",
          subtitle: "Prepara estos documentos para acelerar tu solicitud",
          list: [
            "Documento de identidad válido",
            "Justificantes de ingresos (3 últimas nóminas)",
            "Extractos bancarios (últimos 3 meses)",
            "Justificante de domicilio reciente",
            "Compromiso de venta (si inmobiliario)"
          ]
        },
        help: {
          title: "¿Necesitas ayuda?",
          subtitle: "Nuestros expertos están aquí para acompañarte",
          phone: "+34 91 123 45 67",
          schedule: "Lun-Vie 8h-19h"
        },
        security: {
          title: "Seguridad garantizada",
          features: [
            "Cifrado SSL 256 bits",
            "Conformidad RGPD",
            "Datos protegidos"
          ]
        }
      }
    },
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
        title: "Contacte a nuestros",
        titleSpan: "Expertos",
        subtitle: "Un equipo dedicado para acompañarle en todos sus proyectos financieros",
        stats: {
          responseTime: "Respuesta en 2h",
          experts: "Expertos disponibles"
        }
      },
      methods: {
        title: "Medios de contacto",
        subtitle: "Elija el canal que mejor le convenga para hablar con nuestros asesores",
        phone: {
          title: "Teléfono",
          description: "Llámenos para un consejo inmediato",
          value: "+34 91 123 45 67",
          hours: "Lun-Vie 8h-19h, Sáb 9h-17h"
        },
        email: {
          title: "Email",
          description: "Escríbanos, respondemos rápidamente",
          value: "contacto@aurex-kpital.es",
          hours: "Respuesta en 2h en promedio"
        },
        address: {
          title: "Dirección",
          description: "Encuéntrenos en nuestras oficinas",
          value: "Paseo de la Castellana 95, 28046 Madrid",
          hours: "Solo con cita previa"
        }
      },
      form: {
        title: "Envíenos un mensaje",
        fields: {
          name: "Nombre y apellidos",
          email: "Dirección de email",
          message: "Su mensaje"
        },
        submitButton: "Enviar mensaje",
        successMessage: "¡Gracias! Su mensaje ha sido enviado con éxito. Le responderemos rápidamente.",
        commitment: "Nos comprometemos a responder en 2 horas durante nuestro horario de oficina."
      }
    }
  },
  it: {
    request: {
      hero: {
        badge: "Richiesta di Finanziamento",
        title: "Il tuo progetto merita",
        titleHighlight: "il miglior finanziamento",
        subtitle: "Ottieni una risposta personalizzata in 24h grazie alla nostra IA avanzata e all'esperienza dei nostri consulenti",
        stats: {
          responseTime: { value: "24h", label: "Risposta garantita" },
          security: { value: "100%", label: "Sicuro GDPR" },
          expert: { value: "24/7", label: "Supporto esperto" }
        }
      },
      steps: [
        { title: "Informazioni", description: "I tuoi dati personali" },
        { title: "Progetto", description: "Dettagli del finanziamento" },
        { title: "Analisi", description: "Studio personalizzato" },
        { title: "Risposta", description: "Proposta su misura" }
      ],
      form: {
        personalInfo: {
          title: "Informazioni personali",
          subtitle: "Inserisci le tue informazioni di base per iniziare la richiesta",
          fields: {
            firstName: "Nome",
            lastName: "Cognome",
            email: "Indirizzo email",
            emailConfirmation: "Conferma email",
            emailConfirmationPlaceholder: "Reinserisci il tuo indirizzo email",
            phone: "Telefono",
            birthDate: "Data di nascita",
            nationality: "Nazionalità",
            nationalityPlaceholder: "Seleziona la tua nazionalità",
            otherNationality: "Altra nazionalità",
            maritalStatus: "Stato civile",
            maritalStatusPlaceholder: "Seleziona il tuo stato",
            dependents: "Numero di persone a carico"
          },
          validation: {
            emailMismatch: "Gli indirizzi email non corrispondono",
            emailConfirmed: "Indirizzi email confermati"
          },
          maritalStatusOptions: {
            single: "Celibe/Nubile",
            married: "Sposato/a",
            divorced: "Divorziato/a",
            widowed: "Vedovo/a",
            partnership: "Convivenza"
          }
        },
        professionalInfo: {
          title: "Situazione professionale",
          subtitle: "Informazioni sulla tua attività professionale e i tuoi redditi",
          fields: {
            employmentStatus: "Stato professionale",
            employmentStatusPlaceholder: "La tua situazione professionale",
            profession: "Professione",
            employer: "Datore di lavoro",
            employmentDuration: "Anzianità di servizio",
            monthlyIncome: "Reddito mensile netto (€)",
            additionalIncome: "Altri redditi mensili (€)"
          },
          employmentOptions: {
            employee: "Dipendente",
            selfEmployed: "Lavoratore autonomo",
            business: "Imprenditore",
            retired: "Pensionato",
            student: "Studente",
            unemployed: "Disoccupato"
          }
        },
        loanRequest: {
          title: "Richiesta di finanziamento",
          subtitle: "Specifica i dettagli del tuo progetto di finanziamento",
          fields: {
            loanType: "Tipo di prestito",
            loanTypePlaceholder: "Scegli il tipo di finanziamento",
            amount: "Importo desiderato (€)",
            duration: "Durata di rimborso (mesi)",
            purpose: "Scopo del finanziamento",
            hasGuarantee: "Hai una garanzia?"
          },
          loanTypes: {
            personal: "Prestito personale",
            auto: "Credito auto",
            home: "Mutuo casa",
            business: "Finanziamento aziendale",
            consolidation: "Consolidamento crediti"
          },
          guaranteeOptions: {
            yes: "Sì",
            no: "No",
            discuss: "Da discutere"
          }
        },
        validation: {
          title: "Validazione e documenti",
          subtitle: "Finalizza la tua richiesta",
          fields: {
            hasRequiredDocs: "Confermo di avere i documenti richiesti",
            acceptsTerms: "Accetto i termini e le condizioni",
            acceptsMarketing: "Accetto di ricevere informazioni commerciali"
          },
          submitButton: "Invia la mia richiesta"
        }
      },
      sidebar: {
        documents: {
          title: "Documenti richiesti",
          subtitle: "Prepara questi documenti per accelerare la tua richiesta",
          list: [
            "Documento d'identità valido",
            "Giustificativi di reddito (ultime 3 buste paga)",
            "Estratti bancari (ultimi 3 mesi)",
            "Certificato di residenza recente",
            "Compromesso di vendita (se immobiliare)"
          ]
        },
        help: {
          title: "Hai bisogno di aiuto?",
          subtitle: "I nostri esperti sono qui per accompagnarti",
          phone: "+39 06 123 45 67",
          schedule: "Lun-Ven 8-19"
        },
        security: {
          title: "Sicurezza garantita",
          features: [
            "Crittografia SSL 256 bit",
            "Conformità GDPR",
            "Dati protetti"
          ]
        }
      }
    },
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
    },
    contact: {
      hero: {
        title: "Contatta i nostri",
        titleSpan: "Esperti",
        subtitle: "Un team dedicato per accompagnarti in tutti i tuoi progetti finanziari",
        stats: {
          responseTime: "Risposta in 2h",
          experts: "Esperti disponibili"
        }
      },
      methods: {
        title: "Mezzi di contatto",
        subtitle: "Scegli il canale che preferisci per parlare con i nostri consulenti",
        phone: {
          title: "Telefono",
          description: "Chiamaci per un consiglio immediato",
          value: "+39 02 1234 5678",
          hours: "Lun-Ven 8-19, Sab 9-17"
        },
        email: {
          title: "Email",
          description: "Scrivici, rispondiamo velocemente",
          value: "contatto@aurex-kpital.it",
          hours: "Risposta in 2h in media"
        },
        address: {
          title: "Indirizzo",
          description: "Incontraci nei nostri uffici",
          value: "Via Monte Napoleone 8, 20121 Milano",
          hours: "Solo su appuntamento"
        }
      },
      form: {
        title: "Inviaci un messaggio",
        fields: {
          name: "Nome e cognome",
          email: "Indirizzo email",
          message: "Il tuo messaggio"
        },
        submitButton: "Invia messaggio",
        successMessage: "Grazie! Il tuo messaggio è stato inviato con successo. Ti risponderemo rapidamente.",
        commitment: "Ci impegniamo a rispondere entro 2 ore durante i nostri orari di ufficio."
      }
    }
  },
  pl: {
    request: {
      hero: {
        badge: "Wniosek o Finansowanie",
        title: "Twój projekt zasługuje na",
        titleHighlight: "najlepsze finansowanie",
        subtitle: "Otrzymaj spersonalizowaną odpowiedź w 24h dzięki naszej zaawansowanej AI i ekspertyzie naszych doradców",
        stats: {
          responseTime: { value: "24h", label: "Gwarantowana odpowiedź" },
          security: { value: "100%", label: "Bezpieczne RODO" },
          expert: { value: "24/7", label: "Wsparcie ekspertów" }
        }
      },
      steps: [
        { title: "Informacje", description: "Twoje dane osobowe" },
        { title: "Projekt", description: "Szczegóły finansowania" },
        { title: "Analiza", description: "Spersonalizowane badanie" },
        { title: "Odpowiedź", description: "Oferta na miarę" }
      ],
      form: {
        personalInfo: {
          title: "Informacje osobiste",
          subtitle: "Podaj swoje podstawowe informacje, aby rozpocząć wniosek",
          fields: {
            firstName: "Imię",
            lastName: "Nazwisko",
            email: "Adres e-mail",
            emailConfirmation: "Potwierdź e-mail",
            emailConfirmationPlaceholder: "Wpisz ponownie swój adres e-mail",
            phone: "Telefon",
            birthDate: "Data urodzenia",
            nationality: "Narodowość",
            nationalityPlaceholder: "Wybierz swoją narodowość",
            otherNationality: "Inna narodowość",
            maritalStatus: "Stan cywilny",
            maritalStatusPlaceholder: "Wybierz swój status",
            dependents: "Liczba osób na utrzymaniu"
          },
          validation: {
            emailMismatch: "Adresy e-mail nie są zgodne",
            emailConfirmed: "Adresy e-mail potwierdzone"
          },
          maritalStatusOptions: {
            single: "Kawaler/Panna",
            married: "Żonaty/Zamężna",
            divorced: "Rozwiedziony/a",
            widowed: "Wdowiec/Wdowa",
            partnership: "Związek partnerski"
          }
        },
        professionalInfo: {
          title: "Sytuacja zawodowa",
          subtitle: "Informacje o Twojej działalności zawodowej i dochodach",
          fields: {
            employmentStatus: "Status zawodowy",
            employmentStatusPlaceholder: "Twoja sytuacja zawodowa",
            profession: "Zawód",
            employer: "Pracodawca",
            employmentDuration: "Staż pracy",
            monthlyIncome: "Miesięczny dochód netto (€)",
            additionalIncome: "Inne miesięczne dochody (€)"
          },
          employmentOptions: {
            employee: "Pracownik najemny",
            selfEmployed: "Samozatrudniony",
            business: "Przedsiębiorca",
            retired: "Emeryt",
            student: "Student",
            unemployed: "Bezrobotny"
          }
        },
        loanRequest: {
          title: "Wniosek o finansowanie",
          subtitle: "Podaj szczegóły swojego projektu finansowania",
          fields: {
            loanType: "Rodzaj pożyczki",
            loanTypePlaceholder: "Wybierz rodzaj finansowania",
            amount: "Żądana kwota (€)",
            duration: "Okres spłaty (miesiące)",
            purpose: "Cel finansowania",
            hasGuarantee: "Czy masz gwarancję?"
          },
          loanTypes: {
            personal: "Pożyczka osobista",
            auto: "Kredyt samochodowy",
            home: "Kredyt hipoteczny",
            business: "Finansowanie biznesowe",
            consolidation: "Konsolidacja kredytów"
          },
          guaranteeOptions: {
            yes: "Tak",
            no: "Nie",
            discuss: "Do omówienia"
          }
        },
        validation: {
          title: "Walidacja i dokumenty",
          subtitle: "Sfinalizuj swój wniosek",
          fields: {
            hasRequiredDocs: "Potwierdzam, że posiadam wymagane dokumenty",
            acceptsTerms: "Akceptuję regulamin",
            acceptsMarketing: "Zgadzam się na otrzymywanie informacji marketingowych"
          },
          submitButton: "Wyślij mój wniosek"
        }
      },
      sidebar: {
        documents: {
          title: "Wymagane dokumenty",
          subtitle: "Przygotuj te dokumenty, aby przyspieszyć swój wniosek",
          list: [
            "Ważny dowód tożsamości",
            "Potwierdzenia dochodów (3 ostatnie odcinki płacowe)",
            "Wyciągi bankowe (ostatnie 3 miesiące)",
            "Aktualne potwierdzenie miejsca zamieszkania",
            "Umowa przedwstępna (w przypadku nieruchomości)"
          ]
        },
        help: {
          title: "Potrzebujesz pomocy?",
          subtitle: "Nasi eksperci są tutaj, aby Ci towarzyszyć",
          phone: "+48 22 123 45 67",
          schedule: "Pon-Pt 8-19"
        },
        security: {
          title: "Gwarantowane bezpieczeństwo",
          features: [
            "Szyfrowanie SSL 256 bitów",
            "Zgodność z RODO",
            "Chronione dane"
          ]
        }
      }
    },
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
      }
    },
    contact: {
      hero: {
        title: "Skontaktuj się z naszymi",
        titleSpan: "Ekspertami",
        subtitle: "Zespół poświęcony wspieraniu Cię we wszystkich projektach finansowych",
        stats: {
          responseTime: "Odpowiedź w 2h",
          experts: "Dostępni eksperci"
        }
      },
      methods: {
        title: "Sposoby kontaktu",
        subtitle: "Wybierz kanał, który Ci odpowiada, aby rozmawiać z naszymi doradcami",
        phone: {
          title: "Telefon",
          description: "Zadzwoń do nas po natychmiastową poradę",
          value: "+48 22 123 45 67",
          hours: "Pon-Pt 8-19, Sob 9-17"
        },
        email: {
          title: "Email",
          description: "Napisz do nas, szybko odpowiadamy",
          value: "kontakt@aurex-kpital.pl",
          hours: "Odpowiedź w 2h średnio"
        },
        address: {
          title: "Adres",
          description: "Spotkaj się z nami w naszych biurach",
          value: "ul. Nowy Świat 6/12, 00-400 Warszawa",
          hours: "Tylko po umówieniu"
        }
      },
      form: {
        title: "Wyślij nam wiadomość",
        fields: {
          name: "Imię i nazwisko",
          email: "Adres email",
          message: "Twoja wiadomość"
        },
        submitButton: "Wyślij wiadomość",
        successMessage: "Dziękujemy! Twoja wiadomość została wysłana pomyślnie. Odpowiemy szybko.",
        commitment: "Zobowiązujemy się odpowiedzieć w ciągu 2 godzin w czasie naszych godzin pracy."
      }
    }
  },
  fi: {
    request: {
      hero: {
        badge: "Rahoitushakemus",
        title: "Projektisi ansaitsee",
        titleHighlight: "parhaan rahoituksen",
        subtitle: "Saat henkilökohtaisen vastauksen 24 tunnissa edistyneen tekoälymme ja neuvojiemme asiantuntemuksen ansiosta",
        stats: {
          responseTime: { value: "24t", label: "Taattu vastaus" },
          security: { value: "100%", label: "GDPR-turvallinen" },
          expert: { value: "24/7", label: "Asiantuntijatuki" }
        }
      },
      steps: [
        { title: "Tiedot", description: "Henkilötietosi" },
        { title: "Projekti", description: "Rahoituksen yksityiskohdat" },
        { title: "Analyysi", description: "Henkilökohtainen tutkimus" },
        { title: "Vastaus", description: "Räätälöity tarjous" }
      ],
      form: {
        personalInfo: {
          title: "Henkilötiedot",
          subtitle: "Anna perustietosi aloittaaksesi hakemuksesi",
          fields: {
            firstName: "Etunimi",
            lastName: "Sukunimi",
            email: "Sähköpostiosoite",
            emailConfirmation: "Vahvista sähköposti",
            emailConfirmationPlaceholder: "Kirjoita sähköpostiosoitteesi uudelleen",
            phone: "Puhelin",
            birthDate: "Syntymäaika",
            nationality: "Kansallisuus",
            nationalityPlaceholder: "Valitse kansallisuutesi",
            otherNationality: "Muu kansallisuus",
            maritalStatus: "Siviilisääty",
            maritalStatusPlaceholder: "Valitse statuksesi",
            dependents: "Huollettavien lukumäärä"
          },
          validation: {
            emailMismatch: "Sähköpostiosoitteet eivät täsmää",
            emailConfirmed: "Sähköpostiosoitteet vahvistettu"
          },
          maritalStatusOptions: {
            single: "Naimaton",
            married: "Naimisissa",
            divorced: "Eronnut",
            widowed: "Leski",
            partnership: "Avoliitto"
          }
        },
        professionalInfo: {
          title: "Ammatillinen tilanne",
          subtitle: "Tiedot ammatillisesta toiminnastasi ja tuloistasi",
          fields: {
            employmentStatus: "Työllisyystilanne",
            employmentStatusPlaceholder: "Ammatillinen tilanteesi",
            profession: "Ammatti",
            employer: "Työnantaja",
            employmentDuration: "Työsuhteen kesto",
            monthlyIncome: "Kuukausittaiset nettotulot (€)",
            additionalIncome: "Muut kuukausittaiset tulot (€)"
          },
          employmentOptions: {
            employee: "Työntekijä",
            selfEmployed: "Yrittäjä",
            business: "Yritysjohtaja",
            retired: "Eläkeläinen",
            student: "Opiskelija",
            unemployed: "Työtön"
          }
        },
        loanRequest: {
          title: "Rahoitushakemus",
          subtitle: "Ilmoita rahoitusprojektisi yksityiskohdat",
          fields: {
            loanType: "Lainatyyppi",
            loanTypePlaceholder: "Valitse rahoitustyyppi",
            amount: "Haluttu summa (€)",
            duration: "Takaisinmaksuaika (kuukautta)",
            purpose: "Rahoituksen tarkoitus",
            hasGuarantee: "Onko sinulla takuu?"
          },
          loanTypes: {
            personal: "Henkilökohtainen laina",
            auto: "Autolaina",
            home: "Asuntolaina",
            business: "Yritysrahoitus",
            consolidation: "Lainojen yhdistäminen"
          },
          guaranteeOptions: {
            yes: "Kyllä",
            no: "Ei",
            discuss: "Keskusteltavissa"
          }
        },
        validation: {
          title: "Vahvistus ja asiakirjat",
          subtitle: "Viimeistele hakemuksesi",
          fields: {
            hasRequiredDocs: "Vahvistan, että minulla on vaaditut asiakirjat",
            acceptsTerms: "Hyväksyn käyttöehdot",
            acceptsMarketing: "Hyväksyn markkinointitietojen vastaanoton"
          },
          submitButton: "Lähetä hakemukseni"
        }
      },
      sidebar: {
        documents: {
          title: "Vaaditut asiakirjat",
          subtitle: "Valmistele nämä asiakirjat nopeuttaaksesi hakemustasi",
          list: [
            "Voimassa oleva henkilöllisyystodistus",
            "Tulotositteet (3 viimeistä palkkakuittia)",
            "Tiliotteet (viimeiset 3 kuukautta)",
            "Tuore asuintodistus",
            "Kauppasopimus (kiinteistön tapauksessa)"
          ]
        },
        help: {
          title: "Tarvitsetko apua?",
          subtitle: "Asiantuntijamme ovat täällä auttamassa sinua",
          phone: "+358 9 123 4567",
          schedule: "Ma-Pe 8-19"
        },
        security: {
          title: "Taattu turvallisuus",
          features: [
            "256-bittinen SSL-salaus",
            "GDPR-yhteensopiva",
            "Suojattu data"
          ]
        }
      }
    },
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
    contact: {
      hero: {
        title: "Ota yhteyttä",
        titleSpan: "Asiantuntijoihimme",
        subtitle: "Tiimi, joka on omistautunut tukemaan sinua kaikissa rahoitusprojekteissasi",
        stats: {
          responseTime: "Vastaus 2h sisällä",
          experts: "Asiantuntijat käytettävissä"
        }
      },
      methods: {
        title: "Yhteydenottotavat",
        subtitle: "Valitse sinulle sopiva kanava keskustellaksesi neuvojiemme kanssa",
        phone: {
          title: "Puhelin",
          description: "Keskustele suoraan konsulttiemme kanssa",
          value: "+49 40 710 97523",
          hours: "Ma-Pe: 8h-19h, La: 9h-17h"
        },
        email: {
          title: "Sähköposti",
          description: "Lähetä meille kysymyksesi",
          value: "contact@aurex-kpital.de",
          hours: "Vastaus 4h:ssa keskimäärin"
        },
        address: {
          title: "Osoite",
          description: "Vieraile toimistossamme Hampurissa",
          value: "Irma-Keilhack-Ring 24, 22145 Hamburg",
          hours: "Vain sopimuksella"
        }
      },
      form: {
        title: "Lähetä meille viesti",
        fields: {
          name: "Koko nimi",
          email: "Sähköpostiosoite",
          message: "Viestisi"
        },
        submitButton: "Lähetä viesti",
        successMessage: "Viestisi on lähetetty onnistuneesti! Otamme yhteyttä nopeasti.",
        commitment: "Sitoudumme vastaamaan 24h sisällä"
      }
    }
  },
  pt: {
    request: {
      hero: {
        badge: "Pedido de Financiamento",
        title: "O seu projeto merece",
        titleHighlight: "o melhor financiamento",
        subtitle: "Obtenha uma resposta personalizada em 24h graças à nossa IA avançada e à experiência dos nossos consultores",
        stats: {
          responseTime: { value: "24h", label: "Resposta garantida" },
          security: { value: "100%", label: "Seguro RGPD" },
          expert: { value: "24/7", label: "Apoio especializado" }
        }
      },
      steps: [
        { title: "Informações", description: "Os seus dados pessoais" },
        { title: "Projeto", description: "Detalhes do financiamento" },
        { title: "Análise", description: "Estudo personalizado" },
        { title: "Resposta", description: "Proposta à medida" }
      ],
      form: {
        personalInfo: {
          title: "Informações pessoais",
          subtitle: "Introduza as suas informações básicas para começar o seu pedido",
          fields: {
            firstName: "Nome próprio",
            lastName: "Apelido",
            email: "Endereço de e-mail",
            emailConfirmation: "Confirmar e-mail",
            emailConfirmationPlaceholder: "Digite novamente o seu endereço de e-mail",
            phone: "Telefone",
            birthDate: "Data de nascimento",
            nationality: "Nacionalidade",
            nationalityPlaceholder: "Selecione a sua nacionalidade",
            otherNationality: "Outra nacionalidade",
            maritalStatus: "Estado civil",
            maritalStatusPlaceholder: "Selecione o seu estado",
            dependents: "Número de dependentes"
          },
          validation: {
            emailMismatch: "Os endereços de e-mail não coincidem",
            emailConfirmed: "Endereços de e-mail confirmados"
          },
          maritalStatusOptions: {
            single: "Solteiro/a",
            married: "Casado/a",
            divorced: "Divorciado/a",
            widowed: "Viúvo/a",
            partnership: "União de facto"
          }
        },
        professionalInfo: {
          title: "Situação profissional",
          subtitle: "Informações sobre a sua atividade profissional e rendimentos",
          fields: {
            employmentStatus: "Estado profissional",
            employmentStatusPlaceholder: "A sua situação profissional",
            profession: "Profissão",
            employer: "Empregador",
            employmentDuration: "Antiguidade no emprego",
            monthlyIncome: "Rendimentos mensais líquidos (€)",
            additionalIncome: "Outros rendimentos mensais (€)"
          },
          employmentOptions: {
            employee: "Empregado/a",
            selfEmployed: "Trabalhador independente",
            business: "Empresário",
            retired: "Reformado/a",
            student: "Estudante",
            unemployed: "Desempregado/a"
          }
        },
        loanRequest: {
          title: "Pedido de financiamento",
          subtitle: "Especifique os detalhes do seu projeto de financiamento",
          fields: {
            loanType: "Tipo de empréstimo",
            loanTypePlaceholder: "Escolha o tipo de financiamento",
            amount: "Montante desejado (€)",
            duration: "Duração do reembolso (meses)",
            purpose: "Finalidade do financiamento",
            hasGuarantee: "Tem uma garantia?"
          },
          loanTypes: {
            personal: "Empréstimo pessoal",
            auto: "Crédito automóvel",
            home: "Empréstimo habitação",
            business: "Financiamento empresarial",
            consolidation: "Consolidação de créditos"
          },
          guaranteeOptions: {
            yes: "Sim",
            no: "Não",
            discuss: "A discutir"
          }
        },
        validation: {
          title: "Validação e documentos",
          subtitle: "Finalize o seu pedido",
          fields: {
            hasRequiredDocs: "Confirmo que tenho os documentos exigidos",
            acceptsTerms: "Aceito os termos e condições",
            acceptsMarketing: "Aceito receber informações comerciais"
          },
          submitButton: "Enviar o meu pedido"
        }
      },
      sidebar: {
        documents: {
          title: "Documentos exigidos",
          subtitle: "Prepare estes documentos para acelerar o seu pedido",
          list: [
            "Documento de identidade válido",
            "Comprovativos de rendimentos (3 últimos recibos)",
            "Extratos bancários (últimos 3 meses)",
            "Comprovativo de residência recente",
            "Contrato promessa (se imobiliário)"
          ]
        },
        help: {
          title: "Precisa de ajuda?",
          subtitle: "Os nossos especialistas estão aqui para o acompanhar",
          phone: "+351 21 123 45 67",
          schedule: "Seg-Sex 8h-19h"
        },
        security: {
          title: "Segurança garantida",
          features: [
            "Encriptação SSL 256 bits",
            "Conformidade RGPD",
            "Dados protegidos"
          ]
        }
      }
    },
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
    contact: {
      hero: {
        title: "Contacte os nossos",
        titleSpan: "Especialistas",
        subtitle: "Uma equipa dedicada para o acompanhar em todos os seus projetos financeiros",
        stats: {
          responseTime: "Resposta em 2h",
          experts: "Especialistas disponíveis"
        }
      },
      methods: {
        title: "Meios de contacto",
        subtitle: "Escolha o canal que mais lhe convém para falar com os nossos consultores",
        phone: {
          title: "Telefone",
          description: "Ligue-nos para um conselho imediato",
          value: "+351 21 123 45 67",
          hours: "Seg-Sex 8h-19h, Sáb 9h-17h"
        },
        email: {
          title: "Email",
          description: "Escreva-nos, respondemos rapidamente",
          value: "contacto@aurex-kpital.pt",
          hours: "Resposta em 2h em média"
        },
        address: {
          title: "Morada",
          description: "Encontre-nos nos nossos escritórios",
          value: "Avenida da Liberdade 110, 1269-046 Lisboa",
          hours: "Apenas com marcação"
        }
      },
      form: {
        title: "Envie-nos uma mensagem",
        fields: {
          name: "Nome e apelido",
          email: "Endereço de email",
          message: "A sua mensagem"
        },
        submitButton: "Enviar mensagem",
        successMessage: "Obrigado! A sua mensagem foi enviada com sucesso. Responderemos rapidamente.",
        commitment: "Comprometemo-nos a responder em 2 horas durante o nosso horário de funcionamento."
      }
    }
  },
  el: {
    request: {
      hero: {
        badge: "Αίτηση Χρηματοδότησης",
        title: "Το έργο σας αξίζει",
        titleHighlight: "την καλύτερη χρηματοδότηση",
        subtitle: "Αποκτήστε μια εξατομικευμένη απάντηση σε 24 ώρες χάρη στην προηγμένη AI μας και την εμπειρία των συμβούλων μας",
        stats: {
          responseTime: { value: "24ω", label: "Εγγυημένη απάντηση" },
          security: { value: "100%", label: "Ασφαλές GDPR" },
          expert: { value: "24/7", label: "Υποστήριξη εμπειρογνωμόνων" }
        }
      },
      steps: [
        { title: "Πληροφορίες", description: "Τα προσωπικά σας στοιχεία" },
        { title: "Έργο", description: "Λεπτομέρειες χρηματοδότησης" },
        { title: "Ανάλυση", description: "Εξατομικευμένη μελέτη" },
        { title: "Απάντηση", description: "Προσαρμοσμένη πρόταση" }
      ],
      form: {
        personalInfo: {
          title: "Προσωπικές πληροφορίες",
          subtitle: "Εισάγετε τις βασικές σας πληροφορίες για να ξεκινήσετε την αίτησή σας",
          fields: {
            firstName: "Όνομα",
            lastName: "Επώνυμο",
            email: "Διεύθυνση email",
            emailConfirmation: "Επιβεβαίωση email",
            emailConfirmationPlaceholder: "Πληκτρολογήστε ξανά τη διεύθυνση email σας",
            phone: "Τηλέφωνο",
            birthDate: "Ημερομηνία γέννησης",
            nationality: "Εθνικότητα",
            nationalityPlaceholder: "Επιλέξτε την εθνικότητά σας",
            otherNationality: "Άλλη εθνικότητα",
            maritalStatus: "Οικογενειακή κατάσταση",
            maritalStatusPlaceholder: "Επιλέξτε την κατάστασή σας",
            dependents: "Αριθμός εξαρτημένων"
          },
          validation: {
            emailMismatch: "Οι διευθύνσεις email δεν ταιριάζουν",
            emailConfirmed: "Διευθύνσεις email επιβεβαιώθηκαν"
          },
          maritalStatusOptions: {
            single: "Άγαμος/η",
            married: "Παντρεμένος/η",
            divorced: "Διαζευγμένος/η",
            widowed: "Χήρος/α",
            partnership: "Συμβίωση"
          }
        },
        professionalInfo: {
          title: "Επαγγελματική κατάσταση",
          subtitle: "Πληροφορίες για την επαγγελματική σας δραστηριότητα και τα εισοδήματά σας",
          fields: {
            employmentStatus: "Επαγγελματική κατάσταση",
            employmentStatusPlaceholder: "Η επαγγελματική σας κατάσταση",
            profession: "Επάγγελμα",
            employer: "Εργοδότης",
            employmentDuration: "Αρχαιότητα στην εργασία",
            monthlyIncome: "Μηνιαία καθαρά εισοδήματα (€)",
            additionalIncome: "Άλλα μηνιαία εισοδήματα (€)"
          },
          employmentOptions: {
            employee: "Υπάλληλος",
            selfEmployed: "Ελεύθερος επαγγελματίας",
            business: "Επιχειρηματίας",
            retired: "Συνταξιούχος",
            student: "Φοιτητής",
            unemployed: "Άνεργος"
          }
        },
        loanRequest: {
          title: "Αίτηση χρηματοδότησης",
          subtitle: "Καθορίστε τις λεπτομέρειες του έργου χρηματοδότησής σας",
          fields: {
            loanType: "Τύπος δανείου",
            loanTypePlaceholder: "Επιλέξτε τον τύπο χρηματοδότησης",
            amount: "Επιθυμητό ποσό (€)",
            duration: "Διάρκεια αποπληρωμής (μήνες)",
            purpose: "Σκοπός χρηματοδότησης",
            hasGuarantee: "Έχετε εγγύηση;"
          },
          loanTypes: {
            personal: "Προσωπικό δάνειο",
            auto: "Δάνειο αυτοκινήτου",
            home: "Στεγαστικό δάνειο",
            business: "Επιχειρηματική χρηματοδότηση",
            consolidation: "Ενοποίηση δανείων"
          },
          guaranteeOptions: {
            yes: "Ναι",
            no: "Όχι",
            discuss: "Προς συζήτηση"
          }
        },
        validation: {
          title: "Επικύρωση και έγγραφα",
          subtitle: "Ολοκληρώστε την αίτησή σας",
          fields: {
            hasRequiredDocs: "Επιβεβαιώνω ότι διαθέτω τα απαιτούμενα έγγραφα",
            acceptsTerms: "Αποδέχομαι τους όρους και τις προϋποθέσεις",
            acceptsMarketing: "Αποδέχομαι τη λήψη εμπορικών πληροφοριών"
          },
          submitButton: "Αποστολή αίτησης"
        }
      },
      sidebar: {
        documents: {
          title: "Απαιτούμενα έγγραφα",
          subtitle: "Προετοιμάστε αυτά τα έγγραφα για να επιταχύνετε την αίτησή σας",
          list: [
            "Έγκυρη ταυτότητα",
            "Αποδεικτικά εισοδήματος (3 τελευταίες μισθοδοσίες)",
            "Τραπεζικά αντίγραφα (τελευταίοι 3 μήνες)",
            "Πρόσφατο αποδεικτικό κατοικίας",
            "Προσύμφωνο πώλησης (αν ακίνητο)"
          ]
        },
        help: {
          title: "Χρειάζεστε βοήθεια;",
          subtitle: "Οι ειδικοί μας είναι εδώ για να σας συνοδεύσουν",
          phone: "+30 21 123 45 67",
          schedule: "Δευ-Παρ 8-19"
        },
        security: {
          title: "Εγγυημένη ασφάλεια",
          features: [
            "Κρυπτογράφηση SSL 256 bit",
            "Συμμόρφωση GDPR",
            "Προστατευμένα δεδομένα"
          ]
        }
      }
    },
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
          title: "Επικοινωνία",
          phone: "Τηλέφωνο",
          email: "Email",
          hours: "Ώρες",
          schedule: "Δευτέρα-Παρασκευή 8h-19h, Σάββατο 9h-17h",
          hero: {
            badge: "Αριστεία Υποστήριξης",
            title: "Επικοινωνήστε με τους",
            titleSpan: "Ειδικούς μας",
            subtitle: "Η ομάδα μας σας συνοδεύει σε κάθε βήμα του χρηματοοικονομικού σας έργου. Διάφοροι τρόποι επικοινωνίας σύμφωνα με τις προτιμήσεις σας.",
            stats: {
              satisfaction: "Ικανοποίηση πελατών",
              responseTime: "Μέσος χρόνος απάντησης",
              experts: "Σύμβουλοι ειδικοί"
            }
          },
          methods: {
            title: "Πώς να επικοινωνήσετε μαζί μας",
            subtitle: "Επιλέξτε το κανάλι που σας εξυπηρετεί",
            phone: {
              title: "Τηλέφωνο",
              description: "Μιλήστε απευθείας με τους συμβούλους μας",
              value: "+49 40 710 97523",
              hours: "Δευ-Παρ: 8h-19h, Σάβ: 9h-17h"
            },
            email: {
              title: "Email",
              description: "Στείλτε μας τις ερωτήσεις σας",
              value: "contact@aurex-kpital.de",
              hours: "Απάντηση σε 4h κατά μέσο όρο"
            },
            address: {
              title: "Διεύθυνση", 
              description: "Επισκεφθείτε τα γραφεία μας στο Αμβούργο",
              value: "Irma-Keilhack-Ring 24, 22145 Αμβούργο",
              hours: "Μόνο με ραντεβού"
            }
          },
          form: {
            title: "Στείλτε μας μήνυμα",
            subtitle: "Συμπληρώστε αυτή τη φόρμα και θα επικοινωνήσουμε γρήγορα",
            fields: {
              name: "Πλήρες όνομα",
              email: "Διεύθυνση email",
              phone: "Τηλέφωνο", 
              subject: "Θέμα",
              message: "Το μήνυμά σας",
              preferredContact: "Προτιμώμενος τρόπος επικοινωνίας",
              urgency: "Επίπεδο επείγοντος"
            },
            submitButton: "Αποστολή μηνύματος",
            successMessage: "Το μήνυμά σας στάλθηκε με επιτυχία! Θα επικοινωνήσουμε γρήγορα.",
            commitment: "Δεσμευόμαστε να απαντήσουμε εντός 24h"
          },
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
      }
    },
    contact: {
      hero: {
        title: "Επικοινωνήστε με τους",
        titleSpan: "Ειδικούς μας",
        subtitle: "Μια αφοσιωμένη ομάδα για να σας συνοδεύσει σε όλα τα χρηματοδοτικά σας έργα",
        stats: {
          responseTime: "Απάντηση σε 2ω",
          experts: "Διαθέσιμοι ειδικοί"
        }
      },
      methods: {
        title: "Μέσα επικοινωνίας",
        subtitle: "Επιλέξτε το κανάλι που σας ταιριάζει για να μιλήσετε με τους συμβούλους μας",
        phone: {
          title: "Τηλέφωνο",
          description: "Καλέστε μας για άμεση συμβουλή",
          value: "+30 210 123 4567",
          hours: "Δευ-Παρ 8π-19μ, Σαβ 9π-17μ"
        },
        email: {
          title: "Email",
          description: "Γράψτε μας, απαντάμε γρήγορα",
          value: "επικοινωνια@aurex-kpital.gr",
          hours: "Απάντηση σε 2ω κατά μέσο όρο"
        },
        address: {
          title: "Διεύθυνση",
          description: "Συναντήστε μας στα γραφεία μας",
          value: "Λεωφ. Βασιλίσσης Σοφίας 115, 115 21 Αθήνα",
          hours: "Μόνο με ραντεβού"
        }
      },
      form: {
        title: "Στείλτε μας ένα μήνυμα",
        fields: {
          name: "Πλήρες όνομα",
          email: "Διεύθυνση email",
          message: "Το μήνυμά σας"
        },
        submitButton: "Αποστολή μηνύματος",
        successMessage: "Το μήνυμά σας στάλθηκε με επιτυχία! Θα απαντήσουμε γρήγορα.",
        commitment: "Δεσμευόμαστε να απαντήσουμε εντός 2 ωρών κατά τη διάρκεια των ωραρίων μας."
      }
    }
  }
};
