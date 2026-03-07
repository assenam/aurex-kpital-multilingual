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
    formNote: "Message recu via le formulaire de contact du site web.",
    confirmationSubject: "Nous avons bien recu votre message !",
    confirmationTitle: (name: string) => `Merci pour votre message, ${name} !`,
    confirmationContent: "Nous avons bien recu votre demande et notre equipe vous repondra dans les plus brefs delais.",
    yourMessage: "Votre message :",
    responseTime: "Notre equipe d'experts vous contactera generalement sous 2 heures pendant nos heures d'ouverture.",
    contactInfo: "tel: +49 1521 4946940 | email: contact@aurexkpital.com | Lundi-Vendredi 8h-19h, Samedi 9h-17h"
  },
  de: {
    notificationSubject: (name: string) => `Neue Kontaktnachricht - ${name}`,
    notificationTitle: "Neue Kontaktnachricht",
    fields: { name: "Name", email: "E-Mail", message: "Nachricht" },
    formNote: "Nachricht ueber das Kontaktformular der Website erhalten.",
    confirmationSubject: "Ihre Nachricht ist eingegangen!",
    confirmationTitle: (name: string) => `Vielen Dank fuer Ihre Nachricht, ${name}!`,
    confirmationContent: "Wir haben Ihre Anfrage erhalten und unser Team wird Ihnen so schnell wie moeglich antworten.",
    yourMessage: "Ihre Nachricht:",
    responseTime: "Unser Expertenteam wird Sie normalerweise innerhalb von 2 Stunden waehrend unserer Oeffnungszeiten kontaktieren.",
    contactInfo: "tel: +49 1521 4946940 | email: contact@aurexkpital.com | Montag-Freitag 8-19 Uhr, Samstag 9-17 Uhr"
  },
  pl: {
    notificationSubject: (name: string) => `Nowa wiadomosc kontaktowa - ${name}`,
    notificationTitle: "Nowa wiadomosc kontaktowa",
    fields: { name: "Imie i nazwisko", email: "E-mail", message: "Wiadomosc" },
    formNote: "Wiadomosc otrzymana za posrednictwem formularza kontaktowego na stronie.",
    confirmationSubject: "Otrzymalismy Twoja wiadomosc!",
    confirmationTitle: (name: string) => `Dziekujemy za wiadomosc, ${name}!`,
    confirmationContent: "Otrzymalismy Twoje zapytanie i nasz zespol odpowie jak najszybciej.",
    yourMessage: "Twoja wiadomosc:",
    responseTime: "Nasz zespol ekspertow skontaktuje sie z Toba zazwyczaj w ciagu 2 godzin w godzinach naszej pracy.",
    contactInfo: "tel: +49 1521 4946940 | email: contact@aurexkpital.com | Poniedzialek-Piatek 8-19, Sobota 9-17"
  },
  fi: {
    notificationSubject: (name: string) => `Uusi yhteydenottopyynto - ${name}`,
    notificationTitle: "Uusi yhteydenottopyynto",
    fields: { name: "Nimi", email: "Sahkoposti", message: "Viesti" },
    formNote: "Viesti vastaanotettu verkkosivuston yhteydenottolomakkeelta.",
    confirmationSubject: "Viestisi on vastaanotettu!",
    confirmationTitle: (name: string) => `Kiitos viestistasi, ${name}!`,
    confirmationContent: "Olemme vastaanottaneet kyselysi ja tiimimme vastaa sinulle mahdollisimman pian.",
    yourMessage: "Viestisi:",
    responseTime: "Asiantuntijatiimimme ottaa sinuun yhteytta yleensa 2 tunnin kuluessa aukioloaikojemme sisalla.",
    contactInfo: "tel: +49 1521 4946940 | email: contact@aurexkpital.com | Maanantai-Perjantai 8-19, Lauantai 9-17"
  },
  es: {
    notificationSubject: (name: string) => `Nuevo mensaje de contacto - ${name}`,
    notificationTitle: "Nuevo mensaje de contacto",
    fields: { name: "Nombre", email: "Correo electronico", message: "Mensaje" },
    formNote: "Mensaje recibido a traves del formulario de contacto del sitio web.",
    confirmationSubject: "Hemos recibido su mensaje!",
    confirmationTitle: (name: string) => `Gracias por su mensaje, ${name}!`,
    confirmationContent: "Hemos recibido su consulta y nuestro equipo le respondera lo antes posible.",
    yourMessage: "Su mensaje:",
    responseTime: "Nuestro equipo de expertos se pondra en contacto con usted generalmente en 2 horas durante nuestro horario de oficina.",
    contactInfo: "tel: +49 1521 4946940 | email: contact@aurexkpital.com | Lunes-Viernes 8h-19h, Sabado 9h-17h"
  },
  pt: {
    notificationSubject: (name: string) => `Nova mensagem de contato - ${name}`,
    notificationTitle: "Nova mensagem de contato",
    fields: { name: "Nome", email: "E-mail", message: "Mensagem" },
    formNote: "Mensagem recebida atraves do formulario de contato do site.",
    confirmationSubject: "Recebemos sua mensagem!",
    confirmationTitle: (name: string) => `Obrigado pela sua mensagem, ${name}!`,
    confirmationContent: "Recebemos sua consulta e nossa equipe respondera o mais rapido possivel.",
    yourMessage: "Sua mensagem:",
    responseTime: "Nossa equipe de especialistas entrara em contato com voce geralmente em 2 horas durante nosso horario de funcionamento.",
    contactInfo: "tel: +49 1521 4946940 | email: contact@aurexkpital.com | Segunda-Sexta 8h-19h, Sabado 9h-17h"
  },
  el: {
    notificationSubject: (name: string) => `Neo minima epikinonias - ${name}`,
    notificationTitle: "Neo minima epikinonias",
    fields: { name: "Onoma", email: "Email", message: "Minima" },
    formNote: "Minima paralifthike meso tis formas epikinonias tou istotopou.",
    confirmationSubject: "Lavame to minimasa sas!",
    confirmationTitle: (name: string) => `Efcharistoume gia to minimasa sas, ${name}!`,
    confirmationContent: "Lavame to aitimasa sas kai i omada mas tha sas apantisei to syntomotero dynato.",
    yourMessage: "To minimasa sas:",
    responseTime: "I omada ton eidikon mas tha epikinonisi mazi sas synithoss entos 2 oron kata tis ores leitourgias mas.",
    contactInfo: "tel: +49 1521 4946940 | email: contact@aurexkpital.com | Deutera-Paraskevi 8-19, Savvato 9-17"
  },
  it: {
    notificationSubject: (name: string) => `Nuovo messaggio di contatto - ${name}`,
    notificationTitle: "Nuovo messaggio di contatto",
    fields: { name: "Nome", email: "Email", message: "Messaggio" },
    formNote: "Messaggio ricevuto tramite il modulo di contatto del sito web.",
    confirmationSubject: "Abbiamo ricevuto il suo messaggio!",
    confirmationTitle: (name: string) => `Grazie per il suo messaggio, ${name}!`,
    confirmationContent: "Abbiamo ricevuto la sua richiesta e il nostro team le rispondera il prima possibile.",
    yourMessage: "Il suo messaggio:",
    responseTime: "Il nostro team di esperti la contattera generalmente entro 2 ore durante i nostri orari di ufficio.",
    contactInfo: "tel: +49 1521 4946940 | email: contact@aurexkpital.com | Lunedi-Venerdi 8-19, Sabato 9-17"
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
