import React, { createContext, useContext, useMemo } from 'react';

export type Language = 'fr' | 'de' | 'pl' | 'fi' | 'es' | 'pt' | 'el' | 'it';

type TranslationContextType = {
  language: Language;
  t: (key: string) => string;
};

const TranslationContext = createContext<TranslationContextType>({ 
  language: 'fr',
  t: (key: string) => key
});

export const TranslationProvider = ({ language, children }: { language?: string; children: React.ReactNode }) => {
  const lang = (language as Language) || 'fr'; // langue par défaut = fr

  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = translations[lang];
    
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
  };

  const value = useMemo(() => ({ language: lang, t }), [lang]);

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);

const translations = {
  fr: {
    menu: {
      home: "Accueil",
      services: "Services", 
      simulator: "Simulateur",
      request: "Demande",
      about: "À propos",
      contact: "Contact",
    },
    footer: {
      tools: "Outils",
      legal: "Légal",
      contact: "Contact",
      privacyPolicy: "Politique de confidentialité",
      terms: "Conditions générales",
      mentions: "Mentions légales",
      gdpr: "RGPD",
      rights: "© 2024 Aurex K-pital. Tous droits réservés.",
      description: "Votre partenaire financier de confiance depuis 1997. Excellence, innovation et expertise pour tous vos projets financiers en Europe.",
      services: "Services",
      copyright: "© 2024 Aurex K-pital. Tous droits réservés.",
      establishment: "Établissement financier agréé en Europe",
      links: {
        personalLoans: "Prêts personnels",
        proFinancing: "Financements pro",
        investments: "Investissements", 
        insurance: "Assurances",
        simulator: "Simulateur de prêt",
        request: "Demande de financement",
        contact: "Contact",
        about: "À propos",
        legal: "Mentions légales",
        privacy: "Politique de confidentialité",
        terms: "Conditions générales",
        gdpr: "Protection des données (RGPD)"
      }
    },
    home: {
      hero: {
        title: "Votre Partenaire Financier",
        subtitle: "depuis 1997",
        description: "Excellence, innovation et confiance pour tous vos projets financiers",
        ctaBtn: "Découvrir nos solutions",
        simulateBtn: "Simuler un prêt",
        scrollText: "Découvrir"
      }
    },
    contact: {
      hero: {
        badge: "Contact",
        title: "Parlons de votre projet",
        subtitle: "Nos experts financiers vous accompagnent personnellement",
        stats: {
          responseTime: { value: "24h", label: "Réponse garantie" },
          satisfaction: { value: "98%", label: "Satisfaction client" },
          experience: { value: "27 ans", label: "D'expérience" }
        }
      },
      info: {
        phone: "Téléphone",
        email: "Email",
        address: "Adresse",
        schedule: "Lundi - Vendredi : 8h00 - 19h00",
        phoneNumber: "+33 7 59 28 20 04",
        emailAddress: "contact@aurex-kpital.com",
        fullAddress: "123 Avenue des Champs-Élysées, 75008 Paris, France"
      },
      form: {
        title: "Envoyez-nous un message",
        subtitle: "Nous vous répondrons dans les plus brefs délais",
        name: "Nom complet",
        email: "Adresse email",
        message: "Votre message",
        submit: "Envoyer le message",
        commitment: "Nous nous engageons à vous répondre sous 24h"
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
    },
    footer: {
      tools: "Werkzeuge",
      legal: "Rechtliches",
      contact: "Kontakt",
      privacyPolicy: "Datenschutzerklärung",
      terms: "Allgemeine Geschäftsbedingungen",
      mentions: "Impressum",
      gdpr: "DSGVO",
      rights: "© 2024 Aurex K-pital. Alle Rechte vorbehalten.",
      description: "Ihr vertrauensvoller Finanzpartner seit 1997. Exzellenz, Innovation und Expertise für alle Ihre Finanzprojekte in Europa.",
      services: "Dienstleistungen",
      copyright: "© 2024 Aurex K-pital. Alle Rechte vorbehalten.",
      establishment: "Zugelassenes Finanzinstitut in Europa"
    },
    home: {
      hero: {
        title: "Ihr Finanzpartner",
        subtitle: "seit 1997",
        description: "Exzellenz, Innovation und Vertrauen für alle Ihre Finanzprojekte",
        ctaBtn: "Unsere Lösungen entdecken",
        simulateBtn: "Kredit simulieren",
        scrollText: "Entdecken"
      }
    },
    contact: {
      hero: {
        badge: "Kontakt",
        title: "Sprechen wir über Ihr Projekt",
        subtitle: "Unsere Finanzexperten begleiten Sie persönlich",
        stats: {
          responseTime: { value: "24h", label: "Garantierte Antwort" },
          satisfaction: { value: "98%", label: "Kundenzufriedenheit" },
          experience: { value: "27 Jahre", label: "Erfahrung" }
        }
      },
      info: {
        phone: "Telefon",
        email: "E-Mail",
        address: "Adresse",
        schedule: "Montag - Freitag: 8:00 - 19:00",
        phoneNumber: "+33 7 59 28 20 04",
        emailAddress: "contact@aurex-kpital.com",
        fullAddress: "123 Avenue des Champs-Élysées, 75008 Paris, Frankreich"
      },
      form: {
        title: "Senden Sie uns eine Nachricht",
        subtitle: "Wir antworten Ihnen schnellstmöglich",
        name: "Vollständiger Name",
        email: "E-Mail-Adresse",
        message: "Ihre Nachricht",
        submit: "Nachricht senden",
        commitment: "Wir verpflichten uns, Ihnen innerhalb von 24 Stunden zu antworten"
      }
    }
  }
};