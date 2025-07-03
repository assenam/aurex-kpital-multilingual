import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Handshake, Building2, Globe, Award, Users, TrendingUp, 
  Shield, Star, CheckCircle, ArrowRight, Mail, Phone
} from 'lucide-react';

const Partners = () => {
  const partnerCategories = [
    {
      title: "Banques Partenaires",
      description: "Établissements bancaires européens de premier plan",
      icon: Building2,
      partners: [
        {
          name: "Deutsche Bank AG",
          description: "Partenariat stratégique pour les financements immobiliers haut de gamme",
          country: "Allemagne",
          since: "2015",
          specialty: "Prêts immobiliers premium"
        },
        {
          name: "BNP Paribas Europe",
          description: "Collaboration pour les prêts personnels et professionnels",
          country: "France",
          since: "2018",
          specialty: "Financement entreprises"
        },
        {
          name: "ING Group",
          description: "Solutions d'épargne et d'investissement innovantes",
          country: "Pays-Bas",
          since: "2019",
          specialty: "Épargne digitale"
        },
        {
          name: "Société Générale",
          description: "Expertise en gestion de patrimoine et investissements",
          country: "France",
          since: "2020",
          specialty: "Gestion patrimoniale"
        }
      ]
    },
    {
      title: "Assureurs & Protection",
      description: "Leaders européens de l'assurance et de la protection",
      icon: Shield,
      partners: [
        {
          name: "Allianz SE",
          description: "Assurances prêts et protection juridique complète",
          country: "Allemagne",
          since: "2016",
          specialty: "Assurance emprunteur"
        },
        {
          name: "AXA Group",
          description: "Solutions d'assurance-vie et prévoyance personnalisées",
          country: "France",
          since: "2017",
          specialty: "Assurance-vie"
        },
        {
          name: "Generali",
          description: "Protection familiale et professionnelle sur mesure",
          country: "Italie",
          since: "2019",
          specialty: "Prévoyance famille"
        }
      ]
    },
    {
      title: "Fintechs & Innovation",
      description: "Partenaires technologiques de pointe",
      icon: TrendingUp,
      partners: [
        {
          name: "Klarna Bank",
          description: "Solutions de paiement flexibles et innovantes",
          country: "Suède",
          since: "2021",
          specialty: "Paiements fractionnés"
        },
        {
          name: "Revolut",
          description: "Services bancaires digitaux nouvelle génération",
          country: "Royaume-Uni",
          since: "2022",
          specialty: "Banking digital"
        },
        {
          name: "N26",
          description: "Expérience bancaire mobile optimisée",
          country: "Allemagne",
          since: "2021",
          specialty: "Banque mobile"
        }
      ]
    },
    {
      title: "Conseils & Expertise",
      description: "Cabinets de conseil et d'expertise reconnus",
      icon: Award,
      partners: [
        {
          name: "EY Financial Services",
          description: "Audit et conseil en stratégie financière",
          country: "International",
          since: "2018",
          specialty: "Audit & conseil"
        },
        {
          name: "PwC Germany",
          description: "Expertise fiscale et réglementaire européenne",
          country: "Allemagne",
          since: "2019",
          specialty: "Fiscalité internationale"
        },
        {
          name: "KPMG Europe",
          description: "Due diligence et optimisation patrimoniale",
          country: "International",
          since: "2020",
          specialty: "Due diligence"
        }
      ]
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Taux Préférentiels",
      description: "Nos partenariats nous permettent de négocier les meilleurs taux du marché pour nos clients"
    },
    {
      icon: Users,
      title: "Expertise Combinée",
      description: "Bénéficiez de l'expertise cumulée de tous nos partenaires spécialisés"
    },
    {
      icon: Globe,
      title: "Couverture Européenne",
      description: "Un réseau qui couvre l'ensemble des 27 pays de l'Union Européenne"
    },
    {
      icon: Shield,
      title: "Sécurité Renforcée",
      description: "Standards de sécurité les plus élevés grâce à nos partenaires certifiés"
    }
  ];

  const achievements = [
    { label: "Partenaires actifs", value: "25+", icon: Handshake },
    { label: "Pays couverts", value: "27", icon: Globe },
    { label: "Volume traité", value: "2.5Md€", icon: TrendingUp },
    { label: "Clients bénéficiaires", value: "50K+", icon: Users }
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
                <Handshake className="h-4 w-4 mr-2" />
                Réseau d'Excellence
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Nos Partenaires
              <span className="text-gold block">Stratégiques</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Un écosystème de partenaires de premier plan pour vous offrir les meilleures 
              solutions financières européennes.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {achievements.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 text-gold mx-auto mb-3" />
                  <div className="font-bold text-2xl">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Les Avantages de Notre Réseau
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des partenariats stratégiques qui vous profitent directement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={benefit.title} className="text-center hover-lift border-0 shadow-md">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-xl">
                    <benefit.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg text-primary">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Categories */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Notre Écosystème Partenaire
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des alliances stratégiques avec les leaders de chaque secteur
            </p>
          </div>

          <div className="space-y-16">
            {partnerCategories.map((category, categoryIndex) => (
              <div key={category.title}>
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-primary rounded-xl">
                      <category.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary">{category.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.partners.map((partner, index) => (
                    <Card key={partner.name} className="hover-lift border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <CardTitle className="text-lg text-primary mb-1">{partner.name}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Globe className="h-4 w-4" />
                              {partner.country}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Depuis {partner.since}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm">{partner.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-accent" />
                            <span className="text-sm font-medium text-accent">{partner.specialty}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
                Devenir Partenaire
              </h2>
              <p className="text-xl text-muted-foreground">
                Rejoignez notre réseau d'excellence européen
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary">
                      Critères de Partenariat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-primary mb-1">Excellence Opérationnelle</div>
                          <div className="text-sm text-muted-foreground">Certifications qualité et standards européens</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-primary mb-1">Solidité Financière</div>
                          <div className="text-sm text-muted-foreground">Notation minimum A- par une agence reconnue</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-primary mb-1">Innovation Technologique</div>
                          <div className="text-sm text-muted-foreground">Systèmes modernes et sécurisés</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-primary mb-1">Valeurs Partagées</div>
                          <div className="text-sm text-muted-foreground">Engagement client et transparence</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary">
                      Contact Partenariats
                    </CardTitle>
                    <CardDescription>
                      Échangeons sur les opportunités de collaboration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-accent" />
                        <div>
                          <div className="font-semibold text-primary">Email</div>
                          <div className="text-sm text-muted-foreground">partnerships@aurex-kpital.de</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-accent" />
                        <div>
                          <div className="font-semibold text-primary">Téléphone</div>
                          <div className="text-sm text-muted-foreground">+49 40 710 97530</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-accent" />
                        <div>
                          <div className="font-semibold text-primary">Équipe dédiée</div>
                          <div className="text-sm text-muted-foreground">Dr. Klaus Müller - Directeur Partenariats</div>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-primary hover:shadow-lg mt-6">
                        <Handshake className="h-5 w-5 mr-2" />
                        Proposer un Partenariat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;