import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RequestEmailData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
    maritalStatus: string;
    dependents: string;
  };
  professionalInfo: {
    employmentStatus: string;
    employer: string;
    position: string;
    workDuration: string;
    monthlyIncome: string;
    otherIncome: string;
  };
  financingRequest: {
    loanType: string;
    amount: string;
    duration: string;
    purpose: string;
    guarantee: string;
  };
  language?: string; // Optional language parameter
}

// Email templates by language
const emailTemplates = {
  fr: {
    notificationSubject: (firstName: string, lastName: string) => `Nouvelle demande de financement - ${firstName} ${lastName}`,
    notificationTitle: "Nouvelle demande de financement",
    personalInfoTitle: "Informations personnelles",
    professionalInfoTitle: "Situation professionnelle",
    financingRequestTitle: "Demande de financement",
    fields: {
      name: "Nom", email: "Email", phone: "Téléphone", dateOfBirth: "Date de naissance",
      nationality: "Nationalité", maritalStatus: "Situation familiale", dependents: "Personnes à charge",
      employmentStatus: "Statut d'emploi", employer: "Employeur", position: "Poste",
      workDuration: "Durée d'emploi", monthlyIncome: "Revenus mensuels", otherIncome: "Autres revenus",
      loanType: "Type de prêt", amount: "Montant", duration: "Durée", purpose: "Objet", guarantee: "Garantie"
    },
    confirmationSubject: "Nous avons bien reçu votre demande de financement !",
    confirmationTitle: (firstName: string) => `Merci pour votre demande, ${firstName} !`,
    confirmationContent: "Nous avons bien reçu votre demande de financement et notre équipe d'experts l'examine actuellement.",
    confirmationSummary: "Récapitulatif de votre demande :",
    confirmationResponse: "Notre équipe d'experts vous contactera généralement sous 2 heures pendant nos heures d'ouverture pour discuter de votre projet et vous accompagner dans votre demande.",
    contactInfo: "📞 +49 1521 494694069406940<br>✉️ contact@aurexk-pital.com<br>🕒 Lundi-Vendredi 8h-19h, Samedi 9h-17h"
  },
  de: {
    notificationSubject: (firstName: string, lastName: string) => `Neue Finanzierungsanfrage - ${firstName} ${lastName}`,
    notificationTitle: "Neue Finanzierungsanfrage",
    personalInfoTitle: "Persönliche Informationen",
    professionalInfoTitle: "Berufliche Situation",
    financingRequestTitle: "Finanzierungsanfrage",
    fields: {
      name: "Name", email: "E-Mail", phone: "Telefon", dateOfBirth: "Geburtsdatum",
      nationality: "Nationalität", maritalStatus: "Familienstand", dependents: "Unterhaltsberechtigte",
      employmentStatus: "Beschäftigungsstatus", employer: "Arbeitgeber", position: "Position",
      workDuration: "Beschäftigungsdauer", monthlyIncome: "Monatseinkommen", otherIncome: "Sonstige Einkünfte",
      loanType: "Darlehensart", amount: "Betrag", duration: "Laufzeit", purpose: "Zweck", guarantee: "Sicherheit"
    },
    confirmationSubject: "Ihre Finanzierungsanfrage ist eingegangen!",
    confirmationTitle: (firstName: string) => `Vielen Dank für Ihre Anfrage, ${firstName}!`,
    confirmationContent: "Wir haben Ihre Finanzierungsanfrage erhalten und unser Expertenteam prüft sie derzeit.",
    confirmationSummary: "Zusammenfassung Ihrer Anfrage:",
    confirmationResponse: "Unser Expertenteam wird Sie normalerweise innerhalb von 2 Stunden während unserer Öffnungszeiten kontaktieren, um Ihr Projekt zu besprechen und Sie bei Ihrer Anfrage zu unterstützen.",
    contactInfo:49 1521 4946940 49469402004<br>✉️ contact@aurexk-pital.com<br>🕒 Montag-Freitag 8-19 Uhr, Samstag 9-17 Uhr"
  },
  pl: {
    notificationSubject: (firstName: string, lastName: string) => `Nowy wniosek o finansowanie - ${firstName} ${lastName}`,
    notificationTitle: "Nowy wniosek o finansowanie",
    personalInfoTitle: "Informacje osobiste",
    professionalInfoTitle: "Sytuacja zawodowa",
    financingRequestTitle: "Wniosek o finansowanie",
    fields: {
      name: "Imię i nazwisko", email: "E-mail", phone: "Telefon", dateOfBirth: "Data urodzenia",
      nationality: "Narodowość", maritalStatus: "Stan cywilny", dependents: "Osoby na utrzymaniu",
      employmentStatus: "Status zatrudnienia", employer: "Pracodawca", position: "Stanowisko",
      workDuration: "Staż pracy", monthlyIncome: "Miesięczne dochody", otherIncome: "Inne dochody",
      loanType: "Rodzaj pożyczki", amount: "Kwota", duration: "Okres", purpose: "Cel", guarantee: "Zabezpieczenie"
    },
    confirmationSubject: "Otrzymaliśmy Twój wniosek o finansowanie!",
    confirmationTitle: (firstName: string) => `Dziękujemy za wniosek, ${firstName}!`,
    confirmationContent: "Otrzymaliśmy Twój wniosek o finansowanie i nasz zespół ekspertów obecnie go analizuje.",
    confirmationSummary: "Podsumowanie Twojego wniosku:",
    confirmationResponse: "Nasz zespół ekspertów skontaktuje się z Tobą zazwyczaj w ciągu 2 godzin w godzinach naszej pracy, aby omówić Twój projekt i pomóc w realizacji wniosku.",
    contactInfo: "📞 +33759282004<br>✉️ contact@aurexk-pital.com<br>🕒 Poniedziałek-Piątek 8-19, Sobota 9-17"
  },
  fi: {
    notificationSubject: (firstName: string, lastName: string) => `Uusi rahoitushakemus - ${firstName} ${lastName}`,
    notificationTitle: "Uusi rahoitushakemus",
    personalInfoTitle: "Henkilötiedot",
    professionalInfoTitle: "Ammatillinen tilanne",
    financingRequestTitle: "Rahoitushakemus",
    fields: {
      name: "Nimi", email: "Sähköposti", phone: "Puhelin", dateOfBirth: "Syntymäaika",
      nationality: "Kansallisuus", maritalStatus: "Siviilisääty", dependents: "Huollettavat",
      employmentStatus: "Työtilanne", employer: "Työnantaja", position: "Tehtävä",
      workDuration: "Työssäoloaika", monthlyIncome: "Kuukausitulot", otherIncome: "Muut tulot",
      loanType: "Lainatyyppi", amount: "Summa", duration: "Kesto", purpose: "Tarkoitus", guarantee: "Takuu"
    },
    confirmationSubject: "Rahoitushakemuksesi on vastaanotettu!",
    confirmationTitle: (firstName: string) => `Kiitos hakemuksestasi, ${firstName}!`,
    confirmationContent: "Olemme vastaanottaneet rahoitushakemuksesi ja asiantuntijatiimimme käsittelee sitä parhaillaan.",
    confirmationSummary: "Hakemuksesi yhteenveto:",
    confirmationResponse: "Asiantuntijatiimimme ottaa sinuun yhteyttä yleensä 2 tunnin kuluessa aukioloaikojemme sisällä keskustellaksemme projektistasi ja auttaaksemme hakemuksessasi.",
    contactInfo: "📞 +33759282004<br>✉️ contact@aurexk-pital.com<br>🕒 Maanantai-Perjantai 8-19, Lauantai 9-17"
  },
  es: {
    notificationSubject: (firstName: string, lastName: string) => `Nueva solicitud de financiación - ${firstName} ${lastName}`,
    notificationTitle: "Nueva solicitud de financiación",
    personalInfoTitle: "Información personal",
    professionalInfoTitle: "Situación profesional",
    financingRequestTitle: "Solicitud de financiación",
    fields: {
      name: "Nombre", email: "Correo electrónico", phone: "Teléfono", dateOfBirth: "Fecha de nacimiento",
      nationality: "Nacionalidad", maritalStatus: "Estado civil", dependents: "Personas a cargo",
      employmentStatus: "Estado laboral", employer: "Empleador", position: "Puesto",
      workDuration: "Duración del empleo", monthlyIncome: "Ingresos mensuales", otherIncome: "Otros ingresos",
      loanType: "Tipo de préstamo", amount: "Cantidad", duration: "Duración", purpose: "Propósito", guarantee: "Garantía"
    },
    confirmationSubject: "¡Hemos recibido su solicitud de financiación!",
    confirmationTitle: (firstName: string) => `¡Gracias por su solicitud, ${firstName}!`,
    confirmationContent: "Hemos recibido su solicitud de financiación y nuestro equipo de expertos la está examinando actualmente.",
    confirmationSummary: "Resumen de su solicitud:",
    confirmationResponse: "Nuestro equipo de expertos se pondrá en contacto con usted generalmente en 2 horas durante nuestro horario de oficina para discutir su proyecto y ayudarle con su solicitud.",
    contactInfo: "📞 +33759282004<br>✉️ contact@aurexk-pital.com<br>🕒 Lunes-Viernes 8h-19h, Sábado 9h-17h"
  },
  pt: {
    notificationSubject: (firstName: string, lastName: string) => `Nova solicitação de financiamento - ${firstName} ${lastName}`,
    notificationTitle: "Nova solicitação de financiamento",
    personalInfoTitle: "Informações pessoais",
    professionalInfoTitle: "Situação profissional",
    financingRequestTitle: "Solicitação de financiamento",
    fields: {
      name: "Nome", email: "E-mail", phone: "Telefone", dateOfBirth: "Data de nascimento",
      nationality: "Nacionalidade", maritalStatus: "Estado civil", dependents: "Dependentes",
      employmentStatus: "Status de emprego", employer: "Empregador", position: "Cargo",
      workDuration: "Duração do emprego", monthlyIncome: "Renda mensal", otherIncome: "Outras rendas",
      loanType: "Tipo de empréstimo", amount: "Quantia", duration: "Duração", purpose: "Propósito", guarantee: "Garantia"
    },
    confirmationSubject: "Recebemos sua solicitação de financiamento!",
    confirmationTitle: (firstName: string) => `Obrigado pela sua solicitação, ${firstName}!`,
    confirmationContent: "Recebemos sua solicitação de financiamento e nossa equipe de especialistas está examinando-a atualmente.",
    confirmationSummary: "Resumo da sua solicitação:",
    confirmationResponse: "Nossa equipe de especialistas entrará em contato com você geralmente em 2 horas durante nosso horário de funcionamento para discutir seu projeto e ajudá-lo com sua solicitação.",
    contactInfo: "📞 +33759282004<br>✉️ contact@aurexk-pital.com<br>🕒 Segunda-Sexta 8h-19h, Sábado 9h-17h"
  },
  el: {
    notificationSubject: (firstName: string, lastName: string) => `Νέο αίτημα χρηματοδότησης - ${firstName} ${lastName}`,
    notificationTitle: "Νέο αίτημα χρηματοδότησης",
    personalInfoTitle: "Προσωπικές πληροφορίες",
    professionalInfoTitle: "Επαγγελματική κατάσταση",
    financingRequestTitle: "Αίτημα χρηματοδότησης",
    fields: {
      name: "Όνομα", email: "Email", phone: "Τηλέφωνο", dateOfBirth: "Ημερομηνία γέννησης",
      nationality: "Εθνικότητα", maritalStatus: "Οικογενειακή κατάσταση", dependents: "Εξαρτώμενα άτομα",
      employmentStatus: "Εργασιακή κατάσταση", employer: "Εργοδότης", position: "Θέση",
      workDuration: "Διάρκεια εργασίας", monthlyIncome: "Μηνιαίο εισόδημα", otherIncome: "Άλλα εισοδήματα",
      loanType: "Τύπος δανείου", amount: "Ποσό", duration: "Διάρκεια", purpose: "Σκοπός", guarantee: "Εγγύηση"
    },
    confirmationSubject: "Λάβαμε το αίτημά σας για χρηματοδότηση!",
    confirmationTitle: (firstName: string) => `Ευχαριστούμε για το αίτημά σας, ${firstName}!`,
    confirmationContent: "Λάβαμε το αίτημά σας για χρηματοδότηση και η ομάδα των ειδικών μας το εξετάζει αυτή τη στιγμή.",
    confirmationSummary: "Περίληψη του αιτήματός σας:",
    confirmationResponse: "Η ομάδα των ειδικών μας θα επικοινωνήσει μαζί σας συνήθως εντός 2 ωρών κατά τις ώρες λειτουργίας μας για να συζητήσουμε το έργο σας και να σας βοηθήσουμε με το αίτημά σας.",
    contactInfo: "📞 +33759282004<br>✉️ contact@aurexk-pital.com<br>🕒 Δευτέρα-Παρασκευή 8-19, Σάββατο 9-17"
  },
  it: {
    notificationSubject: (firstName: string, lastName: string) => `Nuova richiesta di finanziamento - ${firstName} ${lastName}`,
    notificationTitle: "Nuova richiesta di finanziamento",
    personalInfoTitle: "Informazioni personali",
    professionalInfoTitle: "Situazione professionale",
    financingRequestTitle: "Richiesta di finanziamento",
    fields: {
      name: "Nome", email: "Email", phone: "Telefono", dateOfBirth: "Data di nascita",
      nationality: "Nazionalità", maritalStatus: "Stato civile", dependents: "Persone a carico",
      employmentStatus: "Stato lavorativo", employer: "Datore di lavoro", position: "Posizione",
      workDuration: "Durata dell'impiego", monthlyIncome: "Reddito mensile", otherIncome: "Altri redditi",
      loanType: "Tipo di prestito", amount: "Importo", duration: "Durata", purpose: "Scopo", guarantee: "Garanzia"
    },
    confirmationSubject: "Abbiamo ricevuto la sua richiesta di finanziamento!",
    confirmationTitle: (firstName: string) => `Grazie per la sua richiesta, ${firstName}!`,
    confirmationContent: "Abbiamo ricevuto la sua richiesta di finanziamento e il nostro team di esperti la sta esaminando attualmente.",
    confirmationSummary: "Riepilogo della sua richiesta:",
    confirmationResponse: "Il nostro team di esperti la contatterà generalmente entro 2 ore durante i nostri orari di ufficio per discutere il suo progetto e aiutarla con la sua richiesta.",
    contactInfo: "📞 +33759282004<br>✉️ contact@aurexk-pital.com<br>🕒 Lunedì-Venerdì 8-19, Sabato 9-17"
  }
};

// Helper function for "No income" text
const getNoIncomeText = (lang: string): string => {
  const noIncomeTexts: { [key: string]: string } = {
    fr: 'Aucun',
    de: 'Keine',
    pl: 'Brak',
    fi: 'Ei ole',
    es: 'Ninguno',
    pt: 'Nenhum',
    el: 'Κανένα',
    it: 'Nessuno'
  };
  return noIncomeTexts[lang] || 'Aucun';
};

// Helper function for form submission text
const getFormSubmissionText = (lang: string): string => {
  const formTexts: { [key: string]: string } = {
    fr: 'Demande reçue via le formulaire de demande du site web.',
    de: 'Anfrage über das Antragsformular der Website erhalten.',
    pl: 'Wniosek otrzymany za pośrednictwem formularza na stronie internetowej.',
    fi: 'Hakemus vastaanotettu verkkosivuston hakemuksenlomakkeelta.',
    es: 'Solicitud recibida a través del formulario de solicitud del sitio web.',
    pt: 'Solicitação recebida através do formulário de solicitação do site.',
    el: 'Αίτηση παραλήφθηκε μέσω της φόρμας αίτησης του ιστότοπου.',
    it: 'Richiesta ricevuta tramite il modulo di richiesta del sito web.'
  };
  return formTexts[lang] || 'Demande reçue via le formulaire de demande du site web.';
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: RequestEmailData = await req.json();

    // Get language (default to French for backward compatibility)
    const lang = (formData.language && formData.language in emailTemplates) ? formData.language as keyof typeof emailTemplates : 'fr';
    const template = emailTemplates[lang];

    console.log("Sending request email for:", { 
      name: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
      email: formData.personalInfo.email,
      language: lang
    });

    // Send notification email to company
    const notificationResponse = await resend.emails.send({
      from: "Aurex Kpital <contact@aurexk-pital.com>",
      to: ["contact@aurexk-pital.com"],
      subject: template.notificationSubject(formData.personalInfo.firstName, formData.personalInfo.lastName),
      html: `
        <h2>${template.notificationTitle}</h2>
        
        <h3>${template.personalInfoTitle}</h3>
        <ul>
          <li><strong>${template.fields.name} :</strong> ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}</li>
          <li><strong>${template.fields.email} :</strong> ${formData.personalInfo.email}</li>
          <li><strong>${template.fields.phone} :</strong> ${formData.personalInfo.phone}</li>
          <li><strong>${template.fields.dateOfBirth} :</strong> ${formData.personalInfo.dateOfBirth}</li>
          <li><strong>${template.fields.nationality} :</strong> ${formData.personalInfo.nationality}</li>
          <li><strong>${template.fields.maritalStatus} :</strong> ${formData.personalInfo.maritalStatus}</li>
          <li><strong>${template.fields.dependents} :</strong> ${formData.personalInfo.dependents}</li>
        </ul>

        <h3>${template.professionalInfoTitle}</h3>
        <ul>
          <li><strong>${template.fields.employmentStatus} :</strong> ${formData.professionalInfo.employmentStatus}</li>
          <li><strong>${template.fields.employer} :</strong> ${formData.professionalInfo.employer}</li>
          <li><strong>${template.fields.position} :</strong> ${formData.professionalInfo.position}</li>
          <li><strong>${template.fields.workDuration} :</strong> ${formData.professionalInfo.workDuration}</li>
          <li><strong>${template.fields.monthlyIncome} :</strong> ${formData.professionalInfo.monthlyIncome}</li>
          <li><strong>${template.fields.otherIncome} :</strong> ${formData.professionalInfo.otherIncome || getNoIncomeText(lang)}</li>
        </ul>

        <h3>${template.financingRequestTitle}</h3>
        <ul>
          <li><strong>${template.fields.loanType} :</strong> ${formData.financingRequest.loanType}</li>
          <li><strong>${template.fields.amount} :</strong> ${formData.financingRequest.amount}</li>
          <li><strong>${template.fields.duration} :</strong> ${formData.financingRequest.duration}</li>
          <li><strong>${template.fields.purpose} :</strong> ${formData.financingRequest.purpose}</li>
          <li><strong>${template.fields.guarantee} :</strong> ${formData.financingRequest.guarantee}</li>
        </ul>

        <hr>
        <p><small>${getFormSubmissionText(lang)}</small></p>
      `,
    });

    // Send confirmation email to client
    const confirmationResponse = await resend.emails.send({
      from: "Aurex Kpital <contact@aurexk-pital.com>",
      to: [formData.personalInfo.email],
      subject: template.confirmationSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e40af;">${template.confirmationTitle(formData.personalInfo.firstName)}</h1>
          <p>${template.confirmationContent}</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>${template.confirmationSummary}</h3>
            <p><strong>${template.fields.loanType} :</strong> ${formData.financingRequest.loanType}</p>
            <p><strong>${template.fields.amount} :</strong> ${formData.financingRequest.amount}</p>
            <p><strong>${template.fields.duration} :</strong> ${formData.financingRequest.duration}</p>
          </div>
          
          <p>${template.confirmationResponse}</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p><strong>Aurex Kpital</strong><br>
            ${template.contactInfo}</p>
          </div>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { notificationResponse, confirmationResponse });

    return new Response(JSON.stringify({ 
      success: true,
      message: "Emails sent successfully"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-request-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);