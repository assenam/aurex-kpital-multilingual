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
      establishment: "Établissement financier agréé en Europe"
    },
    home: {
      hero: {
        title: "Votre Partenaire Financier",
        subtitle: "depuis 1997",
        description: "Excellence, innovation et confiance pour tous vos projets financiers",
        ctaBtn: "Découvrir nos solutions",
        simulateBtn: "Simuler un prêt"
      }
    }
  },
  de: {
    menu: {
      home: "Startseite",
      services: "Dienstleistungen",
      simulator: "Simulator",
      request: "Anfrage",
      about: "Über uns",
      contact: "Kontakt",
      faq: "FAQ",
      careers: "Karriere",
      partners: "Partner",
      blog: "Blog"
    },
    footer: {
      tools: "Tools",
      company: "Unternehmen",
      legal: "Rechtliches",
      privacyPolicy: "Datenschutz",
      terms: "AGB",
      mentions: "Impressum",
      gdpr: "DSGVO",
      rights: "© 2024 Aurex K-pital. Alle Rechte vorbehalten.",
      description: "Ihr vertrauensvoller Finanzpartner seit 1997. Exzellenz, Innovation und Expertise für alle Ihre Finanzprojekte in Europa.",
      services: "Dienstleistungen",
      copyright: "© 2024 Aurex K-pital. Alle Rechte vorbehalten.",
      establishment: "Zugelassenes Finanzinstitut in Europa"
    },
    home: {
      hero: {
        title: "Ihr Finanzpartner",
        subtitle: "seit 1997",
        description: "Exzellenz, Innovation und Vertrauen für alle Ihre Finanzprojekte",
        ctaBtn: "Unsere Lösungen entdecken",
        simulateBtn: "Kredit simulieren"
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
      terms: "Regulamin",
      mentions: "Informacje prawne",
      gdpr: "RODO",
      rights: "© 2024 Aurex K-pital. Wszelkie prawa zastrzeżone.",
      description: "Twój zaufany partner finansowy od 1997. Doskonałość, innowacja i wiedza dla wszystkich Twoich projektów finansowych w Europie.",
      services: "Usługi",
      copyright: "© 2024 Aurex K-pital. Wszelkie prawa zastrzeżone.",
      establishment: "Licencjonowana instytucja finansowa w Europie"
    },
    home: {
      hero: {
        title: "Twój Partner Finansowy",
        subtitle: "od 1997",
        description: "Doskonałość, innowacja i zaufanie dla wszystkich Twoich projektów finansowych",
        ctaBtn: "Odkryj nasze rozwiązania",
        simulateBtn: "Symuluj kredyt"
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
      legal: "Lakiasiat",
      privacyPolicy: "Tietosuoja",
      terms: "Käyttöehdot",
      mentions: "Lakimääräykset",
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Kaikki oikeudet pidätetään.",
      description: "Luotettava rahoituskumppanisi vuodesta 1997. Huippuosaamista, innovaatiota ja asiantuntemusta kaikille rahoitusprojekteillesi Euroopassa.",
      services: "Palvelut",
      copyright: "© 2024 Aurex K-pital. Kaikki oikeudet pidätetään.",
      establishment: "Valtuutettu rahoituslaitos Euroopassa"
    },
    home: {
      hero: {
        title: "Rahoituskumppanisi",
        subtitle: "vuodesta 1997",
        description: "Huippuosaamista, innovaatiota ja luottamusta kaikille rahoitusprojekteillesi",
        ctaBtn: "Tutustu ratkaisuihimme",
        simulateBtn: "Simuloi lainaa"
      }
    }
  },
  es: {
    menu: {
      home: "Inicio",
      services: "Servicios",
      simulator: "Simulador",
      request: "Solicitud",
      about: "Acerca de",
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
      establishment: "Institución financiera autorizada en Europa"
    },
    home: {
      hero: {
        title: "Su Socio Financiero",
        subtitle: "desde 1997",
        description: "Excelencia, innovación y confianza para todos sus proyectos financieros",
        ctaBtn: "Descubra nuestras soluciones",
        simulateBtn: "Simular préstamo"
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
      terms: "Termos e condições",
      mentions: "Avisos legais",
      gdpr: "RGPD",
      rights: "© 2024 Aurex K-pital. Todos os direitos reservados.",
      description: "O seu parceiro financeiro de confiança desde 1997. Excelência, inovação e experiência para todos os seus projetos financeiros na Europa.",
      services: "Serviços",
      copyright: "© 2024 Aurex K-pital. Todos os direitos reservados.",
      establishment: "Instituição financeira autorizada na Europa"
    },
    home: {
      hero: {
        title: "O Seu Parceiro Financeiro",
        subtitle: "desde 1997",
        description: "Excelência, inovação e confiança para todos os seus projetos financeiros",
        ctaBtn: "Descubra as nossas soluções",
        simulateBtn: "Simular empréstimo"
      }
    }
  },
  el: {
    menu: {
      home: "Αρχική",
      services: "Υπηρεσίες",
      simulator: "Προσομοιωτής",
      request: "Αίτηση",
      about: "Σχετικά",
      contact: "Επικοινωνία",
      faq: "FAQ",
      careers: "Καριέρα",
      partners: "Συνεργάτες",
      blog: "Blog"
    },
    footer: {
      tools: "Εργαλεία",
      company: "Εταιρεία",
      legal: "Νομικά",
      privacyPolicy: "Πολιτική απορρήτου",
      terms: "Όροι και προϋποθέσεις",
      mentions: "Νομικές αναφορές",
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Όλα τα δικαιώματα διατηρούνται.",
      description: "Ο αξιόπιστος χρηματοοικονομικός σας συνεργάτης από το 1997. Αριστεία, καινοτομία και εμπειρία για όλα τα χρηματοοικονομικά σας έργα στην Ευρώπη.",
      services: "Υπηρεσίες",
      copyright: "© 2024 Aurex K-pital. Όλα τα δικαιώματα διατηρούνται.",
      establishment: "Εξουσιοδοτημένο χρηματοπιστωτικό ίδρυμα στην Ευρώπη"
    },
    home: {
      hero: {
        title: "Ο Χρηματοοικονομικός Σας Συνεργάτης",
        subtitle: "από το 1997",
        description: "Αριστεία, καινοτομία και εμπιστοσύνη για όλα τα χρηματοοικονομικά σας έργα",
        ctaBtn: "Ανακαλύψτε τις λύσεις μας",
        simulateBtn: "Προσομοίωση δανείου"
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
      establishment: "Istituzione finanziaria autorizzata in Europa"
    },
    home: {
      hero: {
        title: "Il Vostro Partner Finanziario",
        subtitle: "dal 1997",
        description: "Eccellenza, innovazione e fiducia per tutti i vostri progetti finanziari",
        ctaBtn: "Scoprite le nostre soluzioni",
        simulateBtn: "Simula prestito"
      }
    }
  }
};

export default translations;