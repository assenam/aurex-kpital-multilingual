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
        cta: "Découvrir"
      },
      businessLoan: {
        title: "Financement entreprise",
        description: "Boostez votre entreprise avec nos solutions innovantes.",
        points: ["Financement express", "Accompagnement expert", "Solutions sur-mesure"],
        cta: "Découvrir"
      },
      investment: {
        title: "Investissements intelligents",
        description: "Optimisation patrimoniale avec intelligence artificielle et expertise humaine.",
        points: ["Portefeuille intelligent", "Conseil premium", "Rendement optimisé"],
        cta: "Découvrir"
      },
      insurance: {
        title: "Assurances 360°",
        description: "Protection totale et innovante pour tous vos projets de vie et business.",
        points: ["Couverture complète", "Gestion sinistres 24h", "Support premium"],
        cta: "Découvrir"
      },
      explore: "Explorer tous nos services"
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
        cta: "Entdecken"
      },
      businessLoan: {
        title: "Unternehmensfinanzierung",
        description: "Bringen Sie Ihr Geschäft mit unseren innovativen Lösungen voran.",
        points: ["Express-Finanzierung", "Expertenbegleitung", "Maßgeschneiderte Lösungen"],
        cta: "Entdecken"
      },
      investment: {
        title: "Intelligente Investments",
        description: "Vermögensoptimierung mit KI und menschlicher Expertise.",
        points: ["Intelligentes Portfolio", "Premium-Beratung", "Optimierte Rendite"],
        cta: "Entdecken"
      },
      insurance: {
        title: "360° Versicherungen",
        description: "Umfassender Schutz für Ihre Lebens- und Geschäftsprojekte.",
        points: ["Vollständiger Schutz", "Schadenregulierung in 24h", "Premium-Support"],
        cta: "Entdecken"
      },
      explore: "Alle unsere Services entdecken"
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
        cta: "Descubrir"
      },
      businessLoan: {
        title: "Financiamiento para empresas",
        description: "Impulsa tu empresa con nuestras soluciones innovadoras.",
        points: ["Financiamiento exprés", "Acompañamiento experto", "Soluciones a medida"],
        cta: "Descubrir"
      },
      investment: {
        title: "Inversiones inteligentes",
        description: "Optimización patrimonial con inteligencia artificial y experiencia humana.",
        points: ["Cartera inteligente", "Asesoría premium", "Rendimiento optimizado"],
        cta: "Descubrir"
      },
      insurance: {
        title: "Seguros 360°",
        description: "Protección total e innovadora para todos tus proyectos de vida y negocio.",
        points: ["Cobertura completa", "Gestión de reclamos en 24h", "Atención premium"],
        cta: "Descubrir"
      },
      explore: "Explorar todos nuestros servicios"
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
        cta: "Scopri"
      },
      businessLoan: {
        title: "Finanziamenti aziendali",
        description: "Potenzia la tua azienda con le nostre soluzioni innovative.",
        points: ["Finanziamento express", "Accompagnamento esperto", "Soluzioni su misura"],
        cta: "Scopri"
      },
      investment: {
        title: "Investimenti intelligenti",
        description: "Ottimizzazione patrimoniale con intelligenza artificiale ed esperienza umana.",
        points: ["Portfolio intelligente", "Consulenza premium", "Rendimento ottimizzato"],
        cta: "Scopri"
      },
      insurance: {
        title: "Assicurazioni 360°",
        description: "Protezione totale e innovativa per tutti i tuoi progetti di vita e business.",
        points: ["Copertura completa", "Gestione sinistri 24h", "Supporto premium"],
        cta: "Scopri"
      },
      explore: "Esplora tutti i nostri servizi"
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
        cta: "Odkryj"
      },
      businessLoan: {
        title: "Finansowanie biznesu",
        description: "Rozwiń firmę dzięki naszym innowacyjnym rozwiązaniom.",
        points: ["Ekspresowe finansowanie", "Wsparcie ekspertów", "Rozwiązania szyte na miarę"],
        cta: "Odkryj"
      },
      investment: {
        title: "Inteligentne inwestycje",
        description: "Optymalizacja majątku z wykorzystaniem AI i wiedzy eksperckiej.",
        points: ["Inteligentne portfolio", "Konsultacje premium", "Zoptymalizowany zwrot"],
        cta: "Odkryj"
      },
      insurance: {
        title: "Ubezpieczenia 360°",
        description: "Pełna ochrona dla Twojego życia i biznesu.",
        points: ["Pełna ochrona", "Reklamacje w 24h", "Wsparcie premium"],
        cta: "Odkryj"
      },
      explore: "Poznaj wszystkie nasze usługi"
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
        cta: "Tutustu"
      },
      businessLoan: {
        title: "Yritysrahoitus",
        description: "Vie yrityksesi uudelle tasolle innovatiivisilla ratkaisuilla.",
        points: ["Pikainen rahoitus", "Asiantuntijatuki", "Räätälöidyt ratkaisut"],
        cta: "Tutustu"
      },
      investment: {
        title: "Älykkäät sijoitukset",
        description: "Varallisuuden optimointi tekoälyllä ja asiantuntijuudella.",
        points: ["Älykäs salkku", "Premium-neuvonta", "Optimoitu tuotto"],
        cta: "Tutustu"
      },
      insurance: {
        title: "360° vakuutukset",
        description: "Täydellinen suoja elämäsi ja liiketoimintasi projekteille.",
        points: ["Kattava suoja", "Korvaus 24h kuluessa", "Premium-tuki"],
        cta: "Tutustu"
      },
      explore: "Tutustu kaikkiin palveluihimme"
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
        cta: "Descobrir"
      },
      businessLoan: {
        title: "Financiamento empresarial",
        description: "Impulsione a sua empresa com as nossas soluções inovadoras.",
        points: ["Financiamento expresso", "Acompanhamento especializado", "Soluções à medida"],
        cta: "Descobrir"
      },
      investment: {
        title: "Investimentos inteligentes",
        description: "Otimização patrimonial com inteligência artificial e experiência humana.",
        points: ["Carteira inteligente", "Consultoria premium", "Rendimento otimizado"],
        cta: "Descobrir"
      },
      insurance: {
        title: "Seguros 360°",
        description: "Proteção total e inovadora para todos os seus projetos de vida e negócio.",
        points: ["Cobertura completa", "Gestão de sinistros 24h", "Suporte premium"],
        cta: "Descobrir"
      },
      explore: "Explorar todos os nossos serviços"
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
        cta: "Ανακάλυψε"
      },
      businessLoan: {
        title: "Επιχειρηματικά δάνεια",
        description: "Αναπτύξτε την επιχείρησή σας με τις καινοτόμες λύσεις μας.",
        points: ["Άμεση χρηματοδότηση", "Υποστήριξη από ειδικούς", "Εξατομικευμένες λύσεις"],
        cta: "Ανακάλυψε"
      },
      investment: {
        title: "Έξυπνες επενδύσεις",
        description: "Βελτιστοποίηση περιουσίας με τεχνητή νοημοσύνη και ανθρώπινη εμπειρία.",
        points: ["Έξυπνο χαρτοφυλάκιο", "Premium συμβουλευτική", "Βελτιστοποιημένες αποδόσεις"],
        cta: "Ανακάλυψε"
      },
      insurance: {
        title: "Ασφάλειες 360°",
        description: "Πλήρης και καινοτόμα κάλυψη για τη ζωή και τις επιχειρήσεις σας.",
        points: ["Πλήρης κάλυψη", "Αποζημίωση σε 24 ώρες", "Premium υποστήριξη"],
        cta: "Ανακάλυψε"
      },
      explore: "Εξερευνήστε όλες τις υπηρεσίες μας"
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
    }
  }
};