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
      title: t('about.timeline.milestones.0.title'),
      description: t('about.timeline.milestones.0.description')
    },
    {
      year: "2003",
      title: t('about.timeline.milestones.1.title'),
      description: t('about.timeline.milestones.1.description')
    },
    {
      year: "2010",
      title: t('about.timeline.milestones.2.title'),
      description: t('about.timeline.milestones.2.description')
    },
    {
      year: "2015",
      title: t('about.timeline.milestones.3.title'),
      description: t('about.timeline.milestones.3.description')
    },
    {
      year: "2020",
      title: t('about.timeline.milestones.4.title'),
      description: t('about.timeline.milestones.4.description')
    },
    {
      year: "2024",
      title: t('about.timeline.milestones.5.title'),
      description: t('about.timeline.milestones.5.description')
    }
  ];

  const values = [
    {
      icon: Heart,
      title: t('about.values.items.0.title'),
      description: t('about.values.items.0.description')
    },
    {
      icon: Shield,
      title: t('about.values.items.1.title'),
      description: t('about.values.items.1.description')
    },
    {
      icon: Lightbulb,
      title: t('about.values.items.2.title'),
      description: t('about.values.items.2.description')
    },
    {
      icon: CheckCircle,
      title: t('about.values.items.3.title'),
      description: t('about.values.items.3.description')
    }
  ];

  const team = [
    {
      name: t('about.team.members.0.name'),
      position: t('about.team.members.0.position'),
      experience: t('about.team.members.0.experience'),
      specialty: t('about.team.members.0.specialty'),
      education: t('about.team.members.0.education')
    },
    {
      name: t('about.team.members.1.name'),
      position: t('about.team.members.1.position'),
      experience: t('about.team.members.1.experience'),
      specialty: t('about.team.members.1.specialty'),
      education: t('about.team.members.1.education')
    },
    {
      name: t('about.team.members.2.name'),
      position: t('about.team.members.2.position'),
      experience: t('about.team.members.2.experience'),
      specialty: t('about.team.members.2.specialty'),
      education: t('about.team.members.2.education')
    },
    {
      name: t('about.team.members.3.name'),
      position: t('about.team.members.3.position'),
      experience: t('about.team.members.3.experience'),
      specialty: t('about.team.members.3.specialty'),
      education: t('about.team.members.3.education')
    }
  ];

  const certifications = [
    {
      name: t('about.certifications.items.0.name'),
      description: t('about.certifications.items.0.description'),
      year: t('about.certifications.items.0.year')
    },
    {
      name: t('about.certifications.items.1.name'),
      description: t('about.certifications.items.1.description'),
      year: t('about.certifications.items.1.year')
    },
    {
      name: t('about.certifications.items.2.name'),
      description: t('about.certifications.items.2.description'),
      year: t('about.certifications.items.2.year')
    },
    {
      name: t('about.certifications.items.3.name'),
      description: t('about.certifications.items.3.description'),
      year: t('about.certifications.items.3.year')
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
                {t('about.badge')}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('about.title')}
              <span className="text-gold block">{t('about.subtitle')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              {t('about.description')}
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
              <Card key={cert.name} className="text-center hover-lift border-0 shadow-md bg-gradient-to-br from-white to-accent/10 hover:from-accent/5 hover:to-accent/15 transition-all duration-300 border-t-4 border-t-accent">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-gradient-gold rounded-xl shadow-gold ring-2 ring-gold/30">
                    <Award className="h-8 w-8 text-primary" />
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
                  {t('about.contact.address.value.0')}<br />
                  {t('about.contact.address.value.1')}<br />
                  {t('about.contact.address.value.2')}
                </p>
              </div>
              
              <div className="text-center">
                <Phone className="h-8 w-8 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{t('about.contact.phone.title')}</h3>
                <p className="text-primary-foreground/80">
                  {t('about.contact.phone.value')}<br />
                  {t('about.contact.phone.schedule.0')}<br />
                  {t('about.contact.phone.schedule.1')}
                </p>
              </div>
              
              <div className="text-center">
                <Mail className="h-8 w-8 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{t('about.contact.email.title')}</h3>
                <p className="text-primary-foreground/80">
                  {t('about.contact.email.values.0')}<br />
                  {t('about.contact.email.values.1')}<br />
                  {t('about.contact.email.values.2')}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-primary font-bold px-8 py-4" asChild>
                <Link to="/contact">
                  <Users className="h-5 w-5 mr-2" />
                  {t('about.contact.buttons.appointment')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/demande">
                  <Sparkles className="h-5 w-5 mr-2" />
                  {t('about.contact.buttons.customRequest')}
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