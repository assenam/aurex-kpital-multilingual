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
      about: "À propos",
      contact: "Contact",
      faq: "FAQ",
    },
    legal: {
      badge: "Informations Légales",
      title: {
        main: "Informations",
        subtitle: "Légales"
      },
      description: "Transparence et conformité pour votre tranquillité d'esprit",
      tabs: {
        mentions: "Mentions Légales",
        privacy: "Confidentialité",
        terms: "Conditions",
        gdpr: "RGPD"
      },
      mentions: {
        title: "Mentions Légales",
        description: "Informations légales obligatoires concernant notre société",
        company: {
          title: "Informations sur la société",
          name: "Dénomination sociale",
          type: "Forme juridique",
          typeValue: "Société à responsabilité limitée (GmbH)",
          capital: "Capital social",
          address: "Adresse du siège social",
          register: "Numéro d'inscription au registre",
          vat: "Numéro de TVA intracommunautaire",
          siren: "Numéro SIREN"
        },
        management: {
          title: "Direction",
          ceo: "Directeur Général",
          cio: "Directrice Innovation",
          cro: "Directeur Relations Clients"
        },
        activity: {
          title: "Objet social",
          description: "Aurex K-pital GmbH est spécialisée dans les services financiers et propose :",
          services: {
            banking: "Services bancaires et de financement",
            investment: "Conseil en investissement",
            insurance: "Courtage en assurance",
            wealth: "Gestion de patrimoine"
          }
        },
        contact: {
          title: "Contact",
          phone: "Téléphone",
          email: "Email",
          hours: "Horaires d'ouverture",
          schedule: "Lundi au vendredi de 8h à 19h"
        },
        hosting: {
          title: "Hébergement",
          description: "Ce site est hébergé par :"
        },
        intellectual: {
          title: "Propriété intellectuelle",
          description: "Tous les contenus présents sur ce site (textes, images, logos, graphismes) sont la propriété exclusive d'Aurex K-pital GmbH et sont protégés par les lois sur la propriété intellectuelle."
        },
        responsibility: {
          title: "Limitation de responsabilité",
          description: "Aurex K-pital GmbH s'efforce de fournir des informations exactes mais ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées sur ce site."
        }
      },
      privacy: {
        title: "Politique de Confidentialité",
        description: "Protection et traitement de vos données personnelles",
        lastUpdate: "Dernière mise à jour : 1er décembre 2024",
        compliance: "Cette politique est conforme au RGPD et aux réglementations européennes en vigueur.",
        sections: {
          controller: {
            title: "1. Responsable du Traitement",
            content: "Aurex K-pital GmbH, société immatriculée sous le numéro HRB 147852 au registre du commerce de Hamburg, dont le siège social est situé Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne.\n\nDélégué à la Protection des Données : privacy@aurex-kpital.de"
          },
          dataCollected: {
            title: "2. Données Collectées",
            content: "Nous collectons les catégories de données suivantes :\n\n• Données d'identification : nom, prénom, date de naissance, nationalité\n• Coordonnées : adresse postale, email, téléphone\n• Données financières : revenus, patrimoine, historique bancaire\n• Données de connexion : adresse IP, cookies, logs de navigation\n• Données comportementales : interactions avec nos services"
          },
          purposes: {
            title: "3. Finalités du Traitement",
            content: "Vos données sont traitées pour :\n\n• L'exécution de nos services financiers\n• L'évaluation de votre solvabilité\n• La prévention de la fraude et le blanchiment\n• Le respect de nos obligations légales\n• L'amélioration de nos services\n• La communication commerciale (avec votre consentement)"
          },
          legalBasis: {
            title: "4. Base Légale",
            content: "Nos traitements sont fondés sur :\n\n• Exécution contractuelle : pour la fourniture de nos services\n• Obligation légale : conformité réglementaire (KYC, AML)\n• Intérêt légitime : prévention de la fraude, amélioration des services\n• Consentement : communications marketing, cookies non essentiels"
          },
          dataSharing: {
            title: "5. Partage des Données",
            content: "Vos données peuvent être partagées avec :\n\n• Nos partenaires bancaires et financiers\n• Les organismes de crédit et d'assurance\n• Les autorités de régulation (BaFin, ACPR)\n• Nos prestataires techniques (sous contrat strict)\n• Les autorités judiciaires sur réquisition"
          },
          retention: {
            title: "6. Conservation des Données",
            content: "Nous conservons vos données :\n\n• Données client actif : durée de la relation + 5 ans\n• Données financières : 10 ans après la fin du contrat\n• Données de connexion : 13 mois maximum\n• Données marketing : 3 ans après le dernier contact"
          },
          rights: {
            title: "7. Vos Droits",
            content: "Conformément au RGPD, vous disposez des droits suivants :\n\n• Droit d'accès : obtenir une copie de vos données\n• Droit de rectification : corriger vos données inexactes\n• Droit à l'effacement : supprimer vos données (sous conditions)\n• Droit de limitation : restreindre le traitement\n• Droit de portabilité : récupérer vos données\n• Droit d'opposition : vous opposer au traitement\n• Droit de retrait du consentement\n\nPour exercer vos droits : privacy@aurex-kpital.de"
          },
          security: {
            title: "8. Sécurité",
            content: "Nous mettons en place des mesures techniques et organisationnelles appropriées :\n\n• Chiffrement des données (AES-256)\n• Accès restreint et contrôlé\n• Surveillance continue des systèmes\n• Formation régulière du personnel\n• Audits de sécurité périodiques"
          },
          transfers: {
            title: "9. Transferts Internationaux",
            content: "Certaines données peuvent être transférées vers des pays tiers avec des garanties appropriées (clauses contractuelles types, décisions d'adéquation de la Commission européenne)."
          },
          contact: {
            title: "10. Contact",
            content: "Pour toute question relative à cette politique de confidentialité :\n\nEmail : privacy@aurex-kpital.de\nTéléphone : +33759282004\nAdresse : Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne"
          }
        }
      },
      terms: {
        title: "Conditions Générales d'Utilisation",
        description: "Conditions régissant l'utilisation de nos services",
        lastUpdate: "Dernière mise à jour : 1er décembre 2024",
        sections: {
          object: {
            title: "1. Objet",
            content: "Les présentes conditions générales régissent l'accès et l'utilisation des services financiers proposés par Aurex K-pital GmbH. Elles constituent un contrat entre Aurex K-pital et le client."
          },
          services: {
            title: "2. Services proposés",
            content: "Aurex K-pital propose :\n\n• Des services de financement personnel et professionnel\n• Du conseil en investissement\n• De la gestion de patrimoine\n• Des services d'assurance\n• Des outils de simulation financière"
          },
          registration: {
            title: "3. Inscription et compte client",
            content: "L'accès aux services nécessite la création d'un compte client. Le client s'engage à fournir des informations exactes et à jour. Il est responsable de la confidentialité de ses identifiants."
          },
          obligations: {
            title: "4. Obligations du client",
            content: "Le client s'engage à :\n\n• Utiliser les services conformément à leur destination\n• Fournir des informations exactes et complètes\n• Respecter la réglementation en vigueur\n• Ne pas porter atteinte aux systèmes d'information"
          },
          pricing: {
            title: "5. Tarification",
            content: "Les tarifs sont indiqués en euros toutes taxes comprises. Ils peuvent être modifiés à tout moment avec un préavis de 30 jours. Toute prestation commencée est due intégralement."
          },
          liability: {
            title: "6. Responsabilité",
            content: "Aurex K-pital s'engage à fournir ses services avec diligence. Sa responsabilité est limitée aux dommages directs. Elle ne saurait être tenue responsable des pertes d'exploitation ou gains manqués."
          },
          termination: {
            title: "7. Résiliation",
            content: "Le contrat peut être résilié à tout moment par l'une des parties avec un préavis de 30 jours. En cas de manquement grave, la résiliation peut être immédiate."
          },
          law: {
            title: "8. Droit applicable",
            content: "Les présentes conditions sont régies par le droit allemand. Tout litige sera soumis aux tribunaux compétents d'Hambourg."
          }
        }
      },
      gdpr: {
        title: "Conformité RGPD",
        description: "Notre engagement pour la protection de vos données personnelles",
        sections: {
          principles: {
            title: "1. Principes fondamentaux",
            content: "Aurex K-pital applique les principes du RGPD :\n\n• Licéité, loyauté et transparence\n• Limitation des finalités\n• Minimisation des données\n• Exactitude\n• Limitation de la conservation\n• Intégrité et confidentialité\n• Responsabilité"
          },
          rights: {
            title: "2. Vos droits RGPD",
            content: "Vous disposez des droits suivants :\n\n• Droit d'information\n• Droit d'accès aux données\n• Droit de rectification\n• Droit à l'effacement (« droit à l'oubli »)\n• Droit à la limitation du traitement\n• Droit à la portabilité des données\n• Droit d'opposition\n• Droits relatifs à la prise de décision automatisée"
          },
          procedures: {
            title: "3. Procédures",
            content: "Pour exercer vos droits :\n\n• Contactez notre DPO : privacy@aurex-kpital.de\n• Délai de réponse : 1 mois maximum\n• Justificatif d'identité requis\n• Gratuité de principe (sauf abus)\n• Possibilité de recours auprès de la CNIL"
          },
          security: {
            title: "4. Mesures de sécurité",
            content: "Nous mettons en œuvre :\n\n• Chiffrement des données sensibles\n• Contrôles d'accès stricts\n• Audits de sécurité réguliers\n• Formation du personnel\n• Notification des violations dans les 72h\n• Analyse d'impact sur la protection des données (AIPD)"
          },
          transfers: {
            title: "5. Transferts de données",
            content: "Les transferts hors UE sont encadrés par :\n\n• Décisions d'adéquation de la Commission\n• Clauses contractuelles types (CCT)\n• Règles d'entreprise contraignantes (BCR)\n• Dérogations spécifiques (art. 49 RGPD)"
          },
          contact: {
            title: "6. Contact DPO",
            content: "Délégué à la Protection des Données :\n\nEmail : privacy@aurex-kpital.de\nTéléphone : +33759282004\nAdresse : Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne"
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
      request: "Anfrage",
      about: "Über uns",
      contact: "Kontakt",
      faq: "FAQ",
    },
    legal: {
      badge: "Rechtliche Informationen",
      title: {
        main: "Rechtliche",
        subtitle: "Informationen"
      },
      description: "Transparenz und Compliance für Ihr Vertrauen",
      tabs: {
        mentions: "Impressum",
        privacy: "Datenschutz",
        terms: "AGB",
        gdpr: "DSGVO"
      },
      mentions: {
        title: "Impressum",
        description: "Rechtlich erforderliche Informationen über unser Unternehmen",
        company: {
          title: "Unternehmensangaben",
          name: "Firmenbezeichnung",
          type: "Rechtsform",
          typeValue: "Gesellschaft mit beschränkter Haftung (GmbH)",
          capital: "Stammkapital",
          address: "Sitz der Gesellschaft",
          register: "Handelsregisternummer",
          vat: "Umsatzsteuer-Identifikationsnummer",
          siren: "SIREN-Nummer"
        },
        management: {
          title: "Geschäftsführung",
          ceo: "Geschäftsführer",
          cio: "Innovationsdirektorin",
          cro: "Kundenbeziehungsleiter"
        },
        activity: {
          title: "Unternehmensgegenstand",
          description: "Aurex K-pital GmbH ist spezialisiert auf Finanzdienstleistungen und bietet:",
          services: {
            banking: "Bank- und Finanzierungsdienstleistungen",
            investment: "Anlageberatung",
            insurance: "Versicherungsvermittlung",
            wealth: "Vermögensverwaltung"
          }
        },
        contact: {
          title: "Kontakt",
          phone: "Telefon",
          email: "E-Mail",
          hours: "Öffnungszeiten",
          schedule: "Montag bis Freitag von 8:00 bis 19:00 Uhr"
        },
        hosting: {
          title: "Hosting",
          description: "Diese Website wird gehostet von:"
        },
        intellectual: {
          title: "Geistiges Eigentum",
          description: "Alle auf dieser Website vorhandenen Inhalte (Texte, Bilder, Logos, Grafiken) sind ausschließliches Eigentum der Aurex K-pital GmbH und durch Gesetze zum Schutz des geistigen Eigentums geschützt."
        },
        responsibility: {
          title: "Haftungsbeschränkung",
          description: "Aurex K-pital GmbH bemüht sich, genaue Informationen bereitzustellen, kann jedoch nicht die Richtigkeit, Vollständigkeit oder Aktualität der auf dieser Website verbreiteten Informationen garantieren."
        }
      },
      privacy: {
        title: "Datenschutzerklärung",
        description: "Schutz und Verarbeitung Ihrer personenbezogenen Daten",
        lastUpdate: "Letzte Aktualisierung: 1. Dezember 2024",
        compliance: "Diese Richtlinie entspricht der DSGVO und den geltenden europäischen Vorschriften.",
        sections: {
          controller: {
            title: "1. Verantwortlicher",
            content: "Aurex K-pital GmbH, eingetragen unter der Nummer HRB 147852 im Handelsregister Hamburg, mit Sitz in Irma-Keilhack-Ring 24, 22145 Hamburg, Deutschland.\n\nDatenschutzbeauftragter: privacy@aurex-kpital.de"
          },
          dataCollected: {
            title: "2. Erhobene Daten",
            content: "Wir erheben folgende Datenkategorien:\n\n• Identifikationsdaten: Name, Vorname, Geburtsdatum, Nationalität\n• Kontaktdaten: Postanschrift, E-Mail, Telefon\n• Finanzdaten: Einkommen, Vermögen, Bankhistorie\n• Verbindungsdaten: IP-Adresse, Cookies, Navigationslogs\n• Verhaltensdaten: Interaktionen mit unseren Diensten"
          },
          purposes: {
            title: "3. Zwecke der Verarbeitung",
            content: "Ihre Daten werden verarbeitet für:\n\n• Die Erbringung unserer Finanzdienstleistungen\n• Die Bewertung Ihrer Kreditwürdigkeit\n• Die Prävention von Betrug und Geldwäsche\n• Die Erfüllung unserer rechtlichen Verpflichtungen\n• Die Verbesserung unserer Dienste\n• Kommerzielle Kommunikation (mit Ihrer Einwilligung)"
          },
          legalBasis: {
            title: "4. Rechtsgrundlage",
            content: "Unsere Verarbeitungen basieren auf:\n\n• Vertragserfüllung: für die Bereitstellung unserer Dienste\n• Rechtliche Verpflichtung: regulatorische Compliance (KYC, AML)\n• Berechtigtes Interesse: Betrugsvorbeugung, Dienstverbesserung\n• Einwilligung: Marketing-Kommunikation, nicht wesentliche Cookies"
          },
          dataSharing: {
            title: "5. Datenweitergabe",
            content: "Ihre Daten können geteilt werden mit:\n\n• Unseren Bank- und Finanzpartnern\n• Kredit- und Versicherungsorganisationen\n• Regulierungsbehörden (BaFin, ACPR)\n• Unseren technischen Dienstleistern (unter striktem Vertrag)\n• Justizbehörden auf Anforderung"
          },
          retention: {
            title: "6. Datenaufbewahrung",
            content: "Wir bewahren Ihre Daten auf:\n\n• Aktive Kundendaten: Dauer der Beziehung + 5 Jahre\n• Finanzdaten: 10 Jahre nach Vertragsende\n• Verbindungsdaten: maximal 13 Monate\n• Marketing-Daten: 3 Jahre nach letztem Kontakt"
          },
          rights: {
            title: "7. Ihre Rechte",
            content: "Gemäß DSGVO haben Sie folgende Rechte:\n\n• Auskunftsrecht: eine Kopie Ihrer Daten erhalten\n• Berichtigungsrecht: Ihre falschen Daten korrigieren\n• Löschungsrecht: Ihre Daten löschen (unter Bedingungen)\n• Einschränkungsrecht: die Verarbeitung beschränken\n• Übertragbarkeitsrecht: Ihre Daten abrufen\n• Widerspruchsrecht: der Verarbeitung widersprechen\n• Recht auf Widerruf der Einwilligung\n\nZur Ausübung Ihrer Rechte: privacy@aurex-kpital.de"
          },
          security: {
            title: "8. Sicherheit",
            content: "Wir setzen angemessene technische und organisatorische Maßnahmen um:\n\n• Datenverschlüsselung (AES-256)\n• Beschränkter und kontrollierter Zugang\n• Kontinuierliche Systemüberwachung\n• Regelmäßige Mitarbeiterschulungen\n• Regelmäßige Sicherheitsaudits"
          },
          transfers: {
            title: "9. Internationale Übertragungen",
            content: "Bestimmte Daten können an Drittländer mit angemessenen Garantien übertragen werden (Standardvertragsklauseln, Angemessenheitsbeschlüsse der Europäischen Kommission)."
          },
          contact: {
            title: "10. Kontakt",
            content: "Für Fragen zu dieser Datenschutzerklärung:\n\nE-Mail: privacy@aurex-kpital.de\nTelefon: +33759282004\nAdresse: Irma-Keilhack-Ring 24, 22145 Hamburg, Deutschland"
          }
        }
      },
      terms: {
        title: "Allgemeine Geschäftsbedingungen",
        description: "Bedingungen für die Nutzung unserer Dienstleistungen",
        lastUpdate: "Letzte Aktualisierung: 1. Dezember 2024",
        sections: {
          object: {
            title: "1. Gegenstand",
            content: "Diese Allgemeinen Geschäftsbedingungen regeln den Zugang und die Nutzung der von Aurex K-pital GmbH angebotenen Finanzdienstleistungen. Sie stellen einen Vertrag zwischen Aurex K-pital und dem Kunden dar."
          },
          services: {
            title: "2. Angebotene Dienstleistungen",
            content: "Aurex K-pital bietet:\n\n• Personal- und Unternehmensfinanzierungsdienstleistungen\n• Anlageberatung\n• Vermögensverwaltung\n• Versicherungsdienstleistungen\n• Finanzielle Simulationstools"
          },
          registration: {
            title: "3. Registrierung und Kundenkonto",
            content: "Der Zugang zu den Dienstleistungen erfordert die Erstellung eines Kundenkontos. Der Kunde verpflichtet sich, genaue und aktuelle Informationen bereitzustellen. Er ist verantwortlich für die Vertraulichkeit seiner Anmeldedaten."
          },
          obligations: {
            title: "4. Kundenpflichten",
            content: "Der Kunde verpflichtet sich:\n\n• Die Dienstleistungen bestimmungsgemäß zu nutzen\n• Genaue und vollständige Informationen bereitzustellen\n• Geltende Vorschriften zu beachten\n• Keine Beeinträchtigung der IT-Systeme"
          },
          pricing: {
            title: "5. Preisgestaltung",
            content: "Die Preise werden in Euro inklusive aller Steuern angegeben. Sie können jederzeit mit einer Frist von 30 Tagen geändert werden. Jede begonnene Leistung ist vollständig fällig."
          },
          liability: {
            title: "6. Haftung",
            content: "Aurex K-pital verpflichtet sich, seine Dienstleistungen sorgfältig zu erbringen. Die Haftung ist auf direkte Schäden begrenzt. Eine Haftung für Betriebsausfälle oder entgangene Gewinne ist ausgeschlossen."
          },
          termination: {
            title: "7. Kündigung",
            content: "Der Vertrag kann jederzeit von einer der Parteien mit einer Frist von 30 Tagen gekündigt werden. Bei schwerwiegenden Verstößen kann die Kündigung sofort erfolgen."
          },
          law: {
            title: "8. Anwendbares Recht",
            content: "Diese Bedingungen unterliegen deutschem Recht. Alle Streitigkeiten unterliegen der Zuständigkeit der Gerichte in Hamburg."
          }
        }
      },
      gdpr: {
        title: "DSGVO-Konformität",
        description: "Unser Engagement für den Schutz Ihrer personenbezogenen Daten",
        sections: {
          principles: {
            title: "1. Grundprinzipien",
            content: "Aurex K-pital wendet die DSGVO-Grundsätze an:\n\n• Rechtmäßigkeit, Fairness und Transparenz\n• Zweckbindung\n• Datenminimierung\n• Richtigkeit\n• Speicherbegrenzung\n• Integrität und Vertraulichkeit\n• Rechenschaftspflicht"
          },
          rights: {
            title: "2. Ihre DSGVO-Rechte",
            content: "Sie haben folgende Rechte:\n\n• Informationsrecht\n• Auskunftsrecht\n• Berichtigungsrecht\n• Recht auf Löschung (\"Recht auf Vergessenwerden\")\n• Recht auf Einschränkung der Verarbeitung\n• Recht auf Datenübertragbarkeit\n• Widerspruchsrecht\n• Rechte bezüglich automatisierter Entscheidungsfindung"
          },
          procedures: {
            title: "3. Verfahren",
            content: "Zur Ausübung Ihrer Rechte:\n\n• Kontaktieren Sie unseren DSB: privacy@aurex-kpital.de\n• Antwortfrist: maximal 1 Monat\n• Identitätsnachweis erforderlich\n• Grundsätzlich kostenlos (außer bei Missbrauch)\n• Beschwerdemöglichkeit bei der Datenschutzbehörde"
          },
          security: {
            title: "4. Sicherheitsmaßnahmen",
            content: "Wir implementieren:\n\n• Verschlüsselung sensibler Daten\n• Strenge Zugangskontrollen\n• Regelmäßige Sicherheitsaudits\n• Mitarbeiterschulungen\n• Meldung von Verletzungen innerhalb von 72 Stunden\n• Datenschutz-Folgenabschätzung (DSFA)"
          },
          transfers: {
            title: "5. Datenübertragungen",
            content: "Übertragungen außerhalb der EU sind geregelt durch:\n\n• Angemessenheitsbeschlüsse der Kommission\n• Standardvertragsklauseln (SCC)\n• Verbindliche Unternehmensregeln (BCR)\n• Spezifische Ausnahmen (Art. 49 DSGVO)"
          },
          contact: {
            title: "6. DSB-Kontakt",
            content: "Datenschutzbeauftragter:\n\nE-Mail: privacy@aurex-kpital.de\nTelefon: +33759282004\nAdresse: Irma-Keilhack-Ring 24, 22145 Hamburg, Deutschland"
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
      about: "Acerca de",
      contact: "Contacto",
      faq: "FAQ",
    },
    legal: {
      badge: "Información Legal",
      title: {
        main: "Información",
        subtitle: "Legal"
      },
      description: "Transparencia y cumplimiento para su tranquilidad",
      tabs: {
        mentions: "Aviso Legal",
        privacy: "Privacidad",
        terms: "Términos",
        gdpr: "RGPD"
      },
      mentions: {
        title: "Aviso Legal",
        description: "Información legal obligatoria sobre nuestra empresa",
        company: {
          title: "Información de la empresa",
          name: "Denominación social",
          type: "Forma jurídica",
          typeValue: "Sociedad de responsabilidad limitada (GmbH)",
          capital: "Capital social",
          address: "Dirección de la sede social",
          register: "Número de inscripción en el registro",
          vat: "Número de IVA intracomunitario",
          siren: "Número SIREN"
        },
        management: {
          title: "Dirección",
          ceo: "Director General",
          cio: "Directora de Innovación",
          cro: "Director de Relaciones con Clientes"
        },
        activity: {
          title: "Objeto social",
          description: "Aurex K-pital GmbH se especializa en servicios financieros y ofrece:",
          services: {
            banking: "Servicios bancarios y de financiación",
            investment: "Asesoramiento en inversiones",
            insurance: "Correduría de seguros",
            wealth: "Gestión patrimonial"
          }
        },
        contact: {
          title: "Contacto",
          phone: "Teléfono",
          email: "Email",
          hours: "Horario de atención",
          schedule: "Lunes a viernes de 8h a 19h"
        },
        hosting: {
          title: "Alojamiento",
          description: "Este sitio está alojado por:"
        },
        intellectual: {
          title: "Propiedad intelectual",
          description: "Todos los contenidos presentes en este sitio (textos, imágenes, logos, gráficos) son propiedad exclusiva de Aurex K-pital GmbH y están protegidos por las leyes de propiedad intelectual."
        },
        responsibility: {
          title: "Limitación de responsabilidad",
          description: "Aurex K-pital GmbH se esfuerza por proporcionar información exacta pero no puede garantizar la exactitud, integridad o actualidad de la información difundida en este sitio."
        }
      },
      privacy: {
        title: "Política de Privacidad",
        description: "Protección y tratamiento de sus datos personales",
        lastUpdate: "Última actualización: 1 de diciembre de 2024",
        compliance: "Esta política cumple con el RGPD y las normativas europeas vigentes.",
        sections: {
          controller: {
            title: "1. Responsable del Tratamiento",
            content: "Aurex K-pital GmbH, sociedad inscrita bajo el número HRB 147852 en el registro mercantil de Hamburgo, con domicilio social en Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemania.\n\nDelegado de Protección de Datos: privacy@aurex-kpital.de"
          },
          dataCollected: {
            title: "2. Datos Recopilados",
            content: "Recopilamos las siguientes categorías de datos:\n\n• Datos de identificación: nombre, apellido, fecha de nacimiento, nacionalidad\n• Datos de contacto: dirección postal, email, teléfono\n• Datos financieros: ingresos, patrimonio, historial bancario\n• Datos de conexión: dirección IP, cookies, logs de navegación\n• Datos comportamentales: interacciones con nuestros servicios"
          },
          purposes: {
            title: "3. Finalidades del Tratamiento",
            content: "Sus datos se procesan para:\n\n• La ejecución de nuestros servicios financieros\n• La evaluación de su solvencia\n• La prevención del fraude y blanqueo\n• El cumplimiento de nuestras obligaciones legales\n• La mejora de nuestros servicios\n• La comunicación comercial (con su consentimiento)"
          },
          legalBasis: {
            title: "4. Base Legal",
            content: "Nuestros tratamientos se basan en:\n\n• Ejecución contractual: para la provisión de nuestros servicios\n• Obligación legal: cumplimiento regulatorio (KYC, AML)\n• Interés legítimo: prevención del fraude, mejora de servicios\n• Consentimiento: comunicaciones de marketing, cookies no esenciales"
          },
          dataSharing: {
            title: "5. Compartir Datos",
            content: "Sus datos pueden ser compartidos con:\n\n• Nuestros socios bancarios y financieros\n• Organismos de crédito y seguros\n• Autoridades reguladoras (BaFin, ACPR)\n• Nuestros proveedores técnicos (bajo contrato estricto)\n• Autoridades judiciales bajo requerimiento"
          },
          retention: {
            title: "6. Conservación de Datos",
            content: "Conservamos sus datos:\n\n• Datos de cliente activo: duración de la relación + 5 años\n• Datos financieros: 10 años después del fin del contrato\n• Datos de conexión: máximo 13 meses\n• Datos de marketing: 3 años después del último contacto"
          },
          rights: {
            title: "7. Sus Derechos",
            content: "Conforme al RGPD, tiene los siguientes derechos:\n\n• Derecho de acceso: obtener una copia de sus datos\n• Derecho de rectificación: corregir sus datos inexactos\n• Derecho de supresión: eliminar sus datos (bajo condiciones)\n• Derecho de limitación: restringir el procesamiento\n• Derecho de portabilidad: recuperar sus datos\n• Derecho de oposición: oponerse al procesamiento\n• Derecho de retirada del consentimiento\n\nPara ejercer sus derechos: privacy@aurex-kpital.de"
          },
          security: {
            title: "8. Seguridad",
            content: "Implementamos medidas técnicas y organizativas apropiadas:\n\n• Cifrado de datos (AES-256)\n• Acceso restringido y controlado\n• Monitoreo continuo de sistemas\n• Formación regular del personal\n• Auditorías de seguridad periódicas"
          },
          transfers: {
            title: "9. Transferencias Internacionales",
            content: "Ciertos datos pueden ser transferidos a países terceros con garantías apropiadas (cláusulas contractuales tipo, decisiones de adecuación de la Comisión Europea)."
          },
          contact: {
            title: "10. Contacto",
            content: "Para cualquier pregunta sobre esta política de privacidad:\n\nEmail: privacy@aurex-kpital.de\nTeléfono: +33759282004\nDirección: Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemania"
          }
        }
      },
      terms: {
        title: "Términos y Condiciones",
        description: "Condiciones que rigen el uso de nuestros servicios",
        lastUpdate: "Última actualización: 1 de diciembre de 2024",
        sections: {
          object: {
            title: "1. Objeto",
            content: "Estos términos y condiciones generales regulan el acceso y uso de los servicios financieros ofrecidos por Aurex K-pital GmbH. Constituyen un contrato entre Aurex K-pital y el cliente."
          },
          services: {
            title: "2. Servicios ofrecidos",
            content: "Aurex K-pital ofrece:\n\n• Servicios de financiación personal y empresarial\n• Asesoramiento de inversión\n• Gestión patrimonial\n• Servicios de seguros\n• Herramientas de simulación financiera"
          },
          registration: {
            title: "3. Registro y cuenta de cliente",
            content: "El acceso a los servicios requiere la creación de una cuenta de cliente. El cliente se compromete a proporcionar información precisa y actualizada. Es responsable de la confidencialidad de sus credenciales."
          },
          obligations: {
            title: "4. Obligaciones del cliente",
            content: "El cliente se compromete a:\n\n• Usar los servicios conforme a su propósito\n• Proporcionar información precisa y completa\n• Respetar la normativa vigente\n• No dañar los sistemas de información"
          },
          pricing: {
            title: "5. Precios",
            content: "Los precios se indican en euros con todos los impuestos incluidos. Pueden modificarse en cualquier momento con 30 días de aviso previo. Todo servicio iniciado se debe íntegramente."
          },
          liability: {
            title: "6. Responsabilidad",
            content: "Aurex K-pital se compromete a proporcionar sus servicios con diligencia. Su responsabilidad se limita a daños directos. No puede ser responsable de pérdidas de explotación o ganancias perdidas."
          },
          termination: {
            title: "7. Terminación",
            content: "El contrato puede ser terminado en cualquier momento por cualquiera de las partes con 30 días de aviso previo. En caso de incumplimiento grave, la terminación puede ser inmediata."
          },
          law: {
            title: "8. Ley aplicable",
            content: "Estos términos se rigen por la ley alemana. Cualquier disputa será sometida a los tribunales competentes de Hamburgo."
          }
        }
      },
      gdpr: {
        title: "Cumplimiento GDPR",
        description: "Nuestro compromiso con la protección de sus datos personales",
        sections: {
          principles: {
            title: "1. Principios fundamentales",
            content: "Aurex K-pital aplica los principios del GDPR:\n\n• Legalidad, lealtad y transparencia\n• Limitación de la finalidad\n• Minimización de datos\n• Exactitud\n• Limitación del almacenamiento\n• Integridad y confidencialidad\n• Responsabilidad"
          },
          rights: {
            title: "2. Sus derechos GDPR",
            content: "Usted tiene los siguientes derechos:\n\n• Derecho de información\n• Derecho de acceso a los datos\n• Derecho de rectificación\n• Derecho al borrado (\"derecho al olvido\")\n• Derecho a la limitación del tratamiento\n• Derecho a la portabilidad de los datos\n• Derecho de oposición\n• Derechos relativos a la toma de decisiones automatizada"
          },
          procedures: {
            title: "3. Procedimientos",
            content: "Para ejercer sus derechos:\n\n• Contacte nuestro DPO: privacy@aurex-kpital.de\n• Plazo de respuesta: máximo 1 mes\n• Justificante de identidad requerido\n• Gratuidad en principio (salvo abuso)\n• Posibilidad de recurso ante la autoridad de control"
          },
          security: {
            title: "4. Medidas de seguridad",
            content: "Implementamos:\n\n• Cifrado de datos sensibles\n• Controles de acceso estrictos\n• Auditorías de seguridad regulares\n• Formación del personal\n• Notificación de brechas en 72h\n• Evaluación de impacto en la protección de datos (EIPD)"
          },
          transfers: {
            title: "5. Transferencias de datos",
            content: "Las transferencias fuera de la UE están reguladas por:\n\n• Decisiones de adecuación de la Comisión\n• Cláusulas contractuales tipo (CCT)\n• Normas corporativas vinculantes (BCR)\n• Excepciones específicas (art. 49 GDPR)"
          },
          contact: {
            title: "6. Contacto DPO",
            content: "Delegado de Protección de Datos:\n\nEmail: privacy@aurex-kpital.de\nTeléfono: +33759282004\nDirección: Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemania"
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
      about: "Chi siamo",
      contact: "Contatto",
      faq: "FAQ",
    },
    legal: {
      badge: "Informazioni Legali",
      title: {
        main: "Informazioni",
        subtitle: "Legali"
      },
      description: "Trasparenza e conformità per la vostra tranquillità",
      tabs: {
        mentions: "Note Legali",
        privacy: "Privacy",
        terms: "Termini",
        gdpr: "GDPR"
      },
      mentions: {
        title: "Note Legali",
        description: "Informazioni legali obbligatorie sulla nostra società",
        company: {
          title: "Informazioni sulla società",
          name: "Denominazione sociale",
          type: "Forma giuridica",
          typeValue: "Società a responsabilità limitata (GmbH)",
          capital: "Capitale sociale",
          address: "Indirizzo della sede sociale",
          register: "Numero di iscrizione al registro",
          vat: "Numero IVA intracomunitario",
          siren: "Numero SIREN"
        },
        management: {
          title: "Direzione",
          ceo: "Direttore Generale",
          cio: "Direttrice Innovazione",
          cro: "Direttore Relazioni Clienti"
        },
        activity: {
          title: "Oggetto sociale",
          description: "Aurex K-pital GmbH è specializzata nei servizi finanziari e offre:",
          services: {
            banking: "Servizi bancari e di finanziamento",
            investment: "Consulenza per investimenti",
            insurance: "Intermediazione assicurativa",
            wealth: "Gestione patrimoniale"
          }
        },
        contact: {
          title: "Contatto",
          phone: "Telefono",
          email: "Email",
          hours: "Orari di apertura",
          schedule: "Lunedì-venerdì dalle 8 alle 19"
        },
        hosting: {
          title: "Hosting",
          description: "Questo sito è ospitato da:"
        },
        intellectual: {
          title: "Proprietà intellettuale",
          description: "Tutti i contenuti presenti su questo sito (testi, immagini, loghi, grafiche) sono proprietà esclusiva di Aurex K-pital GmbH e sono protetti dalle leggi sulla proprietà intellettuale."
        },
        responsibility: {
          title: "Limitazione di responsabilità",
          description: "Aurex K-pital GmbH si sforza di fornire informazioni accurate ma non può garantire l'accuratezza, completezza o attualità delle informazioni diffuse su questo sito."
        }
      },
      privacy: {
        title: "Politica sulla Privacy",
        description: "Protezione e trattamento dei vostri dati personali",
        lastUpdate: "Ultimo aggiornamento: 1 dicembre 2024",
        compliance: "Questa politica è conforme al GDPR e alle normative europee vigenti.",
        sections: {
          controller: {
            title: "1. Titolare del Trattamento",
            content: "Aurex K-pital GmbH, società iscritta con il numero HRB 147852 nel registro delle imprese di Amburgo, con sede sociale in Irma-Keilhack-Ring 24, 22145 Amburgo, Germania.\n\nResponsabile della Protezione dei Dati: privacy@aurex-kpital.de"
          },
          dataCollected: {
            title: "2. Dati Raccolti",
            content: "Raccogliamo le seguenti categorie di dati:\n\n• Dati di identificazione: nome, cognome, data di nascita, nazionalità\n• Dati di contatto: indirizzo postale, email, telefono\n• Dati finanziari: redditi, patrimonio, storico bancario\n• Dati di connessione: indirizzo IP, cookies, log di navigazione\n• Dati comportamentali: interazioni con i nostri servizi"
          },
          purposes: {
            title: "3. Finalità del Trattamento",
            content: "I vostri dati sono trattati per:\n\n• L'esecuzione dei nostri servizi finanziari\n• La valutazione della vostra solvibilità\n• La prevenzione di frodi e riciclaggio\n• Il rispetto dei nostri obblighi legali\n• Il miglioramento dei nostri servizi\n• La comunicazione commerciale (con il vostro consenso)"
          },
          legalBasis: {
            title: "4. Base Legale",
            content: "I nostri trattamenti si basano su:\n\n• Esecuzione contrattuale: per la fornitura dei nostri servizi\n• Obbligo legale: conformità normativa (KYC, AML)\n• Interesse legittimo: prevenzione frodi, miglioramento servizi\n• Consenso: comunicazioni marketing, cookies non essenziali"
          },
          dataSharing: {
            title: "5. Condivisione dei Dati",
            content: "I vostri dati possono essere condivisi con:\n\n• I nostri partner bancari e finanziari\n• Organismi di credito e assicurazione\n• Autorità di regolamentazione (BaFin, ACPR)\n• I nostri fornitori tecnici (sotto contratto rigoroso)\n• Autorità giudiziarie su richiesta"
          },
          retention: {
            title: "6. Conservazione dei Dati",
            content: "Conserviamo i vostri dati:\n\n• Dati cliente attivo: durata del rapporto + 5 anni\n• Dati finanziari: 10 anni dopo la fine del contratto\n• Dati di connessione: massimo 13 mesi\n• Dati marketing: 3 anni dopo l'ultimo contatto"
          },
          rights: {
            title: "7. I Vostri Diritti",
            content: "Conformemente al GDPR, avete i seguenti diritti:\n\n• Diritto di accesso: ottenere una copia dei vostri dati\n• Diritto di rettifica: correggere i vostri dati inesatti\n• Diritto alla cancellazione: eliminare i vostri dati (sotto condizioni)\n• Diritto di limitazione: limitare il trattamento\n• Diritto di portabilità: recuperare i vostri dati\n• Diritto di opposizione: opporsi al trattamento\n• Diritto di revoca del consenso\n\nPer esercitare i vostri diritti: privacy@aurex-kpital.de"
          },
          security: {
            title: "8. Sicurezza",
            content: "Implementiamo misure tecniche e organizzative appropriate:\n\n• Crittografia dei dati (AES-256)\n• Accesso limitato e controllato\n• Monitoraggio continuo dei sistemi\n• Formazione regolare del personale\n• Audit di sicurezza periodici"
          },
          transfers: {
            title: "9. Trasferimenti Internazionali",
            content: "Alcuni dati possono essere trasferiti verso paesi terzi con garanzie appropriate (clausole contrattuali tipo, decisioni di adeguatezza della Commissione Europea)."
          },
          contact: {
            title: "10. Contatto",
            content: "Per qualsiasi domanda relativa a questa politica sulla privacy:\n\nEmail: privacy@aurex-kpital.de\nTelefono: +33759282004\nIndirizzo: Irma-Keilhack-Ring 24, 22145 Amburgo, Germania"
          }
        }
      },
      terms: {
        title: "Termini e Condizioni",
        description: "Condizioni che regolano l'uso dei nostri servizi",
        lastUpdate: "Ultimo aggiornamento: 1 dicembre 2024",
        sections: {
          object: {
            title: "1. Oggetto",
            content: "Questi termini e condizioni generali regolano l'accesso e l'uso dei servizi finanziari offerti da Aurex K-pital GmbH. Costituiscono un contratto tra Aurex K-pital e il cliente."
          },
          services: {
            title: "2. Servizi offerti",
            content: "Aurex K-pital offre:\n\n• Servizi di finanziamento personale e aziendale\n• Consulenza per investimenti\n• Gestione patrimoniale\n• Servizi assicurativi\n• Strumenti di simulazione finanziaria"
          },
          registration: {
            title: "3. Registrazione e account cliente",
            content: "L'accesso ai servizi richiede la creazione di un account cliente. Il cliente si impegna a fornire informazioni accurate e aggiornate. È responsabile della riservatezza delle sue credenziali."
          },
          obligations: {
            title: "4. Obblighi del cliente",
            content: "Il cliente si impegna a:\n\n• Utilizzare i servizi conformemente al loro scopo\n• Fornire informazioni accurate e complete\n• Rispettare la normativa vigente\n• Non danneggiare i sistemi informativi"
          },
          pricing: {
            title: "5. Prezzi",
            content: "I prezzi sono indicati in euro tasse incluse. Possono essere modificati in qualsiasi momento con 30 giorni di preavviso. Ogni servizio iniziato è dovuto integralmente."
          },
          liability: {
            title: "6. Responsabilità",
            content: "Aurex K-pital si impegna a fornire i suoi servizi con diligenza. La sua responsabilità è limitata ai danni diretti. Non può essere ritenuta responsabile per perdite di esercizio o mancati guadagni."
          },
          termination: {
            title: "7. Risoluzione",
            content: "Il contratto può essere risolto in qualsiasi momento da una delle parti con 30 giorni di preavviso. In caso di inadempimento grave, la risoluzione può essere immediata."
          },
          law: {
            title: "8. Legge applicabile",
            content: "Questi termini sono regolati dalla legge tedesca. Qualsiasi controversia sarà sottoposta ai tribunali competenti di Amburgo."
          }
        }
      },
      gdpr: {
        title: "Conformità GDPR",
        description: "Il nostro impegno per la protezione dei vostri dati personali",
        sections: {
          principles: {
            title: "1. Principi fondamentali",
            content: "Aurex K-pital applica i principi del GDPR:\n\n• Legalità, correttezza e trasparenza\n• Limitazione della finalità\n• Minimizzazione dei dati\n• Esattezza\n• Limitazione della conservazione\n• Integrità e riservatezza\n• Responsabilità"
          },
          rights: {
            title: "2. I vostri diritti GDPR",
            content: "Avete i seguenti diritti:\n\n• Diritto all'informazione\n• Diritto di accesso ai dati\n• Diritto di rettifica\n• Diritto alla cancellazione (\"diritto all'oblio\")\n• Diritto alla limitazione del trattamento\n• Diritto alla portabilità dei dati\n• Diritto di opposizione\n• Diritti relativi alla decisione automatizzata"
          },
          procedures: {
            title: "3. Procedure",
            content: "Per esercitare i vostri diritti:\n\n• Contattate il nostro DPO: privacy@aurex-kpital.de\n• Tempo di risposta: massimo 1 mese\n• Documento d'identità richiesto\n• Gratuità di principio (salvo abuso)\n• Possibilità di ricorso all'autorità di controllo"
          },
          security: {
            title: "4. Misure di sicurezza",
            content: "Implementiamo:\n\n• Crittografia dei dati sensibili\n• Controlli di accesso rigorosi\n• Audit di sicurezza regolari\n• Formazione del personale\n• Notifica delle violazioni entro 72h\n• Valutazione d'impatto sulla protezione dei dati (DPIA)"
          },
          transfers: {
            title: "5. Trasferimenti di dati",
            content: "I trasferimenti fuori UE sono regolati da:\n\n• Decisioni di adeguatezza della Commissione\n• Clausole contrattuali tipo (SCC)\n• Norme vincolanti d'impresa (BCR)\n• Deroghe specifiche (art. 49 GDPR)"
          },
          contact: {
            title: "6. Contatto DPO",
            content: "Responsabile della Protezione dei Dati:\n\nEmail: privacy@aurex-kpital.de\nTelefono: +33759282004\nIndirizzo: Irma-Keilhack-Ring 24, 22145 Amburgo, Germania"
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
      about: "O nas",
      contact: "Kontakt",
      faq: "FAQ",
    },
    legal: {
      badge: "Informacje Prawne",
      title: {
        main: "Informacje",
        subtitle: "Prawne"
      },
      description: "Przejrzystość i zgodność dla Państwa spokoju ducha",
      tabs: {
        mentions: "Informacje Prawne",
        privacy: "Prywatność",
        terms: "Warunki",
        gdpr: "RODO"
      },
      mentions: {
        title: "Informacje Prawne",
        description: "Obowiązkowe informacje prawne dotyczące naszej firmy",
        company: {
          title: "Informacje o firmie",
          name: "Nazwa firmy",
          type: "Forma prawna",
          typeValue: "Spółka z ograniczoną odpowiedzialnością (GmbH)",
          capital: "Kapitał społeczny",
          address: "Adres siedziby",
          register: "Numer wpisu do rejestru",
          vat: "Numer VAT UE",
          siren: "Numer SIREN"
        },
        management: {
          title: "Zarząd",
          ceo: "Dyrektor Generalny",
          cio: "Dyrektor ds. Innowacji",
          cro: "Dyrektor ds. Relacji z Klientami"
        },
        activity: {
          title: "Przedmiot działalności",
          description: "Aurex K-pital GmbH specjalizuje się w usługach finansowych i oferuje:",
          services: {
            banking: "Usługi bankowe i finansowe",
            investment: "Doradztwo inwestycyjne",
            insurance: "Pośrednictwo ubezpieczeniowe",
            wealth: "Zarządzanie majątkiem"
          }
        },
        contact: {
          title: "Kontakt",
          phone: "Telefon",
          email: "Email",
          hours: "Godziny otwarcia",
          schedule: "Poniedziałek-piątek 8:00-19:00"
        },
        hosting: {
          title: "Hosting",
          description: "Ta strona jest hostowana przez:"
        },
        intellectual: {
          title: "Własność intelektualna",
          description: "Wszystkie treści obecne na tej stronie (teksty, obrazy, logo, grafiki) są wyłączną własnością Aurex K-pital GmbH i są chronione przez prawa własności intelektualnej."
        },
        responsibility: {
          title: "Ograniczenie odpowiedzialności",
          description: "Aurex K-pital GmbH stara się dostarczać dokładne informacje, ale nie może zagwarantować dokładności, kompletności lub aktualności informacji rozpowszechnianych na tej stronie."
        }
      },
      privacy: {
        title: "Polityka Prywatności",
        description: "Ochrona i przetwarzanie Państwa danych osobowych",
        lastUpdate: "Ostatnia aktualizacja: 1 grudnia 2024",
        compliance: "Ta polityka jest zgodna z RODO i obowiązującymi przepisami europejskimi.",
        sections: {
          controller: {
            title: "1. Administrator Danych",
            content: "Aurex K-pital GmbH, spółka wpisana pod numerem HRB 147852 do rejestru handlowego w Hamburgu, z siedzibą w Irma-Keilhack-Ring 24, 22145 Hamburg, Niemcy.\n\nInspektor Ochrony Danych: privacy@aurex-kpital.de"
          },
          dataCollected: {
            title: "2. Zbierane Dane",
            content: "Zbieramy następujące kategorie danych:\n\n• Dane identyfikacyjne: imię, nazwisko, data urodzenia, narodowość\n• Dane kontaktowe: adres pocztowy, email, telefon\n• Dane finansowe: dochody, majątek, historia bankowa\n• Dane połączenia: adres IP, cookies, logi nawigacji\n• Dane behawioralne: interakcje z naszymi usługami"
          },
          purposes: {
            title: "3. Cele Przetwarzania",
            content: "Państwa dane są przetwarzane w celu:\n\n• Świadczenia naszych usług finansowych\n• Oceny Państwa zdolności kredytowej\n• Zapobiegania oszustwom i praniu pieniędzy\n• Wypełniania naszych obowiązków prawnych\n• Ulepszania naszych usług\n• Komunikacji handlowej (za Państwa zgodą)"
          },
          legalBasis: {
            title: "4. Podstawa Prawna",
            content: "Nasze przetwarzanie opiera się na:\n\n• Wykonanie umowy: dla świadczenia naszych usług\n• Obowiązek prawny: zgodność regulacyjna (KYC, AML)\n• Uzasadniony interes: zapobieganie oszustwom, ulepszanie usług\n• Zgoda: komunikacja marketingowa, cookies nieistotne"
          },
          dataSharing: {
            title: "5. Udostępnianie Danych",
            content: "Państwa dane mogą być udostępniane:\n\n• Naszym partnerom bankowym i finansowym\n• Organizacjom kredytowym i ubezpieczeniowym\n• Organom regulacyjnym (BaFin, ACPR)\n• Naszym dostawcom technicznym (pod ścisłą umową)\n• Organom sądowym na żądanie"
          },
          retention: {
            title: "6. Przechowywanie Danych",
            content: "Przechowujemy Państwa dane:\n\n• Dane aktywnego klienta: czas trwania relacji + 5 lat\n• Dane finansowe: 10 lat po zakończeniu umowy\n• Dane połączenia: maksymalnie 13 miesięcy\n• Dane marketingowe: 3 lata po ostatnim kontakcie"
          },
          rights: {
            title: "7. Państwa Prawa",
            content: "Zgodnie z RODO mają Państwo następujące prawa:\n\n• Prawo dostępu: otrzymanie kopii swoich danych\n• Prawo sprostowania: poprawienie nieprawidłowych danych\n• Prawo do usunięcia: usunięcie swoich danych (pod warunkami)\n• Prawo ograniczenia: ograniczenie przetwarzania\n• Prawo przenoszenia: odzyskanie swoich danych\n• Prawo sprzeciwu: sprzeciw wobec przetwarzania\n• Prawo wycofania zgody\n\nAby skorzystać ze swoich praw: privacy@aurex-kpital.de"
          },
          security: {
            title: "8. Bezpieczeństwo",
            content: "Wdrażamy odpowiednie środki techniczne i organizacyjne:\n\n• Szyfrowanie danych (AES-256)\n• Ograniczony i kontrolowany dostęp\n• Ciągłe monitorowanie systemów\n• Regularne szkolenia personelu\n• Okresowe audyty bezpieczeństwa"
          },
          transfers: {
            title: "9. Transfery Międzynarodowe",
            content: "Niektóre dane mogą być przekazywane do krajów trzecich z odpowiednimi gwarancjami (standardowe klauzule umowne, decyzje o adekwatności Komisji Europejskiej)."
          },
          contact: {
            title: "10. Kontakt",
            content: "W przypadku pytań dotyczących tej polityki prywatności:\n\nEmail: privacy@aurex-kpital.de\nTelefon: +33759282004\nAdres: Irma-Keilhack-Ring 24, 22145 Hamburg, Niemcy"
          }
        }
      },
      terms: {
        title: "Regulamin",
        description: "Warunki korzystania z naszych usług",
        lastUpdate: "Ostatnia aktualizacja: 1 grudnia 2024",
        sections: {
          object: {
            title: "1. Przedmiot",
            content: "Niniejszy regulamin reguluje dostęp i korzystanie z usług finansowych oferowanych przez Aurex K-pital GmbH. Stanowi umowę między Aurex K-pital a klientem."
          },
          services: {
            title: "2. Oferowane usługi",
            content: "Aurex K-pital oferuje:\n\n• Usługi finansowania osobistego i biznesowego\n• Doradztwo inwestycyjne\n• Zarządzanie majątkiem\n• Usługi ubezpieczeniowe\n• Narzędzia symulacji finansowej"
          },
          registration: {
            title: "3. Rejestracja i konto klienta",
            content: "Dostęp do usług wymaga utworzenia konta klienta. Klient zobowiązuje się do podania dokładnych i aktualnych informacji. Jest odpowiedzialny za poufność swoich danych logowania."
          },
          obligations: {
            title: "4. Obowiązki klienta",
            content: "Klient zobowiązuje się do:\n\n• Korzystania z usług zgodnie z ich przeznaczeniem\n• Podawania dokładnych i kompletnych informacji\n• Przestrzegania obowiązujących przepisów\n• Nienaruszania systemów informatycznych"
          },
          pricing: {
            title: "5. Cennik",
            content: "Ceny podane są w euro z uwzględnieniem wszystkich podatków. Mogą być zmieniane w dowolnym momencie z 30-dniowym okresem wypowiedzenia. Każda rozpoczęta usługa jest należna w całości."
          },
          liability: {
            title: "6. Odpowiedzialność",
            content: "Aurex K-pital zobowiązuje się do świadczenia usług z należytą starannością. Odpowiedzialność ograniczona jest do szkód bezpośrednich. Nie ponosi odpowiedzialności za straty operacyjne lub utracone zyski."
          },
          termination: {
            title: "7. Rozwiązanie umowy",
            content: "Umowa może być rozwiązana w dowolnym momencie przez którąkolwiek ze stron z 30-dniowym okresem wypowiedzenia. W przypadku poważnego naruszenia rozwiązanie może być natychmiastowe."
          },
          law: {
            title: "8. Prawo właściwe",
            content: "Niniejszy regulamin podlega prawu niemieckiemu. Wszelkie spory będą podlegać sądom właściwym w Hamburgu."
          }
        }
      },
      gdpr: {
        title: "Zgodność z RODO",
        description: "Nasze zobowiązanie do ochrony Państwa danych osobowych",
        sections: {
          principles: {
            title: "1. Zasady podstawowe",
            content: "Aurex K-pital stosuje zasady RODO:\n\n• Zgodność z prawem, rzetelność i przejrzystość\n• Ograniczenie celu\n• Minimalizacja danych\n• Prawidłowość\n• Ograniczenie przechowywania\n• Integralność i poufność\n• Rozliczalność"
          },
          rights: {
            title: "2. Państwa prawa RODO",
            content: "Przysługują Państwu następujące prawa:\n\n• Prawo do informacji\n• Prawo dostępu do danych\n• Prawo do sprostowania\n• Prawo do usunięcia (\"prawo do bycia zapomnianym\")\n• Prawo do ograniczenia przetwarzania\n• Prawo do przenoszenia danych\n• Prawo do sprzeciwu\n• Prawa dotyczące zautomatyzowanego podejmowania decyzji"
          },
          procedures: {
            title: "3. Procedury",
            content: "Aby skorzystać ze swoich praw:\n\n• Skontaktuj się z naszym IOD: privacy@aurex-kpital.de\n• Czas odpowiedzi: maksymalnie 1 miesiąc\n• Wymagany dowód tożsamości\n• Z zasady bezpłatnie (z wyjątkiem nadużyć)\n• Możliwość złożenia skargi do organu nadzorczego"
          },
          security: {
            title: "4. Środki bezpieczeństwa",
            content: "Wdrażamy:\n\n• Szyfrowanie danych wrażliwych\n• Ścisłe kontrole dostępu\n• Regularne audyty bezpieczeństwa\n• Szkolenia personelu\n• Zgłaszanie naruszeń w ciągu 72h\n• Ocenę skutków dla ochrony danych (DPIA)"
          },
          transfers: {
            title: "5. Przekazywanie danych",
            content: "Przekazywanie poza UE jest regulowane przez:\n\n• Decyzje Komisji o adekwatności\n• Standardowe klauzule umowne (SCC)\n• Wiążące reguły korporacyjne (BCR)\n• Szczególne wyjątki (art. 49 RODO)"
          },
          contact: {
            title: "6. Kontakt z IOD",
            content: "Inspektor Ochrony Danych:\n\nEmail: privacy@aurex-kpital.de\nTelefon: +33759282004\nAdres: Irma-Keilhack-Ring 24, 22145 Hamburg, Niemcy"
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
      about: "Tietoa meistä",
      contact: "Yhteystiedot",
      faq: "UKK",
    },
    legal: {
      badge: "Oikeudelliset Tiedot",
      title: {
        main: "Oikeudelliset",
        subtitle: "Tiedot"
      },
      description: "Läpinäkyvyyttä ja vaatimustenmukaisuutta mielenrauhaanne",
      tabs: {
        mentions: "Lakimääräykset",
        privacy: "Yksityisyys",
        terms: "Ehdot",
        gdpr: "GDPR"
      },
      mentions: {
        title: "Lakimääräykset",
        description: "Pakolliset oikeudelliset tiedot yrityksestämme",
        company: {
          title: "Yritystiedot",
          name: "Yrityksen nimi",
          type: "Oikeudellinen muoto",
          typeValue: "Osakeyhtiö (GmbH)",
          capital: "Osakepääoma",
          address: "Pääkonttorin osoite",
          register: "Kaupparekisterinumero",
          vat: "EU:n ALV-numero",
          siren: "SIREN-numero"
        },
        management: {
          title: "Johto",
          ceo: "Toimitusjohtaja",
          cio: "Innovaatiojohtaja",
          cro: "Asiakassuhteiden johtaja"
        },
        activity: {
          title: "Liiketoiminta",
          description: "Aurex K-pital GmbH on erikoistunut rahoituspalveluihin ja tarjoaa:",
          services: {
            banking: "Pankki- ja rahoituspalvelut",
            investment: "Sijoitusneuvonta",
            insurance: "Vakuutusvälitys",
            wealth: "Varallisuudenhoito"
          }
        },
        contact: {
          title: "Yhteystiedot",
          phone: "Puhelin",
          email: "Sähköposti",
          hours: "Aukioloajat",
          schedule: "Maanantai-perjantai 8-19"
        },
        hosting: {
          title: "Hosting",
          description: "Tämä sivusto on isännöity:"
        },
        intellectual: {
          title: "Immateriaalioikeudet",
          description: "Kaikki tällä sivustolla oleva sisältö (tekstit, kuvat, logot, grafiikat) on Aurex K-pital GmbH:n yksinomaista omaisuutta ja suojattu tekijänoikeuslaeilla."
        },
        responsibility: {
          title: "Vastuun rajoitus",
          description: "Aurex K-pital GmbH pyrkii tarjoamaan tarkkoja tietoja, mutta ei voi taata tällä sivustolla levitettyjen tietojen tarkkuutta, täydellisyyttä tai ajankohtaisuutta."
        }
      },
      privacy: {
        title: "Tietosuojakäytäntö",
        description: "Henkilötietojenne suoja ja käsittely",
        lastUpdate: "Viimeksi päivitetty: 1. joulukuuta 2024",
        compliance: "Tämä käytäntö on GDPR:n ja voimassa olevien eurooppalaisten säädösten mukainen.",
        sections: {
          controller: {
            title: "1. Rekisterinpitäjä",
            content: "Aurex K-pital GmbH, rekisteröity numerolla HRB 147852 Hampurin kaupparekisteriin, kotipaikka Irma-Keilhack-Ring 24, 22145 Hamburg, Saksa.\n\nTietosuojavastaava: privacy@aurex-kpital.de"
          },
          dataCollected: {
            title: "2. Kerättävät Tiedot",
            content: "Keräämme seuraavia tietokategorioita:\n\n• Tunnistautumistiedot: nimi, syntymäaika, kansallisuus\n• Yhteystiedot: postiosoite, sähköposti, puhelin\n• Taloudelliset tiedot: tulot, varallisuus, pankkihistoria\n• Yhteystiedot: IP-osoite, evästeet, navigointiloki\n• Käyttäytymistiedot: vuorovaikutus palveluidemme kanssa"
          },
          purposes: {
            title: "3. Käsittelyn Tarkoitukset",
            content: "Tietojanne käsitellään:\n\n• Rahoituspalveluidemme toteuttamiseksi\n• Luottokelpoisuutenne arvioimiseksi\n• Petosten ja rahanpesun ehkäisemiseksi\n• Lakisääteisten velvoitteidemme täyttämiseksi\n• Palveluidemme parantamiseksi\n• Kaupallista viestintää varten (suostumuksellanne)"
          },
          legalBasis: {
            title: "4. Oikeusperusta",
            content: "Käsittelyämme perustuu:\n\n• Sopimuksen täyttäminen: palveluidemme tarjoamiseksi\n• Lakisääteinen velvoite: säännösten noudattaminen (KYC, AML)\n• Oikeutettu etu: petosten ehkäisy, palvelujen parantaminen\n• Suostumus: markkinointiviestintä, ei-välttämättömät evästeet"
          },
          dataSharing: {
            title: "5. Tietojen Jakaminen",
            content: "Tietojanne voidaan jakaa:\n\n• Pankki- ja rahoituskumppaneidemme kanssa\n• Luotto- ja vakuutusorganisaatioiden kanssa\n• Sääntelyviranomaisten kanssa (BaFin, ACPR)\n• Teknisten palveluntarjoajiemme kanssa (tiukalla sopimuksella)\n• Oikeusviranomaisten kanssa pyynnöstä"
          },
          retention: {
            title: "6. Tietojen Säilyttäminen",
            content: "Säilytämme tietojanne:\n\n• Aktiivisen asiakkaan tiedot: suhteen kesto + 5 vuotta\n• Taloudelliset tiedot: 10 vuotta sopimuksen päättymisen jälkeen\n• Yhteystiedot: enintään 13 kuukautta\n• Markkinointitiedot: 3 vuotta viimeisen yhteydenoton jälkeen"
          },
          rights: {
            title: "7. Oikeutenne",
            content: "GDPR:n mukaisesti teillä on seuraavat oikeudet:\n\n• Tiedonsaantioikeus: saada kopio tiedoistanne\n• Oikaisun oikeus: korjata virheelliset tiedot\n• Poisto-oikeus: poistaa tietonne (tietyin ehdoin)\n• Rajoittamisen oikeus: rajoittaa käsittelyä\n• Siirrettävyyden oikeus: saada tietonne takaisin\n• Vastustamisen oikeus: vastustaa käsittelyä\n• Suostumuksen peruuttamisen oikeus\n\nOikeuksianne käyttääksenne: privacy@aurex-kpital.de"
          },
          security: {
            title: "8. Turvallisuus",
            content: "Toteutamme asianmukaiset tekniset ja organisatoriset toimenpiteet:\n\n• Tietojen salaus (AES-256)\n• Rajoitettu ja kontrolloitu pääsy\n• Jatkuva järjestelmien valvonta\n• Säännöllinen henkilöstön koulutus\n• Säännölliset turvallisuusauditoinnit"
          },
          transfers: {
            title: "9. Kansainväliset Siirrot",
            content: "Tiettyjä tietoja voidaan siirtää kolmansiin maihin asianmukaisin takuin (vakiosopimuslausekkeet, Euroopan komission riittävyyspäätökset)."
          },
          contact: {
            title: "10. Yhteystiedot",
            content: "Kysymyksiä tietosuojakäytännöstä:\n\nSähköposti: privacy@aurex-kpital.de\nPuhelin: +33759282004\nOsoite: Irma-Keilhack-Ring 24, 22145 Hamburg, Saksa"
          }
        }
      },
      terms: {
        title: "Käyttöehdot",
        description: "Palveluidemme käyttöä koskevat ehdot",
        lastUpdate: "Viimeksi päivitetty: 1. joulukuuta 2024",
        sections: {
          object: {
            title: "1. Tarkoitus",
            content: "Nämä yleiset käyttöehdot säätelevät Aurex K-pital GmbH:n tarjoamien rahoituspalvelujen käyttöä ja saatavuutta. Ne muodostavat sopimuksen Aurex K-pitalin ja asiakkaan välillä."
          },
          services: {
            title: "2. Tarjotut palvelut",
            content: "Aurex K-pital tarjoaa:\n\n• Henkilö- ja yritysrahoituspalveluja\n• Sijoitusneuvontaa\n• Varallisuudenhoitoa\n• Vakuutuspalveluja\n• Rahoitussimulaatiotyökaluja"
          },
          registration: {
            title: "3. Rekisteröityminen ja asiakastili",
            content: "Palvelujen käyttö edellyttää asiakastilin luomista. Asiakas sitoutuu antamaan tarkkoja ja ajantasaisia tietoja. Hän on vastuussa kirjautumistietojensa luottamuksellisuudesta."
          },
          obligations: {
            title: "4. Asiakkaan velvollisuudet",
            content: "Asiakas sitoutuu:\n\n• Käyttämään palveluja niiden tarkoituksen mukaisesti\n• Antamaan tarkkoja ja täydellisiä tietoja\n• Noudattamaan voimassa olevia säädöksiä\n• Olemaan vahingoittamatta tietojärjestelmiä"
          },
          pricing: {
            title: "5. Hinnoittelu",
            content: "Hinnat ilmoitetaan euroina sisältäen kaikki verot. Niitä voidaan muuttaa milloin tahansa 30 päivän ennakkoilmoituksella. Jokainen aloitettu palvelu on maksettava kokonaisuudessaan."
          },
          liability: {
            title: "6. Vastuu",
            content: "Aurex K-pital sitoutuu tarjoamaan palvelunsa huolellisesti. Vastuu rajoittuu välittömiin vahinkoihin. Se ei voi olla vastuussa liiketappioista tai menetetyistä voitoista."
          },
          termination: {
            title: "7. Irtisanominen",
            content: "Sopimus voidaan irtisanoa milloin tahansa kumman tahansa osapuolen toimesta 30 päivän irtisanomisajalla. Vakavan rikkomuksen tapauksessa irtisanominen voi olla välitön."
          },
          law: {
            title: "8. Sovellettava laki",
            content: "Näihin ehtoihin sovelletaan Saksan lakia. Kaikki riidat kuuluvat Hampurin toimivaltaisten tuomioistuinten käsiteltäviksi."
          }
        }
      },
      gdpr: {
        title: "GDPR-vaatimustenmukaisuus",
        description: "Sitoutumisemme henkilötietojenne suojaamiseen",
        sections: {
          principles: {
            title: "1. Perusperiaatteet",
            content: "Aurex K-pital soveltaa GDPR:n periaatteita:\n\n• Laillisuus, rehellisyys ja läpinäkyvyys\n• Tarkoitussidonnaisuus\n• Tietojen minimointi\n• Tarkkuus\n• Säilyttämisen rajoittaminen\n• Eheys ja luottamuksellisuus\n• Vastuullisuus"
          },
          rights: {
            title: "2. GDPR-oikeutenne",
            content: "Teillä on seuraavat oikeudet:\n\n• Oikeus tiedonsaantiin\n• Oikeus päästä tietoihin\n• Oikeus oikaisemiseen\n• Oikeus poistamiseen (\"oikeus tulla unohdetuksi\")\n• Oikeus käsittelyn rajoittamiseen\n• Oikeus tietojen siirrettävyyteen\n• Vastustamisoikeus\n• Oikeudet automaattiseen päätöksentekoon"
          },
          procedures: {
            title: "3. Menettelyt",
            content: "Oikeuksianne käyttääksenne:\n\n• Ottakaa yhteyttä DPO:omme: privacy@aurex-kpital.de\n• Vastausaika: enintään 1 kuukausi\n• Henkilöllisyystodistus vaaditaan\n• Periaatteessa ilmaista (väärinkäyttöä lukuun ottamatta)\n• Mahdollisuus valittaa valvontaviranomaiselle"
          },
          security: {
            title: "4. Turvatoimet",
            content: "Toteutamme:\n\n• Arkaluonteisten tietojen salauksen\n• Tiukat pääsynhallintamenetelmät\n• Säännölliset turvallisuusauditoinnit\n• Henkilöstön koulutuksen\n• Tietoturvaloukkauksien ilmoittamisen 72 tunnissa\n• Tietosuojaa koskevan vaikutustenarvioinnin (DPIA)"
          },
          transfers: {
            title: "5. Tiedonsiirrot",
            content: "EU:n ulkopuoliset siirrot säännellään:\n\n• Komission riittävyyspäätöksillä\n• Vakiosopimuslausekkeilla (SCC)\n• Sitovilla yrityssäännöillä (BCR)\n• Erityisillä poikkeuksilla (49 artikla GDPR)"
          },
          contact: {
            title: "6. DPO-yhteystiedot",
            content: "Tietosuojavastaava:\n\nSähköposti: privacy@aurex-kpital.de\nPuhelin: +33759282004\nOsoite: Irma-Keilhack-Ring 24, 22145 Hamburg, Saksa"
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
      about: "Sobre nós",
      contact: "Contacto",
      faq: "FAQ",
    },
    legal: {
      badge: "Informações Legais",
      title: {
        main: "Informações",
        subtitle: "Legais"
      },
      description: "Transparência e conformidade para a vossa tranquilidade",
      tabs: {
        mentions: "Aviso Legal",
        privacy: "Privacidade",
        terms: "Termos",
        gdpr: "RGPD"
      },
      mentions: {
        title: "Aviso Legal",
        description: "Informações legais obrigatórias sobre a nossa empresa",
        company: {
          title: "Informações da empresa",
          name: "Denominação social",
          type: "Forma jurídica",
          typeValue: "Sociedade por quotas (GmbH)",
          capital: "Capital social",
          address: "Endereço da sede social",
          register: "Número de registo",
          vat: "Número de IVA intracomunitário",
          siren: "Número SIREN"
        },
        management: {
          title: "Direção",
          ceo: "Diretor-Geral",
          cio: "Diretora de Inovação",
          cro: "Diretor de Relações com Clientes"
        },
        activity: {
          title: "Objeto social",
          description: "A Aurex K-pital GmbH é especializada em serviços financeiros e oferece:",
          services: {
            banking: "Serviços bancários e de financiamento",
            investment: "Consultoria de investimento",
            insurance: "Mediação de seguros",
            wealth: "Gestão de patrimónios"
          }
        },
        contact: {
          title: "Contacto",
          phone: "Telefone",
          email: "Email",
          hours: "Horário de funcionamento",
          schedule: "Segunda a sexta das 8h às 19h"
        },
        hosting: {
          title: "Alojamento",
          description: "Este site é alojado por:"
        },
        intellectual: {
          title: "Propriedade intelectual",
          description: "Todos os conteúdos presentes neste site (textos, imagens, logótipos, gráficos) são propriedade exclusiva da Aurex K-pital GmbH e estão protegidos pelas leis de propriedade intelectual."
        },
        responsibility: {
          title: "Limitação de responsabilidade",
          description: "A Aurex K-pital GmbH esforça-se por fornecer informações precisas mas não pode garantir a exatidão, integridade ou atualidade das informações divulgadas neste site."
        }
      },
      privacy: {
        title: "Política de Privacidade",
        description: "Proteção e tratamento dos vossos dados pessoais",
        lastUpdate: "Última atualização: 1 de dezembro de 2024",
        compliance: "Esta política está em conformidade com o RGPD e regulamentações europeias em vigor.",
        sections: {
          controller: {
            title: "1. Responsável pelo Tratamento",
            content: "Aurex K-pital GmbH, sociedade inscrita sob o número HRB 147852 no registo comercial de Hamburgo, com sede social em Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemanha.\n\nEncarregado da Proteção de Dados: privacy@aurex-kpital.de"
          },
          dataCollected: {
            title: "2. Dados Recolhidos",
            content: "Recolhemos as seguintes categorias de dados:\n\n• Dados de identificação: nome, apelido, data de nascimento, nacionalidade\n• Dados de contacto: endereço postal, email, telefone\n• Dados financeiros: rendimentos, património, histórico bancário\n• Dados de ligação: endereço IP, cookies, logs de navegação\n• Dados comportamentais: interações com os nossos serviços"
          },
          purposes: {
            title: "3. Finalidades do Tratamento",
            content: "Os vossos dados são processados para:\n\n• A execução dos nossos serviços financeiros\n• A avaliação da vossa solvabilidade\n• A prevenção de fraude e branqueamento\n• O cumprimento das nossas obrigações legais\n• A melhoria dos nossos serviços\n• A comunicação comercial (com o vosso consentimento)"
          },
          legalBasis: {
            title: "4. Base Legal",
            content: "Os nossos tratamentos baseiam-se em:\n\n• Execução contratual: para a prestação dos nossos serviços\n• Obrigação legal: conformidade regulamentar (KYC, AML)\n• Interesse legítimo: prevenção de fraudes, melhoria de serviços\n• Consentimento: comunicações de marketing, cookies não essenciais"
          },
          dataSharing: {
            title: "5. Partilha de Dados",
            content: "Os vossos dados podem ser partilhados com:\n\n• Os nossos parceiros bancários e financeiros\n• Organismos de crédito e seguros\n• Autoridades reguladoras (BaFin, ACPR)\n• Os nossos fornecedores técnicos (sob contrato rigoroso)\n• Autoridades judiciais mediante requisição"
          },
          retention: {
            title: "6. Conservação de Dados",
            content: "Conservamos os vossos dados:\n\n• Dados de cliente ativo: duração da relação + 5 anos\n• Dados financeiros: 10 anos após o fim do contrato\n• Dados de ligação: máximo 13 meses\n• Dados de marketing: 3 anos após o último contacto"
          },
          rights: {
            title: "7. Os Vossos Direitos",
            content: "Em conformidade com o RGPD, tendes os seguintes direitos:\n\n• Direito de acesso: obter uma cópia dos vossos dados\n• Direito de retificação: corrigir os vossos dados inexatos\n• Direito ao apagamento: eliminar os vossos dados (sob condições)\n• Direito de limitação: restringir o processamento\n• Direito de portabilidade: recuperar os vossos dados\n• Direito de oposição: opor-se ao processamento\n• Direito de retirada do consentimento\n\nPara exercer os vossos direitos: privacy@aurex-kpital.de"
          },
          security: {
            title: "8. Segurança",
            content: "Implementamos medidas técnicas e organizacionais apropriadas:\n\n• Encriptação de dados (AES-256)\n• Acesso restrito e controlado\n• Monitorização contínua de sistemas\n• Formação regular do pessoal\n• Auditorias de segurança periódicas"
          },
          transfers: {
            title: "9. Transferências Internacionais",
            content: "Alguns dados podem ser transferidos para países terceiros com garantias apropriadas (cláusulas contratuais tipo, decisões de adequação da Comissão Europeia)."
          },
          contact: {
            title: "10. Contacto",
            content: "Para qualquer questão relativa a esta política de privacidade:\n\nEmail: privacy@aurex-kpital.de\nTelefone: +33759282004\nEndereço: Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemanha"
          }
        }
      },
      terms: {
        title: "Termos e Condições",
        description: "Condições que regem o uso dos nossos serviços",
        lastUpdate: "Última atualização: 1 de dezembro de 2024",
        sections: {
          object: {
            title: "1. Objeto",
            content: "Estes termos e condições gerais regulam o acesso e uso dos serviços financeiros oferecidos pela Aurex K-pital GmbH. Constituem um contrato entre a Aurex K-pital e o cliente."
          },
          services: {
            title: "2. Serviços oferecidos",
            content: "A Aurex K-pital oferece:\n\n• Serviços de financiamento pessoal e empresarial\n• Consultoria de investimento\n• Gestão de património\n• Serviços de seguros\n• Ferramentas de simulação financeira"
          },
          registration: {
            title: "3. Registo e conta de cliente",
            content: "O acesso aos serviços requer a criação de uma conta de cliente. O cliente compromete-se a fornecer informações precisas e atualizadas. É responsável pela confidencialidade das suas credenciais."
          },
          obligations: {
            title: "4. Obrigações do cliente",
            content: "O cliente compromete-se a:\n\n• Usar os serviços de acordo com o seu propósito\n• Fornecer informações precisas e completas\n• Respeitar a regulamentação em vigor\n• Não prejudicar os sistemas de informação"
          },
          pricing: {
            title: "5. Preços",
            content: "Os preços são indicados em euros com todos os impostos incluídos. Podem ser alterados a qualquer momento com 30 dias de aviso prévio. Qualquer serviço iniciado é devido integralmente."
          },
          liability: {
            title: "6. Responsabilidade",
            content: "A Aurex K-pital compromete-se a fornecer os seus serviços com diligência. A sua responsabilidade limita-se a danos diretos. Não pode ser responsabilizada por perdas operacionais ou lucros cessantes."
          },
          termination: {
            title: "7. Rescisão",
            content: "O contrato pode ser rescindido a qualquer momento por qualquer das partes com 30 dias de aviso prévio. Em caso de incumprimento grave, a rescisão pode ser imediata."
          },
          law: {
            title: "8. Lei aplicável",
            content: "Estes termos são regidos pela lei alemã. Qualquer litígio será submetido aos tribunais competentes de Hamburgo."
          }
        }
      },
      gdpr: {
        title: "Conformidade com RGPD",
        description: "O nosso compromisso com a proteção dos vossos dados pessoais",
        sections: {
          principles: {
            title: "1. Princípios fundamentais",
            content: "A Aurex K-pital aplica os princípios do RGPD:\n\n• Licitude, lealdade e transparência\n• Limitação das finalidades\n• Minimização dos dados\n• Exatidão\n• Limitação da conservação\n• Integridade e confidencialidade\n• Responsabilidade"
          },
          rights: {
            title: "2. Os vossos direitos RGPD",
            content: "Tendes os seguintes direitos:\n\n• Direito à informação\n• Direito de acesso aos dados\n• Direito de retificação\n• Direito ao apagamento (\"direito a ser esquecido\")\n• Direito à limitação do tratamento\n• Direito à portabilidade dos dados\n• Direito de oposição\n• Direitos relativos à tomada de decisão automatizada"
          },
          procedures: {
            title: "3. Procedimentos",
            content: "Para exercer os vossos direitos:\n\n• Contactai o nosso DPO: privacy@aurex-kpital.de\n• Prazo de resposta: máximo 1 mês\n• Comprovativo de identidade necessário\n• Gratuidade em princípio (salvo abuso)\n• Possibilidade de recurso junto da autoridade de controlo"
          },
          security: {
            title: "4. Medidas de segurança",
            content: "Implementamos:\n\n• Encriptação de dados sensíveis\n• Controlos de acesso rigorosos\n• Auditorias de segurança regulares\n• Formação do pessoal\n• Notificação de violações em 72h\n• Avaliação de impacto sobre a proteção de dados (AIPD)"
          },
          transfers: {
            title: "5. Transferências de dados",
            content: "As transferências fora da UE são enquadradas por:\n\n• Decisões de adequação da Comissão\n• Cláusulas contratuais tipo (CCT)\n• Regras corporativas vinculativas (BCR)\n• Derrogações específicas (art. 49 RGPD)"
          },
          contact: {
            title: "6. Contacto DPO",
            content: "Encarregado da Proteção de Dados:\n\nEmail: privacy@aurex-kpital.de\nTelefone: +33759282004\nEndereço: Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemanha"
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
      about: "Σχετικά",
      contact: "Επικοινωνία",
      faq: "FAQ",
    },
    legal: {
      badge: "Νομικές Πληροφορίες",
      title: {
        main: "Νομικές",
        subtitle: "Πληροφορίες"
      },
      description: "Διαφάνεια και συμμόρφωση για την ηρεμία σας",
      tabs: {
        mentions: "Νομικές Αναφορές",
        privacy: "Ιδιωτικότητα",
        terms: "Όροι",
        gdpr: "GDPR"
      },
      mentions: {
        title: "Νομικές Αναφορές",
        description: "Υποχρεωτικές νομικές πληροφορίες για την εταιρεία μας",
        company: {
          title: "Στοιχεία εταιρείας",
          name: "Επωνυμία εταιρείας",
          type: "Νομική μορφή",
          typeValue: "Εταιρεία περιορισμένης ευθύνης (GmbH)",
          capital: "Κοινωνικό κεφάλαιο",
          address: "Διεύθυνση έδρας",
          register: "Αριθμός μητρώου",
          vat: "Αριθμός ΦΠΑ ΕΕ",
          siren: "Αριθμός SIREN"
        },
        management: {
          title: "Διοίκηση",
          ceo: "Γενικός Διευθυντής",
          cio: "Διευθύντρια Καινοτομίας",
          cro: "Διευθυντής Πελατειακών Σχέσεων"
        },
        activity: {
          title: "Εταιρικός σκοπός",
          description: "Η Aurex K-pital GmbH ειδικεύεται σε χρηματοοικονομικές υπηρεσίες και προσφέρει:",
          services: {
            banking: "Τραπεζικές και χρηματοδοτικές υπηρεσίες",
            investment: "Επενδυτική συμβουλευτική",
            insurance: "Ασφαλιστική διαμεσολάβηση",
            wealth: "Διαχείριση περιουσίας"
          }
        },
        contact: {
          title: "Επικοινωνία",
          phone: "Τηλέφωνο",
          email: "Email",
          hours: "Ώρες λειτουργίας",
          schedule: "Δευτέρα-Παρασκευή 8:00-19:00"
        },
        hosting: {
          title: "Φιλοξενία",
          description: "Αυτός ο ιστότοπος φιλοξενείται από:"
        },
        intellectual: {
          title: "Πνευματική ιδιοκτησία",
          description: "Όλο το περιεχόμενο αυτού του ιστότοπου (κείμενα, εικόνες, λογότυπα, γραφικά) είναι αποκλειστική ιδιοκτησία της Aurex K-pital GmbH και προστατεύεται από τους νόμους πνευματικής ιδιοκτησίας."
        },
        responsibility: {
          title: "Περιορισμός ευθύνης",
          description: "Η Aurex K-pital GmbH προσπαθεί να παρέχει ακριβείς πληροφορίες αλλά δεν μπορεί να εγγυηθεί την ακρίβεια, πληρότητα ή επικαιρότητα των πληροφοριών που διαδίδονται σε αυτόν τον ιστότοπο."
        }
      },
      privacy: {
        title: "Πολιτική Απορρήτου",
        description: "Προστασία και επεξεργασία των προσωπικών σας δεδομένων",
        lastUpdate: "Τελευταία ενημέρωση: 1η Δεκεμβρίου 2024",
        compliance: "Αυτή η πολιτική συμμορφώνεται με τον GDPR και τους ισχύοντες ευρωπαϊκούς κανονισμούς.",
        sections: {
          controller: {
            title: "1. Υπεύθυνος Επεξεργασίας",
            content: "Aurex K-pital GmbH, εταιρεία εγγεγραμμένη με αριθμό HRB 147852 στο εμπορικό μητρώο του Αμβούργου, με έδρα στη διεύθυνση Irma-Keilhack-Ring 24, 22145 Αμβούργο, Γερμανία.\n\nΥπεύθυνος Προστασίας Δεδομένων: privacy@aurex-kpital.de"
          },
          dataCollected: {
            title: "2. Συλλεγόμενα Δεδομένα",
            content: "Συλλέγουμε τις ακόλουθες κατηγορίες δεδομένων:\n\n• Δεδομένα ταυτοποίησης: όνομα, επώνυμο, ημερομηνία γέννησης, εθνικότητα\n• Στοιχεία επικοινωνίας: ταχυδρομική διεύθυνση, email, τηλέφωνο\n• Οικονομικά δεδομένα: εισοδήματα, περιουσία, τραπεζικό ιστορικό\n• Δεδομένα σύνδεσης: διεύθυνση IP, cookies, αρχεία πλοήγησης\n• Δεδομένα συμπεριφοράς: αλληλεπιδράσεις με τις υπηρεσίες μας"
          },
          purposes: {
            title: "3. Σκοποί Επεξεργασίας",
            content: "Τα δεδομένα σας επεξεργάζονται για:\n\n• Την εκτέλεση των χρηματοοικονομικών μας υπηρεσιών\n• Την αξιολόγηση της πιστοληπτικής σας ικανότητας\n• Την πρόληψη απάτης και ξεπλύματος χρήματος\n• Τη συμμόρφωση με τις νομικές μας υποχρεώσεις\n• Τη βελτίωση των υπηρεσιών μας\n• Την εμπορική επικοινωνία (με τη συγκατάθεσή σας)"
          },
          legalBasis: {
            title: "4. Νομική Βάση",
            content: "Οι επεξεργασίες μας βασίζονται σε:\n\n• Εκτέλεση σύμβασης: για την παροχή των υπηρεσιών μας\n• Νομική υποχρέωση: κανονιστική συμμόρφωση (KYC, AML)\n• Έννομο συμφέρον: πρόληψη απάτης, βελτίωση υπηρεσιών\n• Συγκατάθεση: μάρκετινγκ επικοινωνία, μη απαραίτητα cookies"
          },
          dataSharing: {
            title: "5. Κοινοποίηση Δεδομένων",
            content: "Τα δεδομένα σας μπορεί να κοινοποιηθούν σε:\n\n• Τους τραπεζικούς και χρηματοοικονομικούς μας εταίρους\n• Πιστωτικούς και ασφαλιστικούς οργανισμούς\n• Ρυθμιστικές αρχές (BaFin, ACPR)\n• Τους τεχνικούς μας παρόχους (υπό αυστηρό συμβόλαιο)\n• Δικαστικές αρχές κατόπιν αιτήματος"
          },
          retention: {
            title: "6. Διατήρηση Δεδομένων",
            content: "Διατηρούμε τα δεδομένα σας:\n\n• Δεδομένα ενεργού πελάτη: διάρκεια σχέσης + 5 χρόνια\n• Οικονομικά δεδομένα: 10 χρόνια μετά το τέλος του συμβολαίου\n• Δεδομένα σύνδεσης: μέγιστο 13 μήνες\n• Δεδομένα μάρκετινγκ: 3 χρόνια μετά την τελευταία επικοινωνία"
          },
          rights: {
            title: "7. Τα Δικαιώματά σας",
            content: "Σύμφωνα με τον GDPR, έχετε τα ακόλουθα δικαιώματα:\n\n• Δικαίωμα πρόσβασης: να λάβετε αντίγραφο των δεδομένων σας\n• Δικαίωμα διόρθωσης: να διορθώσετε τα ανακριβή δεδομένα σας\n• Δικαίωμα διαγραφής: να διαγράψετε τα δεδομένα σας (υπό προϋποθέσεις)\n• Δικαίωμα περιορισμού: να περιορίσετε την επεξεργασία\n• Δικαίωμα φορητότητας: να ανακτήσετε τα δεδομένα σας\n• Δικαίωμα αντίρρησης: να αντιταχθείτε στην επεξεργασία\n• Δικαίωμα ανάκλησης συγκατάθεσης\n\nΓια να ασκήσετε τα δικαιώματά σας: privacy@aurex-kpital.de"
          },
          security: {
            title: "8. Ασφάλεια",
            content: "Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα:\n\n• Κρυπτογράφηση δεδομένων (AES-256)\n• Περιορισμένη και ελεγχόμενη πρόσβαση\n• Συνεχής παρακολούθηση συστημάτων\n• Τακτική εκπαίδευση προσωπικού\n• Περιοδικοί έλεγχοι ασφαλείας"
          },
          transfers: {
            title: "9. Διεθνείς Μεταφορές",
            content: "Ορισμένα δεδομένα μπορεί να μεταφερθούν σε τρίτες χώρες με κατάλληλες εγγυήσεις (τυπικές συμβατικές ρήτρες, αποφάσεις επάρκειας της Ευρωπαϊκής Επιτροπής)."
          },
          contact: {
            title: "10. Επικοινωνία",
            content: "Για οποιαδήποτε ερώτηση σχετικά με αυτήν την πολιτική απορρήτου:\n\nEmail: privacy@aurex-kpital.de\nΤηλέφωνο: +33759282004\nΔιεύθυνση: Irma-Keilhack-Ring 24, 22145 Αμβούργο, Γερμανία"
          }
        }
      },
      terms: {
        title: "Όροι και Προϋποθέσεις",
        description: "Όροι που διέπουν τη χρήση των υπηρεσιών μας",
        lastUpdate: "Τελευταία ενημέρωση: 1η Δεκεμβρίου 2024",
        sections: {
          object: {
            title: "1. Αντικείμενο",
            content: "Αυτοί οι γενικοί όροι και προϋποθέσεις ρυθμίζουν την πρόσβαση και χρήση των χρηματοοικονομικών υπηρεσιών που προσφέρει η Aurex K-pital GmbH. Αποτελούν σύμβαση μεταξύ της Aurex K-pital και του πελάτη."
          },
          services: {
            title: "2. Προσφερόμενες υπηρεσίες",
            content: "Η Aurex K-pital προσφέρει:\n\n• Υπηρεσίες προσωπικής και επιχειρηματικής χρηματοδότησης\n• Επενδυτική συμβουλευτική\n• Διαχείριση περιουσίας\n• Ασφαλιστικές υπηρεσίες\n• Εργαλεία χρηματοοικονομικής προσομοίωσης"
          },
          registration: {
            title: "3. Εγγραφή και λογαριασμός πελάτη",
            content: "Η πρόσβαση στις υπηρεσίες απαιτεί τη δημιουργία λογαριασμού πελάτη. Ο πελάτης δεσμεύεται να παρέχει ακριβείς και ενημερωμένες πληροφορίες. Είναι υπεύθυνος για την εμπιστευτικότητα των διαπιστευτηρίων του."
          },
          obligations: {
            title: "4. Υποχρεώσεις πελάτη",
            content: "Ο πελάτης δεσμεύεται να:\n\n• Χρησιμοποιεί τις υπηρεσίες σύμφωνα με τον σκοπό τους\n• Παρέχει ακριβείς και πλήρεις πληροφορίες\n• Σέβεται την ισχύουσα νομοθεσία\n• Δεν βλάπτει τα συστήματα πληροφοριών"
          },
          pricing: {
            title: "5. Τιμολόγηση",
            content: "Οι τιμές αναφέρονται σε ευρώ συμπεριλαμβανομένων όλων των φόρων. Μπορούν να τροποποιηθούν ανά πάσα στιγμή με προειδοποίηση 30 ημερών. Κάθε υπηρεσία που έχει ξεκινήσει οφείλεται πλήρως."
          },
          liability: {
            title: "6. Ευθύνη",
            content: "Η Aurex K-pital δεσμεύεται να παρέχει τις υπηρεσίες της με επιμέλεια. Η ευθύνη της περιορίζεται σε άμεσες ζημίες. Δεν μπορεί να θεωρηθεί υπεύθυνη για λειτουργικές απώλειες ή χαμένα κέρδη."
          },
          termination: {
            title: "7. Λήξη",
            content: "Η σύμβαση μπορεί να λήξει ανά πάσα στιγμή από οποιοδήποτε από τα μέρη με προειδοποίηση 30 ημερών. Σε περίπτωση σοβαρής παραβίασης, η λήξη μπορεί να είναι άμεση."
          },
          law: {
            title: "8. Εφαρμοστέο δίκαιο",
            content: "Αυτοί οι όροι διέπονται από το γερμανικό δίκαιο. Οποιαδήποτε διαφορά θα υποβληθεί στα αρμόδια δικαστήρια του Αμβούργου."
          }
        }
      },
      gdpr: {
        title: "Συμμόρφωση GDPR",
        description: "Η δέσμευσή μας για την προστασία των προσωπικών σας δεδομένων",
        sections: {
          principles: {
            title: "1. Θεμελιώδεις αρχές",
            content: "Η Aurex K-pital εφαρμόζει τις αρχές του GDPR:\n\n• Νομιμότητα, δικαιοσύνη και διαφάνεια\n• Περιορισμός σκοπού\n• Ελαχιστοποίηση δεδομένων\n• Ακρίβεια\n• Περιορισμός αποθήκευσης\n• Ακεραιότητα και εμπιστευτικότητα\n• Λογοδοσία"
          },
          rights: {
            title: "2. Τα δικαιώματά σας GDPR",
            content: "Έχετε τα ακόλουθα δικαιώματα:\n\n• Δικαίωμα ενημέρωσης\n• Δικαίωμα πρόσβασης στα δεδομένα\n• Δικαίωμα διόρθωσης\n• Δικαίωμα διαγραφής (\"δικαίωμα να ξεχαστείτε\")\n• Δικαίωμα περιορισμού επεξεργασίας\n• Δικαίωμα φορητότητας δεδομένων\n• Δικαίωμα αντίρρησης\n• Δικαιώματα σχετικά με αυτοματοποιημένη λήψη αποφάσεων"
          },
          procedures: {
            title: "3. Διαδικασίες",
            content: "Για να ασκήσετε τα δικαιώματά σας:\n\n• Επικοινωνήστε με τον DPO μας: privacy@aurex-kpital.de\n• Χρόνος απόκρισης: μέγιστο 1 μήνας\n• Απαιτείται αποδεικτικό ταυτότητας\n• Κατ' αρχήν δωρεάν (εκτός από κατάχρηση)\n• Δυνατότητα προσφυγής στην εποπτική αρχή"
          },
          security: {
            title: "4. Μέτρα ασφαλείας",
            content: "Εφαρμόζουμε:\n\n• Κρυπτογράφηση ευαίσθητων δεδομένων\n• Αυστηρούς ελέγχους πρόσβασης\n• Τακτικούς ελέγχους ασφαλείας\n• Εκπαίδευση προσωπικού\n• Ειδοποίηση παραβιάσεων εντός 72 ωρών\n• Εκτίμηση επιπτώσεων στην προστασία δεδομένων (DPIA)"
          },
          transfers: {
            title: "5. Μεταφορές δεδομένων",
            content: "Οι μεταφορές εκτός ΕΕ πλαισιώνονται από:\n\n• Αποφάσεις επάρκειας της Επιτροπής\n• Τυπικές συμβατικές ρήτρες (SCC)\n• Δεσμευτικούς εταιρικούς κανόνες (BCR)\n• Ειδικές εξαιρέσεις (άρθρο 49 GDPR)"
          },
          contact: {
            title: "6. Επικοινωνία DPO",
            content: "Υπεύθυνος Προστασίας Δεδομένων:\n\nEmail: privacy@aurex-kpital.de\nΤηλέφωνο: +33759282004\nΔιεύθυνση: Irma-Keilhack-Ring 24, 22145 Αμβούργο, Γερμανία"
          }
        }
      }
    }
  }
};