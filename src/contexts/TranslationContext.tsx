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
    index: {
      title: "Bienvenue",
      description: "Ceci est la page d'accueil",
      welcomeMessage: "Bienvenue sur notre site web !",
      callToAction: "Découvrez nos services",
      servicesSectionTitle: "Nos Services",
    },
    services: {
      title: "Nos Services",
      description: "Découvrez nos services exceptionnels",
      service1Title: "Service 1",
      service1Description: "Description du service 1",
      service2Title: "Service 2",
      service2Description: "Description du service 2",
      service3Title: "Service 3",
      service3Description: "Description du service 3",
    },
    contact: {
      title: "Contactez-nous",
      description: "Contactez notre équipe pour toute question",
      formNameLabel: "Nom",
      formEmailLabel: "Email",
      formMessageLabel: "Message",
      formSubmitButton: "Envoyer",
      successMessage: "Votre message a été envoyé avec succès !",
      errorMessage: "Une erreur s'est produite lors de l'envoi du message.",
    },
    faq: {
      title: "FAQ",
      description: "Questions fréquemment posées",
      question1: "Question 1",
      answer1: "Réponse à la question 1",
      question2: "Question 2",
      answer2: "Réponse à la question 2",
      question3: "Question 3",
      answer3: "Réponse à la question 3",
    },
    legal: {
      title: "Mentions Légales",
      description: "Informations légales concernant notre site",
      content: "Contenu des mentions légales...",
    },
    notFound: {
      title: "Page non trouvée",
      description: "La page que vous recherchez n'existe pas.",
      backHomeButton: "Retour à l'accueil",
    },
    careers: {
      title: "Carrières",
      description: "Rejoignez notre équipe",
      openPositions: "Postes ouverts",
      noPositions: "Aucun poste ouvert pour le moment.",
    },
    partners: {
      title: "Partenaires",
      description: "Nos partenaires de confiance",
      partner1: "Partenaire 1",
      partner2: "Partenaire 2",
      partner3: "Partenaire 3",
    },
    simulator: {
      title: "Simulateur",
      description: "Simulez vos projets",
      inputLabel: "Entrez un montant",
      resultLabel: "Résultat",
    },
    request: {
      title: "Demande",
      description: "Faites une demande personnalisée",
      formLabel: "Formulaire de demande",
    },
    footer: {
      contactUs: "Contactez-nous",
      address: "Adresse",
      phone: "Téléphone",
      email: "Email",
      followUs: "Suivez-nous",
      legal: "Mentions légales",
    },
    navigation: {
      home: "Accueil",
      services: "Services",
      simulator: "Simulateur",
      request: "Demande",
      contact: "Contact",
      faq: "FAQ",
      partners: "Partenaires",
      careers: "Carrières",
    },
    common: {
      loading: "Chargement...",
      error: "Erreur",
      success: "Succès",
      submit: "Envoyer",
      cancel: "Annuler",
      save: "Enregistrer",
      edit: "Modifier",
      delete: "Supprimer",
      back: "Retour",
      next: "Suivant",
      previous: "Précédent",
      confirm: "Confirmer",
      close: "Fermer",
      search: "Rechercher",
      reset: "Réinitialiser",
      apply: "Appliquer",
      clear: "Effacer",
      all: "Tous",
      yes: "Oui",
      no: "Non",
      optional: "Optionnel",
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
        amountPlaceholder: "Montant en euros",
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
    }
  }
}; // Added missing closing brace

export default translations;
