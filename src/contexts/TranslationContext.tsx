import React, { createContext, useContext, useState } from 'react';

export type Language = 'fr' | 'en' | 'es' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ar' | 'hi' | 'nl' | 'sv' | 'da' | 'no' | 'fi' | 'pl' | 'cs' | 'hu' | 'ro' | 'bg' | 'hr' | 'sk' | 'sl' | 'et' | 'lv' | 'lt' | 'mt' | 'el' | 'tr';

interface TranslationContextType {
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
  translate: (key: string, params?: Record<string, string | number>) => string;
  t: (key: string, params?: Record<string, string | number>) => string;
  language: Language;
  changeLanguage: (language: Language) => void;
  isLoading?: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  fr: {
    nav: {
      home: "Accueil",
      services: "Services",
      partners: "Partenaires",
      faq: "FAQ",
      careers: "Carrières",
      contact: "Contact",
      legal: "Mentions légales",
      simulator: "Simulateur",
      request: "Demande"
    },
    hero: {
      title: "Votre partenaire en assurance",
      subtitle: "Nous vous accompagnons dans tous vos projets d'assurance avec expertise et proximité",
      cta: "Découvrir nos services",
      ctaSecondary: "Nous contacter"
    },
    about: {
      title: "À propos de nous",
      description: "Découvrez notre engagement envers l'excellence et notre approche personnalisée de l'assurance.",
      learnMore: "En savoir plus",
      experience: "ans d'expérience",
      clients: "clients satisfaits",
      coverage: "de couverture"
    },
    services: {
      title: "Nos services",
      subtitle: "Des solutions d'assurance adaptées à vos besoins",
      auto: {
        title: "Assurance Auto",
        description: "Protection complète pour votre véhicule"
      },
      home: {
        title: "Assurance Habitation",
        description: "Sécurisez votre foyer et vos biens"
      },
      life: {
        title: "Assurance Vie",
        description: "Préparez l'avenir de vos proches"
      }
    },
    testimonials: {
      title: "Témoignages clients",
      subtitle: "Découvrez l'expérience de nos clients"
    },
    cta: {
      title: "Prêt à commencer ?",
      subtitle: "Contactez-nous dès aujourd'hui pour une consultation gratuite",
      button: "Obtenir un devis"
    },
    footer: {
      description: "Votre partenaire de confiance en assurance depuis plus de 20 ans.",
      services: "Services",
      company: "Entreprise",
      contact: "Contact",
      rights: "Tous droits réservés.",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation"
    },
    contact: {
      hero: {
        title: "Contactez-nous",
        subtitle: "Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions"
      },
      methods: {
        phone: {
          title: "Par téléphone",
          description: "Appelez-nous du lundi au vendredi",
          hours: "de 8h à 18h"
        },
        email: {
          title: "Par email",
          description: "Écrivez-nous à tout moment",
          address: "contact@assurance-pro.fr"
        },
        office: {
          title: "À notre bureau",
          description: "Rencontrez-nous en personne",
          address: "123 Avenue de la République<br>75011 Paris"
        }
      },
      form: {
        title: "Envoyez-nous un message",
        firstName: "Prénom",
        lastName: "Nom",
        email: "Email",
        phone: "Téléphone",
        subject: "Sujet",
        message: "Message",
        department: "Département",
        departments: {
          general: "Renseignements généraux",
          claims: "Sinistres",
          sales: "Ventes",
          support: "Support technique"
        },
        submit: "Envoyer le message",
        sending: "Envoi en cours...",
        success: "Message envoyé avec succès !",
        error: "Erreur lors de l'envoi du message"
      },
      hours: {
        title: "Horaires d'ouverture",
        weekdays: "Lundi - Vendredi: 8h00 - 18h00",
        saturday: "Samedi: 9h00 - 12h00",
        sunday: "Dimanche: Fermé"
      },
      certifications: {
        title: "Nos certifications",
        iso: "Certifié ISO 9001",
        ffa: "Membre de la FFA",
        orias: "Enregistré ORIAS"
      }
    }
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      partners: "Partners",
      faq: "FAQ",
      careers: "Careers",
      contact: "Contact",
      legal: "Legal",
      simulator: "Simulator",
      request: "Request"
    },
    hero: {
      title: "Your insurance partner",
      subtitle: "We support you in all your insurance projects with expertise and proximity",
      cta: "Discover our services",
      ctaSecondary: "Contact us"
    },
    about: {
      title: "About us",
      description: "Discover our commitment to excellence and our personalized approach to insurance.",
      learnMore: "Learn more",
      experience: "years of experience",
      clients: "satisfied clients",
      coverage: "coverage"
    },
    services: {
      title: "Our services",
      subtitle: "Insurance solutions tailored to your needs",
      auto: {
        title: "Car Insurance",
        description: "Complete protection for your vehicle"
      },
      home: {
        title: "Home Insurance",
        description: "Secure your home and belongings"
      },
      life: {
        title: "Life Insurance",
        description: "Prepare the future of your loved ones"
      }
    },
    testimonials: {
      title: "Customer testimonials",
      subtitle: "Discover our customers' experience"
    },
    cta: {
      title: "Ready to get started?",
      subtitle: "Contact us today for a free consultation",
      button: "Get a quote"
    },
    footer: {
      description: "Your trusted insurance partner for over 20 years.",
      services: "Services",
      company: "Company",
      contact: "Contact",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Use"
    },
    contact: {
      hero: {
        title: "Contact us",
        subtitle: "Our team of experts is available to answer all your questions"
      },
      methods: {
        phone: {
          title: "By phone",
          description: "Call us Monday to Friday",
          hours: "from 8am to 6pm"
        },
        email: {
          title: "By email",
          description: "Write to us anytime",
          address: "contact@assurance-pro.fr"
        },
        office: {
          title: "At our office",
          description: "Meet us in person",
          address: "123 Avenue de la République<br>75011 Paris"
        }
      },
      form: {
        title: "Send us a message",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone: "Phone",
        subject: "Subject",
        message: "Message",
        department: "Department",
        departments: {
          general: "General inquiries",
          claims: "Claims",
          sales: "Sales",
          support: "Technical support"
        },
        submit: "Send message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "Error sending message"
      },
      hours: {
        title: "Opening hours",
        weekdays: "Monday - Friday: 8:00 AM - 6:00 PM",
        saturday: "Saturday: 9:00 AM - 12:00 PM",
        sunday: "Sunday: Closed"
      },
      certifications: {
        title: "Our certifications",
        iso: "ISO 9001 Certified",
        ffa: "FFA Member",
        orias: "ORIAS Registered"
      }
    }
  }
};

const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fr');

  const translate = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }
    
    if (params) {
      return Object.entries(params).reduce(
        (text, [paramKey, paramValue]) => 
          text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue)),
        value
      );
    }
    
    return value;
  };

  return (
    <TranslationContext.Provider value={{ 
      currentLanguage, 
      setCurrentLanguage, 
      translate,
      t: translate,
      language: currentLanguage,
      changeLanguage: setCurrentLanguage,
      isLoading: false
    }}>
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

export { TranslationProvider };
export default TranslationContext;