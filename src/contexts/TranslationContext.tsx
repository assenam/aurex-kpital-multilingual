import React, { createContext, useState, ReactNode } from 'react';

interface Translation {
  // Navigation
  nav: {
    home: string;
    services: string;
    about: string;
    partners: string;
    simulator: string;
    contact: string;
    faq: string;
    request: string;
    careers: string;
    legal: string;
  };
  // Hero section
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    features: {
      feature1: string;
      feature2: string;
      feature3: string;
    };
  };
  // Services
  services: {
    title: string;
    subtitle: string;
    personalLoans: {
      title: string;
      description: string;
    };
    businessLoans: {
      title: string;
      description: string;
    };
    investments: {
      title: string;
      description: string;
    };
    insurance: {
      title: string;
      description: string;
    };
  };
  // About
  about: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
  };
  // Partners
  partners: {
    title: string;
    subtitle: string;
  };
  // Testimonials
  testimonials: {
    title: string;
    subtitle: string;
  };
  // CTA
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  // Footer
  footer: {
    about: {
      title: string;
      description: string;
    };
    quickLinks: {
      title: string;
    };
    services: {
      title: string;
    };
    contact: {
      title: string;
      address: string;
      phone: string;
      email: string;
    };
    legal: {
      title: string;
      privacy: string;
      terms: string;
      cookies: string;
    };
    social: {
      title: string;
    };
    copyright: string;
  };
  // Contact (simplified)
  contact: {
    title: string;
    subtitle: string;
    howToReach: string;
    phone: string;
    email: string;
    address: string;
    formTitle: string;
    formDescription: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    successMessage: string;
  };
}

const translations: Record<string, Translation> = {
  fr: {
    nav: {
      home: "Accueil",
      services: "Services", 
      about: "À propos",
      partners: "Partenaires",
      simulator: "Simulateur",
      contact: "Contact",
      faq: "FAQ",
      request: "Demande",
      careers: "Carrières",
      legal: "Mentions légales"
    },
    hero: {
      title: "Votre Partenaire Financier de Confiance",
      subtitle: "Solutions financières sur mesure pour particuliers et entreprises en Allemagne",
      cta: "Demander un financement",
      features: {
        feature1: "Financement rapide et sécurisé",
        feature2: "Conseils d'experts personnalisés", 
        feature3: "Solutions adaptées à vos besoins"
      }
    },
    services: {
      title: "Nos Services",
      subtitle: "Des solutions financières complètes pour tous vos projets",
      personalLoans: {
        title: "Prêts Personnels",
        description: "Financez vos projets personnels avec des conditions avantageuses"
      },
      businessLoans: {
        title: "Prêts Professionnels", 
        description: "Accompagnement financier pour le développement de votre entreprise"
      },
      investments: {
        title: "Conseil en Investissement",
        description: "Optimisez votre patrimoine avec nos experts en investissement"
      },
      insurance: {
        title: "Assurances",
        description: "Protégez-vous et vos proches avec nos solutions d'assurance"
      }
    },
    about: {
      title: "Pourquoi Choisir Aurex K-pital ?",
      subtitle: "Votre réussite financière est notre priorité",
      description: "Depuis plus de 10 ans, nous accompagnons nos clients dans la réalisation de leurs projets financiers avec expertise et bienveillance.",
      cta: "En savoir plus"
    },
    partners: {
      title: "Nos Partenaires de Confiance",
      subtitle: "Un réseau solide pour votre sécurité financière"
    },
    testimonials: {
      title: "Ce que disent nos clients",
      subtitle: "Leur satisfaction est notre plus belle récompense"
    },
    cta: {
      title: "Prêt à Concrétiser Vos Projets ?",
      subtitle: "Contactez nos experts dès aujourd'hui pour une étude personnalisée et gratuite",
      button: "Commencer maintenant"
    },
    footer: {
      about: {
        title: "À propos d'Aurex K-pital",
        description: "Votre partenaire de confiance pour tous vos besoins financiers en Allemagne. Expertise, transparence et accompagnement personnalisé."
      },
      quickLinks: {
        title: "Liens rapides"
      },
      services: {
        title: "Nos services"
      },
      contact: {
        title: "Contact",
        address: "Irma-Keilhack-Ring 24, 22145 Hamburg",
        phone: "+49 40 710 97523",
        email: "contact@aurex-kpital.de"
      },
      legal: {
        title: "Légal",
        privacy: "Politique de confidentialité",
        terms: "Conditions d'utilisation", 
        cookies: "Gestion des cookies"
      },
      social: {
        title: "Suivez-nous"
      },
      copyright: "© 2024 Aurex K-pital. Tous droits réservés."
    },
    contact: {
      title: "Contactez-Nous",
      subtitle: "Notre équipe d'experts est là pour vous aider",
      howToReach: "Comment Nous Joindre",
      phone: "Téléphone",
      email: "Email",
      address: "Adresse",
      formTitle: "Envoyez-nous un message",
      formDescription: "Nous vous répondons rapidement et de manière personnalisée",
      nameLabel: "Nom complet",
      emailLabel: "Email",
      messageLabel: "Votre message",
      messagePlaceholder: "Décrivez votre demande en détail...",
      sendButton: "Envoyer le message",
      successMessage: "Votre message a été envoyé avec succès ! Nous vous contacterons rapidement."
    }
  },
  
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      partners: "Partners", 
      simulator: "Simulator",
      contact: "Contact",
      faq: "FAQ",
      request: "Request",
      careers: "Careers",
      legal: "Legal"
    },
    hero: {
      title: "Your Trusted Financial Partner",
      subtitle: "Tailored financial solutions for individuals and businesses in Germany",
      cta: "Request financing",
      features: {
        feature1: "Fast and secure financing",
        feature2: "Personalized expert advice",
        feature3: "Solutions tailored to your needs"
      }
    },
    services: {
      title: "Our Services",
      subtitle: "Complete financial solutions for all your projects",
      personalLoans: {
        title: "Personal Loans",
        description: "Finance your personal projects with advantageous conditions"
      },
      businessLoans: {
        title: "Business Loans",
        description: "Financial support for your business development"
      },
      investments: {
        title: "Investment Advisory",
        description: "Optimize your wealth with our investment experts"
      },
      insurance: {
        title: "Insurance",
        description: "Protect yourself and your loved ones with our insurance solutions"
      }
    },
    about: {
      title: "Why Choose Aurex K-pital?",
      subtitle: "Your financial success is our priority",
      description: "For over 10 years, we have been supporting our clients in achieving their financial projects with expertise and care.",
      cta: "Learn more"
    },
    partners: {
      title: "Our Trusted Partners",
      subtitle: "A solid network for your financial security"
    },
    testimonials: {
      title: "What our clients say",
      subtitle: "Their satisfaction is our greatest reward"
    },
    cta: {
      title: "Ready to Make Your Projects Reality?",
      subtitle: "Contact our experts today for a personalized and free consultation",
      button: "Start now"
    },
    footer: {
      about: {
        title: "About Aurex K-pital",
        description: "Your trusted partner for all your financial needs in Germany. Expertise, transparency and personalized support."
      },
      quickLinks: {
        title: "Quick links"
      },
      services: {
        title: "Our services"
      },
      contact: {
        title: "Contact",
        address: "Irma-Keilhack-Ring 24, 22145 Hamburg",
        phone: "+49 40 710 97523",
        email: "contact@aurex-kpital.de"
      },
      legal: {
        title: "Legal",
        privacy: "Privacy policy",
        terms: "Terms of use",
        cookies: "Cookie management"
      },
      social: {
        title: "Follow us"
      },
      copyright: "© 2024 Aurex K-pital. All rights reserved."
    },
    contact: {
      title: "Contact Us",
      subtitle: "Our team of experts is here to help you",
      howToReach: "How to Reach Us",
      phone: "Phone",
      email: "Email", 
      address: "Address",
      formTitle: "Send us a message",
      formDescription: "We respond quickly and personally",
      nameLabel: "Full name",
      emailLabel: "Email",
      messageLabel: "Your message",
      messagePlaceholder: "Describe your request in detail...",
      sendButton: "Send message",
      successMessage: "Your message has been sent successfully! We will contact you soon."
    }
  },

  de: {
    nav: {
      home: "Startseite",
      services: "Dienstleistungen",
      about: "Über uns",
      partners: "Partner",
      simulator: "Simulator",
      contact: "Kontakt",
      faq: "FAQ",
      request: "Anfrage",
      careers: "Karriere",
      legal: "Rechtliches"
    },
    hero: {
      title: "Ihr vertrauensvoller Finanzpartner",
      subtitle: "Maßgeschneiderte Finanzlösungen für Privatpersonen und Unternehmen in Deutschland",
      cta: "Finanzierung beantragen",
      features: {
        feature1: "Schnelle und sichere Finanzierung",
        feature2: "Personalisierte Expertenberatung",
        feature3: "Auf Ihre Bedürfnisse zugeschnittene Lösungen"
      }
    },
    services: {
      title: "Unsere Dienstleistungen",
      subtitle: "Umfassende Finanzlösungen für all Ihre Projekte",
      personalLoans: {
        title: "Privatkredite",
        description: "Finanzieren Sie Ihre persönlichen Projekte zu vorteilhaften Konditionen"
      },
      businessLoans: {
        title: "Geschäftskredite",
        description: "Finanzielle Unterstützung für Ihre Unternehmensentwicklung"
      },
      investments: {
        title: "Anlageberatung",
        description: "Optimieren Sie Ihr Vermögen mit unseren Anlageexperten"
      },
      insurance: {
        title: "Versicherungen",
        description: "Schützen Sie sich und Ihre Lieben mit unseren Versicherungslösungen"
      }
    },
    about: {
      title: "Warum Aurex K-pital wählen?",
      subtitle: "Ihr finanzieller Erfolg ist unsere Priorität",
      description: "Seit über 10 Jahren unterstützen wir unsere Kunden bei der Verwirklichung ihrer Finanzprojekte mit Expertise und Fürsorge.",
      cta: "Mehr erfahren"
    },
    partners: {
      title: "Unsere vertrauenswürdigen Partner",
      subtitle: "Ein solides Netzwerk für Ihre finanzielle Sicherheit"
    },
    testimonials: {
      title: "Was unsere Kunden sagen",
      subtitle: "Ihre Zufriedenheit ist unser größter Lohn"
    },
    cta: {
      title: "Bereit, Ihre Projekte zu verwirklichen?",
      subtitle: "Kontaktieren Sie noch heute unsere Experten für eine persönliche und kostenlose Beratung",
      button: "Jetzt beginnen"
    },
    footer: {
      about: {
        title: "Über Aurex K-pital",
        description: "Ihr vertrauensvoller Partner für alle Ihre finanziellen Bedürfnisse in Deutschland. Expertise, Transparenz und persönliche Betreuung."
      },
      quickLinks: {
        title: "Quick Links"
      },
      services: {
        title: "Unsere Dienstleistungen"
      },
      contact: {
        title: "Kontakt",
        address: "Irma-Keilhack-Ring 24, 22145 Hamburg",
        phone: "+49 40 710 97523",
        email: "contact@aurex-kpital.de"
      },
      legal: {
        title: "Rechtliches",
        privacy: "Datenschutzrichtlinie",
        terms: "Nutzungsbedingungen",
        cookies: "Cookie-Verwaltung"
      },
      social: {
        title: "Folgen Sie uns"
      },
      copyright: "© 2024 Aurex K-pital. Alle Rechte vorbehalten."
    },
    contact: {
      title: "Kontaktieren Sie uns",
      subtitle: "Unser Expertenteam ist hier, um Ihnen zu helfen",
      howToReach: "Wie Sie uns erreichen",
      phone: "Telefon",
      email: "E-Mail",
      address: "Adresse",
      formTitle: "Senden Sie uns eine Nachricht",
      formDescription: "Wir antworten schnell und persönlich",
      nameLabel: "Vollständiger Name",
      emailLabel: "E-Mail",
      messageLabel: "Ihre Nachricht",
      messagePlaceholder: "Beschreiben Sie Ihre Anfrage im Detail...",
      sendButton: "Nachricht senden",
      successMessage: "Ihre Nachricht wurde erfolgreich gesendet! Wir werden Sie bald kontaktieren."
    }
  },

  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      about: "Acerca de",
      partners: "Socios",
      simulator: "Simulador",
      contact: "Contacto",
      faq: "FAQ",
      request: "Solicitud",
      careers: "Carreras",
      legal: "Legal"
    },
    hero: {
      title: "Su Socio Financiero de Confianza",
      subtitle: "Soluciones financieras a medida para particulares y empresas en Alemania",
      cta: "Solicitar financiación",
      features: {
        feature1: "Financiación rápida y segura",
        feature2: "Asesoramiento experto personalizado",
        feature3: "Soluciones adaptadas a sus necesidades"
      }
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Soluciones financieras completas para todos sus proyectos",
      personalLoans: {
        title: "Préstamos Personales",
        description: "Financie sus proyectos personales con condiciones ventajosas"
      },
      businessLoans: {
        title: "Préstamos Comerciales",
        description: "Apoyo financiero para el desarrollo de su empresa"
      },
      investments: {
        title: "Asesoramiento en Inversiones",
        description: "Optimice su patrimonio con nuestros expertos en inversión"
      },
      insurance: {
        title: "Seguros",
        description: "Protéjase a usted y a sus seres queridos con nuestras soluciones de seguro"
      }
    },
    about: {
      title: "¿Por qué elegir Aurex K-pital?",
      subtitle: "Su éxito financiero es nuestra prioridad",
      description: "Durante más de 10 años, hemos estado apoyando a nuestros clientes en la realización de sus proyectos financieros con experiencia y cuidado.",
      cta: "Saber más"
    },
    partners: {
      title: "Nuestros Socios de Confianza",
      subtitle: "Una red sólida para su seguridad financiera"
    },
    testimonials: {
      title: "Lo que dicen nuestros clientes",
      subtitle: "Su satisfacción es nuestra mayor recompensa"
    },
    cta: {
      title: "¿Listo para hacer realidad sus proyectos?",
      subtitle: "Contacte con nuestros expertos hoy para una consulta personalizada y gratuita",
      button: "Comenzar ahora"
    },
    footer: {
      about: {
        title: "Acerca de Aurex K-pital",
        description: "Su socio de confianza para todas sus necesidades financieras en Alemania. Experiencia, transparencia y apoyo personalizado."
      },
      quickLinks: {
        title: "Enlaces rápidos"
      },
      services: {
        title: "Nuestros servicios"
      },
      contact: {
        title: "Contacto",
        address: "Irma-Keilhack-Ring 24, 22145 Hamburg",
        phone: "+49 40 710 97523",
        email: "contact@aurex-kpital.de"
      },
      legal: {
        title: "Legal",
        privacy: "Política de privacidad",
        terms: "Términos de uso",
        cookies: "Gestión de cookies"
      },
      social: {
        title: "Síguenos"
      },
      copyright: "© 2024 Aurex K-pital. Todos los derechos reservados."
    },
    contact: {
      title: "Contáctenos",
      subtitle: "Nuestro equipo de expertos está aquí para ayudarle",
      howToReach: "Cómo contactarnos",
      phone: "Teléfono",
      email: "Correo electrónico",
      address: "Dirección",
      formTitle: "Envíenos un mensaje",
      formDescription: "Respondemos rápida y personalmente",
      nameLabel: "Nombre completo",
      emailLabel: "Correo electrónico",
      messageLabel: "Su mensaje",
      messagePlaceholder: "Describa su solicitud en detalle...",
      sendButton: "Enviar mensaje",
      successMessage: "¡Su mensaje ha sido enviado con éxito! Nos pondremos en contacto con usted pronto."
    }
  },

  it: {
    nav: {
      home: "Home",
      services: "Servizi",
      about: "Chi siamo",
      partners: "Partner",
      simulator: "Simulatore",
      contact: "Contatto",
      faq: "FAQ",
      request: "Richiesta",
      careers: "Carriere",
      legal: "Legale"
    },
    hero: {
      title: "Il Vostro Partner Finanziario di Fiducia",
      subtitle: "Soluzioni finanziarie su misura per privati e aziende in Germania",
      cta: "Richiedi finanziamento",
      features: {
        feature1: "Finanziamento rapido e sicuro",
        feature2: "Consulenza esperta personalizzata",
        feature3: "Soluzioni adattate alle vostre esigenze"
      }
    },
    services: {
      title: "I Nostri Servizi",
      subtitle: "Soluzioni finanziarie complete per tutti i vostri progetti",
      personalLoans: {
        title: "Prestiti Personali",
        description: "Finanziate i vostri progetti personali con condizioni vantaggiose"
      },
      businessLoans: {
        title: "Prestiti Aziendali",
        description: "Supporto finanziario per lo sviluppo della vostra azienda"
      },
      investments: {
        title: "Consulenza Investimenti",
        description: "Ottimizzate il vostro patrimonio con i nostri esperti di investimento"
      },
      insurance: {
        title: "Assicurazioni",
        description: "Proteggete voi stessi e i vostri cari con le nostre soluzioni assicurative"
      }
    },
    about: {
      title: "Perché scegliere Aurex K-pital?",
      subtitle: "Il vostro successo finanziario è la nostra priorità",
      description: "Da oltre 10 anni supportiamo i nostri clienti nella realizzazione dei loro progetti finanziari con competenza e cura.",
      cta: "Scopri di più"
    },
    partners: {
      title: "I Nostri Partner di Fiducia",
      subtitle: "Una rete solida per la vostra sicurezza finanziaria"
    },
    testimonials: {
      title: "Cosa dicono i nostri clienti",
      subtitle: "La loro soddisfazione è la nostra più grande ricompensa"
    },
    cta: {
      title: "Pronti a realizzare i vostri progetti?",
      subtitle: "Contattate i nostri esperti oggi per una consulenza personalizzata e gratuita",
      button: "Inizia ora"
    },
    footer: {
      about: {
        title: "Su Aurex K-pital",
        description: "Il vostro partner di fiducia per tutte le vostre esigenze finanziarie in Germania. Competenza, trasparenza e supporto personalizzato."
      },
      quickLinks: {
        title: "Link rapidi"
      },
      services: {
        title: "I nostri servizi"
      },
      contact: {
        title: "Contatto",
        address: "Irma-Keilhack-Ring 24, 22145 Hamburg",
        phone: "+49 40 710 97523",
        email: "contact@aurex-kpital.de"
      },
      legal: {
        title: "Legale",
        privacy: "Politica sulla privacy",
        terms: "Termini di utilizzo",
        cookies: "Gestione cookie"
      },
      social: {
        title: "Seguici"
      },
      copyright: "© 2024 Aurex K-pital. Tutti i diritti riservati."
    },
    contact: {
      title: "Contattateci",
      subtitle: "Il nostro team di esperti è qui per aiutarvi",
      howToReach: "Come contattarci",
      phone: "Telefono",
      email: "Email",
      address: "Indirizzo",
      formTitle: "Inviateci un messaggio",
      formDescription: "Rispondiamo rapidamente e personalmente",
      nameLabel: "Nome completo",
      emailLabel: "Email",
      messageLabel: "Il vostro messaggio",
      messagePlaceholder: "Descrivete la vostra richiesta in dettaglio...",
      sendButton: "Invia messaggio",
      successMessage: "Il vostro messaggio è stato inviato con successo! Vi contatteremo presto."
    }
  },

  pt: {
    nav: {
      home: "Início",
      services: "Serviços",
      about: "Sobre",
      partners: "Parceiros",
      simulator: "Simulador",
      contact: "Contacto",
      faq: "FAQ",
      request: "Pedido",
      careers: "Carreiras",
      legal: "Legal"
    },
    hero: {
      title: "O Seu Parceiro Financeiro de Confiança",
      subtitle: "Soluções financeiras à medida para particulares e empresas na Alemanha",
      cta: "Solicitar financiamento",
      features: {
        feature1: "Financiamento rápido e seguro",
        feature2: "Aconselhamento especializado personalizado",
        feature3: "Soluções adaptadas às suas necessidades"
      }
    },
    services: {
      title: "Os Nossos Serviços",
      subtitle: "Soluções financeiras completas para todos os seus projetos",
      personalLoans: {
        title: "Empréstimos Pessoais",
        description: "Financie os seus projetos pessoais com condições vantajosas"
      },
      businessLoans: {
        title: "Empréstimos Empresariais",
        description: "Apoio financeiro para o desenvolvimento da sua empresa"
      },
      investments: {
        title: "Consultoria de Investimento",
        description: "Otimize o seu património com os nossos especialistas em investimento"
      },
      insurance: {
        title: "Seguros",
        description: "Proteja-se a si e aos seus entes queridos com as nossas soluções de seguro"
      }
    },
    about: {
      title: "Porquê escolher a Aurex K-pital?",
      subtitle: "O seu sucesso financeiro é a nossa prioridade",
      description: "Há mais de 10 anos que apoiamos os nossos clientes na realização dos seus projetos financeiros com experiência e cuidado.",
      cta: "Saber mais"
    },
    partners: {
      title: "Os Nossos Parceiros de Confiança",
      subtitle: "Uma rede sólida para a sua segurança financeira"
    },
    testimonials: {
      title: "O que dizem os nossos clientes",
      subtitle: "A sua satisfação é a nossa maior recompensa"
    },
    cta: {
      title: "Pronto para tornar os seus projetos realidade?",
      subtitle: "Contacte os nossos especialistas hoje para uma consulta personalizada e gratuita",
      button: "Começar agora"
    },
    footer: {
      about: {
        title: "Sobre a Aurex K-pital",
        description: "O seu parceiro de confiança para todas as suas necessidades financeiras na Alemanha. Experiência, transparência e apoio personalizado."
      },
      quickLinks: {
        title: "Links rápidos"
      },
      services: {
        title: "Os nossos serviços"
      },
      contact: {
        title: "Contacto",
        address: "Irma-Keilhack-Ring 24, 22145 Hamburg",
        phone: "+49 40 710 97523",
        email: "contact@aurex-kpital.de"
      },
      legal: {
        title: "Legal",
        privacy: "Política de privacidade",
        terms: "Termos de utilização",
        cookies: "Gestão de cookies"
      },
      social: {
        title: "Siga-nos"
      },
      copyright: "© 2024 Aurex K-pital. Todos os direitos reservados."
    },
    contact: {
      title: "Contacte-nos",
      subtitle: "A nossa equipa de especialistas está aqui para o ajudar",
      howToReach: "Como nos contactar",
      phone: "Telefone",
      email: "Email",
      address: "Morada",
      formTitle: "Envie-nos uma mensagem",
      formDescription: "Respondemos rapidamente e pessoalmente",
      nameLabel: "Nome completo",
      emailLabel: "Email",
      messageLabel: "A sua mensagem",
      messagePlaceholder: "Descreva o seu pedido em detalhe...",
      sendButton: "Enviar mensagem",
      successMessage: "A sua mensagem foi enviada com sucesso! Entraremos em contacto consigo em breve."
    }
  },

  nl: {
    nav: {
      home: "Home",
      services: "Diensten",
      about: "Over ons",
      partners: "Partners",
      simulator: "Simulator",
      contact: "Contact",
      faq: "FAQ",
      request: "Aanvraag",
      careers: "Carrières",
      legal: "Juridisch"
    },
    hero: {
      title: "Uw Vertrouwde Financiële Partner",
      subtitle: "Op maat gemaakte financiële oplossingen voor particulieren en bedrijven in Duitsland",
      cta: "Financiering aanvragen",
      features: {
        feature1: "Snelle en veilige financiering",
        feature2: "Gepersonaliseerd advies van experts",
        feature3: "Oplossingen aangepast aan uw behoeften"
      }
    },
    services: {
      title: "Onze Diensten",
      subtitle: "Volledige financiële oplossingen voor al uw projecten",
      personalLoans: {
        title: "Persoonlijke Leningen",
        description: "Financier uw persoonlijke projecten met voordelige voorwaarden"
      },
      businessLoans: {
        title: "Zakelijke Leningen",
        description: "Financiële ondersteuning voor de ontwikkeling van uw bedrijf"
      },
      investments: {
        title: "Investeringsadvies",
        description: "Optimaliseer uw vermogen met onze investeringsexperts"
      },
      insurance: {
        title: "Verzekeringen",
        description: "Bescherm uzelf en uw dierbaren met onze verzekeringsoplossingen"
      }
    },
    about: {
      title: "Waarom kiezen voor Aurex K-pital?",
      subtitle: "Uw financieel succes is onze prioriteit",
      description: "Al meer dan 10 jaar ondersteunen wij onze klanten bij het realiseren van hun financiële projecten met expertise en zorg.",
      cta: "Meer weten"
    },
    partners: {
      title: "Onze Vertrouwde Partners",
      subtitle: "Een solide netwerk voor uw financiële veiligheid"
    },
    testimonials: {
      title: "Wat onze klanten zeggen",
      subtitle: "Hun tevredenheid is onze grootste beloning"
    },
    cta: {
      title: "Klaar om uw projecten waar te maken?",
      subtitle: "Neem vandaag nog contact op met onze experts voor een persoonlijke en gratis consultatie",
      button: "Nu beginnen"
    },
    footer: {
      about: {
        title: "Over Aurex K-pital",
        description: "Uw vertrouwde partner voor al uw financiële behoeften in Duitsland. Expertise, transparantie en persoonlijke ondersteuning."
      },
      quickLinks: {
        title: "Snelle links"
      },
      services: {
        title: "Onze diensten"
      },
      contact: {
        title: "Contact",
        address: "Irma-Keilhack-Ring 24, 22145 Hamburg",
        phone: "+49 40 710 97523",
        email: "contact@aurex-kpital.de"
      },
      legal: {
        title: "Juridisch",
        privacy: "Privacybeleid",
        terms: "Gebruiksvoorwaarden",
        cookies: "Cookiebeheer"
      },
      social: {
        title: "Volg ons"
      },
      copyright: "© 2024 Aurex K-pital. Alle rechten voorbehouden."
    },
    contact: {
      title: "Neem contact met ons op",
      subtitle: "Ons team van experts is er om u te helpen",
      howToReach: "Hoe ons te bereiken",
      phone: "Telefoon",
      email: "E-mail",
      address: "Adres",
      formTitle: "Stuur ons een bericht",
      formDescription: "Wij reageren snel en persoonlijk",
      nameLabel: "Volledige naam",
      emailLabel: "E-mail",
      messageLabel: "Uw bericht",
      messagePlaceholder: "Beschrijf uw verzoek in detail...",
      sendButton: "Bericht verzenden",
      successMessage: "Uw bericht is succesvol verzonden! We nemen binnenkort contact met u op."
    }
  },

  pl: {
    nav: {
      home: "Strona główna",
      services: "Usługi",
      about: "O nas",
      partners: "Partnerzy",
      simulator: "Symulator",
      contact: "Kontakt",
      faq: "FAQ",
      request: "Wniosek",
      careers: "Kariera",
      legal: "Prawne"
    },
    hero: {
      title: "Twój Zaufany Partner Finansowy",
      subtitle: "Dostosowane rozwiązania finansowe dla osób prywatnych i firm w Niemczech",
      cta: "Złóż wniosek o finansowanie",
      features: {
        feature1: "Szybkie i bezpieczne finansowanie",
        feature2: "Spersonalizowane doradztwo ekspertów",
        feature3: "Rozwiązania dostosowane do Twoich potrzeb"
      }
    },
    services: {
      title: "Nasze Usługi",
      subtitle: "Kompleksowe rozwiązania finansowe dla wszystkich Twoich projektów",
      personalLoans: {
        title: "Pożyczki Osobiste",
        description: "Sfinansuj swoje osobiste projekty na korzystnych warunkach"
      },
      businessLoans: {
        title: "Pożyczki Biznesowe",
        description: "Wsparcie finansowe dla rozwoju Twojej firmy"
      },
      investments: {
        title: "Doradztwo Inwestycyjne",
        description: "Zoptymalizuj swój majątek z naszymi ekspertami inwestycyjnymi"
      },
      insurance: {
        title: "Ubezpieczenia",
        description: "Chroń siebie i swoich bliskich dzięki naszym rozwiązaniom ubezpieczeniowym"
      }
    },
    about: {
      title: "Dlaczego wybrać Aurex K-pital?",
      subtitle: "Twój sukces finansowy to nasz priorytet",
      description: "Od ponad 10 lat wspieramy naszych klientów w realizacji ich projektów finansowych z ekspertyzą i troską.",
      cta: "Dowiedz się więcej"
    },
    partners: {
      title: "Nasi Zaufani Partnerzy",
      subtitle: "Solidna sieć dla Twojego bezpieczeństwa finansowego"
    },
    testimonials: {
      title: "Co mówią nasi klienci",
      subtitle: "Ich zadowolenie to nasza największa nagroda"
    },
    cta: {
      title: "Gotowy na realizację swoich projektów?",
      subtitle: "Skontaktuj się z naszymi ekspertami już dziś w celu osobistej i bezpłatnej konsultacji",
      button: "Zacznij teraz"
    },
    footer: {
      about: {
        title: "O Aurex K-pital",
        description: "Twój zaufany partner dla wszystkich potrzeb finansowych w Niemczech. Ekspertyza, przejrzystość i spersonalizowane wsparcie."
      },
      quickLinks: {
        title: "Szybkie linki"
      },
      services: {
        title: "Nasze usługi"
      },
      contact: {
        title: "Kontakt",
        address: "Irma-Keilhack-Ring 24, 22145 Hamburg",
        phone: "+49 40 710 97523",
        email: "contact@aurex-kpital.de"
      },
      legal: {
        title: "Prawne",
        privacy: "Polityka prywatności",
        terms: "Warunki użytkowania",
        cookies: "Zarządzanie plikami cookie"
      },
      social: {
        title: "Śledź nas"
      },
      copyright: "© 2024 Aurex K-pital. Wszelkie prawa zastrzeżone."
    },
    contact: {
      title: "Skontaktuj się z nami",
      subtitle: "Nasz zespół ekspertów jest tutaj, aby Ci pomóc",
      howToReach: "Jak się z nami skontaktować",
      phone: "Telefon",
      email: "E-mail",
      address: "Adres",
      formTitle: "Wyślij nam wiadomość",
      formDescription: "Odpowiadamy szybko i osobiście",
      nameLabel: "Imię i nazwisko",
      emailLabel: "E-mail",
      messageLabel: "Twoja wiadomość",
      messagePlaceholder: "Opisz szczegółowo swoją prośbę...",
      sendButton: "Wyślij wiadomość",
      successMessage: "Twoja wiadomość została wysłana pomyślnie! Skontaktujemy się z Tobą wkrótce."
    }
  }
};

interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('fr');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to French if key not found
        value = translations.fr;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return the key if not found
          }
        }
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = React.useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};