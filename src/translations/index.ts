import { fr } from './fr';
import { de } from './de';

// Create simplified versions for other languages based on French
const createTranslationFromFrench = (overrides: any = {}) => {
  return {
    ...fr,
    ...overrides
  };
};

export const translations = {
  fr,
  de,
  es: createTranslationFromFrench({
    nav: {
      home: "Inicio",
      services: "Servicios",
      about: "Acerca de",
      simulator: "Simulador",
      request: "Solicitud",
      faq: "FAQ",
      blog: "Blog",
      contact: "Contacto",
      careers: "Carreras",
      partners: "Socios",
      legal: "Aviso legal"
    },
    hero: {
      badge: "Líder Europeo del Crédito desde 1997",
      title: "Transforme sus sueños",
      subtitle: "en realidad financiera",
      description: "Descubra la excelencia del crédito europeo con CreditSafe, su socio de confianza desde hace más de 25 años.",
      cta: "Comenzar ahora",
      ctaSecondary: "Saber más"
    }
  }),
  pl: createTranslationFromFrench({
    nav: {
      home: "Strona główna",
      services: "Usługi",
      about: "O nas",
      simulator: "Symulator",
      request: "Wniosek",
      faq: "FAQ",
      blog: "Blog",
      contact: "Kontakt",
      careers: "Kariera",
      partners: "Partnerzy",
      legal: "Informacje prawne"
    },
    hero: {
      badge: "Europejski Lider Kredytowy od 1997",
      title: "Przekształć swoje marzenia",
      subtitle: "w rzeczywistość finansową",
      description: "Odkryj doskonałość europejskiego kredytu z CreditSafe, Twoim zaufanym partnerem od ponad 25 lat.",
      cta: "Zacznij teraz",
      ctaSecondary: "Dowiedz się więcej"
    }
  }),
  fi: createTranslationFromFrench({
    nav: {
      home: "Kotisivu",
      services: "Palvelut",
      about: "Tietoja",
      simulator: "Simulaattori",
      request: "Pyyntö",
      faq: "UKK",
      blog: "Blogi",
      contact: "Yhteystiedot",
      careers: "Uraa",
      partners: "Kumppanit",
      legal: "Oikeudelliset tiedot"
    },
    hero: {
      badge: "Eurooppalainen Luottojohtaja vuodesta 1997",
      title: "Muuta unelmasi",
      subtitle: "taloudelliseksi todellisuudeksi",
      description: "Löydä eurooppalaisen luoton erinomaisuus CreditSafen kanssa, luotettava kumppanisi yli 25 vuoden ajan.",
      cta: "Aloita nyt",
      ctaSecondary: "Lue lisää"
    }
  }),
  pt: createTranslationFromFrench({
    nav: {
      home: "Início",
      services: "Serviços",
      about: "Sobre",
      simulator: "Simulador",
      request: "Pedido",
      faq: "FAQ",
      blog: "Blog",
      contact: "Contato",
      careers: "Carreiras",
      partners: "Parceiros",
      legal: "Informações legais"
    },
    hero: {
      badge: "Líder Europeu de Crédito desde 1997",
      title: "Transforme seus sonhos",
      subtitle: "em realidade financeira",
      description: "Descubra a excelência do crédito europeu com a CreditSafe, seu parceiro de confiança há mais de 25 anos.",
      cta: "Começar agora",
      ctaSecondary: "Saber mais"
    }
  }),
  el: createTranslationFromFrench({
    nav: {
      home: "Αρχική",
      services: "Υπηρεσίες",
      about: "Σχετικά",
      simulator: "Προσομοιωτής",
      request: "Αίτηση",
      faq: "FAQ",
      blog: "Blog",
      contact: "Επικοινωνία",
      careers: "Καριέρες",
      partners: "Συνεργάτες",
      legal: "Νομικές πληροφορίες"
    },
    hero: {
      badge: "Ευρωπαϊκός Ηγέτης Πιστώσεων από το 1997",
      title: "Μετατρέψτε τα όνειρά σας",
      subtitle: "σε χρηματοοικονομική πραγματικότητα",
      description: "Ανακαλύψτε την αριστεία της ευρωπαϊκής πίστωσης με την CreditSafe, τον αξιόπιστο συνεργάτη σας για πάνω από 25 χρόνια.",
      cta: "Ξεκινήστε τώρα",
      ctaSecondary: "Μάθετε περισσότερα"
    }
  }),
  it: createTranslationFromFrench({
    nav: {
      home: "Home",
      services: "Servizi",
      about: "Chi siamo",
      simulator: "Simulatore",
      request: "Richiesta",
      faq: "FAQ",
      blog: "Blog",
      contact: "Contatto",
      careers: "Carriere",
      partners: "Partner",
      legal: "Informazioni legali"
    },
    hero: {
      badge: "Leader Europeo del Credito dal 1997",
      title: "Trasforma i tuoi sogni",
      subtitle: "in realtà finanziaria",
      description: "Scopri l'eccellenza del credito europeo con CreditSafe, il tuo partner di fiducia da oltre 25 anni.",
      cta: "Inizia ora",
      ctaSecondary: "Scopri di più"
    }
  })
};