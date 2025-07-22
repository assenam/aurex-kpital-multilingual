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
    request: {
      form: {
        financingRequest: {
          title: "Demande de financement",
          subtitle: "Remplissez les informations suivantes pour obtenir une offre personnalisée",
          fields: {
            loanType: "Type de prêt",
            loanTypePlaceholder: "Sélectionnez un type",
            amount: "Montant du prêt (€)",
            amountPlaceholder: "Montant en euros",
            duration: "Durée du prêt (mois)",
            durationPlaceholder: "Ex: 60",
            hasGuarantee: "Garantie disponible",
            guaranteePlaceholder: "Ex : bien immobilier, véhicule",
            purpose: "Motif du prêt",
            purposePlaceholder: "Indiquez le but de votre demande"
          },
          loanOptions: {
            personal: "Prêt personnel",
            auto: "Prêt automobile",
            real_estate: "Prêt immobilier",
            professional: "Prêt professionnel",
            student: "Prêt étudiant",
            debt_consolidation: "Rachat de crédit"
          },
          guaranteeOptions: {
            yes: "Oui",
            no: "Non",
            maybe: "À déterminer"
          }
        }
      }
    }
  },
  de: {
    request: {
      form: {
        financingRequest: {
          title: "Finanzierungsantrag",
          subtitle: "Füllen Sie die folgenden Informationen aus, um ein personalisiertes Angebot zu erhalten",
          fields: {
            loanType: "Art des Darlehens",
            loanTypePlaceholder: "Wählen Sie einen Typ",
            amount: "Darlehensbetrag (€)",
            amountPlaceholder: "Betrag in Euro",
            duration: "Laufzeit des Darlehens (Monate)",
            durationPlaceholder: "z.B.: 60",
            hasGuarantee: "Sicherheit verfügbar",
            guaranteePlaceholder: "z.B.: Immobilie, Fahrzeug",
            purpose: "Zweck des Darlehens",
            purposePlaceholder: "Geben Sie den Zweck Ihres Antrags an"
          },
          loanOptions: {
            personal: "Privatkredit",
            auto: "Autokredit",
            real_estate: "Immobilienkredit",
            professional: "Geschäftskredit",
            student: "Studentenkredit",
            debt_consolidation: "Umschuldung"
          },
          guaranteeOptions: {
            yes: "Ja",
            no: "Nein",
            maybe: "Zu bestimmen"
          }
        }
      }
    }
  },
  pl: {
    request: {
      form: {
        financingRequest: {
          title: "Wniosek o finansowanie",
          subtitle: "Wypełnij poniższe informacje, aby otrzymać spersonalizowaną ofertę",
          fields: {
            loanType: "Rodzaj kredytu",
            loanTypePlaceholder: "Wybierz typ",
            amount: "Kwota kredytu (€)",
            amountPlaceholder: "Kwota w euro",
            duration: "Okres kredytowania (miesiące)",
            durationPlaceholder: "np.: 60",
            hasGuarantee: "Dostępne zabezpieczenie",
            guaranteePlaceholder: "np.: nieruchomość, pojazd",
            purpose: "Cel kredytu",
            purposePlaceholder: "Wskaż cel swojego wniosku"
          },
          loanOptions: {
            personal: "Kredyt osobisty",
            auto: "Kredyt samochodowy",
            real_estate: "Kredyt hipoteczny",
            professional: "Kredyt biznesowy",
            student: "Kredyt studencki",
            debt_consolidation: "Konsolidacja długów"
          },
          guaranteeOptions: {
            yes: "Tak",
            no: "Nie",
            maybe: "Do ustalenia"
          }
        }
      }
    }
  },
  fi: {
    request: {
      form: {
        financingRequest: {
          title: "Rahoitushakemus",
          subtitle: "Täytä seuraavat tiedot saadaksesi henkilökohtaisen tarjouksen",
          fields: {
            loanType: "Lainatyyppi",
            loanTypePlaceholder: "Valitse tyyppi",
            amount: "Lainan määrä (€)",
            amountPlaceholder: "Summa euroina",
            duration: "Laina-aika (kuukautta)",
            durationPlaceholder: "esim.: 60",
            hasGuarantee: "Vakuus saatavilla",
            guaranteePlaceholder: "esim.: kiinteistö, ajoneuvo",
            purpose: "Lainan tarkoitus",
            purposePlaceholder: "Ilmoita hakemuksesi tarkoitus"
          },
          loanOptions: {
            personal: "Henkilökohtainen laina",
            auto: "Autolaina",
            real_estate: "Asuntolaina",
            professional: "Yrityslaina",
            student: "Opintolaina",
            debt_consolidation: "Velkojen yhdistäminen"
          },
          guaranteeOptions: {
            yes: "Kyllä",
            no: "Ei",
            maybe: "Määriteltävä"
          }
        }
      }
    }
  },
  es: {
    request: {
      form: {
        financingRequest: {
          title: "Solicitud de financiación",
          subtitle: "Complete la siguiente información para obtener una oferta personalizada",
          fields: {
            loanType: "Tipo de préstamo",
            loanTypePlaceholder: "Seleccione un tipo",
            amount: "Importe del préstamo (€)",
            amountPlaceholder: "Importe en euros",
            duration: "Duración del préstamo (meses)",
            durationPlaceholder: "ej.: 60",
            hasGuarantee: "Garantía disponible",
            guaranteePlaceholder: "ej.: inmueble, vehículo",
            purpose: "Motivo del préstamo",
            purposePlaceholder: "Indique el propósito de su solicitud"
          },
          loanOptions: {
            personal: "Préstamo personal",
            auto: "Préstamo de automóvil",
            real_estate: "Préstamo hipotecario",
            professional: "Préstamo profesional",
            student: "Préstamo estudiantil",
            debt_consolidation: "Reunificación de deudas"
          },
          guaranteeOptions: {
            yes: "Sí",
            no: "No",
            maybe: "Por determinar"
          }
        }
      }
    }
  },
  pt: {
    request: {
      form: {
        financingRequest: {
          title: "Pedido de financiamento",
          subtitle: "Preencha as seguintes informações para obter uma oferta personalizada",
          fields: {
            loanType: "Tipo de empréstimo",
            loanTypePlaceholder: "Selecione um tipo",
            amount: "Montante do empréstimo (€)",
            amountPlaceholder: "Montante em euros",
            duration: "Duração do empréstimo (meses)",
            durationPlaceholder: "ex.: 60",
            hasGuarantee: "Garantia disponível",
            guaranteePlaceholder: "ex.: imóvel, veículo",
            purpose: "Motivo do empréstimo",
            purposePlaceholder: "Indique o objetivo do seu pedido"
          },
          loanOptions: {
            personal: "Empréstimo pessoal",
            auto: "Empréstimo automóvel",
            real_estate: "Empréstimo imobiliário",
            professional: "Empréstimo profissional",
            student: "Empréstimo estudantil",
            debt_consolidation: "Consolidação de dívidas"
          },
          guaranteeOptions: {
            yes: "Sim",
            no: "Não",
            maybe: "A determinar"
          }
        }
      }
    }
  },
  el: {
    request: {
      form: {
        financingRequest: {
          title: "Αίτηση χρηματοδότησης",
          subtitle: "Συμπληρώστε τις παρακάτω πληροφορίες για να λάβετε μια εξατομικευμένη προσφορά",
          fields: {
            loanType: "Τύπος δανείου",
            loanTypePlaceholder: "Επιλέξτε έναν τύπο",
            amount: "Ποσό δανείου (€)",
            amountPlaceholder: "Ποσό σε ευρώ",
            duration: "Διάρκεια δανείου (μήνες)",
            durationPlaceholder: "π.χ.: 60",
            hasGuarantee: "Διαθέσιμη εγγύηση",
            guaranteePlaceholder: "π.χ.: ακίνητο, όχημα",
            purpose: "Λόγος δανείου",
            purposePlaceholder: "Καθορίστε τον σκοπό της αίτησής σας"
          },
          loanOptions: {
            personal: "Προσωπικό δάνειο",
            auto: "Δάνειο αυτοκινήτου",
            real_estate: "Στεγαστικό δάνειο",
            professional: "Επαγγελματικό δάνειο",
            student: "Φοιτητικό δάνειο",
            debt_consolidation: "Ενοποίηση χρεών"
          },
          guaranteeOptions: {
            yes: "Ναι",
            no: "Όχι",
            maybe: "Προς καθορισμό"
          }
        }
      }
    }
  },
  it: {
    request: {
      form: {
        financingRequest: {
          title: "Richiesta di finanziamento",
          subtitle: "Compila le seguenti informazioni per ottenere un'offerta personalizzata",
          fields: {
            loanType: "Tipo di prestito",
            loanTypePlaceholder: "Seleziona un tipo",
            amount: "Importo del prestito (€)",
            amountPlaceholder: "Importo in euro",
            duration: "Durata del prestito (mesi)",
            durationPlaceholder: "es.: 60",
            hasGuarantee: "Garanzia disponibile",
            guaranteePlaceholder: "es.: immobile, veicolo",
            purpose: "Motivo del prestito",
            purposePlaceholder: "Indica lo scopo della tua richiesta"
          },
          loanOptions: {
            personal: "Prestito personale",
            auto: "Prestito auto",
            real_estate: "Mutuo immobiliare",
            professional: "Prestito professionale",
            student: "Prestito studenti",
            debt_consolidation: "Consolidamento debiti"
          },
          guaranteeOptions: {
            yes: "Sì",
            no: "No",
            maybe: "Da determinare"
          }
        }
      }
    }
  }
};

export default translations;