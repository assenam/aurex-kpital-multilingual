import React, { createContext, useContext, useState, ReactNode } from 'react';

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

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('preferredLanguage') as Language) || 'fr';
  });
  const [isLoading, setIsLoading] = useState(false);

  const changeLanguage = (newLanguage: Language) => {
    if (newLanguage === language) return;
    
    setIsLoading(true);
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = translations[language];
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return key;
      }
    }
    
    return typeof current === 'string' ? current : key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, changeLanguage, isLoading, t }}>
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
      rights: "© 2024 Aurex K-pital. Tous droits réservés."
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
      rights: "© 2024 Aurex K-pital. Alle Rechte vorbehalten."
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
      rights: "© 2024 Aurex K-pital. Todos los derechos reservados."
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
      rights: "© 2024 Aurex K-pital. Tutti i diritti riservati."
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
      rights: "© 2024 Aurex K-pital. Wszelkie prawa zastrzeżone."
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
      rights: "© 2024 Aurex K-pital. Kaikki oikeudet pidätetään."
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
      rights: "© 2024 Aurex K-pital. Todos os direitos reservados."
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
    }
  },
  el: {
    menu: {
      home: "Αρχική",
      services: "Υπηρεσίες",
      simulator: "Προσομοιωτής",
      request: "Αίτηση",
      about: "Σχετικά με εμάς",
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
      mentions: "Νομικές πληροφορίες",
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Όλα τα δικαιώματα διατηρούνται."
    },
    services: {
      personalLoan: {
        title: "Προσωπικά δάνεια",
        description: "Εξατομικευμένες χρηματοδοτικές λύσεις με επαναστατικούς όρους.",
        points: ["ΑΙ για βέλτιστα επιτόκια", "Απάντηση σε 2 ώρες", "Μέγιστη ευελιξία"],
        cta: "Ανακαλύψτε"
      },
      businessLoan: {
        title: "Επιχειρηματική χρηματοδότηση",
        description: "Ενισχύστε την επιχείρησή σας με τις καινοτόμες λύσεις μας.",
        points: ["Ταχεία χρηματοδότηση", "Εξειδικευμένη υποστήριξη", "Λύσεις σε μέτρο"],
        cta: "Ανακαλύψτε"
      },
      investment: {
        title: "Έξυπνες επενδύσεις",
        description: "Βελτιστοποίηση περιουσίας με τεχνητή νοημοσύνη και ανθρώπινη εμπειρία.",
        points: ["Έξυπνο χαρτοφυλάκιο", "Premium συμβουλές", "Βελτιστοποιημένη απόδοση"],
        cta: "Ανακαλύψτε"
      },
      insurance: {
        title: "Ασφάλειες 360°",
        description: "Πλήρης και καινοτόμος προστασία για όλα τα σχέδιά σας ζωής και επιχειρήσεων.",
        points: ["Πλήρης κάλυψη", "Διαχείριση απαιτήσεων 24ώρου", "Premium υποστήριξη"],
        cta: "Ανακαλύψτε"
      },
      explore: "Εξερευνήστε όλες τις υπηρεσίες μας"
    }
  }
};