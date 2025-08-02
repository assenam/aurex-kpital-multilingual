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
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: RequestEmailData = await req.json();

    console.log("Sending request email for:", { 
      name: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
      email: formData.personalInfo.email 
    });

    // Send notification email to company
    const notificationResponse = await resend.emails.send({
      from: "Aurex Kpital <infos@aurexk-pital.com>",
      to: ["infos@aurexk-pital.com"],
      subject: `Nouvelle demande de financement - ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
      html: `
        <h2>Nouvelle demande de financement</h2>
        
        <h3>Informations personnelles</h3>
        <ul>
          <li><strong>Nom :</strong> ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}</li>
          <li><strong>Email :</strong> ${formData.personalInfo.email}</li>
          <li><strong>Téléphone :</strong> ${formData.personalInfo.phone}</li>
          <li><strong>Date de naissance :</strong> ${formData.personalInfo.dateOfBirth}</li>
          <li><strong>Nationalité :</strong> ${formData.personalInfo.nationality}</li>
          <li><strong>Situation familiale :</strong> ${formData.personalInfo.maritalStatus}</li>
          <li><strong>Personnes à charge :</strong> ${formData.personalInfo.dependents}</li>
        </ul>

        <h3>Situation professionnelle</h3>
        <ul>
          <li><strong>Statut d'emploi :</strong> ${formData.professionalInfo.employmentStatus}</li>
          <li><strong>Employeur :</strong> ${formData.professionalInfo.employer}</li>
          <li><strong>Poste :</strong> ${formData.professionalInfo.position}</li>
          <li><strong>Durée d'emploi :</strong> ${formData.professionalInfo.workDuration}</li>
          <li><strong>Revenus mensuels :</strong> ${formData.professionalInfo.monthlyIncome}</li>
          <li><strong>Autres revenus :</strong> ${formData.professionalInfo.otherIncome || 'Aucun'}</li>
        </ul>

        <h3>Demande de financement</h3>
        <ul>
          <li><strong>Type de prêt :</strong> ${formData.financingRequest.loanType}</li>
          <li><strong>Montant :</strong> ${formData.financingRequest.amount}</li>
          <li><strong>Durée :</strong> ${formData.financingRequest.duration}</li>
          <li><strong>Objet :</strong> ${formData.financingRequest.purpose}</li>
          <li><strong>Garantie :</strong> ${formData.financingRequest.guarantee}</li>
        </ul>

        <hr>
        <p><small>Demande reçue via le formulaire de demande du site web.</small></p>
      `,
    });

    // Send confirmation email to client
    const confirmationResponse = await resend.emails.send({
      from: "Aurex Kpital <infos@aurexk-pital.com>",
      to: [formData.personalInfo.email],
      subject: "Nous avons bien reçu votre demande de financement !",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e40af;">Merci pour votre demande, ${formData.personalInfo.firstName} !</h1>
          <p>Nous avons bien reçu votre demande de financement et notre équipe d'experts l'examine actuellement.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Récapitulatif de votre demande :</h3>
            <p><strong>Type de prêt :</strong> ${formData.financingRequest.loanType}</p>
            <p><strong>Montant :</strong> ${formData.financingRequest.amount}</p>
            <p><strong>Durée :</strong> ${formData.financingRequest.duration}</p>
          </div>
          
          <p>Notre équipe d'experts vous contactera généralement sous 2 heures pendant nos heures d'ouverture pour discuter de votre projet et vous accompagner dans votre demande.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p><strong>Aurex Kpital</strong><br>
            📞 +33759282004<br>
            ✉️ infos@aurexk-pital.com<br>
            🕒 Lundi-Vendredi 8h-19h, Samedi 9h-17h</p>
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