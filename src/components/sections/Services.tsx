import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { memo, useMemo } from 'react';
import { Gem, Building2, TrendingUp, Shield, Sparkles, Target } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

const Services = memo(() => {
  const { t } = useTranslation();

  const services = useMemo(() => [
    {
      title: t('services.personalLoan.title'),
      description: t('services.personalLoan.description'),
      features: [
        t('services.personalLoan.points.0'),
        t('services.personalLoan.points.1'), 
        t('services.personalLoan.points.2')
      ],
      cta: t('services.personalLoan.cta'),
      icon: Gem,
      gradient: "from-blue-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-purple-50"
    },
    {
      title: t('services.businessLoan.title'), 
      description: t('services.businessLoan.description'),
      features: [
        t('services.businessLoan.points.0'),
        t('services.businessLoan.points.1'),
        t('services.businessLoan.points.2')
      ],
      cta: t('services.businessLoan.cta'),
      icon: Building2,
      gradient: "from-emerald-500 to-teal-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50"
    },
    {
      title: t('services.investment.title'),
      description: t('services.investment.description'),
      features: [
        t('services.investment.points.0'),
        t('services.investment.points.1'),
        t('services.investment.points.2')
      ],
      cta: t('services.investment.cta'),
      icon: TrendingUp,
      gradient: "from-amber-500 to-orange-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50"
    },
    {
      title: t('services.insurance.title'),
      description: t('services.insurance.description'),
      features: [
        t('services.insurance.points.0'),
        t('services.insurance.points.1'),
        t('services.insurance.points.2')
      ],
      cta: t('services.insurance.cta'),
      icon: Shield,
      gradient: "from-rose-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-rose-50 to-pink-50"
    }
  ], [t]);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-gold-50"></div>
      <div className="absolute inset-0 bg-gradient-soft-blue opacity-70"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-6 py-2 bg-gradient-gold rounded-full text-primary font-semibold text-sm tracking-wide uppercase flex items-center gap-2 justify-center">
              <Sparkles className="h-4 w-4" />
              {t('home.services.badge')}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
            {t('home.services.title')} 
            <span className="gradient-text block">{t('home.services.subtitle')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('home.services.description')} 
            <span className="text-accent font-semibold"> {t('home.services.description2')}</span> {t('home.services.description3')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={service.title}>
              <Card className="h-full border border-border bg-card">
                <CardHeader className="text-center pb-4">
                  <div className="mb-6 flex justify-center">
                    <service.icon className="h-16 w-16 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-3 text-primary">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-foreground/90">
                        <span className="mr-3 w-2 h-2 rounded-full bg-primary"></span>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full" asChild>
                    <Link to="/services">
                      {service.cta}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" asChild>
            <Link to="/services" className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {t('services.explore')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;