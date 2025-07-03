import { useState } from 'react';

export type Language = 'fr' | 'de' | 'pl' | 'fi' | 'es' | 'pt' | 'el' | 'it';

export const useTranslationLogic = () => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('preferredLanguage') as Language) || 'fr';
  });
  
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

  return { language, setLanguage, t };
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
    home: {
      hero: {
        title: "Votre Partenaire Financier",
        subtitle: "depuis 1997",
        description: "Excellence, innovation et confiance pour tous vos projets financiers",
        ctaBtn: "Découvrir nos solutions",
        simulateBtn: "Simuler un prêt"
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
    home: {
      hero: {
        title: "Ihr Finanzpartner",
        subtitle: "seit 1997",
        description: "Exzellenz, Innovation und Vertrauen für all Ihre Finanzprojekte",
        ctaBtn: "Unsere Lösungen entdecken",
        simulateBtn: "Kredit simulieren"
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
  }
};