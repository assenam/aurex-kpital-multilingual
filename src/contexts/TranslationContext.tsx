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
            amountPlaceholder: "Montant en euros",
            duration: "Durée de remboursement (mois)",
            durationPlaceholder: "Durée en mois",
            purpose: "Objet du financement",
            purposePlaceholder: "Décrivez l'utilisation des fonds",
            hasGuarantee: "Avez-vous une garantie ?",
            guaranteePlaceholder: "Sélectionnez une option"
          },
          loanOptions: {
            personal: "Prêt personnel",
            auto: "Crédit auto",
            realEstate: "Prêt immobilier",
            professional: "Financement professionnel",
            student: "Prêt étudiant",
            consolidation: "Rachat de crédits"
          },
          guaranteeOptions: {
            yes: "Oui",
            no: "Non",
            maybe: "À évaluer selon l'offre"
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
            amountPlaceholder: "Betrag in Euro",
            duration: "Rückzahlungsdauer (Monate)",
            durationPlaceholder: "Dauer in Monaten",
            purpose: "Verwendungszweck",
            purposePlaceholder: "Beschreiben Sie die Verwendung der Mittel",
            hasGuarantee: "Haben Sie eine Sicherheit?",
            guaranteePlaceholder: "Option wählen"
          },
          loanOptions: {
            personal: "Privatkredit",
            auto: "Autokredit",
            realEstate: "Immobilienkredit",
            professional: "Unternehmensfinanzierung",
            student: "Studentenkredit",
            consolidation: "Kreditumschuldung"
          },
          guaranteeOptions: {
            yes: "Ja",
            no: "Nein",
            maybe: "Je nach Angebot zu bewerten"
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
    },
    request: {
      hero: {
        badge: "Wniosek o Finansowanie",
        title: "Twój projekt zasługuje na",
        titleHighlight: "najlepsze finansowanie",
        subtitle: "Otrzymaj spersonalizowaną odpowiedź w 24h dzięki naszej zaawansowanej AI i doświadczeniu naszych doradców",
        stats: {
          responseTime: { value: "24h", label: "Gwarantowana odpowiedź" },
          security: { value: "100%", label: "Bezpieczne RODO" },
          expert: { value: "24/7", label: "Wsparcie ekspertów" }
        }
      },
      steps: [
        { title: "Informacje", description: "Twoje dane osobowe" },
        { title: "Projekt", description: "Szczegóły finansowania" },
        { title: "Analiza", description: "Spersonalizowana ocena" },
        { title: "Odpowiedź", description: "Oferta na miarę" }
      ],
      form: {
        personalInfo: {
          title: "Informacje osobowe",
          subtitle: "Wprowadź swoje podstawowe dane, aby rozpocząć wniosek",
          fields: {
            firstName: "Imię",
            lastName: "Nazwisko",
            email: "Adres email",
            emailConfirmation: "Potwierdź email",
            emailConfirmationPlaceholder: "Wprowadź ponownie swój adres email",
            phone: "Telefon",
            birthDate: "Data urodzenia",
            nationality: "Narodowość",
            nationalityPlaceholder: "Wybierz swoją narodowość",
            otherNationality: "Inna narodowość",
            maritalStatus: "Stan cywilny",
            maritalStatusPlaceholder: "Wybierz swoją sytuację",
            dependents: "Liczba osób na utrzymaniu"
          },
          validation: {
            emailMismatch: "Adresy email nie są zgodne",
            emailConfirmed: "Adresy email potwierdzone"
          },
          maritalStatusOptions: {
            single: "Kawaler/Panna",
            married: "Żonaty/Zamężna",
            divorced: "Rozwiedziony/a",
            widowed: "Wdowiec/Wdowa",
            partnership: "Związek partnerski"
          }
        },
        professionalInfo: {
          title: "Sytuacja zawodowa",
          subtitle: "Informacje o Twojej działalności zawodowej i dochodach",
          fields: {
            employmentStatus: "Status zawodowy",
            employmentStatusPlaceholder: "Twoja sytuacja zawodowa",
            profession: "Zawód",
            company: "Firma",
            position: "Stanowisko",
            employer: "Pracodawca",
            employmentDuration: "Staż pracy",
            workExperience: "Doświadczenie zawodowe",
            monthlyIncome: "Miesięczne dochody netto (€)",
            additionalIncome: "Inne miesięczne dochody (€)"
          },
          employmentOptions: {
            employee: "Pracownik",
            selfEmployed: "Samozatrudniony",
            business: "Przedsiębiorca",
            manager: "Kierownik",
            retired: "Emeryt",
            student: "Student",
            unemployed: "Bezrobotny"
          }
        },
        financingRequest: {
          title: "Wniosek o finansowanie",
          subtitle: "Podaj szczegóły swojego projektu finansowania",
          fields: {
            loanType: "Rodzaj kredytu",
            loanTypePlaceholder: "Wybierz rodzaj finansowania",
            amount: "Żądana kwota (€)",
            amountPlaceholder: "Kwota w euro",
            duration: "Czas spłaty (miesiące)",
            durationPlaceholder: "Czas w miesiącach",
            purpose: "Cel finansowania",
            purposePlaceholder: "Opisz wykorzystanie środków",
            hasGuarantee: "Czy masz zabezpieczenie?",
            guaranteePlaceholder: "Wybierz opcję"
          },
          loanOptions: {
            personal: "Kredyt osobisty",
            auto: "Kredyt samochodowy",
            realEstate: "Kredyt hipoteczny",
            professional: "Finansowanie biznesowe",
            student: "Kredyt studencki",
            consolidation: "Konsolidacja kredytów"
          },
          guaranteeOptions: {
            yes: "Tak",
            no: "Nie",
            maybe: "Do oceny według oferty"
          }
        },
        validation: {
          title: "Weryfikacja i dokumenty",
          subtitle: "Zakończ swój wniosek",
          fields: {
            hasRequiredDocs: "Potwierdzam posiadanie wymaganych dokumentów",
            acceptsTerms: "Akceptuję regulamin",
            acceptsMarketing: "Zgadzam się na otrzymywanie informacji handlowych"
          },
          submitButton: "Wyślij mój wniosek",
          qualityCommitment: "Zobowiązanie jakości: Zobowiązujemy się skontaktować z Tobą w ciągu 24h, aby przeanalizować Twój wniosek i zaproponować odpowiednie rozwiązanie."
        }
      },
      sidebar: {
        documents: {
          title: "Wymagane dokumenty",
          subtitle: "Przygotuj te dokumenty, aby przyspieszyć swój wniosek",
          list: [
            "Ważny dokument tożsamości",
            "Zaświadczenia o dochodach (3 ostatnie wypłaty)",
            "Wyciągi bankowe (3 ostatnie miesiące)",
            "Aktualne potwierdzenie zamieszkania",
            "Umowa przedwstępna (jeśli nieruchomość)"
          ]
        },
        help: {
          title: "Potrzebujesz pomocy?",
          subtitle: "Nasi eksperci są tutaj, aby Ci towarzyszyć",
          phone: "+48 22 123 45 67",
          schedule: "Pon-Pt 8-19"
        },
        security: {
          title: "Gwarantowane bezpieczeństwo",
          features: [
            "Szyfrowanie SSL 256 bit",
            "Zgodność z RODO",
            "Chronione dane"
          ]
        }
      }
    },
    contact: {
      hero: {
        title: "Skontaktuj się z naszymi",
        titleSpan: "Ekspertami",
        subtitle: "Zespół poświęcony wspieraniu Cię we wszystkich projektach finansowych",
        stats: {
          responseTime: "Odpowiedź w 2h",
          experts: "Dostępni eksperci"
        }
      },
      methods: {
        title: "Sposoby kontaktu",
        subtitle: "Wybierz kanał, który Ci odpowiada, aby rozmawiać z naszymi doradcami",
        phone: {
          title: "Telefon",
          description: "Zadzwoń do nas po natychmiastową poradę",
          value: "+48 22 123 45 67",
          hours: "Pon-Pt 8-19, Sob 9-17"
        },
        email: {
          title: "Email",
          description: "Napisz do nas, szybko odpowiadamy",
          value: "kontakt@aurex-kpital.pl",
          hours: "Odpowiedź w 2h średnio"
        },
        address: {
          title: "Adres",
          description: "Spotkaj się z nami w naszych biurach",
          value: "ul. Nowy Świat 6/12, 00-400 Warszawa",
          hours: "Tylko po umówieniu"
        }
      },
      form: {
        title: "Wyślij nam wiadomość",
        fields: {
          name: "Imię i nazwisko",
          email: "Adres email",
          message: "Twoja wiadomość"
        },
        submitButton: "Wyślij wiadomość",
        successMessage: "Dziękujemy! Twoja wiadomość została wysłana pomyślnie. Odpowiemy szybko.",
        commitment: "Zobowiązujemy się odpowiedzieć w ciągu 2 godzin w czasie naszych godzin pracy."
      }
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
    request: {
      hero: {
        badge: "Rahoitushakemus",
        title: "Projektisi ansaitsee",
        titleHighlight: "parhaan rahoituksen",
        subtitle: "Saa henkilökohtainen vastaus 24h:ssa kehittyneen tekoälymme ja neuvojiemme asiantuntemuksen ansiosta",
        stats: {
          responseTime: { value: "24h", label: "Taattu vastaus" },
          security: { value: "100%", label: "GDPR-turvallinen" },
          expert: { value: "24/7", label: "Asiantuntijatuki" }
        }
      },
      steps: [
        { title: "Tiedot", description: "Henkilötietosi" },
        { title: "Projekti", description: "Rahoituksen yksityiskohdat" },
        { title: "Analyysi", description: "Henkilökohtainen tutkimus" },
        { title: "Vastaus", description: "Räätälöity ehdotus" }
      ],
      form: {
        personalInfo: {
          title: "Henkilötiedot",
          subtitle: "Anna perustietosi aloittaaksesi hakemuksesi",
          fields: {
            firstName: "Etunimi",
            lastName: "Sukunimi",
            email: "Sähköpostiosoite",
            emailConfirmation: "Vahvista sähköposti",
            emailConfirmationPlaceholder: "Syötä sähköpostiosoitteesi uudelleen",
            phone: "Puhelin",
            birthDate: "Syntymäaika",
            nationality: "Kansallisuus",
            nationalityPlaceholder: "Valitse kansallisuutesi",
            otherNationality: "Muu kansallisuus",
            maritalStatus: "Siviilisääty",
            maritalStatusPlaceholder: "Valitse tilanteesi",
            dependents: "Huollettavien määrä"
          },
          validation: {
            emailMismatch: "Sähköpostiosoitteet eivät täsmää",
            emailConfirmed: "Sähköpostiosoitteet vahvistettu"
          },
          maritalStatusOptions: {
            single: "Naimaton",
            married: "Naimisissa",
            divorced: "Eronnut",
            widowed: "Leski",
            partnership: "Avoliitto"
          }
        },
        professionalInfo: {
          title: "Ammatillinen tilanne",
          subtitle: "Tiedot ammatillisesta toiminnastasi ja tuloistasi",
          fields: {
            employmentStatus: "Ammatillinen status",
            employmentStatusPlaceholder: "Ammatillinen tilanteesi",
            profession: "Ammatti",
            company: "Yritys",
            position: "Asema",
            employer: "Työnantaja",
            employmentDuration: "Työsuhteen kesto",
            workExperience: "Työkokemus",
            monthlyIncome: "Kuukausitulot netto (€)",
            additionalIncome: "Muut kuukausitulot (€)"
          },
          employmentOptions: {
            employee: "Työntekijä",
            selfEmployed: "Yrittäjä",
            business: "Yritysjohtaja",
            manager: "Johtaja",
            retired: "Eläkeläinen",
            student: "Opiskelija",
            unemployed: "Työtön"
          }
        },
        financingRequest: {
          title: "Rahoitushakemus",
          subtitle: "Määritä rahoitusprojektisi yksityiskohdat",
          fields: {
            loanType: "Lainatyyppi",
            loanTypePlaceholder: "Valitse rahoitustyyppi",
            amount: "Haluttu summa (€)",
            amountPlaceholder: "Summa euroina",
            duration: "Takaisinmaksuaika (kuukautta)",
            durationPlaceholder: "Aika kuukausina",
            purpose: "Rahoituksen tarkoitus",
            purposePlaceholder: "Kuvaile varojen käyttö",
            hasGuarantee: "Onko sinulla vakuus?",
            guaranteePlaceholder: "Valitse vaihtoehto"
          },
          loanOptions: {
            personal: "Henkilökohtainen laina",
            auto: "Autolaina",
            realEstate: "Asuntolaina",
            professional: "Yritysrahoitus",
            student: "Opintolaina",
            consolidation: "Lainojen yhdistäminen"
          },
          guaranteeOptions: {
            yes: "Kyllä",
            no: "Ei",
            maybe: "Arvioitava tarjouksen mukaan"
          }
        },
        validation: {
          title: "Vahvistus ja asiakirjat",
          subtitle: "Viimeistele hakemuksesi",
          fields: {
            hasRequiredDocs: "Vahvistan, että minulla on vaaditut asiakirjat",
            acceptsTerms: "Hyväksyn käyttöehdot",
            acceptsMarketing: "Suostun vastaanottamaan kaupallisia tietoja"
          },
          submitButton: "Lähetä hakemukseni",
          qualityCommitment: "Laatusitoumus: Sitoudumme ottamaan sinuun yhteyttä 24 tunnin kuluessa tutkiaksemme hakemuksesi ja ehdottaaksemme sopivaa ratkaisua."
        }
      },
      sidebar: {
        documents: {
          title: "Vaaditut asiakirjat",
          subtitle: "Valmistele nämä asiakirjat nopeuttaaksesi hakemustasi",
          list: [
            "Voimassa oleva henkilöllisyystodistus",
            "Tulotositteet (3 viimeistä palkkakuittia)",
            "Tiliotteet (3 viimeistä kuukautta)",
            "Tuore asuinpaikan todistus",
            "Kauppasopimus (jos kiinteistö)"
          ]
        },
        help: {
          title: "Tarvitsetko apua?",
          subtitle: "Asiantuntijamme ovat täällä opastamassa sinua",
          phone: "+358 9 123 456 78",
          schedule: "Ma-Pe 8-19"
        },
        security: {
          title: "Taattu turvallisuus",
          features: [
            "256-bittinen SSL-salaus",
            "GDPR-vaatimustenmukaisuus",
            "Suojatut tiedot"
          ]
        }
      }
    },
    contact: {
      hero: {
        title: "Ota yhteyttä",
        titleSpan: "Asiantuntijoihimme",
        subtitle: "Tiimi, joka on omistautunut tukemaan sinua kaikissa rahoitusprojekteissasi",
        stats: {
          responseTime: "Vastaus 2h sisällä",
          experts: "Asiantuntijat käytettävissä"
        }
      },
      methods: {
        title: "Yhteydenottotavat",
        subtitle: "Valitse sinulle sopiva kanava keskustellaksesi neuvojiemme kanssa",
        phone: {
          title: "Puhelin",
          description: "Soita meille välitöntä neuvontaa varten",
          value: "+358 9 123 456 78",
          hours: "Ma-Pe 8-19, La 9-17"
        },
        email: {
          title: "Sähköposti",
          description: "Kirjoita meille, vastaamme nopeasti",
          value: "yhteystiedot@aurex-kpital.fi",
          hours: "Vastaus 2h keskimäärin"
        },
        address: {
          title: "Osoite",
          description: "Tapaa meidät toimistoissamme",
          value: "Esplanadi 14, 00100 Helsinki",
          hours: "Vain ajanvarauksella"
        }
      },
      form: {
        title: "Lähetä meille viesti",
        fields: {
          name: "Etu- ja sukunimi",
          email: "Sähköpostiosoite",
          message: "Viestisi"
        },
        submitButton: "Lähetä viesti",
        successMessage: "Kiitos! Viestisi on lähetetty onnistuneesti. Vastaamme nopeasti.",
        commitment: "Sitoudumme vastaamaan 2 tunnin sisällä toimistoaikojemme aikana."
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
      careers: "Carreiras",
      partners: "Parceiros",
      blog: "Blog"
    },
    request: {
      hero: {
        badge: "Pedido de Financiamento",
        title: "O seu projeto merece",
        titleHighlight: "o melhor financiamento",
        subtitle: "Obtenha uma resposta personalizada em 24h graças à nossa IA avançada e experiência dos nossos consultores",
        stats: {
          responseTime: { value: "24h", label: "Resposta garantida" },
          security: { value: "100%", label: "Seguro RGPD" },
          expert: { value: "24/7", label: "Suporte especialista" }
        }
      },
      steps: [
        { title: "Informações", description: "Os seus dados pessoais" },
        { title: "Projeto", description: "Detalhes do financiamento" },
        { title: "Análise", description: "Estudo personalizado" },
        { title: "Resposta", description: "Proposta à medida" }
      ],
      form: {
        personalInfo: {
          title: "Informações pessoais",
          subtitle: "Introduza as suas informações básicas para começar o seu pedido",
          fields: {
            firstName: "Nome próprio",
            lastName: "Apelido",
            email: "Endereço de email",
            emailConfirmation: "Confirmar email",
            emailConfirmationPlaceholder: "Volte a introduzir o seu endereço de email",
            phone: "Telefone",
            birthDate: "Data de nascimento",
            nationality: "Nacionalidade",
            nationalityPlaceholder: "Selecione a sua nacionalidade",
            otherNationality: "Outra nacionalidade",
            maritalStatus: "Estado civil",
            maritalStatusPlaceholder: "Selecione a sua situação",
            dependents: "Número de pessoas a cargo"
          },
          validation: {
            emailMismatch: "Os endereços de email não coincidem",
            emailConfirmed: "Endereços de email confirmados"
          },
          maritalStatusOptions: {
            single: "Solteiro/a",
            married: "Casado/a",
            divorced: "Divorciado/a",
            widowed: "Viúvo/a",
            partnership: "União de facto"
          }
        },
        professionalInfo: {
          title: "Situação profissional",
          subtitle: "Informações sobre a sua atividade profissional e rendimentos",
          fields: {
            employmentStatus: "Estatuto profissional",
            employmentStatusPlaceholder: "A sua situação profissional",
            profession: "Profissão",
            company: "Empresa",
            position: "Posição ocupada",
            employer: "Empregador",
            employmentDuration: "Antiguidade no emprego",
            workExperience: "Experiência profissional",
            monthlyIncome: "Rendimentos mensais líquidos (€)",
            additionalIncome: "Outros rendimentos mensais (€)"
          },
          employmentOptions: {
            employee: "Empregado/a",
            selfEmployed: "Trabalhador independente",
            business: "Empresário/a",
            manager: "Gestor/a",
            retired: "Reformado/a",
            student: "Estudante",
            unemployed: "Desempregado/a"
          }
        },
        financingRequest: {
          title: "Pedido de financiamento",
          subtitle: "Especifique os detalhes do seu projeto de financiamento",
          fields: {
            loanType: "Tipo de empréstimo",
            loanTypePlaceholder: "Escolha o tipo de financiamento",
            amount: "Montante desejado (€)",
            amountPlaceholder: "Montante em euros",
            duration: "Duração de reembolso (meses)",
            durationPlaceholder: "Duração em meses",
            purpose: "Objeto do financiamento",
            purposePlaceholder: "Descreva a utilização dos fundos",
            hasGuarantee: "Tem uma garantia?",
            guaranteePlaceholder: "Selecione uma opção"
          },
          loanOptions: {
            personal: "Empréstimo pessoal",
            auto: "Crédito automóvel",
            realEstate: "Crédito habitação",
            professional: "Financiamento empresarial",
            student: "Empréstimo estudantil",
            consolidation: "Consolidação de créditos"
          },
          guaranteeOptions: {
            yes: "Sim",
            no: "Não",
            maybe: "A avaliar segundo a oferta"
          }
        },
        validation: {
          title: "Validação e documentos",
          subtitle: "Finalize o seu pedido",
          fields: {
            hasRequiredDocs: "Confirmo ter os documentos necessários",
            acceptsTerms: "Aceito os termos e condições",
            acceptsMarketing: "Aceito receber informações comerciais"
          },
          submitButton: "Enviar o meu pedido",
          qualityCommitment: "Compromisso de qualidade: Comprometemo-nos a contactá-lo em 24h para estudar o seu pedido e propor-lhe uma solução adequada."
        }
      },
      sidebar: {
        documents: {
          title: "Documentos necessários",
          subtitle: "Prepare estes documentos para acelerar o seu pedido",
          list: [
            "Documento de identidade válido",
            "Comprovativos de rendimentos (3 últimos recibos)",
            "Extratos bancários (3 últimos meses)",
            "Comprovativo de morada recente",
            "Promessa de compra e venda (se imobiliário)"
          ]
        },
        help: {
          title: "Precisa de ajuda?",
          subtitle: "Os nossos especialistas estão aqui para o acompanhar",
          phone: "+351 21 123 45 67",
          schedule: "Seg-Sex 8h-19h"
        },
        security: {
          title: "Segurança garantida",
          features: [
            "Encriptação SSL 256 bits",
            "Conformidade RGPD",
            "Dados protegidos"
          ]
        }
      }
    },
    contact: {
      hero: {
        title: "Contacte os nossos",
        titleSpan: "Especialistas",
        subtitle: "Uma equipa dedicada para o acompanhar em todos os seus projetos financeiros",
        stats: {
          responseTime: "Resposta em 2h",
          experts: "Especialistas disponíveis"
        }
      },
      methods: {
        title: "Meios de contacto",
        subtitle: "Escolha o canal que mais lhe convém para falar com os nossos consultores",
        phone: {
          title: "Telefone",
          description: "Ligue-nos para um conselho imediato",
          value: "+351 21 123 45 67",
          hours: "Seg-Sex 8h-19h, Sáb 9h-17h"
        },
        email: {
          title: "Email",
          description: "Escreva-nos, respondemos rapidamente",
          value: "contacto@aurex-kpital.pt",
          hours: "Resposta em 2h em média"
        },
        address: {
          title: "Morada",
          description: "Encontre-nos nos nossos escritórios",
          value: "Avenida da Liberdade 110, 1269-046 Lisboa",
          hours: "Apenas com marcação"
        }
      },
      form: {
        title: "Envie-nos uma mensagem",
        fields: {
          name: "Nome e apelido",
          email: "Endereço de email",
          message: "A sua mensagem"
        },
        submitButton: "Enviar mensagem",
        successMessage: "Obrigado! A sua mensagem foi enviada com sucesso. Responderemos rapidamente.",
        commitment: "Comprometemo-nos a responder em 2 horas durante o nosso horário de funcionamento."
      }
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
    request: {
      hero: {
        badge: "Αίτηση Χρηματοδότησης",
        title: "Το έργο σας αξίζει",
        titleHighlight: "την καλύτερη χρηματοδότηση",
        subtitle: "Λάβετε εξατομικευμένη απάντηση σε 24ω χάρη στην προηγμένη τεχνητή νοημοσύνη και την εμπειρία των συμβούλων μας",
        stats: {
          responseTime: { value: "24ω", label: "Εγγυημένη απάντηση" },
          security: { value: "100%", label: "Ασφαλές GDPR" },
          expert: { value: "24/7", label: "Υποστήριξη ειδικών" }
        }
      },
      steps: [
        { title: "Πληροφορίες", description: "Τα προσωπικά σας στοιχεία" },
        { title: "Έργο", description: "Λεπτομέρειες χρηματοδότησης" },
        { title: "Ανάλυση", description: "Εξατομικευμένη μελέτη" },
        { title: "Απάντηση", description: "Πρόταση στα μέτρα σας" }
      ],
      form: {
        personalInfo: {
          title: "Προσωπικές πληροφορίες",
          subtitle: "Εισαγάγετε τις βασικές σας πληροφορίες για να ξεκινήσετε την αίτησή σας",
          fields: {
            firstName: "Όνομα",
            lastName: "Επώνυμο",
            email: "Διεύθυνση email",
            emailConfirmation: "Επιβεβαίωση email",
            emailConfirmationPlaceholder: "Εισαγάγετε ξανά τη διεύθυνση email σας",
            phone: "Τηλέφωνο",
            birthDate: "Ημερομηνία γέννησης",
            nationality: "Εθνικότητα",
            nationalityPlaceholder: "Επιλέξτε την εθνικότητά σας",
            otherNationality: "Άλλη εθνικότητα",
            maritalStatus: "Οικογενειακή κατάσταση",
            maritalStatusPlaceholder: "Επιλέξτε την κατάστασή σας",
            dependents: "Αριθμός εξαρτώμενων ατόμων"
          },
          validation: {
            emailMismatch: "Οι διευθύνσεις email δεν ταιριάζουν",
            emailConfirmed: "Διευθύνσεις email επιβεβαιωμένες"
          },
          maritalStatusOptions: {
            single: "Ανύπαντρος/η",
            married: "Παντρεμένος/η",
            divorced: "Διαζευγμένος/η",
            widowed: "Χήρος/α",
            partnership: "Σύμφωνο συμβίωσης"
          }
        },
        professionalInfo: {
          title: "Επαγγελματική κατάσταση",
          subtitle: "Πληροφορίες για την επαγγελματική σας δραστηριότητα και τα εισοδήματά σας",
          fields: {
            employmentStatus: "Επαγγελματικό καθεστώς",
            employmentStatusPlaceholder: "Η επαγγελματική σας κατάσταση",
            profession: "Επάγγελμα",
            company: "Εταιρεία",
            position: "Θέση που κατέχετε",
            employer: "Εργοδότης",
            employmentDuration: "Προϋπηρεσία στην εργασία",
            workExperience: "Επαγγελματική εμπειρία",
            monthlyIncome: "Μηνιαία καθαρά εισοδήματα (€)",
            additionalIncome: "Άλλα μηνιαία εισοδήματα (€)"
          },
          employmentOptions: {
            employee: "Υπάλληλος",
            selfEmployed: "Αυτοαπασχολούμενος",
            business: "Επιχειρηματίας",
            manager: "Διευθυντής",
            retired: "Συνταξιούχος",
            student: "Φοιτητής",
            unemployed: "Άνεργος"
          }
        },
        financingRequest: {
          title: "Αίτηση χρηματοδότησης",
          subtitle: "Καθορίστε τις λεπτομέρειες του έργου χρηματοδότησής σας",
          fields: {
            loanType: "Τύπος δανείου",
            loanTypePlaceholder: "Επιλέξτε τον τύπο χρηματοδότησης",
            amount: "Επιθυμητό ποσό (€)",
            amountPlaceholder: "Ποσό σε ευρώ",
            duration: "Διάρκεια αποπληρωμής (μήνες)",
            durationPlaceholder: "Διάρκεια σε μήνες",
            purpose: "Αντικείμενο χρηματοδότησης",
            purposePlaceholder: "Περιγράψτε τη χρήση των κεφαλαίων",
            hasGuarantee: "Έχετε εγγύηση;",
            guaranteePlaceholder: "Επιλέξτε μια επιλογή"
          },
          loanOptions: {
            personal: "Προσωπικό δάνειο",
            auto: "Δάνειο αυτοκινήτου",
            realEstate: "Στεγαστικό δάνειο",
            professional: "Επιχειρηματική χρηματοδότηση",
            student: "Φοιτητικό δάνειο",
            consolidation: "Ενοποίηση δανείων"
          },
          guaranteeOptions: {
            yes: "Ναι",
            no: "Όχι",
            maybe: "Προς αξιολόγηση σύμφωνα με την προσφορά"
          }
        },
        validation: {
          title: "Επικύρωση και έγγραφα",
          subtitle: "Ολοκληρώστε την αίτησή σας",
          fields: {
            hasRequiredDocs: "Επιβεβαιώνω ότι έχω τα απαιτούμενα έγγραφα",
            acceptsTerms: "Αποδέχομαι τους όρους και προϋποθέσεις",
            acceptsMarketing: "Συμφωνώ να λαμβάνω εμπορικές πληροφορίες"
          },
          submitButton: "Αποστολή αίτησής μου",
          qualityCommitment: "Δέσμευση ποιότητας: Δεσμευόμαστε να επικοινωνήσουμε μαζί σας εντός 24ω για να μελετήσουμε την αίτησή σας και να σας προτείνουμε μια κατάλληλη λύση."
        }
      },
      sidebar: {
        documents: {
          title: "Απαιτούμενα έγγραφα",
          subtitle: "Προετοιμάστε αυτά τα έγγραφα για να επιταχύνετε την αίτησή σας",
          list: [
            "Έγκυρο έγγραφο ταυτότητας",
            "Αποδεικτικά εισοδήματος (3 τελευταίες αποδοχές)",
            "Τραπεζικά αντίγραφα (3 τελευταίους μήνες)",
            "Πρόσφατο αποδεικτικό διαμονής",
            "Προσύμφωνο αγοραπωλησίας (αν ακίνητο)"
          ]
        },
        help: {
          title: "Χρειάζεστε βοήθεια;",
          subtitle: "Οι ειδικοί μας είναι εδώ για να σας συνοδεύσουν",
          phone: "+30 210 123 4567",
          schedule: "Δευ-Παρ 8π-19μ"
        },
        security: {
          title: "Εγγυημένη ασφάλεια",
          features: [
            "Κρυπτογράφηση SSL 256 bit",
            "Συμμόρφωση GDPR",
            "Προστατευμένα δεδομένα"
          ]
        }
      }
    },
    contact: {
      hero: {
        title: "Επικοινωνήστε με τους",
        titleSpan: "Ειδικούς μας",
        subtitle: "Μια αφοσιωμένη ομάδα για να σας συνοδεύσει σε όλα τα χρηματοδοτικά σας έργα",
        stats: {
          responseTime: "Απάντηση σε 2ω",
          experts: "Διαθέσιμοι ειδικοί"
        }
      },
      methods: {
        title: "Μέσα επικοινωνίας",
        subtitle: "Επιλέξτε το κανάλι που σας ταιριάζει για να μιλήσετε με τους συμβούλους μας",
        phone: {
          title: "Τηλέφωνο",
          description: "Καλέστε μας για άμεση συμβουλή",
          value: "+30 210 123 4567",
          hours: "Δευ-Παρ 8π-19μ, Σαβ 9π-17μ"
        },
        email: {
          title: "Email",
          description: "Γράψτε μας, απαντάμε γρήγορα",
          value: "επικοινωνια@aurex-kpital.gr",
          hours: "Απάντηση σε 2ω κατά μέσο όρο"
        },
        address: {
          title: "Διεύθυνση",
          description: "Συναντήστε μας στα γραφεία μας",
          value: "Λεωφ. Βασιλίσσης Σοφίας 115, 115 21 Αθήνα",
          hours: "Μόνο με ραντεβού"
        }
      },
      form: {
        title: "Στείλτε μας ένα μήνυμα",
        fields: {
          name: "Όνομα και επώνυμο",
          email: "Διεύθυνση email",
          message: "Το μήνυμά σας"
        },
        submitButton: "Αποστολή μηνύματος",
        successMessage: "Ευχαριστούμε! Το μήνυμά σας στάλθηκε με επιτυχία. Θα απαντήσουμε γρήγορα.",
        commitment: "Δεσμευόμαστε να απαντήσουμε εντός 2 ωρών κατά τη διάρκεια των ωραρίων μας."
      }
    }
  }
};

export { translations };