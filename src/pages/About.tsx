import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';
import { 
  Calendar, Globe, Shield, Trophy, Target, Users, Award, 
  Sparkles, TrendingUp, Heart, Lightbulb, CheckCircle,
  Building2, Briefcase, GraduationCap, MapPin, Phone, Mail,
  Star, Zap, Rocket, HandHeart, Clock
} from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Shield,
      title: "Sécurité & Conformité",
      description: "Nos solutions respectent les normes bancaires les plus strictes et la réglementation RGPD."
    },
    {
      icon: Sparkles,
      title: "Innovation Continue",
      description: "Nous développons constamment de nouvelles solutions pour anticiper vos besoins futurs."
    },
    {
      icon: HandHeart,
      title: "Accompagnement Personnel",
      description: "Chaque client bénéficie d'un conseiller dédié pour un service sur mesure."
    },
    {
      icon: Trophy,
      title: "Excellence Reconnue",
      description: "Plus de 25 ans d'expertise et la confiance de milliers d'entreprises."
    }
  ];

  const milestones = [
    {
      year: "1997",
      title: "Création de l'entreprise",
      description: "Fondation avec la vision de démocratiser l'accès au financement pour les PME."
    },
    {
      year: "2005",
      title: "Expansion européenne",
      description: "Ouverture de bureaux en Allemagne, Pologne et Espagne."
    },
    {
      year: "2012",
      title: "Innovation digitale",
      description: "Lancement de notre plateforme de simulation en ligne révolutionnaire."
    },
    {
      year: "2018",
      title: "50 000ème client",
      description: "Franchissement du cap des 50 000 entreprises accompagnées."
    },
    {
      year: "2023",
      title: "€5 milliards financés",
      description: "Atteinte du record de 5 milliards d'euros de financements facilités."
    }
  ];

  const team = [
    {
      name: "Marie Dubois",
      role: "Directrice Générale",
      experience: "15 ans d'expérience en financement d'entreprise",
      image: "/lovable-uploads/69b3a7b9-1742-4f7a-a667-105c31f57852.png"
    },
    {
      name: "Thomas Schmidt",
      role: "Directeur Technique",
      experience: "Expert en solutions fintech et sécurité bancaire",
      image: "/lovable-uploads/905a3520-c947-4b78-93c5-4b4623d63973.png"
    },
    {
      name: "Elena Rodriguez",
      role: "Directrice Commerciale",
      experience: "Spécialiste des marchés européens depuis 12 ans",
      image: "/lovable-uploads/cda4e48e-825c-4b6b-9301-54221400e47d.png"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] pt-20 pb-16 overflow-hidden">
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
              Votre partenaire financier de confiance
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Depuis plus de 25 ans, nous accompagnons les entreprises européennes dans leur développement avec des solutions de financement innovantes et personnalisées.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gold hover:bg-gold/90 text-primary font-bold px-8 py-3"
                asChild
              >
                <Link to="/contact">
                  <Mail className="h-5 w-5 mr-2" />
                  Nous contacter
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3"
                asChild
              >
                <Link to="/simulateur">
                  <Rocket className="h-5 w-5 mr-2" />
                  Simuler mon financement
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">25+</div>
                <div className="text-muted-foreground">Années d'expérience</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <div className="text-muted-foreground">Entreprises accompagnées</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">€5B+</div>
                <div className="text-muted-foreground">Financements facilités</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">8</div>
                <div className="text-muted-foreground">Pays européens</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">
              <Heart className="h-4 w-4 mr-2" />
              Nos Valeurs
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Ce qui nous guide au quotidien
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Notre réussite repose sur des valeurs fortes qui orientent chacune de nos actions et décisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">
              <Clock className="h-4 w-4 mr-2" />
              Notre Histoire
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              Plus de 25 ans d'innovation
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez les moments clés qui ont façonné notre entreprise et notre expertise.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <Badge variant="outline" className="text-lg px-4 py-2 font-bold">
                      {milestone.year}
                    </Badge>
                  </div>
                  <Card className="flex-1 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{milestone.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{milestone.description}</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">
              <Users className="h-4 w-4 mr-2" />
              Notre Équipe
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              L'expertise au service de votre réussite
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Rencontrez les experts qui pilotent notre vision et accompagnent votre croissance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-24 h-24 rounded-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-semibold">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground text-sm">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Prêt à développer votre entreprise ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez plus de 50 000 entreprises qui nous font confiance pour leurs besoins de financement.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-gold hover:bg-gold/90 text-primary font-bold px-8 py-3"
                asChild
              >
                <Link to="/simulateur">
                  <Zap className="h-5 w-5 mr-2" />
                  Commencer la simulation
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3"
                asChild
              >
                <Link to="/contact">
                  <Phone className="h-5 w-5 mr-2" />
                  Parler à un expert
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