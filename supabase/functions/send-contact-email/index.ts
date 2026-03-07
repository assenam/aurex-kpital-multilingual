import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
  language?: string;
}

const emailTemplates = {
  fr: {
    notificationSubject: (name: string) => `Nouveau message de contact - ${name}`,
    notificationTitle: "Nouveau message de contact",
    fields: { name: "Nom", email: "Email", message: "Message" },
    formNote: "Message reçu via le formulaire de contact du site web.",
    confirmationSubject: "Nous avons bien reçu votre message !",
    confirmationTitle: (name: string) => `Merci pour votre message, ${name} !`,
    confirmationContent: "Nous avons bien reçu votre demande et notre équipe vous répondra dans les plus brefs délais.",
    yourMessage: "Votre message :",
    responseTime: "Notre équipe d'experts vous contactera généralement sous 2 heures pendant nos heures d'ouverture.",
    contactInfo: "📞 +49 1521 4946940<br>✉️ contact@aurexkital.com<br>🕒 Lundi-Vendredi 8h-19h, Samedi 9h-17h"
  },
  de: {
    notificationSubject: (name: string) => `Neue Kontaktnachricht - ${name}`,
    notificationTitle: "Neue Kontaktnachricht",
    fields: { name: "Name", email: "E-Mail", message: "Nachricht" },
    formNote: "Nachricht über das Kontaktformular der Website erhalten.",
    confirmationSubject: "Ihre Nachricht ist eingegangen!",
    confirmationTitle: (name: string) => `Vielen Dank für Ihre Nachricht, ${name}!`,
    confirmationContent: "Wir haben Ihre Anfrage erhalten und unser Team wird Ihnen so schnell wie möglich antworten.",
    yourMessage: "Ihre Nachricht:",
    responseTime: "Unser Expertenteam wird Sie normalerweise innerhalb von 2 Stunden während unserer Öffnungszeiten kontaktieren.",
    contactInfo: "📞 +49 1521 4946940<br>✉️ contact@aurexk-ital.com<br>🕒 Montag-Freitag 8-19 Uhr, Samstag 9-17 Uhr"
  },
  pl: {
    notificationSubject: (name: string) => `Nowa wiadomość kontaktowa - ${name}`,
    notificationTitle: "Nowa wiadomość kontaktowa",
    fields: { name: "Imię i nazwisko", email: "E-mail", message: "Wiadomość" },
    formNote: "Wiadomość otrzymana za pośrednictwem formularza kontaktowego na stronie.",
    confirmationSubject: "Otrzymaliśmy Twoją wiadomość!",
    confirmationTitle: (name: string) => `Dziękujemy za wiadomość, ${name}!`,
    confirmationContent: "Otrzymaliśmy Twoje zapytanie i nasz zespół odpowie jak najszybciej.",
    yourMessage: "Twoja wiadomość:",
    responseTime: "Nasz zespół ekspertów skontaktuje się z Tobą zazwyczaj w ciągu 2 godzin w godzinach naszej pracy.",
    contactInfo: "📞 +49 1521 4946940<br>✉️ contact@aurexk-pital.com<br>🕒 Poniedziałek-Piątek 8-19, Sobota 9-17"
  },
  fi: {
    notificationSubject: (name: string) => `Uusi yhteydenottopyyntö - ${name}`,
    notificationTitle: "Uusi yhteydenottopyyntö",
    fields: { name: "Nimi", email: "Sähköposti", message: "Viesti" },
    formNote: "Viesti vastaanotettu verkkosivuston yhteydenottolomakkeelta.",
    confirmationSubject: "Viestisi on vastaanotettu!",
    confirmationTitle: (name: string) => `Kiitos viestistäsi, ${name}!`,
    confirmationContent: "Olemme vastaanottaneet kyselysi ja tiimimme vastaa sinulle mahdollisimman pian.",
    yourMessage: "Viestisi:",
    responseTime: "Asiantuntijatiimimme ottaa sinuun yhteyttä yleensä 2 tunnin kuluessa aukioloaikojemme sisällä.",
    contactInfo: "📞 +49 1521 4946940<br>✉️ contact@aurexk-pital.com<br>🕒 Maanantai-Perjantai 8-19, Lauantai 9-17"
  },
  es: {
    notificationSubject: (name: string) => `Nuevo mensaje de contacto - ${name}`,
    notificationTitle: "Nuevo mensaje de contacto",
    fields: { name: "Nombre", email: "Correo electrónico", message: "Mensaje" },
    formNote: "Mensaje recibido a través del formulario de contacto del sitio web.",
    confirmationSubject: "¡Hemos recibido su mensaje!",
    confirmationTitle: (name: string) => `¡Gracias por su mensaje, ${name}!`,
    confirmationContent: "Hemos recibido su consulta y nuestro equipo le responderá lo antes posible.",
    yourMessage: "Su mensaje:",
    responseTime: "Nuestro equipo de expertos se pondrá en contacto con usted generalmente en 2 horas durante nuestro horario de oficina.",
    contactInfo: "📞 +49 1521 4946940<br>✉️ contact@aurexk-pital.com<br>🕒 Lunes-Viernes 8h-19h, Sábado 9h-17h"
  },
  pt: {
    notificationSubject: (name: string) => `Nova mensagem de contato - ${name}`,
    notificationTitle: "Nova mensagem de contato",
    fields: { name: "Nome", email: "E-mail", message: "Mensagem" },
    formNote: "Mensagem recebida através do formulário de contato do site.",
    confirmationSubject: "Recebemos sua mensagem!",
    confirmationTitle: (name: string) => `Obrigado pela sua mensagem, ${name}!`,
    confirmationContent: "Recebemos sua consulta e nossa equipe responderá o mais rápido possível.",
    yourMessage: "Sua mensagem:",
    responseTime: "Nossa equipe de especialistas entrará em contato com você geralmente em 2 horas durante nosso horário de funcionamento.",
    contactInfo: "📞 +49 1521 4946940<br>✉️ contact@aurexk-pital.com<br>🕒 Segunda-Sexta 8h-19h, Sábado 9h-17h"
  },
  el: {
    notificationSubject: (name: string) => `Νέο μήνυμα επικοινωνίας - ${name}`,
    notificationTitle: "Νέο μήνυμα επικοινωνίας",
    fields: { name: "Όνομα", email: "Email", message: "Μήνυμα" },
    formNote: "Μήνυμα παραλήφθηκε μέσω της φόρμας επικοινωνίας του ιστότοπου.",
    confirmationSubject: "Λάβαμε το μήνυμά σας!",
    confirmationTitle: (name: string) => `Ευχαριστούμε για το μήνυμά σας, ${name}!`,
    confirmationContent: "Λάβαμε το αίτημά σας και η ομάδα μας θα σας απαντήσει το συντομότερο δυνατό.",
    yourMessage: "Το μήνυμά σας:",
    responseTime: "Η ομάδα των ειδικών μας θα επικοινωνήσει μαζί σας συνήθως εντός 2 ωρών κατά τις ώρες λειτουργίας μας.",
    contactInfo: "📞 +49 1521 4946940<br>✉️ contact@aurexk-pital.com<br>🕒 Δευτέρα-Παρασκευή 8-19, Σάββατο 9-17"
  },
  it: {
    notificationSubject: (name: string) => `Nuovo messaggio di contatto - ${name}`,
    notificationTitle: "Nuovo messaggio di contatto",
    fields: { name: "Nome", email: "Email", message: "Messaggio" },
    formNote: "Messaggio ricevuto tramite il modulo di contatto del sito web.",
    confirmationSubject: "Abbiamo ricevuto il suo messaggio!",
    confirmationTitle: (name: string) => `Grazie per il suo messaggio, ${name}!`,
    confirmationContent: "Abbiamo ricevuto la sua richiesta e il nostro team le risponderà il prima possibile.",
    yourMessage: "Il suo messaggio:",
    responseTime: "Il nostro team di esperti la contatterà generalmente entro 2 ore durante i nostri orari di ufficio.",
    contactInfo: "📞 +49 1521 4946940<br>✉️ contact@aurexk-pital.com<br>🕒 Lunedì-Venerdì 8-19, Sabato 9-17"
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message, language }: ContactEmailRequest = await req.json();
    const lang = (language && language in emailTemplates) ? language as keyof typeof emailTemplates : 'fr';
    const template = emailTemplates[lang];

    console.log("Sending contact email for:", { name, email, language: lang });

    // Notification to company
    const notificationResponse = await resend.emails.send({
      from: "Aurex Kpital <contact@aurexkpital.com>",
      to: ["contact@aurexkpital.com"],
      subject: template.notificationSubject(name),
      html: `
        <h2>${template.notificationTitle}</h2>
        <p><strong>${template.fields.name} :</strong> ${name}</p>
        <p><strong>${template.fields.email} :</strong> ${email}</p>
        <p><strong>${template.fields.message} :</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>${template.formNote}</small></p>
      `,
    });

    // Confirmation to client in their language
    const confirmationResponse = await resend.emails.send({
      from: "Aurex Kpital <contact@aurexkpital.com>",
      to: [email],
      subject: template.confirmationSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e40af;">${template.confirmationTitle(name)}</h1>
          <p>${template.confirmationContent}</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>${template.yourMessage}</h3>
            <p style="font-style: italic;">"${message}"</p>
          </div>
          <p>${template.responseTime}</p>
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
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
