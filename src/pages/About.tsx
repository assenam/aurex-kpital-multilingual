import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Calendar, Globe, Shield, Trophy, Target, Users, Award, 
  Sparkles, TrendingUp, Heart, Lightbulb, CheckCircle,
  Building2, Briefcase, GraduationCap, MapPin, Phone, Mail
} from 'lucide-react';

const About = () => {
  const milestones = [
    {
      year: "1997",
      title: "Fondation à Hamburg",
      description: "Création d'Aurex K-pital avec la vision de révolutionner les services financiers en Europe"
    },
    {
      year: "2003",
      title: "Expansion européenne",
      description: "Ouverture de bureaux dans 5 pays européens et lancement des premiers services digitaux"
    },
    {
      year: "2010",
      title: "Innovation IA",
      description: "Intégration pionnière de l'intelligence artificielle dans l'analyse de crédit"
    },
    {
      year: "2015",
      title: "Certification Excellence",
      description: "Obtention des certifications européennes les plus strictes en matière financière"
    },
    {
      year: "2020",
      title: "Transformation digitale",
      description: "Lancement de la plateforme 100% digitale et des algorithmes prédictifs avancés"
    },
    {
      year: "2024",
      title: "Leader marché",
      description: "Position de leader européen avec plus de 50 000 clients satisfaits"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Excellence Client",
      description: "Chaque client est unique et mérite une attention personnalisée avec des solutions sur mesure."
    },
    {
      icon: Shield,
      title: "Sécurité Absolue",
      description: "Protection maximale des données et des investissements avec les technologies les plus avancées."
    },
    {
      icon: Lightbulb,
      title: "Innovation Continue",
      description: "Recherche permanente de nouvelles solutions pour anticiper les besoins de demain."
    },
    {
      icon: CheckCircle,
      title: "Transparence Totale",
      description: "Communication claire et honnête sur tous nos produits, services et conditions."
    }
  ];

  const team = [
    {
      name: "Dr. Klaus Müller",
      position: "Directeur Général",
      experience: "25 ans",
      specialty: "Stratégie financière",
      education: "PhD Finance - Frankfurt School"
    },
    {
      name: "Sophie Laurent",
      position: "Directrice Innovation",
      experience: "15 ans",
      specialty: "FinTech & IA",
      education: "MIT - Intelligence Artificielle"
    },
    {
      name: "Marco Antonelli",
      position: "Directeur Risques",
      experience: "20 ans",
      specialty: "Gestion des risques",
      education: "Bocconi - Risk Management"
    },
    {
      name: "Elena Rodriguez",
      position: "Directrice Client",
      experience: "12 ans",
      specialty: "Relation client",
      education: "ESADE - Customer Experience"
    }
  ];

  const certifications = [
    {
      name: "ISO 27001",
      description: "Sécurité de l'information",
      year: "2018"
    },
    {
      name: "PCI DSS",
      description: "Sécurité des paiements",
      year: "2020"
    },
    {
      name: "GDPR Compliant",
      description: "Protection des données",
      year: "2018"
    },
    {
      name: "SOC 2 Type II",
      description: "Contrôles organisationnels",
      year: "2021"
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
                <Calendar className="h-4 w-4 mr-2" />
                Excellence depuis 1997
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Un Quart de Siècle
              <span className="text-gold block">d'Innovation Financière</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Depuis Hamburg, nous révolutionnons l'accompagnement financier en combinant 
              expertise humaine traditionnelle et technologies de pointe.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-gradient-soft-gold relative overflow-hidden">
        <div className="absolute top-0 left-0 w-60 h-60 bg-primary/20 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gold/30 rounded-full blur-2xl float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 opacity-20">
          <div className="grid-pattern"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
                Notre Histoire
              </h2>
              <p className="text-xl text-muted-foreground">
                De startup hambourgeoise à leader européen de l'innovation financière
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-xl leading-relaxed mb-6">
                <span className="text-primary font-semibold">Aurex K-pital</span> naît en 1997 de la vision 
                audacieuse de révolutionner les services financiers européens. Basée à Hamburg, au cœur 
                économique de l'Allemagne, notre entreprise s'est donnée pour mission de démocratiser 
                l'accès aux solutions financières innovantes.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Pionniers dans l'intégration de <span className="text-accent font-semibold">l'intelligence artificielle</span> 
                aux services financiers dès 2010, nous avons développé des algorithmes propriétaires qui 
                permettent une analyse de risque ultra-précise et des recommandations personnalisées 
                pour chaque client.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Aujourd'hui, avec plus de <span className="text-primary font-semibold">50 000 clients</span> dans 
                toute l'Europe et <span className="text-primary font-semibold">5 milliards d'euros</span> de 
                financements accordés, nous continuons d'innover pour offrir les meilleures solutions 
                du marché.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-soft-blue relative overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent/25 rounded-full blur-2xl float"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-primary/15 rounded-full blur-3xl float" style={{ animationDelay: '2s' }}></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Nos Grandes Étapes
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`flex items-center gap-8 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                  <div className="flex-1">
                     <Card className="hover-lift border-0 shadow-md bg-gradient-to-br from-white to-gold/5 border-l-4 border-l-gold">
                       <CardHeader>
                         <div className="flex items-center gap-4">
                           <div className="text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">{milestone.year}</div>
                           <CardTitle className="text-xl text-primary">{milestone.title}</CardTitle>
                         </div>
                       </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="hidden md:block w-6 h-6 bg-gradient-gold rounded-full flex-shrink-0 shadow-gold ring-4 ring-gold/20"></div>
                  
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-elegant relative">
        <div className="absolute top-0 left-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/15 rounded-full blur-2xl float" style={{ animationDelay: '2s' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Nos Valeurs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Les principes qui guident chacune de nos actions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={value.title} className="hover-lift border-0 shadow-md bg-gradient-to-br from-white via-gold/5 to-primary/5 hover:from-gold/10 hover:to-primary/10 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-gold rounded-xl shadow-gold">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-section relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-40 h-40 bg-accent/20 rounded-full blur-2xl float"></div>
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-primary/10 rounded-full blur-3xl float" style={{ animationDelay: '1.5s' }}></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Notre Équipe Dirigeante
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des experts reconnus au service de votre réussite
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={member.name} className="text-center hover-lift border-0 shadow-md bg-gradient-to-t from-primary/5 to-white hover:from-primary/10 transition-all duration-300">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold ring-4 ring-gold/20">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-primary">{member.name}</CardTitle>
                  <CardDescription className="text-accent font-semibold">{member.position}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    {member.experience} d'expérience
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Target className="h-4 w-4" />
                    {member.specialty}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    {member.education}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gradient-soft-gray relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Certifications & Accréditations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Reconnaissance officielle de notre excellence opérationnelle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={cert.name} className="text-center hover-lift border-0 shadow-md bg-gradient-to-br from-white to-accent/10 hover:from-accent/5 hover:to-accent/15 transition-all duration-300 border-t-4 border-t-accent">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-gradient-gold rounded-xl shadow-gold ring-2 ring-gold/30">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-primary">{cert.name}</CardTitle>
                  <CardDescription className="text-sm">{cert.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-accent font-semibold">Depuis {cert.year}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Nous Rencontrer
            </h2>
            <p className="text-xl mb-12 text-primary-foreground/90">
              Nos bureaux vous accueillent au cœur de Hamburg
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Adresse</h3>
                <p className="text-primary-foreground/80">
                  Irma-Keilhack-Ring 24<br />
                  22145 Hamburg<br />
                  Allemagne
                </p>
              </div>
              
              <div className="text-center">
                <Phone className="h-8 w-8 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Téléphone</h3>
                <p className="text-primary-foreground/80">
                  +49 40 710 97523<br />
                  Lun-Ven: 8h-19h<br />
                  Sam: 9h-17h
                </p>
              </div>
              
              <div className="text-center">
                <Mail className="h-8 w-8 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-primary-foreground/80">
                  contact@aurex-kpital.de<br />
                  info@aurex-kpital.de<br />
                  support@aurex-kpital.de
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-primary font-bold px-8 py-4" asChild>
                <Link to="/contact">
                  <Users className="h-5 w-5 mr-2" />
                  Prendre rendez-vous
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/demande">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Demande personnalisée
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;