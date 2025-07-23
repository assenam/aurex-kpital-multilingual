import { useState } from 'react';

export type Language = 'fr' | 'de' | 'pl' | 'fi' | 'es' | 'pt' | 'el' | 'it';

export const useTranslationLogic = () => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('preferredLanguage') as Language) || 'fr';
  });
  const [isLoading, setIsLoading] = useState(false);

  const changeLanguage = (newLanguage: Language) => {
    setIsLoading(true);
    // Simulation du temps de chargement pour l'animation
    setTimeout(() => {
      setLanguage(newLanguage);
      localStorage.setItem('preferredLanguage', newLanguage);
      setIsLoading(false);
    }, 1500);
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

  return { language, setLanguage, changeLanguage, isLoading, t };
};

const translations = {
  fr: {
    nav: {
      home: "Accueil",
      services: "Services", 
      simulator: "Simulateur",
      about: "À Propos",
      blog: "Blog",
      contact: "Contact",
      quickRequest: "Demande rapide"
    },
    home: {
      hero: {
        title: "Votre Partenaire Financier",
        subtitle: "depuis 1997",
        description: "Excellence, innovation et confiance pour tous vos projets financiers",
        ctaBtn: "Découvrir nos solutions",
        simulateBtn: "Simuler un prêt"
      },
      services: {
        badge: "Innovation Financière",
        title: "Services",
        subtitle: "Nouvelle Génération", 
        description: "L'avenir de la finance est ici. Découvrez nos solutions révolutionnaires",
        description2: "alimentées par l'IA",
        description3: "et l'expertise humaine.",
        personalLoans: {
          title: "Prêts Personnels",
          description: "Solutions de financement ultra-personnalisées avec des conditions révolutionnaires.",
          feature1: "IA pour taux optimal",
          feature2: "Réponse en 2h", 
          feature3: "Flexibilité maximale"
        },
        businessFinancing: {
          title: "Financements Pro",
          description: "Propulsez votre entreprise vers l'excellence avec nos solutions innovantes.",
          feature1: "Financement express",
          feature2: "Accompagnement expert",
          feature3: "Solutions sur mesure"
        },
        smartInvestments: {
          title: "Investissements Smart",
          description: "Optimisation patrimoniale avec intelligence artificielle et expertise humaine.",
          feature1: "Portfolio intelligent",
          feature2: "Conseils premium", 
          feature3: "Rendement optimisé"
        },
        insurance360: {
          title: "Assurances 360°",
          description: "Protection totale et innovative pour tous vos projets de vie et business.",
          feature1: "Couverture complète",
          feature2: "Claims en 24h",
          feature3: "Support premium"
        },
        discoverBtn: "Découvrir →",
        exploreBtn: "Explorer tous nos services"
      },
      about: {
        badge: "Pionniers depuis 25 ans",
        title: "Un quart de siècle",
        subtitle: "d'innovation",
        subtitle2: "financière",
        description: "Depuis Hamburg 1997",
        description2: "Aurex K-pital révolutionne l'accompagnement financier en combinant",
        description3: "expertise traditionnelle",
        description4: "technologies de pointe",
        description5: "Notre approche unique allie intelligence artificielle, analyses prédictives et conseil humain personnalisé pour des solutions qui transforment",
        description6: "réellement vos projets",
        description7: "en succès.",
        ourStoryBtn: "Notre Histoire",
        talkProjectBtn: "Parlons Projet",
        stats: {
          founded: "Fondée avec vision",
          location: "Cœur de l'Europe",
          certified: "Excellence certifiée",
          security: "Sécurité garantie",
          leader: "Leader Européen Certifié",
          excellence: "Excellence reconnue en financement innovant"
        }
      },
      cta: {
        title: "Prêt à concrétiser",
        subtitle: "vos projets",
        description: "Nos experts sont à votre disposition pour étudier votre situation et vous proposer les meilleures solutions de financement.",
        requestBtn: "Faire une demande",
        simulateBtn: "Simuler un prêt",
        contactBtn: "Nous contacter",
        phone: "Téléphone :",
        address: "Adresse :",
        phoneNumber: "+33759282004",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne"
      }
    },
    services: {
      hero: {
        badge: "Innovation Financière depuis 1997",
        title: "Solutions Financières",
        subtitle: "Nouvelle Génération",
        description: "Découvrez nos services premium combinant expertise humaine et intelligence artificielle pour des solutions financières qui dépassent vos attentes.",
        simulateBtn: "Simuler mon projet",
        requestBtn: "Demande personnalisée"
      },
      main: {
        title: "Nos Services Phares",
        subtitle: "Une gamme complète de solutions financières adaptées à chaque situation",
        featuresLabel: "Caractéristiques principales :",
        useCasesLabel: "Cas d'usage :",
        learnMoreBtn: "En savoir plus"
      },
      specialized: {
        title: "Produits Spécialisés",
        subtitle: "Solutions ciblées pour des besoins spécifiques",
        discoverBtn: "Découvrir"
      },
      process: {
        title: "Notre Processus",
        subtitle: "Une approche structurée pour des résultats optimaux"
      },
      cta: {
        title: "Prêt à concrétiser vos projets ?",
        subtitle: "Nos experts vous accompagnent dans la réalisation de tous vos objectifs financiers",
        advisorBtn: "Rencontrer un conseiller",
        appointmentBtn: "Prendre rendez-vous",
        phone: "Téléphone :",
        address: "Adresse :",
        phoneNumber: "+33759282004",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne"
      }
    },
    footer: {
      description: "Depuis 1997, Aurex K-pital accompagne particuliers et entreprises dans leurs projets financiers avec expertise et confiance.",
      services: "Services",
      tools: "Outils", 
      company: "Entreprise",
      legal: "Légal",
      copyright: "© 2024 Aurex K-pital. Tous droits réservés.",
      establishment: "Établissement financier agréé - Allemagne"
    },
    about: {
      badge: "Excellence depuis 1997",
      title: "Un Quart de Siècle",
      subtitle: "d'Innovation Financière",
      description: "Depuis Hamburg, nous révolutionnons l'accompagnement financier en combinant expertise humaine traditionnelle et technologies de pointe.",
      story: {
        title: "Notre Histoire", 
        subtitle: "De startup hambourgeoise à leader européen de l'innovation financière",
        paragraph1: "Aurex K-pital naît en 1997 de la vision audacieuse de révolutionner les services financiers européens. Basée à Hamburg, au cœur économique de l'Allemagne, notre entreprise s'est donnée pour mission de démocratiser l'accès aux solutions financières innovantes.",
        paragraph2: "Pionniers dans l'intégration de l'intelligence artificielle aux services financiers dès 2010, nous avons développé des algorithmes propriétaires qui permettent une analyse de risque ultra-précise et des recommandations personnalisées pour chaque client.",
        paragraph3: "Aujourd'hui, avec plus de 50 000 clients dans toute l'Europe et 5 milliards d'euros de financements accordés, nous continuons d'innover pour offrir les meilleures solutions du marché."
      },
      timeline: {
        title: "Nos Grandes Étapes",
        milestones: [
          {
            year: "1997",
            title: "Fondation à Hamburg",
            description: "Création d'Aurex K-pital avec la vision de révolutionner les services financiers en Europe"
          },
          {
            year: "2003", 
            title: "Expansion européenne",
            description: "Ouverture de bureaux dans 5 pays européens et lancement des premiers services digitaux"
          },
          {
            year: "2010",
            title: "Innovation IA",
            description: "Intégration pionnière de l'intelligence artificielle dans l'analyse de crédit"
          },
          {
            year: "2015",
            title: "Certification Excellence", 
            description: "Obtention des certifications européennes les plus strictes en matière financière"
          },
          {
            year: "2020",
            title: "Transformation digitale",
            description: "Lancement de la plateforme 100% digitale et des algorithmes prédictifs avancés"
          },
          {
            year: "2024",
            title: "Leader marché",
            description: "Position de leader européen avec plus de 50 000 clients satisfaits"
          }
        ]
      },
      values: {
        title: "Nos Valeurs",
        subtitle: "Les principes qui guident chacune de nos actions",
        items: [
          {
            title: "Excellence Client",
            description: "Chaque client est unique et mérite une attention personnalisée avec des solutions sur mesure."
          },
          {
            title: "Sécurité Absolue",
            description: "Protection maximale des données et des investissements avec les technologies les plus avancées."
          },
          {
            title: "Innovation Continue",
            description: "Recherche permanente de nouvelles solutions pour anticiper les besoins de demain."
          },
          {
            title: "Transparence Totale",
            description: "Communication claire et honnête sur tous nos produits, services et conditions."
          }
        ]
      },
      team: {
        title: "Notre Équipe Dirigeante",
        subtitle: "Des experts reconnus au service de votre réussite",
        members: [
          {
            name: "Dr. Klaus Müller",
            position: "Directeur Général",
            experience: "25 ans",
            specialty: "Stratégie financière",
            education: "PhD Finance - Frankfurt School"
          },
          {
            name: "Sophie Laurent",
            position: "Directrice Innovation", 
            experience: "15 ans",
            specialty: "FinTech & IA",
            education: "MIT - Intelligence Artificielle"
          },
          {
            name: "Marco Antonelli",
            position: "Directeur Risques",
            experience: "20 ans",
            specialty: "Gestion des risques",
            education: "Bocconi - Risk Management"
          },
          {
            name: "Elena Rodriguez",
            position: "Directrice Client",
            experience: "12 ans",
            specialty: "Relation client", 
            education: "ESADE - Customer Experience"
          }
        ],
        experienceLabel: "d'expérience"
      },
      certifications: {
        title: "Certifications & Accréditations",
        subtitle: "Reconnaissance officielle de notre excellence opérationnelle",
        items: [
          {
            name: "ISO 27001",
            description: "Sécurité de l'information",
            year: "2018"
          },
          {
            name: "PCI DSS", 
            description: "Sécurité des paiements",
            year: "2020"
          },
          {
            name: "GDPR Compliant",
            description: "Protection des données",
            year: "2018"
          },
          {
            name: "SOC 2 Type II",
            description: "Contrôles organisationnels",
            year: "2021"
          }
        ],
        sinceLabel: "Depuis"
      },
      contact: {
        title: "Nous Rencontrer",
        subtitle: "Nos bureaux vous accueillent au cœur de Hamburg",
        address: {
          title: "Adresse",
          value: ["Irma-Keilhack-Ring 24", "22145 Hamburg", "Allemagne"]
        },
        phone: {
          title: "Téléphone",
          value: "+49 40 710 97523",
          schedule: ["Lun-Ven: 8h-19h", "Sam: 9h-17h"]
        },
        email: {
          title: "Email",
          values: ["contact@aurex-kpital.com", "info@aurex-kpital.com", "support@aurex-kpital.com"]
        },
        buttons: {
          appointment: "Prendre rendez-vous",
          customRequest: "Demande personnalisée"
        }
      }
    }
  },
  de: {
    nav: {
      home: "Startseite",
      services: "Dienstleistungen",
      simulator: "Simulator", 
      about: "Über uns",
      blog: "Blog",
      contact: "Kontakt",
      quickRequest: "Schnelle Anfrage"
    },
    home: {
      hero: {
        title: "Ihr Finanzpartner",
        subtitle: "seit 1997",
        description: "Exzellenz, Innovation und Vertrauen für all Ihre Finanzprojekte",
        ctaBtn: "Unsere Lösungen entdecken",
        simulateBtn: "Kredit simulieren"
      },
      services: {
        badge: "Finanzinnovation",
        title: "Services",
        subtitle: "Neue Generation",
        description: "Die Zukunft der Finanzierung ist da. Entdecken Sie unsere revolutionären",
        description2: "KI-gestützten",
        description3: "Lösungen und menschliche Expertise.",
        personalLoans: {
          title: "Persönliche Kredite",
          description: "Ultra-personalisierte Finanzierungslösungen mit revolutionären Bedingungen.",
          features: ["KI für optimalen Zinssatz", "Antwort in 2h", "Maximale Flexibilität"]
        },
        businessFinancing: {
          title: "Geschäftsfinanzierung",
          description: "Bringen Sie Ihr Unternehmen mit unseren innovativen Lösungen zum Erfolg.",
          features: ["Express-Finanzierung", "Expertenbegleitung", "Maßgeschneiderte Lösungen"]
        },
        smartInvestments: {
          title: "Smart Investments",
          description: "Vermögensoptimierung mit künstlicher Intelligenz und menschlicher Expertise.",
          features: ["Intelligentes Portfolio", "Premium-Beratung", "Optimierte Rendite"]
        },
        insurance360: {
          title: "Versicherungen 360°",
          description: "Vollständiger und innovativer Schutz für alle Ihre Lebens- und Geschäftsprojekte.",
          features: ["Vollständige Abdeckung", "Schadensmeldung in 24h", "Premium-Support"]
        },
        discoverBtn: "Entdecken →",
        exploreBtn: "Alle Services erkunden"
      },
      about: {
        badge: "Pioniere seit 25 Jahren",
        title: "Ein Vierteljahrhundert",
        subtitle: "Finanzinnovation",
        subtitle2: "",
        description: "Seit Hamburg 1997",
        description2: "revolutioniert Aurex K-pital die Finanzbegleitung durch Kombination",
        description3: "traditioneller Expertise",
        description4: "modernster Technologien",
        description5: "Unser einzigartiger Ansatz kombiniert künstliche Intelligenz, Predictive Analytics und personalisierte menschliche Beratung für Lösungen, die",
        description6: "Ihre Projekte wirklich",
        description7: "in Erfolg verwandeln.",
        ourStoryBtn: "Unsere Geschichte",
        talkProjectBtn: "Projekt besprechen",
        stats: {
          founded: "Gegründet mit Vision",
          location: "Herz Europas",
          certified: "Zertifizierte Exzellenz",
          security: "Garantierte Sicherheit",
          leader: "Zertifizierter Europäischer Marktführer",
          excellence: "Anerkannte Exzellenz in innovativer Finanzierung"
        }
      },
      cta: {
        title: "Bereit, Ihre Projekte",
        subtitle: "zu verwirklichen",
        description: "Unsere Experten stehen Ihnen zur Verfügung, um Ihre Situation zu analysieren und Ihnen die besten Finanzierungslösungen anzubieten.",
        requestBtn: "Anfrage stellen",
        simulateBtn: "Kredit simulieren",
        contactBtn: "Kontakt aufnehmen",
        phone: "Telefon:",
        address: "Adresse:",
        phoneNumber: "+33759282004",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hamburg, Deutschland"
      }
    },
    services: {
      hero: {
        badge: "Finanzinnovation seit 1997",
        title: "Finanzlösungen",
        subtitle: "Neue Generation",
        description: "Entdecken Sie unsere Premium-Services, die menschliche Expertise und künstliche Intelligenz für Finanzlösungen kombinieren, die Ihre Erwartungen übertreffen.",
        simulateBtn: "Mein Projekt simulieren",
        requestBtn: "Persönliche Anfrage"
      },
      main: {
        title: "Unsere Hauptservices",
        subtitle: "Eine vollständige Palette von Finanzlösungen für jede Situation",
        featuresLabel: "Hauptmerkmale:",
        useCasesLabel: "Anwendungsfälle:",
        learnMoreBtn: "Mehr erfahren"
      },
      specialized: {
        title: "Spezialisierte Produkte",
        subtitle: "Zielgerichtete Lösungen für spezifische Bedürfnisse",
        discoverBtn: "Entdecken"
      },
      process: {
        title: "Unser Prozess",
        subtitle: "Ein strukturierter Ansatz für optimale Ergebnisse"
      },
      cta: {
        title: "Bereit, Ihre Projekte zu verwirklichen?",
        subtitle: "Unsere Experten begleiten Sie bei der Realisierung all Ihrer finanziellen Ziele",
        advisorBtn: "Berater treffen",
        appointmentBtn: "Termin vereinbaren",
        phone: "Telefon:",
        address: "Adresse:",
        phoneNumber: "+33759282004",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hamburg, Deutschland"
      }
    },
    footer: {
      description: "Seit 1997 begleitet Aurex K-pital Privatpersonen und Unternehmen bei ihren Finanzprojekten mit Expertise und Vertrauen.",
      services: "Dienstleistungen",
      tools: "Tools",
      company: "Unternehmen", 
      legal: "Rechtliches",
      copyright: "© 2024 Aurex K-pital. Alle Rechte vorbehalten.",
      establishment: "Zugelassenes Finanzinstitut - Deutschland"
    }
  },
  pl: {
    nav: {
      home: "Strona główna",
      services: "Usługi",
      simulator: "Symulator",
      about: "O nas",
      blog: "Blog",
      contact: "Kontakt",
      quickRequest: "Szybka prośba"
    },
    home: {
      hero: {
        title: "Twój Partner Finansowy",
        subtitle: "od 1997 roku",
        description: "Doskonałość, innowacja i zaufanie dla wszystkich Twoich projektów finansowych",
        ctaBtn: "Odkryj nasze rozwiązania",
        simulateBtn: "Symuluj kredyt"
      },
      services: {
        badge: "Innowacje finansowe",
        title: "Usługi",
        subtitle: "Nowej Generacji",
        description: "Przyszłość finansów jest tutaj. Odkryj nasze rewolucyjne rozwiązania",
        description2: "zasilane przez AI",
        description3: "i ludzką ekspertyzę.",
        personalLoans: {
          title: "Pożyczki Osobiste",
          description: "Ultra-spersonalizowane rozwiązania finansowania z rewolucyjnymi warunkami.",
          features: ["AI dla optymalnej stopy", "Odpowiedź w 2h", "Maksymalna elastyczność"]
        },
        businessFinancing: {
          title: "Finansowanie Biznesowe",
          description: "Poprowadź swoją firmę do doskonałości z naszymi innowacyjnymi rozwiązaniami.",
          features: ["Ekspresowe finansowanie", "Wsparcie eksperta", "Rozwiązania na miarę"]
        },
        smartInvestments: {
          title: "Inteligentne Inwestycje",
          description: "Optymalizacja majątku ze sztuczną inteligencją i ludzką ekspertyzą.",
          features: ["Inteligentne portfolio", "Doradztwo premium", "Zoptymalizowany zwrot"]
        },
        insurance360: {
          title: "Ubezpieczenia 360°",
          description: "Kompleksowa i innowacyjna ochrona dla wszystkich projektów życiowych i biznesowych.",
          features: ["Pełne pokrycie", "Roszczenia w 24h", "Wsparcie premium"]
        },
        discoverBtn: "Odkryj →",
        exploreBtn: "Poznaj wszystkie usługi"
      },
      about: {
        badge: "Pionierzy od 25 lat",
        title: "Ćwierć wieku",
        subtitle: "innowacji",
        subtitle2: "finansowych",
        description: "Od Hamburg 1997",
        description2: "Aurex K-pital rewolucjonizuje wsparcie finansowe łącząc",
        description3: "tradycyjną ekspertyzę",
        description4: "najnowocześniejsze technologie",
        description5: "Nasze unikalne podejście łączy sztuczną inteligencję, analizy predykcyjne i spersonalizowane doradztwo ludzkie dla rozwiązań, które",
        description6: "naprawdę przekształcają Twoje projekty",
        description7: "w sukces.",
        ourStoryBtn: "Nasza Historia",
        talkProjectBtn: "Porozmawiajmy o projekcie",
        stats: {
          founded: "Założona z wizją",
          location: "Serce Europy",
          certified: "Certyfikowana doskonałość",
          security: "Gwarantowane bezpieczeństwo",
          leader: "Certyfikowany Europejski Lider",
          excellence: "Uznana doskonałość w innowacyjnym finansowaniu"
        }
      },
      cta: {
        title: "Gotowy zrealizować",
        subtitle: "swoje projekty",
        description: "Nasi eksperci są do Twojej dyspozycji, aby przeanalizować Twoją sytuację i zaproponować najlepsze rozwiązania finansowania.",
        requestBtn: "Złóż wniosek",
        simulateBtn: "Symuluj kredyt",
        contactBtn: "Skontaktuj się z nami",
        phone: "Telefon:",
        address: "Adres:",
        phoneNumber: "+33759282004",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hamburg, Niemcy"
      }
    },
    footer: {
      description: "Od 1997 roku Aurex K-pital towarzyszy osobom prywatnym i firmom w ich projektach finansowych z ekspertyzą i zaufaniem.",
      services: "Usługi",
      tools: "Narzędzia",
      company: "Firma",
      legal: "Prawne",
      copyright: "© 2024 Aurex K-pital. Wszelkie prawa zastrzeżone.",
      establishment: "Licencjonowana instytucja finansowa - Niemcy"
    }
  },
  fi: {
    nav: {
      home: "Koti",
      services: "Palvelut",
      simulator: "Simulaattori",
      about: "Tietoa meistä",
      blog: "Blogi",
      contact: "Ota yhteyttä",
      quickRequest: "Nopea pyyntö"
    },
    home: {
      hero: {
        title: "Rahoituskumppanisi",
        subtitle: "vuodesta 1997",
        description: "Huippuosaamista, innovaatiota ja luottamusta kaikille rahoitusprojekteillesi",
        ctaBtn: "Tutustu ratkaisuihimme",
        simulateBtn: "Simuloi lainaa"
      },
      services: {
        badge: "Rahoitusinnovaatio",
        title: "Palvelut",
        subtitle: "Uuden Sukupolven",
        description: "Rahoituksen tulevaisuus on täällä. Tutustu vallankumouksellisiin",
        description2: "AI-pohjaisiin",
        description3: "ratkaisuihin ja ihmisosaamiseen.",
        personalLoans: {
          title: "Henkilökohtaiset Lainat",
          description: "Ultra-henkilökohtaiset rahoitusratkaisut vallankumouksellisilla ehdoilla.",
          features: ["AI optimaaliselle korolle", "Vastaus 2h:ssa", "Maksimaalinen joustavuus"]
        },
        businessFinancing: {
          title: "Yritysrahoitus",
          description: "Vie yrityksesi huippuun innovatiivisilla ratkaisuillamme.",
          features: ["Pikirahoitus", "Asiantuntija-apu", "Räätälöidyt ratkaisut"]
        },
        smartInvestments: {
          title: "Älykkäät Sijoitukset",
          description: "Varallisuuden optimointi tekoälyn ja ihmisosaamisen avulla.",
          features: ["Älykäs portfolio", "Premium-neuvonta", "Optimoitu tuotto"]
        },
        insurance360: {
          title: "Vakuutukset 360°",
          description: "Täydellinen ja innovatiivinen suoja kaikille elämän- ja liiketoimintaprojekteille.",
          features: ["Täydellinen kattavuus", "Korvaukset 24h:ssa", "Premium-tuki"]
        },
        discoverBtn: "Tutustu →",
        exploreBtn: "Tutustu kaikkiin palveluihin"
      },
      about: {
        badge: "Pioneerit 25 vuotta",
        title: "Neljäsosa vuosisataa",
        subtitle: "rahoitusinnovaatiota",
        subtitle2: "",
        description: "Hampurista 1997 lähtien",
        description2: "Aurex K-pital mullistaa rahoitustukea yhdistämällä",
        description3: "perinteisen osaamisen",
        description4: "huipputeknologioihin",
        description5: "Ainutlaatuinen lähestymistapamme yhdistää tekoälyn, ennakoivat analytiikka ja henkilökohtaisen neuvonnan ratkaisuihin, jotka",
        description6: "todella muuttavat projektisi",
        description7: "menestykseksi.",
        ourStoryBtn: "Meidän Tarinmme",
        talkProjectBtn: "Keskustellaan Projektista",
        stats: {
          founded: "Perustettu visiolla",
          location: "Euroopan sydän",
          certified: "Sertifioitu huippuosaaminen",
          security: "Taattu turvallisuus",
          leader: "Sertifioitu Eurooppalainen Johtaja",
          excellence: "Tunnustettu huippuosaaminen innovatiivisessa rahoituksessa"
        }
      },
      cta: {
        title: "Valmis toteuttamaan",
        subtitle: "projektisi",
        description: "Asiantuntijamme ovat käytettävissäsi analysoimaan tilannettasi ja tarjoamaan parhaat rahoitusratkaisut.",
        requestBtn: "Tee hakemus",
        simulateBtn: "Simuloi lainaa",
        contactBtn: "Ota meihin yhteyttä",
        phone: "Puhelin:",
        address: "Osoite:",
        phoneNumber: "+33759282004",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hampuri, Saksa"
      }
    },
    footer: {
      description: "Vuodesta 1997 Aurex K-pital on tukenut yksityishenkilöitä ja yrityksiä heidän rahoitusprojekteissaan asiantuntemuksella ja luottamuksella.",
      services: "Palvelut",
      tools: "Työkalut",
      company: "Yritys",
      legal: "Oikeudellinen",
      copyright: "© 2024 Aurex K-pital. Kaikki oikeudet pidätetään.",
      establishment: "Lisensoitu rahoituslaitos - Saksa"
    }
  },
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      simulator: "Simulador",
      about: "Acerca de",
      blog: "Blog",
      contact: "Contacto",
      quickRequest: "Solicitud rápida"
    },
    home: {
      hero: {
        title: "Tu Socio Financiero",
        subtitle: "desde 1997",
        description: "Excelencia, innovación y confianza para todos tus proyectos financieros",
        ctaBtn: "Descubre nuestras soluciones",
        simulateBtn: "Simular préstamo"
      },
      services: {
        badge: "Innovación Financiera",
        title: "Servicios",
        subtitle: "Nueva Generación",
        description: "El futuro de las finanzas está aquí. Descubre nuestras soluciones revolucionarias",
        description2: "impulsadas por IA",
        description3: "y experiencia humana.",
        personalLoans: {
          title: "Préstamos Personales",
          description: "Soluciones de financiación ultra-personalizadas con condiciones revolucionarias.",
          features: ["IA para tasa óptima", "Respuesta en 2h", "Flexibilidad máxima"]
        },
        businessFinancing: {
          title: "Financiación Empresarial",
          description: "Impulsa tu empresa hacia la excelencia con nuestras soluciones innovadoras.",
          features: ["Financiación express", "Acompañamiento experto", "Soluciones a medida"]
        },
        smartInvestments: {
          title: "Inversiones Inteligentes",
          description: "Optimización patrimonial con inteligencia artificial y experiencia humana.",
          features: ["Portafolio inteligente", "Asesoramiento premium", "Rendimiento optimizado"]
        },
        insurance360: {
          title: "Seguros 360°",
          description: "Protección total e innovadora para todos tus proyectos de vida y negocio.",
          features: ["Cobertura completa", "Reclamaciones en 24h", "Soporte premium"]
        },
        discoverBtn: "Descubrir →",
        exploreBtn: "Explorar todos los servicios"
      },
      about: {
        badge: "Pioneros desde hace 25 años",
        title: "Un cuarto de siglo",
        subtitle: "de innovación",
        subtitle2: "financiera",
        description: "Desde Hamburgo 1997",
        description2: "Aurex K-pital revoluciona el acompañamiento financiero combinando",
        description3: "experiencia tradicional",
        description4: "tecnologías de vanguardia",
        description5: "Nuestro enfoque único combina inteligencia artificial, análisis predictivos y asesoramiento humano personalizado para soluciones que",
        description6: "realmente transforman tus proyectos",
        description7: "en éxito.",
        ourStoryBtn: "Nuestra Historia",
        talkProjectBtn: "Hablemos del Proyecto",
        stats: {
          founded: "Fundada con visión",
          location: "Corazón de Europa",
          certified: "Excelencia certificada",
          security: "Seguridad garantizada",
          leader: "Líder Europeo Certificado",
          excellence: "Excelencia reconocida en financiación innovadora"
        }
      },
      cta: {
        title: "Listo para materializar",
        subtitle: "tus proyectos",
        description: "Nuestros expertos están a tu disposición para estudiar tu situación y proponerte las mejores soluciones de financiación.",
        requestBtn: "Hacer solicitud",
        simulateBtn: "Simular préstamo",
        contactBtn: "Contáctanos",
        phone: "Teléfono:",
        address: "Dirección:",
        phoneNumber: "+33759282004",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemania"
      }
    },
    footer: {
      description: "Desde 1997, Aurex K-pital acompaña a particulares y empresas en sus proyectos financieros con experiencia y confianza.",
      services: "Servicios",
      tools: "Herramientas",
      company: "Empresa",
      legal: "Legal",
      copyright: "© 2024 Aurex K-pital. Todos los derechos reservados.",
      establishment: "Institución financiera autorizada - Alemania"
    }
  },
  pt: {
    nav: {
      home: "Início",
      services: "Serviços",
      simulator: "Simulador",
      about: "Sobre nós",
      blog: "Blog",
      contact: "Contato",
      quickRequest: "Solicitação rápida"
    },
    home: {
      hero: {
        title: "Seu Parceiro Financeiro",
        subtitle: "desde 1997",
        description: "Excelência, inovação e confiança para todos os seus projetos financeiros",
        ctaBtn: "Descubra nossas soluções",
        simulateBtn: "Simular empréstimo"
      },
      services: {
        badge: "Inovação Financeira",
        title: "Serviços",
        subtitle: "Nova Geração",
        description: "O futuro das finanças está aqui. Descubra nossas soluções revolucionárias",
        description2: "impulsionadas por IA",
        description3: "e expertise humana.",
        personalLoans: {
          title: "Empréstimos Pessoais",
          description: "Soluções de financiamento ultra-personalizadas com condições revolucionárias.",
          features: ["IA para taxa ótima", "Resposta em 2h", "Flexibilidade máxima"]
        },
        businessFinancing: {
          title: "Financiamento Empresarial",
          description: "Impulsione sua empresa rumo à excelência com nossas soluções inovadoras.",
          features: ["Financiamento expresso", "Acompanhamento especializado", "Soluções sob medida"]
        },
        smartInvestments: {
          title: "Investimentos Inteligentes",
          description: "Otimização patrimonial com inteligência artificial e expertise humana.",
          features: ["Portfólio inteligente", "Consultoria premium", "Retorno otimizado"]
        },
        insurance360: {
          title: "Seguros 360°",
          description: "Proteção total e inovadora para todos os seus projetos de vida e negócios.",
          features: ["Cobertura completa", "Sinistros em 24h", "Suporte premium"]
        },
        discoverBtn: "Descobrir →",
        exploreBtn: "Explorar todos os serviços"
      },
      about: {
        badge: "Pioneiros há 25 anos",
        title: "Um quarto de século",
        subtitle: "de inovação",
        subtitle2: "financeira",
        description: "Desde Hamburgo 1997",
        description2: "a Aurex K-pital revoluciona o acompanhamento financeiro combinando",
        description3: "expertise tradicional",
        description4: "tecnologias de ponta",
        description5: "Nossa abordagem única combina inteligência artificial, análises preditivas e consultoria humana personalizada para soluções que",
        description6: "realmente transformam seus projetos",
        description7: "em sucesso.",
        ourStoryBtn: "Nossa História",
        talkProjectBtn: "Vamos Falar do Projeto",
        stats: {
          founded: "Fundada com visão",
          location: "Coração da Europa",
          certified: "Excelência certificada",
          security: "Segurança garantida",
          leader: "Líder Europeu Certificado",
          excellence: "Excelência reconhecida em financiamento inovador"
        }
      },
      cta: {
        title: "Pronto para concretizar",
        subtitle: "seus projetos",
        description: "Nossos especialistas estão à sua disposição para estudar sua situação e propor as melhores soluções de financiamento.",
        requestBtn: "Fazer solicitação",
        simulateBtn: "Simular empréstimo",
        contactBtn: "Entre em contato",
        phone: "Telefone:",
        address: "Endereço:",
        phoneNumber: "+33759282004",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemanha"
      }
    },
    footer: {
      description: "Desde 1997, a Aurex K-pital acompanha particulares e empresas em seus projetos financeiros com expertise e confiança.",
      services: "Serviços",
      tools: "Ferramentas",
      company: "Empresa",
      legal: "Legal",
      copyright: "© 2024 Aurex K-pital. Todos os direitos reservados.",
      establishment: "Instituição financeira autorizada - Alemanha"
    }
  },
  el: {
    nav: {
      home: "Αρχική",
      services: "Υπηρεσίες",
      simulator: "Προσομοιωτής",
      about: "Σχετικά με εμάς",
      blog: "Blog",
      contact: "Επικοινωνία",
      quickRequest: "Γρήγορη αίτηση"
    },
    home: {
      hero: {
        title: "Ο Χρηματοοικονομικός Σας Εταίρος",
        subtitle: "από το 1997",
        description: "Αριστεία, καινοτομία και εμπιστοσύνη για όλα τα χρηματοοικονομικά σας έργα",
        ctaBtn: "Ανακαλύψτε τις λύσεις μας",
        simulateBtn: "Προσομοιώστε δάνειο"
      },
      services: {
        badge: "Χρηματοοικονομική Καινοτομία",
        title: "Υπηρεσίες",
        subtitle: "Νέας Γενιάς",
        description: "Το μέλλον των χρηματοοικονομικών είναι εδώ. Ανακαλύψτε τις επαναστατικές μας λύσεις",
        description2: "που τροφοδοτούνται από AI",
        description3: "και ανθρώπινη εμπειρογνωμοσύνη.",
        personalLoans: {
          title: "Προσωπικά Δάνεια",
          description: "Υπέρ-εξατομικευμένες χρηματοδοτικές λύσεις με επαναστατικούς όρους.",
          features: ["AI για βέλτιστο επιτόκιο", "Απάντηση σε 2ω", "Μέγιστη ευελιξία"]
        },
        businessFinancing: {
          title: "Επιχειρηματική Χρηματοδότηση",
          description: "Προωθήστε την επιχείρησή σας στην αριστεία με τις καινοτόμες μας λύσεις.",
          features: ["Εξπρές χρηματοδότηση", "Εξειδικευμένη συνοδεία", "Εξατομικευμένες λύσεις"]
        },
        smartInvestments: {
          title: "Έξυπνες Επενδύσεις",
          description: "Βελτιστοποίηση περιουσίας με τεχνητή νοημοσύνη και ανθρώπινη εμπειρογνωμοσύνη.",
          features: ["Έξυπνο χαρτοφυλάκιο", "Premium συμβουλές", "Βελτιστοποιημένη απόδοση"]
        },
        insurance360: {
          title: "Ασφάλειες 360°",
          description: "Ολική και καινοτόμα προστασία για όλα τα έργα ζωής και επιχείρησής σας.",
          features: ["Πλήρης κάλυψη", "Αποζημιώσεις σε 24ω", "Premium υποστήριξη"]
        },
        discoverBtn: "Ανακαλύψτε →",
        exploreBtn: "Εξερευνήστε όλες τις υπηρεσίες"
      },
      about: {
        badge: "Πρωτοπόροι εδώ και 25 χρόνια",
        title: "Ένα τέταρτο του αιώνα",
        subtitle: "χρηματοοικονομικής",
        subtitle2: "καινοτομίας",
        description: "Από την Αμβούργο 1997",
        description2: "η Aurex K-pital επαναστατεί στη χρηματοοικονομική συνοδεία συνδυάζοντας",
        description3: "παραδοσιακή εμπειρογνωμοσύνη",
        description4: "τεχνολογίες αιχμής",
        description5: "Η μοναδική μας προσέγγιση συνδυάζει τεχνητή νοημοσύνη, προβλεπτικές αναλύσεις και εξατομικευμένη ανθρώπινη συμβουλευτική για λύσεις που",
        description6: "πραγματικά μετατρέπουν τα έργα σας",
        description7: "σε επιτυχία.",
        ourStoryBtn: "Η Ιστορία Μας",
        talkProjectBtn: "Ας Μιλήσουμε για το Έργο",
        stats: {
          founded: "Ιδρύθηκε με όραμα",
          location: "Καρδιά της Ευρώπης",
          certified: "Πιστοποιημένη αριστεία",
          security: "Εγγυημένη ασφάλεια",
          leader: "Πιστοποιημένος Ευρωπαίος Ηγέτης",
          excellence: "Αναγνωρισμένη αριστεία σε καινοτόμα χρηματοδότηση"
        }
      },
      cta: {
        title: "Έτοιμοι να υλοποιήσετε",
        subtitle: "τα έργα σας",
        description: "Οι ειδικοί μας είναι στη διάθεσή σας για να μελετήσουν την κατάστασή σας και να σας προτείνουν τις καλύτερες χρηματοδοτικές λύσεις.",
        requestBtn: "Κάντε αίτηση",
        simulateBtn: "Προσομοιώστε δάνειο",
        contactBtn: "Επικοινωνήστε μαζί μας",
        phone: "Τηλέφωνο:",
        address: "Διεύθυνση:",
        phoneNumber: "+33759282004",
        addressText: "Irma-Keilhack-Ring 24, 22145 Αμβούργο, Γερμανία"
      }
    },
    footer: {
      description: "Από το 1997, η Aurex K-pital συνοδεύει ιδιώτες και επιχειρήσεις στα χρηματοοικονομικά τους έργα με εμπειρογνωμοσύνη και εμπιστοσύνη.",
      services: "Υπηρεσίες",
      tools: "Εργαλεία",
      company: "Εταιρεία",
      legal: "Νομικά",
      copyright: "© 2024 Aurex K-pital. Όλα τα δικαιώματα διατηρούνται.",
      establishment: "Εξουσιοδοτημένο χρηματοπιστωτικό ίδρυμα - Γερμανία"
    }
  },
  it: {
    nav: {
      home: "Home",
      services: "Servizi",
      simulator: "Simulatore",
      about: "Chi siamo",
      blog: "Blog",
      contact: "Contatti",
      quickRequest: "Richiesta rapida"
    },
    home: {
      hero: {
        title: "Il Tuo Partner Finanziario",
        subtitle: "dal 1997",
        description: "Eccellenza, innovazione e fiducia per tutti i tuoi progetti finanziari",
        ctaBtn: "Scopri le nostre soluzioni",
        simulateBtn: "Simula prestito"
      },
      services: {
        badge: "Innovazione Finanziaria",
        title: "Servizi",
        subtitle: "Nuova Generazione",
        description: "Il futuro della finanza è qui. Scopri le nostre soluzioni rivoluzionarie",
        description2: "alimentate dall'IA",
        description3: "e competenza umana.",
        personalLoans: {
          title: "Prestiti Personali",
          description: "Soluzioni di finanziamento ultra-personalizzate con condizioni rivoluzionarie.",
          features: ["IA per tasso ottimale", "Risposta in 2h", "Flessibilità massima"]
        },
        businessFinancing: {
          title: "Finanziamenti Aziendali",
          description: "Porta la tua azienda verso l'eccellenza con le nostre soluzioni innovative.",
          features: ["Finanziamento express", "Accompagnamento esperto", "Soluzioni su misura"]
        },
        smartInvestments: {
          title: "Investimenti Smart",
          description: "Ottimizzazione patrimoniale con intelligenza artificiale e competenza umana.",
          features: ["Portfolio intelligente", "Consulenza premium", "Rendimento ottimizzato"]
        },
        insurance360: {
          title: "Assicurazioni 360°",
          description: "Protezione totale e innovativa per tutti i tuoi progetti di vita e business.",
          features: ["Copertura completa", "Sinistri in 24h", "Supporto premium"]
        },
        discoverBtn: "Scopri →",
        exploreBtn: "Esplora tutti i servizi"
      },
      about: {
        badge: "Pionieri da 25 anni",
        title: "Un quarto di secolo",
        subtitle: "di innovazione",
        subtitle2: "finanziaria",
        description: "Da Amburgo 1997",
        description2: "Aurex K-pital rivoluziona l'accompagnamento finanziario combinando",
        description3: "competenza tradizionale",
        description4: "tecnologie all'avanguardia",
        description5: "Il nostro approccio unico combina intelligenza artificiale, analisi predittive e consulenza umana personalizzata per soluzioni che",
        description6: "trasformano realmente i tuoi progetti",
        description7: "in successo.",
        ourStoryBtn: "La Nostra Storia",
        talkProjectBtn: "Parliamo del Progetto",
        stats: {
          founded: "Fondata con visione",
          location: "Cuore d'Europa",
          certified: "Eccellenza certificata",
          security: "Sicurezza garantita",
          leader: "Leader Europeo Certificato",
          excellence: "Eccellenza riconosciuta nel finanziamento innovativo"
        }
      },
      cta: {
        title: "Pronto a concretizzare",
        subtitle: "i tuoi progetti",
        description: "I nostri esperti sono a tua disposizione per studiare la tua situazione e proporti le migliori soluzioni di finanziamento.",
        requestBtn: "Fai richiesta",
        simulateBtn: "Simula prestito",
        contactBtn: "Contattaci",
        phone: "Telefono:",
        address: "Indirizzo:",
        phoneNumber: "+33759282004",
        addressText: "Irma-Keilhack-Ring 24, 22145 Amburgo, Germania"
      }
    },
    footer: {
      description: "Dal 1997, Aurex K-pital accompagna privati e aziende nei loro progetti finanziari con competenza e fiducia.",
      services: "Servizi",
      tools: "Strumenti",
      company: "Azienda",
      legal: "Legale",
      copyright: "© 2024 Aurex K-pital. Tutti i diritti riservati.",
      establishment: "Istituto finanziario autorizzato - Germania"
    }
  }
};

export { useTranslationLogic as useTranslation };