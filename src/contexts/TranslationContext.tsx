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
      badge: "Mentions Légales",
      title: {
        main: "Informations",
        subtitle: "Légales"
      },
      description: "Transparence et conformité réglementaire pour votre confiance",
      tabs: {
        mentions: "Mentions légales",
        privacy: "Confidentialité", 
        terms: "Conditions",
        gdpr: "RGPD"
      },
      mentions: {
        title: "Mentions Légales",
        description: "Informations légales et réglementaires de la société",
        company: {
          title: "Informations sur la Société",
          name: "Dénomination sociale",
          type: "Forme juridique",
          typeValue: "Société à responsabilité limitée (GmbH)",
          capital: "Capital social",
          address: "Adresse du siège social",
          register: "Numéro d'immatriculation",
          vat: "Numéro de TVA",
          siren: "Numéro SIREN"
        },
        management: {
          title: "Direction",
          ceo: "Directeur Général",
          cio: "Directrice Innovation",
          cro: "Directeur des Risques"
        },
        activity: {
          title: "Activité de l'Entreprise",
          description: "Aurex K-pital est un établissement financier spécialisé dans :",
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
          schedule: "Lundi au Vendredi de 8h à 19h"
        },
        hosting: {
          title: "Hébergement",
          description: "Ce site est hébergé par :"
        },
        intellectual: {
          title: "Propriété Intellectuelle",
          description: "Tous les éléments de ce site (textes, images, sons, vidéos, logos, icônes, etc.) sont protégés par le droit d'auteur et appartiennent à Aurex K-pital ou à ses partenaires."
        },
        responsibility: {
          title: "Limitation de Responsabilité",
          description: "Aurex K-pital s'efforce de fournir des informations exactes et à jour, mais ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition."
        }
      },
      privacy: {
        title: "Politique de Confidentialité",
        description: "Notre engagement pour la protection de vos données personnelles",
        lastUpdate: "Dernière mise à jour : 15 janvier 2024",
        compliance: "Cette politique est conforme au RGPD et aux réglementations en vigueur.",
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
            content: "Pour toute question concernant cette politique :\n\nEmail : privacy@aurex-kpital.de\nTéléphone : +33759282004\nAdresse : Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne"
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
      description: "Transparenz und regulatorische Konformität für Ihr Vertrauen",
      tabs: {
        mentions: "Impressum",
        privacy: "Datenschutz",
        terms: "AGB", 
        gdpr: "DSGVO"
      },
      mentions: {
        title: "Impressum",
        description: "Rechtliche und regulatorische Informationen des Unternehmens",
        company: {
          title: "Unternehmensinformationen",
          name: "Firmenname",
          type: "Rechtsform",
          typeValue: "Gesellschaft mit beschränkter Haftung (GmbH)",
          capital: "Stammkapital",
          address: "Geschäftssitz",
          register: "Handelsregisternummer",
          vat: "Umsatzsteuer-ID",
          siren: "SIREN-Nummer"
        },
        management: {
          title: "Geschäftsführung",
          ceo: "Geschäftsführer",
          cio: "Innovation Director",
          cro: "Risk Director"
        },
        activity: {
          title: "Unternehmenstätigkeit",
          description: "Aurex K-pital ist ein spezialisiertes Finanzinstitut für:",
          services: {
            banking: "Bank- und Finanzierungsdienstleistungen",
            investment: "Anlageberatung",
            insurance: "Versicherungsmakler",
            wealth: "Vermögensverwaltung"
          }
        },
        contact: {
          title: "Kontakt",
          phone: "Telefon",
          email: "E-Mail",
          hours: "Öffnungszeiten",
          schedule: "Montag bis Freitag von 8 bis 19 Uhr"
        },
        hosting: {
          title: "Hosting",
          description: "Diese Website wird gehostet von:"
        },
        intellectual: {
          title: "Geistiges Eigentum",
          description: "Alle Elemente dieser Website (Texte, Bilder, Töne, Videos, Logos, Icons usw.) sind urheberrechtlich geschützt und gehören Aurex K-pital oder seinen Partnern."
        },
        responsibility: {
          title: "Haftungsbeschränkung",
          description: "Aurex K-pital bemüht sich, genaue und aktuelle Informationen bereitzustellen, kann jedoch nicht die Genauigkeit, Präzision oder Vollständigkeit der bereitgestellten Informationen garantieren."
        }
      },
      privacy: {
        title: "Datenschutzerklärung",
        description: "Unser Engagement für den Schutz Ihrer persönlichen Daten",
        lastUpdate: "Letzte Aktualisierung: 15. Januar 2024",
        compliance: "Diese Richtlinie entspricht der DSGVO und den geltenden Vorschriften.",
        sections: {
          controller: {
            title: "1. Verantwortlicher für die Datenverarbeitung",
            content: "Aurex K-pital GmbH, eingetragen unter der Nummer HRB 147852 im Handelsregister Hamburg, mit Sitz in Irma-Keilhack-Ring 24, 22145 Hamburg, Deutschland.\n\nDatenschutzbeauftragter: privacy@aurex-kpital.de"
          },
          dataCollected: {
            title: "2. Erhobene Daten",
            content: "Wir erheben folgende Datenkategorien:\n\n• Identifikationsdaten: Name, Vorname, Geburtsdatum, Nationalität\n• Kontaktdaten: Postanschrift, E-Mail, Telefon\n• Finanzdaten: Einkommen, Vermögen, Bankhistorie\n• Verbindungsdaten: IP-Adresse, Cookies, Browsing-Logs\n• Verhaltensdaten: Interaktionen mit unseren Diensten"
          },
          purposes: {
            title: "3. Verarbeitungszwecke",
            content: "Ihre Daten werden verarbeitet für:\n\n• Die Ausführung unserer Finanzdienstleistungen\n• Die Bewertung Ihrer Bonität\n• Die Verhinderung von Betrug und Geldwäsche\n• Die Einhaltung unserer gesetzlichen Verpflichtungen\n• Die Verbesserung unserer Dienste\n• Kommerzielle Kommunikation (mit Ihrer Einwilligung)"
          },
          legalBasis: {
            title: "4. Rechtsgrundlage",
            content: "Unsere Verarbeitungen basieren auf:\n\n• Vertragserfüllung: für die Bereitstellung unserer Dienste\n• Rechtliche Verpflichtung: regulatorische Konformität (KYC, AML)\n• Berechtigtes Interesse: Betrugsverhinderung, Verbesserung der Dienste\n• Einwilligung: Marketing-Kommunikation, nicht-essentielle Cookies"
          },
          dataSharing: {
            title: "5. Datenweitergabe",
            content: "Ihre Daten können geteilt werden mit:\n\n• Unseren Bank- und Finanzpartnern\n• Kredit- und Versicherungsorganisationen\n• Regulierungsbehörden (BaFin, ACPR)\n• Unseren technischen Dienstleistern (unter strengen Verträgen)\n• Gerichtsbehörden auf Anforderung"
          },
          retention: {
            title: "6. Datenspeicherung",
            content: "Wir bewahren Ihre Daten auf:\n\n• Aktive Kundendaten: Dauer der Beziehung + 5 Jahre\n• Finanzdaten: 10 Jahre nach Vertragsende\n• Verbindungsdaten: maximal 13 Monate\n• Marketing-Daten: 3 Jahre nach letztem Kontakt"
          },
          rights: {
            title: "7. Ihre Rechte",
            content: "Gemäß DSGVO haben Sie folgende Rechte:\n\n• Auskunftsrecht: eine Kopie Ihrer Daten erhalten\n• Berichtigungsrecht: unrichtige Daten korrigieren\n• Löschungsrecht: Ihre Daten löschen (unter Bedingungen)\n• Einschränkungsrecht: Verarbeitung beschränken\n• Übertragbarkeitsrecht: Ihre Daten abrufen\n• Widerspruchsrecht: der Verarbeitung widersprechen\n• Recht auf Widerruf der Einwilligung\n\nZur Ausübung Ihrer Rechte: privacy@aurex-kpital.de"
          },
          security: {
            title: "8. Sicherheit",
            content: "Wir implementieren angemessene technische und organisatorische Maßnahmen:\n\n• Datenverschlüsselung (AES-256)\n• Beschränkter und kontrollierter Zugang\n• Kontinuierliche Systemüberwachung\n• Regelmäßige Schulungen des Personals\n• Periodische Sicherheitsaudits"
          },
          transfers: {
            title: "9. Internationale Übertragungen",
            content: "Einige Daten können in Drittländer mit angemessenen Garantien übertragen werden (Standardvertragsklauseln, Angemessenheitsbeschlüsse der Europäischen Kommission)."
          },
          contact: {
            title: "10. Kontakt",
            content: "Für Fragen zu dieser Richtlinie:\n\nE-Mail: privacy@aurex-kpital.de\nTelefon: +33759282004\nAdresse: Irma-Keilhack-Ring 24, 22145 Hamburg, Deutschland"
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
      about: "Nosotros",
      contact: "Contacto",
      faq: "FAQ",
    },
    legal: {
      badge: "Información Legal",
      title: {
        main: "Información",
        subtitle: "Legal"
      },
      description: "Transparencia y cumplimiento normativo para su confianza",
      tabs: {
        mentions: "Aviso legal",
        privacy: "Privacidad",
        terms: "Términos",
        gdpr: "RGPD"
      },
      mentions: {
        title: "Aviso Legal",
        description: "Información legal y regulatoria de la empresa",
        company: {
          title: "Información de la Empresa",
          name: "Razón social",
          type: "Forma jurídica",
          typeValue: "Sociedad de responsabilidad limitada (GmbH)",
          capital: "Capital social",
          address: "Domicilio social",
          register: "Número de registro",
          vat: "Número de IVA",
          siren: "Número SIREN"
        },
        management: {
          title: "Dirección",
          ceo: "Director General",
          cio: "Director de Innovación",
          cro: "Director de Riesgos"
        },
        activity: {
          title: "Actividad Empresarial",
          description: "Aurex K-pital es una institución financiera especializada en:",
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
          schedule: "Lunes a Viernes de 8h a 19h"
        },
        hosting: {
          title: "Alojamiento",
          description: "Este sitio está alojado por:"
        },
        intellectual: {
          title: "Propiedad Intelectual",
          description: "Todos los elementos de este sitio (textos, imágenes, sonidos, videos, logos, iconos, etc.) están protegidos por derechos de autor y pertenecen a Aurex K-pital o a sus socios."
        },
        responsibility: {
          title: "Limitación de Responsabilidad",
          description: "Aurex K-pital se esfuerza por proporcionar información precisa y actualizada, pero no puede garantizar la exactitud, precisión o integridad de la información proporcionada."
        }
      },
      privacy: {
        title: "Política de Privacidad",
        description: "Nuestro compromiso con la protección de sus datos personales",
        lastUpdate: "Última actualización: 15 de enero de 2024",
        compliance: "Esta política cumple con el RGPD y las regulaciones vigentes.",
        sections: {
          controller: {
            title: "1. Responsable del Tratamiento",
            content: "Aurex K-pital GmbH, registrada bajo el número HRB 147852 en el registro mercantil de Hamburgo, con domicilio social en Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemania.\\n\\nDelegado de Protección de Datos: privacy@aurex-kpital.de"
          },
          dataCollected: {
            title: "2. Datos Recopilados",
            content: "Recopilamos las siguientes categorías de datos:\\n\\n• Datos de identificación: nombre, apellido, fecha de nacimiento, nacionalidad\\n• Datos de contacto: dirección postal, email, teléfono\\n• Datos financieros: ingresos, patrimonio, historial bancario\\n• Datos de conexión: dirección IP, cookies, logs de navegación\\n• Datos de comportamiento: interacciones con nuestros servicios"
          },
          purposes: {
            title: "3. Finalidades del Tratamiento",
            content: "Sus datos se procesan para:\\n\\n• La ejecución de nuestros servicios financieros\\n• La evaluación de su solvencia\\n• La prevención del fraude y blanqueo\\n• El cumplimiento de nuestras obligaciones legales\\n• La mejora de nuestros servicios\\n• La comunicación comercial (con su consentimiento)"
          },
          legalBasis: {
            title: "4. Base Legal",
            content: "Nuestros tratamientos se basan en:\\n\\n• Ejecución contractual: para la prestación de nuestros servicios\\n• Obligación legal: cumplimiento normativo (KYC, AML)\\n• Interés legítimo: prevención del fraude, mejora de servicios\\n• Consentimiento: comunicación comercial, cookies no esenciales"
          },
          dataSharing: {
            title: "5. Compartir Datos",
            content: "Sus datos pueden compartirse con:\\n\\n• Nuestros socios bancarios y financieros\\n• Organismos de crédito y seguros\\n• Autoridades regulatorias (BaFin, ACPR)\\n• Nuestros proveedores técnicos (bajo contrato estricto)\\n• Autoridades judiciales bajo requerimiento"
          },
          retention: {
            title: "6. Conservación de Datos",
            content: "Conservamos sus datos:\\n\\n• Datos de cliente activo: duración de la relación + 5 años\\n• Datos financieros: 10 años después del fin del contrato\\n• Datos de conexión: máximo 13 meses\\n• Datos de marketing: 3 años después del último contacto"
          },
          rights: {
            title: "7. Sus Derechos",
            content: "Conforme al RGPD, tiene los siguientes derechos:\\n\\n• Derecho de acceso: obtener una copia de sus datos\\n• Derecho de rectificación: corregir datos incorrectos\\n• Derecho de supresión: eliminar sus datos (bajo condiciones)\\n• Derecho de limitación: restringir el procesamiento\\n• Derecho de portabilidad: recuperar sus datos\\n• Derecho de oposición: oponerse al procesamiento\\n• Derecho de retirada del consentimiento\\n\\nPara ejercer sus derechos: privacy@aurex-kpital.de"
          },
          security: {
            title: "8. Seguridad",
            content: "Implementamos medidas técnicas y organizativas apropiadas:\\n\\n• Cifrado de datos (AES-256)\\n• Acceso restringido y controlado\\n• Monitoreo continuo del sistema\\n• Formación regular del personal\\n• Auditorías de seguridad periódicas"
          },
          transfers: {
            title: "9. Transferencias Internacionales",
            content: "Algunos datos pueden transferirse a países terceros con garantías apropiadas (cláusulas contractuales estándar, decisiones de adecuación de la Comisión Europea)."
          },
          contact: {
            title: "10. Contacto",
            content: "Para cualquier pregunta sobre esta política:\\n\\nEmail: privacy@aurex-kpital.de\\nTeléfono: +33759282004\\nDirección: Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemania"
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
      description: "Trasparenza e conformità normativa per la vostra fiducia",
      tabs: {
        mentions: "Note legali",
        privacy: "Privacy",
        terms: "Termini",
        gdpr: "GDPR"
      },
      mentions: {
        title: "Note Legali",
        description: "Informazioni legali e normative dell'azienda",
        company: {
          title: "Informazioni Aziendali",
          name: "Denominazione sociale",
          type: "Forma giuridica",
          typeValue: "Società a responsabilità limitata (GmbH)",
          capital: "Capitale sociale",
          address: "Sede sociale",
          register: "Numero di registrazione",
          vat: "Numero IVA",
          siren: "Numero SIREN"
        },
        management: {
          title: "Direzione",
          ceo: "Amministratore Delegato",
          cio: "Direttore Innovazione",
          cro: "Direttore Rischi"
        },
        activity: {
          title: "Attività Aziendale",
          description: "Aurex K-pital è un istituto finanziario specializzato in:",
          services: {
            banking: "Servizi bancari e di finanziamento",
            investment: "Consulenza negli investimenti",
            insurance: "Intermediazione assicurativa",
            wealth: "Gestione patrimoniale"
          }
        },
        contact: {
          title: "Contatto",
          phone: "Telefono",
          email: "Email",
          hours: "Orari di apertura",
          schedule: "Lunedì-Venerdì dalle 8 alle 19"
        },
        hosting: {
          title: "Hosting",
          description: "Questo sito è ospitato da:"
        },
        intellectual: {
          title: "Proprietà Intellettuale",
          description: "Tutti gli elementi di questo sito (testi, immagini, suoni, video, loghi, icone, ecc.) sono protetti da copyright e appartengono ad Aurex K-pital o ai suoi partner."
        },
        responsibility: {
          title: "Limitazione di Responsabilità",
          description: "Aurex K-pital si impegna a fornire informazioni accurate e aggiornate, ma non può garantire l'accuratezza, precisione o completezza delle informazioni fornite."
        }
      },
      privacy: {
        title: "Informativa sulla Privacy",
        description: "Il nostro impegno per la protezione dei vostri dati personali",
        lastUpdate: "Ultimo aggiornamento: 15 gennaio 2024",
        compliance: "Questa politica è conforme al GDPR e alle normative vigenti.",
        sections: {
          controller: {
            title: "1. Titolare del Trattamento",
            content: "Aurex K-pital GmbH, registrata con il numero HRB 147852 nel registro delle imprese di Amburgo, con sede legale in Irma-Keilhack-Ring 24, 22145 Amburgo, Germania.\\n\\nResponsabile della Protezione Dati: privacy@aurex-kpital.de"
          },
          dataCollected: {
            title: "2. Dati Raccolti",
            content: "Raccogliamo le seguenti categorie di dati:\\n\\n• Dati identificativi: nome, cognome, data di nascita, nazionalità\\n• Dati di contatto: indirizzo postale, email, telefono\\n• Dati finanziari: redditi, patrimonio, storico bancario\\n• Dati di connessione: indirizzo IP, cookie, log di navigazione\\n• Dati comportamentali: interazioni con i nostri servizi"
          },
          purposes: {
            title: "3. Finalità del Trattamento",
            content: "I vostri dati sono trattati per:\\n\\n• L'esecuzione dei nostri servizi finanziari\\n• La valutazione della vostra solvibilità\\n• La prevenzione di frodi e riciclaggio\\n• Il rispetto dei nostri obblighi legali\\n• Il miglioramento dei nostri servizi\\n• La comunicazione commerciale (con il vostro consenso)"
          },
          legalBasis: {
            title: "4. Base Giuridica",
            content: "I nostri trattamenti si basano su:\\n\\n• Esecuzione contrattuale: per la fornitura dei nostri servizi\\n• Obbligo legale: conformità normativa (KYC, AML)\\n• Interesse legittimo: prevenzione frodi, miglioramento servizi\\n• Consenso: comunicazione commerciale, cookie non essenziali"
          },
          dataSharing: {
            title: "5. Condivisione Dati",
            content: "I vostri dati possono essere condivisi con:\\n\\n• I nostri partner bancari e finanziari\\n• Organismi di credito e assicurazione\\n• Autorità di regolamentazione (BaFin, ACPR)\\n• I nostri fornitori tecnici (sotto contratto rigoroso)\\n• Autorità giudiziarie su richiesta"
          },
          retention: {
            title: "6. Conservazione Dati",
            content: "Conserviamo i vostri dati:\\n\\n• Dati cliente attivo: durata del rapporto + 5 anni\\n• Dati finanziari: 10 anni dopo la fine del contratto\\n• Dati di connessione: massimo 13 mesi\\n• Dati marketing: 3 anni dopo l'ultimo contatto"
          },
          rights: {
            title: "7. I Vostri Diritti",
            content: "Conformemente al GDPR, avete i seguenti diritti:\\n\\n• Diritto di accesso: ottenere una copia dei vostri dati\\n• Diritto di rettifica: correggere dati inesatti\\n• Diritto alla cancellazione: eliminare i vostri dati (sotto condizioni)\\n• Diritto di limitazione: limitare il trattamento\\n• Diritto di portabilità: recuperare i vostri dati\\n• Diritto di opposizione: opporsi al trattamento\\n• Diritto di revoca del consenso\\n\\nPer esercitare i vostri diritti: privacy@aurex-kpital.de"
          },
          security: {
            title: "8. Sicurezza",
            content: "Implementiamo misure tecniche e organizzative appropriate:\\n\\n• Crittografia dei dati (AES-256)\\n• Accesso limitato e controllato\\n• Monitoraggio continuo del sistema\\n• Formazione regolare del personale\\n• Audit di sicurezza periodici"
          },
          transfers: {
            title: "9. Trasferimenti Internazionali",
            content: "Alcuni dati possono essere trasferiti verso paesi terzi con garanzie appropriate (clausole contrattuali standard, decisioni di adeguatezza della Commissione Europea)."
          },
          contact: {
            title: "10. Contatto",
            content: "Per qualsiasi domanda riguardo questa politica:\\n\\nEmail: privacy@aurex-kpital.de\\nTelefono: +33759282004\\nIndirizzo: Irma-Keilhack-Ring 24, 22145 Amburgo, Germania"
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
      description: "Przejrzystość i zgodność regulacyjna dla Państwa zaufania",
      tabs: {
        mentions: "Informacje prawne",
        privacy: "Prywatność",
        terms: "Warunki",
        gdpr: "RODO"
      },
      mentions: {
        title: "Informacje Prawne",
        description: "Informacje prawne i regulacyjne firmy",
        company: {
          title: "Informacje o Firmie",
          name: "Nazwa firmy",
          type: "Forma prawna",
          typeValue: "Spółka z ograniczoną odpowiedzialnością (GmbH)",
          capital: "Kapitał zakładowy",
          address: "Siedziba",
          register: "Numer rejestrowy",
          vat: "Numer VAT",
          siren: "Numer SIREN"
        },
        management: {
          title: "Zarząd",
          ceo: "Dyrektor Generalny",
          cio: "Dyrektor ds. Innowacji",
          cro: "Dyrektor ds. Ryzyka"
        },
        activity: {
          title: "Działalność Firmy",
          description: "Aurex K-pital jest wyspecjalizowaną instytucją finansową w:",
          services: {
            banking: "Usługi bankowe i finansowanie",
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
          schedule: "Poniedziałek-Piątek 8-19"
        },
        hosting: {
          title: "Hosting",
          description: "Ta strona jest hostowana przez:"
        },
        intellectual: {
          title: "Własność Intelektualna",
          description: "Wszystkie elementy tej strony (teksty, obrazy, dźwięki, filmy, loga, ikony itp.) są chronione prawem autorskim i należą do Aurex K-pital lub jego partnerów."
        },
        responsibility: {
          title: "Ograniczenie Odpowiedzialności",
          description: "Aurex K-pital stara się dostarczać dokładne i aktualne informacje, ale nie może zagwarantować dokładności, precyzji lub kompletności dostarczonych informacji."
        }
      },
      privacy: {
        title: "Polityka Prywatności",
        description: "Nasze zobowiązanie do ochrony Państwa danych osobowych",
        lastUpdate: "Ostatnia aktualizacja: 15 stycznia 2024",
        compliance: "Ta polityka jest zgodna z RODO i obowiązującymi przepisami.",
        sections: {
          controller: {
            title: "1. Administrator Danych",
            content: "Aurex K-pital GmbH, zarejestrowana pod numerem HRB 147852 w rejestrze handlowym w Hamburgu, z siedzibą przy Irma-Keilhack-Ring 24, 22145 Hamburg, Niemcy.\\n\\nInspektor Ochrony Danych: privacy@aurex-kpital.de"
          },
          dataCollected: {
            title: "2. Zbierane Dane",
            content: "Zbieramy następujące kategorie danych:\\n\\n• Dane identyfikacyjne: imię, nazwisko, data urodzenia, narodowość\\n• Dane kontaktowe: adres pocztowy, email, telefon\\n• Dane finansowe: dochody, majątek, historia bankowa\\n• Dane połączenia: adres IP, cookies, logi przeglądania\\n• Dane behawioralne: interakcje z naszymi usługami"
          },
          purposes: {
            title: "3. Cele Przetwarzania",
            content: "Państwa dane są przetwarzane w celu:\\n\\n• Wykonania naszych usług finansowych\\n• Oceny zdolności kredytowej\\n• Zapobiegania oszustwom i praniu pieniędzy\\n• Wypełnienia naszych obowiązków prawnych\\n• Poprawy naszych usług\\n• Komunikacji marketingowej (za zgodą)"
          },
          legalBasis: {
            title: "4. Podstawa Prawna",
            content: "Nasze przetwarzanie opiera się na:\\n\\n• Wykonaniu umowy: do świadczenia naszych usług\\n• Obowiązku prawnym: zgodność regulacyjna (KYC, AML)\\n• Prawnie uzasadnionym interesie: zapobieganie oszustwom, poprawa usług\\n• Zgodzie: komunikacja marketingowa, nieistotne cookies"
          },
          dataSharing: {
            title: "5. Udostępnianie Danych",
            content: "Państwa dane mogą być udostępniane:\\n\\n• Naszym partnerom bankowym i finansowym\\n• Organizacjom kredytowym i ubezpieczeniowym\\n• Organom regulacyjnym (BaFin, ACPR)\\n• Naszym dostawcom technicznym (pod ścisłą umową)\\n• Organom sądowym na żądanie"
          },
          retention: {
            title: "6. Przechowywanie Danych",
            content: "Przechowujemy Państwa dane:\\n\\n• Dane aktywnego klienta: czas trwania relacji + 5 lat\\n• Dane finansowe: 10 lat po zakończeniu umowy\\n• Dane połączenia: maksymalnie 13 miesięcy\\n• Dane marketingowe: 3 lata po ostatnim kontakcie"
          },
          rights: {
            title: "7. Państwa Prawa",
            content: "Zgodnie z RODO mają Państwo następujące prawa:\\n\\n• Prawo dostępu: uzyskanie kopii swoich danych\\n• Prawo sprostowania: poprawienie nieprawidłowych danych\\n• Prawo do usunięcia: usunięcie swoich danych (pod warunkami)\\n• Prawo do ograniczenia: ograniczenie przetwarzania\\n• Prawo do przenoszenia: odzyskanie swoich danych\\n• Prawo sprzeciwu: sprzeciw wobec przetwarzania\\n• Prawo do wycofania zgody\\n\\nAby skorzystać z praw: privacy@aurex-kpital.de"
          },
          security: {
            title: "8. Bezpieczeństwo",
            content: "Wdrażamy odpowiednie środki techniczne i organizacyjne:\\n\\n• Szyfrowanie danych (AES-256)\\n• Ograniczony i kontrolowany dostęp\\n• Ciągłe monitorowanie systemu\\n• Regularne szkolenia personelu\\n• Okresowe audyty bezpieczeństwa"
          },
          transfers: {
            title: "9. Transfery Międzynarodowe",
            content: "Niektóre dane mogą być przekazywane do krajów trzecich z odpowiednimi gwarancjami (standardowe klauzule umowne, decyzje o adekwatności Komisji Europejskiej)."
          },
          contact: {
            title: "10. Kontakt",
            content: "W przypadku pytań dotyczących tej polityki:\\n\\nEmail: privacy@aurex-kpital.de\\nTelefon: +33759282004\\nAdres: Irma-Keilhack-Ring 24, 22145 Hamburg, Niemcy"
          }
        }
      }
    }
  },
  fi: {
    menu: {
      home: "Koti",
      services: "Palvelut",
      simulator: "Simulaattori",
      request: "Pyyntö",
      about: "Meistä",
      contact: "Yhteystiedot",
      faq: "UKK",
    },
    legal: {
      badge: "Oikeudelliset Tiedot",
      title: {
        main: "Oikeudelliset",
        subtitle: "Tiedot"
      },
      description: "Läpinäkyvyys ja säädösten noudattaminen luottamuksenne vuoksi",
      tabs: {
        mentions: "Oikeudelliset tiedot",
        privacy: "Yksityisyys",
        terms: "Ehdot",
        gdpr: "GDPR"
      },
      mentions: {
        title: "Oikeudelliset Tiedot",
        description: "Yrityksen oikeudelliset ja säädösten mukaiset tiedot",
        company: {
          title: "Yritystiedot",
          name: "Toiminimi",
          type: "Oikeudellinen muoto",
          typeValue: "Osakeyhtiö (GmbH)",
          capital: "Osakepääoma",
          address: "Kotipaikka",
          register: "Rekisterinumero",
          vat: "ALV-numero",
          siren: "SIREN-numero"
        },
        management: {
          title: "Johto",
          ceo: "Toimitusjohtaja",
          cio: "Innovaatiojohtaja",
          cro: "Riskijohtaja"
        },
        activity: {
          title: "Liiketoiminta",
          description: "Aurex K-pital on erikoistunut rahoituslaitos:",
          services: {
            banking: "Pankki- ja rahoituspalvelut",
            investment: "Sijoitusneuvonta",
            insurance: "Vakuutusvälitys",
            wealth: "Varallisuudenhallinta"
          }
        },
        contact: {
          title: "Yhteystiedot",
          phone: "Puhelin",
          email: "Sähköposti",
          hours: "Aukioloajat",
          schedule: "Maanantai-Perjantai 8-19"
        },
        hosting: {
          title: "Hosting",
          description: "Tämä sivusto on hostattu:"
        },
        intellectual: {
          title: "Immateriaalioikeudet",
          description: "Kaikki tämän sivuston elementit (tekstit, kuvat, äänet, videot, logot, kuvakkeet jne.) ovat tekijänoikeussuojattuja ja kuuluvat Aurex K-pitalille tai sen kumppaneille."
        },
        responsibility: {
          title: "Vastuun Rajoitus",
          description: "Aurex K-pital pyrkii tarjoamaan tarkkoja ja ajantasaisia tietoja, mutta ei voi taata annettujen tietojen tarkkuutta, täsmällisyyttä tai täydellisyyttä."
        }
      },
      privacy: {
        title: "Tietosuojakäytäntö",
        description: "Sitoutumisemme henkilötietojenne suojaamiseen",
        lastUpdate: "Viimeksi päivitetty: 15. tammikuuta 2024",
        compliance: "Tämä käytäntö noudattaa GDPR:ää ja voimassa olevia määräyksiä.",
        sections: {
          controller: {
            title: "1. Rekisterinpitäjä",
            content: "Aurex K-pital GmbH, rekisteröity numerolla HRB 147852 Hampurin kaupparekisteriin, kotipaikka Irma-Keilhack-Ring 24, 22145 Hampuri, Saksa.\\n\\nTietosuojavastaava: privacy@aurex-kpital.de"
          },
          dataCollected: {
            title: "2. Kerätyt Tiedot",
            content: "Keräämme seuraavia tietokategorioita:\\n\\n• Tunnistautumistiedot: nimi, syntymäaika, kansallisuus\\n• Yhteystiedot: postiosoite, sähköposti, puhelin\\n• Taloudelliset tiedot: tulot, varallisuus, pankkihistoria\\n• Yhteyslogi: IP-osoite, evästeet, selauslogit\\n• Käyttäytymistiedot: vuorovaikutus palvelujemme kanssa"
          },
          purposes: {
            title: "3. Käsittelyn Tarkoitukset",
            content: "Tietojanne käsitellään:\\n\\n• Rahoituspalvelujemme toteuttamiseksi\\n• Luottokelpoisuuden arvioimiseksi\\n• Petosten ja rahanpesun estämiseksi\\n• Lakisääteisten velvoitteiden täyttämiseksi\\n• Palvelujemme parantamiseksi\\n• Kaupalliseen viestintään (suostumuksella)"
          },
          legalBasis: {
            title: "4. Oikeusperusta",
            content: "Käsittelyämme perustuu:\\n\\n• Sopimuksen täyttäminen: palvelujemme tarjoamiseksi\\n• Lakisääteinen velvoite: säädösten noudattaminen (KYC, AML)\\n• Oikeutettu etu: petosten estäminen, palvelujen parantaminen\\n• Suostumus: markkinointiviestintä, ei-välttämättömät evästeet"
          },
          dataSharing: {
            title: "5. Tietojen Jakaminen",
            content: "Tietojanne voidaan jakaa:\\n\\n• Pankki- ja rahoituskumppaniemme kanssa\\n• Luotto- ja vakuutusorganisaatioiden kanssa\\n• Sääntelyviranomaisten kanssa (BaFin, ACPR)\\n• Teknisten palveluntarjoajien kanssa (tiukan sopimuksen alla)\\n• Oikeusviranomaisten kanssa pyynnöstä"
          },
          retention: {
            title: "6. Tietojen Säilyttäminen",
            content: "Säilytämme tietojanne:\\n\\n• Aktiivisen asiakkaan tiedot: suhteen kesto + 5 vuotta\\n• Taloudelliset tiedot: 10 vuotta sopimuksen päättymisen jälkeen\\n• Yhteystiedot: enintään 13 kuukautta\\n• Markkinointitiedot: 3 vuotta viimeisestä kontaktista"
          },
          rights: {
            title: "7. Oikeutenne",
            content: "GDPR:n mukaan teillä on seuraavat oikeudet:\\n\\n• Pääsyoikeus: saada kopio tiedoistanne\\n• Oikaisuoikeus: korjata virheelliset tiedot\\n• Poisto-oikeus: poistaa tietonne (ehdoilla)\\n• Rajoitusoikeus: rajoittaa käsittelyä\\n• Siirrettävyysoikeus: saada tietonne takaisin\\n• Vastustusoikeus: vastustaa käsittelyä\\n• Oikeus peruuttaa suostumus\\n\\nOikeuksien käyttämiseksi: privacy@aurex-kpital.de"
          },
          security: {
            title: "8. Turvallisuus",
            content: "Toteutamme asianmukaiset tekniset ja organisatoriset toimenpiteet:\\n\\n• Tietojen salaus (AES-256)\\n• Rajoitettu ja kontrolloitu pääsy\\n• Jatkuva järjestelmän valvonta\\n• Henkilöstön säännöllinen koulutus\\n• Säännölliset turvallisuusauditoinnit"
          },
          transfers: {
            title: "9. Kansainväliset Siirrot",
            content: "Joitakin tietoja voidaan siirtää kolmansiin maihin asianmukaisilla takeilla (vakiosopimuslausekkeet, Euroopan komission riittävyyspäätökset)."
          },
          contact: {
            title: "10. Yhteystiedot",
            content: "Kysymyksiä tästä käytännöstä:\\n\\nSähköposti: privacy@aurex-kpital.de\\nPuhelin: +33759282004\\nOsoite: Irma-Keilhack-Ring 24, 22145 Hampuri, Saksa"
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
      description: "Transparência e conformidade regulamentar para a sua confiança",
      tabs: {
        mentions: "Termos legais",
        privacy: "Privacidade",
        terms: "Termos",
        gdpr: "RGPD"
      },
      mentions: {
        title: "Termos Legais",
        description: "Informações legais e regulamentares da empresa",
        company: {
          title: "Informações da Empresa",
          name: "Denominação social",
          type: "Forma jurídica",
          typeValue: "Sociedade por quotas (GmbH)",
          capital: "Capital social",
          address: "Sede social",
          register: "Número de registo",
          vat: "Número de IVA",
          siren: "Número SIREN"
        },
        management: {
          title: "Direção",
          ceo: "Diretor Geral",
          cio: "Diretor de Inovação",
          cro: "Diretor de Riscos"
        },
        activity: {
          title: "Atividade Empresarial",
          description: "Aurex K-pital é uma instituição financeira especializada em:",
          services: {
            banking: "Serviços bancários e de financiamento",
            investment: "Consultoria em investimentos",
            insurance: "Mediação de seguros",
            wealth: "Gestão de património"
          }
        },
        contact: {
          title: "Contacto",
          phone: "Telefone",
          email: "Email",
          hours: "Horário de funcionamento",
          schedule: "Segunda-Sexta 8h-19h"
        },
        hosting: {
          title: "Alojamento",
          description: "Este site está alojado por:"
        },
        intellectual: {
          title: "Propriedade Intelectual",
          description: "Todos os elementos deste site (textos, imagens, sons, vídeos, logótipos, ícones, etc.) estão protegidos por direitos de autor e pertencem à Aurex K-pital ou aos seus parceiros."
        },
        responsibility: {
          title: "Limitação de Responsabilidade",
          description: "A Aurex K-pital esforça-se por fornecer informações precisas e atualizadas, mas não pode garantir a exatidão, precisão ou completude das informações fornecidas."
        }
      },
      privacy: {
        title: "Política de Privacidade",
        description: "O nosso compromisso com a proteção dos seus dados pessoais",
        lastUpdate: "Última atualização: 15 de janeiro de 2024",
        compliance: "Esta política está em conformidade com o RGPD e regulamentações vigentes.",
        sections: {
          controller: {
            title: "1. Responsável pelo Tratamento",
            content: "Aurex K-pital GmbH, registada com o número HRB 147852 no registo comercial de Hamburgo, com sede em Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemanha.\\n\\nEncarregado da Proteção de Dados: privacy@aurex-kpital.de"
          },
          dataCollected: {
            title: "2. Dados Recolhidos",
            content: "Recolhemos as seguintes categorias de dados:\\n\\n• Dados de identificação: nome, apelido, data de nascimento, nacionalidade\\n• Dados de contacto: morada postal, email, telefone\\n• Dados financeiros: rendimentos, património, histórico bancário\\n• Dados de ligação: endereço IP, cookies, logs de navegação\\n• Dados comportamentais: interações com os nossos serviços"
          },
          purposes: {
            title: "3. Finalidades do Tratamento",
            content: "Os seus dados são tratados para:\\n\\n• A execução dos nossos serviços financeiros\\n• A avaliação da sua solvabilidade\\n• A prevenção de fraude e branqueamento\\n• O cumprimento das nossas obrigações legais\\n• A melhoria dos nossos serviços\\n• A comunicação comercial (com o seu consentimento)"
          },
          legalBasis: {
            title: "4. Base Legal",
            content: "Os nossos tratamentos baseiam-se em:\\n\\n• Execução contratual: para a prestação dos nossos serviços\\n• Obrigação legal: conformidade regulamentar (KYC, AML)\\n• Interesse legítimo: prevenção de fraude, melhoria de serviços\\n• Consentimento: comunicação comercial, cookies não essenciais"
          },
          dataSharing: {
            title: "5. Partilha de Dados",
            content: "Os seus dados podem ser partilhados com:\\n\\n• Os nossos parceiros bancários e financeiros\\n• Organismos de crédito e seguros\\n• Autoridades regulamentares (BaFin, ACPR)\\n• Os nossos fornecedores técnicos (sob contrato rigoroso)\\n• Autoridades judiciais mediante solicitação"
          },
          retention: {
            title: "6. Conservação de Dados",
            content: "Conservamos os seus dados:\\n\\n• Dados de cliente ativo: duração da relação + 5 anos\\n• Dados financeiros: 10 anos após o fim do contrato\\n• Dados de ligação: máximo 13 meses\\n• Dados de marketing: 3 anos após o último contacto"
          },
          rights: {
            title: "7. Os Seus Direitos",
            content: "Em conformidade com o RGPD, tem os seguintes direitos:\\n\\n• Direito de acesso: obter uma cópia dos seus dados\\n• Direito de retificação: corrigir dados incorretos\\n• Direito ao apagamento: eliminar os seus dados (sob condições)\\n• Direito de limitação: restringir o tratamento\\n• Direito de portabilidade: recuperar os seus dados\\n• Direito de oposição: opor-se ao tratamento\\n• Direito de retirada do consentimento\\n\\nPara exercer os seus direitos: privacy@aurex-kpital.de"
          },
          security: {
            title: "8. Segurança",
            content: "Implementamos medidas técnicas e organizacionais apropriadas:\\n\\n• Encriptação de dados (AES-256)\\n• Acesso restrito e controlado\\n• Monitorização contínua do sistema\\n• Formação regular do pessoal\\n• Auditorias de segurança periódicas"
          },
          transfers: {
            title: "9. Transferências Internacionais",
            content: "Alguns dados podem ser transferidos para países terceiros com garantias apropriadas (cláusulas contratuais tipo, decisões de adequação da Comissão Europeia)."
          },
          contact: {
            title: "10. Contacto",
            content: "Para qualquer questão sobre esta política:\\n\\nEmail: privacy@aurex-kpital.de\\nTelefone: +33759282004\\nMorada: Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemanha"
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
      faq: "ΣΑΕ",
    },
    legal: {
      badge: "Νομικές Πληροφορίες",
      title: {
        main: "Νομικές",
        subtitle: "Πληροφορίες"
      },
      description: "Διαφάνεια και κανονιστική συμμόρφωση για την εμπιστοσύνη σας",
      tabs: {
        mentions: "Νομικές πληροφορίες",
        privacy: "Απόρρητο",
        terms: "Όροι",
        gdpr: "GDPR"
      },
      mentions: {
        title: "Νομικές Πληροφορίες",
        description: "Νομικές και κανονιστικές πληροφορίες της εταιρείας",
        company: {
          title: "Πληροφορίες Εταιρείας",
          name: "Εταιρική επωνυμία",
          type: "Νομική μορφή",
          typeValue: "Εταιρεία περιορισμένης ευθύνης (GmbH)",
          capital: "Μετοχικό κεφάλαιο",
          address: "Έδρα",
          register: "Αριθμός μητρώου",
          vat: "Αριθμός ΦΠΑ",
          siren: "Αριθμός SIREN"
        },
        management: {
          title: "Διοίκηση",
          ceo: "Γενικός Διευθυντής",
          cio: "Διευθυντής Καινοτομίας",
          cro: "Διευθυντής Κινδύνων"
        },
        activity: {
          title: "Εταιρική Δραστηριότητα",
          description: "Η Aurex K-pital είναι ένα εξειδικευμένο χρηματοπιστωτικό ίδρυμα σε:",
          services: {
            banking: "Τραπεζικές υπηρεσίες και χρηματοδότηση",
            investment: "Επενδυτικές συμβουλές",
            insurance: "Ασφαλιστική διαμεσολάβηση",
            wealth: "Διαχείριση περιουσίας"
          }
        },
        contact: {
          title: "Επικοινωνία",
          phone: "Τηλέφωνο",
          email: "Email",
          hours: "Ώρες λειτουργίας",
          schedule: "Δευτέρα-Παρασκευή 8π.μ.-7μ.μ."
        },
        hosting: {
          title: "Φιλοξενία",
          description: "Αυτός ο ιστότοπος φιλοξενείται από:"
        },
        intellectual: {
          title: "Πνευματική Ιδιοκτησία",
          description: "Όλα τα στοιχεία αυτού του ιστότοπου (κείμενα, εικόνες, ήχοι, βίντεο, λογότυπα, εικονίδια κ.λπ.) προστατεύονται από πνευματικά δικαιώματα και ανήκουν στην Aurex K-pital ή στους συνεργάτες της."
        },
        responsibility: {
          title: "Περιορισμός Ευθύνης",
          description: "Η Aurex K-pital προσπαθεί να παρέχει ακριβείς και ενημερωμένες πληροφορίες, αλλά δεν μπορεί να εγγυηθεί την ακρίβεια, την ακρίβεια ή την πληρότητα των παρεχόμενων πληροφοριών."
        }
      },
      privacy: {
        title: "Πολιτική Απορρήτου",
        description: "Η δέσμευσή μας για την προστασία των προσωπικών σας δεδομένων",
        lastUpdate: "Τελευταία ενημέρωση: 15 Ιανουαρίου 2024",
        compliance: "Αυτή η πολιτική συμμορφώνεται με το GDPR και τους ισχύοντες κανονισμούς.",
        sections: {
          controller: {
            title: "1. Υπεύθυνος Επεξεργασίας",
            content: "Aurex K-pital GmbH, εγγεγραμμένη με αριθμό HRB 147852 στο εμπορικό μητρώο του Αμβούργου, με έδρα στο Irma-Keilhack-Ring 24, 22145 Αμβούργο, Γερμανία.\\n\\nΥπεύθυνος Προστασίας Δεδομένων: privacy@aurex-kpital.de"
          },
          dataCollected: {
            title: "2. Συλλεγόμενα Δεδομένα",
            content: "Συλλέγουμε τις ακόλουθες κατηγορίες δεδομένων:\\n\\n• Δεδομένα ταυτοποίησης: όνομα, επώνυμο, ημερομηνία γέννησης, εθνικότητα\\n• Στοιχεία επικοινωνίας: ταχυδρομική διεύθυνση, email, τηλέφωνο\\n• Οικονομικά δεδομένα: εισοδήματα, περιουσία, τραπεζικό ιστορικό\\n• Δεδομένα σύνδεσης: διεύθυνση IP, cookies, αρχεία περιήγησης\\n• Δεδομένα συμπεριφοράς: αλληλεπιδράσεις με τις υπηρεσίες μας"
          },
          purposes: {
            title: "3. Σκοποί Επεξεργασίας",
            content: "Τα δεδομένα σας επεξεργάζονται για:\\n\\n• Την εκτέλεση των χρηματοπιστωτικών μας υπηρεσιών\\n• Την αξιολόγηση της πιστοληπτικής σας ικανότητας\\n• Την πρόληψη απάτης και ξεπλύματος χρήματος\\n• Τη συμμόρφωση με τις νομικές μας υποχρεώσεις\\n• Τη βελτίωση των υπηρεσιών μας\\n• Την εμπορική επικοινωνία (με τη συγκατάθεσή σας)"
          },
          legalBasis: {
            title: "4. Νομική Βάση",
            content: "Οι επεξεργασίες μας βασίζονται σε:\\n\\n• Εκτέλεση σύμβασης: για την παροχή των υπηρεσιών μας\\n• Νομική υποχρέωση: κανονιστική συμμόρφωση (KYC, AML)\\n• Νόμιμο συμφέρον: πρόληψη απάτης, βελτίωση υπηρεσιών\\n• Συγκατάθεση: εμπορική επικοινωνία, μη απαραίτητα cookies"
          },
          dataSharing: {
            title: "5. Κοινοποίηση Δεδομένων",
            content: "Τα δεδομένα σας μπορεί να κοινοποιηθούν σε:\\n\\n• Τους τραπεζικούς και χρηματοπιστωτικούς μας συνεργάτες\\n• Πιστωτικούς και ασφαλιστικούς οργανισμούς\\n• Ρυθμιστικές αρχές (BaFin, ACPR)\\n• Τους τεχνικούς μας παρόχους (υπό αυστηρό συμβόλαιο)\\n• Δικαστικές αρχές κατόπιν αιτήματος"
          },
          retention: {
            title: "6. Διατήρηση Δεδομένων",
            content: "Διατηρούμε τα δεδομένα σας:\\n\\n• Δεδομένα ενεργού πελάτη: διάρκεια σχέσης + 5 χρόνια\\n• Οικονομικά δεδομένα: 10 χρόνια μετά τη λήξη της σύμβασης\\n• Δεδομένα σύνδεσης: μέγιστο 13 μήνες\\n• Δεδομένα μάρκετινγκ: 3 χρόνια μετά την τελευταία επαφή"
          },
          rights: {
            title: "7. Τα Δικαιώματά σας",
            content: "Σύμφωνα με το GDPR, έχετε τα ακόλουθα δικαιώματα:\\n\\n• Δικαίωμα πρόσβασης: λήψη αντιγράφου των δεδομένων σας\\n• Δικαίωμα διόρθωσης: διόρθωση λανθασμένων δεδομένων\\n• Δικαίωμα διαγραφής: διαγραφή των δεδομένων σας (υπό προϋποθέσεις)\\n• Δικαίωμα περιορισμού: περιορισμός της επεξεργασίας\\n• Δικαίωμα φορητότητας: ανάκτηση των δεδομένων σας\\n• Δικαίωμα αντίρρησης: αντίρρηση στην επεξεργασία\\n• Δικαίωμα ανάκλησης συγκατάθεσης\\n\\nΓια άσκηση των δικαιωμάτων σας: privacy@aurex-kpital.de"
          },
          security: {
            title: "8. Ασφάλεια",
            content: "Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα:\\n\\n• Κρυπτογράφηση δεδομένων (AES-256)\\n• Περιορισμένη και ελεγχόμενη πρόσβαση\\n• Συνεχής παρακολούθηση συστήματος\\n• Τακτική εκπαίδευση προσωπικού\\n• Περιοδικοί έλεγχοι ασφαλείας"
          },
          transfers: {
            title: "9. Διεθνείς Μεταφορές",
            content: "Ορισμένα δεδομένα μπορεί να μεταφερθούν σε τρίτες χώρες με κατάλληλες εγγυήσεις (τυπικές συμβατικές ρήτρες, αποφάσεις επάρκειας της Ευρωπαϊκής Επιτροπής)."
          },
          contact: {
            title: "10. Επικοινωνία",
            content: "Για οποιεσδήποτε ερωτήσεις σχετικά με αυτήν την πολιτική:\\n\\nEmail: privacy@aurex-kpital.de\\nΤηλέφωνο: +33759282004\\nΔιεύθυνση: Irma-Keilhack-Ring 24, 22145 Αμβούργο, Γερμανία"
          }
        }
      }
    }
  }
};

export { translations };
