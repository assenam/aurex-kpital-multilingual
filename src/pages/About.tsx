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
import { useTranslation } from '@/contexts/TranslationContext';

const About = () => {
  const { t } = useTranslation();
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
                {t('about.hero.badge')}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('about.hero.title')}
              <span className="text-gold block">{t('about.hero.titleHighlight')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              {t('about.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-gradient-soft-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="grid-pattern"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
                {t('about.story.title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('about.story.subtitle')}
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-xl leading-relaxed mb-6">
                <span className="text-primary font-semibold">Aurex K-pital</span> {t('about.story.paragraph1')}
              </p>

              <p className="text-lg leading-relaxed mb-6">
                {t('about.story.paragraph2')}
              </p>

              <p className="text-lg leading-relaxed mb-6">
                {t('about.story.paragraph3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {t('about.timeline.title')}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`flex items-center gap-8 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                  <div className="flex-1">
                    <Card className="hover-lift border-0 shadow-md">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="text-3xl font-bold text-accent">{milestone.year}</div>
                          <CardTitle className="text-xl text-primary">{t(`about.timeline.milestones.${milestone.year}.title`)}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{t(`about.timeline.milestones.${milestone.year}.description`)}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="hidden md:block w-4 h-4 bg-gradient-primary rounded-full flex-shrink-0"></div>
                  
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
              {t('about.values.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover-lift border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-primary rounded-xl">
                    <Heart className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl text-primary">{t('about.values.excellence.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('about.values.excellence.description')}</p>
              </CardContent>
            </Card>
            <Card className="hover-lift border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-primary rounded-xl">
                    <Shield className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl text-primary">{t('about.values.security.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('about.values.security.description')}</p>
              </CardContent>
            </Card>
            <Card className="hover-lift border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-primary rounded-xl">
                    <Lightbulb className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl text-primary">{t('about.values.innovation.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('about.values.innovation.description')}</p>
              </CardContent>
            </Card>
            <Card className="hover-lift border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-primary rounded-xl">
                    <CheckCircle className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl text-primary">{t('about.values.transparency.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('about.values.transparency.description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {t('about.team.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('about.team.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={member.name} className="text-center hover-lift border-0 shadow-md">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg text-primary">{member.name}</CardTitle>
                  <CardDescription className="text-accent font-semibold">{member.position}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    {member.experience} {t('about.team.experienceLabel')}
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
              {t('about.certifications.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('about.certifications.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={cert.name} className="text-center hover-lift border-0 shadow-md">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-xl">
                    <Award className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg text-primary">{cert.name}</CardTitle>
                  <CardDescription className="text-sm">{cert.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-accent font-semibold">{t('about.certifications.sinceLabel')} {cert.year}</div>
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
              {t('about.contact.title')}
            </h2>
            <p className="text-xl mb-12 text-primary-foreground/90">
              {t('about.contact.subtitle')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{t('about.contact.address.title')}</h3>
                <p className="text-primary-foreground/80">
                  {t('about.contact.address.line1')}<br />
                  {t('about.contact.address.line2')}<br />
                  {t('about.contact.address.line3')}
                </p>
              </div>
              
              <div className="text-center">
                <Phone className="h-8 w-8 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{t('about.contact.phone.title')}</h3>
                <p className="text-primary-foreground/80">
                  {t('about.contact.phone.number')}<br />
                  {t('about.contact.phone.hours1')}<br />
                  {t('about.contact.phone.hours2')}
                </p>
              </div>
              
              <div className="text-center">
                <Mail className="h-8 w-8 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{t('about.contact.email.title')}</h3>
                <p className="text-primary-foreground/80">
                  {t('about.contact.email.contact')}<br />
                  {t('about.contact.email.info')}<br />
                  {t('about.contact.email.support')}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-primary font-bold px-8 py-4" asChild>
                <Link to="/contact">
                  <Users className="h-5 w-5 mr-2" />
                  {t('about.contact.buttons.meeting')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/demande">
                  <Sparkles className="h-5 w-5 mr-2" />
                  {t('about.contact.buttons.request')}
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