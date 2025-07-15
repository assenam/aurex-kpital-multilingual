import React, { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';

// Language types
export type Language = 'fr' | 'en' | 'de' | 'es' | 'it' | 'nl' | 'pl' | 'fi' | 'pt' | 'el';

// Translation context interfaces
interface TranslationContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

// Create context with error handling
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Translation provider props
interface TranslationProviderProps {
  children: React.ReactNode;
}

// Translation cache for performance
const translationCache = new Map<string, string>();

// Generic translation function with caching
const translate = (key: string, lang: Language, translations: any): string => {
  const cacheKey = `${lang}.${key}`;
  
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }
  
  const keys = key.split('.');
  let result = translations[lang];
  
  for (const k of keys) {
    if (result && typeof result === 'object') {
      result = result[k];
    } else {
      console.warn(`Translation key "${key}" not found for language "${lang}"`);
      return key;
    }
  }
  
  const translation = result || key;
  translationCache.set(cacheKey, translation);
  return translation;
};

// Preload translations for performance
const populateCache = () => {
  Object.keys(translations).forEach(lang => {
    const populateLevel = (obj: any, prefix: string) => {
      Object.keys(obj).forEach(key => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          populateLevel(obj[key], fullKey);
        } else {
          translationCache.set(`${lang}.${fullKey}`, obj[key]);
        }
      });
    };
    populateLevel(translations[lang as Language], '');
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

  const t = useCallback((key: string) => {
    return translate(key, language, translations);
  }, [language]);

  const contextValue = useMemo(() => ({
    language,
    changeLanguage,
    t,
    isLoading
  }), [language, changeLanguage, t, isLoading]);

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook for using translation context
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
      },
      timeline: {
        title: "Nos Grandes Étapes",
        milestones: {
          "1997": {
            title: "Fondation à Hamburg",
            description: "Création d'Aurex K-pital avec la vision de révolutionner les services financiers en Europe"
          },
          "2003": {
            title: "Expansion européenne",
            description: "Ouverture de bureaux dans 5 pays européens et lancement des premiers services digitaux"
          },
          "2010": {
            title: "Innovation IA",
            description: "Intégration pionnière de l'intelligence artificielle dans l'analyse de crédit"
          },
          "2015": {
            title: "Certification Excellence",
            description: "Obtention des certifications européennes les plus strictes en matière financière"
          },
          "2020": {
            title: "Transformation digitale",
            description: "Lancement de la plateforme 100% digitale et des algorithmes prédictifs avancés"
          },
          "2024": {
            title: "Leader marché",
            description: "Position de leader européen avec plus de 50 000 clients satisfaits"
          }
        }
      },
      values: {
        title: "Nos Valeurs",
        subtitle: "Les principes qui guident chacune de nos actions",
        excellence: {
          title: "Excellence Client",
          description: "Chaque client est unique et mérite une attention personnalisée avec des solutions sur mesure."
        },
        security: {
          title: "Sécurité Absolue",
          description: "Protection maximale des données et des investissements avec les technologies les plus avancées."
        },
        innovation: {
          title: "Innovation Continue",
          description: "Recherche permanente de nouvelles solutions pour anticiper les besoins de demain."
        },
        transparency: {
          title: "Transparence Totale",
          description: "Communication claire et honnête sur tous nos produits, services et conditions."
        }
      },
      team: {
        title: "Notre Équipe Dirigeante",
        subtitle: "Des experts reconnus au service de votre réussite",
        experienceLabel: "d'expérience"
      },
      certifications: {
        title: "Certifications & Accréditations",
        subtitle: "Reconnaissance officielle de notre excellence opérationnelle",
        sinceLabel: "Depuis"
      },
      contact: {
        title: "Nous Rencontrer",
        subtitle: "Nos bureaux vous accueillent au cœur de Hamburg",
        address: {
          title: "Adresse",
          line1: "Irma-Keilhack-Ring 24",
          line2: "22145 Hamburg",
          line3: "Allemagne"
        },
        phone: {
          title: "Téléphone",
          number: "+49 40 710 97523",
          hours1: "Lun-Ven: 8h-19h",
          hours2: "Sam: 9h-17h"
        },
        email: {
          title: "Email",
          contact: "contact@aurex-kpital.de",
          info: "info@aurex-kpital.de",
          support: "support@aurex-kpital.de"
        },
        buttons: {
          meeting: "Prendre rendez-vous",
          request: "Demande personnalisée"
        }
      }
    },
    simulator: {
      title: "Simulateur de Crédit",
      titleSecond: "Intelligent"
    }
  },
  en: {
    menu: {
      home: "Home",
      services: "Services",
      simulator: "Simulator",
      request: "Request",
      about: "About",
      contact: "Contact",
      faq: "FAQ",
      careers: "Careers",
      partners: "Partners",
      blog: "Blog"
    },
    about: {
      hero: {
        badge: "Excellence since 1997",
        title: "A Quarter Century",
        titleHighlight: "of Financial Innovation",
        description: "From Hamburg, we revolutionize financial support by combining traditional human expertise with cutting-edge technologies."
      },
      story: {
        title: "Our Story",
        subtitle: "From Hamburg startup to European leader in financial innovation",
        paragraph1: "was born in 1997 from the bold vision of revolutionizing European financial services. Based in Hamburg, at the economic heart of Germany, our company set out to democratize access to innovative financial solutions.",
        paragraph2: "Pioneers in integrating artificial intelligence into financial services since 2010, we have developed proprietary algorithms that enable ultra-precise risk analysis and personalized recommendations for each client.",
        paragraph3: "Today, with over 50,000 clients across Europe and 5 billion euros in approved financing, we continue to innovate to offer the best solutions on the market."
      },
      timeline: {
        title: "Our Major Milestones",
        milestones: {
          "1997": {
            title: "Founded in Hamburg",
            description: "Creation of Aurex K-pital with the vision to revolutionize financial services in Europe"
          },
          "2003": {
            title: "European expansion",
            description: "Opening offices in 5 European countries and launch of first digital services"
          },
          "2010": {
            title: "AI Innovation",
            description: "Pioneering integration of artificial intelligence in credit analysis"
          },
          "2015": {
            title: "Excellence Certification",
            description: "Obtaining the strictest European certifications in financial matters"
          },
          "2020": {
            title: "Digital transformation",
            description: "Launch of 100% digital platform and advanced predictive algorithms"
          },
          "2024": {
            title: "Market leader",
            description: "European leadership position with over 50,000 satisfied clients"
          }
        }
      },
      values: {
        title: "Our Values",
        subtitle: "The principles that guide each of our actions",
        excellence: {
          title: "Client Excellence",
          description: "Each client is unique and deserves personalized attention with tailor-made solutions."
        },
        security: {
          title: "Absolute Security",
          description: "Maximum protection of data and investments with the most advanced technologies."
        },
        innovation: {
          title: "Continuous Innovation",
          description: "Permanent search for new solutions to anticipate tomorrow's needs."
        },
        transparency: {
          title: "Total Transparency",
          description: "Clear and honest communication about all our products, services and conditions."
        }
      },
      team: {
        title: "Our Leadership Team",
        subtitle: "Recognized experts at your service for success",
        experienceLabel: "years of experience"
      },
      certifications: {
        title: "Certifications & Accreditations",
        subtitle: "Official recognition of our operational excellence",
        sinceLabel: "Since"
      },
      contact: {
        title: "Meet Us",
        subtitle: "Our offices welcome you in the heart of Hamburg",
        address: {
          title: "Address",
          line1: "Irma-Keilhack-Ring 24",
          line2: "22145 Hamburg",
          line3: "Germany"
        },
        phone: {
          title: "Phone",
          number: "+49 40 710 97523",
          hours1: "Mon-Fri: 8am-7pm",
          hours2: "Sat: 9am-5pm"
        },
        email: {
          title: "Email",
          contact: "contact@aurex-kpital.de",
          info: "info@aurex-kpital.de",
          support: "support@aurex-kpital.de"
        },
        buttons: {
          meeting: "Schedule appointment",
          request: "Custom request"
        }
      }
    },
    simulator: {
      title: "Credit Simulator",
      titleSecond: "Intelligent"
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
      },
      timeline: {
        title: "Unsere Meilensteine",
        milestones: {
          "1997": {
            title: "Gründung in Hamburg",
            description: "Schaffung von Aurex K-pital mit der Vision, die Finanzdienstleistungen in Europa zu revolutionieren"
          },
          "2003": {
            title: "Europäische Expansion",
            description: "Eröffnung von Büros in 5 europäischen Ländern und Start der ersten digitalen Dienste"
          },
          "2010": {
            title: "KI-Innovation",
            description: "Pioniereinsatz künstlicher Intelligenz in der Kreditanalyse"
          },
          "2015": {
            title: "Exzellenz-Zertifizierung",
            description: "Erhalt der strengsten europäischen Zertifizierungen im Finanzbereich"
          },
          "2020": {
            title: "Digitale Transformation",
            description: "Start der 100% digitalen Plattform und fortgeschrittener Vorhersagealgorithmen"
          },
          "2024": {
            title: "Marktführer",
            description: "Europäische Führungsposition mit über 50.000 zufriedenen Kunden"
          }
        }
      },
      values: {
        title: "Unsere Werte",
        subtitle: "Die Prinzipien, die jede unserer Handlungen leiten",
        excellence: {
          title: "Kundenexzellenz",
          description: "Jeder Kunde ist einzigartig und verdient persönliche Aufmerksamkeit mit maßgeschneiderten Lösungen."
        },
        security: {
          title: "Absolute Sicherheit",
          description: "Maximaler Schutz von Daten und Investitionen mit fortschrittlichsten Technologien."
        },
        innovation: {
          title: "Kontinuierliche Innovation",
          description: "Ständige Suche nach neuen Lösungen, um die Bedürfnisse von morgen zu antizipieren."
        },
        transparency: {
          title: "Vollständige Transparenz",
          description: "Klare und ehrliche Kommunikation über alle unsere Produkte, Dienstleistungen und Bedingungen."
        }
      },
      team: {
        title: "Unsere Führungsmannschaft",
        subtitle: "Anerkannte Experten im Dienst Ihres Erfolgs",
        experienceLabel: "Jahre Erfahrung"
      },
      certifications: {
        title: "Zertifizierungen & Akkreditierungen",
        subtitle: "Offizielle Anerkennung unserer operativen Exzellenz",
        sinceLabel: "Seit"
      },
      contact: {
        title: "Uns besuchen",
        subtitle: "Unsere Büros empfangen Sie im Herzen von Hamburg",
        address: {
          title: "Adresse",
          line1: "Irma-Keilhack-Ring 24",
          line2: "22145 Hamburg",
          line3: "Deutschland"
        },
        phone: {
          title: "Telefon",
          number: "+49 40 710 97523",
          hours1: "Mo-Fr: 8-19 Uhr",
          hours2: "Sa: 9-17 Uhr"
        },
        email: {
          title: "Email",
          contact: "contact@aurex-kpital.de",
          info: "info@aurex-kpital.de",
          support: "support@aurex-kpital.de"
        },
        buttons: {
          meeting: "Termin vereinbaren",
          request: "Individuelle Anfrage"
        }
      }
    },
    simulator: {
      title: "Kredit Simulator",
      titleSecond: "Intelligent"
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
    about: {
      hero: {
        badge: "Excelencia desde 1997",
        title: "Un Cuarto de Siglo",
        titleHighlight: "de Innovación Financiera",
        description: "Desde Hamburgo, revolucionamos el acompañamiento financiero combinando la experiencia humana tradicional con tecnologías de vanguardia."
      },
      story: {
        title: "Nuestra Historia",
        subtitle: "De startup hamburgués a líder europeo de la innovación financiera",
        paragraph1: "nace en 1997 de la visión audaz de revolucionar los servicios financieros europeos. Con sede en Hamburgo, en el corazón económico de Alemania, nuestra empresa se propuso democratizar el acceso a soluciones financieras innovadoras.",
        paragraph2: "Pioneros en la integración de la inteligencia artificial en los servicios financieros desde 2010, hemos desarrollado algoritmos propietarios que permiten un análisis de riesgo ultra-preciso y recomendaciones personalizadas para cada cliente.",
        paragraph3: "Hoy, con más de 50,000 clientes en toda Europa y 5 mil millones de euros en financiamientos aprobados, seguimos innovando para ofrecer las mejores soluciones del mercado."
      },
      timeline: {
        title: "Nuestros Grandes Hitos",
        milestones: {
          "1997": {
            title: "Fundación en Hamburgo",
            description: "Creación de Aurex K-pital con la visión de revolucionar los servicios financieros en Europa"
          },
          "2003": {
            title: "Expansión europea",
            description: "Apertura de oficinas en 5 países europeos y lanzamiento de los primeros servicios digitales"
          },
          "2010": {
            title: "Innovación IA",
            description: "Integración pionera de la inteligencia artificial en el análisis de crédito"
          },
          "2015": {
            title: "Certificación Excelencia",
            description: "Obtención de las certificaciones europeas más estrictas en materia financiera"
          },
          "2020": {
            title: "Transformación digital",
            description: "Lanzamiento de la plataforma 100% digital y algoritmos predictivos avanzados"
          },
          "2024": {
            title: "Líder del mercado",
            description: "Posición de liderazgo europeo con más de 50,000 clientes satisfechos"
          }
        }
      },
      values: {
        title: "Nuestros Valores",
        subtitle: "Los principios que guían cada una de nuestras acciones",
        excellence: {
          title: "Excelencia al Cliente",
          description: "Cada cliente es único y merece atención personalizada con soluciones a medida."
        },
        security: {
          title: "Seguridad Absoluta",
          description: "Protección máxima de datos e inversiones con las tecnologías más avanzadas."
        },
        innovation: {
          title: "Innovación Continua",
          description: "Búsqueda permanente de nuevas soluciones para anticipar las necesidades del mañana."
        },
        transparency: {
          title: "Transparencia Total",
          description: "Comunicación clara y honesta sobre todos nuestros productos, servicios y condiciones."
        }
      },
      team: {
        title: "Nuestro Equipo Directivo",
        subtitle: "Expertos reconocidos al servicio de su éxito",
        experienceLabel: "años de experiencia"
      },
      certifications: {
        title: "Certificaciones y Acreditaciones",
        subtitle: "Reconocimiento oficial de nuestra excelencia operativa",
        sinceLabel: "Desde"
      },
      contact: {
        title: "Conózcanos",
        subtitle: "Nuestras oficinas le reciben en el corazón de Hamburgo",
        address: {
          title: "Dirección",
          line1: "Irma-Keilhack-Ring 24",
          line2: "22145 Hamburgo",
          line3: "Alemania"
        },
        phone: {
          title: "Teléfono",
          number: "+49 40 710 97523",
          hours1: "Lun-Vie: 8h-19h",
          hours2: "Sáb: 9h-17h"
        },
        email: {
          title: "Email",
          contact: "contact@aurex-kpital.de",
          info: "info@aurex-kpital.de",
          support: "support@aurex-kpital.de"
        },
        buttons: {
          meeting: "Programar cita",
          request: "Solicitud personalizada"
        }
      }
    },
    simulator: {
      title: "Simulador de Crédito",
      titleSecond: "Inteligente"
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
    about: {
      hero: {
        badge: "Eccellenza dal 1997",
        title: "Un Quarto di Secolo",
        titleHighlight: "di Innovazione Finanziaria",
        description: "Da Amburgo, rivoluzionamo l'accompagnamento finanziario combinando competenza umana tradizionale e tecnologie all'avanguardia."
      },
      story: {
        title: "La Nostra Storia",
        subtitle: "Da startup amburghese a leader europeo dell'innovazione finanziaria",
        paragraph1: "nasce nel 1997 dalla visione audace di rivoluzionare i servizi finanziari europei. Con sede ad Amburgo, nel cuore economico della Germania, la nostra azienda si è prefissa di democratizzare l'accesso alle soluzioni finanziarie innovative.",
        paragraph2: "Pionieri nell'integrazione dell'intelligenza artificiale nei servizi finanziari dal 2010, abbiamo sviluppato algoritmi proprietari che consentono un'analisi del rischio ultra-precisa e raccomandazioni personalizzate per ogni cliente.",
        paragraph3: "Oggi, con oltre 50.000 clienti in tutta Europa e 5 miliardi di euro di finanziamenti approvati, continuiamo a innovare per offrire le migliori soluzioni del mercato."
      },
      timeline: {
        title: "Le Nostre Grandi Tappe",
        milestones: {
          "1997": {
            title: "Fondazione ad Amburgo",
            description: "Creazione di Aurex K-pital con la visione di rivoluzionare i servizi finanziari in Europa"
          },
          "2003": {
            title: "Espansione europea",
            description: "Apertura di uffici in 5 paesi europei e lancio dei primi servizi digitali"
          },
          "2010": {
            title: "Innovazione IA",
            description: "Integrazione pionieristica dell'intelligenza artificiale nell'analisi del credito"
          },
          "2015": {
            title: "Certificazione Eccellenza",
            description: "Ottenimento delle certificazioni europee più rigorose in materia finanziaria"
          },
          "2020": {
            title: "Trasformazione digitale",
            description: "Lancio della piattaforma 100% digitale e algoritmi predittivi avanzati"
          },
          "2024": {
            title: "Leader di mercato",
            description: "Posizione di leadership europea con oltre 50.000 clienti soddisfatti"
          }
        }
      },
      values: {
        title: "I Nostri Valori",
        subtitle: "I principi che guidano ogni nostra azione",
        excellence: {
          title: "Eccellenza Cliente",
          description: "Ogni cliente è unico e merita un'attenzione personalizzata con soluzioni su misura."
        },
        security: {
          title: "Sicurezza Assoluta",
          description: "Protezione massima dei dati e degli investimenti con le tecnologie più avanzate."
        },
        innovation: {
          title: "Innovazione Continua",
          description: "Ricerca permanente di nuove soluzioni per anticipare le esigenze di domani."
        },
        transparency: {
          title: "Trasparenza Totale",
          description: "Comunicazione chiara e onesta su tutti i nostri prodotti, servizi e condizioni."
        }
      },
      team: {
        title: "Il Nostro Team Dirigente",
        subtitle: "Esperti riconosciuti al servizio del vostro successo",
        experienceLabel: "anni di esperienza"
      },
      certifications: {
        title: "Certificazioni e Accreditamenti",
        subtitle: "Riconoscimento ufficiale della nostra eccellenza operativa",
        sinceLabel: "Dal"
      },
      contact: {
        title: "Incontrarci",
        subtitle: "I nostri uffici vi accolgono nel cuore di Amburgo",
        address: {
          title: "Indirizzo",
          line1: "Irma-Keilhack-Ring 24",
          line2: "22145 Amburgo",
          line3: "Germania"
        },
        phone: {
          title: "Telefono",
          number: "+49 40 710 97523",
          hours1: "Lun-Ven: 8h-19h",
          hours2: "Sab: 9h-17h"
        },
        email: {
          title: "Email",
          contact: "contact@aurex-kpital.de",
          info: "info@aurex-kpital.de",
          support: "support@aurex-kpital.de"
        },
        buttons: {
          meeting: "Fissare appuntamento",
          request: "Richiesta personalizzata"
        }
      }
    },
    simulator: {
      title: "Simulatore di Credito",
      titleSecond: "Intelligente"
    }
  },
  nl: {
    menu: {
      home: "Home",
      services: "Diensten",
      simulator: "Simulator",
      request: "Aanvraag",
      about: "Over ons",
      contact: "Contact",
      faq: "FAQ",
      careers: "Carrières",
      partners: "Partners",
      blog: "Blog"
    },
    about: {
      hero: {
        badge: "Excellentie sinds 1997",
        title: "Een Kwart Eeuw",
        titleHighlight: "van Financiële Innovatie",
        description: "Vanuit Hamburg revolutioneren wij financiële begeleiding door traditionele menselijke expertise te combineren met geavanceerde technologieën."
      },
      story: {
        title: "Ons Verhaal",
        subtitle: "Van Hamburg startup tot Europese leider in financiële innovatie",
        paragraph1: "werd geboren in 1997 uit de gedurfde visie om Europese financiële diensten te revolutioneren. Gevestigd in Hamburg, in het economische hart van Duitsland, stelde ons bedrijf zich tot doel de toegang tot innovatieve financiële oplossingen te democratiseren.",
        paragraph2: "Pioniers in de integratie van kunstmatige intelligentie in financiële diensten since 2010, hebben we eigendomsalgoritmen ontwikkeld die ultra-precieze risicoanalyse en gepersonaliseerde aanbevelingen voor elke klant mogelijk maken.",
        paragraph3: "Vandaag, met meer dan 50.000 klanten in heel Europa en 5 miljard euro aan goedgekeurde financieringen, blijven we innoveren om de beste oplossingen op de markt te bieden."
      },
      timeline: {
        title: "Onze Grote Mijlpalen",
        milestones: {
          "1997": {
            title: "Oprichting in Hamburg",
            description: "Creatie van Aurex K-pital met de visie om financiële diensten in Europa te revolutioneren"
          },
          "2003": {
            title: "Europese expansie",
            description: "Opening van kantoren in 5 Europese landen en lancering van eerste digitale diensten"
          },
          "2010": {
            title: "AI Innovatie",
            description: "Baanbrekende integratie van kunstmatige intelligentie in kredietanalyse"
          },
          "2015": {
            title: "Excellentie Certificering",
            description: "Verkrijgen van de strengste Europese certificeringen op financieel gebied"
          },
          "2020": {
            title: "Digitale transformatie",
            description: "Lancering van 100% digitaal platform en geavanceerde predictieve algoritmen"
          },
          "2024": {
            title: "Marktleider",
            description: "Europese leiderschapspositie met meer dan 50.000 tevreden klanten"
          }
        }
      },
      values: {
        title: "Onze Waarden",
        subtitle: "De principes die elke actie van ons leiden",
        excellence: {
          title: "Klantexcellentie",
          description: "Elke klant is uniek en verdient persoonlijke aandacht met op maat gemaakte oplossingen."
        },
        security: {
          title: "Absolute Veiligheid",
          description: "Maximale bescherming van gegevens en investeringen met de meest geavanceerde technologieën."
        },
        innovation: {
          title: "Continue Innovatie",
          description: "Permanente zoektocht naar nieuwe oplossingen om de behoeften van morgen te anticiperen."
        },
        transparency: {
          title: "Totale Transparantie",
          description: "Duidelijke en eerlijke communicatie over al onze producten, diensten en voorwaarden."
        }
      },
      team: {
        title: "Ons Leiderschapsteam",
        subtitle: "Erkende experts ten dienste van uw succes",
        experienceLabel: "jaar ervaring"
      },
      certifications: {
        title: "Certificeringen & Accreditaties",
        subtitle: "Officiële erkenning van onze operationele excellentie",
        sinceLabel: "Sinds"
      },
      contact: {
        title: "Ons Ontmoeten",
        subtitle: "Onze kantoren verwelkomen u in het hart van Hamburg",
        address: {
          title: "Adres",
          line1: "Irma-Keilhack-Ring 24",
          line2: "22145 Hamburg",
          line3: "Duitsland"
        },
        phone: {
          title: "Telefoon",
          number: "+49 40 710 97523",
          hours1: "Ma-Vr: 8u-19u",
          hours2: "Za: 9u-17u"
        },
        email: {
          title: "Email",
          contact: "contact@aurex-kpital.de",
          info: "info@aurex-kpital.de",
          support: "support@aurex-kpital.de"
        },
        buttons: {
          meeting: "Afspraak maken",
          request: "Persoonlijk verzoek"
        }
      }
    },
    simulator: {
      title: "Krediet Simulator",
      titleSecond: "Intelligent"
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
      },
      timeline: {
        title: "Nasze Wielkie Kamienie Milowe",
        milestones: {
          "1997": {
            title: "Założenie w Hamburgu",
            description: "Stworzenie Aurex K-pital z wizją zrewolucjonizowania usług finansowych w Europie"
          },
          "2003": {
            title: "Ekspansja europejska",
            description: "Otwarcie biur w 5 krajach europejskich i uruchomienie pierwszych usług cyfrowych"
          },
          "2010": {
            title: "Innowacja AI",
            description: "Pionierska integracja sztucznej inteligencji w analizie kredytowej"
          },
          "2015": {
            title: "Certyfikacja Doskonałości",
            description: "Uzyskanie najbardziej rygorystycznych europejskich certyfikatów finansowych"
          },
          "2020": {
            title: "Transformacja cyfrowa",
            description: "Uruchomienie 100% cyfrowej platformy i zaawansowanych algorytmów predykcyjnych"
          },
          "2024": {
            title: "Lider rynku",
            description: "Europejska pozycja lidera z ponad 50 000 zadowolonych klientów"
          }
        }
      },
      values: {
        title: "Nasze Wartości",
        subtitle: "Zasady, które kierują każdym naszym działaniem",
        excellence: {
          title: "Doskonałość Klienta",
          description: "Każdy klient jest wyjątkowy i zasługuje na spersonalizowaną uwagę z rozwiązaniami na miarę."
        },
        security: {
          title: "Bezpieczeństwo Absolutne",
          description: "Maksymalna ochrona danych i inwestycji z najnowocześniejszymi technologiami."
        },
        innovation: {
          title: "Ciągła Innowacja",
          description: "Stałe poszukiwanie nowych rozwiązań, aby przewidzieć potrzeby jutra."
        },
        transparency: {
          title: "Całkowita Transparentność",
          description: "Jasna i uczciwa komunikacja o wszystkich naszych produktach, usługach i warunkach."
        }
      },
      team: {
        title: "Nasz Zespół Kierowniczy",
        subtitle: "Uznani eksperci w służbie Twojego sukcesu",
        experienceLabel: "lat doświadczenia"
      },
      certifications: {
        title: "Certyfikaty i Akredytacje",
        subtitle: "Oficjalne uznanie naszej doskonałości operacyjnej",
        sinceLabel: "Od"
      },
      contact: {
        title: "Spotkaj się z nami",
        subtitle: "Nasze biura przyjmują Cię w sercu Hamburga",
        address: {
          title: "Adres",
          line1: "Irma-Keilhack-Ring 24",
          line2: "22145 Hamburg",
          line3: "Niemcy"
        },
        phone: {
          title: "Telefon",
          number: "+49 40 710 97523",
          hours1: "Pon-Pt: 8-19",
          hours2: "Sob: 9-17"
        },
        email: {
          title: "Email",
          contact: "contact@aurex-kpital.de",
          info: "info@aurex-kpital.de",
          support: "support@aurex-kpital.de"
        },
        buttons: {
          meeting: "Umów spotkanie",
          request: "Spersonalizowany wniosek"
        }
      }
    },
    simulator: {
      title: "Symulator Kredytu",
      titleSecond: "Inteligentny"
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
        title: "Tarinamme",
        subtitle: "Hampurilaisesta startupista eurooppalaiseksi rahoitusinnovaation johtajaksi",
        paragraph1: "syntyi vuonna 1997 rohkeasta visiosta mullistaa eurooppalaiset rahoituspalvelut. Hampurissa, Saksan talouden sydämessä sijaitseva yrityksemme on asettanut tavoitteekseen demokratisoida pääsyn innovatiivisiin rahoitusratkaisuihin.",
        paragraph2: "Pioneereina tekoälyn integroinnissa rahoituspalveluihin vuodesta 2010 lähtien, olemme kehittäneet omia algoritmeja, jotka mahdollistavat erittäin tarkan riskianalyysin ja personoidut suositukset jokaiselle asiakkaalle.",
        paragraph3: "Tänään, yli 50 000 asiakkaan kanssa koko Euroopassa ja 5 miljardin euron myönnettyjen rahoitusten kanssa, jatkamme innovointia tarjotaksemme markkinoiden parhaat ratkaisut."
      },
      timeline: {
        title: "Suuret Virstanpylväämme",
        milestones: {
          "1997": {
            title: "Perustaminen Hampurissa",
            description: "Aurex K-pitalin luominen visiolla vallankumouksellisten rahoituspalvelujen tuomisesta Eurooppaan"
          },
          "2003": {
            title: "Eurooppalainen laajentuminen",
            description: "Toimistojen avaaminen 5 eurooppalaisessa maassa ja ensimmäisten digitaalisten palvelujen käynnistäminen"
          },
          "2010": {
            title: "Tekoäly-innovaatio",
            description: "Uraauurtava tekoälyn integrointi luottoanalyysiin"
          },
          "2015": {
            title: "Huippuosaamisen sertifiointi",
            description: "Euroopan tiukimpien rahoitusalan sertifikaattien saaminen"
          },
          "2020": {
            title: "Digitaalinen muutos",
            description: "100% digitaalisen alustan ja kehittyneiden ennustavien algoritmien käynnistäminen"
          },
          "2024": {
            title: "Markkinajohtaja",
            description: "Eurooppalainen johtava asema yli 50 000 tyytyväisen asiakkaan kanssa"
          }
        }
      },
      values: {
        title: "Arvomme",
        subtitle: "Periaatteet, jotka ohjaavat jokaista toimintaamme",
        excellence: {
          title: "Asiakashuippuosaaminen",
          description: "Jokainen asiakas on ainutlaatuinen ja ansaitsee henkilökohtaista huomiota räätälöityjen ratkaisujen kanssa."
        },
        security: {
          title: "Ehdoton Turvallisuus",
          description: "Maksimaalinen tietojen ja sijoitusten suojaus edistyneimmillä teknologioilla."
        },
        innovation: {
          title: "Jatkuva Innovaatio",
          description: "Jatkuva uusien ratkaisujen etsiminen huomisen tarpeiden ennakoimiseksi."
        },
        transparency: {
          title: "Täydellinen Läpinäkyvyys",
          description: "Selkeä ja rehellinen viestintä kaikista tuotteistamme, palveluistamme ja ehdoistamme."
        }
      },
      team: {
        title: "Johtotiimimme",
        subtitle: "Tunnustettuja asiantuntijoita menestyksenne palveluksessa",
        experienceLabel: "vuoden kokemus"
      },
      certifications: {
        title: "Sertifikaatit ja Akkreditoinnit",
        subtitle: "Virallinen tunnustus toiminnallisesta huippuosaamisestamme",
        sinceLabel: "Vuodesta"
      },
      contact: {
        title: "Tapaa meidät",
        subtitle: "Toimistomme toivottavat sinut tervetulleeksi Hampurin sydämeen",
        address: {
          title: "Osoite",
          line1: "Irma-Keilhack-Ring 24",
          line2: "22145 Hampuri",
          line3: "Saksa"
        },
        phone: {
          title: "Puhelin",
          number: "+49 40 710 97523",
          hours1: "Ma-Pe: 8-19",
          hours2: "La: 9-17"
        },
        email: {
          title: "Sähköposti",
          contact: "contact@aurex-kpital.de",
          info: "info@aurex-kpital.de",
          support: "support@aurex-kpital.de"
        },
        buttons: {
          meeting: "Varaa tapaaminen",
          request: "Henkilökohtainen pyyntö"
        }
      }
    },
    simulator: {
      title: "Luotto Simulaattori",
      titleSecond: "Älykäs"
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
      },
      timeline: {
        title: "Os Nossos Grandes Marcos",
        milestones: {
          "1997": {
            title: "Fundação em Hamburgo",
            description: "Criação da Aurex K-pital com a visão de revolucionar os serviços financeiros na Europa"
          },
          "2003": {
            title: "Expansão europeia",
            description: "Abertura de escritórios em 5 países europeus e lançamento dos primeiros serviços digitais"
          },
          "2010": {
            title: "Inovação IA",
            description: "Integração pioneira da inteligência artificial na análise de crédito"
          },
          "2015": {
            title: "Certificação de Excelência",
            description: "Obtenção das certificações europeias mais rigorosas em matéria financeira"
          },
          "2020": {
            title: "Transformação digital",
            description: "Lançamento da plataforma 100% digital e algoritmos preditivos avançados"
          },
          "2024": {
            title: "Líder de mercado",
            description: "Posição de liderança europeia com mais de 50.000 clientes satisfeitos"
          }
        }
      },
      values: {
        title: "Os Nossos Valores",
        subtitle: "Os princípios que guiam cada uma das nossas ações",
        excellence: {
          title: "Excelência ao Cliente",
          description: "Cada cliente é único e merece atenção personalizada com soluções à medida."
        },
        security: {
          title: "Segurança Absoluta",
          description: "Proteção máxima dos dados e investimentos com as tecnologias mais avançadas."
        },
        innovation: {
          title: "Inovação Contínua",
          description: "Busca permanente por novas soluções para antecipar as necessidades de amanhã."
        },
        transparency: {
          title: "Transparência Total",
          description: "Comunicação clara e honesta sobre todos os nossos produtos, serviços e condições."
        }
      },
      team: {
        title: "A Nossa Equipa Dirigente",
        subtitle: "Especialistas reconhecidos ao serviço do seu sucesso",
        experienceLabel: "anos de experiência"
      },
      certifications: {
        title: "Certificações e Acreditações",
        subtitle: "Reconhecimento oficial da nossa excelência operacional",
        sinceLabel: "Desde"
      },
      contact: {
        title: "Encontrar-nos",
        subtitle: "Os nossos escritórios recebem-no no coração de Hamburgo",
        address: {
          title: "Morada",
          line1: "Irma-Keilhack-Ring 24",
          line2: "22145 Hamburgo",
          line3: "Alemanha"
        },
        phone: {
          title: "Telefone",
          number: "+49 40 710 97523",
          hours1: "Seg-Sex: 8h-19h",
          hours2: "Sáb: 9h-17h"
        },
        email: {
          title: "Email",
          contact: "contact@aurex-kpital.de",
          info: "info@aurex-kpital.de",
          support: "support@aurex-kpital.de"
        },
        buttons: {
          meeting: "Marcar reunião",
          request: "Pedido personalizado"
        }
      }
    },
    simulator: {
      title: "Simulador de Crédito",
      titleSecond: "Inteligente"
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
      },
      timeline: {
        title: "Τα Μεγάλα μας Ορόσημα",
        milestones: {
          "1997": {
            title: "Ίδρυση στο Αμβούργο",
            description: "Δημιουργία της Aurex K-pital με το όραμα να επαναστατήσει τις χρηματοοικονομικές υπηρεσίες στην Ευρώπη"
          },
          "2003": {
            title: "Ευρωπαϊκή επέκταση",
            description: "Άνοιγμα γραφείων σε 5 ευρωπαϊκές χώρες και λανσάρισμα των πρώτων ψηφιακών υπηρεσιών"
          },
          "2010": {
            title: "Καινοτομία ΤΝ",
            description: "Πρωτοποριακή ενσωμάτωση της τεχνητής νοημοσύνης στην ανάλυση πιστώσεων"
          },
          "2015": {
            title: "Πιστοποίηση Αριστείας",
            description: "Απόκτηση των πιο αυστηρών ευρωπαϊκών πιστοποιήσεων σε χρηματοοικονομικά θέματα"
          },
          "2020": {
            title: "Ψηφιακός μετασχηματισμός",
            description: "Λανσάρισμα της 100% ψηφιακής πλατφόρμας και προηγμένων προβλεπτικών αλγορίθμων"
          },
          "2024": {
            title: "Ηγέτης αγοράς",
            description: "Ευρωπαϊκή ηγετική θέση με περισσότερους από 50.000 ικανοποιημένους πελάτες"
          }
        }
      },
      values: {
        title: "Οι Αξίες μας",
        subtitle: "Οι αρχές που καθοδηγούν κάθε μας ενέργεια",
        excellence: {
          title: "Αριστεία Πελάτη",
          description: "Κάθε πελάτης είναι μοναδικός και αξίζει εξατομικευμένη προσοχή με λύσεις επί παραγγελία."
        },
        security: {
          title: "Απόλυτη Ασφάλεια",
          description: "Μέγιστη προστασία δεδομένων και επενδύσεων με τις πιο προηγμένες τεχνολογίες."
        },
        innovation: {
          title: "Συνεχής Καινοτομία",
          description: "Μόνιμη αναζήτηση νέων λύσεων για να προβλέψουμε τις ανάγκες του αύριο."
        },
        transparency: {
          title: "Πλήρης Διαφάνεια",
          description: "Σαφής και ειλικρινής επικοινωνία για όλα τα προϊόντα, τις υπηρεσίες και τις συνθήκες μας."
        }
      },
      team: {
        title: "Η Διοικητική μας Ομάδα",
        subtitle: "Αναγνωρισμένοι εμπειρογνώμονες στην υπηρεσία της επιτυχίας σας",
        experienceLabel: "χρόνια εμπειρίας"
      },
      certifications: {
        title: "Πιστοποιήσεις & Διαπιστεύσεις",
        subtitle: "Επίσημη αναγνώριση της λειτουργικής μας αριστείας",
        sinceLabel: "Από το"
      },
      contact: {
        title: "Συναντήστε μας",
        subtitle: "Τα γραφεία μας σας καλωσορίζουν στην καρδιά του Αμβούργου",
        address: {
          title: "Διεύθυνση",
          line1: "Irma-Keilhack-Ring 24",
          line2: "22145 Αμβούργο",
          line3: "Γερμανία"
        },
        phone: {
          title: "Τηλέφωνο",
          number: "+49 40 710 97523",
          hours1: "Δευ-Παρ: 8π.μ.-7μ.μ.",
          hours2: "Σάβ: 9π.μ.-5μ.μ."
        },
        email: {
          title: "Email",
          contact: "contact@aurex-kpital.de",
          info: "info@aurex-kpital.de",
          support: "support@aurex-kpital.de"
        },
        buttons: {
          meeting: "Κλείστε ραντεβού",
          request: "Εξατομικευμένο αίτημα"
        }
      }
    },
    simulator: {
      title: "Προσομοιωτής Πίστωσης",
      titleSecond: "Έξυπνος"
    }
  }
};

export default translations;