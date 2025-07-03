import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  HelpCircle, Search, Clock, Shield, Euro, FileText, Users, 
  AlertCircle, CheckCircle, Phone, Mail, MessageCircle
} from 'lucide-react';

const FAQ = () => {
  const categories = [
    {
      title: "Prêts personnels",
      icon: Euro,
      questions: [
        {
          question: "Quels sont les montants minimum et maximum pour un prêt personnel ?",
          answer: "Nos prêts personnels vont de 1 000€ à 75 000€, avec des durées de remboursement de 12 à 84 mois. Le montant accordé dépend de votre profil financier, vos revenus et votre capacité de remboursement."
        },
        {
          question: "Quel est le taux d'intérêt appliqué ?",
          answer: "Nos taux sont personnalisés selon votre profil. Ils varient de 2,9% à 9,9% TAEG fixe. Un devis personnalisé vous sera proposé après étude de votre dossier, sans engagement de votre part."
        },
        {
          question: "Puis-je obtenir un prêt sans justificatif d'usage ?",
          answer: "Oui, nos prêts personnels sont des crédits sans justificatif. Vous n'avez pas besoin de nous indiquer l'usage prévu des fonds. Cependant, nous vous demandons de les utiliser de manière responsable."
        },
        {
          question: "Combien de temps faut-il pour obtenir les fonds ?",
          answer: "Après validation de votre dossier et signature électronique, les fonds sont généralement virés sous 48h ouvrées sur votre compte bancaire. En cas d'urgence justifiée, un virement le jour même peut être organisé."
        }
      ]
    },
    {
      title: "Prêts immobiliers",
      icon: Shield,
      questions: [
        {
          question: "Faut-il un apport personnel obligatoire ?",
          answer: "Non, Aurex K-pital propose des financements à 110% permettant de couvrir l'acquisition et les frais annexes. Cependant, un apport personnel améliore les conditions du prêt et réduit le coût total."
        },
        {
          question: "Quels types de biens puis-je financer ?",
          answer: "Nous finançons tous types de biens : résidence principale, secondaire, investissement locatif, SCPI, terrains à bâtir, construction neuve, rénovation importante. Chaque projet est étudié individuellement."
        },
        {
          question: "Quelle est la durée maximale d'un prêt immobilier ?",
          answer: "Nos prêts immobiliers peuvent s'étaler jusqu'à 30 ans (25 ans pour l'investissement locatif). La durée optimale est calculée selon votre âge, vos revenus et votre situation patrimoniale."
        },
        {
          question: "Proposez-vous des taux fixes ou variables ?",
          answer: "Nous proposons les deux options. Les taux fixes offrent une sécurité totale, tandis que les taux variables avec cap permettent de bénéficier d'éventuelles baisses tout en limitant les risques de hausse."
        }
      ]
    },
    {
      title: "Investissement & Épargne",
      icon: FileText,
      questions: [
        {
          question: "Quel est le montant minimum pour commencer à investir ?",
          answer: "Vous pouvez débuter avec 500€ sur nos solutions d'épargne. Pour les investissements plus sophistiqués (SCPI, assurance-vie premium), le ticket d'entrée est généralement de 5 000€."
        },
        {
          question: "Comment fonctionnent vos recommandations d'investissement ?",
          answer: "Nos algorithmes d'IA analysent votre profil de risque, vos objectifs et la conjoncture pour vous proposer une allocation personnalisée. Un conseiller expert valide et explique chaque recommandation."
        },
        {
          question: "Mes investissements sont-ils garantis ?",
          answer: "Les investissements comportent des risques de perte en capital. Cependant, nous proposons des solutions garanties (fonds euros, obligations d'État) pour la partie sécurisée de votre patrimoine."
        },
        {
          question: "Puis-je modifier ma stratégie d'investissement ?",
          answer: "Absolument. Vous bénéficiez d'une flexibilité totale : arbitrages gratuits illimités, ajustement de l'allocation, changement d'horizon d'investissement selon l'évolution de votre situation."
        }
      ]
    },
    {
      title: "Processus & Démarches",
      icon: Users,
      questions: [
        {
          question: "Quels documents dois-je fournir pour une demande ?",
          answer: "Pièce d'identité, justificatifs de revenus (3 derniers bulletins de salaire, avis d'imposition), relevés bancaires (3 derniers mois), justificatif de domicile récent. D'autres pièces peuvent être demandées selon votre situation."
        },
        {
          question: "Comment se déroule l'étude de mon dossier ?",
          answer: "1) Analyse automatisée en 2h, 2) Validation par un expert sous 24h, 3) Proposition personnalisée, 4) Finalisation avec votre conseiller dédié. Vous êtes informé à chaque étape par email et SMS."
        },
        {
          question: "Puis-je faire une simulation sans engagement ?",
          answer: "Oui, toutes nos simulations sont gratuites et sans engagement. Vous pouvez tester différents scénarios sur notre simulateur en ligne disponible 24h/24."
        },
        {
          question: "Comment contacter mon conseiller ?",
          answer: "Chaque client dispose d'un conseiller dédié joignable par téléphone, email ou chat. Vous pouvez également prendre rendez-vous en ligne pour un entretien téléphonique ou en visioconférence."
        }
      ]
    }
  ];

  const quickAnswers = [
    {
      question: "Vos services sont-ils disponibles dans toute l'Europe ?",
      answer: "Oui, dans les 27 pays de l'UE",
      icon: CheckCircle
    },
    {
      question: "Y a-t-il des frais de dossier ?",
      answer: "Analyse gratuite, frais transparents",
      icon: Euro
    },
    {
      question: "Combien de temps pour une réponse ?",
      answer: "2h pour un premier retour",
      icon: Clock
    },
    {
      question: "Mes données sont-elles sécurisées ?",
      answer: "Certification ISO 27001",
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary"></div>
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <div className="inline-block mb-6">
              <Badge className="px-6 py-2 bg-gold text-primary font-semibold text-sm">
                <HelpCircle className="h-4 w-4 mr-2" />
                Assistance & Réponses
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Foire Aux
              <span className="text-gold block">Questions</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Trouvez rapidement les réponses à vos questions sur nos services de financement, 
              d'investissement et d'accompagnement financier.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              {quickAnswers.map((item, index) => (
                <div key={index} className="text-center">
                  <item.icon className="h-8 w-8 text-gold mx-auto mb-3" />
                  <div className="font-bold text-sm mb-1">{item.question}</div>
                  <div className="text-sm opacity-90">{item.answer}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-primary">
                  <Search className="h-5 w-5" />
                  Recherche rapide
                </CardTitle>
                <CardDescription>
                  Tapez votre question ou un mot-clé pour trouver une réponse instantanée
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Ex: taux d'intérêt, apport personnel, durée prêt..."
                    className="w-full pl-10 pr-4 py-3 border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Questions par Catégorie
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explorez nos réponses détaillées organisées par domaine d'expertise
            </p>
          </div>

          <div className="space-y-8">
            {categories.map((category, categoryIndex) => (
              <Card key={category.title} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3 text-primary">
                    <div className="p-2 bg-gradient-primary rounded-lg">
                      <category.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left hover:text-primary">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Vous ne trouvez pas votre réponse ?
            </h2>
            <p className="text-xl mb-12 text-primary-foreground/90">
              Notre équipe d'experts est là pour vous accompagner personnellement
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-center">
                <CardHeader>
                  <Phone className="h-8 w-8 text-gold mx-auto mb-3" />
                  <CardTitle className="text-primary-foreground">Téléphone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/80 mb-2">+49 40 710 97523</p>
                  <p className="text-sm text-primary-foreground/70">Lun-Ven: 8h-19h</p>
                </CardContent>
              </Card>

              <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-center">
                <CardHeader>
                  <Mail className="h-8 w-8 text-gold mx-auto mb-3" />
                  <CardTitle className="text-primary-foreground">Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/80 mb-2">support@aurex-kpital.de</p>
                  <p className="text-sm text-primary-foreground/70">Réponse sous 4h</p>
                </CardContent>
              </Card>

              <Card className="bg-primary-foreground/10 border-primary-foreground/20 text-center">
                <CardHeader>
                  <MessageCircle className="h-8 w-8 text-gold mx-auto mb-3" />
                  <CardTitle className="text-primary-foreground">Chat Live</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/80 mb-2">Assistance instantanée</p>
                  <p className="text-sm text-primary-foreground/70">24h/7j disponible</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;