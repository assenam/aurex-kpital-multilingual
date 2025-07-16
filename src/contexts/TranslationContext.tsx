import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';

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
  const [isLoading] = useState(false);

  const changeLanguage = useCallback((newLanguage: Language) => {
    if (newLanguage === language) return;
    
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  }, [language]);
  
  const t = useCallback((key: string): string => {
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
    contact: {
      title: "Contactez-nous",
      description: "Notre équipe vous accompagne dans vos projets financiers",
      form: {
        title: "Formulaire de contact",
        name: "Nom",
        email: "Email", 
        message: "Message",
        send: "Envoyer"
      },
      info: {
        phone: "Téléphone",
        email: "Email",
        address: "Adresse"
      }
    }
  },
  de: {
    contact: {
      title: "Kontaktieren Sie uns",
      description: "Unser Team begleitet Sie bei Ihren Finanzprojekten",
      form: {
        title: "Kontaktformular",
        name: "Name",
        email: "E-Mail", 
        message: "Nachricht",
        send: "Senden"
      },
      info: {
        phone: "Telefon",
        email: "E-Mail",
        address: "Adresse"
      }
    }
  },
  pl: {
    contact: {
      title: "Skontaktuj się z nami",
      description: "Nasz zespół wspiera Cię w projektach finansowych",
      form: {
        title: "Formularz kontaktowy",
        name: "Imię",
        email: "Email", 
        message: "Wiadomość",
        send: "Wyślij"
      },
      info: {
        phone: "Telefon",
        email: "Email",
        address: "Adres"
      }
    }
  },
  fi: {
    contact: {
      title: "Ota meihin yhteyttä",
      description: "Tiimimme tukee sinua rahoitusprojekteissasi",
      form: {
        title: "Yhteydenottolomake",
        name: "Nimi",
        email: "Sähköposti", 
        message: "Viesti",
        send: "Lähetä"
      },
      info: {
        phone: "Puhelin",
        email: "Sähköposti",
        address: "Osoite"
      }
    }
  },
  es: {
    contact: {
      title: "Contáctanos",
      description: "Nuestro equipo te acompaña en tus proyectos financieros",
      form: {
        title: "Formulario de contacto",
        name: "Nombre",
        email: "Email", 
        message: "Mensaje",
        send: "Enviar"
      },
      info: {
        phone: "Teléfono",
        email: "Email",
        address: "Dirección"
      }
    }
  },
  pt: {
    contact: {
      title: "Entre em contato",
      description: "Nossa equipe acompanha você em seus projetos financeiros",
      form: {
        title: "Formulário de contato",
        name: "Nome",
        email: "Email", 
        message: "Mensagem",
        send: "Enviar"
      },
      info: {
        phone: "Telefone",
        email: "Email",
        address: "Endereço"
      }
    }
  },
  el: {
    contact: {
      title: "Επικοινωνήστε μαζί μας",
      description: "Η ομάδα μας σας συνοδεύει στα οικονομικά σας έργα",
      form: {
        title: "Φόρμα επικοινωνίας",
        name: "Όνομα",
        email: "Email", 
        message: "Μήνυμα",
        send: "Αποστολή"
      },
      info: {
        phone: "Τηλέφωνο",
        email: "Email",
        address: "Διεύθυνση"
      }
    }
  },
  it: {
    contact: {
      title: "Contattaci",
      description: "Il nostro team ti accompagna nei tuoi progetti finanziari",
      form: {
        title: "Modulo di contatto",
        name: "Nome",
        email: "Email", 
        message: "Messaggio",
        send: "Invia"
      },
      info: {
        phone: "Telefono",
        email: "Email",
        address: "Indirizzo"
      }
    }
  }
};