import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/contexts/TranslationContext';
import { 
  Handshake, Building2, Globe, Award, Users, TrendingUp, 
  Shield, Star, CheckCircle, ArrowRight, Mail, Phone
} from 'lucide-react';

const Partners = () => {
  const { t } = useTranslation();

  const partnerCategories = [
    {
      titleKey: 'partners_page.categories.banks.title',
      descKey: 'partners_page.categories.banks.description',
      icon: Building2,
      partners: [
        { name: "Deutsche Bank AG", descKey: 'partners_page.partnerDesc.deutscheBank', countryKey: 'partners_page.countries.germany', since: "2015", specialtyKey: 'partners_page.specialties.deutscheBank' },
        { name: "BNP Paribas Europe", descKey: 'partners_page.partnerDesc.bnp', countryKey: 'partners_page.countries.france', since: "2018", specialtyKey: 'partners_page.specialties.bnp' },
        { name: "ING Group", descKey: 'partners_page.partnerDesc.ing', countryKey: 'partners_page.countries.netherlands', since: "2019", specialtyKey: 'partners_page.specialties.ing' },
        { name: "Société Générale", descKey: 'partners_page.partnerDesc.socGen', countryKey: 'partners_page.countries.france', since: "2020", specialtyKey: 'partners_page.specialties.socGen' }
      ]
    },
    {
      titleKey: 'partners_page.categories.insurance.title',
      descKey: 'partners_page.categories.insurance.description',
      icon: Shield,
      partners: [
        { name: "Allianz SE", descKey: 'partners_page.partnerDesc.allianz', countryKey: 'partners_page.countries.germany', since: "2016", specialtyKey: 'partners_page.specialties.allianz' },
        { name: "AXA Group", descKey: 'partners_page.partnerDesc.axa', countryKey: 'partners_page.countries.france', since: "2017", specialtyKey: 'partners_page.specialties.axa' },
        { name: "Generali", descKey: 'partners_page.partnerDesc.generali', countryKey: 'partners_page.countries.italy', since: "2019", specialtyKey: 'partners_page.specialties.generali' }
      ]
    },
    {
      titleKey: 'partners_page.categories.fintech.title',
      descKey: 'partners_page.categories.fintech.description',
      icon: TrendingUp,
      partners: [
        { name: "Klarna Bank", descKey: 'partners_page.partnerDesc.klarna', countryKey: 'partners_page.countries.sweden', since: "2021", specialtyKey: 'partners_page.specialties.klarna' },
        { name: "Revolut", descKey: 'partners_page.partnerDesc.revolut', countryKey: 'partners_page.countries.uk', since: "2022", specialtyKey: 'partners_page.specialties.revolut' },
        { name: "N26", descKey: 'partners_page.partnerDesc.n26', countryKey: 'partners_page.countries.germany', since: "2021", specialtyKey: 'partners_page.specialties.n26' }
      ]
    },
    {
      titleKey: 'partners_page.categories.consulting.title',
      descKey: 'partners_page.categories.consulting.description',
      icon: Award,
      partners: [
        { name: "EY Financial Services", descKey: 'partners_page.partnerDesc.ey', countryKey: 'partners_page.countries.international', since: "2018", specialtyKey: 'partners_page.specialties.ey' },
        { name: "PwC Germany", descKey: 'partners_page.partnerDesc.pwc', countryKey: 'partners_page.countries.germany', since: "2019", specialtyKey: 'partners_page.specialties.pwc' },
        { name: "KPMG Europe", descKey: 'partners_page.partnerDesc.kpmg', countryKey: 'partners_page.countries.international', since: "2020", specialtyKey: 'partners_page.specialties.kpmg' }
      ]
    }
  ];

  const benefits = [
    { icon: CheckCircle, titleKey: 'partners_page.benefits.rates.title', descKey: 'partners_page.benefits.rates.description' },
    { icon: Users, titleKey: 'partners_page.benefits.expertise.title', descKey: 'partners_page.benefits.expertise.description' },
    { icon: Globe, titleKey: 'partners_page.benefits.coverage.title', descKey: 'partners_page.benefits.coverage.description' },
    { icon: Shield, titleKey: 'partners_page.benefits.security.title', descKey: 'partners_page.benefits.security.description' }
  ];

  const achievements = [
    { labelKey: "partners_page.achievements.partners", value: "25+", icon: Handshake },
    { labelKey: "partners_page.achievements.countries", value: "27", icon: Globe },
    { labelKey: "partners_page.achievements.volume", value: "2.5Md€", icon: TrendingUp },
    { labelKey: "partners_page.achievements.clients", value: "50K+", icon: Users }
  ];

  const criteria = [
    { titleKey: 'partners_page.becomePartner.excellence.title', descKey: 'partners_page.becomePartner.excellence.description' },
    { titleKey: 'partners_page.becomePartner.financial.title', descKey: 'partners_page.becomePartner.financial.description' },
    { titleKey: 'partners_page.becomePartner.innovation.title', descKey: 'partners_page.becomePartner.innovation.description' },
    { titleKey: 'partners_page.becomePartner.values.title', descKey: 'partners_page.becomePartner.values.description' }
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
                {t('partners_page.hero.badge')}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('partners_page.hero.title')}
              <span className="text-gold block">{t('partners_page.hero.titleHighlight')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              {t('partners_page.hero.description')}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {achievements.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 text-gold mx-auto mb-3" />
                  <div className="font-bold text-2xl">{stat.value}</div>
                  <div className="text-sm opacity-90">{t(stat.labelKey)}</div>
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
              {t('partners_page.benefits.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('partners_page.benefits.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.titleKey} className="text-center hover-lift border-0 shadow-md">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-xl">
                    <benefit.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg text-primary">{t(benefit.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{t(benefit.descKey)}</p>
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
              {t('partners_page.ecosystem.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('partners_page.ecosystem.subtitle')}
            </p>
          </div>

          <div className="space-y-16">
            {partnerCategories.map((category) => (
              <div key={category.titleKey}>
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-primary rounded-xl">
                      <category.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-primary">{t(category.titleKey)}</h3>
                  </div>
                  <p className="text-muted-foreground">{t(category.descKey)}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.partners.map((partner) => (
                    <Card key={partner.name} className="hover-lift border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <CardTitle className="text-lg text-primary mb-1">{partner.name}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Globe className="h-4 w-4" />
                              {t(partner.countryKey)}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {t('partners_page.since')} {partner.since}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm">{t(partner.descKey)}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-accent" />
                            <span className="text-sm font-medium text-accent">{t(partner.specialtyKey)}</span>
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
                {t('partners_page.becomePartner.title')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('partners_page.becomePartner.subtitle')}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary">
                      {t('partners_page.becomePartner.criteriaTitle')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {criteria.map((item) => (
                        <div key={item.titleKey} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-primary mb-1">{t(item.titleKey)}</div>
                            <div className="text-sm text-muted-foreground">{t(item.descKey)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-primary">
                      {t('partners_page.becomePartner.contactTitle')}
                    </CardTitle>
                    <CardDescription>
                      {t('partners_page.becomePartner.contactSubtitle')}
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
                          <div className="font-semibold text-primary">{t('partners_page.becomePartner.phone')}</div>
                          <div className="text-sm text-muted-foreground">+49 1521 4946940</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-accent" />
                        <div>
                          <div className="font-semibold text-primary">{t('partners_page.becomePartner.team')}</div>
                          <div className="text-sm text-muted-foreground">{t('partners_page.becomePartner.teamMember')}</div>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-primary hover:shadow-lg mt-6">
                        <Handshake className="h-5 w-5 mr-2" />
                        {t('partners_page.becomePartner.button')}
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
