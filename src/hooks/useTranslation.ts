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
    services: {
      hero: {
        title: "Solutions Financières",
        subtitle: "Nouvelle Génération"
      }
    }
  },
  de: {
    services: {
      hero: {
        title: "Finanzlösungen", 
        subtitle: "Neue Generation"
      }
    }
  }
};