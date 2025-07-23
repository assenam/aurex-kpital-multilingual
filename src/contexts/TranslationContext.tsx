import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Language = 'fr' | 'de' | 'pl' | 'fi' | 'es' | 'pt' | 'el' | 'it';

interface TranslationContextType {
  language: Language;
  changeLanguage: (newLanguage: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
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
      request: "Demande",
      contact: "Contact",
      faq: "FAQ"
    },
    legal: {
      badge: "Informations Légales",
      title: {
        main: "Mentions",
        subtitle: "Légales"
      },
      description: "Informations légales et réglementaires",
      tabs: {
        mentions: "Mentions légales",
        privacy: "Confidentialité", 
        terms: "Conditions",
        gdpr: "RGPD"
      }
    }
  },
  de: {
    nav: {
      home: "Startseite",
      services: "Dienstleistungen",
      simulator: "Simulator",
      request: "Anfrage",
      contact: "Kontakt",
      faq: "FAQ"
    },
    legal: {
      badge: "Rechtliche Informationen",
      title: {
        main: "Rechtliche",
        subtitle: "Hinweise"
      },
      description: "Rechtliche und regulatorische Informationen",
      tabs: {
        mentions: "Impressum",
        privacy: "Datenschutz",
        terms: "AGB", 
        gdpr: "DSGVO"
      }
    }
  },
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      simulator: "Simulador",
      request: "Solicitud",
      contact: "Contacto",
      faq: "FAQ"
    },
    legal: {
      badge: "Información Legal",
      title: {
        main: "Aviso",
        subtitle: "Legal"
      },
      description: "Información legal y regulatoria",
      tabs: {
        mentions: "Aviso legal",
        privacy: "Privacidad",
        terms: "Términos",
        gdpr: "RGPD"
      }
    }
  },
  it: {
    nav: {
      home: "Home",
      services: "Servizi",
      simulator: "Simulatore",
      request: "Richiesta",
      contact: "Contatto",
      faq: "FAQ"
    },
    legal: {
      badge: "Informazioni Legali",
      title: {
        main: "Note",
        subtitle: "Legali"
      },
      description: "Informazioni legali e normative",
      tabs: {
        mentions: "Note legali",
        privacy: "Privacy",
        terms: "Termini",
        gdpr: "GDPR"
      }
    }
  },
  pl: {
    nav: {
      home: "Strona główna",
      services: "Usługi",
      simulator: "Symulator",
      request: "Wniosek",
      contact: "Kontakt",
      faq: "FAQ"
    },
    legal: {
      badge: "Informacje Prawne",
      title: {
        main: "Informacje",
        subtitle: "Prawne"
      },
      description: "Informacje prawne i regulacyjne",
      tabs: {
        mentions: "Informacje prawne",
        privacy: "Prywatność",
        terms: "Warunki",
        gdpr: "RODO"
      }
    }
  },
  fi: {
    nav: {
      home: "Etusivu",
      services: "Palvelut",
      simulator: "Simulaattori",
      request: "Pyyntö",
      contact: "Yhteystiedot",
      faq: "UKK"
    },
    legal: {
      badge: "Lakitiedot",
      title: {
        main: "Lakitiedot",
        subtitle: ""
      },
      description: "Oikeudelliset ja sääntelytiedot",
      tabs: {
        mentions: "Lakitiedot",
        privacy: "Tietosuoja",
        terms: "Ehdot",
        gdpr: "GDPR"
      }
    }
  },
  pt: {
    nav: {
      home: "Início",
      services: "Serviços",
      simulator: "Simulador",
      request: "Pedido",
      contact: "Contato",
      faq: "FAQ"
    },
    legal: {
      badge: "Informações Legais",
      title: {
        main: "Avisos",
        subtitle: "Legais"
      },
      description: "Informações legais e regulamentares",
      tabs: {
        mentions: "Avisos legais",
        privacy: "Privacidade",
        terms: "Termos",
        gdpr: "GDPR"
      }
    }
  },
  el: {
    nav: {
      home: "Αρχική",
      services: "Υπηρεσίες",
      simulator: "Προσομοιωτής",
      request: "Αίτηση",
      contact: "Επικοινωνία",
      faq: "FAQ"
    },
    legal: {
      badge: "Νομικές Πληροφορίες",
      title: {
        main: "Νομικές",
        subtitle: "Πληροφορίες"
      },
      description: "Νομικές και κανονιστικές πληροφορίες",
      tabs: {
        mentions: "Νομικές πληροφορίες",
        privacy: "Απόρρητο",
        terms: "Όροι",
        gdpr: "GDPR"
      }
    }
  }
};

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'fr';
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const changeLanguage = (newLanguage: Language) => {
    setIsLoading(true);
    setTimeout(() => {
      setLanguage(newLanguage);
      setIsLoading(false);
    }, 300);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to French if translation not found
        let fallbackValue: any = translations.fr;
        for (const k of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && k in fallbackValue) {
            fallbackValue = fallbackValue[k];
          } else {
            return key; // Return key if no translation found
          }
        }
        return fallbackValue;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <TranslationContext.Provider value={{ language, changeLanguage, t, isLoading }}>
      {children}
    </TranslationContext.Provider>
  );
};