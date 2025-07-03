import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Gem, Building2, TrendingUp, Shield, Sparkles, Target, 
  CheckCircle, ArrowRight, Clock, Users, Award, Calculator,
  FileText, PiggyBank, Banknote, CreditCard, Home, Briefcase
} from 'lucide-react';
import { useTranslationLogic } from '@/hooks/useTranslation';

const Services = () => {
  const { t } = useTranslationLogic();
  const mainServices = [
    {
      title: "Prêts Personnels Premium",
      description: "Solutions de financement sur mesure pour concrétiser tous vos projets personnels avec des conditions privilégiées.",
      icon: Gem,
      gradient: "from-blue-500 to-purple-600",
      features: [
        "Taux préférentiels à partir de 0,9% TAEG",
        "Montants de 1 000€ à 100 000€",
        "Durée flexible de 12 à 84 mois",
        "Réponse sous 24h garantie",
        "Remboursement anticipé sans pénalités"
      ],
      useCases: ["Travaux et rénovation", "Achat véhicule", "Mariage et événements", "Études et formation", "Consolidation de dettes"]
    },
    {
      title: "Financement Professionnel",
      description: "Accompagnement financier dédié aux entrepreneurs, PME et professions libérales pour développer votre activité.",
      icon: Building2,
      gradient: "from-emerald-500 to-teal-600",
      features: [
        "Crédits d'investissement jusqu'à 2M€",
        "Lignes de crédit professionnelles",
        "Financement matériel et équipement",
        "Crédit-bail et location financière",
        "Accompagnement de création d'entreprise"
      ],
      useCases: ["Acquisition d'équipements", "Extension d'activité", "Rachat d'entreprise", "Immobilier professionnel", "Besoin en fonds de roulement"]
    },
    {
      title: "Investissement & Patrimoine",
      description: "Gestion patrimoniale intelligente et solutions d'investissement optimisées par nos algorithmes exclusifs.",
      icon: TrendingUp,
      gradient: "from-amber-500 to-orange-600",
      features: [
        "Gestion pilotée avec IA",
        "Diversification internationale",
        "Optimisation fiscale intégrée",
        "Reporting en temps réel",
        "Conseil patrimonial personnalisé"
      ],
      useCases: ["Préparation retraite", "Placement épargne", "Investissement immobilier", "Transmission patrimoine", "Optimisation fiscale"]
    },
    {
      title: "Assurances & Protection",
      description: "Couverture complète et innovante pour protéger vos biens, votre famille et votre activité professionnelle.",
      icon: Shield,
      gradient: "from-rose-500 to-pink-600",
      features: [
        "Assurance-vie nouvelle génération",
        "Protection famille complète",
        "Assurances professionnelles",
        "Prévoyance et santé",
        "Garanties personnalisables"
      ],
      useCases: ["Protection famille", "Assurance emprunteur", "Responsabilité civile pro", "Multirisque habitation", "Assurance auto premium"]
    }
  ];

  const specializedProducts = [
    {
      title: "Crédit Immobilier Premium",
      description: "Financement immobilier avec négociation privilégiée",
      icon: Home,
      rate: "à partir de 3,2%"
    },
    {
      title: "Prêt Étudiant Excellence",
      description: "Financement études supérieures sans caution parentale",
      icon: FileText,
      rate: "à partir de 1,5%"
    },
    {
      title: "Épargne Intelligente",
      description: "Produits d'épargne optimisés par intelligence artificielle",
      icon: PiggyBank,
      rate: "jusqu'à 4,8%"
    },
    {
      title: "Carte Premium Business",
      description: "Solutions de paiement professionnelles haut de gamme",
      icon: CreditCard,
      rate: "0€ de frais"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Analyse Personnalisée",
      description: "Étude approfondie de votre situation et de vos objectifs"
    },
    {
      step: "02", 
      title: "Solution Sur Mesure",
      description: "Conception d'une offre adaptée à vos besoins spécifiques"
    },
    {
      step: "03",
      title: "Validation Express",
      description: "Traitement accéléré et réponse sous 24h maximum"
    },
    {
      step: "04",
      title: "Accompagnement Continu",
      description: "Suivi personnalisé et optimisations régulières"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-premium-dark"></div>
        <div className="absolute inset-0 grid-pattern opacity-15"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gold/15 rounded-full blur-2xl float" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <div className="inline-block mb-6">
              <Badge className="px-6 py-2 bg-gold text-primary font-semibold text-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Innovation Financière depuis 1997
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Solutions Financières
              <span className="text-gold block">Nouvelle Génération</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Découvrez nos services premium combinant expertise humaine et intelligence artificielle 
              pour des solutions financières qui dépassent vos attentes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-primary font-bold px-8 py-4" asChild>
                <Link to="/simulateur">
                  <Calculator className="h-5 w-5 mr-2" />
                  Simuler mon projet
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/demande">
                  <FileText className="h-5 w-5 mr-2" />
                  Demande personnalisée
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-gradient-soft-blue relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Nos Services Phares
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Une gamme complète de solutions financières adaptées à chaque situation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {mainServices.map((service, index) => (
              <Card key={service.title} className="hover-lift border-0 shadow-lg overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${service.gradient}`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-primary">{service.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-muted-foreground text-lg">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-primary mb-3">Caractéristiques principales :</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary mb-3">Cas d'usage :</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.useCases.map((useCase, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {useCase}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${service.gradient} hover:shadow-lg`} asChild>
                      <Link to="/demande">
                        En savoir plus
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Products */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Produits Spécialisés
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Solutions ciblées pour des besoins spécifiques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializedProducts.map((product, index) => (
              <Card key={product.title} className="text-center hover-lift border-0 shadow-md">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-xl">
                    <product.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg font-bold text-primary">{product.title}</CardTitle>
                  <CardDescription className="text-sm">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent mb-4">{product.rate}</div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/demande">Découvrir</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gradient-elegant relative overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl float" style={{ animationDelay: '2s' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Notre Processus
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Une approche structurée pour des résultats optimaux
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.step} className="text-center">
                <div className="relative mb-6">
                  <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary to-primary/30"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto text-primary-foreground">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Prêt à concrétiser vos projets ?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Nos experts vous accompagnent dans la réalisation de tous vos objectifs financiers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-primary font-bold px-8 py-4" asChild>
                <Link to="/demande">
                  <Users className="h-5 w-5 mr-2" />
                  Rencontrer un conseiller
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/contact">
                  <Clock className="h-5 w-5 mr-2" />
                  Prendre rendez-vous
                </Link>
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-primary-foreground/20">
              <p className="text-primary-foreground/80 mb-2">
                <strong className="text-gold">Téléphone :</strong> +49 40 710 97523
              </p>
              <p className="text-primary-foreground/80">
                <strong className="text-gold">Adresse :</strong> Irma-Keilhack-Ring 24, 22145 Hamburg, Allemagne
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;