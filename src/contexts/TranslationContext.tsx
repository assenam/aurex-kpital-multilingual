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
    legal: {
      badge: "Informations Légales",
      title: {
        main: "Informations",
        subtitle: "Légales"
      },
      description: "Transparence et conformité pour votre tranquillité d'esprit",
      tabs: {
        mentions: "Mentions Légales",
        privacy: "Confidentialité",
        terms: "Conditions",
        gdpr: "RGPD"
      },
      mentions: {
        title: "Mentions Légales",
        description: "Informations légales obligatoires concernant notre société",
        company: {
          title: "Informations sur la société",
          name: "Dénomination sociale",
          type: "Forme juridique",
          typeValue: "Société à responsabilité limitée (GmbH)",
          capital: "Capital social",
          address: "Adresse du siège social",
          register: "Numéro d'inscription au registre",
          vat: "Numéro de TVA intracommunautaire",
          siren: "Numéro SIREN"
        },
        management: {
          title: "Direction",
          ceo: "Directeur Général",
          cio: "Directrice Innovation",
          cro: "Directeur Relations Clients"
        },
        activity: {
          title: "Objet social",
          description: "Aurex K-pital GmbH est spécialisée dans les services financiers et propose :",
          services: {
            banking: "Services bancaires et de financement",
            investment: "Conseil en investissement",
            insurance: "Courtage en assurance",
            wealth: "Gestion de patrimoine"
          }
        },
        contact: {
          title: "Contact",
          phone: "Téléphone",
          email: "Email",
          hours: "Horaires d'ouverture",
          schedule: "Lundi au vendredi de 8h à 19h"
        },
        hosting: {
          title: "Hébergement",
          description: "Ce site est hébergé par :"
        },
        intellectual: {
          title: "Propriété intellectuelle",
          description: "Tous les contenus présents sur ce site (textes, images, logos, graphismes) sont la propriété exclusive d'Aurex K-pital GmbH et sont protégés par les lois sur la propriété intellectuelle."
        },
        responsibility: {
          title: "Limitation de responsabilité",
          description: "Aurex K-pital GmbH s'efforce de fournir des informations exactes mais ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées sur ce site."
        }
      },
      privacy: {
        title: "Politique de Confidentialité",
        description: "Protection et traitement de vos données personnelles",
        lastUpdate: "Dernière mise à jour : 1er décembre 2024",
        compliance: "Cette politique est conforme au RGPD et aux réglementations européennes en vigueur.",
        sections: {
          controller: {
            title: "1. Responsable du Traitement",
            content: "Aurex K-pital GmbH, société immatriculée sous le numéro HRB 147852 au registre du commerce de Hamburg, dont le siège social est situé Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne.\n\nDélégué à la Protection des Données : privacy@aurex-kpital.de"
          },
          dataCollected: {
            title: "2. Données Collectées",
            content: "Nous collectons les catégories de données suivantes :\n\n• Données d'identification : nom, prénom, date de naissance, nationalité\n• Coordonnées : adresse postale, email, téléphone\n• Données financières : revenus, patrimoine, historique bancaire\n• Données de connexion : adresse IP, cookies, logs de navigation\n• Données comportementales : interactions avec nos services"
          },
          purposes: {
            title: "3. Finalités du Traitement",
            content: "Vos données sont traitées pour :\n\n• L'exécution de nos services financiers\n• L'évaluation de votre solvabilité\n• La prévention de la fraude et le blanchiment\n• Le respect de nos obligations légales\n• L'amélioration de nos services\n• La communication commerciale (avec votre consentement)"
          },
          legalBasis: {
            title: "4. Base Légale",
            content: "Nos traitements sont fondés sur :\n\n• Exécution contractuelle : pour la fourniture de nos services\n• Obligation légale : conformité réglementaire (KYC, AML)\n• Intérêt légitime : prévention de la fraude, amélioration des services\n• Consentement : communications marketing, cookies non essentiels"
          },
          dataSharing: {
            title: "5. Partage des Données",
            content: "Vos données peuvent être partagées avec :\n\n• Nos partenaires bancaires et financiers\n• Les organismes de crédit et d'assurance\n• Les autorités de régulation (BaFin, ACPR)\n• Nos prestataires techniques (sous contrat strict)\n• Les autorités judiciaires sur réquisition"
          },
          retention: {
            title: "6. Conservation des Données",
            content: "Nous conservons vos données :\n\n• Données client actif : durée de la relation + 5 ans\n• Données financières : 10 ans après la fin du contrat\n• Données de connexion : 13 mois maximum\n• Données marketing : 3 ans après le dernier contact"
          },
          rights: {
            title: "7. Vos Droits",
            content: "Conformément au RGPD, vous disposez des droits suivants :\n\n• Droit d'accès : obtenir une copie de vos données\n• Droit de rectification : corriger vos données inexactes\n• Droit à l'effacement : supprimer vos données (sous conditions)\n• Droit de limitation : restreindre le traitement\n• Droit de portabilité : récupérer vos données\n• Droit d'opposition : vous opposer au traitement\n• Droit de retrait du consentement\n\nPour exercer vos droits : privacy@aurex-kpital.de"
          },
          security: {
            title: "8. Sécurité",
            content: "Nous mettons en place des mesures techniques et organisationnelles appropriées :\n\n• Chiffrement des données (AES-256)\n• Accès restreint et contrôlé\n• Surveillance continue des systèmes\n• Formation régulière du personnel\n• Audits de sécurité périodiques"
          },
          transfers: {
            title: "9. Transferts Internationaux",
            content: "Certaines données peuvent être transférées vers des pays tiers avec des garanties appropriées (clauses contractuelles types, décisions d'adéquation de la Commission européenne)."
          },
          contact: {
            title: "10. Contact",
            content: "Pour toute question relative à cette politique de confidentialité :\n\nEmail : privacy@aurex-kpital.de\nTéléphone : +33759282004\nAdresse : Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne"
          }
        }
      }
    },
    de: {
      legal: {
        badge: "Rechtliche Informationen",
        title: {
          main: "Rechtliche",
          subtitle: "Informationen"
        },
        description: "Transparenz und Compliance für Ihr Vertrauen",
        tabs: {
          mentions: "Impressum",
          privacy: "Datenschutz",
          terms: "AGB",
          gdpr: "DSGVO"
        },
        mentions: {
          title: "Impressum",
          description: "Rechtlich erforderliche Informationen über unser Unternehmen",
          company: {
            title: "Unternehmensangaben",
            name: "Firmenbezeichnung",
            type: "Rechtsform",
            typeValue: "Gesellschaft mit beschränkter Haftung (GmbH)",
            capital: "Stammkapital",
            address: "Sitz der Gesellschaft",
            register: "Handelsregisternummer",
            vat: "Umsatzsteuer-Identifikationsnummer",
            siren: "SIREN-Nummer"
          },
          management: {
            title: "Geschäftsführung",
            ceo: "Geschäftsführer",
            cio: "Innovationsdirektorin",
            cro: "Kundenbeziehungsleiter"
          },
          activity: {
            title: "Unternehmensgegenstand",
            description: "Aurex K-pital GmbH ist spezialisiert auf Finanzdienstleistungen und bietet:",
            services: {
              banking: "Bank- und Finanzierungsdienstleistungen",
              investment: "Anlageberatung",
              insurance: "Versicherungsvermittlung",
              wealth: "Vermögensverwaltung"
            }
          },
          contact: {
            title: "Kontakt",
            phone: "Telefon",
            email: "E-Mail",
            hours: "Öffnungszeiten",
            schedule: "Montag bis Freitag von 8:00 bis 19:00 Uhr"
          },
          hosting: {
            title: "Hosting",
            description: "Diese Website wird gehostet von:"
          },
          intellectual: {
            title: "Geistiges Eigentum",
            description: "Alle auf dieser Website vorhandenen Inhalte (Texte, Bilder, Logos, Grafiken) sind ausschließliches Eigentum der Aurex K-pital GmbH und durch Gesetze zum Schutz des geistigen Eigentums geschützt."
          },
          responsibility: {
            title: "Haftungsbeschränkung",
            description: "Aurex K-pital GmbH bemüht sich, genaue Informationen bereitzustellen, kann jedoch nicht die Richtigkeit, Vollständigkeit oder Aktualität der auf dieser Website verbreiteten Informationen garantieren."
          }
        },
        privacy: {
          title: "Datenschutzerklärung",
          description: "Schutz und Verarbeitung Ihrer personenbezogenen Daten",
          lastUpdate: "Letzte Aktualisierung: 1. Dezember 2024",
          compliance: "Diese Richtlinie entspricht der DSGVO und den geltenden europäischen Vorschriften.",
          sections: {
            controller: {
              title: "1. Verantwortlicher",
              content: "Aurex K-pital GmbH, eingetragen unter der Nummer HRB 147852 im Handelsregister Hamburg, mit Sitz in Irma-Keilhack-Ring 24, 22145 Hamburg, Deutschland.\n\nDatenschutzbeauftragter: privacy@aurex-kpital.de"
            },
            dataCollected: {
              title: "2. Erhobene Daten",
              content: "Wir erheben folgende Datenkategorien:\n\n• Identifikationsdaten: Name, Vorname, Geburtsdatum, Nationalität\n• Kontaktdaten: Postanschrift, E-Mail, Telefon\n• Finanzdaten: Einkommen, Vermögen, Bankhistorie\n• Verbindungsdaten: IP-Adresse, Cookies, Navigationslogs\n• Verhaltensdaten: Interaktionen mit unseren Diensten"
            },
            purposes: {
              title: "3. Zwecke der Verarbeitung",
              content: "Ihre Daten werden verarbeitet für:\n\n• Die Erbringung unserer Finanzdienstleistungen\n• Die Bewertung Ihrer Kreditwürdigkeit\n• Die Prävention von Betrug und Geldwäsche\n• Die Erfüllung unserer rechtlichen Verpflichtungen\n• Die Verbesserung unserer Dienste\n• Kommerzielle Kommunikation (mit Ihrer Einwilligung)"
            },
            legalBasis: {
              title: "4. Rechtsgrundlage",
              content: "Unsere Verarbeitungen basieren auf:\n\n• Vertragserfüllung: für die Bereitstellung unserer Dienste\n• Rechtliche Verpflichtung: regulatorische Compliance (KYC, AML)\n• Berechtigtes Interesse: Betrugsvorbeugung, Dienstverbesserung\n• Einwilligung: Marketing-Kommunikation, nicht wesentliche Cookies"
            },
            dataSharing: {
              title: "5. Datenweitergabe",
              content: "Ihre Daten können geteilt werden mit:\n\n• Unseren Bank- und Finanzpartnern\n• Kredit- und Versicherungsorganisationen\n• Regulierungsbehörden (BaFin, ACPR)\n• Unseren technischen Dienstleistern (unter striktem Vertrag)\n• Justizbehörden auf Anfrage"
            },
            retention: {
              title: "6. Datenaufbewahrung",
              content: "Wir bewahren Ihre Daten auf:\n\n• Aktive Kundendaten: Dauer der Beziehung + 5 Jahre\n• Finanzdaten: 10 Jahre nach Vertragsende\n• Verbindungsdaten: maximal 13 Monate\n• Marketing-Daten: 3 Jahre nach letztem Kontakt"
            },
            rights: {
              title: "7. Ihre Rechte",
              content: "Gemäß DSGVO haben Sie folgende Rechte:\n\n• Auskunftsrecht: eine Kopie Ihrer Daten erhalten\n• Berichtigungsrecht: unrichtige Daten korrigieren\n• Löschungsrecht: Ihre Daten löschen (unter Bedingungen)\n• Einschränkungsrecht: Verarbeitung beschränken\n• Datenübertragbarkeit: Ihre Daten abrufen\n• Widerspruchsrecht: der Verarbeitung widersprechen\n• Widerruf der Einwilligung\n\nZur Ausübung Ihrer Rechte: privacy@aurex-kpital.de"
            },
            security: {
              title: "8. Sicherheit",
              content: "Wir setzen angemessene technische und organisatorische Maßnahmen um:\n\n• Datenverschlüsselung (AES-256)\n• Beschränkter und kontrollierter Zugang\n• Kontinuierliche Systemüberwachung\n• Regelmäßige Mitarbeiterschulungen\n• Regelmäßige Sicherheitsaudits"
            },
            transfers: {
              title: "9. Internationale Übertragungen",
              content: "Bestimmte Daten können an Drittländer mit angemessenen Garantien übertragen werden (Standardvertragsklauseln, Angemessenheitsbeschlüsse der Europäischen Kommission)."
            },
            contact: {
              title: "10. Kontakt",
              content: "Für Fragen zu dieser Datenschutzerklärung:\n\nE-Mail: privacy@aurex-kpital.de\nTelefon: +33759282004\nAdresse: Irma-Keilhack-Ring 24, 22145 Hamburg, Deutschland"
            }
          }
        }
      }
    },
    pl: {
      legal: {
        badge: "Informacje Prawne",
        title: {
          main: "Informacje",
          subtitle: "Prawne"
        },
        description: "Przejrzystość i zgodność dla Państwa spokoju ducha",
        tabs: {
          mentions: "Informacje Prawne",
          privacy: "Prywatność",
          terms: "Warunki",
          gdpr: "RODO"
        },
        mentions: {
          title: "Informacje Prawne",
          description: "Obowiązkowe informacje prawne dotyczące naszej firmy",
          company: {
            title: "Informacje o firmie",
            name: "Nazwa firmy",
            type: "Forma prawna",
            typeValue: "Spółka z ograniczoną odpowiedzialnością (GmbH)",
            capital: "Kapitał społeczny",
            address: "Adres siedziby",
            register: "Numer wpisu do rejestru",
            vat: "Numer VAT UE",
            siren: "Numer SIREN"
          },
          management: {
            title: "Zarząd",
            ceo: "Dyrektor Generalny",
            cio: "Dyrektor ds. Innowacji",
            cro: "Dyrektor ds. Relacji z Klientami"
          },
          activity: {
            title: "Przedmiot działalności",
            description: "Aurex K-pital GmbH specjalizuje się w usługach finansowych i oferuje:",
            services: {
              banking: "Usługi bankowe i finansowe",
              investment: "Doradztwo inwestycyjne",
              insurance: "Pośrednictwo ubezpieczeniowe",
              wealth: "Zarządzanie majątkiem"
            }
          },
          contact: {
            title: "Kontakt",
            phone: "Telefon",
            email: "Email",
            hours: "Godziny otwarcia",
            schedule: "Poniedziałek-piątek 8:00-19:00"
          },
          hosting: {
            title: "Hosting",
            description: "Ta strona jest hostowana przez:"
          },
          intellectual: {
            title: "Własność intelektualna",
            description: "Wszystkie treści obecne na tej stronie (teksty, obrazy, logo, grafiki) są wyłączną własnością Aurex K-pital GmbH i są chronione przez prawa własności intelektualnej."
          },
          responsibility: {
            title: "Ograniczenie odpowiedzialności",
            description: "Aurex K-pital GmbH stara się dostarczać dokładne informacje, ale nie może zagwarantować dokładności, kompletności lub aktualności informacji rozpowszechnianych na tej stronie."
          }
        },
        privacy: {
          title: "Polityka Prywatności",
          description: "Ochrona i przetwarzanie Państwa danych osobowych",
          lastUpdate: "Ostatnia aktualizacja: 1 grudnia 2024",
          compliance: "Ta polityka jest zgodna z RODO i obowiązującymi przepisami europejskimi.",
          sections: {
            controller: {
              title: "1. Administrator Danych",
              content: "Aurex K-pital GmbH, spółka wpisana pod numerem HRB 147852 do rejestru handlowego w Hamburgu, z siedzibą przy Irma-Keilhack-Ring 24, 22145 Hamburg, Niemcy.\n\nInspektor Ochrony Danych: privacy@aurex-kpital.de"
            },
            dataCollected: {
              title: "2. Zbierane Dane",
              content: "Zbieramy następujące kategorie danych:\n\n• Dane identyfikacyjne: imię, nazwisko, data urodzenia, narodowość\n• Dane kontaktowe: adres pocztowy, email, telefon\n• Dane finansowe: dochody, majątek, historia bankowa\n• Dane połączenia: adres IP, cookies, logi nawigacji\n• Dane behawioralne: interakcje z naszymi usługami"
            },
            purposes: {
              title: "3. Cele Przetwarzania",
              content: "Państwa dane są przetwarzane w celu:\n\n• Świadczenia naszych usług finansowych\n• Oceny Państwa zdolności kredytowej\n• Zapobiegania oszustwom i praniu pieniędzy\n• Wypełniania naszych obowiązków prawnych\n• Ulepszania naszych usług\n• Komunikacji handlowej (za Państwa zgodą)"
            },
            legalBasis: {
              title: "4. Podstawa Prawna",
              content: "Nasze przetwarzanie opiera się na:\n\n• Wykonanie umowy: dla świadczenia naszych usług\n• Obowiązek prawny: zgodność regulacyjna (KYC, AML)\n• Uzasadniony interes: zapobieganie oszustwom, ulepszanie usług\n• Zgoda: komunikacja marketingowa, cookies nieistotne"
            },
            dataSharing: {
              title: "5. Udostępnianie Danych",
              content: "Państwa dane mogą być udostępniane:\n\n• Naszym partnerom bankowym i finansowym\n• Organizacjom kredytowym i ubezpieczeniowym\n• Organom regulacyjnym (BaFin, ACPR)\n• Naszym dostawcom technicznym (pod ścisłą umową)\n• Organom sądowym na żądanie"
            },
            retention: {
              title: "6. Przechowywanie Danych",
              content: "Przechowujemy Państwa dane:\n\n• Dane aktywnego klienta: czas trwania relacji + 5 lat\n• Dane finansowe: 10 lat po zakończeniu umowy\n• Dane połączenia: maksymalnie 13 miesięcy\n• Dane marketingowe: 3 lata po ostatnim kontakcie"
            },
            rights: {
              title: "7. Państwa Prawa",
              content: "Zgodnie z RODO mają Państwo następujące prawa:\n\n• Prawo dostępu: uzyskanie kopii swoich danych\n• Prawo sprostowania: poprawienie nieprawidłowych danych\n• Prawo do usunięcia: usunięcie danych (pod warunkami)\n• Prawo ograniczenia: ograniczenie przetwarzania\n• Prawo przenoszenia: odzyskanie danych\n• Prawo sprzeciwu: sprzeciw wobec przetwarzania\n• Prawo wycofania zgody\n\nAby skorzystać ze swoich praw: privacy@aurex-kpital.de"
            },
            security: {
              title: "8. Bezpieczeństwo",
              content: "Wdrażamy odpowiednie środki techniczne i organizacyjne:\n\n• Szyfrowanie danych (AES-256)\n• Ograniczony i kontrolowany dostęp\n• Ciągłe monitorowanie systemów\n• Regularne szkolenia personelu\n• Okresowe audyty bezpieczeństwa"
            },
            transfers: {
              title: "9. Transfery Międzynarodowe",
              content: "Niektóre dane mogą być przekazywane do krajów trzecich z odpowiednimi gwarancjami (standardowe klauzule umowne, decyzje o adekwatności Komisji Europejskiej)."
            },
            contact: {
              title: "10. Kontakt",
              content: "W przypadku pytań dotyczących tej polityki:\nEmail: privacy@aurex-kpital.de\nTelefon: +33759282004\nAdres: Irma-Keilhack-Ring 24, 22145 Hamburg, Niemcy"
            }
          }
        }
      }
    },
    fi: {
      legal: {
        badge: "Oikeudelliset Tiedot",
        title: {
          main: "Oikeudelliset",
          subtitle: "Tiedot"
        },
        description: "Läpinäkyvyyttä ja vaatimustenmukaisuutta mielenrauhaanne",
        tabs: {
          mentions: "Lakimääräykset",
          privacy: "Yksityisyys",
          terms: "Ehdot",
          gdpr: "GDPR"
        },
        mentions: {
          title: "Lakimääräykset",
          description: "Pakolliset oikeudelliset tiedot yrityksestämme",
          company: {
            title: "Yritystiedot",
            name: "Yrityksen nimi",
            type: "Oikeudellinen muoto",
            typeValue: "Osakeyhtiö (GmbH)",
            capital: "Osakepääoma",
            address: "Pääkonttorin osoite",
            register: "Kaupparekisterinumero",
            vat: "ALV-numero",
            siren: "SIREN-numero"
          },
          management: {
            title: "Johto",
            ceo: "Toimitusjohtaja",
            cio: "Innovaatiojohtaja",
            cro: "Asiakassuhteiden johtaja"
          },
          activity: {
            title: "Liiketoiminta",
            description: "Aurex K-pital on erikoistunut rahoituspalveluihin ja tarjoaa:",
            services: {
              banking: "Pankki- ja rahoituspalvelut",
              investment: "Sijoitusneuvonta",
              insurance: "Vakuutusvälitys",
              wealth: "Varallisuudenhoito"
            }
          },
          contact: {
            title: "Yhteystiedot",
            phone: "Puhelin",
            email: "Sähköposti",
            hours: "Aukioloajat",
            schedule: "Maanantai-perjantai 8-19"
          },
          hosting: {
            title: "Hosting",
            description: "Tämä sivusto on isännöity:"
          },
          intellectual: {
            title: "Immateriaalioikeudet",
            description: "Kaikki tällä sivustolla oleva sisältö (tekstit, kuvat, logot, grafiikat) on Aurex K-pitalin yksinomaista omaisuutta ja suojattu tekijänoikeuslaeilla."
          },
          responsibility: {
            title: "Vastuun rajoitus",
            description: "Aurex K-pital pyrkii tarjoamaan tarkkoja tietoja, mutta ei voi taata tällä sivustolla levitettyjen tietojen tarkkuutta, täydellisyyttä tai ajankohtaisuutta."
          }
        },
        privacy: {
          title: "Tietosuojakäytäntö",
          description: "Henkilötietojenne suoja ja käsittely",
          lastUpdate: "Viimeksi päivitetty: 1. joulukuuta 2024",
          compliance: "Tämä käytäntö on GDPR:n ja voimassa olevien eurooppalaisten säädösten mukainen.",
          sections: {
            controller: {
              title: "1. Rekisterinpitäjä",
              content: "Aurex K-pital GmbH, rekisteröity numerolla HRB 147852 Hampurin kaupparekisteriin, kotipaikka Irma-Keilhack-Ring 24, 22145 Hamburg, Saksa.\n\nTietosuojavastaava: privacy@aurex-kpital.de"
            },
            dataCollected: {
              title: "2. Kerättävät Tiedot",
              content: "Keräämme seuraavia tietokategorioita:\n\n• Tunnistautumistiedot: nimi, syntymäaika, kansallisuus\n• Yhteystiedot: postiosoite, sähköposti, puhelin\n• Taloudelliset tiedot: tulot, varallisuus, pankkihistoria\n• Yhteystiedot: IP-osoite, evästeet, navigointiloki\n• Käyttäytymistiedot: vuorovaikutus palveluidemme kanssa"
            },
            purposes: {
              title: "3. Käsittelyn Tarkoitukset",
              content: "Tietojanne käsitellään:\n\n• Rahoituspalveluidemme toteuttamiseksi\n• Luottokelpoisuutenne arvioimiseksi\n• Petosten ja rahanpesun ehkäisemiseksi\n• Lakisääteisten velvoitteidemme täyttämiseksi\n• Palveluidemme parantamiseksi\n• Kaupallista viestintää varten (suostumuksellanne)"
            },
            legalBasis: {
              title: "4. Oikeusperusta",
              content: "Käsittelyämme perustuu:\n\n• Sopimuksen täyttäminen: palveluidemme tarjoamiseksi\n• Lakisääteinen velvoite: säännösten noudattaminen (KYC, AML)\n• Oikeutettu etu: petosten ehkäisy, palvelujen parantaminen\n• Suostumus: markkinointiviestintä, ei-välttämättömät evästeet"
            },
            dataSharing: {
              title: "5. Tietojen Jakaminen",
              content: "Tietojanne voidaan jakaa:\n\n• Pankki- ja rahoituskumppaneidemme kanssa\n• Luotto- ja vakuutusorganisaatioiden kanssa\n• Sääntelyviranomaisten kanssa (BaFin, ACPR)\n• Teknisten palveluntarjoajiemme kanssa (tiukalla sopimuksella)\n• Oikeusviranomaisten kanssa pyynnöstä"
            },
            retention: {
              title: "6. Tietojen Säilyttäminen",
              content: "Säilytämme tietojanne:\n\n• Aktiivisen asiakkaan tiedot: suhteen kesto + 5 vuotta\n• Taloudelliset tiedot: 10 vuotta sopimuksen päättymisen jälkeen\n• Yhteystiedot: enintään 13 kuukautta\n• Markkinointitiedot: 3 vuotta viimeisen yhteydenoton jälkeen"
            },
            rights: {
              title: "7. Oikeutenne",
              content: "GDPR:n mukaisesti teillä on seuraavat oikeudet:\n\n• Tiedonsaantioikeus: saada kopio tiedoistanne\n• Oikaisun oikeus: korjata virheelliset tiedot\n• Poisto-oikeus: poistaa tietonne (tietyin ehdoin)\n• Rajoittamisen oikeus: rajoittaa käsittelyä\n• Siirrettävyyden oikeus: saada tietonne takaisin\n• Vastustamisen oikeus: vastustaa käsittelyä\n• Suostumuksen peruuttamisen oikeus\n\nOikeuksianne käyttääksenne: privacy@aurex-kpital.de"
            },
            security: {
              title: "8. Turvallisuus",
              content: "Toteutamme asianmukaiset tekniset ja organisatoriset toimenpiteet:\n\n• Tietojen salaus (AES-256)\n• Rajoitettu ja kontrolloitu pääsy\n• Jatkuva järjestelmien valvonta\n• Säännöllinen henkilöstön koulutus\n• Säännölliset turvallisuusauditoinnit"
            },
            transfers: {
              title: "9. Kansainväliset Siirrot",
              content: "Tiettyjä tietoja voidaan siirtää kolmansiin maihin asianmukaisin takuin (vakiosopimuslausekkeet, Euroopan komission riittävyyspäätökset)."
            },
            contact: {
              title: "10. Yhteystiedot",
              content: "Kysymyksiä tietosuojakäytännöstä:\n\nSähköposti: privacy@aurex-kpital.de\nPuhelin: +33759282004\nOsoite: Irma-Keilhack-Ring 24, 22145 Hamburg, Saksa"
            }
          }
        }
      }
    },
    pt: {
      legal: {
        badge: "Informações Legais",
        title: {
          main: "Informações",
          subtitle: "Legais"
        },
        description: "Transparência e conformidade para a vossa tranquilidade",
        tabs: {
          mentions: "Aviso Legal",
          privacy: "Privacidade",
          terms: "Termos",
          gdpr: "RGPD"
        },
        mentions: {
          title: "Aviso Legal",
          description: "Informações legais obrigatórias sobre a nossa empresa",
          company: {
            title: "Informações da empresa",
            name: "Denominação social",
            type: "Forma jurídica",
            typeValue: "Sociedade por quotas (GmbH)",
            capital: "Capital social",
            address: "Endereço da sede social",
            register: "Número de registo",
            vat: "Número de IVA intracomunitário",
            siren: "Número SIREN"
          },
          management: {
            title: "Direção",
            ceo: "Diretor-Geral",
            cio: "Diretora de Inovação",
            cro: "Diretor de Relações com Clientes"
          },
          activity: {
            title: "Objeto social",
            description: "A Aurex K-pital GmbH é especializada em serviços financeiros e oferece:",
            services: {
              banking: "Serviços bancários e de financiamento",
              investment: "Consultoria de investimento",
              insurance: "Mediação de seguros",
              wealth: "Gestão de patrimónios"
            }
          },
          contact: {
            title: "Contacto",
            phone: "Telefone",
            email: "Email",
            hours: "Horário de funcionamento",
            schedule: "Segunda a sexta das 8h às 19h"
          },
          hosting: {
            title: "Alojamento",
            description: "Este site é alojado por:"
          },
          intellectual: {
            title: "Propriedade intelectual",
            description: "Todos os conteúdos presentes neste site (textos, imagens, logótipos, gráficos) são propriedade exclusiva da Aurex K-pital GmbH e estão protegidos pelas leis de propriedade intelectual."
          },
          responsibility: {
            title: "Limitação de responsabilidade",
            description: "A Aurex K-pital GmbH esforça-se por fornecer informações precisas mas não pode garantir a exatidão, integridade ou atualidade das informações divulgadas neste site."
          }
        },
        privacy: {
          title: "Política de Privacidade",
          description: "Proteção e tratamento dos vossos dados pessoais",
          lastUpdate: "Última atualização: 1 de dezembro de 2024",
          compliance: "Esta política está em conformidade com o RGPD e regulamentações europeias em vigor.",
          sections: {
            controller: {
              title: "1. Responsável pelo Tratamento",
              content: "Aurex K-pital GmbH, sociedade inscrita sob o número HRB 147852 no registo comercial de Hamburgo, com sede social em Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemanha.\n\nEncarregado da Proteção de Dados: privacy@aurex-kpital.de"
            },
            dataCollected: {
              title: "2. Dados Recolhidos",
              content: "Recolhemos as seguintes categorias de dados:\n\n• Dados de identificação: nome, apelido, data de nascimento, nacionalidade\n• Dados de contacto: endereço postal, email, telefone\n• Dados financeiros: rendimentos, património, histórico bancário\n• Dados de ligação: endereço IP, cookies, logs de navegação\n• Dados comportamentais: interações com os nossos serviços"
            },
            purposes: {
              title: "3. Finalidades do Tratamento",
              content: "Os vossos dados são processados para:\n\n• A execução dos nossos serviços financeiros\n• A avaliação da vossa solvabilidade\n• A prevenção de fraude e branqueamento\n• O cumprimento das nossas obrigações legais\n• A melhoria dos nossos serviços\n• A comunicação comercial (com o vosso consentimento)"
            },
            legalBasis: {
              title: "4. Base Legal",
              content: "Os nossos tratamentos baseiam-se em:\n\n• Execução contratual: para a prestação dos nossos serviços\n• Obrigação legal: conformidade regulamentar (KYC, AML)\n• Interesse legítimo: prevenção de fraudes, melhoria de serviços\n• Consentimento: comunicações de marketing, cookies não essenciais"
            },
            dataSharing: {
              title: "5. Partilha de Dados",
              content: "Os vossos dados podem ser partilhados com:\n\n• Os nossos parceiros bancários e financeiros\n• Organismos de crédito e seguros\n• Autoridades reguladoras (BaFin, ACPR)\n• Os nossos fornecedores técnicos (sob contrato rigoroso)\n• Autoridades judiciais mediante requisição"
            },
            retention: {
              title: "6. Conservação de Dados",
              content: "Conservamos os vossos dados:\n\n• Dados de cliente ativo: duração da relação + 5 anos\n• Dados financeiros: 10 anos após o fim do contrato\n• Dados de ligação: máximo 13 meses\n• Dados de marketing: 3 anos após o último contacto"
            },
            rights: {
              title: "7. Os Vossos Direitos",
              content: "Em conformidade com o RGPD, tendes os seguintes direitos:\n\n• Direito de acesso: obter uma cópia dos vossos dados\n• Direito de retificação: corrigir os vossos dados inexatos\n• Direito ao apagamento: eliminar os vossos dados (sob condições)\n• Direito de limitação: restringir o processamento\n• Direito de portabilidade: recuperar os vossos dados\n• Direito de oposição: opor-se ao processamento\n• Direito de retirada do consentimento\n\nPara exercer os vossos direitos: privacy@aurex-kpital.de"
            },
            security: {
              title: "8. Segurança",
              content: "Implementamos medidas técnicas e organizacionais apropriadas:\n\n• Encriptação de dados (AES-256)\n• Acesso restrito e controlado\n• Monitorização contínua de sistemas\n• Formação regular do pessoal\n• Auditorias de segurança periódicas"
            },
            transfers: {
              title: "9. Transferências Internacionais",
              content: "Alguns dados podem ser transferidos para países terceiros com garantias apropriadas (cláusulas contratuais tipo, decisões de adequação da Comissão Europeia)."
            },
            contact: {
              title: "10. Contacto",
              content: "Para qualquer questão relativa a esta política de privacidade:\n\nEmail: privacy@aurex-kpital.de\nTelefone: +33759282004\nEndereço: Irma-Keilhack-Ring 24, 22145 Hamburgo, Alemanha"
            }
          }
        }
      }
    },
    el: {
      legal: {
        badge: "Νομικές Πληροφορίες",
        title: {
          main: "Νομικές",
          subtitle: "Πληροφορίες"
        },
        description: "Διαφάνεια και συμμόρφωση για την ηρεμία σας",
        tabs: {
          mentions: "Νομικές Αναφορές",
          privacy: "Ιδιωτικότητα",
          terms: "Όροι",
          gdpr: "GDPR"
        },
        mentions: {
          title: "Νομικές Αναφορές",
          description: "Υποχρεωτικές νομικές πληροφορίες για την εταιρεία μας",
          company: {
            title: "Στοιχεία εταιρείας",
            name: "Επωνυμία εταιρείας",
            type: "Νομική μορφή",
            typeValue: "Εταιρεία περιορισμένης ευθύνης (GmbH)",
            capital: "Κοινωνικό κεφάλαιο",
            address: "Διεύθυνση έδρας",
            register: "Αριθμός μητρώου",
            vat: "Αριθμός ΦΠΑ ΕΕ",
            siren: "Αριθμός SIREN"
          },
          management: {
            title: "Διοίκηση",
            ceo: "Γενικός Διευθυντής",
            cio: "Διευθύντρια Καινοτομίας",
            cro: "Διευθυντής Πελατειακών Σχέσεων"
          },
          activity: {
            title: "Εταιρικός σκοπός",
            description: "Η Aurex K-pital GmbH ειδικεύεται σε χρηματοοικονομικές υπηρεσίες και προσφέρει:",
            services: {
              banking: "Τραπεζικές και χρηματοδοτικές υπηρεσίες",
              investment: "Επενδυτική συμβουλευτική",
              insurance: "Ασφαλιστική διαμεσολάβηση",
              wealth: "Διαχείριση περιουσίας"
            }
          },
          contact: {
            title: "Επικοινωνία",
            phone: "Τηλέφωνο",
            email: "Email",
            hours: "Ώρες λειτουργίας",
            schedule: "Δευτέρα-Παρασκευή 8:00-19:00"
          },
          hosting: {
            title: "Φιλοξενία",
            description: "Αυτός ο ιστότοπος φιλοξενείται από:"
          },
          intellectual: {
            title: "Πνευματική ιδιοκτησία",
            description: "Όλο το περιεχόμενο αυτού του ιστότοπου (κείμενα, εικόνες, λογότυπα, γραφικά) είναι αποκλειστική ιδιοκτησία της Aurex K-pital GmbH και προστατεύεται από τους νόμους πνευματικής ιδιοκτησίας."
          },
          responsibility: {
            title: "Περιορισμός ευθύνης",
            description: "Η Aurex K-pital GmbH προσπαθεί να παρέχει ακριβείς πληροφορίες αλλά δεν μπορεί να εγγυηθεί την ακρίβεια, πληρότητα ή επικαιρότητα των πληροφοριών που διαδίδονται σε αυτόν τον ιστότοπο."
          }
        },
        privacy: {
          title: "Πολιτική Απορρήτου",
          description: "Προστασία και επεξεργασία των προσωπικών σας δεδομένων",
          lastUpdate: "Τελευταία ενημέρωση: 1η Δεκεμβρίου 2024",
          compliance: "Αυτή η πολιτική συμμορφώνεται με τον GDPR και τους ισχύοντες ευρωπαϊκούς κανονισμούς.",
          sections: {
            controller: {
              title: "1. Υπεύθυνος Επεξεργασίας",
              content: "Aurex K-pital GmbH, εταιρεία εγγεγραμμένη με αριθμό HRB 147852 στο εμπορικό μητρώο του Αμβούργου, με έδρα στη διεύθυνση Irma-Keilhack-Ring 24, 22145 Αμβούργο, Γερμανία.\n\nΥπεύθυνος Προστασίας Δεδομένων: privacy@aurex-kpital.de"
            },
            dataCollected: {
              title: "2. Συλλεγόμενα Δεδομένα",
              content: "Συλλέγουμε τις ακόλουθες κατηγορίες δεδομένων:\n\n• Δεδομένα ταυτοποίησης: όνομα, επώνυμο, ημερομηνία γέννησης, εθνικότητα\n• Στοιχεία επικοινωνίας: ταχυδρομική διεύθυνση, email, τηλέφωνο\n• Οικονομικά δεδομένα: εισοδήματα, περιουσία, τραπεζικό ιστορικό\n• Δεδομένα σύνδεσης: διεύθυνση IP, cookies, αρχεία πλοήγησης\n• Δεδομένα συμπεριφοράς: αλληλεπιδράσεις με τις υπηρεσίες μας"
            },
            purposes: {
              title: "3. Σκοποί Επεξεργασίας",
              content: "Τα δεδομένα σας επεξεργάζονται για:\n\n• Την εκτέλεση των χρηματοοικονομικών μας υπηρεσιών\n• Την αξιολόγηση της πιστοληπτικής σας ικανότητας\n• Την πρόληψη απάτης και ξεπλύματος χρημάτων\n• Τη συμμόρφωση με τις νομικές μας υποχρεώσεις\n• Τη βελτίωση των υπηρεσιών μας\n• Την εμπορική επικοινωνία (με τη συγκατάθεσή σας)"
            },
            legalBasis: {
              title: "4. Νομική Βάση",
              content: "Οι επεξεργασίες μας βασίζονται σε:\n\n• Εκτέλεση σύμβασης: για την παροχή των υπηρεσιών μας\n• Νομική υποχρέωση: κανονιστική συμμόρφωση (KYC, AML)\n• Έννομο συμφέρον: πρόληψη απάτης, βελτίωση υπηρεσιών\n• Συγκατάθεση: μάρκετινγκ επικοινωνία, μη απαραίτητα cookies"
            },
            dataSharing: {
              title: "5. Κοινοποίηση Δεδομένων",
              content: "Τα δεδομένα σας μπορεί να κοινοποιηθούν σε:\n\n• Τους τραπεζικούς και χρηματοοικονομικούς μας εταίρους\n• Πιστωτικούς και ασφαλιστικούς οργανισμούς\n• Ρυθμιστικές αρχές (BaFin, ACPR)\n• Τους τεχνικούς μας παρόχους (υπό αυστηρό συμβόλαιο)\n• Δικαστικές αρχές κατόπιν αιτήματος"
            },
            retention: {
              title: "6. Διατήρηση Δεδομένων",
              content: "Διατηρούμε τα δεδομένα σας:\n\n• Δεδομένα ενεργού πελάτη: διάρκεια σχέσης + 5 χρόνια\n• Οικονομικά δεδομένα: 10 χρόνια μετά το τέλος του συμβολαίου\n• Δεδομένα σύνδεσης: μέγιστο 13 μήνες\n• Δεδομένα μάρκετινγκ: 3 χρόνια μετά την τελευταία επικοινωνία"
            },
            rights: {
              title: "7. Τα Δικαιώματά σας",
              content: "Για να ασκήσετε τα δικαιώματά σας: privacy@aurex-kpital.de"
            },
            security: {
              title: "8. Ασφάλεια",
              content: "Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα:\n\n• Κρυπτογράφηση δεδομένων (AES-256)\n• Περιορισμένη και ελεγχόμενη πρόσβαση\n• Συνεχής παρακολούθηση συστημάτων\n• Τακτική εκπαίδευση προσωπικού\n• Περιοδικοί έλεγχοι ασφαλείας"
            },
            transfers: {
              title: "9. Διεθνείς Μεταφορές",
              content: "Ορισμένα δεδομένα μπορεί να μεταφερθούν σε τρίτες χώρες με κατάλληλες εγγυήσεις (τυπικές συμβατικές ρήτρες, αποφάσεις επάρκειας της Ευρωπαϊκής Επιτροπής)."
            },
            contact: {
              title: "10. Επικοινωνία",
              content: "Για οποιαδήποτε ερώτηση σχετικά με αυτήν την πολιτική απορρήτου:\n\nEmail: privacy@aurex-kpital.de\nΤηλέφωνο: +33759282004\nΔιεύθυνση: Irma-Keilhack-Ring 24, 22145 Αμβούργο, Γερμανία"
            }
          }
        }
      }
    }
  }
};

export default translations;
