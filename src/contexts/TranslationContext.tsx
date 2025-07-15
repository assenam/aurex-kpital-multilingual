import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback, useRef } from 'react';

export type Language = 'fr' | 'de' | 'pl' | 'fi' | 'es' | 'pt' | 'el' | 'it' | 'nl' | 'en';

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

const translationCache = new Map<string, string>();

const populateCache = () => {
  const allLanguages: Language[] = ['fr', 'de', 'pl', 'fi', 'es', 'pt', 'el', 'it', 'nl', 'en'];
  
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

  if (!cacheInitialized.current) {
    populateCache();
    cacheInitialized.current = true;
  }

  const changeLanguage = useCallback((newLanguage: Language) => {
    if (newLanguage === language) return;
    
    requestAnimationFrame(() => {
      setLanguage(newLanguage);
      localStorage.setItem('preferredLanguage', newLanguage);
    });
  }, [language]);
  
  const t = useCallback((key: string): string => {
    const cacheKey = `${language}:${key}`;
    const cachedValue = translationCache.get(cacheKey);
    
    if (cachedValue) {
      return cachedValue;
    }

    const keys = key.split('.');
    let current: any = translations[language];
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
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
            return key;
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }
    
    const result = typeof current === 'string' ? current : key;
    translationCache.set(cacheKey, result);
    return result;
  }, [language]);

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
    about: {
      hero: {
        badge: "Excellence depuis 1997",
        title: "Un Quart de Siècle",
        titleHighlight: "d'Innovation Financière",
        description: "Depuis Hamburg, nous révolutionnons l'accompagnement financier en combinant expertise humaine traditionnelle et technologies de pointe."
      },
      story: {
        title: "Notre Histoire",
        subtitle: "De startup hambourgeoise à leader européen de l'innovation financière"
      },
      timeline: {
        title: "Nos Grandes Étapes"
      },
      values: {
        title: "Nos Valeurs",
        subtitle: "Les principes qui guident chacune de nos actions"
      },
      team: {
        title: "Notre Équipe Dirigeante",
        subtitle: "Des experts reconnus au service de votre réussite"
      },
      certifications: {
        title: "Certifications & Accréditations",
        subtitle: "Reconnaissance officielle de notre excellence opérationnelle"
      },
      contact: {
        title: "Nous Rencontrer",
        subtitle: "Nos bureaux vous accueillent au cœur de Hamburg"
      }
    }
  },
  de: {
    about: {
      hero: {
        badge: "Exzellenz seit 1997",
        title: "Ein Vierteljahrhundert",
        titleHighlight: "Finanzinnovation",
        description: "Von Hamburg aus revolutionieren wir die Finanzberatung durch die Kombination traditioneller menschlicher Expertise mit modernster Technologie."
      },
      story: {
        title: "Unsere Geschichte",
        subtitle: "Von einem Hamburger Start-up zum europäischen Marktführer für Finanzinnovation"
      },
      timeline: {
        title: "Unsere Meilensteine"
      },
      values: {
        title: "Unsere Werte",
        subtitle: "Die Prinzipien, die jede unserer Handlungen leiten"
      },
      team: {
        title: "Unser Führungsteam",
        subtitle: "Anerkannte Experten in Ihrem Service"
      },
      certifications: {
        title: "Zertifizierungen & Akkreditierungen",
        subtitle: "Offizielle Anerkennung unserer operativen Exzellenz"
      },
      contact: {
        title: "Besuchen Sie uns",
        subtitle: "Unsere Büros empfangen Sie im Herzen von Hamburg"
      }
    }
  },
  es: {
    about: {
      hero: {
        badge: "Excelencia desde 1997",
        title: "Un Cuarto de Siglo",
        titleHighlight: "de Innovación Financiera",
        description: "Desde Hamburgo, revolucionamos el acompañamiento financiero combinando experiencia humana tradicional y tecnologías de punta."
      },
      story: {
        title: "Nuestra Historia",
        subtitle: "De startup de Hamburgo a líder europeo en innovación financiera"
      },
      timeline: {
        title: "Nuestros Grandes Hitos"
      },
      values: {
        title: "Nuestros Valores",
        subtitle: "Los principios que guían cada una de nuestras acciones"
      },
      team: {
        title: "Nuestro Equipo Directivo",
        subtitle: "Expertos reconocidos al servicio de su éxito"
      },
      certifications: {
        title: "Certificaciones y Acreditaciones",
        subtitle: "Reconocimiento oficial de nuestra excelencia operativa"
      },
      contact: {
        title: "Visítenos",
        subtitle: "Nuestras oficinas le reciben en el corazón de Hamburgo"
      }
    }
  },
  it: {
    about: {
      hero: {
        badge: "Eccellenza dal 1997",
        title: "Un Quarto di Secolo",
        titleHighlight: "di Innovazione Finanziaria",
        description: "Da Amburgo, rivoluzzioniamo l'accompagnamento finanziario combinando competenza umana tradizionale e tecnologie all'avanguardia."
      },
      story: {
        title: "La Nostra Storia",
        subtitle: "Da startup di Amburgo a leader europeo dell'innovazione finanziaria"
      },
      timeline: {
        title: "Le Nostre Tappe Principali"
      },
      values: {
        title: "I Nostri Valori",
        subtitle: "I principi che guidano ogni nostra azione"
      },
      team: {
        title: "Il Nostro Team Dirigente",
        subtitle: "Esperti riconosciuti al servizio del vostro successo"
      },
      certifications: {
        title: "Certificazioni e Accreditamenti",
        subtitle: "Riconoscimento ufficiale della nostra eccellenza operativa"
      },
      contact: {
        title: "Venite a Trovarci",
        subtitle: "I nostri uffici vi accolgono nel cuore di Amburgo"
      }
    }
  },
  pl: {
    about: {
      hero: {
        badge: "Doskonałość od 1997",
        title: "Ćwierć Wieku",
        titleHighlight: "Innowacji Finansowych",
        description: "Z Hamburga rewolucjonizujemy doradztwo finansowe, łącząc tradycyjną ludzką ekspertyzę z najnowocześniejszymi technologiami."
      },
      story: {
        title: "Nasza Historia",
        subtitle: "Od hamburskiego startupu do europejskiego lidera innowacji finansowych"
      },
      timeline: {
        title: "Nasze Wielkie Kamienie Milowe"
      },
      values: {
        title: "Nasze Wartości",
        subtitle: "Zasady, które kierują każdym naszym działaniem"
      },
      team: {
        title: "Nasz Zespół Kierowniczy",
        subtitle: "Uznani eksperci w służbie Państwa sukcesu"
      },
      certifications: {
        title: "Certyfikaty i Akredytacje",
        subtitle: "Oficjalne uznanie naszej doskonałości operacyjnej"
      },
      contact: {
        title: "Odwiedź Nas",
        subtitle: "Nasze biura witają Państwa w sercu Hamburga"
      }
    }
  },
  fi: {
    about: {
      hero: {
        badge: "Huippuosaamista vuodesta 1997",
        title: "Neljäsosa Vuosisataa",
        titleHighlight: "Rahoitusinnovaatioita",
        description: "Hampurista käsin mullistamme rahoitusneuvontaa yhdistämällä perinteisen inhimillisen asiantuntemuksen huippuluokan teknologioihin."
      },
      story: {
        title: "Tarinamme",
        subtitle: "Hampurilaisesta startupista eurooppalaiseksi rahoitusinnovaatioiden johtajaksi"
      },
      timeline: {
        title: "Suuret Virstanpylväämme"
      },
      values: {
        title: "Arvomme",
        subtitle: "Periaatteet, jotka ohjaavat jokaista toimintaamme"
      },
      team: {
        title: "Johtoryhmämme",
        subtitle: "Tunnustettuja asiantuntijoita menestyksenne palveluksessa"
      },
      certifications: {
        title: "Sertifikaatit ja Akkreditoinnit",
        subtitle: "Virallinen tunnustus operatiivisesta huippuosaamisestamme"
      },
      contact: {
        title: "Vieraile Luonamme",
        subtitle: "Toimistomme toivottavat teidät tervetulleiksi Hampurin sydämeen"
      }
    }
  },
  pt: {
    about: {
      hero: {
        badge: "Excelência desde 1997",
        title: "Um Quarto de Século",
        titleHighlight: "de Inovação Financeira",
        description: "De Hamburgo, revolucionamos o acompanhamento financeiro combinando experiência humana tradicional e tecnologias de ponta."
      },
      story: {
        title: "A Nossa História",
        subtitle: "De startup de Hamburgo a líder europeu em inovação financeira"
      },
      timeline: {
        title: "Os Nossos Grandes Marcos"
      },
      values: {
        title: "Os Nossos Valores",
        subtitle: "Os princípios que orientam cada uma das nossas ações"
      },
      team: {
        title: "A Nossa Equipa Dirigente",
        subtitle: "Especialistas reconhecidos ao serviço do seu sucesso"
      },
      certifications: {
        title: "Certificações e Acreditações",
        subtitle: "Reconhecimento oficial da nossa excelência operacional"
      },
      contact: {
        title: "Visite-nos",
        subtitle: "Os nossos escritórios recebem-no no coração de Hamburgo"
      }
    }
  },
  el: {
    about: {
      hero: {
        badge: "Αριστεία από το 1997",
        title: "Ένα Τέταρτο Αιώνα",
        titleHighlight: "Χρηματοοικονομικής Καινοτομίας",
        description: "Από το Αμβούργο, επαναστατούμε τη χρηματοοικονομική καθοδήγηση συνδυάζοντας παραδοσιακή ανθρώπινη εμπειρογνωμοσύνη και τεχνολογίες αιχμής."
      },
      story: {
        title: "Η Ιστορία Μας",
        subtitle: "Από startup του Αμβούργου σε ευρωπαίο ηγέτη χρηματοοικονομικής καινοτομίας"
      },
      timeline: {
        title: "Τα Μεγάλα μας Ορόσημα"
      },
      values: {
        title: "Οι Αξίες Μας",
        subtitle: "Οι αρχές που καθοδηγούν κάθε μας ενέργεια"
      },
      team: {
        title: "Η Διοικητική μας Ομάδα",
        subtitle: "Αναγνωρισμένοι εμπειρογνώμονες στην υπηρεσία της επιτυχίας σας"
      },
      certifications: {
        title: "Πιστοποιήσεις & Διαπιστεύσεις",
        subtitle: "Επίσημη αναγνώριση της επιχειρησιακής μας αριστείας"
      },
      contact: {
        title: "Επισκεφθείτε μας",
        subtitle: "Τα γραφεία μας σας υποδέχονται στην καρδιά του Αμβούργου"
      }
    }
  },
  nl: {
    about: {
      hero: {
        badge: "Excellentie sinds 1997",
        title: "Een Kwart Eeuw",
        titleHighlight: "Financiële Innovatie",
        description: "Vanuit Hamburg revolutioneren wij financiële begeleiding door traditionele menselijke expertise te combineren met geavanceerde technologieën."
      },
      story: {
        title: "Ons Verhaal",
        subtitle: "Van Hamburgse startup tot Europese leider in financiële innovatie"
      },
      timeline: {
        title: "Onze Grote Mijlpalen"
      },
      values: {
        title: "Onze Waarden",
        subtitle: "De principes die al onze acties leiden"
      },
      team: {
        title: "Ons Leidinggevend Team",
        subtitle: "Erkende experts in dienst van uw succes"
      },
      certifications: {
        title: "Certificeringen & Accreditaties",
        subtitle: "Officiële erkenning van onze operationele excellentie"
      },
      contact: {
        title: "Bezoek Ons",
        subtitle: "Onze kantoren verwelkomen u in het hart van Hamburg"
      }
    }
  },
  en: {
    about: {
      hero: {
        badge: "Excellence since 1997",
        title: "A Quarter Century",
        titleHighlight: "of Financial Innovation",
        description: "From Hamburg, we revolutionize financial guidance by combining traditional human expertise with cutting-edge technologies."
      },
      story: {
        title: "Our Story",
        subtitle: "From Hamburg startup to European leader in financial innovation"
      },
      timeline: {
        title: "Our Major Milestones"
      },
      values: {
        title: "Our Values",
        subtitle: "The principles that guide each of our actions"
      },
      team: {
        title: "Our Executive Team",
        subtitle: "Recognized experts at your service"
      },
      certifications: {
        title: "Certifications & Accreditations",
        subtitle: "Official recognition of our operational excellence"
      },
      contact: {
        title: "Visit Us",
        subtitle: "Our offices welcome you in the heart of Hamburg"
      }
    }
  }
};
