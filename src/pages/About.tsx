import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  Calendar, Globe, Shield, Trophy, Target, Users, Award, 
  Sparkles, TrendingUp, Heart, Lightbulb, CheckCircle,
  Building2, Briefcase, GraduationCap, MapPin, Phone, Mail
} from 'lucide-react';

const About = () => {
  const { t } = useTranslation();
  
  const milestones = [
    {
      year: "1997",
      title: t('about.timeline.1997.title'),
      description: t('about.timeline.1997.description')
    },
    {
      year: "2003",
      title: t('about.timeline.2003.title'),
      description: t('about.timeline.2003.description')
    },
    {
      year: "2010",
      title: t('about.timeline.2010.title'),
      description: t('about.timeline.2010.description')
    },
    {
      year: "2015",
      title: t('about.timeline.2015.title'),
      description: t('about.timeline.2015.description')
    },
    {
      year: "2020",
      title: t('about.timeline.2020.title'),
      description: t('about.timeline.2020.description')
    },
    {
      year: "2024",
      title: t('about.timeline.2024.title'),
      description: t('about.timeline.2024.description')
    }
  ];

  const values = [
    {
      icon: Heart,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: Shield,
      title: t('about.values.security.title'),
      description: t('about.values.security.description')
    },
    {
      icon: Lightbulb,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: CheckCircle,
      title: t('about.values.transparency.title'),
      description: t('about.values.transparency.description')
    }
  ];

  const team = [
    {
      name: "Dr. Klaus Müller",
      position: t('about.team.ceo.position'),
      experience: t('about.team.ceo.experience'),
      specialty: t('about.team.ceo.specialty'),
      education: t('about.team.ceo.education')
    },
    {
      name: "Sophie Laurent",
      position: t('about.team.innovation.position'),
      experience: t('about.team.innovation.experience'),
      specialty: t('about.team.innovation.specialty'),
      education: t('about.team.innovation.education')
    },
    {
      name: "Marco Antonelli",
      position: t('about.team.risk.position'),
      experience: t('about.team.risk.experience'),
      specialty: t('about.team.risk.specialty'),
      education: t('about.team.risk.education')
    },
    {
      name: "Elena Rodriguez",
      position: t('about.team.customer.position'),
      experience: t('about.team.customer.experience'),
      specialty: t('about.team.customer.specialty'),
      education: t('about.team.customer.education')
    }
  ];

  const certifications = [
    {
      name: "ISO 27001",
      description: t('about.certifications.iso.description'),
      year: "2018"
    },
    {
      name: "PCI DSS",
      description: t('about.certifications.pci.description'),
      year: "2020"
    },
    {
      name: t('about.certifications.gdpr.name'),
      description: t('about.certifications.gdpr.description'),
      year: "2018"
    },
    {
      name: "SOC 2 Type II",
      description: t('about.certifications.soc2.description'),
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
              <span className="text-gold block">{t('about.hero.subtitle')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              {t('about.hero.description')}
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
                {t('about.story.title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('about.story.subtitle')}
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-xl leading-relaxed mb-6">
                {t('about.story.paragraph1')}
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
      <section className="py-20 bg-gradient-soft-blue relative overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent/25 rounded-full blur-2xl float"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-primary/15 rounded-full blur-3xl float" style={{ animationDelay: '2s' }}></div>
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
              {t('about.values.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('about.values.subtitle')}
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
              {t('about.team.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('about.team.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={member.name} className="hover-lift border-0 shadow-md text-center bg-gradient-to-b from-white to-gold/5 hover:from-gold/5 hover:to-primary/5 transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-gradient-gold rounded-full w-20 h-20 flex items-center justify-center shadow-gold">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-primary">{member.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{member.position}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="bg-gold/10 text-primary border-gold/30">
                      {member.experience} {t('about.team.experienceLabel')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.specialty}</p>
                  <p className="text-xs text-muted-foreground font-medium">{member.education}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gradient-soft-gold relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/15 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl float" style={{ animationDelay: '1s' }}></div>
        <div className="container mx-auto px-4">
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
              <Card key={cert.name} className="hover-lift border-0 shadow-md text-center bg-gradient-to-b from-white to-primary/5 hover:from-gold/5 hover:to-primary/10 transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-gradient-gold rounded-lg w-16 h-16 flex items-center justify-center shadow-gold">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base text-primary">{cert.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{cert.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    {t('about.certifications.sinceLabel')} {cert.year}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-section relative overflow-hidden">
        <div className="absolute top-0 left-0 w-56 h-56 bg-gold/15 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-2xl float" style={{ animationDelay: '2s' }}></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
                {t('about.contact.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('about.contact.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="border-0 shadow-md text-center bg-gradient-to-b from-white to-gold/5 hover:from-gold/5 hover:to-primary/5 transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-gradient-gold rounded-lg w-16 h-16 flex items-center justify-center shadow-gold">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-primary">{t('about.contact.addressTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Irma-Keilhack-Ring 24<br />
                    22145 Hamburg<br />
                    Deutschland
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md text-center bg-gradient-to-b from-white to-gold/5 hover:from-gold/5 hover:to-primary/5 transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-gradient-gold rounded-lg w-16 h-16 flex items-center justify-center shadow-gold">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-primary">{t('about.contact.phoneTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">+49 40 1234 5678</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md text-center bg-gradient-to-b from-white to-gold/5 hover:from-gold/5 hover:to-primary/5 transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-gradient-gold rounded-lg w-16 h-16 flex items-center justify-center shadow-gold">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-primary">{t('about.contact.emailTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">contact@aurex-kpital.com</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="shadow-lg hover-lift">
                  <Link to="/request">
                    <Briefcase className="h-5 w-5 mr-2" />
                    {t('about.contact.appointmentBtn')}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="shadow-lg hover-lift border-gold text-primary hover:bg-gold/10">
                  <Link to="/contact">
                    <Mail className="h-5 w-5 mr-2" />
                    {t('about.contact.customRequestBtn')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;