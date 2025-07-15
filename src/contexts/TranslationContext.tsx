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
    about: {
      hero: {
        badge: "Excellence depuis 1997",
        title: "Un Quart de Siècle",
        titleHighlight: "d'Innovation Financière",
        description: "Depuis Hamburg, nous révolutionnons l'accompagnement financier en combinant expertise humaine traditionnelle et technologies de pointe."
      },
      story: {
        title: "Notre Histoire",
        subtitle: "De startup hambourgeoise à leader européen de l'innovation financière",
        paragraph1: "naît en 1997 de la vision audacieuse de révolutionner les services financiers européens. Basée à Hamburg, au cœur économique de l'Allemagne, notre entreprise s'est donnée pour mission de démocratiser l'accès aux solutions financières innovantes.",
        paragraph2: "Pionniers dans l'intégration de l'intelligence artificielle aux services financiers dès 2010, nous avons développé des algorithmes propriétaires qui permettent une analyse de risque ultra-précise et des recommandations personnalisées pour chaque client.",
        paragraph3: "Aujourd'hui, avec plus de 50 000 clients dans toute l'Europe et 5 milliards d'euros de financements accordés, nous continuons d'innover pour offrir les meilleures solutions du marché."
      }
    }
  },
  de: {
    menu: {
      home: "Startseite",
      services: "Dienstleistungen",
      simulator: "Simulator",
      request: "Antrag",
      about: "Über uns",
      contact: "Kontakt",
      faq: "FAQ",
      careers: "Karriere",
      partners: "Partner",
      blog: "Blog"
    },
    about: {
      hero: {
        badge: "Exzellenz seit 1997",
        title: "Ein Vierteljahrhundert",
        titleHighlight: "Finanzinnovation",
        description: "Von Hamburg aus revolutionieren wir die Finanzbegleitung durch die Kombination traditioneller menschlicher Expertise mit modernster Technologie."
      },
      story: {
        title: "Unsere Geschichte",
        subtitle: "Vom Hamburger Startup zum europäischen Marktführer der Finanzinnovation",
        paragraph1: "entsteht 1997 aus der kühnen Vision, die europäischen Finanzdienstleistungen zu revolutionieren. Mit Sitz in Hamburg, im wirtschaftlichen Herzen Deutschlands, hat sich unser Unternehmen zum Ziel gesetzt, den Zugang zu innovativen Finanzlösungen zu demokratisieren.",
        paragraph2: "Pioniere bei der Integration von künstlicher Intelligenz in Finanzdienstleistungen seit 2010, haben wir proprietäre Algorithmen entwickelt, die eine ultra-präzise Risikoanalyse und personalisierte Empfehlungen für jeden Kunden ermöglichen.",
        paragraph3: "Heute, mit über 50 000 Kunden in ganz Europa und 5 Milliarden Euro bewilligter Finanzierungen, innovieren wir weiterhin, um die besten Lösungen des Marktes zu bieten."
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
    about: {
      hero: {
        badge: "Excelencia desde 1997",
        title: "Un Cuarto de Siglo",
        titleHighlight: "de Innovación Financiera",
        description: "Desde Hamburg, revolucionamos el acompañamiento financiero combinando experiencia humana tradicional y tecnologías de vanguardia."
      },
      story: {
        title: "Nuestra Historia",
        subtitle: "De startup hamburgués a líder europeo de la innovación financiera",
        paragraph1: "nace en 1997 de la visión audaz de revolucionar los servicios financieros europeos. Basada en Hamburg, en el corazón económico de Alemania, nuestra empresa se ha propuesto democratizar el acceso a las soluciones financieras innovadoras.",
        paragraph2: "Pioneros en la integración de la inteligencia artificial a los servicios financieros desde 2010, hemos desarrollado algoritmos propietarios que permiten un análisis de riesgo ultra-preciso y recomendaciones personalizadas para cada cliente.",
        paragraph3: "Hoy, con más de 50 000 clientes en toda Europa y 5 mil millones de euros de financiaciones otorgadas, continuamos innovando para ofrecer las mejores soluciones del mercado."
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
    about: {
      hero: {
        badge: "Eccellenza dal 1997",
        title: "Un Quarto di Secolo",
        titleHighlight: "di Innovazione Finanziaria",
        description: "Da Amburgo, rivoluzionamo l'accompagnamento finanziario combinando esperienza umana tradizionale e tecnologie all'avanguardia."
      },
      story: {
        title: "La Nostra Storia",
        subtitle: "Da startup di Amburgo a leader europeo dell'innovazione finanziaria",
        paragraph1: "nasce nel 1997 dalla visione audace di rivoluzionare i servizi finanziari europei. Con sede ad Amburgo, nel cuore economico della Germania, la nostra azienda si è posta l'obiettivo di democratizzare l'accesso alle soluzioni finanziarie innovative.",
        paragraph2: "Pionieri nell'integrazione dell'intelligenza artificiale nei servizi finanziari dal 2010, abbiamo sviluppato algoritmi proprietari che permettono un'analisi del rischio ultra-precisa e raccomandazioni personalizzate per ogni cliente.",
        paragraph3: "Oggi, con oltre 50.000 clienti in tutta Europa e 5 miliardi di euro di finanziamenti concessi, continuiamo a innovare per offrire le migliori soluzioni del mercato."
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
    about: {
      hero: {
        badge: "Doskonałość od 1997",
        title: "Ćwierć Wieku",
        titleHighlight: "Innowacji Finansowych",
        description: "Z Hamburga rewolucjonizujemy wsparcie finansowe, łącząc tradycyjną ludzką ekspertyzę z najnowocześniejszymi technologiami."
      },
      story: {
        title: "Nasza Historia",
        subtitle: "Od hamburskiego startupu do europejskiego lidera innowacji finansowych",
        paragraph1: "rodzi się w 1997 roku z śmiałej wizji zrewolucjonizowania europejskich usług finansowych. Z siedzibą w Hamburgu, w sercu gospodarki niemieckiej, nasza firma postawiła sobie za cel demokratyzację dostępu do innowacyjnych rozwiązań finansowych.",
        paragraph2: "Pionierzy w integrowaniu sztucznej inteligencji z usługami finansowymi od 2010 roku, opracowaliśmy własnościowe algorytmy, które umożliwiają ultra-precyzyjną analizę ryzyka i spersonalizowane rekomendacje dla każdego klienta.",
        paragraph3: "Dzisiaj, z ponad 50 000 klientów w całej Europie i 5 miliardów euro przyznanych finansowań, nadal innowujemy, aby oferować najlepsze rozwiązania na rynku."
      }
    }
  },
  fi: {
    menu: {
      home: "Koti",
      services: "Palvelut",
      simulator: "Simulaattori",
      request: "Hakemus",
      about: "Tietoa meistä",
      contact: "Yhteystiedot",
      faq: "FAQ",
      careers: "Urat",
      partners: "Kumppanit",
      blog: "Blogi"
    },
    about: {
      hero: {
        badge: "Huippuosaamista vuodesta 1997",
        title: "Neljäsosa Vuosisataa",
        titleHighlight: "Rahoitusinnovaatiota",
        description: "Hampurista käsin mullistamme rahoitustukea yhdistämällä perinteisen inhimillisen asiantuntemuksen huippuluokan teknologiaan."
      },
      story: {
        title: "Tarinامme",
        subtitle: "Hampurilaisesta startupista eurooppalaiseksi rahoitusinnovaation johtajaksi",
        paragraph1: "syntyi vuonna 1997 rohkeasta visiosta mullistaa eurooppalaiset rahoituspalvelut. Hampurissa, Saksan talouden sydämessä sijaitseva yrityksemme on asettanut tavoitteekseen demokratisoida pääsyn innovatiivisiin rahoitusratkaisuihin.",
        paragraph2: "Pioneereina tekoälyn integroinnissa rahoituspalveluihin vuodesta 2010 lähtien, olemme kehittäneet omia algoritmeja, jotka mahdollistavat erittäin tarkan riskianalyysin ja personoidut suositukset jokaiselle asiakkaalle.",
        paragraph3: "Tänään, yli 50 000 asiakkaan kanssa koko Euroopassa ja 5 miljardin euron myönnettyjen rahoitusten kanssa, jatkamme innovointia tarjotaksemme markkinoiden parhaat ratkaisut."
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
    about: {
      hero: {
        badge: "Excelência desde 1997",
        title: "Um Quarto de Século",
        titleHighlight: "de Inovação Financeira",
        description: "Desde Hamburgo, revolucionamos o acompanhamento financeiro combinando experiência humana tradicional e tecnologias de ponta."
      },
      story: {
        title: "A Nossa História",
        subtitle: "De startup hamburgués a líder europeu da inovação financeira",
        paragraph1: "nasce em 1997 da visão audaciosa de revolucionar os serviços financeiros europeus. Baseada em Hamburgo, no coração económico da Alemanha, a nossa empresa propôs-se democratizar o acesso às soluções financeiras inovadoras.",
        paragraph2: "Pioneiros na integração da inteligência artificial aos serviços financeiros desde 2010, desenvolvemos algoritmos proprietários que permitem uma análise de risco ultra-precisa e recomendações personalizadas para cada cliente.",
        paragraph3: "Hoje, com mais de 50.000 clientes em toda a Europa e 5 mil milhões de euros de financiamentos concedidos, continuamos a inovar para oferecer as melhores soluções do mercado."
      }
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
      partners: "Εταίροι",
      blog: "Blog"
    },
    about: {
      hero: {
        badge: "Αριστεία από το 1997",
        title: "Ένα Τέταρτο Αιώνα",
        titleHighlight: "Χρηματοοικονομικής Καινοτομίας",
        description: "Από το Αμβούργο, επαναστατούμε τη χρηματοοικονομική υποστήριξη συνδυάζοντας παραδοσιακή ανθρώπινη εμπειρία με τεχνολογίες αιχμής."
      },
      story: {
        title: "Η Ιστορία μας",
        subtitle: "Από startup του Αμβούργου σε ευρωπαϊκό ηγέτη χρηματοοικονομικής καινοτομίας",
        paragraph1: "γεννήθηκε το 1997 από το τολμηρό όραμα να επαναστατήσει τις ευρωπαϊκές χρηματοοικονομικές υπηρεσίες. Με έδρα στο Αμβούργο, στην καρδιά της γερμανικής οικονομίας, η εταιρεία μας έχει θέσει ως στόχο να δημοκρατήσει την πρόσβαση σε καινοτόμες χρηματοοικονομικές λύσεις.",
        paragraph2: "Πρωτοπόροι στην ενσωμάτωση της τεχνητής νοημοσύνης στις χρηματοοικονομικές υπηρεσίες από το 2010, έχουμε αναπτύξει ιδιόκτητους αλγορίθμους που επιτρέπουν εξαιρετικά ακριβή ανάλυση κινδύνου και εξατομικευμένες συστάσεις για κάθε πελάτη.",
        paragraph3: "Σήμερα, με περισσότερους από 50.000 πελάτες σε όλη την Ευρώπη και 5 δισεκατομμύρια ευρώ εγκεκριμένων χρηματοδοτήσεων, συνεχίζουμε να καινοτομούμε για να προσφέρουμε τις καλύτερες λύσεις της αγοράς."
      }
    }
  }
};

export default translations;