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
      careers: "Carrières",
      partners: "Partenaires",
      blog: "Blog"
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
      },
      steps: [
        { title: "Informations", description: "Vos données personnelles" },
        { title: "Projet", description: "Détails du financement" },
        { title: "Analyse", description: "Étude personnalisée" },
        { title: "Réponse", description: "Proposition sur-mesure" }
      ],
      form: {
        personalInfo: {
          title: "Informations personnelles",
          subtitle: "Renseignez vos informations de base pour commencer votre demande",
          fields: {
            firstName: "Prénom",
            lastName: "Nom de famille",
            email: "Adresse email",
            emailConfirmation: "Confirmer l'email",
            emailConfirmationPlaceholder: "Ressaisissez votre adresse email",
            phone: "Téléphone",
            birthDate: "Date de naissance",
            nationality: "Nationalité",
            nationalityPlaceholder: "Sélectionnez votre nationalité",
            otherNationality: "Autre nationalité",
            maritalStatus: "Situation familiale",
            maritalStatusPlaceholder: "Sélectionnez votre situation",
            dependents: "Nombre de personnes à charge"
          },
          validation: {
            emailMismatch: "Les adresses email ne correspondent pas",
            emailConfirmed: "Adresses email confirmées"
          },
          maritalStatusOptions: {
            single: "Célibataire",
            married: "Marié(e)",
            divorced: "Divorcé(e)",
            widowed: "Veuf/Veuve",
            partnership: "Union libre"
          }
        },
        professionalInfo: {
          title: "Situation professionnelle",
          subtitle: "Informations sur votre activité professionnelle et vos revenus",
          fields: {
            employmentStatus: "Statut professionnel",
            employmentStatusPlaceholder: "Votre situation professionnelle",
            profession: "Profession",
            company: "Entreprise",
            position: "Poste occupé",
            employer: "Employeur",
            employmentDuration: "Ancienneté dans l'emploi",
            workExperience: "Expérience professionnelle",
            monthlyIncome: "Revenus mensuels nets (€)",
            additionalIncome: "Autres revenus mensuels (€)"
          },
          employmentOptions: {
            employee: "Salarié(e)",
            selfEmployed: "Travailleur indépendant",
            business: "Chef d'entreprise",
            manager: "Cadre",
            retired: "Retraité(e)",
            student: "Étudiant(e)",
            unemployed: "Sans emploi"
          }
        },
        financingRequest: {
          title: "Demande de financement",
          subtitle: "Précisez les détails de votre projet de financement",
          fields: {
            loanType: "Type de prêt",
            loanTypePlaceholder: "Choisissez le type de financement",
            amount: "Montant souhaité (€)",
            duration: "Durée de remboursement (mois)",
            purpose: "Objet du financement",
            purposePlaceholder: "Décrivez l'utilisation des fonds",
            hasGuarantee: "Avez-vous une garantie ?",
            guaranteePlaceholder: "Sélectionnez une option"
          },
          loanTypes: {
            personal: "Prêt personnel",
            auto: "Crédit auto",
            home: "Prêt immobilier",
            business: "Financement professionnel",
            consolidation: "Rachat de crédits"
          },
          guaranteeOptions: {
            yes: "Oui",
            no: "Non",
            discuss: "À discuter"
          }
        },
        validation: {
          title: "Validation et documents",
          subtitle: "Finalisez votre demande",
          fields: {
            hasRequiredDocs: "Je confirme avoir les documents requis",
            acceptsTerms: "J'accepte les conditions générales",
            acceptsMarketing: "J'accepte de recevoir des informations commerciales"
          },
          submitButton: "Envoyer ma demande",
          qualityCommitment: "Engagement qualité : Nous nous engageons à vous contacter sous 24h pour étudier votre demande et vous proposer une solution adaptée."
        }
      },
      sidebar: {
        documents: {
          title: "Documents requis",
          subtitle: "Préparez ces documents pour accélérer votre demande",
          list: [
            "Pièce d'identité en cours de validité",
            "Justificatifs de revenus (3 derniers bulletins)",
            "Relevés bancaires (3 derniers mois)",
            "Justificatif de domicile récent",
            "Compromis de vente (si immobilier)"
          ]
        },
        help: {
          title: "Besoin d'aide ?",
          subtitle: "Nos experts sont là pour vous accompagner",
          phone: "+33 1 78 16 40 00",
          schedule: "Lun-Ven 8h-19h"
        },
        security: {
          title: "Sécurité garantie",
          features: [
            "Chiffrement SSL 256 bits",
            "Conformité RGPD",
            "Données protégées"
          ]
        }
      }
    },
    contact: {
      hero: {
        title: "Contactez nos",
        titleSpan: "Experts",
        subtitle: "Une équipe dédiée pour vous accompagner dans tous vos projets financiers",
        stats: {
          responseTime: "Réponse sous 2h",
          experts: "Experts disponibles"
        }
      },
      methods: {
        title: "Moyens de contact",
        subtitle: "Choisissez le canal qui vous convient le mieux pour échanger avec nos conseillers",
        phone: {
          title: "Téléphone",
          description: "Appelez-nous pour un conseil immédiat",
          value: "+33 1 78 16 40 00",
          hours: "Lun-Ven 8h-19h, Sam 9h-17h"
        },
        email: {
          title: "Email",
          description: "Écrivez-nous, nous répondons rapidement",
          value: "contact@aurex-kpital.com",
          hours: "Réponse sous 2h en moyenne"
        },
        address: {
          title: "Adresse",
          description: "Rencontrez-nous dans nos bureaux",
          value: "42 Avenue des Champs-Élysées, 75008 Paris",
          hours: "Sur rendez-vous uniquement"
        }
      },
      form: {
        title: "Envoyez-nous un message",
        fields: {
          name: "Nom et prénom",
          email: "Adresse email",
          message: "Votre message"
        },
        submitButton: "Envoyer le message",
        successMessage: "Merci ! Votre message a été envoyé avec succès. Nous vous répondrons rapidement.",
        commitment: "Nous nous engageons à répondre dans les 2 heures pendant nos horaires d'ouverture."
      }
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
    request: {
      hero: {
        badge: "Finanzierungsantrag",
        title: "Ihr Projekt verdient",
        titleHighlight: "die beste Finanzierung",
        subtitle: "Erhalten Sie in 24h eine personalisierte Antwort dank unserer fortschrittlichen KI und Expertenberatung",
        stats: {
          responseTime: { value: "24h", label: "Garantierte Antwort" },
          security: { value: "100%", label: "DSGVO-konform" },
          expert: { value: "24/7", label: "Expertenunterstützung" }
        }
      },
      steps: [
        { title: "Informationen", description: "Ihre persönlichen Daten" },
        { title: "Projekt", description: "Finanzierungsdetails" },
        { title: "Analyse", description: "Individuelle Prüfung" },
        { title: "Antwort", description: "Maßgeschneidertes Angebot" }
      ],
      form: {
        personalInfo: {
          title: "Persönliche Informationen",
          subtitle: "Geben Sie Ihre Grunddaten ein, um Ihren Antrag zu beginnen",
          fields: {
            firstName: "Vorname",
            lastName: "Nachname",
            email: "E-Mail-Adresse",
            emailConfirmation: "E-Mail bestätigen",
            emailConfirmationPlaceholder: "E-Mail-Adresse erneut eingeben",
            phone: "Telefon",
            birthDate: "Geburtsdatum",
            nationality: "Staatsangehörigkeit",
            nationalityPlaceholder: "Wählen Sie Ihre Staatsangehörigkeit",
            otherNationality: "Weitere Staatsangehörigkeit",
            maritalStatus: "Familienstand",
            maritalStatusPlaceholder: "Wählen Sie Ihren Status",
            dependents: "Anzahl der Angehörigen"
          },
          validation: {
            emailMismatch: "E-Mail-Adressen stimmen nicht überein",
            emailConfirmed: "E-Mail-Adressen bestätigt"
          },
          maritalStatusOptions: {
            single: "Ledig",
            married: "Verheiratet",
            divorced: "Geschieden",
            widowed: "Verwitwet",
            partnership: "Lebenspartnerschaft"
          }
        },
        professionalInfo: {
          title: "Berufliche Situation",
          subtitle: "Informationen zu Ihrer beruflichen Tätigkeit und Ihren Einkünften",
          fields: {
            employmentStatus: "Berufsstatus",
            employmentStatusPlaceholder: "Ihre berufliche Situation",
            profession: "Beruf",
            company: "Unternehmen",
            position: "Position",
            employer: "Arbeitgeber",
            employmentDuration: "Beschäftigungsdauer",
            workExperience: "Berufserfahrung",
            monthlyIncome: "Monatliches Nettoeinkommen (€)",
            additionalIncome: "Weitere monatliche Einkünfte (€)"
          },
          employmentOptions: {
            employee: "Angestellt",
            selfEmployed: "Selbstständig",
            business: "Unternehmer",
            manager: "Führungskraft",
            retired: "Rentner",
            student: "Student",
            unemployed: "Arbeitslos"
          }
        },
        financingRequest: {
          title: "Finanzierungsantrag",
          subtitle: "Geben Sie die Details Ihres Finanzierungsprojekts an",
          fields: {
            loanType: "Kreditart",
            loanTypePlaceholder: "Wählen Sie die Finanzierungsart",
            amount: "Gewünschter Betrag (€)",
            duration: "Rückzahlungsdauer (Monate)",
            purpose: "Verwendungszweck",
            purposePlaceholder: "Beschreiben Sie die Verwendung der Mittel",
            hasGuarantee: "Haben Sie eine Sicherheit?",
            guaranteePlaceholder: "Option wählen"
          },
          loanTypes: {
            personal: "Privatkredit",
            auto: "Autokredit",
            home: "Immobilienkredit",
            business: "Unternehmensfinanzierung",
            consolidation: "Kreditumschuldung"
          },
          guaranteeOptions: {
            yes: "Ja",
            no: "Nein",
            discuss: "Zu besprechen"
          }
        },
        validation: {
          title: "Bestätigung und Dokumente",
          subtitle: "Schließen Sie Ihren Antrag ab",
          fields: {
            hasRequiredDocs: "Ich bestätige, dass ich die erforderlichen Dokumente habe",
            acceptsTerms: "Ich akzeptiere die Allgemeinen Geschäftsbedingungen",
            acceptsMarketing: "Ich möchte Werbeinformationen erhalten"
          },
          submitButton: "Antrag senden",
          qualityCommitment: "Qualitätsverpflichtung: Wir verpflichten uns, Sie innerhalb von 24 Stunden zu kontaktieren, um Ihren Antrag zu prüfen und Ihnen eine passende Lösung vorzuschlagen."
        }
      },
      sidebar: {
        documents: {
          title: "Erforderliche Dokumente",
          subtitle: "Bereiten Sie diese Dokumente vor, um Ihren Antrag zu beschleunigen",
          list: [
            "Gültiger Personalausweis",
            "Einkommensnachweise (3 letzte Gehaltsabrechnungen)",
            "Kontoauszüge (3 letzte Monate)",
            "Aktueller Wohnsitznachweis",
            "Kaufvertrag (bei Immobilien)"
          ]
        },
        help: {
          title: "Brauchen Sie Hilfe?",
          subtitle: "Unsere Experten begleiten Sie",
          phone: "+49 40 123 456 789",
          schedule: "Mo-Fr 8-19 Uhr"
        },
        security: {
          title: "Garantierte Sicherheit",
          features: [
            "256-Bit SSL-Verschlüsselung",
            "DSGVO-Konformität",
            "Geschützte Daten"
          ]
        }
      }
    },
    contact: {
      hero: {
        title: "Kontaktieren Sie unsere",
        titleSpan: "Experten",
        subtitle: "Ein engagiertes Team, das Sie bei all Ihren Finanzprojekten begleitet",
        stats: {
          responseTime: "Antwort binnen 2h",
          experts: "Experten verfügbar"
        }
      },
      methods: {
        title: "Kontaktmöglichkeiten",
        subtitle: "Wählen Sie den für Sie passenden Kanal, um mit unseren Beratern zu sprechen",
        phone: {
          title: "Telefon",
          description: "Rufen Sie uns für sofortige Beratung an",
          value: "+49 40 123 456 789",
          hours: "Mo-Fr 8-19 Uhr, Sa 9-17 Uhr"
        },
        email: {
          title: "E-Mail",
          description: "Schreiben Sie uns, wir antworten schnell",
          value: "kontakt@aurex-kpital.de",
          hours: "Antwort binnen 2h im Durchschnitt"
        },
        address: {
          title: "Adresse",
          description: "Besuchen Sie uns in unseren Büros",
          value: "Neuer Wall 10, 20354 Hamburg",
          hours: "Nur nach Terminvereinbarung"
        }
      },
      form: {
        title: "Senden Sie uns eine Nachricht",
        fields: {
          name: "Vor- und Nachname",
          email: "E-Mail-Adresse",
          message: "Ihre Nachricht"
        },
        submitButton: "Nachricht senden",
        successMessage: "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir antworten Ihnen schnellstmöglich.",
        commitment: "Wir verpflichten uns, innerhalb von 2 Stunden während unserer Öffnungszeiten zu antworten."
      }
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
      partners: "Partners",
      blog: "Blog"
    },
    request: {
      hero: {
        badge: "Solicitud de Financiación",
        title: "Su proyecto merece",
        titleHighlight: "la mejor financiación",
        subtitle: "Obtenga una respuesta personalizada en 24h gracias a nuestra IA avanzada y la experiencia de nuestros asesores",
        stats: {
          responseTime: { value: "24h", label: "Respuesta garantizada" },
          security: { value: "100%", label: "Seguro RGPD" },
          expert: { value: "24/7", label: "Soporte experto" }
        }
      },
      steps: [
        { title: "Información", description: "Sus datos personales" },
        { title: "Proyecto", description: "Detalles de financiación" },
        { title: "Análisis", description: "Estudio personalizado" },
        { title: "Respuesta", description: "Propuesta a medida" }
      ],
      form: {
        personalInfo: {
          title: "Información personal",
          subtitle: "Introduzca sus datos básicos para comenzar su solicitud",
          fields: {
            firstName: "Nombre",
            lastName: "Apellidos",
            email: "Dirección de email",
            emailConfirmation: "Confirmar email",
            emailConfirmationPlaceholder: "Vuelva a introducir su dirección de email",
            phone: "Teléfono",
            birthDate: "Fecha de nacimiento",
            nationality: "Nacionalidad",
            nationalityPlaceholder: "Seleccione su nacionalidad",
            otherNationality: "Otra nacionalidad",
            maritalStatus: "Estado civil",
            maritalStatusPlaceholder: "Seleccione su situación",
            dependents: "Número de personas a cargo"
          },
          validation: {
            emailMismatch: "Las direcciones de email no coinciden",
            emailConfirmed: "Direcciones de email confirmadas"
          },
          maritalStatusOptions: {
            single: "Soltero/a",
            married: "Casado/a",
            divorced: "Divorciado/a",
            widowed: "Viudo/a",
            partnership: "Pareja de hecho"
          }
        },
        professionalInfo: {
          title: "Situación profesional",
          subtitle: "Información sobre su actividad profesional e ingresos",
          fields: {
            employmentStatus: "Estatus profesional",
            employmentStatusPlaceholder: "Su situación profesional",
            profession: "Profesión",
            company: "Empresa",
            position: "Puesto ocupado",
            employer: "Empleador",
            employmentDuration: "Antigüedad en el empleo",
            workExperience: "Experiencia profesional",
            monthlyIncome: "Ingresos mensuales netos (€)",
            additionalIncome: "Otros ingresos mensuales (€)"
          },
          employmentOptions: {
            employee: "Empleado/a",
            selfEmployed: "Autónomo/a",
            business: "Empresario/a",
            manager: "Directivo/a",
            retired: "Jubilado/a",
            student: "Estudiante",
            unemployed: "Desempleado/a"
          }
        },
        financingRequest: {
          title: "Solicitud de financiación",
          subtitle: "Especifique los detalles de su proyecto de financiación",
          fields: {
            loanType: "Tipo de préstamo",
            loanTypePlaceholder: "Elija el tipo de financiación",
            amount: "Importe deseado (€)",
            duration: "Duración de reembolso (meses)",
            purpose: "Objeto de la financiación",
            purposePlaceholder: "Describa el uso de los fondos",
            hasGuarantee: "¿Tiene una garantía?",
            guaranteePlaceholder: "Seleccione una opción"
          },
          loanTypes: {
            personal: "Préstamo personal",
            auto: "Crédito auto",
            home: "Préstamo hipotecario",
            business: "Financiación empresarial",
            consolidation: "Reunificación de créditos"
          },
          guaranteeOptions: {
            yes: "Sí",
            no: "No",
            discuss: "A discutir"
          }
        },
        validation: {
          title: "Validación y documentos",
          subtitle: "Finalice su solicitud",
          fields: {
            hasRequiredDocs: "Confirmo tener los documentos requeridos",
            acceptsTerms: "Acepto las condiciones generales",
            acceptsMarketing: "Acepto recibir información comercial"
          },
          submitButton: "Enviar mi solicitud",
          qualityCommitment: "Compromiso de calidad: Nos comprometemos a contactarle en 24h para estudiar su solicitud y proponerle una solución adaptada."
        }
      },
      sidebar: {
        documents: {
          title: "Documentos requeridos",
          subtitle: "Prepare estos documentos para acelerar su solicitud",
          list: [
            "Documento de identidad en vigor",
            "Justificantes de ingresos (3 últimas nóminas)",
            "Extractos bancarios (3 últimos meses)",
            "Justificante de domicilio reciente",
            "Compromiso de compraventa (si inmobiliario)"
          ]
        },
        help: {
          title: "¿Necesita ayuda?",
          subtitle: "Nuestros expertos están para acompañarle",
          phone: "+34 91 123 45 67",
          schedule: "Lun-Vie 8h-19h"
        },
        security: {
          title: "Seguridad garantizada",
          features: [
            "Cifrado SSL 256 bits",
            "Conformidad RGPD",
            "Datos protegidos"
          ]
        }
      }
    },
    contact: {
      hero: {
        title: "Contacte a nuestros",
        titleSpan: "Expertos",
        subtitle: "Un equipo dedicado para acompañarle en todos sus proyectos financieros",
        stats: {
          responseTime: "Respuesta en 2h",
          experts: "Expertos disponibles"
        }
      },
      methods: {
        title: "Medios de contacto",
        subtitle: "Elija el canal que mejor le convenga para hablar con nuestros asesores",
        phone: {
          title: "Teléfono",
          description: "Llámenos para un consejo inmediato",
          value: "+34 91 123 45 67",
          hours: "Lun-Vie 8h-19h, Sáb 9h-17h"
        },
        email: {
          title: "Email",
          description: "Escríbanos, respondemos rápidamente",
          value: "contacto@aurex-kpital.es",
          hours: "Respuesta en 2h en promedio"
        },
        address: {
          title: "Dirección",
          description: "Encuéntrenos en nuestras oficinas",
          value: "Paseo de la Castellana 95, 28046 Madrid",
          hours: "Solo con cita previa"
        }
      },
      form: {
        title: "Envíenos un mensaje",
        fields: {
          name: "Nombre y apellidos",
          email: "Dirección de email",
          message: "Su mensaje"
        },
        submitButton: "Enviar mensaje",
        successMessage: "¡Gracias! Su mensaje ha sido enviado con éxito. Le responderemos rápidamente.",
        commitment: "Nos comprometemos a responder en 2 horas durante nuestro horario de oficina."
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
      careers: "Carriere",
      partners: "Partner",
      blog: "Blog"
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
      },
      steps: [
        { title: "Informazioni", description: "I tuoi dati personali" },
        { title: "Progetto", description: "Dettagli del finanziamento" },
        { title: "Analisi", description: "Studio personalizzato" },
        { title: "Risposta", description: "Proposta su misura" }
      ],
      form: {
        personalInfo: {
          title: "Informazioni personali",
          subtitle: "Inserisci le tue informazioni di base per iniziare la tua richiesta",
          fields: {
            firstName: "Nome",
            lastName: "Cognome",
            email: "Indirizzo email",
            emailConfirmation: "Conferma email",
            emailConfirmationPlaceholder: "Reinserisci il tuo indirizzo email",
            phone: "Telefono",
            birthDate: "Data di nascita",
            nationality: "Nazionalità",
            nationalityPlaceholder: "Seleziona la tua nazionalità",
            otherNationality: "Altra nazionalità",
            maritalStatus: "Stato civile",
            maritalStatusPlaceholder: "Seleziona la tua situazione",
            dependents: "Numero di persone a carico"
          },
          validation: {
            emailMismatch: "Gli indirizzi email non corrispondono",
            emailConfirmed: "Indirizzi email confermati"
          },
          maritalStatusOptions: {
            single: "Single",
            married: "Sposato/a",
            divorced: "Divorziato/a",
            widowed: "Vedovo/a",
            partnership: "Convivenza"
          }
        },
        professionalInfo: {
          title: "Situazione professionale",
          subtitle: "Informazioni sulla tua attività professionale e sui tuoi redditi",
          fields: {
            employmentStatus: "Status professionale",
            employmentStatusPlaceholder: "La tua situazione professionale",
            profession: "Professione",
            company: "Azienda",
            position: "Posizione ricoperta",
            employer: "Datore di lavoro",
            employmentDuration: "Anzianità di servizio",
            workExperience: "Esperienza professionale",
            monthlyIncome: "Reddito mensile netto (€)",
            additionalIncome: "Altri redditi mensili (€)"
          },
          employmentOptions: {
            employee: "Dipendente",
            selfEmployed: "Lavoratore autonomo",
            business: "Imprenditore",
            manager: "Dirigente",
            retired: "Pensionato",
            student: "Studente",
            unemployed: "Disoccupato"
          }
        },
        financingRequest: {
          title: "Richiesta di finanziamento",
          subtitle: "Specifica i dettagli del tuo progetto di finanziamento",
          fields: {
            loanType: "Tipo di prestito",
            loanTypePlaceholder: "Scegli il tipo di finanziamento",
            amount: "Importo desiderato (€)",
            duration: "Durata di rimborso (mesi)",
            purpose: "Oggetto del finanziamento",
            purposePlaceholder: "Descrivi l'uso dei fondi",
            hasGuarantee: "Hai una garanzia?",
            guaranteePlaceholder: "Seleziona un'opzione"
          },
          loanTypes: {
            personal: "Prestito personale",
            auto: "Credito auto",
            home: "Mutuo casa",
            business: "Finanziamento aziendale",
            consolidation: "Consolidamento debiti"
          },
          guaranteeOptions: {
            yes: "Sì",
            no: "No",
            discuss: "Da discutere"
          }
        },
        validation: {
          title: "Validazione e documenti",
          subtitle: "Finalizza la tua richiesta",
          fields: {
            hasRequiredDocs: "Confermo di avere i documenti richiesti",
            acceptsTerms: "Accetto le condizioni generali",
            acceptsMarketing: "Accetto di ricevere informazioni commerciali"
          },
          submitButton: "Invia la mia richiesta",
          qualityCommitment: "Impegno qualità: Ci impegniamo a contattarti entro 24h per studiare la tua richiesta e proporti una soluzione adatta."
        }
      },
      sidebar: {
        documents: {
          title: "Documenti richiesti",
          subtitle: "Prepara questi documenti per accelerare la tua richiesta",
          list: [
            "Documento d'identità in corso di validità",
            "Giustificativi di reddito (3 ultime buste paga)",
            "Estratti conto bancari (3 ultimi mesi)",
            "Certificato di residenza recente",
            "Compromesso di vendita (se immobiliare)"
          ]
        },
        help: {
          title: "Hai bisogno di aiuto?",
          subtitle: "I nostri esperti sono qui per accompagnarti",
          phone: "+39 02 1234 5678",
          schedule: "Lun-Ven 8-19"
        },
        security: {
          title: "Sicurezza garantita",
          features: [
            "Crittografia SSL 256 bit",
            "Conformità GDPR",
            "Dati protetti"
          ]
        }
      }
    },
    contact: {
      hero: {
        title: "Contatta i nostri",
        titleSpan: "Esperti",
        subtitle: "Un team dedicato per accompagnarti in tutti i tuoi progetti finanziari",
        stats: {
          responseTime: "Risposta in 2h",
          experts: "Esperti disponibili"
        }
      },
      methods: {
        title: "Mezzi di contatto",
        subtitle: "Scegli il canale che preferisci per parlare con i nostri consulenti",
        phone: {
          title: "Telefono",
          description: "Chiamaci per un consiglio immediato",
          value: "+39 02 1234 5678",
          hours: "Lun-Ven 8-19, Sab 9-17"
        },
        email: {
          title: "Email",
          description: "Scrivici, rispondiamo velocemente",
          value: "contatto@aurex-kpital.it",
          hours: "Risposta in 2h in media"
        },
        address: {
          title: "Indirizzo",
          description: "Incontraci nei nostri uffici",
          value: "Via Monte Napoleone 8, 20121 Milano",
          hours: "Solo su appuntamento"
        }
      },
      form: {
        title: "Inviaci un messaggio",
        fields: {
          name: "Nome e cognome",
          email: "Indirizzo email",
          message: "Il tuo messaggio"
        },
        submitButton: "Invia messaggio",
        successMessage: "Grazie! Il tuo messaggio è stato inviato con successo. Ti risponderemo rapidamente.",
        commitment: "Ci impegniamo a rispondere entro 2 ore durante i nostri orari di ufficio."
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
      careers: "Kariera",
      partners: "Partnerzy",
      blog: "Blog"
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
    }
  }
};

export { translations };