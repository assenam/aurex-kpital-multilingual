import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract language from URL path (e.g., /fr/services -> fr)
  const getLanguageFromPath = useCallback(() => {
    const pathLang = location.pathname.split('/')[1] as Language;
    const validLanguages: Language[] = ['fr', 'de', 'pl', 'fi', 'es', 'pt', 'el', 'it'];
    return validLanguages.includes(pathLang) ? pathLang : 'fr';
  }, [location.pathname]);

  const [language, setLanguage] = useState<Language>(() => {
    // Priority: URL > localStorage > default 'fr'
    const urlLang = getLanguageFromPath();
    if (urlLang !== 'fr') return urlLang;
    return (localStorage.getItem('preferredLanguage') as Language) || 'fr';
  });
  const [isLoading] = useState(false);

  const changeLanguage = useCallback((newLanguage: Language) => {
    if (newLanguage === language) return;
    
    // Update URL to include the new language
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    // If current path has language prefix, replace it
    const validLanguages: Language[] = ['fr', 'de', 'pl', 'fi', 'es', 'pt', 'el', 'it'];
    if (pathSegments.length > 0 && validLanguages.includes(pathSegments[0] as Language)) {
      pathSegments[0] = newLanguage;
    } else {
      // If no language prefix, add it
      pathSegments.unshift(newLanguage);
    }
    
    const newPath = '/' + pathSegments.join('/');
    
    // Use requestAnimationFrame to ensure smooth transition
    requestAnimationFrame(() => {
      setLanguage(newLanguage);
      localStorage.setItem('preferredLanguage', newLanguage);
      navigate(newPath);
    });
  }, [language, location.pathname, navigate]);
  
  const t = useCallback((key: string): string => {
    // Direct translation
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
      contact: "Contact"
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
        scrollText: "Découvrir",
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
        }
      },
      services: {
        badge: "Services",
        title: "Solutions",
        subtitle: "Innovantes",
        description: "Découvrez nos solutions financières",
        description2: "révolutionnaires",
        description3: "pour vos projets"
      },
      about: {
        badge: "À propos",
        title: "Votre partenaire",
        subtitle: "financier",
        subtitle2: "de confiance",
        description1: {
          highlight: "Depuis 1997,",
          text: " Aurex K-pital accompagne particuliers et entreprises dans leurs projets financiers avec une approche alliant",
          expertise: "expertise humaine",
          and: "et",
          technology: "innovation technologique"
        },
        description2: {
          text: "Notre mission : démocratiser l'accès au financement grâce à des solutions",
          highlight: "rapides, transparentes et sur-mesure",
          success: "pour concrétiser vos ambitions"
        },
        stats: {
          founded: "Année de création",
          location: "Siège social",
          certified: "Registre",
          security: "Safe-Nummer"
        },
        trust: {
          title: "Votre confiance, notre priorité",
          description: "Certifiés et régulés par les autorités européennes"
        },
        buttons: {
          history: "Notre histoire",
          contact: "Nous contacter"
        }
      },
      cta: {
        title: "Prêt à transformer",
        titleHighlight: "vos projets",
        titleEnd: "en réalité ?",
        description: "Nos experts vous accompagnent à chaque étape pour concrétiser vos ambitions financières.",
        buttons: {
          request: "Faire une demande",
          simulate: "Simuler un prêt",
          contact: "Nous contacter"
        },
        contact: {
          phone: "Téléphone",
          address: "Adresse"
        }
      }
    },
    contact: {
      hero: {
        title: "Contactez",
        titleSpan: "nos experts",
        subtitle: "Nos conseillers sont à votre disposition pour répondre à toutes vos questions",
        stats: {
          responseTime: "Réponse sous 24h",
          experts: "Conseillers experts"
        }
      },
      methods: {
        title: "Nos moyens de contact",
        subtitle: "Choisissez le canal qui vous convient le mieux",
        phone: {
          title: "Téléphone",
          description: "Appelez-nous directement",
          value: "+33759282004",
          hours: "Lun-Ven 8h-19h"
        },
        email: {
          title: "Email",
          description: "Écrivez-nous",
          value: "contact@aurex-kpital.com",
          hours: "Réponse sous 24h"
        },
        address: {
          title: "Adresse",
          description: "Venez nous rencontrer",
          value: "Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne",
          hours: "Sur rendez-vous"
        }
      },
      form: {
        title: "Envoyez-nous un message",
        fields: {
          name: "Nom complet",
          email: "Adresse email", 
          message: "Votre message"
        },
        submitButton: "Envoyer le message",
        successMessage: "Votre message a été envoyé avec succès !",
        commitment: "Nous nous engageons à vous répondre sous 24h maximum."
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
      contact: "Contacto"
    },
    footer: {
      tools: "Herramientas",
      legal: "Legal",
      contact: "Contacto",
      privacyPolicy: "Política de privacidad",
      terms: "Términos generales",
      mentions: "Aviso legal",
      gdpr: "RGPD",
      rights: "© 2024 Aurex K-pital. Todos los derechos reservados.",
      description: "Su socio financiero de confianza desde 1997. Excelencia, innovación y experiencia para todos sus proyectos financieros en Europa.",
      services: "Servicios",
      copyright: "© 2024 Aurex K-pital. Todos los derechos reservados.",
      establishment: "Establecimiento financiero autorizado en Europa"
    },
    home: {
      hero: {
        title: "Su Socio Financiero",
        subtitle: "desde 1997",
        description: "Excelencia, innovación y confianza para todos sus proyectos financieros",
        ctaBtn: "Descubrir nuestras soluciones",
        simulateBtn: "Simular un préstamo"
      },
      services: {
        badge: "Servicios",
        title: "Soluciones",
        subtitle: "Innovadoras",
        description: "Descubra nuestras soluciones financieras",
        description2: "revolucionarias",
        description3: "para sus proyectos"
      },
      about: {
        badge: "Acerca de",
        title: "Su socio",
        subtitle: "financiero",
        subtitle2: "de confianza"
      },
      cta: {
        title: "¿Listo para transformar",
        titleHighlight: "sus proyectos",
        titleEnd: "en realidad?",
        description: "Nuestros expertos le acompañan en cada paso para hacer realidad sus ambiciones financieras."
      }
    },
    contact: {
      hero: {
        title: "Contacte",
        titleSpan: "nuestros expertos",
        subtitle: "Nuestros asesores están a su disposición para responder a todas sus preguntas"
      },
      methods: {
        title: "Nuestros medios de contacto",
        subtitle: "Elija el canal que más le convenga"
      },
      form: {
        title: "Envíenos un mensaje",
        fields: {
          name: "Nombre completo",
          email: "Dirección de correo electrónico",
          message: "Su mensaje"
        },
        submitButton: "Enviar mensaje",
        successMessage: "¡Su mensaje ha sido enviado con éxito!"
      }
    }
  }
};

export default translations;