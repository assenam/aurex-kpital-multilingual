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
      contact: "Contact",
      faq: "FAQ",
      careers: "Carrières",
      partners: "Partenaires"
    },
    footer: {
      services: "Services",
      tools: "Outils", 
      company: "Entreprise",
      legal: "Légal",
      description: "Votre partenaire financier de confiance depuis 1997. Excellence, innovation et expertise pour tous vos projets financiers en Europe.",
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
            title: "27",
            subtitle: "Années d'excellence"
          },
          clients: {
            title: "15K+",
            subtitle: "Clients conquis"
          },
          funding: {
            title: "2.5Md€",
            subtitle: "Financements réalisés"
          }
        }
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
        title: "Prêt à concrétiser",
        titleHighlight: "votre projet",
        titleEnd: "?",
        description: "Nos experts vous accompagnent à chaque étape, de l'analyse à la réalisation.",
        buttons: {
          request: "Faire une demande",
          simulate: "Simuler un prêt", 
          contact: "Nous contacter"
        },
        contact: {
          phone: "Téléphone",
          address: "Adresse",
          addressValue: "Mönckebergstraße 11, 20095 Hamburg"
        }
      }
    },
    request: {
      form: {
        financingRequest: {
          title: "Demande de financement",
          subtitle: "Remplissez les informations suivantes pour obtenir une offre personnalisée",
          fields: {
            loanType: "Type de prêt",
            loanTypePlaceholder: "Sélectionnez un type",
            amount: "Montant du prêt (€)",
            amountPlaceholder: "Montant en euros",
            duration: "Durée du prêt (mois)",
            durationPlaceholder: "Ex: 60",
            hasGuarantee: "Garantie disponible",
            guaranteePlaceholder: "Ex : bien immobilier, véhicule",
            purpose: "Motif du prêt",
            purposePlaceholder: "Indiquez le but de votre demande"
          },
          loanOptions: {
            personal: "Prêt personnel",
            auto: "Prêt automobile",
            real_estate: "Prêt immobilier",
            professional: "Prêt professionnel",
            student: "Prêt étudiant",
            debt_consolidation: "Rachat de crédit"
          },
          guaranteeOptions: {
            yes: "Oui",
            no: "Non",
            maybe: "À déterminer"
          }
        }
      }
    }
  },
  de: {
    menu: {
      home: "Startseite",
      services: "Dienstleistungen",
      simulator: "Simulator", 
      request: "Antrag",
      contact: "Kontakt",
      faq: "FAQ",
      careers: "Karriere",
      partners: "Partner"
    },
    footer: {
      services: "Dienstleistungen",
      tools: "Tools",
      company: "Unternehmen", 
      legal: "Rechtliches",
      description: "Ihr vertrauensvoller Finanzpartner seit 1997. Exzellenz, Innovation und Expertise für alle Ihre Finanzprojekte in Europa.",
      copyright: "© 2024 Aurex K-pital. Alle Rechte vorbehalten.",
      establishment: "Zugelassenes Finanzinstitut in Europa",
      links: {
        personalLoans: "Privatkredite",
        proFinancing: "Unternehmensfinanzierung",
        investments: "Investitionen", 
        insurance: "Versicherungen",
        simulator: "Kreditrechner",
        request: "Finanzierungsantrag",
        faq: "FAQ",
        contact: "Kontakt", 
        about: "Über uns",
        partners: "Unsere Partner",
        careers: "Karriere",
        blog: "Blog",
        legal: "Impressum",
        privacy: "Datenschutz",
        terms: "AGB",
        gdpr: "DSGVO"
      }
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
            title: "27",
            subtitle: "Jahre Exzellenz"
          },
          clients: {
            title: "15K+", 
            subtitle: "Zufriedene Kunden"
          },
          funding: {
            title: "2.5Md€",
            subtitle: "Finanzierungen"
          }
        }
      },
      about: {
        badge: "Über uns",
        title: "Ihr vertrauensvoller",
        subtitle: "Finanzpartner",
        subtitle2: "",
        description1: {
          highlight: "Seit 1997",
          text: " begleitet Aurex K-pital Privatpersonen und Unternehmen bei ihren Finanzprojekten mit einem Ansatz, der",
          expertise: "menschliche Expertise",
          and: "und",
          technology: "technologische Innovation"
        },
        description2: {
          text: "Unsere Mission: Demokratisierung des Zugangs zu Finanzierungen durch",
          highlight: "schnelle, transparente und maßgeschneiderte Lösungen",
          success: "um Ihre Ambitionen zu verwirklichen"
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
        title: "Bereit, Ihr Projekt",
        titleHighlight: "zu verwirklichen",
        titleEnd: "?",
        description: "Unsere Experten begleiten Sie bei jedem Schritt, von der Analyse bis zur Umsetzung.",
        buttons: {
          request: "Antrag stellen",
          simulate: "Kredit simulieren",
          contact: "Kontakt aufnehmen"
        },
        contact: {
          phone: "Telefon",
          address: "Adresse",
          addressValue: "Mönckebergstraße 11, 20095 Hamburg"
        }
      }
    },
    request: {
      form: {
        financingRequest: {
          title: "Finanzierungsantrag",
          subtitle: "Füllen Sie die folgenden Informationen aus, um ein personalisiertes Angebot zu erhalten",
          fields: {
            loanType: "Art des Darlehens",
            loanTypePlaceholder: "Wählen Sie einen Typ",
            amount: "Darlehensbetrag (€)",
            amountPlaceholder: "Betrag in Euro",
            duration: "Laufzeit des Darlehens (Monate)",
            durationPlaceholder: "z.B.: 60", 
            hasGuarantee: "Sicherheit verfügbar",
            guaranteePlaceholder: "z.B.: Immobilie, Fahrzeug",
            purpose: "Zweck des Darlehens",
            purposePlaceholder: "Geben Sie den Zweck Ihres Antrags an"
          },
          loanOptions: {
            personal: "Privatkredit",
            auto: "Autokredit",
            real_estate: "Immobilienkredit",
            professional: "Geschäftskredit",
            student: "Studentenkredit",
            debt_consolidation: "Umschuldung"
          },
          guaranteeOptions: {
            yes: "Ja",
            no: "Nein",
            maybe: "Zu bestimmen"
          }
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
      contact: "Kontakt",
      faq: "FAQ",
      careers: "Kariera", 
      partners: "Partnerzy"
    },
    footer: {
      services: "Usługi",
      tools: "Narzędzia",
      company: "Firma",
      legal: "Prawne",
      description: "Twój zaufany partner finansowy od 1997 roku. Doskonałość, innowacje i ekspertyza dla wszystkich Twoich projektów finansowych w Europie.",
      copyright: "© 2024 Aurex K-pital. Wszelkie prawa zastrzeżone.",
      establishment: "Licencjonowana instytucja finansowa w Europie",
      links: {
        personalLoans: "Kredyty osobiste",
        proFinancing: "Finansowanie biznesowe",
        investments: "Inwestycje",
        insurance: "Ubezpieczenia",
        simulator: "Kalkulator kredytowy",
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
    home: {
      hero: {
        title: "Twój Partner Finansowy",
        subtitle: "od 1997 roku",
        description: "Doskonałość, innowacje i zaufanie dla wszystkich Twoich projektów finansowych",
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
            title: "27",
            subtitle: "Lat doskonałości"
          },
          clients: {
            title: "15K+",
            subtitle: "Zadowolonych klientów"
          },
          funding: {
            title: "2.5Mld€",
            subtitle: "Zrealizowanych finansowań"
          }
        }
      },
      about: {
        badge: "O nas",
        title: "Twój zaufany",
        subtitle: "partner finansowy",
        subtitle2: "",
        description1: {
          highlight: "Od 1997 roku",
          text: " Aurex K-pital wspiera osoby prywatne i firmy w ich projektach finansowych, łącząc",
          expertise: "ludzką ekspertyzę",  
          and: "z",
          technology: "innowacją technologiczną"
        },
        description2: {
          text: "Nasza misja: demokratyzacja dostępu do finansowania dzięki rozwiązaniom",
          highlight: "szybkim, przejrzystym i na miarę",
          success: "aby zrealizować Twoje ambicje"
        },
        stats: {
          founded: "Rok założenia",
          location: "Siedziba główna",
          certified: "Rejestr",
          security: "Numer Safe"
        },
        trust: {
          title: "Twoje zaufanie, nasz priorytet",
          description: "Certyfikowani i regulowani przez europejskie władze"
        },
        buttons: {
          history: "Nasza historia",
          contact: "Skontaktuj się z nami"
        }
      },
      cta: {
        title: "Gotowy zrealizować",
        titleHighlight: "swój projekt",
        titleEnd: "?",
        description: "Nasi eksperci towarzyszą Ci na każdym kroku, od analizy do realizacji.",
        buttons: {
          request: "Złóż wniosek",
          simulate: "Symuluj kredyt",
          contact: "Skontaktuj się z nami"
        },
        contact: {
          phone: "Telefon",
          address: "Adres",
          addressValue: "Mönckebergstraße 11, 20095 Hamburg"
        }
      }
    },
    request: {
      form: {
        financingRequest: {
          title: "Wniosek o finansowanie",
          subtitle: "Wypełnij poniższe informacje, aby otrzymać spersonalizowaną ofertę",
          fields: {
            loanType: "Rodzaj kredytu",
            loanTypePlaceholder: "Wybierz typ",
            amount: "Kwota kredytu (€)",
            amountPlaceholder: "Kwota w euro",
            duration: "Okres kredytowania (miesiące)",
            durationPlaceholder: "np.: 60",
            hasGuarantee: "Dostępne zabezpieczenie",
            guaranteePlaceholder: "np.: nieruchomość, pojazd",
            purpose: "Cel kredytu",
            purposePlaceholder: "Wskaż cel swojego wniosku"
          },
          loanOptions: {
            personal: "Kredyt osobisty",
            auto: "Kredyt samochodowy",
            real_estate: "Kredyt hipoteczny",
            professional: "Kredyt biznesowy",
            student: "Kredyt studencki",
            debt_consolidation: "Konsolidacja długów"
          },
          guaranteeOptions: {
            yes: "Tak",
            no: "Nie",
            maybe: "Do ustalenia"
          }
        }
      }
    }
  },
  fi: {
    menu: {
      home: "Etusivu",
      services: "Palvelut",
      simulator: "Simulaattori",
      request: "Hakemus",
      contact: "Yhteystiedot",
      faq: "UKK",
      careers: "Ura",
      partners: "Kumppanit"
    },
    footer: {
      services: "Palvelut",
      tools: "Työkalut",
      company: "Yritys",
      legal: "Lakiasiat",
      description: "Luotettava rahoituskumppanisi vuodesta 1997. Erinomaisuutta, innovaatioita ja asiantuntemusta kaikille rahoitusprojekteillesi Euroopassa.",
      copyright: "© 2024 Aurex K-pital. Kaikki oikeudet pidätetään.",
      establishment: "Lisensoitu rahoituslaitos Euroopassa",
      links: {
        personalLoans: "Henkilökohtaiset lainat",
        proFinancing: "Yritysrahoitus",
        investments: "Sijoitukset",
        insurance: "Vakuutukset",
        simulator: "Lainakalkuaattori",
        request: "Rahoitushakemus",
        faq: "UKK",
        contact: "Yhteystiedot",
        about: "Meistä",
        partners: "Kumppanimme",
        careers: "Ura",
        blog: "Blogi",
        legal: "Juridiset tiedot",
        privacy: "Tietosuojakäytäntö",
        terms: "Käyttöehdot",
        gdpr: "GDPR"
      }
    },
    home: {
      hero: {
        title: "Rahoituskumppanisi",
        subtitle: "vuodesta 1997",
        description: "Erinomaisuutta, innovaatioita ja luottamusta kaikille rahoitusprojekteillesi",
        ctaBtn: "Tutustu ratkaisuihimme",
        simulateBtn: "Simuloi laina",
        scrollText: "Tutustu",
        carousel: {
          text1: "Aloita projektisi Aurex K-pitalin kanssa",
          text2: "Hanki rahoitus ilman omarahoitusta",
          text3: "Sijoita tänään tulevaisuuteesi"
        },
        stats: {
          experience: {
            title: "27",
            subtitle: "Vuotta erinomaisuutta"
          },
          clients: {
            title: "15K+",
            subtitle: "Tyytyväistä asiakasta"
          },
          funding: {
            title: "2.5Mrd€",
            subtitle: "Toteutettuja rahoituksia"
          }
        }
      },
      about: {
        badge: "Meistä",
        title: "Luotettava",
        subtitle: "rahoituskumppanisi",
        subtitle2: "",
        description1: {
          highlight: "Vuodesta 1997",
          text: " Aurex K-pital on tukenut yksityishenkilöitä ja yrityksiä heidän rahoitusprojekteissaan yhdistäen",
          expertise: "inhimillisen asiantuntemuksen",
          and: "ja",
          technology: "teknologisen innovaation"
        },
        description2: {
          text: "Tehtävämme: demokratisoida rahoituksen saatavuus",
          highlight: "nopeilla, läpinäkyvillä ja räätälöidyillä ratkaisuilla",
          success: "toteuttaaksesi kunnianhimosi"
        },
        stats: {
          founded: "Perustamisvuosi",
          location: "Pääkonttori",
          certified: "Rekisteri",
          security: "Safe-numero"
        },
        trust: {
          title: "Luottamuksesi, meidän prioriteettimme",
          description: "Sertifioitu ja säännelty eurooppalaisten viranomaisten toimesta"
        },
        buttons: {
          history: "Historiamme",
          contact: "Ota yhteyttä"
        }
      },
      cta: {
        title: "Valmis toteuttamaan",
        titleHighlight: "projektisi",
        titleEnd: "?",
        description: "Asiantuntijamme auttavat sinua jokaisessa vaiheessa, analyysistä toteutukseen.",
        buttons: {
          request: "Tee hakemus",
          simulate: "Simuloi laina",
          contact: "Ota yhteyttä"
        },
        contact: {
          phone: "Puhelin",
          address: "Osoite",
          addressValue: "Mönckebergstraße 11, 20095 Hamburg"
        }
      }
    },
    request: {
      form: {
        financingRequest: {
          title: "Rahoitushakemus",
          subtitle: "Täytä seuraavat tiedot saadaksesi henkilökohtaisen tarjouksen",
          fields: {
            loanType: "Lainatyyppi",
            loanTypePlaceholder: "Valitse tyyppi",
            amount: "Lainan määrä (€)",
            amountPlaceholder: "Summa euroina",
            duration: "Laina-aika (kuukautta)",
            durationPlaceholder: "esim.: 60",
            hasGuarantee: "Vakuus saatavilla",
            guaranteePlaceholder: "esim.: kiinteistö, ajoneuvo",
            purpose: "Lainan tarkoitus",
            purposePlaceholder: "Ilmoita hakemuksesi tarkoitus"
          },
          loanOptions: {
            personal: "Henkilökohtainen laina",
            auto: "Autolaina",
            real_estate: "Asuntolaina",
            professional: "Yrityslaina",
            student: "Opintolaina",
            debt_consolidation: "Velkojen yhdistäminen"
          },
          guaranteeOptions: {
            yes: "Kyllä",
            no: "Ei",
            maybe: "Määriteltävä"
          }
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
      contact: "Contacto",
      faq: "FAQ",
      careers: "Carreras",
      partners: "Socios"
    },
    footer: {
      services: "Servicios",
      tools: "Herramientas",
      company: "Empresa",
      legal: "Legal",
      description: "Su socio financiero de confianza desde 1997. Excelencia, innovación y experiencia para todos sus proyectos financieros en Europa.",
      copyright: "© 2024 Aurex K-pital. Todos los derechos reservados.",
      establishment: "Institución financiera licenciada en Europa",
      links: {
        personalLoans: "Préstamos personales",
        proFinancing: "Financiación empresarial",
        investments: "Inversiones",
        insurance: "Seguros",
        simulator: "Calculadora de préstamos",
        request: "Solicitud de financiación",
        faq: "FAQ",
        contact: "Contacto",
        about: "Acerca de",
        partners: "Nuestros socios",
        careers: "Carreras",
        blog: "Blog",
        legal: "Información legal",
        privacy: "Política de privacidad",
        terms: "Términos y condiciones",
        gdpr: "RGPD"
      }
    },
    home: {
      hero: {
        title: "Su Socio Financiero",
        subtitle: "desde 1997",
        description: "Excelencia, innovación y confianza para todos sus proyectos financieros",
        ctaBtn: "Descubra nuestras soluciones",
        simulateBtn: "Simular préstamo",
        scrollText: "Descubrir",
        carousel: {
          text1: "Inicie su proyecto con Aurex K-pital",
          text2: "Obtenga financiación sin aporte inicial",
          text3: "Invierta hoy en su futuro"
        },
        stats: {
          experience: {
            title: "27",
            subtitle: "Años de excelencia"
          },
          clients: {
            title: "15K+",
            subtitle: "Clientes satisfechos"
          },
          funding: {
            title: "2.5Md€",
            subtitle: "Financiaciones realizadas"
          }
        }
      },
      about: {
        badge: "Acerca de",
        title: "Su socio financiero",
        subtitle: "de confianza",
        subtitle2: "",
        description1: {
          highlight: "Desde 1997,",
          text: " Aurex K-pital acompaña a particulares y empresas en sus proyectos financieros con un enfoque que combina",
          expertise: "experiencia humana",
          and: "e",
          technology: "innovación tecnológica"
        },
        description2: {
          text: "Nuestra misión: democratizar el acceso a la financiación a través de soluciones",
          highlight: "rápidas, transparentes y a medida",
          success: "para materializar sus ambiciones"
        },
        stats: {
          founded: "Año de fundación",
          location: "Sede principal",
          certified: "Registro",
          security: "Número Safe"
        },
        trust: {
          title: "Su confianza, nuestra prioridad",
          description: "Certificados y regulados por las autoridades europeas"
        },
        buttons: {
          history: "Nuestra historia",
          contact: "Contáctenos"
        }
      },
      cta: {
        title: "¿Listo para materializar",
        titleHighlight: "su proyecto",
        titleEnd: "?",
        description: "Nuestros expertos lo acompañan en cada paso, desde el análisis hasta la realización.",
        buttons: {
          request: "Hacer solicitud",
          simulate: "Simular préstamo",
          contact: "Contáctenos"
        },
        contact: {
          phone: "Teléfono",
          address: "Dirección",
          addressValue: "Mönckebergstraße 11, 20095 Hamburg"
        }
      }
    },
    request: {
      form: {
        financingRequest: {
          title: "Solicitud de financiación",
          subtitle: "Complete la siguiente información para obtener una oferta personalizada",
          fields: {
            loanType: "Tipo de préstamo",
            loanTypePlaceholder: "Seleccione un tipo",
            amount: "Importe del préstamo (€)",
            amountPlaceholder: "Importe en euros",
            duration: "Duración del préstamo (meses)",
            durationPlaceholder: "ej.: 60",
            hasGuarantee: "Garantía disponible",
            guaranteePlaceholder: "ej.: inmueble, vehículo",
            purpose: "Motivo del préstamo",
            purposePlaceholder: "Indique el propósito de su solicitud"
          },
          loanOptions: {
            personal: "Préstamo personal",
            auto: "Préstamo de automóvil",
            real_estate: "Préstamo hipotecario",
            professional: "Préstamo profesional",
            student: "Préstamo estudiantil",
            debt_consolidation: "Reunificación de deudas"
          },
          guaranteeOptions: {
            yes: "Sí",
            no: "No",
            maybe: "Por determinar"
          }
        }
      }
    }
  },
  pt: {
    menu: {
      home: "Início",
      services: "Serviços",
      simulator: "Simulador",
      request: "Pedido",
      contact: "Contacto",
      faq: "FAQ",
      careers: "Carreiras",
      partners: "Parceiros"
    },
    footer: {
      services: "Serviços",
      tools: "Ferramentas",
      company: "Empresa",
      legal: "Legal",
      description: "Seu parceiro financeiro de confiança desde 1997. Excelência, inovação e expertise para todos os seus projetos financeiros na Europa.",
      copyright: "© 2024 Aurex K-pital. Todos os direitos reservados.",
      establishment: "Instituição financeira licenciada na Europa",
      links: {
        personalLoans: "Empréstimos pessoais",
        proFinancing: "Financiamento empresarial",
        investments: "Investimentos",
        insurance: "Seguros",
        simulator: "Calculadora de empréstimos",
        request: "Pedido de financiamento",
        faq: "FAQ",
        contact: "Contacto",
        about: "Sobre nós",
        partners: "Nossos parceiros",
        careers: "Carreiras",
        blog: "Blog",
        legal: "Informação legal",
        privacy: "Política de privacidade",
        terms: "Termos e condições",
        gdpr: "RGPD"
      }
    },
    home: {
      hero: {
        title: "Seu Parceiro Financeiro",
        subtitle: "desde 1997",
        description: "Excelência, inovação e confiança para todos os seus projetos financeiros",
        ctaBtn: "Descubra nossas soluções",
        simulateBtn: "Simular empréstimo",
        scrollText: "Descobrir",
        carousel: {
          text1: "Inicie seu projeto com Aurex K-pital",
          text2: "Obtenha financiamento sem entrada",
          text3: "Invista hoje no seu futuro"
        },
        stats: {
          experience: {
            title: "27",
            subtitle: "Anos de excelência"
          },
          clients: {
            title: "15K+",
            subtitle: "Clientes satisfeitos"
          },
          funding: {
            title: "2.5Md€",
            subtitle: "Financiamentos realizados"
          }
        }
      },
      about: {
        badge: "Sobre nós",
        title: "Seu parceiro financeiro",
        subtitle: "de confiança",
        subtitle2: "",
        description1: {
          highlight: "Desde 1997,",
          text: " Aurex K-pital acompanha particulares e empresas nos seus projetos financeiros com uma abordagem que combina",
          expertise: "expertise humana",
          and: "e",
          technology: "inovação tecnológica"
        },
        description2: {
          text: "Nossa missão: democratizar o acesso ao financiamento através de soluções",
          highlight: "rápidas, transparentes e sob medida",
          success: "para concretizar suas ambições"
        },
        stats: {
          founded: "Ano de fundação",
          location: "Sede principal",
          certified: "Registro",
          security: "Número Safe"
        },
        trust: {
          title: "Sua confiança, nossa prioridade",
          description: "Certificados e regulamentados pelas autoridades europeias"
        },
        buttons: {
          history: "Nossa história",
          contact: "Entre em contacto"
        }
      },
      cta: {
        title: "Pronto para concretizar",
        titleHighlight: "seu projeto",
        titleEnd: "?",
        description: "Nossos especialistas o acompanham em cada etapa, da análise à realização.",
        buttons: {
          request: "Fazer pedido",
          simulate: "Simular empréstimo",
          contact: "Entre em contacto"
        },
        contact: {
          phone: "Telefone",
          address: "Endereço",
          addressValue: "Mönckebergstraße 11, 20095 Hamburg"
        }
      }
    },
    request: {
      form: {
        financingRequest: {
          title: "Pedido de financiamento",
          subtitle: "Preencha as seguintes informações para obter uma oferta personalizada",
          fields: {
            loanType: "Tipo de empréstimo",
            loanTypePlaceholder: "Selecione um tipo",
            amount: "Montante do empréstimo (€)",
            amountPlaceholder: "Montante em euros",
            duration: "Duração do empréstimo (meses)",
            durationPlaceholder: "ex.: 60",
            hasGuarantee: "Garantia disponível",
            guaranteePlaceholder: "ex.: imóvel, veículo",
            purpose: "Motivo do empréstimo",
            purposePlaceholder: "Indique o objetivo do seu pedido"
          },
          loanOptions: {
            personal: "Empréstimo pessoal",
            auto: "Empréstimo automóvel",
            real_estate: "Empréstimo imobiliário",
            professional: "Empréstimo profissional",
            student: "Empréstimo estudantil",
            debt_consolidation: "Consolidação de dívidas"
          },
          guaranteeOptions: {
            yes: "Sim",
            no: "Não",
            maybe: "A determinar"
          }
        }
      }
    }
  },
  el: {
    menu: {
      home: "Αρχική",
      services: "Υπηρεσίες",
      simulator: "Προσομοιωτής",
      request: "Αίτηση",
      contact: "Επικοινωνία",
      faq: "FAQ",
      careers: "Καριέρα",
      partners: "Συνεργάτες"
    },
    footer: {
      services: "Υπηρεσίες",
      tools: "Εργαλεία",
      company: "Εταιρεία",
      legal: "Νομικά",
      description: "Ο αξιόπιστος χρηματοοικονομικός σας εταίρος από το 1997. Αριστεία, καινοτομία και εμπειρογνωσία για όλα τα χρηματοοικονομικά σας έργα στην Ευρώπη.",
      copyright: "© 2024 Aurex K-pital. Όλα τα δικαιώματα διατηρούνται.",
      establishment: "Αδειοδοτημένο χρηματοπιστωτικό ίδρυμα στην Ευρώπη",
      links: {
        personalLoans: "Προσωπικά δάνεια",
        proFinancing: "Επιχειρηματική χρηματοδότηση",
        investments: "Επενδύσεις",
        insurance: "Ασφάλειες",
        simulator: "Υπολογιστής δανείου",
        request: "Αίτηση χρηματοδότησης",
        faq: "FAQ",
        contact: "Επικοινωνία",
        about: "Σχετικά με εμάς",
        partners: "Οι συνεργάτες μας",
        careers: "Καριέρα",
        blog: "Blog",
        legal: "Νομικές πληροφορίες",
        privacy: "Πολιτική απορρήτου",
        terms: "Όροι και προϋποθέσεις",
        gdpr: "GDPR"
      }
    },
    home: {
      hero: {
        title: "Ο Χρηματοοικονομικός σας Εταίρος",
        subtitle: "από το 1997",
        description: "Αριστεία, καινοτομία και εμπιστοσύνη για όλα τα χρηματοοικονομικά σας έργα",
        ctaBtn: "Ανακαλύψτε τις λύσεις μας",
        simulateBtn: "Προσομοίωση δανείου",
        scrollText: "Ανακαλύψτε",
        carousel: {
          text1: "Ξεκινήστε το έργο σας με την Aurex K-pital",
          text2: "Αποκτήστε χρηματοδότηση χωρίς ίδια συμμετοχή",
          text3: "Επενδύστε σήμερα στο μέλλον σας"
        },
        stats: {
          experience: {
            title: "27",
            subtitle: "Χρόνια αριστείας"
          },
          clients: {
            title: "15K+",
            subtitle: "Ικανοποιημένοι πελάτες"
          },
          funding: {
            title: "2.5Δισ€",
            subtitle: "Πραγματοποιημένες χρηματοδοτήσεις"
          }
        }
      },
      about: {
        badge: "Σχετικά με εμάς",
        title: "Ο αξιόπιστος χρηματοοικονομικός",
        subtitle: "σας εταίρος",
        subtitle2: "",
        description1: {
          highlight: "Από το 1997,",
          text: " η Aurex K-pital συνοδεύει ιδιώτες και επιχειρήσεις στα χρηματοοικονομικά τους έργα με προσέγγιση που συνδυάζει",
          expertise: "ανθρώπινη εμπειρογνωσία",
          and: "και",
          technology: "τεχνολογική καινοτομία"
        },
        description2: {
          text: "Η αποστολή μας: εκδημοκρατισμός της πρόσβασης στη χρηματοδότηση μέσω λύσεων",
          highlight: "γρήγορων, διαφανών και εξατομικευμένων",
          success: "για να υλοποιήσετε τις φιλοδοξίες σας"
        },
        stats: {
          founded: "Έτος ίδρυσης",
          location: "Κεντρικά γραφεία",
          certified: "Μητρώο",
          security: "Αριθμός Safe"
        },
        trust: {
          title: "Η εμπιστοσύνη σας, η προτεραιότητά μας",
          description: "Πιστοποιημένοι και ρυθμιζόμενοι από ευρωπαϊκές αρχές"
        },
        buttons: {
          history: "Η ιστορία μας",
          contact: "Επικοινωνήστε μαζί μας"
        }
      },
      cta: {
        title: "Έτοιμοι να υλοποιήσετε",
        titleHighlight: "το έργο σας",
        titleEnd: "?",
        description: "Οι ειδικοί μας σας συνοδεύουν σε κάθε βήμα, από την ανάλυση έως την υλοποίηση.",
        buttons: {
          request: "Υποβολή αίτησης",
          simulate: "Προσομοιώστε δάνειο",
          contact: "Επικοινωνήστε μαζί μας"
        },
        contact: {
          phone: "Τηλέφωνο",
          address: "Διεύθυνση",
          addressValue: "Mönckebergstraße 11, 20095 Hamburg"
        }
      }
    },
    request: {
      form: {
        financingRequest: {
          title: "Αίτηση χρηματοδότησης",
          subtitle: "Συμπληρώστε τις παρακάτω πληροφορίες για να λάβετε μια εξατομικευμένη προσφορά",
          fields: {
            loanType: "Τύπος δανείου",
            loanTypePlaceholder: "Επιλέξτε έναν τύπο",
            amount: "Ποσό δανείου (€)",
            amountPlaceholder: "Ποσό σε ευρώ",
            duration: "Διάρκεια δανείου (μήνες)",
            durationPlaceholder: "π.χ.: 60",
            hasGuarantee: "Διαθέσιμη εγγύηση",
            guaranteePlaceholder: "π.χ.: ακίνητο, όχημα",
            purpose: "Λόγος δανείου",
            purposePlaceholder: "Καθορίστε τον σκοπό της αίτησής σας"
          },
          loanOptions: {
            personal: "Προσωπικό δάνειο",
            auto: "Δάνειο αυτοκινήτου",
            real_estate: "Στεγαστικό δάνειο",
            professional: "Επαγγελματικό δάνειο",
            student: "Φοιτητικό δάνειο",
            debt_consolidation: "Ενοποίηση χρεών"
          },
          guaranteeOptions: {
            yes: "Ναι",
            no: "Όχι",
            maybe: "Προς καθορισμό"
          }
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
      contact: "Contatto",
      faq: "FAQ",
      careers: "Carriere",
      partners: "Partner"
    },
    footer: {
      services: "Servizi",
      tools: "Strumenti",
      company: "Azienda",
      legal: "Legale",
      description: "Il vostro partner finanziario di fiducia dal 1997. Eccellenza, innovazione ed esperienza per tutti i vostri progetti finanziari in Europa.",
      copyright: "© 2024 Aurex K-pital. Tutti i diritti riservati.",
      establishment: "Istituzione finanziaria autorizzata in Europa",
      links: {
        personalLoans: "Prestiti personali",
        proFinancing: "Finanziamenti aziendali",
        investments: "Investimenti",
        insurance: "Assicurazioni",
        simulator: "Calcolatore prestiti",
        request: "Richiesta di finanziamento",
        faq: "FAQ",
        contact: "Contatto",
        about: "Chi siamo",
        partners: "I nostri partner",
        careers: "Carriere",
        blog: "Blog",
        legal: "Informazioni legali",
        privacy: "Informativa sulla privacy",
        terms: "Termini e condizioni",
        gdpr: "GDPR"
      }
    },
    home: {
      hero: {
        title: "Il Vostro Partner Finanziario",
        subtitle: "dal 1997",
        description: "Eccellenza, innovazione e fiducia per tutti i vostri progetti finanziari",
        ctaBtn: "Scoprite le nostre soluzioni",
        simulateBtn: "Simula prestito",
        scrollText: "Scopri",
        carousel: {
          text1: "Iniziate il vostro progetto con Aurex K-pital",
          text2: "Ottenete finanziamenti senza anticipo",
          text3: "Investite oggi nel vostro futuro"
        },
        stats: {
          experience: {
            title: "27",
            subtitle: "Anni di eccellenza"
          },
          clients: {
            title: "15K+",
            subtitle: "Clienti soddisfatti"
          },
          funding: {
            title: "2.5Mld€",
            subtitle: "Finanziamenti realizzati"
          }
        }
      },
      about: {
        badge: "Chi siamo",
        title: "Il vostro partner finanziario",
        subtitle: "di fiducia",
        subtitle2: "",
        description1: {
          highlight: "Dal 1997,",
          text: " Aurex K-pital accompagna privati e aziende nei loro progetti finanziari con un approccio che combina",
          expertise: "competenza umana",
          and: "e",
          technology: "innovazione tecnologica"
        },
        description2: {
          text: "La nostra missione: democratizzare l'accesso ai finanziamenti attraverso soluzioni",
          highlight: "rapide, trasparenti e su misura",
          success: "per realizzare le vostre ambizioni"
        },
        stats: {
          founded: "Anno di fondazione",
          location: "Sede principale",
          certified: "Registro",
          security: "Numero Safe"
        },
        trust: {
          title: "La vostra fiducia, la nostra priorità",
          description: "Certificati e regolamentati dalle autorità europee"
        },
        buttons: {
          history: "La nostra storia",
          contact: "Contattateci"
        }
      },
      cta: {
        title: "Pronti a realizzare",
        titleHighlight: "il vostro progetto",
        titleEnd: "?",
        description: "I nostri esperti vi accompagnano in ogni fase, dall'analisi alla realizzazione.",
        buttons: {
          request: "Fare richiesta",
          simulate: "Simula prestito",
          contact: "Contattateci"
        },
        contact: {
          phone: "Telefono",
          address: "Indirizzo",
          addressValue: "Mönckebergstraße 11, 20095 Hamburg"
        }
      }
    },
    request: {
      form: {
        financingRequest: {
          title: "Richiesta di finanziamento",
          subtitle: "Compila le seguenti informazioni per ottenere un'offerta personalizzata",
          fields: {
            loanType: "Tipo di prestito",
            loanTypePlaceholder: "Seleziona un tipo",
            amount: "Importo del prestito (€)",
            amountPlaceholder: "Importo in euro",
            duration: "Durata del prestito (mesi)",
            durationPlaceholder: "es.: 60",
            hasGuarantee: "Garanzia disponibile",
            guaranteePlaceholder: "es.: immobile, veicolo",
            purpose: "Motivo del prestito",
            purposePlaceholder: "Indica lo scopo della tua richiesta"
          },
          loanOptions: {
            personal: "Prestito personale",
            auto: "Prestito auto",
            real_estate: "Mutuo immobiliare",
            professional: "Prestito professionale",
            student: "Prestito studenti",
            debt_consolidation: "Consolidamento debiti"
          },
          guaranteeOptions: {
            yes: "Sì",
            no: "No",
            maybe: "Da determinare"
          }
        }
      }
    }
  }
};

export default translations;