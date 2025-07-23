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
            otherNationalityPlaceholder: "Précisez votre nationalité",
            maritalStatus: "Situation familiale",
            maritalStatusPlaceholder: "Sélectionnez votre situation",
            dependents: "Nombre de personnes à charge"
          },
          validation: {
            emailMismatch: "Les adresses email ne correspondent pas",
            emailConfirmed: "Adresses email confirmées"
          },
          maritalOptions: {
            single: "Célibataire",
            married: "Marié(e)",
            divorced: "Divorcé(e)",
            widowed: "Veuf/Veuve",
            partnership: "Union libre"
          },
          nationalityGroups: {
            europe: "Europe",
            northAmerica: "Amérique du Nord",
            centralAmerica: "Amérique Centrale",
            southAmerica: "Amérique du Sud",
            other: "Autre"
          },
          nationalities: {
            german: "Allemande",
            austrian: "Autrichienne",
            belgian: "Belge",
            bulgarian: "Bulgare",
            cypriot: "Chypriote",
            croatian: "Croate",
            danish: "Danoise",
            spanish: "Espagnole",
            estonian: "Estonienne",
            finnish: "Finlandaise",
            french: "Française",
            greek: "Grecque",
            hungarian: "Hongroise",
            irish: "Irlandaise",
            italian: "Italienne",
            latvian: "Lettone",
            lithuanian: "Lituanienne",
            luxembourgish: "Luxembourgeoise",
            maltese: "Maltaise",
            dutch: "Néerlandaise",
            polish: "Polonaise",
            portuguese: "Portugaise",
            romanian: "Roumaine",
            slovak: "Slovaque",
            slovenian: "Slovène",
            swedish: "Suédoise",
            czech: "Tchèque",
            british: "Britannique",
            swiss: "Suisse",
            norwegian: "Norvégienne",
            icelandic: "Islandaise",
            serbian: "Serbe",
            montenegrin: "Monténégrine",
            bosnian: "Bosniaque",
            albanian: "Albanaise",
            macedonian: "Macédonienne",
            moldovan: "Moldave",
            ukrainian: "Ukrainienne",
            belarusian: "Biélorusse",
            russian: "Russe",
            american: "Américaine (États-Unis)",
            canadian: "Canadienne",
            mexican: "Mexicaine",
            guatemalan: "Guatémaltèque",
            belizean: "Bélizienne",
            salvadoran: "Salvadorienne",
            honduran: "Hondurienne",
            nicaraguan: "Nicaraguayenne",
            costarican: "Costaricaine",
            panamanian: "Panaméenne",
            argentine: "Argentine",
            bolivian: "Bolivienne",
            brazilian: "Brésilienne",
            chilean: "Chilienne",
            colombian: "Colombienne",
            ecuadorian: "Équatorienne",
            guyanese: "Guyanienne",
            paraguayan: "Paraguayenne",
            peruvian: "Péruvienne",
            surinamese: "Surinamaise",
            uruguayan: "Uruguayenne",
            venezuelan: "Vénézuélienne",
            other: "Autre nationalité"
          }
        },
        professionalInfo: {
          title: "Situation professionnelle",
          subtitle: "Informations sur votre activité professionnelle et vos revenus",
          fields: {
            employmentStatus: "Statut professionnel",
            employmentStatusPlaceholder: "Votre situation professionnelle",
            profession: "Profession",
            employer: "Employeur",
            employmentDuration: "Ancienneté dans l'emploi",
            monthlyIncome: "Revenus mensuels nets (€)",
            monthlyIncomePlaceholder: "Montant en euros",
            additionalIncome: "Autres revenus mensuels (€)",
            additionalIncomePlaceholder: "Montant en euros",
            company: "Nom de l'entreprise",
            companyPlaceholder: "Nom de l'entreprise",
            position: "Poste occupé",
            positionPlaceholder: "Votre poste",
            workExperience: "Expérience professionnelle (années)",
            workExperiencePlaceholder: "Nombre d'années"
          },
          employmentOptions: {
            employee: "Salarié(e)",
            selfEmployed: "Travailleur indépendant",
            business: "Chef d'entreprise",
            retired: "Retraité(e)",
            student: "Étudiant(e)",
            unemployed: "Sans emploi"
          }
        },
        loanRequest: {
          title: "Demande de financement",
          subtitle: "Précisez les détails de votre projet de financement",
          fields: {
            loanType: "Type de prêt",
            loanTypePlaceholder: "Choisissez le type de financement",
            amount: "Montant souhaité (€)",
            duration: "Durée de remboursement (mois)",
            purpose: "Objet du financement",
            hasGuarantee: "Avez-vous une garantie ?"
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
        financingRequest: {
          title: "Demande de financement",
          subtitle: "Remplissez les informations suivantes pour obtenir une offre personnalisée",
          fields: {
            loanType: "Type de prêt",
            loanTypePlaceholder: "Sélectionnez un type",
            amount: "Montant du prêt (€)",
            duration: "Durée du prêt (mois)",
            hasGuarantee: "Garantie disponible",
            guaranteePlaceholder: "Ex : bien immobilier, véhicule",
            purpose: "Motif du prêt",
            purposePlaceholder: "Indiquez le but de votre demande",
            amountPlaceholder: "Montant en euros",
            durationPlaceholder: "Ex: 60"
          },
          loanOptions: {
            personal: "Prêt personnel",
            auto: "Prêt automobile",
            realEstate: "Prêt immobilier",
            professional: "Prêt professionnel",
            student: "Prêt étudiant",
            consolidation: "Rachat de crédit"
          },
          guaranteeOptions: {
            yes: "Oui",
            no: "Non",
            maybe: "À déterminer"
          }
        },
        validation: {
          title: "Validation et documents",
          fields: {
            hasRequiredDocs: "Je certifie disposer des documents requis et pouvoir les fournir sur demande",
            acceptsTerms: "J'accepte les conditions générales et la politique de confidentialité *",
            acceptsMarketing: "J'accepte de recevoir des offres commerciales personnalisées"
          },
          submitButton: "Envoyer ma demande",
          qualityCommitment: "Engagement qualité : Nous nous engageons à vous contacter sous 24h pour étudier votre demande et vous proposer une solution adaptée.",
          emailMismatchAlert: "Les adresses email ne correspondent pas. Veuillez vérifier.",
          successAlert: "Votre demande a été envoyée avec succès ! Nous vous contacterons sous 24h."
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
          phone: "+33759282004",
          schedule: "Lun-Ven 8h-19h",
          contactButton: "Nous contacter"
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
          address: "Adresse",
          addressValue: "123 Avenue des Champs-Élysées, 75008 Paris"
        }
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
    },
    services: {
      hero: {
        badge: "Services",
        title: "Solutions financières",
        titleHighlight: "sur-mesure",
        subtitle: "Découvrez nos expertises et trouvez la solution adaptée à vos besoins",
        stats: {
          solutions: { value: "50+", label: "Solutions disponibles" },
          approval: { value: "95%", label: "Taux d'approbation" },
          response: { value: "24h", label: "Réponse garantie" }
        }
      },
      categories: {
        personal: {
          title: "Prêts Personnels",
          description: "Solutions de financement pour vos projets personnels",
          features: [
            "Prêt personnel classique",
            "Crédit renouvelable",
            "Prêt travaux",
            "Financement véhicule"
          ]
        },
        professional: {
          title: "Financement Professionnel",
          description: "Accompagnement des entreprises et professionnels",
          features: [
            "Crédit professionnel",
            "Financement équipement",
            "Trésorerie entreprise",
            "Crédit-bail"
          ]
        },
        investment: {
          title: "Investissement",
          description: "Solutions d'investissement et de placement",
          features: [
            "Investissement immobilier",
            "Placement financier",
            "Assurance-vie",
            "Plan épargne"
          ]
        },
        insurance: {
          title: "Assurances",
          description: "Protection et sécurisation de vos biens",
          features: [
            "Assurance emprunteur",
            "Assurance habitation",
            "Assurance auto",
            "Assurance santé"
          ]
        }
      },
      cta: {
        title: "Besoin d'une solution personnalisée ?",
        description: "Nos conseillers étudient votre dossier et vous proposent la meilleure solution",
        button: "Demander un devis"
      }
    },
    simulator: {
      hero: {
        badge: "Simulateur",
        title: "Simulez votre prêt",
        titleHighlight: "en temps réel",
        subtitle: "Obtenez une estimation personnalisée en quelques clics"
      },
      form: {
        amount: "Montant souhaité (€)",
        duration: "Durée (mois)",
        calculate: "Calculer",
        results: {
          monthlyPayment: "Mensualité",
          totalAmount: "Montant total",
          interestRate: "Taux d'intérêt"
        }
      }
    }
  },
  de: {
    request: {
      hero: {
        badge: "Finanzierungsantrag",
        title: "Ihr Projekt verdient",
        titleHighlight: "die beste Finanzierung",
        subtitle: "Erhalten Sie eine personalisierte Antwort in 24h dank unserer fortschrittlichen KI und dem Fachwissen unserer Berater",
        stats: {
          responseTime: { value: "24h", label: "Garantierte Antwort" },
          security: { value: "100%", label: "DSGVO-sicher" },
          expert: { value: "24/7", label: "Expertenunterstützung" }
        }
      }
    },
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
      establishment: "Zugelassenes Finanzinstitut in Europa",
      links: {
        personalLoans: "Privatkredite",
        proFinancing: "Unternehmensfinanzierung",
        investments: "Investitionen",
        insurance: "Versicherungen",
        simulator: "Kreditsimulator",
        request: "Finanzierungsantrag",
        contact: "Kontakt",
        about: "Über uns",
        legal: "Impressum",
        privacy: "Datenschutzerklärung",
        terms: "Allgemeine Geschäftsbedingungen",
        gdpr: "Datenschutz (DSGVO)"
      }
    },
    home: {
      hero: {
        title: "Ihr Finanzpartner",
        subtitle: "seit 1997",
        description: "Exzellenz, Innovation und Vertrauen für alle Ihre Finanzprojekte",
        ctaBtn: "Unsere Lösungen entdecken",
        simulateBtn: "Kredit simulieren",
        scrollText: "Entdecken",
        carousel: {
          text1: "Starten Sie Ihr Projekt mit Aurex K-pital",
          text2: "Erhalten Sie eine Finanzierung ohne Eigenkapital",
          text3: "Investieren Sie heute in Ihre Zukunft"
        },
        stats: {
          experience: {
            title: "Jahre der Exzellenz",
            subtitle: "Kontinuierliche Innovation"
          },
          clients: {
            title: "Überzeugte Kunden",
            subtitle: "Garantierte Zufriedenheit"
          },
          funding: {
            title: "Realisierte Finanzierungen",
            subtitle: "Transformative Wirkung"
          }
        }
      },
      services: {
        badge: "Dienstleistungen",
        title: "Innovative",
        subtitle: "Lösungen",
        description: "Entdecken Sie unsere revolutionären",
        description2: "Finanzlösungen",
        description3: "für Ihre Projekte"
      },
      about: {
        badge: "Über uns",
        title: "Ihr vertrauensvoller",
        subtitle: "Finanzpartner",
        subtitle2: "",
        description1: {
          highlight: "Seit 1997",
          text: " begleitet Aurex K-pital Privatpersonen und Unternehmen bei ihren Finanzprojekten mit einem Ansatz, der",
          expertise: "menschliche Expertise",
          and: "und",
          technology: "technologische Innovation"
        },
        description2: {
          text: "Unsere Mission: Den Zugang zu Finanzierungen durch",
          highlight: "schnelle, transparente und maßgeschneiderte Lösungen",
          success: "demokratisieren, um Ihre Ambitionen zu verwirklichen"
        },
        stats: {
          founded: "Gründungsjahr",
          location: "Hauptsitz",
          certified: "Register",
          security: "Safe-Nummer"
        },
        trust: {
          title: "Ihr Vertrauen, unsere Priorität",
          description: "Zertifiziert und reguliert von europäischen Behörden"
        },
        buttons: {
          history: "Unsere Geschichte",
          contact: "Kontaktieren Sie uns"
        }
      },
      cta: {
        title: "Bereit, Ihre Projekte",
        titleHighlight: "in die Realität",
        titleEnd: "umzusetzen?",
        description: "Unsere Experten begleiten Sie bei jedem Schritt zur Verwirklichung Ihrer finanziellen Ambitionen.",
        buttons: {
          request: "Antrag stellen",
          simulate: "Kredit simulieren",
          contact: "Kontaktieren Sie uns"
        },
        contact: {
          phone: "Telefon",
          address: "Adresse",
          addressValue: "123 Avenue des Champs-Élysées, 75008 Paris"
        }
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
    },
    services: {
      hero: {
        badge: "Dienstleistungen",
        title: "Maßgeschneiderte",
        titleHighlight: "Finanzlösungen",
        subtitle: "Entdecken Sie unser Fachwissen und finden Sie die passende Lösung für Ihre Bedürfnisse",
        stats: {
          solutions: { value: "50+", label: "Verfügbare Lösungen" },
          approval: { value: "95%", label: "Genehmigungsrate" },
          response: { value: "24h", label: "Garantierte Antwort" }
        }
      },
      categories: {
        personal: {
          title: "Privatkredite",
          description: "Finanzierungslösungen für Ihre persönlichen Projekte",
          features: [
            "Klassischer Privatkredit",
            "Revolving-Kredit",
            "Baukredit",
            "Fahrzeugfinanzierung"
          ]
        },
        professional: {
          title: "Unternehmensfinanzierung",
          description: "Begleitung von Unternehmen und Fachleuten",
          features: [
            "Unternehmenskredit",
            "Ausrüstungsfinanzierung",
            "Unternehmens-Liquidität",
            "Leasing"
          ]
        },
        investment: {
          title: "Investition",
          description: "Investment- und Anlagelösungen",
          features: [
            "Immobilieninvestition",
            "Finanzanlage",
            "Lebensversicherung",
            "Sparplan"
          ]
        },
        insurance: {
          title: "Versicherungen",
          description: "Schutz und Sicherung Ihrer Güter",
          features: [
            "Kreditversicherung",
            "Wohngebäudeversicherung",
            "Autoversicherung",
            "Krankenversicherung"
          ]
        }
      },
      cta: {
        title: "Benötigen Sie eine personalisierte Lösung?",
        description: "Unsere Berater prüfen Ihr Dossier und schlagen Ihnen die beste Lösung vor",
        button: "Angebot anfordern"
      }
    },
    simulator: {
      hero: {
        badge: "Simulator",
        title: "Simulieren Sie Ihren Kredit",
        titleHighlight: "in Echtzeit",
        subtitle: "Erhalten Sie eine personalisierte Schätzung mit wenigen Klicks"
      },
      form: {
        amount: "Gewünschter Betrag (€)",
        duration: "Laufzeit (Monate)",
        calculate: "Berechnen",
        results: {
          monthlyPayment: "Monatliche Rate",
          totalAmount: "Gesamtbetrag",
          interestRate: "Zinssatz"
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
    },
    footer: {
      tools: "Narzędzia",
      legal: "Prawne",
      contact: "Kontakt",
      privacyPolicy: "Polityka prywatności",
      terms: "Regulamin",
      mentions: "Informacje prawne",
      gdpr: "RODO",
      rights: "© 2024 Aurex K-pital. Wszelkie prawa zastrzeżone.",
      description: "Twój zaufany partner finansowy od 1997 roku. Doskonałość, innowacje i ekspertyza dla wszystkich Twoich projektów finansowych w Europie.",
      services: "Usługi",
      copyright: "© 2024 Aurex K-pital. Wszelkie prawa zastrzeżone.",
      establishment: "Licencjonowana instytucja finansowa w Europie",
      links: {
        personalLoans: "Pożyczki osobiste",
        proFinancing: "Finansowanie biznesowe",
        investments: "Inwestycje",
        insurance: "Ubezpieczenia",
        simulator: "Symulator kredytu",
        request: "Wniosek o finansowanie",
        contact: "Kontakt",
        about: "O nas",
        legal: "Informacje prawne",
        privacy: "Polityka prywatności",
        terms: "Regulamin",
        gdpr: "Ochrona danych (RODO)"
      }
    },
    home: {
      hero: {
        title: "Twój Partner Finansowy",
        subtitle: "od 1997 roku",
        description: "Doskonałość, innowacje i zaufanie dla wszystkich Twoich projektów finansowych",
        ctaBtn: "Odkryj nasze rozwiązania",
        simulateBtn: "Symuluj kredyt",
        scrollText: "Odkryj",
        carousel: {
          text1: "Rozpocznij swój projekt z Aurex K-pital",
          text2: "Uzyskaj finansowanie bez wkładu własnego",
          text3: "Inwestuj już dziś w swoją przyszłość"
        },
        stats: {
          experience: {
            title: "Lat doskonałości",
            subtitle: "Ciągłe innowacje"
          },
          clients: {
            title: "Zadowolonych klientów",
            subtitle: "Gwarantowana satysfakcja"
          },
          funding: {
            title: "Zrealizowanych finansowań",
            subtitle: "Transformacyjny wpływ"
          }
        }
      },
      about: {
        badge: "O nas",
        title: "Twój zaufany",
        subtitle: "partner",
        subtitle2: "finansowy",
        stats: {
          founded: "Rok założenia",
          location: "Siedziba",
          certified: "Rejestr",
          security: "Safe-Nummer"
        },
        trust: {
          title: "Twoje zaufanie, nasz priorytet",
          description: "Certyfikowani i regulowani przez europejskie władze"
        }
      }
    }
  },
  fi: {
    menu: {
      home: "Koti",
      services: "Palvelut",
      simulator: "Simulaattori",
      request: "Hakemus",
      about: "Tietoa meistä",
      contact: "Yhteystiedot",
    },
    footer: {
      tools: "Työkalut",
      legal: "Oikeudellinen",
      contact: "Yhteystiedot",
      privacyPolicy: "Tietosuojakäytäntö",
      terms: "Käyttöehdot",
      mentions: "Oikeudelliset tiedot",
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Kaikki oikeudet pidätetään.",
      description: "Luotettava rahoituskumppanisi vuodesta 1997. Erinomaisuutta, innovaatioita ja asiantuntemusta kaikille rahoitusprojekteillesi Euroopassa.",
      services: "Palvelut",
      copyright: "© 2024 Aurex K-pital. Kaikki oikeudet pidätetään.",
      establishment: "Lisensoitu rahoituslaitos Euroopassa",
      links: {
        personalLoans: "Henkilökohtaiset lainat",
        proFinancing: "Yritysrahoitus",
        investments: "Sijoitukset",
        insurance: "Vakuutukset",
        simulator: "Lainasimulattori",
        request: "Rahoitushakemus",
        contact: "Yhteystiedot",
        about: "Tietoa meistä",
        legal: "Oikeudelliset tiedot",
        privacy: "Tietosuojakäytäntö",
        terms: "Käyttöehdot",
        gdpr: "Tietosuoja (GDPR)"
      }
    },
    home: {
      hero: {
        title: "Rahoituskumppanisi",
        subtitle: "vuodesta 1997",
        description: "Erinomaisuutta, innovaatioita ja luottamusta kaikille rahoitusprojekteillesi",
        ctaBtn: "Tutustu ratkaisuihimme",
        simulateBtn: "Simuloi lainaa",
        scrollText: "Tutustu",
        stats: {
          experience: {
            title: "Vuotta erinomaisuutta",
            subtitle: "Jatkuvaa innovaatiota"
          },
          clients: {
            title: "Tyytyväistä asiakasta",
            subtitle: "Taattu tyytyväisyys"
          },
          funding: {
            title: "Toteutettua rahoitusta",
            subtitle: "Muutosvaikutus"
          }
        }
      },
      about: {
        badge: "Tietoa meistä",
        title: "Luotettava",
        subtitle: "rahoitus-",
        subtitle2: "kumppanisi",
        stats: {
          founded: "Perustamisvuosi",
          location: "Pääkonttori",
          certified: "Rekisteri",
          security: "Safe-Nummer"
        },
        trust: {
          title: "Luottamuksesi on prioriteettimme",
          description: "Sertifioitu ja säännelty eurooppalaisten viranomaisten toimesta"
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
      about: "Acerca de",
      contact: "Contacto",
    },
    footer: {
      tools: "Herramientas",
      legal: "Legal",
      contact: "Contacto",
      privacyPolicy: "Política de privacidad",
      terms: "Términos y condiciones",
      mentions: "Información legal",
      gdpr: "RGPD",
      rights: "© 2024 Aurex K-pital. Todos los derechos reservados.",
      description: "Tu socio financiero de confianza desde 1997. Excelencia, innovación y experiencia para todos tus proyectos financieros en Europa.",
      services: "Servicios",
      copyright: "© 2024 Aurex K-pital. Todos los derechos reservados.",
      establishment: "Institución financiera licenciada en Europa",
      links: {
        personalLoans: "Préstamos personales",
        proFinancing: "Financiación empresarial",
        investments: "Inversiones",
        insurance: "Seguros",
        simulator: "Simulador de préstamos",
        request: "Solicitud de financiación",
        contact: "Contacto",
        about: "Acerca de",
        legal: "Información legal",
        privacy: "Política de privacidad",
        terms: "Términos y condiciones",
        gdpr: "Protección de datos (RGPD)"
      }
    },
    home: {
      hero: {
        title: "Tu Socio Financiero",
        subtitle: "desde 1997",
        description: "Excelencia, innovación y confianza para todos tus proyectos financieros",
        ctaBtn: "Descubre nuestras soluciones",
        simulateBtn: "Simular préstamo",
        scrollText: "Descubrir",
        stats: {
          experience: {
            title: "Años de excelencia",
            subtitle: "Innovación continua"
          },
          clients: {
            title: "Clientes satisfechos",
            subtitle: "Satisfacción garantizada"
          },
          funding: {
            title: "Financiaciones realizadas",
            subtitle: "Impacto transformador"
          }
        }
      },
      about: {
        badge: "Acerca de",
        title: "Tu socio",
        subtitle: "financiero",
        subtitle2: "de confianza",
        stats: {
          founded: "Año de fundación",
          location: "Sede central",
          certified: "Registro",
          security: "Safe-Nummer"
        },
        trust: {
          title: "Tu confianza, nuestra prioridad",
          description: "Certificados y regulados por las autoridades europeas"
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
    },
    footer: {
      tools: "Ferramentas",
      legal: "Legal",
      contact: "Contacto",
      privacyPolicy: "Política de privacidade",
      terms: "Termos e condições",
      mentions: "Informações legais",
      gdpr: "RGPD",
      rights: "© 2024 Aurex K-pital. Todos os direitos reservados.",
      description: "O seu parceiro financeiro de confiança desde 1997. Excelência, inovação e expertise para todos os seus projectos financeiros na Europa.",
      services: "Serviços",
      copyright: "© 2024 Aurex K-pital. Todos os direitos reservados.",
      establishment: "Instituição financeira licenciada na Europa",
      links: {
        personalLoans: "Empréstimos pessoais",
        proFinancing: "Financiamento empresarial",
        investments: "Investimentos",
        insurance: "Seguros",
        simulator: "Simulador de empréstimos",
        request: "Pedido de financiamento",
        contact: "Contacto",
        about: "Sobre nós",
        legal: "Informações legais",
        privacy: "Política de privacidade",
        terms: "Termos e condições",
        gdpr: "Protecção de dados (RGPD)"
      }
    },
    home: {
      hero: {
        title: "O Seu Parceiro Financeiro",
        subtitle: "desde 1997",
        description: "Excelência, inovação e confiança para todos os seus projectos financeiros",
        ctaBtn: "Descubra as nossas soluções",
        simulateBtn: "Simular empréstimo",
        scrollText: "Descobrir",
        stats: {
          experience: {
            title: "Anos de excelência",
            subtitle: "Inovação contínua"
          },
          clients: {
            title: "Clientes satisfeitos",
            subtitle: "Satisfação garantida"
          },
          funding: {
            title: "Financiamentos realizados",
            subtitle: "Impacto transformador"
          }
        }
      },
      about: {
        badge: "Sobre nós",
        title: "O seu parceiro",
        subtitle: "financeiro",
        subtitle2: "de confiança",
        stats: {
          founded: "Ano de fundação",
          location: "Sede",
          certified: "Registo",
          security: "Safe-Nummer"
        },
        trust: {
          title: "A sua confiança, a nossa prioridade",
          description: "Certificados e regulamentados pelas autoridades europeias"
        }
      }
    }
  },
  el: {
    menu: {
      home: "Αρχική",
      services: "Υπηρεσίες",
      simulator: "Προσομοιωτής",
      request: "Αίτημα",
      about: "Σχετικά",
      contact: "Επικοινωνία",
    },
    footer: {
      tools: "Εργαλεία",
      legal: "Νομικά",
      contact: "Επικοινωνία",
      privacyPolicy: "Πολιτική απορρήτου",
      terms: "Όροι και προϋποθέσεις",
      mentions: "Νομικές πληροφορίες",
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Όλα τα δικαιώματα διατηρούνται.",
      description: "Ο αξιόπιστος χρηματοοικονομικός σας εταίρος από το 1997. Αριστεία, καινοτομία και εμπειρία για όλα τα χρηματοοικονομικά σας έργα στην Ευρώπη.",
      services: "Υπηρεσίες",
      copyright: "© 2024 Aurex K-pital. Όλα τα δικαιώματα διατηρούνται.",
      establishment: "Αδειοδοτημένο χρηματοπιστωτικό ίδρυμα στην Ευρώπη"
    },
    home: {
      hero: {
        title: "Ο Χρηματοοικονομικός σας Εταίρος",
        subtitle: "από το 1997",
        description: "Αριστεία, καινοτομία και εμπιστοσύνη για όλα τα χρηματοοικονομικά σας έργα",
        ctaBtn: "Ανακαλύψτε τις λύσεις μας",
        simulateBtn: "Προσομοίωση δανείου",
        scrollText: "Ανακαλύψτε",
        stats: {
          experience: {
            title: "Χρόνια αριστείας",
            subtitle: "Συνεχής καινοτομία"
          },
          clients: {
            title: "Ικανοποιημένους πελάτες",
            subtitle: "Εγγυημένη ικανοποίηση"
          },
          funding: {
            title: "Πραγματοποιημένες χρηματοδοτήσεις",
            subtitle: "Μεταμορφωτικός αντίκτυπος"
          }
        }
      },
      about: {
        badge: "Σχετικά",
        title: "Ο αξιόπιστος",
        subtitle: "χρηματοοικονομικός",
        subtitle2: "σας εταίρος",
        stats: {
          founded: "Έτος ίδρυσης",
          location: "Έδρα",
          certified: "Μητρώο",
          security: "Safe-Nummer"
        },
        trust: {
          title: "Η εμπιστοσύνη σας, προτεραιότητά μας",
          description: "Πιστοποιημένοι και ρυθμιζόμενοι από ευρωπαϊκές αρχές"
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
    },
    footer: {
      tools: "Strumenti",
      legal: "Legale",
      contact: "Contatto",
      privacyPolicy: "Politica sulla privacy",
      terms: "Termini e condizioni",
      mentions: "Informazioni legali",
      gdpr: "GDPR",
      rights: "© 2024 Aurex K-pital. Tutti i diritti riservati.",
      description: "Il vostro partner finanziario di fiducia dal 1997. Eccellenza, innovazione ed esperienza per tutti i vostri progetti finanziari in Europa.",
      services: "Servizi",
      copyright: "© 2024 Aurex K-pital. Tutti i diritti riservati.",
      establishment: "Istituzione finanziaria autorizzata in Europa",
      links: {
        personalLoans: "Prestiti personali",
        proFinancing: "Finanziamenti aziendali",
        investments: "Investimenti",
        insurance: "Assicurazioni",
        simulator: "Simulatore di prestiti",
        request: "Richiesta di finanziamento",
        contact: "Contatto",
        about: "Chi siamo",
        legal: "Informazioni legali",
        privacy: "Politica sulla privacy",
        terms: "Termini e condizioni",
        gdpr: "Protezione dati (GDPR)"
      }
    },
    home: {
      hero: {
        title: "Il Vostro Partner Finanziario",
        subtitle: "dal 1997",
        description: "Eccellenza, innovazione e fiducia per tutti i vostri progetti finanziari",
        ctaBtn: "Scoprite le nostre soluzioni",
        simulateBtn: "Simula prestito",
        scrollText: "Scopri",
        stats: {
          experience: {
            title: "Anni di eccellenza",
            subtitle: "Innovazione continua"
          },
          clients: {
            title: "Clienti soddisfatti",
            subtitle: "Soddisfazione garantita"
          },
          funding: {
            title: "Finanziamenti realizzati",
            subtitle: "Impatto trasformativo"
          }
        }
      },
      about: {
        badge: "Chi siamo",
        title: "Il vostro partner",
        subtitle: "finanziario",
        subtitle2: "di fiducia",
        stats: {
          founded: "Anno di fondazione",
          location: "Sede centrale",
          certified: "Registro",
          security: "Safe-Nummer"
        },
        trust: {
          title: "La vostra fiducia, la nostra priorità",
          description: "Certificati e regolamentati dalle autorità europee"
        }
      }
    }
  }
};