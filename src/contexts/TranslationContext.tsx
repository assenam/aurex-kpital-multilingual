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

  const changeLanguage = useCallback((newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  }, []);

  const getTranslation = useCallback((key: string): string => {
    const cacheKey = `${language}:${key}`;
    const cached = translationCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    // Fallback to French if translation not found
    const fallbackKey = `fr:${key}`;
    const fallback = translationCache.get(fallbackKey);
    return fallback || key;
  }, [language]);

  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    changeLanguage,
    isLoading,
    t: getTranslation,
  }), [language, changeLanguage, isLoading, getTranslation]);

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
    nav: {
      home: "Accueil",
      services: "Services",
      about: "À propos",
      careers: "Carrières",
      partners: "Partenaires",
      contact: "Contact",
      faq: "FAQ",
      privacyPolicy: "Politique de confidentialité",
      legal: "Mentions légales",
      simulator: "Simulateur",
      request: "Demande",
      login: "Connexion",
      signup: "Inscription"
    },
    hero: {
      badge: "Leader Européen du Financement",
      title: "Concrétisez vos projets avec",
      titleHighlight: "les meilleurs financements",
      subtitle: "Des solutions sur-mesure pour professionnels et particuliers, avec notre IA révolutionnaire et l'expertise de nos conseillers certifiés.",
      cta: "Découvrir nos solutions",
      learnMore: "En savoir plus",
      stats: {
        clients: { value: "50K+", label: "Clients satisfaits" },
        funding: { value: "2.8M€", label: "Financements accordés" },
        satisfaction: { value: "98%", label: "Taux de satisfaction" }
      }
    },
    services: {
      title: "Nos Services",
      subtitle: "Des solutions complètes pour tous vos besoins de financement",
      cta: "Découvrir",
      items: {
        business: {
          title: "Financement Professionnel",
          description: "Solutions adaptées aux entreprises et entrepreneurs"
        },
        personal: {
          title: "Crédit Personnel",
          description: "Financements pour vos projets personnels"
        },
        real_estate: {
          title: "Immobilier",
          description: "Prêts immobiliers et investissements locatifs"
        },
        investment: {
          title: "Investissement",
          description: "Conseils et solutions d'investissement personnalisées"
        }
      }
    },
    testimonials: {
      title: "Ils nous font confiance",
      subtitle: "Découvrez les témoignages de nos clients satisfaits",
      items: [
        {
          quote: "Service exceptionnel ! J'ai obtenu mon financement en 48h.",
          author: "Marie Dubois",
          company: "Entrepreneuse"
        },
        {
          quote: "Équipe professionnelle et solutions sur-mesure parfaites.",
          author: "Jean Martin",
          company: "PDG, TechCorp"
        },
        {
          quote: "Accompagnement de qualité du début à la fin du projet.",
          author: "Sophie Laurent",
          company: "Directrice Financière"
        }
      ]
    },
    cta: {
      title: "Prêt à concrétiser votre projet ?",
      subtitle: "Obtenez une étude personnalisée en moins de 24h",
      button: "Commencer ma demande",
      contact: "Nous contacter"
    },
    footer: {
      company: {
        name: "Aurex K-pital",
        description: "Expert en financement depuis 2015"
      },
      links: {
        services: "Services",
        about: "À propos",
        careers: "Carrières",
        partners: "Partenaires",
        contact: "Contact",
        faq: "FAQ",
        privacy: "Politique de confidentialité",
        legal: "Mentions légales",
        terms: "CGU",
        gdpr: "RGPD"
      },
      contact: {
        phone: "+33 7 59 28 20 04",
        email: "contact@aurex-kpital.de",
        address: "Irma-Keilhack-Ring 24, 22145 Hamburg"
      },
      social: {
        linkedin: "LinkedIn",
        twitter: "Twitter",
        facebook: "Facebook"
      },
      copyright: "© 2024 Aurex K-pital. Tous droits réservés."
    },
    request: {
      hero: {
        badge: "Demande de Financement",
        title: "Votre projet mérite",
        titleHighlight: "le meilleur financement",
        subtitle: "Obtenez une réponse personnalisée en 24h grâce à notre IA avancée et l'expertise de nos conseillers",
        stats: {
          responseTime: { value: "24h", label: "Réponse garantie" },
          security: { value: "100%", label: "Sécurisé RGPD" },
          expert: { value: "24/7", label: "Support expert" }
        }
      }
    },
    privacy: {
      title: "Politique de confidentialité",
      description: "Protection et traitement de vos données personnelles",
      lastUpdate: "Dernière mise à jour : 1er décembre 2024",
      compliance: "Cette politique est conforme au RGPD et aux réglementations européennes en vigueur.",
      sections: {
        controller: {
          title: "1. Responsable du traitement",
          content: "Aurex K-pital GmbH, immatriculée sous le numéro HRB 147852 au registre du commerce de Hambourg, ayant son siège social au Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne.\n\nDélégué à la protection des données : privacy@aurex-kpital.de"
        },
        dataCollected: {
          title: "2. Données collectées",
          content: "Nous collectons les catégories de données suivantes :\n• Données d'identification : nom, prénom, date de naissance, nationalité\n• Données de contact : adresse postale, email, téléphone\n• Données financières : revenus, patrimoine, historique bancaire\n• Données de connexion : adresse IP, cookies, logs de navigation\n• Données comportementales : interactions avec nos services"
        },
        purposes: {
          title: "3. Finalités du traitement",
          content: "Vos données sont traitées pour :\n• La fourniture de nos services financiers\n• L'évaluation de votre solvabilité\n• La prévention de la fraude et du blanchiment\n• Le respect de nos obligations légales\n• L'amélioration de nos services\n• La communication commerciale (avec votre consentement)"
        },
        legalBasis: {
          title: "4. Base légale",
          content: "Le traitement de vos données repose sur :\n• L'exécution d'un contrat ou de mesures précontractuelles\n• Le respect d'obligations légales (LCB-FT, MiFID II)\n• Notre intérêt légitime pour la prévention de la fraude\n• Votre consentement pour les communications marketing"
        },
        dataSharing: {
          title: "5. Partage des données",
          content: "Nous partageons vos données uniquement avec :\n• Nos partenaires bancaires et financiers agréés\n• Les autorités de contrôle (ACPR, AMF) sur demande\n• Nos prestataires techniques sous contrat strict\n• Les organismes de crédit pour vérifications\nAucune donnée n'est vendue à des tiers."
        },
        retention: {
          title: "6. Conservation des données",
          content: "Durées de conservation :\n• Données clients actifs : pendant la relation contractuelle + 5 ans\n• Données prospects : 3 ans maximum\n• Données de conformité : 5 ans après fin de relation\n• Logs de connexion : 1 an\n• Documents KYC : 5 ans après fin de relation"
        },
        rights: {
          title: "7. Vos droits",
          content: "Conformément au RGPD, vous disposez des droits suivants :\n• Droit d'accès : obtenir une copie de vos données\n• Droit de rectification : corriger les données inexactes\n• Droit à l'effacement : supprimer vos données (sous conditions)\n• Droit à la limitation : restreindre le traitement\n• Droit à la portabilité : récupérer vos données\n• Droit d'opposition : vous opposer au traitement\n• Droit de retrait du consentement\nPour exercer vos droits : privacy@aurex-kpital.de"
        },
        security: {
          title: "8. Sécurité",
          content: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées :\n• Chiffrement des données (AES-256)\n• Accès restreint et contrôlé\n• Surveillance continue des systèmes\n• Formation régulière des employés\n• Audits de sécurité périodiques"
        },
        transfers: {
          title: "9. Transferts internationaux",
          content: "Certaines données peuvent être transférées vers des pays tiers avec des garanties appropriées (clauses contractuelles types, décisions d'adéquation de la Commission européenne)."
        },
        contact: {
          title: "10. Contact",
          content: "Pour toute question relative à cette politique de confidentialité :\n• Email : privacy@aurex-kpital.de\n• Adresse : Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne\n• Téléphone : +33759282004"
        }
      }
    },
    terms: {
      title: "Conditions Générales d'Utilisation",
      description: "Règles d'utilisation de nos services et plateforme",
      sections: {
        article1: {
          title: "Article 1 - Objet",
          content: "Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation des services proposés par Aurex K-pital GmbH via sa plateforme numérique et ses canaux de distribution."
        },
        article2: {
          title: "Article 2 - Acceptation des conditions",
          content: "L'utilisation de nos services implique l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser nos services."
        },
        article3: {
          title: "Article 3 - Services proposés",
          content: "Aurex K-pital propose les services suivants :\n• Intermédiation en opérations de banque\n• Conseil en investissements financiers\n• Intermédiation en assurance\n• Services de gestion de patrimoine\n• Outils de simulation et d'analyse"
        }
      }
    },
    gdpr: {
      title: "Conformité RGPD",
      description: "Notre engagement pour la protection de vos données personnelles"
    },
    mentions: {
      title: "Mentions Légales",
      description: "Informations sur l'entreprise et responsabilités légales",
      company: {
        title: "Identification de l'entreprise",
        name: "Raison sociale : Aurex K-pital GmbH",
        type: "Forme juridique : Société à responsabilité limitée (GmbH)",
        capital: "Capital social : 2 500 000 €",
        address: "Siège social : Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne",
        register: "Registre du commerce : Hamburg HRB 147852",
        vat: "N° TVA intracommunautaire : DE 312 456 789",
        siren: "Numéro SIREN : 523 456 789"
      },
      management: {
        title: "Direction",
        ceo: "Dirigeant : Dr. Klaus Müller",
        cio: "Directrice de l'innovation : Sophie Laurent",
        cro: "Directeur des risques : Marco Antonelli"
      },
      activity: {
        title: "Activité",
        description: "Aurex K-pital est un établissement financier agréé par la BaFin (Autorité fédérale de surveillance financière) sous le numéro d'agrément 147-FS-2015. Nos activités comprennent :",
        services: {
          banking: "Intermédiation en opérations de banque et services de paiement",
          investment: "Conseil en investissement",
          insurance: "Intermédiation en assurance",
          wealth: "Services de gestion de patrimoine"
        }
      },
      contact: {
        title: "Contact",
        phone: "Téléphone : +33759282004",
        email: "Email : contact@aurex-kpital.de",
        hours: "Horaires : Lundi-Vendredi 8h-19h, Samedi 9h-17h"
      },
      hosting: {
        title: "Hébergement",
        description: "Ce site est hébergé par :",
        company: "Amazon Web Services EMEA SARL\n38 Avenue John F. Kennedy, L-1855 Luxembourg\nTéléphone : +33759282004"
      },
      intellectual: {
        title: "Propriété intellectuelle",
        description: "Tous les contenus présents sur ce site (textes, images, logos, graphiques, etc.) sont protégés par le droit d'auteur et appartiennent à Aurex K-pital ou à ses partenaires. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable."
      },
      responsibility: {
        title: "Responsabilité",
        description: "Aurex K-pital s'efforce de fournir des informations précises et à jour. Cependant, l'entreprise ne peut garantir l'exactitude, l'exhaustivité ou l'actualité des informations diffusées sur ce site. L'utilisation des informations se fait sous la seule responsabilité de l'utilisateur."
      }
    }
  },
  de: {
    nav: {
      home: "Startseite",
      services: "Dienstleistungen",
      about: "Über uns",
      careers: "Karriere",
      partners: "Partner",
      contact: "Kontakt",
      faq: "FAQ",
      privacyPolicy: "Datenschutzrichtlinie",
      legal: "Impressum",
      simulator: "Simulator",
      request: "Anfrage",
      login: "Anmeldung",
      signup: "Registrierung"
    },
    hero: {
      badge: "Europäischer Marktführer in der Finanzierung",
      title: "Verwirklichen Sie Ihre Projekte mit",
      titleHighlight: "den besten Finanzierungen",
      subtitle: "Maßgeschneiderte Lösungen für Profis und Privatpersonen mit unserer revolutionären KI und der Expertise unserer zertifizierten Berater.",
      cta: "Unsere Lösungen entdecken",
      learnMore: "Mehr erfahren",
      stats: {
        clients: { value: "50K+", label: "Zufriedene Kunden" },
        funding: { value: "2.8M€", label: "Bewilligte Finanzierungen" },
        satisfaction: { value: "98%", label: "Zufriedenheitsrate" }
      }
    },
    services: {
      title: "Unsere Dienstleistungen",
      subtitle: "Komplette Lösungen für alle Ihre Finanzierungsbedürfnisse",
      cta: "Entdecken",
      items: {
        business: {
          title: "Unternehmensfinanzierung",
          description: "Lösungen für Unternehmen und Unternehmer"
        },
        personal: {
          title: "Privatkredit",
          description: "Finanzierungen für Ihre persönlichen Projekte"
        },
        real_estate: {
          title: "Immobilien",
          description: "Immobiliendarlehen und Mietinvestitionen"
        },
        investment: {
          title: "Investment",
          description: "Personalisierte Anlageberatung und -lösungen"
        }
      }
    },
    testimonials: {
      title: "Sie vertrauen uns",
      subtitle: "Entdecken Sie die Testimonials unserer zufriedenen Kunden",
      items: [
        {
          quote: "Außergewöhnlicher Service! Ich erhielt meine Finanzierung in 48 Stunden.",
          author: "Marie Dubois",
          company: "Unternehmerin"
        },
        {
          quote: "Professionelles Team und perfekte maßgeschneiderte Lösungen.",
          author: "Jean Martin",
          company: "CEO, TechCorp"
        },
        {
          quote: "Qualitätsbegleitung vom Anfang bis zum Ende des Projekts.",
          author: "Sophie Laurent",
          company: "Finanzleiterin"
        }
      ]
    },
    cta: {
      title: "Bereit, Ihr Projekt zu verwirklichen?",
      subtitle: "Erhalten Sie eine personalisierte Studie in weniger als 24 Stunden",
      button: "Meinen Antrag starten",
      contact: "Kontaktieren Sie uns"
    },
    footer: {
      company: {
        name: "Aurex K-pital",
        description: "Finanzierungsexperte seit 2015"
      },
      links: {
        services: "Dienstleistungen",
        about: "Über uns",
        careers: "Karriere",
        partners: "Partner",
        contact: "Kontakt",
        faq: "FAQ",
        privacy: "Datenschutzrichtlinie",
        legal: "Impressum",
        terms: "AGB",
        gdpr: "DSGVO"
      },
      contact: {
        phone: "+33 7 59 28 20 04",
        email: "contact@aurex-kpital.de",
        address: "Irma-Keilhack-Ring 24, 22145 Hamburg"
      },
      social: {
        linkedin: "LinkedIn",
        twitter: "Twitter",
        facebook: "Facebook"
      },
      copyright: "© 2024 Aurex K-pital. Alle Rechte vorbehalten."
    },
    request: {
      hero: {
        badge: "Finanzierungsantrag",
        title: "Ihr Projekt verdient",
        titleHighlight: "die beste Finanzierung",
        subtitle: "Erhalten Sie eine personalisierte Antwort in 24 Stunden dank unserer fortschrittlichen KI und der Expertise unserer Berater",
        stats: {
          responseTime: { value: "24h", label: "Garantierte Antwort" },
          security: { value: "100%", label: "DSGVO-sicher" },
          expert: { value: "24/7", label: "Expertenunterstützung" }
        }
      }
    },
    privacy: {
      title: "Datenschutzrichtlinie",
      description: "Schutz und Verarbeitung Ihrer persönlichen Daten",
      lastUpdate: "Letzte Aktualisierung: 1. Dezember 2024",
      compliance: "Diese Richtlinie entspricht der DSGVO und den geltenden europäischen Bestimmungen.",
      sections: {
        controller: {
          title: "1. Verantwortlicher",
          content: "Aurex K-pital GmbH, eingetragen unter der Nummer HRB 147852 im Handelsregister Hamburg, mit Sitz in Irma-Keilhack-Ring 24, 22145 Hamburg, Deutschland.\n\nDatenschutzbeauftragter: privacy@aurex-kpital.de"
        },
        dataCollected: {
          title: "2. Erhobene Daten",
          content: "Wir erheben folgende Datenkategorien:\n• Identifikationsdaten: Name, Vorname, Geburtsdatum, Nationalität\n• Kontaktdaten: Postanschrift, E-Mail, Telefon\n• Finanzdaten: Einkommen, Vermögen, Bankhistorie\n• Verbindungsdaten: IP-Adresse, Cookies, Navigationsprotokolle\n• Verhaltensdaten: Interaktionen mit unseren Diensten"
        },
        purposes: {
          title: "3. Zwecke der Verarbeitung",
          content: "Ihre Daten werden verarbeitet für:\n• Die Erbringung unserer Finanzdienstleistungen\n• Die Bewertung Ihrer Kreditwürdigkeit\n• Die Prävention von Betrug und Geldwäsche\n• Die Erfüllung unserer gesetzlichen Verpflichtungen\n• Die Verbesserung unserer Dienste\n• Kommerzielle Kommunikation (mit Ihrer Einwilligung)"
        },
        legalBasis: {
          title: "4. Rechtsgrundlage",
          content: "Die Verarbeitung Ihrer Daten basiert auf:\n• Der Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen\n• Der Erfüllung gesetzlicher Verpflichtungen (GwG, MiFID II)\n• Unserem berechtigten Interesse zur Betrugsprävention\n• Ihrer Einwilligung für Marketing-Kommunikation"
        },
        dataSharing: {
          title: "5. Datenweitergabe",
          content: "Wir teilen Ihre Daten nur mit:\n• Unseren zugelassenen Bank- und Finanzpartnern\n• Aufsichtsbehörden (BaFin, Bundesbank) auf Anfrage\n• Unseren technischen Dienstleistern unter strengen Verträgen\n• Kreditinstituten für Prüfungen\nKeine Daten werden an Dritte verkauft."
        },
        retention: {
          title: "6. Speicherdauer",
          content: "Aufbewahrungsfristen:\n• Daten aktiver Kunden: während der Vertragsbeziehung + 5 Jahre\n• Interessentendaten: maximal 3 Jahre\n• Compliance-Daten: 5 Jahre nach Beziehungsende\n• Verbindungsprotokolle: 1 Jahr\n• KYC-Dokumente: 5 Jahre nach Beziehungsende"
        },
        rights: {
          title: "7. Ihre Rechte",
          content: "Gemäß DSGVO haben Sie folgende Rechte:\n• Auskunftsrecht: eine Kopie Ihrer Daten erhalten\n• Berichtigungsrecht: unrichtige Daten korrigieren\n• Löschungsrecht: Ihre Daten löschen (unter Bedingungen)\n• Einschränkungsrecht: Verarbeitung beschränken\n• Datenübertragbarkeit: Ihre Daten abrufen\n• Widerspruchsrecht: der Verarbeitung widersprechen\n• Widerruf der Einwilligung\nZur Ausübung Ihrer Rechte: privacy@aurex-kpital.de"
        },
        security: {
          title: "8. Sicherheit",
          content: "Wir setzen angemessene technische und organisatorische Maßnahmen um:\n• Datenverschlüsselung (AES-256)\n• Beschränkter und kontrollierter Zugang\n• Kontinuierliche Systemüberwachung\n• Regelmäßige Mitarbeiterschulungen\n• Periodische Sicherheitsaudits"
        },
        transfers: {
          title: "9. Internationale Übertragungen",
          content: "Bestimmte Daten können in Drittländer mit angemessenen Garantien übertragen werden (Standardvertragsklauseln, Angemessenheitsbeschlüsse der Europäischen Kommission)."
        },
        contact: {
          title: "10. Kontakt",
          content: "Für Fragen zu dieser Richtlinie:\nE-Mail: privacy@aurex-kpital.de\nPost: Aurex K-pital - DPO, Irma-Keilhack-Ring 24, 22145 Hamburg, Deutschland\nSie haben auch das Recht, eine Beschwerde bei der zuständigen Aufsichtsbehörde einzureichen (CNIL in Frankreich, BfDI in Deutschland)."
        }
      }
    },
    terms: {
      title: "Allgemeine Geschäftsbedingungen",
      description: "Nutzungsregeln für unsere Dienste und Plattform",
      sections: {
        article1: {
          title: "Artikel 1 - Gegenstand",
          content: "Diese Allgemeinen Geschäftsbedingungen (AGB) regeln den Zugang und die Nutzung der von Aurex K-pital GmbH über ihre digitale Plattform und Vertriebskanäle angebotenen Dienste."
        }
      }
    },
    gdpr: {
      title: "DSGVO-Konformität",
      description: "Unser Engagement für den Schutz Ihrer persönlichen Daten"
    },
    mentions: {
      title: "Impressum",
      description: "Informationen über das Unternehmen und rechtliche Verantwortlichkeiten",
      company: {
        title: "Unternehmensidentifikation",
        name: "Firmenname: Aurex K-pital GmbH",
        type: "Rechtsform: Gesellschaft mit beschränkter Haftung (GmbH)",
        capital: "Stammkapital: 2.500.000 €",
        address: "Hauptsitz: Irma-Keilhack-Ring 24, 22145 Hamburg, Deutschland",
        register: "Handelsregister: Hamburg HRB 147852",
        vat: "USt-IdNr.: DE 312 456 789",
        siren: "SIREN-Nummer: 523 456 789"
      },
      management: {
        title: "Geschäftsführung",
        ceo: "Geschäftsführer: Dr. Klaus Müller",
        cio: "Innovationsdirektorin: Sophie Laurent",
        cro: "Risikodirektor: Marco Antonelli"
      },
      activity: {
        title: "Tätigkeit",
        description: "Aurex K-pital ist ein von der BaFin (Bundesanstalt für Finanzdienstleistungsaufsicht) unter der Zulassungsnummer 147-FS-2015 zugelassenes Finanzinstitut.",
        services: {
          banking: "Vermittlung von Bankgeschäften und Zahlungsdienstleistungen",
          investment: "Anlageberatung",
          insurance: "Versicherungsvermittlung",
          wealth: "Vermögensverwaltungsdienstleistungen"
        }
      },
      contact: {
        title: "Kontakt",
        phone: "Telefon: +33759282004",
        email: "E-Mail: contact@aurex-kpital.de",
        hours: "Öffnungszeiten: Montag-Freitag 8-19 Uhr, Samstag 9-17 Uhr"
      },
      hosting: {
        title: "Hosting",
        description: "Diese Website wird gehostet von:",
        company: "Amazon Web Services EMEA SARL\n38 Avenue John F. Kennedy, L-1855 Luxemburg\nTelefon: +33759282004"
      },
      intellectual: {
        title: "Geistiges Eigentum",
        description: "Alle auf dieser Website enthaltenen Inhalte (Texte, Bilder, Logos, Grafiken usw.) sind urheberrechtlich geschützt und gehören Aurex K-pital oder seinen Partnern. Jede Vervielfältigung, auch auszugsweise, ist ohne vorherige schriftliche Genehmigung untersagt."
      },
      responsibility: {
        title: "Haftung",
        description: "Aurex K-pital bemüht sich, genaue und aktuelle Informationen bereitzustellen. Das Unternehmen kann jedoch nicht die Richtigkeit, Vollständigkeit oder Aktualität der auf dieser Website verbreiteten Informationen garantieren. Die Nutzung der Informationen erfolgt ausschließlich auf eigene Verantwortung des Nutzers."
      }
    }
  },
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      about: "Acerca de",
      careers: "Carreras",
      partners: "Socios",
      contact: "Contacto",
      faq: "FAQ",
      privacyPolicy: "Política de privacidad",
      legal: "Aviso legal",
      simulator: "Simulador",
      request: "Solicitud",
      login: "Iniciar sesión",
      signup: "Registro"
    },
    hero: {
      badge: "Líder Europeo en Financiación",
      title: "Haz realidad tus proyectos con",
      titleHighlight: "las mejores financiaciones",
      subtitle: "Soluciones a medida para profesionales y particulares, con nuestra IA revolucionaria y la experiencia de nuestros asesores certificados.",
      cta: "Descubrir nuestras soluciones",
      learnMore: "Saber más",
      stats: {
        clients: { value: "50K+", label: "Clientes satisfechos" },
        funding: { value: "2.8M€", label: "Financiaciones otorgadas" },
        satisfaction: { value: "98%", label: "Tasa de satisfacción" }
      }
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Soluciones completas para todas sus necesidades de financiación",
      cta: "Descubrir",
      items: {
        business: {
          title: "Financiación Profesional",
          description: "Soluciones adaptadas a empresas y emprendedores"
        },
        personal: {
          title: "Crédito Personal",
          description: "Financiaciones para tus proyectos personales"
        },
        real_estate: {
          title: "Inmobiliario",
          description: "Préstamos inmobiliarios e inversiones de alquiler"
        },
        investment: {
          title: "Inversión",
          description: "Asesoramiento y soluciones de inversión personalizadas"
        }
      }
    },
    testimonials: {
      title: "Confían en nosotros",
      subtitle: "Descubre los testimonios de nuestros clientes satisfechos",
      items: [
        {
          quote: "¡Servicio excepcional! Obtuve mi financiación en 48h.",
          author: "Marie Dubois",
          company: "Emprendedora"
        },
        {
          quote: "Equipo profesional y soluciones a medida perfectas.",
          author: "Jean Martin",
          company: "CEO, TechCorp"
        },
        {
          quote: "Acompañamiento de calidad del inicio al fin del proyecto.",
          author: "Sophie Laurent",
          company: "Directora Financiera"
        }
      ]
    },
    cta: {
      title: "¿Listo para hacer realidad tu proyecto?",
      subtitle: "Obtén un estudio personalizado en menos de 24h",
      button: "Comenzar mi solicitud",
      contact: "Contactarnos"
    },
    footer: {
      company: {
        name: "Aurex K-pital",
        description: "Experto en financiación desde 2015"
      },
      links: {
        services: "Servicios",
        about: "Acerca de",
        careers: "Carreras",
        partners: "Socios",
        contact: "Contacto",
        faq: "FAQ",
        privacy: "Política de privacidad",
        legal: "Aviso legal",
        terms: "Términos",
        gdpr: "RGPD"
      },
      contact: {
        phone: "+33 7 59 28 20 04",
        email: "contact@aurex-kpital.de",
        address: "Irma-Keilhack-Ring 24, 22145 Hamburg"
      },
      social: {
        linkedin: "LinkedIn",
        twitter: "Twitter",
        facebook: "Facebook"
      },
      copyright: "© 2024 Aurex K-pital. Todos los derechos reservados."
    },
    request: {
      hero: {
        badge: "Solicitud de Financiación",
        title: "Tu proyecto merece",
        titleHighlight: "la mejor financiación",
        subtitle: "Obtén una respuesta personalizada en 24h gracias a nuestra IA avanzada y la experiencia de nuestros asesores",
        stats: {
          responseTime: { value: "24h", label: "Respuesta garantizada" },
          security: { value: "100%", label: "Seguro RGPD" },
          expert: { value: "24/7", label: "Soporte experto" }
        }
      }
    },
    privacy: {
      title: "Política de Privacidad",
      description: "Protección y tratamiento de sus datos personales",
      lastUpdate: "Última actualización: 1 de diciembre de 2024",
      compliance: "Esta política cumple con el RGPD y las regulaciones europeas vigentes.",
      sections: {
        controller: {
          title: "1. Responsable del tratamiento",
          content: "Aurex K-pital GmbH, registrada bajo el número HRB 147852 en el registro mercantil de Hamburgo, con domicilio social en Irma-Keilhack-Ring 24, 22145 Hamburg, Alemania.\n\nDelegado de protección de datos: privacy@aurex-kpital.de"
        },
        dataCollected: {
          title: "2. Datos recopilados",
          content: "Recopilamos las siguientes categorías de datos:\n• Datos de identificación: nombre, apellidos, fecha de nacimiento, nacionalidad\n• Datos de contacto: dirección postal, email, teléfono\n• Datos financieros: ingresos, patrimonio, historial bancario\n• Datos de conexión: dirección IP, cookies, logs de navegación\n• Datos comportamentales: interacciones con nuestros servicios"
        },
        purposes: {
          title: "3. Finalidades del tratamiento",
          content: "Sus datos se tratan para:\n• La prestación de nuestros servicios financieros\n• La evaluación de su solvencia\n• La prevención del fraude y blanqueo\n• El cumplimiento de nuestras obligaciones legales\n• La mejora de nuestros servicios\n• La comunicación comercial (con su consentimiento)"
        },
        legalBasis: {
          title: "4. Base legal",
          content: "El tratamiento de sus datos se basa en:\n• La ejecución de un contrato o medidas precontractuales\n• El cumplimiento de obligaciones legales (LBC-FT, MiFID II)\n• Nuestro interés legítimo para la prevención del fraude\n• Su consentimiento para comunicaciones de marketing"
        },
        dataSharing: {
          title: "5. Compartir datos",
          content: "Compartimos sus datos únicamente con:\n• Nuestros socios bancarios y financieros autorizados\n• Las autoridades de control (CNMV, Banco de España) bajo solicitud\n• Nuestros proveedores técnicos bajo contrato estricto\n• Organismos de crédito para verificaciones\nNingún dato se vende a terceros."
        },
        retention: {
          title: "6. Conservación de datos",
          content: "Períodos de conservación:\n• Datos de clientes activos: durante la relación contractual + 5 años\n• Datos de prospectos: máximo 3 años\n• Datos de cumplimiento: 5 años después del fin de la relación\n• Logs de conexión: 1 año\n• Documentos KYC: 5 años después del fin de la relación"
        },
        rights: {
          title: "7. Sus derechos",
          content: "Conforme al RGPD, dispone de los siguientes derechos:\n• Derecho de acceso: obtener una copia de sus datos\n• Derecho de rectificación: corregir datos inexactos\n• Derecho de supresión: eliminar sus datos (bajo condiciones)\n• Derecho de limitación: restringir el tratamiento\n• Derecho de portabilidad: recuperar sus datos\n• Derecho de oposición: oponerse al tratamiento\n• Derecho de retirada del consentimiento\nPara ejercer sus derechos: privacy@aurex-kpital.de"
        },
        security: {
          title: "8. Seguridad",
          content: "Implementamos medidas técnicas y organizativas apropiadas:\n• Cifrado de datos (AES-256)\n• Acceso restringido y controlado\n• Monitorización continua de sistemas\n• Formación regular de empleados\n• Auditorías de seguridad periódicas"
        },
        transfers: {
          title: "9. Transferencias internacionales",
          content: "Ciertos datos pueden transferirse a países terceros con garantías apropiadas (cláusulas contractuales tipo, decisiones de adecuación de la Comisión Europea)."
        },
        contact: {
          title: "10. Contacto",
          content: "Para cualquier pregunta sobre esta política:\nEmail: privacy@aurex-kpital.de\nCorreo: Aurex K-pital - DPO, Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemania\nTambién tiene derecho a presentar una reclamación ante la autoridad de control competente (CNIL en Francia, BfDI en Alemania)."
        }
      }
    },
    terms: {
      title: "Condiciones Generales de Uso",
      description: "Reglas de uso de nuestros servicios y plataforma"
    },
    gdpr: {
      title: "Conformidad RGPD",
      description: "Nuestro compromiso con la protección de sus datos personales"
    },
    mentions: {
      title: "Aviso Legal",
      description: "Información sobre la empresa y responsabilidades legales"
    }
  },
  it: {
    nav: {
      home: "Home",
      services: "Servizi",
      about: "Chi siamo",
      careers: "Carriere",
      partners: "Partner",
      contact: "Contatto",
      faq: "FAQ",
      privacyPolicy: "Politica sulla privacy",
      legal: "Note legali",
      simulator: "Simulatore",
      request: "Richiesta",
      login: "Accesso",
      signup: "Registrazione"
    },
    hero: {
      badge: "Leader Europeo nei Finanziamenti",
      title: "Realizza i tuoi progetti con",
      titleHighlight: "i migliori finanziamenti",
      subtitle: "Soluzioni su misura per professionisti e privati, con la nostra IA rivoluzionaria e l'esperienza dei nostri consulenti certificati.",
      cta: "Scopri le nostre soluzioni",
      learnMore: "Saperne di più",
      stats: {
        clients: { value: "50K+", label: "Clienti soddisfatti" },
        funding: { value: "2.8M€", label: "Finanziamenti concessi" },
        satisfaction: { value: "98%", label: "Tasso di soddisfazione" }
      }
    },
    services: {
      title: "I Nostri Servizi",
      subtitle: "Soluzioni complete per tutte le vostre esigenze di finanziamento",
      cta: "Scopri",
      items: {
        business: {
          title: "Finanziamento Professionale",
          description: "Soluzioni adatte ad aziende e imprenditori"
        },
        personal: {
          title: "Credito Personale",
          description: "Finanziamenti per i tuoi progetti personali"
        },
        real_estate: {
          title: "Immobiliare",
          description: "Prestiti immobiliari e investimenti locativi"
        },
        investment: {
          title: "Investimento",
          description: "Consulenza e soluzioni di investimento personalizzate"
        }
      }
    },
    testimonials: {
      title: "Si fidano di noi",
      subtitle: "Scopri le testimonianze dei nostri clienti soddisfatti",
      items: [
        {
          quote: "Servizio eccezionale! Ho ottenuto il mio finanziamento in 48h.",
          author: "Marie Dubois",
          company: "Imprenditrice"
        },
        {
          quote: "Team professionale e soluzioni su misura perfette.",
          author: "Jean Martin",
          company: "CEO, TechCorp"
        },
        {
          quote: "Accompagnamento di qualità dall'inizio alla fine del progetto.",
          author: "Sophie Laurent",
          company: "Direttrice Finanziaria"
        }
      ]
    },
    cta: {
      title: "Pronto a realizzare il tuo progetto?",
      subtitle: "Ottieni uno studio personalizzato in meno di 24h",
      button: "Inizia la mia richiesta",
      contact: "Contattaci"
    },
    footer: {
      company: {
        name: "Aurex K-pital",
        description: "Esperto in finanziamenti dal 2015"
      },
      links: {
        services: "Servizi",
        about: "Chi siamo",
        careers: "Carriere",
        partners: "Partner",
        contact: "Contatto",
        faq: "FAQ",
        privacy: "Politica sulla privacy",
        legal: "Note legali",
        terms: "Termini",
        gdpr: "GDPR"
      },
      contact: {
        phone: "+33 7 59 28 20 04",
        email: "contact@aurex-kpital.de",
        address: "Irma-Keilhack-Ring 24, 22145 Hamburg"
      },
      social: {
        linkedin: "LinkedIn",
        twitter: "Twitter",
        facebook: "Facebook"
      },
      copyright: "© 2024 Aurex K-pital. Tutti i diritti riservati."
    },
    request: {
      hero: {
        badge: "Richiesta di Finanziamento",
        title: "Il tuo progetto merita",
        titleHighlight: "il miglior finanziamento",
        subtitle: "Ottieni una risposta personalizzata in 24h grazie alla nostra IA avanzata e all'esperienza dei nostri consulenti",
        stats: {
          responseTime: { value: "24h", label: "Risposta garantita" },
          security: { value: "100%", label: "Sicuro GDPR" },
          expert: { value: "24/7", label: "Supporto esperto" }
        }
      }
    },
    privacy: {
      title: "Politica sulla Privacy",
      description: "Protezione e trattamento dei vostri dati personali",
      lastUpdate: "Ultimo aggiornamento: 1° dicembre 2024",
      compliance: "Questa politica è conforme al GDPR e alle normative europee vigenti.",
      sections: {
        controller: {
          title: "1. Titolare del trattamento",
          content: "Aurex K-pital GmbH, registrata con il numero HRB 147852 nel registro delle imprese di Amburgo, con sede legale in Irma-Keilhack-Ring 24, 22145 Hamburg, Germania.\n\nResponsabile della protezione dei dati: privacy@aurex-kpital.de"
        },
        dataCollected: {
          title: "2. Dati raccolti",
          content: "Raccogliamo le seguenti categorie di dati:\n• Dati di identificazione: nome, cognome, data di nascita, nazionalità\n• Dati di contatto: indirizzo postale, email, telefono\n• Dati finanziari: reddito, patrimonio, storia bancaria\n• Dati di connessione: indirizzo IP, cookie, log di navigazione\n• Dati comportamentali: interazioni con i nostri servizi"
        },
        purposes: {
          title: "3. Finalità del trattamento",
          content: "I vostri dati vengono trattati per:\n• La fornitura dei nostri servizi finanziari\n• La valutazione della vostra solvibilità\n• La prevenzione di frodi e riciclaggio\n• Il rispetto dei nostri obblighi legali\n• Il miglioramento dei nostri servizi\n• La comunicazione commerciale (con il vostro consenso)"
        },
        legalBasis: {
          title: "4. Base giuridica",
          content: "Il trattamento dei vostri dati si basa su:\n• L'esecuzione di un contratto o misure precontrattuali\n• Il rispetto di obblighi legali (antiriciclaggio, MiFID II)\n• Il nostro interesse legittimo per la prevenzione delle frodi\n• Il vostro consenso per le comunicazioni di marketing"
        },
        dataSharing: {
          title: "5. Condivisione dei dati",
          content: "Condividiamo i vostri dati solo con:\n• I nostri partner bancari e finanziari autorizzati\n• Le autorità di controllo (Consob, Banca d'Italia) su richiesta\n• I nostri fornitori tecnici sotto contratto rigoroso\n• Gli organismi di credito per verifiche\nNessun dato viene venduto a terzi."
        },
        retention: {
          title: "6. Conservazione dei dati",
          content: "Periodi di conservazione:\n• Dati clienti attivi: durante il rapporto contrattuale + 5 anni\n• Dati prospect: massimo 3 anni\n• Dati di conformità: 5 anni dopo la fine del rapporto\n• Log di connessione: 1 anno\n• Documenti KYC: 5 anni dopo la fine del rapporto"
        },
        rights: {
          title: "7. I vostri diritti",
          content: "Conformemente al GDPR, disponete dei seguenti diritti:\n• Diritto di accesso: ottenere una copia dei vostri dati\n• Diritto di rettifica: correggere dati inesatti\n• Diritto di cancellazione: eliminare i vostri dati (sotto condizioni)\n• Diritto di limitazione: limitare il trattamento\n• Diritto di portabilità: recuperare i vostri dati\n• Diritto di opposizione: opporsi al trattamento\n• Diritto di revoca del consenso\nPer esercitare i vostri diritti: privacy@aurex-kpital.de"
        },
        security: {
          title: "8. Sicurezza",
          content: "Implementiamo misure tecniche e organizzative appropriate:\n• Crittografia dei dati (AES-256)\n• Accesso limitato e controllato\n• Monitoraggio continuo dei sistemi\n• Formazione regolare dei dipendenti\n• Audit di sicurezza periodici"
        },
        transfers: {
          title: "9. Trasferimenti internazionali",
          content: "Alcuni dati possono essere trasferiti in paesi terzi con garanzie appropriate (clausole contrattuali tipo, decisioni di adeguatezza della Commissione Europea)."
        },
        contact: {
          title: "10. Contatto",
          content: "Per qualsiasi domanda relativa a questa politica:\nEmail: privacy@aurex-kpital.de\nIndirizzo: Aurex K-pital - DPO, Irma-Keilhack-Ring 24, 22145 Amburgo, Germania\nAvete anche il diritto di presentare un reclamo presso l'autorità di controllo competente (CNIL in Francia, BfDI in Germania)."
        }
      }
    },
    terms: {
      title: "Condizioni Generali d'Uso",
      description: "Regole di utilizzo dei nostri servizi e piattaforma"
    },
    gdpr: {
      title: "Conformità GDPR",
      description: "Il nostro impegno per la protezione dei vostri dati personali"
    },
    mentions: {
      title: "Note Legali",
      description: "Informazioni sull'azienda e responsabilità legali"
    }
  },
  pl: {
    nav: {
      home: "Strona główna",
      services: "Usługi",
      about: "O nas",
      careers: "Kariera",
      partners: "Partnerzy",
      contact: "Kontakt",
      faq: "FAQ",
      privacyPolicy: "Polityka prywatności",
      legal: "Informacje prawne",
      simulator: "Symulator",
      request: "Wniosek",
      login: "Logowanie",
      signup: "Rejestracja"
    },
    privacy: {
      title: "Polityka Prywatności",
      description: "Ochrona i przetwarzanie Państwa danych osobowych",
      lastUpdate: "Ostatnia aktualizacja: 1 grudnia 2024",
      compliance: "Ta polityka jest zgodna z RODO i obowiązującymi przepisami europejskimi.",
      sections: {
        controller: {
          title: "1. Administrator danych",
          content: "Aurex K-pital GmbH, zarejestrowana pod numerem HRB 147852 w rejestrze handlowym w Hamburgu, z siedzibą przy Irma-Keilhack-Ring 24, 22145 Hamburg, Niemcy.\n\nInspektor ochrony danych: privacy@aurex-kpital.de"
        },
        contact: {
          title: "10. Kontakt",
          content: "W sprawie pytań dotyczących tej polityki:\nEmail: privacy@aurex-kpital.de\nAdres: Aurex K-pital - DPO, Irma-Keilhack-Ring 24, 22145 Hamburg, Niemcy\nMasz również prawo złożyć skargę do właściwego organu nadzorczego (CNIL we Francji, BfDI w Niemczech)."
        }
      }
    }
  },
  fi: {
    nav: {
      home: "Etusivu",
      services: "Palvelut",
      about: "Tietoa meistä",
      careers: "Ura",
      partners: "Kumppanit",
      contact: "Yhteystiedot",
      faq: "UKK",
      privacyPolicy: "Tietosuojakäytäntö",
      legal: "Oikeudelliset tiedot",
      simulator: "Simulaattori",
      request: "Pyyntö",
      login: "Kirjautuminen",
      signup: "Rekisteröityminen"
    },
    privacy: {
      title: "Tietosuojakäytäntö",
      description: "Henkilötietojenne suojelu ja käsittely"
    }
  },
  pt: {
    nav: {
      home: "Início",
      services: "Serviços",
      about: "Sobre nós",
      careers: "Carreiras",
      partners: "Parceiros",
      contact: "Contato",
      faq: "FAQ",
      privacyPolicy: "Política de privacidade",
      legal: "Informações legais",
      simulator: "Simulador",
      request: "Solicitação",
      login: "Login",
      signup: "Cadastro"
    },
    privacy: {
      title: "Política de Privacidade",
      description: "Proteção e tratamento dos seus dados pessoais"
    }
  },
  el: {
    nav: {
      home: "Αρχική",
      services: "Υπηρεσίες",
      about: "Σχετικά με εμάς",
      careers: "Καριέρα",
      partners: "Συνεργάτες",
      contact: "Επικοινωνία",
      faq: "FAQ",
      privacyPolicy: "Πολιτική Απορρήτου",
      legal: "Νομικές πληροφορίες",
      simulator: "Προσομοιωτής",
      request: "Αίτημα",
      login: "Σύνδεση",
      signup: "Εγγραφή"
    },
    privacy: {
      title: "Πολιτική Απορρήτου",
      description: "Προστασία και επεξεργασία των προσωπικών σας δεδομένων"
    }
  }
};

export default translations;