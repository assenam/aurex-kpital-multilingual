import Header from '@/components/navigation/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/contexts/TranslationContext';
import { useMemo } from 'react';

// Import icons individually to avoid bundling issues
import { Gem } from 'lucide-react';
import { Building2 } from 'lucide-react';
import { TrendingUp } from 'lucide-react';
import { Shield } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Users } from 'lucide-react';
import { Calculator } from 'lucide-react';
import { FileText } from 'lucide-react';
import { PiggyBank } from 'lucide-react';
import { CreditCard } from 'lucide-react';
import { Home } from 'lucide-react';

const Services = () => {
  const { t } = useTranslation();
  const mainServices = useMemo(() => [
    {
      title: t('services.personalLoan.title'),
      description: t('services.personalLoan.description'),
      icon: Gem,
      gradient: "from-blue-500 to-purple-600",
      features: [
        t('services.personalLoan.points.0'),
        t('services.personalLoan.points.1'), 
        t('services.personalLoan.points.2')
      ],
      useCases: [
        t('services.personalLoan.useCases.0'),
        t('services.personalLoan.useCases.1'), 
        t('services.personalLoan.useCases.2'),
        t('services.personalLoan.useCases.3'),
        t('services.personalLoan.useCases.4')
      ]
    },
    {
      title: t('services.businessLoan.title'),
      description: t('services.businessLoan.description'),
      icon: Building2,
      gradient: "from-emerald-500 to-teal-600",
      features: [
        t('services.businessLoan.points.0'),
        t('services.businessLoan.points.1'),
        t('services.businessLoan.points.2')
      ],
      useCases: [
        t('services.businessLoan.useCases.0'),
        t('services.businessLoan.useCases.1'),
        t('services.businessLoan.useCases.2'),
        t('services.businessLoan.useCases.3'),
        t('services.businessLoan.useCases.4')
      ]
    },
    {
      title: t('services.investment.title'),
      description: t('services.investment.description'),
      icon: TrendingUp,
      gradient: "from-amber-500 to-orange-600",
      features: [
        t('services.investment.points.0'),
        t('services.investment.points.1'),
        t('services.investment.points.2')
      ],
      useCases: [
        t('services.investment.useCases.0'),
        t('services.investment.useCases.1'),
        t('services.investment.useCases.2'),
        t('services.investment.useCases.3'),
        t('services.investment.useCases.4')
      ]
    },
    {
      title: t('services.insurance.title'),
      description: t('services.insurance.description'),
      icon: Shield,
      gradient: "from-rose-500 to-pink-600",
      features: [
        t('services.insurance.points.0'),
        t('services.insurance.points.1'),
        t('services.insurance.points.2')
      ],
      useCases: [
        t('services.insurance.useCases.0'),
        t('services.insurance.useCases.1'),
        t('services.insurance.useCases.2'),
        t('services.insurance.useCases.3'),
        t('services.insurance.useCases.4')
      ]
    }
  ], [t]);

  const specializedProducts = useMemo(() => [
    {
      title: t('services.specialized.mortgage.title'),
      description: t('services.specialized.mortgage.description'),
      icon: Home,
      rate: t('services.specialized.mortgage.rate')
    },
    {
      title: t('services.specialized.student.title'),
      description: t('services.specialized.student.description'),
      icon: FileText,
      rate: t('services.specialized.student.rate')
    },
    {
      title: t('services.specialized.savings.title'),
      description: t('services.specialized.savings.description'),
      icon: PiggyBank,
      rate: t('services.specialized.savings.rate')
    },
    {
      title: t('services.specialized.premium.title'),
      description: t('services.specialized.premium.description'),
      icon: CreditCard,
      rate: t('services.specialized.premium.rate')
    }
  ], [t]);

  const processSteps = useMemo(() => [
    {
      step: "01",
      title: t('services.process.step1.title'),
      description: t('services.process.step1.description')
    },
    {
      step: "02", 
      title: t('services.process.step2.title'),
      description: t('services.process.step2.description')
    },
    {
      step: "03",
      title: t('services.process.step3.title'),
      description: t('services.process.step3.description')
    },
    {
      step: "04",
      title: t('services.process.step4.title'),
      description: t('services.process.step4.description')
    }
  ], [t]);

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
                {t('home.services.badge')}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('home.services.title')}
              <span className="text-gold block">{t('home.services.subtitle')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              {t('home.services.description')} <span className="text-gold">{t('home.services.description2')}</span> {t('home.services.description3')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-primary font-bold px-8 py-4" asChild>
                <Link to="/simulateur">
                  <Calculator className="h-5 w-5 mr-2" />
                  {t('home.cta.buttons.simulate')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/demande">
                  <FileText className="h-5 w-5 mr-2" />
                  {t('home.cta.buttons.request')}
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
              {t('home.services.title')} {t('home.services.subtitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('home.services.description')} {t('home.services.description2')} {t('home.services.description3')}
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
                      <h4 className="font-semibold text-primary mb-3">{t('services.features')} :</h4>
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
                      <h4 className="font-semibold text-primary mb-3">{t('services.useCases')} :</h4>
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
                        {t('home.cta.buttons.request')}
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
              {t('services.specialized.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('services.specialized.description')}
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
                    <Link to="/demande">{t('services.discover')}</Link>
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
              {t('services.process.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('services.process.description')}
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
              {t('home.cta.title')} {t('home.cta.titleHighlight')} {t('home.cta.titleEnd')}
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              {t('home.cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-primary font-bold px-8 py-4" asChild>
                <Link to="/demande">
                  <Users className="h-5 w-5 mr-2" />
                  {t('home.cta.buttons.request')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/contact">
                  <Clock className="h-5 w-5 mr-2" />
                  {t('home.cta.buttons.contact')}
                </Link>
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-primary-foreground/20">
              <p className="text-primary-foreground/80 mb-2">
                <strong className="text-gold">{t('home.cta.contact.phone')} :</strong> +49 40 710 97523
              </p>
              <p className="text-primary-foreground/80">
                <strong className="text-gold">{t('home.cta.contact.address')} :</strong> {t('home.cta.contact.addressValue')}
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