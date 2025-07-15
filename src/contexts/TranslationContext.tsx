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

  // Initialize cache once
  if (!cacheInitialized.current) {
    populateCache();
    cacheInitialized.current = true;
  }

  const changeLanguage = useCallback((newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  }, []);

  const t = useCallback((key: string): string => {
    const cacheKey = `${language}:${key}`;
    const cached = translationCache.get(cacheKey);
    if (cached) return cached;

    // Fallback to nested object access for uncached keys
    const keys = key.split('.');
    let current: any = translations[language];
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        // Fallback to French if key not found
        current = translations.fr;
        for (const fallbackKey of keys) {
          if (current && typeof current === 'object' && fallbackKey in current) {
            current = current[fallbackKey];
          } else {
            return key; // Return key if not found in fallback
          }
        }
        break;
      }
    }
    
    return typeof current === 'string' ? current : key;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    changeLanguage,
    isLoading,
    t
  }), [language, changeLanguage, isLoading, t]);

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

const translations: Record<Language, any> = {
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
      description: "Votre partenaire financier de confiance depuis 1997. Excellence, innovation et expérience pour tous vos projets financiers en Europe.",
      services: "Services",
      copyright: "© 2024 Aurex K-pital. Tous droits réservés.",
      establishment: "Établissement financier agréé en Europe",
      navigation: {
        home: "Accueil",
        services: "Services",
        simulator: "Simulateur",
        request: "Demande",
        contact: "Contact",
        partners: "Nos partenaires",
        careers: "Carrières",
        blog: "Blog",
        faq: "FAQ",
        legal: "Mentions légales",
        privacy: "Confidentialité"
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
        scrollText: "Découvrir"
      },
      cta: {
        title: "Prêt à transformer",
        titleHighlight: "vos projets",
        titleEnd: "en réalité ?",
        description: "Nos experts vous accompagnent à chaque étape pour concrétiser vos ambitions financières."
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
    blog: {
      badge: "Expertise & Analyse",
      title: "Blog Aurex",
      subtitle: "K-pital", 
      description: "Analyses d'experts, tendances du marché et conseils pratiques pour optimiser vos décisions financières et investissements.",
      stats: {
        articles: {
          value: "150+",
          label: "Articles publiés"
        },
        experts: {
          value: "8", 
          label: "Experts rédacteurs"
        },
        readers: {
          value: "50K+",
          label: "Lecteurs mensuels"
        },
        satisfaction: {
          value: "95%",
          label: "Satisfaction lecteurs"
        }
      },
      featured: {
        title: "Article vedette"
      },
      search: {
        placeholder: "Rechercher un article...",
        allCategories: "Toutes les catégories"
      },
      categories: {
        title: "Catégories",
        innovation: "Innovation",
        realEstate: "Immobilier",
        regulation: "Réglementation",
        economy: "Économie",
        esg: "ESG",
        education: "Éducation"
      },
      trending: {
        title: "Tendances"
      },
      newsletter: {
        title: "Newsletter",
        description: "Recevez nos derniers articles et analyses directement dans votre boîte mail",
        placeholder: "Votre email",
        subscribe: "S'abonner",
        disclaimer: "Maximum 1 email par semaine. Désabonnement facile."
      },
      actions: {
        readMore: "Lire l'article complet",
        read: "Lire",
        loadMore: "Charger plus d'articles",
        readTime: "de lecture"
      },
      content: {
        featuredArticle: {
          title: "L'intelligence artificielle révolutionne le secteur financier européen",
          excerpt: "Découvrez comment les nouvelles technologies transforment les services bancaires et d'investissement, offrant des solutions plus personnalisées et efficaces aux clients européens.",
          author: "Dr. Marie Dubois",
          role: "Directrice Innovation FinTech",
          date: "15 janvier 2024",
          category: "innovation"
        },
        articles: [
          {
            title: "Guide complet du crédit immobilier en 2024",
            excerpt: "Tout ce qu'il faut savoir sur les conditions actuelles du marché immobilier et les meilleures stratégies pour obtenir un financement optimal.",
            author: "Pierre Martin",
            date: "12 janvier 2024",
            category: "realEstate"
          }
        ]
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
      description: "Ihr vertrauensvoller Finanzpartner seit 1997. Exzellenz, Innovation und Erfahrung für all Ihre Finanzprojekte in Europa.",
      services: "Dienstleistungen",
      copyright: "© 2024 Aurex K-pital. Alle Rechte vorbehalten.",
      establishment: "Lizenziertes Finanzinstitut in Europa",
      navigation: {
        home: "Startseite",
        services: "Dienstleistungen",
        simulator: "Simulator",
        request: "Antrag",
        contact: "Kontakt",
        partners: "Unsere Partner",
        careers: "Karriere",
        blog: "Blog",
        faq: "FAQ",
        legal: "Impressum",
        privacy: "Datenschutz"
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
        scrollText: "Entdecken"
      },
      cta: {
        title: "Bereit, Ihre Projekte",
        titleHighlight: "in die Realität",
        titleEnd: "umzusetzen?",
        description: "Unsere Experten begleiten Sie bei jedem Schritt, um Ihre finanziellen Ambitionen zu verwirklichen."
      }
    },
    testimonials: {
      title: "Sie vertrauen uns",
      subtitle: "Was unsere zufriedenen Kunden sagen",
      clients: [
        {
          name: "Klaus Weber",
          location: "Berlin, Deutschland",
          feedback: "Schneller und seriöser Service. Mein Kredit wurde in 48h genehmigt! Danke Aurex K-pital."
        },
        {
          name: "Anna Schmidt",
          location: "München, Deutschland",
          feedback: "Professionelles Team, klare Plattform und wirklich persönliche Betreuung."
        },
        {
          name: "Michael Fischer",
          location: "Hamburg, Deutschland",
          feedback: "Der Simulator war sehr klar und ich erhielt bessere Konditionen als bei meiner Bank."
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
      careers: "Kariery", 
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
      description: "Twój zaufany partner finansowy od 1997 roku. Doskonałość, innowacje i doświadczenie dla wszystkich Twoich projektów finansowych w Europie.",
      services: "Usługi",
      copyright: "© 2024 Aurex K-pital. Wszelkie prawa zastrzeżone.",
      establishment: "Licencjonowana instytucja finansowa w Europie",
      navigation: {
        home: "Strona główna",
        services: "Usługi",
        simulator: "Symulator",
        request: "Wniosek",
        contact: "Kontakt",
        partners: "Nasi partnerzy",
        careers: "Kariery",
        blog: "Blog",
        faq: "FAQ",
        legal: "Informacje prawne",
        privacy: "Prywatność"
      }
    },
    partners: {
      title: "Nasi Zaufani Partnerzy",
      description: "Europejska sieć doskonałości oferująca najlepsze rozwiązania finansowe",
      stats: "Ponad 25 partnerów europejskich • 27 krajów objętych • 2,5 mln€ wolumenu transakcji"
    },
    home: {
      hero: {
        title: "Twój Partner Finansowy",
        subtitle: "od 1997 roku",
        description: "Doskonałość, innowacje i zaufanie dla wszystkich Twoich projektów finansowych",
        ctaBtn: "Odkryj nasze rozwiązania",
        simulateBtn: "Symuluj pożyczkę",
        scrollText: "Odkryj"
      },
      cta: {
        title: "Gotowy na przekształcenie",
        titleHighlight: "swoich projektów",
        titleEnd: "w rzeczywistość?",
        description: "Nasi eksperci towarzyszą Ci na każdym kroku, aby zrealizować Twoje ambicje finansowe."
      }
    },
    testimonials: {
      title: "Ufają nam",
      subtitle: "Co mówią nasi zadowoleni klienci",
      clients: [
        {
          name: "Piotr Kowalski",
          location: "Warszawa, Polska",
          feedback: "Szybka i poważna obsługa. Mój kredyt został zatwierdzony w 48h! Dziękuję Aurex K-pital."
        },
        {
          name: "Anna Nowak",
          location: "Kraków, Polska",
          feedback: "Profesjonalny zespół, przejrzysta platforma i naprawdę spersonalizowane wsparcie."
        },
        {
          name: "Tomasz Wiśniewski",
          location: "Gdańsk, Polska",
          feedback: "Symulator był bardzo przejrzysty i otrzymałem lepsze warunki niż w moim banku."
        }
      ]
    }
  },
  fi: { 
    menu: { 
      home: "Etusivu", 
      services: "Palvelut", 
      simulator: "Simulaattori", 
      request: "Hakemus", 
      about: "Meistä", 
      contact: "Yhteystiedot", 
      faq: "UKK", 
      careers: "Urat", 
      partners: "Kumppanit", 
      blog: "Blogi" 
    },
    footer: {
      tools: "Työkalut",
      company: "Yritys",
      legal: "Oikeudellinen",
      privacyPolicy: "Tietosuojakäytäntö",
      terms: "Käyttöehdot",
      mentions: "Oikeudelliset tiedot",
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Kaikki oikeudet pidätetään.",
      description: "Luotettava rahoituskumppanisi vuodesta 1997. Huippuosaamista, innovaatioita ja kokemusta kaikille rahoitusprojekteillesi Euroopassa.",
      services: "Palvelut",
      copyright: "© 2024 Aurex K-pital. Kaikki oikeudet pidätetään.",
      establishment: "Lisensoitu rahoituslaitos Euroopassa"
    },
    partners: {
      title: "Luotettavat Kumppanimme",
      description: "Eurooppalainen huippuosaamisen verkosto tarjoamassa parhaat rahoitusratkaisut",
      stats: "Yli 25 eurooppalaista kumppania • 27 katettu maata • 2,5 milj€ transaktiomäärä"
    },
    home: {
      hero: {
        title: "Rahoituskumppanisi",
        subtitle: "vuodesta 1997",
        description: "Huippuosaamista, innovaatioita ja luottamusta kaikille rahoitusprojekteillesi",
        ctaBtn: "Tutustu ratkaisuihimme",
        simulateBtn: "Simuloi lainaa",
        scrollText: "Tutustu"
      },
      cta: {
        title: "Valmis muuttamaan",
        titleHighlight: "projektisi",
        titleEnd: "todellisuudeksi?",
        description: "Asiantuntijamme tukevat sinua jokaisessa vaiheessa rahoitustavoitteidesi saavuttamiseksi."
      }
    },
    testimonials: {
      title: "He luottavat meihin",
      subtitle: "Mitä tyytyväiset asiakkaamme sanovat",
      clients: [
        {
          name: "Matti Virtanen",
          location: "Helsinki, Suomi",
          feedback: "Nopea ja vakava palvelu. Lainani hyväksyttiin 48 tunnissa! Kiitos Aurex K-pital."
        },
        {
          name: "Elina Koskinen",
          location: "Tampere, Suomi",
          feedback: "Ammattitaitoinen tiimi, selkeä alusta ja todella henkilökohtainen tuki."
        },
        {
          name: "Juha Mäkinen",
          location: "Turku, Suomi",
          feedback: "Simulaattori oli erittäin selkeä ja sain paremmat ehdot kuin pankistani."
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
      mentions: "Avisos legales",
      gdpr: "RGPD",
      rights: "© 2024 Aurex K-pital. Todos los derechos reservados.",
      description: "Su socio financiero de confianza desde 1997. Excelencia, innovación y experiencia para todos sus proyectos financieros en Europa.",
      services: "Servicios",
      copyright: "© 2024 Aurex K-pital. Todos los derechos reservados.",
      establishment: "Institución financiera autorizada en Europa"
    },
    partners: {
      title: "Nuestros Socios de Confianza",
      description: "Una red europea de excelencia para ofrecerle las mejores soluciones financieras",
      stats: "Más de 25 socios europeos • 27 países cubiertos • 2,5M€ de volumen tratado"
    },
    home: {
      hero: {
        title: "Su Socio Financiero", 
        subtitle: "desde 1997",
        description: "Excelencia, innovación y confianza para todos sus proyectos financieros",
        ctaBtn: "Descubrir nuestras soluciones",
        simulateBtn: "Simular un préstamo",
        scrollText: "Descubrir"
      },
      cta: {
        title: "¿Listo para transformar",
        titleHighlight: "sus proyectos",
        titleEnd: "en realidad?",
        description: "Nuestros expertos le acompañan en cada paso para materializar sus ambiciones financieras."
      }
    },
    testimonials: {
      title: "Confían en nosotros",
      subtitle: "Lo que dicen nuestros clientes satisfechos",
      clients: [
        {
          name: "Carlos García",
          location: "Madrid, España",
          feedback: "Servicio rápido y serio. ¡Mi crédito fue aprobado en 48h! Gracias Aurex K-pital."
        },
        {
          name: "María López",
          location: "Barcelona, España",
          feedback: "Equipo profesional, plataforma clara y un acompañamiento realmente personalizado."
        },
        {
          name: "Antonio Rodríguez",
          location: "Valencia, España",
          feedback: "El simulador era muy claro y obtuve mejores condiciones que en mi banco."
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
      about: "Sobre", 
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
      establishment: "Instituição financeira licenciada na Europa"
    },
    partners: {
      title: "Os Nossos Parceiros de Confiança",
      description: "Uma rede europeia de excelência para lhe oferecer as melhores soluções financeiras",
      stats: "Mais de 25 parceiros europeus • 27 países cobertos • 2,5M€ de volume tratado"
    },
    home: {
      hero: {
        title: "O Seu Parceiro Financeiro",
        subtitle: "desde 1997",
        description: "Excelência, inovação e confiança para todos os seus projetos financeiros",
        ctaBtn: "Descobrir as nossas soluções",
        simulateBtn: "Simular um empréstimo",
        scrollText: "Descobrir"
      },
      cta: {
        title: "Pronto para transformar",
        titleHighlight: "os seus projetos",
        titleEnd: "em realidade?",
        description: "Os nossos especialistas acompanham-no em cada passo para concretizar as suas ambições financeiras."
      }
    },
    testimonials: {
      title: "Confiam em nós",
      subtitle: "O que dizem os nossos clientes satisfeitos",
      clients: [
        {
          name: "João Silva",
          location: "Lisboa, Portugal",
          feedback: "Serviço rápido e sério. O meu crédito foi aprovado em 48h! Obrigado Aurex K-pital."
        },
        {
          name: "Ana Santos",
          location: "Porto, Portugal",
          feedback: "Equipa profissional, plataforma clara e um acompanhamento verdadeiramente personalizado."
        },
        {
          name: "Pedro Costa",
          location: "Braga, Portugal",
          feedback: "O simulador era muito claro e obtive melhores condições que no meu banco."
        }
      ]
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
      faq: "Συχνές ερωτήσεις", 
      careers: "Καριέρες", 
      partners: "Συνεργάτες", 
      blog: "Ιστολόγιο" 
    },
    footer: {
      tools: "Εργαλεία",
      company: "Εταιρεία",
      legal: "Νομικά",
      privacyPolicy: "Πολιτική απορρήτου",
      terms: "Όροι και προϋποθέσεις",
      mentions: "Νομικές ειδοποιήσεις",
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Όλα τα δικαιώματα διατηρούνται.",
      description: "Ο αξιόπιστος χρηματοοικονομικός σας εταίρος από το 1997. Αριστεία, καινοτομία και εμπειρία για όλα τα χρηματοοικονομικά σας έργα στην Ευρώπη.",
      services: "Υπηρεσίες",
      copyright: "© 2024 Aurex K-pital. Όλα τα δικαιώματα διατηρούνται.",
      establishment: "Αδειοδοτημένο χρηματοπιστωτικό ίδρυμα στην Ευρώπη"
    },
    partners: {
      title: "Οι Αξιόπιστοι Συνεργάτες μας",
      description: "Ένα ευρωπαϊκό δίκτυο αριστείας για να σας προσφέρουμε τις καλύτερες χρηματοοικονομικές λύσεις",
      stats: "Πάνω από 25 ευρωπαίους εταίρους • 27 καλυπτόμενες χώρες • 2,5Μ€ όγκος συναλλαγών"
    },
    home: {
      hero: {
        title: "Ο Χρηματοοικονομικός σας Εταίρος",
        subtitle: "από το 1997",
        description: "Αριστεία, καινοτομία και εμπιστοσύνη για όλα τα χρηματοοικονομικά σας έργα",
        ctaBtn: "Ανακαλύψτε τις λύσεις μας",
        simulateBtn: "Προσομοίωση δανείου",
        scrollText: "Ανακαλύψτε"
      },
      cta: {
        title: "Έτοιμοι να μετατρέψετε",
        titleHighlight: "τα έργα σας",
        titleEnd: "σε πραγματικότητα;",
        description: "Οι ειδικοί μας σας συνοδεύουν σε κάθε βήμα για να υλοποιήσετε τις χρηματοοικονομικές σας φιλοδοξίες."
      }
    },
    testimonials: {
      title: "Μας εμπιστεύονται",
      subtitle: "Τι λένε οι ικανοποιημένοι πελάτες μας",
      clients: [
        {
          name: "Γιάννης Παπαδόπουλος",
          location: "Αθήνα, Ελλάδα",
          feedback: "Γρήγορη και σοβαρή εξυπηρέτηση. Το δάνειό μου εγκρίθηκε σε 48 ώρες! Ευχαριστώ Aurex K-pital."
        },
        {
          name: "Μαρία Γεωργίου",
          location: "Θεσσαλονίκη, Ελλάδα",
          feedback: "Επαγγελματική ομάδα, σαφής πλατφόρμα και πραγματικά εξατομικευμένη υποστήριξη."
        },
        {
          name: "Δημήτρης Κωνσταντίνου",
          location: "Πάτρα, Ελλάδα",
          feedback: "Ο προσομοιωτής ήταν πολύ σαφής και πήρα καλύτερους όρους από την τράπεζά μου."
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
      establishment: "Istituzione finanziaria autorizzata in Europa"
    },
    partners: {
      title: "I Nostri Partner di Fiducia",
      description: "Una rete europea di eccellenza per offrirvi le migliori soluzioni finanziarie",
      stats: "Oltre 25 partner europei • 27 paesi coperti • 2,5M€ di volume trattato"
    },
    home: {
      hero: {
        title: "Il Vostro Partner Finanziario",
        subtitle: "dal 1997",
        description: "Eccellenza, innovazione e fiducia per tutti i vostri progetti finanziari",
        ctaBtn: "Scoprire le nostre soluzioni",
        simulateBtn: "Simulare un prestito",
        scrollText: "Scoprire"
      },
      cta: {
        title: "Pronti a trasformare",
        titleHighlight: "i vostri progetti",
        titleEnd: "in realtà?",
        description: "I nostri esperti vi accompagnano in ogni passo per concretizzare le vostre ambizioni finanziarie."
      }
    },
    testimonials: {
      title: "Si fidano di noi",
      subtitle: "Cosa dicono i nostri clienti soddisfatti",
      clients: [
        {
          name: "Marco Rossi",
          location: "Roma, Italia",
          feedback: "Servizio rapido e serio. Il mio credito è stato approvato in 48h! Grazie Aurex K-pital."
        },
        {
          name: "Giulia Bianchi",
          location: "Milano, Italia",
          feedback: "Team professionale, piattaforma chiara e un accompagnamento davvero personalizzato."
        },
        {
          name: "Andrea Ferrari",
          location: "Napoli, Italia",
          feedback: "Il simulatore era molto chiaro e ho ottenuto condizioni migliori rispetto alla mia banca."
        }
      ]
    }
  }
};

export default translations;