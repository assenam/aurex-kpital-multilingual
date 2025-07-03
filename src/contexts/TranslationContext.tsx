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
        simulateBtn: "Simuler un prêt",
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
        },
        scrollText: "Découvrir"
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
        description1: {
          highlight: "Depuis Hamburg 1997",
          text: ", Aurex K-pital révolutionne l'accompagnement financier en combinant ",
          expertise: "expertise traditionnelle",
          and: " et ",
          technology: "technologies de pointe"
        },
        description2: {
          text: "Notre approche unique allie intelligence artificielle, analyses prédictives et conseil humain personnalisé pour des solutions qui transforment ",
          highlight: "réellement vos projets",
          success: " en succès"
        },
        buttons: {
          history: "Notre Histoire",
          contact: "Parlons Projet"
        },
        stats: {
          founded: "Fondée avec vision",
          location: "Cœur de l'Europe",
          certified: "Excellence certifiée",
          security: "Sécurité garantie"
        },
        trust: {
          title: "Leader Européen Certifié",
          description: "Excellence reconnue en financement innovant"
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
        phoneNumber: "+49 40 710 97523",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne"
      }
    },
    // Services structure with dot notation
    'services.personalLoan.title': 'Prêts Personnels',
    'services.personalLoan.description': 'Solutions de financement ultra-personnalisées avec des conditions révolutionnaires.',
    'services.personalLoan.points.0': 'IA pour taux optimal',
    'services.personalLoan.points.1': 'Réponse en 2h',
    'services.personalLoan.points.2': 'Flexibilité maximale',
    'services.personalLoan.cta': 'Découvrir',
    'services.businessLoan.title': 'Financements Pro',
    'services.businessLoan.description': 'Propulsez votre entreprise vers l\'excellence avec nos solutions innovantes.',
    'services.businessLoan.points.0': 'Financement express',
    'services.businessLoan.points.1': 'Accompagnement expert',
    'services.businessLoan.points.2': 'Solutions sur mesure',
    'services.businessLoan.cta': 'Découvrir',
    'services.investment.title': 'Investissements Smart',
    'services.investment.description': 'Optimisation patrimoniale avec intelligence artificielle et expertise humaine.',
    'services.investment.points.0': 'Portfolio intelligent',
    'services.investment.points.1': 'Conseils premium',
    'services.investment.points.2': 'Rendement optimisé',
    'services.investment.cta': 'Découvrir',
    'services.insurance.title': 'Assurances 360°',
    'services.insurance.description': 'Protection totale et innovante pour tous vos projets de vie et business.',
    'services.insurance.points.0': 'Couverture complète',
    'services.insurance.points.1': 'Claims en 24h',
    'services.insurance.points.2': 'Support premium',
    'services.insurance.cta': 'Découvrir',
    'services.explore': 'Explorer tous nos services',
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
        phoneNumber: "+49 40 710 97523",
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
        simulateBtn: "Kredit simulieren",
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
        },
        scrollText: "Entdecken"
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
          feature1: "KI für optimalen Zinssatz",
          feature2: "Antwort in 2h",
          feature3: "Maximale Flexibilität"
        },
        businessFinancing: {
          title: "Geschäftsfinanzierung",
          description: "Bringen Sie Ihr Unternehmen mit unseren innovativen Lösungen zum Erfolg.",
          feature1: "Express-Finanzierung",
          feature2: "Expertenbegleitung",
          feature3: "Maßgeschneiderte Lösungen"
        },
        smartInvestments: {
          title: "Smart Investments",
          description: "Vermögensoptimierung mit künstlicher Intelligenz und menschlicher Expertise.",
          feature1: "Intelligentes Portfolio",
          feature2: "Premium-Beratung",
          feature3: "Optimierte Rendite"
        },
        insurance360: {
          title: "Versicherungen 360°",
          description: "Vollständiger und innovativer Schutz für alle Ihre Lebens- und Geschäftsprojekte.",
          feature1: "Vollständige Abdeckung",
          feature2: "Schadensmeldung in 24h",
          feature3: "Premium-Support"
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
        phoneNumber: "+49 40 710 97523",
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
        phoneNumber: "+49 40 710 97523",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hamburg, Deutschland"
      }
    },
    // Menu structure  
    'menu.home': 'Startseite',
    'menu.services': 'Dienstleistungen',
    'menu.simulator': 'Simulator',
    'menu.request': 'Anfrage',
    'menu.about': 'Über uns',
    'menu.contact': 'Kontakt',
    'menu.faq': 'FAQ',
    'menu.careers': 'Karriere',
    'menu.partners': 'Unsere Partner',
    'menu.blog': 'Blog',
    // Footer structure
    'footer.tools': 'Tools',
    'footer.company': 'Unternehmen', 
    'footer.legal': 'Rechtliches',
    'footer.privacyPolicy': 'Datenschutzrichtlinie',
    'footer.terms': 'AGB',
    'footer.mentions': 'Impressum',
    'footer.gdpr': 'DSGVO',
    'footer.rights': '© 2024 Aurex K-pital. Alle Rechte vorbehalten.',
    // About structure
    'about.title': 'Wer sind wir?',
    'about.description': 'Aurex K-pital ist ein europäisches Finanzinstitut, das sich auf maßgeschneiderte Kredit-, Investment- und Versicherungslösungen spezialisiert hat. Wir kombinieren KI und menschliche Expertise für außergewöhnliche Kundenerfahrungen.',
    // FAQ structure
    'faq.title': 'Häufig gestellte Fragen',
    'faq.questions.0.q': 'Welche Arten von Krediten bieten Sie an?',
    'faq.questions.0.a': 'Wir bieten Personal-, Geschäfts- und Immobilienkredite, alle auf Ihre spezifischen Bedürfnisse zugeschnitten.',
    'faq.questions.1.q': 'Kann ich vorzeitig zurückzahlen?',
    'faq.questions.1.a': 'Ja, Sie können Ihren Kredit jederzeit ohne Strafgebühren vorzeitig zurückzahlen.',
    'faq.questions.2.q': 'Wie funktioniert der Kreditsimulator?',
    'faq.questions.2.a': 'Sie geben Betrag, Laufzeit und Kreditart ein. Sie erhalten sofort eine unverbindliche Schätzung.',
    // Simulator structure
    'simulator.title': 'Kreditrechner',
    'simulator.subtitle': 'Schätzen Sie Ihre monatlichen Raten in wenigen Klicks',
    'simulator.form.loanType': 'Kreditart',
    'simulator.form.amount': 'Gewünschter Betrag (€)',
    'simulator.form.duration': 'Laufzeit (Monate)',
    'simulator.form.calculate': 'Berechnen',
    'simulator.form.reset': 'Zurücksetzen',
    'simulator.result.monthlyPayment': 'Geschätzte Monatsrate',
    'simulator.result.totalRepayment': 'Gesamtrückzahlungsbetrag',
    'simulator.result.interestRate': 'Geschätzter Zinssatz',
    'simulator.result.disclaimer': 'Unverbindliche Schätzung.',
    // Testimonials structure
    'testimonials.title': 'Vertrauen Sie uns',
    'testimonials.subtitle': 'Was unsere zufriedenen Kunden sagen',
    'testimonials.clients.0.name': 'Jean-Marc Rousseau',
    'testimonials.clients.0.location': 'Lyon, Frankreich',
    'testimonials.clients.0.feedback': 'Schneller und seriöser Service. Mein Kredit wurde in 48 Stunden genehmigt. Danke Aurex K-pital!',
    'testimonials.clients.1.name': 'Amélie Blanchard',
    'testimonials.clients.1.location': 'Paris, Frankreich',
    'testimonials.clients.1.feedback': 'Professionelles Team, einfache Plattform und wirklich individuelle Betreuung.',
    'testimonials.clients.2.name': 'Thomas Bonnet',
    'testimonials.clients.2.location': 'Toulouse, Frankreich',
    'testimonials.clients.2.feedback': 'Der Simulator war sehr klar, und ich erhielt bessere Konditionen als bei meiner Bank.',
    // Loan Request structure
    'loanRequest.title': 'Kreditanfrage stellen',
    'loanRequest.subtitle': 'Füllen Sie das Formular aus, um Ihre Anfrage zu starten.',
    'loanRequest.form.fullName': 'Vollständiger Name',
    'loanRequest.form.email': 'E-Mail-Adresse',
    'loanRequest.form.phone': 'Telefonnummer',
    'loanRequest.form.loanType': 'Kredittyp',
    'loanRequest.form.amount': 'Beantragter Betrag (€)',
    'loanRequest.form.duration': 'Gewünschte Laufzeit (Monate)',
    'loanRequest.form.message': 'Nachricht oder Anmerkung (optional)',
    'loanRequest.form.submit': 'Anfrage senden',
    'loanRequest.form.success': 'Ihre Anfrage wurde erfolgreich übermittelt. Wir kontaktieren Sie innerhalb von 24 Stunden.',
    // Careers structure
    'careers.title': 'Werden Sie Teil unseres Teams',
    'careers.subtitle': 'Wir gestalten die Zukunft der europäischen Finanzwelt.',
    'careers.intro': 'Aurex K-pital sucht nach ehrgeizigen Menschen, die sich für FinTech, Innovation und Kundenservice begeistern.',
    'careers.positions.0.title': 'Finanzberater',
    'careers.positions.0.location': 'Paris oder Remote',
    'careers.positions.0.type': 'Vollzeit',
    'careers.positions.0.apply': 'Bewerben',
    'careers.positions.1.title': 'Partnermanager',
    'careers.positions.1.location': 'Lissabon oder Remote',
    'careers.positions.1.type': 'Freiberuflich',
    'careers.positions.1.apply': 'Bewerben',
    'careers.cta': 'Offene Stellen ansehen',
    // Partners structure
    'partners.title': 'Unsere Partner',
    'partners.subtitle': 'Verlässliche Akteure aus Finanz- und Technologiewelt',
    'partners.logosTitle': 'Sie unterstützen uns',
    'partners.cta': 'Partner werden',
    // Legal structure
    'legal.mentions.title': 'Impressum',
    'legal.mentions.content': 'Aurex K-pital ist ein in der Europäischen Union registriertes Unternehmen. Alle rechtlichen Informationen sind auf Anfrage erhältlich.',
    'legal.privacy.title': 'Datenschutzrichtlinie',
    'legal.privacy.content': 'Wir legen großen Wert auf den Schutz Ihrer Daten. Lesen Sie hier unsere vollständige Datenschutzrichtlinie.',
    'legal.terms.title': 'Allgemeine Geschäftsbedingungen',
    'legal.terms.content': 'Die Nutzung dieser Website unterliegt unseren AGB.',
    'legal.gdpr.title': 'Datenschutz (DSGVO)',
    'legal.gdpr.content': 'Gemäß DSGVO haben Sie das Recht auf Zugriff, Berichtigung und Löschung Ihrer personenbezogenen Daten.',
    // Services structure with dot notation for German
    'services.personalLoan.title': 'Persönliche Darlehen',
    'services.personalLoan.description': 'Ultra-personalisierte Finanzierungslösungen mit revolutionären Bedingungen.',
    'services.personalLoan.points.0': 'KI für optimalen Zinssatz',
    'services.personalLoan.points.1': 'Antwort in 2h',
    'services.personalLoan.points.2': 'Maximale Flexibilität',
    'services.personalLoan.cta': 'Entdecken',
    'services.businessLoan.title': 'Business-Finanzierung',
    'services.businessLoan.description': 'Bringen Sie Ihr Unternehmen mit unseren innovativen Lösungen zur Spitze.',
    'services.businessLoan.points.0': 'Express-Finanzierung',
    'services.businessLoan.points.1': 'Expertenbegleitung',
    'services.businessLoan.points.2': 'Maßgeschneiderte Lösungen',
    'services.businessLoan.cta': 'Entdecken',
    'services.investment.title': 'Smart Investments',
    'services.investment.description': 'Vermögensoptimierung mit KI und menschlicher Expertise.',
    'services.investment.points.0': 'Intelligentes Portfolio',
    'services.investment.points.1': 'Premium-Beratung',
    'services.investment.points.2': 'Optimierte Rendite',
    'services.investment.cta': 'Entdecken',
    'services.insurance.title': '360° Versicherung',
    'services.insurance.description': 'Vollständiger und innovativer Schutz für Ihre Lebens- und Geschäftsprojekte.',
    'services.insurance.points.0': 'Vollständige Abdeckung',
    'services.insurance.points.1': '24h Schadensmeldung',
    'services.insurance.points.2': 'Premium-Support',
    'services.insurance.cta': 'Entdecken',
    'services.explore': 'Alle Services erkunden'
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
        simulateBtn: "Symuluj kredyt",
        carousel: {
          text1: "Uruchom swój projekt z Aurex K-pital",
          text2: "Uzyskaj finansowanie bez wkładu własnego",
          text3: "Inwestuj już dziś w swoją przyszłość"
        },
        stats: {
          experience: {
            title: "Lata doskonałości",
            subtitle: "Ciągła innowacja"
          },
          clients: {
            title: "Zadowoleni klienci",
            subtitle: "Gwarantowana satysfakcja"
          },
          funding: {
            title: "Zrealizowane finansowania",
            subtitle: "Transformacyjny wpływ"
          }
        },
        scrollText: "Odkryj"
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
          feature1: "AI dla optymalnej stopy",
          feature2: "Odpowiedź w 2h",
          feature3: "Maksymalna elastyczność"
        },
        businessFinancing: {
          title: "Finansowanie Biznesowe",
          description: "Poprowadź swoją firmę do doskonałości z naszymi innowacyjnymi rozwiązaniami.",
          feature1: "Ekspresowe finansowanie",
          feature2: "Wsparcie eksperta",
          feature3: "Rozwiązania na miarę"
        },
        smartInvestments: {
          title: "Inteligentne Inwestycje",
          description: "Optymalizacja majątku ze sztuczną inteligencją i ludzką ekspertyzą.",
          feature1: "Inteligentne portfolio",
          feature2: "Doradztwo premium",
          feature3: "Zoptymalizowany zwrot"
        },
        insurance360: {
          title: "Ubezpieczenia 360°",
          description: "Kompleksowa i innowacyjna ochrona dla wszystkich projektów życiowych i biznesowych.",
          feature1: "Pełne pokrycie",
          feature2: "Roszczenia w 24h",
          feature3: "Wsparcie premium"
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
        phoneNumber: "+49 40 710 97523",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hamburg, Niemcy"
      }
    },
    services: {
      hero: {
        badge: "Innowacje finansowe od 1997",
        title: "Rozwiązania Finansowe",
        subtitle: "Nowej Generacji",
        description: "Odkryj nasze usługi premium łączące ludzką ekspertyzę i sztuczną inteligencję dla rozwiązań finansowych przewyższających Twoje oczekiwania.",
        simulateBtn: "Symuluj mój projekt",
        requestBtn: "Spersonalizowana prośba"
      },
      main: {
        title: "Nasze Główne Usługi",
        subtitle: "Kompletna gama rozwiązań finansowych dostosowanych do każdej sytuacji",
        featuresLabel: "Główne cechy:",
        useCasesLabel: "Przypadki użycia:",
        learnMoreBtn: "Dowiedz się więcej"
      },
      specialized: {
        title: "Produkty Specjalistyczne",
        subtitle: "Celowe rozwiązania dla konkretnych potrzeb",
        discoverBtn: "Odkryj"
      },
      process: {
        title: "Nasz Proces",
        subtitle: "Strukturalne podejście dla optymalnych rezultatów"
      },
      cta: {
        title: "Gotowy zrealizować swoje projekty?",
        subtitle: "Nasi eksperci towarzyszą Ci w realizacji wszystkich Twoich celów finansowych",
        advisorBtn: "Spotkaj doradcę",
        appointmentBtn: "Umów spotkanie",
        phone: "Telefon:",
        address: "Adres:",
        phoneNumber: "+49 40 710 97523",
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
        simulateBtn: "Simuloi lainaa",
        carousel: {
          text1: "Käynnistä projektisi Aurex K-pipalin kanssa",
          text2: "Hanki rahoitusta ilman omaa panosta",
          text3: "Sijoita tänään tulevaisuuteesi"
        },
        stats: {
          experience: {
            title: "Vuosia huippuosaamista",
            subtitle: "Jatkuva innovaatio"
          },
          clients: {
            title: "Tyytyväisiä asiakkaita",
            subtitle: "Taattu tyytyväisyys"
          },
          funding: {
            title: "Toteutettuja rahoituksia",
            subtitle: "Muokkaava vaikutus"
          }
        },
        scrollText: "Tutustu"
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
          feature1: "AI optimaaliselle korolle",
          feature2: "Vastaus 2h:ssa",
          feature3: "Maksimaalinen joustavuus"
        },
        businessFinancing: {
          title: "Yritysrahoitus",
          description: "Vie yrityksesi huippuun innovatiivisilla ratkaisuillamme.",
          feature1: "Pikirahoitus",
          feature2: "Asiantuntija-apu",
          feature3: "Räätälöidyt ratkaisut"
        },
        smartInvestments: {
          title: "Älykkäät Sijoitukset",
          description: "Varallisuuden optimointi tekoälyn ja ihmisosaamisen avulla.",
          feature1: "Älykäs portfolio",
          feature2: "Premium-neuvonta",
          feature3: "Optimoitu tuotto"
        },
        insurance360: {
          title: "Vakuutukset 360°",
          description: "Täydellinen ja innovatiivinen suoja kaikille elämän- ja liiketoimintaprojekteille.",
          feature1: "Täydellinen kattavuus",
          feature2: "Korvaukset 24h:ssa",
          feature3: "Premium-tuki"
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
        phoneNumber: "+49 40 710 97523",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hampuri, Saksa"
      }
    },
    services: {
      hero: {
        badge: "Rahoitusinnovaatio vuodesta 1997",
        title: "Rahoitusratkaisut",
        subtitle: "Uuden Sukupolven",
        description: "Tutustu premium-palveluihimme, jotka yhdistävät ihmisosaamisen ja tekoälyn rahoitusratkaisuiksi, jotka ylittävät odotuksesi.",
        simulateBtn: "Simuloi projektini",
        requestBtn: "Henkilökohtainen pyyntö"
      },
      main: {
        title: "Pääpalvelumme",
        subtitle: "Täydellinen valikoima rahoitusratkaisuja jokaiseen tilanteeseen",
        featuresLabel: "Pääominaisuudet:",
        useCasesLabel: "Käyttötapaukset:",
        learnMoreBtn: "Lue lisää"
      },
      specialized: {
        title: "Erikoistuotteet",
        subtitle: "Kohdennettuja ratkaisuja erityistarpeisiin",
        discoverBtn: "Tutustu"
      },
      process: {
        title: "Prosessimme",
        subtitle: "Jäsennelty lähestymistapa optimaalisiin tuloksiin"
      },
      cta: {
        title: "Valmis toteuttamaan projektisi?",
        subtitle: "Asiantuntijamme auttavat sinua saavuttamaan kaikki taloudelliset tavoitteesi",
        advisorBtn: "Tapaa neuvonantaja",
        appointmentBtn: "Varaa aika",
        phone: "Puhelin:",
        address: "Osoite:",
        phoneNumber: "+49 40 710 97523",
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
        simulateBtn: "Simular préstamo",
        carousel: {
          text1: "Lanza tu proyecto con Aurex K-pital",
          text2: "Obtén financiación sin aporte",
          text3: "Invierte hoy en tu futuro"
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
        },
        scrollText: "Descubrir"
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
          feature1: "IA para tasa óptima",
          feature2: "Respuesta en 2h",
          feature3: "Flexibilidad máxima"
        },
        businessFinancing: {
          title: "Financiación Empresarial",
          description: "Impulsa tu empresa hacia la excelencia con nuestras soluciones innovadoras.",
          feature1: "Financiación express",
          feature2: "Acompañamiento experto",
          feature3: "Soluciones a medida"
        },
        smartInvestments: {
          title: "Inversiones Inteligentes",
          description: "Optimización patrimonial con inteligencia artificial y experiencia humana.",
          feature1: "Portafolio inteligente",
          feature2: "Asesoramiento premium",
          feature3: "Rendimiento optimizado"
        },
        insurance360: {
          title: "Seguros 360°",
          description: "Protección total e innovadora para todos tus proyectos de vida y negocio.",
          feature1: "Cobertura completa",
          feature2: "Reclamaciones en 24h",
          feature3: "Soporte premium"
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
        phoneNumber: "+49 40 710 97523",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemania"
      }
    },
    // Menu structure
    'menu.home': 'Inicio',
    'menu.services': 'Servicios',
    'menu.simulator': 'Simulador',
    'menu.request': 'Solicitud',
    'menu.about': 'Sobre nosotros',
    'menu.contact': 'Contacto',
    'menu.faq': 'FAQ',
    'menu.careers': 'Carreras',
    'menu.partners': 'Socios',
    'menu.blog': 'Blog',
    // Footer structure
    'footer.tools': 'Herramientas',
    'footer.company': 'Empresa',
    'footer.legal': 'Legal',
    'footer.privacyPolicy': 'Política de privacidad',
    'footer.terms': 'Términos y condiciones',
    'footer.mentions': 'Aviso legal',
    'footer.gdpr': 'RGPD',
    'footer.rights': '© 2024 Aurex K-pital. Todos los derechos reservados.',
    // Simulator structure
    'simulator.title': 'Simulador de crédito',
    'simulator.subtitle': 'Calcula tu cuota mensual en pocos clics',
    'simulator.form.loanType': 'Tipo de crédito',
    'simulator.form.amount': 'Cantidad deseada (€)',
    'simulator.form.duration': 'Duración (meses)',
    'simulator.form.calculate': 'Calcular',
    'simulator.form.reset': 'Restablecer',
    'simulator.result.monthlyPayment': 'Cuota mensual estimada',
    'simulator.result.totalRepayment': 'Monto total a devolver',
    'simulator.result.interestRate': 'Tasa de interés estimada',
    'simulator.result.disclaimer': 'Estimación no vinculante.',
    // Testimonials structure
    'testimonials.title': 'Confían en nosotros',
    'testimonials.subtitle': 'Lo que dicen nuestros clientes satisfechos',
    'testimonials.clients.0.name': 'Jean-Marc Rousseau',
    'testimonials.clients.0.location': 'Lyon, Francia',
    'testimonials.clients.0.feedback': 'Servicio rápido y confiable. ¡Mi crédito fue aprobado en 48 horas! Gracias Aurex K-pital.',
    'testimonials.clients.1.name': 'Amélie Blanchard',
    'testimonials.clients.1.location': 'París, Francia',
    'testimonials.clients.1.feedback': 'Equipo profesional, plataforma clara y una atención realmente personalizada.',
    'testimonials.clients.2.name': 'Thomas Bonnet',
    'testimonials.clients.2.location': 'Toulouse, Francia',
    'testimonials.clients.2.feedback': 'El simulador fue muy claro y obtuve mejores condiciones que en mi banco.',
    // Loan Request structure
    'loanRequest.title': 'Solicitar un crédito',
    'loanRequest.subtitle': 'Rellena el formulario para iniciar tu solicitud',
    'loanRequest.form.fullName': 'Nombre completo',
    'loanRequest.form.email': 'Correo electrónico',
    'loanRequest.form.phone': 'Teléfono',
    'loanRequest.form.loanType': 'Tipo de crédito',
    'loanRequest.form.amount': 'Cantidad solicitada (€)',
    'loanRequest.form.duration': 'Duración deseada (meses)',
    'loanRequest.form.message': 'Mensaje o comentario (opcional)',
    'loanRequest.form.submit': 'Enviar solicitud',
    'loanRequest.form.success': 'Tu solicitud ha sido enviada con éxito. Te contactaremos en un plazo de 24 horas.',
    // Careers structure
    'careers.title': 'Únete a nuestro equipo',
    'careers.subtitle': 'Estamos construyendo el futuro de las finanzas en Europa',
    'careers.intro': 'Aurex K-pital busca personas ambiciosas con pasión por el FinTech, la innovación y el servicio al cliente.',
    'careers.positions.0.title': 'Asesor financiero',
    'careers.positions.0.location': 'París o remoto',
    'careers.positions.0.type': 'Tiempo completo',
    'careers.positions.0.apply': 'Postular',
    'careers.positions.1.title': 'Gestor de socios',
    'careers.positions.1.location': 'Lisboa o remoto',
    'careers.positions.1.type': 'Freelance',
    'careers.positions.1.apply': 'Postular',
    'careers.cta': 'Ver ofertas',
    // Partners structure
    'partners.title': 'Nuestros socios',
    'partners.subtitle': 'Actores confiables del mundo financiero y tecnológico',
    'partners.logosTitle': 'Nos respaldan',
    'partners.cta': 'Convertirse en socio',
    // Legal structure
    'legal.mentions.title': 'Aviso legal',
    'legal.mentions.content': 'Aurex K-pital es una empresa registrada en la Unión Europea. Toda la información legal está disponible previa solicitud.',
    'legal.privacy.title': 'Política de privacidad',
    'legal.privacy.content': 'Valoramos tu privacidad. Consulta nuestra política completa aquí.',
    'legal.terms.title': 'Términos y condiciones',
    'legal.terms.content': 'El uso de este sitio implica la aceptación de nuestros términos y condiciones.',
    'legal.gdpr.title': 'RGPD',
    'legal.gdpr.content': 'De acuerdo con el RGPD, tienes derecho a acceder, rectificar y eliminar tus datos personales.',
    // Services structure
    'services.personalLoan.title': 'Préstamos personales',
    'services.personalLoan.description': 'Soluciones de financiación personalizadas con condiciones revolucionarias.',
    'services.personalLoan.points.0': 'IA para tasas óptimas',
    'services.personalLoan.points.1': 'Respuesta en 2h',
    'services.personalLoan.points.2': 'Máxima flexibilidad',
    'services.personalLoan.cta': 'Descubrir',
    'services.businessLoan.title': 'Financiamiento para empresas',
    'services.businessLoan.description': 'Impulsa tu empresa con nuestras soluciones innovadoras.',
    'services.businessLoan.points.0': 'Financiamiento exprés',
    'services.businessLoan.points.1': 'Acompañamiento experto',
    'services.businessLoan.points.2': 'Soluciones a medida',
    'services.businessLoan.cta': 'Descubrir',
    'services.investment.title': 'Inversiones inteligentes',
    'services.investment.description': 'Optimización patrimonial con inteligencia artificial y experiencia humana.',
    'services.investment.points.0': 'Cartera inteligente',
    'services.investment.points.1': 'Asesoría premium',
    'services.investment.points.2': 'Rendimiento optimizado',
    'services.investment.cta': 'Descubrir',
    'services.insurance.title': 'Seguros 360°',
    'services.insurance.description': 'Protección total e innovadora para todos tus proyectos de vida y negocio.',
    'services.insurance.points.0': 'Cobertura completa',
    'services.insurance.points.1': 'Gestión de reclamos en 24h',
    'services.insurance.points.2': 'Atención premium',
    'services.insurance.cta': 'Descubrir',
    'services.explore': 'Explorar todos nuestros servicios',
    services: {
      hero: {
        badge: "Innovación Financiera desde 1997",
        title: "Soluciones Financieras",
        subtitle: "Nueva Generación",
        description: "Descubre nuestros servicios premium que combinan experiencia humana e inteligencia artificial para soluciones financieras que superan tus expectativas.",
        simulateBtn: "Simular mi proyecto",
        requestBtn: "Solicitud personalizada"
      },
      main: {
        title: "Nuestros Servicios Principales",
        subtitle: "Una gama completa de soluciones financieras adaptadas a cada situación",
        featuresLabel: "Características principales:",
        useCasesLabel: "Casos de uso:",
        learnMoreBtn: "Saber más"
      },
      specialized: {
        title: "Productos Especializados",
        subtitle: "Soluciones dirigidas para necesidades específicas",
        discoverBtn: "Descubrir"
      },
      process: {
        title: "Nuestro Proceso",
        subtitle: "Un enfoque estructurado para resultados óptimos"
      },
      cta: {
        title: "¿Listo para materializar tus proyectos?",
        subtitle: "Nuestros expertos te acompañan en la realización de todos tus objetivos financieros",
        advisorBtn: "Conocer un asesor",
        appointmentBtn: "Pedir cita",
        phone: "Teléfono:",
        address: "Dirección:",
        phoneNumber: "+49 40 710 97523",
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
        simulateBtn: "Simular empréstimo",
        carousel: {
          text1: "Lance seu projeto com Aurex K-pital",
          text2: "Obtenha financiamento sem aporte",
          text3: "Invista hoje em seu futuro"
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
        },
        scrollText: "Descobrir"
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
          feature1: "IA para taxa ótima",
          feature2: "Resposta em 2h",
          feature3: "Flexibilidade máxima"
        },
        businessFinancing: {
          title: "Financiamento Empresarial",
          description: "Impulsione sua empresa rumo à excelência com nossas soluções inovadoras.",
          feature1: "Financiamento expresso",
          feature2: "Acompanhamento especializado",
          feature3: "Soluções sob medida"
        },
        smartInvestments: {
          title: "Investimentos Inteligentes",
          description: "Otimização patrimonial com inteligência artificial e expertise humana.",
          feature1: "Portfólio inteligente",
          feature2: "Consultoria premium",
          feature3: "Retorno otimizado"
        },
        insurance360: {
          title: "Seguros 360°",
          description: "Proteção total e inovadora para todos os seus projetos de vida e negócios.",
          feature1: "Cobertura completa",
          feature2: "Sinistros em 24h",
          feature3: "Suporte premium"
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
        phoneNumber: "+49 40 710 97523",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemanha"
      }
    },
    services: {
      hero: {
        badge: "Inovação Financeira desde 1997",
        title: "Soluções Financeiras",
        subtitle: "Nova Geração",
        description: "Descubra nossos serviços premium que combinam expertise humana e inteligência artificial para soluções financeiras que superam suas expectativas.",
        simulateBtn: "Simular meu projeto",
        requestBtn: "Solicitação personalizada"
      },
      main: {
        title: "Nossos Principais Serviços",
        subtitle: "Uma gama completa de soluções financeiras adaptadas a cada situação",
        featuresLabel: "Características principais:",
        useCasesLabel: "Casos de uso:",
        learnMoreBtn: "Saiba mais"
      },
      specialized: {
        title: "Produtos Especializados",
        subtitle: "Soluções direcionadas para necessidades específicas",
        discoverBtn: "Descobrir"
      },
      process: {
        title: "Nosso Processo",
        subtitle: "Uma abordagem estruturada para resultados ótimos"
      },
      cta: {
        title: "Pronto para concretizar seus projetos?",
        subtitle: "Nossos especialistas o acompanham na realização de todos os seus objetivos financeiros",
        advisorBtn: "Conhecer um consultor",
        appointmentBtn: "Marcar consulta",
        phone: "Telefone:",
        address: "Endereço:",
        phoneNumber: "+49 40 710 97523",
        addressText: "Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemanha"
      }
    },
    // Services structure with dot notation for Portuguese
    'services.personalLoan.title': 'Empréstimos Pessoais',
    'services.personalLoan.description': 'Soluções de financiamento ultra-personalizadas com condições revolucionárias.',
    'services.personalLoan.points.0': 'IA para taxa ideal',
    'services.personalLoan.points.1': 'Resposta em 2h',
    'services.personalLoan.points.2': 'Máxima flexibilidade',
    'services.personalLoan.cta': 'Descobrir',
    'services.businessLoan.title': 'Financiamentos Pro',
    'services.businessLoan.description': 'Impulsione sua empresa com nossas soluções inovadoras.',
    'services.businessLoan.points.0': 'Financiamento expresso',
    'services.businessLoan.points.1': 'Acompanhamento especializado',
    'services.businessLoan.points.2': 'Soluções sob medida',
    'services.businessLoan.cta': 'Descobrir',
    'services.investment.title': 'Investimentos Inteligentes',
    'services.investment.description': 'Otimização patrimonial com inteligência artificial e expertise humana.',
    'services.investment.points.0': 'Portfólio inteligente',
    'services.investment.points.1': 'Consultoria premium',
    'services.investment.points.2': 'Retorno otimizado',
    'services.investment.cta': 'Descobrir',
    'services.insurance.title': 'Seguros 360°',
    'services.insurance.description': 'Proteção total e inovadora para seus projetos de vida e negócios.',
    'services.insurance.points.0': 'Cobertura completa',
    'services.insurance.points.1': 'Atendimento em 24h',
    'services.insurance.points.2': 'Suporte premium',
    'services.insurance.cta': 'Descobrir',
    'services.explore': 'Explorar todos os serviços',
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
        simulateBtn: "Προσομοιώστε δάνειο",
        carousel: {
          text1: "Ξεκινήστε το έργο σας με την Aurex K-pital",
          text2: "Αποκτήστε χρηματοδότηση χωρίς ίδια κεφάλαια",
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
            subtitle: "Μετασχηματιστικός αντίκτυπος"
          }
        },
        scrollText: "Ανακαλύψτε"
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
          feature1: "AI για βέλτιστο επιτόκιο",
          feature2: "Απάντηση σε 2ω",
          feature3: "Μέγιστη ευελιξία"
        },
        businessFinancing: {
          title: "Επιχειρηματική Χρηματοδότηση",
          description: "Προωθήστε την επιχείρησή σας στην αριστεία με τις καινοτόμες μας λύσεις.",
          feature1: "Εξπρές χρηματοδότηση",
          feature2: "Εξειδικευμένη συνοδεία",
          feature3: "Εξατομικευμένες λύσεις"
        },
        smartInvestments: {
          title: "Έξυπνες Επενδύσεις",
          description: "Βελτιστοποίηση περιουσίας με τεχνητή νοημοσύνη και ανθρώπινη εμπειρογνωμοσύνη.",
          feature1: "Έξυπνο χαρτοφυλάκιο",
          feature2: "Premium συμβουλές",
          feature3: "Βελτιστοποιημένη απόδοση"
        },
        insurance360: {
          title: "Ασφάλειες 360°",
          description: "Ολική και καινοτόμα προστασία για όλα τα έργα ζωής και επιχείρησής σας.",
          feature1: "Πλήρης κάλυψη",
          feature2: "Αποζημιώσεις σε 24ω",
          feature3: "Premium υποστήριξη"
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
        phoneNumber: "+49 40 710 97523",
        addressText: "Irma-Keilhack-Ring 24, 22145 Αμβούργο, Γερμανία"
      }
    },
    services: {
      hero: {
        badge: "Χρηματοοικονομική Καινοτομία από το 1997",
        title: "Χρηματοοικονομικές Λύσεις",
        subtitle: "Νέας Γενιάς",
        description: "Ανακαλύψτε τις premium υπηρεσίες μας που συνδυάζουν ανθρώπινη εμπειρογνωμοσύνη και τεχνητή νοημοσύνη για χρηματοοικονομικές λύσεις που ξεπερνούν τις προσδοκίες σας.",
        simulateBtn: "Προσομοιώστε το έργο μου",
        requestBtn: "Εξατομικευμένη αίτηση"
      },
      main: {
        title: "Οι Κύριες Υπηρεσίες Μας",
        subtitle: "Μια πλήρης γκάμα χρηματοοικονομικών λύσεων προσαρμοσμένη σε κάθε κατάσταση",
        featuresLabel: "Κύρια χαρακτηριστικά:",
        useCasesLabel: "Περιπτώσεις χρήσης:",
        learnMoreBtn: "Μάθετε περισσότερα"
      },
      specialized: {
        title: "Εξειδικευμένα Προϊόντα",
        subtitle: "Στοχευμένες λύσεις για συγκεκριμένες ανάγκες",
        discoverBtn: "Ανακαλύψτε"
      },
      process: {
        title: "Η Διαδικασία Μας",
        subtitle: "Μια δομημένη προσέγγιση για βέλτιστα αποτελέσματα"
      },
      cta: {
        title: "Έτοιμοι να υλοποιήσετε τα έργα σας;",
        subtitle: "Οι ειδικοί μας σας συνοδεύουν στην υλοποίηση όλων των χρηματοοικονομικών σας στόχων",
        advisorBtn: "Συναντήστε έναν σύμβουλο",
        appointmentBtn: "Κλείστε ραντεβού",
        phone: "Τηλέφωνο:",
        address: "Διεύθυνση:",
        phoneNumber: "+49 40 710 97523",
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
        simulateBtn: "Simula prestito",
        carousel: {
          text1: "Lancia il tuo progetto con Aurex K-pital",
          text2: "Ottieni finanziamenti senza contributo",
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
        },
        scrollText: "Scopri"
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
          feature1: "IA per tasso ottimale",
          feature2: "Risposta in 2h",
          feature3: "Flessibilità massima"
        },
        businessFinancing: {
          title: "Finanziamenti Aziendali",
          description: "Porta la tua azienda verso l'eccellenza con le nostre soluzioni innovative.",
          feature1: "Finanziamento express",
          feature2: "Accompagnamento esperto",
          feature3: "Soluzioni su misura"
        },
        smartInvestments: {
          title: "Investimenti Smart",
          description: "Ottimizzazione patrimoniale con intelligenza artificiale e competenza umana.",
          feature1: "Portfolio intelligente",
          feature2: "Consulenza premium",
          feature3: "Rendimento ottimizzato"
        },
        insurance360: {
          title: "Assicurazioni 360°",
          description: "Protezione totale e innovativa per tutti i tuoi progetti di vita e business.",
          feature1: "Copertura completa",
          feature2: "Sinistri in 24h",
          feature3: "Supporto premium"
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
        phoneNumber: "+49 40 710 97523",
        addressText: "Irma-Keilhack-Ring 24, 22145 Amburgo, Germania"
      }
    },
    services: {
      hero: {
        badge: "Innovazione Finanziaria dal 1997",
        title: "Soluzioni Finanziarie",
        subtitle: "Nuova Generazione",
        description: "Scopri i nostri servizi premium che combinano competenza umana e intelligenza artificiale per soluzioni finanziarie che superano le tue aspettative.",
        simulateBtn: "Simula il mio progetto",
        requestBtn: "Richiesta personalizzata"
      },
      main: {
        title: "I Nostri Servizi Principali",
        subtitle: "Una gamma completa di soluzioni finanziarie adattate a ogni situazione",
        featuresLabel: "Caratteristiche principali:",
        useCasesLabel: "Casi d'uso:",
        learnMoreBtn: "Scopri di più"
      },
      specialized: {
        title: "Prodotti Specializzati",
        subtitle: "Soluzioni mirate per esigenze specifiche",
        discoverBtn: "Scopri"
      },
      process: {
        title: "Il Nostro Processo",
        subtitle: "Un approccio strutturato per risultati ottimali"
      },
      cta: {
        title: "Pronto a concretizzare i tuoi progetti?",
        subtitle: "I nostri esperti ti accompagnano nella realizzazione di tutti i tuoi obiettivi finanziari",
        advisorBtn: "Incontra un consulente",
        appointmentBtn: "Prenota appuntamento",
        phone: "Telefono:",
        address: "Indirizzo:",
        phoneNumber: "+49 40 710 97523",
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