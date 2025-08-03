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
      name: "Nom",
      email: "Email",
      phone: "Téléphone",
      dateOfBirth: "Date de naissance",
      nationality: "Nationalité",
      maritalStatus: "Situation familiale",
      dependents: "Personnes à charge",
      employmentStatus: "Statut d'emploi",
      employer: "Employeur",
      position: "Poste",
      workDuration: "Durée d'emploi",
      monthlyIncome: "Revenus mensuels",
      otherIncome: "Autres revenus",
      loanType: "Type de prêt",
      amount: "Montant",
      duration: "Durée",
      purpose: "Objet",
      guarantee: "Garantie"
    },
    confirmationSubject: "Nous avons bien reçu votre demande de financement !",
    confirmationTitle: (firstName: string) => `Merci pour votre demande, ${firstName} !`,
    confirmationContent: "Nous avons bien reçu votre demande de financement et notre équipe d'experts l'examine actuellement.",
    confirmationSummary: "Récapitulatif de votre demande :",
    confirmationResponse: "Notre équipe d'experts vous contactera généralement sous 2 heures pendant nos heures d'ouverture pour discuter de votre projet et vous accompagner dans votre demande.",
    contactInfo: "📞 +33759282004<br>✉️ infos@aurexk-pital.com<br>🕒 Lundi-Vendredi 8h-19h, Samedi 9h-17h"
  },
  fi: {
    notificationSubject: (firstName: string, lastName: string) => `Uusi rahoitushakemus - ${firstName} ${lastName}`,
    notificationTitle: "Uusi rahoitushakemus",
    personalInfoTitle: "Henkilötiedot",
    professionalInfoTitle: "Ammatillinen tilanne",
    financingRequestTitle: "Rahoitushakemus",
    fields: {
      name: "Nimi",
      email: "Sähköposti",
      phone: "Puhelin",
      dateOfBirth: "Syntymäaika",
      nationality: "Kansallisuus",
      maritalStatus: "Siviilisääty",
      dependents: "Huollettavat",
      employmentStatus: "Työtilanne",
      employer: "Työnantaja",
      position: "Tehtävä",
      workDuration: "Työssäoloaika",
      monthlyIncome: "Kuukausitulot",
      otherIncome: "Muut tulot",
      loanType: "Lainatyyppi",
      amount: "Summa",
      duration: "Kesto",
      purpose: "Tarkoitus",
      guarantee: "Takuu"
    },
    confirmationSubject: "Rahoitushakemuksesi on vastaanotettu!",
    confirmationTitle: (firstName: string) => `Kiitos hakemuksestasi, ${firstName}!`,
    confirmationContent: "Olemme vastaanottaneet rahoitushakemuksesi ja asiantuntijatiimimme käsittelee sitä parhaillaan.",
    confirmationSummary: "Hakemuksesi yhteenveto:",
    confirmationResponse: "Asiantuntijatiimimme ottaa sinuun yhteyttä yleensä 2 tunnin kuluessa aukioloaikojemme sisällä keskustellaksemme projektistasi ja auttaaksemme hakemuksessasi.",
    contactInfo: "📞 +33759282004<br>✉️ infos@aurexk-pital.com<br>🕒 Maanantai-Perjantai 8-19, Lauantai 9-17"
  }
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
      from: "Aurex Kpital <infos@aurexk-pital.com>",
      to: ["infos@aurexk-pital.com"],
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
          <li><strong>${template.fields.otherIncome} :</strong> ${formData.professionalInfo.otherIncome || (lang === 'fi' ? 'Ei ole' : 'Aucun')}</li>
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
        <p><small>${lang === 'fi' ? 'Hakemus vastaanotettu verkkosivuston hakemuksenlomakkeelta.' : 'Demande reçue via le formulaire de demande du site web.'}</small></p>
      `,
    });

    // Send confirmation email to client
    const confirmationResponse = await resend.emails.send({
      from: "Aurex Kpital <infos@aurexk-pital.com>",
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