import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactEmailRequest = await req.json();

    console.log("Sending contact email for:", { name, email });

    // Send notification email to company
    const notificationResponse = await resend.emails.send({
      from: "Aurex Kpital <infos@aurex-kpital.com>",
      to: ["infos@aurex-kpital.com"],
      subject: `Nouveau message de contact - ${name}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Message reçu via le formulaire de contact du site web.</small></p>
      `,
    });

    // Send confirmation email to client
    const confirmationResponse = await resend.emails.send({
      from: "Aurex Kpital <infos@aurex-kpital.com>",
      to: [email],
      subject: "Nous avons bien reçu votre message !",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e40af;">Merci pour votre message, ${name} !</h1>
          <p>Nous avons bien reçu votre demande et notre équipe vous répondra dans les plus brefs délais.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Votre message :</h3>
            <p style="font-style: italic;">"${message}"</p>
          </div>
          
          <p>Notre équipe d'experts vous contactera généralement sous 2 heures pendant nos heures d'ouverture.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p><strong>Aurex Kpital</strong><br>
            📞 +33759282004<br>
            ✉️ infos@aurex-kpital.com<br>
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
    console.error("Error in send-contact-email function:", error);
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