import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/contexts/TranslationContext';
import { 
  Users, Briefcase, MapPin, Clock, Euro, GraduationCap, 
  TrendingUp, Heart, Coffee, Gamepad2, Car, Plane,
  Code, BarChart, Shield, Headphones, Building
} from 'lucide-react';

const Careers = () => {
  const { t } = useTranslation();

  const openPositions = [
    {
      jobKey: 'dataScientist',
      location: "Hamburg",
      type: "CDI",
      experience: "5+",
      salary: "75-95K€",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Finance"],
      urgent: true
    },
    {
      jobKey: 'financialAdvisor',
      location: "Hamburg / Remote",
      type: "CDI",
      experience: "3+",
      salary: "50-65K€",
      skills: ["Finance", "CRM", "Communication"],
    },
    {
      jobKey: 'developer',
      location: "Hamburg",
      type: "CDI",
      experience: "3+",
      salary: "60-80K€",
      skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    },
    {
      jobKey: 'riskAnalyst',
      location: "Hamburg",
      type: "CDI",
      experience: "2+",
      salary: "45-60K€",
      skills: ["R/Python", "Excel", "SQL"],
    },
    {
      jobKey: 'marketingManager',
      location: "Hamburg / Remote",
      type: "CDI",
      experience: "4+",
      salary: "55-70K€",
      skills: ["SEO/SEA", "Analytics", "CRM", "Content Marketing"],
    },
    {
      jobKey: 'complianceOfficer',
      location: "Hamburg",
      type: "CDI",
      experience: "5+",
      salary: "65-85K€",
      skills: ["GDPR", "AML", "Audit"],
    }
  ];

  const benefitKeys = ['salary', 'flexibility', 'training', 'wellbeing', 'mobility', 'vacation'] as const;
  const benefitIcons = { salary: Euro, flexibility: Clock, training: GraduationCap, wellbeing: Heart, mobility: Car, vacation: Plane };

  const cultureKeys = ['innovation', 'teamwork', 'conviviality', 'balance'] as const;
  const cultureIcons = { innovation: TrendingUp, teamwork: Users, conviviality: Coffee, balance: Gamepad2 };

  const departmentKeys = ['tech', 'finance', 'customer', 'compliance', 'operations'] as const;
  const departmentIcons = { tech: Code, finance: BarChart, customer: Headphones, compliance: Shield, operations: Building };
  const departmentCounts = { tech: 12, finance: 8, customer: 15, compliance: 4, operations: 6 };

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
                <Users className="h-4 w-4 mr-2" />
                {t('careers_page.hero.badge')}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('careers_page.hero.title')}
              <span className="text-gold block">{t('careers_page.hero.titleHighlight')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              {t('careers_page.hero.description')}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <Users className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-2xl">45+</div>
                <div className="text-sm opacity-90">{t('careers_page.hero.stats.employees')}</div>
              </div>
              <div className="text-center">
                <Briefcase className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-2xl">12</div>
                <div className="text-sm opacity-90">{t('careers_page.hero.stats.positions')}</div>
              </div>
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-2xl">25%</div>
                <div className="text-sm opacity-90">{t('careers_page.hero.stats.growth')}</div>
              </div>
              <div className="text-center">
                <Heart className="h-8 w-8 text-gold mx-auto mb-3" />
                <div className="font-bold text-2xl">4.8/5</div>
                <div className="text-sm opacity-90">{t('careers_page.hero.stats.satisfaction')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {t('careers_page.positions.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('careers_page.positions.subtitle')}
            </p>
          </div>

          <div className="grid gap-6">
            {openPositions.map((job) => (
              <Card key={job.jobKey} className="hover-lift border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl text-primary">{t(`careers_page.jobs.${job.jobKey}.title`)}</CardTitle>
                        {job.urgent && <Badge className="bg-accent text-accent-foreground">{t('careers_page.positions.urgent')}</Badge>}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {t(`careers_page.jobs.${job.jobKey}.department`)}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          {job.experience}
                        </div>
                        <div className="flex items-center gap-1">
                          <Euro className="h-4 w-4" />
                          {job.salary}
                        </div>
                      </div>
                      <CardDescription className="mb-4">{t(`careers_page.jobs.${job.jobKey}.description`)}</CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="ml-4 bg-gradient-primary hover:shadow-lg">
                      {t('careers_page.positions.apply')}
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {t('careers_page.departments.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('careers_page.departments.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departmentKeys.map((key) => {
              const Icon = departmentIcons[key];
              return (
                <Card key={key} className="text-center hover-lift border-0 shadow-md">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-xl">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg text-primary">{t(`careers_page.departments.${key}.name`)}</CardTitle>
                    <CardDescription>{t(`careers_page.departments.${key}.description`)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-accent mb-2">{departmentCounts[key]}</div>
                    <div className="text-sm text-muted-foreground">{t('careers_page.departments.collaborators')}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {t('careers_page.benefits.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('careers_page.benefits.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefitKeys.map((key) => {
              const Icon = benefitIcons[key];
              const details = t(`careers_page.benefits.${key}.details`);
              const detailsList = typeof details === 'string' ? [] : [];
              return (
                <Card key={key} className="hover-lift border-0 shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-gradient-primary rounded-xl">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-lg text-primary">{t(`careers_page.benefits.${key}.title`)}</CardTitle>
                    </div>
                    <CardDescription>{t(`careers_page.benefits.${key}.description`)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {[0, 1, 2].map((i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></div>
                          {t(`careers_page.benefits.${key}.details.${i}`)}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
              {t('careers_page.culture.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('careers_page.culture.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cultureKeys.map((key) => {
              const Icon = cultureIcons[key];
              return (
                <Card key={key} className="hover-lift border-0 shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-primary rounded-xl">
                        <Icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-primary">{t(`careers_page.culture.${key}.title`)}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{t(`careers_page.culture.${key}.description`)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t('careers_page.cta.title')}
            </h2>
            <p className="text-xl mb-12 text-primary-foreground/90">
              {t('careers_page.cta.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-primary font-bold px-8 py-4">
                <Briefcase className="h-5 w-5 mr-2" />
                {t('careers_page.cta.spontaneous')}
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Users className="h-5 w-5 mr-2" />
                {t('careers_page.cta.viewAll')}
              </Button>
            </div>

            <div className="mt-12 text-sm text-primary-foreground/80">
              <p>{t('careers_page.cta.contact')} : <strong>careers@aurex-kpital.de</strong> | +49 1521 4946940</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
